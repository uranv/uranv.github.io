---
title: 「模组更新」更好的储存筛选
author: uranv
date: '2026-06-29T03:09:58+09:00'
math: ture
slug: 'rw-mod-filter-update-1'
tags:
  - 'Rimworld'
  - 'Mod'
  - 'Update'
  - '1.6'
featured: false
description: "v1.0.0 → v1.0.1 错误修复与改进。"
cover:
  image: "/resources/cover-betterfilter.png"
  alt: "BetterFiltter-cover"
---

## 模组名: 更好的储存筛选 (Better Filter)

<img src="/resources/cover-betterfilter.png" alt="BetterFiltter-cover" style="width:500px;display: block; margin: 0 auto"/>

### 更新内容

**版本:** v1.0.0 $\to$ v1.0.1

- 修复了当储存器物品目录不是根节点时，过滤器分类无法正常显示的问题

- 修复了当储存器物品目录不是根节点时，展开一级按键的非预期行为

- 修复了高级过滤器中预览物品树与实际储存区物品树不一致的问题

- 优化了模组新增过滤器的显示规则，现在互斥的一对过滤器总是同时显示、同时隐藏

  > 以有无耐久筛选为例，当储存器所有物品均有耐久时，无耐久筛选自然隐藏，此时有耐久筛选虽然显示，但是作用是平凡的全部禁止，因此应当同时隐藏
  
- 修复了不安全的物品定义，可能在 `⁠RimWorld.PawnApparelGenerator+PossibleApparelSet.GiveToPawn(Verse.Pawn pawn)` 方法中引起 `⁠System.InvalidCastException` 错误 

### 发布与反馈

**Github仓库:** https://github.com/uranv/BetterFilter

**Steam创意工坊:** https://steamcommunity.com/sharedfiles/filedetails/?id=3753101034
