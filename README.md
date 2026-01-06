# Astro 技术博客

极简、现代、克制的技术博客。内容基于 Markdown + Astro Content Collections，构建为纯静态站点。

## 开发

```bash
npm install
npm run dev
```

## 写文章

在 `src/content/posts/` 新建 Markdown 文件，Frontmatter 结构如下：

```yaml
---
title: 文章标题
description: 简短摘要
pubDate: 2025-02-18
tags: [astro, engineering]
---
```

提交并推送即可触发部署与同步：

```bash
git add .
git commit -m "feat: new post"
git push
```

## 部署到 Vercel

1. 在 Vercel 中导入仓库
2. Framework 选择 Astro
3. Build Command: `npm run build`
4. Output Directory: `dist`

## Cloudflare R2 同步

GitHub Actions 在 main 分支 push 时会同步：

- `src/content` -> `s3://$R2_BUCKET/content`
- `public/images` -> `s3://$R2_BUCKET/images`

在 GitHub 仓库设置 Secrets：

- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ENDPOINT` (例如 `https://<accountid>.r2.cloudflarestorage.com`)
- `R2_BUCKET`

## 目录结构

```text
src/
  content/
    posts/
  components/
  layouts/
  pages/
```
