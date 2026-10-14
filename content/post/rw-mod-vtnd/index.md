---
title: 「新模组发布」虚空之拥不是怪诞不经
author: uranv
date: '2025-12-15T06:54:00+09:00'
slug: rw-mod-vtnd
tags:
  - 'Rimworld'
  - 'Mod'
  - 'New'
  - '1.6'
featured: true
description: "移除虚空之拥附带的隐藏负面影响，阻止拥有\"虚空之拥\"但是没有\"怪诞不经\"特性的小人触发相关负面社交行为。"
cover:
  image: "/resources/cover-vtnd.png"
  alt: "VoidTouchedIsNotDisturbing-cover"
---

## 模组名：虚空之拥不是怪诞不经 (Void Touched is not Disturbing)

<img src="/resources/cover-vtnd.png" alt="VoidTouchedIsNotDisturbing-cover" style="width:500px;display: block; margin: 0 auto"/>

### 简介

你是否想过虚空之拥作为异象DLC的通关奖励，为什么要隐藏绑定“怪诞不经”的特性，导致想要无负面享受灵能超人就必须要靠创伤激发之类禁用社交？

这个mod禁用了非"怪诞不经"小人的"阴森之语"，"非人之谈"，"诡异闲谈"等社交行为，避免能说话的虚空之拥小人导致大面积减心情、减好感。

### 兼容性与性能

可以与几乎任何没有修改相同内容的模组同时使用。

几乎无性能损耗，单次调用~1us，仅pawn互动时调用。

### 发布地址

**Github仓库:** [https://github.com/uranv/VoidTouchedIsNotDisturbing](https://github.com/uranv/VoidTouchedIsNotDisturbing)

**Steam创意工坊:** [https://steamcommunity.com/sharedfiles/filedetails/?id=3622073102](https://steamcommunity.com/sharedfiles/filedetails/?id=3622073102)

### 代码原理

本模组使用非常简单的Harmony Postfix。

原版处理"虚空之拥"小人时，他们的社交行为会使用具有特性"怪诞不经"的小人发生负面社交行为时相同的方法。因此通过拦截所有“IsDisturbing”并仅放行具有"怪诞不经"的Postfix来阻止"虚空之拥"的上述行为。

```c#
[StaticConstructorOnStartup]
    public static class HarmonyPatches
    {
        static HarmonyPatches()
        {
            Harmony harmony = new Harmony("rimworld.uranv.voidtouchednotdisturbing");
            harmony.PatchAll();
        }
    }
    [HarmonyPatch(typeof(Pawn_StoryTracker), "IsDisturbing", MethodType.Getter)]
    class Pawn_StoryTracker_IsDisturbing_Patch
    {
        [HarmonyPostfix]
        public static void IsDisturbingPostfix(ref bool __result, Pawn_StoryTracker __instance)
        {
            if (__result && !__instance.traits.HasTrait(TraitDefOf.Disturbing))
            {
                __result = false;
                //Log.Message("[Modify Successed] Patched IsDisturbing for a Void-Touched pawn.");
            }
        }
    }
```

---



