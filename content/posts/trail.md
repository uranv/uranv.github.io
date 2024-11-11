---
title: blbl-ui-opt
author: uran
date: '2024-11-11'
---

# bilibili ui optimization

<!-- 页面上代码块 -->

<pre id="code-block">
  // 示例代码内容
  console.log("test");
</pre>

<!-- 下载按钮 -->
<button onclick="downloadCode()">Download</button>

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
    downloadLink.download = "code.txt"; // 指定下载文件名
    
    // 触发下载
    downloadLink.click();
    
    // 释放 Blob URL
    URL.revokeObjectURL(url);
}
</script>