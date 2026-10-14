---
title: 「模组更新」魔女因子扩散中ー魔法少女的魔女审判拓展
author: uranv
date: '2026-02-01T12:20:00+09:00'
math: ture
slug: 'rw-mod-manosaba-update-4'
tags:
  - 'Rimworld'
  - 'Mod'
  - 'Update'
  - '1.6'
featured: false
description: "v1.0.4 → v1.0.5 错误修复与改进。"
cover:
  image: "/resources/cover-manosaba.png"
  alt: "Manosaba-cover"
---

## 模组名：魔女因子扩散中ー魔法少女的魔女审判拓展

<img src="/resources/cover-manosaba.png" alt="Manosaba-cover" style="width:500px;display: block; margin: 0 auto"/>

### 更新内容

**版本:** v1.0.4 $\to$ v1.0.5

修正：

- 魔女化进度缺少下限限制，导致有时严重度减少至零消失的问题 (`HediffComp_Progress`)

- 魔女残骸征召状态时的控制时间额外倍率被错误应用到非征召状态的问题 (`HediffComp_Countdown_Mutant`)

- 魔女愈疗相关效果在倒地时的减少倍率被错误应用到由后处理系数影响的单位的问题 (`HediffComp_NarehateHeal`)

- 禁用器官手术 patch 不生效的错误 (`Patch_Narehate_NoHarvestOrgan`)


优化：

- 将与游戏内时间相关的 tick 变化逻辑改用 `CompPostTickInterval`

- `PawnRenderNodes` 相关代码优化，减少不必要的自定义类

- 魔女残骸的 `PawnRenderNodes` 优化，现在残骸在床上时像正常 pawn 一样不显示身体，缺失头部时也会反映在贴图中；此外在头部缺失时床上仍会绘制身体以防止什么都不显示

- 优化了月代雪头发的侧面贴图

- 在相关 hediff 说明中补充了关于魔女愈疗的器官自愈能力的描述

- 优化了残骸能力“极速愈疗”的说明文本，现在数据将以“每秒”而不是“每日”为单位，便于短持续时间技能的直观理解

### 交流与反馈


**Github仓库:** https://github.com/uranv/ManosabaExpansion

**Steam创意工坊:** https://steamcommunity.com/sharedfiles/filedetails/?id=3651142974
