---
title: 「模组更新」魔女因子扩散中ー魔法少女的魔女审判拓展
author: uranv
date: '2026-02-14T21:40:00+09:00'
math: ture
slug: 'rw-mod-manosaba-update-5'
tags:
  - 'Rimworld'
  - 'Mod'
  - 'Update'
  - '1.6'
featured: false
description: "v1.0.5 → v1.0.6 错误修复与改进。"
cover:
  image: "/resources/cover-manosaba.png"
  alt: "Manosaba-cover"
---

## 模组名：魔女因子扩散中ー魔法少女的魔女审判拓展

<img src="/resources/cover-manosaba.png" alt="Manosaba-cover" style="width:500px;display: block; margin: 0 auto"/>

### 更新内容

**版本:** v1.0.5 $\to$ v1.0.6

游戏内容与平衡性：

- 魔女因子随机获得时排除临时的任务殖民者和殖民地奴隶

- 魔女因子的超凡基因能够直接从基因提取器中获取，降低流程中后期获得魔女因子难度

优化与兼容性：

- 魔女视觉修改为仅匹配 `GraphicFor(Pawn p)` 方法，避免部分模组使用包含复杂参数的 `GraphicFor` 重载时 `AccessTools.Method` 的匹配问题

- 设置中添加“使用独特体型生成月代雪”，缓解使用部分体型替换模组时与月代雪服装贴图冲突问题

- 日语设置中部分文本换行位置修正

错误修正：

- `Languages/English/Keyed/YukiCompVisitor.xml` 中的文本错误

- 从月代雪 ThingDef 注入对话 comp ，修正读存档过程中 `Comp_YukiVisitor` 丢失的问题

### 交流与反馈


**Github仓库:** https://github.com/uranv/ManosabaExpansion

**Steam创意工坊:** https://steamcommunity.com/sharedfiles/filedetails/?id=3651142974
