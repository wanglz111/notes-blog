import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_TEMPLATE =
  'https://logs.gleaftex.com/runs/fa888/martingale/reports/report_{YYYYMMDD}.txt';
const DEFAULT_HISTORY =
  'https://logs.gleaftex.com/runs/fa888/martingale/reports/history.json';

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const key = process.argv[i];
  const next = process.argv[i + 1];
  if (key?.startsWith('--')) {
    args.set(key.slice(2), next);
    i += 1;
  }
}

const dateArg = args.get('date');
if (!dateArg || !/^\d{8}$/.test(dateArg)) {
  console.error('Usage: node scripts/import-report.mjs --date YYYYMMDD');
  process.exit(1);
}

const urlTemplate = args.get('url-template') ?? process.env.REPORT_URL_TEMPLATE ?? DEFAULT_TEMPLATE;
const historyUrl = args.get('history-url') ?? process.env.REPORT_HISTORY_URL ?? DEFAULT_HISTORY;
const outDir = args.get('out-dir') ?? 'src/content/reports';
const url = urlTemplate.replace('{YYYYMMDD}', dateArg);
const slugDate = `${dateArg.slice(0, 4)}-${dateArg.slice(4, 6)}-${dateArg.slice(6, 8)}`;

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Failed to fetch ${url} (${response.status})`);
}
const rawText = await response.text();

const lines = rawText.replace(/\r\n/g, '\n').split('\n');

const headerLine = lines.find((line) => line.startsWith('【每日收益快照】')) ?? '';
const titleDate = headerLine.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? slugDate;

const metrics = new Map();
let cursor = 0;
for (; cursor < lines.length; cursor += 1) {
  const line = lines[cursor].trim();
  if (line.startsWith('- ') && line.includes(':')) {
    const value = line.slice(2).split(':').map((part) => part.trim());
    if (value.length >= 2) {
      metrics.set(value[0], value.slice(1).join(':'));
    }
  } else if (line === '') {
    break;
  }
}

const sections = {
  assets: [],
  operations: [],
  fields: [],
  basis: [],
};

const findIndex = (label) => lines.findIndex((line) => line.trim().startsWith(label));
const assetsIndex = findIndex('币种表现');
const opsIndex = findIndex('当日操作');
const fieldsIndex = findIndex('字段说明');
const basisIndex = findIndex('口径');

const collectBlock = (startIndex, endIndex) => {
  if (startIndex === -1) return [];
  const block = [];
  for (let i = startIndex + 1; i < lines.length && (endIndex === -1 || i < endIndex); i += 1) {
    const line = lines[i].trim();
    if (!line) break;
    block.push(line);
  }
  return block;
};

sections.assets = collectBlock(assetsIndex, opsIndex === -1 ? fieldsIndex : opsIndex);
sections.operations = collectBlock(opsIndex, fieldsIndex === -1 ? basisIndex : fieldsIndex);
sections.fields = collectBlock(fieldsIndex, basisIndex);

if (basisIndex !== -1) {
  const basisLine = lines[basisIndex];
  const inline = basisLine.split('口径：')[1]?.trim();
  if (inline) sections.basis.push(inline);
  for (let i = basisIndex + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    sections.basis.push(line);
  }
}

const parseAssetLine = (line) => {
  if (line.startsWith('Simple Earn')) {
    const total = line.match(/total=([0-9.,]+)/)?.[1] ?? '-';
    return {
      symbol: 'Simple Earn USDT',
      size: '-',
      avg: '-',
      price: '-',
      pnl: '-',
      pnlRate: '-',
      value: total,
    };
  }
  const symbol = line.split(' ')[0];
  const size = line.match(/size=([^\s]+)/)?.[1] ?? '-';
  const avg = line.match(/avg=([^\s]+)/)?.[1] ?? '-';
  const price = line.match(/price=([^\s]+)/)?.[1] ?? '-';
  const pnl = line.match(/浮盈\s+([-\d.]+)/)?.[1] ?? '-';
  const pnlRate = line.match(/\(([-\d.]+%)\)/)?.[1] ?? '-';
  const value = line.match(/value=([^\s]+)/)?.[1] ?? '-';
  return { symbol, size, avg, price, pnl, pnlRate, value };
};

const parseOperationLine = (line) => {
  const match =
    /^-\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s+(\S+)\s+(买入|卖出)\s+([0-9.]+)@([0-9.]+)\s+成交额\s+([0-9.]+)(?:\s+利润\s+([0-9.\-]+))?/.exec(
      line
    );
  if (!match) {
    return { raw: line.replace(/^- /, '') };
  }
  const [, date, time, symbol, side, size, price, amount, profit] = match;
  return {
    time: `${date} ${time}`,
    symbol,
    side,
    size,
    price,
    amount,
    profit: profit ?? '-',
  };
};

const assets = sections.assets.map(parseAssetLine);
const operations = sections.operations.map(parseOperationLine);
const rawTextLiteral = JSON.stringify(rawText);

const historyResponse = await fetch(historyUrl);
if (!historyResponse.ok) {
  throw new Error(`Failed to fetch ${historyUrl} (${historyResponse.status})`);
}
const historyJson = await historyResponse.json();
const entries = Array.isArray(historyJson.entries) ? historyJson.entries : [];
const reportDate = new Date(`${slugDate}T00:00:00Z`);
const filtered = entries
  .filter((entry) => entry?.date && entry?.nav != null)
  .map((entry) => ({
    date: new Date(`${entry.date}T00:00:00Z`),
    nav: Number(entry.nav),
  }))
  .filter((entry) => !Number.isNaN(entry.nav) && entry.date <= reportDate)
  .sort((a, b) => a.date - b.date);

const windowSize = 30;
const windowEntries = filtered.slice(-windowSize);
const navValues = windowEntries.map((entry) => entry.nav);
const navMin = Math.min(...navValues);
const navMax = Math.max(...navValues);
const chartWidth = 360;
const chartHeight = 120;
const chartPadding = 10;

const scaleX = (index, total) => {
  if (total <= 1) return chartPadding;
  const usable = chartWidth - chartPadding * 2;
  return chartPadding + (index / (total - 1)) * usable;
};
const scaleY = (value) => {
  if (navMax === navMin) return chartHeight / 2;
  const usable = chartHeight - chartPadding * 2;
  return chartPadding + ((navMax - value) / (navMax - navMin)) * usable;
};

const linePath = windowEntries
  .map((entry, index) => `${index === 0 ? 'M' : 'L'}${scaleX(index, windowEntries.length).toFixed(2)} ${scaleY(entry.nav).toFixed(2)}`)
  .join(' ');

const areaPath =
  `${linePath} L ${scaleX(windowEntries.length - 1, windowEntries.length).toFixed(2)} ${chartHeight - chartPadding}` +
  ` L ${scaleX(0, windowEntries.length).toFixed(2)} ${chartHeight - chartPadding} Z`;

const chartId = `nav-${slugDate.replace(/-/g, '')}`;
const lastEntry = windowEntries[windowEntries.length - 1];
const lastX = scaleX(windowEntries.length - 1, windowEntries.length);
const lastY = scaleY(lastEntry?.nav ?? navMin);

const formatNav = (value) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
const navTicks = [
  { value: navMax, label: formatNav(navMax) },
  { value: (navMax + navMin) / 2, label: formatNav((navMax + navMin) / 2) },
  { value: navMin, label: formatNav(navMin) },
];

const mdx = `---
title: 每日收益快照 · ${titleDate}
description: 自动同步生成的每日报告。
pubDate: ${titleDate}
sourceUrl: ${url}
tags: [martingale, daily]
---

<div class="report-card rounded-2xl p-6 backdrop-blur">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">Daily Snapshot</p>
      <h2 class="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">收益概览</h2>
      <p class="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        每日 00:00 UTC+0 快照，现货价折算，仅作记录展示。
      </p>
    </div>
    <div class="flex items-center gap-4 rounded-2xl border border-zinc-200/60 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
      <span>已实现收益率</span>
      <span class="text-base font-semibold text-zinc-900 dark:text-zinc-100">${metrics.get('已实现收益率') ?? '-'}</span>
      <span class="text-xs text-emerald-600 dark:text-emerald-400">年化 ${metrics.get('年化收益率(已实现)') ?? '-'}</span>
    </div>
  </div>
</div>

<div class="mt-8 grid gap-4 md:grid-cols-3">
  <div class="report-card rounded-2xl p-5">
    <p class="text-xs text-zinc-400">总资产</p>
    <p class="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">${metrics.get('总资产') ?? '-'}</p>
    <p class="mt-2 text-xs text-zinc-500">总投资 ${metrics.get('总投资') ?? '-'}</p>
  </div>
  <div class="report-card rounded-2xl p-5">
    <p class="text-xs text-zinc-400">已实现收益</p>
    <p class="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">${metrics.get('已实现收益') ?? '-'}</p>
    <p class="mt-2 text-xs text-zinc-500">已实现资产 ${metrics.get('已实现资产') ?? '-'}</p>
  </div>
  <div class="report-card rounded-2xl p-5">
    <p class="text-xs text-zinc-400">未实现收益</p>
    <p class="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">${metrics.get('未实现收益') ?? '-'}</p>
    <p class="mt-2 text-xs text-zinc-500">当日收益 ${metrics.get('当日收益') ?? '-'}</p>
  </div>
</div>

<div class="report-card mt-8 rounded-2xl p-6">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">收益曲线</h3>
      <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">近 7 日 NAV 走势（示意）</p>
    </div>
    <div class="text-right text-xs text-zinc-400">累计收益(未实) ${metrics.get('累计收益(未实)') ?? '-'}</div>
  </div>
  <svg viewBox="0 0 360 120" class="mt-4 w-full" aria-label="收益折线图">
    <defs>
      <linearGradient id="${chartId}-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0f766e" />
        <stop offset="100%" stop-color="#0ea5a4" />
      </linearGradient>
      <linearGradient id="${chartId}-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#14b8a6" stop-opacity="0" />
      </linearGradient>
    </defs>
    ${navTicks
      .map((tick) => {
        const y = scaleY(tick.value).toFixed(2);
        return `<g>
      <line x1="10" x2="350" y1="${y}" y2="${y}" stroke="currentColor" opacity="0.08" />
      <text x="0" y="${y}" fill="currentColor" opacity="0.45" font-size="8" dominant-baseline="middle">${tick.label}</text>
    </g>`;
      })
      .join('')}
    <path
      d="${linePath}"
      fill="none"
      stroke="url(#${chartId}-line)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="${areaPath}" fill="url(#${chartId}-fill)" />
    <circle cx="${lastX.toFixed(2)}" cy="${lastY.toFixed(2)}" r="3.5" fill="white" stroke="url(#${chartId}-line)" stroke-width="2" />
    <text
      x="${Math.min(lastX + 6, chartWidth - 2).toFixed(2)}"
      y="${Math.max(lastY - 8, 12).toFixed(2)}"
      fill="currentColor"
      font-size="9"
      opacity="0.7"
    >
      ${formatNav(lastEntry?.nav ?? navMin)}
    </text>
  </svg>
  <div class="mt-3 grid grid-cols-3 gap-3 text-xs text-zinc-500 dark:text-zinc-400">
    <div>近 30 天: ${metrics.get('近30天') ?? '-'}</div>
    <div>近 90 天: ${metrics.get('近90天') ?? '-'}</div>
    <div>当前回撤: ${metrics.get('当前回撤') ?? '-'}</div>
  </div>
</div>

## 币种表现

| 币种 | size | avg | price | 浮盈 | 浮盈率 | value |
| --- | --- | --- | --- | --- | --- | --- |
${assets
    .map(
      (asset) =>
        `| ${asset.symbol} | ${asset.size} | ${asset.avg} | ${asset.price} | ${asset.pnl} | ${asset.pnlRate} | ${asset.value} |`
    )
    .join('\n')}

## 当日操作

| 时间 | 币种 | 动作 | 数量 | 价格 | 成交额 | 利润 |
| --- | --- | --- | --- | --- | --- | --- |
${operations
    .map((op) => {
      if (op.raw) {
        return `| ${op.raw} | - | - | - | - | - | - |`;
      }
      return `| ${op.time} | ${op.symbol} | ${op.side} | ${op.size} | ${op.price} | ${op.amount} | ${op.profit} |`;
    })
    .join('\n')}

<details class="mt-6">
  <summary class="cursor-pointer text-sm text-zinc-500">查看原始文本</summary>
  <pre class="mt-3 whitespace-pre-wrap text-xs text-zinc-500">{${rawTextLiteral}}</pre>
</details>
`;

await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, `${slugDate}.mdx`);
await fs.writeFile(outPath, mdx, 'utf8');
console.log(`Saved ${outPath}`);
