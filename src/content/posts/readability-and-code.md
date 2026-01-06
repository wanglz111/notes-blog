---
title: 可读性与代码块的平衡
description: 面向长文阅读的排版策略，以及让代码更耐读的细节选择。
pubDate: 2026-01-06
tags: [typography, design, shiki]
---

长文阅读最怕两件事：过密的文字与难以识别的代码块。字体与排版是阅读体验的基础，而代码块是技术博客的重点。

## 行高与节奏

我把正文行高控制在舒适区间，字体尺寸保持克制。阅读节奏来自段落之间的间距，而不是过大的字体。

在 `prose` 的排版体系里，核心是让正文保持稳定的秩序：标题有节奏、段落有呼吸、列表不拥挤。

## 代码块

代码块的要求很简单：清晰、稳定、不过度抢戏。

我选择 Shiki 作为高亮器，因为它能在浅色与深色模式之间保持一致的层次。配合深色背景可以避免“亮块刺眼”的问题。

示例：

```ts
type Theme = 'light' | 'dark';

const storageKey = 'theme';
const preferred: Theme =
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const resolved = (localStorage.getItem(storageKey) as Theme | null) ?? preferred;
document.documentElement.classList.toggle('dark', resolved === 'dark');
```

## 结论

排版与代码块是技术博客的核心界面。如果让人读得舒服，写作者就更愿意写，读者也更愿意回来。
