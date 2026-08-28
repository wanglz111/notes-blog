---
title: Resume
description: Lucas Wang's resume covering education, professional experience, projects, and core skills.
pubDate: 2026-04-27
pinned: true
tags: [resume, english]
---

## Personal Information
- **Name**: Lucas Wang
- **Date of Birth**: Sep 1997
- **Email**: Lucas.wang21@foxmail.com
- **GitHub**: [https://github.com/wanglz111](https://github.com/wanglz111)
- **Wallet address**: 0x6030e32063685f2001305ffa69dfb790472906da

## Education
- **Master's Degree** | Xi'an Jiaotong-Liverpool University | Sep 2021 - Apr 2023

  **Major**: Financial Computing

- **Bachelor's Degree** | Nanjing University of Finance & Economics | Sep 2015 - Jun 2019

  **Major**: Mathematics and Applied Mathematics

## Professional Experience
### Cian | Smart Contract Testing & Security Analysis Engineer | **Jan 2026 - Aug 2026**
- As a full-time employee, owned test development and security testing for all Solidity modules of **Bondify** ([bondify.xyz](https://bondify.xyz/)).
- Bondify is an RWA **Loop + Sell YT** project with proprietary-fund Loop modules and Loop modules built on Aave/Morpho; handled testing from solution review and development integration through launch verification.
- Designed normal, abnormal, boundary, and attack scenarios around fund flows, state transitions, and key invariants, with emphasis on Owner/Admin/Role permissions, upgrades, pausing, parameter changes, external calls, allowance limits, repeated execution, and failed transaction paths.
- Provided frontend and operations teams with contract interfaces, yield/accrual formulas, precision and boundary-condition guidance; supported wallet signatures, transaction states, events, RPC, deployment, and network configuration, and diagnosed production issues using transaction hashes, events, and contract state.

### WatchPug Audit Team | Testing / Audit Engineer | **Dec 2021 - Dec 2025**
*Team profile: WatchPug is a small audit team that reached second place on the all-time [Code4rena leaderboard](https://code4rena.com/leaderboard?timeframe=All%20time).*
- As a core audit member, participated in approximately **100** DeFi/Web3 smart contract security audit and testing projects; regularly participated in public Code4rena and Sherlock audit contests from Dec 2021 to Jun 2023.
- Led or contributed to audits of capital-intensive DEX, yield, lending, and perpetual protocols, covering Uniswap V2/V3/V4, Aave, and GMX forks; designed test scenarios from fund flows, state machines, and permission boundaries.
- Focused on reentrancy, privilege escalation, price manipulation, liquidation, precision/rounding, duplicate claims, signature replay, and external-call risks, writing PoCs with Solidity/TypeScript, ethers.js, Foundry/Hardhat, Tenderly, and mainnet forks.
- Used RPC, events, transaction hashes, and contract state to diagnose issues, produce risk reports and remediation advice, and verify fixes; provided ongoing monthly retainer security reviews and focused audits for **Pendle, Arrakis, Treehouse, Orange (InsureDAO), and Gelato**.

### Suzhou Rural Commercial Bank | Wealth Manager | Jul 2019 - Jun 2021
- Managed client asset allocation and assessed the risks of financial products.

## Project Experience
### Live aWETH Discount Flash-Loan Arbitrage (Arbitrum / Aave)
- Identified the aWETH/WETH discount opportunity on Arbitrum after the Kelp incident; analyzed Aave redemption liquidity, pool depth, and failure conditions, then designed and executed a flash-loan arbitrage route.
- Validated the trade with mainnet forks and RPC before deploying it live, achieving **0.5292 WETH** net profit on one transaction and **1.5859 WETH** in cumulative realized profit across multiple on-chain arbitrage trades. See the [technical write-up](https://blog.gleaftex.com/posts/20260427-aweth-discount-arb-poc/) and [Arbiscan transaction](https://arbiscan.io/tx/0xf1227f61fad9f8e6c28aa559b7a8871e97c3fe634fcc66d3ce2dc6fa70931797).

### Automated Trading Strategy System (Python)
- Implemented a VWAP-based automated trading strategy with order placement, take-profit, risk controls, retry handling, and position recovery.

### Sandclock DeFi Strategy Integration & Yield Algorithm Optimization (Solidity)
- Integrated staking and yield strategies into the Sandclock multichain ecosystem; implemented principal/yield splitting, strategy comparison, compounding, and yield calculations in Solidity, and verified precision and settlement logic.

## Skills
- **Languages & Tools**: Solidity, TypeScript, Python; ethers.js, Foundry, Hardhat, and Tenderly; familiar with EVMs, wallet signatures, transactions/Gas/Nonce, RPC, events, and Approve/Allowance.
- **Security Testing**: Reentrancy, privilege escalation, replay attacks, front-running/MEV, approvals, precision boundaries, repeated execution, timestamp/block dependencies, DoS/Gas, malicious external contracts, pausing, and proxy upgrade security.
- **Delivery**: Design test cases from economic models, fund flows, and state machines; reproduce, localize, and verify fixes with mainnet forks and on-chain evidence; use tools such as Codex to assist code analysis and test-script development.

## Languages
- **English**: CET-6 / IELTS 6.0
- **Chinese**: Native

## Summary
- Background in mathematics, finance, and programming, with years of DeFi contract auditing, testing, and security analysis experience; particularly strong in economic models, mathematical reasoning, fund flows, and permission boundaries.
- Able to independently complete code review, test design, PoC reproduction, risk communication, remediation regression testing, and launch acceptance, using on-chain data to clearly localize issues.
