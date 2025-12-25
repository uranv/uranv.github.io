---
title: 【Loon】Bilibili插件修改（plugin部分）
author: uran
date: '2024-11-11'
slug: bili-rm-ads-plugin
---
# bilibili remove ads
<!-- 页面上代码块 -->

<pre id="code-block">
#!name = 哔哩去广告-修改
#!desc = 过滤哔哩哔哩广告、移除青少年模式弹窗和交互式弹幕、移除无用功能和链接跟踪参数。此插件仅建议iOS 15以上设备使用，且必须启用MitM-over-HTTP/2功能。
#!openUrl = https://apps.apple.com/app/id736536022
#!author = Maasea[https://github.com/Maasea], RuCu6[https://github.com/RuCu6], kokoryh[https://github.com/kokoryh], 可莉🅥[https://github.com/luestr/ProxyResource/blob/main/README.md], uranv[https://github.com/uranv]
#!tag = 去广告
#!system = 
#!system_version = 15
#!loon_version = 3.2.1(749)
#!homepage = https://github.com/luestr/ProxyResource/blob/main/README.md
#!icon = https://raw.githubusercontent.com/luestr/IconResource/main/App_icon/120px/Bilibili.png
#!date = 2024-11-08 14:15:31

[General]
force-http-engine-hosts = :8000

[Rule]
# 开屏广告
URL-REGEX, ^http:\/\/upos-sz-static\.bilivideo\.com\/ssaxcode\/\w{2}\/\w{2}\/\w{32}-1-SPLASH, REJECT-DICT
URL-REGEX, ^http:\/\/[\d\.]+:8000\/v1\/resource\/\w{32}-1-SPLASH, REJECT-DICT

[Rewrite]
# 开屏广告
^https:\/\/(?:api\.bilibili\.com\/x\/mengqi\/v1\/resource|app\.bilibili\.com\/x\/resource\/peak\/download) reject-dict

# 满意度调研
^https:\/\/api\.bilibili\.com\/x\/v2\/dm\/qoe\/show\? reject-dict

# 大会员广告
^https:\/\/api\.bilibili\.com\/x\/vip\/ads\/materials\? reject-dict

# 直播广告
^https:\/\/api\.live\.bilibili\.com\/xlive\/e-commerce-interface\/v1\/ecommerce-user\/get_shopping_info\? reject-dict

# 移除皮肤推送
^https:\/\/app\.bilibili\.com\/x\/resource\/show\/skin\? response-body-json-del data.common_equip

# 移除右上角活动入口
^https:\/\/app\.bilibili\.com\/x\/resource\/top\/activity\? mock-response-body data-type=json status-code=200 data="{ "code": -404, "message": "啥都木有", "ttl": 1, "data": null }"

# 屏蔽默认搜索框关键词
^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.interface\.v1\.Search\/DefaultWords$ reject-dict

# 流量卡推荐
^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.view\.v1\.View\/TFInfo$ url reject-dict

# IP请求、地理位置请求 //api.bilibili.com
^https:\/\/app\.bilibili\.com\/x\/resource\/ip reject-dict
^https:\/\/api\.bilibili\.com\/x\/web-interface\/zone\?jsonp reject-dict

# 移除直播间链接跟踪参数
(^https:\/\/live\.bilibili\.com\/\d+)(\/?\?.*) 302 $1

# 移除视频链接跟踪参数
(^https:\/\/(?:www|m)\.bilibili\.com\/video\/(?:BV\w{10}|av\d{9}))(\/?\?.*) 302 $1

[Script]
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.dynamic\.v2\.Dynamic\/DynAll$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除动态页面广告
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.interface\.v1\.Teenagers\/ModeStatus$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除青少年模式弹窗
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.show\.v1\.Popular\/Index$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除热门话题
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.playurl\.v1\.PlayURL\/PlayView$ script-path=https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除播放页面广告 playview
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.playerunite\.v1\.Player\/PlayViewUnite$ script-path=https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除播放页面广告 playerunite
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.view\.v1\.View\/(?:View|ViewProgress)$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除播放页面广告 view
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.app\.viewunite\.v1\.View\/(?:RelatesFeed|View)$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除播放页面广告 viewunite
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.community\.service\.dm\.v1\.DM\/DmView$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除交互式弹幕
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.main\.community\.reply\.v1\.Reply\/MainList$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除评论区广告
http-response ^https:\/\/(?:app\.bilibili\.com|grpc\.biliapi\.net)\/bilibili\.polymer\.app\.search\.v1\.Search\/SearchAll$ script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_proto_kokoryh.js, requires-body = true, binary-body-mode = true, tag = 移除搜索结果广告

# 上部为Proto处理，下部为JSON配置处理



# 移除开屏广告
http-response ^https:\/\/app\.bilibili\.com\/x\/v2\/splash\/(?:brand\/list|event\/list2|list|show) script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_remove_ads.js, requires-body = true, tag = 移除开屏广告

# 移除首页推荐广告
http-response ^https:\/\/app\.bilibili\.com\/x\/v2\/feed\/index script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_remove_ads.js, requires-body = true, tag = 移除首页推荐广告

# 精简首页顶部标签
http-response ^https:\/\/app\.bilibili\.com\/x\/resource\/show\/tab\/v2\? script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_remove_ads.js, requires-body = true, tag = 精简首页顶部标签

# 移除热搜广告
http-response ^https:\/\/app\.bilibili\.com\/x\/v2\/search\/square\? script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_remove_ads.js, requires-body = true, tag = 移除热搜广告

# 移除观影页广告
http-response ^https:\/\/api\.bilibili\.com\/pgc\/page\/(?:bangumi|cinema\/tab) script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_remove_ads.js, requires-body = true, tag = 移除观影页广告

# 移除直播间广告
http-response ^https:\/\/api\.live\.bilibili\.com\/xlive\/app-room\/v1\/index\/getInfoByRoom\? script-path = https://kelee.one/Resource/Script/Bilibili/Bilibili_remove_ads.js, requires-body = true, tag = 移除直播间广告

# 精简我的页面
http-response ^https:\/\/app\.bilibili\.com\/x\/v2\/account\/(?:mine|myinfo) script-path = https://raw.githubusercontent.com/uranv/blbl-uiopt/refs/heads/main/Bilibili_remove_ads.js, requires-body = true, tag = 精简我的页面

[MitM]
hostname = ap?.bilibili.com, grpc.biliapi.net, www.bilibili.com, m.bilibili.com, *live.bilibili.com

</pre>

<!-- 下载按钮 -->
<button onclick="downloadCode()" type="button" style="
  padding: 6px 14px;
  background-color: #aaaaaa;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
">
  Download
</button>

<script>
function downloadCode() {
    // 获取代码块内容
    const codeContent = document.getElementById("code-block").innerText;

    // 创建 Blob 对象并指定文件类型
    const blob = new Blob([codeContent], { type: "text/plain" });
    
    // 生成下载链接
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "Bilibili_remove_ads.plugin"; // 指定下载文件名
    
    // 触发下载
    downloadLink.click();
    
    // 释放 Blob URL
    URL.revokeObjectURL(url);
}
</script>
