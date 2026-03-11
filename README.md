# Pivot_Computing_Power_Network

## 项目概览

该目录是一个“算力网络/平台”相关的多项目集合，包含区块链合约、前端管理端、后端模板与 AI 平台前端等多个独立子项目。

> 当前目录下的子项目大多是**独立 Git 仓库**（各自有 `.git`），本仓库用于提供顶层说明与统一入口。

## 目录结构

```text
Pivot_Computing_Power_Network/
├── FISCO Platform/      # FISCO BCOS 资源租赁智能合约
├── easyts-web-main/     # Vue2 管理前端（含可视化页面）
├── ithings-new-main/    # React + Umi(Max) 企业管理前端
├── system-template/     # Spring Boot + Vue 的系统模板（含部署脚本）
└── ymir/                # YMIR Web（AI 数据/训练/标注平台前端）
```

## 子项目说明

### 1) `FISCO Platform`

- 类型：Solidity 智能合约
- 主要文件：`BAC002.sol`、`IBAC002.sol`、`Register.sol`、`Roles.sol`、`SafeMath.sol`
- 功能概要：围绕 CPU/GPU/内存等资源的发行、租赁、归还和权限管理。

### 2) `easyts-web-main`

- 类型：Vue2 管理后台（基于 `vue-admin-template`）
- 技术栈：Vue 2、Element UI、Axios
- 启动方式：

```bash
cd easyts-web-main
npm install
npm run dev
```

### 3) `ithings-new-main`

- 类型：企业级管理前端
- 技术栈：React 18、Ant Design、Umi Max
- 启动方式：

```bash
cd ithings-new-main
npm install
npm run start:dev
```

### 4) `system-template`

- 类型：前后端分离模板
- 后端：`system-springboot`（Spring Boot 2.x / MyBatis-Plus）
- 前端：`system-vue`（Vue2 + Element UI）
- 其他：包含数据库 SQL、Nginx 与部署脚本

后端示例：

```bash
cd system-template/system-springboot
mvn clean package
java -jar target/system-springboot-*.jar
```

前端示例：

```bash
cd system-template/system-vue
npm install
npm run serve
```

### 5) `ymir`

- 类型：AI 平台 Web 前端
- 技术栈：React 17 + Umi 3 + Ant Design
- 功能方向：数据集管理、标注、训练、模型迭代相关页面
- 启动方式：

```bash
cd ymir
npm install
npm run start
```

## 运行与使用建议

- 建议按子项目分别安装依赖并运行，不要在根目录统一安装。
- Node.js 版本需按子项目匹配（`ithings-new-main` 要求 `>=14`，其他项目建议参考各自 `package.json`）。
- 部分目录已包含 `node_modules`（历史开发痕迹），如依赖冲突建议删除后重装。

## 许可与来源

各子项目来源和许可协议可能不同，请以各子目录中的 `LICENSE`、`README`、`git remote` 为准。
