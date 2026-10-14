---
title: 「模组更新」魔女因子扩散中ー魔法少女的魔女审判拓展
author: uranv
date: '2026-01-24T22:25:00+09:00'
math: ture
slug: 'rw-mod-manosaba-update-2'
tags:
  - 'Rimworld'
  - 'Mod'
  - 'Update'
  - '1.6'
featured: false
description: "v1.0.2 -> v1.0.3 错误修复与改进。"
cover:
  image: "/resources/cover-manosaba.png"
  alt: "Manosaba-cover"
---

## 模组名：魔女因子扩散中ー魔法少女的魔女审判拓展

<img src="/resources/cover-manosaba.png" alt="Manosaba-cover" style="width:500px;display: block; margin: 0 auto"/>

### 更新内容

**版本:** v1.0.2 $\to$ v1.0.3

修复：

- 修复了一个魔女残骸洗脑仪式中的数据保存方法错误，该错误会导致在执行残骸洗脑仪式过程中存档发生报错（`PsychicRitualToil_NarehateTrans`）

- 修复了 Severity 改变的计算方法错误，该错误会导致 Pawn 魔女化进度接近 100% 后偶尔发生无法继续变化进度和魔女化的问题（`HediffComp_Progress`）

平衡性调整：

- 现在 Pawn 具有魔女残骸（`UmHediffNarehate`）时，其器官会被标记为脏，从而不可被摘取；

- 同样地，现在 Pawn 作为月代雪（`UmHediffYukiDummy`）时，其器官会被标记为脏，从而不可被摘取；

- 进一步增加了获得第一个魔女因子前月代雪访问事件（`UmIncidentYukiVisitor`）的发生概率，保证在多模组事件环境下仍有充足权重在早期触发事件；

- 同时小幅度增加首次发生后（即默认情况下）月代雪访问事件（`UmIncidentYukiVisitor`）的发生权重

### 交流与反馈


**Github仓库:** https://github.com/uranv/ManosabaExpansion

**Steam创意工坊:** https://steamcommunity.com/sharedfiles/filedetails/?id=3651142974
