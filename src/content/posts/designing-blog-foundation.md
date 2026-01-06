---
title: 设计一个可维护的技术博客基础
description: 用最少的结构达成长期可维护：信息架构、内容规范与构建策略。
pubDate: 2026-01-06
tags: [astro, content, engineering]
---

写博客是一件长期的事情，所以最重要的不是“今天能写出来”，而是“半年后依然愿意写”。这篇记录我为博客做的最小、稳定、可持续的基础设计。

## 最小结构

结构越少越稳。内容、渲染、发布应该是可替换的三层：

- 内容层：Markdown + Frontmatter
- 渲染层：Astro + Content Collections
- 发布层：纯静态站点 + CDN

这样做的好处是：渲染层的变化不会影响内容层，发布层也不会影响内容层。

## 内容规范

我只保留四个字段，因为它们足够驱动阅读体验和检索：

- `title`：用于导航与 SEO
- `description`：用于列表和分享
- `pubDate`：用于排序
- `tags`：用于未来聚合

规则越少越容易坚持。写作时不需要选择复杂模板，只需一段元信息和正文。

## 渲染策略

渲染交给 Astro Content Collections，配合 `getCollection` 做排序即可：

```ts
const posts = (await getCollection('posts')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
```

列表页只展示必要信息：标题、描述、日期。把阅读入口留给正文页，不堆叠二级信息。

## 发布策略

静态站点的好处是部署模型稳定。每次写作等价于一次 Git commit，这让内容变更可追溯。

写作流程可以只保留三个动作：

1. 新建 Markdown
2. 提交 Git
3. 推送主分支

这一套足够稳定，也足够轻。

## 小结

博客的价值来自持续更新，而持续更新来自结构的轻量。减少规则、减少依赖、减少复杂度，写作的阻力才会真正下降。
