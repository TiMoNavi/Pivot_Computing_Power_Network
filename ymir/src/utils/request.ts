import axios from 'axios'
import storage from '@/utils/storage'
import { getDvaApp } from 'umi'
import { message } from 'antd'
import t from '@/utils/t'

const getBaseURL = () => {
  // const envUrl = process.env.APIURL
  // if (process.env.NODE_ENV === 'development') {
  //   return envUrl
  // }
  // return window.baseConfig?.APIURL || envUrl
  // return 'http://127.0.0.1:3001/'
  return '/ymir-api/'
}

const request = axios.create({
  baseURL: getBaseURL(),
  // timeout: 1,
})

request.interceptors.request.use(
  (config) => {
    const headers = config.headers || {}
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
    headers['Authorization'] = `Bearer ${storage.get('access_token')}`
    config.headers = headers
    return config
  },
  (err) => {
    console.error(err)
    return err
  },
)

request.interceptors.response.use(
  (res) => {
    if (res.data.code !== 0) {
      const msg = res.data.code ? t(`error${res.data.code}`) : '请求失败'
      message.error(msg)
      if ([110104, 110112].includes(res.data.code)) {
        logout()
      }
    }
    return res.data
  },
  (err) => {
    let authrized = [401, 403]
    let serviceErrorCode = [500, 504, 502]
    const status = err.request?.status

    if (status && authrized.includes(status)) {
      logout()
    } else if (status && serviceErrorCode.includes(status)) {
      message.error(t(`error${status}`))
    } else {
      const res = err.response
      if (res?.data?.code) {
        if (res.data.code === 110104) {
          logout()
        }
        message.error(t(`error${res.data.code}`))
        return res.data
      } else {
        // 网络错误或其他未知错误
        message.error('网络请求失败，请检查网络连接')
      }
    }

    return { code: status || -1 }
  },
)

function logout() {
  getDvaApp()._store.dispatch({
    type: 'user/loginout',
  })
}

export default request
