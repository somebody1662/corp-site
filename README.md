# 东莞市森度智能科技有限公司 · 企业展示网站

基于 Astro 静态生成的企业展示站，产品/案例/新闻/关于内容通过 Keystatic 后台管理，部署于 Cloudflare Workers。

## 技术栈

- Astro 7.3.5 + TypeScript strict + Tailwind 4 + MDX
- Keystatic 6（Git-based 内容后台）
- Cloudflare Workers 静态资产（wrangler.toml `[assets]`）
- Pagefind 站内搜索、sitemap、JSON-LD 结构化数据

## 本地开发

```bash
npm install
npm run dev          # 本地预览 http://localhost:4321
# 内容后台：npm run dev 后打开 http://localhost:4321/keystatic
```

## 构建与部署

```bash
npm run build:prod   # = cross-env KEYSTATIC=false astro build && pagefind --site dist（Windows/Linux 通用）
git push origin main # Cloudflare 自动构建部署
```

线上地址：https://corp-site.sport17697287.workers.dev
代码仓库：https://github.com/somebody1662/corp-site

## 内容管理

所有内容为 `src/content/` 下的 Markdown/MDX 文件，两种方式维护：

1. **后台表单**：`npm run dev` → 打开 `/keystatic`，表单增删改（推荐日常使用）
2. **直接改文件**：编辑对应 `.mdx`，改完 `git push` 即上线

| 集合 | 路径 | 说明 |
| --- | --- | --- |
| products | `src/content/products/*.mdx` | 产品/服务（分类：保安岗亭/民宿房屋） |
| cases | `src/content/cases/*.mdx` | 案例/项目（分类：岗亭项目/民宿项目） |
| news | `src/content/news/*.mdx` | 新闻动态 |
| about | `src/content/about/*.mdx` | 关于我们 |

## 站点配置

全局信息（公司名、标语、电话、邮箱、地址、微信）在 `src/consts.ts` 修改，全站生效。

- 产品图片：cover/gallery 字段引用 `src/content/products/<slug>/content/` 下的图片（相对路径），暂用手动管理
- 联系表单：`src/pages/contact.astro` 中的 `WEB3FORMS_ACCESS_KEY` 占位符，替换为真实 Web3Forms access key 后重新部署

## 注意事项

- 生产构建必须带 `KEYSTATIC=false`（Keystatic 后台路由是 SSR，纯静态构建需禁用）
- `site` 字段（astro.config.mjs）决定 canonical/sitemap 基准域名，绑定自定义域名后需同步修改
- Cloudflare 控制台需保持 Git 仓库连接状态，断开后 push 不会自动部署
