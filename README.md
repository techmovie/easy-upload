# easy-seed

## 构建

`npm run build`

## 本地调试
新建用户脚本,然后将`@require`下的文件路径改为项目所在目录。

```// ==UserScript==
// @name         easy seed
// @namespace    https://github.com/techmovie/easy-seed
// @version      0.3
// @description  easy seeding for different trackers
// @author       birdplane
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        https://hdbits.org/offer.php
// @match        http*://*/upload*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      file:///Users/USER_NAME/../easy-seed/.cache/easy-seed.user.js
// @note
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();
```

`npm run dev`

## 站点配置规则

在配置文件中，比较复杂的是目标站点的相关配置，以HDHome的配置为例，说明一下具体的配置规则。在进行站点配置时需要遵循以下几个原则。
* 在获取到各个站点的数据后，会对数据按统一格式进行规范。视频的属性分成了`category`、`videoType`、`videoCodec`、`audioCodec`、`source`、 `resolution`。
* 上传页面默认只有分类是多属性混合的。内站的分类经常是category和其他几个视频的属性混合在一起的，比如`电影 Remux`就是category和videoType混合在一起的一个例子。其他属性的话一般都比较明确，可以跟规范数据中定义的属性直接进行匹配。但是也有特殊的情况，category可以直接匹配，但是videoType是多个属性混合在一起，比如BHD。这个时候需要将category和videoType的值进行对调。后续筛选的话都是默认对category进行筛选。
* 筛选的目的是category配合其他属性，将站点分类的唯一值筛选出来，并对下拉选择框进行赋值。所以即便其他属性可以直接匹配，但是为了配合category筛选出唯一的一个值，需要其他属性除了配置自己的唯一值外，还需要将属性对应的category的值也加上。比如HDH的上传表单里，2160P对应的option value是1，需要将这个值放在数组的**第一位**(很重要)。数组的后几位也需要将 分类中的`Movies UHD Blu-ray`和`Movies 2160p`这两个值加入数组内。因为这两个分类的视频分辨率就是2160P。其他属性的配置也是同理，直到可以互相取交集取到唯一的分类为止。
* 如果规范数据中的几个属性在站点内没有对应的表单需要填入，则不需要配置`selector`属性，只需要配置map即可。map里遵循的原则同上一条。
* 每个属性中map下的属性不同的站点可能会有不同的增减，比如BHD中，bluray又被详细分成了BD100、BD66、BD50等，这个时候在map中加入这些项即可。在对应站点target数据处理中也需要做好对应的处理。

```yaml
 HDHome:
    url: 'https://hdhome.org'
    host: hdhome.org
    siteType: NexusPHP
    asSource: false
    asTarget: true
    uploadPath: /upload.php
    searchPath: /torrents.php
    searchKey: search
    searchParam:
      search_area: '{key}'
      sort: '5'
      type: desc
    # 标题
    name: 
      # 对应输入框或下拉选择框的选择器
      selector: '#name' 
    # 副标题  
    subtitle:
      selector: 'input[name="small_descr"]'
    # 简介  
    description:
      selector: '#descr'
    # imdb地址
    imdb:
      selector: 'input[name="url"][type="text"]'
    # 豆瓣地址 没有的站点可以省略 
    douban:
      selector: 'input[name="douban_id"]'
     # 分类，电影剧集等 
    category: 
      selector: '#browsecat'
      map:
        movie:
          - '411'
          - '412'
        moviePack: ''
        tv:
          - '425'
          - '426'
        tvPack:
          - '432'
          - '433'
        documentary:
          - '417'
          - '418'
        concert: '441'
        sport:
          - '442'
          - '443'
        cartoon:
          - '444'
          - '445'
        variety: []
    # 视频编码    
    videoCodec:
      selector: 'select[name="codec_sel"]'
      map:
        h264: '1'
        hevc: '12'
        x264: '1'
        x265: '2'
        h265: '2'
        mpeg2: '4'
        mpeg4:
          - '5'
          - '412'
          - '418'
          - '426'
          - '433'
          - '445'
        vc1: '3'
        xvid: '5'
        dvd: '5'
    # 视频来源     
    source:
      selector: 'select[name="source_sel"]'
      map:
        uhdbluray: '9'
        bluray: '1'
        hdtv: '4'
        dvd: '3'
        web: '7'
        vhs: '8'
        hddvd: '8'
    # 音频编码    
    audioCodec:
      selector: 'select[name="audiocodec_sel"]'
      map:
        aac: '6'
        ac3: '15'
        dd: '15'
        dd+: '15'
        dts: '3'
        truehd: '13'
        lpcm: '14'
        dtshdma: '11'
        atmos: '12'
        dtsx: '17'
     # 视频类型 主要为以下几种类型    
    videoType:
      selector: 'select[name="medium_sel"]'
      map:
        uhdbluray:
          - '10'
          - '499'
        bluray:
          - '1'
          - '450'
        remux:
          - '3'
          - '415'
        encode:
          - '7'
          - '411'
        web:
          - '11'
          - '411'
        hdtv:
          - '5'
          - '412'
          - '413'
        dvd:
          - ''
          - '411'
        dvdrip:
          - '7'
          - '411'
        other: ''
    # 分辨率    
    resolution:
      selector: 'select[name="standard_sel"]'
      map:
        2160p:
          - '1'
          - '499'
          - '416'
        1080p:
          - '2'
          - '414'
        1080i:
          - '3'
          - '424'
        720p:
          - '4'
          - '413'
        576p:
          - '5'
          - '411'
        480p:
          - '5'
          - '411'
```

