---
title: 个人简历
description: Lucas Wang的个人简历，涵盖教育背景、工作经历、项目经验及技能优势。
pubDate: 2026-04-27
pinned: true
tags: [resume]
---

## 个人信息
- **姓名**：Lucas Wang
- **出生年月**：1997.9
- **邮箱**：Lucas.wang21@foxmail.com
- **GitHub**：[https://github.com/wanglz111](https://github.com/wanglz111)
- **Wallet address**：0x6030e32063685f2001305ffa69dfb790472906da

## 教育背景
- **硕士** | 西交利物浦大学 | 2021.9 - 2023.4

  **专业**：Financial Computing

- **本科** | 南京财经大学 | 2015.9 - 2019.6

  **专业**：数学与应用数学

## 工作经历
### Cian | 智能合约测试与安全分析工程师 | **2026.01 – 2026.08**
- 作为正式员工负责 **Bondify**（[bondify.xyz](https://bondify.xyz/)）全部 Solidity 模块的测试开发与安全测试。
- Bondify 是 RWA 资产 **Loop + Sell YT** 项目，包含自有资金 Loop 模块，以及基于 Aave/Morpho 的 Loop 模块；负责从方案评审、开发联调到上线核验的测试工作。
- 围绕资金流、状态变化和关键不变量设计正常、异常、边界及攻击场景，重点验证 Owner/Admin/Role 权限、升级/暂停/参数修改、外部调用、授权额度、重复执行和异常交易路径。
- 为前端和运营团队提供合约接口、收益/计息公式、精度与边界条件说明，协助完成钱包签名、交易状态、Event、RPC、部署和网络配置对接，并依据交易 Hash、Event 和合约状态定位线上问题。

### WatchPug Audit Team | 测试 / 审计工程师 | **2021.12 – 2025.12**
*团队简介：WatchPug 是一支小型审计团队，曾获 [Code4rena 总榜第二名](https://code4rena.com/leaderboard?timeframe=All%20time)。*
- 作为核心审计成员，累计参与约 **100 个** DeFi / Web3 智能合约安全审计与测试项目；2021.12–2023.06 期间长期参与 Code4rena、Sherlock 等公开竞赛审计。
- 主导或参与 DEX、收益、借贷、永续等资金类协议审计，覆盖 Uniswap V2/V3/V4、Aave、GMX Fork 等协议；从资金流、状态机和权限边界设计测试场景。
- 重点验证重入、权限越权、价格操纵、清算、精度/舍入、重复领取、签名重放和外部调用等风险，使用 Solidity/TypeScript、ethers.js、Foundry/Hardhat、Tenderly 及主网 Fork 编写 PoC。
- 结合 RPC、Event、交易 Hash 和合约状态定位问题，输出风险报告与修复建议，并跟进回归验证；对 **Pendle、Arrakis、Treehouse、Orange（InsureDAO）、Gelato** 等项目持续提供按月 Retainer 形式的安全复核与小范围审计支持。

### 苏州农村商业银行 | 理财经理 | 2019.7 - 2021.6
- 负责客户资产配置与金融产品风险评估。

## 项目经验
### aWETH 负溢价闪电贷实盘套利（Arbitrum / Aave）
- Kelp 事件后主动捕捉 Arbitrum 上 aWETH/WETH 折价机会，分析 Aave 兑付流动性、交易池深度与套利失败条件，设计并执行闪电贷套利路径。
- 通过主网 Fork 与 RPC 完成交易验证并投入实盘，单笔净利润 **0.5292 WETH**，多笔链上套利累计实际净利润 **1.5859 WETH**。详见 [技术复盘文章](https://blog.gleaftex.com/posts/20260427-aweth-discount-arb-poc/) 与 [Arbiscan 实盘交易](https://arbiscan.io/tx/0xf1227f61fad9f8e6c28aa559b7a8871e97c3fe634fcc66d3ce2dc6fa70931797)。

### 自动化交易策略系统（Python实现）
- 实现基于 VWAP 的自动交易策略，包含下单、止盈、风险控制、异常重试和仓位恢复。

### Sandclock DeFi 策略集成与收益算法优化（Solidity实现）
- 在 Sandclock 多链生态集成质押和收益策略；用 Solidity 实现本金/收益拆分、策略比较、复投及收益计算，并验证精度和结算逻辑。

## 技能与优势
- **语言与工具**：Solidity、TypeScript、Python；ethers.js、Foundry、Hardhat、Tenderly；熟悉 EVM、钱包签名、交易/Gas/Nonce、RPC、Event、Approve/Allowance。
- **安全测试**：重入、权限/越权、Replay Attack、Front-running/MEV、授权、精度边界、重复执行、时间戳/区块依赖、DoS/Gas、恶意外部合约、暂停和 Proxy 升级安全。
- **交付能力**：能从经济模型、资金流和状态机设计用例，使用主网 Fork 与链上证据复现、定位并验证修复；熟练使用 Codex 等 AI 工具辅助代码分析和测试脚本编写。

## 语言能力
- **英语**：英语六级 / 雅思 6
- **中文**：母语

## 自我评价
- 数学、金融与编程背景；多年 DeFi 合约主审计、测试和安全分析经验，擅长经济模型、数学证明、资金流和权限边界。
- 能独立完成代码评审、测试设计、PoC 复现、风险说明、修复回归和上线验收，并用链上数据清晰定位问题。
