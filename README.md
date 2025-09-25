#  挑战项目

这是一个基于 Next.js App Router 和 TypeScript 构建的项目，使用 Chakra UI 组件库实现 UI 元素和样式，并通过 Apollo Client 查询 SpaceX GraphQL API。

## 功能特点

- 使用 Next.js App Router 和 TypeScript
- 使用 Git 进行版本控制
- 使用 Chakra UI 组件库实现响应式设计
- 移动端和桌面端自适应布局
- 页面底部显示挑战版本号
- 用户登录阻挡元素，获取用户名和职位信息
- 用户信息在页面刷新后保持
- 使用 Apollo Client 查询 AniList GraphQL API
- 表格形式展示动漫数据，包括角色、工作人员和图片
- 支持通过 URL 直接链接到分页数据的指定页面
- 点击表格项打开详情模态框
- 支持 Vercel 部署

## 开发环境设置

1. 克隆仓库
```bash
git clone <repository-url>
cd project
```

2. 安装依赖
```bash
npm install
```

3. 创建 `.env.local` 文件并添加以下内容
```
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_SPACEX_API_URL=https://spacex-production.up.railway.app/
```

4. 启动开发服务器
```bash
npm run dev
```

5. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
project/
├── src/
│   ├── app/                  # Next.js App Router 页面
│   │   ├── information/      # 信息页面
│   │   ├── globals.css       # 全局样式
│   │   ├── layout.tsx        # 根布局
│   │   └── page.tsx          # 首页
│   ├── components/           # React 组件
│   │   ├── AuthGuard.tsx     # 身份验证守卫
│   │   ├── Footer.tsx        # 页脚组件
│   │   ├── LaunchesTable.tsx # 发射数据表格
│   │   ├── LoginBlock.tsx    # 登录阻挡元素
│   │   └── Navbar.tsx        # 导航栏
│   └── lib/                  # 工具库
│       ├── apollo-client.ts  # Apollo Client 配置
│       ├── apollo-provider.tsx # Apollo Provider 组件
│       ├── chakra-providers.tsx # Chakra UI 配置
│       ├── user-context.tsx  # 用户上下文
│       └── graphql/          # GraphQL 相关
│           ├── queries.ts    # GraphQL 查询
│           └── types.ts      # TypeScript 类型定义
├── public/                   # 静态资源
├── .env.local                # 环境变量
├── next.config.ts            # Next.js 配置
├── package.json              # 项目依赖
├── tsconfig.json             # TypeScript 配置
└── vercel.json               # Vercel 部署配置
```

## 部署

项目配置了 Vercel 部署。可以使用以下命令部署到 Vercel：

```bash
npm run deploy
```

或者，可以将仓库连接到 Vercel 进行自动部署。

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Chakra UI](https://chakra-ui.com/) - 组件库
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL 客户端
- [AniList API](https://anilist.co/graphiql) - GraphQL API
- [Vercel](https://vercel.com/) - 部署平台

## 版本

v1.0.0