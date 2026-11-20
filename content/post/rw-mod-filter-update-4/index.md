---
title: 「模组更新」更好的储存筛选
author: uranv
date: '2026-11-20T11:27:06+09:00'
math: ture
slug: 'rw-mod-filter-update-4'
tags:
  - 'Rimworld'
  - 'Mod'
  - 'Update'
  - '1.6'
  - '1.7'
featured: true
description: "v1.0.3 → v1.1.0 新版本兼容，修复错误与改进。"
cover:
  image: "/resources/cover-betterfilter.png"
  alt: "BetterFiltter-cover"
---

## 模组名: 更好的储存筛选 (Better Filter)

<img src="/resources/cover-betterfilter.png" alt="BetterFiltter-cover" style="width:500px;display: block; margin: 0 auto"/>

### 更新内容

**版本:** v1.0.3 $\to$ v1.1.0

对应提交 `9260669` $\to$ `8546353`，共 29 个文件，+2041 / −896 行。

兼容：

- 支持游戏 1.7 预览版，1.6 继续支持。程序集按版本分目录：`16/Assemblies` 与 `17/Assemblies`，由 `LoadFolders.xml` 选择。
- 工程拆为两个：`Source/BetterFilter6.csproj`（net48，`Krafs.Rimworld.Ref` 1.6.4871）与 `Source/BetterFilter7.csproj`（net10.0，`Krafs.Rimworld.Ref` 1.7.5014-unstable）。两个工程编译同一份 `Source/Contents` 源码。
- 补丁注册改为显式传入本模组程序集。Harmony 3 已将无参数的 `PatchAll()` 标为过时，它靠调用栈推断程序集，在 1.7 的运行时下可能推断错，导致全部补丁静默失效 (`HarmonyPatchesMain`)。

修正：

- 修复其他模组的过滤器在储存列表中消失的问题（如 Implant Salvage 的「尸体有/无植入体」）。原因：隐藏列表按「筛选器」分类节点计算，该节点下只有本模组的两个占位物品，其他模组的过滤器因此被判为无可匹配物品。现在隐藏列表按真实的显示根节点计算，并且只移动标记为「移入分组」的过滤器 (`Patch_FilterCategoryOrder`)。
- 修复 Stack Gap 的堆叠限制滑条消失的问题。原因：本模组用返回 `false` 的 Prefix 整体替换了 `ThingFilterUI.DoThingFilterConfigWindow`，其他模组对该方法的 Transpiler 因此失效。现在改为 Transpiler，只把原版的表头部分替换为 `DrawHeader`，方法其余部分保持原样 (`Patch_UIButtonOperations`)。

新增：

- 数值与枚举值模块过滤器改为按 XPath 目标匹配，如 `Defs/ThingDef/stackLimit`、`Defs/ThingDef/stats/MarketValue`、`Defs/ThingDef/weaponTags/li`、`Defs/ThingDef/verbs/li[verbClass='Verb_Shoot']/range`。路径是一个受校验的 XPath 子集，直接在已加载的 `ThingDef` 对象上解析，匹配时不把 Def 序列化为 XML；枚举值的可选项从 `DefDatabase` 中收集 (`RuntimeFilterPath`、`FilterComponent_Numeric`、`FilterComponent_Enum`)。
- 内置匹配属性 (`FilterTargetCatalog`)：
  - 数值：堆叠上限 `stackLimit`、质量 `stats/Mass`、市场价值 `stats/MarketValue`
  - 枚举值：武器标签 `weaponTags/li`、贸易标签 `tradeTags/li`、科技等级 `techLevel`、衣物标签 `apparel/tags/li`、衣物层 `apparel/layers/li`、覆盖部位 `apparel/bodyPartGroups/li`
- 可添加自定义匹配属性，填写「类型、显示名称、目标路径」，保存前校验路径语法与类型 (`Dialog_EditFilterTarget`)。
- 高级筛选器的筛选器组改为 XML 文件，存放在 `Config/BetterFilter/SavedFilters/*.xml`，支持保存、载入、追加。模组变动后失效的目标或取值显示为灰色并原样保留 (`FilterSetStorage`、`Dialog_SaveFilter`、`Dialog_LoadFilter`)。
- 旧版 `.txt` 筛选器组可在模组设置「介绍」页一键转换为 XML，原文件保留 (`FilterSetStorage.ConvertLegacyTxtFiles`)。
- 过滤器分为「静态」与「动态」两类 (`FilterWorkerCatalog`)：
  - 静态：只读取物品 Def。可通过「应用」写入具体物品许可，可作为模块过滤器选项，在高级筛选器的物品列表中隐藏。
  - 动态：读取物品实例（如是否为死者衣物）。保留在物品列表中，不参与「应用」。
  - 原版与本模组的过滤器使用固定分类。其他模组的过滤器自动检测：读取 `Matches(Thing)` 的 IL，物品参数只以 `t.def` 形式使用（或只做空值判断）时判为静态，其余判为动态。判为动态的过滤器可在设置中手动改为静态。
- 载入存档或开始新游戏后，发现其他模组的未登记过滤器时登记并发信，列出名称、类型与来源 (`Patch_NewFilterLetter`)。

优化：

- 模组设置重做为三页，统一为「说明 → 列表 → 底部按钮」布局 (`BetterFilterMod`、`BetterFilterSettings`)：
  - 「介绍」：功能说明、新过滤器提醒开关、旧版 TXT 转换按钮。
  - 「过滤器设置」：按来源罗列全部已加载过滤器（原版与 DLC、本模组、其他模组按「模组名 (packageId)」），每个过滤器三项设置：类型、移入分组、应用。不可配置或无可匹配物品的过滤器显示为灰色，并在提示中说明原因。
  - 「匹配属性设置」：分「数值」「枚举值」罗列。左键切换启用；内置属性只能启用或禁用；自定义属性禁用后右键删除。
- 其他模组的过滤器默认留在原位，默认不参与「应用」，可在「过滤器设置」页逐个开启。
- 模块过滤器的可选项改为全部「静态」过滤器，与「应用」范围分开设置 (`FilterComponent_Worker`)。
- 命令行输入不再出现在高级筛选器界面，解析器仅用于旧版 TXT 转换 (`Dialog_CommandInput`)。

升级注意：

- 旧版「可应用的过滤器」页的勾选不会迁移，升级后恢复默认：原版与本模组的静态过滤器全部参与「应用」。
- 「移入分组」只对位于当前显示根分类及其上级分类的过滤器生效。挂在下级分类的过滤器（如挂在「尸体」下的）勾选后仍留在原位。
- 把其他模组的过滤器移入「筛选器」分组后，该模组锚定在此过滤器上的自绘界面可能消失，取消勾选即可恢复。

已知问题：

- 1.7 预览版在 macOS 上，触控板轻点 ✓/✗ 勾选框时经常不切换，重按正常。此为测试版原版存在的交互问题，本模组设置页的勾选框也受影响；「全部清除 / 反选 / 全部允许」与展开收起按钮正常。问题来源可能是 ✓/✗ 勾选框每次绘制时轮询“本帧是否按下 / 本帧是否松开”；导致触控板轻点时，按下和松开落在同一帧，两个标记在该帧的每一遍界面绘制中都为真，勾选框每遍都切换一次，绘制遍数为偶数时状态切回原样，为奇数时才生效，所以“偶尔正常”；「清空 / 反选 / 全选」和展开收起按钮走的是排队的鼠标事件，所以不受影响。

**历史版本:**

- [v1.0.3](https://uranv.github.io/posts/rw-mod-filter-update-3/)
- [v1.0.2](https://uranv.github.io/posts/rw-mod-filter-update-2/)
- [v1.0.1](https://uranv.github.io/posts/rw-mod-filter-update-1/)
- [v1.0.0](https://uranv.github.io/posts/rw-mod-filter/)

### 发布与反馈

**Github仓库:** https://github.com/uranv/BetterFilter

**Steam创意工坊:** https://steamcommunity.com/sharedfiles/filedetails/?id=3753101034
