# Astro 技术博客

极简、现代、克制的技术博客。内容基于 Markdown/MDX + Astro Content Collections，构建为纯静态站点。新增「每日收益快照」栏目，用于自动同步并展示策略日报。

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

## 每日收益快照

报告内容存放在 `src/content/reports/`，使用 MDX 渲染，可包含表格与图表。

手动拉取某天报告：

```bash
node scripts/import-report.mjs --date 20260114
```

脚本会读取：

- 单日报告：`https://logs.gleaftex.com/runs/fa888/martingale/reports/report_{YYYYMMDD}.txt`
- 历史净值：`https://logs.gleaftex.com/runs/fa888/martingale/reports/history.json`

如果日报文件不存在（404），脚本会跳过而不中断。

### 自动同步

GitHub Actions 每天定时拉取并提交（UTC 01:20），见 `.github/workflows/report-sync.yml`。

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
    reports/
  components/
  layouts/
  pages/
```
