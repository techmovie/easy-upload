# easy-seed

## 构建

`npm run build`
`npm run dev`

## 本地调试
新建用户脚本,然后将`@require`下的文件路径改为项目所在目录。

```// ==UserScript==
// @name         easy seed
// @namespace    https://github.com/techmovie/easy-seed
// @version      0.3
// @description  easy seeding for different trackers
// @author       birdplane
// @match        http*://*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      file:///Users/em/easy-seed/.cache/easy-seed.user.js
// @note
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();```
