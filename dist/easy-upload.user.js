// ==UserScript==
// @name            EasyUpload PT一键转种
// @name:en         EasyUpload - Trackers Transfer Tool
// @namespace       https://github.com/techmovie/easy-upload
// @version         6.0.6
// @author          birdplane
// @description     一键转种，支持PT站点之间的种子转移。
// @description:en  Transfer torrents between trackers with one click.
// @license         MIT
// @source          git@github.com:techmovie/easy-upload.git
// @downloadURL     https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js
// @updateURL       https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js
// @match           http*://*/torrents.php?id=*
// @match           http*://*/torrents.php?torrentid=*
// @match           http*://*/details.php?id=*
// @match           https://totheglory.im/t/*
// @match           http*://*/torrents/*
// @match           http*://*/torrents?*
// @match           https://ptpimg.me/*
// @match           http*://*/upload*
// @match           https://*/offers.php*
// @match           https://broadcity.in/browse.php?imdb=*
// @match           https://*/torrent/*
// @match           https://piratethenet.org/browse.php?*
// @match           https://teamhd.org/details/id*
// @match           https://hd-space.org/index.php?page=upload
// @match           https://hd-space.org/index.php?page=torrent-details&id=*
// @match           https://speedapp.io/browse/*
// @match           https://*.m-team.cc/detail/*
// @exclude         https://*/torrent/peers*
// @exclude         https://*/torrent/leechers*
// @exclude         https://*/torrent/history*
// @require         https://cdn.jsdelivr.net/npm/preact@10.24.3/dist/preact.min.js
// @require         https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_openInTab
// @grant           GM_setClipboard
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(" td.title-td{min-width:80px;vertical-align:middle!important}td.title-td h4{text-align:right;margin:0;font-size:13px;font-weight:500;height:100%;display:flex;align-items:center;justify-content:flex-end}#seed-dom button{line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:6px 16px;font-size:13px;border-radius:4px;margin:0 5px 0 0}#seed-dom button:hover{background:#fff;border-color:#409eff;color:#409eff}#seed-dom button.is-disabled,#seed-dom button.is-disabled:hover{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5}.site-list,.search-list{margin:0;padding:0;list-style:none;display:flex;justify-content:center;align-items:center;flex-wrap:wrap}.site-list .site-icon,.search-list .site-icon{width:12px;margin-right:5px}.ptp-search-list{display:flex;align-items:center;padding-top:10px;justify-content:center}.ptp-search-list h4{margin:0 15px 0 0;min-width:60px}#seed-dom li,.search-list li,.site-list li{font-weight:600;line-height:24px;margin:0 5px 0 0;padding:0;display:flex;align-items:center}#seed-dom li a,.search-list li a,.site-list li a{padding-right:3px;display:inline-flex;align-items:center;cursor:pointer}.search-list li:last-child span{display:none}.easy-seed-function-list{display:flex;justify-content:space-around;padding:6px 20px;flex-wrap:wrap}.easy-seed-function-list button{line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:8px 20px;font-size:14px;border-radius:4px;margin:0 5px 0 0}.easy-seed-function-list button:hover{background:#fff;border-color:#409eff;color:#409eff}.easy-seed-function-list button.is-disabled,.easy-seed-function-list button.is-disabled:hover{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5}.function-list-item{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.function-list-item input{-webkit-appearance:none;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:34px;line-height:40px;outline:none;width:200px;padding:0 12px;transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.function-list-item select{border:0;font-family:inherit;padding:5px;font-size:14px;border-radius:3px;text-transform:none}.function-list-item input::placeholder{color:#c0c4cc}.function-list-item input:hover{border-color:#c0c4cc}.function-list-item input:focus{outline:none;border-color:#409eff}.hdb-tr{display:flex}.hdb-tr td:last-child{flex:1}.hdb-tr td:first-child>h4{width:100px}.function-list-item h4{margin:0 10px 0 0;padding:0;font-weight:600;font-size:14px}.upload-section,.douban-section,.douban-book-section{display:flex;justify-content:center;align-items:center}.upload-section #nsfw{margin-left:0;position:static}.upload-section label{padding-left:0}#kdescr img{max-width:100%}.easy-seed-setting-btn{display:inline-flex;align-items:center;margin-left:3px}svg.setting-svg{height:20px;width:20px;vertical-align:middle;animation:5s linear rotate infinite;cursor:pointer}@keyframes rotate{to{transform:rotate(360deg)}}.easy-seed-setting-panel{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2000;background:rgba(0,0,0,.5);color:#000}#batch-seed-btn,#auto-fill-douban{border-color:transparent;color:#409eff;background:transparent;padding-left:0;padding-right:0;font-weight:600;cursor:pointer}#batch-seed-btn:hover,#auto-fill-douban:hover{color:#66b1ff;border-color:transparent;background-color:transparent}#batch-seed-btn:active,#auto-fill-douban:active{color:#3a8ee6;background-color:transparent}#auto-fill-douban{font-size:14px;display:inline-block}.easy-seed-setting-panel *{padding:0;margin:0}.easy-seed-setting-panel input[type=text]{-webkit-appearance:none;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:34px;line-height:40px;outline:none;width:200px;padding:0 12px;transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.easy-seed-setting-panel input[type=text]::placeholder{color:#c0c4cc}.easy-seed-setting-panel input[type=text]:hover{border-color:#c0c4cc}.easy-seed-setting-panel input[type=text]:focus{outline:none;border-color:#409eff}.easy-seed-setting-panel h3,.easy-seed-setting-panel h1{color:#000;margin-bottom:15px}.easy-seed-setting-panel .panel-content-wrap{max-width:800px;box-sizing:border-box;margin:50px auto;border-radius:8px;background:#fff;position:relative;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.3);padding:20px 10px 10px 20px}.easy-seed-setting-panel .panel-content{height:500px;overflow-y:auto}.easy-seed-setting-panel .panel-content ul{list-style:none;display:flex;flex-direction:row;flex-wrap:wrap;margin:0 auto;padding:0 10px}.easy-seed-setting-panel .panel-content li{width:90px;text-align:left;margin-bottom:10px}.easy-seed-setting-panel .panel-content label{cursor:pointer;color:#000!important;font-size:12px;display:flex;align-items:center}.easy-seed-setting-panel .panel-content label input{margin:0 3px 0 0;padding:0}.panel-content p{display:block;margin-bottom:10px;font-size:12px}.easy-seed-setting-panel button{line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:8px 20px;font-size:14px;border-radius:4px;margin:0 5px 10px 0}.easy-seed-setting-panel button:hover{background:#fff;border-color:#409eff;color:#409eff}.easy-seed-setting-panel .confirm-btns{padding-top:15px}.easy-seed-setting-panel .img-upload-setting{margin-bottom:10px}.easy-seed-setting-panel .img-upload-setting label{justify-content:center}.easy-seed-setting-panel .img-upload-setting label input{margin-left:8px;margin-right:8px}.easy-seed-setting-panel .img-upload-setting label a{color:#000;font-weight:500}.easy-seed-setting-panel .img-upload-setting label a:hover{color:#f7d584}.feature-list{display:flex;flex-wrap:wrap;justify-content:space-between;padding:0 50px}.feature-list .site-enable-setting{width:250px;padding-top:5px;margin-bottom:8px;text-align:center}.easy-seed-setting-panel .save-setting-btn{background-color:#007bff;border-color:#007bff;color:#fff}.easy-seed-setting-panel .save-setting-btn:hover{background:#66b1ff;border-color:#66b1ff;color:#fff}.ptp-api-key-btn{text-align:center}.easy-notification{box-sizing:border-box;position:fixed;transition:opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;overflow:hidden;right:0;margin:0 24px 0 0;color:rgba(0,0,0,.85);font-size:14px;line-height:1.5715;z-index:2010}.easy-notification-enter{right:16px;transform:translate(0)}.easy-notification-notice{position:relative;width:300px;max-width:calc(100vw - 48px);margin-bottom:16px;margin-left:auto;padding:16px 24px;overflow:hidden;line-height:1.5715;word-wrap:break-word;background:#fff;border-radius:2px;box-sizing:border-box;box-shadow:0 2px 12px rgba(0,0,0,.1)}.notification-message{margin-bottom:8px;color:rgba(0,0,0,.85);font-size:16px;line-height:24px}.notification-description{font-size:14px;line-height:21px;margin:6px 0 0;text-align:justify;padding-right:10px}.notification-description p{margin:0}.easy-notification-notice-close svg{height:14px;width:14px;font-size:14px}.easy-notification-notice-close{position:absolute;top:13px;right:15px;cursor:pointer;color:#909399;font-size:16px}.easy-notification-notice-close:hover{color:#606266}#transfer-progress{display:none}.custom-site{display:flex;align-items:center;width:100%}.custom-site h4{flex-shrink:0;margin:0 10px 0 0;line-height:initial}.custom-site .easy-seed-function-list{flex:1}.custom-site img{border-radius:0}tr.pad[id*=torrent_]{font-family:Proxima Nova,Lato,Segoe UI,sans-serif}.easy-seed-function-list .copy-img{margin-left:5px}.quick-search{cursor:pointer;color:#409eff;font-weight:600}.ptp-title-wrapper{position:relative}#seed-dom .ptp-title-wrapper h4{position:absolute;left:0;top:0;margin:0!important;display:flex!important;align-items:center;line-height:24px}#seed-dom .ptp-title-wrapper .site-list li:first-child{padding:0 0 0 95px}#seed-dom .ptp-title-wrapper .search-list li:first-child{padding-left:65px}#seed-dom.use-eng .ptp-title-wrapper .search-list li:first-child{padding-left:85px}#batch-search-btn{color:#409eff;padding-left:0;padding-right:0;font-weight:600;cursor:pointer}.douban-config{display:flex;justify-content:center}.douban-config textarea{resize:none;width:300px;height:100px;margin-left:6px} ");

(function (preact, $$1) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a2, prop, b[prop]);
      }
    return a2;
  };
  var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var _a, _d, _e;
  var f$1 = 0;
  function u$1(e2, t2, n2, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, l2 = t2;
    "ref" in t2 && (a2 = t2.ref, delete t2.ref);
    var p2 = { type: e2, props: l2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === l2[c2] && (l2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(p2), p2;
  }
  const PT_SITE = {
    "1PTBA": {
      url: "https://1ptba.com",
      host: "1ptba.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAerwqYXVnYVNybF9uaFtjXUxTXlcyYnQOb54Ae7wMcKJYaWi0rqbUz8fTz8fSzcXNycG/urKemY1bcXERb50sYnSOioHf29Lt6d/s6N/m4tnBvLFNcntrb2bFwLjt6eHu6eHt6eDr597q5t3n49qRkINrf3+1t7C5u7W6u7S+urG9urG5urTEw7vj39br59/s6eCuqZ0Qc6Uib5Ijb5EkbIxQZGN8d2qAem6JhXlDaXMibpEwaoGVmpLl4disp5sAe70OcKBscWnEv7fV0MjV0cnMx706a3sAe74IcqdjdnXTzcTq59+Mj4UBe7wBerskZoGSj4bi3dTv6+O5urIibpAAerscZod4enLW0cnu6+PPy8JFcoABebg9Y26zrKLp5dyOl5EMcqUCeLcbZodaY12uqJ/t6uHk4Nh3jY4Pb54JcqZdb27Iwrji3tVggYgKbZ4yX21obGavqaDi3dXd2dF9kJIVcZ0Wa5N/f3Xb1s7Lx70zboYvY3WDfXLFwLft6ODKycFhfYESb50AebouZ36emY6nraYWZolMbXXCvLOdoJcTZ44Cd7VIZGi6tKvr5t14jY4HcqgxbIO6tKm6tqprdG/SzcTs6N7e2dBJc38AebsUa5WOk4vn4tns6ODQy8I+dYoAeLgeZoaMi4Lf2tK+vLMncZISa5R3fnnb1czMx743c40AebkCebg2ZXWrpJno5NuSl44YY4IcZYRHXmCcmI6vsKcabpUHc6pYa2vDvbTk4NecnJNnbWd9eW+po5ra1c1nhIoGc6sRbpt3eG3Z1Mza1cze2dHh3dSAk5UUcJ0qa4ajn5Xn5Nzu6uLt6uLv6+Tp5d7Y1MyxtK1hgIgUcZ8lbYyTkYSxrqOxraOwraOtqp+XlIV9iIFReYUfaowGdKz///88yl8CAAAAAWJLR0TixgGeHAAAAAd0SU1FB+UECgcrNELreWwAAAGKSURBVBjTY2BgZGJGABZWNnYOTgYubh5eOODjFxAUEhZhEBUTl5BEBlLSMgyycvIKCvJgoKCgqKSspKyiyqCmrqGhoamlraWtoaGjq6evrGxgyGBkbGJsamZuYWFpZW1sY2unpCxvz8DJwODg6OTs4urmzuDh6eWtpOTjy+Dn5+8QEBikGBwS6hAWHhGpFBUdAxTkjI2LT1CST0xKTklNk0rPyMwCCjpk5+RKSublFxQWFZcEl5aVMzD4cTpUVFYppVfX1NbVSzU0NjUDrfHjbGltk1JSaO/o7FJWUuru8eD0Bwr29vUnKE2YOGnyFEklxanWDJx+DH4OjtOmz5CcOWv2nLnzlOYvWLgIKMjpsHjJUqX0Zcs9VqxcpSS/es1akOC69Rs2Kslv2rxl67Y8peDtOxyAgg47d+1WUtqzd9/+AweV5EsOHXbwAwoeOXoMGDLHp59Qlg8+eeo0JydQMOzM2XPnL1w4H3zx0uUrV68B7QYKMly/cfPW7ds379y9d//BQwZOf6AgACIJgNAMLRaxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQzOjUyKzAwOjAwjJgVBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0Mzo1MiswMDowMP3FrbsAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "10",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3",
          ape: "2",
          wav: "22",
          mp3: "4",
          m4a: "5",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "13",
          remux: "3",
          encode: "7",
          web: "11",
          hdtv: "5",
          dvd: "2",
          dvdrip: "7",
          other: "12",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "11",
          "2160p": "10",
          "1080p": "2",
          "1080i": "2",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          "1ptba": "1",
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5"
        }
      }
    },
    "3Wmg": {
      url: "https://www.3wmg.com",
      host: "3wmg.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="pt_gen[douban][link]"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: 'input[name="tags[]"][value="16"]',
        diy: 'input[name="tags[]"][value="8"]',
        hdr: 'input[name="tags[]"][value="64"]',
        chinese_subtitle: 'input[name="tags[]"][value="32"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "410",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "6",
          vhs: "6",
          hddvd: "2"
        }
      }
    },
    "52pt": {
      url: "https://52pt.site",
      host: "52pt.site",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABtlBMVEUAAAD/f1D+f1D8f0nrlATcRhAAAP8AAP72vAX2vAX2uwX2vAX2vAX1vAT2vAX2vAX2vAX2uwX/f1D/f1D/f1D/f1D2vAX2vAX2uwX1ugX0tQT/flD/f1D+f1D+fk/+f1D+f1D2vAX1uAXyrQTwpgT+fk//f1D/f1D/flD/f0//f1D1uwX0twTxqgTuoATslgTohAX/f1D/fk/+flD/f1D/f1DwpQTtmwTqkATohQTmfwT+flD/f0//f1D/f1D/f1D/f1DxqgTvogTslQTpigTmfwTldwXiaAr+f1D/f1D/f1D+f1DrlQPqjQTohQTleQXjbQnhYgrgYgr/f1D/f1D/f1D/f1D/f1DqjwTpiwTkcwfiaArfWwvdTw7/f1D+flD+f1D/f1DpiwXkdgbjbwnhYgreVA3cRRDbPRL/f0/hZArgXQveUA7bQRHbOhLbOhPeUQ3cSQ/bOhLbOhPbOhMAAP8AAP4AAP/bPhLbOhLbOhMAAP8AAP4AAP8AAP8AAP8AAP/bORPaORPbOhMAAP8AAP8AAP8AAP8AAP8AAP/bOhPbOhPbOhPbOhP2uwXysATmfwT////emFSbAAAAjnRSTlMAAAAAAAAAACiIUl5wyHjAdsYQChQGvkoOeMawXHYIIjbQ0IjGLDhAKEZS5Hbk+MoygkRUYljmUu78XiJoaFBKVnCo+t5KQghmVEhuVJJi+vrUAgKApERuMt7AaPjGMhIgDAp44u7QvroGdsg+6rjEdsgEdsYiGih2yHhsOlJKTgZqyLo0OlBYPAQWYDo8iaK1gQAAAAFiS0dEkQ8NvpoAAAAHdElNRQflBBUOAAFlgzxgAAAA50lEQVQY02Ng4OBkYODiZkAAHl4GBj5+JAEBkIAgA6OQsAgDoyhIQExcQlKKgUlaRlZOXgEkoNinpKzCwKSqpq6hqQUS0NbR1dM3YDY0MjYxNQEK6PSbmVtYWjFY29ja2TsABRydnF1c3dxFPWztPb28GRhYfHz9/AMCg4LtQ0Jtw8IZGCIiJ0RFx8QyMMTFJ2glJjIwJCWnpKalZ4CdpJUJIrOyc3Lz8sECTIwgsqCQtai4hIGttKycnQ0kUFHJwFAFFKiuqa2rbwAKNDYBBZoZ2Fpa29o7OoECXd0MDD29QAYbCDAAALdvLFoE/tjvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTIxVDE0OjAwOjAxKzAwOjAwc0mO0gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0yMVQxNDowMDowMSswMDowMAIUNm4AAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "13",
          x264: "11",
          hevc: "1",
          x265: "12",
          h265: "1",
          mpeg2: "4",
          mpeg4: "13",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "13",
          ac3: "6",
          dd: "6",
          "dd+": "6",
          flac: "1",
          dts: "15",
          truehd: "12",
          lpcm: "14",
          dtshdma: "4",
          atmos: "10",
          dtsx: "3",
          ape: "2",
          wav: "11",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "11",
          remux: "4",
          encode: "7",
          web: "10",
          hdtv: "3",
          dvd: "6",
          dvdrip: "7",
          other: "9",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "7",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "6",
          "480p": "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          beyondhd: "1",
          hdsky: "2",
          ttg: "3",
          mteam: "8",
          coaster: "4",
          chdbits: "9",
          ourbits: "10",
          hdhome: "11",
          cmct: "12",
          hdchina: "14",
          pthome: "15",
          other: "5"
        }
      }
    },
    ACM: {
      url: "https://asiancinema.me",
      host: "asiancinema.me",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBjskFFwRbgAAA11JREFUOMvNlM1vlGUUxc+5zzPvfLT2y5a0BqglgAFCcaGIYaEhAYIaTYgxLo1x5wL+BBf+Ay6NceOChYnGjVVj4wchkAhE1AKKWqopTBinZdrpFGbe97nHBSaSqNENiWd3N79zF/f+gP97ePdwfXwbIJFkXxbsfjfVEjwJvmZ5q1luLffyPmBs6T8AFzbuAIASyAmS0wHaJWhURCHghqA5gHNmpYbkPrkw97fACACXJ3aitdhEdXJ8E8nnSDxF6SFBQ3dquQrgssC3Bc6C1vynDePM1iNYT034g/0bPOCAES9JPgUgI5AgQOQoiL2QfqUw7yE254c3czlU9ciBd/Du6eN4YfHMHWD0hOpwjqXO0DSgpwHfSiGn/JRJ35kxJto0iZql4mSlu3alUe6rLo1MjnW7nfrVmx/kM3/AAIDvbX8GvWT9g5X8FUDH5BqN8FPB/UT0dI7GsoDtJMo91+lWebAWgX3mvsGNdYgnvZ1dZTmlo1feR7ydVSBxdDVkmwENy3wpwD8xaNal+q3lFRN4KY/lEIdHNlWYDko6IFOfyKrLrBgMq0RoAEDslPtJoObw+wAESCuSfoCrDRKLGyd94PZKjhCrA0EPJ/k4oWsulZ22X+CTIH+cWm81Xtv/KuJyrAlAj1ACZAAoB+QAjagwoVMbKhm0pfCiL5IysC7P52Vhj2h7BZ7/cqT/bMmxHtusAMItRbZA3JY4koTdAr+FuNauj7B/fHXCSulFSlsMyA06E3udz0tCIw+VZ53Wy5NXE7EeO8wQPLW6sXJN4E0BEw4eKmCNLuM3Ycr7k6r7otJhQg+AnId0pp63ry38ki8e3DnYJJQ7ilsSERvVGrbYSGfZV644eNHBDQIedVpw8KccqOWwPVRpkoRTWofUTpXx8HXnUj7anTj36dnX/zzszB2XrQdaeQ4WPxQ4lqRdIB4H8BggAiShLsGvDJhh8gtZeaD0/L4nihgy3f0p4cLCF5jaeBTd+sCaD/pvhcW1PGZDuWW1gjEWFnu5xUYRsvOJ8YRkH2We/wzFHmESEi4tzPxVDoeOvAmTYqKNJXK303YDnAAEya8bcN7A760ITZnS7Mcv/7u+dhx+Cy4hkOWBEMfMbFAk5Hl7NbXrF7cdy+PF40ifvXHvhHrP8zvmB8JDHarovgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjo1OTozNiswMDowMLWCrh8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6NTk6MzYrMDA6MDDE3xajAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
      torrentDownloadLinkSelector: 'a[href*="/torrents/download/"]',
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.radio-inline:first input[name="anonymous"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      videoType: {
        selector: "#autocat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      category: {
        selector: "#autotype",
        map: {
          BD100: "1",
          BD66: "2",
          UHD50: "3",
          BD50: "4",
          BD25: "5",
          remux: [
            "12",
            "7"
          ],
          encode: [
            "8",
            "10",
            "11",
            "13"
          ],
          web: "9",
          hdtv: "17",
          dvd: [
            "14",
            "16"
          ],
          dvdrip: "13",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "2160p": [
            "1",
            "1",
            "2",
            "3",
            "12",
            "8"
          ],
          "1080p": [
            "2",
            "4",
            "5",
            "7",
            "10"
          ],
          "1080i": [
            "2",
            "4",
            "5",
            "7",
            "10"
          ],
          "720p": [
            "3",
            "11"
          ],
          "576p": [
            "4",
            "13"
          ],
          "480p": [
            "5",
            "14",
            "16",
            "13"
          ],
          other: ""
        }
      }
    },
    Aither: {
      url: "https://aither.cc",
      host: "aither.cc",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABO1BMVEUnPUA0UVVAZWpQfoRTgolJc3lIcXdSgYc5Wl4zUFQfMDIuSExCaG1SgYhckZhimKBbkJdajpVPfIJEa3Bdk5pXiZBLdnxFbXI4WFwvSU1PfYN1paxvoahsn6aGsLZhmKBbj5ZRgIZVho06W182VVlYi5Jgl59elJyLs7miw8eoxsqryMywy8+px8ucvsNrn6ZflZ0yTlJJcng/Y2iavcJtoKeBrbNelJtDaW4rREcxTVE9X2R5qK5KdHoqQkUoP0IsRUiNtbo3VlomOz5NeX8lOj0jNjkeLzEgMjQiNDchMzYkODslOTxYipEoPkEiNTgbKiwZJykcLC4dLS8uR0tBZmsaKCoZJig+YWYSHB0XIyUWIiQWISMfMTMRGhsVICIUHyATHR4cKy0QGRoTHh8YJScQGBkPFxj////TR8cdAAAAAWJLR0Roy2z0IgAAAAd0SU1FB+UEFw4WFlDBxPsAAAEBSURBVBjTFcppX4IwHADgPwmWmuWRVmCZdF9W2mmFlnlWNtBGY7YxWfL9v0H69vk9AMpCRFVVLaotaksxiENiObmymkpnsupaLr++sQmKbhS2UoVtwyjulEx9F/b2Dw6Pjk9Oz87LF1rpMgtXlap5faNG8+nb8l0ldw8PtcenZwvq9Yaiv5jVV2jWI2+tdqfb679bmWQsAR/Nz8FXHNkOGvZH2qgBqPfdH2LXdTFy2j/NLhBc8+iYenP6VbpjYHzgC59zOtOJhSgEojNmbE5c4tafD4RxTKaMCCGkg6WEMAypx8kscdcOwhACSTjFtkddNJFMBMCoCIj0bIq4DKY++wfZwT9SAOOuEQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0yM1QxNDoyMjoyMiswMDowMNu9360AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMjNUMTQ6MjI6MjIrMDA6MDCq4GcRAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/torrents/create?category_id=1",
      needDoubanInfo: true,
      seedDomSelector: ".torrent__buttons+.panelV2",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: 'input[name="name"][class="form__text"]'
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      torrent: {
        selector: 'input[type="file"][accept=".torrent"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1",
          concert: "1",
          sport: "9",
          cartoon: "405",
          app: "10",
          ebook: "11",
          magazine: "11",
          audioBook: "14"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "3",
          other: "7"
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    Audiences: {
      url: "https://audiences.me",
      host: "audiences.me",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "401",
          concert: "408",
          sport: "407",
          cartoon: "401",
          variety: "403",
          app: "411",
          ebook: "405",
          magazine: "412",
          audioBook: "404"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "5",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "26",
          dtsx: "25",
          ape: "2",
          wav: "22",
          mp3: "23",
          m4a: "24"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "15",
          web: "10",
          hdtv: "5",
          dvd: "2",
          dvdrip: "15",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "10",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "5"
        }
      }
    },
    AvistaZ: {
      url: "https://avistaz.to",
      host: "avistaz.to",
      siteType: "AvistaZ",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QUPDicuFlMtFwAABCJJREFUOMu1lW1olWUYx3/3/TzPeT9nZ+7NHecr25TFFPFl2UJNtJqURUYFkVFQoCAlTIrCXiDB8IuUFGqCJYn2oZJEhH0Im1NC0G3OaJ7N6Uhzm562s7Oz85w9z3P1wQ2cVh+s/nB9u+7ffV339XLD/yT1L86FgKlAAMgDvYD9t+DtEc11T3SDX5WVKjUjrIg7wtgQ3NiW8VIn87IMeBqYDlSOX5AB9gI7AA/AnAB+ZkHPGMaagLe03G9siMIKS0hoCAh4KNIvofraBqVi2GOKC1lgFDgJ/AI4wHKgBxhSAE1zNKkRL7Jk9sw3SyLxzYFrl0qVYyMo9HieWQ+yAl2O0JyT9JEhOXTRpgC4AMwDHgVc4ArQah6t0fzmEVod5aMSX36TWVxgySCIA0pBly3s7hd+yghBDcvCisqQiq3SrE/2SVNeKAeqgONAB9AC9Jjr3vLTvdd+tVipjUbUsMRyIW6BbYMCx4IZLhQBHRnoTguFGaE6rIoVPD9esIPAaeB34BzgmM0H7Jr5MTabiI8pIVSijHSqlayCMp8wTytqsopnA9AaFE5pQfthSRw1amD4DZLHr9MGnAIuT9TMnFbIC0EflYgCXxroo1PyTI+C6lPY7eDLKkoRUgIRv2LqLKHDgVEPttSqkuIQya+6JHtnd+lIAQ06ipaYQpm3uHnjZ5ygQ7mGs+3w4rDHOQQDiAFeDhLXFLVBiEdgfkIVf1Cvwn+8rm/cCTatmFRhKhABy09vOszMWAp93qUrI3yPUCfCEq1ZrxTPALmssLFdWFmnSJTi681Kdbxi8khoYoSJCCoijJTXMDpnFaUVJciIUCaKEmCf5/GG65IUQQM/ukKbT3iqFiQiECFOzeRBMwkxIiYFWinOX+0gELwMRWl+CEEjLv1AP/CJCM2uy3bD4LAIK2ph9jTwBIBBMjIZPBYkiY/FoqC13+Z0t0tqKE/7tdvACcXHO/851+WBCBx4UKEjkPfI2w7J1NDkiHXG4IQXwsv7hLqFCSrmLuZsLyyqhHfXQti67TgdeF9pChQYU6HTESQIY356BxzO/zp4F/h6Tg7nLLrNMCyoCrPlyRAtO6Pseg3SGpzxDJMKhmqEdUth2IOqWSBBSGv5bvk2udp8afJT6IcbjYsDjux2feStgCZRlKOk2M87h+DTY2A7tx1zAj0zhbpHYGAQBkYgZ0rr1Qx7LuyHt7+8K+JjO13O9LD/Zo49rhFydLSaIy3wbfO9S/hmCuqroSAELUmupF221q+g++sW/lpNu+DIh0R7ji58b/hE1cArj2kB7rENq5Fb3+A+vpQzpYWsBNi1lX/WF42w/WWM059Tv2gu+4BOIF0Ux9aaUaC/oY7mzoNs+XgT5SL39/kYwDTL5KEnlrM2HGQNUOv3Ed25QzF/wX0x/xv9CdGEqkHFq79tAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTE1VDE0OjM5OjQ2KzAwOjAwBxpkNgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0xNVQxNDozOTo0NiswMDowMHZH3IoAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="/download/torrent/"]',
      needDoubanInfo: true,
      search: {
        path: "/torrents",
        params: {
          search: "{imdb}",
          "in": "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    BLUEBIRD: {
      url: "https://bluebird-hd.org",
      host: "bluebird-hd.org",
      siteType: "bluebird",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACGVBMVEWotrlCjJo7l6k6laY7l6g/jp6brbE6f41G2vRF2PJF1/FF1/JH3Pc8j54ueok7vdU4tc04ts06vNQ5jZwra3gtnLAtmKwuma0rl6splaoqlqotmK0wnrMzeoclWmYyiJknfY4ieYoieYsheIosgJE2iJg1h5g2iJkwg5Qhd4kgeowsZnIuV2F3rrxBf4wSWGcYXGsXW2oWW2qDt8Oq2OOg0NyVxtOAtcNjnaspbnwiUVswUFh7r747bXkAMDwEN0IENkICNEAFOEOYxM+l0NtjkJtgjplnlaF9sL1nm6gjRk8qRU2Cs8FkkZ1Gb3lOd4FReYNVfYdGbXemztiLs70AHCYAIiwAIStHb3mGucc3UlsqQ0t+rryKvMqcy9ep1uG13+vF7vinztibwsx7oqwAHCUBIywAGyQoTFY7V18uTFR9sL5RgIwjUFsoVmEqWGIgTVgdS1YSQEsTQUwXRE9biZV9sb80VFwzWWF3rLpAeYYJSFYPTlsOTFoPTVt5qbSbxtKNu8iCsb55q7h4rLtWkJ0iTVctXWhgorE6hJQbbX4fcIEecIBsrbqDvcp2ssBtqrhoprVRl6YjdYYoX2ooZnIrk6cpj6IqkKMqj6MmjKAnjKAojaEpjqIojqEli58xdIItdYQ3s8o1rMM1rMI3h5Y2foxE1O9C0OpCz+lE1vE6j56Yqq9DmalAqLpAprhCnrCGn6X////cFElzAAAAAWJLR0SyrWrP6AAAAAd0SU1FB+YDAgQyIDB3PAEAAADuSURBVBjTY2BgZGKGAxZWNgZ2Dk4uOODm4WXg4xcQhAMBIWEGEVExcRCQkJSSkpCWkWWQk1dQVFJSUlZRVVPX0NTSZtDR1dM3MDA0MjYxNTO3sLRisLaxtbN3cHRydnF1c/fw9GLw9vH18w8IDAoOCQ0Lj4iMYoiOiY2LT0hMSk5JTUvPiMxkyMrOyc3Lyy8oLCgqLiktK2eoqKyqrqmpratvaGxqbmltY2jv6Ozq7u7p6e3rnzBx0uQpDFOnTZ8BBDNnzZ4zd978aQsYFi5aDAFLlixZvHjRUoZly1esRIBVqxnWrF23Hg7WbdgIAFw/WUNqMtpuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAzLTAyVDA0OjUwOjMyKzAwOjAwrsTcpgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMy0wMlQwNDo1MDozMiswMDowMN+ZZBoAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/browse.php",
        params: {
          search: "{name}",
          incldead: 0,
          cat: 0,
          dsearch: "{imdb}",
          stype: "or"
        }
      }
    },
    BTN: {
      url: "https://broadcasthe.net",
      host: "broadcasthe.net",
      siteType: "gazelle",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: false,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          imdb: "{imdb}",
          artistname: "{name}"
        }
      }
    },
    BTSCHOOL: {
      url: "https://pt.btschool.club",
      host: "btschool.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBwQr3f9M9AAAAz1JREFUOMt91M+LHXYVBfDPefPmR2ZeY0tnWoyxVgihrT8KQoo/SmwUN23RKtGdiAsFS7vRko1/QYdUEMGFS90KcSWoBIRY6mS0oRoTqVLjj9bEpI2pjUle5r3j4k1k6sID39W953A599xvbGPpu2dN3yoDu9UeHMRS2RNeR8ogXMCb5BTOM/13suLGM/eCwOLRM7CEfZkJ3UlW6JsYmwkOMIfbKltYoOdbL0jOYWv8zP2yePSM1m2D5PFwD21C5VTa1/Bak6tUarnskaxq908pRq1T1V9qxsNp7Q6fo7vDivhV6oXE65Lp1W/cbwfGK8+d/WcYTJPTaQ+WEfa3dk3rRObXzzySeGgQBpwIm5Kt/xF6G0bPvexmtyRZaPuB1qFpO5nW8cyv/+6BJJPZ82fcvP5/xHZi/uhZWNC+a1LT1iRrz25gEoaPiYMt+GuS5/FiMcQWS+EOLGN3dS+up/6B82K5bA2bqOGd4cnwoRk3I2zgS/TKFo+RR9vux91JRuosTpf3hC3MqeVhZsl5n3ZSvphYxVe2Y/RuPI0n1Mt4EYfxE3wTnxVPkO9rfxSWB22XtYdxCfdVPlNdxc+rH8R8+Gr4PI4luYLvjTN+VWzip9WH8WFsDvGx8ClxDL+pnsA9eAqb1R+QcWKOHK6exrlFiyIbE9OXwpfF18u5QeIRyVLlZOVPZEAen20qGwOD8bYtH8X78UM8VB1NTQ1YDHuxivcO1RtNx/gWuYB5eqF8e2p6cc4cM8LX8DNyLHxh5mEv4z58Eqfwi6w9u3F7kz1YjRTj6ivVNyKTyDw+YhaZ43gLi/g4Hsbd+C1+jFeyur65Fi1RvRyZXDxyAKytb97KcMzu1q3ajvoC1jrr2RpG98286a7MJjiztn6yjFw88sAtbndeyNr6S+qGMqQPhkfxLxwfkNPkUrlUPlE9hHdwNTsmfNtUNR6EVXoYny6Xw+/DH7ZJXS6H1F24FuaanNNeCH8vYyGyq+yl78SB7f9xiBOR5+mN7PBiSXvvLBJGYk41XC/XxBLZhZF2GQuSv23b9EfcvHjkwCxgsPadk1zFwO2tu8SDYV7ta1zByvY5vqq5Rn+d5C/b3v13Wf8BYeJvdWEcGZ8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDQ6NDMrMDA6MDC0QHbWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA0OjQzKzAwOjAwxR3OagAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="picture"]',
      imdb: {
        selector: 'input[name="imdbid"]'
      },
      douban: {
        selector: 'input[name="doubanid"]'
      },
      tags: {
        chinese_audio: 'input[type="checkbox"][name="span[]"][value="5"]',
        chinese_subtitle: 'input[type="checkbox"][name="span[]"][value="6"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "405",
          tv: "406",
          tvPack: "406",
          documentary: "408",
          concert: "409",
          sport: "410",
          cartoon: "407",
          variety: "412",
          music: "411"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "10",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "10",
          dd: "10",
          "dd+": "10",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "5",
          dtshdma: "3",
          atmos: "3",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "11",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "1",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          btschool: "1",
          zone: "13",
          btshd: "2",
          btstv: "3",
          btspad: "4",
          wiki: "5",
          hdchina: "6",
          hdbint: "7",
          mteam: "9",
          cmct: "10",
          ourbits: "11",
          other: "12"
        }
      }
    },
    BYR: {
      url: "https://byr.pt",
      host: "byr.pt",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      torrent: {
        selector: "#torrent"
      }
    },
    Bdc: {
      url: "https://broadcity.in",
      host: "broadcity.in",
      siteType: "Bdc",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxMX1XFD5QAABLtJREFUOMs11FtvXFcBhuF3rX2aPcdte8b2xIc4cRIl8di1pbg0QQJEUVGlChASSL2g6v/ggt4gfglcAAKJG0gFEpSUEtJUNK1NfIo99ng84/GcPMc9s9davTD9fsCr7+oR7k9/YQAwBiMkGoHuXmIuSojWOQx7YBQIgbEshJ+EzDRM5LFTAQKN0ZqvZ1+1DEgbVITXrzMRtkhOOjizy+D54LoYYaGiEdcDn5Qj2Dqusn/RIUrnsD0PdARGYGNAWDY6HBAbNFiOjXl9/T652Wu4qQAZ85GWhdKaTDzG7WySjBjz+ctd/viPZzyr1GhHE1h+GozCNlIgtMa0qohOFWd+FiuTh0weP53AHg/oVEoYY1h5tMlrd5cJEh73C/fIBin0n/7F80oXpQWOLbDste99YLp1TLXIeDCgYWfZO21wcHpO+7LF4fYWf/j17/j7k6fEgzRezCPSiiCX5eatBRgNcDrbJNQ+vguWtfLtDyjvobod0lMzPLh/g598a433337Iu29+g0ert0lNZDhpXhKk4hzu71MqlVkvLJIaPWE59hGbkx+T0Gc8O81h02tiOheAZIykcrDNl4My333tJv1Oi3a7ybs/fItuOKTVHXB4VMIdbBM/fcGo/pQpv0Jf9qh15ijWAmw6FzAagBswjKBZq5FYyjKZTuFnAobDkN5lm+LxMXgT3F0Y8Mb0Z+jKkJ1ynvYgTbmRZb95EyN9bNNrg9YYYWHbDou5PD94520cx0aNQoJUkpNSid2jCtPXIn60csYb0zWev1rgRfcdnnzyBWrYRiWTBF4fW0QjMBrCPmlLsX7vFg83N/jk6afsF0/YWC2wVihQuL9Gr/tvArlFZ+jzm/9skJxJcnzSJDbeI51vortz2FJKLBXCRZXRoE513qN6dkaz1WJ6eob5uTylwwNebr9k/UaRqcSYSkNw8GqH709X+NV7RxSLdX7/DM5rOWxleWQnJymsr/Bg83U2H2ywsHidVDpNsVTmww//yuPHf+Nw65BFf8hYWXxzNeSXiWMSjuKLQ8WfP43x/CiJyXiI7Js/M4WM4dHKMrfu3MESgnqjQeO8ylHxmK2dPXYPioRDwWzW8J2NPg/uDBFa0u4n+OiF4LNdaDrXcG6vYbupACV7VM9r9LodKuc1vny5y3m5jNGaiWyW1cJd6o1Lms0Bj5/H+ed2hOe5xJNztJtdhN3Az8QZJ6cQzo9/btSrz1mSbVaXZpnM5Wh3+7i2RSadYnZmhqmJNHvFUy5aXcIwAgOuazM3naF5fsZ/X5XZCZOEcyvYuD4iv8y1nOBhYZ7r1xcJIwXGYEmJ7/skEnHmF5cY9PsoFSEAbcAShqOjODvDOMOGREoLWxiFTE2wc9mi+ZePSXR/i+M4eH4chEQI8GIxhJCMwyFKRWilGA2HhGFINzVPLb2ESAQIrbCN1iAt6iZGredCqYNoV7DV6ApWQFoWUlro/8eMECjbx2Ty4PhYmTiWlKAVthACoxVOPIm4sYKZmkGf/g9TL2H6bUw0ItIKDAjbRfguIp7BnppHzt1DpLNX0qsxQogrsQWgozFCWohgBpkIMI0S5uIEc3mBGfUBEG4ckc4isguIyXlwvKvHOkIIAQa+AvwANNpBILcLAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjE5OjIzKzAwOjAwAUZk1AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzoxOToyMyswMDowMHAb3GgAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        imdbOptionKey: "t_genre",
        nameOptionKey: "t_name",
        params: {
          imdb: "{imdb}",
          search_area: "{optionKey}"
        }
      },
      seedDomSelector: "#details>table>tbody>tr:nth-child(11)",
      name: {
        selector: "#subject"
      },
      description: {
        selector: 'textarea[name="message"]'
      },
      imdb: {
        selector: 'input[name="t_link"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      videoType: {
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "6",
          web: "5",
          hdtv: "4",
          dvd: "7",
          dvdrip: "7",
          other: "15"
        }
      },
      resolution: {
        map: {
          "2160p": {
            remux: "2",
            encode: "2",
            web: "6"
          },
          "1080p": {
            remux: "4",
            hdtv: "4",
            encode: "4",
            web: "5"
          },
          "720p": {
            hdtv: "4",
            encode: "4",
            web: "5"
          },
          "576p": {
            encode: "23",
            web: "5",
            dvdrip: "36",
            dvd: "10"
          },
          "480p": {
            encode: "23",
            web: "5",
            dvdrip: "36",
            dvd: "10"
          }
        }
      }
    },
    BeyondHD: {
      url: "https://beyond-hd.me",
      host: "beyond-hd.me",
      siteType: "F3NIX",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACMVBMVEUAAAAJIO///wAAAP8IGvAWQ9wWQdsYSNgYSNkWQNgUPd4vgrlGuZU6n6w1kbMVPdwVPdsZRNEYRNUWQtkVQNkGGPGu/zQIHugZStkeV9EhXc4iYcwiYsshYMwgXM4eVdEYRtgSOeEeVtIiYcwkZskkZskiYMwdU9MRNuEVP9wgWs8jZcojZcofWdAUPt4RMt4fWs4kZskkZskQMeMeVc8kZckjZModU9IiYMsiYMwXRdkeVc8fZMcdVNAhW8qxwvNljuBTg9o/dtUgW80iX8n+/v/6+v709f7K1fgiYMsiYMoiYssiYMsiYssiX8siYMsgXMwgW8weVM8kZckdUs8XQtciYMwXQtgdU9MjZModVNEQMeIfWM0fWM0QMOEVOtQfWc0fWM4UOtkSNt4cUtEhXswkZckiYcsdVNARNt4WQNgdUs4gWswhXssiYcoiYcsiYMogXMweVs8YSNUkZ8klaMgkZ8glaMklZ8kkaMglZ8gjZ8hbidxJfNgtbM3B0PSete8kZssiZsgfZMdnkt729/7j5/xGeNkpacw6c9JMf9dnkd7N2vX//////v8ras0jZshKetrL1fjx8/36+v7+/v9GetYnaMp0muLr7/z+/v7k6vpnk9wjZslrk+Du8f3p7vxfi9w0cNDY4PnZ4vk1cdBNgdbu8vzv8f3s7/xJftYhZchgjdzr7f2vwPJVgtxTgtulufDo6/1mkN5GeNhcht4oZ8wmZstUgttHetgkZsmOuILKAAAAdHRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcbLvo9O3DcR4IXcz6+9JmCQ6N9viWEQeN/P0KXfX4aM3TIm7+dbr+/v7+wOf+/v7+6/T28/fr7L++cvtzIdEhafdjCZGMCA+RjA4IYNL6zF0IH2697Pb057prG30aCesAAAABYktHRI0bDOLVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QQKBwYCrXu2GgAAAXtJREFUGNNjYGBgYGSSkJSSlpGRlZNXYGZhAANWRSVllZJSIChTVVPXYAOJsWtqaZeWlpeXlZWXl5bq6OpxMDBw6hsYllaUl1eWlABlKkqNdI25GLhNTEFiVdU1tdUVIFEzcx4GBQuQWElZXX1DY2U5SNTSisFapbS8rLqpuaW1rd2mqbqsvFTVlsGurLyso7Oru6e3z97B0akfyHVmcCktnzBx0uQpU3t7Xd3cPaZNKC/1ZPAC6p4+Y2bvrN6pU3tnz6kA6vdm8AE5ce68+b1AsGBhE8ixvgx+QMHy6kWLQYJLllZXAQX9GQLKqqrKm5Yt752/onflqiagirJAhqDg0qry1WvWrlu/YeOmzavLq0qDQxhC1UqrSids2bqtqWn7jp0TgI4PC2fgjdABKt0FsqGsCSQWGcXHwB8dAwwQUDABAZARHBsnwMAgGJ8QCRUDBp12YpIQKECFk1NS08pAgVyikp6RKQIJelHmrOyc3Lz8gsKiYjFxoAAAdfCapAG3hnMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDY6MDIrMDA6MDCSiKOlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA2OjAyKzAwOjAw49UbGQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".table-details tr:last",
      torrentDownloadLinkSelector: 'a[href*="/download/"].bhd-fl-button',
      needDoubanInfo: true,
      uploadPath: "/upload",
      search: {
        path: "/torrents/all",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          imdb: "{imdb}",
          search: "{name}",
          sorting: "size",
          direction: "desc",
          doSearch: "Search"
        }
      },
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2-Disc Set": "2_disc_set",
          "2D/3D Edition": "2d_3d_edition",
          "2in1": "2_in_1",
          "3D": "3d",
          "3D Anaglyph": "3d_anaglyph",
          "3D Full SBS": "3d_full_sbs",
          "3D Half OU": "3d_half_ou",
          "3D Half SBS": "3d_half_sbs",
          "4K Remaster": "4k_remaster",
          "4K Restoration": "4k_restoration",
          "Digital Extras": "extras",
          "Director's Cut": "director_s_cut",
          "Dolby Atmos": "dolby_atmos",
          "Dolby Vision": "dolby_vision",
          "Dual Audio": "dual_audio",
          "English Dub": "english_dub",
          "Extended Cut": "extended_edition",
          "Extended Edition": "extended_edition",
          Extras: "extras",
          HDR10: "hdr",
          "HDR10+": "hdr10_plus",
          "Masters of Cinema": "masters_of_cinema",
          Scene: "scene",
          "The Criterion Collection": "the_criterion_collection",
          "Theatrical Cut": "theatrical_cut",
          "Two-Disc Set": "two_disc_set",
          Remux: "remux",
          Rifftrax: "rifftrax",
          Uncut: "uncut",
          Unrated: "unrated",
          "Warner Archive Collection": "warner_archive_collection",
          Commentary: "with_commentary"
        }
      },
      targetInfo: {
        editionTags: {
          "2d_3d_edition": "2D3D",
          "2_in_1": "2in1",
          "3d": "3D",
          "3d_anaglyph": "3D",
          "3d_full_sbs": "3D",
          "3d_half_ou": "3D",
          "3d_half_sbs": "3D",
          "4k_remaster": "4kRemaster",
          director_s_cut: "Director",
          dual_audio: "DualAudio",
          english_dub: "EnglishDub",
          extended_edition: "Extended",
          extras: "Extras",
          hybrid: "Hybrid",
          scene: "Scene",
          theatrical_cut: "Theatrical",
          uncut: "Uncut",
          unrated: "Unrated",
          webdl: "WEBDL",
          webrip: "WEBRip",
          with_commentary: "Commentary"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#imdbauto"
      },
      tmdb: {
        selector: "#tmdbauto"
      },
      mediaInfo: {
        selector: "#mediainfo"
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      videoType: {
        selector: "#category_id",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      torrent: {
        selector: 'input[type="file"][accept=".torrent"]'
      },
      category: {
        selector: "#autotype",
        map: {
          BD100: "UHD 100",
          BD66: "UHD 66",
          UHD50: "UHD 50",
          BD50: "BD 50",
          BD25: "BD 25",
          DVD5: "DVD 5",
          DVD9: "DVD 9",
          remux: [
            "UHD Remux",
            "BD Remux",
            "DVD Remux"
          ],
          encode: [
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          web: [
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hdtv: [
            "2160p",
            "1080p",
            "1080i",
            "720p"
          ],
          dvd: [
            "DVD 9",
            "DVD 5",
            "DVD Remux"
          ],
          dvdrip: [
            "480p"
          ],
          other: ""
        }
      },
      source: {
        selector: "#autosource",
        map: {
          uhdbluray: [
            "Blu-ray"
          ],
          bluray: [
            "Blu-ray",
            "BD 50",
            "BD 25",
            "BD Remux",
            "UHD 100",
            "UHD 66",
            "UHD 50",
            "UHD Remux",
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hdtv: [
            "HDTV",
            "2160p",
            "1080p",
            "1080i",
            "720p"
          ],
          dvd: [
            "DVD",
            "DVD 9",
            "DVD 5",
            "DVD Remux",
            "480p"
          ],
          web: [
            "WEB",
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hddvd: "HD-DVD"
        }
      },
      resolution: {
        map: {
          "2160p": [
            "UHD 100",
            "UHD 66",
            "UHD 50",
            "UHD Remux",
            "2160p"
          ],
          "1080p": [
            "BD 50",
            "BD 25",
            "BD Remux",
            "1080p"
          ],
          "1080i": [
            "BD 50",
            "BD 25",
            "BD Remux",
            "1080i"
          ],
          "720p": [
            "720p"
          ],
          "576p": [
            "576p"
          ],
          "540p": [
            "540p"
          ],
          "480p": [
            "DVD 9",
            "DVD 5",
            "DVD Remux",
            "480p"
          ],
          other: [
            "Other"
          ]
        }
      }
    },
    Bib: {
      url: " https://bibliotik.me",
      host: "bibliotik.me",
      siteType: "Bib",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBwgUxywuxQAAA51JREFUOMvNlM1rXGUUxn/nvfe99733zkxnmk6bxDRaUGwWUsEiSPcF0X+g24JLN4LbLtwJurXQ7rqxuhTcuKiWWlxJaamC1CRtmpjJfGSSSe6dO/fjfV20paDQgiuf1QPnPL8DB86B/7vkZQ3Xrl0DaAEXRVzH97WNopgkSZib61qt9dfW2j/PnHnr5cDLl7/CWtvRWn+odfCl7/tdrQOiKCRJGiRJo/aU+qyy9vb+5DAYDXr/Bl65cvWZ7YIoa8vzwFXt69CYBqEJiSKNMYaytK6ZRLZG3P7kgMPJHv6z9A8/3sTzPGpbqwf37/u+1l+AOy/iKc9TQbPVxDnBGB9jQmazgtpGUtZ44/GAg4OUY91jz4FKKZTnnZ3l+aWqKn1r7Tta6+NBEJA0EowxhKHBGIPnefh+gOeHjHeHOGfpdueIIvMEeP36N4x62+equv54Vsw+qOpaBcpDeepp2MdEBiWKoigJQyGOI8bjMc5ZWq0WsUmwucX79d5v79+/e+e1qio/cs5eyNJDMSYiSRJ83wdxKOVjTBNbW0QcSinyPKfX69Fut4miiKqo0U7j7+2NvyuKgtFwoOYXFul05gjCgMgYiqIgz6dY65jslxw9GtFoBBwcHPJ4YwNfa5TnkaUZZVXS7R7H//mnG/6gv0OWZQxHu8RxTKvVYmVlhcXFBeq6ZjQa4zjAmAbD4ZCtrS3iOGZhYZE8z8nzKUkco0SQG7d+caPhgI2H6zxaX2c42CH0PY7PL7DwyiLLy6+yvHyKophSVRVpmlKWJe0jRzgxP0+apsxmM+qqYprnyKPersvSlOGgT2/7L3Z2tulvbbLd20bhOP3mKc6++za1i3j4cIP0MCXQAVprmq0mYRjSbrdptloIIKuPd74XkVopddrBG/ks59HaGg/++J29QR8lOUFkUapDv79LlmUA2Nqitc/c3BxLJ0+ytLREp9NB1jb7HlADnzjnPn3qTygRfzLZ597dO9y+dZOqLGi32wBMsynW1pRFQRzHJHGMDgI8z3tyemubfZxzLRFpACeBb4Fla21VFIVMp5ma7E+kKGZM9saMd4eMxyPWV1exRY7WIToMnwOfaW2zD2Ccc+8BsYjKlafO4dylsqy8uq4oi4KimFGWBVmakmUp6WFKmh4wy7MXf5vVxzsAr4vIBRFRAKIUSsSKSEeEi0VZHZlmGdNpSjHLX/4PXzDoGPC5iMyLSAUgIv8N+HQ1AN4/a38DST6z5HJSpzwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDg6MjArMDA6MDBZ+4VCAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA4OjIwKzAwOjAwKKY9/gAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload",
      name: {
        selector: "#TitleField"
      },
      description: {
        selector: "#DescriptionField"
      },
      anonymous: {
        selector: "#AnonymousField"
      },
      image: {
        selector: "#ImageField"
      },
      format: {
        selector: "#FormatField",
        map: {
          epub: "15",
          mobi: "16",
          pdf: "2",
          azw3: "21"
        }
      }
    },
    Blutopia: {
      url: "https://blutopia.cc",
      host: "blutopia.cc",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/torrents/create?category_id=1",
      torrentDownloadLinkSelector: 'a[href*="/torrents/download/"]',
      needDoubanInfo: true,
      seedDomSelector: ".torrent__buttons+.panelV2",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: 'input[name="name"][class="form__text"]'
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anon"]'
      },
      torrent: {
        selector: 'input[type="file"][accept=".torrent"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "12",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "11",
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    CHDBits: {
      url: "https://ptchdbits.co",
      host: "ptchdbits.co",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA81BMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD0AAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAARAAAjAADaAAD/ICBmiIgEBAQDAwMBAQEAAAAAAAAAAAD/AAD/3d39/v7GxsYAAAAAAAD/AAD/5OT/////AAAAAAADAwMCAgIBAQG5ubmAgIBaWlq6urq1tbWysrI0NDT///9/f3/7+/tJSUnLy8tRUVFOTk6mpqb19fXe3t7d3d3c3Nzu7u69vb0hISEdHR0XFxeOjo5X4OIMAAAAM3RSTlMAgbIHAnne59jwjna/7aAVK0RCQQ1VtrUFA7L7/PhdGBgDAwW2/unnnQaxGKDt6LawIeA+sl6aAAAAAWJLR0QyQNJMyAAAAAd0SU1FB+UECQo4D4hi7WcAAACoSURBVBjTY2BgYDRGBUzMDCysbGiC7EwMjBzGxpxc3HDAymNszACU4uXjFxAUggBhEVExcZCgmISklIk0GMjIyskrKIIExZWUVUzNTExMzE1NVdXUNTRBglraOroWlkBRK2sbWzsTPX2QoIGhkb29jamJiYO9vaMTUAdc0NnF1ckNXdDdw9PLG13Qx9fPPwBdEKuZ6IJYnYTV8Vi9iRkgWIMOayBjiw4AMGtCDVTI3J4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMDlUMTA6NTY6MTUrMDA6MDBQcxNEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTA5VDEwOjU2OjE1KzAwOjAwIS6r+AAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(6)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: "#torrent"
      },
      tags: {
        chinese_audio: 'input[name="cnlang"]',
        chinese_subtitle: 'input[name="cnsub"]',
        diy: 'input[name="diy"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406",
          music: "406"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "5",
          h265: "5",
          x264: "1",
          x265: "5",
          mpeg2: "4",
          mpeg4: "6",
          vc1: "2",
          xvid: "6"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "7",
          dd: "4",
          "dd+": "7",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "13",
          dtshdma: "10",
          atmos: "10",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "19"
          ],
          bluray: [
            "1"
          ],
          remux: [
            "3"
          ],
          encode: [
            "4"
          ],
          web: [
            "18"
          ],
          hdtv: [
            "6"
          ]
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "6"
          ],
          "1080p": [
            "1"
          ],
          "1080i": [
            "2"
          ],
          "720p": [
            "3"
          ],
          "480p": [
            "5"
          ]
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "8",
          US: "3",
          EU: "7",
          HK: "5",
          TW: "9",
          JP: "4",
          KR: "6",
          OT: "0"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chdbits: "14",
          sgnb: "13",
          remux: "1",
          chdtv: "2",
          chdpad: "15",
          chdweb: "12",
          chdhktv: "11",
          stbox: "10",
          onehd: "8",
          blucook: "16",
          hqc: "17",
          gbt: "18",
          kan: "19"
        }
      }
    },
    CinemaZ: {
      url: "https://cinemaz.to",
      host: "cinemaz.to",
      siteType: "AvistaZ",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAAAB3RJTUUH5QwGCikNXab0zAAAAL1JREFUGNNlyi1IA3EAxuFnHzoE3WSw4hBsBpOIzWTUZBaFlctL64LdImJfH1ZBZ7YLNneMQ8OF3dzcQNC/QZGh7y8+bwFbTkVKEg0ndsRScjZdSiR2DS26ta7iSMyFKws4lNnDsjtN8mpeTNGX6SOTqlJQciyzpGlD1bN9B87FzGsZGBvpmhhJReZUoK4nCD4FwYNtZ9qw6kn4bagnuC/6u7IyPvL/4N0bct8wy7HIjdcixrrWhJ/Lo45rK18qoT8Iilms5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMi0wNlQxMDo0MToxMyswMDowMGagtagAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTItMDZUMTA6NDE6MTMrMDA6MDAX/Q0UAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="/download/torrent/"]',
      needDoubanInfo: true,
      search: {
        path: "/torrents",
        params: {
          search: "{imdb}",
          "in": "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    Cinematik: {
      url: "https://cinematik.net",
      host: "cinematik.net",
      siteType: "Cinematik",
      icon: "data:image/png;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8ACAgIAA0NDQATExMAFBQUABsbGwAfHx8AJycnACoqKgAtLS0AMTExADU1NQA5OTkAPj4+AEFBQQBFRUUASEhIAE1NTQBRUVEAVVVVAFlZWQBdXV0AYWFhAGVlZQBpaWkAbm5uAHJycgB1dXUAenp6AH5+fgCCgoIAhoaGAImJiQCOjo4AkpKRAJSUlACdnZ0ApaWlAKioqACsrKwAsrKyALS0tAC8vLwAxcXFAM3NzQDa2toA6enoAO/u7QD+/v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/ykgICAfHx8fICv///////8iJiAZGRkYGRgiKf//////IBsZFBQUFBQSIC4p/////yIkGxQQEhISEB0wLib///8gGRUQDQ0NDQ0SFBkfKf//ICIZDBQdEgwMCQwYGxv//x8dFQkZMC0fDQkJFRsZ//8fHxUFGDAwMCwYBxUbGP//Hx8YAhgwMDAwIgUVHxj//x0VDTEVMDAqFQUCEBUV//8dIhgxDSkVAzExMRUgFf//HRAJMTECMTExMTEMEBX//x0lGTExMTExMTExGSQU//8dEgwxMTExMTExMQwQFP//HSAVMTExMTExMTEVIBX//yYYGBUYGBgYGBUYGBQg/4Af//+AD///gAf/P4AD//+AAf85gAH//4AB//+AAf//gAH/P4AB++eAAb5fgAFc6YABvl+AAVc6gAE/v4AB/z8=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "div.odiv_1 + table >tbody tr:nth-child(3n)",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        params: {
          search: "{imdb}",
          cat: 0,
          incldead: 1,
          srchdtls: 1
        }
      }
    },
    Concertos: {
      url: "https://concertos.live",
      host: "concertos.live",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,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rRvmotBO9rKvAe39kDEM7dv4twRt539nXA9abmZahZabmUah5WamVWi5mWkVWm5mGoWWm5lWoeVmplVouZlpFFpuZlqFlpuZRqHlZqZVaLmZaRVabmYahZabmVah5WamUWi5mWkVWm5mWoWWm5lGoeVmplVouZlpFFpuZlqFlpuZVqHlZqZRaLmZaRVabmZahZabmUah5WamVWi5mWkUWm5mWoWWm5lWoeVmplFouZlpFVpuZhqFlpuZVqHlZqZVaLmZaRRabmZahZabmUah5WamVWi5mWkVWm5mGoWWm5mPpas/zCs/nqA/xpnS8Ju69C9khqnUdh3WhAAAAAFvck5UAc+id5oAAACZSURBVDjL1dOxEQMxCATAU0AJ9EMJCkT/rfzYL/HcRXbgwGTsD9L8cAKocnHvmdRbMrz6DiMFUsAFLBlGMlSfdOADLvAMbLCfwnIBCEAgBCYYFgQgEAIBhgmB+HcYwWBtDVGZaGAKrpCfg803jAO2t1hw1npGTMEVKgn3p9XA7kw8gHZJ/f4k6A8D34BX4HbZSSTN9H7fXnUBXz+QkWPfUykAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMjdUMDM6NDc6MzUrMDA6MDBKPrQ3AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTI3VDAzOjQ3OjM1KzAwOjAwO2MMiwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0xMC0yN1QwMzo0NzozNSswMDowMGx2LVQAAAATdEVYdGRjOmZvcm1hdABpbWFnZS9wbmf/uRs+AAAAFXRFWHRwaG90b3Nob3A6Q29sb3JNb2RlADNWArNAAAAAJnRFWHRwaG90b3Nob3A6SUNDUHJvZmlsZQBzUkdCIElFQzYxOTY2LTIuMRwvbAsAAAAQdEVYdHhtcDpDb2xvclNwYWNlADEFDsjRAAAAKHRFWHR4bXA6Q3JlYXRlRGF0ZQAyMDE4LTA0LTE1VDE4OjE0OjIxKzAyOjAwX6YhzgAAADN0RVh0eG1wOkNyZWF0b3JUb29sAEFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpmllTCQAAACp0RVh0eG1wOk1ldGFkYXRhRGF0ZQAyMDE4LTA0LTE1VDE4OjMzOjE2KzAyOjAwJmTVnAAAACh0RVh0eG1wOk1vZGlmeURhdGUAMjAxOC0wNC0xNVQxODozMzoxNiswMjowMBrAhiIAAAAWdEVYdHhtcDpQaXhlbFhEaW1lbnNpb24ANjTJIcZzAAAAFnRFWHR4bXA6UGl4ZWxZRGltZW5zaW9uADY0FLcf9gAAAEt0RVh0eG1wTU06RG9jdW1lbnRJRABhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGI0NjQyYjktODE1OS0xMTdiLWI3MzQtOWVjODc3YWYyZDliEBg3pQAAAD10RVh0eG1wTU06SW5zdGFuY2VJRAB4bXAuaWlkOjlmMThhNDc5LWIwYTUtNDczMS1hNjcxLTZhYTllMjAyNjdhMl6RzKYAAABFdEVYdHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRAB4bXAuZGlkOmMwOGUxNmM1LTZkNGYtNGVlMy04ZGVkLWYzMTJiZWIyMWVlOSZ+IrEAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: true,
      seedDomSelector: "div.torrent > div.buttons.mbox.mbox--small-bottom",
      uploadPath: "/upload",
      needDoubanInfo: false,
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdb: "{imdb}",
          order_by: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "div.sceditor-container textarea"
      },
      imdb: {
        selector: 'input[name="imdb"]'
      },
      tmdb: {
        selector: 'input[name="tmdb"]'
      },
      mediaInfo: {
        selector: "#mediainfo"
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      category: {
        selector: 'select[name="type_id"]',
        map: {
          BD100: "1",
          BD66: "2",
          UHD50: "3",
          BD50: "4",
          BD25: "5",
          remux: [
            "12",
            "7"
          ],
          encode: [
            "8",
            "10",
            "11",
            "13"
          ],
          web: "9",
          hdtv: "17",
          dvd: [
            "14",
            "16"
          ],
          dvdrip: "13",
          other: ""
        }
      }
    },
    DicMusic: {
      url: "https://dicmusic.com",
      host: "dicmusic.com",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB0VBMVEUAAABRyvRWzPVd0PRQyvRdz/V83fiA3/h+3vil7vt32/d/3vhRyfVRyfRQyfVRyPVSy/NNzvBQy/RRyvNdx/BcxvFSzvgA//9RyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRQyvRRyvRRyvRRyvRRyvRRyvRRyvRSy/VUzPRRyvRRyvRRyvR73fiB3/lRyvRRyvRRyvRRyvRUy/Rl0/Z53PiC4PmF4fmF4fmA3/iC4PmF4vqF4fmD4PlRyvRRyvRRyvRQyvRe0PV73fiA3/h+3vh+3vht1vdazvVSyvRs1vZ/3vh+3vhRyvRPyfRQyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyvRRyfRRyvRRyvRQy/RRyvRRyvRRyvNRyfNQyvRSyvRSy/ZRttpRqcdVzPRg0PVq1fZw2Pdz2fd02vd12vh02vh00+90z+ly2ff///+GemWQAAAAh3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABLmt8WBYGi/v8w0AJg+iRUDw1GggrWZ72+vTw1WkEGV2y5/JNdNKfAlaZiUlUxv7IDh+OFxWT9eczjK6505EQit33+fv7+/v5/f37/ukOjUNFS1FRUVCB8dtmUDTreOXCPjbxMAskEfiWBXOqAzMzDrfyAAAAAWJLR0SamN9nEgAAAAd0SU1FB+cKGgg3G6bwFqAAAAE1SURBVCjPY2AYHoARBnBIS0hKScvI4lLAKCev0K6opIzVDJCIiqpCe7uauoamljaqPEhSR1dP36AdCAyNjE1MzYDyUFNApLmFpZViOxxY28CkQUDW1k6hHQXYOzAyODo5u6gwMsq5urmjSnZ0engyMXh5KxrY+/j6+QNFurrau2Ggp7cvIJAZ6Jeg9vbgEJD6/gkTJ02eMmXq1ClAMG36jGmhYUC7wyMi2xWjDKJjYuPi4+MTEmdOTooHgeT4lFSQ09KC29MzMrOyc3Jzc/PyC9oLi4pzIaAE5CXJ0nYZRhZWNnZ2dg7OsvKKSi5udgjgBoVHVXVpDTSAeBhr6+p5+fgRoSXAmNHQ2ASXBgJBIaTAFGZsbtHGFYUMDEKtbfWMjLy4pEVEgeaJ4Uwh4kBAv/RIPQAAlh1hyJQd92oAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMjZUMDg6NTU6MjYrMDA6MDA7po/7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTI2VDA4OjU1OjI3KzAwOjAw7Iw88wAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0xMC0yNlQwODo1NToyNyswMDowMLuZHSwAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}"
        }
      },
      torrent: {
        selector: "#file"
      }
    },
    DiscFan: {
      url: "https://discfan.net",
      host: "discfan.net",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzkJYndFrgAAAwxJREFUOMt9lFlvJEUQhLOOrj6qp+duH2Ps1bJIIOD//xOeOBZ7oe2Zcc/0XXfyYEu7sBbxlqH8lEopFAQR4S29+oS8jOStHf4m9iI9TagUBRdEEsVpJAQh5P9grbVVOhKJSAVaF+/3pnt4qNpjXFx8+HD7zV2c8DdgRDyfz1VVCRFflJdcCESCwQXVHY/HX5qn3451fap/+vEHKfMXhL6SgF1zru7v6/rcNk3XNICBc8oCjqN56vXAARnW9enjH/dKqX/BMCk4PEmjYuoHNT63J6UnoBQI1q07ekhkNi+KvJCB4vF49N6/wgig2zZV6oLhNecJpX3b1afngL4x6rEbJpGuN5vNuiyKpRBCKTVN4+vPzphmaCgEGUUbgjGxfxn76f7TaVYb5ZrZspyx3VU5X8wjRiLnInTdYS9lzgHAWFM7HdAzChknGeO5MRMAR5JsN5YxpaZ5JBbOiVGlWnMaOq2m8ZIDgJ4mZY1BxwPrECgBT0mayovr3Xq9rqrq14+/R+OptI6gJeAogcFmahg4ACjvD88nPekQggveaTeT8lKkIo6BkCRNMAQ1tBO2hAfCkdNoghA5ywGAEXJ8PNXns7EOrY8ciquNny+qx2oYuqf9HoBM0eyhI2IcGdo4QpWwPMs4AMhMUkJNP4rA1nF0M8vuVmuTZVqNfz7XRo95Khe7azVM/fkc+j511rM8zyQHgCxNv73eRXUzj/ilzHflKru5g91l0zf4d3VrdZQIxUW2TgYp9dAPbb8py0gIDgCUsfffvRfHukC/nC/ysvTbjUjTDEOR95lWmdJ+aE1eZEmSCeEDrMvt52wvtxv/8/difyhmhduuaJ4QQO99ANBA02DkMBrKIC/6pt8sV7Ni9hmmhC5vbgYhFOFQFCllIQR0DgmxlARLYgzS2upwSOWsvLogQL7INkAkxOzqSiexHUeLGBCRECRA4sSzqLX6NE6L5er23S3jryfJf5okhGCMGbpOGWOMmaYxTJOgpNhs56t1kmVf9gH5uoZeHKP1qJRzTjCWScmF+LqJ/gFiT9/X+5vOiQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo1NzowOSswMDowMA4aMCMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NTc6MDkrMDA6MDB/R4ifAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      torrent: {
        selector: 'input[type="file"]'
      },
      category: {
        selector: "#browsecat1",
        map: {
          tv: "411",
          tvPack: "411",
          documentary: "413",
          cartoon: "419",
          sport: "417",
          concert: "414",
          variety: "416"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "2",
          bluray: "3",
          remux: "0",
          encode: "10",
          web: "9",
          hdtv: "1",
          dvd: "4",
          hddvd: "4",
          dvdrip: "10",
          other: "0"
        }
      },
      area: {
        selector: "#browsecat",
        map: {
          CN: "401",
          US: "410",
          EU: "410",
          HK: "404",
          TW: "405",
          JP: "403",
          KR: "406"
        }
      }
    },
    EMP: {
      url: "https://www.empornium.is",
      host: "empornium.(is|me|sx)",
      siteType: "gazelle",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php"
    },
    FL: {
      url: "https://filelist.io",
      host: "filelist.io",
      siteType: "FL",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABAlBMVEUsg6Qsg6MsgqMsWWssRU8sR1IsJiYsKSosLS8sLC4rLS8rLjErLjArLTAsKSkrMjYpSVcjeZsig6oihKsje54oS1okb40nWGwsKissKCkrNDknV2ofm8sifqIlaYQkbIglZ4IoUWIhj7okbIknVWgglsQoTFstIiAoT18laoUrNTogl8UmWm8qNz4qNz0qNjwmXnQglMElaYUsKCgqOkIlaIIfmsogmMcglMIjfJ8mYXgsJycpQUwfnMwpSFUqPkclZ4EsJSQsKy0rKisqNj0oTl4sJCIrMDMnUWIgkb0hi7Ula4glaoYpP0grNDojdZUpRlMsKiosLC0igqgpRlL///+rTVq6AAAAAWJLR0RVkwS4MwAAAAd0SU1FB+UEDAMIEgwtfPAAAADJSURBVBjTbZHHFoIwFAUDAoGoqGAv2BV7r1iw9+7/f4uKiKDMIos5bzM3AGD4DxgAmIUgDRAWDOAEBQ1QBA5wEtIGIKlIRkMnEbK+QDY7o0nW4XRxHO/2eH1+TQaCoXBEiMbiiSSrk6l0JkshMZGDX5n3FYqlcqVaq39lo9lqd7q9TF8vpYF7KIijsbctTyCczt6X82p4sWRX6822vtsfJEXO/MfT+YKYq8xz3O1OqUXIhhj6+SoJahH9DlRTP/J/ELPpTEc2+44Hf1AYDR9uHSMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MDg6MTgrMDA6MDCjgoMzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjA4OjE4KzAwOjAw0t87jwAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "3",
        nameOptionKey: "0",
        params: {
          search: "{imdb}",
          searchin: "{optionKey}",
          sort: "3"
        }
      }
    },
    GPW: {
      url: "https://greatposterwall.com",
      host: "greatposterwall.com",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABVlBMVEUAAAAvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMH////T/m9bAAAAcHRSTlMAABScbxoq5/nNlouiawwn4/36fQENv7PZH3D85e83GcnmK5OtCcbdOWzyWjjfowdURS3wQ3PcxQ8bYuGdBChjj5rWqqu2ICRMCL0y29cCprcje/v30U/+znJJX/boSPQGEsM6CpX1hBGN4FCw6p41N9CYMAAAAAFiS0dEca8HXOIAAAAHdElNRQflBg8QJipZPSzlAAABIUlEQVQoz13R11bCQBAG4AyCYkGToKImWBAsCAQLKmLsLRbsohKw9zbvf+WWILv+V3u+zJmdnSgKCfga/AGgUcRAY1OwuaW1LdQuOXSoiKhperhTdOjqJhyJYE+vxNBnIJomRvvlLgODSDMUkxmGGccTMvtGqI6O/Sse14kmJ0C+MZWmxRmrrlYsOzlF58PpGaE2N2sk0wbluXmB8wsF5FmkncFesoE1Xg5yXmGcWE2xiyG/xnndZtUbm1vbO+Tg7HJW9yhDzthXD8iheOg1PzomG3dOTs/OL+j3sMely6vrctytZAOsefXGc9R0Mmrmlg0Kd/coxHzgKwAou3V1/bU/BI9PRk2fX5y/t8LrW5Rf+h5yhA2A9fH5VdIK3z9Frr/KLlYZgS4NmAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0xNVQxNjozODo0MiswMDowMN+dGPkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMTVUMTY6Mzg6NDIrMDA6MDCuwKBFAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{imdb}",
          order_by: "size",
          order_way: "desc",
          group_results: 1,
          action: "basic",
          searchsubmit: 1
        }
      },
      needDoubanInfo: true,
      torrent: {
        selector: "#file"
      },
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2D/3D版": "2d_3d_edition",
          "4K修复版": "4k_restoration",
          "4K重制版": "4k_remaster",
          DIY: "diy",
          "DTS:X": "dts_x",
          "HDR10+": "hdr10plus",
          HDR10: "hdr10",
          Remux: "remux",
          Rifftrax: "rifftrax",
          "半高3D": "3d_half_ou",
          "半宽3D": "3d_half_sbs",
          "标准收藏": "the_criterion_collection",
          "重制版": "remaster",
          "导演剪辑版": "director_s_cut",
          "电影大师": "masters_of_cinema",
          "杜比全景声": "dolby_atmos",
          "杜比视界": "dolby_vision",
          "额外内容": "extras",
          "二合一": "2_in_1",
          "红蓝3D": "3d_anaglyph",
          "华纳档案馆": "warner_archive_collection",
          "加长版": "extended_edition",
          "评论音轨": "with_commentary",
          "全宽3D": "3d_full_sbs",
          "双碟套装": "2_disc_set",
          "双音轨": "dual_audio",
          "未分级版": "unrated",
          "未删减版": "uncut",
          "英语配音": "english_dub",
          "影院版": "theatrical_cut",
          "中字": "chinese_subtitle"
        }
      },
      targetInfo: {
        editionTags: {
          "2_disc_set": "2_disc_set",
          "2d_3d_edition": "2d_3d_edition",
          "2_in_1": "2_in_1",
          "3d": "3d",
          "3d_anaglyph": "3d_anaglyph",
          "3d_full_sbs": "3d_full_sbs",
          "3d_half_ou": "3d_half_ou",
          "3d_half_sbs": "3d_half_sbs",
          "4k_remaster": "4k_remaster",
          "4k_restoration": "4k_restoration",
          director_s_cut: "director_s_cut",
          dual_audio: "dual_audio",
          english_dub: "english_dub",
          extended_edition: "extended_edition",
          extras: "extras",
          masters_of_cinema: "masters_of_cinema",
          scene: null,
          the_criterion_collection: "the_criterion_collection",
          theatrical_cut: "theatrical_cut",
          two_disc_set: "2_disc_set",
          remux: null,
          rifftrax: "rifftrax",
          uncut: "uncut",
          unrated: "unrated",
          warner_archive_collection: "warner_archive_collection",
          with_commentary: "with_commentary"
        }
      },
      description: {
        selector: "#release_desc"
      },
      imdb: {
        selector: "#imdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo[]"]'
      },
      category: {
        selector: "#releasetype",
        map: {
          movie: "1",
          tv: "3",
          tvPack: "3",
          concert: "5"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          web: "WEB",
          hdtv: "HDTV",
          hddvd: "HD-DVD",
          dvd: "DVD",
          other: "Other"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "Other",
          mpeg4: "H.264",
          vc1: "Other",
          xvid: "xvid"
        }
      },
      resolution: {
        selector: "#resolution",
        map: {
          NTSC: "NTSC",
          PAL: "PAL",
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p"
        }
      },
      format: {
        selector: "#container",
        map: {
          mkv: "MKV",
          mp4: "MP4",
          avi: "AVI",
          ts: "TS",
          wmv: "WMV",
          vob: "VOB IFO",
          iso: "ISO",
          mpg: "MPG",
          m2ts: "m2ts"
        }
      },
      videoType: {
        selector: "#processing",
        map: {
          encode: "Encode",
          remux: "Remux",
          DIY: "DIY",
          bluray: "Untouched",
          uhdbluray: "Untouched",
          dvd: "Untouched",
          dvdrip: "Encode"
        }
      }
    },
    HD4FANS: {
      url: "https://pt.hd4fans.org",
      host: "hd4fans.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "405"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          hddvd: "2",
          remux: "3",
          encode: "7",
          web: "7",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: ""
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "5",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5",
          cmct: "6",
          r2ts: "7",
          kbits: "8"
        }
      }
    },
    HDArea: {
      url: "https://hdarea.club",
      host: "hdarea.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBhQINJhF4AAABH1JREFUOMuNlEtsVGUYht//P/85c86c6bQz7UynMx2mLdALt2IFLZabNaAmGgRMJDFhoe41LtgYNiYsSIxRdxIJMZHISgwmLgjQCLFSC5XWQikNLQidTi+203Yu5/p/LlTUoMi7+r7vTd58m/dheAxRaeavxbMBkoDQAMYAACyYeGCzxwok+nNUYS/qIJ8jELHBmA2AGGOPF/ggKPuDjvmxFgx93SHDTT7VJct87mwdgvEsi7TNILZlGrU7cwAWxSNfO7kbAGIA64bEDkxPbHVE5bLnhZbN/K1WuHM5WNlJZL+7I5Vjg6X1hwYEANBkH1CZUtD/uU73B3Rv1XMuhRJF+ck+n3W0t1M5fxTFhaT0dLUcCFueUP1gcSbIrLtpMLmZHHBZsf6mD3Gak2cBS/eAhfE6OIX9IHmEmHhDKmqSH6OQF+1Y7Si1taVUl5jf9i7chu0/Gw6/ZFU+7UsW4vDBpVoNJ9QqnGBGCCgB4PirQLJut5TikBtsDC2knqzRqjIT+sCnLtPERhKGpeYm1EB6x0Uv1nICeTYumXsDo0NvwkWlHVuDUuypnODiG4Gx08DhsXqc6O7E8nQLk8Izez/cFFi6H0Q5yzhDo2q5KtkeuGr+KpPrbmvJddcxmm9lcBySgG82lpxE980oygMCdy5yZPu7oATXMs+BWpgUyvCZDAVERsICt8sAN1BO7ZBOpH7RBgrapbeisOc2EuyAb8QAIzWG2o7+vOOWBaLNKn76rJPKS62kmPD1GscJt9kU5JqWH1G1wgSnQJCKrbtKMMPn64EhzPc/Czv/PHwZtOJd8EKNNyoC6COmEEdkVRNmb7f5vhJdXnOwmDt4dnhp70dfMT0+otiWTQKQWsim1JY+O9N9C0AIRmwtypMr4EnFij1TLsS2DlUAg4wx4hg+dQAl2WBHm1FueGKYatLvmQqd0+9d9pT8lOEHamCnNpeFHu4RApMYfL8N5HcSMdU1MuBGoo/F24anFvMIaxzCUyOrYSRDXqSl4GW2XqkuLF8IFr20FWk+oNge+WacCmv3ZgXDucTC1TByPS9h7vp26RqslNguSTN7TA3XiFcBAIRX0dRLqU1VqGlz1Xjb98bgkTDGT65zV72+4Bupa1LRVL9uZbZq6HCa2XMvUHFir7RKaSe0QdqpXXMUTF099Rq7/84p+XuXrdyoWg7Xb+NcqHpAu6v+eCiNkY+PU+WGCTe956qr1whl9lp7YOpCA1n5uOSmaletd0rpl2eVzJ5zzIx/QK47UmUKCIVDlGqbXQC9LiBD82MRokAXyAywheFObeHGBs3njEjT3OAKUVi5X9iJnVOoaO41BM5A6D1SwRSTKoTC/kkbf/RLcCMunMXbza419zabvrxHWRyv9dVqFFMvOqhcPQIzcd6tSPc64fRojUBWYchLQIb+C18zPgEcGjx3o37l6BbP4/tcsyHpxNq/peqmPlM3rkQZfiHA4uzfyffQ9W8w5XeX8QqAxnoTXygcswAkY49m8kM89OQfBofkvnuaCMz1IMEZfML/6jelxwpRbOI1GgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjoyMDowOCswMDowML4c7OgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6MjA6MDgrMDA6MDDPQVRUAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "300",
            "401",
            "415",
            "416",
            "410",
            "411",
            "414",
            "412",
            "413",
            "417"
          ],
          tv: [
            "402",
            "403"
          ],
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "7",
          x264: "7",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "0",
          dvd: "0"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "11",
          dd: "5",
          "dd+": "4",
          flac: "1",
          dts: "3",
          truehd: "7",
          lpcm: "8",
          dtshdma: "4",
          atmos: "10",
          dtsx: "0"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "1",
            "300"
          ],
          bluray: [
            "1",
            "401"
          ],
          remux: [
            "3",
            "415"
          ],
          encode: "7",
          web: [
            "9",
            "412"
          ],
          hdtv: [
            "5",
            "413"
          ],
          dvd: [
            "2",
            "414"
          ],
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": [
            "1",
            "410"
          ],
          "1080i": "2",
          "720p": [
            "3",
            "411"
          ],
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          epic: "1",
          hdarea: "2",
          hdwing: "3",
          wiki: "4",
          ttg: "5",
          other: "6",
          mteam: "7",
          hdapad: "8",
          chd: "9",
          hdaccess: "10",
          hdatv: "11",
          cxcy: "12",
          cmct: "13"
        }
      }
    },
    HDAtmos: {
      url: "https://hdatmos.club",
      host: "hdatmos.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAerwqYXVnYVNybF9uaFtjXUxTXlcyYnQOb54Ae7wMcKJYaWi0rqbUz8fTz8fSzcXNycG/urKemY1bcXERb50sYnSOioHf29Lt6d/s6N/m4tnBvLFNcntrb2bFwLjt6eHu6eHt6eDr597q5t3n49qRkINrf3+1t7C5u7W6u7S+urG9urG5urTEw7vj39br59/s6eCuqZ0Qc6Uib5Ijb5EkbIxQZGN8d2qAem6JhXlDaXMibpEwaoGVmpLl4disp5sAe70OcKBscWnEv7fV0MjV0cnMx706a3sAe74IcqdjdnXTzcTq59+Mj4UBe7wBerskZoGSj4bi3dTv6+O5urIibpAAerscZod4enLW0cnu6+PPy8JFcoABebg9Y26zrKLp5dyOl5EMcqUCeLcbZodaY12uqJ/t6uHk4Nh3jY4Pb54JcqZdb27Iwrji3tVggYgKbZ4yX21obGavqaDi3dXd2dF9kJIVcZ0Wa5N/f3Xb1s7Lx70zboYvY3WDfXLFwLft6ODKycFhfYESb50AebouZ36emY6nraYWZolMbXXCvLOdoJcTZ44Cd7VIZGi6tKvr5t14jY4HcqgxbIO6tKm6tqprdG/SzcTs6N7e2dBJc38AebsUa5WOk4vn4tns6ODQy8I+dYoAeLgeZoaMi4Lf2tK+vLMncZISa5R3fnnb1czMx743c40AebkCebg2ZXWrpJno5NuSl44YY4IcZYRHXmCcmI6vsKcabpUHc6pYa2vDvbTk4NecnJNnbWd9eW+po5ra1c1nhIoGc6sRbpt3eG3Z1Mza1cze2dHh3dSAk5UUcJ0qa4ajn5Xn5Nzu6uLt6uLv6+Tp5d7Y1MyxtK1hgIgUcZ8lbYyTkYSxrqOxraOwraOtqp+XlIV9iIFReYUfaowGdKz///88yl8CAAAAAWJLR0TixgGeHAAAAAd0SU1FB+UECgcrNELreWwAAAGKSURBVBjTY2BgZGJGABZWNnYOTgYubh5eOODjFxAUEhZhEBUTl5BEBlLSMgyycvIKCvJgoKCgqKSspKyiyqCmrqGhoamlraWtoaGjq6evrGxgyGBkbGJsamZuYWFpZW1sY2unpCxvz8DJwODg6OTs4urmzuDh6eWtpOTjy+Dn5+8QEBikGBwS6hAWHhGpFBUdAxTkjI2LT1CST0xKTklNk0rPyMwCCjpk5+RKSublFxQWFZcEl5aVMzD4cTpUVFYppVfX1NbVSzU0NjUDrfHjbGltk1JSaO/o7FJWUuru8eD0Bwr29vUnKE2YOGnyFEklxanWDJx+DH4OjtOmz5CcOWv2nLnzlOYvWLgIKMjpsHjJUqX0Zcs9VqxcpSS/es1akOC69Rs2Kslv2rxl67Y8peDtOxyAgg47d+1WUtqzd9/+AweV5EsOHXbwAwoeOXoMGDLHp59Qlg8+eeo0JydQMOzM2XPnL1w4H3zx0uUrV68B7QYKMly/cfPW7ds379y9d//BQwZOf6AgACIJgNAMLRaxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQzOjUyKzAwOjAwjJgVBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0Mzo1MiswMDowMP3FrbsAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          h265: "10",
          x264: "1",
          x265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "20",
          ac3: "22",
          dd: "23",
          "dd+": "23",
          flac: "17",
          dts: "14",
          truehd: "13",
          lpcm: "15",
          dtshdma: "10",
          atmos: "11",
          dtsx: "12"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          hddvd: "2",
          dvdrip: "13",
          other: "13"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "15",
          "2160p": "10",
          "1080p": "11",
          "1080i": "12",
          "720p": "13",
          "576p": "14",
          "480p": "14"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "3",
          US: "4",
          EU: "8",
          HK: "5",
          TW: "3",
          JP: "5",
          KR: "6",
          OT: "9"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "6",
          bluray: "6",
          hdtv: "3",
          dvd: "8",
          web: "2",
          vhs: "12",
          hddvd: "7"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "22"
        }
      }
    },
    HDBits: {
      url: "https://hdbits.org",
      host: "hdbits.org",
      siteType: "HDB",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACUlBMVEWwxdaswdKswtKtwtKtwdKtwtOovc6juMmit8miuMmes8SftMWtv86qvMues8Omucmwwc+htcaywtC3xtO3x9Oxw9CYrb6fs8Pd5OnQ2uKXrL29y9Xn7PCpusiousjq7vHs8PPi6Ozo7PDp7vHDz9qdscGSp7iarr7g5uvS2+KTp7mRpre8ydTs8PKltsXF0NmesMCktsTG0dry9fbCzteTqLmMobKVqLje5OnP2N+LoLGJnrC3xM/r7vGgscC4xc+Jn7GLoLKOo7PN1t2ZrLuFmqyPorLd4ufY3+SfsL6er73Fz9ebrLrq7fC1wsyEmauGm6yFmquot8P3+PmltMF/lKWJnKzb4OX19/jk6ezw8vTs7/GVp7WWp7Xp7O+xvsh+k6SAlaZ+k6Wpt8N4jZ+DlqbZ3+TO1dyHmqmFmKi1wcro6+6QorDn6+6tusR3jZ55jp94jZ6Yqbb2+PmdrLlyh5h9kaDX3eLFztVwhpeptcDm6u2LnauptsBxhpdziJlyh5m2wcqGmKdxh5hsgZJ3i5rW2+DDy9NtgZNrgJGlsr3l6eyGl6WntL5ug5Nyh5eYp7O6xMxxhZZme4xyhZXU2t+/yM9ne4xkeougrrjk6OuCk6GBkqDk5+vP1tvV29/d4uW5w8p0h5ZnfIxgdYZleYqLm6eCkqBhdoZhdod2iJeRn6trf49rfo6Uoq2dqrWeqrWWo69/kJ5hdYdbcIFZbn9Zb4Bab4BYbn9ab4FYbX9YbX5XbX9Wa3xRZndNYnJMYnJNYXJNYXNNYnNJXm////9b9tfLAAAAAWJLR0TFYwsrdwAAAAd0SU1FB+UECgcqMrKT7RgAAAFGSURBVBjTY2DABhjBgImRkRlEszAyszIyMbBhAQzsSICDkxNMM3Bx8/DycXHxCwgKCgmLiPJzAQGDmLiEpJiYlLSMrJy8gqKSsoqqmBiDmrqGppaato6unp6CvoGhkbGJqRqDmbmFpZWVtY2tnZ2tvYOjk7OSixWDq5u7h6enl7e8j4+vn39AYFBwSCBDaFh4RGRkZFR0TGxcfEJiUmxwcihDSmpaekZGZlZ2Tk5uXn5BYVFxSSFDaVl5RWlpZVV1TU11bV19Q6NvUzNDS2tbe0dHZ1d3T093b1//hOqJk1oYJk+ZOm369BkzZ82ekz133vwFCxdNXsywZOmy5StWLlm1es3ades3bNy0dMmKzQxbtmzdtmXLlu07dm7ZtXvPDhB7C8NeLIBhHxbAsP/AgYP79x86fPjggcOHDwHpw/sPMxzBAgDlBZmERX8RVgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0Mjo1MCswMDowMPTFbxAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDI6NTArMDA6MDCFmNesAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#details >tbody >tr:contains(Last seeded)",
      torrentDownloadLinkSelector: 'a[href*="download.php/"]',
      search: {
        path: "/browse.php",
        params: {
          sort: "size",
          d: "DESC",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: "#imdb"
      },
      mediaInfo: {
        selector: 'textarea[name="techinfo"]'
      },
      torrent: {
        selector: "#file"
      },
      category: {
        selector: "#type_category",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "3",
          concert: "4",
          sport: "5",
          cartoon: "1"
        }
      },
      videoCodec: {
        selector: "#type_codec",
        map: {
          h264: "1",
          h265: "5",
          hevc: "5",
          x264: "1",
          x265: "5",
          mpeg2: "2",
          vc1: "3",
          xvid: "4",
          bluray: "1",
          uhdbluray: "5",
          vp9: "6"
        }
      },
      videoType: {
        selector: "#type_medium",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "5",
          encode: "3",
          web: "6",
          hdtv: "4"
        }
      }
    },
    HDChina: {
      url: "https://hdchina.org",
      host: "hdchina.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACPVBMVEUQYakSYqkRYqkPYKgTY6oRYamIsNRpm8kHW6YjbrCgwN0+f7ldlMS90+e+1Oe70uY9frkGWqUKXaceaq6oxd/G2epjl8YFWqWPtdYEWaQsc7Pf6vNSjcGDrdLl7vWRtteNs9ZHhbwudbSGr9OPtdeUuNgAVaIocbGHsNQLXaff6fMmb7BrncmQtte80+eevtwibK9FhLzj7PVSjMDA1ei3z+X3+vze6fPk7fX4+vxOir+0zeRRjMBtn8ro8PYLXqcMXqeLstUAU6Elb7AKXaZQi8BtnsqErtPW5PBbk8RaksOjwt1flcVTjcGTt9iOtNapxuCAq9EpcbLH2utKh75yoszg6vTd6PIDWKRNib7g6/Tm7vZ5ps8kbrAOYKgXZqscaa0sdLMNX6gYZqsrc7ItdLMdaq4LXaYOXqcMXaYIWqUNX6cOX6cKXKYLXKUqgMA1jsoNXqY0jMgqgL8VZ646k84dcbUofr4zi8gWaK4fc7Yid7lEoNdOq98rgcAUZq1auehFodYLW6Qcb7NnyfMsgsFCndRYt+YdcbQthMILW6URYqpWtOZBnNRZuOkbbrNWtedEn9ZlxvMrgcFBm9RWteYccLQ2j8sSZKtXtudDn9YQYqkbbrJYt+hmx/Rt0Po6lM5ZuOdBnNMgdLdNqd4ZbLFCndUIV6JAm9JYuOdAmtNCnNRDntYyicZFoNc+l9EXaa9gwe1DndVEn9cwiMUccLNoyvRSr+I0jMkWaa4KWqQXaq9Mqd1Zuen///9eDam/AAAAAWJLR0S+pNyDwwAAAAd0SU1FB+UECgYZKlRWekkAAAGBSURBVBjTY2BgZGJmYGFlYmFhYWUGsliAXAZGNnYOTi5uHl4+fgFBIWERUTFxoBSvhKSUtIysnLyEgqKSsoSKKjsTUFBBTV1aRoNPU5NPQ0ZLW01Hl5GBRU/fwNDIWMOEkdFEQ0ZaSpOJkYGBxdTM3MLSCiHIDLKO39rG1s4GLmjvIASyyNHJ2RxoposL0ExzZzVXNyaY7e4enl7ePr52tr5+/kCLAgLFg4JDQu3Cwq0iIqWjomMcGBgYYoXjWNTjExKlpOKTklOkUtPimBmYHdIzmO0zM+2FsrJzMjWzcpOACpnz8gsKGYqKC0tKy8orKkurMoCCDNU1tXX1DY1NzS2tbe0dLZ1dQLHunt7yvv4JE5v6J02eMnXapOkzgI7vnjlr9pwZc2GC8+YvyAGqXLho8ZKlM5ctX9pSvGLltEmrVq9hYmBYO3Hd+g3tGzdN7F2zecvWbduX7QDZvmNNBsOquXNrdy7bsWv3nr1r84BBz8wAVM7U3d0NpIFWdAMJAMLpbshyyXdQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjI1OjQyKzAwOjAweA92GAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjoyNTo0MiswMDowMAlSzqQAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".table_details>tbody>tr:nth-child(1)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrent_list>tbody>tr",
          url: '.tbname td a[href*="details.php?id="]',
          name: '.tbname td a[href*="details.php?id="]',
          size: ".t_size"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: "#cover",
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "20",
            "17",
            "16",
            "9",
            "410",
            "27"
          ],
          tv: [
            "13",
            "25",
            "26",
            "24",
            "27"
          ],
          tvPack: [
            "20",
            "21",
            "22",
            "23",
            "27"
          ],
          documentary: [
            "20",
            "5",
            "27"
          ],
          concert: "402",
          sport: "15",
          cartoon: "14",
          variety: "401",
          music: "408",
          ebook: "404",
          other: "409"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "6",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: [
            "1",
            "27"
          ],
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "8",
          dd: "8",
          "dd+": "8",
          dts: "3",
          truehd: "13",
          lpcm: "11",
          dtshdma: "12",
          atmos: "15",
          dtsx: "14",
          flac: "1"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "11",
            "20",
            "410"
          ],
          bluray: [
            "11",
            "20"
          ],
          remux: "6",
          encode: "5",
          web: "21",
          hdtv: "13",
          dvd: "14",
          dvdrip: "4",
          other: "15"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "17",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23",
            "410"
          ],
          "1080p": [
            "11",
            "17",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "1080i": [
            "12",
            "16",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "720p": [
            "13",
            "9",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "576p": "15",
          "480p": "15"
        }
      },
      area: {
        map: {
          CN: [
            "25",
            "22"
          ],
          US: [
            "13",
            "21"
          ],
          EU: [
            "13",
            "21"
          ],
          HK: [
            "25",
            "22"
          ],
          TW: [
            "25",
            "22"
          ],
          JP: [
            "24",
            "23"
          ],
          KR: [
            "26",
            "23"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdchina: "15",
          hdctv: "16",
          ihd: "12",
          hdwing: "10",
          hdwtv: "11",
          kishd: "17",
          openmv: "7",
          hdc: "22",
          diy: "23",
          khq: "6",
          exren: "30",
          joma: "26",
          anonymous: "25",
          crss: "24",
          ebp: "18",
          don: "19",
          esir: "20",
          trollhd: "29",
          wiki: "9",
          beast: "4",
          cmct: "2",
          ngb: "8",
          lu9998: "21",
          taichi: "28",
          u2: "27",
          enichi: "31",
          arey: "32",
          other: "5"
        }
      }
    },
    HDDolby: {
      url: "https://www.hddolby.com",
      host: "hddolby.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBAoGHTIjVicbAAABTUlEQVQY01WOvy9DURzFz/feW0/1pY2gogaLX4lBJBZCqiKxITGYTGIx+wOsRpbGarEwV0SExCTR+LU0GoIYMLw8vFfv1b1fgz6p73DyzUnOOR/SBEL9MVhR+Kz/mdTRpOhhwSUYFgAMJLhhK6sQ3qUWrcfDewDpqR65U64AfG2POlw9HgS69gI287LAAgCYZXY1TitzMcMAIKLJsf6OKcG/IKo2iea0bo7gRERS8fyv6P+Ll0pPV/UmCRIv+bcgXyaiWid9XNgP2wXgdGm5jxwCwDdtDclUQiqllIwnU1Zin4mdg5BBYOBX5USGjPa0HXv/Tn3H6FM3sRUoqehpo7Nx4ER0u7nkpp3xx89m2wVcf+ZyNzN9dO16TuOrWA9bWACsWTATf/jc6g5/5hTLtaB42zN5Xhqxi6bi9Q59jcaJDLORVNUWNJGRxCD8AK0whyYuCRA4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjI5OjUwKzAwOjAwOQaHIQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjoyOTo1MCswMDowMEhbP50AAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        chinese_subtitle: "#tag_zz",
        cantonese_audio: "#tag_yy",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "3",
          hevc: "2",
          x265: "4",
          h265: "2",
          mpeg2: "6",
          mpeg4: "0",
          vc1: "5",
          xvid: "0",
          dvd: "0"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "10",
          web: "6",
          hdtv: "5",
          dvd: "8",
          dvdrip: "8",
          other: "0"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "5",
          dd: "5",
          "dd+": "14",
          flac: "7",
          dts: "4",
          truehd: "2",
          lpcm: "3",
          dtshdma: "1",
          atmos: "2",
          dtsx: "1"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          dream: "1",
          hdo: "9",
          dbtv: "10",
          nazorip: "12",
          mteam: "2",
          frds: "7",
          wiki: "4",
          beast: "11",
          chd: "5",
          cmct: "6",
          pthome: "3",
          other: "8"
        }
      }
    },
    HDF: {
      url: "https://hdf.world",
      host: "hdf.world",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxUG6ZvEkQAABCJJREFUOMt9lc1rXFUUwH/3vq958zIz+ZhJZkzS1Jo0ta0iSCm40YK2SxH3grhUBBf+G/0LBKkFty5cuKq40SIKRdtS0pCpmXxNMpP5yrzv9+510WmLbfG3Oodz4d574PyO4CkCpAUqAyEkQtiobAlYBxqTQwfABrADpIDiOQQv4gEfYdhX0PkKKveAwqQWAT7wD/AL8MMkf4r5JKi89yXpwf3XVJ5+koyOrmohLwrUlA766HEHYRfRaQRagxBjVHYBw1oTUn6HkFs6CZ+9cPrdz9CwKgWfStRXIg0KlhRCCEHQaTHcuoO9sEY2OkLnOcLx0EJr6ZYjhLyuc/2tEGxlu39hVN++hjq4W3SXzn/uzs1/PbNyxp5vzIvlshS1aQ+tNf1Oh9L6Owi7iFGqYTfWsOpnsBvnDLS+LFQ6Nk1+t+ZOZaZVmpVWpfZxxU6uuU7kCHwdOnN46Ygci8BLMUqzlOqLeCurqCTAHLWRhxukvUzE7mwhma1dy5JkE62+N0yn4EydOvuFlw4/KKQjM3crwsoj0Tk+YfdRk9FwgLtynvqMw1x0wNR4D8c/QgZ9oaOx0EKg3XKN0tw4PWz+ZI5am0vilYvLBddxpqSJCELsYoFMl9Gqx4w3xdyrb1AOW0iRo1WApVOM6SWcapHU8vCdGSfQ1vK401oyVRKe7e82vfn1tyjNn0aGPkWvBoakXvQoFzTeTIXIWMC3PbR0sd0Yr7LMfK1KZhRp9SJ29vc8lURrJipfoPvIKb9+jnpjic4opVoymC07GLmFK8ZoUzOqryKHA3KjgmHaTNcWeXNRME5MjodNou6+Q5YsmGgFg0NkPMY0BJoMSyi0dFHCIVMZ5ODhU5l2oFLDVy6hPUs3GLB7sM/2xh8Mtm6jtcIE3UYncRDD/liyedAlHwOFnDyLIR6CkLimIjag3byPPwyoXXifuFple6fNwVGLLDyO0LptTAblap7rM71+n85RC0Pm6KBDt/WA7c27DDotKgVFH5vtjb85uvcbYTCiK1zCxCdOA1Jhb+iToxsmsAvsHO/ci9nfdMzqMsPKJXJius0HdFqPcLwp5qtFholFHEVkUZ/uxq8UCmUapxYpV+tRZJRaIhnvmUAC/AycR2WXVRLqSJuMw1T4QQIqIklMHh6OiQa3SdrNxzOrU9yTPW2c2MKW1h0r9m/J+mpqABrYBBoIeVkUyobROCfC3Q2RHG491plKSXr75IM2pAGg0UrpeHSsR71+eNLv3bQqtW+U30+f9DADdrCKoTaLl3KlrKzTFISDZ17KU1D55P7H6DyNVJJcz3NuJO2tTrp/D+NpdXa9P/Gcr/yejd+bRucOL+cE+BO4iUpvkIyapP7/CvZD4ApwepK/TLC3gB+fF6z4b/j0OxKwgEVg7bkV8BDYm7TphRXwL0hsE/fwC5NaAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjIxOjA2KzAwOjAwm25q+wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzoyMTowNiswMDowMOoz0kcAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "time",
          searchstr: "{name}",
          group_results: "1",
          action: "basic"
        }
      }
    },
    HDFans: {
      url: "https://hdfans.org",
      host: "hdfans.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~font table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "403",
          concert: "441",
          sport: "418",
          cartoon: "417",
          variety: "416",
          app: "419",
          ebook: "423",
          audioBook: "405"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "3",
          x264: "2",
          x265: "4",
          h265: "3",
          mpeg2: "10",
          mpeg4: "11",
          vc1: "5",
          xvid: "12"
        }
      },
      source: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          hdtv: "6",
          dvd: "7",
          web: "5",
          vhs: "10",
          hddvd: "17",
          cd: "9",
          sacd: "16"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "11",
          ac3: "10",
          dd: "21",
          "dd+": "21",
          flac: "12",
          dts: "2",
          truehd: "6",
          lpcm: "7",
          dtshdma: "4",
          atmos: "1",
          dtsx: "3",
          ape: "13",
          wav: "14",
          mp3: "17",
          m4a: "5",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "3",
          remux: "10",
          encode: "9",
          web: "7",
          hdtv: "6",
          dvd: "17",
          dvdrip: "17",
          other: "10"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "1",
          "2160p": [
            "2",
            "10",
            "9"
          ],
          "1080p": [
            "3",
            "5",
            "8"
          ],
          "1080i": [
            "4",
            "5",
            "8"
          ],
          "720p": [
            "5",
            "11"
          ],
          "576p": "6",
          "480p": "6"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "8",
          HK: "4",
          TW: "5",
          JP: "6",
          KR: "7",
          OT: "9"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdfans: "9",
          hdf: "10",
          chd: "1",
          hdc: "2",
          ttg: "19",
          wiki: "3",
          beast: "4",
          cmct: "5",
          frds: "6",
          hdsky: "7",
          ourbits: "17",
          hdhome: "18",
          pthome: "16",
          tlf: "8",
          pter: "20",
          pbk: "21"
        }
      }
    },
    HDHome: {
      url: "https://hdhome.org",
      host: "hdhome.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: "#torrent"
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "411",
            "412",
            "413",
            "414",
            "415",
            "450",
            "499",
            "416"
          ],
          tv: [
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "430",
            "452",
            "431"
          ],
          tvPack: [
            "432",
            "433",
            "434",
            "435",
            "436",
            "437",
            "438",
            "502"
          ],
          documentary: [
            "417",
            "418",
            "419",
            "420",
            "421",
            "451",
            "500",
            "422"
          ],
          concert: "441",
          sport: [
            "442",
            "443"
          ],
          cartoon: [
            "444",
            "445",
            "446",
            "447",
            "448",
            "454",
            "449",
            "501"
          ],
          variety: ""
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "1",
          x265: "2",
          h265: "2",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "3",
          xvid: "5",
          dvd: "5"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "15",
          dd: "15",
          "dd+": "15",
          dts: "3",
          truehd: "13",
          lpcm: "14",
          dtshdma: "11",
          atmos: "12",
          dtsx: "17"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "10",
            "499",
            "500",
            "502",
            "501"
          ],
          bluray: [
            "1",
            "450",
            "451",
            "452",
            "453",
            "454"
          ],
          remux: [
            "3",
            "415",
            "421",
            "430",
            "437",
            "448"
          ],
          encode: [
            "7",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "431",
            "432",
            "433",
            "434",
            "435",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          web: [
            "11",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "429",
            "431",
            "432",
            "433",
            "434",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          hdtv: [
            "5",
            "412",
            "413",
            "416",
            "418",
            "419",
            "422",
            "424",
            "426",
            "471",
            "427",
            "428",
            "431",
            "433",
            "434",
            "435",
            "438",
            "442",
            "443",
            "445",
            "446",
            "449"
          ],
          dvd: [
            "",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          dvdrip: [
            "7",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "1",
            "499",
            "416",
            "500",
            "422",
            "431",
            "438",
            "502",
            "449",
            "501"
          ],
          "1080p": [
            "2",
            "414",
            "420",
            "429",
            "436",
            "447"
          ],
          "1080i": [
            "3",
            "424",
            "428",
            "435",
            "443"
          ],
          "720p": [
            "4",
            "413",
            "419",
            "423",
            "427",
            "434",
            "442",
            "446"
          ],
          "576p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          "480p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          "3201": "20",
          "969154968": "22",
          hdhome: "1",
          hdh: "2",
          hdhtv: "3",
          hdhpad: "4",
          hdhweb: "12",
          shma: "17",
          tvman: "21",
          arin: "19",
          ttg: "6",
          mteam: "7",
          other: "11"
        }
      }
    },
    HDPOST: {
      url: "https://pt.hdpost.top",
      host: "hdpost.top",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QQKBy0Lotfz1wAABIZJREFUOMuNlG1olXUYxn/3//+cs3Oec852ztnRc1LnGG5Zrm2uQvAF0pAUgla+VRZIHyJm1IciiCj8FJWJxqhPUX2QBFHJXqBC0KnlG7nM0XRo6hw62XA76s52Xp7nuftgWkZFv0/3/eG6uLjhvoS/8fI7fQBWlbs10CWB8iCQAwKBQTEcNSLdIgyool1vzLlDL7eGl947he8rxkpj4GunNTxRHXPqamtCTtx1UFWuF3yu5sul8Un/N4VtxsgnqnoFhA9fv/dPwxffP42tCuEVy8tQ3s+lwy3zW2ponhUnVR0i5AgolCsBI/kyJ/rHOdZ3LRi74R0UI6+g2oMIH712D9K5pR/xFRWWC3w8tzE+47FFU8imw/wbqsqFoSJfHBjhzKXJk2JknaAnFMEERvBDptE3srH17sSMp5Zm/9MMQERomBbl2WU5GmZEW33h3cAx6cAKxquyxhNZn51S1dKxIEPCdW4Ly+UylUrl9u77PqVSCVUFYGoqTMfCDPFEaKkn8jQCBrhXQubxBc015P6S7PTp03R1dbFz5048zwOgu7ubTZs2cfjwYYIgAKBpWpS2xrj1raz1wjbjeEYWJ6OmrilrKJeKBHoz2cDAAIsWLSKXy6GqqCqzZ88mk8kwNDTE8PAwyWQSa4T2WXEOnS80Fz1tdzTsPFApjjib3t7MlUsXicfjrF27lunTp3Po0CHK5TLr1q3DdV2OHDnCmTNnWLx4MXv37mX37t3U1qa5Z+583NSSRKGgbaZi9K76+iydLzzPxMQEHR0dNDc347oura2tbNmyhf3793P27Fk2bNhAMpmksbGRnp4eYrEYq1etZtf2z5mYvGY0bHOOZ8W30QgNDQ0kEgnq6+uJRqNs376d3t5eLl68SH9/P8lkkgsXLrBjxw7y+TylUom+vj527dpFW3s7oVQN+QKBE4TM4FgloOQrcPNWiUSC0dFRtm7diuu6ZLNZXNdl6tSp7Nu3j2QySVNTE3V1dXR2duJm69l8fNL3HW/QwZGjQ8XgueEiVfe3t1NTU0MkEmHlypWMjY1RXV3NvHnzSKVSrF+/nt7eXtasWUOhUGDmzJnc19LCkctFRr2JPCFzQlZ8PdSg8M2KxticJ2dFsNZijKFUKlEoFFBVqqursdaSz+cBqKqqIhKJoBqg4tD1yzUOXirucYRVpug6530r2/ZdKem5AhhjbovS6TS1tbWEQiGMMaTTadLpNLFYDGstjhPi2EiJn0YrRRzzme+Y6ybkK+KYT4Yruv/TswUuT/j8X07lK2w9N8ENZYdY+VKNYHxrCBy5gpVXf73undx8apzefAX/j/f6J8qB8sNIiQ/6xxksBnuMlbd8RyYqEXuzvh7tvkoAGLTNh43JsHl4QSbszK8NM9M1RK2gwLinnC/4HBgpc3y0XCxUdKcV3gQGAoFvH8r8WbCPHMvjTPogpH14WuGZqJXmVNjEY44YVbjhqZ+vBPmSrz0Cn1n4CigEyQjftcbubOxbLP9xFLGKepIJoD2ANpScQmCEQQM/C5wU9Hoghu8Xpu7Q/w5HIu8yT4GwdgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NToxMSswMDowMDQkcScAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDU6MTErMDA6MDBFecmbAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      torrent: {
        selector: "#torrent"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    HDRoute: {
      url: "http://hdroute.org",
      host: "hdroute.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBy01Y7bufAAAA3xJREFUOMttlc1vlFUUxn/nzjCoTEsnQClBIehIaNTG+hU0rkwXsNBo4n9QF40kuGFh3GqIC1aYEBKtf4NxA4su1ESNCSHYBBrxI7akQK3tQJwO7cw593Hxvh1a40nu5r3v+b3PPc9z8xpb6oPTpwEMaAIngQnDRkEHAQSLwJzQDOISxm+Azp//rM8wgFPvnwITyBpmvA28Z9gYqC7+t9qSZoEvJL6iohZuXLh4Afvkw49ZWF0gWdpvZmeASWUaGYGs0LWlUgLDyi21QNOIc5Hz0qE9h6jOL88DNMLyGdBUSlYfGa4xOFD5L4v19czyao/2mhdHMxrAlCQQZ+eX51vVzsY6O6s73sGYBOqVZLzx+gAvjg0ibSeudYKFxQ2+/eEec7+uUW7XgUmhuY1e58uUzI56xKR7NNwdj0ASZuWQzfqrvqvKs8d28e6b+zj8eI1ez3F33L0RHpMVakdTRJyI8DEPxz0I974yMyNn0XngbGwEADnD8N4aLzxXxyz3e9x9zCNOVMN9AijcFFQq6SEQaK85X1++A8BbJw6we2AHACPDNVIqgMVAqSNNVD18lBImoBoJKfdD1e1mbi894LFHq2Rps5leL+M93wrEYLTq7gc3hy6Bb1EIkCVee6nBM6NDDA3WkEASN27ep73WLd/tx+tgNTw2BYLAq9rursRAvdI/KsDV2VW++3GJbq+HmRXNpcqqeyyCmpvQqle2AQXkrL6SnMWNX+5xZ6lDsodRLXmLycPnPAKP0q3whzMskXf/6tDtFc8qFeNoc5DaDhUOR7HKyM2lHDETEe3wElrmsH/Zzbg6u8L8rXY/m8eagzz9ZJ2eO+FB2duOiJkUEZfDfTbC+19j2w0Ryysdvvn+Nu4ZCYZ27+SV8b2kJDyKU+XIsxFxOZl0M3JMe0RrU2GWSjdLozz46cpdbi0WKiV4eXyY/ft2FgojWpFjOiVu2qvHjwNqCPtIYipVqB95YoDG0COA6HaD3//8h84Dp3lkkN1ldHIWf8zf5979XtuMi5idBVrWPPAUew7vRZH3C86AJiPU0Bb7UjIMiKxyGsIwUrKWGdMY58zS0vrKCpXVdosDIyNkaQ10RWLB0D6Mhhk1K7MoCQPMwIy2GVdAnwo+t6y/s8TP169vxqeo8efHMcyEmkInzZiQGAU2b9MiMAfMAJeg+AVcu3atz/gXdAVC3vg+5BoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDU6NTIrMDA6MDCBhmVAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ1OjUyKzAwOjAw8Nvd/AAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          s: "{name}",
          dp: "0",
          add: "0",
          action: "s",
          or: "4",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title_eng"
      },
      subtitle: {
        selector: 'input[name="title_sub"]'
      },
      description: {
        selector: 'textarea[name="description"]'
      },
      poster: 'input[name="poster_big"]',
      imdb: {
        selector: "#upload-imdb_url"
      },
      anonymous: {
        selector: 'input[name="is_anonymous"]'
      },
      torrent: {
        selector: "#file_torrent"
      },
      tags: {
        chinese_audio: 'input[name="is_mandrain"]',
        cantonese_audio: 'input[name="is_cantonese"]',
        diy: 'input[name="is_diyed"]',
        chinese_subtitle: 'input[name="is_chs_sub_incl"]'
      },
      category: {
        selector: "#type_category",
        map: {
          movie: "1",
          tv: "3",
          tvPack: "3",
          documentary: "2",
          concert: "5",
          sport: "6",
          cartoon: "4",
          variety: "9"
        }
      },
      videoCodec: {
        selector: "#type_codec",
        map: {
          h264: "1",
          hevc: "7",
          x264: "1",
          x265: "7",
          h265: "7",
          mpeg2: "3",
          mpeg4: "1",
          vc1: "2",
          xvid: "4",
          dvd: "3"
        }
      },
      audioCodec: {
        selector: "#type_audio",
        map: {
          aac: "9",
          ac3: "5",
          dd: "5",
          "dd+": "5",
          flac: "7",
          dts: "4",
          truehd: "3",
          lpcm: "1",
          dtshdma: "2",
          atmos: "2",
          dtsx: "4"
        }
      },
      videoType: {
        selector: "#type_medium",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "4",
          web: "6",
          hddvd: "6",
          hdtv: "3",
          dvd: "6",
          dvdrip: "6",
          other: "6"
        }
      },
      resolution: {
        selector: "#type_resolution",
        map: {
          "2160p": "7",
          "1080p": "1",
          "1080i": "2",
          "720p": "4",
          "576p": "6",
          "480p": "6"
        }
      }
    },
    HDSpace: {
      url: "https://hd-space.org",
      host: "hd-space.org",
      siteType: "HDSpace",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#mcol>table>tbody>tr:last table:first>tbody>tr:nth-child(2)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      needDoubanInfo: true,
      uploadPath: "/index.php?page=upload",
      search: {
        path: "/index.php",
        imdbOptionKey: "2",
        nameOptionKey: "0",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          search: "{imdb}",
          page: "torrents",
          options: "{optionKey}",
          order: 4,
          by: 2
        }
      },
      name: {
        selector: "#filename"
      },
      imdb: {
        selector: 'input[name="imdb"]'
      },
      description: {
        selector: 'textarea[name="info"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      torrent: {
        selector: 'input[type="file"][name="torrent"]'
      },
      category: {
        selector: 'select[name="category"]',
        map: {
          movie: [
            "15",
            "40",
            "16",
            "18",
            "19",
            "41"
          ],
          tv: [
            "15",
            "40",
            "16",
            "21",
            "22"
          ],
          tvPack: [
            "15",
            "40",
            "16",
            "21",
            "22"
          ],
          documentary: [
            "15",
            "40",
            "16",
            "24",
            "25"
          ],
          cartoon: [
            "15",
            "40",
            "16",
            "27",
            "28"
          ],
          concert: [
            "15",
            "40",
            "16",
            "31"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "15"
          ],
          bluray: [
            "15"
          ],
          remux: [
            "40"
          ],
          encode: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ],
          web: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ],
          hdtv: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ]
        }
      },
      resolution: {
        map: {
          "2160p": [
            "15",
            "40",
            "16",
            "41"
          ],
          "1080p": [
            "19",
            "22",
            "25",
            "28",
            "31"
          ],
          "1080i": [
            "19",
            "22",
            "25",
            "28",
            "31"
          ],
          "720p": [
            "18",
            "21",
            "24",
            "24",
            "31"
          ]
        }
      }
    },
    HDT: {
      url: "https://hd-torrents.org",
      host: "hd-torrents.org",
      siteType: "HDT",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBAoHLibMJfxhAAABTklEQVQoz4XSz2oTURzF8c+dyUwSqSUKitJuqq5cFxfWt/BpfCxfwa2CC3VjsUWptYUqJmlmzEzujIuk+SNIzg/u6svh3PP7BSQSrS0KEq+8UG0DSb3Wbp/Ounn6j0erWWZagpkducDSBGqlWrsC+/btm4mIolpEpuvKD5N1cOBYgSBq5DJRqWvP3RUYpGpXDlz76UBuz67SNx/RE7Q3YKvS9cxXlUMDDxUmHrsUzVYgqVyw44GhXbkzb5ReemRsuvp1kMpE9z13pO+DPxpDx3pG6s16glThrU+eKhWmOnouVIuiOjfVRsHQqXe6BvqeqGW+CxKYv/N6K5+dmzpz4rc7bvviAtmq8EYjl3svap0Izt0ycSnom61vpjBxqFSj0WrQc0/fL+P1jIVTI6l2EaTRChLRyPU62BgrZMLGBbeL7W/UMz+G/yvZftlz/QVf65MTdoZVvQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NjozOCswMDowMAiuiIoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDY6MzgrMDA6MDB58zA2AAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".listadetails>tbody>tr:nth-child(2)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "2",
        nameOptionKey: "3",
        params: {
          search: "{imdb}",
          options: "{optionKey}",
          order: "size",
          by: "DESC"
        }
      },
      name: {
        selector: 'input[name="filename"]'
      },
      imdb: {
        selector: 'input[name="infosite"]'
      },
      description: {
        selector: 'textarea[name="info"]'
      },
      tags: {
        hdr: 'input[name="HDR10"]',
        hdr10_plus: 'input[name="HDR10Plus"]',
        dolby_vision: 'input[name="DolbyVision"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      torrent: {
        selector: 'input[name="torrent"]'
      },
      category: {
        selector: 'select[name="category"]',
        map: {
          movie: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          tv: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ],
          tvPack: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ],
          documentary: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          cartoon: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          concert: [
            "61",
            "62",
            "66",
            "57",
            "45",
            "44"
          ],
          variety: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "70",
            "72"
          ],
          bluray: [
            "1",
            "59",
            "61"
          ],
          remux: [
            "71",
            "2",
            "62",
            "73",
            "60"
          ],
          encode: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ],
          web: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ],
          hdtv: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ]
        }
      },
      resolution: {
        map: {
          "2160p": [
            "70",
            "72",
            "71",
            "73",
            "64",
            "65",
            "66"
          ],
          "1080p": [
            "1",
            "59",
            "61",
            "2",
            "60",
            "62",
            "5",
            "30",
            "57"
          ],
          "1080i": [
            "1",
            "59",
            "61",
            "2",
            "60",
            "62",
            "5",
            "30",
            "57"
          ],
          "720p": [
            "3",
            "38",
            "45"
          ]
        }
      }
    },
    HDTime: {
      url: "https://hdtime.org",
      host: "hdtime.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABnlBMVEVyICB6Hh57HR2GGhqKGBiLGBiRJiajTEx+IiKeQkKDLS2BKiqYOjp9ISGYODiNHh6PFxeQFxeuWlqzYWGeNjaxXl6iQECSHx+nSUm1ZGS0Y2OtV1eaMDCTIyOuV1e0ZGTt4eH59fW7dHTz7OzIlJSXLy/Vr6/////+/f3y6enJmJicNDSbOzvq19fStbX28PDjzs7izMzw5ub17+/CioqeQ0PRq6vhysrz6+vizc3gysrBlZXl09OpU1OjRka0amrn1NTfxsakSUmfPDyjRESqVVXu4uLcvr6pVlaiRETfysqXKSmSHR27dXX8+vqsVVWZKyvq3Nz37+/y5eX9/PytVlbx6Oj38vKwXFz+/v77+Pj59PSsVlbw5+f38/OwXV37+fnWs7O8gYH48/OQGBixYGCvW1uZMTHLm5vr3d2pUFDFiIjBgIDPoqL17u7Tra2bNDT8+/vkz8+tXFyRGxvRr6/ZvLyvXl7XubnXurq4d3eVKCi+hYXbv7/Zvb2mSUmTISGWJyfQra2aMzOcNTWVJCSQGhqXKiqRGhqbMzMP6rAIAAAAEHRSTlPB4en7/f39/en96en96f39DMn6iQAAAAFiS0dEJy0PqCMAAAAHdElNRQflBgoEEjQ06RnvAAABJUlEQVQ4y2NgYGTCAxgZGBiZWVhxAhZmRgYmFgE8gIWJgYlVQBAnEGAdNgrYhIRFgGxRYTFxCUkgkJKWEZSVkwQDeXYOBiZOBUUloAJlRRVVNXUg0NDU0tbRVYcAPS40BfoGhkbqxiamZuYGiuoWllbW3GgKbGzt7B3UHZ2cXVzd1N09PHl40RR4eQv6+PoZ+QsKBgSqq6mCHcmpoBEUHBwcAlMgGBoWHoGqIDIqOjpaA64gJjYuHlVBQmJSUlIyTEFKqr5+GqoCFDekpGeoZ2bhVKCQnZObF5JfgFMBCBQWFZcgK+ArLSsHKqiorKquqQWCOq36BiC/sam2phqsgL+5pRUo0KLt3dbeAgTa3uB46uhsaW8bNAmGcgWEsh7BzEso+wMAFb1rT/22c/EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDYtMTBUMDQ6MTg6NTErMDA6MDD9uTIQAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA2LTEwVDA0OjE4OjUxKzAwOjAwjOSKrAAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        diy: 'input[type="checkbox"][name="tags[]"][value="8"]',
        chinese_audio: 'input[type="checkbox"][name="tags[]"][value="16"]',
        chinese_subtitle: 'input[type="checkbox"][name="tags[]"][value="32"]',
        hdr: 'input[type="checkbox"][name="tags[]"][value="64"]',
        hdr10_plus: 'input[type="checkbox"][name="tags[]"][value="64"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "10",
          x265: "12",
          h265: "12",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1 ",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "7",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdtime: "6",
          hdt: "12",
          vtime: "15",
          padtime: "7",
          cmct: "8",
          wiki: "4",
          beast: "3",
          chd: "2",
          other: "5"
        }
      }
    },
    HDU: {
      url: "https://pt.hdupt.com",
      host: "hdupt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBy8jpVQ5rwAABFlJREFUOMs9lElvXMcBhL9e3j4LZ6gR6SFpLhITWU4gKTSyIRdHgZBTfpN/UZBrTrEBI4ccAmRBLjYgWZFEUZztLTNv6dfdOVAI6lKnQhUKVeIPFydeSokQAqUU86NPePyTSx59/oD9/QFCAEhQA2Q6QURjOgP//vs/+POf/shmtcYLiUfgvUdN48FXjZP0QvOjx5c8f/FrLh/OiAOLNS3O1HR1gbM9QkY4r7HWs394xGCyR1WWrLeGzkmcDFDDwfQrGUb87OkjXjz/gulQ0m+XeG9x3mO6FtM2dKan2Va024reGHpCDo+OOdiL0GHKphHIcIgeTA958ctHfPmLh0i34+b1W7Q3hFFI0xlUlCKlQoUe6x29rXH+hmBUk+7N6KxkOJ5yehpzu2nRz3/zhC9//pBYtbx/ec3bl69wXc1klLLZ9axqwafn53jZkiZDrn94xfHZGYYcnU3wwNff/oXj8yuy0R76d7+6JFaecl1S5iVKK9J4iJWCk4tT5iJmnTfsjOX9as3X3/yNLxYfuHr2BKtb9sZzjk9OeP3uB84uforeFRtcqGi7HofEiwCnY1abNYv8FYfzQzSCemepW8vDkwmZavjvd/+iWP+VbHbO1WdPWVXf4zzodtdQrXdUZYlH8iFvuF0uMX3Htqg4Wu44nB9Q5i1CaT6dZbi25s37FZvSsHj7PU+GF1w9u+LNokW/eXnDeDagqg14i1URr2/f0vUObywqbHAqp1hucb5nfqBpasdt0bIVI75b52z/+R9+/9tjpFLI63crwnTM/aMzVoVhU3UEcYIOI5I0w1rB8npNvioo25Ztp1hXnrIVOBWRjWc0dU1RNQgp0Pkq5/rNguHekKKs2eQlaRKjXI0wHtEZTNNRNTXjyQFNo+gaSW8EWg/Znw7IhiNaGyKQaNc23F7fUOxKrO2YjDKqakfvHML1aC/AexIdEBByuyhZFTmdjrE7x/mDU87OT+/miUCbvmNbViSjmPnhPcp8w2axwjQN2nmQIUpp9pOMUGl6oTAyIBhO+ezzZ5xdXKD13RcIAdpYg7UtUQB917Je5pjWIKxFeEU6mqC8QFpDNrrP+JMfcxanDGbHjOcH6NgjhUAiEEIgvfc02x1lXrL4sKTKS2xrwAm0CkkmBzROki9zgnjK+PwpgQyJtCAbSAZZRJaGpGlAmgToNA5o6o5iVdK3Dar3RCrAek+UjghHM+Ryzfj+KcHsnGg8xfdL9g5HJEmA+OjMA8IL9CgOabYFN+9uieMI7yVeWIIoYrg/xxrBeP+M8fEDiDPiCO4/vkSFdyXcAe6OUyBT4UiVp9gULFYFTddje0iye0gZY27ek907ITu+JBuNiBOPDhXcyQDgAbwHPDrWinESkemGqjXsrCUMIorVmmaZk4QZu+2aqQcZBCgl8fiPEfnI/q+KFl6QRSF7SURtGpwVWCydLSFMcL0nXrzGrG+I9oc4LzEteOfw3uOtA+9xzoJ1/A9EnjRTvBUMaAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NzozNSswMDowMIa7gnQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDc6MzUrMDA6MDD35jrIAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "14",
          x264: "16",
          x265: "14",
          h265: "14",
          mpeg2: "18",
          mpeg4: "18",
          vc1: "2",
          xvid: "3",
          dvd: "18"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "2",
          dd: "2",
          "dd+": "2",
          flac: "7",
          dts: "4",
          truehd: "3",
          lpcm: "11",
          dtshdma: "1",
          atmos: "17",
          dtsx: "16"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "11",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          IND: "6",
          SEA: "8",
          OT: "7"
        }
      }
    },
    HH: {
      url: "https://hhanclub.top",
      host: "hhanclub.top",
      siteType: "HanHan",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB+FBMVEX/////+/r/8O3/5N/+08z+xLr/8O7//f3/6eb+z8f+uq7+rp//rJ3+rZ//saT+tqn/t6r+ppb+jHj/eWL/bVT/ZUv/XkP+oZH//Pv//fz+2NH+mYj/b1f/X0P/aE7+fmf/XED/Wj3/Wj7+gGr/XEH/Wz//XD//Wz7/blX+497+1Mz+a1L/WT3+hXD+2dL+sqX+3tj/Zkv/Ykf+zsb+vrP/XkL+i3b+5N//tan/6+j/X0T+w7n+z8b/Y0j+jnv+6uf/clr/taj/8vD/dV3+vbL+5eD+kn//eGD/9/X/e2X+vLH/8/H+f2n+lYL/9PP/fWf/WTz+taj/+vn/gWv+vbH+l4X/+Pf+iHT/a1L+x73/hnH+vLD+mIb+4tz/3tj/5uH/7uv/+/v+inb+wLX+wrj+moj//Pz+u7D/n4/+m4n/kn/+h3L+w7j//v3+jXn+pJT+nIr/Vjr/Vzv/r6H+kHz/YEX+yL7+4t3/b1b+no3//v7+lIH/sKL+k4H+zMP+oJD+m4r+zsX+xrz+o5P+opL+sKL+p5j+qpz/ZEn+0sr+19H+mIf+rJ3/Z03+2tT+7er+inX/cVj/ZUr+i3f+dFz/6uf/6ub+uq3+rqD+nIv9fmj+cVn/YUb/ZEr/alH+6ub+4Nr+zcT+wrf+zcX+1M3/08z/0cn/9vQySTsrAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+cKGggqKOZMG6oAAAFmSURBVBjTTdHlW4IxEADwEwMVu8BA907nizrrtVHs7sLuwG4xUFGxu7v733TDL+7Lbb/dPffcBvB/2chs7ewd+E7u6OSscHF1c/fw9PL28fVTqsA/IDBIHRyCBIxxUGgYCRc1ERAZRUUaHRNMEMKxcfEsSAmQmIQQTU7x4ZiaxoM2HTJ0DDOzskWGObl5GKGkfCjQEEQLZUWYZxaXcCyFsnKMaEVlFSVidU1tncCwHkAhIqpvaNQ1ZXs3q1oY+iUCtLLyNnl7R2daV0N3D0VI3QvQxxr1GwYGh4ZHRsfGqbW7fIJlThq8piidnoFZhsY5mF9guGhaYie8DCssSGaYM7LyVVj7Qz3HdbBw3IBNjlvWO10GOPGJtmFH4LODkuHuHuz7EiQcGA45Kv1ZATk6hpNoLFDp9Iy9BDm/0BBSfXkFcH1ze3f/8Kg1GqVdSXp6HjHLrb9genl9e7dYPj6/vr9efwB+AedbWaa0tk+DAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTEwLTI2VDA4OjQyOjM5KzAwOjAwIhY7NQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0xMC0yNlQwODo0Mjo0MCswMDowMMwWz0MAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMTAtMjZUMDg6NDI6NDArMDA6MDCbA+6cAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      needDoubanInfo: true,
      seedDomSelector: ".bg-content_bg div.leading-6:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      }
    },
    HaresClub: {
      url: "https://club.hares.top",
      host: "hares.top",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~.layui-row:first table:first>tbody>tr:nth-child(6)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          search_mode: "0"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="pt_gen[imdb][link]"]'
      },
      douban: {
        selector: 'input[name="pt_gen[douban][link]"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: "#torrent"
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      screenshots: {
        selector: 'textarea[name="screenshots"]'
      },
      tags: {
        chinese_audio: 'input[name="tags[]"][value="32"]',
        cantonese_audio: 'input[name="tags[]"][value="64"]',
        diy: 'input[name="tags[]"][value="1024"]',
        hdr: 'input[name="tags[]"][value="4096"]',
        hdr10_plus: 'input[name="tags[]"][value="8192"]',
        dolby_vision: 'input[name="tags[]"][value="16384"]',
        chinese_subtitle: 'input[name="tags[]"][value="256"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "409",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          x264: "8",
          x265: "7",
          h265: "6",
          mpeg2: "4",
          mpeg4: "9",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "13",
          dd: "13",
          mp3: "4",
          "dd+": "13",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "14",
          dtshdma: "11",
          atmos: "8",
          dtsx: "10",
          ape: "2",
          ogg: "5",
          wav: "15"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "2",
          bluray: "2",
          remux: "3",
          encode: "4",
          web: "5",
          hdtv: "8",
          dvd: "0",
          dvdrip: "0",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "5",
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "4",
          EU: "4",
          HK: "2",
          TW: "3",
          JP: "7",
          KR: "7",
          OT: "10"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chd: "4",
          hds: "5",
          wiki: "6",
          cmct: "8",
          beast: "9",
          hdc: "10",
          frds: "11",
          pter: "12",
          bhd: "13",
          pth: "14",
          other: "15"
        }
      }
    },
    KEEPFRDS: {
      url: "https://pt.keepfrds.com",
      host: "keepfrds.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACDVBMVEX////8/Pz19fXs7Oz09PT+/v7p6enQ0NC7u7uwsLCvr6+6urrOzs7n5+f7+/v6+vri4uKrq6uBgYFzc3N5eXl6enp0dHR/f3+np6be3t75+fjj4+OSkpJ8fHyhoaHh4eHT09OlpaV+fn2Li4ve3t3s8PXu8vfh5uu6vsKLjY+3uLjl5eX5+fm8vLyLjY6zt7vf4+isvtSOp8WCnsB+mbl6kKyutb3c3d7v7u7m5ubY2NjY2NfP0NGqsrt1jKd8lreCnr+OqMWcss1chLAvZZ4uZp9ahbPS3ejOzs+3trbLy8ugoKCioqHBwsPK1eJXg7EtZZ8uZJ5bhLCds83t8faoxt9Yl8g/icJ2qtLh6vGwr697e3uNjY3FxcWRkZGenp3MzMvf6fFyqNE8h8FXlseoxd78/f7f7PWPweJWpdZ7uuDh7fWzs7OampqoqKipqamXl5enp6fk8fh4uN9Uo9X6/P3Q6PaQzex3xenX7ffP0dLR0NDW1ta5ubna2trx8fH1+PnY8Pp0xOqOzOz1/P/L5vKUwtaxwMfa3N329fX39/f4+Pjq7e6xwsmOvtLJ5fD2/P/x8/PDyMuMjpC0tLX29va2t7eKjo67wcPu8PH9/P3m5eWXlpabm5vKysrd3d3MzMyQkI/h4OCxsbGGhoZ4eHiEhISurq79/f3U1NTAwMC1tbW/v7/q6urw8PAgqDn/AAAAAWJLR0QAiAUdSAAAAAd0SU1FB+UECgYrK84hHq4AAAEbSURBVBjTY2AgFTAyMTOzMCKLsDKysXNwcnHz8PKxwgX5BQSFhEVExcQlJKXAoqysDIzSMrJy7PICCopKyir8IBFVVTV1DU0tbR1WVj42XT19AzVVVQZDI2MTUzNzC2ZLeStrG1s7ewdHQwYnZxdXN3cPTw4vbm8fXz//gMCgYIaQ0LDwiMio6JhYwbj4hMSk5JTUEIa09IzMrOyc3Lz8gsJY7aLikoz0NAbW0rLyisqq6hqO2rr6hsam5rJSkKtaWtvaOzq7tHm7GXp6+/onQNw+cdLkKfJTWVm7pKdNnzET6qFZs+dEz503f/4Cb9mFi/jg3tRevERs6VKxZcsFdOCeZ13BvHLV6tVrFNYysqIEVHf9uu4VJIc4AFHVRtljPRexAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjQzOjQzKzAwOjAwO9PHqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjo0Mzo0MyswMDowMEqOfxQAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      needDoubanInfo: true,
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="small_descr"]'
      },
      subtitle: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "3",
          hevc: "0",
          x264: "3",
          x265: "0",
          h265: "0",
          mpeg2: "17",
          mpeg4: "1",
          vc1: "16",
          xvid: "5"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "0",
          "2160p": "7",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "5",
          "480p": "5"
        }
      }
    },
    KG: {
      url: "https://karagarga.in",
      host: "karagarga.in",
      siteType: "KG",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC0FBMVEUAAADMzMyDgIDBxMSAgIB6gID/4uIAgICAhYXNzc2IiIiXl5eDg4O/v7/BwcHAwMCFhYXGxsbS0tK5ubl7e3tzc3P////Ly8vMzMzMzMzMzMzMzMxvamqlpKSmpqZaWlqChYXP0tJ/gICChYVISUkTExMFBQWJh4fJycmDhYV+hYU9iIhXWloAhIQAgIDNzc3Q0NCsrKxVV1cdDg56OTk4OTkODQ1bAAA9REQAhYWSkpJfX18QEBB4eHiLi4uVlJSZmpqNjY15eXkODg5hYWEgICCIQEC9u7vBxMQ/Pz+CgoJGRkYVeXmuuLjq1NQAAAAZGRljXl5iqKi+v7/BwMBWVlaNjY2IiIiIiIhoaGihoaGMjIycoKCwsLDJw8PAwMC/v7/AwMDAwMCWlpaLi4uDg4PGxsbHx8fDw8PIyMiwsLDAwMDAwMDAwMDAwMC/v7+8vLzAwMDAwMC8vLy4uLi3t7eQkJCenp7BwcHAwMDAwMDAwMDBwcHBwcHPz8+NjY2Hh4eEhISnp6fBwcHAwMDAwMB7e3t7e3t7e3uqqqqHh4dhYWH8/Pyjo6N5eXmAgIB/f3+AgICbm5uKiorCwsLDw8OMjIy9vb3///////+JiYl/f39/f3+AgICwsLCioqK6urq/v7+amprw8PDMzMy/v7/AwMDExMR5eXmAgIDKysp/f3+AgICvr6+hoaG/v7++vr7BwcHAwMDExMR5eXmAgICpqakUFBQRQkIAAAABAABrJiYoQUEAHR0SERGKiopaW1sMBgZOHh4aCwsMAABKLS1OTk45OTlTUVEBDg4BYGAIISE9AAAJCQkDAwMODg4FBQUHBwcLCwsBAwMCDg5TAwNCOTk+Pj5bW1tZWVleXl4rKysWFxdYV1dcWVl3WFg7Ozs8PDxzc3PFxcW2trbAwMC4uLiHh4eIiIiMjIyPj4+zs7OdnZ2/v78GBgb///+lKbQMAAAAtnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTUEIDo3hNxoOBqD3++TnchSh7eSBAgFag32O8PCOfIhfJExJTMrhHQ6N+/v++sYaBp33vCADtuicX5oUv3t/dbruiNi6nO+WikT90FgtpehaxPfEwV7dRgKc9f786eDlxx0BHQkRkfleFR4aAwJ63elXD39/g4iIidzagX9/g1oB3Le5ubO3F6TuswxDUSMVTIEDAwMEBrawIHRE97mnD1YAAAABYktHRBZ80agZAAAAB3RJTUUH5QQMAwUgcVRTPQAAAThJREFUGNNjYKAaYJSQlJJmRBFiYpKR3SYnr6DIjBBjYVVSVtmuqqauwcYOF+TQ1NLesXPnrt06unpgAU59A0MjY5M9e/eZmplbWAIFuaysbWzt9h84eOjwkaP2DtwgVTyOTsecXVyPnzh56vQZN3cPXpCgp5f32XPnL1y8dPnK1Ws+vn58IEH/gOs3bty8dfvO3Xv3A4OCQ/hBgg8ehoaFh0dEPoqKjomNi09ITAIKJ6ekCggKpqU/zsjMevI0Oyc3DyiYXyDEwl9YVPyspLSsvKKyir8aKFhTy8cgLFxX//xFQ2NTc0srP8w3Im3tHS87u7pFYQI9vX39EyZOejV5ytRp02fMFAMLvn4za/acufPmty9YuOjt4iVLly1fsZLh3fNVYqvXrF3XJr5+w9uNm/Kfbt6yFQBipHYOvCm+yAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMlQwMzowNToyOCswMDowMNjzD2AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTJUMDM6MDU6MjgrMDA6MDCprrfcAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: ".outer h1~table:first>tbody>tr:nth-child(6)",
      torrentDownloadLinkSelector: 'a[href*="/down.php/"]',
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        imdbOptionKey: "imdb",
        nameOptionKey: "title",
        params: {
          search: "{imdb}",
          search_type: "{optionKey}",
          sort: "size",
          d: "DESC"
        }
      },
      source: {
        selector: "select[name='source']",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          hdtv: "TV",
          dvd: "DVD",
          web: "WEB",
          vhs: "VHS",
          hddvd: "HD-DVD",
          other: "Other"
        }
      },
      resolution: {
        selector: "select[name='hdrip']",
        map: {
          "720p": "1",
          "1080p": "2",
          bluray: "3"
        }
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      genres: {
        map: {
          Action: "4",
          Adventure: "55",
          Animation: "5",
          Arthouse: "6",
          Camp: "43",
          Classics: "8",
          Comedy: "9",
          Crime: "10",
          Cult: "11",
          Documentary: "20",
          Drama: "12",
          Epic: "44",
          Erotica: "13",
          Experimental: "51",
          Exploitation: "47",
          Fantasy: "14",
          "Film Noir": "15",
          Giallo: "53",
          Horror: "17",
          "Martial Arts": "18",
          Musical: "19",
          Mystery: "54",
          Performance: "60",
          Philosophy: "48",
          Politics: "49",
          Romance: "50",
          "Sci-Fi": "21",
          Short: "22",
          Silent: "23",
          Thriller: "24",
          TV: "25",
          "Video Art": "56",
          War: "26",
          Western: "27"
        }
      },
      country: {
        map: {
          USA: "2",
          UK: "12",
          Germany: "7",
          Italy: "9",
          "---": "255",
          Abkhazia: "119",
          Afghanistan: "54",
          "Akrotiri and Dhekelia": "120",
          "Aland Islands": "121",
          Albania: "65",
          Algeria: "35",
          "American Samoa": "122",
          Andorra: "68",
          Angola: "36",
          Anguilla: "123",
          "Antigua Barbuda": "89",
          Argentina: "19",
          Armenia: "124",
          Aruba: "125",
          "Ascension Island": "126",
          Australia: "20",
          Austria: "37",
          Azerbaijan: "118",
          Bahamas: "82",
          Bahrain: "127",
          Bangladesh: "86",
          Barbados: "85",
          Belarus: "129",
          Belgium: "16",
          Belize: "34",
          Benin: "116",
          Bermuda: "130",
          Bhutan: "131",
          Bolivia: "132",
          "Bosnia Herzegovina": "67",
          Botswana: "133",
          Brazil: "18",
          "British Virgin Islands": "134",
          Brunei: "135",
          Bulgaria: "104",
          "Burkina Faso": "60",
          Burundi: "136",
          Cambodia: "84",
          Cameroon: "137",
          Canada: "5",
          "Cape Verde": "138",
          "Cayman Islands": "139",
          "Central African Republic": "140",
          Chad: "114",
          Chile: "51",
          China: "8",
          "Christmas Island": "141",
          "Cocos (Keeling) Islands": "142",
          Colombia: "99",
          Comoros: "143",
          "Congo (Brazzaville)": "53",
          "Congo-Kinshasa (Zaire)": "252",
          "Cook Islands": "144",
          "Costa Rica": "102",
          "Cote d'Ivoire": "145",
          Croatia: "97",
          Cuba: "52",
          Cyprus: "146",
          "Czech Republic": "46",
          Denmark: "10",
          Djibouti: "147",
          Dominica: "148",
          "Dominican Republic": "41",
          Ecuador: "81",
          Egypt: "103",
          "El Salvador": "149",
          "Equatorial Guinea": "150",
          Eritrea: "151",
          Estonia: "98",
          Ethiopia: "112",
          "European Union": "253",
          "Falkland Islands": "153",
          "Faroe Islands": "111",
          Fiji: "152",
          Finland: "4",
          France: "6",
          "French Polynesia": "154",
          Gabon: "155",
          Gambia: "156",
          Georgia: "108",
          Ghana: "157",
          Gibraltar: "158",
          Greece: "42",
          Greenland: "159",
          Grenada: "160",
          Guam: "161",
          Guatemala: "43",
          Guernsey: "162",
          Guinea: "113",
          "Guinea-Bissau": "163",
          Guyana: "164",
          Haiti: "165",
          Honduras: "79",
          "Hong Kong": "33",
          Hungary: "74",
          Iceland: "62",
          India: "70",
          Indonesia: "166",
          Iran: "107",
          Iraq: "167",
          Ireland: "13",
          "Isla de Muerte": "105",
          "Isle of Man": "168",
          Israel: "44",
          Jamaica: "31",
          Japan: "17",
          Jersey: "170",
          Jordan: "169",
          Kazakhstan: "110",
          Kenya: "172",
          Kiribati: "58",
          Kosovo: "173",
          Kuwait: "171",
          Kyrgyzstan: "80",
          Laos: "87",
          Latvia: "101",
          Lebanon: "100",
          Lesotho: "174",
          Liberia: "175",
          Libya: "176",
          Liechtenstein: "177",
          Lithuania: "69",
          Luxembourg: "32",
          Macau: "178",
          Macedonia: "179",
          Madagascar: "180",
          Malawi: "181",
          Malaysia: "40",
          Maldives: "182",
          Mali: "115",
          Malta: "183",
          "Marshall Islands": "184",
          Mauritania: "185",
          Mauritius: "186",
          Mayotte: "187",
          Mexico: "25",
          Micronesia: "188",
          Moldova: "189",
          Monaco: "190",
          Mongolia: "109",
          Montenegro: "257",
          Montserrat: "191",
          Morocco: "192",
          Mozambique: "193",
          Myanmar: "194",
          "Nagorno-Karabakh": "195",
          Namibia: "196",
          Nauru: "63",
          Nepal: "197",
          Netherlands: "15",
          "Netherlands Antilles": "71",
          "New Caledonia": "198",
          "New Zealand": "21",
          Nicaragua: "199",
          Niger: "200",
          Nigeria: "61",
          Niue: "201",
          "Norfolk Island": "202",
          "North Korea": "96",
          "Northern Cyprus": "203",
          "Northern Mariana Islands": "204",
          Norway: "11",
          Oman: "205",
          Pakistan: "45",
          Palau: "207",
          Palestine: "208",
          Panama: "206",
          "Papua New Guinea": "209",
          Paraguay: "90",
          Peru: "83",
          Philippines: "59",
          "Pitcairn Islands": "210",
          Poland: "14",
          Portugal: "24",
          "Puerto Rico": "50",
          Qatar: "211",
          Romania: "75",
          Russia: "3",
          Rwanda: "212",
          "Saint Helena": "213",
          "Saint Kitts and Nevis": "214",
          "Saint Lucia": "215",
          "Saint Vincent and the Grenadines": "217",
          "Saint-Pierre and Miquelon": "216",
          Samoa: "39",
          "San Marino": "219",
          "São Tomé and Príncipe": "220",
          "Saudi Arabia": "221",
          Sealand: "258",
          Senegal: "94",
          Serbia: "256",
          "Serbia and Montenegro": "47",
          Seychelles: "48",
          "Sierra Leone": "222",
          Singapore: "26",
          Slovakia: "223",
          Slovenia: "64",
          "Solomon Islands": "224",
          Somalia: "225",
          Somaliland: "226",
          "South Africa": "29",
          "South Korea": "30",
          "South Ossetia": "227",
          Spain: "23",
          "Sri Lanka": "228",
          Sudan: "229",
          Suriname: "230",
          Svalbard: "231",
          Swaziland: "232",
          Sweden: "1",
          Switzerland: "57",
          Syria: "233",
          Taiwan: "49",
          Tajikistan: "234",
          Tanzania: "235",
          Thailand: "93",
          "Timor-Leste": "236",
          Togo: "95",
          Tokelau: "237",
          Tonga: "238",
          Transnistria: "239",
          "Trinidad & Tobago": "78",
          "Tristan da Cunha": "240",
          Tunisia: "106",
          Turkey: "55",
          Turkmenistan: "66",
          "Turks and Caicos Islands": "241",
          Tuvalu: "242",
          Uganda: "243",
          Ukraine: "72",
          "United Arab Emirates": "244",
          "United Kingdom": "12",
          Uruguay: "88",
          USSR: "92",
          Uzbekistan: "56",
          Vanuatu: "76",
          "Various/International": "117",
          "Vatican City": "245",
          Venezuela: "73",
          Vietnam: "77",
          "Virgin Islands": "246",
          "Wallis and Futuna": "247",
          "Western Sahara": "248",
          World: "254",
          Yemen: "249",
          Yugoslavia: "38",
          Zambia: "250",
          Zimbabwe: "251"
        }
      }
    },
    KamePT: {
      url: "https://kamept.com",
      host: "kamept.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5woaCDQq3ANFWQAAA51JREFUOMuFlFtT21YUhb+jI8m2ZMtXCgYMLiEpoXGmTXpvc5k8NP83nabT5z4ktNOZUEiDSyBASInxVb7JliWdPNDSIZB0v+9v1t577SWivlK8XUpRPzyg9uI5Uig+WFomlZ9GN02klFzQcVr6eZZi5+kfvNx6RKcxwNQNOo1jMsVl9HicfHGGzFQBKbULwWeAQkDP7fLjTw/x/SZSxEnG4kR+Ej3hYcZD3GaVZKHG4uVLWLZ1DnpO4cT3Oaw1qfVa5BybsqPRFQFmzyNvJkBoHB3UGY0Drt2ooOtnEdrbwFCBFXPA9RnXBZlElkuX85ixGENvwsALaHZ6bG5s0TiuI8T7FAqo1RpY2XlyKRepBDNzWeyE5OVhC8OwAPizusloErBS+YjiXPE9QAXttotumkwtzJMQJo2+wAs8XNfDtgTSEMzNZ9l+XsN1+yilTpS8a4cIDeH1ycmQccKmulcnbQrSlk2gedjJGKufXKPV9pBSQwhx5jDnRrbtOLbmE26/gDmDhZkUmcIUBccilYpz3Gyy93QbiwAnlfz/KxuGTmQlCRbLeJFkdSrNF5VZYjN5QqGRPMjw994OKqojwiFHe7tMlxbRpHwHUNdpDSJc36TvNikcBdy8WsDrJxhhUixPUyjlufLlDbKFHLXdA8beECuVQqkLbGMYOmEUYoo4s9oS3X3JDw/XqVYPSU3PEs9m0E2TmdIcSkU4hTwT33+3D3VdR0UKW4ZUygtUVu5QKi/TbtVoN+pomkQJSafRIAxCpCkZDvqoSF0AVBCGIaFSGGmL8m2HlfsWXb3O2q/rvKjuYpgG6XwGIQTyny8JggkKdXaHvu/zfOsvnlV38YOQtjtg7fctLKPHk18eIzqKaDSh+bpJMpPEyeUYj8YM3QEpJ40QJ9pE1FdKCFhff8aDBz/THY4ZKYO+e4QxbjFvm7ivenx37ytu3LnJwFdsbO7Q6nQYtlxu3bvDZ7e+PQWeKozCkFFkoAwd1WuTtyM+vVLi69UVJk6OYqlITAo6geLRbxvs7B4wl7X45u5tlOL0p0+BuqFj2xbK87GcJJmEQyqboa9Myh+WaB++RkQhZNLksmnE1Y/RpES3nTPZKP5N7PF4zP7+Kx6vrbO1vcfn15e5VlklHHuISZdISyAIkVpEqxeyt/+KTm/I9/fvsrS0cB4oxElabzzZpNXuUrm+QiabJYoiAt9H03WUikApNKnjeUMEYCdTaNp/ZnkDkeWj+pSQ1t4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTAtMjZUMDg6NTI6NDIrMDA6MDDrWrkWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEwLTI2VDA4OjUyOjQyKzAwOjAwmgcBqgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0xMC0yNlQwODo1Mjo0MiswMDowMM0SIHUAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table>tbody>tr:nth-child(4)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      }
    },
    LST: {
      url: "https://lst.gg",
      host: "lst.gg",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABXFBMVEUAAAAAAAEAAQABAAABAQAAAAAAAAEBAAEAAAAAAQAAAQABAAAAAAEAAAAAAQAAAAABAAAAAAAAAAABAQALCgoKCgoBAADQ0dC2treTkpMoKSmBgICAgIABAACTk5MAAACTkpIBAQEAAAEBAQEAAAEAAQABAAAAAQABAAABAAEAAQABAAAAAAEBAAEBAAEBAAAAAAABAQEAAQAAAAEBAQAEBAQhICAREREAAQH8/PwoKCk+Pz/q6ur//v/9/P13d3d2dnbz8vLz8/Pz8/I3NzexsbH+//5gYWBVVVVISEgyMjJoaGny8/Pg4OBoaWn///5/fn7////p6eiQkZEUFBTp6enJyMg3NjdQUVCys7L8/fzGx8bJyciEhYRgYGE0NDVra2ppaGlHR0bo6Ojs7e37+vr9/Pz9/f2NjY14eXn8/P309PRnZmfV1dXIycgNDQ0gICEHBwcDAgMCAgOj429fAAAALnRSTlMAAAAAADCX2fn52ZcJmv7+CQnCmjD+MJiX2dn5+fnZ2ZeXMP6aCcKa/pqX2fmXK9ig8QAAAAFiS0dEUZRpfCoAAAAHdElNRQfnChsDMwGLF6JaAAAA90lEQVQY0xWOZ1PDMBiD3yQEWiBNE/YsZc9Y2AbMCIXSsqEUCLPsvdf/v8PRJ+k53UlEZJBdXZNI1tbZJsUy6p1UwIBJuE46Bp7POVjAIQDf06AhCCAk4syZY1Bjk7ZianoGUgmZaqaW2Tnw+YVwMbe0nF/Jt1JbWBCiuLq2vrG5tb2z204dpYJke+X9g0MgOmJJ6iwdM6ZOTs/OJaIK66Lu8sXl1fXN7d09gqjCM9Tz8Pj0/PIavr1DfXwiS72unhdf3z+A/P3rs/UxgIGr+Bh4v0XWgK+gNIrxYLqKTMsbciG4ZGp4xCPdIDLt0bHEeGbCtkwy/wE9US4qeYwieAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0xMC0yN1QwMzo1MTowMSswMDowMPxuOEAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMTAtMjdUMDM6NTE6MDErMDA6MDCNM4D8AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTEwLTI3VDAzOjUxOjAxKzAwOjAw2iahIwAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#meta-info+.meta-general>.panel:first",
      torrentDownloadLinkSelector: 'a[href*="/download/torrent/"]',
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mal: {
        selector: "#automal"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "3",
          other: "7"
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    MDU: {
      url: "https://monikadesign.uk",
      host: "monikadesign.uk",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#meta-info+.meta-general>.panel:first",
      torrentDownloadLinkSelector: 'a[href*="/download/torrent/"]',
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      subtitle: {
        selector: 'input[name="subhead"]'
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mal: {
        selector: "#automal"
      },
      bgm: {
        selector: "#bgm"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      bdinfo: {
        selector: 'textarea[name="bdinfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anonymous"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#autocat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "",
          dvd: "",
          dvdrip: "",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    MTV: {
      url: "https://www.morethantv.me",
      host: "morethantv.me",
      siteType: "gazelle",
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents/browse",
        params: {
          searchtext: "{imdb}",
          title: "{name}"
        }
      },
      icon: "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAAAiHaEEIh2hYCIdoaEiHaGaIh2hmCIdoZgiHaGYIh2hmCIdoZgiHaGYIh2hlyIdoZUiHaHAIh2htiIdoUEAAAAAIh2hJyIdoW0iHaFsIh2hbCIdoWsiHaFrIh2hayIdoWsiHaFrIh2hayIdoWoiHaFbIh2hsyIdof8iHaH7Ih2hQSIdoQciHaEDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiHaG8Ih2h/yIdoZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIh2hoSIdof8iHaGeAAAAAAAAAAAAAAAAIh2hIiIdoZkiHaGZIh2hIiIdoSIiHaGZIh2hiAAAAAAAAAAAAAAAACIdoaEiHaH/Ih2hngAAAAAAAAAAAAAAACIdoaoiHaH/Ih2h/yIdoUQiHaF3Ih2h/yIdof8iHaFEAAAAAAAAAAAiHaGiIh2h/yIdoZ4AAAAAAAAAAAAAAAAiHaG7Ih2h/yIdoREAAAAAIh2h7iIdof8iHaH/Ih2hqgAAAAAAAAAAIh2hoiIdof8iHaGeAAAAAAAAAAAAAAAAIh2huyIdof8AAAAAIh2hVSIdof8iHaGZIh2hzCIdof8iHaERAAAAACIdoaEiHaH/Ih2hngAAAAAAAAAAIh2hZiIdod0iHaH/Ih2hmSIdobsiHaH/Ih2hVSIdoXciHaH/Ih2hdwAAAAAiHaGhIh2h/yIdoZ4AAAAAAAAAACIdoZkiHaH/Ih2h/yIdof8iHaH/Ih2h7gAAAAAiHaEzIh2h/yIdobsAAAAAIh2hoSIdof8iHaGeAAAAAAAAAAAAAAAAIh2huyIdof8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIdoaEiHaH/Ih2hngAAAAAAAAAAAAAAACIdobsiHaH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiHaGhIh2h/yIdoZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIh2hoSIdof8iHaGeIh2hCyIdoQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIdocUiHaH/Ih2hlSIdoSMiHaFwIh2hfSIdoXEiHaF3Ih2heiIdoXkiHaF5Ih2heSIdoXoiHaFzIh2hYiIdocIiHaH/Ih2h5yIdoS4AAAAAIh2hLyIdoXoiHaGMIh2hcyIdoXMiHaFzIh2hcyIdoXMiHaFyIh2heSIdoY0iHaFsIh2hSSIdoQoAAAAAAAEgNgAAb2Q/+CA1//hTdOA4cGngGCA54hhHZeQIaW7ACG50wIgAUOf4Q0Xn+E9S//hFVj/4PTYAAFJPgAFTUw==",
      seedDomSelector: "#descbox",
      torrentDownloadLinkSelector: 'a[href*="/torrents.php"][title="Download Torrent"]',
      name: {
        selector: 'input[name="title"][class="long"]'
      },
      description: {
        selector: "#desc"
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="1"]'
      },
      torrent: {
        selector: "#file"
      },
      category: {
        selector: "#category",
        map: {
          movie: "1",
          tv: "5",
          tvPack: "5",
          documentary: "1",
          concert: "1"
        }
      }
    },
    MTeam: {
      url: "https://kp.m-team.cc",
      host: "m-team.cc",
      siteType: "MTeam",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABdFBMVEUAAAACAgCCajIDAgEHBgImHw5XSCFcSyNTRCAeGAtpVihSQx9yXSxaSSJxXStZSSKxkUR9ZzCafjvNqE+TeDihhD6niUAdFwsAAAAGBQJ3Yi46MBYAAAAHBQJqVyhmVCcAAAAAAAA1LBSGbjMAAAAgGwx1YC0AAAAAAABENxqNdDYAAAAnIA9NPx0IBwMzKROmiUBSQx8IBgMaFQqCajLOqU86MBa9m0lEOBqSeDhyXStsWSlVRSAuJhJrWClxXCtmVCcjHQ1kUiZvWyoqIxBVRiByXixmVCckHg7rwFruw1zvxFzjulf0yV72yl/uw1v0yF7tw1v1yV74zGD3y1/3yl/1yV/4y1/5zGDxxl3lvFjku1jwxVzIpE3qwFrWsFL5zWDCn0vft1bHpE3MqE/Wr1LvxVz4zF/ctVXet1ZKPBzas1Tyx11ZSSK4l0f6zWDdtlVJPBzYsVNYSCK2lUbetlVIOxvXsFNXSCG1lEXpv1r///+72WvcAAAASXRSTlMAAAAAAKvo6uaQ+OL75/vn++v2/vX5+ogrXOazQ1/e2RsBoO85geUyDrfyRI3Hb6f5y2GA7P79/vz9+/nkwfn7+e35++73+/ejS5QV5gAAAAFiS0dEe0/StfwAAAAHdElNRQflBAoGJSzOxqaDAAAA40lEQVQY02NgZWNHAxycDFyeXqjA24ebgcfXDw348zLwBaALBvKTJhjkFxwSHBoU5hceEREaBFMZKSAoFBXq5ycsIhodAhUMFxOXkJSKCY6VlpGViwuFCEbKKzAoKsUnKKswMqkmRkAEA9TUmTU0kxK0tFkUdZKhgiEpunr6Bn4hqYZGxiZpMNvTTc3M/fyCQjIsLCPh7gzJzMoOCfLzy8nNy4c7KaSgsCgE6OzI4pIIP9IErUCCpWiC1pEBAUEZZeV+AQEB3hWVIQG+VTYMtnZ89nwOjk5W9vZ8zi6ubvZ87h4AngBo3AG4MQYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6Mzc6NDQrMDA6MDDepEzfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjM3OjQ0KzAwOjAwr/n0YwAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload",
      seedDomSelector: ".detail-view .ant-descriptions-view>table>tbody .ant-descriptions-row:nth-child(3)",
      search: {
        path: "/browse",
        replaceKey: [
          "tt",
          "https://www.imdb.com/title/tt"
        ],
        params: {
          keyword: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#smallDescr"
      },
      description: {
        selector: "#descr"
      },
      mediainfo: {
        selector: "#mediainfo"
      },
      imdb: {
        selector: "#imdb"
      },
      douban: {
        selector: "#douban"
      },
      tags: {
        diy: 'input[value="diy"]',
        chinese_subtitle: 'input[value="sub"]',
        chinese_audio: 'input[value="dub"]'
      },
      torrent: {
        selector: "#torrent-input"
      },
      category: {
        selector: "#category",
        map: {
          movie: [
            "401",
            "419",
            "420",
            "421",
            "439"
          ],
          tv: [
            "403",
            "402",
            "435",
            "438"
          ],
          tvPack: [
            "403",
            "402",
            "435",
            "438"
          ],
          documentary: "404",
          concert: "406",
          sport: "407",
          music: "434",
          cartoon: "405",
          app: "422",
          ebook: "427",
          magazine: "427",
          audioBook: "427"
        }
      },
      videoCodec: {
        selector: "#videoCodec",
        map: {
          h264: "1",
          hevc: "16",
          h265: "16",
          x264: "1",
          x265: "16",
          mpeg2: "4",
          mpeg4: "15",
          vc1: "2",
          xvid: "3",
          av1: "19"
        }
      },
      audioCodec: {
        selector: "#audioCodec",
        map: {
          aac: "6",
          ac3: "8",
          dd: "8",
          "dd+": "8",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "7",
          dtshdma: "11",
          atmos: "10",
          dtsx: "3",
          ape: "2",
          wav: "7",
          other: "7",
          mp3: "4"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "1",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "8",
          vhs: "6",
          hddvd: "6"
        }
      },
      videoType: {
        selector: "#medium",
        map: {
          uhdbluray: [
            "1",
            "421",
            "438"
          ],
          bluray: [
            "1",
            "421",
            "438"
          ],
          remux: [
            "3",
            "439"
          ],
          encode: [
            "7",
            "401",
            "419",
            "403",
            "402"
          ],
          web: [
            "10",
            "419",
            "402"
          ],
          hdtv: [
            "5",
            "419",
            "402"
          ],
          dvd: [
            "6",
            "420",
            "435"
          ],
          dvdrip: [
            "7",
            "401",
            "403"
          ],
          other: ""
        }
      },
      resolution: {
        selector: "#standard",
        map: {
          "2160p": [
            "6",
            "419",
            "402"
          ],
          "1080p": [
            "1",
            "419",
            "402"
          ],
          "1080i": [
            "2",
            "419",
            "402"
          ],
          "720p": [
            "3",
            "419",
            "402"
          ],
          "576p": [
            "5",
            "401",
            "403"
          ],
          "480p": [
            "5",
            "401",
            "403"
          ]
        }
      },
      area: {
        selector: "#processing",
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      },
      team: {
        selector: "#team",
        map: {
          mteam: "9",
          tnp: "23",
          kishd: "7",
          bmdru: "6",
          onehd: "18",
          cnhk: "19",
          stbox: "20",
          r2hd: "21",
          pack: "8",
          geek: "24",
          qhstudio: "34"
        }
      }
    },
    NPUBits: {
      url: "https://npupt.com",
      host: "npupt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        params: {
          incldead: "0",
          search: "{name}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrents_table>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(3)>center:first"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]',
        value: "yes"
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403",
          music: "414",
          app: "408",
          ebook: "411",
          magazine: "411",
          audioBook: "411"
        }
      },
      area: {
        selector: "#source_sel",
        map: {
          CN: "6",
          US: "5",
          EU: "5",
          HK: "6",
          TW: "6",
          JP: "5",
          KR: "5",
          OT: "7"
        }
      },
      videoCodec: {
        selector: 4,
        map: {
          h264: "H264",
          hevc: "x265",
          x264: "x264",
          x265: "x265",
          h265: "x265",
          mpeg2: "MPEG2",
          mpeg4: "H264",
          xvid: "Xvid",
          dvd: "MPEG2"
        }
      },
      videoType: {
        selector: 2,
        map: {
          uhdbluray: "BluRay",
          bluray: "BluRay",
          remux: "Remux",
          encode: "BluRay",
          web: "WEB-DL",
          hdtv: "HDTV",
          dvd: "DVD",
          dvdrip: "DVDRip",
          other: ""
        }
      },
      resolution: {
        selector: 3,
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p"
        }
      },
      team: {
        selector: 5,
        map: {
          wiki: "WiKi",
          cmct: "CMCT",
          mteam: "MTeam",
          epic: "EPiC",
          hdchina: "HDChina",
          hds: "HDS",
          beast: "beAst",
          ctrlhd: "CtrlHD",
          chd: "CHD"
        }
      }
    },
    NYPT: {
      url: "https://nanyangpt.com",
      host: "nanyangpt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB71BMVEVTu8ZWu8ZRusVkwctrxM2R09rW7vFTu8ZSusW44ue04eVTu8ZhwMpTu8Z5ydKFzdWs3OLR7O9Tu8bD5enN6u5lwstTu8ZTu8ZiwMpWvMZSusVTu8ZTu8ZTu8bD5up5ydJQucVSu8VSusVVu8aM0NhrxM2W1Nuf2N5Uu8Zpw83S7O98ytO54ueP0dl7ytPT7e93yNFRusVTu8ZiwMpwxs/V7fCO0dmg2d9gwMqz4OWv3uPB5eldv8llwcu64+e34eaBzNTA5emo3OFWvMdQusWw3+Sn2+HO6+6i2d9+y9PG5+tlwst7ytLT7fBvxs93ydHX7/GS09qs3eOFztbh8vTZ7/Ffv8lSusZ/zNTR7O9sxM6T09rc8PKJz9eu3uOp3OLK6e2a1tyAzNRnwsxXvMed193a7/Lf8fNcvsjE5urK6exVvMaHztZWvMa74+eY1dxSu8ZowsxYvMdjwctavchzx9BPucRQucRZvcdtxM6N0diQ0tl6ytKR09qU1NuV1Ntqw82Iz9fQ6+5Zvcie2N7H5+u44uZyx9Btxc6o2+FYvcd4ydHX7vG74+ij2d98y9PW7vFhwMrF5+ub193E5+qd197E5+vM6u3L6u1gv8nT7O90x9C04eW14eWa1t1vxc9uxc7P6+5gv8qy4OT///+e7qWjAAAAHnRSTlMAAEvO+oAXN9f3gYr55/3CaPzNFKD+10sUaMP+6DbE9n4oAAAAAWJLR0SkWb56uQAAAAd0SU1FB+UECgcwCiq8r10AAAFtSURBVBjTJdBlV0JBEAbgtbs7uc5VuZjMKhY2KIqJiV3X7sJusbs7/6gDzqfd58zOeWcZc3SKVQhxIMYnJColAHB2cWVu7qqkZLqIKalp6WrkkOHhybwwU5OVnYOYqxTztPlCQWGRN/NBtaa4pFSnLysXVIaKSmNKFTKO1TW1dfUmbGhAbGxqrmjBVkJzWzt0dHZ19yC29PZx4Jyw3zCA8uDQsBJhZNSE3I7msQyA8aykCYTJqWk7zsBs/BzQo/kFCtm/CDOEdBIselLLfy1RK1ueWFldq1tAcX1jc4vK1I6cbRt2lLG72sq9faPVajVqD9YJD2vMIB8da9SSLJ8sy7pxCTg7PTMjoHx+AYCXW7YfoZmKqzTBIlzf3ALXr91RDlskX43iaPP+4TEBOTY+Pf+j38ur4u39Q0VJsdqwjXb0D/gEUQKkFvj6XrRhIAsKDqHhtj04/Px+EoaGMYfwiMgobi+QrnUQ7RXD/gCppmlft2mUAgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0ODoxMCswMDowMGet8SMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDg6MTArMDA6MDAW8EmfAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "406",
          concert: "407",
          sport: "405",
          cartoon: "403",
          variety: "404"
        }
      }
    },
    OpenSub: {
      url: "https://www.opensubtitles.org",
      host: "opensubtitles.org",
      siteType: "subtitles",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAAAAAD/aE28AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QADzoyPqMAAAAHdElNRQflBxcLOzjtVivgAAAARElEQVQI12NggAH+D//BCMHAAjj/L2B6/w/IqGRYzuMgC2RcYpDldQBJPWSQY/l/GSw1g4PBF8jg+r+A5/1XbMbgtgsAjDUiHY8LnyYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDctMjNUMTE6NTk6NTUrMDA6MDB7fTP0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA3LTIzVDExOjU5OjU1KzAwOjAwCiCLSAAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      search: {
        path: "/en/search/sublanguageid-all/imdbid-{name}"
      }
    },
    Orpheus: {
      url: "https://orpheus.network",
      host: "orpheus.network",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAEiklEQVR4nI2UbUhbVxjHr93Y6MdROhDcJzW5MfdeE6/Re5leJSYkYTeSqPElxiiKJjfxbSjXi0i00RhqR1EWNEaR+JJ2idmsqXOz0+lstZ1Yna2tq1q1Gxu1K4V1bF8dR1SiW6EPPJzz4Zwf53nO8/9D0OmIgCDoHPSW0dzcfO7ozv/GCYwgiPN8Pj8xMjKyUCAQlBoMhmyPx6OYnJzMmJqa+nhmZiY6EAi8B84eHBxEgDwLOwRFRUWdFwgEZh6Pt8Dn8/dpmt602+3fe73eG36/PxgIBIKjo6OjwWBwxO/3fzY8PPxJOPgUDEXRqLi4uAkYhv9GUXS/qqpqdmho6JrX6/X19vYG+vr6/AMDA9fA6na7g93d3aHe3t5vXC7X5StXrnx4CioSiS4iCDKPIMhrFEV3LBbLXGdn543W1tYJu90+63A4Jurr66dNJtNybW3ttN1un+zo6Ag5HI5Qe3v7nMPh6OM47oOTejEM88THx/8pFAp3tFrtalNT0636+voZlmUXOY7raG1tjcYwDEEQ5DqGYS9JktzU6/VLHMdNsyw7xbLsEsuylw5hOI6n4Dj+e0JCwg5Jktsmk2mBYZh5hmFWGIZpOdPwiISEhM9FItFLDMN2MzMz16xW67zZbL5tNpuXysvLJVBycvJVgiD2JRLJlkKheGQ0Gu/p9fqfDAbDhF6vPyxDp9O9AxLsJRLJBZIk7xAE8UtSUtJ2dnb2alFR0d3CwsLHBoPBDlEUtUBR1E5qauoTmqYfZmVlLWs0mqdarfbTY9jx89LS0t4FK0VRDRRFPU9JSflZLpc/zsrKWtVoNOtarXYakslkj2Qy2QZI8EKFQrGmVCp3VSoVfRZ4vJdKpWq5XP5MJpOtA6BSqVw/yocQTdNrNE0/ACmVSjcoitpIT0//laKozDcB1Wo1TdP0tlqtXlWpVOtpaWlPQKanp29Aubm5t3Q63YO8vLzljIyMDYIgNkmSfEGSJBdeZjgwJyenVqfTbeXl5S2BhyQnJ28TBLFHEMRdyGg0XiopKVkvLS1d0Ol0K2KxeBfH8d9wHF+EYfjC2U8BH1VSUnKzuLh4paysbBG0SSwWP01MTPwDx/FOiGEYSWVl5T2LxTJfXV39A2iBUCh8hqLoKwzDXOHiByNktVpbLBbLfavVOscwzB2JRLKDouhefHz8cxRFUw8PNjQ0tHAc9yPHcd82NjZ+V1BQsATGSCgUvoJh+AsYhhEw3BzHXeY4boFl2WmbzTal0WhWYRjeQ1H0NYIgfSfTCmQD5ON0OoGMxoGsgLxqampmKioq7tfV1U07nc6bbW1thzIEsjSbzXNxcXG7MAz/JRAIbsfExFw8KQOsQOBA6N3d3VNA+D09PcFjQ/B4PAG32z0K9sAwLBbLrFAofMHj8f6BYfjr6Ojoj8KN5gQKrGhwcJD2+XxXR0ZGrvt8vi99Pt9XIPv7+0M2m21OpVJt8Xi8/djYWGBxJmB5p2DhDT8Gd3V1vT8+Ph4TCoVSxsbGMlwulzI/Pz+Hz+eXAtMF5gtMOAz0Ztc+svW3jf/A/gVj2wYRcKPv6wAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}"
        }
      },
      torrent: {
        selector: "#file"
      }
    },
    OurBits: {
      url: "https://ourbits.club",
      host: "ourbits.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="picture"]',
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: "#tagGY",
        diy: "#tagDIY",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tagZZ",
        hdr: "#tagHDR10",
        hdr10_plus: "#tagHDR10P",
        dolby_vision: "#tagDB"
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "401",
          "3d": "402",
          tv: "412",
          tvPack: "405",
          documentary: "410",
          concert: "419",
          sport: "415",
          cartoon: "411",
          variety: "413",
          music: "416"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "12",
          hevc: "14",
          x264: "12",
          x265: "14",
          h265: "14",
          mpeg2: "15",
          mpeg4: "12",
          vc1: "16",
          xvid: "17",
          dvd: "18"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "7",
          ac3: "6",
          dd: "6",
          "dd+": "6",
          flac: "13",
          dts: "4",
          truehd: "2",
          lpcm: "5",
          dtshdma: "1",
          atmos: "14",
          dtsx: "21"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "4",
          encode: "7",
          web: "9",
          hdtv: "5",
          dvd: "2",
          dvdrip: "2",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      }
    },
    PTHome: {
      url: "https://www.pthome.net",
      host: "pthome.net",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABR1BMVEUAAAD/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/shv/shv/sxz/sxz/sxz/sxz/sxv/sxz/shv/shr/sx3/tB//vj7/zWv/2pH/4ab/zmz/vTz/2Y7/7s7/+e7//v3/////sx7/uS7/ujH/x1j/68T/8dX/1YL/03z/25P/zGj/6b7/7Mj/9OD//fn/shn/033/sxv/w07/8tj/1oX/1oT/vj//uCr/463//v7/893/14r/14j/8db/2Iv/vDn/57n/+vD///7//fv//fr/6b3/vDj/vTv/ymD/35//89z/xE//yV//6Lv/7MX/7Mf/uTD/0nj/+vH/7sz/1YH/3Zr/uC3/x1r/+e3/5bL/yV3/9N3/8NP/yWD/ujP/zm7/xFD/57j/4qr/wkn/vDf/tym6/awGAAAAGHRSTlMAAAEmcLXj+bYPYsPx/hWL7u6LEPTi+u42ThkjAAAAAWJLR0QnLQ+oIwAAAAd0SU1FB+UECgYoFFNqYFAAAAE4SURBVBjTZdFXW8IwFAbgpINKW1pGq0laFRSIC5xUxIkDFTfiwL33/7/2pMUrz+X7nDz58gUhhLAkK2pM02I9iixhJAbjuG6YCQKTMA09jrEwy06SaCilqbQFijO20xXGPN9z0hmMJD3ao8zvHxjM5ryULiHZCIXRoeF8ocizPjVkpJhgI6Nj4xOl8mSpOOVRU0GqsOmZ2blKmQbzhRyjREUuqbKFGue8skjIUn6ZEeKiXsJWVtcAeX19Y3PLp4RogEFju74DuNvc2z9gIbqE+odHx02xe9ISBsdVQslpu3xWATy/YCKyCpGod9m5ur7pcN6+FQiRIDy7q90/PD7x5xdPnIbwkt5HX1tv742Pz6/QkvBMUQgL4Lbvn/AWx4ZCouqgtIBVxZ5tRYX+L/nvO1xNc9Xud/wCUFAuZX3Re8sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6NDA6MjArMDA6MDAnY2+xAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjQwOjIwKzAwOjAwVj7XDQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: "#torrent"
      },
      tags: {
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "5",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "15",
          web: "10",
          hdtv: "5",
          dvd: "2",
          dvdrip: "15",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "10",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          pthome: "19",
          pth: "21",
          pthweb: "20",
          pthtv: "22",
          pthaudio: "23",
          pthebook: "24",
          pthmusic: "25",
          other: "5"
        }
      }
    },
    PTN: {
      url: "https://piratethenet.org",
      host: "piratethenet.org",
      siteType: "PTN",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBR0NCTVvZ8yaAAAB3UlEQVQozwXBT0hTcQDA8e977/c298I5Xchaf9S1ZRNLttmhltUQnSc9VAgFUWAgCzrYTYnOEZ0G0T/IiKi0Dv0jughJ64/YQB0q2imTwjmI2h/3tvden4/Ui4Tpczyt/qgkpA2wACvguFet+Zz4k65F2YuOc3L0qK8t5Si9U5GxUB+N9BzZlW7SH1vIZkSbMmIGBQobClV7RZQp5coUcMci72vahOvBlQN5DKYrZWXHhLejov/8lMumiDNmr/SOJUWRv2T5gqkOXztDAzor7ffZ4Dm96FSRghHn6NYvQxu60MUKIVoBuMTLu/UuWXy/Kvn5x3Y6pjpj8+xhkRH2s4Bg6M7SMICQcOPyqJ3zJGhimoc0YqIS6F6yoYNoxGRLRQEJCQkLExkLVBQnJYSGTHYtvxwN36KZDJcJMoediRl3ycsySnMzSfngWulQ6DQmZwmj0cIN5t+2nNL6N9PSwMeL0RyzZkEOc45aTFa5TRGVHnSuvxDC78GBTx43bz6ZbN0XqBiZb/n1k+fjKFSx7WbnYM/igJmyxq32USE5PLZGFyeSb6xXVp9x7GtdVKw/K74+vmD31SP7hcVvmRqkUB0Gmx9mu7EQKHgH+1djM9uCoGEHGrr6MvGM6zDAf9rgrjhkXWjnAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI5VDEzOjA5OjUzKzAwOjAwiaGjGgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yOVQxMzowOTo1MyswMDowMPj8G6YAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      }
    },
    PTP: {
      url: "https://passthepopcorn.me",
      host: "passthepopcorn.me",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAACAgIEBAQDAwMBAQF7e3u+vr56enoXFxecnJy6urpSUlIuLi6vr6+xsbH///+wsLAhISHg4OB2dnZCQkL8/Px6fHy8vr95ensWFhebm528vL1UVFQuLS6xr7C9vbydnJsXFxZ7e3q/v718fHsXDAoiFQ8gGQ4eHAwfHw4LCwYIDQgQGw8PGxMPHBYNHBkHDg0GCAoOFx0MEBgODxgSDxoOChIDAQGcSj7oh1zgrVng0VrU2lk6Ohc4WzB2x29auXpZv5Fc0rcpY1gXKDVYl8Vae7ZYYqhwXKxZPnYBAQKxVkj/nWv/yWf+8Wj1+WhDQxtAaTiI5oFp145n3alr89Qwc2YaLj1mr+RojtJmcsODa8hoSIkCAQOxVEf/mmn/xWX+7Wbx92ZBQho/ZzeG4X5n04tm2aVp7tAvcGQaLTxkrN9mi85kb7+AacRmR4YCAQJn073lAAAAAWJLR0QPGLoA2QAAAAd0SU1FB+UEDAMAJuVAAk0AAAC+SURBVBjTY2BgZGJkYGZiYWFmZmFhYgZzGRhZ2dg5OLm4eXh5ebi5ODnY2ViBivj4BQSF+IVFREVFhPmFBAX4+YDKxcQlJKWkZWTl5GRl5BUUlZRVgPpV1dQ1NLW0dXT19A0MjYxNTM0YGMwtLK2sbWzt7B0cnZxdXN3cPTy9GMy9fXz9/AMCg4JDQsPCIyKjomNiGczj4hMSk5JTUtPSMzKzsnNy8/IL6CiI1UnYHI/Vm1gDBHvQYQtkbNEBAFOfVLHCxSMQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjAwOjM4KzAwOjAw8nDEugAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzowMDozOCswMDowMIMtfAYAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchstr: "{imdb}"
        }
      },
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2-Disc Set": "2_disc_set",
          "2D/3D Edition": "2d_3d_edition",
          "2in1": "2_in_1",
          "3D": "3d",
          "3D Anaglyph": "3d_anaglyph",
          "3D Full SBS": "3d_full_sbs",
          "3D Half OU": "3d_half_ou",
          "3D Half SBS": "3d_half_sbs",
          "4K Remaster": "4k_remaster",
          "4K Restoration": "4k_restoration",
          "Director's Cut": "director_s_cut",
          "Dolby Atmos": "dolby_atmos",
          "Dolby Vision": "dolby_vision",
          "Dual Audio": "dual_audio",
          "English Dub": "english_dub",
          "Extended Cut": "extended_edition",
          "Extended Edition": "extended_edition",
          Extras: "extras",
          HDR10: "hdr10",
          "HDR10+": "hdr10_plus",
          "Masters of Cinema": "masters_of_cinema",
          Scene: "scene",
          "The Criterion Collection": "the_criterion_collection",
          "Theatrical Cut": "theatrical_cut",
          Trumpable: null,
          "Two-Disc Set": "two_disc_set",
          Remux: "remux",
          Rifftrax: "rifftrax",
          Uncut: "uncut",
          Unrated: "unrated",
          "Warner Archive Collection": "warner_archive_collection",
          "With Commentary": "with_commentary"
        }
      },
      description: {
        selector: "#release_desc"
      },
      poster: "#image",
      imdb: {
        selector: "#imdb"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      mediaInfo: {
        selector: "#Media_BDInfo"
      },
      screenshots: {
        selector: "#url_vimages"
      },
      torrent: {
        selector: "#file"
      },
      category: {
        selector: "#categories",
        map: {
          movie: "Feature Film",
          tv: "Miniseries",
          tvPack: "Miniseries",
          documentary: "Feature Film",
          concert: "Live Performance"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "Other",
          mpeg4: "H.264",
          vc1: "Other",
          xvid: "XviD",
          DVD5: "DVD5",
          DVD9: "DVD9",
          BD100: "BD100",
          BD66: "BD66",
          BD50: "BD50",
          BD25: "BD25"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          hdtv: "HDTV",
          dvd: "DVD",
          web: "WEB",
          vhs: "VHS",
          hddvd: "HD-DVD"
        }
      },
      resolution: {
        selector: "#resolution",
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p",
          NTSC: "NTSC",
          PAL: "PAL",
          other: "Other"
        }
      }
    },
    PTSBAO: {
      url: "https://ptsbao.club",
      host: "ptsbao.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(7)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "textarea[tabindex]"
      },
      imdb: {
        selector: 'input[name="imdburl"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_subtitle: 'input[type="checkbox"][name="zz"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "0"
        }
      },
      source: {
        selector: "#medium_sel",
        map: {
          uhdbluray: "10",
          bluray: "1",
          hdtv: "5",
          dvd: "3",
          web: "2",
          vhs: "9",
          hddvd: "9"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          x264: "1",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "5",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: "#audiocodec_sel",
        map: {
          aac: "6",
          ac3: "11",
          dd: "10",
          "dd+": "10",
          dts: "3",
          truehd: "9",
          lpcm: "12",
          dtshdma: "8",
          atmos: "8",
          dtsx: "13",
          flac: "1"
        }
      },
      videoType: {
        selector: "#processing_sel",
        map: {
          uhdbluray: "5",
          bluray: "5",
          remux: "1",
          encode: "2",
          web: "2",
          hdtv: "3",
          dvd: "3",
          dvdrip: "3",
          other: "3"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "5",
            "92"
          ],
          "1080p": [
            "1",
            "3"
          ],
          "1080i": "1",
          "720p": [
            "2",
            "91"
          ],
          "576p": "3",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          ffansbd: "8",
          ops: "11",
          ffansweb: "12",
          ffanstv: "13",
          hqc: "10",
          ttg: "3",
          hdc: "6",
          chd: "2",
          hdsky: "9",
          cmct: "4",
          frds: "5",
          other: "7",
          ffansdvd: "14",
          fhdmv: "15",
          enichi: "16"
        }
      }
    },
    "PTer-offer": {
      url: "https://pterclub.com",
      host: "pterclub.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACu1BMVEUAAAD////Cl3f/sZv/88f/NgD/z6j/VAD/AAD/++v/NwCGe33/rGgAAAX/6dgABBr/zqgTL1vxCACLblsAAAwAEzYAAgiZgmoCAwX9AAAFBAb7q3IEAAADAgL217wFAAD//////////////f///f////9IPkDRiEj/mTr/lTr/lTr9mz3InGrZlFv9tXP/3r0AAAAkGh27YRL7gBBsUTKpVBb/exP/j0D/xJIAAAE5KiX1ewT5eQLpfhxhSzbOagv/lU3/7dkAAAArIBqFUSWNUh9+TCOtXxv5fgy0aimFTh6OUh6NWzJROCbneA3/gCf/yp0EAAABAAIAABQAABUNDB2YVhz7hiDCpYoAAAAAABIAAAsTFBmlXRv/fBX/vYQbGB+4ZRb/iCT/+eUBDx6PVSH/fhz/wowAAAAwJyP0jjnTuKXvx6kABUtfOybTcBP/hTD/1K0AAAJONCH8fwaPXCikcUz/unz/rnPpjT/dcg7/cQn/lUf///8AABVqQSL5gQ1iSCy1XhL/eAr+cgr+dgf+fSb/zKQAChyFTyHndw9bQi/TbwvrdgrrfC77rXUUFhumXBrFbhBhQCy8bByuYRWxYhiuYBunXh+OXDSai38AAAAsIB+kXQ9dRzqogmIjHRstKCgOFyoAAyAAAAk9KyPShTM1O0gAAAtWOSP+nksAAwxxRyPtcxv7pmwDAgNALB5zRyZnPh2WYzz82LoEAAABAAEAAAUAAAP/dwD/dAH/cwH/cgDTdRX2fAT+eAD/eAD+dwD4eAP0ewX2egT/eQD/bwb9ewH/egD/dAD/fQD/dgD+fgH/dQD/fAD/cwD+fgPUcRP+cwP/ewDpdgr+ewLzeQX+fAD+eQD9bwP7fQT/fwD/fQH+fQT0ewb/fgHBZxP/fgLYcRD/egfufAv+dgznew3ndwb///9+450wAAAAuXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkNDA4HASCOq6ipq2FhZxcCh/r8yuT4vjQVtf7+99b3tRYnq8fCyvH70sLBpNv981gIHBsXafLnTRYYH6n1/HOC/NEhafX3Xw+pui4IB5D+zSYdxv7PwHBdj+36egIw3P3c8Pf2/LIaUO773Pfrlx9y+/Tj9e3hyJdGBwOR87dgNikaBw+xuyEkz4ZA6PVdQ6WmqX0YBw0LDAI5k3AAAAABYktHRAH/Ai3eAAAAB3RJTUUH5QQKBzAvYbh7GgAAAUJJREFUGNNjYMAGGBkVFJWgQFlFlZERJMikpq6hqQUGmto6unr6zCwMDAaGRjt37dq9e/euXXuMTUzNzC1YGRksrfbus7bZf+DgocNHbO3sjx5zcGRjcHJ2cXVzP37Uw9PL28fX78RJ/wB2hsCg4JDQsFOnwyMio6JjYs+cjYvnANllkJB47nxSMicDQ0rqhbNp6VwgwYzMi+cuZWXncOfm5V8+X1DIAxTjLSq+cqKktKy8orLq6oHqmlo+oCB/Xf21Aw2NTc0trddv3GxrFwDpFuzovHW0q7vn9p2793r7+oXAfmKYMPH+uUmTp0ydNn3GzFnCYCGR2XMenHs4d978BQsXLRaFhojYkqWPTjxetlycESmYJFasfHLi6SpJZDEGqdVrnj1fu04aWUxGdv2GjZs2b5FDEZTfum37jtkMBAEAezt4kKiqYGgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDg6NDYrMDA6MDBMncp9AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ4OjQ2KzAwOjAwPcBywQAAAABJRU5ErkJggg==",
      asTarget: true,
      uploadPath: "/offers.php?add_offer=1"
    },
    PTer: {
      url: "https://pterclub.com",
      host: "pterclub.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACu1BMVEUAAAD////Cl3f/sZv/88f/NgD/z6j/VAD/AAD/++v/NwCGe33/rGgAAAX/6dgABBr/zqgTL1vxCACLblsAAAwAEzYAAgiZgmoCAwX9AAAFBAb7q3IEAAADAgL217wFAAD//////////////f///f////9IPkDRiEj/mTr/lTr/lTr9mz3InGrZlFv9tXP/3r0AAAAkGh27YRL7gBBsUTKpVBb/exP/j0D/xJIAAAE5KiX1ewT5eQLpfhxhSzbOagv/lU3/7dkAAAArIBqFUSWNUh9+TCOtXxv5fgy0aimFTh6OUh6NWzJROCbneA3/gCf/yp0EAAABAAIAABQAABUNDB2YVhz7hiDCpYoAAAAAABIAAAsTFBmlXRv/fBX/vYQbGB+4ZRb/iCT/+eUBDx6PVSH/fhz/wowAAAAwJyP0jjnTuKXvx6kABUtfOybTcBP/hTD/1K0AAAJONCH8fwaPXCikcUz/unz/rnPpjT/dcg7/cQn/lUf///8AABVqQSL5gQ1iSCy1XhL/eAr+cgr+dgf+fSb/zKQAChyFTyHndw9bQi/TbwvrdgrrfC77rXUUFhumXBrFbhBhQCy8bByuYRWxYhiuYBunXh+OXDSai38AAAAsIB+kXQ9dRzqogmIjHRstKCgOFyoAAyAAAAk9KyPShTM1O0gAAAtWOSP+nksAAwxxRyPtcxv7pmwDAgNALB5zRyZnPh2WYzz82LoEAAABAAEAAAUAAAP/dwD/dAH/cwH/cgDTdRX2fAT+eAD/eAD+dwD4eAP0ewX2egT/eQD/bwb9ewH/egD/dAD/fQD/dgD+fgH/dQD/fAD/cwD+fgPUcRP+cwP/ewDpdgr+ewLzeQX+fAD+eQD9bwP7fQT/fwD/fQH+fQT0ewb/fgHBZxP/fgLYcRD/egfufAv+dgznew3ndwb///9+450wAAAAuXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkNDA4HASCOq6ipq2FhZxcCh/r8yuT4vjQVtf7+99b3tRYnq8fCyvH70sLBpNv981gIHBsXafLnTRYYH6n1/HOC/NEhafX3Xw+pui4IB5D+zSYdxv7PwHBdj+36egIw3P3c8Pf2/LIaUO773Pfrlx9y+/Tj9e3hyJdGBwOR87dgNikaBw+xuyEkz4ZA6PVdQ6WmqX0YBw0LDAI5k3AAAAABYktHRAH/Ai3eAAAAB3RJTUUH5QQKBzAvYbh7GgAAAUJJREFUGNNjYMAGGBkVFJWgQFlFlZERJMikpq6hqQUGmto6unr6zCwMDAaGRjt37dq9e/euXXuMTUzNzC1YGRksrfbus7bZf+DgocNHbO3sjx5zcGRjcHJ2cXVzP37Uw9PL28fX78RJ/wB2hsCg4JDQsFOnwyMio6JjYs+cjYvnANllkJB47nxSMicDQ0rqhbNp6VwgwYzMi+cuZWXncOfm5V8+X1DIAxTjLSq+cqKktKy8orLq6oHqmlo+oCB/Xf21Aw2NTc0trddv3GxrFwDpFuzovHW0q7vn9p2793r7+oXAfmKYMPH+uUmTp0ydNn3GzFnCYCGR2XMenHs4d978BQsXLRaFhojYkqWPTjxetlycESmYJFasfHLi6SpJZDEGqdVrnj1fu04aWUxGdv2GjZs2b5FDEZTfum37jtkMBAEAezt4kKiqYGgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDg6NDYrMDA6MDBMncp9AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ4OjQ2KzAwOjAwPcBywQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr,#body"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: "#guoyu",
        diy: "#diy",
        cantonese_audio: "#yueyu",
        chinese_subtitle: "#zhongzi"
      },
      category: {
        selector: "#browsecat,select[name='type']",
        map: {
          movie: "401",
          tv: "404",
          tvPack: "404",
          documentary: "402",
          concert: "406",
          sport: "407",
          cartoon: "403",
          variety: "405",
          music: "406"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "6",
          web: "5",
          hdtv: "4",
          dvd: "7",
          dvdrip: "7",
          other: "15"
        }
      },
      area: {
        selector: 'select[name="team_sel"]',
        map: {
          CN: "1",
          US: "4",
          EU: "4",
          HK: "2",
          TW: "3",
          JP: "6",
          KR: "5",
          IND: "7",
          OT: "8"
        }
      }
    },
    "Piggo-offer": {
      url: "https://piggo.me",
      host: "piggo.me",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAFRklEQVR4nHWUa1AUVBiG1xmb+pHVr/rhNEVqYolXREQLIQNHQEXDNkNIbkaQUkCQ7rrimuIFXVy2QFFguMttl+WyIAuuLjdBIYQ0NHGE1FKG5SLsBfZplmYaa+zMnDkz5zvnme98530/geA5A5gJOHS1tETqKjQqVUbur0U/nftDeSbrfl1RmV5fo000GJ6sA2Y97/5/YbNaahuczx5OipTFilIVYmlr8neSgaTovUOyGNFjxb6DPcnxkuJTcRKRJr/IG3jrf2ESiWSmYdDwaZ4sVR/vF8i2hc5snLMYb7tF/0yfdxax1d6Rnas8SD94dLDvZm9KX0fHa8CMf8EaJJKZ7bor4v1fhPcl+AeTsjuKw4HBbLFfjs+cxWycu2QavvndZYS7ridrr4gjO8PY7eU3rMzIVo4+fPj6s898eXDQIEwIjuzb5eZFoUjMA005F2Un8bFz4OPZ89nwtgOeby7A224hivBI+itLaUxTsNdXSLin70h3a3uB0Wicb4O90N5wxTk7KaXR38mdQ8Id9BxLgJLzPFAWkhYvJk2UQMbBw5yVSDknkdJRmM9kXioTeamUiURssXfkVMw+S0V2ob8N6JB5XBYZs+lzvOwWUXlAgul8Mpw/xUSzjt87r2O4ewfTw36eDtzjj5vdDPd0MZUph5Jz3Mk8wxfLP+CT95xI2SdNE3Q2NX2dHCdJ3WK/Yro+N1Jk0FLPULOOXr2e9nI1vbpLPOrqoL+9jdZSJT11Wh62NTN1vZF7OecQe/myed4SkuMktwT16upymzQ2zVlC4NLVdBcVUqf4kS/XbiBwhSuBjq4EOLvjv9aTIA9vdntsJMRlHTuWfUj6Pgmt+bnIAoLwnbeUhOCIKYEqI+9XWax4YPO8pUj9g0kX7efAjmCEi13YbPvVuUvY7uyKOCSUQ+ERfPK+E37vOeE7dymBTm5IA8PIEh+YruMen08R2BxwfE+8wSaPCz8cIXqLEOHyNQQ4uRLk7M5XKz8i2W8nV6QnqJccJXqVJ2FrPKbjPnMWEea6nqJjx9m6YAWhbl4IytIy+49FxT/eusCRZoUCRdAuDm7ahjwknIzdMRRvj6ArVMxQ/GkexCRRtS2CrF3f8FNkFImfBXAm5Eua5KcROqwk3MMXgc2bsrj9PX72jnQfT8KUl4tVVcrURQ3Wi1o4cJanO6WMBCQwEZaIMeok5CqZ0l/CcrECii/wNCebUKe1xH8WbBU01WgTT8SIi7Y7rOKXEycx5+dCcSGTFSrM9XVYEs8wErCfJ97fYBB+j0kkx1KiYlKrYaqiDIoKGcvOInylG7IY0Z+C0SdP1iXFSkShLp7clJ/GfCEPa2UZFl0NptZLmOuq6RNGc232em65BWNUqzE3arG01DNZo4ayYsYKcolYvY6UvVK1TdivqLLyvbOOnBy8lZXOeFUJk7pqTM11mK7WY+7Q0f/tIXqc/Ln7eSxG215bPWbbelmDVVvBSGUp8qg4Mk4ovpv28vg4bw0ODMjvapTDY1eqsTTXYmrUYNZrMDfVMpqZzXCCnLFT6ZibaqZjJr3m7zMttRj0tZO1eUWdWo3W5dkG8erE/V6l8WrDiEVfhVGn5uklFWMN5Uw0qDFVqTCpyxjXlTOmUzGhK8dyuYKJptrJ8RvtPYA78NKzwBmjjx69MTX0uMDc3WaZaCrndlsB17W5/Fadw+9VOfRVZdOlyebna/kYLpfAjatM3rvdCRZ3q9X64vM7ttE4n3u9/qO919J+u996q75DO1WgzSG9Qk6mJh3l5Upr1/2WP4dut5VzpyeW4UGXZzP7C6k/2GzdSBujAAAAAElFTkSuQmCC",
      asTarget: true,
      uploadPath: "/offers.php?add_offer=1"
    },
    Piggo: {
      url: "https://piggo.me",
      host: "piggo.me",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAFRklEQVR4nHWUa1AUVBiG1xmb+pHVr/rhNEVqYolXREQLIQNHQEXDNkNIbkaQUkCQ7rrimuIFXVy2QFFguMttl+WyIAuuLjdBIYQ0NHGE1FKG5SLsBfZplmYaa+zMnDkz5zvnme98530/geA5A5gJOHS1tETqKjQqVUbur0U/nftDeSbrfl1RmV5fo000GJ6sA2Y97/5/YbNaahuczx5OipTFilIVYmlr8neSgaTovUOyGNFjxb6DPcnxkuJTcRKRJr/IG3jrf2ESiWSmYdDwaZ4sVR/vF8i2hc5snLMYb7tF/0yfdxax1d6Rnas8SD94dLDvZm9KX0fHa8CMf8EaJJKZ7bor4v1fhPcl+AeTsjuKw4HBbLFfjs+cxWycu2QavvndZYS7ridrr4gjO8PY7eU3rMzIVo4+fPj6s898eXDQIEwIjuzb5eZFoUjMA005F2Un8bFz4OPZ89nwtgOeby7A224hivBI+itLaUxTsNdXSLin70h3a3uB0Wicb4O90N5wxTk7KaXR38mdQ8Id9BxLgJLzPFAWkhYvJk2UQMbBw5yVSDknkdJRmM9kXioTeamUiURssXfkVMw+S0V2ob8N6JB5XBYZs+lzvOwWUXlAgul8Mpw/xUSzjt87r2O4ewfTw36eDtzjj5vdDPd0MZUph5Jz3Mk8wxfLP+CT95xI2SdNE3Q2NX2dHCdJ3WK/Yro+N1Jk0FLPULOOXr2e9nI1vbpLPOrqoL+9jdZSJT11Wh62NTN1vZF7OecQe/myed4SkuMktwT16upymzQ2zVlC4NLVdBcVUqf4kS/XbiBwhSuBjq4EOLvjv9aTIA9vdntsJMRlHTuWfUj6Pgmt+bnIAoLwnbeUhOCIKYEqI+9XWax4YPO8pUj9g0kX7efAjmCEi13YbPvVuUvY7uyKOCSUQ+ERfPK+E37vOeE7dymBTm5IA8PIEh+YruMen08R2BxwfE+8wSaPCz8cIXqLEOHyNQQ4uRLk7M5XKz8i2W8nV6QnqJccJXqVJ2FrPKbjPnMWEea6nqJjx9m6YAWhbl4IytIy+49FxT/eusCRZoUCRdAuDm7ahjwknIzdMRRvj6ArVMxQ/GkexCRRtS2CrF3f8FNkFImfBXAm5Eua5KcROqwk3MMXgc2bsrj9PX72jnQfT8KUl4tVVcrURQ3Wi1o4cJanO6WMBCQwEZaIMeok5CqZ0l/CcrECii/wNCebUKe1xH8WbBU01WgTT8SIi7Y7rOKXEycx5+dCcSGTFSrM9XVYEs8wErCfJ97fYBB+j0kkx1KiYlKrYaqiDIoKGcvOInylG7IY0Z+C0SdP1iXFSkShLp7clJ/GfCEPa2UZFl0NptZLmOuq6RNGc232em65BWNUqzE3arG01DNZo4ayYsYKcolYvY6UvVK1TdivqLLyvbOOnBy8lZXOeFUJk7pqTM11mK7WY+7Q0f/tIXqc/Ln7eSxG215bPWbbelmDVVvBSGUp8qg4Mk4ovpv28vg4bw0ODMjvapTDY1eqsTTXYmrUYNZrMDfVMpqZzXCCnLFT6ZibaqZjJr3m7zMttRj0tZO1eUWdWo3W5dkG8erE/V6l8WrDiEVfhVGn5uklFWMN5Uw0qDFVqTCpyxjXlTOmUzGhK8dyuYKJptrJ8RvtPYA78NKzwBmjjx69MTX0uMDc3WaZaCrndlsB17W5/Fadw+9VOfRVZdOlyebna/kYLpfAjatM3rvdCRZ3q9X64vM7ttE4n3u9/qO919J+u996q75DO1WgzSG9Qk6mJh3l5Upr1/2WP4dut5VzpyeW4UGXZzP7C6k/2GzdSBujAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr,#body"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="pt_gen"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: "#guoyu",
        diy: "#diy",
        cantonese_audio: "#yueyu",
        chinese_subtitle: "#zhongzi"
      },
      category: {
        selector: '#specialcat,select[name="type"]',
        map: {
          movie: "401",
          tv: "404",
          tvPack: "404",
          documentary: "402",
          concert: "406",
          sport: "407",
          cartoon: "403",
          variety: "405",
          music: "406"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "6",
          web: "5",
          hdtv: "4",
          dvd: "7",
          dvdrip: "7",
          other: "15"
        }
      },
      area: {
        selector: 'select[name="team_sel"]',
        map: {
          CN: "1",
          US: "4",
          EU: "4",
          HK: "2",
          TW: "3",
          JP: "6",
          KR: "5",
          IND: "7",
          OT: "8"
        }
      }
    },
    PrivateHD: {
      url: "https://privatehd.to",
      host: "privatehd.to",
      siteType: "AvistaZ",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACDVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAQFGPyRwZTsXFQxVTS1nXTYpJRVwZTp5bT93az52aj51aj14bD9NRSgEAwIhHQ7FrlbUvF4rJhMDAwGfjUblymWPfj7RuV3jyWXiyGPgxmPfxmLLtFktJxM1LRDWt0HRskAqJA2chTDmxUaskzTPsD/Ss0B/bipwYSZ5aCnHqj7YuUJCORQ0LAzUsTDPri82LQwMCgIODAISDwOfhSTivjSojSbMqy/CoywcFwYPDQOxlSjYtTFCNw80KwnQrCbXsSe5mSGxkh+ykx/NqiXbtSiliR7JpiTAnyMbFwUPDQKwkiDWsSdBNgw0KgfQqhzYsB3Bnhu7mRq8mhrbsx6lhxbJpBvAnRobFgMQDQKxkRjXsB1CNgk1KgXVrBTSqRM8MAYSDwIVEQIYFAKigg/kuBWqiRDOphPEnhIcFgIQDQGzkBDarxRDNgY1KgPZrQzTqQwrIgIDAwCefgnpug2uiwnRpwvUqgyAZgZwWQV5YAXKoQvbrwxDNgMiGwHKoAXZrAUsIwEEAwCigATquQaSdATWqQXouAXntwbltQbltQXRpQUuJAECAQBJOQB0WwEYEgBYRQBrVAErIgBzWwB9YwF7YQF6YAF8YQFQPwD///9sRWxwAAAAE3RSTlMAD2jG8P0cpvgOpWf292nCxe3vW6icJgAAAAFiS0dErrlrk6cAAAAHdElNRQflBR0MDgqXgh1XAAABKUlEQVQY02NgYGBkYmZhFYYCVhZmJkYGIGBj5xBGARzsbAwMnFzCGICdk4GbB1OYl4+BXxgLEGAQxCYsxMAqIiomLiwsIiEpJS0jKycvL6egqMTKIKysoqomLKyuoamlraOrp6+vp2dgKMwgbGRsYgoUNjO3sLSytrGxsbWzdwAKOzo5u7i6uXt4enn7+ALN9fMPCAQKBwWHhIaFh0dERkXHxAKF4+ITEoHCSckpqWlp6ckZmVnZOUDh3Lz8AqBwYVFxSWlZeUVlVXVNLVC4rr6hESjc1NzSKizc1t7R2dXd09vb29c/YSJQeNLkKVOFhadNnzFz1uw5c+fNmztv/gJhBtaFixYvERZeuHTZ8hUrV60GgjVrp7Hi8jyOoMIRsDiiAUekYY9iAOujViqpcnSrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI5VDEyOjE0OjEwKzAwOjAw1eU6iAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yOVQxMjoxNDoxMCswMDowMKS4gjQAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="/download/torrent"]',
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        params: {
          search: "{name}",
          "in": "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    PuTao: {
      url: "https://pt.sjtu.edu.cn",
      host: "sjtu.edu.cn",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      seedDomSelector: "h1~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: "#torrent"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "401",
            "402",
            "403"
          ],
          tv: [
            "407",
            "408",
            "409",
            "410"
          ],
          tvPack: [
            "407",
            "408",
            "409",
            "410"
          ],
          documentary: "406",
          concert: "427",
          cartoon: "431",
          app: "434",
          sport: "432",
          music: [
            "420",
            "421",
            "422"
          ],
          variety: [
            "411",
            "412",
            "413",
            "414"
          ]
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "11",
          hdtv: "5",
          dvd: "6",
          dvdrip: "7",
          hddvd: "2",
          other: "4"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        map: {
          CN: [
            "401",
            "409",
            "411",
            "420"
          ],
          US: [
            "402",
            "410",
            "413",
            "422"
          ],
          EU: [
            "402",
            "410",
            "413",
            "422"
          ],
          HK: [
            "403",
            "407",
            "412",
            "420"
          ],
          TW: [
            "403",
            "407",
            "412",
            "420"
          ],
          JP: [
            "403",
            "408",
            "414",
            "421"
          ],
          KR: [
            "403",
            "408",
            "414",
            "421"
          ]
        }
      }
    },
    R3SUB: {
      url: "https://r3sub.com",
      host: "r3sub.com",
      siteType: "subtitles",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAEaklEQVR4nNWUe0zTVxTHf8zxcsOxyYQsLr6yzL2dj8w5kKnJfEyBgW+GmsmyCFkFUbQRBEqhlVrqWqGAkE6KOGq1pKniBItO0XYWeSjSIqwFaSn0Vyi1QOXR7/Ij6lDm/t9Jbs4v9+Z+fufc7zmHIP5Xlp+f787lcr2PHj3qIxaLp1GrvLzcRyaT+VZWVk6Xy+V+IpHIV6PRTJVIJFP+E5aSkvKKTCbdcKroVGZ+zsmzguM5ZXz+cWaO4JfDJwuKzkjK5PdLiqX6I8nJZQpF+QoAvgCmPAG7PQeTSCTeKpVqpcFgqbdYrNZeq/VRT0+P3WK1dnX39nX2WCz9pMUKkuzDX23t/SXic6qkQ8l5WUzmJutg57sAPKiA/klVInlDqayJaTf04kUbnbQDaJtboVFrbJLSshvpaRmJAPwBeI9DAXhy2Qc/yTy8WyQtznusvCCD8pIcN6ov435dPR5c08CoNWDAPjgJfLexGeyM7Pr8XN5ak8n0tsvl8iSuX69am0HfnLRtlfdwxFduoNamYC/s+vYdHNmxHFcSaFCXnkdXh3kc4gIw8gTocIzgqlLdF0+jFcvPnVtos9neIg7s+vxW3NY52h++IbA5iMCmQALhSwl894U7YjYuxv3bWjyyDWNk1IUx6glcGPdjFBlAv20AVZVqR1ryocKcHM4SYueG90xRawJsUV8TiFpJIHIFgfULCER8ORXZjHj02weepUgxxib4p9bf7wBfIDTnFxZuJfb9uDY9NjKwcMf6uW2hyzxc4csIxGz+GAXZSWhqrHt29SnI9YJgAyOAyeIAM4P9iM/n76ZE8a+6plmYsHcPI2TFvKuhwQG69KS9vbfv6CYGMcmGR4EmnWFEUXWrT35Z/SBx//4LubmCCKKjo8MbwOsPSXLmzZt/BhcIhTuYmcfExb/JzYZuO3oHBjHodMI55HQNDjldducQuu1DUNfrwWLxTBFh686yWBmxUqk0rKamZsl4h9y7d8+DJMlpbW1mf5PJNEskOh2WemBn2aHoRWClxoLDYQ9ncQW9Wcf4PdkcpjOT/j22rJ6HjesW3+Bx+bSKiorVKpVqUXNz8+zxwgbgRrWRXq/3AuAlEolXlRyLkV7JXo1yRhBo25eT0dHRp9MZqbykPSEPlbz1yIv9APRdgbeyeMKfamtrFzU1Nc1qb29/c1I/U16mUCyQFzEEF7jbH4sTl2JfZNDthARavKjgRGQabWN1BSdkTBgXBMbPYZeERb9u02q1841Go191dbXXvw4Ko9Hud74kL5xzMKo0LWbd76zkOHbJmTOhcvnFVTz2EfoJ+hYFPXrDxZSDsanKP5TBer1+NgCfl04g6gDAaw4HAvRGy/zGRu2ndXV1H+l0urkkSc40dA3NaTGYPrxz9+5nDQ0N77e2ts5oaWnxfG5AvGDUm7pTQnV1dc0wm83+drvdT6/X+1osFp/Ozs7pT/epVI1G41SCIF4Ke04oqgKov1MewKtU9NQ3VW6UiBqNxn1iqn8DP4ZZROQMmnUAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/movie.php",
        params: {
          id: "{imdb}"
        }
      }
    },
    RED: {
      url: "https://redacted.sh",
      host: "redacted.sh",
      siteType: "gazelle",
      icon: "data:image/png;base64,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CaSQOILvX1UNa/D9wHRgZ2pqWlFWVrY1eJNo9J5EIiEjGh26KCLVwKlhk8E0Ev88bYDJg6LfSeIITnmCWU2xbDuH9Tctn7sthg3gX0VnSK9SS2AvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTEwLTI2VDA4OjU5OjEyKzAwOjAwW1pMhQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0xMC0yNlQwODo1OToxMiswMDowMCoH9DkAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMTAtMjZUMDg6NTk6MTIrMDA6MDB9EtXmAAAAE3RFWHRkYzpmb3JtYXQAaW1hZ2UvcG5n/7kbPgAAABV0RVh0cGhvdG9zaG9wOkNvbG9yTW9kZQAzVgKzQAAAACZ0RVh0cGhvdG9zaG9wOklDQ1Byb2ZpbGUAc1JHQiBJRUM2MTk2Ni0yLjEcL2wLAAAAEHRFWHR4bXA6Q29sb3JTcGFjZQAxBQ7I0QAAACh0RVh0eG1wOkNyZWF0ZURhdGUAMjAxNi0xMS0yNFQwMzozMjoxNS0wNTowMCzxTqAAAAAudEVYdHhtcDpDcmVhdG9yVG9vbABBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaClYcSB0AAAAKnRFWHR4bXA6TWV0YWRhdGFEYXRlADIwMTYtMTEtMjRUMDQ6NDE6MzgtMDU6MDA4Ju9CAAAAKHRFWHR4bXA6TW9kaWZ5RGF0ZQAyMDE2LTExLTI0VDA0OjQxOjM4LTA1OjAwBIK8/AAAABZ0RVh0eG1wOlBpeGVsWERpbWVuc2lvbgAzMl01lwMAAAAWdEVYdHhtcDpQaXhlbFlEaW1lbnNpb24AMzKAo06GAAAAPnRFWHR4bXBNTTpEZXJpdmVkRnJvbQB4bXAuZGlkOmI1ZGM1Mjk4LTViZDEtNDI2ZS1hODE5LTZmZmM4OTA0ZmJhOThL8L8AAAA9dEVYdHhtcE1NOkRvY3VtZW50SUQAeG1wLmRpZDpiNWRjNTI5OC01YmQxLTQyNmUtYTgxOS02ZmZjODkwNGZiYTkCKwxvAAAAPXRFWHR4bXBNTTpJbnN0YW5jZUlEAHhtcC5paWQ6Mjc3NjNmZDAtYmM5Yi00N2FjLWFjNWItNzAxMGU0ZGE5NGY4ZKHHGQAAAEV0RVh0eG1wTU06T3JpZ2luYWxEb2N1bWVudElEAHhtcC5kaWQ6YjVkYzUyOTgtNWJkMS00MjZlLWE4MTktNmZmYzg5MDRmYmE5DvZinAAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}"
        }
      },
      torrent: {
        selector: "#file"
      }
    },
    RedLeaves: {
      url: "https://leaves.red",
      host: "leaves.red",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,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",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="pt_gen"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      tags: {
        chinese_audio: "#leaves-tag5",
        diy: "#leaves-tag4",
        cantonese_audio: "#leaves-tag18",
        chinese_subtitle: "#leaves-tag6",
        HDR: "#leaves-tag7",
        DolbyVision: "#leaves-tag17"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: [
            "402",
            "403"
          ],
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          music: [
            "406",
            "408",
            "409"
          ]
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "5",
          mpeg4: "4",
          vc1: "2",
          xvid: "3",
          dvd: "5"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel[5]"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "8",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "6"
        }
      },
      area: {
        selector: 'select[name="processing_sel[5]"]',
        map: {
          CN: "2",
          US: "3",
          EU: "3",
          HK: "1",
          TW: "1",
          JP: "4",
          KR: "5",
          IND: "6",
          OT: "6"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel[5]"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      }
    },
    SC: {
      url: "https://secret-cinema.pw",
      host: "secret-cinema.pw",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAAAAAAgK5ejAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBw0KAxGGHdK7AAAAuklEQVQoz2MUY8AHmBhGpbEAFgYGBgaGjZwYEt/9EdIauHQzijEwMDBwMWJI/P+G0P2NgYGBgaFM6lkXg2w6z5Iz2JzW8qjgYgZDw4aCGBM0pzEwMDAwPLE4upPB/eYZhgKEGDM3nHnmf1ziZ8GPVzA9xsDAwMBgsnMnw9zpAQwMsgyPsei2SxHwur/JT082+cAnVI9BgKz1nTMMDCYqK9D9TSBQS9kwJH51I3TfxKJRnQjDB3Fioqk0ADLEKO5/ENcdAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA3LTEzVDEwOjAzOjE3KzAwOjAwgNGSrQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNy0xM1QxMDowMzoxNyswMDowMPGMKhEAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      torrent: {
        selector: 'input[name="file_input"]'
      },
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchsubmit: 1,
          filter_cat: 1,
          groupname: "{name}",
          cataloguenumber: "{imdb}",
          order_by: "size",
          order_way: "desc",
          tags_type: 0
        }
      }
    },
    SSD: {
      url: "https://springsunday.net",
      host: "springsunday.net",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBjAw7XIc2AAAA6pJREFUOMt11F+o33UdBvDX8/19f2dtMk87W42tieco889GgQtBAhllobmzLBsUEiyoLrLQiXgT5J0RQU23izQk6sLdhYbbWTIxhtnUvCiqZcPtKDQw286O4M7Ozu/8vu8ufktc4Ac+F++L53m/P5/neT/xf2dyer+mu6jS26o8KD6PFn/Bz+kdZngXBspvZ2ceuAzf+2Cx5SeLlmdfIc2NeCIxGfl15PnwcXyTWod7IvN0L05cv9O5E4ff52g/SHjh6OOkWUX9AFeV3KOGf9T0kSfV8N6oH2IcR6pb1vRWXDbh+4Qbd/1CFhZUsoX6AmbIv6V3vepgWfKsqlvx5f/hOlw9vV/DyqiL7dT0Pui7cGGr5FNRnyg+ivmob0vGVbUYo0LWU+epzzW9Fad1y39vGFJfwb4WG1R3L7Ub8ziiakyyXpo9iQXSqmqLldSakk34ZLidejCsVs6WeqJV3U+jdqnqV/IC3gxV3F7V7SrNgWb+tXe7j91m9und8K+p6f1/HV4xcbh3/uwq1W2P+hF1JT6SqR17z6ZqAio5iT+HncqYOF+8FHmG/L6a5mRqODh1cA+YuvMxMkTuwEPK9zO1Y++BlK+KMdSlG0QVyUgQ3iIvFM/hb2ROvNsOx5eWm3N9ZRKnexOb7/hDcUasCVegjwaRS48f1RPi02FnuHskQt3WZXELhnhdaiFTd+51aY71uAGTiU3YhA1Ghl6L1UYNV6ItJYWkMFfM4MctvpR4+5ajD7x6bPu+t5tmg/rPa6zb2KSMYVWpcbI16roamXp9uFZsHTWttal8Q2xs8F08/vL2R29Ou0p1p2+xdsNkStcNlxa7qrnZQ3tmpXmp0hzHJDVZnKJ5uDihKBXc0ER1KTdF/crye9+h7qO+FgNp+t6cGSmq6Z0zWPgdnsK28HUsYV4iyXzJky164gzey2iH1xSTpf1nkreumX5svrioGyynv3IFOVk1PI5t1OawDs+RXybts20lr5AD0syouga3Rm3GDioli7igXBRXUiewiKERdqbkH3n96LwbP6uV3iM0y1Fder25Gg52UDeVHJFmP915NbJRsaxyVfhecVzVq3hn9tD9o2954zfa2YP3LcG1O/dJk9Swrq6yTWpjqlNpHu0P5s4MxtaIrKbbXUzgYcOld9J+SHxV1WhHiHhaeapSD6nhZwb98WOpbqm4GdfhEZpn9FY4dfD+DyPEcFglz1NvJHWs5AS+hS/WKML+RH4mXqQbzB66PP7hvxsRnTJglc+dAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjQ4OjQ4KzAwOjAwwTRopQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjo0ODo0OCswMDowMLBp0BkAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(6)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "#descr"
      },
      poster: "#url_poster",
      imdb: {
        selector: "#url"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      mediaInfo: {
        selector: "#Media_BDInfo"
      },
      screenshots: {
        selector: "#url_vimages"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "501",
          tv: "502",
          tvPack: "502",
          documentary: "503",
          concert: "507",
          sport: "506",
          cartoon: "504",
          variety: "505",
          music: "508"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "2",
          hevc: "1",
          x264: "2",
          x265: "1",
          h265: "1",
          mpeg2: "4",
          mpeg4: "2",
          vc1: "3",
          xvid: "",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "5",
          ac3: "4",
          dd: "4",
          "dd+": "4",
          flac: "7",
          dts: "3",
          truehd: "2",
          lpcm: "6",
          dtshdma: "1",
          atmos: "3",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "4",
          encode: "6",
          web: "7",
          hdtv: "5",
          dvd: "3",
          dvdrip: "10",
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      area: {
        selector: 'select[name="source_sel"]',
        map: {
          CN: "1",
          US: "9",
          EU: "9",
          HK: "2",
          TW: "2",
          JP: "10",
          KR: "10",
          OT: "3"
        }
      }
    },
    SoulVoice: {
      url: "https://pt.soulvoice.club",
      host: "soulvoice.club",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzEdsHQb2wAAA2FJREFUOMut1FuIn9UVBfDf/r7/TKPJSJLGJrWJJo1WMKLgpcSoEYn4oq21gihSCvpii29qC0ZpQSKooeCDLwUvoKDWgigqiBeiBjUVNCApasTMkIpJkwzKjLnM5Vs+/D+pUEtf3LBhwz5ns85eax2+56gtO7oaTVZggOnwVcqM8Mf17Xdeuv/VC9BRg5bueLFIGcH+wcxc5weD5ib8Cp9jomQHXtn6bvd55uP2fvB9r6zXNgNdNz9W1W4gl1JrlVX4JMmtg7GRJpIJah3OLUL9VnkrXbaU2r51R9eZ2iBtK9386mrqjh7AD1F97uy6HGok8B4+wzFM9AcuL/WXyJnD5RTplqr6M27EYvwLX+JIeHMwaOaapCQmsB2jaMg27MU5VXVDKo1mCWzskX2FN3AQJ2C3+EcXmgrV1LTksR7dydRp5DXsJOeLZRa+oNRGfIHnsABn4Wji8ag9Cc1tFzQIjdcj9/bE/Iy6XPJ+4k0MspQk40me7wddiFk8ikcamfvDprc0cNvPW2FO1cPkN3gI46p+Qh2iaUysX4R9qpbiKJ4Jvwt3ah2MDFf9bX3d9/asZF7TjIyoGitaVSvE2Pz0VVPlwOKq+siQySmdo4rbN739H2H/L8Vfc+uoE9f+3uTev5+0csWqJZt/MTmindlzeHrBlyvXHlALDn63U74prtt8CtLQnFJVF+E0HEmy/7jRbttDN9UynEctxwx2hndqduZQjl+oXb6boUS4fvMalbal+WVVPY2HcYs4A4cfearZU2U8jPRk3IWni78aGT275mZ1e1cPB163eY3R0U4ql1TVvTgXB/C88qOqusxkVeIE6ooMey9jHr/GPemcnKL7cPUQ4bGZZnGVm4dy8VmS7Tgbl2L3ow/oovYVh4urw6LIG5jGpuLa6tJY2D+5yrreBdNJ/l1Vl/Ra+zDx4ksfUDGNv+FIcXGp0zN000C5MuXEVAyaZiCZ24BlmKuqdf1X9s/En7pkVyEV1HPFqbgFa2uoRzhD1enY33SZXYjze+YmsQsPJm6UPNuU7qkt49qVEyTTSbYmbsaTvVUncRzOK626/q41Y4mNkhb7sa/PY09uGf8vnc3u/akobc2N4cdiObW8yj7mtw9YNlXlBcUTd7/r/8XIqk+/Kaf6/Pjb/a8BRYVt72oJuZAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDk6MjkrMDA6MDCTeNgtAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ5OjI5KzAwOjAw4iVgkQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      needDoubanBookInfo: true,
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406",
          variety: "403",
          music: "408"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "2",
          h265: "2",
          x264: "1",
          x265: "2",
          mpeg2: "5",
          mpeg4: "1",
          vc1: "5",
          xvid: "5"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "3",
          "1080p": "1",
          "1080i": "2",
          "720p": "4",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hds: "1",
          chd: "2",
          frds: "3",
          cmct: "4",
          other: "5"
        }
      }
    },
    SpeedApp: {
      url: "https://speedapp.io",
      host: "speedapp.io",
      siteType: "SpeedApp",
      icon: "data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAACdnZ0Ao6OjA01NTXwuLi7HAAAA8QAAAOsAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOoAAADqAAAA6gAAAOsAAADyLCwsyU5OTnujo6MDnZ2dAJiYmAw2NjbLAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/zY2NsuYmJgMRkZGkAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0ZGRpARERHjAAAA/wAAAP8AAwT/AB4p/wAhK/8AHyn/AB8p/wAfKf8AHyn/AB8p/wAfKf8AHyj/ACQs/wARFv8AGiD/ACUu/wAeKP8AHyn/AB8p/wAfKf8AHyn/AB8p/wAfKf8AHyn/AB8o/wAiLP8AHCX/AAAA/wAAAP8AAAD/ERER4wAAAPAAAAD/AAAA/wAtNf8A2f//ANH//wDK//8Ayv//AMr//wDK//8Ayv//AMr//wDJ//8A2P//AKLM/wCkzf8A7f//AMf//wDJ//8Ayv//AMr//wDK//8Ayv//AMr//wDK//8Ayf//ANb//wDM/f8AHCX/AAAA/wAAAP8AAADwAgIC7QAAAP8AAAD/ADQ8/wDj//8A1v//AND//wDQ//8A0P//AND//wDQ//8A0P//AM///wDR//8A9///AG+M/wCXuP8A+P//AM3//wDQ//8A0P//AND//wDQ//8A0P//AND//wDP//8A2///ANb//wAiLf8AAAD/AAAA/wICAu0DAwPsAAAA/wAAAP8AMDf/ANX//wDK//8AxP//AMT//wDE//8AxP//AMT//wDE//8AxP//AO///wCbuP8AAAD/AAAA/wCv0/8A6///AMH//wDE//8AxP//AMT//wDE//8AxP//AMP//wDP//8Ayf//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwN/8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMf//wDX//8AgZn/AAAA/wAAAP8AAAD/AAUJ/wCVtP8A2P//AMb//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA3/wDW//8Ay///AMX//wDF//8Axf//AMX//wDF//8Ayf//AN7//wA/Vv8AAAD/AAAA/wAAAP8AAAD/AFt1/wDj//8Ax///AMX//wDF//8Axf//AMX//wDE//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDf/ANb//wDL//8Axf//AMX//wDF//8Axf//AMX//wDE//8Azv//AN///wBKYP8AAAD/AAAA/wBief8A4///AMn//wDE//8Axf//AMX//wDF//8Axf//AMT//wDQ//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwN/8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMX//wDB//8A1f//AOz//wA1Q/8AR1n/AO7//wDQ//8Awv//AMX//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA3/wDW//8Ay///AMT//wDG//8Axv//AMT//wDF//8Axf//AMP//wDR//8Avef/AJ3J/wDW//8Az///AMH//wDF//8Axf//AMX//wDE//8Axv//AMb//wDD//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDf/ANb//wDK//8Aw///ANz//wDf//8Ax///AML//wDD//8A1f//ALfg/wCCqP8Ax/P/ANL//wDC//8Axf//AMX//wDF//8Awv//AMn//wDg//8A2P//AMH//wDP//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wA1PP8A3///AMr//wDu//8AfJn/AGmA/wDr//8Ayf//ANL//wC34f8Agqj/AMPv/wDR//8Aw///AMX//wDF//8Axf//AMH//wDR//8A4v//AGB4/wCTtf8A7P//AM3//wDJ//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ACIo/wDA6v8A+///AJy3/wAAAP8AAAD/AHeN/wD8//8At+P/AIGn/wDD7/8A0f//AMP//wDF//8Axf//AMX//wDC//8A0P//AO///wBkev8AAAD/AAUH/wCv0/8A+P//AMf//wAeKP8AAAD/AAAA/wMDA+wBAQHsAAAA/wAAAP8AKjP/AKnO/wBsgv8AAAD/AAAA/wAAAP8AAAD/AFVi/wCgy/8AxO7/ANH//wDD//8Axf//AMX//wDF//8Awv//ANP//wDX+v8ARVj/AAAA/wAAAP8AAAD/AAAB/wCatP8A7P//ACMu/wAAAP8AAAD/AQEB7AAAAOwAAAD/AAAA/wA4Q/8A8///AGd+/wAAAP8AAAD/AAAA/wAAAP8AQ1j/ANv//wDS//8Awv//AMX//wDF//8Axf//AMP//wDR//8Ax+//AJ/L/wAwQf8AAAD/AAAA/wAAAP8AAAD/AG+I/wCoyf8AHiX/AAAA/wAAAP8AAADsAwMD7AAAAP8AAAD/AC02/wDa//8A+P//AICW/wAAAP8AAAD/AGR6/wDt//8Az///AML//wDF//8Axf//AMX//wDD//8A0f//AMLu/wCAp/8Avur/AO7//wBMYf8AAAD/AAAA/wCbuf8A9v//AKXQ/wAWHP8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDj/ANT//wDP//8A7///AGd9/wBTZ/8A6P//AND//wDB//8Axf//AMX//wDF//8Aw///ANH//wDD7/8Agaf/ALfg/wDR//8A1f//AN3//wBHWv8Afpv/AO7//wDR//8A1///ACIs/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwOP8A1v//AMn//wDH//8A2f//ANv//wDL//8Awv//AMX//wDF//8Axf//AML//wDS//8AxPH/AICn/wC24f8A1f//AMP//wDB//8Azv//ANz//wDY//8AxP//AM///wDJ//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA4/wDW//8Ay///AMT//wDI//8AyP//AMT//wDF//8Axf//AMX//wDB//8Az///ANj//wCeyP8At+P/ANL//wDD//8Axf//AMX//wDE//8Ayf//AMf//wDD//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDj/ANb//wDL//8Axf//AMX//wDF//8Axf//AMX//wDF//8Awf//AND//wDt//8ARVj/AFVl/wD7//8Ayf//AMP//wDF//8Axf//AMX//wDF//8Axf//AMT//wDQ//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwOP8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMP//wDL//8A6f//AGJ5/wAAAP8AAAD/AHWL/wDr//8Ax///AMT//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7AAAAP8AAAD/ADA4/wDW//8Ay///AMX//wDF//8Axf//AMX//wDF//8Ayf//ANz//wBNZf8AAAD/AAAA/wAAAP8AAAD/AGd//wDh//8Axv//AMX//wDF//8Axf//AMX//wDE//8A0P//AMr//wAfKf8AAAD/AAAA/wMDA+wDAwPsAAAA/wAAAP8AMDj/ANb//wDL//8Axf//AMX//wDF//8Axf//AMX//wDI//8A2v//AGd8/wAAAP8AAAD/AAAA/wAAAP8Afpj/ANz//wDG//8Axf//AMX//wDF//8Axf//AMT//wDQ//8Ayv//AB8p/wAAAP8AAAD/AwMD7AMDA+wAAAD/AAAA/wAwOP8A1v//AMv//wDF//8Axf//AMX//wDF//8Axf//AMT//wDH//8A8P//AH6V/wAAAP8AAAD/AJe0/wDu//8Aw///AMT//wDF//8Axf//AMX//wDF//8AxP//AND//wDK//8AHyn/AAAA/wAAAP8DAwPsAwMD7QAAAP8AAAD/ADM7/wDd//8A0f//AMv//wDL//8Ay///AMv//wDL//8Ay///AMn//wDP//8A9///AGV+/wBogf8A/f//AMr//wDK//8Ay///AMv//wDL//8Ay///AMv//wDK//8A1v//ANH//wAhLP8AAAD/AAAA/wMDA+0AAADwAAAA/wAAAP8AMTn/AOf//wDe//8A1v//ANb//wDW//8A1v//ANb//wDW//8A1v//ANT//wDa//8A9P//AKTK/wC76P8A4f//ANb//wDW//8A1v//ANb//wDW//8A1v//ANX//wDj//8A2f//AB4o/wAAAP8AAAD/AAAA8AcHB+UAAAD/AAAA/wAHCf8AMTn/ADM6/wAwN/8AMDf/ADA3/wAwN/8AMDf/ADA3/wAwN/8AMDf/AC43/wA5QP8AKDL/ACAo/wA1Ov8ALzf/ADA3/wAwN/8AMDf/ADA3/wAwN/8ALzf/ADQ7/wAuNv8AAwT/AAAA/wAAAP8HBwflVVVVowAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/1VVVaOqqqobERER6gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8RERHqqqqqG6GhoQBeXl4dNzc3nA4ODuIAAADxAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAOwAAADsAAAA7AAAAPENDQ3iNzc3nF5eXh2hoaEAgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAE=",
      asSource: true,
      asTarget: true,
      seedDomSelector: "div.row.d-sm-none + div + div",
      uploadPath: "/upload",
      needDoubanInfo: false,
      search: {
        path: "/browse",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          search_area: "{optionKey}",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#torrentDescription_releaseInfo"
      },
      imdb: {
        selector: "#url"
      },
      mediaInfo: {
        selector: "#torrentDescription_mediaInfo"
      },
      bdinfo: {
        selector: "#torrentDescription_bdInfo"
      },
      screenshots: {
        selector: "#torrentDescription_screenshots"
      }
    },
    SubHD: {
      url: "https://subhd.tv",
      host: "subhd.tv",
      siteType: "subtitles",
      category: [
        "subtitles"
      ],
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA5FBMVEUAie0Aie4AiO0Lje4wn/FBpvIsnfAIjO4mmvCo1vnb7vzc7vzc7/yd0fgcle8Fi+6j1PjR6ftNrPMzoPFktvTk8v2Py/cBie4Tke/V6/wHi+4Ahe0Bh+1etPRwvfUGjO4HjO6h0/j1+v5kt/QNj+4ble9/w/bJ5vvo9P3q9f3B4vpRrvMSke8PkO5lt/TP6PvY7Pwfl+8Ah+0om/C94PpQrfMAhu0AhO1suvUvnvEQkO+/4frM5/tMrPPF5Pu+4PoAiO44ovG84Prg8Pze7/y33fo1ofERkO82ovFFqfIPj+7///92Ih8bAAAAAXRSTlPpmTCCugAAAAFiS0dES2kLhVAAAAAHdElNRQflBgQEKCzi8yjzAAAAgUlEQVQI1xXK5xbBQBRF4TtHlAgG0YPoojMEiRYtyvs/kOvft9faRAIRLRqLQxAzoSeNVDrDAZnN5c1CsVQGoVLVa1a90bTZrXZH75o98CPQHwyd0Xjyf+RUzrT5YrlSpNYb19ru9o6nCP7h6Hqn88UHBbje7sbjGSIgjtf7E36ZP28ZDcGwKhEtAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTA0VDA0OjQwOjQ0KzAwOjAwUjx2WwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0wNFQwNDo0MDo0NCswMDowMCNhzucAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}"
      }
    },
    TCCF: {
      url: "https://et8.org",
      host: "et8.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzILb439SQAABFZJREFUOMuV1MlvVVUcB/DvuecO597XN7Slw6ulLdQCEqcAQQZBIzEhLnRDjNFo4tqd/4BxZ3RhjAtNTIzGGAwKYnAgBEVaEgQBGxFf6SvQuX19452Hc+69LupAE2Lgm5ztJ998T/IjPX19qCwuYuSxvXTvtkc3M017RtGNrsB1T0yNX75U6O4Jvv7qS9xtZNdsgUnYKjK5g9eyfU91bnlkqE1W1eXRU4NVR3y0AuvHu9YAyMe/+yH/8TffH8r2D76SFDdunEGezDV5avJMf1QYupRk8vcGakzPFDeO7Bl8YOuwUrwflSszmLi5AGGLWEoldeXEB7kikI+BJAKScPXFCcABWADSNaAfBr5tNhuWaQrFaNHEMTlfmXXjxdI4cWYTaeeTzwZIN1ACoUskLFAaaVQKFQmNqNW4GNSry7KR4TcnSqvg6M9nrXPHjx/d/MTTvay9tKM6US7L1//8SY6DznD744eSLTsG3XwXzUpJmlcIiqqU9ioEGc+0fz/y6bd1x36fZdom/2343ttvxYHrnukc2TqXCUVHbFbohoF1L287+Nx2OrCpr0qY4VEVSBJIaYIMlVCgBKSpZfO9Q/sloh5WmDGJy7+ugrbrAkBj7MhnFw+99jr09f19iqq+sfvhB4fWD2+Sm14AJxLweQJPxFi0AqzUPYS1SAqDuC1OoBDx34zy7YNqjEEIAU1V074Mw3BWQ0sG3CiGGQoEIkG14WN+tgJvatJuVatjYbOyQjXjzmCrZYILkTBNdZyQCzuKZTuMYYUcC3YI0+eYr7qozi+kXulirTlb/nypPD6dK3TcGTQtC0KINNQ0x4+EcHkMlwu0QoFS3cGF8XnM3KjBr4ckpus7IV3f193dWZZY+7QsU9Rr1bWgbdvgnCdM112PC+FEAhU3wpwdIKfKyLQbiAhgOjEkqSOndu98EYQtRxNnj5GcsQwA9HYw19uPwPcNpOn+7Xv2bTLaO43ysoVz11eQzzCougqbx2hYIbgnJMisIFOyjrblWvWF8g2NIFrTMLQtRGGQSLEwzYBHVhijagX4rbQEYZu4b7AHxf4O1JwISwEHdyRCM/275IQ3ugdG5lLKzqxpaBgM3LVkinRwYNvuh8CMrkrDSf+4Nh01pkoWZQq0QlYGU0lLJIhtn4hEh5z4Xboch9RoP7UGlCQJbrMeS7K86Hn+UM20B5uNGmlcHb0a3LryYezWWaSwIjqLChSauj4nSSCgRi5TpGQGStvRNWDo+0iSNAWRXIXpkyEXl9xm7bS3NHPYny2Ncd+dSvW2Dp6SLVFuHfwUJDVdqK05W3OnzyP2T67Z8J/4thmXL4xN4MLYrb8/zgMA1Kt10tFryAnRY54eSFNdUv2ZGnUWTqZe5VhKlITi/xNj9UwBABgQN+duLOjZQkVlTNc1VmeL46fprV8+2XXw+dHzJ78AuZfjmc3lYJkm3nznXbXY29OTb8sMe54/8epLLywTQkApxV987U+PhqXfyQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo1MDoxMSswMDowMBODZaMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NTA6MTErMDA6MDBi3t0fAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "622",
          tv: "623",
          tvPack: "623",
          documentary: "404",
          concert: "626",
          sport: "627",
          cartoon: "627",
          variety: "627",
          app: "625",
          ebook: "629",
          magazine: "631",
          comics: "632",
          audioBook: "633",
          onlineCourse: "634"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "7",
          hevc: "8",
          x265: "6",
          h265: "8",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "4",
          dd: "4",
          "dd+": "4",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "10",
          dtshdma: "8",
          atmos: "8",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          remux: "5",
          encode: "11",
          web: "9",
          hdtv: "6",
          dvd: "7",
          dvdrip: "4",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          torrentccf: "1",
          tccf: "1",
          tlf: "2",
          bmdru: "3",
          catedu: "4",
          madfox: "5",
          other: "7"
        }
      }
    },
    TJUPT: {
      url: "https://www.tjupt.org",
      host: "tjupt.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: "#external_url"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "411",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403",
          music: "406"
        }
      }
    },
    TLF: {
      url: "https://pt.eastgame.org",
      host: "eastgame.org",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzMtpJtJ9QAAArNJREFUOMuVk7+OHEUQh7+q7umZm929s2wJjCAhQESEPAIJgXMewvIrOPSDIJEREPAEZEiIiMTZSZjDt3vr3Z2d/93lYJa7PVsW65J6unvU9fXv19Ut3724dIuZY1E6Ls6UhwvhwcxxMRMezRyfzD2PSsUrNNFY70eW25F1PbJpI3Ub6YbEy8stv/1xhQd+BhCm+K83jkMO37u/drToeK0fkj0ZkxGTMSZjsCnfC6iAYUQz1CCmKVWdkB2aV8gUvAJi+H0TUTEEw1DUKcELmZtsqkybZQp9NKou0vSJYUikmEgpEWNkHEfiMOA3q46uVupSqUqlrh1VM7IsHRelcH4mzAPkqiSMbjTaPtH3I+2YGMbErh5YrmraTY1fX3dkORRnSlEI60KYlcq8cJS5UuSQe6Hwgvc2HYNBNANLiMLrVc3VPxu6N3t8W7fEHmIn9LnS50JfC22uFEHJg5BlQghCnkHmBe8EVRA1khnXr3esrt4QuxafYnyeEKKASCKijCI6kH6QJF+RFDMBBEGnWhsvMyc/iZCGMdE2PV3dYzHe3pLb+PbZ7wDO4Bfv+b4ISsgnpSEoIRO88qvBEyD++PSbe/n+XWAId3t4LxMog5AJwUN2sPuheA9Y5BPQbAKGI2WZV8wS3ZDet/YhYB6OgJmSH2BOYVe1rK53VNsWETkNKGKHHlKM1PuBbT/Q1B03y4r1akfX9Kcr/PfV9nacYqTvBup9S7VtqDY1cejvven/Bf7156ujWQKLmEVICWycHFg6HWgp3gMaCbEExAlkET5GIXoEFHBOcV4AJXYQ+4jFj1Ao7q7KIVfK85zZPGCSaHYN1bqia1vgxCq7oAfrUJ7nfP7FBY8/XeA83CwrLi9hdWO316Y7HWjM5jmfPV7w9ZcPKIPj70WgaRqarkd1Au7eyX8L7wlhtfLjAQYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NTE6NDUrMDA6MDBA7iTqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjUxOjQ1KzAwOjAwMbOcVgAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "438",
          tv: "440",
          tvPack: "440",
          documentary: "443",
          cartoon: "442",
          sport: "444",
          concert: "445",
          variety: "441",
          music: "446"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          h265: "6",
          x264: "1",
          x265: "6",
          mpeg2: "4",
          mpeg4: "0",
          vc1: "2",
          xvid: "3"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "9",
          dd: "9",
          "dd+": "9",
          flac: "1",
          dts: "10",
          truehd: "14",
          lpcm: "12",
          dtshdma: "11",
          atmos: "13",
          dtsx: "10"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "4",
          hdtv: "5",
          dvd: "6",
          hddvd: "1",
          dvdrip: "6",
          other: "9"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      }
    },
    TMDB: {
      url: "https://www.themoviedb.org",
      host: "www.themoviedb.org",
      siteType: "tmdb",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA4VBMVEUDJUEDJUEDJUEDJUECJEABI0ACI0ACIz8CIj4QNUobRFQQOU8PPFIQQlkJOFINVHAHUnEDME0TOk0oVl8rY2wpanUjbHwWZXwhr8kQqc4ET3ARN0scRlUXRFYbUWMVTWIMQVsNU28IWnoDNlQBIj8oU1xHf3kxbHJGn54fZXYVWnALTGgIZocDQF8RNkstXmUlWmYoaHQSR10NQ1wIP1oGTm4DOVcfSFVvtZxmvKpVurM1kpsWYHcPXXgKbo8ESWoLL0YqWWIpX2kiXm0USl8LP1kIPFcFQmADNFIBIj7///8y4y3nAAAAA3RSTlOL8/J7NBHxAAAAAWJLR0RKHgy1xgAAAAd0SU1FB+UEDxE0CxaidT8AAAB5SURBVAjXY2BgZIYARgYGJhZWFjZ2Ng4OFiYGFk4ubh5ePn4BQRYGViFhEVExcQlJKQ4GNmkZWTl5BUUlZXYGFVU1dQ1NLW0dXXYGFj19A0MjYxNTM6C4uYWllbWNrZ09UNzB0cnZxdXN3YMFaL6Kiic7EADNR7IXAHnLC6fWgfiqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjUyOjA5KzAwOjAwD2XHBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo1MjowOSswMDowMH44f7sAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search?query={name}"
      }
    },
    TTG: {
      url: "https://totheglory.im",
      host: "totheglory.im",
      siteType: "TTG",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5woaCC40liGC4QAAA+FJREFUOMttlEtTVEccxX+3+5K5wzyAASKPMaLRLCAp3fhKstG8voRV2eXb+CHMB4hJ9mZhrIpVwZTCiEYepgYYYAZl7ozcV7+yuDBClV3V1b06fc7/nNPenTt37n566dL5YjEYy7LEWuNwzmGtxVpLkiSE3ZA0TdFaY63FGIPWGmMMxhiUUhhjAPA/v7ww/82tby9OT03XtNbW4cABgBCC3d0dHv/1mNbODlppjM3BlFKD8/junMOvVivVs/X6xJkzU6N8YAVBQON5A7ErEEKAB9ZahBB4nvd+4+Gw+HEcJf13PV2r1fA8ge/7AGRZhtaKdmePbrdL2OthjiRrc3QeM8xyhtYZ/O7bLq9fr+OcpTY2zvj4JADd7lt2drZZX9/gXb+PFB5OCJxzOMcpuceSjTX4B297/PPkGe29N8zPz1OrTeB5kKQJ3bAHnmB+YQGjDc5ZrHO02x0ayw0ODw/JlMJoPTDMV0oRxzFRFJNl6mhyHpMTHzM8XEYrjZACj9wrKSRra6tsbjZptVqkaYZz9j1gHo88KidXsThMsTj8IZ8IwxCVKcKwh9IZzoEzFiFFDqhPUAZwOHq9kDTJCIKAarUKDrrhAb1ej/X1NYJiwKXPLiKlIEkS9vbavNl/g38ypAOWDl68XGF7a5uz9U+4evUaOFhuLPFkcZEsU9y4eYOz9TqlUolOp8ODB3/w26+/42utjyKiT0nf2+2wtrqBL4aO3rDs7+8zXC5xdf4Lrly+wtDQEEIIpqamaTabSClzyc45+v0+GxvrBEEBay2rq6uEvRDw8qh4sLAwD3jMTM9SKpUGeY2iiHeHh8RxnDME6Pf7rDxfodlsopSi2WwyMjKClDKvoSc4d+48vvSR0idNU1ZePGd5aZl2p83Ll/+SpmkOaIwhiRP6/T7xf/Hg1UKhAB6DahU+CoC8ent7O9y//wutnRblUoVyucz169dyU5RSeF4uTUqJ7/s45zDGcDwSz/MGsUmzlK2tLZ49fcr3P3zHrdu3CYIivbCXMzwGVFqdqlOSJERRRJZlSCmQ0kcIgZSScqXC9MwU9foss9N1yuUqZtYgL1y48GMQBGestcNpmp7qplKKg4MDXr16xaNHf6KNYmxslFKpTCEIqNVGmZwcZ3RkjFKpnKs7KfkkGOTONxoNlpaWiKKIza1NCoWAr778mtGRUa5fu0mcRARBcTAO3xgjtdae53mDxuSgZiA773rEw4ePqNVqlMsl5s6dp1yuUCpVMMbQ7rTZ3t5Czs3N/RQEwQRQHHxDJ9pzXEcpJd0wpLXdIo4iZmZnqFSqSF8SxxGLi39z7+d7/A+iMsWK5Inr3gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0xMC0yNlQwODo0Njo1MiswMDowMO+VxjIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMTAtMjZUMDg6NDY6NTIrMDA6MDCeyH6OAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTEwLTI2VDA4OjQ2OjUyKzAwOjAwyd1fUQAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#main_table h1~table:first>tbody>tr:nth-child(2)",
      torrentDownloadLinkSelector: 'a[href*="im/dl/"]',
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        replaceKey: [
          "tt",
          "imdb"
        ],
        params: {
          search_field: "{imdb}",
          sort: "5",
          type: "desc",
          c: "M"
        },
        result: {
          list: "#torrent_table>tbody>tr",
          url: '.name_left a[href*="/t/"]',
          name: '.name_left a[href*="/t/"] b',
          size: "td:nth-child(7)"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="subtitle"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="imdb_c"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'select[name="anonymity"]',
        value: "yes"
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: [
            "51",
            "52",
            "53",
            "54",
            "108",
            "109"
          ],
          tv: [
            "69",
            "70",
            "73",
            "74",
            "75",
            "76"
          ],
          tvPack: [
            "87",
            "88",
            "99",
            "90"
          ],
          documentary: [
            "62",
            "63",
            "67"
          ],
          concert: "59",
          sport: "57",
          cartoon: "58",
          music: "83",
          variety: [
            "103",
            "60",
            "101"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "109"
          ],
          bluray: [
            "54",
            "109",
            "67"
          ],
          remux: [
            "53",
            "108",
            "63",
            "70",
            "75"
          ],
          encode: [
            "53",
            "63",
            "70",
            "75",
            "52",
            "62",
            "69",
            "76",
            "108"
          ],
          web: [
            "53",
            "62",
            "63",
            "70",
            "75",
            "52",
            "69",
            "76",
            "108",
            "87",
            "88",
            "99",
            "90"
          ],
          hdtv: [
            "53",
            "63",
            "70",
            "75",
            "52",
            "62",
            "69",
            "76",
            "108",
            "87",
            "88",
            "99",
            "90"
          ],
          dvd: [
            "51"
          ],
          dvdrip: [
            "51"
          ],
          other: ""
        }
      },
      resolution: {
        map: {
          "2160p": [
            "108",
            "109",
            "67"
          ],
          "1080p": [
            "53",
            "63",
            "70",
            "75",
            "54",
            "67",
            "87",
            "88",
            "99",
            "90"
          ],
          "1080i": [
            "53",
            "63",
            "70",
            "75",
            "87",
            "88",
            "99",
            "90"
          ],
          "720p": [
            "52",
            "62",
            "69",
            "76",
            "87",
            "88",
            "99",
            "90"
          ],
          "576p": "51",
          "480p": "51"
        }
      },
      area: {
        map: {
          CN: [
            "76",
            "75",
            "90"
          ],
          US: [
            "69",
            "70",
            "87"
          ],
          EU: [
            "69",
            "70",
            "87"
          ],
          HK: [
            "76",
            "75",
            "90"
          ],
          TW: [
            "76",
            "75",
            "90"
          ],
          JP: [
            "73",
            "88",
            "101"
          ],
          KR: [
            "74",
            "99",
            "103"
          ],
          OT: ""
        }
      }
    },
    TeamHD: {
      url: "https://teamhd.org",
      host: "teamhd.org",
      siteType: "TeamHD",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA/1BMVEUnb4xDgZs/fpkdaIc5epUtc48haokeaYcwdJFXj6ZTjKQvdJAha4keaIcwdZE1eJRAf5knbozu8/bV4+kdaIe1zdd4pLcydpLs8vUmboyFrb44Y3s4Y3qbU1CcU1Cxy9KAqrne6elPiaCudHH9/fj39O/59vHr3trBlJD17+qdVVK1f3zx6OTGnpqzfXn38+6dV1Tk7u3R4OP3+vb6+POrb2yVucRDgZrk7eycVFH59/KscG2vdHH49O+eV1Wrbmrr39rKpKD8/Pfv5ODz7Oj07ejIoZ0qcI0lbYsuc48ha4mdVlOkYl+iXluCq7w3eZUkbYuGrr+iwc3a5uv////JDiEOAAAAEnRSTlP8/Pz8/Pz8/Pz8/Pz8/Pz8/Pxv/XQeAAAAAWJLR0RU5AOIpQAAAAd0SU1FB+UGFAUQNy7SYEwAAACnSURBVBjTXc/VDsJAEAXQHYo7Q3G6uBUvUtyd4v//LyxsQlru25xkjBAAk2AGsFgBwGYH4kAMiiHEcAQxGosjEUSeRJLnBxL9RiJCKs3KTDaXLxRLZT1UqFyt1Q1AaaPZYtBWFKXDQe72GPRVVR1wGI7GxpbJdGaA+WKpG7pab7a7z9r9gcHxdNa0Cz/s/3S83thX9wfiU3whOgm43OxvjxfAJ/gBAm8tFB1sxKb5KwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0yMFQwNToxNjo1NSswMDowMJkzpLEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMjBUMDU6MTY6NTUrMDA6MDDobhwNAAAAAElFTkSuQmCC",
      asSource: true,
      asTarget: false,
      seedDomSelector: "#details_hop",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      needDoubanInfo: true,
      search: {
        path: "/browse",
        params: {
          incldead: "0",
          search: "{name}"
        }
      }
    },
    UHDBits: {
      url: "https://uhdbits.org",
      host: "uhdbits.org",
      siteType: "gazelle",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxYgELsSrwAABEJJREFUOMtFlE1vXeUVhZ/9fp1zP3x9bcc2TnCCQwIFVIUCA0/opEiIEYNW7RipP6I/pr+AYVVVQkJCKghKFYKliEBCCIkTwHEcfJPre4/PeT92BwZ3S1ta0paewdJaW8796e8fqTF3xZgdEXZw/tuU3eStC4+7v16+pquyTydBAcRGibMRN//Vk/v/bbxIN7JFLir6uyzltULZcoj8xtfVlg/uDYP+nFPZV7F708ff7d2cf3Io7pujeaEDsBV+9nB90Oy/suTN1prx5qw3ds0UWY6xGzWlqRzGjF3wvqq9tSgpa9FSPa0rOwk1U+849oX4C9CFntR17Ydd1V80Po2tFStZUMjSttFhaK0V65213ggWMVqqcfBm7CtwDlwBABvAVxAqS+VrrE9gFRXFRltEpHWiCAgCiChGBSOCtWAtGAdOQQHrwVhBrCBGUCOcXH5ZVXF1cNTBYq1BtWCMMHCWqupjQx9jLKQMAsY6bOjj6gF+1MOGjBhFYyFppswU985rZ1lcWuSbvSO+3v2ZzdWad14/y4C3WdOa4ZOap7c/BWBpa5v+md8zXP8tg/ULLJ5fwQZL6TIPvrjFtfc/xL3wzAJLZ0bsTTtiVvrBcuX8AvOyyqCbEPQamj8DIIwuYOwV6vHLjF9YpOka5s0R/ZURy69usnHvMk7g1IOiiuqJ1hwx1TLDZ7dZO44AjM5tczxZoW0j88mUr/7xCQffPWDjyiXWX3mO5UsbONUTUDn1FYoquTvCjs6ydP49hpf+AoDrDXm4c5/5wWPSFCaf3+fgi9v0msB4ZQVjDU4B7wyDyrHQ8wxqhzGC8YFuNmH/xnUefX8TgOXnXyLOBhjnsc6ysLpEe26dhdVlQq8mNhH3w/5Ttq9s8vqLz/DnN7cYBIOXwpPOUuJdjvc/YO/qPwGoeu/iwx/w/YssXRyz/bc/EqcNvTMjjmZTfvzgU9zVW/s8v7nMq5fXGFihnWau3pswnXdU4TqL0x1Mvo0CzcEOc12jmxWauERvdQEzMLSzQ/au32H3PzdwN/dmvP/vO3z29UN6wdAmZfeJ8py/w8bwY9bct9RjBaA5vMX8wDPZ/ZHm43XcwCBWKF1i+sMBj27s4giBW4eJO9MploKKRaoRG/VdSvmSFB6AP6lenu0SJy3N/cjh7QjSghRISooRjzmJTV17enXAG8gYojhc8LjKYB2nYzy42hDqmt5wiLHhtClt09A1EacKIoI1gjGg+msy5VSj/4eigmAwCEYMGEUsiDEg4FTV5VxMzBktkFTpSqIjEVG6BO2v3yZBPC7ENhK7DqsJyUBSSsoGVedQPcopPY2dHGdKU9QcR5W209J0aNMlujZRAFzBxLb4rkt1jG0/k2qESjL9nFOlqHWiZVdjfNzldI8Yd0vRn5If7bUD96j07MQ75vmYqEAd8GD7KbLYpPlqys2GCOtB/KZSzhfR1f8B1roU+C5nEcAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MjI6MzIrMDA6MDAKmfIIAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjIyOjMyKzAwOjAwe8RKtAAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "size",
          searchstr: "{imdb}"
        }
      },
      needDoubanInfo: true,
      description: {
        selector: "#release_desc"
      },
      imdb: {
        selector: "#imdbid"
      },
      anonymous: {
        selector: "#anonymous"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      torrent: {
        selector: "#file"
      },
      category: {
        selector: "#categories",
        map: {
          movie: "0",
          tv: "2",
          tvPack: "2",
          music: "1"
        }
      },
      videoType: {
        selector: "#media",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          remux: "Remux",
          encode: "Encode",
          web: "WEB-DL",
          hdtv: "HDTV",
          dvdrip: "Encode",
          other: "Others"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "AVC/H.264",
          hevc: "HEVC",
          x264: "x264",
          x265: "x265",
          h265: "HEVC",
          mpeg2: "MPEG-2",
          mpeg4: "AVC/H.264",
          vc1: "VC-1",
          dvd: "MPEG"
        }
      },
      resolution: {
        selector: "#format",
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "Others",
          "480p": "Others"
        }
      }
    },
    ZHUQUE: {
      url: "https://zhuque.in",
      host: "zhuque.in",
      siteType: "TNode",
      icon: "data:image/png;base64,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",
      asSource: false,
      asTarget: true,
      seedDomSelector: "div.layout-container > div > form",
      uploadPath: "/torrent/upload",
      needDoubanInfo: false,
      search: {
        path: "/torrent/search",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          search_area: "{optionKey}",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#form_item_title"
      },
      subtitle: {
        selector: "#form_item_subtitle"
      },
      description: {
        selector: "#form_item_note"
      },
      anonymous: {
        selector: "#form_item_anonymous"
      },
      torrent: {
        selector: "#form_item_torrent"
      },
      imdb: {
        selector: 'input[placeholder="tt123456"]'
      },
      douban: {
        selector: "#form_item_doubanid"
      },
      tmdb: {
        selector: ".ant-space.ant-space-horizontal.ant-space-align-center >.ant-space-item:last-child > input"
      },
      screenshots: {
        selector: "#form_item_screenshot"
      },
      mediaInfo: {
        selector: "#form_item_mediainfo"
      },
      tags: {
        chinese_audio: 'input.ant-checkbox-input[value="603"]',
        chinese_subtitle: 'input.ant-checkbox-input[value="604"]',
        hdr: 'input.ant-checkbox-input[value="613"]',
        dolby_vision: 'input.ant-checkbox-input[value="611"]'
      },
      category: {
        selector: "#form_item_category",
        map: {
          movie: "电影",
          tv: "电视剧",
          tvPack: "电视剧",
          cartoon: "动画",
          concert: "其它",
          documentary: "其它",
          variety: "其它"
        }
      },
      videoType: {
        selector: "#rc_select_9",
        map: {
          uhdbluray: "UHD Blu-ray",
          bluray: "Blu-ray",
          remux: "Remux",
          hdtv: "HDTV",
          web: "WEB-DL",
          webrip: "Encode",
          encode: "Encode"
        }
      },
      videoCodec: {
        selector: "#rc_select_10",
        map: {
          h264: "H264",
          hevc: "H265",
          x264: "x264",
          x265: "x265",
          h265: "H265",
          mpeg2: "Other",
          mpeg4: "H265",
          vc1: "Other",
          xvid: "Other",
          dvd: "Other"
        }
      },
      audioCodec: {
        selector: "#rc_select_3",
        map: {
          aac: "AAC",
          ac3: "AC3",
          dd: "AC3",
          "dd+": "DDP",
          dts: "DTS",
          truehd: "TrueHD",
          lpcm: "LPCM",
          flac: "FLAC",
          dtshdma: "DTS-HD MA",
          atmos: "TrueHD Atmos",
          dtsx: "DTS-X",
          mp3: "Other"
        }
      },
      resolution: {
        selector: "#rc_select_12"
      }
    },
    agsv: {
      url: "https://www.agsvpt.com",
      host: "agsvpt.com",
      siteType: "NexusPHP",
      icon: "data:image/png;base64,AAABAAIAMDAAAAEAIACoJQAAJgAAABgYAAABACAAiAkAAM4lAAAoAAAAMAAAAGAAAAABACAAAAAAAIAlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEZADQxGgD/MRoA/zEaAP8xGgD/MRoA/zEaAP8xGgD/MRoA/zEdADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIbAf8wGwD/MRoA/yISAf/z683//vbZ//Przf///tz//fTS//n01f/58M7/+/nb/zIhB/80HAD/MBgA/zAbAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxGgD/MRsC/+newP/j2L3//v7W//Dqvf//9cX/49is/9nTpv8uGQD/MBgC/+HRo//347r/6dqs//Dnu//++dL/+PDS///02P8zHQH/NhsB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMRoA/zIbAf/t5MP/9+/H///0zv//+tH/VEAn/zIdAv8yGwH/MBsA/zAbAP8wGwD/MBkD/zAaAf8yGwH/MhsB/zIbAf8iDwD/+/HC/+HYrP/i2bT/8+zR/y4bAP8xGgD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIbAf8xHAD////b/+TYsP/w4bP///XG/zIbAf8yHAD/MhwA///9/P/+/v7///////////////////////////80HAD//////y4bAP8wGwD/MRwA/zIcAP/s3q3//e+///7/1f/49tj/MRoA/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMhsB/zUdAf/j2rX///nO//rvyf8yHAD/Mx0B/yoYAf8wGQP//f///zUbA/8wGgH/LxkA/zAaAf8wGwD/LxkA/y4bAP8xGQP//////zEcAf///v3/NBwA/zIeAP8yHAD/MhwA/+japv/s4bX/6eC//zAeAf8xGgD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyHAD/qp2D//324//89uP/LhsA/zIbAf8yHAD/MxsD//z++P8xGgD/o5eL//79///////////////////////////////////9/f3/MRkF/y8fAv//////NBsB/y4WAP/y8/H/MRwA/zIcAP8zHgL/7d+q//nsvv//8tL/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIcAP/4993//vng//v35P8xGwL/MhsB/7OSYf82HgD/LxgC////+f/6+uL/9PHi////+f////n////5////+f////f////7////+////vb////+//7//f////v/LhcB/y8ZAP//////MRwB//////8yHAD/MhsB/9zDZf//9bn/5dSh/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMhwA//f43v/7997/+fje/zQbAf8zHQH/+/78/7ueZf8zGwP/NBsB//////8yGwH/MhwK/ysYAP8tFQH/KRQA/ywUAP8qEQH/KxYA/y4XAf8wGwD/MBsA/zMbBf8uHgH/5dCZ/zghAf//////MBsA//3///8rFgD/Mx0E/zIbAf/8+OX/9vji//742/8yGwH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyHAD/4NCi/zIbAf///+X/MRsA///+9P84IAT//f///8OucP/aw3P/Mx0B///9/////////////////////////////////////////////zEcAP/ZwX//2sKA/zQfA//19uL/+Pfi/zIbAf//////MRwA////+/////r/NR0B////9/8zHQH/38Rq/9m+bf/Zvnv/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEcAf8yGwH/9eSx///8z/8xHAD/Mx0B//f07/89Igf//f///zMdAf/48tv/9/TV/zIbAf8yGwH/MRoA/zMaAP8wGQD/MxsD/zUcAv8zGwP///////7+/v8zHgL/MRwB/zAbAP8wGwD/MRwB/zEcAf//////Mx4C/zMdAf8sGQD/Nh4A//Lu7f8zHQH/MhwA///9/P/+/v7/LRMF/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIbAf//98j/uKZ3/zEcAP8wGwD/NB4C/+jm5f86IQf//v7+/zIeAP8zHgL///7p//j44P/5+eH/+fnh//n45P///+z/2MB0/9nBdf/exYX/+fXq//3////+/v7//v7+///////+/v7//////zAaAf//////Mx4C/861a/8lFQX/Mx0B//////8xGgD/HAwA/zIbAf/8//3//////zUeBP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBsA///0zP/45r3/MhwA/zMdAf+1mVz/Nh4C//39/f85IQP//v/9/zEaAP//////LBgA/y0fA/8pHgL/LRwB/ywbAP8tHwP/LB4C/ycaAP8wHwT/Mx4C/zYfBf82Hwn/Mx4C/zUgBf82HgL/TkEx//////8uGwD/Mx4C/zQfAP//////NB4C//////8yGwH/LhgA/zIbAf80HAD////////+//8xGgD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMx8A/9vKo////+H/Mx0B/zMdAf/GtnT/OCAC//////81HQH///////3+/P8qHAr//v/9///////////////////////////////////////////////+/y8YAv/ZzpL////j//j44P/7++P/MhwD///+/f//////Mx4C////////////MRwB/y8cAf/9/////f////////8yHAD/+//+//////82Hgb/AAAAAAAAAAAAAAAAAAAAAAAAAAAxHAD///PP//710P8zHgL/Mx0B/zMbA/81HwP/Nx8B//////8yHgD/NhwE/62ml///+fb/MBsA/zEcAf8xHAH/MBsA/zEcAf8xHAH/Mx4D/zMbA/81HAL///////////8yGgL/MhsB/zIbAf8yGwH/Mx0B/zIcAP8xHAH/Mx4C/zMdAf8xHAH/Mx4D/zMeA/8zGwP/Mx4D/zMbA/82HQP/Mx0B///////9////MRoA/wAAAAAAAAAAAAAAAAAAAAAyHAD/8ejH//DkyP8zHQH/+vbd//z42//6+Nr/Nx8B//7+/v80HgL/2sF7/97Efv/lzHb/2Ltm//X21v/8+N//+Pjg//v24f/5+N7//Prc//v43P8pEgL//vv3//78+//7+vb//Pvt//745f/2+eD/9vng/ykUAP9YQRP/Mx0B//j12f/5+N7/9PbZ//n43v/5+N7/+vXg//v33v/59uH/MhwA///////+//3/MRoA/wAAAAAAAAAAAAAAADIcAP/Pxa3/MRwB/zIcAP8wGwD////x////8P///+X/NB4C//7//f8zIQT//v/l////5////ub//f7q////6v///+r//f/p///+6f///+r////n////5/+bkHz///7p////5////uz////t///97v/7+OP/+fbh/zIcA//+/v7/MhwA////6////+r///7r////7f///+3//v7s//7/6/////D/LxsC/zMdAf8yGgL//f/p/zIbAf8AAAAAAAAAADIcAP///vr///34/zMdAf82GwH/MRwB/zIdAv8zHgL/NB4C//7//f81HQH/Mx0B/zIcAP8zGwP/Mh0B/zEcAf8xGQH/LxoA/y8YAv8wGgH/MBoB/y4YAP8zHgD/MRwA/zMdAf8yGwH/MRoA/zIYAP8xHAH/MxwC/zIbAf8zHgL/NB8D/zMeAv8wGwD/LhsA/zAaAf8uHQP/MRoA/zEaAP8xGgD/MhsB/zMdAf////7//f///zIbAf8AAAAAAAAAADEcAf///un///3y/zQeAv/+/v7//////yERAP/Txnj/MBsA//z9+f8uGQP///////////8xHAD/Mx4C/zUgBf////////////////////////////////8eCgD/Mx0B/zIcAP81Jhb/////////////////+/f2/zEcAf8xHAH/0Llp/9C4ZP/Wumb/Mx0B////////////NSAE/9G5bf/RuGj/0bho/zIbAf/QuKT////x/zIbAf8AAAAAMR0ANDEbAv/Ny8D/Mx0B/zMdAf///v7///////3///8rFgD/KRMB/yYSAP////////////////8zHgL/Oy0a//////////////////////////////////////8ZBwD/Mx0B//////////////////////////////////z+/v8uHQL/Mh0C/zEbAP8zHQH/NR0A/////////////P/9/zMeA/8zHQH/MBsA/zQbAf8zHQH/8uvi/zIaBP8xHQA0MhwA//Pn2//5/Oz/Mx0B/zMdAf8yGAD//v7+/////////////////////////////////3FoWv8yHwT//////////////////f////////////////////////8bCAD/pJqJ///////////////////+//////////////////81IAT/MR0A/zUbA/8zHgL///z4/////////////////y8dAP8xHAD/MhsB/zMcAv8zHQH///v2//j48v8xGgD/MhwA//vy7v/Evbr/Mx0B//3///8zHQH//f///////////////////////////////////zEcAP////7///////////8zGgD/MRwA/zMeAv8xHAD///////////8dCwD/Mx0B/x4SAP/+//3/MhwA/zMdAf81IQL////////////37uT/MhwA/zEaAP8zHgP//////////////////////0M2Jv8xHAD///////79//8zHQH/8ern//Xz8/8xGgD/MhwA//779////vn/Mx0B/y4dAv8yGwH/qZ+V//3/////////MBsA/////////////f///zEcAP////////////////8yHAD/Mx4C//////////////////////8fDgH/Mx0B/zMdAf8wGwD/Mx4D/zYfBf///v////////////80HAj/Mx4C/zIcAP8qFwL////////////+//3///////////8wGwD/Mh0B/y0eAP8zHQH//Pj3//////8yHAD/MhwA/+fn5/////v/Mx0B/zQeAv8yHAD/Mx0B////////////oJaM////////////NRwC/zIcAP////////////////8zHQH/Mx4C//////////////////////8iDwD/MhwA/zUdAf////////////////////////////7//f8xHAH/MBsA/zIcAP////////////////8uFQH///////////8vHAH/MRwA/zEcAP8zHQH//Pz8//////8yHAD/MhwA//7+/v/4+vr/Mx0B/zMeAv8tGgD/Mx0B//7//f//////////////////////Mx4D/zIcAP/+//3///////////8zHQH/Mx0B/zIeAP80HAD/MRoA/zMaAP8zHQH/Mx0B//////////////////7+/v////////39/zEaAP8wGgH/MhsB/zMdAf///////////yMRAP82HgL//////////////v3/MhsB///9/P8zHQH//v/9//7//f8yGwH/MhwA//j4+P///fz/MhwA/zQcBP8zHgP/MhsB/zcfA/////////////////8iFgD/MRwB/zEcAf/+//3///////////8xHAD/MRwA/zIcAP8zHQH/NRoA/zEcAP8zHQH/NiEC////////////KBkA/zAbAP8xHAD/MBsA/zAbAP8yHAD/MhwA///9/f///////////zMdAf8zHQH//v7+////////////MRoA/zIcAP8zHQH/4ODg//39/f8yHAD/MhwA//7+/v///P3/MhwA/zIcAP8yHAD/MhwA/zMdAf////////////////8xHAH/MRwA/zIbAf8jEgD//////////////v//MRwB/zEcAf/9/////////zIdAv8zHQH/MRwB//////////////j1/zEcAf8vHAH///////7//f8xHAD/MhwA////////////+//+/zMdAf8zHQH/MxsF////////////MxsH/zMdAf8zHQH///////v+/P8yHAD/MhwA///////7/vz/MhsB////+//+/v7//f///zMdAf+hmof///////7+/v8xHAD//f///yQUB/8zHQH///////////////////////////////////////39/f8zHQH/Mx0B//7//f////////////////////////////////8zGgD/KhwF////////////NyEF/zcoGP////7/Mx0B//7+/v///////f78/zMdAf8zHQH///////3+/P8xGgD/MR0ANDcgBv///fz/MhwA/zIcAP8yHAD/NB4C/zMdAf8zHgD//////zIcAP8yHAD/MRoA/zEaAP8yHAD/MhwA/////////////////////////////////zEaAP/+/f//49bI/zMdAf/+//3//////////////////////y4XAf8yHAD//P7+////////////MhwA/zUdAf8yHAD/MhwA/x8OAf///////////zAbAP8zHQH//////xIJAP8xGQA0AAAAADMdAf/z9PL///3y/zIcAP8yGwH/MRwB/zEcAP8yHAD//P/9/zIcAP8yHAD/MhwA/zIcAP8xHAD/MhwA/zIcAP8yHAD/JREA/zEcBv8yHAD/MhwA/zIcAP8yHQH/MhwA/zIcAP8yHAD/MRwA/yANAP8vGAL/MBsA/zIcAP8yHAD/NR0F/zMbB/8vGwL/MhwA/zIcAP8yHAD/MhwA/zIcAP81HgT/NR4E/zYeCP+7rqD//////zEcAf8AAAAAAAAAADIcAP///fz//P37/zIcAP/exWn/18Bq/9bAaP/Yumf/1r5m/9a4Z//WuWj/NB4C/9u8Z//Yumf/2b1o/9a/af/Yv2n/0bln/9q6Z//Zu2T/27xn/9i7YP/Yu2D/2rxl/9m7ZP/bu2L/2rph/9i6Yf/YumH/2rph/9q/Zf88IgT/2b9z/9m+bf/Wvmz/2rlp/9q8bf/Yu2r/2bxr/9W6af/WuWj/1r5q/zIcAP/a2Nj///7//zEcAf8AAAAAAAAAADIcAP+Bbl///f///zIbAf82IAT/4djL//z+/v8dEAD/Hg8A/xcLAf8YCQD/NB4C////+//Ks2///////x4MAf8dCwD/HAwA/x8OAf8gDwL/IBAA/826d//+/v7/Oyki/yUQAf8gDQD/Hg0A/yQQAP8jEQD/IA0A/9jDhf80HwD/IhIC/52FQ//Cr2z/x7Ny/8iycf/Hs3L/yLVy//////8qGgP/MhwA/zgeAP/m4uH///72/zEaAP8AAAAAAAAAAAAAAAAyHAD/+vr6//z9+f8xHAD/9Pne//z53f/8+d3/+/jc//v52//7+Nz/Nx8D//v33v/6+d//+Pjg//j44P/5+eH/+fnh//r64v/6+uL/+vnf//z74f/6+d//+vnf//r53//6+d//+fnh//n54f/6+uL/+vnf//n43v83IQX/+/fl//n45P/5+eH//fjj//z43//8+uj////t//n54f/3+eP/Mx0B////+P/z8fD/MRoA/wAAAAAAAAAAAAAAAAAAAAAyHAD///79//7+/v8wGwD/MhwA/zIcAP8yHAD/MhwA/zMdAf8zHQH/Mx4D/zQeAv8zHgL/MRwB/zEcAf8zHgL/MhwA/zIcAP8zHAL/Mx4C/zMeA/8zHgL/Mx4D/zAZAP8wGAD/MBgA/zAYAP8wGAD/MhsB/zIbAf8xGgD/MBsA/y8ZAP8xGgD/MRoA/zMbA/8yGwH/MRoA/zIbAf8yGwH/MxsD/9TU1P///v3/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAMx4A//39/f///v7/MhsB////+/8uGgH/MxsA/0gqAf+uj1D/wKFi/zYeAv+rhjT/LxwB/9m+bv8zHQH/2cJ2/zEcAP/WvG//Mh0B/8e0d/+7o2n/jXdH/zMcAv///////////zIcAP/Zu2j/1Llp//////83HQX///////////8yGwH///79///+///+//3////+/////v8yHAD///z+//r49/8yGQD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMhwA//7+/v/k5OT/Lx4E/zIcAP8cCQH/HAkB/zQcAP/v1JT/wqZm/zYeAv/auWr/Lx4D/9e+bv81HQH/2MB0/zMeA//Vu27/Mx0B///usf/myJf/Oh0C/////////////////zIcAP/WuGX//P/9//////8zHQT//////zMdAf8gDQD/IA0A/yIMAf8fCwD/HgoA/zQfAP8zHQH///////37+v8yGwH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIcAP///////////zEcAf8xHAH/NB8D/zMdAf///v3/28CH/zQbAf/cu2z/2L1s/zQfBP81HQH/2L5x/y4eAf/EqGv/NR0A/4NtPf84IAT/KhoD/////////////////zccAf///f///v/9//v///80HQP/+fj0/zQbAf8yHAD/MhwA/zIcAP8yHAD/MRoA/zIcAP/7/Pj///38/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIcAP82HwX///////36/P8xHAH/KhYF//////81HAL/7dmq//nnuP8xGwL/17xr//7/9v8zHQH/3cOA/93Kjf8sGwD//+yz/zQcAP8zHQH//v/9////////////FQgA//3x5f/////////5/zMeAv/+//3/MRoA//3////7/f3/+/39//z+/v8qFAL/MRwA//38/v/9/f3/Nx0F/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyHAD/OiYV//j59///////MRwB/zIcAP8zHQH/OB8F/9zIpf/p26v////x//////8jEQD//f39//LepP/e0J//WUkf/9rCiP8zGwP//v/9///////v7ur/ORwB////////////MRoA//7+/v/+//3/MhwA/zIcAP8yGwH/MRwA/zIcAP8yHAD/+Pr6/////////Pf/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMhwA//z9+f/5+vj//v/9/zEaAP80HAT/Mx0B/yoVAP///tj///////////////v/MhwA//z//f/ZzZf/KxoA/9i+cv82IQL//v/9//////8yHAP/NB8A//////8yHgD/rpdZ//z//f8xGgD/KBIA//v5+f/8/Pz/MhwA/zIcAP/9//////////////8xGgD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIcAP/8/vj/5+fn//3++v8xGwL/MhwA/zMdAf/8/vj//////zIdB/8yGwH/MRoA/zIcAP///v///vPY/9q9cv82Hgb//v/9////////////Mh4A/zQfAP81HQD//f7u/y8cAf8vHAH/NRwC/zEcAP8yHAD/NBwA/////v/////////+/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyHAD//f/2//v7+///////GwgD/zIcAP8zHQH/Mx4C/zIcAP8vGQD/MRwB/zIdAv8yHAD/8e7m/9q/df81IAH//v/9////////////MxwC/zIcAP8yHAD/MhsB/zEcAP8xHAD/MhwA/zIcAP8vGQf///////////////r/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMhwA/zchCP////////////7//f8xHAD/MRwA/zEcAP8rEwH/PCoZ//v7+/8xHAD/NSAA/+7dnv/Ft4b//v/9//////8xHQD/MhwA///98/8zHQv/MRkB/zEYBP8yGwH/MhwA//Lx8//9+/r//////yIRBP8xGgD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIcAP8wGwD///79/////////////////zQhBv8zHQH/Mx0B/zAbAP8wGwD/SkAv/zIcAP/79ML//v7+/zEaAP8vGAL/MhwA/zIcAP8yGwH/MhsB/y8dBv/9/f3/8vLy//39/f/+//3/MRoA/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMhwA/zIZBf/9/////f///////////////////zAZA/8vHAH/MRwA/zIcAP8wGwD/MhwA/zEcAP8zHQH/NBwA/zMeAP///f3/9/f3////////////9vj4/zMaCv8xGgD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxGgD/MBkA///9/P/+/v7//v/9///////////////////////c2dH/t66k//v7+////////////+zq6f/h4Nz///7///z//f8vGQD/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIbAf8yGgT/MhsB/yEOAf/+//3//f/////////9///////////+/v/+//3//////09AN/8wGwD/MRoA/zEaAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEdADQyHAD/MhwA/zIcAP8yHAD/MhsB/zMcAv8xGgD/MhsB/zEZADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///gB///AAD//wAA//8AAP/8AAA//wAA//AAAA//AAD/wAAAA/8AAP+AAAAB/wAA/wAAAAD/AAD+AAAAAH8AAPwAAAAAPwAA+AAAAAAfAADwAAAAAA8AAPAAAAAADwAA4AAAAAAHAADgAAAAAAcAAMAAAAAAAwAAwAAAAAADAACAAAAAAAEAAIAAAAAAAQAAgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAQAAgAAAAAABAACAAAAAAAEAAMAAAAAAAwAAwAAAAAADAADgAAAAAAcAAOAAAAAABwAA8AAAAAAPAADwAAAAAA8AAPgAAAAAHwAA/AAAAAA/AAD+AAAAAH8AAP8AAAAA/wAA/4AAAAH/AAD/wAAAA/8AAP/wAAAP/wAA//wAAD//AAD//wAA//8AAP//4Af//wAAKAAAABgAAAAwAAAAAQAgAAAAAABgCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAbAP8zHQH/IAkB/ycTAf8xGgD/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEaAP8mGQD/7+bB//3uwP8vGAL/MBsA/y4bAP8rFgD/va59/9DEoP+hlnj/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMR0A//fsxv81IAH/MhsB/zIcAP84JRD/PS0c/0M1I/8uGQP///76/zEcAP8yHQH/7+a6/y0aAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD99tv//Pjg/zIcAP80HwD/MRwA/zEcAP80GwH/MhsB/zIcAP8wGwD////////tsP/r6+v/MRwB//Pdlv/968b/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIdAf/18tb/MhwA/zcgAP8yHAD//////zgcAP82GwD/MxoA/zMeAv8xGQH/Lx8C/+3Xp////////f///zIaBP/z+eL/3sNy/wAAAAAAAAAAAAAAAAAAAAAAAAAAMx0B/+3drv8zHQH/MhwA/zEcAP81Jgz/+Pfj//r45v8zHQH/Mx4A///////+/v7/////////////////NB4C/zMdBP8qGAH//////y8ZAP8AAAAAAAAAAAAAAAAxGgD//fPD/zMdAf8yHQL/MBkA/0o/Mf8zGwD//////////////////////zIdAv/068b/+Pjg/////v8hEAP//////zMdAf8eDgH/MhwA//3///8xGgD/AAAAAAAAAAAnEwH/NCAB//v74/8vFwD/MRsA/zQcAP8xGgD/+vnf//v74//9+t7////n///////+/vL/+vri//n54f/Xv3P/+Pjg//f54//3+eP/+Pjg/zUcAv+QhYH/AAAAAAAAAAD29eH/NB8A//r64v8xHwL/Mx0B//r23f/3+N7/9/nj//f54//6+d//+vTh//j65P/6+d//+Pjg//f33/81HwP/+Pnf//b44v/3+eP/+fnh/zIcAP/49OH/AAAAADIcAP/t6tz/JBIB//////8wGwD/MRwA//////8zHgL//v7+/////////////////zIcAP////////////////8zHgL/MBsA/5mPiP//////MBsA/zAYAP///Or/MBsA/zIcAP///v7/Mx0B/////////////////////////////////zEcAP/+//3//////xwPAf//////NR0B//////8yHAD/NBwA////////////MRwA/zIcAP////v/MRoA/zAZAP83HgT//f///////////////////zEaAP//////IREA/zAeAf///////////zMdAf////////////////8xHAD/Mx4D///////////////5//////82IAT/Nh4I/zMeAP83HwH/NB8D/zUcAv///////////zEcAP//////IRMA/zMdAf8yHAD/Mx0B////////////LR0A/zAbAP8yGwH///////39/f81IAX//////zIbAf8zHQH/OCEL/zQfAP////n/MRwA/zIcAP//////LxkA/zAbAP/+/v7////////+////////Mh0C////+v////////76//////8zHQH//////zMdAf8zHQH//////zMeAP+Ddmj/MhwA/zIcAP/9+/r///////7//f8sGwD/MhwA//3///8yHAD/+PLl//3///8qGQT/MhwA/zMdAf/+/Pv//f///zEbAP9eUUH//////zAYAP////v///////z//f/9////MhwA/wAAAAD+/v7/MhwA/9W7Yf/Vu2H/1bpj/9e8Yv/Uu2X/07tn/9K6Zv/WvWf/1rpm/9e8Yv/Xu2T/1rpj/9i7Zv8zHgL/2bxr/9q9bP/XvGv/1Ldm/zMdAf//////AAAAAAAAAAAwGAD/PSYM//X34f/0897/9Pbg//ny4f/48eL/9/Tl//f14//29OL/9fXj//fz4P/59OX/+fXj//j14P8yHQH/9vPk//j25P8wGwD/+fXj/zEbAv8mFAP/AAAAAAAAAAAyHAD/8vDv/zIdAP8yHAD/KxEA/6+TVv+ogzP/2r9v/+HIgv/SuGz/7tSY/zUdAf//////38F6//3//P8zGwP/Mx0B/zIcAP8wGgH/MhwA//////8yGwH/AAAAAAAAAAAAAAAAMx0B//7//f8xHAH/NB8A//Peqv/bumr/MhsB/9W7bv/44rL/clw4//////////////76/zMdAf/+/v7/MRwA/zIcAP8yHAD///7//zEbAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP/////k4uH/Mx0B/zciB//z4bj///////////8xHQD/n4ZU//////8pFAD///////7//f8xHAD/Mx8G/zIcAP/+/f////7+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///r//v7+/zIcAP/8//r/MhwA/////////v//3sBz////////////Mx0B/zYeDP81Hwb/MhwA/////v/8//3/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMRwB//////9mWk7/MhwA/zMdAf81HQH///rJ//3///8yHAD/MhsB/zIbAf8fDgH//v/9/y4WAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIcAP8yIhb///////////////7/MyAF/yoaA//07+7//fv6///////Wz8b/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEaAP8xGgD/KRgF/xwMAP8yHAD/MRoA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+B/wD8AD8A+AAfAPAADwDgAAcAwAADAIAAAQCAAAEAgAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAQCAAAEAgAABAMAAAwDgAAcA8AAPAPgAHwD8AD8A/4H/AA==",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#outer > table",
      torrentDownloadLinkSelector: 'a[href*="download.php?id="]',
      needDoubanInfo: true,
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      torrent: {
        selector: 'input[name="file"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "3",
          hevc: "0",
          x264: "3",
          x265: "0",
          h265: "0",
          mpeg2: "17",
          mpeg4: "1",
          vc1: "16",
          xvid: "5"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "0",
          "2160p": "7",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "5",
          "480p": "5"
        }
      }
    },
    fearnopeer: {
      url: "https://fearnopeer.com",
      host: "fearnopeer.com",
      siteType: "UNIT3D",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAPoAAAD6AG1e1JrAAACnklEQVR4nK1UO0hjURA9KRIw6EOUYIgWaqVRMRjBQtFnWgujkCLgBwsRERRMZZIiiJqAKIiVqPgjLAiSNJqPIClsBBtFxC4WtjYr2OlZ5vKy7Kq7G1wHhvvevJnz5pw79wIfmwWADmADwBWA7wBejPXKiOtG3j/NBsADIAwgBSAP4BnAq7HmjXjYyLP9CcgEoAxA0ChiEZ438suM+t9Mgt8APBYJVvBHo67sLc3gJ8D4C2iwQN9saFEszb/R9wigbrVaQ1VVVWxoaGBLS4vy1tZWut1utZaWlr4DqK2tVXlNTU2qrq6ujpqmhQRww263p0dGRnh0dMREIsHd3V3u7OwwmUxyb29PFQmIyWSixWJRz0tLS8xms9zf3+fy8jLX19fp8XjSAnitaVq+v7+ft7e3jMVibGxspNlspnRdUlKingXE4XBQfizvq6urzGQyHB8fZ2VlJS8vL7m1tSW08VRdXf08Pz/P+/t7lej3+xVdKQwEApyYmGB9fT1dLhcPDg5ot9t5eHjIeDzOrq4uFX94eODi4qLMKV6cTufr8fExb25uVPuDg4NKF5vNxlwux7OzMw4PD7O3t5fb29tsb29X3Z2cnHB6eprBYJCbm5vs6emR4cdTR0fHs4CJhkJJqIpWAiBFqVSKKysrnJycVBRHR0d5fn6u9J6ZmeHs7Czb2tqkRnV43dfXl7+7u+PU1BQrKip+7mIkEuHc3BwHBga4tramKIoUIsvFxQXHxsbej47P59uIRqPp09NTRaWwi6LT0NAQu7u71dh4vV6Gw2G1YQsLCwpU1/W3gGl0dnbqbrc71NzcTKvVqkZDPgqwaFiYwfLyctbU1Khdl+7FNU17Cxj68KQUQD97Ur78LMOwL71txL78PizYf93YPwA8btamn3E35AAAAABJRU5ErkJggg==",
      asSource: true,
      asTarget: true,
      uploadPath: "/torrents/create?category_id=1",
      needDoubanInfo: true,
      seedDomSelector: ".torrent__buttons+.panelV2",
      torrentDownloadLinkSelector: 'a[href*="/torrents/download/"]',
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#bbcode-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.form__group input[type="checkbox"][name="anon"]'
      },
      torrent: {
        selector: 'input[type="file"][accept=".torrent"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "12",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "11",
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    iTS: {
      url: "http://shadowthein.net",
      host: "shadowthein.net",
      siteType: "its",
      asSource: false,
      asTarget: true,
      icon: "data:image/png;base64,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",
      seedDomSelector: "h1~.line>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        params: {
          incldead: 1,
          search: "{imdb}",
          search_in: "names",
          sort: 5,
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      imdb: {
        selector: 'input[name="imdblink"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      tags: {
        hdr: 'input[name="HDR10"]',
        hdr10_plus: 'input[name="HDR10Plus"]',
        dolby_vision: 'input[name="DolbyVision"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "68",
          tv: "65",
          concert: "61",
          music: "6",
          ebook: "26"
        }
      }
    },
    "nzbs.in": {
      url: "https://nzbs.in",
      host: "nzbs.in",
      siteType: "nzb",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QATwB9ALSzxfhxAAAAB3RJTUUH5QQMAx4c9w3kIAAAA6xJREFUOMt1lM9rVFcUxz/nvDszieOYMUrGxAR/RU0VreBCUFIo7UIRUqEroUJLVyJ02x9QaKHrLtq/oKUUpKvSdV0VoRulBEG0JJpR44+aTExiMvPuPaeLN5lQ2x54D+65j885993v+crZz645/4ju0gUnQ9SpkHCB3DLMQTAQB4TivRnhXzDf3DaLHB6pcumtfYgIP/x6j9tzy2gmuNOD8r/ALs9RUkqc2Fdj6tQog+M7cHHezSO/XH/A9OwLyDJwR16Bhk2WI9284hwcrTJ1apTjxxt81emwps7nx3YylSDv3Ofu43VS7wcVUAG0B3PBXcgEdg2U+PDsOG+cGOZ5jDQ9Z94TC9GYPN7g/XMHGa4HsgzEpfsUWMWLAgJkRBp14eOLRzi6t455YixkvBeUDzTjoAZM4OieOh9fPMbueongEe0d2VEXBxGiJQ4M93PlwhH276pRDoqIUBI4Hyqcz8pk4kWulLGnsZXL70ywf2QL0SJO0WIIYiQpcWhvjbdf38nE2CC5wbV7OQ9XjLGqMDlWwgWuz0XmVpzRmjM5Eji8ZzvnTo9RuvGMO3OriIBcvnrPV2NgohE4s7ePTJU7C86NVomyRE7WE2utZRZXE82lyFJHKKVF1m/+xMulBXB43mrzvNVBRAhP/rxBa1XJZw2ZEYI4TR/gafU1tvc7z1S4df8FFRfWOhGLQifvMHv/MU8ePcQMREGl0Ka8+dGPLgJu4BF2bqvwyaWTfDc/xPXH4O40thpfninz/bTx2wPh9AhcmVjn66u3eLq0hoj0pBMqtRHEQUjgTq3ex67hBvZXiRUvdDW/bnz7B8wsBVZESJlTq1aIrrSjdIHFTQfFMTXcHHMnOkR3zCF1P3uZC7/PG6iCFrmeiHFMQLsWEBbtNn1a5VA2jmrGYKmfIMpudY5oQivGtpoytyDUvMPDFBBXRKAeKvSFosKGEtU1kHmZdjTWUyK5kQHJnVUzDg8KX5wOTGw3TIr8RrQt8TLltGOkHXPaMUfrNk7wBo/IabLGI1smx5g3ZSaVaXnG8Bbn08nAYCOw7IrjGLBiOQ+8TVPWadKmSZuAOI6jruCyOUTuuAnujgoM90MVw5KSKG5VETIE9WLaem4jPccohrqkwtSBjKODcGAAgijgXNgPx3Yo+waUssRNrxHpWe0rBiu0c2N6ZpGhWomhLSC5cPNusTckzlDVsQjTsx3aeexZ3n8arIjSWja++fk2Ilb07pvFpGt1LoAX4A3xbMTfU7u3vspnhj4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MzA6MjcrMDA6MDBRcNLMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjMwOjI3KzAwOjAwIC1qcAAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}",
        params: {
          t: -1,
          ob: "size_desc"
        }
      }
    },
    zimuku: {
      url: "http://zimuku.org",
      host: "zimuku.org",
      siteType: "subtitles",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAACXlBMVEUbbZ0ZbJwAWpCpx9n///4DWIoZbJ0abJwEXpP6/P3///+5yNEAW5EIYZbK1NlMgJ8QaJsZa5wDXpQAQ3rd4+b///0AUIMDXpMYbJ0OZJcYX4kYbJ4LYZQTR2UYbqEabJ0AWo8FQGIab6EAGC4ALU8ALU0ALE0AIUMAPWIBXJETTW4WcKYZcKIacKMMZpoKRmkZbqARZZcJRGUnd6YWaZoNZJcMY5YJYZUIYpUeU3MYbaAPZ5qjq7CnpKOZlZNCa4MOWodzjJuBhol8foAISG0bb6EabZ0KYJIHW4wAV4pbmLshUm8MZ50NZJgOZpkbbZ4SaJtYkrUjVHIXbaAPZpgrUGYVPVQOOlQKOFMLOFMAK0oiRVr08vBeX2AJTXUbb6AXbqEYb6IZcKMSa6AAXJWHtdC4sawAHzQMYpUbcKIRZ5k4fqjs8vZFTE8APWYac6gbbp4Ya5sgb53l3dkCHzAOZJgccaMIYZUBXJICXZIASoWkpKQAEjcAY50CXpQCXJIWa50HYJTW4+z9/f33+fr2+Prz9vjy8/T1/P/9/f4oapEXa53n7fM1YHgVbJ/09/s5ZHwVa50+c5NXZm9DW2k/WWk+WWkqSVv5+fmLkpc1U2Q/WmpOZXNmdn+EiIoLQ2QacKEVa5wSap4TbKAUbKD6+/xthJMJaKASa58QaZ0OZZn7/PxxhpQPaJwOZZcAVY32+PlmnLyArcdqnr1kmrtwhZIGYJTf6O5OanoTa59tnboAMU8acKIWapsoc5/99PA6Q0cQZpgSaZyFkplXanY2VGYJNU8ANlsSaJobbp8uYKy2AAAAAWJLR0QKaND0VgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+UGBAQjFV4CeTAAAAGYSURBVDjLY2BAAEYmZhZWNgacgJ2Dk4uLmwebDBTw8nFxcfELsMMBVF6QAwqEhEW4uETFxGF8DgmIzZJcuICUNFiBDE4FsnIgBfIKOBUoKoHt4AEylVVUUYGaOlBUA6yAXRPI1NLW0UUBOnpAUX0DsBsMgUwjYxNTM2RgbgEUtbQCm2BtY2tnj2G/g6OTs4sr2A1u7h6eXhgKvH18/VxhQekfEIihICgYObDdQkLDwiMigSAiKjoGJB8bF48SHW4JiUkgkJySCpJOS8/IxBqhWdk5IPncvPwClMiEsQqLQNLFJaVlyBLs5ZoVlVBQBZSvrqmtA3MqNOsbQAoam7iaW1ohoA2ooL0Dwm7p5OLq6gYq4OjBGVlcvX0gBf24FUwAKZg4afKUqdMgYPoMLq6ZsyDs2XPmzpu/AOSIhYsWL4GClKVcXMuWQzkrVq5SQg+HitVcXGvW4k74lCrIWheyfgMeBVkbN23eAvTaVlwKtm2H+H3HThwKQnZBFOzeg0PB3n0g6f0HDvrjUMB+6PCRo8eOnziJKgwAyLSNK8OfEhgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDYtMDRUMDQ6MzU6MjErMDA6MDAJeY68AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA2LTA0VDA0OjM1OjIxKzAwOjAweCQ2AAAAAABJRU5ErkJggg==",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search",
        params: {
          q: "{imdb}"
        }
      }
    },
    "豆瓣电影": {
      url: "https://search.douban.com",
      host: "search.douban.com",
      siteType: "douban",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUWgSUAdQ4AdA0AdQ0NfR1sr3aZyKCWx50KexlUn110r3tyrnlWn14LehoAdhAegiuGuYuRwJaOvpOOv5OGuowhgiwCdhEAdg8wjT3j7+WgyqRdo2Fgpmadx5/i7+QHdRR3sn8efyojgi9zsHvf7eIJdRUpiTbS5dWz1biv0rRipmnw9/FPmlgngzPu9e9cpWYMdRcHehcdhCtLnVbY6dp1r3wthTZInVQihC4VeR8oizaq0LDR5dTY6dvV59jO49Gr0LApizYhhjAwjz07lUg6lUc6lUj///+7fLO6AAAAAWJLR0RHYL3JewAAAAd0SU1FB+UEDxExDPWxFNkAAAB/SURBVAjXFcbZAoFAAAXQWyqEKEtDTMJUyF7WCm3//0nMeTqAINY4UQAkWalziiyh0VRbnNruQOv2dKNv6IPhCCYZT6ypNaPE/p/OnYWzXBEG0/Wov/ap5zJo9mYb7IL9gR1xOl/C6BqFt/sDz1ecpO80iT9fZHlRVkVVFnn2A2t6DyUkoLRcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjQ5OjEyKzAwOjAw+Ka3VAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo0OToxMiswMDowMIn7D+gAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/movie/subject_search",
        params: {
          search_text: "{imdb}"
        }
      }
    },
    "豆瓣读书": {
      url: "https://search.douban.com",
      host: "search.douban.com",
      siteType: "doubanBook",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUWgSUAdQ4AdA0AdQ0NfR1sr3aZyKCWx50KexlUn110r3tyrnlWn14LehoAdhAegiuGuYuRwJaOvpOOv5OGuowhgiwCdhEAdg8wjT3j7+WgyqRdo2Fgpmadx5/i7+QHdRR3sn8efyojgi9zsHvf7eIJdRUpiTbS5dWz1biv0rRipmnw9/FPmlgngzPu9e9cpWYMdRcHehcdhCtLnVbY6dp1r3wthTZInVQihC4VeR8oizaq0LDR5dTY6dvV59jO49Gr0LApizYhhjAwjz07lUg6lUc6lUj///+7fLO6AAAAAWJLR0RHYL3JewAAAAd0SU1FB+UEDxExDPWxFNkAAAB/SURBVAjXFcbZAoFAAAXQWyqEKEtDTMJUyF7WCm3//0nMeTqAINY4UQAkWalziiyh0VRbnNruQOv2dKNv6IPhCCYZT6ypNaPE/p/OnYWzXBEG0/Wov/ap5zJo9mYb7IL9gR1xOl/C6BqFt/sDz1ecpO80iT9fZHlRVkVVFnn2A2t6DyUkoLRcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjQ5OjEyKzAwOjAw+Ka3VAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo0OToxMiswMDowMIn7D+gAAAAASUVORK5CYII=",
      asSource: false,
      asTarget: false,
      search: {
        path: "/book/subject_search?search_text={name}"
      }
    }
  };
  const TORRENT_INFO = {
    title: "",
    subtitle: "",
    description: "",
    originalDescription: "",
    year: "",
    category: "",
    videoType: "",
    format: "",
    source: "",
    videoCodec: "",
    audioCodec: "",
    resolution: "",
    area: "",
    doubanUrl: "",
    doubanInfo: "",
    imdbUrl: "",
    tags: {
      diy: false,
      chinese_audio: false,
      cantonese_audio: false,
      chinese_subtitle: false,
      dolby_atoms: false,
      dts_x: false,
      hdr: false,
      dolby_vision: false
    },
    otherTags: {},
    mediaInfos: [],
    screenshots: [],
    comparisons: [],
    movieAkaName: "",
    movieName: "",
    sourceSite: "",
    sourceSiteType: "",
    size: 0,
    isForbidden: false,
    poster: ""
  };
  const DOUBAN_SUGGEST_API = "https://www.douban.com/search?cat=1002&q={query}";
  const DOUBAN_MOBILE_API = "https://m.douban.com/rexxar/api/v2";
  const PT_GEN_API = "https://media.pttool.workers.dev";
  const TMDB_API_URL = "https://api.tmdb.org";
  const TMDB_API_KEY = "3d62cb1443c6b34b61262ab332aaf78c";
  const BROWSER_LANGUAGE = navigator.language.toLowerCase().split("-")[0];
  const getSiteName = (host) => {
    let siteName = "";
    try {
      Object.keys(PT_SITE).forEach((key) => {
        const siteKey = key;
        const hostName = PT_SITE[siteKey].host;
        const matchReg = new RegExp(hostName, "i");
        if (hostName && host.match(matchReg)) {
          siteName = siteKey;
        }
      });
      return siteName;
    } catch (error) {
      if (error.message !== "end loop") {
        console.log(error);
      }
      return "";
    }
  };
  const getSortedSiteKeys = () => {
    return Object.keys(PT_SITE).sort((a2, b) => {
      const isChineseReg = /[\u4e00-\u9fa5]+/;
      if (isChineseReg.test(a2) && !isChineseReg.test(b)) {
        return 1;
      }
      if (!isChineseReg.test(a2) && isChineseReg.test(b)) {
        return -1;
      }
      return a2.toLowerCase().localeCompare(b.toLowerCase());
    });
  };
  const SORTED_SITE_KEYS = getSortedSiteKeys();
  const EUROPE_LIST = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "UK", "Vatican City"];
  const CURRENT_SITE_NAME = getSiteName(location.host);
  const CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
  const HDB_TEAM = ["Chotab", "CRiSC", "CtrlHD", "DON", "EA", "EbP", "Geek", "LolHD", "NTb", "RightSiZE", "SA89", "SbR", "TayTo", "VietHD"];
  const en$1 = {
    "豆瓣链接获取失败": "Failed to get Douban link",
    "豆瓣ID获取失败": "Failed to get Douban ID",
    "获取豆瓣信息失败": "Failed to get Douban data",
    "缺少IMDB信息": "Missing IMDB information",
    "获取失败": "Request failed",
    "获取成功": "Data request successful",
    "请求失败": "Request failed",
    "上传失败，请重试": "Upload failed, please try again",
    "ptpimg上传失败": "PtpImg upload failed",
    "请到配置面板中填入ptpimg的api_key": "Please enter the API_KEY of ptpimg in the setting panel",
    "封面上传失败": "Failed to upload poster",
    "数据加载中...": "Loading data...",
    "获取图片列表失败": "Failed to get list of images",
    "转换中...": "Converting...",
    "转换成功！": "Converted!",
    "获取中...": "Requesting...",
    "缺少豆瓣链接": "Missing Douban link",
    "本种子可能禁止转载，确定要继续转载么？": "Transfer of this torrent may be prohibited, are you sure to continue?",
    "请等待页面加载完成": "Please wait for the page to load",
    "手动输入豆瓣链接": "Enter the Douban link",
    "获取豆瓣简介": "Get data of Douban",
    "获取豆瓣读书简介": "Get data of Douban Book",
    "转缩略图": "Convert to thumbnails",
    "快速检索": "Quick search",
    "一键群转": "Batch transfer",
    "快捷操作": "Quick operation",
    "一键转种": "Transfer to",
    "转种站点启用": "Select sites for the 'Transfer to' section",
    "批量转种启用": "Select sites for the 'Batch transfer' button",
    "一键批量转发到以下选中的站点": "One-click batch transfer to the selected sites below",
    "站点搜索启用": "Select sites for the 'Quick search' section",
    "图床配置": "Image Host Settings",
    "如何获取？": "How to get it?",
    "额外功能关闭": "Turn off extra features",
    "关闭转缩略图功能": "Remove the 'Convert to thumbnails' button",
    "关闭站点图标显示": "Remove the icons",
    "关闭转存ptpimg功能": "Remove the 'Upload screenshots to ptpimg' button",
    "保存": "Save",
    "取消": "Cancel",
    "错误": "Error",
    "成功": "Success",
    "保存本地站点设置失败": "Failed to save local site settings",
    "请先设置群转列表": "Please set up the batch transfer list first",
    "转种页面已打开，请前往对应页面操作": "The transfer pages have been opened, please go to the corresponding page to operate",
    "提示": "Hint",
    "转存截图": "Upload screenshots to another host",
    "无需转存": "No need to upload",
    "上传中，请稍候...": "Uploading, be patient",
    "不显示致谢内容": "Do not include thanks",
    "拷贝": "Copy",
    "已拷贝": "Copied",
    "不显示豆瓣按钮和豆瓣链接": "Hide Douban button & link field",
    "请填写正确链接": "Please fill the correct link",
    "批量检索": "Batch search",
    "同时打开多个搜索标签页": "Open multiple search tabs at the same time",
    "豆瓣配置": "Douban Config",
    "豆瓣Cookie": "Douban Cookie",
    "请配置豆瓣Cookie": "Please configure douban cookie",
    "关闭快速检索": "Disable QuickSearch",
    "种子文件下载失败": "Failed to download torrent file",
    "请手动下载": "Please download it manually"
  };
  const ko = {
    "豆瓣链接获取失败": "더우반 링크 얻기 실패",
    "豆瓣ID获取失败": "더우반 ID 아이디 얻기 실패",
    "获取豆瓣信息失败": "더우반 데이터 얻기 실패",
    "缺少IMDB信息": "누락된 IMDB 정보",
    "获取失败": "요청 실패",
    "获取成功": "데이터 요청 성공",
    "请求失败": "요청 실패",
    "上传失败，请重试": "업로드 실패, 다시 시도하세요.",
    "ptpimg上传失败": "PtpImg 업로드 실패",
    "请到配置面板中填入ptpimg的api_key": "설정 패널에 ptpimg의 API_KEY를 입력하세요.",
    "封面上传失败": "포스터 업로드 실패",
    "数据加载中...": "데이터 불러오기 중...",
    "获取图片列表失败": "이미지 목록 얻기 실패",
    "转换中...": "변환 중...",
    "转换成功！": "변환됨!",
    "获取中...": "요청 중...",
    "缺少豆瓣链接": "더우반 링크 누락",
    "本种子可能禁止转载，确定要继续转载么？": "이 토렌트의 전송이 금지될 수 있습니다, 계속하겠습니까?",
    "请等待页面加载完成": "페이지가 불러올 때까지 기다려주세요.",
    "手动输入豆瓣链接": "더우반 링크 입력",
    "获取豆瓣简介": "더우반의 데이터 얻기",
    "获取豆瓣读书简介": "더우반 도서 데이터 얻기",
    "转缩略图": "썸네일로 변환",
    "快速检索": "빠른 검색",
    "一键群转": "일괄 전송",
    "快捷操作": "빠른 작업",
    "一键转种": "전송 대상",
    "转种站点启用": "전송 대상 섹션의 사이트 선택",
    "批量转种启用": "일괄 전송 버튼을 사용할 사이트 선택",
    "一键批量转发到以下选中的站点": "아래에서 선택한 사이트로 원클릭 일괄 전송하기",
    "站点搜索启用": "빠른 검색 섹션에서 사이트 선택",
    "图床配置": "이미지 호스트 설정",
    "如何获取？": "어떻게 얻나요?",
    "额外功能关闭": "추가 기능 끄기",
    "关闭转缩略图功能": "썸네일로 변환 버튼 제거하기",
    "关闭站点图标显示": "아이콘 제거하기",
    "关闭转存ptpimg功能": "스크린샷을 ptpimg에 업로드 버튼 제거하기",
    "保存": "저장",
    "取消": "취소",
    "错误": "오류",
    "成功": "성공",
    "保存本地站点设置失败": "로컬 사이트 설정 저장 실패",
    "请先设置群转列表": "먼저 일괄 전송 목록 설정",
    "转种页面已打开，请前往对应页面操作": "전송 페이지가 열렸고, 해당 페이지로 이동하여 작업",
    "提示": "힌트",
    "转存截图": "다른 호스트에 스크린샷 업로드",
    "无需转存": "업로드할 필요 없음",
    "上传中，请稍候...": "업로드 중, 잠시만 기다려주세요.",
    "不显示致谢内容": "감사 내용을 포함하지 않음",
    "拷贝": "복사",
    "已拷贝": "복사됨",
    "不显示豆瓣按钮和豆瓣链接": "더우반 버튼 및 링크 필드 숨기기",
    "请填写正确链接": "올바른 링크를 입력하세요.",
    "批量检索": "일괄 검색",
    "同时打开多个搜索标签页": "여러 검색 탭 동시에 열기",
    "豆瓣配置": "더우반 구성",
    "豆瓣Cookie": "더우반 쿠키",
    "请配置豆瓣Cookie": "더우반 쿠키를 구성하세요.",
    "关闭快速检索": "빠른검색 비활성화",
    "种子文件下载失败": "토렌트 파일 다운로드 실패",
    "请手动下载": "수동으로 다운로드해주세요"
  };
  const zh = {
    "豆瓣链接获取失败": "豆瓣链接获取失败",
    "豆瓣ID获取失败": "豆瓣ID获取失败",
    "获取豆瓣信息失败": "获取豆瓣信息失败",
    "缺少IMDB信息": "缺少IMDB信息",
    "获取失败": "获取失败",
    "获取成功": "获取成功",
    "请求失败": "请求失败",
    "上传失败，请重试": "上传失败，请重试",
    "ptpimg上传失败": "ptpimg上传失败",
    "请到配置面板中填入ptpimg的api_key": "请到配置面板中填入ptpimg的api_key",
    "封面上传失败": "封面上传失败",
    "数据加载中...": "数据加载中...",
    "获取图片列表失败": "获取图片列表失败",
    "转换中...": "转换中...",
    "转换成功！": "转换成功！",
    "获取中...": "获取中...",
    "缺少豆瓣链接": "缺少豆瓣链接",
    "本种子可能禁止转载，确定要继续转载么？": "本种子可能禁止转载，确定要继续转载么？",
    "请等待页面加载完成": "请等待页面加载完成",
    "手动输入豆瓣链接": "手动输入豆瓣链接",
    "获取豆瓣简介": "获取豆瓣简介",
    "获取豆瓣读书简介": "获取豆瓣读书简介",
    "转缩略图": "转缩略图",
    "快速检索": "快速检索",
    "一键群转": "一键群转",
    "快捷操作": "快捷操作",
    "一键转种": "一键转种",
    "转种站点启用": "转种站点启用",
    "批量转种启用": "批量转种启用",
    "一键批量转发到以下选中的站点": "一键批量转发到以下选中的站点",
    "站点搜索启用": "站点搜索启用",
    "图床配置": "图床配置",
    "如何获取？": "如何获取？",
    "额外功能关闭": "额外功能关闭",
    "关闭转缩略图功能": "关闭转缩略图功能",
    "关闭站点图标显示": "关闭站点图标显示",
    "关闭转存ptpimg功能": "关闭转存ptpimg功能",
    "保存": "保存",
    "取消": "取消",
    "错误": "错误",
    "成功": "成功",
    "保存本地站点设置失败": "保存本地站点设置失败",
    "请先设置群转列表": "请先设置群转列表",
    "转种页面已打开，请前往对应页面操作": "转种页面已打开，请前往对应页面操作",
    "提示": "提示",
    "转存截图": "转存截图",
    "无需转存": "无需转存",
    "上传中，请稍候...": "上传中，请稍候...",
    "不显示致谢内容": "不显示致谢内容",
    "拷贝": "拷贝",
    "已拷贝": "已拷贝",
    "不显示豆瓣按钮和豆瓣链接": "不显示豆瓣按钮和豆瓣链接",
    "请填写正确链接": "请填写正确链接",
    "批量检索": "批量检索",
    "同时打开多个搜索标签页": "同时打开多个搜索标签页",
    "豆瓣配置": "豆瓣配置",
    "豆瓣Cookie": "豆瓣Cookie",
    "请配置豆瓣Cookie": "请配置豆瓣Cookie",
    "关闭快速检索": "关闭快速检索",
    "种子文件下载失败": "种子文件下载失败",
    "请手动下载": "请手动下载"
  };
  const i18nConfig = {
    en: en$1,
    ko,
    zh
  };
  var t, r, u, i$2, o = 0, f = [], c = preact.options, e = c.__b, a = c.__r, v$1 = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function d(n, t2) {
    c.__h && c.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({}), u2.__[n];
  }
  function h(n) {
    return o = 1, p(D$1, n);
  }
  function p(n, u2, i) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i ? i(u2) : D$1(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i2 = false;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i2 = true);
          }
        }), !(!i2 && o2.__c.props === n2) && (!c2 || c2.call(this, n2, t2, r2));
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y(n, u2) {
    var i = d(t++, 3);
    !c.__s && C$1(i.__H, u2) && (i.__ = n, i.i = u2, r.__H.__h.push(i));
  }
  function _(n, u2) {
    var i = d(t++, 4);
    !c.__s && C$1(i.__H, u2) && (i.__ = n, i.i = u2, r.__h.push(i));
  }
  function A$1(n) {
    return o = 5, T$1(function() {
      return { current: n };
    }, []);
  }
  function F$1(n, t2, r2) {
    o = 6, _(function() {
      return "function" == typeof n ? (n(t2()), function() {
        return n(null);
      }) : n ? (n.current = t2(), function() {
        return n.current = null;
      }) : void 0;
    }, null == r2 ? r2 : r2.concat(n));
  }
  function T$1(n, r2) {
    var u2 = d(t++, 7);
    return C$1(u2.__H, r2) && (u2.__ = n(), u2.__H = r2, u2.__h = n), u2.__;
  }
  function q$1(n, t2) {
    return o = 8, T$1(function() {
      return n;
    }, t2);
  }
  function x$1(n) {
    var u2 = r.context[n.__c], i = d(t++, 9);
    return i.c = n, u2 ? (null == i.__ && (i.__ = true, u2.sub(r)), u2.props.value) : n.__;
  }
  function P$1(n, t2) {
    c.useDebugValue && c.useDebugValue(t2 ? t2(n) : n);
  }
  function g$1() {
    var n = d(t++, 11);
    if (!n.__) {
      for (var u2 = r.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      var i = u2.__m || (u2.__m = [0, 0]);
      n.__ = "P" + i[0] + "-" + i[1]++;
    }
    return n.__;
  }
  function j$1() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z$1), n.__H.__h.forEach(B$1), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], c.__e(t2, n.__v);
    }
  }
  c.__b = function(n) {
    r = null, e && e(n);
  }, c.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), s && s(n, t2);
  }, c.__r = function(n) {
    a && a(n), t = 0;
    var i = (r = n.__c).__H;
    i && (u === r ? (i.__h = [], r.__h = [], i.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.i = n2.__N = void 0;
    })) : (i.__h.forEach(z$1), i.__h.forEach(B$1), i.__h = [], t = 0)), u = r;
  }, c.diffed = function(n) {
    v$1 && v$1(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i$2 === c.requestAnimationFrame || ((i$2 = c.requestAnimationFrame) || w$1)(j$1)), t2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.i = void 0;
    })), u = r = null;
  }, c.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z$1), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B$1(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], c.__e(r2, n2.__v);
      }
    }), l && l(n, t2);
  }, c.unmount = function(n) {
    m && m(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z$1(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k$1 = "function" == typeof requestAnimationFrame;
  function w$1(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    k$1 && (t2 = requestAnimationFrame(r2));
  }
  function z$1(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B$1(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function C$1(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function D$1(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function g(n2, t2) {
    for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
    return false;
  }
  function E(n2, t2) {
    this.props = n2, this.context = t2;
  }
  function C(n2, e2) {
    function r2(n3) {
      var t2 = this.props.ref, r3 = t2 == n3.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), e2 ? !e2(this.props, n3) || !r3 : g(this.props, n3);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, preact.createElement(n2, e3);
    }
    return u2.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2;
  }
  (E.prototype = new preact.Component()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n2, t2) {
    return g(this.props, n2) || g(this.state, t2);
  };
  var x = preact.options.__b;
  preact.options.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), x && x(n2);
  };
  var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function w(n2) {
    function t2(t3) {
      if (!("ref" in t3)) return n2(t3, null);
      var e2 = t3.ref;
      delete t3.ref;
      var r2 = n2(t3, e2);
      return t3.ref = e2, r2;
    }
    return t2.$$typeof = R, t2.render = t2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
  }
  var k = function(n2, t2) {
    return null == n2 ? null : preact.toChildArray(preact.toChildArray(n2).map(t2));
  }, I = { map: k, forEach: k, count: function(n2) {
    return n2 ? preact.toChildArray(n2).length : 0;
  }, only: function(n2) {
    var t2 = preact.toChildArray(n2);
    if (1 !== t2.length) throw "Children.only";
    return t2[0];
  }, toArray: preact.toChildArray }, N = preact.options.__e;
  preact.options.__e = function(n2, t2, e2, r2) {
    if (n2.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n2, t2);
    }
    N(n2, t2, e2, r2);
  };
  var M = preact.options.unmount;
  function T(n2, t2, e2) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = function(n3, t3) {
      for (var e3 in t3) n3[e3] = t3[e3];
      return n3;
    }({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return T(n3, t2, e2);
    })), n2;
  }
  function A(n2, t2, e2) {
    return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return A(n3, t2, e2);
    }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
  }
  function D() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function L(n2) {
    var t2 = n2.__.__c;
    return t2 && t2.__a && t2.__a(n2);
  }
  function O(n2) {
    var e2, r2, u2;
    function o2(o3) {
      if (e2 || (e2 = n2()).then(function(n3) {
        r2 = n3.default || n3;
      }, function(n3) {
        u2 = n3;
      }), u2) throw u2;
      if (!r2) throw e2;
      return preact.createElement(r2, o3);
    }
    return o2.displayName = "Lazy", o2.__f = true, o2;
  }
  function F() {
    this.u = null, this.o = null;
  }
  preact.options.unmount = function(n2) {
    var t2 = n2.__c;
    t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), M && M(n2);
  }, (D.prototype = new preact.Component()).__c = function(n2, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.t && (r2.t = []), r2.t.push(e2);
    var u2 = L(r2.__v), o2 = false, i2 = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(c2) : c2());
    };
    e2.__R = i2;
    var c2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n3 = r2.state.__a;
          r2.__v.__k[0] = A(n3, n3.__c.__P, n3.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.t.pop(); ) t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i2, i2);
  }, D.prototype.componentWillUnmount = function() {
    this.t = [];
  }, D.prototype.render = function(n2, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = T(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && preact.createElement(preact.Fragment, null, n2.fallback);
    return i2 && (i2.__u &= -33), [preact.createElement(preact.Fragment, null, e2.__a ? null : n2.children), i2];
  };
  var U$1 = function(n2, t2, e2) {
    if (++e2[1] === e2[0] && n2.o.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.o.size)) for (e2 = n2.u; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n2.u = e2 = e2[2];
    }
  };
  function V(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function W(n2) {
    var e2 = this, r2 = n2.i;
    e2.componentWillUnmount = function() {
      preact.render(null, e2.l), e2.l = null, e2.i = null;
    }, e2.i && e2.i !== r2 && e2.componentWillUnmount(), e2.l || (e2.i = r2, e2.l = { nodeType: 1, parentNode: r2, childNodes: [], contains: function() {
      return true;
    }, appendChild: function(n3) {
      this.childNodes.push(n3), e2.i.appendChild(n3);
    }, insertBefore: function(n3, t2) {
      this.childNodes.push(n3), e2.i.appendChild(n3);
    }, removeChild: function(n3) {
      this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e2.i.removeChild(n3);
    } }), preact.render(preact.createElement(V, { context: e2.context }, n2.__v), e2.l);
  }
  function P(n2, e2) {
    var r2 = preact.createElement(W, { __v: n2, i: e2 });
    return r2.containerInfo = e2, r2;
  }
  (F.prototype = new preact.Component()).__a = function(n2) {
    var t2 = this, e2 = L(t2.__v), r2 = t2.o.get(n2);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), U$1(t2, n2, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, F.prototype.render = function(n2) {
    this.u = null, this.o = /* @__PURE__ */ new Map();
    var t2 = preact.toChildArray(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.o.set(t2[e2], this.u = [1, 0, this.u]);
    return n2.children;
  }, F.prototype.componentDidUpdate = F.prototype.componentDidMount = function() {
    var n2 = this;
    this.o.forEach(function(t2, e2) {
      U$1(n2, e2, t2);
    });
  };
  var j = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, z = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, B = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, H = /[A-Z0-9]/g, Z = "undefined" != typeof document, Y = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  function $(n2, t2, e2) {
    return null == t2.__k && (t2.textContent = ""), preact.render(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
  }
  function q(n2, t2, e2) {
    return preact.hydrate(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
  }
  preact.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(preact.Component.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n2) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
    } });
  });
  var G = preact.options.event;
  function J() {
  }
  function K() {
    return this.cancelBubble;
  }
  function Q() {
    return this.defaultPrevented;
  }
  preact.options.event = function(n2) {
    return G && (n2 = G(n2)), n2.persist = J, n2.isPropagationStopped = K, n2.isDefaultPrevented = Q, n2.nativeEvent = n2;
  };
  var X, nn = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, tn = preact.options.vnode;
  preact.options.vnode = function(n2) {
    "string" == typeof n2.type && function(n3) {
      var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 === e2.indexOf("-");
      for (var i2 in t2) {
        var c2 = t2[i2];
        if (!("value" === i2 && "defaultValue" in t2 && null == c2 || Z && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
          var f2 = i2.toLowerCase();
          "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === c2 ? c2 = "" : "translate" === f2 && "no" === c2 ? c2 = false : "o" === f2[0] && "n" === f2[1] ? "ondoubleclick" === f2 ? i2 = "ondblclick" : "onchange" !== f2 || "input" !== e2 && "textarea" !== e2 || Y(t2.type) ? "onfocus" === f2 ? i2 = "onfocusin" : "onblur" === f2 ? i2 = "onfocusout" : B.test(i2) && (i2 = f2) : f2 = i2 = "oninput" : o2 && z.test(i2) ? i2 = i2.replace(H, "-$&").toLowerCase() : null === c2 && (c2 = void 0), "oninput" === f2 && u2[i2 = f2] && (i2 = "oninputCapture"), u2[i2] = c2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = preact.toChildArray(t2.children).forEach(function(n4) {
        n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = preact.toChildArray(t2.children).forEach(function(n4) {
        n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", nn)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n3.props = u2;
    }(n2), n2.$$typeof = j, tn && tn(n2);
  };
  var en = preact.options.__r;
  preact.options.__r = function(n2) {
    en && en(n2), X = n2.__c;
  };
  var rn = preact.options.diffed;
  preact.options.diffed = function(n2) {
    rn && rn(n2);
    var t2 = n2.props, e2 = n2.__e;
    null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value), X = null;
  };
  var un = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
    return X.__n[n2.__c].props.value;
  }, useCallback: q$1, useContext: x$1, useDebugValue: P$1, useDeferredValue: _n, useEffect: y, useId: g$1, useImperativeHandle: F$1, useInsertionEffect: Sn, useLayoutEffect: _, useMemo: T$1, useReducer: p, useRef: A$1, useState: h, useSyncExternalStore: En, useTransition: bn } } };
  function cn(n2) {
    return preact.createElement.bind(null, n2);
  }
  function fn(n2) {
    return !!n2 && n2.$$typeof === j;
  }
  function ln(n2) {
    return fn(n2) && n2.type === preact.Fragment;
  }
  function an(n2) {
    return !!n2 && !!n2.displayName && ("string" == typeof n2.displayName || n2.displayName instanceof String) && n2.displayName.startsWith("Memo(");
  }
  function sn(n2) {
    return fn(n2) ? preact.cloneElement.apply(null, arguments) : n2;
  }
  function hn(n2) {
    return !!n2.__k && (preact.render(null, n2), true);
  }
  function vn(n2) {
    return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
  }
  var dn = function(n2, t2) {
    return n2(t2);
  }, pn = function(n2, t2) {
    return n2(t2);
  }, mn = preact.Fragment;
  function yn(n2) {
    n2();
  }
  function _n(n2) {
    return n2;
  }
  function bn() {
    return [false, yn];
  }
  var Sn = _, gn = fn;
  function En(n2, t2) {
    var e2 = t2(), r2 = h({ h: { __: e2, v: t2 } }), u2 = r2[0].h, o2 = r2[1];
    return _(function() {
      u2.__ = e2, u2.v = t2, Cn(u2) && o2({ h: u2 });
    }, [n2, e2, t2]), y(function() {
      return Cn(u2) && o2({ h: u2 }), n2(function() {
        Cn(u2) && o2({ h: u2 });
      });
    }, [n2]), e2;
  }
  function Cn(n2) {
    var t2, e2, r2 = n2.v, u2 = n2.__;
    try {
      var o2 = r2();
      return !((t2 = u2) === (e2 = o2) && (0 !== t2 || 1 / t2 == 1 / e2) || t2 != t2 && e2 != e2);
    } catch (n3) {
      return true;
    }
  }
  var xn = { useState: h, useId: g$1, useReducer: p, useEffect: y, useLayoutEffect: _, useInsertionEffect: Sn, useTransition: bn, useDeferredValue: _n, useSyncExternalStore: En, startTransition: yn, useRef: A$1, useImperativeHandle: F$1, useMemo: T$1, useCallback: q$1, useContext: x$1, useDebugValue: P$1, version: "18.3.1", Children: I, render: $, hydrate: q, unmountComponentAtNode: hn, createPortal: P, createElement: preact.createElement, createContext: preact.createContext, createFactory: cn, cloneElement: sn, createRef: preact.createRef, Fragment: preact.Fragment, isValidElement: fn, isElement: gn, isFragment: ln, isMemo: an, findDOMNode: vn, Component: preact.Component, PureComponent: E, memo: C, forwardRef: w, flushSync: pn, unstable_batchedUpdates: dn, StrictMode: mn, Suspense: D, SuspenseList: F, lazy: O, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: un };
  var Ct = (s2) => {
    switch (s2) {
      case "success":
        return $t$1;
      case "info":
        return _t;
      case "warning":
        return Wt;
      case "error":
        return Ut;
      default:
        return null;
    }
  }, Ft = Array(12).fill(0), It = ({ visible: s2 }) => xn.createElement("div", { className: "sonner-loading-wrapper", "data-visible": s2 }, xn.createElement("div", { className: "sonner-spinner" }, Ft.map((o2, t2) => xn.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${t2}` })))), $t$1 = xn.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, xn.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), Wt = xn.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, xn.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), _t = xn.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, xn.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), Ut = xn.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, xn.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }));
  var Dt = () => {
    let [s2, o2] = xn.useState(document.hidden);
    return xn.useEffect(() => {
      let t2 = () => {
        o2(document.hidden);
      };
      return document.addEventListener("visibilitychange", t2), () => window.removeEventListener("visibilitychange", t2);
    }, []), s2;
  };
  var ct = 1, ut = class {
    constructor() {
      this.subscribe = (o2) => (this.subscribers.push(o2), () => {
        let t2 = this.subscribers.indexOf(o2);
        this.subscribers.splice(t2, 1);
      });
      this.publish = (o2) => {
        this.subscribers.forEach((t2) => t2(o2));
      };
      this.addToast = (o2) => {
        this.publish(o2), this.toasts = [...this.toasts, o2];
      };
      this.create = (o2) => {
        var b;
        let _a2 = o2, { message: t2 } = _a2, n = __objRest(_a2, ["message"]), h2 = typeof (o2 == null ? void 0 : o2.id) == "number" || ((b = o2.id) == null ? void 0 : b.length) > 0 ? o2.id : ct++, u2 = this.toasts.find((d2) => d2.id === h2), g2 = o2.dismissible === void 0 ? true : o2.dismissible;
        return u2 ? this.toasts = this.toasts.map((d2) => d2.id === h2 ? (this.publish(__spreadProps(__spreadValues(__spreadValues({}, d2), o2), { id: h2, title: t2 })), __spreadProps(__spreadValues(__spreadValues({}, d2), o2), { id: h2, dismissible: g2, title: t2 })) : d2) : this.addToast(__spreadProps(__spreadValues({ title: t2 }, n), { dismissible: g2, id: h2 })), h2;
      };
      this.dismiss = (o2) => (o2 || this.toasts.forEach((t2) => {
        this.subscribers.forEach((n) => n({ id: t2.id, dismiss: true }));
      }), this.subscribers.forEach((t2) => t2({ id: o2, dismiss: true })), o2);
      this.message = (o2, t2) => this.create(__spreadProps(__spreadValues({}, t2), { message: o2 }));
      this.error = (o2, t2) => this.create(__spreadProps(__spreadValues({}, t2), { message: o2, type: "error" }));
      this.success = (o2, t2) => this.create(__spreadProps(__spreadValues({}, t2), { type: "success", message: o2 }));
      this.info = (o2, t2) => this.create(__spreadProps(__spreadValues({}, t2), { type: "info", message: o2 }));
      this.warning = (o2, t2) => this.create(__spreadProps(__spreadValues({}, t2), { type: "warning", message: o2 }));
      this.loading = (o2, t2) => this.create(__spreadProps(__spreadValues({}, t2), { type: "loading", message: o2 }));
      this.promise = (o2, t2) => {
        if (!t2) return;
        let n;
        t2.loading !== void 0 && (n = this.create(__spreadProps(__spreadValues({}, t2), { promise: o2, type: "loading", message: t2.loading, description: typeof t2.description != "function" ? t2.description : void 0 })));
        let h2 = o2 instanceof Promise ? o2 : o2(), u2 = n !== void 0;
        return h2.then(async (g2) => {
          if (Ot(g2) && !g2.ok) {
            u2 = false;
            let b = typeof t2.error == "function" ? await t2.error(`HTTP error! status: ${g2.status}`) : t2.error, d2 = typeof t2.description == "function" ? await t2.description(`HTTP error! status: ${g2.status}`) : t2.description;
            this.create({ id: n, type: "error", message: b, description: d2 });
          } else if (t2.success !== void 0) {
            u2 = false;
            let b = typeof t2.success == "function" ? await t2.success(g2) : t2.success, d2 = typeof t2.description == "function" ? await t2.description(g2) : t2.description;
            this.create({ id: n, type: "success", message: b, description: d2 });
          }
        }).catch(async (g2) => {
          if (t2.error !== void 0) {
            u2 = false;
            let b = typeof t2.error == "function" ? await t2.error(g2) : t2.error, d2 = typeof t2.description == "function" ? await t2.description(g2) : t2.description;
            this.create({ id: n, type: "error", message: b, description: d2 });
          }
        }).finally(() => {
          var g2;
          u2 && (this.dismiss(n), n = void 0), (g2 = t2.finally) == null || g2.call(t2);
        }), n;
      };
      this.custom = (o2, t2) => {
        let n = (t2 == null ? void 0 : t2.id) || ct++;
        return this.create(__spreadValues({ jsx: o2(n), id: n }, t2)), n;
      };
      this.subscribers = [], this.toasts = [];
    }
  }, v = new ut(), Vt = (s2, o2) => {
    let t2 = (o2 == null ? void 0 : o2.id) || ct++;
    return v.addToast(__spreadProps(__spreadValues({ title: s2 }, o2), { id: t2 })), t2;
  }, Ot = (s2) => s2 && typeof s2 == "object" && "ok" in s2 && typeof s2.ok == "boolean" && "status" in s2 && typeof s2.status == "number", Kt = Vt, Xt = () => v.toasts, Jt = Object.assign(Kt, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: Xt });
  function ft(s2, { insertAt: o2 } = {}) {
    if (typeof document == "undefined") return;
    let t2 = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
    n.type = "text/css", o2 === "top" && t2.firstChild ? t2.insertBefore(n, t2.firstChild) : t2.appendChild(n), n.styleSheet ? n.styleSheet.cssText = s2 : n.appendChild(document.createTextNode(s2));
  }
  ft(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
  function U(s2) {
    return s2.label !== void 0;
  }
  var qt = 3, Qt = "32px", Zt = 4e3, te = 356, ee = 14, oe = 20, ae = 200;
  function ne(...s2) {
    return s2.filter(Boolean).join(" ");
  }
  var se = (s2) => {
    var yt, xt, vt, wt, Tt, St, Rt, Et, Nt, Pt;
    let { invert: o2, toast: t2, unstyled: n, interacting: h2, setHeights: u2, visibleToasts: g2, heights: b, index: d2, toasts: q2, expanded: $2, removeToast: V2, defaultRichColors: Q2, closeButton: i, style: O2, cancelButtonStyle: K2, actionButtonStyle: Z2, className: tt = "", descriptionClassName: et = "", duration: X2, position: ot, gap: w2, loadingIcon: j2, expandByDefault: W2, classNames: r2, icons: I2, closeButtonAriaLabel: at = "Close toast", pauseWhenPageIsHidden: k2, cn: T2 } = s2, [z2, nt] = xn.useState(false), [D2, H2] = xn.useState(false), [st, N2] = xn.useState(false), [M2, rt] = xn.useState(false), [c2, m2] = xn.useState(0), [y2, S] = xn.useState(0), A2 = xn.useRef(null), l2 = xn.useRef(null), _2 = d2 === 0, J2 = d2 + 1 <= g2, x2 = t2.type, P2 = t2.dismissible !== false, Mt = t2.className || "", At = t2.descriptionClassName || "", G2 = xn.useMemo(() => b.findIndex((a2) => a2.toastId === t2.id) || 0, [b, t2.id]), Lt = xn.useMemo(() => {
      var a2;
      return (a2 = t2.closeButton) != null ? a2 : i;
    }, [t2.closeButton, i]), mt = xn.useMemo(() => t2.duration || X2 || Zt, [t2.duration, X2]), it = xn.useRef(0), Y2 = xn.useRef(0), pt = xn.useRef(0), F2 = xn.useRef(null), [gt, zt] = ot.split("-"), ht = xn.useMemo(() => b.reduce((a2, f2, p2) => p2 >= G2 ? a2 : a2 + f2.height, 0), [b, G2]), bt = Dt(), jt = t2.invert || o2, lt = x2 === "loading";
    Y2.current = xn.useMemo(() => G2 * w2 + ht, [G2, ht]), xn.useEffect(() => {
      nt(true);
    }, []), xn.useLayoutEffect(() => {
      if (!z2) return;
      let a2 = l2.current, f2 = a2.style.height;
      a2.style.height = "auto";
      let p2 = a2.getBoundingClientRect().height;
      a2.style.height = f2, S(p2), u2((B2) => B2.find((R2) => R2.toastId === t2.id) ? B2.map((R2) => R2.toastId === t2.id ? __spreadProps(__spreadValues({}, R2), { height: p2 }) : R2) : [{ toastId: t2.id, height: p2, position: t2.position }, ...B2]);
    }, [z2, t2.title, t2.description, u2, t2.id]);
    let L2 = xn.useCallback(() => {
      H2(true), m2(Y2.current), u2((a2) => a2.filter((f2) => f2.toastId !== t2.id)), setTimeout(() => {
        V2(t2);
      }, ae);
    }, [t2, V2, u2, Y2]);
    xn.useEffect(() => {
      if (t2.promise && x2 === "loading" || t2.duration === 1 / 0 || t2.type === "loading") return;
      let a2, f2 = mt;
      return $2 || h2 || k2 && bt ? (() => {
        if (pt.current < it.current) {
          let C2 = (/* @__PURE__ */ new Date()).getTime() - it.current;
          f2 = f2 - C2;
        }
        pt.current = (/* @__PURE__ */ new Date()).getTime();
      })() : (() => {
        f2 !== 1 / 0 && (it.current = (/* @__PURE__ */ new Date()).getTime(), a2 = setTimeout(() => {
          var C2;
          (C2 = t2.onAutoClose) == null || C2.call(t2, t2), L2();
        }, f2));
      })(), () => clearTimeout(a2);
    }, [$2, h2, W2, t2, mt, L2, t2.promise, x2, k2, bt]), xn.useEffect(() => {
      let a2 = l2.current;
      if (a2) {
        let f2 = a2.getBoundingClientRect().height;
        return S(f2), u2((p2) => [{ toastId: t2.id, height: f2, position: t2.position }, ...p2]), () => u2((p2) => p2.filter((B2) => B2.toastId !== t2.id));
      }
    }, [u2, t2.id]), xn.useEffect(() => {
      t2.delete && L2();
    }, [L2, t2.delete]);
    function Yt() {
      return I2 != null && I2.loading ? xn.createElement("div", { className: "sonner-loader", "data-visible": x2 === "loading" }, I2.loading) : j2 ? xn.createElement("div", { className: "sonner-loader", "data-visible": x2 === "loading" }, j2) : xn.createElement(It, { visible: x2 === "loading" });
    }
    return xn.createElement("li", { "aria-live": t2.important ? "assertive" : "polite", "aria-atomic": "true", role: "status", tabIndex: 0, ref: l2, className: T2(tt, Mt, r2 == null ? void 0 : r2.toast, (yt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : yt.toast, r2 == null ? void 0 : r2.default, r2 == null ? void 0 : r2[x2], (xt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : xt[x2]), "data-sonner-toast": "", "data-rich-colors": (vt = t2.richColors) != null ? vt : Q2, "data-styled": !(t2.jsx || t2.unstyled || n), "data-mounted": z2, "data-promise": !!t2.promise, "data-removed": D2, "data-visible": J2, "data-y-position": gt, "data-x-position": zt, "data-index": d2, "data-front": _2, "data-swiping": st, "data-dismissible": P2, "data-type": x2, "data-invert": jt, "data-swipe-out": M2, "data-expanded": !!($2 || W2 && z2), style: __spreadValues(__spreadValues({ "--index": d2, "--toasts-before": d2, "--z-index": q2.length - d2, "--offset": `${D2 ? c2 : Y2.current}px`, "--initial-height": W2 ? "auto" : `${y2}px` }, O2), t2.style), onPointerDown: (a2) => {
      lt || !P2 || (A2.current = /* @__PURE__ */ new Date(), m2(Y2.current), a2.target.setPointerCapture(a2.pointerId), a2.target.tagName !== "BUTTON" && (N2(true), F2.current = { x: a2.clientX, y: a2.clientY }));
    }, onPointerUp: () => {
      var B2, C2, R2, dt;
      if (M2 || !P2) return;
      F2.current = null;
      let a2 = Number(((B2 = l2.current) == null ? void 0 : B2.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0), f2 = (/* @__PURE__ */ new Date()).getTime() - ((C2 = A2.current) == null ? void 0 : C2.getTime()), p2 = Math.abs(a2) / f2;
      if (Math.abs(a2) >= oe || p2 > 0.11) {
        m2(Y2.current), (R2 = t2.onDismiss) == null || R2.call(t2, t2), L2(), rt(true);
        return;
      }
      (dt = l2.current) == null || dt.style.setProperty("--swipe-amount", "0px"), N2(false);
    }, onPointerMove: (a2) => {
      var Bt;
      if (!F2.current || !P2) return;
      let f2 = a2.clientY - F2.current.y, p2 = a2.clientX - F2.current.x, C2 = (gt === "top" ? Math.min : Math.max)(0, f2), R2 = a2.pointerType === "touch" ? 10 : 2;
      Math.abs(C2) > R2 ? (Bt = l2.current) == null || Bt.style.setProperty("--swipe-amount", `${f2}px`) : Math.abs(p2) > R2 && (F2.current = null);
    } }, Lt && !t2.jsx ? xn.createElement("button", { "aria-label": at, "data-disabled": lt, "data-close-button": true, onClick: lt || !P2 ? () => {
    } : () => {
      var a2;
      L2(), (a2 = t2.onDismiss) == null || a2.call(t2, t2);
    }, className: T2(r2 == null ? void 0 : r2.closeButton, (wt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : wt.closeButton) }, xn.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, xn.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), xn.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }))) : null, t2.jsx || xn.isValidElement(t2.title) ? t2.jsx || t2.title : xn.createElement(xn.Fragment, null, x2 || t2.icon || t2.promise ? xn.createElement("div", { "data-icon": "", className: T2(r2 == null ? void 0 : r2.icon, (Tt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Tt.icon) }, t2.promise || t2.type === "loading" && !t2.icon ? t2.icon || Yt() : null, t2.type !== "loading" ? t2.icon || (I2 == null ? void 0 : I2[x2]) || Ct(x2) : null) : null, xn.createElement("div", { "data-content": "", className: T2(r2 == null ? void 0 : r2.content, (St = t2 == null ? void 0 : t2.classNames) == null ? void 0 : St.content) }, xn.createElement("div", { "data-title": "", className: T2(r2 == null ? void 0 : r2.title, (Rt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Rt.title) }, t2.title), t2.description ? xn.createElement("div", { "data-description": "", className: T2(et, At, r2 == null ? void 0 : r2.description, (Et = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Et.description) }, t2.description) : null), xn.isValidElement(t2.cancel) ? t2.cancel : t2.cancel && U(t2.cancel) ? xn.createElement("button", { "data-button": true, "data-cancel": true, style: t2.cancelButtonStyle || K2, onClick: (a2) => {
      var f2, p2;
      U(t2.cancel) && P2 && ((p2 = (f2 = t2.cancel).onClick) == null || p2.call(f2, a2), L2());
    }, className: T2(r2 == null ? void 0 : r2.cancelButton, (Nt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Nt.cancelButton) }, t2.cancel.label) : null, xn.isValidElement(t2.action) ? t2.action : t2.action && U(t2.action) ? xn.createElement("button", { "data-button": true, "data-action": true, style: t2.actionButtonStyle || Z2, onClick: (a2) => {
      var f2, p2;
      U(t2.action) && (a2.defaultPrevented || ((p2 = (f2 = t2.action).onClick) == null || p2.call(f2, a2), L2()));
    }, className: T2(r2 == null ? void 0 : r2.actionButton, (Pt = t2 == null ? void 0 : t2.classNames) == null ? void 0 : Pt.actionButton) }, t2.action.label) : null));
  };
  function Ht() {
    if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
    let s2 = document.documentElement.getAttribute("dir");
    return s2 === "auto" || !s2 ? window.getComputedStyle(document.documentElement).direction : s2;
  }
  var Te = (s2) => {
    let { invert: o2, position: t2 = "bottom-right", hotkey: n = ["altKey", "KeyT"], expand: h2, closeButton: u2, className: g2, offset: b, theme: d2 = "light", richColors: q2, duration: $2, style: V2, visibleToasts: Q2 = qt, toastOptions: i, dir: O2 = Ht(), gap: K2 = ee, loadingIcon: Z2, icons: tt, containerAriaLabel: et = "Notifications", pauseWhenPageIsHidden: X2, cn: ot = ne } = s2, [w2, j2] = xn.useState([]), W2 = xn.useMemo(() => Array.from(new Set([t2].concat(w2.filter((c2) => c2.position).map((c2) => c2.position)))), [w2, t2]), [r2, I2] = xn.useState([]), [at, k2] = xn.useState(false), [T2, z2] = xn.useState(false), [nt, D2] = xn.useState(d2 !== "system" ? d2 : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), H2 = xn.useRef(null), st = n.join("+").replace(/Key/g, "").replace(/Digit/g, ""), N2 = xn.useRef(null), M2 = xn.useRef(false), rt = xn.useCallback((c2) => {
      var m2;
      (m2 = w2.find((y2) => y2.id === c2.id)) != null && m2.delete || v.dismiss(c2.id), j2((y2) => y2.filter(({ id: S }) => S !== c2.id));
    }, [w2]);
    return xn.useEffect(() => v.subscribe((c2) => {
      if (c2.dismiss) {
        j2((m2) => m2.map((y2) => y2.id === c2.id ? __spreadProps(__spreadValues({}, y2), { delete: true }) : y2));
        return;
      }
      setTimeout(() => {
        xn.flushSync(() => {
          j2((m2) => {
            let y2 = m2.findIndex((S) => S.id === c2.id);
            return y2 !== -1 ? [...m2.slice(0, y2), __spreadValues(__spreadValues({}, m2[y2]), c2), ...m2.slice(y2 + 1)] : [c2, ...m2];
          });
        });
      });
    }), []), xn.useEffect(() => {
      if (d2 !== "system") {
        D2(d2);
        return;
      }
      d2 === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? D2("dark") : D2("light")), typeof window != "undefined" && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: c2 }) => {
        D2(c2 ? "dark" : "light");
      });
    }, [d2]), xn.useEffect(() => {
      w2.length <= 1 && k2(false);
    }, [w2]), xn.useEffect(() => {
      let c2 = (m2) => {
        var S, A2;
        n.every((l2) => m2[l2] || m2.code === l2) && (k2(true), (S = H2.current) == null || S.focus()), m2.code === "Escape" && (document.activeElement === H2.current || (A2 = H2.current) != null && A2.contains(document.activeElement)) && k2(false);
      };
      return document.addEventListener("keydown", c2), () => document.removeEventListener("keydown", c2);
    }, [n]), xn.useEffect(() => {
      if (H2.current) return () => {
        N2.current && (N2.current.focus({ preventScroll: true }), N2.current = null, M2.current = false);
      };
    }, [H2.current]), w2.length ? xn.createElement("section", { "aria-label": `${et} ${st}`, tabIndex: -1 }, W2.map((c2, m2) => {
      var A2;
      let [y2, S] = c2.split("-");
      return xn.createElement("ol", { key: c2, dir: O2 === "auto" ? Ht() : O2, tabIndex: -1, ref: H2, className: g2, "data-sonner-toaster": true, "data-theme": nt, "data-y-position": y2, "data-x-position": S, style: __spreadValues({ "--front-toast-height": `${((A2 = r2[0]) == null ? void 0 : A2.height) || 0}px`, "--offset": typeof b == "number" ? `${b}px` : b || Qt, "--width": `${te}px`, "--gap": `${K2}px` }, V2), onBlur: (l2) => {
        M2.current && !l2.currentTarget.contains(l2.relatedTarget) && (M2.current = false, N2.current && (N2.current.focus({ preventScroll: true }), N2.current = null));
      }, onFocus: (l2) => {
        l2.target instanceof HTMLElement && l2.target.dataset.dismissible === "false" || M2.current || (M2.current = true, N2.current = l2.relatedTarget);
      }, onMouseEnter: () => k2(true), onMouseMove: () => k2(true), onMouseLeave: () => {
        T2 || k2(false);
      }, onPointerDown: (l2) => {
        l2.target instanceof HTMLElement && l2.target.dataset.dismissible === "false" || z2(true);
      }, onPointerUp: () => z2(false) }, w2.filter((l2) => !l2.position && m2 === 0 || l2.position === c2).map((l2, _2) => {
        var J2, x2;
        return xn.createElement(se, { key: l2.id, icons: tt, index: _2, toast: l2, defaultRichColors: q2, duration: (J2 = i == null ? void 0 : i.duration) != null ? J2 : $2, className: i == null ? void 0 : i.className, descriptionClassName: i == null ? void 0 : i.descriptionClassName, invert: o2, visibleToasts: Q2, closeButton: (x2 = i == null ? void 0 : i.closeButton) != null ? x2 : u2, interacting: T2, position: c2, style: i == null ? void 0 : i.style, unstyled: i == null ? void 0 : i.unstyled, classNames: i == null ? void 0 : i.classNames, cancelButtonStyle: i == null ? void 0 : i.cancelButtonStyle, actionButtonStyle: i == null ? void 0 : i.actionButtonStyle, removeToast: rt, toasts: w2.filter((P2) => P2.position == l2.position), heights: r2.filter((P2) => P2.position == l2.position), setHeights: I2, expandByDefault: h2, gap: K2, loadingIcon: Z2, expanded: at, pauseWhenPageIsHidden: X2, cn: ot });
      }));
    })) : null;
  };
  const formatTorrentTitle = (title) => {
    return title.replace(/\.(?!(\d+))/ig, " ").replace(/\.(?=\d{4}|48|57|72|2k|4k|7.1|6.1|5.1|4.1|2.0|1.0)/ig, " ").trim();
  };
  const handleError = (error) => {
    Jt.error(error.message || error);
  };
  const getDoubanInfo = async (doubanUrl, isTV) => {
    try {
      if (doubanUrl) {
        const doubanInfo = await getMobileDoubanInfo(doubanUrl, isTV);
        return doubanInfo;
      }
      throw $t("豆瓣链接获取失败");
    } catch (error) {
      handleError(error);
    }
  };
  const getDoubanBookInfo = async (doubanUrl) => {
    const reqUrl = `${PT_GEN_API}?url=${doubanUrl}`;
    const data = await fetch(reqUrl, {
      responseType: "json"
    });
    const { chinese_title, origin_title } = data;
    let foreignTitle = "";
    if (chinese_title !== origin_title) {
      foreignTitle = origin_title;
    }
    if (data) {
      return __spreadProps(__spreadValues({}, data), {
        chineseTitle: chinese_title,
        foreignTitle
      });
    }
  };
  const getDoubanAwards = async (doubanId) => {
    const data = await fetch(`https://movie.douban.com/subject/${doubanId}/awards/`, {
      responseType: void 0
    });
    const doc = new DOMParser().parseFromString(data, "text/html");
    const linkDom = doc.querySelector("#content > div > div.article");
    return linkDom == null ? void 0 : linkDom.innerHTML.replace(/[ \n]/g, "").replace(/<\/li><li>/g, "</li> <li>").replace(/<\/a><span/g, "</a> <span").replace(/<(div|ul)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/ +\n/g, "\n").trim();
  };
  const getIMDBFromDouban = async (doubanLink) => {
    var _a2, _b, _c, _d2;
    const doubanPage = await fetch(doubanLink, {
      responseType: void 0
    });
    const dom = new DOMParser().parseFromString(doubanPage, "text/html");
    const imdbId = (_d2 = (_c = (_b = (_a2 = jQuery('#info span.pl:contains("IMDb")', dom)[0]) == null ? void 0 : _a2.nextSibling) == null ? void 0 : _b.nodeValue) == null ? void 0 : _c.trim()) != null ? _d2 : "";
    return imdbId;
  };
  const getMobileDoubanInfo = async (doubanUrl, isTV) => {
    var _a2, _b, _c, _d2;
    try {
      if (doubanUrl) {
        const doubanId = (_b = (_a2 = doubanUrl.match(/subject\/(\d+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
        if (!doubanId) {
          throw $t("豆瓣ID获取失败");
        }
        const catPath = isTV ? "tv" : "movie";
        const url = `${DOUBAN_MOBILE_API}/${catPath}/${doubanId}`;
        const options2 = {
          headers: {
            Referer: `https://m.douban.com/${catPath}/subject/${doubanId}`
          },
          cookie: "",
          anonymous: false
        };
        const cookie = getValue("easy-seed.douban-cookie", false);
        const ckValue = (_d2 = (_c = cookie == null ? void 0 : cookie.match(/ck=([^;]+)?/)) == null ? void 0 : _c[1]) != null ? _d2 : "";
        if (cookie) {
          options2.cookie = cookie;
          options2.anonymous = true;
        }
        const data = await fetch(`${url}?for_mobile=1&ck=${ckValue}`, options2);
        if (data && data.title === "未知电影") {
          throw $t("请配置豆瓣Cookie");
        }
        if (data && data.id) {
          const creditsData = await fetch(`${url}/credits`, options2);
          data.credits = creditsData.credits;
          const awards = await getDoubanAwards(doubanId);
          data.awards = awards;
          return await formatDoubanInfo(data);
        }
        throw $t("获取豆瓣信息失败");
      } else {
        throw $t("豆瓣链接获取失败");
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getIMDBRating = async (imdbId) => {
    var _a2, _b, _c, _d2;
    const url = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`;
    const data = await fetch(url, {
      responseType: void 0
    });
    const { resource } = (_b = JSON.parse((_a2 = data.match(/[^(]+\((.+)\)/)) == null ? void 0 : _a2[1])) != null ? _b : {};
    return {
      count: resource.ratingCount,
      value: resource.rating,
      id: (_d2 = (_c = resource.id.match(/tt\d+/)) == null ? void 0 : _c[0]) != null ? _d2 : ""
    };
  };
  const formatDoubanInfo = async (data) => {
    var _a2, _b;
    const {
      rating,
      pubdate,
      year,
      languages,
      genres,
      title,
      intro,
      actors,
      durations,
      cover_url,
      countries,
      url,
      original_title,
      directors,
      aka,
      episodes_count,
      credits,
      awards
    } = data;
    const { imdbUrl } = TORRENT_INFO;
    let imdbId = "";
    if (!imdbUrl) {
      imdbId = await getIMDBFromDouban(url);
    } else {
      imdbId = getIMDBIdByUrl(imdbUrl);
    }
    let imdbRate = {
      id: "",
      value: "0",
      count: "0"
    };
    if (imdbId) {
      imdbRate = await getIMDBRating(imdbId);
    }
    let foreignTitle = "";
    if (original_title && title !== original_title) {
      foreignTitle = original_title;
    }
    let poster = cover_url;
    if (poster.includes("img3")) {
      poster = poster.replace("img3", "img1").replace(/m(_ratio_poster)/, "l$1");
    }
    const formatData = {
      imdbId: imdbRate.id,
      imdbLink: `https://www.imdb.com/title/${imdbRate.id}/`,
      imdbAverageRating: imdbRate.value,
      imdbVotes: imdbRate.count,
      imdbRating: `${(_a2 = imdbRate == null ? void 0 : imdbRate.value) != null ? _a2 : 0}/10 from ${(_b = imdbRate == null ? void 0 : imdbRate.count) != null ? _b : 0} users`,
      chineseTitle: title,
      foreignTitle,
      aka,
      transTitle: Array.from(/* @__PURE__ */ new Set([original_title ? title : "", ...aka])).filter(Boolean),
      thisTitle: [original_title || title],
      // original_title
      year,
      playDate: pubdate,
      region: countries.join(" / "),
      genre: genres,
      language: languages,
      episodes: episodes_count > 0 ? `${episodes_count}` : "",
      duration: durations.join(" / "),
      introduction: intro,
      doubanLink: url,
      doubanRatingAverage: rating.value,
      doubanVotes: `${rating.count}`,
      doubanRating: `${rating.value}/10 from ${rating.count} users`,
      poster,
      director: directors,
      cast: actors,
      writer: [],
      credits,
      awards
    };
    formatData.format = getDoubanFormat(formatData);
    return formatData;
  };
  const getDoubanFormat = (data) => {
    const {
      poster,
      thisTitle,
      transTitle,
      genre,
      year: movieYear,
      region,
      language,
      playDate,
      imdbRating,
      imdbLink,
      doubanRating,
      doubanLink,
      episodes: showEpisodes,
      duration: movieDuration,
      introduction,
      awards,
      tags,
      credits = []
    } = data;
    const spaceStr = " ".repeat(7);
    const creditsData = credits.map((credit) => {
      const celebrity = credit.celebrities.map((item) => {
        return `${item.name} ${item.latin_name}`;
      });
      const repeatMap = {
        2: 7,
        3: 2,
        4: 0,
        5: 0
      };
      const celebrityKey = credit.title.split("").join(" ".repeat((repeatMap == null ? void 0 : repeatMap[credit.title.length]) || 0));
      const celebrityValue = celebrity.join(`
${" ".repeat(24)}`).trim();
      return `◎${celebrityKey}${spaceStr}${celebrityValue}`;
    });
    let descr = poster ? `[img]${poster}[/img]

` : "";
    descr += transTitle ? `◎译${spaceStr}名${spaceStr}${transTitle.join(" / ")}
` : "";
    descr += thisTitle ? `◎片${spaceStr}名${spaceStr}${thisTitle.join(" / ")}
` : "";
    descr += movieYear ? `◎年${spaceStr}代${spaceStr}${movieYear.trim()}
` : "";
    descr += region ? `◎产${spaceStr}地${spaceStr}${region}
` : "";
    descr += genre ? `◎类${spaceStr}别${spaceStr}${genre.join(" / ")}
` : "";
    descr += language ? `◎语${spaceStr}言${spaceStr}${language.join(" / ")}
` : "";
    descr += playDate ? `◎上映日期${spaceStr} ${playDate.join(" / ")}
` : "";
    descr += imdbRating ? `◎IMDb评分${spaceStr}${imdbRating}
` : "";
    descr += imdbLink ? `◎IMDb链接${spaceStr}${imdbLink}
` : "";
    descr += doubanRating ? `◎豆瓣评分${spaceStr} ${doubanRating}
` : "";
    descr += doubanLink ? `◎豆瓣链接${spaceStr} ${doubanLink}
` : "";
    descr += showEpisodes ? `◎集${spaceStr}数${spaceStr}${showEpisodes}
` : "";
    descr += movieDuration ? `◎片${spaceStr}长${spaceStr}${movieDuration}
` : "";
    descr += creditsData.length > 0 ? creditsData.join("\n") : "";
    descr += tags && tags.length > 0 ? `
◎标${spaceStr}签${spaceStr}${tags.join(" | ")} 
` : "";
    descr += introduction ? `
◎简${spaceStr}介

  ${introduction.replace(/\n/g, `
${" ".repeat(2)}`)} 
` : "";
    descr += awards ? `
◎获奖情况

　　${awards.replace(/\n/g, `
${" ".repeat(6)}`)} 
` : "";
    return descr.trim();
  };
  const getDoubanIdByIMDB = async (query) => {
    var _a2, _b, _c, _d2;
    try {
      const imdbId = getIMDBIdByUrl(query);
      const params = imdbId || query;
      const url = DOUBAN_SUGGEST_API.replace("{query}", params);
      const options2 = {
        cookie: "",
        anonymous: false,
        responseType: void 0
      };
      const cookie = getValue("easy-seed.douban-cookie", false);
      if (cookie) {
        options2.cookie = cookie;
        options2.anonymous = true;
      }
      const data = await fetch(url, options2);
      const doc = new DOMParser().parseFromString(data, "text/html");
      const linkDom = doc.querySelector(".result-list .result h3 a");
      if (!linkDom) {
        throw $t("豆瓣ID获取失败");
      } else {
        const { href, textContent } = linkDom;
        const season = (_b = (_a2 = textContent == null ? void 0 : textContent.match(/第(.+?)季/)) == null ? void 0 : _a2[1]) != null ? _b : "";
        const doubanId = (_d2 = (_c = decodeURIComponent(href).match(/subject\/(\d+)/)) == null ? void 0 : _c[1]) != null ? _d2 : "";
        return {
          id: doubanId,
          season,
          title: textContent || ""
        };
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getIMDBData = async (imdbUrl) => {
    try {
      if (!imdbUrl) {
        throw new Error("$t(缺少IMDB信息)");
      }
      const data = await fetch(`${PT_GEN_API}?url=${imdbUrl}`);
      if (data && data.success) {
        return data;
      }
      throw data.error || $t("请求失败");
    } catch (error) {
      handleError(error);
    }
  };
  const transferImgs = async (screenshot, authToken, imgHost = "https://imgbb.com/json") => {
    try {
      const isHdbHost = !!screenshot.match(/i\.hdbits\.org/);
      const formData = new FormData();
      if (isHdbHost || imgHost.includes("gifyu")) {
        const promiseArray = [urlToFile(screenshot)];
        const [fileData] = await Promise.all(promiseArray);
        formData.append("type", "file");
        formData.append("source", fileData);
      } else {
        formData.append("type", "url");
        formData.append("source", screenshot);
      }
      formData.append("action", "upload");
      formData.append("timestamp", `${Date.now()}`);
      formData.append("auth_token", authToken);
      const res = await fetch(imgHost, {
        method: "POST",
        data: formData,
        timeout: 3e5
      });
      if (res.status_txt !== "OK") {
        throw $t("上传失败，请重试");
      }
      if (res.image) {
        return res.image;
      }
      throw $t("上传失败，请重试");
    } catch (error) {
      console.log("err:", error);
      handleError(error);
    }
  };
  const uploadToPixhost = async (screenshots) => {
    try {
      const params = encodeURI(`imgs=${screenshots.join("\n")}&content_type=1&max_th_size=300`);
      const res = await fetch("https://pixhost.to/remote/", {
        method: "POST",
        data: params,
        timeout: 3e5,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        responseType: void 0
      });
      const data = res.match(/(upload_results = )({.*})(;)/);
      if (!data) {
        throw $t("上传失败，请重试");
      }
      let imgResultList = [];
      if (data && data.length) {
        imgResultList = JSON.parse(data[2]).images;
        if (imgResultList.length < 1) {
          throw new Error($t("上传失败，请重试"));
        }
        return imgResultList;
      }
      throw new Error($t("上传失败，请重试"));
    } catch (error) {
      handleError(error);
    }
  };
  const uploadToImgbox = async (screenshot, authToken, tokenSecret) => {
    const file = await urlToFile(screenshot);
    const { token_id, token_secret } = tokenSecret;
    const options2 = {
      method: "POST",
      headers: {
        "X-CSRF-Token": authToken
      }
    };
    const formData = new FormData();
    formData.append("token_id", token_id);
    formData.append("token_secret", token_secret);
    formData.append("content_type", "1");
    formData.append("thumbnail_size", "350r");
    formData.append("gallery_id", "null");
    formData.append("gallery_secret", "null");
    formData.append("comments_enabled", "0");
    formData.append("files[]", file);
    options2.data = formData;
    const data = await fetch("https://imgbox.com/upload/process", options2);
    if (data && data.files && data.files.length) {
      return data.files[0];
    }
  };
  const uploadToHDB = async (screenshots, galleryName) => {
    const apiUrl = "https://img.hdbits.org/upload_api.php";
    try {
      const promiseArray = screenshots.map((item) => {
        return urlToFile(item);
      });
      const fileArray = await Promise.all(promiseArray);
      const formData = new FormData();
      formData.append("galleryoption", "1");
      formData.append("galleryname", galleryName);
      fileArray.forEach((file) => {
        formData.append("images_files[]", file);
      });
      const data = await fetch(apiUrl, {
        data: formData,
        method: "POST",
        responseType: void 0
      });
      if (data.includes("error")) {
        throw data;
      }
      return data;
    } catch (error) {
      handleError(error);
    }
  };
  const getPreciseCategory = (torrentInfo2, category) => {
    var _a2, _b;
    const { description, title, subtitle, doubanInfo } = torrentInfo2;
    const movieGenre = (_b = (_a2 = (description + doubanInfo).match(/(类\s+别)\s+(.+)?/)) == null ? void 0 : _a2[2]) != null ? _b : "";
    if (movieGenre.match(/动画/)) {
      return "cartoon";
    } else if (movieGenre.match(/纪录/)) {
      return "documentary";
    } else if ((subtitle == null ? void 0 : subtitle.match(/全.+?集/)) || title.match(/s0?\d{1,2}[^(e|.e)]/i)) {
      return "tvPack";
    }
    if (category == null ? void 0 : category.match(/tv/)) {
      if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || (subtitle == null ? void 0 : subtitle.match(/第[^\s]集/))) {
        return "tv";
      }
      return "tvPack";
    }
    return category;
  };
  const getUrlParam = (key) => {
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
    const regArray = location.search.substring(1).match(reg);
    if (regArray) {
      return decodeURIComponent(regArray[2]);
    }
    return "";
  };
  const getAudioCodecFromTitle = (title) => {
    if (!title) {
      return "";
    }
    title = title.replace(/:|-|\s/g, "");
    if (title.match(/atmos/i)) {
      return "atmos";
    } else if (title.match(/dtshdma/i)) {
      return "dtshdma";
    } else if (title.match(/dtsx/i)) {
      return "dtsx";
    } else if (title.match(/dts/i)) {
      return "dts";
    } else if (title.match(/truehd/i)) {
      return "truehd";
    } else if (title.match(/lpcm/i)) {
      return "lpcm";
    } else if (title.match(/flac/i)) {
      return "flac";
    } else if (title.match(/aac/i)) {
      return "aac";
    } else if (title.match(/DD\+|DDP|DolbyDigitalPlus/i)) {
      return "dd+";
    } else if (title.match(/DD|DolbyDigital/i)) {
      return "dd";
    } else if (title.match(/ac3/i)) {
      return "ac3";
    }
    return "";
  };
  const getVideoCodecFromTitle = (title, videoType = "") => {
    title = title.replace(/\.|-/g, "");
    if (title.match(/x264/i) || title.match(/h264|avc/i) && videoType === "encode") {
      return "x264";
    } else if (title.match(/h264|AVC/i)) {
      return "h264";
    } else if (title.match(/x265/i) || title.match(/h265|hevc/i) && videoType === "encode") {
      return "x265";
    } else if (title.match(/hevc|h265/i)) {
      return "hevc";
    } else if (title.match(/vc-?1/i)) {
      return "vc1";
    } else if (title.match(/mpeg-?2/i)) {
      return "mpeg2";
    } else if (title.match(/mpeg-?4/i)) {
      return "mpeg4";
    } else if (title.match(/vvc/i)) {
      return "vvc";
    }
    return "";
  };
  const getFilterImages = (bbcode) => {
    var _a2;
    if (!bbcode) {
      return [];
    }
    let allImages = Array.from((_a2 = bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig)) != null ? _a2 : []);
    if (allImages && allImages.length > 0) {
      allImages = allImages.map((img) => {
        if (img.match(/\[url=.+?\]/)) {
          return `${img}[/url]`;
        }
        return img;
      });
      return allImages.filter((item) => {
        return !item.match(/poster\.jpg|2019\/01\/04\/info\.png|MoreScreens|PTer\.png|ms\.png|trans\.gif|PTerREMUX\.png|PTerWEB\.png|CS\.png|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
      });
    }
    return [];
  };
  const getScreenshotsFromBBCode = async (bbcode) => {
    const allImages = getFilterImages(bbcode);
    if (allImages && allImages.length > 0) {
      const result = [];
      for (const img of allImages) {
        const originalUrl = await getOriginalImgUrl(img);
        if (originalUrl !== void 0) {
          result.push(originalUrl);
        }
      }
      return result;
    }
    return [];
  };
  const getOriginalImgUrl = async (urlBBcode) => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k, _l, _m;
    let imgUrl = urlBBcode;
    if (urlBBcode.match(/\[url=http(s)*:.+/)) {
      imgUrl = (_b = (_a2 = urlBBcode.match(/=(([^\]])+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
      if (imgUrl.match(/img\.hdbits\.org/)) {
        const res = await fetch(imgUrl, {
          responseType: void 0
        });
        const doc = new DOMParser().parseFromString(res, "text/html");
        imgUrl = jQuery("#viewimage", doc).attr("src");
      } else if (urlBBcode.match(/img\.pterclub\.com/)) {
        imgUrl = (_d2 = (_c = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _c[1]) != null ? _d2 : "";
        imgUrl = imgUrl.replace(/\.th/g, "");
      } else if (urlBBcode.match(/https?:\/\/imgbox\.com/)) {
        imgUrl = (_f = (_e2 = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _e2[1]) != null ? _f : "";
        imgUrl = imgUrl.replace(/thumbs(\d)/, "images$1").replace(/_t(\.png)/, "_o.png");
      } else if (imgUrl.match(/imagebam\.com/)) {
        const originalPage = await fetch(imgUrl, {
          responseType: void 0
        });
        const doc = new DOMParser().parseFromString(originalPage, "text/html");
        imgUrl = jQuery(".main-image", doc).attr("src");
      } else if (imgUrl.match(/beyondhd\.co/)) {
        imgUrl = (_h = (_g = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _g[1]) != null ? _h : "";
        imgUrl = imgUrl.replace(/\.(th|md)\.(png|jpg|gif)/, ".$2");
      } else if (!imgUrl.match(/\.(jpg|png|gif|bmp|webp)$/)) {
        imgUrl = (_j = (_i = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _i[1]) != null ? _j : "";
      } else if (urlBBcode.match(/https:\/\/pixhost\.to/)) {
        const hostNumber = (_k = urlBBcode.match(/img\]https:\/\/t(\d+)\./)) == null ? void 0 : _k[1];
        imgUrl = imgUrl.replace(/(pixhost\.to)\/show/, `img${hostNumber}.$1/images`);
      }
    } else if (urlBBcode.match(/\[img\]/)) {
      imgUrl = (_m = (_l = urlBBcode.match(/img\](([^[])+)/)) == null ? void 0 : _l[1]) != null ? _m : "";
    }
    return imgUrl;
  };
  const getSourceFromTitle = (title) => {
    if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
      return "uhdbluray";
    } else if (title.match(/blu(-)?ray|remux/i)) {
      return "bluray";
    } else if (title.match(/hdtv/i)) {
      return "hdtv";
    } else if (title.match(/web(-?(rip|dl))+/i)) {
      return "web";
    } else if (title.match(/hddvd/i)) {
      return "hddvd";
    } else if (title.match(/dvd/i)) {
      return "dvd";
    } else if (title.match(/vhs/i)) {
      return "vhs";
    }
    return "other";
  };
  const getSubTitle = (data) => {
    var _a2, _b;
    const { chineseTitle, thisTitle: originalTitle, transTitle } = data;
    let title = "";
    if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
      title += chineseTitle;
    }
    const moreTitle = originalTitle.concat(transTitle).filter((item) => title !== item);
    let seasonEpisode = (_b = (_a2 = TORRENT_INFO.title.match(/S\d+EP?(\d+)?/i)) == null ? void 0 : _a2[1]) != null ? _b : "";
    seasonEpisode = seasonEpisode.replace(/^0/i, "");
    const episode = seasonEpisode ? ` 第${seasonEpisode}集` : "";
    const hardcodedSub = TORRENT_INFO.hardcodedSub ? "| 硬字幕" : "";
    return `${title}${moreTitle.length > 0 ? "/" : ""}${moreTitle.join("/")}${episode} ${hardcodedSub}`;
  };
  const getAreaCode = (area) => {
    const europeList = EUROPE_LIST;
    if (area) {
      if (area.match(/USA|US|Canada|CA|美国|加拿大|United States/i)) {
        return "US";
      } else if (europeList.includes(area) || area.match(/欧|英|法|德|俄|意|苏联|EU/i)) {
        return "EU";
      } else if (area.match(/Japan|日本|JP/i)) {
        return "JP";
      } else if (area.match(/Korea|韩国|KR/i)) {
        return "KR";
      } else if (area.match(/Taiwan|台湾|TW/i)) {
        return "TW";
      } else if (area.match(/Hong\s?Kong|香港|HK/i)) {
        return "HK";
      } else if (area.match(/CN|China|大陆|中|内地|Mainland/i)) {
        return "CN";
      }
    }
    return "OT";
  };
  const getBDType = (size) => {
    const GBSize = size / 1e9;
    if (GBSize < 5) {
      return "DVD5";
    } else if (GBSize < 9) {
      return "DVD9";
    } else if (GBSize < 25) {
      return "BD25";
    } else if (GBSize < 50) {
      return "BD50";
    } else if (GBSize < 66) {
      return "BD66";
    } else if (GBSize < 100) {
      return "BD100";
    }
  };
  const getTMDBIdByIMDBId = async (imdbid) => {
    try {
      const url = `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`;
      const data = await fetch(url);
      const isMovie = data.movie_results && data.movie_results.length > 0;
      const isTV = data.tv_results && data.tv_results.length > 0;
      if (!isMovie && !isTV) {
        throw $t("请求失败");
      }
      const tmdbData = isMovie ? data.movie_results[0] : data.tv_results[0];
      return tmdbData;
    } catch (error) {
      console.log("getTMDBIdByIMDBId:", error);
      return {};
    }
  };
  const getTMDBVideos = async (tmdbId) => {
    const url = `${TMDB_API_URL}/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en`;
    const data = await fetch(url);
    return data.results || [];
  };
  const getIMDBIdByUrl = (imdbLink) => {
    const imdbIdArray = /tt\d+/.exec(imdbLink);
    if (imdbIdArray && imdbIdArray[0]) {
      return imdbIdArray[0];
    }
    return "";
  };
  const getSize = (size) => {
    if (!size) {
      return 0;
    }
    if (size.match(/T/i)) {
      return parseFloat(size) * 1024 * 1024 * 1024 * 1024 || 0;
    } else if (size.match(/G/i)) {
      return parseFloat(size) * 1024 * 1024 * 1024 || 0;
    } else if (size.match(/M/i)) {
      return parseFloat(size) * 1024 * 1024 || 0;
    } else if (size.match(/K/i)) {
      return parseFloat(size) * 1024 || 0;
    }
    return 0;
  };
  const getInfoFromMediaInfo = (mediaInfo) => {
    var _a2, _b, _c;
    if (!mediaInfo) {
      return {};
    }
    const mediaArray = mediaInfo.split(/\n\s*\n/).filter((item) => !!item.trim());
    const [generalPart, videoPart] = mediaArray;
    const secondVideoPart = mediaArray.filter((item) => item.startsWith("Video #2"));
    const [audioPart, ...otherAudioPart] = mediaArray.filter((item) => item.startsWith("Audio"));
    const textPart = mediaArray.filter((item) => item.startsWith("Text"));
    const completeName = getMediaValueByKey("Complete name", generalPart);
    const format2 = (_c = (_b = (_a2 = completeName == null ? void 0 : completeName.match(/\.(\w+)$/i)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.toLowerCase()) != null ? _c : "";
    const fileName = completeName.replace(/\.\w+$/i, "");
    const fileSize = getSize(getMediaValueByKey("File size", generalPart));
    const { videoCodec, hdrFormat, isDV } = getVideoCodecByMediaInfo(videoPart, generalPart, secondVideoPart);
    const { audioCodec, channelName, languageArray } = getAudioCodecByMediaInfo(audioPart, otherAudioPart);
    const subtitleLanguageArray = textPart.map((item) => {
      return getMediaValueByKey("Language", item);
    }).filter((sub) => !!sub);
    const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
    const resolution = getResolution$4(videoPart);
    return {
      fileName,
      fileSize,
      format: format2,
      subtitles: subtitleLanguageArray,
      videoCodec,
      audioCodec,
      resolution,
      mediaTags
    };
  };
  const getMediaValueByKey = (key, mediaInfo) => {
    var _a2, _b;
    if (!mediaInfo) {
      return "";
    }
    const keyRegStr = key.replace(/\s/, "\\s*").replace(/(\(|\))/g, "\\$1");
    const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\\n]+)`, "i");
    return (_b = (_a2 = mediaInfo.match(reg)) == null ? void 0 : _a2[1]) != null ? _b : "";
  };
  const getResolution$4 = (mediaInfo) => {
    const height = parseInt(getMediaValueByKey("Height", mediaInfo).replace(/\s/g, ""), 10);
    const width = parseInt(getMediaValueByKey("Width", mediaInfo).replace(/\s/g, ""), 10);
    const ScanType = getMediaValueByKey("Scan type", mediaInfo);
    if (height > 1080) {
      return "2160p";
    } else if (height > 720 && (ScanType === "Progressive" || !ScanType)) {
      return "1080p";
    } else if (height > 720 && ScanType !== "Progressive") {
      return "1080i";
    } else if (height > 576 || width > 1024) {
      return "720p";
    } else if (height > 480 || width === 1024) {
      return "576p";
    } else if (width >= 840 || height === 480) {
      return "480p";
    } else if (width && height) {
      return `${width}x${height}`;
    }
    return "";
  };
  const getMediaTags = (audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV) => {
    const hasChineseAudio = languageArray.includes("Chinese");
    const hasChineseSubtitle = subtitleLanguageArray.includes("Chinese");
    const mediaTags = {};
    if (hasChineseAudio) {
      mediaTags.chinese_audio = true;
    }
    if (languageArray.includes("Cantonese")) {
      mediaTags.cantonese_audio = true;
    }
    if (hasChineseSubtitle) {
      mediaTags.chinese_subtitle = true;
    }
    if (hdrFormat) {
      if (hdrFormat.match(/HDR10\+/i)) {
        mediaTags.hdr10_plus = true;
      } else if (hdrFormat.match(/HDR/i)) {
        mediaTags.hdr = true;
      }
    }
    if (isDV) {
      mediaTags.dolby_vision = true;
    }
    if (audioCodec.match(/dtsx|atmos/ig)) {
      mediaTags.dts_x = true;
    } else if (audioCodec.match(/atmos/ig)) {
      mediaTags.dolby_atmos = true;
    }
    return mediaTags;
  };
  const getVideoCodecByMediaInfo = (mainVideo, generalPart, secondVideo) => {
    const generalFormat = getMediaValueByKey("Format", generalPart);
    const videoFormat = getMediaValueByKey("Format", mainVideo);
    const videoFormatVersion = getMediaValueByKey("Format version", mainVideo);
    const videoCodeId = getMediaValueByKey("Codec ID", mainVideo);
    const hdrFormat = getMediaValueByKey("HDR format", mainVideo);
    const isDV = hdrFormat.match(/Dolby\s*Vision/i) || secondVideo.length > 0 && getMediaValueByKey("HDR format", secondVideo[0]).match(/Dolby\s*Vision/i);
    const isEncoded = !!getMediaValueByKey("Encoding settings", mainVideo);
    let videoCodec = "";
    if (generalFormat === "DVD Video") {
      videoCodec = "mpeg2";
    } else if (generalFormat === "MPEG-4") {
      videoCodec = "mpeg4";
    } else if (videoFormat === "MPEG Video" && videoFormatVersion === "Version 2") {
      videoCodec = "mpeg2";
    } else if (videoCodeId.match(/xvid/i)) {
      videoCodec = "xvid";
    } else if (videoFormat.match(/HEVC/i) && !isEncoded) {
      videoCodec = "hevc";
    } else if (videoFormat.match(/HEVC/i) && isEncoded) {
      videoCodec = "x265";
    } else if (videoFormat.match(/AVC/i) && isEncoded) {
      videoCodec = "x264";
    } else if (videoFormat.match(/AVC/i) && !isEncoded) {
      videoCodec = "h264";
    } else if (videoFormat.match(/VC-1/i)) {
      videoCodec = "vc1";
    } else if (videoFormat.match(/vvc/i)) {
      videoCodec = "vvc";
    }
    return {
      videoCodec,
      hdrFormat,
      isDV: !!isDV
    };
  };
  const getAudioCodecByMediaInfo = (mainAudio, otherAudio) => {
    const audioFormat = getMediaValueByKey("Format", mainAudio);
    const audioChannels = getMediaValueByKey("Channel(s)", mainAudio);
    const commercialName = getMediaValueByKey("Commercial name", mainAudio);
    const formateProfile = getMediaValueByKey("Format profile", mainAudio);
    const languageArray = [mainAudio, ...otherAudio].map((item) => {
      return getMediaValueByKey("Language", item);
    });
    let channelName = "";
    let audioCodec = "";
    const channelNumber = parseInt(audioChannels, 10);
    if (channelNumber && channelNumber >= 6) {
      channelName = `${channelNumber - 1}.1`;
    } else {
      channelName = `${channelNumber}.0`;
    }
    if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
      audioCodec = "atmos";
    } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
      audioCodec = "truehd";
    } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
      audioCodec = "dd+";
    } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital/i)) {
      audioCodec = "dd";
    } else if (audioFormat.match(/AC-3/i)) {
      audioCodec = "ac3";
    } else if (audioFormat.match(/DTS XLL X/i)) {
      audioCodec = "dtsx";
    } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
      audioCodec = "dtshdma";
    } else if (audioFormat.match(/DTS/i) && formateProfile.match(/MA \/ Core/i)) {
      audioCodec = "dtshdma";
    } else if (audioFormat.match(/DTS/i)) {
      audioCodec = "dts";
    } else if (audioFormat.match(/FLAC/i)) {
      audioCodec = "flac";
    } else if (audioFormat.match(/AAC/i)) {
      audioCodec = "aac";
    } else if (audioFormat.match(/LPCM/i)) {
      audioCodec = "lpcm";
    }
    return {
      audioCodec,
      channelName,
      languageArray
    };
  };
  const getInfoFromBDInfo = (bdInfo) => {
    var _a2, _b, _c, _d2, _e2;
    if (!bdInfo) {
      return {};
    }
    const splitArray = bdInfo.split("Disc Title");
    if (splitArray.length > 2) {
      bdInfo = splitArray[1];
    }
    const videoMatch = bdInfo.match(/VIDEO:(\s|Codec|Bitrate|Description|Language|-)*((.|\n)*)AUDIO:/i);
    const hasFileInfo = bdInfo.match(/FILES:/i);
    const subtitleReg = new RegExp(`SUBTITLE(S)*:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${hasFileInfo ? "FILES:" : ""}`, "i");
    const subtitleMatch = bdInfo.match(subtitleReg);
    const audioReg = new RegExp(`AUDIO:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${subtitleMatch ? "(SUBTITLE(S)?)" : hasFileInfo ? "FILES:" : ""}`, "i");
    const audioMatch = bdInfo.match(audioReg);
    const fileSize = (_b = (_a2 = bdInfo.match(/Disc\s*Size:\s*((\d|,| )+)bytes/)) == null ? void 0 : _a2[1]) == null ? void 0 : _b.replace(/,/g, "");
    const quickSummaryStyle = !bdInfo.match(/PLAYLIST REPORT/i);
    const videoPart = splitBDMediaInfo(videoMatch, 2);
    const [mainVideo = "", otherVideo = ""] = videoPart;
    const videoCodec = mainVideo.match(/2160/) ? "hevc" : "h264";
    const hdrFormat = (_d2 = (_c = mainVideo.match(/\/\s*HDR(\d)*(\+)*\s*\//i)) == null ? void 0 : _c[0]) != null ? _d2 : "";
    const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
    const audioPart = splitBDMediaInfo(audioMatch, 2);
    const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
    const resolution = (_e2 = mainVideo.match(/\d{3,4}(p|i)/)) == null ? void 0 : _e2[0];
    const { audioCodec = "", channelName = "", languageArray = [] } = getBDAudioInfo(audioPart, quickSummaryStyle);
    const subtitleLanguageArray = subtitlePart.map((item) => {
      var _a3, _b2, _c2, _d3;
      const quickStyleMatch = (_b2 = (_a3 = item.match(/(\w+)\s*\//)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      const normalMatch = (_d3 = (_c2 = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)) == null ? void 0 : _c2[1]) != null ? _d3 : "";
      const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
      return language;
    }).filter((sub) => !!sub);
    const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
    return {
      fileSize,
      videoCodec,
      subtitles: subtitleLanguageArray,
      audioCodec,
      resolution,
      mediaTags,
      format: "m2ts"
    };
  };
  const splitBDMediaInfo = (matchArray, matchIndex) => {
    var _a2, _b;
    return (_b = (_a2 = matchArray == null ? void 0 : matchArray[matchIndex]) == null ? void 0 : _a2.split("\n").filter((item) => !!item)) != null ? _b : [];
  };
  const getBDAudioInfo = (audioPart, quickSummaryStyle) => {
    var _a2, _b;
    if (audioPart.length < 1) {
      return {};
    }
    const sortArray = audioPart.sort((a2, b) => {
      var _a3, _b2, _c, _d2;
      const firstBitrate = parseInt((_b2 = (_a3 = a2.match(/\/\s*(\d+)\s*kbps/i)) == null ? void 0 : _a3[1]) != null ? _b2 : "", 10);
      const lastBitrate = parseInt((_d2 = (_c = b.match(/\/\s*(\d+)\s*kbps/i)) == null ? void 0 : _c[1]) != null ? _d2 : "", 10);
      return lastBitrate - firstBitrate;
    });
    const [mainAudio, secondAudio] = sortArray;
    const mainAudioCodec = getAudioCodecFromTitle(mainAudio);
    const secondAudioCodec = getAudioCodecFromTitle(secondAudio);
    let audioCodec = mainAudioCodec;
    let channelName = (_a2 = mainAudio.match(/\d\.\d/)) == null ? void 0 : _a2[0];
    if (mainAudioCodec === "lpcm" && secondAudioCodec === "dtshdma") {
      audioCodec = secondAudioCodec;
      channelName = (_b = mainAudio.match(/\d\.\d/)) == null ? void 0 : _b[0];
    }
    const languageArray = sortArray.map((item) => {
      var _a3, _b2, _c, _d2;
      const quickStyleMatch = (_b2 = (_a3 = item.match(/(\w+)\s*\//)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
      const normalMatch = (_d2 = (_c = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)) == null ? void 0 : _c[1]) != null ? _d2 : "";
      const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
      return language;
    });
    return {
      audioCodec,
      channelName,
      languageArray
    };
  };
  const wrappingBBCodeTag = ({ pre, post }, preTag, poTag) => {
    const isPre = typeof pre !== "undefined" && pre !== null;
    const isPost = typeof post !== "undefined" && post !== null;
    if (isPre) {
      pre.unshift(preTag);
    }
    if (isPost) {
      post.push(poTag);
    }
  };
  const getFilterBBCode = (content) => {
    var _a2;
    if (content) {
      const bbCodes = htmlToBBCode(content);
      return (_a2 = bbCodes == null ? void 0 : bbCodes.replace(/\[quote\]((.|\n)*?)\[\/quote\]/g, (match, p1) => {
        if (p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|商业用途|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/)) {
          return "";
        }
        return match;
      })) != null ? _a2 : "";
    }
    return "";
  };
  const rgb2hex = (rgb) => {
    var _a2;
    const result = (_a2 = rgb == null ? void 0 : rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) != null ? _a2 : [];
    return result.length === 4 ? `#${`0${parseInt(result[1], 10).toString(16)}`.slice(-2)}${`0${parseInt(result[2], 10).toString(16)}`.slice(-2)}${`0${parseInt(result[3], 10).toString(16)}`.slice(-2)}` : "";
  };
  const ensureProperColor = (color) => {
    if (/rgba?/.test(color)) return rgb2hex(color);
    return color;
  };
  const htmlToBBCode = (node) => {
    var _a2, _b, _c, _d2, _e2;
    const bbCodes = [];
    const pre = [];
    const post = [];
    const pp = wrappingBBCodeTag.bind(null, { pre, post });
    switch (node.nodeType) {
      case 1: {
        switch (node.tagName.toUpperCase()) {
          case "SCRIPT": {
            return "";
          }
          case "UL": {
            pp(null, null);
            break;
          }
          case "OL": {
            pp("[list=1]", "[/list]");
            break;
          }
          case "LI": {
            const { className } = node;
            if (CURRENT_SITE_INFO.siteType === "UNIT3D" && className) {
              return `[quote]${(_a2 = node == null ? void 0 : node.textContent) == null ? void 0 : _a2.trim()}[/quote]`;
            }
            pp("[*]", "\n");
            break;
          }
          case "B": {
            pp("[b]", "[/b]");
            break;
          }
          case "U": {
            pp("[u]", "[/u]");
            break;
          }
          case "I": {
            pp("[i]", "[/i]");
            break;
          }
          case "DIV": {
            const { className, id } = node;
            if (className === "codemain") {
              if (node.children[0]) {
                pp("\n[quote]", "[/quote]");
                break;
              } else {
                return "";
              }
            } else if (className === "hidden" && CURRENT_SITE_NAME === "HDT") {
              pp("\n[quote]", "[/quote]");
              break;
            } else if (className.match("spoiler") && CURRENT_SITE_NAME === "KG") {
              if (className === "spoiler-content") {
                pp("\n[quote]", "[/quote]");
              } else if (className === "spoiler-header") {
                return "";
              }
              break;
            } else if (CURRENT_SITE_NAME === "BeyondHD") {
              if (className === "spoilerChild") {
                if (node.children[0].tagName.toUpperCase() === "BLOCKQUOTE" || node.children[0].tagName.toUpperCase() === "PRE") pp("\n", "");
                else pp("\n[quote]", "[/quote]");
              } else if (id === "screenMain") {
                return "\n";
              } else if (className === "spoilerHide") {
                return "";
              }
              break;
            } else if (className === "spoiler-text" && CURRENT_SITE_INFO.siteType === "AvistaZ") {
              pp("\n[quote]", "[/quote]");
              break;
            } else if (className === "spoiler-toggle" && CURRENT_SITE_INFO.siteType === "AvistaZ") {
              return "";
            } else if (className.match(/codetop|highlight/) && CURRENT_SITE_INFO.siteType === "Bdc") {
              return "";
            } else {
              pp("\n", "\n");
              break;
            }
          }
          case "P": {
            pp("\n");
            break;
          }
          case "BR": {
            if (CURRENT_SITE_INFO.siteType === "NexusPHP" && CURRENT_SITE_NAME !== "OurBits" || (CURRENT_SITE_NAME == null ? void 0 : CURRENT_SITE_NAME.match(/^(UHDBits|HDBits|BTN)/))) {
              pp("");
            } else {
              pp("\n");
            }
            break;
          }
          case "SPAN": {
            const { className } = node;
            if (className.match(/size/)) {
              const matchSize = (_c = (_b = className.match(/size(\d)/)) == null ? void 0 : _b[1]) != null ? _c : "";
              if (matchSize) {
                pp(`[size=${matchSize}]`, "[/size]");
              }
            } else {
              pp(null, null);
            }
            break;
          }
          case "BLOCKQUOTE":
          case "PRE":
          case "FIELDSET": {
            pp("[quote]", "[/quote]");
            break;
          }
          case "CENTER": {
            pp("[center]", "[/center]");
            break;
          }
          case "TD": {
            if ((CURRENT_SITE_NAME == null ? void 0 : CURRENT_SITE_NAME.match(/^(TTG|HDBits|KG|HDSpace)/)) || CURRENT_SITE_NAME === "HDT" || CURRENT_SITE_INFO.siteType === "UNIT3D") {
              pp("[quote]", "[/quote]");
              break;
            } else if (CURRENT_SITE_NAME.match(/EMP|Bdc/)) {
              pp("");
              break;
            } else if (CURRENT_SITE_NAME === "PTer") {
              pp(null, null);
              break;
            } else {
              return "";
            }
          }
          case "IMG": {
            let imgUrl = "";
            const { src, title } = node;
            const dataSrc = node.getAttribute("data-src") || node.getAttribute("data-echo");
            const layerSrc = node.getAttribute("layer-src");
            if (title === ":m:") {
              return ":m:";
            }
            if (layerSrc) {
              imgUrl = layerSrc;
            } else if (dataSrc) {
              imgUrl = dataSrc.match(/(http(s)?:)?\/\//) ? dataSrc : `${location.origin}/${dataSrc}`;
            } else if (src && src.match(/broadcity\.eu\/images\/44846549843542759058\.png/)) {
              return "";
            } else if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
              imgUrl = src;
            } else {
              return "";
            }
            return `[img]${imgUrl}[/img]`;
          }
          case "FONT": {
            const { color: color2, size } = node;
            if (color2) {
              pp(`[color=${ensureProperColor(color2)}]`, "[/color]");
            }
            if (size) {
              pp(`[size=${size}]`, "[/size]");
            }
            break;
          }
          case "A": {
            const { href, textContent } = node;
            if (href && href.length > 0) {
              if (CURRENT_SITE_NAME === "HDSpace") {
                const div = jQuery(node).find("div");
                if (div[0] && div.attr("id")) {
                  const imgUrl = div.find("img").attr("src");
                  return `[url=${href}][img]${imgUrl}[/img][/url]`;
                }
              } else if (href.match(/javascript:void/) || textContent === "show" && CURRENT_SITE_NAME === "HDT") {
                return "";
              } else {
                pp(`[url=${href}]`, "[/url]");
              }
            }
            break;
          }
          case "H1": {
            pp('[b][size="7"]', "[/size][/b]\n");
            break;
          }
          case "H2": {
            pp('[b][size="6"]', "[/size][/b]\n");
            break;
          }
          case "H3": {
            pp('[b][size="5"]', "[/size][/b]\n");
            break;
          }
          case "H4": {
            pp('[b][size="4"]', "[/size][/b]\n");
            break;
          }
          case "STRONG": {
            pp("[b]", "[/b]");
            break;
          }
          case "TABLE": {
            if (CURRENT_SITE_NAME === "PTer" && node.className === "table") {
              return "";
            }
            pp("");
            break;
          }
          case "TH": {
            pp("");
            break;
          }
        }
        const { textAlign, fontWeight, fontStyle, textDecoration, color } = node.style;
        if (textAlign) {
          switch (textAlign.toUpperCase()) {
            case "LEFT": {
              pp("[left]", "[/left]");
              break;
            }
            case "RIGHT": {
              pp("[right]", "[/right]");
              break;
            }
            case "CENTER": {
              pp("[center]", "[/center]");
              break;
            }
          }
        }
        if (fontWeight === "bold" || ~~fontWeight >= 600) {
          pp("[b]", "[/b]");
        }
        if (fontStyle === "italic") pp("[i]", "[/i]");
        if (textDecoration === "underline") pp("[u]", "[/u]");
        if (color && color.trim() !== "") pp(`[color=${ensureProperColor(color)}]`, "[/color]");
        break;
      }
      case 3: {
        if ((_e2 = (_d2 = node == null ? void 0 : node.textContent) == null ? void 0 : _d2.trim()) == null ? void 0 : _e2.match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\]|\[Show\])/)) {
          return "";
        }
        return node.textContent;
      }
      default:
        return null;
    }
    node.childNodes.forEach((node2) => {
      const code2 = htmlToBBCode(node2);
      if (code2) {
        bbCodes.push(code2);
      }
    });
    return pre.concat(bbCodes).concat(post).join("");
  };
  const getTagsFromSubtitle = (title) => {
    const tags = {};
    if (title.match(/diy/i)) {
      tags.diy = true;
    }
    if (title.match(/国配|国语|普通话|国粤/i) && !title.match(/多国语(言|字幕)/)) {
      tags.chinese_audio = true;
    }
    if (title.match(/Atmos|杜比全景声/i)) {
      tags.dolby_atoms = true;
    }
    if (title.match(/HDR/i)) {
      if (title.match(/HDR10\+/i)) {
        tags.hdr10_plus = true;
      } else {
        tags.hdr = true;
      }
    }
    if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
      tags.dolby_vision = true;
    }
    if (title.match(/粤/i)) {
      tags.cantonese_audio = true;
    }
    if (title.match(/简繁|繁简|繁体|简体|中字|中英|中文/i) && !title.match(/无中(字|文)/)) {
      tags.chinese_subtitle = true;
    }
    if (title.match(/Criterion|CC标准/i)) {
      tags.the_criterion_collection = true;
    }
    if (title.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|禁止转载|exclusive/)) {
      tags.exclusive = true;
    }
    return tags;
  };
  const getBDInfoOrMediaInfo = (bbcode) => {
    var _a2, _b, _c;
    const quoteList = (_a2 = bbcode == null ? void 0 : bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g)) != null ? _a2 : [];
    const bdinfo = [];
    const mediaInfo = [];
    quoteList.forEach((quote) => {
      const quoteContent = quote.replace(/\[\/?quote\]/g, "").replace(/\u200D/g, "");
      if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
        bdinfo.push(quoteContent);
      }
      if (quoteContent.match(/(Unique\s*ID)|(Codec\s*ID)|(Stream\s*size)/i)) {
        mediaInfo.push(quoteContent);
      }
    });
    if (!bdinfo.length) {
      const bdinfoMatch = (_c = (_b = bbcode.match(/Disc\s+(Info|Title|Label)[^[]+/i)) == null ? void 0 : _b[0]) != null ? _c : "";
      if (bdinfoMatch) {
        bdinfo.push(bdinfoMatch);
      }
    }
    return {
      bdinfo,
      mediaInfo
    };
  };
  const replaceRegSymbols = (string) => {
    return string.replace(/([*.?+$^[\](){}|\\/])/g, "\\$1");
  };
  const getRtIdFromTitle = async (title, tv, year) => {
    var _a2;
    console.log("%s", title, year);
    const MAX_YEAR_DIFF = 2;
    tv = tv || false;
    const yearVal = parseInt(year, 10) || 1800;
    const url = `https://www.rottentomatoes.com/api/private/v2.0/search/?limit=2&q=${title}`;
    const data = await fetch(url);
    const movies = tv ? data.tvSeries : data.movies;
    if (!Array.isArray(movies) || movies.length < 1) {
      console.log("no search results");
      return {};
    }
    const sorted = movies.concat();
    if (year && sorted) {
      sorted.sort((a2, b) => {
        if (Math.abs(a2.year - yearVal) !== Math.abs(b.year - yearVal)) {
          return Math.abs(a2.year - yearVal) - Math.abs(b.year - yearVal);
        }
        return b.year - a2.year;
      });
    }
    let bestMatch, closeMatch;
    for (const m2 of sorted) {
      m2.title = m2.title || m2.name;
      if (m2.title.toLowerCase() === title.toLowerCase()) {
        bestMatch = bestMatch || m2;
        console.log("bestMatch", bestMatch);
      } else if (m2.title.toLowerCase().startsWith(title.toLowerCase())) {
        closeMatch = closeMatch || m2;
        console.log("closeMatch", closeMatch);
      }
      if (bestMatch && closeMatch) {
        break;
      }
    }
    const yearComp = (imdb, rt) => {
      return rt - imdb <= MAX_YEAR_DIFF && imdb - rt < MAX_YEAR_DIFF;
    };
    if (yearVal && (!bestMatch || !yearComp(yearVal, bestMatch.year))) {
      if (closeMatch && yearComp(yearVal, closeMatch.year)) {
        bestMatch = closeMatch;
      } else if (yearComp(yearVal, sorted[0].year)) {
        bestMatch = sorted[0];
      }
    }
    bestMatch = bestMatch || closeMatch || movies[0];
    if (bestMatch) {
      const id = bestMatch && bestMatch.url.replace(/\/s\d{2}\/?$/, "");
      const score = (_a2 = bestMatch == null ? void 0 : bestMatch.meterScore) != null ? _a2 : "0";
      return {
        id,
        score
      };
    }
    console.log("no match found on rt");
    return {};
  };
  const uploadToPtpImg = async (imgArray, isFiles = false) => {
    try {
      const apiKey = getValue("easy-seed.ptp-img-api-key", false);
      if (!apiKey) {
        Jt.error(`${$t("ptpimg上传失败")} ${$t("请到配置面板中填入ptpimg的api_key")}`);
        return;
      }
      const options2 = {
        method: "POST",
        responseType: "json"
      };
      if (isFiles) {
        const formData = new FormData();
        imgArray.forEach((img, index) => {
          formData.append(`file-upload[${index}]`, img);
        });
        formData.append("api_key", apiKey);
        options2.data = formData;
      } else {
        const data2 = `link-upload=${imgArray.join("\n")}&api_key=${apiKey}`;
        options2.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
        options2.data = data2;
      }
      const data = await fetch("https://ptpimg.me/upload.php", options2);
      if (!data) {
        throw $t("上传失败，请重试");
      }
      let imgResultList = [];
      if (data && data.length) {
        imgResultList = data.map((img) => {
          return `https://ptpimg.me/${img.code}.${img.ext}`;
        });
        return imgResultList;
      }
      throw $t("上传失败，请重试");
    } catch (error) {
      handleError(error);
    }
  };
  const $t = (key) => {
    const languageKey = BROWSER_LANGUAGE;
    return i18nConfig[languageKey][key] || key;
  };
  const urlToFile = async (url) => {
    var _a2, _b;
    const filename = (_b = (_a2 = url.match(/\/([^/]+)$/)) == null ? void 0 : _a2[1]) != null ? _b : "filename";
    const data = await fetch(url, {
      responseType: "blob"
    });
    const file = new File([data], filename, { type: data.type });
    return file;
  };
  const saveScreenshotsToPtpimg = async (imgArray) => {
    try {
      const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
      const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
      if (isPtpHost) {
        throw $t("无需转存");
      } else if (isHdbHost) {
        const promiseArray = imgArray.map((item) => {
          return urlToFile(item);
        });
        const fileArray = await Promise.all(promiseArray);
        const data = uploadToPtpImg(fileArray, true);
        return data;
      } else {
        const data = await uploadToPtpImg(imgArray);
        return data;
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getValue = (key, needParse = true) => {
    const data = GM_getValue(key);
    if (data && needParse) {
      return JSON.parse(data);
    }
    return data;
  };
  const fetch = (url, options2) => {
    return new Promise((resolve2, reject) => {
      GM_xmlhttpRequest(__spreadProps(__spreadValues({
        method: "GET",
        url,
        responseType: "json"
      }, options2), {
        onload: (res) => {
          const { statusText, status, response } = res;
          if (status !== 200) {
            reject(new Error(statusText || `${status}`));
          } else {
            resolve2(response);
          }
        },
        ontimeout: () => {
          reject(new Error("timeout"));
        },
        onerror: (error) => {
          reject(error);
        }
      }));
    });
  };
  const getTvSeasonData$1 = async (data) => {
    var _a2, _b;
    const { title: torrentTitle } = TORRENT_INFO;
    const { season = "", title } = data;
    if (season) {
      const seasonNumber = (_b = (_a2 = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)) == null ? void 0 : _a2[1]) != null ? _b : "1";
      if (parseInt(seasonNumber, 10) === 1) {
        return data;
      }
      const query = title.replace(/第.+?季/, `第${seasonNumber}季`);
      const response = await getDoubanIdByIMDB(query);
      return response;
    }
  };
  const getSpecsFromMediainfo$1 = (isBluray, mediaInfo) => {
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfo);
    if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
      return {
        videoCodec,
        audioCodec,
        resolution,
        mediaTags
      };
    }
    return {};
  };
  const getScreenshotsBBCode = (imgArray) => {
    return imgArray.map((img) => {
      if (img.match(/\[url=.+\]/i)) {
        return img;
      }
      return `[img]${img}[/img]`;
    });
  };
  const getTeamName = (info) => {
    var _a2, _b, _c;
    const teamMatch = info.title.match(/-([^-]+)$/);
    let teamName = (_c = (_b = (_a2 = teamMatch == null ? void 0 : teamMatch[1]) == null ? void 0 : _a2.replace(/-/g, "")) == null ? void 0 : _b.split("@")) != null ? _c : "";
    if (teamName) {
      teamName = teamName.length > 1 ? teamName[1] : teamName[0];
    } else {
      teamName = "other";
    }
    return teamName;
  };
  const matchSelectForm = (siteInfo, movieInfo, key, selectArray) => {
    const valueArray = siteInfo[key] ? siteInfo[key].map[movieInfo[key]] : "";
    if (Array.isArray(valueArray) && selectArray) {
      if (siteInfo[key].selector) {
        setSelectValue(siteInfo[key].selector, valueArray.shift());
      }
      if (selectArray.length > 1) {
        selectArray = selectArray.filter((item) => valueArray.includes(item));
      }
    } else if (siteInfo[key] && siteInfo[key].selector) {
      setSelectValue(siteInfo[key].selector, valueArray);
    }
    return selectArray;
  };
  function setSelectValue(selector, value) {
    if (CURRENT_SITE_NAME === "MTeam") {
      const select = document.querySelector(selector);
      if (select) {
        const lastValue = select.value;
        select.value = value;
        const tracker = select._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        const event = new Event("change", { bubbles: true });
        select.dispatchEvent(event);
        setTimeout(() => {
          Array.from(document.querySelectorAll(".ant-select-item-option-active .ant-select-item-option-content")).forEach((el) => {
            el.dispatchEvent(new Event("click", { bubbles: true }));
          });
        }, 1e3);
      }
    } else {
      jQuery(selector).val(value);
    }
  }
  function buildPTPDescription(info) {
    let text2 = info.originalDescription || "";
    text2 = text2.replace(/http:\/\/ptpimg\.me/g, "https://ptpimg.me");
    for (const mediainfo of info.mediaInfos) {
      text2 = text2.replace(mediainfo, "");
    }
    text2 = text2.replace(/\[(mediainfo|bdinfo)\][\s\S]*?\[\/(mediainfo|bdinfo)\]/gi, "");
    text2 = text2.replace(/^(?!\[img\])https:\/\/ptpimg.me.*?png(?!\[\/img\])$/gim, (imgUrl) => {
      return `[img]${imgUrl}[/img]`;
    });
    text2 = text2.replace(/\[comparison.*\][\s\S]*\[\/comparison\]/gi, (comparisonText) => {
      return comparisonText.replace(/\[img\]/g, "").replace(/\[\/img\]/g, "").split("https://ptpimg.me").join("\nhttps://ptpimg.me").replace(/\s*\n\s*/g, "\n");
    });
    text2 = text2.replace(/\[hide(.*)?\]\s*\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\[\/hide\]/gi, (imgText) => {
      var _a2;
      const imgs = [];
      for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
        imgs.push(urlMatch[1]);
      }
      const rawTitle = ((_a2 = imgText.match(/^\[hide=(.*?)\]/)) == null ? void 0 : _a2[1]) || "";
      const comparisonTitles = rawTitle.trim().split(/\||\/|,|vs\.?| - /i).map((v2) => v2.trim());
      if (comparisonTitles.length >= 2) {
        return `[comparison=${comparisonTitles.join(", ")}]
${imgs.join("\n")}
[/comparison]
`;
      }
      const hideTitle = rawTitle ? `=${rawTitle}` : "";
      return `[hide${hideTitle}]
[img]${imgs.join("[/img]\n[img]")}[/img]
[/hide]
`;
    });
    text2 = `${text2}

`;
    text2 = text2.replace(/\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\n\n/gi, (imgText) => {
      const imgs = [];
      for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
        imgs.push(urlMatch[1]);
      }
      return `[hide]
[img]${imgs.join("[/img]\n[img]")}[/img]
[/hide]
`;
    });
    text2 = text2.replace(/\[img=(.+)?\](\n\n)?/gi, "[img]$1[/img]");
    text2 = text2.replace(/\[(\/)?IMG\]/g, "[$1img]");
    text2 = text2.replace(/\n\s*\n/g, "\n\n");
    return text2.trim();
  }
  const isChineseTacker = (siteType) => {
    return siteType.match(/NexusPHP|TTG|TNode|MTeam/);
  };
  const filterNexusDescription = (info) => {
    const { description } = info;
    let filterDescription = "";
    const quoteList = description.match(/\[quote(=\w+)?\](.|\n)+?\[\/quote\]/g);
    if (quoteList && quoteList.length > 0) {
      quoteList.forEach((quote) => {
        const isMediaInfoOrBDInfo = quote.match(/Disc\s?Size|\.mpls|Unique\s?ID|唯一ID|Resolution/i);
        if (!quote.match(/[\u4e00-\u9fa5]+/i) || isMediaInfoOrBDInfo) {
          filterDescription += `${quote}
`;
        }
      });
    }
    const allImages = getFilterImages(description);
    return `${filterDescription}
${allImages.join("")}`;
  };
  const filterEmptyTags = (description) => {
    const reg = new RegExp("\\[(?!info)([a-zA-Z]+\\d?)(?:=(?:\\w|\\s)+)?\\]\\s*\\[\\/(\\w+)\\]", "g");
    if (description.match(reg)) {
      description = description.replace(reg, (_match, p1, p2) => {
        if (p1 === p2) {
          return "";
        }
        return _match;
      });
      return filterEmptyTags(description);
    }
    return description;
  };
  const fixTorrentTitle = (title, isWebSource) => {
    let fixedTitle = title.replace(" DoVi ", " DV ").replace(" DDP ", " DD+ ");
    if (isWebSource) fixedTitle = fixedTitle.replace(" HEVC", " H.265");
    return fixedTitle;
  };
  const base64ToBlob = (base64, contentType = "application/x-bittorrent", sliceSize = 512) => {
    const regStr = new RegExp(`data:${contentType};base64,`, "i");
    const byteCharacters = window.atob(base64.replace(regStr, ""));
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  };
  const handleITS = async (info) => {
    var _a2, _b, _c, _d2, _e2, _f, _g;
    let template = `[center]

  [img]$poster$[/img]
  
  [url=$imdbUrl$][img]https://i.ibb.co/KD855ZM/IMDb-Logo-2016.png[/img][/url][size=3]$imdbScore$[/size][*][url=$rtUrl$][img]https://i.ibb.co/BwtmdcV/rottentomatoes-logo.png[/img][/url][size=3]$rtScore$[/size][*][size=3][url=$tmdbUrl$][img]https://i.ibb.co/HhgF1gC/tmdb-logo.png[/img][/url]$tmdbScore$[/size]


  [color=DarkOrange][size=2]◢ SYNOPSIS ◣[/size][/color]
  $synopsis$
  
  [color=DarkOrange][size=2]◢ TRAILER ◣[/size][/color]
  [youtube]$youtubeUrl$[/youtube]

  [color=DarkOrange][size=2]◢ SCREENSHOTS ◣[/size][/color]
  [box][hide]$SCREENSHOTS$[/hide][/box]
  
  [/center]`;
    const collectionMap = {};
    jQuery('select[name="collection_id1"] option').each(function() {
      const option = jQuery(this);
      collectionMap[option.text()] = option.val();
    });
    const collectionValueArr = [];
    const teamName = getTeamName(info);
    if (collectionMap[teamName]) {
      collectionValueArr.push(collectionMap[teamName]);
    }
    const { imdbUrl, category, screenshots, comparisons = [], resolution, movieName } = info;
    if (!resolution.match(/2160|1080|720/) && category === "movie") {
      jQuery('select[name="type"]').val("67");
    }
    const screenshotsBBCode = getScreenshotsBBCode(screenshots);
    template = template.replace("$SCREENSHOTS$", screenshotsBBCode.join("\n"));
    const comparisonImgs = comparisons.flatMap((v2) => v2.imgs);
    if (comparisonImgs.length > 0) {
      const comparisonImgsBBCode = getScreenshotsBBCode(comparisonImgs);
      template = template.replace(/(\[\/center\])$/, `[color=DarkOrange][size=2]◢ COMPARISONS ◣[/size][/color]


    [box][hide]${comparisonImgsBBCode.join(" ")}[/hide][/box]

$1`);
    }
    if (category.match(/tv|movie|cartoon|documentary/)) {
      jQuery('textarea[name="descr"]').val($t("数据加载中..."));
      try {
        const replaceParams = {
          tmdbUrl: "",
          tmdbScore: "0",
          imdbScore: "0",
          imdbUrl,
          poster: "",
          synopsis: "",
          rtUrl: "",
          rtScore: "0",
          youtubeUrl: ""
        };
        const imdbData = await getIMDBData(imdbUrl);
        if (imdbData) {
          const {
            poster = "",
            imdb_rating_average: imdbRate,
            description = "",
            directors = [],
            details,
            aka,
            year
          } = imdbData;
          let language = details.Languages || "";
          language = (_c = (_b = (_a2 = language == null ? void 0 : language.split("|")) == null ? void 0 : _a2[0]) == null ? void 0 : _b.trim()) != null ? _c : "";
          const director = directors.map((item) => item.name)[0];
          if (collectionMap[director]) {
            collectionValueArr.push(collectionMap[director]);
          }
          if (collectionMap[language]) {
            collectionValueArr.push(collectionMap[language]);
          }
          collectionValueArr.forEach((value, index) => {
            jQuery(`select[name="collection_id${index + 1}"]`).val(value);
          });
          replaceParams.poster = poster;
          replaceParams.synopsis = description;
          replaceParams.imdbScore = imdbRate;
          const searchMovieName = movieName || ((_d2 = aka.filter((item) => item.country.match(/(World-wide)|UK|USA/))) == null ? void 0 : _d2[0].title);
          const rtInfo = await getRtIdFromTitle(searchMovieName, !!category.match(/tv/), year);
          const { score = 0, id = "" } = rtInfo;
          replaceParams.rtScore = `${score}%`;
          replaceParams.rtUrl = `https://www.rottentomatoes.com/${id}`;
          const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
          if (ptpImgApiKey) {
            const ptpImgPoster = await uploadToPtpImg([poster]);
            replaceParams.poster = ptpImgPoster ? ptpImgPoster[0] : "";
          }
        }
        const imdbId = getIMDBIdByUrl(imdbUrl);
        const { id: tmdbId, vote_average: tmdbRate } = await getTMDBIdByIMDBId(imdbId);
        if (tmdbId) {
          replaceParams.tmdbUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
          replaceParams.tmdbScore = tmdbRate;
          const videos = await getTMDBVideos(tmdbId);
          const youtubeId = (_g = (_f = (_e2 = videos.filter((video) => video.site === "YouTube")) == null ? void 0 : _e2[0]) == null ? void 0 : _f.key) != null ? _g : "";
          if (youtubeId.length > 0) {
            replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
          }
        }
        Object.keys(replaceParams).forEach((key) => {
          template = template.replace(`$${key}$`, replaceParams[key] || "");
        });
        jQuery('textarea[name="descr"]').val(template);
      } catch (error) {
        jQuery('textarea[name="descr"]').val(error.message);
      }
    }
  };
  const handleTJUPT = (info) => {
    const observer = new MutationObserver(() => {
      if (jQuery("#ename")[0] && jQuery("#cname")[0]) {
        fillInfo(info);
        observer.disconnect();
      }
    });
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  };
  function fillInfo(info) {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j;
    const { title, description, doubanInfo, category, tags } = info;
    jQuery("#ename").val(title);
    const fullDescription = description + doubanInfo;
    let area = (_b = (_a2 = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a2[2]) != null ? _b : "";
    area = area.replace(/\[\/?.+?\]/g, "");
    const originalName = (_d2 = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d2 : "";
    const translateName = (_h = (_g = (_f = (_e2 = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e2[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    const language = (_j = (_i = fullDescription.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _i[2]) != null ? _j : "";
    if (area) {
      const areaString = area.replace(/,/g, "/").replace(/\s|中国/g, "");
      if (category === "movie") {
        jQuery("#district").val(areaString);
      } else if (category.match(/tv/)) {
        const areaToSelectorMap = {
          大陆: "#specificcat1",
          "台|港": "#specificcat2",
          美国: "#specificcat3",
          日本: "#specificcat4",
          韩国: "#specificcat5",
          英国: "#specificcat6",
          泰剧: "#specificcat7"
        };
        let selector = "";
        for (const [key, value] of Object.entries(areaToSelectorMap)) {
          if (area.match(new RegExp(key))) {
            selector = value;
            break;
          }
        }
        if (selector) {
          jQuery(selector).attr("checked", "true");
          getcheckboxvalue("specificcat");
        } else {
          jQuery("#specificcat").val(areaString);
        }
      } else if (category.match(/variety/)) {
        const districtMap = {
          CN: "#district1",
          HK: "#district2",
          TW: "#district2",
          JP: "#district4",
          KR: "#district4",
          US: "#district3",
          EU: "#district3",
          OT: "#district5"
        };
        jQuery(districtMap[info.area]).attr("checked", "true");
        getcheckboxvalue("district");
      }
    }
    if (jQuery("#language")) {
      let selector = "";
      if (language) {
        if (language.match(/汉语/)) {
          selector = "#language1";
        } else if (language.match(/粤/)) {
          selector = "#language2";
        } else if (language.match(/英语/)) {
          selector = "#language3";
        } else if (language.match(/日语/)) {
          selector = "#language4";
        } else if (language.match(/韩语/)) {
          selector = "#language5";
        }
        jQuery(selector).attr("checked", "true");
        getcheckboxvalue("language");
      }
    }
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
    }
    jQuery("#cname").val(chineseName);
    if (tags.chinese_subtitle && !tags.chinese_audio) {
      jQuery('input[name="chinese"]').attr("checked", "true");
    }
  }
  const handleHDRoute = (info) => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k, _l;
    const { description, doubanInfo } = info;
    const fullDescription = description + doubanInfo;
    const imdbRank = (_b = (_a2 = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)) == null ? void 0 : _a2[1]) != null ? _b : "";
    jQuery("#upload-imdb").val(imdbRank);
    const originalName = (_d2 = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d2 : "";
    const translateName = (_h = (_g = (_f = (_e2 = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e2[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    const summary = (_l = (_k = (_j = (_i = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)) == null ? void 0 : _i[2]) == null ? void 0 : _j.split("/")) == null ? void 0 : _k[0]) != null ? _l : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : originalName;
    }
    jQuery("#title_chs").val(chineseName);
    jQuery("#upload_introduction").val(summary);
  };
  const handleBib = (info) => {
    var _a2;
    if (!info.doubanBookInfo) {
      return;
    }
    const { year, pager, translator, author, publisher, ISBN, book_intro: intro, poster } = info.doubanBookInfo;
    jQuery("#AuthorsField").val(author.join(","));
    jQuery("#PublishersField").val(publisher);
    jQuery("#IsbnField").val(ISBN);
    jQuery("#YearField").val(year);
    jQuery("#PagesField").val(pager);
    jQuery("#LanguageField").val("17");
    jQuery("#inputFileID").replaceWith('<textarea name="DescriptionField" id="DescriptionField" rows="15" cols="90"></textarea>');
    jQuery("#TranslatorsField").val(translator.join(","));
    jQuery("#DescriptionField").val(intro);
    jQuery("#ImageField").val(poster);
    const event = new Event("change");
    (_a2 = document.getElementById("DescriptionField")) == null ? void 0 : _a2.dispatchEvent(event);
  };
  const handlePTN = (info) => {
    const { resolution, videoType, source } = info;
    let format2 = "";
    const formatMap2 = {
      remux: "Remux",
      web: "WebRip",
      dvd: "DVDR",
      dvdrip: "DVDRip",
      "720p": "720P",
      "1080p": "1080P",
      "2160p": "2160P"
    };
    if (videoType.match(/bluray/)) {
      format2 = "BluRay";
    } else if (videoType === "encode" && source === "bluray") {
      format2 = formatMap2[resolution];
    } else {
      format2 = formatMap2[videoType] || "";
    }
    jQuery("#format").val(format2);
  };
  const SITE_OPERATIONS = {
    PTSBAO: {
      beforeHandler: () => {
        if (localStorage.getItem("autosave")) {
          localStorage.removeItem("autosave");
        }
      },
      afterHandler: (info) => {
        jQuery('a[data-sceditor-command="source"]')[0].click();
        jQuery(CURRENT_SITE_INFO.description.selector).val(info.description);
      }
    },
    Concertos: {
      handleDescription: (info) => {
        let { description, mediaInfos } = info;
        jQuery("#add").trigger("click");
        jQuery(".sceditor-button.sceditor-button-source.has-icon")[0].click();
        mediaInfos.forEach((mediaInfo) => {
          description = description.replace(mediaInfo.trim(), "");
        });
        return description;
      }
    },
    PTer: {
      handleDescription: (info) => {
        var _a2, _b;
        let description = info.description;
        const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
        mediaInfo.forEach((info2) => {
          description = description.replace(`[quote]${info2}[/quote]`, `[hide=mediainfo]${info2}[/hide]`);
        });
        bdinfo.forEach((info2) => {
          description = description.replace(`[quote]${info2}[/quote]`, `[hide=BDInfo]${info2}[/hide]`);
        });
        if ((_a2 = info.comparisons) == null ? void 0 : _a2.length) {
          for (const comparison of info.comparisons) {
            const { title, imgs } = comparison;
            const titleCount = (_b = title == null ? void 0 : title.split(",").length) != null ? _b : "";
            imgs.forEach((img) => {
              description = description.replace(`[img]${img}[/img]`, `[img${titleCount}]${img}[/img]`);
            });
          }
        }
        return description;
      },
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      },
      afterHandler: (info) => {
        var _a2, _b;
        const language = (_b = (_a2 = info.description.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _a2[2]) != null ? _b : "";
        if (!language.match(/英语/) && info.area === "EU") {
          jQuery(CURRENT_SITE_INFO.area.selector).val("8");
        }
      }
    },
    Blutopia: {
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      }
    },
    fearnopeer: {
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      }
    },
    Aither: {
      titleHandler: (info) => {
        const isWebSource = !!info.source.match(/web/gi);
        const title = fixTorrentTitle(info.title, isWebSource);
        info.title = title;
        return info;
      }
    },
    KEEPFRDS: {
      handleDescription: (info) => {
        var _a2, _b, _c;
        let { description, screenshots } = info;
        description = description.replace(/\[\/?(center|code)\]/g, "");
        if (info.sourceSite === "PTP") {
          description = (_b = (_a2 = info == null ? void 0 : info.originalDescription) == null ? void 0 : _a2.replace(/^(\s+)/g, "")) != null ? _b : "";
          description = filterEmptyTags(description);
          description = description.replace(/http:\/\/ptpimg/g, "https://ptpimg");
          screenshots.forEach((screenshot) => {
            const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, "i");
            if (!description.match(regStr)) {
              const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, "i");
              if (description.match(regOldFormat)) {
                description = description.replace(regOldFormat, `[img]${screenshot}[/img]`);
              } else {
                description = description.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, "gi"), `[img]${screenshot}[/img]`);
              }
            }
          });
        } else if (info.sourceSite === "RED") {
          description = description.replace(/\[#\]/g, "[*]");
        }
        jQuery("#torrent").on("change", () => {
          if (info.category !== "music") {
            jQuery(CURRENT_SITE_INFO.name.selector).val(info.title);
            if (info.subtitle) jQuery(CURRENT_SITE_INFO.subtitle.selector).val(info.subtitle);
          } else {
            jQuery(CURRENT_SITE_INFO.name.selector).val(info.subtitle || "");
            if (info.subtitle) jQuery(CURRENT_SITE_INFO.subtitle.selector).val(info.title);
          }
        });
        (_c = info.mediaInfos) == null ? void 0 : _c.forEach((mediaInfo) => {
          if (!/\[mediainfo\]/.test(description)) {
            description = description.replace(`[quote]${mediaInfo}[/quote]`, `[mediainfo]${mediaInfo}[/mediainfo]`);
          }
        });
        return description;
      },
      titleHandler: (info) => {
        if (info.category === "music") {
          const subtitle = info.title;
          if (info.subtitle !== void 0) info.title = info.subtitle;
          info.subtitle = subtitle;
        } else if (info.subtitle === "") {
          info.subtitle = info.title;
        }
        return info;
      }
    },
    SpeedApp: {
      handleDescription: (info) => {
        let { description } = info;
        description = description.replace(/\[url.*\[\/url\]/g, "").replace(/\[img.*\[\/img\]/g, "").replace(/\[\/?(i|b|center|quote|size|color)\]/g, "").replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, "").replace(/\n\n*/g, "\n");
        return description;
      },
      afterHandler: (info) => {
        if (info.imdbId) {
          jQuery(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${info.imdbId}/`);
        }
      }
    },
    PTN: {
      handleDescription: (info) => {
        let { description, imdbUrl } = info;
        description = `${imdbUrl}

${description}`;
        return description;
      },
      afterHandler: (info) => {
        handlePTN(info);
      }
    },
    HDT: {
      handleDescription: (info) => {
        let { description } = info;
        description = description.replace(/(\[\/img\])(\[img\])/g, "$1 $2").replace(/(\[\/url\])(\[url)/g, "$1 $2");
        return description;
      },
      afterHandler: (info) => {
        if (info.category !== "tvPack") {
          jQuery('select[name="season"').val("true");
        }
        if (info.imdbId) {
          jQuery(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${info.imdbId}/`);
        }
      }
    },
    HDRoute: {
      afterHandler: (info) => {
        handleHDRoute(info);
      }
    },
    HDBits: {
      titleHandler: (info) => {
        let mediaTitle = info.title.replace(/([^\d]+)\s+([12][90]\d{2})/, (match, p1, p2) => {
          return `${info.movieName || info.movieAkaName} ${p2}`;
        });
        if (info.videoType === "remux") {
          mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/ig, "");
        }
        info.title = mediaTitle;
        return info;
      }
    },
    SSD: {
      afterHandler: (info) => {
        if (info.category === "tvPack" || info.title.match(/Trilogy|Collection/i) || info.subtitle && info.subtitle.match(/合集/)) {
          jQuery('input[name="pack"]').attr("checked", "true");
        }
        jQuery(CURRENT_SITE_INFO.imdb.selector).val(info.doubanUrl || info.imdbUrl);
        jQuery(CURRENT_SITE_INFO.screenshots.selector).val(info.screenshots.join("\n"));
      }
    },
    HDU: {
      afterHandler: (info) => {
        let videoTypeValue = "";
        const { resolution, videoType, category } = info;
        const isTV = category.match(/tv/);
        if (videoType === "remux") {
          if (resolution === "2160p") {
            videoTypeValue = isTV ? "16" : "15";
          } else {
            videoTypeValue = isTV ? "12" : "3";
          }
        }
        if (isTV) {
          if (videoType === "encode") {
            videoTypeValue = "14";
          } else if (videoType === "web") {
            videoTypeValue = "13";
          }
        }
        if (videoTypeValue) {
          jQuery(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
        }
      }
    },
    TJUPT: {
      handleDescription: (info) => {
        let { description } = info;
        const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
        [...mediaInfo, ...bdinfo].forEach((info2) => {
          description = description.replace(`[quote]${info2}[/quote]`, `[mediainfo]${info2}[/mediainfo]`);
        });
        return description;
      },
      afterHandler: (info) => {
        jQuery("#browsecat").trigger("change");
        handleTJUPT(info);
      }
    },
    NYPT: {
      afterHandler: (info) => {
        jQuery("#browsecat").trigger("change");
        const domTimeout = setTimeout(() => {
          const catMap = {
            movie: "#movie_enname",
            tv: "#series_enname",
            tvPack: "#series_enname",
            documentary: "#doc_enname",
            variety: "#show_enname",
            cartoon: "#anime_enname"
          };
          const selector = catMap[info.category];
          if (selector) {
            jQuery(selector).val(info.title);
          }
          clearTimeout(domTimeout);
        }, 2e3);
      }
    },
    iTS: {
      afterHandler: (info) => {
        handleITS(info);
      }
    },
    UHDBits: {
      afterHandler: (info) => {
        jQuery(CURRENT_SITE_INFO.imdb.selector).val(info.imdbId || "");
        if (info.title.match(/web-?rip/i)) {
          jQuery(CURRENT_SITE_INFO.videoType.selector).val("WEBRip");
        }
        const teamName = getTeamName(info);
        jQuery("#team").val(teamName === "other" ? "Unknown" : teamName);
        jQuery("#imdb_button").trigger("click");
      }
    },
    "52pt": {
      afterHandler: (info) => {
        const { tags, videoType, resolution } = info;
        let videoTypeValue = videoType;
        if (videoType.match(/bluray/)) {
          if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
            videoTypeValue = videoType === "bluray" ? "14" : "15";
          }
        } else if (videoType === "remux" && resolution === "2160p") {
          videoTypeValue = "5";
        }
        jQuery(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
      }
    },
    BTSCHOOL: {
      afterHandler: (info) => {
        var _a2, _b;
        jQuery(CURRENT_SITE_INFO.imdb.selector).val(info.imdbId || "");
        if (info.doubanUrl) {
          const doubanId = (_b = (_a2 = info.doubanUrl.match(/\/(\d+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
          jQuery(CURRENT_SITE_INFO.douban.selector).val(doubanId);
        }
      }
    },
    HDTime: {
      afterHandler: (info) => {
        if (info.videoType.match(/bluray/i)) {
          jQuery(CURRENT_SITE_INFO.category.selector).val("424");
        }
      }
    },
    RedLeaves: {
      afterHandler: () => {
        try {
          jQuery(CURRENT_SITE_INFO.category.selector).trigger("change");
        } catch (err) {
          console.log(err);
        }
        jQuery("tr.mode_5").css("display", "");
      }
    },
    HDFans: {
      afterHandler: (info) => {
        const { videoType, resolution, tags } = info;
        if (videoType === "remux") {
          jQuery(CURRENT_SITE_INFO.videoType.selector).val(resolution === "2160p" ? "10" : "8");
        } else if (videoType === "encode") {
          const map = {
            "2160p": "9",
            "1080p": "5",
            "1080i": "5",
            "720p": "11"
          };
          jQuery(CURRENT_SITE_INFO.videoType.selector).val(map[resolution] || "16");
        }
        if (tags.diy) {
          jQuery(CURRENT_SITE_INFO.videoType.selector).val(resolution === "2160p" ? "2" : "4");
        }
      }
    },
    Bib: {
      afterHandler: (info) => {
        if (info.doubanBookInfo) {
          handleBib(info);
        }
      }
    },
    HaresClub: {
      afterHandler: (info) => {
        jQuery(".modesw").trigger("click");
        jQuery(CURRENT_SITE_INFO.screenshots.selector).val(info.screenshots.join("\n"));
        if (layui) {
          setTimeout(() => {
            layui.form.render("select");
            layui.form.render("checkbox");
          }, 1e3);
        }
      }
    },
    TTG: {
      afterHandler: (info) => {
        var _a2, _b;
        if (info.doubanUrl) {
          const doubanId = (_b = (_a2 = info.doubanUrl.match(/\/(\d+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
          jQuery(CURRENT_SITE_INFO.douban.selector).val(doubanId);
        }
      }
    },
    MTV: {
      handleDescription: (info) => {
        var _a2;
        let { description } = info;
        (_a2 = info.mediaInfos) == null ? void 0 : _a2.forEach((mediaInfo) => {
          description = description.replace(`[quote]${mediaInfo}[/quote]`, `[mediainfo]${mediaInfo}[/mediainfo]`);
        });
        return description;
      },
      afterHandler: (info) => {
        var _a2, _b, _c, _d2, _e2, _f, _g, _h;
        if (info.resolution !== "") {
          const resolution = info.resolution.replace("p", "");
          (_a2 = jQuery(`input[name="Resolution"][value="${resolution}"]`)[0]) == null ? void 0 : _a2.click();
          jQuery("#taginput").val(info.resolution);
        }
        if (info.videoCodec !== "") {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} ${info.videoCodec}`);
        }
        if (info.audioCodec === "dd+") {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} ddp.audio`);
        } else if ((_b = info.audioCodec) == null ? void 0 : _b.match(/dd|ac3/i)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} dd.audio`);
        } else if ((_c = info.audioCodec) == null ? void 0 : _c.match(/dtshd/i)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} dts.hd.audio`);
        } else if ((_d2 = info.audioCodec) == null ? void 0 : _d2.match(/dtsx/i)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} dts.x.audio`);
        } else {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} ${info.audioCodec}.audio`);
        }
        if (info.title.match(/(\s|.)hybrid(\s|.)/i)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} hybrid`);
        }
        if (/web-dl/i.test(info.title)) {
          const tagvalue = jQuery("#taginput").attr("value");
          (_e2 = jQuery('input[name="source"][value="9"]')[0]) == null ? void 0 : _e2.click();
          if (/NF|Netflix/i.test(info.title)) {
            jQuery("#taginput").val(`${tagvalue} web.dl netflix.source`);
          } else jQuery("#taginput").val(`${tagvalue} web.dl`);
        } else if (/webrip/i.test(info.title)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} webrip`);
          (_f = jQuery('input[name="source"][value="10"]')[0]) == null ? void 0 : _f.click();
        } else if (info.videoType.match(/bluray/i)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} bluray`);
          (_g = jQuery('input[name="source"][value="7"]')[0]) == null ? void 0 : _g.click();
        } else if (info.videoType.match(/remux/i)) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} ${info.videoType}`);
          (_h = jQuery('input[name="source"][value="7"]')[0]) == null ? void 0 : _h.click();
        } else {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} ${info.videoType}`);
        }
        if (info.tags.cantonese_audio === true) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} cantonese.audio.track`);
        }
        if (info.tags.chinese_audio === true) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} chinese.audio.track`);
        }
        if (info.tags.chinese_subtitle === true) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} chinese.subs`);
        }
        if (info.tags.hdr === true) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} hdr`);
        }
        if (info.tags.dolby_vision === true) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} dovi`);
        }
        if (info.tags.hdr10_plus === true) {
          const tagvalue = jQuery("#taginput").attr("value");
          jQuery("#taginput").val(`${tagvalue} hdr10plus`);
        }
      }
    }
  };
  class ExportHelper {
    constructor(info) {
      this.info = info;
      this.currentSiteInfo = CURRENT_SITE_INFO;
      this.operation = SITE_OPERATIONS[CURRENT_SITE_NAME];
    }
    prepareToFillInfo() {
      var _a2;
      if ((_a2 = this.operation) == null ? void 0 : _a2.beforeHandler) {
        this.operation.beforeHandler();
      }
    }
    fillTeamName() {
      const teamConfig = this.currentSiteInfo.team;
      const teamName = getTeamName(this.info);
      if (teamName && teamConfig) {
        const formateTeamName = teamConfig.map[teamName.toLowerCase()];
        const matchValue = formateTeamName || teamConfig.map.other;
        if (HDB_TEAM.includes(teamName) && CURRENT_SITE_NAME === "BTSCHOOL") {
          jQuery(teamConfig.selector).val(teamConfig.map.hdbint);
          return;
        }
        if (CURRENT_SITE_NAME === "UHDBits") {
          jQuery("#team").val(teamName === "other" ? "Unknown" : teamName);
          return;
        }
        if (matchValue) {
          jQuery(teamConfig.selector).val(matchValue.toLowerCase());
        }
      }
    }
    disableTorrentChange() {
      var _a2, _b;
      const nameSelector = (_b = (_a2 = this.currentSiteInfo.name) == null ? void 0 : _a2.selector) != null ? _b : "";
      if (nameSelector.match(/^#\w+/)) {
        const nameDom = jQuery(nameSelector).clone().attr("name", "").hide();
        jQuery(nameSelector).attr("id", "").after(nameDom);
      }
    }
    getThanksQuote() {
      const isChineseSite = isChineseTacker(this.currentSiteInfo.siteType) || CURRENT_SITE_NAME.match(/HDPOST|GPW/);
      let thanksQuote = `转自[b]${this.info.sourceSite}[/b]，感谢原发布者！`;
      if (!isChineseSite) {
        thanksQuote = `Torrent from [b]${this.info.sourceSite}[/b].
All thanks to the original uploader！`;
      }
      return `[quote]${thanksQuote}[/quote]

`;
    }
    getChineseName() {
      var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j;
      const { description, subtitle } = this.info;
      const originalName = (_b = (_a2 = description.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _a2[2]) != null ? _b : "";
      const translateName = (_f = (_e2 = (_d2 = (_c = description.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _c[2]) == null ? void 0 : _d2.split("/")) == null ? void 0 : _e2[0]) != null ? _f : "";
      let chineseName = originalName;
      if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
        chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
      }
      if (chineseName === "" && subtitle !== "" && subtitle !== void 0) {
        chineseName = (_j = (_i = (_h = (_g = this.info) == null ? void 0 : _g.subtitle) == null ? void 0 : _h.replace(/【|】.*/g, "").split("/")) == null ? void 0 : _i[0]) != null ? _j : "";
      }
      return chineseName.trim();
    }
    torrentTitleHandler() {
      var _a2;
      const fixedTitle = this.info.title.replace("H 265", "H.265").replace("H 264", "H.264");
      this.info.title = fixedTitle;
      if ((_a2 = this.operation) == null ? void 0 : _a2.titleHandler) {
        this.info = this.operation.titleHandler(this.info);
      }
      if (this.currentSiteInfo.name) {
        if (CURRENT_SITE_NAME.match(/SSD|iTS|HDChina|MTV/)) {
          this.info.title = this.info.title.replace(/\s/ig, ".");
        } else if (CURRENT_SITE_NAME.match(/PuTao/)) {
          this.info.title = `[${this.getChineseName()}]${this.info.title}`;
        }
        jQuery(this.currentSiteInfo.name.selector).val(this.info.title);
      }
      return this.info;
    }
    imdbHandler() {
      var _a2, _b, _c;
      const imdbSelector = (_b = (_a2 = this.currentSiteInfo) == null ? void 0 : _a2.imdb) == null ? void 0 : _b.selector;
      if (!imdbSelector) {
        return;
      }
      const imdbId = getIMDBIdByUrl(this.info.imdbUrl || "");
      this.info.imdbId = imdbId;
      if (CURRENT_SITE_NAME.match(/HDRoute|HDSpace/)) {
        jQuery(imdbSelector).val((_c = imdbId == null ? void 0 : imdbId.replace("tt", "")) != null ? _c : "");
      } else if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|HDPOST|ACM|Aither|Concertos|MDU|LST/)) {
        let tmdbId = "";
        const fillIMDBId = this.currentSiteInfo.siteType === "UNIT3D" ? imdbId.replace("tt", "") : imdbId;
        jQuery(imdbSelector).val(fillIMDBId);
        getTMDBIdByIMDBId(imdbId).then((data) => {
          tmdbId = data.id;
          jQuery(this.currentSiteInfo.tmdb.selector).val(tmdbId);
        });
        if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither|MDU|LST/)) {
          jQuery("#torrent").on("change", () => {
            jQuery(imdbSelector).val(fillIMDBId);
            jQuery(this.currentSiteInfo.tmdb.selector).val(tmdbId);
            jQuery("#automal").val(0);
          });
        }
      } else {
        jQuery(imdbSelector).val(this.info.imdbUrl || "");
      }
    }
    fillBasicAttributes() {
      const commonInfoKeys = ["subtitle", "douban", "area", "audioCodec"];
      commonInfoKeys.forEach((key) => {
        const siteInfo = this.currentSiteInfo[key];
        if (siteInfo && siteInfo.selector) {
          let value = this.info[key];
          if (key === "douban") {
            value = this.info.doubanUrl;
          } else if (key === "area" || key === "audioCodec") {
            value = siteInfo.map[value];
          }
          jQuery(siteInfo.selector).val(value);
        }
      });
    }
    descriptionHandler() {
      var _a2, _b, _c, _d2;
      let { mediaInfos, isBluray, screenshots = [], description = "", doubanInfo, poster } = this.info;
      if (description) {
        if (this.currentSiteInfo.siteType.match(/NexusPHP|TTG|MTeam/)) {
          description = description.replace(/\[(right|left|center)\]/gi, "[quote]").replace(/\[\/(right|left|center)\]/gi, "[/quote]");
        }
        description = description.replace(/^(\s+)/g, "");
        if (isChineseTacker(this.currentSiteInfo.siteType) && CURRENT_SITE_NAME !== "SSD") {
          if (doubanInfo) {
            description = `${doubanInfo}
${description}`;
          }
        } else {
          const { sourceSiteType } = this.info;
          if (isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== "Bib") {
            description = filterNexusDescription(this.info);
          }
        }
      }
      if (this.currentSiteInfo.mediaInfo) {
        if (CURRENT_SITE_NAME.match(/^(Blutopia|fearnopeer|Aither|MDU)/)) {
          const selector = isBluray ? 'textarea[name="bdinfo"]' : this.currentSiteInfo.mediaInfo.selector;
          jQuery(selector).val(mediaInfos[0]);
          description = description.replace(mediaInfos[0].trim(), "");
        } else if (isBluray && CURRENT_SITE_NAME.match(/^(SpeedApp)/)) {
          jQuery(this.currentSiteInfo.bdinfo.selector).val(mediaInfos[0]);
          this.info.mediaInfos = [];
        } else if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits)/))) {
          jQuery(this.currentSiteInfo.mediaInfo.selector).val(mediaInfos[0]);
          description = description.replace(mediaInfos[0].trim(), "");
        }
      }
      if (this.currentSiteInfo.screenshots) {
        screenshots.forEach((img) => {
          if (description.includes(img)) {
            description = description.replace(img, "");
            if (!img.match(/\[url=.+?\[url]/)) {
              description = description.replace(/\[img\]\[\/img\]\n*/g, "");
            }
          }
        });
      }
      if (this.currentSiteInfo.poster) {
        if (!poster) {
          const doubanPosterImage = (description + doubanInfo).match(/\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/);
          if (doubanPosterImage && doubanPosterImage[1]) {
            poster = doubanPosterImage[1];
          } else {
            poster = (_b = (_a2 = description.match(/\[img\](.+?)\[\/img\]/)) == null ? void 0 : _a2[1]) != null ? _b : "";
          }
        }
        if (poster) {
          jQuery(this.currentSiteInfo.poster).val(poster);
          if (CURRENT_SITE_NAME === "HDRoute") {
            jQuery('input[name="poster"]').val(poster);
            description = description.replace(poster, "");
          }
        }
      }
      if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither|MDU/)) {
        if (this.info.sourceSite === "PTP") {
          description = buildPTPDescription(this.info);
        }
        if (screenshots.length > 0) {
          screenshots.forEach((img) => {
            const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](
*)?`);
            if (description.match(regStr)) {
              description = description.replace(regStr, (p1, p2) => {
                return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
              });
            }
          });
        }
        if (description.match(/mobile\.webp\[\/img/gi)) {
          description = description.replace(/\[img\]/g, "[img=350x350]");
        }
      }
      if (CURRENT_SITE_NAME.match(/Blutopia|fearnopeer|Aither/)) {
        description = description.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[$2]$3[/$2]");
        description = description.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
          const slash = p1 || "";
          return p2 ? `${p2}: [${slash}spoiler]` : `[${slash}spoiler]`;
        });
      }
      if ((_c = this.operation) == null ? void 0 : _c.handleDescription) {
        description = this.operation.handleDescription(__spreadProps(__spreadValues({}, this.info), {
          description
        }));
      }
      description = filterEmptyTags(description);
      const thanksQuoteClosed = GM_getValue("easy-seed.thanks-quote-closed") || "";
      if (!thanksQuoteClosed && this.info.sourceSite !== void 0) {
        description = this.getThanksQuote() + description.trim();
      }
      jQuery((_d2 = this.currentSiteInfo.description) == null ? void 0 : _d2.selector).val(description);
      if (CURRENT_SITE_INFO.siteType === "UNIT3D" && CURRENT_SITE_INFO.description.selector === "#bbcode-description") {
        jQuery(CURRENT_SITE_INFO.description.selector)[0].dispatchEvent(new Event("input"));
      }
      this.info = __spreadProps(__spreadValues({}, this.info), {
        description
      });
    }
    categoryHandler() {
      const { isBluray, category, videoType } = this.info;
      if (CURRENT_SITE_NAME.match(/ACM|Concertos/i)) {
        this.info.category = videoType;
        this.info.videoType = category;
        if (isBluray) {
          let bdType = getBDType(this.info.size);
          if (videoType === "uhdbluray" && bdType === "BD50") {
            bdType = "uhd50";
          }
          this.info.category = bdType || "";
        }
      }
      if (this.currentSiteInfo.category) {
        const category2 = this.currentSiteInfo.category.map[this.info.category];
        const keyArray = ["videoCodec", "videoType", "resolution", "source", "area"];
        let finalSelectArray = [];
        if (Array.isArray(category2)) {
          finalSelectArray = [...category2];
          keyArray.forEach((key) => {
            finalSelectArray = matchSelectForm(this.currentSiteInfo, this.info, key, finalSelectArray);
            if (finalSelectArray.length === 1) {
              setSelectValue(this.currentSiteInfo.category.selector, finalSelectArray[0]);
            }
          });
        } else {
          [...keyArray, "category"].forEach((key) => {
            matchSelectForm(this.currentSiteInfo, this.info, key, finalSelectArray);
          });
        }
      }
    }
    fillRemainingInfo() {
      if (this.currentSiteInfo.format) {
        const formatData = this.currentSiteInfo.format;
        jQuery(formatData.selector).val(formatData.map[this.info.format]);
      }
      if (this.currentSiteInfo.image) {
        jQuery(this.currentSiteInfo.image.selector).val(this.info.image || "");
      }
      if (this.currentSiteInfo.anonymous) {
        const { selector, value = "" } = this.currentSiteInfo.anonymous;
        if (value) {
          jQuery(selector).val(value);
        } else {
          jQuery(selector).attr("checked", "true");
        }
      }
      if (this.currentSiteInfo.tags) {
        Object.keys(this.info.tags).forEach((key) => {
          if (this.info.tags[key] && this.currentSiteInfo.tags[key]) {
            jQuery(this.currentSiteInfo.tags[key]).attr("checked", "true");
          }
        });
      }
      this.fillTeamName();
      if (CURRENT_SITE_NAME.match(/HDHome|PTHome|SoulVoice|1PTBA|HDAtmos|3Wmg/i)) {
        setTimeout(() => {
          var _a2;
          const event = new Event("change");
          (_a2 = document.querySelector(this.currentSiteInfo.category.selector)) == null ? void 0 : _a2.dispatchEvent(event);
        }, 1e3);
      }
    }
    dealWithMoreSites() {
      var _a2, _b, _c, _d2, _e2;
      if ((_a2 = this.operation) == null ? void 0 : _a2.afterHandler) {
        this.operation.afterHandler(this.info);
      }
      if (CURRENT_SITE_NAME.match(/PTHome|1PTBA|52pt|Audiences/i)) {
        if (this.info.tags.diy) {
          let categoryValue = "";
          if (CURRENT_SITE_NAME.match(/Audiences|PTHome/)) {
            categoryValue = this.info.videoType === "bluray" ? "14" : "13";
          } else if (CURRENT_SITE_NAME === "1PTBA") {
            categoryValue = this.info.videoType === "bluray" ? "1" : "4";
          } else if (CURRENT_SITE_NAME === "52pt") {
            categoryValue = this.info.videoType === "bluray" ? "2" : "12";
          }
          jQuery(this.currentSiteInfo.videoType.selector).val(categoryValue);
        }
      }
      if (this.currentSiteInfo.siteType === "UNIT3D" && this.info.category.match(/tv/)) {
        const season = (_c = (_b = this.info.title.match(/S0?(\d{1,2})/i)) == null ? void 0 : _b[1]) != null ? _c : 1;
        const episode = (_e2 = (_d2 = this.info.title.match(/EP?0?(\d{1,3})/i)) == null ? void 0 : _d2[1]) != null ? _e2 : 0;
        jQuery("#season_number").val(season);
        jQuery("#episode_number").val(episode);
      }
      if (CURRENT_SITE_NAME.match(/HDHome/)) {
        if (this.info.title.match(/iPad/i)) {
          const categoryMap = {
            movie: "412",
            tv: "426",
            tvPack: "433",
            documentary: "418"
          };
          const ipadCat = categoryMap[this.info.category];
          if (ipadCat) {
            jQuery("#browsecat").val(ipadCat);
          }
        }
      }
    }
    fillTorrentFile() {
      var _a2;
      const { torrentData } = this.info;
      if (CURRENT_SITE_INFO.torrent) {
        const fileInput = jQuery(CURRENT_SITE_INFO.torrent.selector);
        if (torrentData && fileInput.length > 0) {
          const blob = base64ToBlob(torrentData);
          const torrentFileName = (_a2 = this.info.title) == null ? void 0 : _a2.replace(/\s/g, ".");
          const file = new File([blob], `${torrentFileName}.torrent`, { type: "application/x-bittorrent" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          const uploadInput = fileInput[0];
          if (CURRENT_SITE_NAME === "MTeam") {
            setTimeout(() => {
              const lastValue = uploadInput.files;
              uploadInput.files = dataTransfer.files;
              const tracker = uploadInput._valueTracker;
              if (tracker) {
                tracker.setValue(lastValue);
              }
              const event = new Event("change", { bubbles: true });
              uploadInput.dispatchEvent(event);
            }, 100);
          } else {
            uploadInput.files = dataTransfer.files;
          }
        }
      }
    }
  }
  const handlePTP = async (info) => {
    const currentSiteInfo2 = PT_SITE.PTP;
    const {
      title,
      imdbUrl,
      tags,
      size,
      videoCodec = "",
      videoType,
      resolution
    } = info;
    const groupId = getUrlParam("groupid");
    if (!groupId) {
      jQuery(currentSiteInfo2.imdb.selector).val(imdbUrl || 0);
      AutoFill();
    }
    info.resolution = getResolution$3(resolution, videoType, title);
    info.videoCodec = getVideoCodec(videoCodec, videoType, size);
    const keyArray = ["category", "source", "videoCodec", "resolution"];
    keyArray.forEach((key) => {
      const { selector = "", map } = currentSiteInfo2[key];
      if (map) {
        const mapValue = map[info[key]];
        jQuery(selector).val(mapValue);
      } else {
        jQuery(selector).val(info[key]);
      }
    });
    if (info.sourceSite.match(/PTP/i)) {
      jQuery(currentSiteInfo2.description.selector).val(info.originalDescription || "");
    } else {
      const description = getDescription$2(info);
      jQuery(currentSiteInfo2.description.selector).val(description);
    }
    const editionInfo = getEditionInfo(videoType, tags);
    if (editionInfo.length > 0) {
      jQuery("#remaster").attr("checked", "true");
      Remaster();
      editionInfo.forEach((edition) => {
        const event = new Event("click");
        jQuery("#remaster_tags a").filter(function() {
          return new RegExp(edition).test(jQuery(this).text());
        })[0].dispatchEvent(event);
      });
    }
    const infoFromMediaInfoinfo = getInfoFromMediaInfo(info.mediaInfos[0]);
    if (infoFromMediaInfoinfo.subtitles && infoFromMediaInfoinfo.subtitles[0]) {
      infoFromMediaInfoinfo.subtitles.forEach((subtitle) => {
        const subtitleSelector = jQuery(".languageselector li").filter(function() {
          return new RegExp(subtitle).test(jQuery(this).text());
        });
        if (subtitle !== "English" && subtitleSelector[0]) {
          subtitleSelector.find("input").attr("checked", "true");
        }
      });
    }
  };
  const getEditionInfo = (videoType, tags) => {
    const editionInfo = [];
    if (videoType === "remux") {
      editionInfo.push("Remux");
    }
    if (tags.hdr) {
      editionInfo.push("HDR10");
    }
    if (tags.hdr10_plus) {
      editionInfo.push("HDR10+");
    }
    if (tags.dolby_vision) {
      editionInfo.push("Dolby Vision");
    }
    if (tags.dolby_atmos) {
      editionInfo.push("Dolby Atmos");
    }
    if (tags.dts_x) {
      editionInfo.push("DTS:X");
    }
    return editionInfo;
  };
  const getVideoCodec = (videoCodec, videoType, size) => {
    if (videoType === "bluray") {
      return getBDType(size);
    } else if (videoType === "dvd") {
      const GBSize = size / 1e9;
      if (GBSize < 5) {
        return "DVD5";
      }
      return "DVD9";
    }
    return videoCodec;
  };
  const getResolution$3 = (resolution, videoType, title) => {
    if (videoType === "DVD" && title.match(/NTSC/i)) {
      return "NTSC";
    } else if (videoType === "DVD" && title.match(/PAL/i)) {
      return "PAL";
    }
    return resolution;
  };
  const getDescription$2 = (info) => {
    const { mediaInfos, comparisons, screenshots } = info;
    let filterDescription = "";
    if (mediaInfos.length > 0) {
      mediaInfos.forEach((mediaInfo) => {
        mediaInfo = mediaInfo.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, "");
        filterDescription += `[mediainfo]${mediaInfo}[/mediainfo]
`;
      });
    }
    if (comparisons && comparisons.length > 0) {
      for (const comparison of comparisons) {
        filterDescription += `
${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    return `${filterDescription}
${screenshots.map((item) => `[img]${item}[/img]`).join("\n")}`;
  };
  const currentSiteInfo$3 = PT_SITE.GPW;
  const handleGPW = async (info) => {
    const isUploadSuccess = !jQuery("#mediainfo")[0];
    if (isUploadSuccess) {
      return;
    }
    transformInfo(info);
    const isAddFormat = getUrlParam("groupid");
    if (!isAddFormat) {
      jQuery(currentSiteInfo$3.imdb.selector).val(info.imdbUrl || 0);
      jQuery("#imdb_button").trigger("click");
      jQuery("#upload .collapse").show();
    }
    jQuery(currentSiteInfo$3.category.selector).val(currentSiteInfo$3.category.map[info.category]);
    fillEditionInfo(info);
    fillMediaInfo$2(info);
    setTimeout(() => {
      if (!jQuery(currentSiteInfo$3.source.selector).val() || !jQuery(currentSiteInfo$3.format.selector).val()) {
        handleNoAutoCheck(info);
      }
    }, 0);
    fillScene(info);
    fillProcessing(info);
    fillDescription$4(info);
    jQuery(".u-bbcodePreview-button").trigger("click");
  };
  function buildDescription$2(info) {
    let description = "";
    if (info.comparisons && info.comparisons.length > 0) {
      for (const comparison of info.comparisons) {
        description += `${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    if (info.screenshots.length > 0) {
      description += `${info.screenshots.map((v2) => `[img]${v2}[/img]`).join("\n")}

`;
    }
    return description.trim();
  }
  function fillEditionInfo(info) {
    const editionTags = Object.keys(info.tags).map((tag) => info.tags[tag] && currentSiteInfo$3.targetInfo.editionTags[tag]).filter(Boolean);
    let otherTag;
    if (Object.keys(info.otherTags).length > 0) {
      otherTag = Object.keys(info.otherTags).join(", ");
    }
    if (editionTags.length > 0 || otherTag) {
      jQuery("#movie_edition_information").trigger("click");
    }
    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        jQuery(`#movie_remaster_tags a[onclick*="'${tag}'"]`).trigger("click");
      }
    }
    if (otherTag) {
      jQuery("#other-button").trigger("click");
      jQuery("[name=remaster_custom_title]").val(otherTag);
    }
  }
  function fillMediaInfo$2(info) {
    if (!info.mediaInfos) {
      return;
    }
    for (let i = 1; i < info.mediaInfos.length; i++) {
      jQuery("#add-mediainfo")[0].click();
    }
    const textareas = Array.from(jQuery('[name="mediainfo[]"]'));
    for (const [index, textarea] of textareas.entries()) {
      textarea.value = info.mediaInfos[index];
      textarea.dispatchEvent(new Event("input"));
    }
    jQuery('[name="mediainfo[]"]')[0].dispatchEvent(new Event("change"));
  }
  function fillScene(info) {
    if (info.tags.scene) {
      jQuery("#scene").prop("checked", true);
    }
  }
  function fillProcessing(info) {
    let { videoType, size, source, tags } = info;
    if (source.match(/bluray|hddvd|dvd/)) {
      if (tags.diy) {
        videoType = "DIY";
      }
      const videoTypeConfig = currentSiteInfo$3.videoType;
      const { selector, map } = videoTypeConfig;
      jQuery(selector).val(map[videoType]);
      jQuery(selector)[0].dispatchEvent(new Event("change"));
      if (map[videoType] === "Untouched") {
        const bdType = getBDType(size);
        jQuery('select[name="processing_other"]').val(bdType || "");
      }
      jQuery(selector)[0].dispatchEvent(new Event("input"));
    }
  }
  function handleNoAutoCheck(info) {
    var _a2;
    const {
      mediaInfos,
      videoType
    } = info;
    const mediaInfo = (mediaInfos == null ? void 0 : mediaInfos[0]) || "";
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { format: format2 = "", subtitles = [] } = getInfoFunc(mediaInfo);
    info.format = getFormat$1(format2, videoType);
    const keyArray = ["source", "videoCodec", "format", "resolution"];
    keyArray.forEach((key) => {
      var _a3, _b;
      const { selector = "", map } = currentSiteInfo$3[key];
      if (map) {
        const mapValue = map[info[key]];
        jQuery(selector).val(mapValue);
        if (key === "videoCodec" && mapValue === "Other") {
          document.querySelector(selector).dispatchEvent(new Event("change"));
          jQuery('input[name="codec_other"]').val((_b = (_a3 = info[key]) == null ? void 0 : _a3.toUpperCase()) != null ? _b : "");
        }
      } else {
        jQuery(selector).val(info[key] || "");
      }
    });
    if (subtitles.length > 0) {
      jQuery("#mixed_subtitles").attr("checked", "true");
      jQuery('input[name="subtitles[]"][type="checkbox"]').each(function() {
        var _a3, _b;
        const language = (_b = (_a3 = jQuery(this).attr("id")) == null ? void 0 : _a3.replace(/^\S|(_\S)/g, (letter) => letter.replace("_", " ").toUpperCase())) != null ? _b : "";
        if (subtitles.includes(language)) {
          jQuery(this).attr("checked", "true");
        }
      });
      const event = new Event("change");
      (_a2 = document.querySelector("#mixed_subtitles")) == null ? void 0 : _a2.dispatchEvent(event);
      const chineseLanguages = subtitles.filter((item) => item.match(/Chinese|Traditional|Simplified/i));
      if (chineseLanguages.length === 1 && chineseLanguages[0] === "Chinese") {
        const selector = chineseLanguages[0].match(/Traditional/i) ? "#chinese_traditional" : "#chinese_simplified";
        jQuery(selector).attr("checked", "true");
      } else if (chineseLanguages.length >= 2) {
        jQuery("#chinese_traditional,#chinese_simplified").attr("checked", "true");
      }
    }
  }
  const getFormat$1 = (format2, videoType) => {
    if (videoType.match(/bluray/) && format2 !== "iso") {
      format2 = "m2ts";
    } else if (videoType.match(/dvd/)) {
      format2 = "vob";
    }
    return format2 || "mkv";
  };
  function transformInfo(info) {
    if (["encode", "remux"].includes(info.videoType) && info.mediaInfos) {
      const newMediaInfos = [];
      for (const mediaInfo of info.mediaInfos) {
        if (mediaInfo.match(/Disc Title|Disc Label/i)) {
          continue;
        }
        newMediaInfos.push(mediaInfo);
      }
      info.mediaInfos = newMediaInfos;
    }
  }
  function fillDescription$4(info) {
    let description = "";
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
    } else if (info.sourceSite === "BeyondHD") {
      description = info.originalDescription || "";
    } else {
      description = buildDescription$2(info);
    }
    jQuery(currentSiteInfo$3.description.selector).val(description);
    jQuery(currentSiteInfo$3.description.selector)[0].dispatchEvent(new Event("input"));
  }
  const handleNPU = (info) => {
    var _a2, _b;
    const currentSiteInfo2 = PT_SITE.NPUBits;
    let { title, year, movieName, category, doubanInfo, description, subtitle } = info;
    jQuery(currentSiteInfo2.subtitle.selector).val(subtitle || "");
    if (doubanInfo) {
      description = `${doubanInfo}
${description}`;
    }
    jQuery(currentSiteInfo2.description.selector).val(description);
    jQuery("#torrent_name_checkbox").attr("checked", "true");
    jQuery(currentSiteInfo2.name.selector).val(title);
    jQuery(currentSiteInfo2.category.selector).val(
      currentSiteInfo2.category.map[category]
    );
    jQuery(currentSiteInfo2.category.selector)[0].dispatchEvent(new Event("change"));
    if (category.match(/tv/)) {
      const districtMap = {
        CN: "23",
        HK: "24",
        TW: "24",
        JP: "26",
        KR: "27",
        US: "25",
        EU: "65",
        OT: "63"
      };
      jQuery(currentSiteInfo2.area.selector).val(districtMap[info.area]);
    } else if (category.match(/movie/)) {
      jQuery(currentSiteInfo2.area.selector).val(currentSiteInfo2.area.map[info.area]);
    }
    jQuery(currentSiteInfo2.area.selector)[0].dispatchEvent(new Event("change"));
    const keyArray = ["videoCodec", "videoType", "resolution"];
    keyArray.forEach((key) => {
      const { selector, map } = currentSiteInfo2[key];
      fill_field(
        selector,
        map[info[key]]
      );
    });
    const teamName = getTeamName(info);
    const teamConfig = currentSiteInfo2.team;
    jQuery(`${teamConfig.selector}`).val(teamConfig.map[teamName]);
    jQuery("#torrent_name_field0").val(movieName);
    if (category === "movie") {
      jQuery("#torrent_name_field1").val(year);
    } else if (category.match(/tv/)) {
      const episode = (_b = (_a2 = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _a2[0]) != null ? _b : "";
      jQuery("#torrent_name_field1").val(episode);
    }
    jQuery('input[name="uplver"]').attr("checked", "true");
  };
  const handleBYR = (info) => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n2;
    const currentSiteInfo2 = PT_SITE.BYR;
    const {
      title,
      description,
      doubanInfo,
      category,
      videoType,
      mediaInfos,
      subtitle,
      imdbUrl,
      doubanUrl
    } = info;
    jQuery(currentSiteInfo2.subtitle.selector).val(subtitle || "");
    jQuery(currentSiteInfo2.imdb.selector).val(imdbUrl || "");
    jQuery(currentSiteInfo2.douban.selector).val(doubanUrl || "");
    CKEDITOR.on("instanceReady", () => {
      CKEDITOR.instances.descr.setData(bbcode2Html(description));
    });
    jQuery("#ename0day").val(title);
    const fullDescription = description + doubanInfo;
    let area = (_b = (_a2 = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a2[2]) != null ? _b : "";
    area = area.replace(/\[\/?.+?\]/g, "");
    const originalName = (_d2 = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d2 : "";
    const translateName = (_h = (_g = (_f = (_e2 = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e2[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    const movieType = (_j = (_i = fullDescription.match(/(类\s+别)\s+(.+)/)) == null ? void 0 : _i[2]) != null ? _j : "";
    const language = (_l = (_k = fullDescription.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _k[2]) != null ? _l : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
    }
    if (category.match(/movie/)) {
      let selector = "";
      if (area.match(/华语|台|港/)) {
        selector = "华语";
      } else if (area.match(/日本|韩国|泰国/)) {
        selector = "亚洲";
      } else if (area.match(/美国|加拿大/)) {
        selector = "北美";
      } else if (area.match(/欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "欧洲";
      } else {
        selector = "其他";
      }
      const typeMap = {
        华语: "11",
        欧洲: "12",
        北美: "13",
        亚洲: "14",
        其他: "1"
      };
      jQuery('select[name="second_type"]').val(typeMap[selector]);
      jQuery('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      const movieTypeArr = movieType.split(/\s\//);
      jQuery("#movie_type").val(movieTypeArr.join("/"));
      fillField(selector, category === "movie" ? "movie_country" : "show_country");
      jQuery("#movie_cname").val(chineseName);
    } else if (category.match(/tv/)) {
      let selector = "movie_country";
      if (area.match(/大陆/)) {
        selector = "大陆";
      } else if (area.match(/台|港/)) {
        selector = "港台";
      } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "欧美";
      } else if (area.match(/日本|韩国/)) {
        selector = "日韩";
      } else {
        selector = "其他";
      }
      const typeMap = {
        大陆: "15",
        港台: "16",
        欧美: "17",
        日韩: "18",
        其他: "2"
      };
      jQuery('select[name="second_type"]').val(typeMap[selector]);
      jQuery('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      fillField(selector, "tv_type");
      jQuery("#tv_ename").val(title);
      jQuery("#cname").val(chineseName);
      const episode = (_n2 = (_m = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _m[0]) != null ? _n2 : "";
      jQuery("#tv_season").val(episode);
      const isBluray = videoType.match(/bluray/i);
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { format: format2 } = getInfoFunc(mediaInfos == null ? void 0 : mediaInfos[0]);
      fillField((format2 == null ? void 0 : format2.toUpperCase()) || "MKV", "tv_filetype");
    } else if (category.match(/variety/)) {
      let selector = "";
      if (area.match(/大陆/)) {
        selector = "大陆";
      } else if (area.match(/台|港/)) {
        selector = "港台";
      } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "欧美";
      } else if (area.match(/日本|韩国/)) {
        selector = "日韩";
      } else {
        selector = "其他";
      }
      const typeMap = {
        大陆: "27",
        港台: "29",
        欧美: "30",
        日韩: "28",
        其他: "5"
      };
      jQuery('select[name="second_type"]').val(typeMap[selector]);
      jQuery('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      fillField(selector, "show_country");
      jQuery("#show_cname").val(chineseName);
      jQuery("#show_ename").val(title);
      let languageVal = "";
      if (language.match(/汉语/)) {
        languageVal = "国语";
      } else if (language.match(/粤/)) {
        languageVal = "粤语";
      } else if (language.match(/英语/)) {
        languageVal = "英语";
      } else if (language.match(/日语/)) {
        languageVal = "日语";
      } else if (language.match(/韩语/)) {
        languageVal = "韩语";
      }
      fillField(languageVal, "show_language");
    }
    function bbcode2Html(bbcode) {
      let html2 = bbcode.replace(/\[\*\]([^\n]+)/ig, "<li>$1</li>");
      html2 = html2.replace(/(\r\n)|\n/g, "<br>");
      html2 = html2.replace(/\[(quote|hide=.+?)\]/ig, "<fieldset><legend>引用</legend>");
      html2 = html2.replace(/\[(\/)(quote|hide)\]/ig, "<$1fieldset>");
      html2 = html2.replace(/(?!\[url=(http(s)*:\/{2}.+?)\])\[img\](.+?)\[\/img]\[url\]/g, '<a href="$1"><img src="$2"/></a>');
      html2 = html2.replace(/\[img\](.+?)\[\/img]/g, '<img src="$1"/>');
      html2 = html2.replace(/\[(\/)?(left|right|center)\]/ig, "<$1$2>");
      html2 = html2.replace(/\[(\/)?b\]/ig, "<$1strong>");
      html2 = html2.replace(/\[color=(.+?)\]/ig, '<span style="color: $1">').replace(/\[\/color\]/g, "</span>");
      html2 = html2.replace(/\[size=(.+?)\]/ig, '<font size="$1">').replace(/\[\/size\]/g, "</font>");
      html2 = html2.replace(/\[url=(.+?)\](.+?)\[\/url\]/ig, '<a href="$1">$2</a>');
      return html2;
    }
  };
  const handleSC = async (info) => {
    const { imdbUrl = "" } = info;
    const imdbId = getIMDBIdByUrl(imdbUrl);
    jQuery("#catalogue_number").val(imdbId);
    jQuery("#imdb_autofill").trigger("click");
    fillMedia(info);
    jQuery(".modesw").trigger("click");
    jQuery("#release_desc").val(buildDescription$1(info));
    await fillIMDb(imdbUrl);
  };
  function buildDescription$1(info) {
    const { screenshots, mediaInfos } = info;
    let description = "";
    if (screenshots.length > 0) {
      description = screenshots.slice(0, 3).map((img) => {
        return `[img]${img}[/img]`;
      }).join("");
    }
    if (mediaInfos.length > 0) {
      mediaInfos.forEach((mediaInfo) => {
        description += `

[hide=MediaInfo]${mediaInfo}[/hide]`;
      });
    }
    return description;
  }
  function fillMedia(info) {
    const { videoType, resolution } = info;
    let value;
    if (videoType.match(/bluray/i)) {
      value = "BDMV";
    } else if (videoType === "DVD") {
      value = "DVD-R";
    } else if (parseInt(resolution, 10) < 720) {
      value = "SD";
    } else {
      value = resolution;
    }
    jQuery("#media").val(value);
  }
  async function fillIMDb(imdbUrl) {
    var _a2, _b, _c, _d2;
    if (imdbUrl) {
      const imdbData = await getIMDBData(imdbUrl);
      if (imdbData && ((_a2 = imdbData == null ? void 0 : imdbData.details) == null ? void 0 : _a2.country)) {
        jQuery("#country").val(imdbData.details.country);
      }
      const akaName = imdbData && ((_b = imdbData == null ? void 0 : imdbData.details) == null ? void 0 : _b["Also known as"]);
      const originalName = (_c = imdbData == null ? void 0 : imdbData.name) != null ? _c : "";
      if (akaName && akaName !== originalName) {
        jQuery("#alternate_title").val(imdbData.details["Also known as"]);
        jQuery("#title").val(originalName);
      }
      if (imdbData && imdbData.poster) {
        let poster;
        const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key");
        if (ptpImgApiKey) {
          poster = await uploadToPtpImg([imdbData.poster]);
        } else {
          const gifyuHtml = await fetch("https://gifyu.com", {
            responseType: void 0
          });
          const authToken = (_d2 = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)) == null ? void 0 : _d2[1];
          const data = await transferImgs(imdbData.poster, authToken, "https://gifyu.com/json");
          poster = data.url;
        }
        jQuery("#image").val(poster);
      }
    }
  }
  const handleKG = async (info) => {
    var _a2;
    const { imdbUrl, screenshots, mediaInfos, resolution, source, videoType } = info;
    const siteInfo = PT_SITE.KG;
    const mediaInfo = (_a2 = mediaInfos == null ? void 0 : mediaInfos[0]) != null ? _a2 : "";
    if (imdbUrl) {
      jQuery('input[type="submit"][value="next >>"]').hide().after("<p>loading...</p>");
      jQuery('input[name="title"]').val(imdbUrl);
      const formData = new FormData();
      formData.append("upstep", "2");
      formData.append("type", "1");
      formData.append("title", imdbUrl);
      const doc = await fetch(`${PT_SITE.KG.url}/upload.php`, {
        method: "POST",
        responseType: void 0,
        data: formData
      });
      const uploadPage = new DOMParser().parseFromString(doc, "text/html");
      jQuery("#upside+div").html(jQuery("#upside+div", uploadPage).html());
      const imdbData = await getIMDBData(imdbUrl);
      if (imdbData) {
        const { country, Languages: languages } = imdbData.details;
        jQuery('input[name="lang"]').val(languages);
        let { description, genre, poster = "" } = imdbData;
        const genreMap = siteInfo.genres.map;
        const countryMap = siteInfo.country.map;
        let countryValue = "";
        if (country) {
          countryValue = country.split(",")[0];
          if (countryValue === "United States") {
            countryValue = "USA";
          } else if (countryValue === "United Kingdom") {
            countryValue = "UK";
          }
        }
        if (!poster) {
          poster = info.poster || "";
        }
        jQuery('select[name="country_id"]').val(countryMap[countryValue]);
        const descriptionBBCode = `[img]${poster}[/img]
      
Synopsis:
[quote]${description}[/quote]
      

${screenshots.map((img) => `[img]${encodeURI(img)}[/img]`).join("")}`;
        jQuery("#bbcodetextarea").html(descriptionBBCode);
        const [mainGenre, otherGenre = ""] = genre;
        jQuery('select[name="genre_main_id"]').val(genreMap[mainGenre]);
        jQuery('select[name="subgenre"]').val(genreMap[otherGenre]);
      }
      jQuery(siteInfo.source.selector).val(siteInfo.source.map[source]);
      if (!videoType.match("bluray")) {
        jQuery(siteInfo.resolution.selector).val(siteInfo.resolution.map[resolution]);
      } else {
        jQuery(siteInfo.resolution.selector).val("3");
      }
      const isBluray = videoType.match(/bluray/i);
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { subtitles = [] } = getInfoFunc(mediaInfo);
      if (subtitles.length) {
        jQuery('input[name="subs"]').val(subtitles.join(","));
      }
      if (videoType === "dvd") {
        jQuery('input[name="dvdr"]').attr("checked", "true");
      }
      const specs = videoType === "dvd" ? buildDvdSpecs(info) : mediaInfo;
      jQuery("#ripspecs").val(specs);
    }
  };
  function buildDvdSpecs(info) {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k;
    const { mediaInfos, size, audioCodec } = info;
    const mediaInfo = (_a2 = mediaInfos == null ? void 0 : mediaInfos[0]) != null ? _a2 : "";
    const scanType = mediaInfo.includes("NTSC") ? "NTSC" : "PAL";
    const dvdType = getBDType(size);
    const audioChannelNumber = ((_b = mediaInfo.match(/Channel\(s\)\s+:\s+(\d)/)) == null ? void 0 : _b[1]) || "2";
    const audioName = `${audioCodec == null ? void 0 : audioCodec.toUpperCase()} ${audioChannelNumber === "6" ? "5.1" : `${audioChannelNumber}.0`}`;
    const IFOMediaInfo = (_d2 = (_c = info.mediaInfos) == null ? void 0 : _c.find((info2) => info2.includes(".IFO"))) != null ? _d2 : "";
    const runtime = (_g = (_f = (_e2 = IFOMediaInfo.match(/Duration\s*?:([^\n]+)/)) == null ? void 0 : _e2[1]) == null ? void 0 : _f.replace(/\s/g, "")) != null ? _g : "";
    const hour = (_i = (_h = runtime.match(/(\d)+h/)) == null ? void 0 : _h[1]) != null ? _i : "00";
    const minute = (_k = (_j = runtime.match(/(\d+)(mn|min)/)) == null ? void 0 : _j[1]) != null ? _k : "";
    return `DVD Label:
DVD Format: ${dvdType} ${scanType}
DVD Audio: ${audioName}
Program(s): Unknown
Menus: Untouched
Video: Untouched
Audio: Untouched
DVD extras: Untouched
Extras contain: 
DVD runtime(s): ${+hour < 10 ? `0${hour}` : hour}:${minute}`;
  }
  const currentSiteInfo$2 = PT_SITE.BeyondHD;
  const handleBHD = (info) => {
    let title = info.title;
    if (info.videoType === "dvd") {
      title = buildDVDTitle(info);
    }
    jQuery(currentSiteInfo$2.name.selector).val(title);
    fillSpecs(info);
    fillTMDBId(info);
    fillMediaInfo$1(info);
    selectTag(info);
    fillDescription$3(info);
    jQuery(currentSiteInfo$2.anonymous.selector).attr("checked", "true");
    if (info.videoType === "tvPack") {
      jQuery('input[name="pack"]').attr("checked", "true");
    }
    jQuery("#torrent").on("change", () => {
      let title2 = info.title;
      if (info.videoType === "dvd") {
        title2 = buildDVDTitle(info);
      }
      jQuery(currentSiteInfo$2.name.selector).val(title2);
      const categoryMap = currentSiteInfo$2.category.map;
      const categoryValueArr = categoryMap[info.category];
      const keyArray = ["resolution"];
      let finalSelectArray = [];
      if (Array.isArray(categoryValueArr)) {
        finalSelectArray = [...categoryValueArr];
        keyArray.forEach((key) => {
          finalSelectArray = matchSelectForm(currentSiteInfo$2, info, key, finalSelectArray);
          console.log(finalSelectArray);
          if (finalSelectArray.length === 1) {
            jQuery(currentSiteInfo$2.category.selector).val(finalSelectArray[0]);
          }
        });
      } else {
        [...keyArray, "category"].forEach((key) => {
          matchSelectForm(currentSiteInfo$2, info, key, finalSelectArray);
        });
      }
    });
  };
  function fillTMDBId(info) {
    const imdbId = getIMDBIdByUrl(info.imdbUrl || "");
    jQuery(currentSiteInfo$2.imdb.selector).val(imdbId);
    getTMDBIdByIMDBId(imdbId).then((data) => {
      jQuery(currentSiteInfo$2.tmdb.selector).val(data.id);
    });
  }
  function fillMediaInfo$1(info) {
    var _a2, _b;
    jQuery(currentSiteInfo$2.mediaInfo.selector).val((_b = (_a2 = info.mediaInfos) == null ? void 0 : _a2[0]) != null ? _b : "");
  }
  function fillSpecs(info) {
    const { category, videoType } = info;
    const isBluray = videoType.match(/bluray/i);
    info.category = videoType;
    info.videoType = category;
    if (isBluray || videoType === "dvd") {
      let bdType = getBDType(info.size);
      if (videoType === "uhdbluray" && bdType === "BD50") {
        bdType = "UHD50";
      }
      info.category = bdType || "";
    }
    const categoryMap = currentSiteInfo$2.category.map;
    const categoryValueArr = categoryMap[info.category];
    const keyArray = ["videoType", "resolution", "source", "category"];
    let finalSelectArray = [];
    if (Array.isArray(categoryValueArr)) {
      finalSelectArray = [...categoryValueArr];
      keyArray.forEach((key) => {
        finalSelectArray = matchSelectForm(currentSiteInfo$2, info, key, finalSelectArray);
        if (finalSelectArray.length === 1) {
          jQuery(currentSiteInfo$2.category.selector).val(finalSelectArray[0]);
        }
      });
    } else {
      [...keyArray, "category"].forEach((key) => {
        matchSelectForm(currentSiteInfo$2, info, key, finalSelectArray);
      });
    }
  }
  function selectTag(info) {
    const editionTags = Object.keys(info.tags).map((tag) => info.tags[tag] && currentSiteInfo$2.targetInfo.editionTags[tag]).filter(Boolean);
    const editionOption = Array.from(jQuery('select[name="edition"] option')).map((opt) => jQuery(opt).attr("value"));
    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        setTimeout(() => {
          var _a2;
          (_a2 = document.querySelector(`.bhd-tag #${tag}`)) == null ? void 0 : _a2.dispatchEvent(new Event("click"));
        }, 0);
        if (editionOption.includes(tag)) {
          jQuery('select[name="edition"]').val(tag);
        }
      }
    }
  }
  function fillDescription$3(info) {
    let description = info.description;
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
    } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
      description = info.originalDescription || "";
    } else {
      description = buildDescription(info);
    }
    if (info.screenshots.length > 0) {
      info.screenshots.forEach((img) => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](
*)?`);
        if (description.match(regStr)) {
          description = description.replace(regStr, (p1, p2) => {
            return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
          });
        }
      });
    }
    jQuery(currentSiteInfo$2.description.selector).val(description);
    jQuery(currentSiteInfo$2.description.selector)[0].dispatchEvent(new Event("input"));
  }
  function buildDescription(info) {
    var _a2, _b;
    let description = info.description;
    const { sourceSiteType } = info;
    if (isChineseTacker(sourceSiteType)) {
      description = filterNexusDescription(info);
    }
    description = description.replace(`[quote]${(_b = (_a2 = info.mediaInfos) == null ? void 0 : _a2[0]) != null ? _b : ""}[/quote]`, "").replace(/\[url.*\[\/url\]/g, "").replace(/\[img.*\[\/img\]/g, "");
    const { comparisons, screenshots } = info;
    if (comparisons && comparisons.length > 0) {
      for (const comparison of comparisons) {
        description += `
${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    if (screenshots.length > 0) {
      description += `${screenshots.map((v2) => `[img]${v2}[/img]`).join("\n")}

`;
    }
    return description.trim();
  }
  function buildDVDTitle(info) {
    var _a2, _b;
    const { movieName, movieAkaName, year, mediaInfos, size, audioCodec } = info;
    const mediaInfo = (_a2 = mediaInfos == null ? void 0 : mediaInfos[0]) != null ? _a2 : "";
    const scanType = mediaInfo.includes("NTSC") ? "NTSC" : "PAL";
    const dvdType = getBDType(size);
    const audioChannelNumber = ((_b = mediaInfo.match(/Channel\(s\)\s+:\s+(\d)/)) == null ? void 0 : _b[1]) || "2";
    const audio = audioCodec === "ac3" ? "dd" : audioCodec;
    const audioName = `${audio == null ? void 0 : audio.toUpperCase()}${audioChannelNumber === "6" ? "5.1" : `${audioChannelNumber}.0`}`;
    const akaName = movieAkaName ? ` AKA ${movieAkaName} ` : " ";
    return `${movieName}${akaName}${year} ${scanType} ${dvdType} ${audioName}`;
  }
  const currentSiteInfo$1 = PT_SITE.Bdc;
  const handleBdc = async (info) => {
    jQuery(currentSiteInfo$1.name.selector).val(info.title);
    jQuery(currentSiteInfo$1.imdb.selector).val(info.imdbUrl || "");
    jQuery(currentSiteInfo$1.anonymous.selector).attr("checked", "true");
    fillCategory(info);
    fillDescription$2(info);
  };
  function fillCategory(info) {
    const { resolution, videoType, category } = info;
    const teamName = getTeamName(info);
    let categoryValue = "";
    if (teamName === "PTer") {
      categoryValue = "40";
    } else if (videoType.match(/bluray/)) {
      categoryValue = "31";
    } else if (category.match(/tv/)) {
      categoryValue = "19";
    } else {
      categoryValue = `${currentSiteInfo$1.resolution.map[resolution][videoType]}`;
    }
    jQuery('select[name="category"]').val(categoryValue);
  }
  async function fillDescription$2(info) {
    var _a2, _b, _c, _d2;
    jQuery(currentSiteInfo$1.description.selector).val($t("数据加载中..."));
    let template = `
  [align=center][color=#FF0000][size=large][font=Trebuchet MS][b]${info.title}[/b][/font][/size][/color]
  
  [URL=$originalPoster$][IMG]$poster$[/IMG][/URL]
  
  
  [img]https://images.broadcity.eu/images/82619845736635909964.png[/img]
  [size=medium]$synopsis$[/size]
  
  [img]https://images.broadcity.eu/images/87704049718067240949.png[/img]
  
  [php]${(_a2 = info.mediaInfos) == null ? void 0 : _a2[0]}[/php][/align]
  
  [align=center][img]https://images.broadcity.eu/images/11622644009097018297.png[/img] 
  $screenshots$
  [/align]
  [align=center][img]https://images.broadcity.eu/images/54926797285164478472.png[/img]
  [youtube]$youtubeUrl$[/youtube]
  [/align]
  [align=center][img]https://images.broadcity.eu/images/44846549843542759058.png[/img]
  [/align]
  `;
    const { imdbUrl, screenshots } = info;
    const screenshotsBBCode = getScreenshotsBBCode(screenshots);
    template = template.replace("$screenshots$", screenshotsBBCode.join("\n"));
    try {
      const replaceParams = {
        synopsis: "",
        youtubeUrl: "",
        poster: "",
        originalPoster: ""
      };
      const imdbId = getIMDBIdByUrl(imdbUrl);
      const { id: tmdbId, overview, poster_path: posterPath } = await getTMDBIdByIMDBId(imdbId);
      if (tmdbId) {
        const poster = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const originalPoster = `https://image.tmdb.org/t/p/original${posterPath}`;
        replaceParams.poster = poster;
        replaceParams.synopsis = overview;
        replaceParams.originalPoster = originalPoster;
        jQuery('input[name="t_image_url"]').val(poster);
        const videos = await getTMDBVideos(tmdbId);
        const youtubeId = (_d2 = (_c = (_b = videos.filter((video) => video.site === "YouTube")) == null ? void 0 : _b[0]) == null ? void 0 : _c.key) != null ? _d2 : "";
        if (youtubeId.length > 0) {
          replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
        }
        Object.keys(replaceParams).forEach((key) => {
          template = template.replace(`$${key}$`, replaceParams[key] || "");
        });
        setTimeout(() => {
          tinymce.activeEditor.setContent(template);
        }, 0);
      }
    } catch (error) {
      jQuery(currentSiteInfo$1.description.selector).val(error.message);
    }
  }
  const currentSiteInfo = PT_SITE.ZHUQUE;
  const handleZQ = (info) => {
    const targetNode = document;
    const imdbId = getIMDBIdByUrl(info.imdbUrl || "");
    const insert = new MutationObserver(() => {
      jQuery("input.ant-select-selection-search-input[id]").each(function() {
        this.dispatchEvent(new Event("keydown"));
      });
      jQuery(currentSiteInfo.name.selector).val(info.title);
      jQuery(currentSiteInfo.name.selector)[0].dispatchEvent(new Event("input"));
      jQuery(currentSiteInfo.imdb.selector).val(imdbId);
      jQuery(currentSiteInfo.imdb.selector)[0].dispatchEvent(new Event("input"));
      if (info.subtitle) {
        jQuery(currentSiteInfo.subtitle.selector).val(info.subtitle);
        jQuery(currentSiteInfo.subtitle.selector)[0].dispatchEvent(new Event("input"));
      }
      let screenshotStr = "";
      if (info.screenshots.length > 0) {
        info.screenshots.forEach((img) => {
          screenshotStr += `${img}
`;
        });
      }
      jQuery(currentSiteInfo.screenshots.selector).val(screenshotStr);
      jQuery(currentSiteInfo.screenshots.selector)[0].dispatchEvent(new Event("input"));
      fillMediaInfo(info);
      fillDescription$1(info);
      const selectNodeParent = document.querySelector("form");
      const select = new MutationObserver(async () => {
        var _a2;
        const { category: categoryConfig } = currentSiteInfo;
        jQuery(`div.ant-select-item-option-content:contains(${categoryConfig.map[info.category]})`).click();
        const keyArray = ["videoType", "videoCodec", "audioCodec"];
        select.disconnect();
        const sleep = (ms) => {
          return new Promise((resolve2) => setTimeout(resolve2, ms));
        };
        const { tags } = currentSiteInfo;
        for (const tag in info.tags) {
          if (tags[tag]) {
            await sleep(100).then(() => jQuery(tags[tag])[0].click());
          }
        }
        keyArray.forEach((key) => {
          const { map } = currentSiteInfo[key];
          if (map) {
            const mapValue = map[info[key]];
            if (mapValue) {
              if (key !== "videoType" && jQuery(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0) {
                jQuery(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
              } else if (mapValue === "Blu-ray") {
                jQuery(`div.ant-select-item-option-content:contains(${mapValue})`)[2].click();
              } else if (jQuery(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0) {
                jQuery(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
              }
            }
          }
        });
        if (info.resolution !== "") (_a2 = jQuery(`div.ant-select-item-option-content:contains(${info.resolution})`)[0]) == null ? void 0 : _a2.click();
      });
      if (selectNodeParent) {
        select.observe(selectNodeParent, { attributes: false, childList: true, subtree: true, characterDataOldValue: false });
      }
      insert.disconnect();
    });
    insert.observe(targetNode, { attributes: false, childList: false, subtree: true, characterDataOldValue: false });
  };
  function fillMediaInfo(info) {
    var _a2, _b;
    jQuery(currentSiteInfo.mediaInfo.selector).val((_b = (_a2 = info.mediaInfos) == null ? void 0 : _a2[0]) != null ? _b : "");
    jQuery(currentSiteInfo.mediaInfo.selector)[0].dispatchEvent(new Event("input"));
  }
  function fillDescription$1(info) {
    var _a2, _b;
    let description = info.description.replace(`[quote]${(_b = (_a2 = info.mediaInfos) == null ? void 0 : _a2[0]) != null ? _b : ""}[/quote]`, "").trim();
    if (info.mediaInfos && info.mediaInfos[1]) {
      info.mediaInfos.forEach((mediaInfo) => {
        description = description.replace(`[quote]${mediaInfo}[/quote]`, "");
      });
    }
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
      description = description.replace(/\[comparison[^[]*\[\/comparison\]/gi, "");
    } else if (info.sourceSite.match(/BeyondHD|UHDBits/)) {
      description = info.originalDescription || "";
    }
    description = description.replace(/\[url.*\[\/url\]/g, "").replace(/\[img.*\[\/img\]/g, "").replace(/\[\/?(i|b|center|quote|size|color)\]/g, "").replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, "").replace(/\n\n*/g, "\n");
    description = description.replace(/Screen(shot)?s:(\s*)\n?/gi, "").trim();
    if (info.sourceSite === "KEEPFRDS") {
      description = description.replace(/截图对比:[^\n]*\n?/gi, "");
    }
    if (description !== "") description = `\`\`\`
${description}
\`\`\``;
    if (info.comparisons && info.comparisons[0]) {
      for (const comparison in info.comparisons) {
        description += `
对比图 ${info.comparisons[comparison].title}

`;
        for (const img in info.comparisons[comparison].imgs) {
          description += `${info.comparisons[comparison].imgs[img]}

`;
        }
      }
    }
    const thanksQuoteClosed = GM_getValue("easy-seed.thanks-quote-closed") || "";
    if (!thanksQuoteClosed && info.sourceSite !== void 0) {
      description = `\`\`\`
转自 ${info.sourceSite} ，感谢原发布者！
\`\`\`
${description}`;
    }
    jQuery(currentSiteInfo.description.selector).val(description);
    jQuery(currentSiteInfo.description.selector)[0].dispatchEvent(new Event("input"));
  }
  async function autoFillDoubanInfo(selfDom, info) {
    try {
      jQuery(selfDom).text($t("获取中..."));
      const {
        imdbUrl,
        movieName,
        doubanUrl,
        description: descriptionData,
        title: torrentTitle
      } = info;
      if (!imdbUrl && !doubanUrl) {
        throw new Error($t("请填写正确链接"));
      }
      let doubanLink = "";
      if (doubanUrl && doubanUrl.match(/movie\.douban\.com/)) {
        doubanLink = doubanUrl;
      } else {
        const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
        if (doubanData) {
          let { id, season = "" } = doubanData;
          const tvData = await getTvSeasonData$1(doubanData);
          if (season && tvData) {
            id = tvData && tvData.id;
          }
          doubanLink = `https://movie.douban.com/subject/${id}`;
        }
      }
      if (doubanLink) {
        const {
          douban,
          imdb,
          subtitle,
          description,
          name
        } = CURRENT_SITE_INFO;
        if (CURRENT_SITE_NAME === "SSD") {
          jQuery(imdb.selector).val(doubanLink);
        } else {
          jQuery(douban == null ? void 0 : douban.selector).val(doubanLink);
        }
        if (!(descriptionData == null ? void 0 : descriptionData.match(/(片|译)\s*名/))) {
          const movieData = await getDoubanInfo(doubanLink);
          if (movieData) {
            Jt.success($t("获取成功"));
            const imdbLink = movieData.imdbLink;
            if (jQuery(imdb.selector).val() !== imdbLink && CURRENT_SITE_NAME !== "SSD") {
              jQuery(imdb.selector).val(imdbLink);
            }
            const torrentSubtitle = getSubTitle(movieData);
            if (CURRENT_SITE_NAME === "TTG") {
              jQuery(name.selector).val(`${torrentTitle || ""}[${torrentSubtitle}]`);
            } else {
              jQuery(subtitle.selector).val(torrentSubtitle);
            }
            if (CURRENT_SITE_NAME !== "SSD") {
              jQuery(description.selector).val(`${movieData.format}
${jQuery(description.selector).val()}`);
            }
          }
        } else {
          Jt.success($t("获取成功"));
        }
      }
    } catch (error) {
      Jt.error(error.message);
    } finally {
      jQuery(selfDom).text($t("获取豆瓣简介"));
    }
  }
  const autoFill = (info) => {
    if (info.doubanInfo) {
      return;
    }
    if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/)) {
      const { imdb, douban } = CURRENT_SITE_INFO;
      let selector = jQuery("");
      if (douban && (douban.selector && jQuery(douban.selector)) && jQuery(douban.selector).val()) {
        selector = jQuery(douban.selector);
      } else if (imdb) {
        selector = jQuery(imdb.selector);
      }
      if (selector) {
        selector.after(`<span id="auto-fill-douban">${$t("获取豆瓣简介")}</span>`);
      }
      jQuery("#auto-fill-douban").on("click", () => {
        const url = selector.val();
        if (url.match(/subject\/(\d+)/)) {
          info.doubanUrl = url;
        } else if (url.match(/imdb\.com\/title\/tt\d+/)) {
          info.imdbUrl = url;
        }
        autoFillDoubanInfo(jQuery("#auto-fill-douban"), info);
      });
    }
  };
  const handleMT = async (info) => {
    const targetNode = document.getElementById("root");
    const config = { childList: true, subtree: true };
    const observer = new MutationObserver((mutationsList, observer2) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const targetElement = document.querySelector("#name");
          const editor = document.querySelector(".editor-input");
          if (targetElement && editor) {
            observer2.disconnect();
            fillMTInfo(info);
            break;
          }
        }
      }
    });
    observer.observe(targetNode, config);
  };
  const fillMTInfo = async (info) => {
    var _a2;
    const currentSiteInfo2 = PT_SITE.MTeam;
    const { title, subtitle, audioCodec, doubanUrl, imdbUrl, mediaInfos, tags } = info;
    const mediaInfo = (_a2 = mediaInfos == null ? void 0 : mediaInfos[0]) != null ? _a2 : "";
    setInputValue(currentSiteInfo2.name.selector, title);
    setInputValue(currentSiteInfo2.subtitle.selector, subtitle || "");
    setInputValue(currentSiteInfo2.douban.selector, doubanUrl || "");
    setInputValue(currentSiteInfo2.imdb.selector, imdbUrl || "");
    setInputValue(currentSiteInfo2.mediainfo.selector, mediaInfo);
    setSelectValue(currentSiteInfo2.audioCodec.selector, currentSiteInfo2.audioCodec.map[audioCodec]);
    info.description = info.description.replace(mediaInfo.trim(), "");
    const targetHelper = new ExportHelper(info);
    targetHelper.descriptionHandler();
    targetHelper.disableTorrentChange();
    targetHelper.categoryHandler();
    let timeout = 0;
    Object.keys(tags).forEach((key) => {
      const siteTagMap = currentSiteInfo2.tags[key];
      if (tags[key] && siteTagMap) {
        setTimeout(() => {
          setInputValue(siteTagMap, "", true);
        }, timeout);
        timeout += 100;
      }
    });
    fillDescription(targetHelper.info.description);
  };
  function setInputValue(selector, value, isCheckbox = false) {
    const input = document.querySelector(selector);
    if (input) {
      const lastValue = input.value;
      input.value = value;
      const tracker = input._valueTracker;
      if (tracker) {
        tracker.setValue(lastValue);
      }
      const event = new Event(isCheckbox ? "click" : "input", { bubbles: true });
      input.dispatchEvent(event);
    }
  }
  function fillDescription(description) {
    var _a2;
    const editor = (_a2 = document.querySelector(".editor-input")) == null ? void 0 : _a2.__lexicalEditor;
    const descriptionArray = description.split("\n").map((line) => {
      return {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: line
          }
        ]
      };
    });
    const content = JSON.stringify({
      root: {
        children: descriptionArray,
        type: "root"
      }
    });
    const editorState = editor.parseEditorState(content);
    editor.update(() => {
      editor.setEditorState(editorState);
    });
  }
  const handleRED = async (info) => {
    var _a2;
    const { musicJson } = info;
    if (!musicJson) {
      return;
    }
    document.forms.upload_table.reset = () => {
    };
    const { name, year, musicInfo, bbBody, tags, releaseType, categoryId, wikiImage } = musicJson.group;
    const groupId = getUrlParam("groupid");
    if (!groupId) {
      const url = `/ajax.php?action=browse&searchstr=${name} ${year}`;
      const searchResult = await fetch(url);
      if (searchResult.status === "success" && searchResult.response.results.length > 0) {
        const groupId2 = searchResult.response.results[0].groupId;
        const timestampMatchArray2 = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
        const timestamp = (_a2 = timestampMatchArray2 == null ? void 0 : timestampMatchArray2[2]) != null ? _a2 : "";
        location.href = `${CURRENT_SITE_INFO.url}${CURRENT_SITE_INFO.uploadPath}?groupid=${groupId2}#timestamp=${timestamp}`;
        return;
      }
      jQuery("#categories").val(categoryId - 1);
      jQuery("#title").val(name);
      jQuery("#year").val(year);
      jQuery("#releasetype").val(releaseType);
      jQuery("#tags").val(tags.join(", "));
      jQuery("#album_desc").val(bbBody);
      jQuery("#image").val(wikiImage);
      fillArtistsForm(musicInfo);
    }
    fillReleaseInfo(musicJson.torrent);
  };
  function fillArtistsForm(musicInfo) {
    const artistTypeMap = {
      artists: "1",
      with: "2",
      composers: "4",
      conductor: "5",
      dj: "6",
      producer: "7",
      remixedBy: "3"
    };
    const artists = [];
    Object.keys(musicInfo).forEach((key) => {
      const typeKey = key;
      const values = musicInfo[typeKey].map((value) => {
        return __spreadProps(__spreadValues({}, value), {
          type: artistTypeMap[typeKey]
        });
      });
      artists.push(...values);
    });
    for (let i = 1; i < artists.length; i++) {
      AddArtistField();
    }
    artists.forEach((artist, index) => {
      const selector = index > 0 ? `#artist_${index}` : "#artist";
      jQuery(selector).val(artist.name).next().val(artist.type || "");
    });
  }
  function fillReleaseInfo(info) {
    var _a2;
    const { remasterYear, remasterRecordLabel, remasterCatalogueNumber, format: format2, encoding, media, description, scene, remasterTitle } = info;
    jQuery("#remaster_record_label").val(remasterRecordLabel);
    jQuery("#remaster_catalogue_number").val(remasterCatalogueNumber);
    jQuery("#format").val(format2);
    jQuery("#bitrate").val(encoding);
    jQuery("#media").val(media);
    if (media === "CD" && format2 === "FLAC") {
      (_a2 = document.querySelector("#format")) == null ? void 0 : _a2.dispatchEvent(new Event("change"));
    }
    jQuery("#remaster_year").val(remasterYear);
    jQuery("#release_desc").val(description);
    if (scene) {
      jQuery("#scene").attr("checked", "true");
    }
    if (remasterTitle) {
      jQuery("#remaster_title").val(remasterTitle);
    }
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var buffer = {};
  var base64Js = {};
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup$1 = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i$1 = 0, len = code.length; i$1 < len; ++i$1) {
    lookup$1[i$1] = code[i$1];
    revLookup[code.charCodeAt(i$1)] = i$1;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for (i = 0; i < len; i += 4) {
      tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup$1[num >> 18 & 63] + lookup$1[num >> 12 & 63] + lookup$1[num >> 6 & 63] + lookup$1[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      parts.push(
        lookup$1[tmp >> 2] + lookup$1[tmp << 4 & 63] + "=="
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1];
      parts.push(
        lookup$1[tmp >> 10] + lookup$1[tmp >> 4 & 63] + lookup$1[tmp << 2 & 63] + "="
      );
    }
    return parts.join("");
  }
  var ieee754 = {};
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e2, m2;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d2 = isLE ? -1 : 1;
    var s2 = buffer2[offset + i];
    i += d2;
    e2 = s2 & (1 << -nBits) - 1;
    s2 >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e2 = e2 * 256 + buffer2[offset + i], i += d2, nBits -= 8) {
    }
    m2 = e2 & (1 << -nBits) - 1;
    e2 >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m2 = m2 * 256 + buffer2[offset + i], i += d2, nBits -= 8) {
    }
    if (e2 === 0) {
      e2 = 1 - eBias;
    } else if (e2 === eMax) {
      return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
    } else {
      m2 = m2 + Math.pow(2, mLen);
      e2 = e2 - eBias;
    }
    return (s2 ? -1 : 1) * m2 * Math.pow(2, e2 - mLen);
  };
  ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
    var e2, m2, c2;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d2 = isLE ? 1 : -1;
    var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m2 = isNaN(value) ? 1 : 0;
      e2 = eMax;
    } else {
      e2 = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c2 = Math.pow(2, -e2)) < 1) {
        e2--;
        c2 *= 2;
      }
      if (e2 + eBias >= 1) {
        value += rt / c2;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c2 >= 2) {
        e2++;
        c2 /= 2;
      }
      if (e2 + eBias >= eMax) {
        m2 = 0;
        e2 = eMax;
      } else if (e2 + eBias >= 1) {
        m2 = (value * c2 - 1) * Math.pow(2, mLen);
        e2 = e2 + eBias;
      } else {
        m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e2 = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i] = m2 & 255, i += d2, m2 /= 256, mLen -= 8) {
    }
    e2 = e2 << mLen | m2;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i] = e2 & 255, i += d2, e2 /= 256, eLen -= 8) {
    }
    buffer2[offset + i - d2] |= s2 * 128;
  };
  (function(exports) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    var base64 = base64Js;
    var ieee754$1 = ieee754;
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e2) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      var valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      var b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(
          value[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill2, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill2 !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill2, encoding) : createBuffer(size).fill(fill2);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(size, fill2, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength2(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy2 = new Uint8Array(arrayView);
        return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      var buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a2, b) {
      if (isInstance(a2, Uint8Array)) a2 = Buffer2.from(a2, a2.offset, a2.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a2) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a2 === b) return 0;
      var x2 = a2.length;
      var y2 = b.length;
      for (var i = 0, len = Math.min(x2, y2); i < len; ++i) {
        if (a2[i] !== b[i]) {
          x2 = a2[i];
          y2 = b[i];
          break;
        }
      }
      if (x2 < y2) return -1;
      if (y2 < x2) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat2(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer2 = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer2.length) {
            Buffer2.from(buf).copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength2(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength2;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m2) {
      var i = b[n];
      b[n] = b[m2];
      b[m2] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x2 = thisEnd - thisStart;
      var y2 = end - start;
      var len = Math.min(x2, y2);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y2 = targetCopy[i];
          break;
        }
      }
      if (x2 < y2) return -1;
      if (y2 < x2) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j2 = 0; j2 < valLength; j2++) {
            if (read(arr, i + j2) !== read(val, j2)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength22, noAssert) {
      offset = offset >>> 0;
      byteLength22 = byteLength22 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength22, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength22 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength22, noAssert) {
      offset = offset >>> 0;
      byteLength22 = byteLength22 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength22, this.length);
      }
      var val = this[offset + --byteLength22];
      var mul = 1;
      while (byteLength22 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength22] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength22, noAssert) {
      offset = offset >>> 0;
      byteLength22 = byteLength22 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength22, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength22 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength22);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength22, noAssert) {
      offset = offset >>> 0;
      byteLength22 = byteLength22 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength22, this.length);
      var i = byteLength22;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength22);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754$1.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754$1.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength22, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength22 = byteLength22 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength22) - 1;
        checkInt(this, value, offset, byteLength22, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength22 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength22;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength22, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength22 = byteLength22 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength22) - 1;
        checkInt(this, value, offset, byteLength22, maxBytes, 0);
      }
      var i = byteLength22 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength22;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength22, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength22 - 1);
        checkInt(this, value, offset, byteLength22, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength22 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength22;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength22, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength22 - 1);
        checkInt(this, value, offset, byteLength22, limit - 1, -limit);
      }
      var i = byteLength22 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength22;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code2 = val.charCodeAt(0);
          if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
            val = code2;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c2, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c2 = str.charCodeAt(i);
        hi = c2 >> 8;
        lo = c2 % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      var alphabet2 = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j2 = 0; j2 < 16; ++j2) {
          table[i16 + j2] = alphabet2[i] + alphabet2[j2];
        }
      }
      return table;
    }();
  })(buffer);
  const handleGazelleMusic = async (info) => {
    var _a2;
    const { musicJson } = info;
    if (!musicJson) {
      return;
    }
    const { name, year, recordLabel, catalogueNumber } = musicJson.group;
    const { remasterTitle, remasterCatalogueNumber, remasterRecordLabel } = musicJson.torrent;
    const groupId = getUrlParam("groupid");
    if (!groupId) {
      const searchResult = await fetch(`/ajax.php?action=browse&searchstr=${name} ${year}`);
      if (searchResult.status === "success" && searchResult.response.results.length > 0) {
        const groupId2 = searchResult.response.results[0].groupId;
        const timestampMatchArray2 = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
        const timestamp = (_a2 = timestampMatchArray2 == null ? void 0 : timestampMatchArray2[2]) != null ? _a2 : "";
        location.href = `${CURRENT_SITE_INFO.url}${CURRENT_SITE_INFO.uploadPath}?groupid=${groupId2}#timestamp=${timestamp}`;
        return;
      }
    }
    if (CURRENT_SITE_NAME === "Orpheus") {
      if (!remasterCatalogueNumber && !remasterRecordLabel && !remasterTitle && !recordLabel && !catalogueNumber) {
        musicJson.torrent.remastered = false;
      }
    }
    if (CURRENT_SITE_NAME === "DicMusic") {
      musicJson.group.wikiBody = toUnicodeEntities(musicJson.group.wikiBody);
    }
    fillJsonToUploadTable(musicJson, name);
  };
  function fillJsonToUploadTable(musicJson, name) {
    const buf = buffer.Buffer.from(JSON.stringify({
      status: "success",
      response: musicJson
    }));
    attachFile({
      data: buf,
      selector: "#torrent-json-file",
      contentType: "application/json",
      fileName: name,
      format: "json"
    });
  }
  function attachFile({ data, selector, contentType, fileName, format: format2, charset = "UTF-8" }) {
    const buf = buffer.Buffer.isBuffer(data) ? data : buffer.Buffer.from(data, charset);
    const base64Data = buf.toString("base64");
    const fileInput = jQuery(selector);
    if (base64Data && fileInput.length > 0) {
      const blob = base64ToBlob(base64Data, contentType);
      const file = new File([blob], `${fileName}.${format2}`, { type: contentType });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const uploadInput = fileInput[0];
      uploadInput.files = dataTransfer.files;
      uploadInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  function toUnicodeEntities(str) {
    const excludedChars = ["<", ">", "&", ";", "/"];
    return str.split("").map((char) => {
      const code2 = char.charCodeAt(0);
      if (code2 > 127 && !excludedChars.includes(char)) {
        const hexCode = code2.toString(16);
        return `&#${parseInt(hexCode, 16)};`;
      }
      return char;
    }).join("");
  }
  const siteHandlers = {
    PTP: handlePTP,
    GPW: handleGPW,
    NPUBits: handleNPU,
    BYR: handleBYR,
    SC: handleSC,
    KG: handleKG,
    BeyondHD: handleBHD,
    Bdc: handleBdc,
    ZHUQUE: handleZQ,
    MTeam: handleMT,
    RED: handleRED,
    HDRoute: handleHDRoute,
    DicMusic: handleGazelleMusic,
    Orpheus: handleGazelleMusic,
    iTS: handleITS,
    PTN: handlePTN
  };
  const fillTargetForm = (info) => {
    var _a2;
    autoFill(info || {});
    if (!info) {
      return;
    }
    console.log(info);
    const handler = siteHandlers[CURRENT_SITE_NAME];
    if (handler) {
      handler(info);
    }
    const targetTorrentInfo = __spreadValues({}, info);
    const isBluray = !!((_a2 = info == null ? void 0 : info.videoType) == null ? void 0 : _a2.match(/bluray/i));
    targetTorrentInfo.isBluray = isBluray;
    const targetHelper = new ExportHelper(targetTorrentInfo);
    targetHelper.disableTorrentChange();
    targetHelper.fillTorrentFile();
    if (!!handler && !CURRENT_SITE_NAME.match(/TJUPT|HDRoute|PTN|iTS/)) {
      return;
    }
    targetHelper.prepareToFillInfo();
    targetHelper.torrentTitleHandler();
    targetHelper.imdbHandler();
    targetHelper.descriptionHandler();
    targetHelper.fillBasicAttributes();
    targetHelper.categoryHandler();
    targetHelper.fillRemainingInfo();
    targetHelper.dealWithMoreSites();
  };
  const getPTPInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h;
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const torrentDom = jQuery(`#torrent_${torrentId}`);
    const ptpMovieTitle = (_d2 = (_c = (_b = (_a2 = jQuery(".page__title").text()) == null ? void 0 : _a2.match(/]?([^[]+)/)) == null ? void 0 : _b[1]) == null ? void 0 : _c.trim()) != null ? _d2 : "";
    const [movieName, movieAkaName = ""] = ptpMovieTitle.split(" AKA ");
    const mediaInfoArray = [];
    torrentDom.find(".mediainfo.mediainfo--in-release-description").next("blockquote").each(function() {
      const textContent = jQuery(this).text();
      if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
        mediaInfoArray.push(textContent);
      }
    });
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.movieAkaName = movieAkaName;
    TORRENT_INFO.imdbUrl = (_f = (_e2 = jQuery("#imdb-title-link")) == null ? void 0 : _e2.attr("href")) != null ? _f : "";
    TORRENT_INFO.year = (_h = (_g = jQuery(".page__title").text().match(/\[(\d+)\]/)) == null ? void 0 : _g[1]) != null ? _h : "";
    const torrentHeaderDom = jQuery(`#group_torrent_header_${torrentId}`);
    const torrentLink = torrentHeaderDom.find('a[title="Download"]').attr("href");
    CURRENT_SITE_INFO.torrentLink = torrentLink;
    TORRENT_INFO.category = getPTPType();
    const screenshots = getPTPImage();
    getDescription$1(torrentId).then((res) => {
      var _a3, _b2, _c2;
      const releaseName = torrentHeaderDom.data("releasename");
      const releaseGroup = getReleaseGroup(releaseName);
      const descriptionData = formatDescriptionData$1(res, screenshots, mediaInfoArray);
      TORRENT_INFO.description = descriptionData;
      const infoArray = torrentHeaderDom.find("#PermaLinkedTorrentToggler").text().trim().split(" / ");
      const [codes, container, source, resolution, ...otherInfo] = infoArray;
      const isRemux = otherInfo.includes("Remux");
      const { knownTags, otherTags } = getTags$1(otherInfo, [releaseGroup]);
      TORRENT_INFO.videoType = source === "WEB" ? "web" : getVideoType$g(container, isRemux, codes, source);
      const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
      TORRENT_INFO.tags = __spreadValues({}, knownTags);
      TORRENT_INFO.otherTags = otherTags;
      TORRENT_INFO.resolution = resolution;
      const mediaInfoOrBDInfo = mediaInfoArray.filter((media) => {
        return TORRENT_INFO.videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
      });
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo.map((v2) => v2.trim());
      const infoFromMediaInfoinfo = getInfoFromMediaInfo(TORRENT_INFO.mediaInfos[0]);
      if (infoFromMediaInfoinfo.subtitles) {
        for (let i = 0; i < ((_a3 = infoFromMediaInfoinfo.subtitles) == null ? void 0 : _a3.length); i++) {
          if (/Chinese|Traditional|Simplified|Cantonese|Mandarin/i.test(infoFromMediaInfoinfo.subtitles[i])) {
            TORRENT_INFO.tags.chinese_subtitle = true;
            break;
          }
        }
      }
      const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo.join("\n\n"));
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.tags = __spreadValues(__spreadValues({}, TORRENT_INFO.tags), mediaTags);
      const torrentName = formatTorrentTitle(releaseName);
      TORRENT_INFO.title = torrentName;
      TORRENT_INFO.source = getPTPSource(source, codes, resolution);
      const size = (_c2 = (_b2 = torrentHeaderDom.find(".nobr span").attr("title")) == null ? void 0 : _b2.replace(/[^\d]/g, "")) != null ? _c2 : "";
      TORRENT_INFO.size = parseFloat(size);
      TORRENT_INFO.screenshots = screenshots;
      TORRENT_INFO.poster = jQuery(".sidebar-cover-image").attr("src") || "";
      console.log(TORRENT_INFO);
    });
    let country = [];
    const matchArray = jQuery("#movieinfo div").text().match(/Country:\s+([^\n]+)/);
    if (matchArray && matchArray.length > 0) {
      country = matchArray == null ? void 0 : matchArray[1].replace(/(,)\s+/g, "$1").split(",");
    }
    TORRENT_INFO.area = getAreaCode(country == null ? void 0 : country[0]);
    const trumpReason = jQuery(`#trumpable_${torrentId} span`).text() || "";
    TORRENT_INFO.hardcodedSub = trumpReason.includes("Hardcoded Subtitles");
    return TORRENT_INFO;
  };
  const getPTPType = () => {
    const typeMap = {
      "Feature Film": "movie",
      "Short Film": "movie",
      "Stand-up Comedy": "other",
      Miniseries: "tvPack",
      "Live Performance": "concert",
      "Movie Collection": "movie"
    };
    const ptpType = jQuery("#torrent-table .basic-movie-list__torrent-edition__main").eq(0).text();
    return typeMap[ptpType];
  };
  const getPTPImage = () => {
    var _a2;
    const imgList = [];
    const torrentInfoPanel = jQuery(".movie-page__torrent__panel");
    const imageDom = torrentInfoPanel.find(".bbcode__image");
    for (let i = 0; i < imageDom.length; i++) {
      const parent = imageDom[i].parentElement;
      if ((parent == null ? void 0 : parent.tagName) === "A" && ((_a2 = parent == null ? void 0 : parent.getAttribute("href")) == null ? void 0 : _a2.match(/\.png$/))) {
        imgList.push(parent.getAttribute("href") || "");
      } else {
        const imgDom = imageDom[i];
        const imgSrc = imgDom.getAttribute("src") || imgDom.getAttribute("alt");
        imgList.push(imgSrc || "");
      }
    }
    return imgList;
  };
  const getPTPSource = (source, codes, resolution) => {
    if (codes.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return "uhdbluray";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  const getVideoType$g = (container, isRemux, codes, source) => {
    let type = "";
    if (isRemux) {
      type = "remux";
    } else if (codes.match(/BD50|BD25/ig)) {
      type = "bluray";
    } else if (codes.match(/BD66|BD100/ig)) {
      type = "uhdbluray";
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      type = "dvdrip";
    } else if (codes.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      type = "dvd";
    } else if (container.match(/MKV|MP4/i)) {
      type = "encode";
    }
    return type;
  };
  const getDescription$1 = async (id) => {
    const url = `${PT_SITE.PTP.url}/torrents.php?action=get_description&id=${id}`;
    const data = await fetch(url, {
      responseType: void 0
    });
    if (data) {
      const element = document.createElement("span");
      element.innerHTML = data;
      return element.innerText || element.textContent || "";
    }
    return "";
  };
  const formatDescriptionData$1 = (data, screenshots, mediaInfoArray) => {
    let descriptionData = data.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n").replace(/http:\/\/ptpimg.me/g, "https://ptpimg.me");
    TORRENT_INFO.originalDescription = descriptionData;
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, "i");
      if (!descriptionData.match(regStr)) {
        const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, "i");
        if (descriptionData.match(regOldFormat)) {
          descriptionData = descriptionData.replace(regOldFormat, `[img]${screenshot}[/img]`);
        } else {
          descriptionData = descriptionData.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, "ig"), `[img]${screenshot}[/img]`);
        }
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?mediainfo\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
      const slash = p1 || "";
      return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[quote][$2]$3[/$2][/quote]");
    const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/ig) || [];
    const comparisons = [];
    comparisonArray.forEach((item) => {
      var _a2, _b, _c, _d2;
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
      const reason = (_b = (_a2 = item.match(/(\n.*\n)?\[comparison=/i)) == null ? void 0 : _a2[1]) != null ? _b : "";
      const title = (_d2 = (_c = item.match(/\[comparison=(.*?)\]/i)) == null ? void 0 : _c[1]) != null ? _d2 : "";
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, "").split(/[ \r\n]/);
      const imgs = [];
      Array.from(new Set(comparisonImgArray)).forEach((item2) => {
        const formatImg = item2.replace(/\s*/g, "");
        if (item2.match(/^https?.+/)) {
          imgs.push(formatImg);
          descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item2}`, "gi"), `[img]${formatImg}[/img]`);
        } else if (item2.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ""));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/ig, "");
    mediaInfoArray.forEach((mediaInfo) => {
      const regStr = new RegExp(`\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo).slice(0, 1e4)}`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(mediaInfo, `[quote]${mediaInfo}[/quote]`);
      }
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = `${jQuery("#synopsis").text()}
${descriptionData}`;
    }
    return descriptionData;
  };
  function getTags$1(rawTags, exclude = []) {
    const { editionTags } = PT_SITE.PTP.sourceInfo;
    const knownTags = {};
    const otherTags = {};
    for (const rawTag of rawTags) {
      const tag = editionTags[rawTag];
      if (tag) {
        knownTags[tag] = true;
      } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/Freeleech|Halfleech|Half-Leech/i)) ;
      else {
        otherTags[rawTag] = true;
      }
    }
    return {
      knownTags,
      otherTags
    };
  }
  function getReleaseGroup(releasename) {
    var _a2, _b;
    return (_b = (_a2 = releasename.match(/-(\w+?)$/)) == null ? void 0 : _a2[1]) != null ? _b : "";
  }
  const getBHDInfo = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const basicInfo = getBasicInfo$6();
    const editionTags = getEditionTags(basicInfo);
    const { Category, Name, Source, Type, Size } = basicInfo;
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const TMDBYear = jQuery(".movie-heading a:last").text();
    const movieName = jQuery(".movie-heading a:first").text();
    if (!TMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
      TORRENT_INFO.year = matchYear ? matchYear[0] : "";
    } else {
      TORRENT_INFO.year = TMDBYear;
    }
    const descriptionDom = jQuery(".panel-heading:contains(Description)").next(".panel-body").find(".forced-nfo");
    const descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    TORRENT_INFO.comparisons = getComparisonImgs$1();
    const { category: movieCat, countries, imdbUrl } = getMovieDetails();
    TORRENT_INFO.movieName = movieName;
    let category = Category.toLowerCase().replace(/s/, "");
    category = movieCat === "Animation" ? "cartoon" : category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSource$2(Source, Type);
    TORRENT_INFO.area = getAreaCode(countries);
    TORRENT_INFO.videoType = getVideoType$f(Source, Type);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const mediaInfo = jQuery("#stats-full code").text();
    TORRENT_INFO.mediaInfos = [mediaInfo];
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.originalDescription = `${descriptionBBCode}`;
    TORRENT_INFO.description = `
[quote]${mediaInfo}[/quote]
${descriptionBBCode}`;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution = "", mediaTags } = getInfoFunc(mediaInfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = __spreadValues(__spreadValues(__spreadValues({}, tags), mediaTags), editionTags.knownTags);
    TORRENT_INFO.otherTags = editionTags.otherTags;
    TORRENT_INFO.imdbUrl = imdbUrl;
  };
  const getBasicInfo$6 = () => {
    const basicInfo = {
      Category: "",
      Name: "",
      Source: "",
      Type: "",
      Size: "",
      Video: "",
      Audio: "",
      Hybrid: "",
      Edition: "",
      Region: "",
      Extras: ""
    };
    jQuery(".dotborder").each((index, element) => {
      const key = jQuery(element).find("td:first").text();
      const value = jQuery(element).find("td:last").text();
      basicInfo[key] = value.replace(/\n/g, "").trim();
    });
    console.log(basicInfo);
    return basicInfo;
  };
  const getMovieDetails = () => {
    const infoList = jQuery(".movie-details a");
    const movieDetail = {
      category: "",
      countries: "",
      imdbUrl: ""
    };
    movieDetail.imdbUrl = jQuery('span.badge-meta[title*="IMDb"] > a').attr("href") || "";
    infoList.each((index, element) => {
      var _a2, _b;
      const urlParams = (_b = (_a2 = jQuery(element).attr("href")) == null ? void 0 : _a2.replace(/.+\//g, "").split("=")) != null ? _b : "";
      if (urlParams.length > 1) {
        let key = decodeURI(urlParams[0]);
        const value = urlParams[1];
        if (key === "g[]") {
          key = "category";
        }
        movieDetail[key] = value;
      }
    });
    return movieDetail;
  };
  const getSource$2 = (source, resolution) => {
    if (resolution.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/UHD/i)) {
      return "uhdbluray";
    }
    if (source.match(/WEB|WEB-DL/i)) {
      return "web";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  const getVideoType$f = (source, type) => {
    type = type.replace(/\s/g, "");
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/BD50|BD25/i)) {
      return "bluray";
    } else if (type.match(/UHD50|UHD66|UHD100/i)) {
      return "uhdbluray";
    } else if (type.match(/DVD5|DVD9/i)) {
      return "dvd";
    } else if (source.match(/WEB|WEB-DL/i)) {
      return "web";
    } else if (type.match(/\d{3,4}p/i)) {
      return "encode";
    }
    return type;
  };
  const getEditionTags = (basicInfo) => {
    const editionTags = PT_SITE.BeyondHD.sourceInfo.editionTags;
    const knownTags = {};
    const otherTags = {
      Hybrid: false
    };
    const { Video, Audio, Edition, Extras, Hybrid } = basicInfo;
    const text2 = [Video, Audio, Edition, Extras].filter((v2) => Boolean(v2)).join(" / ");
    const mediaTags = Object.entries(editionTags);
    for (const [source, target] of mediaTags) {
      if (text2.includes(source)) {
        knownTags[target] = true;
      }
    }
    if (Hybrid) {
      otherTags.Hybrid = true;
    }
    if (knownTags.hdr10_plus && knownTags.hdr) {
      delete knownTags.hdr;
    }
    return {
      knownTags,
      otherTags
    };
  };
  function getComparisonImgs$1() {
    var _a2, _b;
    const title = (_b = (_a2 = jQuery("#screenMain .screenParent").text()) == null ? void 0 : _a2.replace(/\[Show\]|Comparison/g, "")) == null ? void 0 : _b.trim();
    const imgs = Array.from(jQuery(".screenComparison img")).map((img) => {
      var _a3, _b2;
      return (_b2 = (_a3 = jQuery(img)) == null ? void 0 : _a3.attr("src")) != null ? _b2 : "";
    });
    if (title !== "") {
      return [
        {
          title,
          imgs,
          reason: ""
        }
      ];
    }
  }
  const getHDBInfo = async () => {
    var _a2, _b;
    const torrentId = getUrlParam("id");
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const editDom = jQuery("#details tr").has("a:contains(Edit torrent)");
    const descriptionDom = editDom.length > 0 ? editDom.prev() : jQuery("#details >tbody >tr:contains(tags) + tr");
    let descriptionBBCode = getFilterBBCode(descriptionDom.find(">td")[0]);
    descriptionBBCode = (_b = (_a2 = descriptionBBCode.match(/\[quote\]((.|\n)+)\[\/quote\]/)) == null ? void 0 : _a2[1]) != null ? _b : "";
    TORRENT_INFO.description = descriptionBBCode;
    const { size, category, videoType } = getBasicInfo$5();
    const title = jQuery("h1").eq(0).text();
    TORRENT_INFO.title = formatTorrentTitle(title);
    const tags = getTagsFromSubtitle(title);
    const isMovieType = jQuery(".contentlayout h1").length > 0;
    const IMDBLinkDom = isMovieType ? jQuery(".contentlayout h1") : jQuery("#details .showlinks li").eq(1);
    if (isMovieType) {
      const IMDBYear = IMDBLinkDom.prop("lastChild").nodeValue.replace(/\s|\(|\)/g, "");
      const movieName = IMDBLinkDom.find("a").text();
      TORRENT_INFO.movieName = movieName;
      if (!IMDBYear) {
        const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
        TORRENT_INFO.year = matchYear ? matchYear[0] : "";
      } else {
        TORRENT_INFO.year = IMDBYear;
      }
    }
    TORRENT_INFO.imdbUrl = IMDBLinkDom.find("a").attr("href") || "";
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.videoType = videoType;
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    if (!isBluray) {
      getMediaInfo$1(torrentId).then((data) => {
        if (data) {
          TORRENT_INFO.mediaInfos = [data];
          descriptionBBCode += `
[quote]${data}[/quote]`;
          TORRENT_INFO.description = descriptionBBCode;
          const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(data);
          TORRENT_INFO.videoCodec = videoCodec;
          TORRENT_INFO.audioCodec = audioCodec;
          TORRENT_INFO.resolution = resolution || "";
          TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
        }
      });
    } else {
      TORRENT_INFO.mediaInfos = bdinfo;
      const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc((bdinfo == null ? void 0 : bdinfo[0]) || descriptionBBCode);
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution || "";
      TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
    }
    TORRENT_INFO.size = size;
    TORRENT_INFO.screenshots = await getImages$1(descriptionBBCode);
  };
  const getBasicInfo$5 = () => {
    const videoTypeMap = {
      "Blu-ray/HD DVD": "bluray",
      Capture: "hdtv",
      Encode: "encode",
      Remux: "remux",
      "WEB-DL": "web"
    };
    const info = jQuery("th:contains(Category)").next().text();
    const size = jQuery("th:contains(Size)").eq(0).next().text();
    const splitArray = info.split("(");
    const category = splitArray[0].trim().toLowerCase();
    const videoCodec = splitArray[1].split(",")[0].toLowerCase().replace(/\./g, "");
    const videoType = splitArray[1].split(",")[1].replace(/\)/g, "").trim();
    return {
      size: getSize(size),
      category,
      videoCodec,
      videoType: videoTypeMap[videoType]
    };
  };
  const getMediaInfo$1 = async (torrentId) => {
    const res = await fetch(`https://hdbits.org/details/mediainfo?id=${torrentId}`, {
      responseType: void 0
    });
    const data = res.replace(/\r\n/g, "\n");
    return data || "";
  };
  const getImages$1 = async (description) => {
    const screenshots = await getScreenshotsFromBBCode(description);
    return screenshots;
  };
  const getTikInfo = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const typeText = jQuery("td.heading:contains(Type)").eq(0).next().text();
    const isMovie = typeText !== "TV-Series";
    const tags = [];
    jQuery("td.heading:contains(Tags)").eq(0).next().children().each((_2, child) => {
      tags.push(child.textContent);
    });
    const size = jQuery("td.heading:contains(Size)").eq(0).next().text().replace(/[0-9.]+ GB\s+\(([0-9,]+) bytes\)/i, (_2, size2) => size2.replace(/,/g, ""));
    const title = jQuery("h1").eq(0).text();
    const imdbNumber = jQuery('span:contains("IMDB id:") a').text();
    const descContainer = jQuery("td.heading:contains(Description)").eq(0).next();
    const desc = descContainer.text();
    const rawDesc = descContainer.html();
    TORRENT_INFO.mediaInfos = [jQuery("td[style~=dotted]").text()];
    const { videoCodec, audioCodec, resolution = "", mediaTags = {} } = getInfoFromBDInfo(TORRENT_INFO.mediaInfos[0]);
    TORRENT_INFO.size = parseInt(size, 10);
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.description = desc;
    TORRENT_INFO.screenshots = getImagesFromDesc(rawDesc);
    TORRENT_INFO.year = jQuery("span.gr_hsep:contains(Year)").text().replace("Year: ", "").trim();
    TORRENT_INFO.movieName = jQuery("div.gr_tdsep h1:first-child").text();
    TORRENT_INFO.imdbUrl = `https://www.imdb.com/title/tt${imdbNumber}/`;
    TORRENT_INFO.category = isMovie ? "movie" : "tvPack";
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.videoType = tags.includes("Blu-ray") ? "bluray" : "dvd";
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = mediaTags;
  };
  function getImagesFromDesc(desc) {
    const screenshots = [];
    if (!desc) {
      return screenshots;
    }
    const matches = desc.match(/[a-z0-9]{32}/g);
    if (!matches) {
      return screenshots;
    }
    for (const m2 of matches) {
      screenshots.push(`https://hostik.cinematik.net/gal/ori/${m2[0]}/${m2[1]}/${m2}.jpg`);
    }
    return screenshots;
  }
  const getTTGInfo = async () => {
    var _a2, _b, _c, _d2, _e2;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const headTitle = jQuery("#main_table h1").eq(0).text();
    const title = formatTorrentTitle((_b = (_a2 = headTitle.match(/[^[]+/)) == null ? void 0 : _a2[0]) != null ? _b : "");
    TORRENT_INFO.title = title;
    TORRENT_INFO.subtitle = headTitle.replace(title, "").replace(/\[|\]/g, "");
    const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle + TORRENT_INFO.title);
    const mediaTecInfo = getTorrentValueDom("类型").text();
    const { category, area, videoType } = getCategoryAndArea(mediaTecInfo);
    TORRENT_INFO.area = area;
    TORRENT_INFO.videoType = getVideoType$e(title, videoType);
    const year = (_c = TORRENT_INFO.title.match(/(18|19|20)\d{2}/g)) != null ? _c : [];
    TORRENT_INFO.year = year ? year.pop() : "";
    const imdbUrl = getTorrentValueDom("IMDb").find("a").attr("href");
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    const sizeStr = (_e2 = (_d2 = getTorrentValueDom("尺寸").text().match(/\(((\d|,)+)\s*字节\)/i)) == null ? void 0 : _d2[1]) != null ? _e2 : "";
    TORRENT_INFO.size = parseInt(sizeStr.replace(/,/g, ""), 10);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    TORRENT_INFO.isForbidden = !!jQuery("#kt_d").text().match(/禁转/);
    window.onload = async () => {
      var _a3, _b2, _c2, _d3, _e3, _f, _g;
      const descriptionDom = jQuery("#kt_d");
      const bbCodes = getFilterBBCode(descriptionDom[0]);
      if (!imdbUrl) {
        TORRENT_INFO.imdbUrl = (_a3 = bbCodes.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _a3[0];
      } else {
        TORRENT_INFO.imdbUrl = imdbUrl;
      }
      const description = getDescription(bbCodes, title);
      TORRENT_INFO.description = description;
      const comparisons = getComparisonImgs(description);
      TORRENT_INFO.comparisons = comparisons;
      const doubanUrl = (_b2 = bbCodes.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)) == null ? void 0 : _b2[0];
      if (doubanUrl) {
        TORRENT_INFO.doubanUrl = doubanUrl;
      }
      const areaMatch = (_c2 = bbCodes.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _c2[2];
      if (areaMatch) {
        TORRENT_INFO.area = getAreaCode(areaMatch);
      }
      if (!category) {
        TORRENT_INFO.category = getCategoryFromDesc(bbCodes);
      } else {
        TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
      }
      const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(bbCodes);
      const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
      if (mediaInfoOrBDInfo) {
        TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
        const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo == null ? void 0 : mediaInfoOrBDInfo[0]);
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        TORRENT_INFO.resolution = resolution || "";
        TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      } else {
        let resolution = (_e3 = (_d3 = TORRENT_INFO.title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _d3[0]) != null ? _e3 : "";
        if (!resolution && resolution.match(/4k|uhd/i)) {
          resolution = "2160p";
        }
        TORRENT_INFO.resolution = resolution;
        TORRENT_INFO.audioCodec = getAudioCodecFromTitle(TORRENT_INFO.title);
        if (bbCodes.match(/VIDEO(\.| )*CODEC/i)) {
          const matchCodec = (_f = bbCodes.match(/VIDEO(\.| )*CODEC\.*:?\s*([^\s_:]+)?/i)) == null ? void 0 : _f[2];
          if (matchCodec) {
            TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, "").toLowerCase();
          } else {
            const { title: title2 } = TORRENT_INFO;
            TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title2);
          }
        }
        if (bbCodes.match(/AUDIO\s*CODEC/i)) {
          const matchCodec = (_g = bbCodes.match(/AUDIO\s*CODEC\.*:?\s*(.+)/i)) == null ? void 0 : _g[1];
          if (matchCodec) {
            TORRENT_INFO.audioCodec = getAudioCodecFromTitle(matchCodec);
          }
        }
      }
      let screenshots = await getImages(bbCodes);
      comparisons.forEach((comparison) => {
        screenshots = screenshots.filter((img) => !comparison.imgs.includes(img));
      });
      TORRENT_INFO.screenshots = screenshots;
    };
  };
  const getCategoryAndArea = (mediaInfo) => {
    let category = "";
    let area = "";
    let videoType = "";
    if (mediaInfo.match(/电影/)) {
      category = "movie";
    } else if (mediaInfo.match(/剧包/)) {
      category = "tvPack";
    } else if (mediaInfo.match(/剧/)) {
      category = "tv";
    } else if (mediaInfo.match(/纪录/)) {
      category = "documentary";
    } else if (mediaInfo.match(/综艺/)) {
      category = "variety";
    } else if (mediaInfo.match(/体育/)) {
      category = "sport";
    } else if (mediaInfo.match(/演唱会/)) {
      category = "concert";
    } else if (mediaInfo.match(/动漫/)) {
      category = "cartoon";
    }
    if (mediaInfo.match(/韩/)) {
      area = "KR";
    } else if (mediaInfo.match(/日/)) {
      area = "JP";
    } else if (mediaInfo.match(/华/)) {
      area = "CN";
    } else if (mediaInfo.match(/欧/)) {
      area = "US";
    }
    if (mediaInfo.match(/UHD原盘/i)) {
      videoType = "uhdbluray";
    } else if (mediaInfo.match(/bluray原盘/i)) {
      videoType = "bluray";
    } else if (mediaInfo.match(/DVD/i)) {
      videoType = "dvd";
    }
    return {
      category,
      area,
      videoType
    };
  };
  const getImages = (bbcode) => {
    var _a2, _b;
    if (bbcode.match(/More\.Screens/i)) {
      const moreScreen = (_b = (_a2 = bbcode.match(/\.More\.Screens\[\/u\]\[\/color\]\n((.|\n)+\[\/(url|img)\])/)) == null ? void 0 : _a2[1]) != null ? _b : "";
      return getScreenshotsFromBBCode(moreScreen);
    }
    return getScreenshotsFromBBCode(bbcode);
  };
  const getVideoType$e = (title, videoType) => {
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/remux/i)) {
      return "remux";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return videoType;
  };
  const getTorrentValueDom = (key) => {
    return jQuery(`#main_table td.heading:contains(${key})`).next();
  };
  const getCategoryFromDesc = (desc) => {
    let category = "movie";
    const { title, subtitle } = TORRENT_INFO;
    if (title.match(/s0?\d{1,2}/i) || desc.match(/集\s*数/)) {
      if (title.match(/s0?\d{1,2}e0\d{1,2}/i) || (subtitle == null ? void 0 : subtitle.match(/第[^\s]集/))) {
        category = "tv";
      } else {
        category = "tvPack";
      }
    } else if (desc.match(/动画/)) {
      category = "cartoon";
    } else if (desc.match(/纪录/)) {
      category = "documentary";
    }
    return category;
  };
  function getDescription(bbcode, title) {
    var _a2, _b, _c, _d2, _e2, _f;
    const discountMatch = (_b = (_a2 = bbcode.match(/\[color=\w+\]本种子.+?\[\/color\]/)) == null ? void 0 : _a2[0]) != null ? _b : "";
    if (discountMatch) {
      bbcode = bbcode.replace(discountMatch, "");
    }
    const noneSenseNumberMatch = (_d2 = (_c = bbcode.match(/@\d+?\(\d+?\)/)) == null ? void 0 : _c[0]) != null ? _d2 : "";
    if (noneSenseNumberMatch) {
      bbcode = bbcode.replace(noneSenseNumberMatch, "");
    }
    if (title.match(/-WiKi$/)) {
      const doubanPart = (_f = (_e2 = bbcode.match(/◎译\s+名(.|\n)+/)) == null ? void 0 : _e2[0]) != null ? _f : "";
      bbcode = bbcode.replace(doubanPart, "");
      bbcode = bbcode.replace(/(\[img\].+?\[\/img\])/, `$1

${doubanPart}`);
    }
    return bbcode;
  }
  function getComparisonImgs(description) {
    var _a2, _b, _c;
    const comparisonPart = (_a2 = description.match(/\.Comparisons(.|\n)+\[\/img\]\[\/url\]/)) == null ? void 0 : _a2[0];
    if (!comparisonPart) {
      return [];
    }
    const title = (_c = (_b = comparisonPart.match(/(\[color=.+?\])(.+?)\[\/color\]/g)) == null ? void 0 : _b.map((item) => {
      var _a3, _b2;
      return (_b2 = (_a3 = item.match(/\[color=.+?\](.+?)\[\/color\]/)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
    })) != null ? _c : [];
    const comparisonImgArray = [];
    const allImages = comparisonPart == null ? void 0 : comparisonPart.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
    if (allImages && allImages.length > 0) {
      allImages.forEach((img) => {
        var _a3;
        const matchUrl = (_a3 = img.match(/\[url=(.+?)\]/)) == null ? void 0 : _a3[1];
        if (matchUrl) {
          comparisonImgArray.push(matchUrl);
        }
      });
    }
    return [{
      imgs: comparisonImgArray,
      title: title.join(","),
      reason: ""
    }];
  }
  const getUNIT3DInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const { Category, Name, Type, Size, Resolution } = getBasicInfo$4();
    TORRENT_INFO.size = getSize(Size);
    let title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const category = getCategory$7(Category);
    const videoType = getVideoType$d(Type, Resolution);
    let IMDBYear = jQuery(".movie-heading span:last").text();
    let movieName = jQuery(".movie-heading span:first").text();
    let imdbUrl = jQuery(".movie-details a:contains(IMDB)").attr("href");
    let poster = jQuery(".movie-poster").attr("src");
    if (CURRENT_SITE_NAME === "HDPOST") {
      const englishTitle = (_b = (_a2 = title.match(/[\s\W\d]+(.+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
      TORRENT_INFO.subtitle = (_c = title.replace(englishTitle, "")) == null ? void 0 : _c.trim();
      title = englishTitle;
    }
    if (CURRENT_SITE_NAME === "ACM") {
      title = title.replace(/\/\s+\W+/, "");
    }
    if (CURRENT_SITE_NAME === "MDU") {
      title = jQuery("h1.text-center").text().trim();
      TORRENT_INFO.subtitle = jQuery("h2.text-center").text().trim();
    }
    if (!IMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
      IMDBYear = (_d2 = matchYear == null ? void 0 : matchYear.pop()) != null ? _d2 : "";
    } else {
      IMDBYear = IMDBYear.replace(/\(|\)|\s/g, "");
    }
    const resolution = (_f = (_e2 = Resolution.match(/\d+(i|p)/i)) == null ? void 0 : _e2[0]) != null ? _f : "";
    let descriptionDom = jQuery(".fa-sticky-note").parents(".panel-heading").siblings(".table-responsive").find(".panel-body").clone();
    descriptionDom.find("#collection_waypoint").remove();
    let mediaInfoOrBDInfo = jQuery(".decoda-code code").text();
    if (CURRENT_SITE_NAME.match(/Blutopia|Aither|fearnopeer/i)) {
      const title2 = jQuery(".meta__title").text().trim();
      movieName = title2.replace(/\(.+\)/g, "");
      IMDBYear = (_h = (_g = title2.match(/\((\d{4})\)/)) == null ? void 0 : _g[1]) != null ? _h : "";
      imdbUrl = jQuery(".meta__imdb a").attr("href");
      descriptionDom = jQuery(".panel__body.bbcode-rendered");
      mediaInfoOrBDInfo = jQuery(".bbcode-rendered code").text();
      poster = jQuery(".meta__poster-link img").attr("src");
    }
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    if (mediaInfoOrBDInfo) {
      descriptionBBCode = `
[quote]${mediaInfoOrBDInfo}[/quote]${descriptionBBCode}`;
    }
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    TORRENT_INFO.mediaInfos = [mediaInfoOrBDInfo];
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), mediaTags);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.title = title;
    TORRENT_INFO.year = IMDBYear;
    TORRENT_INFO.movieName = CURRENT_SITE_NAME === "HDPOST" ? "" : movieName;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.poster = poster;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(title);
    TORRENT_INFO.videoType = videoType.toLowerCase();
    TORRENT_INFO.description = descriptionBBCode;
    const fullInformation = TORRENT_INFO.subtitle + descriptionBBCode;
    const isForbidden = fullInformation.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|请勿转载|禁止转载|exclusive/);
    TORRENT_INFO.isForbidden = !!isForbidden;
  };
  const getBasicInfo$4 = () => {
    const basicInfo = {
      Category: "",
      Name: "",
      Type: "",
      Size: "",
      Resolution: ""
    };
    const keyMap = {
      Name: "Name",
      名称: "Name",
      名稱: "Name",
      Size: "Size",
      体积: "Size",
      體積: "Size",
      size: "Size",
      Category: "Category",
      类别: "Category",
      類別: "Category",
      category: "Category",
      Type: "Type",
      规格: "Type",
      規格: "Type",
      type: "Type",
      Resolution: "Resolution",
      resolution: "Resolution"
    };
    if (!CURRENT_SITE_NAME.match(/Blutopia|Aither|fearnopeer/i)) {
      const lineSelector = jQuery('#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr');
      lineSelector.each((index, element) => {
        var _a2, _b, _c;
        const key = jQuery(element).find("td:first").text().replace(/\s|\n/g, "");
        const basicKey = keyMap[key];
        if (basicKey) {
          let value = jQuery(element).find("td:last").text();
          if (basicKey === "Name") {
            value = (_c = (_b = (_a2 = jQuery(element).find("td:last")[0]) == null ? void 0 : _a2.firstChild) == null ? void 0 : _b.textContent) != null ? _c : "";
          }
          basicInfo[basicKey] = value.replace(/\n/g, "").trim();
        }
      });
    } else {
      const formats = jQuery(".torrent__tags li");
      formats.each((index, item) => {
        var _a2;
        const className = (_a2 = jQuery(item).attr("class")) == null ? void 0 : _a2.replace("torrent__", "");
        basicInfo[keyMap[className]] = jQuery(item).text().trim();
      });
      const title = jQuery("h1.torrent__name").text().trim();
      basicInfo.Name = title;
      console.log(basicInfo);
    }
    return basicInfo;
  };
  const getCategory$7 = (key) => {
    if (!key) {
      return "";
    }
    if (key.match(/movie|电影/i)) {
      return "movie";
    } else if (key.match(/tv|电视|剧集/i)) {
      return "tv";
    }
    return "";
  };
  const getVideoType$d = (type, resolution) => {
    type = type.replace(/\s/g, "");
    if (type.match(/FullDisc|BD/g)) {
      if (resolution.match(/2160p/i)) {
        return "uhdbluray";
      } else if (resolution.match(/1080/)) {
        return "bluray";
      }
      return "dvd";
    } else if (type.match(/Encode/i)) {
      return "encode";
    } else if (type.match(/web/i)) {
      return "web";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/DVD/i)) {
      return "dvd";
    }
    return type;
  };
  /* Common package for dealing with hex/string/uint8 conversions (and sha1 hashing)
  *
  * @author   Jimmy Wärting <jimmy@warting.se> (https://jimmy.warting.se/opensource)
  * @license  MIT
  */
  const alphabet = "0123456789abcdef";
  const encodeLookup = [];
  const decodeLookup = [];
  for (let i = 0; i < 256; i++) {
    encodeLookup[i] = alphabet[i >> 4 & 15] + alphabet[i & 15];
    if (i < 16) {
      if (i < 10) {
        decodeLookup[48 + i] = i;
      } else {
        decodeLookup[97 - 10 + i] = i;
      }
    }
  }
  const arr2hex = (data) => {
    const length = data.length;
    let string = "";
    let i = 0;
    while (i < length) {
      string += encodeLookup[data[i++]];
    }
    return string;
  };
  const hex2arr = (str) => {
    const sizeof = str.length >> 1;
    const length = sizeof << 1;
    const array = new Uint8Array(sizeof);
    let n = 0;
    let i = 0;
    while (i < length) {
      array[n++] = decodeLookup[str.charCodeAt(i++)] << 4 | decodeLookup[str.charCodeAt(i++)];
    }
    return array;
  };
  const concat = (chunks, size = 0) => {
    const length = chunks.length || 0;
    if (!size) {
      let i2 = length;
      while (i2--) size += chunks[i2].length;
    }
    const b = new Uint8Array(size);
    let offset = size;
    let i = length;
    while (i--) {
      offset -= chunks[i].length;
      b.set(chunks[i], offset);
    }
    return b;
  };
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var encode$1 = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
    for (i = 0; i < len; i += 3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
      base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
      base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
  };
  const decoder = new TextDecoder();
  const arr2text = (data, enc) => {
    return decoder.decode(data);
  };
  const encoder = new TextEncoder();
  const text2arr = (str) => encoder.encode(str);
  const arr2base = (data) => encode$1(data);
  const scope = typeof window !== "undefined" ? window : self;
  const crypto = scope.crypto || scope.msCrypto || {};
  const subtle = crypto.subtle || crypto.webkitSubtle;
  const formatMap = {
    hex: arr2hex,
    base64: arr2base
  };
  const hash = async (data, format2, algo = "sha-1") => {
    if (!subtle) throw new Error("no web crypto support");
    if (typeof data === "string") data = text2arr(data);
    const out = new Uint8Array(await subtle.digest(algo, data));
    return format2 ? formatMap[format2](out) : out;
  };
  function digitCount(value) {
    const sign = value < 0 ? 1 : 0;
    value = Math.abs(Number(value || 1));
    return Math.floor(Math.log10(value)) + 1 + sign;
  }
  function getType(value) {
    if (ArrayBuffer.isView(value)) return "arraybufferview";
    if (Array.isArray(value)) return "array";
    if (value instanceof Number) return "number";
    if (value instanceof Boolean) return "boolean";
    if (value instanceof Set) return "set";
    if (value instanceof Map) return "map";
    if (value instanceof String) return "string";
    if (value instanceof ArrayBuffer) return "arraybuffer";
    return typeof value;
  }
  function encode(data, buffer2, offset) {
    const buffers = [];
    let result = null;
    encode._encode(buffers, data);
    result = concat(buffers);
    encode.bytes = result.length;
    if (ArrayBuffer.isView(buffer2)) {
      buffer2.set(result, offset);
      return buffer2;
    }
    return result;
  }
  encode.bytes = -1;
  encode._floatConversionDetected = false;
  encode._encode = function(buffers, data) {
    if (data == null) {
      return;
    }
    switch (getType(data)) {
      case "object":
        encode.dict(buffers, data);
        break;
      case "map":
        encode.dictMap(buffers, data);
        break;
      case "array":
        encode.list(buffers, data);
        break;
      case "set":
        encode.listSet(buffers, data);
        break;
      case "string":
        encode.string(buffers, data);
        break;
      case "number":
        encode.number(buffers, data);
        break;
      case "boolean":
        encode.number(buffers, data);
        break;
      case "arraybufferview":
        encode.buffer(buffers, new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
        break;
      case "arraybuffer":
        encode.buffer(buffers, new Uint8Array(data));
        break;
    }
  };
  const buffE = new Uint8Array([101]);
  const buffD = new Uint8Array([100]);
  const buffL = new Uint8Array([108]);
  encode.buffer = function(buffers, data) {
    buffers.push(text2arr(data.length + ":"), data);
  };
  encode.string = function(buffers, data) {
    buffers.push(text2arr(text2arr(data).byteLength + ":" + data));
  };
  encode.number = function(buffers, data) {
    if (Number.isInteger(data)) return buffers.push(text2arr("i" + BigInt(data) + "e"));
    const maxLo = 2147483648;
    const hi = data / maxLo << 0;
    const lo = data % maxLo << 0;
    const val = hi * maxLo + lo;
    buffers.push(text2arr("i" + val + "e"));
    if (val !== data && !encode._floatConversionDetected) {
      encode._floatConversionDetected = true;
      console.warn(
        'WARNING: Possible data corruption detected with value "' + data + '":',
        'Bencoding only defines support for integers, value was converted to "' + val + '"'
      );
      console.trace();
    }
  };
  encode.dict = function(buffers, data) {
    buffers.push(buffD);
    let j2 = 0;
    let k2;
    const keys = Object.keys(data).sort();
    const kl = keys.length;
    for (; j2 < kl; j2++) {
      k2 = keys[j2];
      if (data[k2] == null) continue;
      encode.string(buffers, k2);
      encode._encode(buffers, data[k2]);
    }
    buffers.push(buffE);
  };
  encode.dictMap = function(buffers, data) {
    buffers.push(buffD);
    const keys = Array.from(data.keys()).sort();
    for (const key of keys) {
      if (data.get(key) == null) continue;
      ArrayBuffer.isView(key) ? encode._encode(buffers, key) : encode.string(buffers, String(key));
      encode._encode(buffers, data.get(key));
    }
    buffers.push(buffE);
  };
  encode.list = function(buffers, data) {
    let i = 0;
    const c2 = data.length;
    buffers.push(buffL);
    for (; i < c2; i++) {
      if (data[i] == null) continue;
      encode._encode(buffers, data[i]);
    }
    buffers.push(buffE);
  };
  encode.listSet = function(buffers, data) {
    buffers.push(buffL);
    for (const item of data) {
      if (item == null) continue;
      encode._encode(buffers, item);
    }
    buffers.push(buffE);
  };
  const INTEGER_START = 105;
  const STRING_DELIM = 58;
  const DICTIONARY_START = 100;
  const LIST_START = 108;
  const END_OF_TYPE = 101;
  function getIntFromBuffer(buffer2, start, end) {
    let sum = 0;
    let sign = 1;
    for (let i = start; i < end; i++) {
      const num = buffer2[i];
      if (num < 58 && num >= 48) {
        sum = sum * 10 + (num - 48);
        continue;
      }
      if (i === start && num === 43) {
        continue;
      }
      if (i === start && num === 45) {
        sign = -1;
        continue;
      }
      if (num === 46) {
        break;
      }
      throw new Error("not a number: buffer[" + i + "] = " + num);
    }
    return sum * sign;
  }
  function decode$1(data, start, end, encoding) {
    if (data == null || data.length === 0) {
      return null;
    }
    if (typeof start !== "number" && encoding == null) {
      encoding = start;
      start = void 0;
    }
    if (typeof end !== "number" && encoding == null) {
      encoding = end;
      end = void 0;
    }
    decode$1.position = 0;
    decode$1.encoding = encoding || null;
    decode$1.data = !ArrayBuffer.isView(data) ? text2arr(data) : new Uint8Array(data.slice(start, end));
    decode$1.bytes = decode$1.data.length;
    return decode$1.next();
  }
  decode$1.bytes = 0;
  decode$1.position = 0;
  decode$1.data = null;
  decode$1.encoding = null;
  decode$1.next = function() {
    switch (decode$1.data[decode$1.position]) {
      case DICTIONARY_START:
        return decode$1.dictionary();
      case LIST_START:
        return decode$1.list();
      case INTEGER_START:
        return decode$1.integer();
      default:
        return decode$1.buffer();
    }
  };
  decode$1.find = function(chr) {
    let i = decode$1.position;
    const c2 = decode$1.data.length;
    const d2 = decode$1.data;
    while (i < c2) {
      if (d2[i] === chr) return i;
      i++;
    }
    throw new Error(
      'Invalid data: Missing delimiter "' + String.fromCharCode(chr) + '" [0x' + chr.toString(16) + "]"
    );
  };
  decode$1.dictionary = function() {
    decode$1.position++;
    const dict = {};
    while (decode$1.data[decode$1.position] !== END_OF_TYPE) {
      const buffer2 = decode$1.buffer();
      let key = arr2text(buffer2);
      if (key.includes("�")) key = arr2hex(buffer2);
      dict[key] = decode$1.next();
    }
    decode$1.position++;
    return dict;
  };
  decode$1.list = function() {
    decode$1.position++;
    const lst = [];
    while (decode$1.data[decode$1.position] !== END_OF_TYPE) {
      lst.push(decode$1.next());
    }
    decode$1.position++;
    return lst;
  };
  decode$1.integer = function() {
    const end = decode$1.find(END_OF_TYPE);
    const number = getIntFromBuffer(decode$1.data, decode$1.position + 1, end);
    decode$1.position += end + 1 - decode$1.position;
    return number;
  };
  decode$1.buffer = function() {
    let sep = decode$1.find(STRING_DELIM);
    const length = getIntFromBuffer(decode$1.data, decode$1.position, sep);
    const end = ++sep + length;
    decode$1.position = end;
    return decode$1.encoding ? arr2text(decode$1.data.slice(sep, end)) : decode$1.data.slice(sep, end);
  };
  function listLength(list) {
    let length = 1 + 1;
    for (const value of list) {
      length += encodingLength$1(value);
    }
    return length;
  }
  function mapLength(map) {
    let length = 1 + 1;
    for (const [key, value] of map) {
      const keyLength = text2arr(key).byteLength;
      length += digitCount(keyLength) + 1 + keyLength;
      length += encodingLength$1(value);
    }
    return length;
  }
  function objectLength(value) {
    let length = 1 + 1;
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      const keyLength = text2arr(keys[i]).byteLength;
      length += digitCount(keyLength) + 1 + keyLength;
      length += encodingLength$1(value[keys[i]]);
    }
    return length;
  }
  function stringLength(value) {
    const length = text2arr(value).byteLength;
    return digitCount(length) + 1 + length;
  }
  function arrayBufferLength(value) {
    const length = value.byteLength - value.byteOffset;
    return digitCount(length) + 1 + length;
  }
  function encodingLength$1(value) {
    const length = 0;
    if (value == null) return length;
    const type = getType(value);
    switch (type) {
      case "arraybufferview":
        return arrayBufferLength(value);
      case "string":
        return stringLength(value);
      case "array":
      case "set":
        return listLength(value);
      case "number":
        return 1 + digitCount(Math.floor(value)) + 1;
      case "bigint":
        return 1 + value.toString().length + 1;
      case "object":
        return objectLength(value);
      case "map":
        return mapLength(value);
      default:
        throw new TypeError(`Unsupported value of type "${type}"`);
    }
  }
  const encodingLength = encodingLength$1;
  const bencode = { encode, decode: decode$1, byteLength: encodingLength$1, encodingLength };
  const byteTable = [
    255,
    255,
    26,
    27,
    28,
    29,
    30,
    31,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    255,
    255,
    255,
    255,
    255,
    255,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    255,
    255,
    255,
    255,
    255
  ];
  const decode = function(encoded) {
    if (!ArrayBuffer.isView(encoded) && typeof encoded !== "string") {
      throw new TypeError("base32.decode only takes Buffer or string as parameter");
    }
    let shiftIndex = 0;
    let plainDigit = 0;
    let plainChar;
    let plainPos = 0;
    if (!ArrayBuffer.isView(encoded)) {
      encoded = text2arr(encoded);
    }
    const decoded = new Uint8Array(Math.ceil(encoded.length * 5 / 8));
    for (let i = 0; i < encoded.length; i++) {
      if (encoded[i] === 61) {
        break;
      }
      const encodedByte = encoded[i] - 48;
      if (encodedByte < byteTable.length) {
        plainDigit = byteTable[encodedByte];
        if (shiftIndex <= 3) {
          shiftIndex = (shiftIndex + 5) % 8;
          if (shiftIndex === 0) {
            plainChar |= plainDigit;
            decoded[plainPos] = plainChar;
            plainPos++;
            plainChar = 0;
          } else {
            plainChar |= 255 & plainDigit << 8 - shiftIndex;
          }
        } else {
          shiftIndex = (shiftIndex + 5) % 8;
          plainChar |= 255 & plainDigit >>> shiftIndex;
          decoded[plainPos] = plainChar;
          plainPos++;
          plainChar = 255 & plainDigit << 8 - shiftIndex;
        }
      } else {
        throw new Error("Invalid input - it is not base32 encoded string");
      }
    }
    return decoded.subarray(0, plainPos);
  };
  function parseRange(range) {
    const generateRange = (start, end = start) => Array.from({ length: end - start + 1 }, (cur, idx) => idx + start);
    return range.reduce((acc, cur, idx, arr) => {
      const r2 = cur.split("-").map((cur2) => parseInt(cur2));
      return acc.concat(generateRange(...r2));
    }, []);
  }
  /*! magnet-uri. MIT License. WebTorrent LLC <https://webtorrent.io/opensource> */
  function magnetURIDecode(uri) {
    const result = {};
    const data = uri.split("magnet:?")[1];
    const params = data && data.length >= 0 ? data.split("&") : [];
    params.forEach((param) => {
      const keyval = param.split("=");
      if (keyval.length !== 2) return;
      const key = keyval[0];
      let val = keyval[1];
      if (key === "dn") val = decodeURIComponent(val).replace(/\+/g, " ");
      if (key === "tr" || key === "xs" || key === "as" || key === "ws") {
        val = decodeURIComponent(val);
      }
      if (key === "kt") val = decodeURIComponent(val).split("+");
      if (key === "ix") val = Number(val);
      if (key === "so") val = parseRange(decodeURIComponent(val).split(","));
      if (result[key]) {
        if (!Array.isArray(result[key])) {
          result[key] = [result[key]];
        }
        result[key].push(val);
      } else {
        result[key] = val;
      }
    });
    let m2;
    if (result.xt) {
      const xts = Array.isArray(result.xt) ? result.xt : [result.xt];
      xts.forEach((xt) => {
        if (m2 = xt.match(/^urn:btih:(.{40})/)) {
          result.infoHash = m2[1].toLowerCase();
        } else if (m2 = xt.match(/^urn:btih:(.{32})/)) {
          result.infoHash = arr2hex(decode(m2[1]));
        } else if (m2 = xt.match(/^urn:btmh:1220(.{64})/)) {
          result.infoHashV2 = m2[1].toLowerCase();
        }
      });
    }
    if (result.xs) {
      const xss = Array.isArray(result.xs) ? result.xs : [result.xs];
      xss.forEach((xs) => {
        if (m2 = xs.match(/^urn:btpk:(.{64})/)) {
          result.publicKey = m2[1].toLowerCase();
        }
      });
    }
    if (result.infoHash) result.infoHashBuffer = hex2arr(result.infoHash);
    if (result.infoHashV2) result.infoHashV2Buffer = hex2arr(result.infoHashV2);
    if (result.publicKey) result.publicKeyBuffer = hex2arr(result.publicKey);
    if (result.dn) result.name = result.dn;
    if (result.kt) result.keywords = result.kt;
    result.announce = [];
    if (typeof result.tr === "string" || Array.isArray(result.tr)) {
      result.announce = result.announce.concat(result.tr);
    }
    result.urlList = [];
    if (typeof result.as === "string" || Array.isArray(result.as)) {
      result.urlList = result.urlList.concat(result.as);
    }
    if (typeof result.ws === "string" || Array.isArray(result.ws)) {
      result.urlList = result.urlList.concat(result.ws);
    }
    result.peerAddresses = [];
    if (typeof result["x.pe"] === "string" || Array.isArray(result["x.pe"])) {
      result.peerAddresses = result.peerAddresses.concat(result["x.pe"]);
    }
    result.announce = Array.from(new Set(result.announce));
    result.urlList = Array.from(new Set(result.urlList));
    result.peerAddresses = Array.from(new Set(result.peerAddresses));
    return result;
  }
  function assertPath(path2) {
    if (typeof path2 !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
    }
  }
  function normalizeStringPosix(path2, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code2;
    for (var i = 0; i <= path2.length; ++i) {
      if (i < path2.length)
        code2 = path2.charCodeAt(i);
      else if (code2 === 47)
        break;
      else
        code2 = 47;
      if (code2 === 47) {
        if (lastSlash === i - 1 || dots === 1) ;
        else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              var lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0)
              res += "/..";
            else
              res = "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0)
            res += "/" + path2.slice(lastSlash + 1, i);
          else
            res = path2.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code2 === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep + base;
  }
  var posix = {
    // path.resolve([from ...], to)
    resolve: function resolve() {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path2;
        if (i >= 0)
          path2 = arguments[i];
        else {
          if (cwd === void 0)
            cwd = process.cwd();
          path2 = cwd;
        }
        assertPath(path2);
        if (path2.length === 0) {
          continue;
        }
        resolvedPath = path2 + "/" + resolvedPath;
        resolvedAbsolute = path2.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0)
          return "/" + resolvedPath;
        else
          return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    },
    normalize: function normalize(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      var isAbsolute2 = path2.charCodeAt(0) === 47;
      var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
      path2 = normalizeStringPosix(path2, !isAbsolute2);
      if (path2.length === 0 && !isAbsolute2) path2 = ".";
      if (path2.length > 0 && trailingSeparator) path2 += "/";
      if (isAbsolute2) return "/" + path2;
      return path2;
    },
    isAbsolute: function isAbsolute(path2) {
      assertPath(path2);
      return path2.length > 0 && path2.charCodeAt(0) === 47;
    },
    join: function join() {
      if (arguments.length === 0)
        return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0)
            joined = arg;
          else
            joined += "/" + arg;
        }
      }
      if (joined === void 0)
        return ".";
      return posix.normalize(joined);
    },
    relative: function relative(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = posix.resolve(from);
      to = posix.resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47)
          break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47)
          break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode)
          break;
        else if (fromCode === 47)
          lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0)
            out += "..";
          else
            out += "/..";
        }
      }
      if (out.length > 0)
        return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47)
          ++toStart;
        return to.slice(toStart);
      }
    },
    _makeLong: function _makeLong(path2) {
      return path2;
    },
    dirname: function dirname(path2) {
      assertPath(path2);
      if (path2.length === 0) return ".";
      var code2 = path2.charCodeAt(0);
      var hasRoot = code2 === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path2.length - 1; i >= 1; --i) {
        code2 = path2.charCodeAt(i);
        if (code2 === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path2.slice(0, end);
    },
    basename: function basename(path2, ext) {
      if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
      assertPath(path2);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
        if (ext.length === path2.length && ext === path2) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path2.length - 1; i >= 0; --i) {
          var code2 = path2.charCodeAt(i);
          if (code2 === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code2 === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path2.length;
        return path2.slice(start, end);
      } else {
        for (i = path2.length - 1; i >= 0; --i) {
          if (path2.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path2.slice(start, end);
      }
    },
    extname: function extname(path2) {
      assertPath(path2);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path2.length - 1; i >= 0; --i) {
        var code2 = path2.charCodeAt(i);
        if (code2 === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code2 === 46) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path2.slice(startDot, end);
    },
    format: function format(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
      }
      return _format("/", pathObject);
    },
    parse: function parse(path2) {
      assertPath(path2);
      var ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path2.length === 0) return ret;
      var code2 = path2.charCodeAt(0);
      var isAbsolute2 = code2 === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path2.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code2 = path2.charCodeAt(i);
        if (code2 === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code2 === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2) ret.base = ret.name = path2.slice(1, end);
          else ret.base = ret.name = path2.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path2.slice(1, startDot);
          ret.base = path2.slice(1, end);
        } else {
          ret.name = path2.slice(startPart, startDot);
          ret.base = path2.slice(startPart, end);
        }
        ret.ext = path2.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  posix.posix = posix;
  var pathBrowserify = posix;
  const path = /* @__PURE__ */ getDefaultExportFromCjs(pathBrowserify);
  /*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  let promise;
  typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : commonjsGlobal) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
    throw err;
  }, 0));
  /*! parse-torrent. MIT License. WebTorrent LLC <https://webtorrent.io/opensource> */
  async function parseTorrent(torrentId) {
    if (typeof torrentId === "string" && /^(stream-)?magnet:/.test(torrentId)) {
      const torrentObj = magnetURIDecode(torrentId);
      if (!torrentObj.infoHash) {
        throw new Error("Invalid torrent identifier");
      }
      return torrentObj;
    } else if (typeof torrentId === "string" && (/^[a-f0-9]{40}$/i.test(torrentId) || /^[a-z2-7]{32}$/i.test(torrentId))) {
      return magnetURIDecode(`magnet:?xt=urn:btih:${torrentId}`);
    } else if (ArrayBuffer.isView(torrentId) && torrentId.length === 20) {
      return magnetURIDecode(`magnet:?xt=urn:btih:${arr2hex(torrentId)}`);
    } else if (ArrayBuffer.isView(torrentId)) {
      return await decodeTorrentFile(torrentId);
    } else if (torrentId && torrentId.infoHash) {
      torrentId.infoHash = torrentId.infoHash.toLowerCase();
      if (!torrentId.announce) torrentId.announce = [];
      if (typeof torrentId.announce === "string") {
        torrentId.announce = [torrentId.announce];
      }
      if (!torrentId.urlList) torrentId.urlList = [];
      return torrentId;
    } else {
      throw new Error("Invalid torrent identifier");
    }
  }
  async function decodeTorrentFile(torrent) {
    if (ArrayBuffer.isView(torrent)) {
      torrent = bencode.decode(torrent);
    }
    ensure(torrent.info, "info");
    ensure(torrent.info["name.utf-8"] || torrent.info.name, "info.name");
    ensure(torrent.info["piece length"], "info['piece length']");
    ensure(torrent.info.pieces, "info.pieces");
    if (torrent.info.files) {
      torrent.info.files.forEach((file) => {
        ensure(typeof file.length === "number", "info.files[0].length");
        ensure(file["path.utf-8"] || file.path, "info.files[0].path");
      });
    } else {
      ensure(typeof torrent.info.length === "number", "info.length");
    }
    const result = {
      info: torrent.info,
      infoBuffer: bencode.encode(torrent.info),
      name: arr2text(torrent.info["name.utf-8"] || torrent.info.name),
      announce: []
    };
    result.infoHashBuffer = await hash(result.infoBuffer);
    result.infoHash = arr2hex(result.infoHashBuffer);
    if (torrent.info.private !== void 0) result.private = !!torrent.info.private;
    if (torrent["creation date"]) result.created = new Date(torrent["creation date"] * 1e3);
    if (torrent["created by"]) result.createdBy = arr2text(torrent["created by"]);
    if (ArrayBuffer.isView(torrent.comment)) result.comment = arr2text(torrent.comment);
    if (Array.isArray(torrent["announce-list"]) && torrent["announce-list"].length > 0) {
      torrent["announce-list"].forEach((urls) => {
        urls.forEach((url) => {
          result.announce.push(arr2text(url));
        });
      });
    } else if (torrent.announce) {
      result.announce.push(arr2text(torrent.announce));
    }
    if (ArrayBuffer.isView(torrent["url-list"])) {
      torrent["url-list"] = torrent["url-list"].length > 0 ? [torrent["url-list"]] : [];
    }
    result.urlList = (torrent["url-list"] || []).map((url) => arr2text(url));
    result.announce = Array.from(new Set(result.announce));
    result.urlList = Array.from(new Set(result.urlList));
    const files = torrent.info.files || [torrent.info];
    result.files = files.map((file, i) => {
      const parts = [].concat(result.name, file["path.utf-8"] || file.path || []).map((p2) => ArrayBuffer.isView(p2) ? arr2text(p2) : p2);
      return {
        path: path.join.apply(null, [path.sep].concat(parts)).slice(1),
        name: parts[parts.length - 1],
        length: file.length,
        offset: files.slice(0, i).reduce(sumLength, 0)
      };
    });
    result.length = files.reduce(sumLength, 0);
    const lastFile = result.files[result.files.length - 1];
    result.pieceLength = torrent.info["piece length"];
    result.lastPieceLength = (lastFile.offset + lastFile.length) % result.pieceLength || result.pieceLength;
    result.pieces = splitPieces(torrent.info.pieces);
    return result;
  }
  function encodeTorrentFile(parsed) {
    const torrent = {
      info: parsed.info
    };
    torrent["announce-list"] = (parsed.announce || []).map((url) => {
      if (!torrent.announce) torrent.announce = url;
      url = text2arr(url);
      return [url];
    });
    torrent["url-list"] = parsed.urlList || [];
    if (parsed.private !== void 0) {
      torrent.private = Number(parsed.private);
    }
    if (parsed.created) {
      torrent["creation date"] = parsed.created.getTime() / 1e3 | 0;
    }
    if (parsed.createdBy) {
      torrent["created by"] = parsed.createdBy;
    }
    return bencode.encode(torrent);
  }
  function sumLength(sum, file) {
    return sum + file.length;
  }
  function splitPieces(buf) {
    const pieces = [];
    for (let i = 0; i < buf.length; i += 20) {
      pieces.push(arr2hex(buf.slice(i, i + 20)));
    }
    return pieces;
  }
  function ensure(bool, fieldName) {
    if (!bool) throw new Error(`Torrent is missing required field: ${fieldName}`);
  }
  const getVideoType$c = (videoType) => {
    if (!videoType) {
      return "";
    }
    videoType = videoType.replace(/[.-]/g, "").toLowerCase();
    if (videoType.match(/encode|x264|x265|bdrip|hdrip|压制/ig)) {
      return "encode";
    } else if (videoType.match(/remux/ig)) {
      return "remux";
    } else if (videoType.match(/uhd|ultra/ig)) {
      return "uhdbluray";
    } else if (videoType.match(/blu|discs/ig)) {
      return "bluray";
    } else if (videoType.match(/webdl/ig)) {
      return "web";
    } else if (videoType.match(/hdtv/ig)) {
      return "hdtv";
    } else if (videoType.match(/dvdr/ig)) {
      return "dvdrip";
    } else if (videoType.match(/dvd/ig)) {
      return "dvd";
    }
    return "";
  };
  const getCategory$6 = (category) => {
    if (!category) {
      return "";
    }
    category = category.replace(/[.-]/g, "").toLowerCase();
    if (category.match(/movie|bd|ultra|电影/ig)) {
      return "movie";
    } else if (category.match(/综艺/ig)) {
      return "variety";
    } else if (category.match(/tv|drama|剧集|电视/ig)) {
      return "tv";
    } else if (category.match(/TVSeries/ig)) {
      return "tvPack";
    } else if (category.match(/document|纪录|紀錄|Doc/ig)) {
      return "documentary";
    } else if (category.match(/sport|体育/ig)) {
      return "sport";
    } else if (category.match(/mv|演唱|concert/ig)) {
      return "concert";
    } else if (category.match(/anim|动(画|漫)/ig)) {
      return "cartoon";
    } else if (category.match(/App|软件|Software|軟體/ig)) {
      return "app";
    } else if (category.match(/电子书|小说|Ebook/ig)) {
      return "ebook";
    } else if (category.match(/有声书|AudioBook/ig)) {
      return "audiobook";
    } else if (category.match(/杂志|magazine/ig)) {
      return "magazine";
    } else if (category.match(/漫画|comics/ig)) {
      return "comics";
    } else if (category.match(/公开课/ig)) {
      return "onlineCourse";
    } else if (category.match(/资料/ig)) {
      return "ebook";
    }
    return "";
  };
  const getResolution$2 = (resolution) => {
    resolution = resolution.toLowerCase();
    if (resolution.match(/4k|2160|UHD/ig)) {
      return "2160p";
    } else if (resolution.match(/1080(p)?/ig)) {
      return "1080p";
    } else if (resolution.match(/1080i/ig)) {
      return "1080i";
    } else if (resolution.match(/720(p)?/ig)) {
      return "720p";
    } else if (resolution.match(/sd/ig)) {
      return "480p";
    }
    return resolution;
  };
  const getFormat = (data) => {
    if (data.match(/pdf/i)) {
      return "pdf";
    } else if (data.match(/EPUB/i)) {
      return "epub";
    } else if (data.match(/MOBI/i)) {
      return "mobi";
    } else if (data.match(/mp3/i)) {
      return "mp3";
    } else if (data.match(/mp4/i)) {
      return "mp4";
    } else if (data.match(/txt/i)) {
      return "txt";
    } else if (data.match(/azw3/i)) {
      return "azw3";
    } else if (data.match(/镜像/i)) {
      return "iso";
    }
    return "other";
  };
  const blobToBase64 = (blob) => {
    return new Promise((resolve2, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e2) => {
        var _a2;
        resolve2((_a2 = e2.target) == null ? void 0 : _a2.result);
      };
      fileReader.readAsDataURL(blob);
      fileReader.onerror = () => {
        reject(new Error("blobToBase64 error"));
      };
    });
  };
  const getTorrentFileData = async (selector = "", torrentLink = "") => {
    let downloadLink = torrentLink || jQuery(selector).attr("href");
    if (!downloadLink) {
      console.warn("Failed to get torrent file download link");
      return null;
    }
    if (!downloadLink.startsWith("http") && !downloadLink.startsWith("/")) {
      downloadLink = `${CURRENT_SITE_INFO.url}/${downloadLink}`;
    } else if (downloadLink.startsWith("/")) {
      downloadLink = `${CURRENT_SITE_INFO.url}${downloadLink}`;
    }
    try {
      const file = await fetch(downloadLink, {
        method: "GET",
        responseType: "arraybuffer",
        timeout: 1e4
      });
      const result = await parseTorrent(buffer.Buffer.from(file));
      const buf = encodeTorrentFile(__spreadProps(__spreadValues({}, result), {
        comment: "",
        announce: ["tracker.com"],
        info: __spreadProps(__spreadValues({}, result.info), {
          source: ""
        })
      }));
      const blob = new Blob([buf], { type: "application/x-bittorrent" });
      const base64 = await blobToBase64(blob);
      return base64;
    } catch (error) {
      Jt.error(`${$t("种子文件下载失败")} ${$t("请手动下载")}`);
      console.log(error);
      return "";
    }
  };
  const getNexusPHPInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n2, _o, _p, _q, _r, _s, _t2, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
    let title = formatTorrentTitle((_b = (_a2 = jQuery("#top").text().split(/\s{3,}/)) == null ? void 0 : _a2[0]) == null ? void 0 : _b.trim());
    let metaInfo = jQuery("td.rowhead:contains('基本信息'), td.rowhead:contains('基本資訊'),.layui-table td:contains('基本信息')").next().text().replace(/：/g, ":");
    let subtitle = jQuery("td.rowhead:contains('副标题'), td.rowhead:contains('副標題')").next().text();
    let siteImdbUrl = jQuery("#kimdb>a").attr("href");
    let descriptionBBCode = getFilterBBCode(jQuery("#kdescr")[0]);
    descriptionBBCode = descriptionBBCode.replace(/\u00A0\u3000/g, " ");
    if (CURRENT_SITE_NAME === "MTeam") {
      descriptionBBCode = descriptionBBCode.replace(/https:\/\/\w+?\.m-team\.cc\/imagecache.php\?url=/g, "").replace(/(http(s)?)%3A/g, "$1:").replace(/%2F/g, "/");
    }
    if (CURRENT_SITE_NAME === "HDArea") {
      title = (_d2 = (_c = jQuery("h1#top").text().split(/\s{3,}/)) == null ? void 0 : _c[0]) == null ? void 0 : _d2.trim();
    }
    if (CURRENT_SITE_NAME === "SSD") {
      title = formatTorrentTitle(jQuery("#torrent-name").text());
    }
    if (CURRENT_SITE_NAME === "PuTao") {
      title = formatTorrentTitle((_e2 = jQuery("h1").text().replace(/\[.+?\]|\(.+?\)/g, "")) == null ? void 0 : _e2.trim());
    }
    if (CURRENT_SITE_NAME === "TJUPT") {
      const matchArray = title.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
      const realTitle = (_g = (_f = matchArray.filter((item) => item.match(/\.| /))) == null ? void 0 : _f[0]) != null ? _g : "";
      title = realTitle.replace(/\[|\]/g, "");
    }
    if (CURRENT_SITE_NAME === "PTer") {
      if (jQuery("#descrcopyandpaster")[0]) {
        descriptionBBCode = (_h = jQuery("#descrcopyandpaster").val()) == null ? void 0 : _h.replace(/hide(=(MediaInfo|BDInfo))?\]/ig, "quote]");
      } else {
        descriptionBBCode = getFilterBBCode(jQuery("#kdescr")[0]);
      }
      descriptionBBCode = descriptionBBCode.replace(/\[img\d\]/g, "[img]");
    }
    if (CURRENT_SITE_NAME === "HDChina") {
      const meta = [];
      jQuery("li:contains('基本信息'):last").next("li").children("i").each(function() {
        meta.push(jQuery(this).text().replace("：", ":"));
      });
      metaInfo = meta.join("   ");
      subtitle = jQuery("#top").next("h3").text();
    }
    if (CURRENT_SITE_NAME === "OurBits") {
      siteImdbUrl = jQuery(".imdbnew2 a:first").attr("href");
      TORRENT_INFO.doubanUrl = jQuery("#doubaninfo .doubannew a").attr("href");
      if (TORRENT_INFO.doubanUrl) {
        const doubanInfo = getFilterBBCode((_i = jQuery(".doubannew2 .doubaninfo")) == null ? void 0 : _i[0]);
        const doubanPoster = `[img]${jQuery("#doubaninfo .doubannew a img").attr("src")}[/img]
`;
        TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
      }
    }
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      [title, subtitle] = [subtitle, title];
      siteImdbUrl = jQuery("#kimdb .imdbwp__link").attr("href");
      TORRENT_INFO.doubanUrl = jQuery("#kdouban .imdbwp__link").attr("href");
      const element = document.createElement("div");
      jQuery(element).html(jQuery("#outer td").has("#kdescr").html());
      descriptionBBCode = getFilterBBCode(element);
      descriptionBBCode = descriptionBBCode.replace("  [url=", "\n  [url=").replace(/\[\/img\]\[\/url\]\n/g, "[/img][/url]");
      const mediainfo = jQuery("div.codemain > pre:contains('Unique ID')");
      if (mediainfo[0]) {
        mediainfo.each(function() {
          var _a3;
          (_a3 = TORRENT_INFO.mediaInfos) == null ? void 0 : _a3.push(jQuery(this).text());
        });
      }
      descriptionBBCode = descriptionBBCode.replace(/ 截图对比\(点击空白处展开\)/g, "截图对比");
      const comparisonArray = jQuery("fieldset[onclick]").toArray() || [];
      const comparisons = [];
      comparisonArray.forEach((item) => {
        const imgs = [];
        jQuery(item).find("a").toArray().forEach((img) => {
          if (img.href) imgs.push(img.href);
        });
        const title2 = jQuery(item).find("legend").text().replace(" 截图对比(点击空白处展开):", "").trim();
        const reason = "";
        comparisons.push({
          title: title2,
          imgs,
          reason
        });
      });
      TORRENT_INFO.comparisons = comparisons;
      if (!descriptionBBCode.match("豆瓣评分")) {
        const imdbRate = jQuery("#kimdb span.imdbwp__rating").text().replace("\nRating: ", "");
        const doubanInfo = jQuery("#kdouban .imdbwp__content").text().replace(/\n{2,}/g, "\n").replace(/\n[0-9]?[0-9]\.[0-9]\n/g, "\n").replace(/\n/g, "\n◎").replace(/\n◎$/, "\n").replace("◎Rating:", `◎IMDb链接:${siteImdbUrl}
◎IMDb评分: ${imdbRate}
◎豆瓣链接: ${TORRENT_INFO.doubanUrl}
◎豆瓣评分:`);
        const postUrl = (_k = (_j = jQuery("#kimdb img.imdbwp__img")) == null ? void 0 : _j.attr("src")) != null ? _k : "";
        const doubanPoster = postUrl ? `[img]${postUrl}[/img]
` : "";
        TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo || "";
      }
      descriptionBBCode = descriptionBBCode.replace(/\[quote\]GeneralVideo[^[]*\[\/quote\]/, "");
    }
    if (CURRENT_SITE_NAME === "SSD") {
      TORRENT_INFO.doubanUrl = jQuery(".douban_info a:contains('://movie.douban.com/subject/')").attr("href");
      const doubanInfo = getFilterBBCode((_l = jQuery(".douban-info artical")) == null ? void 0 : _l[0]);
      const postUrl = (_n2 = (_m = jQuery("#kposter").find("img")) == null ? void 0 : _m.attr("src")) != null ? _n2 : "";
      const doubanPoster = postUrl ? `[img]${postUrl}[/img]
` : "";
      TORRENT_INFO.doubanInfo = doubanPoster + (doubanInfo == null ? void 0 : doubanInfo.replace(/\n{2,}/g, "\n")) || "";
      if (descriptionBBCode === "" || descriptionBBCode === void 0) {
        let extraTextInfo = getFilterBBCode((_o = jQuery(".torrent-extra-text-container .extra-text")) == null ? void 0 : _o[0]);
        extraTextInfo = extraTextInfo ? `
[quote]${extraTextInfo}[/quote]
` : "";
        const extraScreenshotDom = jQuery(".screenshot").find("img");
        const imgs = [];
        if (extraScreenshotDom) {
          extraScreenshotDom.each((index, item) => {
            var _a3, _b2;
            imgs.push(`[img]${(_b2 = (_a3 = jQuery(item).attr("src")) == null ? void 0 : _a3.trim()) != null ? _b2 : ""}[/img]`);
          });
        }
        const extraScreenshot = imgs.join("");
        const mediaInfo = jQuery("section[data-group='mediainfo'] .codemain").text();
        const extraMediaInfo = `
[quote]${mediaInfo}[/quote]
`;
        TORRENT_INFO.mediaInfos = [mediaInfo];
        descriptionBBCode = extraTextInfo + extraMediaInfo + extraScreenshot;
      }
      siteImdbUrl = jQuery(".douban_info a:contains('://www.imdb.com/title/')").attr("href");
    }
    if (CURRENT_SITE_NAME === "HaresClub") {
      subtitle = jQuery("h3.layui-font-16:first").text();
      const extraScreenshotDom = jQuery("#layer-photos-demo").find("img");
      const imgs = [];
      if (extraScreenshotDom) {
        extraScreenshotDom.each((index, item) => {
          var _a3, _b2;
          imgs.push(`[img]${(_b2 = (_a3 = jQuery(item).attr("src")) == null ? void 0 : _a3.trim()) != null ? _b2 : ""}[/img]`);
        });
      }
      const extraScreenshot = imgs.join("");
      descriptionBBCode = getFilterBBCode(jQuery(".layui-colla-content:first")[0]);
      const extraMediaInfo = (_q = (_p = jQuery("#kfmedia").html()) == null ? void 0 : _p.replace(/<br>/g, "\n")) != null ? _q : "";
      descriptionBBCode = `${descriptionBBCode}
[quote]${extraMediaInfo}[/quote]
${extraScreenshot}`;
      TORRENT_INFO.doubanUrl = jQuery('.layui-interval a[href*="douban.com/subject"]').attr("href");
      TORRENT_INFO.mediaInfos = [extraMediaInfo];
      siteImdbUrl = jQuery('.layui-interval a[href*="imdb.com/title"]').attr("href");
    }
    const year = (_r = title == null ? void 0 : title.match(/(19|20)\d{2}/g)) != null ? _r : [];
    const { category, videoType, videoCodec, audioCodec, resolution, processing, size } = getMetaInfo$1(metaInfo);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const doubanUrl = (_s = descriptionBBCode.match(/https:\/\/((movie|book)\.)?douban\.com\/subject\/\d+/)) == null ? void 0 : _s[0];
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
    }
    const imdbUrl = (_t2 = descriptionBBCode.match(/http(s)?:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _t2[0];
    if (imdbUrl) {
      TORRENT_INFO.imdbUrl = imdbUrl;
    } else if (siteImdbUrl) {
      TORRENT_INFO.imdbUrl = siteImdbUrl.match(/www\.imdb\.com\/title/) ? siteImdbUrl : "";
    }
    TORRENT_INFO.year = year.length > 0 ? year.pop() : "";
    TORRENT_INFO.title = title;
    TORRENT_INFO.subtitle = subtitle;
    TORRENT_INFO.description = descriptionBBCode;
    const originalName = (_v = (_u = descriptionBBCode.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _u[2]) != null ? _v : "";
    const translateName = (_x = (_w = descriptionBBCode.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _w[2]) != null ? _x : "";
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      TORRENT_INFO.movieName = originalName;
    } else {
      TORRENT_INFO.movieName = (_A = (_z = (_y = translateName.match(/(\w|\s){2,}/)) == null ? void 0 : _y[0]) == null ? void 0 : _z.trim()) != null ? _A : "";
    }
    const fullInformation = jQuery("#top").text() + subtitle + descriptionBBCode;
    const isForbidden = fullInformation.match(/禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|exclusive/);
    TORRENT_INFO.isForbidden = !!isForbidden;
    if (!processing || processing.match(/raw|encode/)) {
      const areaMatch = (_B = descriptionBBCode.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)) == null ? void 0 : _B[2];
      if (areaMatch) {
        TORRENT_INFO.area = getAreaCode(areaMatch);
      }
    } else {
      TORRENT_INFO.area = getAreaCode(processing);
    }
    const specificCategory = getPreciseCategory(TORRENT_INFO, getCategory$6(category || descriptionBBCode));
    TORRENT_INFO.category = specificCategory;
    TORRENT_INFO.videoType = getVideoType$c(videoType || TORRENT_INFO.title);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.size = size ? getSize(size) : 0;
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode.replace(/\[quote\]截图对比[^\n]*\n[^\n]*/gi, ""));
    } else TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
    const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
    const pageTags = getTagsFromPage$1();
    TORRENT_INFO.tags = __spreadValues(__spreadValues({}, tags), pageTags);
    if (!TORRENT_INFO.isForbidden && TORRENT_INFO.tags.exclusive) {
      TORRENT_INFO.isForbidden = true;
    }
    const isBluray = !!TORRENT_INFO.videoType.match(/bluray/i);
    if (TORRENT_INFO.mediaInfos.length > 0) {
      getSpecsFromMediainfo(isBluray);
    } else {
      const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
      const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
      if (mediaInfoOrBDInfo) {
        TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
        getSpecsFromMediainfo(isBluray);
      }
    }
    const infoFromMediaInfoinfo = getInfoFromMediaInfo((_C = TORRENT_INFO.mediaInfos) == null ? void 0 : _C[0]);
    if (infoFromMediaInfoinfo.subtitles) {
      for (let i = 0; i < ((_D = infoFromMediaInfoinfo.subtitles) == null ? void 0 : _D.length); i++) {
        if (/Chinese|Traditional|Simplified|Cantonese|Mandarin/i.test(infoFromMediaInfoinfo.subtitles[i])) {
          TORRENT_INFO.tags.chinese_subtitle = true;
          break;
        }
      }
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(TORRENT_INFO.title || videoCodec, TORRENT_INFO.videoType);
    TORRENT_INFO.resolution = getResolution$2(resolution || TORRENT_INFO.title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec || TORRENT_INFO.title);
    if (CURRENT_SITE_NAME === "TCCF") {
      TORRENT_INFO.format = getFormat(videoType);
    } else {
      TORRENT_INFO.format = getFormat(jQuery("#top").text() + subtitle);
    }
  };
  const getMetaInfo$1 = (metaInfo) => {
    let resolutionKey = "分辨率|解析度|格式";
    let videoTypeKey = "媒介|来源|质量";
    if (CURRENT_SITE_NAME === "SSD") {
      resolutionKey = "分辨率|解析度";
      videoTypeKey = "格式";
    }
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      videoTypeKey = "encode";
    }
    if (CURRENT_SITE_NAME.match(/TLF|HDHome/i)) {
      videoTypeKey = "媒介";
    }
    if (CURRENT_SITE_NAME.match(/HDFans/)) {
      videoTypeKey = "来源";
    }
    const category = getMetaValue$1("类型|分类|類別", metaInfo);
    const videoType = getMetaValue$1(videoTypeKey, metaInfo);
    const videoCodec = getMetaValue$1("编码|編碼", metaInfo);
    const audioCodec = getMetaValue$1("音频|音频编码", metaInfo);
    const resolution = getMetaValue$1(resolutionKey, metaInfo);
    const processing = getMetaValue$1("处理|處理|地区", metaInfo);
    const size = getMetaValue$1("大小", metaInfo);
    console.log({
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    });
    return {
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    };
  };
  const getMetaValue$1 = (key, metaInfo) => {
    var _a2, _b;
    let regStr = `(${key}):\\s?([^一-龥]+)?`;
    if (key.match(/大小/)) {
      regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)(i)?B)`;
    }
    if (CURRENT_SITE_NAME.match(/KEEPFRDS|TJUPT|PTSBAO|PTHome|HDTime|BTSCHOOL|TLF|SoulVoice|PuTao/) && key.match(/类型/)) {
      regStr = `(${key}):\\s?([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "PTer" && key.match(/类型|地区/)) {
      regStr = `(${key}):\\s?([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "TCCF" && key.match(/类型/)) {
      regStr = `(${key}):(.+?)\\s{2,}`;
    }
    if (CURRENT_SITE_NAME === "HDFans" && key.match(/来源/)) {
      regStr = `(${key}):(.+?)\\s{2,}`;
    }
    if (CURRENT_SITE_NAME === "HDChina" && key.match(/类型/)) {
      regStr = `(${key}):.+?([^一-龥]+)`;
    }
    const reg = new RegExp(regStr, "i");
    const matchValue = (_b = (_a2 = metaInfo.match(reg)) == null ? void 0 : _a2[2]) != null ? _b : "";
    if (matchValue) {
      return matchValue.replace(/\s/g, "").trim().toLowerCase();
    }
    return "";
  };
  const getTagsFromPage$1 = () => {
    let tags = {};
    if (CURRENT_SITE_NAME === "PTer") {
      const tagImgs = jQuery("td.rowhead:contains('类别与标签')").next().find("img");
      const links = Array.from(tagImgs.map((index, item) => {
        var _a2, _b;
        return (_b = (_a2 = jQuery(item).attr("src")) == null ? void 0 : _a2.replace(/(lang\/chs\/)|(\.gif)/g, "")) != null ? _b : "";
      }));
      if (links.includes("pter-zz")) {
        tags.chinese_subtitle = true;
      }
      if (links.includes("pter-gy")) {
        tags.chinese_audio = true;
      }
      if (links.includes("pter-yy")) {
        tags.cantonese_audio = true;
      }
      if (links.includes("pter-diy")) {
        tags.diy = true;
      }
    } else {
      const tagText = jQuery("td.rowhead:contains('标签')").next().text();
      tags = getTagsFromSubtitle(tagText);
    }
    return tags;
  };
  function getSpecsFromMediainfo(isBluray) {
    var _a2, _b;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, resolution, mediaTags } = getInfoFunc((_b = (_a2 = TORRENT_INFO.mediaInfos) == null ? void 0 : _a2[0]) != null ? _b : "");
    if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution || "";
      TORRENT_INFO.tags = __spreadValues(__spreadValues({}, TORRENT_INFO.tags), mediaTags);
    }
  }
  const getHDTInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f;
    const title = document.title.replace(/HD-Torrents.org\s*-/ig, "").trim();
    const imdbInfoDom = jQuery("#IMDBDetailsInfoHideShowTR .imdbnew2");
    const imdbUlrDom = imdbInfoDom.find(">a");
    const imdbUrl = imdbUlrDom.attr("href") || "";
    const movieName = imdbUlrDom.text();
    const year = (_b = (_a2 = imdbInfoDom.text().match(/Year:\s*(\d{4})/)) == null ? void 0 : _a2[1]) != null ? _b : "";
    const country = (_d2 = (_c = imdbInfoDom.text().match(/Country:\s*([^\n]+)/)) == null ? void 0 : _c[1]) != null ? _d2 : "";
    const { Category, Size, Genre } = getBasicInfo$3();
    let tags = getTagsFromSubtitle(title);
    let category = Category.toLowerCase().split(/\s|\//)[0];
    category = Genre.match(/Animation/i) ? "cartoon" : category;
    const videoType = getVideoType$b(Category, title);
    const source = getSourceFromTitle(title);
    let resolution = (_f = (_e2 = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _e2[0]) != null ? _f : "";
    if (!resolution && (resolution == null ? void 0 : resolution.match(/4k|uhd/i))) {
      resolution = "2160p";
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const descriptionDom = jQuery("#technicalInfoHideShowTR");
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    descriptionBBCode = descriptionBBCode.replace(/\[center\]((?:.|\n)+?)\[\/center\]/g, (match, p1) => {
      if (p1.match(/(keep seeding)|(spank your ass)/)) {
        return "";
      }
      return match;
    });
    const isBluray = videoType.match(/bluray/i);
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo == null ? void 0 : mediaInfoOrBDInfo[0]);
      if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution || "";
        tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      }
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.source = source;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  };
  const getBasicInfo$3 = () => {
    const basicInfo = {
      Category: "",
      Size: "",
      Title: "",
      Genre: ""
    };
    jQuery(".detailsleft").each((index, element) => {
      const key = jQuery(element).text().replace(/:/g, "").trim();
      const value = jQuery(element).next("td").text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  const getVideoType$b = (type, title) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/UHD\/Blu-Ray/i)) {
      return "uhdbluray";
    } else if (type.match(/Blu-Ray/i)) {
      return "bluray";
    }
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };
  const getKGInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i;
    const {
      InternetLink,
      Year,
      Type,
      Genres,
      Source,
      Size,
      Filename = "",
      RipSpecs = "",
      Subtitles,
      "Language(s)": language
    } = getBasicInfo$2();
    const torrentFileDom = getBasicInfoDom("Download").find("a.index");
    const torrentFileName = torrentFileDom.text().replace(/\.torrent$/, "");
    const fileName = Filename.replace(/\.\w+$/, "");
    const title = formatTorrentTitle(fileName || torrentFileName);
    const imdbUrl = (InternetLink == null ? void 0 : InternetLink.match(/imdb/)) ? InternetLink : "";
    const movieTitles = jQuery(".outer h1").text().split("- ");
    let movieName, movieAkaName;
    if (movieTitles.length >= 2) {
      [movieName, movieAkaName = ""] = movieTitles[1].replace(/\(\d+\)/, "").trim().split(/AKA/i);
    }
    const country = jQuery(".outer h1 img").attr("alt") || "";
    const year = Year;
    const size = (_b = (_a2 = Size.match(/\((.+?)\)/)) == null ? void 0 : _a2[1].replace(/,|(bytes)/g, "")) != null ? _b : "";
    let tags = getTagsFromSubtitle(title);
    if (Subtitles.match(/Chinese/i)) {
      tags.chinese_subtitle = true;
    }
    if (language.match(/Chinese|Mandarin/i)) {
      tags.chinese_audio = true;
    }
    if (language.match(/Cantonese/)) {
      tags.cantonese_audio = true;
    }
    let category = Type.toLowerCase();
    category = Genres.match(/Animation/i) ? "cartoon" : category;
    const mediaInfo = jQuery("div.mediainfo").text();
    let source = Source.replace(/-/g, "").toLowerCase();
    if (source === "tv") {
      source = "hdtv";
    }
    let genreVideoType = (_e2 = (_d2 = (_c = getBasicInfoDom("Genres").find("tr td>img").attr("src")) == null ? void 0 : _c.match(/genreimages\/(\w+)\.\w+/)) == null ? void 0 : _d2[1]) != null ? _e2 : "";
    genreVideoType = RipSpecs.match(/DVD\sFormat/) ? "dvdr" : genreVideoType;
    const videoType = getVideoType$a(title, source, genreVideoType, !!mediaInfo);
    let resolution = (_g = (_f = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _f[0]) != null ? _g : "";
    if (!resolution && resolution.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    if (genreVideoType === "dvdr" && RipSpecs) {
      TORRENT_INFO.videoCodec = "mpeg2";
      const audioCodec = (_i = (_h = RipSpecs.match(/DVD\sAudio:(.+)/)) == null ? void 0 : _h[1]) != null ? _i : "";
      TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec);
      resolution = "480p";
    }
    const descriptionDom = getBasicInfoDom("Description");
    let descriptionBBCode = getFilterBBCode(descriptionDom.find("article")[0]);
    descriptionBBCode = descriptionBBCode.replace(/(.|\n)+?_{5,}/g, "");
    const isBluray = videoType.match(/bluray/i);
    const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : [mediaInfo];
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo == null ? void 0 : mediaInfoOrBDInfo[0]);
      if (videoCodec !== "" && audioCodec !== "" && mediaResolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution || "";
        tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      }
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName.trim();
    TORRENT_INFO.movieAkaName = movieAkaName.trim();
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = Number(size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  };
  const getBasicInfo$2 = () => {
    const basicInfo = {};
    jQuery(".outer h1~table:first>tbody>tr").each((index, element) => {
      const key = jQuery(element).find("td.heading").text().replace(/\s/g, "");
      const value = jQuery(element).find("td.heading").next("td").text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  const getVideoType$a = (title, source, genreVideoType, hasMediainfo) => {
    if (source) {
      if (source === "bluray") {
        const blurayFlag = genreVideoType === "bluray" || !hasMediainfo;
        return blurayFlag ? "bluray" : "encode";
      } else if (source === "dvd") {
        const dvdFlag = genreVideoType === "dvdr" || !hasMediainfo;
        return dvdFlag ? "dvd" : "dvdrip";
      }
      return source;
    }
    if (title.match(/UHD/i) && title.match(/Blu-Ray/i)) {
      return "uhdbluray";
    } else if (title.match(/Blu-Ray/i)) {
      return "bluray";
    } else if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };
  const getBasicInfoDom = (key) => {
    return jQuery(`.outer h1~table:first>tbody>tr td:contains(${key})`).next("td");
  };
  const getUHDInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f;
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentFilePathDom = jQuery(`#files_${torrentId} .filelist_path`);
    const torrentFileDom = jQuery(`#files_${torrentId} .filelist_table>tbody>tr:nth-child(2) td`).eq(0);
    const torrentFileName = ((_a2 = torrentFilePathDom.text()) == null ? void 0 : _a2.replace(/\//g, "")) || ((_b = torrentFileDom.text()) == null ? void 0 : _b.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, ""));
    const title = formatTorrentTitle(torrentFileName);
    const imdbUrl = jQuery(".imovie_title .tooltip.imdb_icon").attr("href") || "";
    const titleText = jQuery("#scontent h2").text();
    const [movieName = "", movieAkaName = ""] = (_d2 = (_c = titleText.match(/(.+?)\[/)) == null ? void 0 : _c[1].split("/")) != null ? _d2 : [];
    const year = (_f = (_e2 = titleText.match(/\[(\d+)\]/)) == null ? void 0 : _e2[1]) != null ? _f : "";
    const torrentLink = jQuery(`#torrent${torrentId}`).find('a[href*="action=download"]').attr("href");
    CURRENT_SITE_INFO.torrentLink = torrentLink;
    let tags = getTagsFromSubtitle(title);
    const source = getSourceFromTitle(title);
    const category = title.match(/Season\s+\d+/) ? "tv" : "movie";
    const size = getSize(jQuery(`#torrent${torrentId} td`).eq(1).text());
    const infoArray = jQuery(`#torrent${torrentId} td:first-child>a`).text().replace(/\s/g, "").split("/");
    let [resolution, ...specArray] = infoArray;
    let videoType = specArray.join("|");
    videoType = getVideoType$9(videoType, resolution);
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const descriptionDom = jQuery(`#torrent_${torrentId} #description`);
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    descriptionBBCode = descriptionBBCode.replace(/https?:\/\/anonym\.to\/\?/g, "");
    TORRENT_INFO.originalDescription = descriptionBBCode;
    getMediaInfo(torrentId).then(async (data) => {
      if (data) {
        TORRENT_INFO.mediaInfos = [data];
        TORRENT_INFO.description = `${descriptionBBCode}
[quote]${data}[/quote]`;
        TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
        TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
        const isBluray = data.match(/\.(iso|m2ts|mpls)/i);
        const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
        const { videoCodec, audioCodec, mediaTags, resolution: mediaResolution } = getInfoFunc(data);
        if (resolution === "mHD" && mediaResolution) {
          resolution = mediaResolution;
        }
        if (videoCodec !== "" && audioCodec !== "") {
          TORRENT_INFO.videoCodec = videoCodec;
          TORRENT_INFO.audioCodec = audioCodec;
          tags = __spreadValues(__spreadValues({}, tags), mediaTags);
        }
      }
      TORRENT_INFO.tags = tags;
      TORRENT_INFO.resolution = resolution;
    });
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = title;
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName.trim();
    TORRENT_INFO.movieAkaName = movieAkaName.trim();
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = size;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.videoType = videoType;
  };
  const getMediaInfo = async (torrentId) => {
    const url = `/torrents.php?action=mediainfo&id=${torrentId}`;
    const data = await fetch(url, {
      responseType: void 0
    });
    return data || "";
  };
  const getVideoType$9 = (videoType, resolution) => {
    videoType = videoType.replace("-", "").toLowerCase();
    if (videoType.match(/bluray/)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (videoType.match(/web/)) {
      return "web";
    } else if (videoType.match(/x264|x265/)) {
      return "encode";
    } else if (videoType.match(/WEB/i)) {
      return "web";
    }
    return videoType;
  };
  const getBTNInfo = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentInfo2 = getTorrentInfo$9(torrentId);
    const showInfo = await getShowInfo();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, torrentInfo2);
    Object.assign(TORRENT_INFO, showInfo);
    return TORRENT_INFO;
  };
  function getTorrentInfo$9(torrentId) {
    var _a2, _b, _c;
    const torrentName = jQuery(`#torrent_${torrentId}`).prev().find("> td").text().replace(/»/, "").trim();
    const { container, source, size } = getSpecs(torrentId);
    const seasonTitle = jQuery("#content > div > h2").contents().last().text().trim();
    const [season = "", year = ""] = (_b = (_a2 = seasonTitle == null ? void 0 : seasonTitle.match(/(.*) \[(\d+)\]/)) == null ? void 0 : _a2.slice(1)) != null ? _b : [];
    const movieName = (_c = jQuery("#content > div > h2 > a > img").attr("alt")) == null ? void 0 : _c.replace(/\(\d+\)/, "").trim();
    const description = getFilterBBCode(jQuery(`#torrent_${torrentId} > td > blockquote`).last()[0]);
    const videoType = getVideoType$8({ torrentName, source });
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
    const mediaInfos = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { resolution, videoCodec, audioCodec, mediaTags: tags } = getInfoFunc(mediaInfos == null ? void 0 : mediaInfos[0]);
    const category = getCategory$5(season);
    const sourceFrom = getSourceFromTitle(torrentName);
    const torrentLink = jQuery(`#torrent_${torrentId}`).prev().prev().find('a[title="Download"]').attr("href");
    CURRENT_SITE_INFO.torrentLink = torrentLink;
    return {
      title: formatTorrentTitle(torrentName),
      format: container.toLowerCase(),
      source: sourceFrom,
      size: getSize(size),
      resolution,
      year,
      movieName,
      description,
      videoType,
      mediaInfos,
      videoCodec,
      audioCodec,
      tags,
      category
    };
  }
  async function getShowInfo() {
    var _a2;
    const seriesUrl = jQuery("#content > .thin > h2 > a").prop("href");
    const html2 = await fetch(seriesUrl, {
      responseType: void 0
    });
    const infoHtml = html2.match(/Series Info[\s\S]*?(<ul[\s\S]+?<\/ul>)/)[1];
    const infoDom = new DOMParser().parseFromString(infoHtml, "text/html");
    const info = Object.fromEntries(Array.from(infoDom.querySelectorAll("tr")).map((tr) => {
      const tds = Array.from(tr.children);
      return [tds[0].innerText.trim(), tds[1]];
    }));
    const country = info["Country:"].innerText;
    const imdbUrl = (_a2 = info["External Links:"].innerHTML.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _a2[0];
    return {
      area: getAreaCode(country),
      imdbUrl
    };
  }
  const getVideoType$8 = ({ torrentName = "", source = "" }) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (["BD50", "BD25"].includes(source)) {
      return "bluray";
    } else if (["BD66", "BD100"].includes(source)) {
      return "uhdbluray";
    } else if (["WEB-DL"].includes(source)) {
      return "web";
    } else if (["HDTV"].includes(source)) {
      return "encode";
    }
    return "";
  };
  function getCategory$5(season) {
    return season.match(/season/i) ? "tvPack" : "tv";
  }
  function getSpecs(torrentId) {
    const specsDom = jQuery(`#torrent_${torrentId}`).prev().prev();
    const rawSpecs = specsDom.find("> td > a").text().replace(/»/, "").split("/").map((v2) => v2.trim());
    const specs = rawSpecs.filter((v2) => !["NFO"].includes(v2));
    const size = specsDom.find("> td").next("td").text().replace(/\s/g, "");
    const [container, videoCodec, source, resolution, group] = specs;
    return {
      container,
      videoCodec,
      source,
      resolution,
      group,
      size
    };
  }
  const getAvistaZInfo = async () => {
    const torrentInfo2 = await getTorrentInfo$8();
    torrentInfo2.category = getPreciseCategory(torrentInfo2, torrentInfo2.category);
    Object.assign(TORRENT_INFO, torrentInfo2);
  };
  const getTorrentInfo$8 = async () => {
    var _a2, _b, _c, _d2, _e2;
    const imdbUrl = (_c = (_b = (_a2 = jQuery('.badge-extra a[href*="www.imdb.com/title"]').attr("href")) == null ? void 0 : _a2.split("?")) == null ? void 0 : _b[1]) != null ? _c : "";
    const movieTitle = jQuery(".block-titled h3 a").text();
    const movieName = movieTitle.split("(")[0].trim();
    const year = (_e2 = (_d2 = movieTitle.match(/\((\d+)\)/)) == null ? void 0 : _d2[1]) != null ? _e2 : "";
    let { Type, "File Size": size, Title, "Video Quality": resolution, "Rip Type": videoType } = getBasicInfo$1();
    const category = Type == null ? void 0 : Type.toLowerCase().replace("-", "");
    const title = formatTorrentTitle(Title);
    videoType = getVideoType$7(videoType, resolution);
    const country = jQuery(".fa-flag~.badge-extra:first a").text();
    const area = getAreaCode(country);
    const source = getSourceFromTitle(title);
    const tags = getTagsFromSubtitle(title);
    const mediaInfoOrBDInfo = jQuery("#collapseMediaInfo pre").text();
    const screenshotsBBCode = jQuery("#collapseScreens a").map(function() {
      return `[url=${jQuery(this).attr("href")}][img]${jQuery(this).find("img").attr("src")}[/img][/url]`;
    }).get();
    const screenshots = await getScreenshotsFromBBCode(screenshotsBBCode.join("\n"));
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    const descriptionBBCode = getFilterBBCode(jQuery(".torrent-desc")[0]);
    const description = `${descriptionBBCode}

[quote]${mediaInfoOrBDInfo}[/quote]

${screenshotsBBCode.join("")}`;
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      imdbUrl,
      movieName,
      year,
      size: getSize(size),
      category,
      videoType,
      resolution,
      area,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfos: [mediaInfoOrBDInfo],
      description,
      tags: __spreadValues(__spreadValues({}, tags), mediaTags)
    };
  };
  const getBasicInfo$1 = () => {
    const basicInfo = {
      Type: "",
      "File Size": "",
      Title: "",
      "Video Quality": "",
      resolution: "",
      "Rip Type": ""
    };
    jQuery("#content-area .block:last table:first>tbody>tr").each((index, element) => {
      const key = jQuery(element).find("td:first").text();
      const value = jQuery(element).find("td:last").text();
      basicInfo[key] = value.replace(/\n/g, "").trim();
    });
    return basicInfo;
  };
  const getVideoType$7 = (type, resolution) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/BluRay\s*Raw/i)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (type.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (type.match(/DVD/)) {
      return "dvd";
    } else if (type.match(/rip/i)) {
      return "encode";
    }
    return "";
  };
  const getTeamHDInfo = async () => {
    const torrentInfo2 = await getTorrentInfo$7();
    torrentInfo2.category = getPreciseCategory(torrentInfo2, torrentInfo2.category);
    try {
      let { movieName = "", year } = torrentInfo2;
      movieName = movieName.toLowerCase().replace(/\s/g, "_");
      const url = `https://v2.sg.media-imdb.com/suggestion/${movieName[0]}/${movieName}_${year}.json`;
      const imdbSearch = await fetch(url);
      if (imdbSearch && imdbSearch.d.length) {
        torrentInfo2.imdbUrl = `https://www.imdb.com/title/${imdbSearch.d[0].id}`;
      }
    } catch (error) {
      console.log(error);
    }
    Object.assign(TORRENT_INFO, torrentInfo2);
  };
  const getTorrentInfo$7 = async () => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k, _l;
    const basicInfoText = jQuery(".download").text().replace(/.+?\//g, "").trim();
    const year = (_b = (_a2 = basicInfoText.match(/\((\d{4})\)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
    const movieName = (_d2 = (_c = basicInfoText.match(/(.+)\(\d{4}\)/)) == null ? void 0 : _c[1].trim()) != null ? _d2 : "";
    const resolution = (_f = (_e2 = basicInfoText.match(/(\s*(\d+(p|i)))$/i)) == null ? void 0 : _e2[2]) != null ? _f : "";
    const videoType = getVideoType$6(basicInfoText, resolution);
    const size = getSize((_h = (_g = jQuery("#details_hop").text().match(/-\s*(.+?GB)/)) == null ? void 0 : _g[1]) != null ? _h : "");
    const category = getCategory$4(jQuery('#details_hop a[href*="browse/cat"]').attr("href") || "");
    const fileName = (_l = (_k = (_j = (_i = jQuery(".download").attr("href")) == null ? void 0 : _i.match(/name=(.+)/)) == null ? void 0 : _j[1].replace(/\.torrent/g, "")) == null ? void 0 : _k.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, "")) != null ? _l : "";
    const title = formatTorrentTitle(fileName);
    const source = getSourceFromTitle(title);
    const tags = getTagsFromSubtitle(title);
    const isBluray = videoType.match(/bluray/i);
    const mediaInfo = jQuery('.card-header:contains("MediaInfo") + .card-collapse .card-body').text();
    const bdInfo = jQuery('.card-header:contains("BDInfo") + .card-collapse .card-body').text();
    const eacLogs = jQuery('.card-header:contains("eac3to Log") + .card-collapse .card-body').text();
    const mediaInfoOrBDInfo = isBluray ? bdInfo : mediaInfo;
    const screenshotsBBCode = jQuery('#details a[href*="teamhd.org/redirector.php"]').map(function() {
      var _a3;
      const url = (_a3 = jQuery(this).attr("href")) == null ? void 0 : _a3.replace(/.+?url=/g, "");
      return `[url=${url}][img]${jQuery(this).find("img").attr("src")}[/img][/url]`;
    }).get();
    const screenshots = await getScreenshotsFromBBCode(screenshotsBBCode.join("\n"));
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
    const description = `[quote]${eacLogs}[/quote]

[quote]${mediaInfoOrBDInfo}[/quote]

${screenshotsBBCode.join("")}`;
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      movieName,
      year,
      size,
      category,
      videoType,
      resolution,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfos: [mediaInfoOrBDInfo],
      description,
      tags: __spreadValues(__spreadValues({}, tags), mediaTags),
      imdbUrl: ""
    };
  };
  const getCategory$4 = (link) => {
    var _a2, _b;
    const catNum = (_b = (_a2 = link == null ? void 0 : link.match(/cat(\d+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
    const map = {
      29: "movie",
      25: "cartoon",
      28: "document",
      31: "sport",
      32: "tv",
      33: "tvPack"
    };
    return map[parseInt(catNum, 10)] || "";
  };
  const getVideoType$6 = (type, resolution) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/Blu-Ray.+?Disc/i)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (type.match(/rip/i)) {
      return "encode";
    }
    return "";
  };
  const getHDSpaceInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f;
    const { Name, Category, Size, Description } = getBasicInfo();
    const title = formatTorrentTitle(Name);
    let tags = getTagsFromSubtitle(title);
    const category = getCategory$3(Category, title);
    let resolution = (_a2 = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _a2[0];
    if (!resolution && title.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    const videoType = getVideoType$5(Category, title);
    const source = getSourceFromTitle(title);
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const div = document.createElement("div");
    div.innerHTML = Description.html();
    jQuery(div).find('#slidenfo,a[href*="#nfo"]').remove();
    const descriptionBBCode = getFilterBBCode(div);
    const isBluray = videoType.match(/bluray/i);
    const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const { videoCodec, audioCodec, resolution: mediaResolution, mediaTags } = getInfoFunc(mediaInfoOrBDInfo == null ? void 0 : mediaInfoOrBDInfo[0]);
      if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution;
        tags = __spreadValues(__spreadValues({}, tags), mediaTags);
      }
    }
    const imdbId = (_d2 = (_c = (_b = jQuery("#imdb").next("script").text()) == null ? void 0 : _b.match(/mid=(\d+)/)) == null ? void 0 : _c[1]) != null ? _d2 : "";
    const imdbData = await fetch(`${CURRENT_SITE_INFO.url}/getimdb.php?mid=${imdbId}`, {
      responseType: void 0
    });
    const imdbDom = new DOMParser().parseFromString(imdbData, "text/html");
    const imdbUlrDom = jQuery('a[href*="imdb.com/title"]', imdbDom);
    const imdbUrl = imdbUlrDom.attr("href");
    const movieName = imdbUlrDom.text().replace(/\(\d+\)/g, "");
    const year = (_f = (_e2 = imdbUlrDom.text().match(/\((\d{4})\)/)) == null ? void 0 : _e2[1]) != null ? _f : "";
    const country = jQuery('td:contains("Country")', imdbDom).next("td").text();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution || "";
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl || "";
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = await getScreenshotsFromBBCode(descriptionBBCode);
  };
  const getBasicInfo = () => {
    const basicInfo = {
      Name: "",
      Category: "",
      Size: "",
      Description: jQuery("")
    };
    jQuery("#mcol .header").each(function() {
      var _a2;
      const key = jQuery(this).text().trim();
      if (!basicInfo[key]) {
        if (key === "Description") {
          basicInfo.Description = jQuery(this).next("td");
        } else {
          basicInfo[key] = (_a2 = jQuery(this).next("td").text()) == null ? void 0 : _a2.replace(/\n/g, "").trim();
        }
      }
    });
    return basicInfo;
  };
  const getCategory$3 = (cat, title) => {
    if (cat.match(/movie/i)) {
      return "movie";
    } else if (cat.match(/hdtv/i)) {
      return "tv";
    } else if (cat.match(/doc/i)) {
      return "documentary";
    } else if (cat.match(/Animation/i)) {
      return "cartoon";
    } else if (cat.match(/Music\sVideos/i)) {
      return "concert";
    } else if (title.match(/S\d+(E\d+)?/i)) {
      return "tv";
    }
    return "movie";
  };
  const getVideoType$5 = (type, title) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/Blu-Ray/i) && title.match(/2160p|4k|uhd/i)) {
      return "uhdbluray";
    } else if (type.match(/Blu-Ray/i)) {
      return "bluray";
    }
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/blu-ray/i) && title.match(/2160p|4k|uhd/i)) {
      return "uhdbluray";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };
  const getGPWInfo = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const data = await getTorrentInfo$6(torrentId);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, data);
  };
  const getTorrentInfo$6 = async (torrentId) => {
    const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
    const { torrent, group } = response;
    const { name: movieName, year, conver: poster, releaseType, region, imdbId, doubanId } = group;
    const imdbUrl = `https://www.imdb.com/title${imdbId}`;
    const doubanUrl = `https://movie.douban.com/subject/${doubanId}`;
    const area = getAreaCode(region);
    let { description, fileList, filePath, size, source, resolution, processing, container, mediainfos, remasterTitle } = torrent;
    fileList = fileList.replace(/\.\w+?{{{\d+}}}/g, "");
    const title = formatTorrentTitle(filePath.replace(/\[.+\]/g, "") || fileList);
    const category = getCategory$2(releaseType);
    const torrentHeaderDom = jQuery(`#torrent${torrentId}`);
    const infoArray = remasterTitle.split(" / ");
    const isRemux = processing.includes("Remux");
    const videoType = source === "WEB" ? "web" : getVideoType$4(container, isRemux, source, resolution, processing);
    source = getSource$1(source, processing, resolution);
    const tags = getTags(infoArray);
    const torrentLink = torrentHeaderDom.find('a[href*="action=download"]').attr("href");
    CURRENT_SITE_INFO.torrentLink = torrentLink;
    const torrentDom = jQuery(`#torrent${torrentId}`).next(".TableTorrent-rowDetail");
    const screenshots = getScreenshots(torrentDom);
    const mediaInfoArray = mediainfos.map((info) => info.replace(/\r\n/g, "\n"));
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = mediaInfoArray.filter((media) => {
      return videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
    });
    const mediaInfos = mediaInfoOrBDInfo.map((v2) => v2.trim());
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo.join("\n\n"));
    const descriptionData = formatDescriptionData(description, screenshots, mediaInfoArray);
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      imdbUrl,
      doubanUrl,
      movieName,
      year,
      size,
      category,
      poster,
      videoType,
      resolution,
      area,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfos,
      description: descriptionData,
      tags: __spreadValues(__spreadValues({}, tags), mediaTags)
    };
  };
  const getCategory$2 = (releaseType) => {
    const typeMap = {
      长片: "movie",
      短片: "movie",
      单口喜剧: "other",
      迷你剧: "tvPack",
      现场演出: "concert",
      电影集: "movie"
    };
    return typeMap[releaseType];
  };
  const getScreenshots = (torrentDom) => {
    var _a2;
    const imgList = [];
    const imageDom = torrentDom.find(".scale_image");
    for (let i = 0; i < imageDom.length; i++) {
      const parent = imageDom[i].parentElement;
      if ((parent == null ? void 0 : parent.tagName) === "A" && ((_a2 = parent == null ? void 0 : parent.getAttribute("href")) == null ? void 0 : _a2.match(/\.png$/))) {
        imgList.push(parent.getAttribute("href") || "");
      } else {
        imgList.push(imageDom[i].getAttribute("src") || "");
      }
    }
    return imgList;
  };
  const getSource$1 = (source, codes, resolution) => {
    if (codes.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return "uhdbluray";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  const getVideoType$4 = (container, isRemux, source, resolution, processing) => {
    let type = "";
    if (isRemux) {
      type = "remux";
    } else if (processing.match(/DIY/ig)) {
      type = resolution === "2160p" ? "uhdbluray" : "bluray";
    } else if (processing.match(/BD50|BD25/ig)) {
      type = "bluray";
    } else if (processing.match(/BD66|BD100/ig) || source.match(/Blu-ray/i) && processing.match(/DIY/i)) {
      type = "uhdbluray";
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      type = "dvdrip";
    } else if (processing.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      type = "dvd";
    } else if (container.match(/MKV|MP4/i)) {
      type = "encode";
    }
    return type;
  };
  const formatDescriptionData = (data, screenshots, mediaInfoArray) => {
    const element = document.createElement("span");
    element.innerHTML = data;
    let descriptionData = element.textContent || "";
    descriptionData = descriptionData == null ? void 0 : descriptionData.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n");
    TORRENT_INFO.originalDescription = descriptionData;
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(new RegExp(screenshot, "g"), `[img]${screenshot}[/img]`);
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, (match, p1, p2) => {
      const slash = p1 || "";
      return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[$2]$3[/$2]");
    const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n)+?)\[\/comparison\]/ig) || [];
    const comparisons = [];
    comparisonArray.forEach((item) => {
      var _a2, _b, _c, _d2;
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
      const reason = (_b = (_a2 = item.match(/(\n.*\n)?\[comparison=/i)) == null ? void 0 : _a2[1]) != null ? _b : "";
      const title = (_d2 = (_c = item.match(/\[comparison=(.*?)\]/i)) == null ? void 0 : _c[1]) != null ? _d2 : "";
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, "").split(/[ \r\n]/);
      const imgs = [];
      Array.from(new Set(comparisonImgArray)).forEach((item2) => {
        const formatImg = item2.replace(/\s*/g, "");
        if (item2.match(/^https?.+/)) {
          imgs.push(formatImg);
          descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item2}`, "gi"), `[img]${formatImg}[/img]`);
        } else if (item2.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ""));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/ig, "");
    mediaInfoArray.forEach((mediaInfo) => {
      descriptionData += `[quote]${mediaInfo}[/quote]`;
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = `${jQuery("#synopsis").text()}
${descriptionData}`;
    }
    return descriptionData;
  };
  function getTags(rawTags) {
    const knownTags = {};
    for (const rawTag of rawTags) {
      knownTags[rawTag] = true;
    }
    return knownTags;
  }
  const getEMPInfo = async () => {
    const torrentId = getUrlParam("id");
    if (!torrentId) {
      return false;
    }
    const title = jQuery("#content > .details > h2").text().trim();
    const descriptionBBCode = getFilterBBCode(jQuery(`#content${torrentId}`)[0]);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = title;
    TORRENT_INFO.description = descriptionBBCode.replace(/\[color=#ffffff\]/g, "[color=#000]").replace(/\n\n*/g, "\n");
  };
  const getBdcInfo = async () => {
    const torrentInfo2 = await getTorrentInfo$5();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = PT_SITE.Bdc.siteType;
    const imdbInfo = getIMDBInfo();
    Object.assign(TORRENT_INFO, torrentInfo2, imdbInfo);
    return TORRENT_INFO;
  };
  async function getTorrentInfo$5() {
    var _a2, _b;
    const containerDom = jQuery(".yui-content #details");
    const torrentName = containerDom.find(">table>tbody>tr:first").text();
    const size = containerDom.find(">table:first-child>tbody>tr:nth-child(5) td:last").text();
    const isTV = (_a2 = containerDom.find(">table:first-child>tbody>tr:nth-child(4) td:last").text()) == null ? void 0 : _a2.includes("TV");
    const source = getSourceFromTitle(torrentName);
    const videoCodec = getVideoCodecFromTitle(torrentName);
    const audioCodec = getAudioCodecFromTitle(torrentName);
    const videoType = getVideoType$3({ torrentName, source });
    const description = getFilterBBCode(containerDom.find("table").eq(4).find("tr:last-child td")[0]);
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
    const mediaInfos = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
    const screenshots = await getScreenshotsFromBBCode(description);
    const tags = getTagsFromSubtitle(torrentName);
    const year = (_b = torrentName.match(/(18|19|20)\d{2}/g)) != null ? _b : [];
    return {
      title: formatTorrentTitle(torrentName),
      size: getSize(size),
      source,
      videoCodec,
      audioCodec,
      videoType,
      description,
      mediaInfos,
      resolution: getResolution$1(torrentName),
      tags,
      screenshots,
      category: isTV ? "tv" : "movie",
      year: year.pop() || ""
    };
  }
  function getVideoType$3({ torrentName = "", source = "" }) {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (["BD50", "BD25"].includes(source)) {
      return "bluray";
    } else if (["BD66", "BD100"].includes(source)) {
      return "uhdbluray";
    } else if (["web"].includes(source)) {
      return "web";
    } else if (["HDTV"].includes(source)) {
      return "hdtv";
    }
    return "encode";
  }
  function getResolution$1(title) {
    title = title.toLowerCase();
    if (title.match(/4k|2160|UHD/ig)) {
      return "2160p";
    } else if (title.match(/1080(p)?/ig)) {
      return "1080p";
    } else if (title.match(/1080i/ig)) {
      return "1080i";
    } else if (title.match(/720(p)?/ig)) {
      return "720p";
    } else if (title.match(/sd/ig)) {
      return "480p";
    }
    return "";
  }
  function getIMDBInfo() {
    const infoDom = jQuery("#imdbdetails tr td").last();
    const imdbUrl = infoDom.find('a[href*="imdb.com/title"]').attr("href");
    const info = Object.fromEntries(Array.from(infoDom.find("b")).map((text2) => {
      var _a2, _b, _c;
      return [jQuery(text2).text().replace(":", ""), (_c = (_b = (_a2 = jQuery(text2)[0]) == null ? void 0 : _a2.nextSibling) == null ? void 0 : _b.nodeValue) == null ? void 0 : _c.trim()];
    }));
    const movieName = jQuery("#imdbdetails tr").first().text();
    return {
      imdbUrl,
      movieName,
      area: getAreaCode(info.Country)
    };
  }
  /*! @license DOMPurify 3.1.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.7/LICENSE */
  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object;
  let {
    apply,
    construct
  } = typeof Reflect !== "undefined" && Reflect;
  if (!freeze) {
    freeze = function freeze2(x2) {
      return x2;
    };
  }
  if (!seal) {
    seal = function seal2(x2) {
      return x2;
    };
  }
  if (!apply) {
    apply = function apply2(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
  if (!construct) {
    construct = function construct2(Func, args) {
      return new Func(...args);
    };
  }
  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function(thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return construct(func, args);
    };
  }
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      setPrototypeOf(set, null);
    }
    let l2 = array.length;
    while (l2--) {
      let element = array[l2];
      if (typeof element === "string") {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          if (!isFrozen(array)) {
            array[l2] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === "object" && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === "function") {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
  const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
  const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
  const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
  const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
  const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
  const text = freeze(["#text"]);
  const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
  const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
  const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
  const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
  const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
  const IS_ALLOWED_URI = seal(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    // eslint-disable-line no-useless-escape
  );
  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(
    /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
    // eslint-disable-line no-control-regex
  );
  const DOCTYPE_NAME = seal(/^html$/i);
  const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
  var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    DOCTYPE_NAME,
    CUSTOM_ELEMENT
  });
  const NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    // Deprecated
    entityNode: 6,
    // Deprecated
    progressingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
    // Deprecated
  };
  const getGlobal = function getGlobal2() {
    return typeof window === "undefined" ? null : window;
  };
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
      return null;
    }
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html2) {
          return html2;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_2) {
      console.warn("TrustedTypes policy " + policyName + " could not be created.");
      return null;
    }
  };
  function createDOMPurify() {
    let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
    const DOMPurify = (root) => createDOMPurify(root);
    DOMPurify.version = "3.1.7";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document: document2
    } = window2;
    const originalDocument = document2;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser: DOMParser2,
      trustedTypes
    } = window2;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const remove = lookupGetter(ElementPrototype, "remove");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    if (typeof HTMLTemplateElement === "function") {
      const template = document2.createElement("template");
      if (template.content && template.content.ownerDocument) {
        document2 = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = "";
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document2;
    const {
      importNode
    } = originalDocument;
    let hooks = {};
    DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
    const {
      MUSTACHE_EXPR: MUSTACHE_EXPR2,
      ERB_EXPR: ERB_EXPR2,
      TMPLIT_EXPR: TMPLIT_EXPR2,
      DATA_ATTR: DATA_ATTR2,
      ARIA_ATTR: ARIA_ATTR2,
      IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
      ATTR_WHITESPACE: ATTR_WHITESPACE2,
      CUSTOM_ELEMENT: CUSTOM_ELEMENT2
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let FORBID_TAGS = null;
    let FORBID_ATTR = null;
    let ALLOW_ARIA_ATTR = true;
    let ALLOW_DATA_ATTR = true;
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    let SAFE_FOR_TEMPLATES = false;
    let SAFE_FOR_XML = true;
    let WHOLE_DOCUMENT = false;
    let SET_CONFIG = false;
    let FORCE_BODY = false;
    let RETURN_DOM = false;
    let RETURN_DOM_FRAGMENT = false;
    let RETURN_TRUSTED_TYPE = false;
    let SANITIZE_DOM = true;
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
    let KEEP_CONTENT = true;
    let IN_PLACE = false;
    let USE_PROFILES = {};
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
    const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc = null;
    let CONFIG = null;
    const formElement = document2.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      if (!cfg || typeof cfg !== "object") {
        cfg = {};
      }
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(
        clone(DEFAULT_URI_SAFE_ATTRIBUTES),
        // eslint-disable-line indent
        cfg.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        transformCaseFunc
        // eslint-disable-line indent
      ) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(
        clone(DEFAULT_DATA_URI_TAGS),
        // eslint-disable-line indent
        cfg.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        transformCaseFunc
        // eslint-disable-line indent
      ) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
      RETURN_DOM = cfg.RETURN_DOM || false;
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
      FORCE_BODY = cfg.FORCE_BODY || false;
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
      IN_PLACE = cfg.IN_PLACE || false;
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      if (KEEP_CONTENT) {
        ALLOWED_TAGS["#text"] = true;
      }
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
      }
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ["tbody"]);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        emptyHTML = trustedTypesPolicy.createHTML("");
      } else {
        if (trustedTypesPolicy === void 0) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }
        if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
          emptyHTML = trustedTypesPolicy.createHTML("");
        }
      }
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
    const HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    const _checkValidNamespace = function _checkValidNamespace2(element) {
      let parent = getParentNode(element);
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: "template"
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "svg";
        }
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "math";
        }
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
        }
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }
      return false;
    };
    const _forceRemove = function _forceRemove2(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        getParentNode(node).removeChild(node);
      } catch (_2) {
        remove(node);
      }
    };
    const _removeAttribute = function _removeAttribute2(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_2) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }
      node.removeAttribute(name);
      if (name === "is" && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_2) {
          }
        } else {
          try {
            node.setAttribute(name, "");
          } catch (_2) {
          }
        }
      }
    };
    const _initDocument = function _initDocument2(dirty) {
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = "<remove></remove>" + dirty;
      } else {
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser2().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_2) {
        }
      }
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, "template", null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_2) {
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    const _createNodeIterator = function _createNodeIterator2(root) {
      return createNodeIterator.call(
        root.ownerDocument || root,
        root,
        // eslint-disable-next-line no-bitwise
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
        null
      );
    };
    const _isClobbered = function _isClobbered2(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
    };
    const _isNode = function _isNode2(object) {
      return typeof Node === "function" && object instanceof Node;
    };
    const _executeHook = function _executeHook2(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }
      arrayForEach(hooks[entryPoint], (hook) => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    const _sanitizeElements = function _sanitizeElements2(currentNode) {
      let content = null;
      _executeHook("beforeSanitizeElements", currentNode, null);
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      const tagName = transformCaseFunc(currentNode.nodeName);
      _executeHook("uponSanitizeElement", currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
        _forceRemove(currentNode);
        return true;
      }
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              const childClone = cloneNode(childNodes[i], true);
              childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
              parentNode.insertBefore(childClone, getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          content = stringReplace(content, expr, " ");
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      _executeHook("afterSanitizeElements", currentNode, null);
      return false;
    };
    const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
      if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
        return false;
      }
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
      else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
      else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (
          // First condition does a very basic check if a) it's basically a valid custom element tagname AND
          // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
          _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
          // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
        ) ;
        else {
          return false;
        }
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
      else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
      else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
      else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
      else if (value) {
        return false;
      } else ;
      return true;
    };
    const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
      return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
      _executeHook("beforeSanitizeAttributes", currentNode, null);
      const {
        attributes
      } = currentNode;
      if (!attributes) {
        return;
      }
      const hookEvent = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      let l2 = attributes.length;
      while (l2--) {
        const attr = attributes[l2];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        let value = name === "value" ? attrValue : stringTrim(attrValue);
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = void 0;
        _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
        value = hookEvent.attrValue;
        if (hookEvent.forceKeepAttr) {
          continue;
        }
        _removeAttribute(name, currentNode);
        if (!hookEvent.keepAttr) {
          continue;
        }
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            value = stringReplace(value, expr, " ");
          });
        }
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
          _removeAttribute(name, currentNode);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
          if (namespaceURI) ;
          else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case "TrustedHTML": {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
              case "TrustedScriptURL": {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
            }
          }
        }
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_2) {
        }
      }
      _executeHook("afterSanitizeAttributes", currentNode, null);
    };
    const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      _executeHook("beforeSanitizeShadowDOM", fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHook("uponSanitizeShadowNode", shadowNode, null);
        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
        _sanitizeAttributes(shadowNode);
      }
      _executeHook("afterSanitizeShadowDOM", fragment, null);
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = "<!-->";
      }
      if (typeof dirty !== "string" && !_isNode(dirty)) {
        if (typeof dirty.toString === "function") {
          dirty = dirty.toString();
          if (typeof dirty !== "string") {
            throw typeErrorCreate("dirty is not a string, aborting");
          }
        } else {
          throw typeErrorCreate("toString is not a function");
        }
      }
      if (!DOMPurify.isSupported) {
        return dirty;
      }
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      DOMPurify.removed = [];
      if (typeof dirty === "string") {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
          }
        }
      } else if (dirty instanceof Node) {
        body = _initDocument("<!---->");
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
          body = importedNode;
        } else if (importedNode.nodeName === "HTML") {
          body = importedNode;
        } else {
          body.appendChild(importedNode);
        }
      } else {
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf("<") === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        body = _initDocument(dirty);
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
        }
      }
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      while (currentNode = nodeIterator.nextNode()) {
        if (_sanitizeElements(currentNode)) {
          continue;
        }
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        _sanitizeAttributes(currentNode);
      }
      if (IN_PLACE) {
        return dirty;
      }
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          serializedHTML = stringReplace(serializedHTML, expr, " ");
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };
    DOMPurify.clearConfig = function() {
      CONFIG = null;
      SET_CONFIG = false;
    };
    DOMPurify.isValidAttribute = function(tag, attr, value) {
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function(entryPoint, hookFunction) {
      if (typeof hookFunction !== "function") {
        return;
      }
      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function(entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    DOMPurify.removeHooks = function(entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    DOMPurify.removeAllHooks = function() {
      hooks = {};
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();
  const getGazelleMusicInfo = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    try {
      TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
      TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
      const torrentInfo2 = await getTorrentInfo$4(torrentId);
      Object.assign(TORRENT_INFO, torrentInfo2);
    } catch (error) {
      console.log(error);
    }
  };
  async function getTorrentInfo$4(torrentId) {
    const { response } = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
    if (response.group) {
      if (CURRENT_SITE_NAME === "DicMusic") {
        response.group.name = getUTF8String(response.group.name);
        const div2 = document.createElement("div");
        div2.innerHTML = response.group.wikiBody;
        response.group.bbBody = htmlToBBCode(div2);
      } else if (CURRENT_SITE_NAME === "Orpheus") {
        response.group.bbBody = response.group.wikiBBcode;
      }
    }
    const { torrent, group } = response;
    const { name, year, wikiImage, musicInfo, categoryName, bbBody, tags, wikiBody } = group;
    const { format: format2, media, encoding, logScore, ripLogIds = [] } = torrent;
    const catMap = {
      Applications: "app",
      "E-Books": "ebook",
      Audiobooks: "audioBook",
      Comics: "comics",
      Music: "music",
      "E-Learning Videos": "other",
      Comedy: "other"
    };
    const div = document.createElement("div");
    div.innerHTML = wikiBody;
    let description = bbBody || htmlToBBCode(div);
    description = `[img]${wikiImage}[/img]
${description}`;
    description = purify.sanitize(description);
    const descSource = new DOMParser().parseFromString(description, "text/html");
    if (descSource.documentElement.textContent) {
      description = descSource.documentElement.textContent.replace(/\[\/?artist\]/g, "").replace(/\[url=https:\/\/redacted\.ch\/torrents\.php\?(taglist|recordlabel)=[a-zA-Z%0-9]*\]/g, "").replace(new RegExp("(?<=(\\[\\/b\\]|,)[\\s\\\\.a-zA-Z]*)\\[\\/url\\]", "g"), "");
    }
    const log = [];
    if (ripLogIds.length > 0) {
      for (let i = 1; i < ripLogIds.length; i++) {
        log.push(await getLog(logScore, torrentId, ripLogIds[i]));
      }
    } else if (media === "CD") {
      const logData = await getLog(logScore, torrentId, "0");
      if (logData) {
        log.push(logData);
      }
    }
    response.torrent.log = log;
    CURRENT_SITE_INFO.torrentLink = jQuery(`#torrent${torrentId} a[href*="action=download"]`).attr("href");
    return {
      title: jQuery(".header h2").text(),
      subtitle: `${jQuery(`#torrent${torrentId}`).prev().find("strong").contents().last().text().trim()} / ${jQuery(`#torrent${torrentId} td:first-child a[onclick*="$("]`).text()}`,
      year: `${year}`,
      poster: wikiImage,
      description,
      category: catMap[categoryName] || "other",
      audioCodec: format2.toLowerCase(),
      videoType: media.toLowerCase().replace("-", ""),
      musicInfo: {
        name,
        tags,
        artists: musicInfo.artists.map((item) => item.name),
        media,
        encoding,
        log
      },
      musicJson: response
    };
  }
  function getUTF8String(entityString) {
    const tempElement = document.createElement("textarea");
    tempElement.innerHTML = entityString;
    const utf8String = tempElement.value;
    return utf8String;
  }
  async function getLog(logScore, torrentId, ripLogId) {
    let url = `/torrents.php?action=viewlog&logscore=${logScore}&torrentid=${torrentId}`;
    if (CURRENT_SITE_NAME === "RED") {
      url = `/torrents.php?action=loglist&torrentid=${torrentId}`;
    } else if (CURRENT_SITE_NAME === "Orpheus") {
      url = `/view.php?type=riplog&id=${torrentId}.${ripLogId}`;
    } else if (CURRENT_SITE_NAME === "DicMusic") {
      url = `torrents.php?action=viewlog&logscore=${logScore}&torrentid=${torrentId}`;
    }
    const response = await fetch(url, {
      responseType: void 0
    });
    if (CURRENT_SITE_NAME.match(/DicMusic|RED/)) {
      const div = document.createElement("div");
      div.innerHTML = response;
      return jQuery(div).find("pre").text() || "";
    } else if (CURRENT_SITE_NAME.match(/Orpheus|/)) {
      return response;
    }
  }
  const getMTVInfo = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentInfo2 = await getTorrentInfo$3(torrentId);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, torrentInfo2);
    return TORRENT_INFO;
  };
  async function getTorrentInfo$3(torrentId) {
    var _a2, _b;
    const imdbUrl = jQuery('.metalinks a[href*="imdb.com/title"]').attr("href");
    const torrentContainer = jQuery(`#torrent${torrentId}`);
    const [showName] = (_b = (_a2 = jQuery(".details>h2").text()) == null ? void 0 : _a2.split("-")) != null ? _b : [];
    const torrentName = torrentContainer.find(".permalink").text().trim();
    const size = torrentContainer.find(">td").eq(1).text().trim();
    const source = getSourceFromTitle(torrentName);
    const descriptionContainer = jQuery(`#content${torrentId}`).clone();
    descriptionContainer.find(">div").remove();
    const description = getFilterBBCode(descriptionContainer[0]);
    const screenshots = await getScreenshotsFromBBCode(description);
    const isBluray = !!jQuery(`#files_${torrentId}`).text().match(/\.(iso|m2ts|mpls)/i);
    const videoType = getVideoType$2({ torrentName, source, isBluray });
    const mediaInfo = jQuery("div.mediainfo").text();
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { resolution, videoCodec, audioCodec, mediaTags: tags } = mediaInfo ? getInfoFunc(mediaInfo) : getSpecsFromTitle$1(torrentName);
    const category = getCategory$1(torrentName);
    return {
      title: formatTorrentTitle(torrentName),
      imdbUrl,
      source,
      size: getSize(size),
      resolution,
      movieName: showName.replace(/\n/g, "").trim(),
      description,
      videoType,
      mediaInfos: [mediaInfo],
      videoCodec,
      audioCodec,
      tags,
      screenshots,
      category
    };
  }
  const getVideoType$2 = ({ torrentName = "", source = "", isBluray = false }) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (source.match(/bluray/) && !isBluray) {
      return "encode";
    }
    return source;
  };
  function getCategory$1(season) {
    return season.match(/S\d+E(P)\d+/i) ? "tv" : "tvPack";
  }
  function getSpecsFromTitle$1(torrentName) {
    var _a2;
    return {
      videoCodec: getVideoCodecFromTitle(torrentName),
      audioCodec: getAudioCodecFromTitle(torrentName),
      mediaTags: getTagsFromSubtitle(torrentName),
      resolution: (_a2 = torrentName.match(/\d{3,4}(p|i)/)) == null ? void 0 : _a2[0]
    };
  }
  const getSpeedAppInfo = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const imdbUrl = jQuery('a[href*="imdb.com/title"]').attr("href");
    const movieName = jQuery("div.container > div.row div.cover-body h1.text-emphasis").text().trim();
    const torrentName = jQuery("h5.text-emphasis").text().trim();
    const source = getSourceFromTitle(torrentName);
    const descriptionContainer = jQuery("div.description.description-modern");
    const descriptionBBCode = getFilterBBCode(descriptionContainer[0]);
    const extraScreenshotDom = jQuery(descriptionContainer[0]).find("img");
    const imgs = [];
    if (extraScreenshotDom) {
      extraScreenshotDom.each((index, item) => {
        var _a2, _b;
        if (!/\.svg/.test(jQuery(item).attr("src") || "")) imgs.push(`[img]${(_b = (_a2 = jQuery(item).attr("src")) == null ? void 0 : _a2.trim()) != null ? _b : ""}[/img]`);
      });
    }
    const extraScreenshot = imgs.join("");
    const screenshots = await getScreenshotsFromBBCode(extraScreenshot);
    const isBluray = !!jQuery('span.nav-text:contains("BD Info")');
    const videoType = getVideoType$1({ torrentName, source, isBluray });
    const mediaInfo = jQuery("div.mediainfo").text();
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const { resolution, videoCodec, audioCodec } = mediaInfo ? getInfoFunc(mediaInfo) : getSpecsFromTitle(torrentName);
    TORRENT_INFO.mediaInfos = [mediaInfo];
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.description = descriptionBBCode.replace(/\n\n*/g, "\n").replace(/\s+/g, "").trim().replace(/\[img\]https:\/\/speedapp\.io\/img\/descr\/(screens|release_info)\.svg\[\/img\]/g, "").replace("[img]https://speedapp.io/img/descr/release_info.svg[/img]", "").replace(/original\.(png|webp)\]\n?\[img\]/g, "original.webp][img]").replace(/original\.(png|webp)\[\/img\]\n?\[\/url\]/g, "mobile.webp[/img][/url]").replace(/\[\/url\]\n*/g, "[/url]");
    TORRENT_INFO.screenshots = screenshots;
    TORRENT_INFO.title = torrentName;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.resolution = resolution || "";
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.poster = jQuery(".movie-poster").attr("src");
    TORRENT_INFO.videoType = videoType.toLowerCase();
  };
  const getVideoType$1 = ({ torrentName = "", source = "", isBluray = false }) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (source.match(/bluray/) && !isBluray) {
      return "encode";
    }
    return source;
  };
  function getSpecsFromTitle(torrentName) {
    var _a2;
    return {
      videoCodec: getVideoCodecFromTitle(torrentName),
      audioCodec: getAudioCodecFromTitle(torrentName),
      mediaTags: getTagsFromSubtitle(torrentName),
      resolution: (_a2 = torrentName.match(/\d{3,4}(p|i)/)) == null ? void 0 : _a2[0]
    };
  }
  const getHHInfo = async () => {
    var _a2, _b, _c, _d2, _e2, _f, _g, _h, _i, _j, _k, _l;
    const title = formatTorrentTitle(((_a2 = document.title.match(/"(.+)"/)) == null ? void 0 : _a2[1]) || "");
    const subTitle = jQuery("div.font-bold.leading-6:contains('副标题')").next().text().replace(/：/g, ":");
    const metaInfo = getMetaInfo();
    const isBluray = !!((_b = metaInfo.videoType) == null ? void 0 : _b.match(/bluray|Blu-ray/i));
    const mediaInfo = jQuery("#mediainfo-raw code").text() || "";
    const specs = getSpecsFromMediainfo$1(isBluray, mediaInfo);
    if (Object.keys(specs).length > 0) {
      Object.assign(metaInfo, specs);
    }
    const imbdDom = jQuery('#kimdb a[href*="imdb.com/title"]');
    const siteImdbUrl = (_c = imbdDom == null ? void 0 : imbdDom.attr("href")) != null ? _c : "";
    let movieName = (_e2 = (_d2 = imbdDom == null ? void 0 : imbdDom.text()) == null ? void 0 : _d2.replace(/\n/g, "").trim()) != null ? _e2 : "";
    const { category, videoType, videoCodec, audioCodec, resolution, size } = metaInfo;
    const categoryResult = getCategory$6(category);
    const formatSize = getSize(size);
    const year = (_f = title == null ? void 0 : title.match(/(19|20)\d{2}/g)) != null ? _f : [];
    const screenshots = jQuery("#screenshot-content img").toArray().map((el) => jQuery(el).attr("src")).filter((url) => url && url !== "");
    const doubanUrl = (_g = jQuery("#douban_info-content").prev().find('a[href*="douban.com"]').attr("href")) != null ? _g : "";
    const isTVCategory = !!categoryResult.match(/tv/);
    const doubanInfo = await getDoubanInfo(doubanUrl, isTVCategory);
    if (!movieName) {
      movieName = (_i = (_h = [doubanInfo == null ? void 0 : doubanInfo.foreignTitle].concat(doubanInfo == null ? void 0 : doubanInfo.aka).filter((name) => name == null ? void 0 : name.match(/^(\w|\s|:)+$/i))) == null ? void 0 : _h.shift()) != null ? _i : "";
    }
    let description = "";
    if (doubanInfo) {
      description += doubanInfo.format;
    }
    description += `
    [quote]${mediaInfo}[/quote]
  `;
    screenshots.forEach((url) => {
      description += `[img]${url}[/img]`;
    });
    const tags = getTagsFromPage();
    Object.assign(TORRENT_INFO, {
      title,
      subtitle: subTitle,
      imdbUrl: siteImdbUrl || (doubanInfo == null ? void 0 : doubanInfo.imdbLink),
      description,
      year: year.length > 0 ? year.pop() : "",
      source: getSourceFromTitle(title),
      mediaInfos: [mediaInfo],
      screenshots,
      movieName,
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: TORRENT_INFO.sourceSiteType,
      category: categoryResult,
      size: formatSize,
      tags: __spreadValues(__spreadValues({}, specs.mediaTags), tags),
      videoType: getVideoType$c(videoType),
      videoCodec,
      audioCodec,
      resolution,
      doubanUrl,
      poster: (_k = (_j = jQuery("#cover-content")) == null ? void 0 : _j.attr("src")) != null ? _k : "",
      area: getAreaCode((_l = doubanInfo == null ? void 0 : doubanInfo.region) != null ? _l : "")
    });
  };
  const getMetaInfo = () => {
    const meta = getMetaValue();
    const category = meta["类型"];
    const videoType = meta["来源"];
    const videoCodec = meta["编码"];
    const audioCodec = meta["音频编码"];
    const resolution = meta["分辨率"];
    const processing = meta["处理"];
    const size = meta["大小"];
    console.log({
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      size
    });
    return {
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    };
  };
  const getMetaValue = () => {
    const result = {};
    jQuery("div.font-bold.leading-6:contains('基本信息')").next().find("div span").each((index, el) => {
      if (index % 2 === 0) {
        const key = jQuery(el).text().replace(/:|：/g, "").trim();
        result[key] = jQuery(el).next().text();
      }
    });
    return result;
  };
  const getTagsFromPage = () => {
    const tags = {};
    const tagText = jQuery("div.font-bold.leading-6:contains('标签')").next().text();
    if (tagText.includes("中字")) {
      tags.chinese_subtitle = true;
    }
    if (tagText.includes("国语")) {
      tags.chinese_audio = true;
    }
    if (tagText.includes("粤语")) {
      tags.cantonese_audio = true;
    }
    if (tagText.includes("DIY")) {
      tags.diy = true;
    }
    if (tagText.includes("杜比视界")) {
      tags.dolbyVision = true;
    }
    if (tagText.includes("HDR")) {
      tags.dolbyVision = true;
    }
    return tags;
  };
  const MT_SPECS_MAP = {
    source: {
      8: "web",
      1: "bluray",
      3: "dvd",
      4: "hdtv",
      5: "hdtv",
      6: "other",
      7: "cd"
    },
    medium: {
      1: "bluray",
      2: "hddvd",
      3: "remux",
      7: "encode",
      4: "bluray",
      5: "hdtv",
      6: "dvd",
      8: "cd",
      10: "web"
    },
    standard: {
      1: "1080p",
      2: "1080i",
      3: "720p",
      5: "480p",
      6: "2160p"
    }
  };
  const getMTInfo = async () => {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      this.addEventListener("readystatechange", async function() {
        if (this.readyState === 4) {
          if (url.includes("/api/torrent/detail")) {
            const detailData = JSON.parse(this.responseText);
            if (detailData.code === "0") {
              const info = await getTorrentInfo$2(detailData.data);
              Object.assign(TORRENT_INFO, info);
            }
          }
          if (url.includes("/api/torrent/imdbInfo")) {
            const imdbData = JSON.parse(this.responseText);
            if (imdbData.code === "0") {
              const imdbInfo = getMovieInfo(imdbData.data);
              Object.assign(TORRENT_INFO, imdbInfo);
            }
          }
        }
      });
      originalOpen.apply(this, arguments);
    };
  };
  const getTorrentInfo$2 = async (info) => {
    var _a2, _b;
    const { name, imdb, douban, category, source, medium, standard, size, mediainfo, descr, smallDescr } = info;
    const title = formatTorrentTitle(name);
    const year = (_a2 = title == null ? void 0 : title.match(/(19|20)\d{2}/g)) != null ? _a2 : [];
    let resolution = getResolution(standard);
    const videoType = getVideoType(medium, title, resolution);
    let sourceName = getSource(source, resolution);
    if (!sourceName) {
      sourceName = getSourceFromTitle(title);
    }
    let videoCodec = getVideoCodecFromTitle(title);
    const audioCodec = getAudioCodecFromTitle(title);
    const screenshots = await getScreenshotsFromBBCode(descr);
    let mediaTags = {};
    let mediaInfoOrBDInfo = [mediainfo];
    const isBluray = !!(videoType == null ? void 0 : videoType.match(/bluray/i));
    if (!mediaInfoOrBDInfo) {
      const { bdinfo, mediaInfo } = getBDInfoOrMediaInfo(descr);
      mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    }
    if (mediaInfoOrBDInfo) {
      const infoString = mediaInfoOrBDInfo == null ? void 0 : mediaInfoOrBDInfo[0].replace(/\n{1,}/g, "\n");
      const specs = await getSpecsFromMediainfo$1(isBluray, infoString);
      videoCodec = specs.videoCodec ? specs.videoCodec : videoCodec;
      resolution = specs.resolution ? specs.resolution : resolution;
      mediaTags = specs.mediaTags || {};
    }
    let area = "";
    const areaMatch = (_b = descr.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)) == null ? void 0 : _b[2];
    if (areaMatch) {
      area = getAreaCode(areaMatch);
    }
    await getTorrentURL();
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      subtitle: smallDescr,
      title,
      area,
      imdbUrl: imdb,
      doubanUrl: douban,
      size: parseInt(size, 10),
      category: getCategory(category),
      videoType,
      resolution,
      source: sourceName,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfos: mediaInfoOrBDInfo,
      description: descr,
      year: year.length > 0 ? year.pop() : "",
      movieName: "",
      tags: __spreadValues({}, mediaTags)
    };
  };
  const getCategory = (id) => {
    const catMap = PT_SITE.MTeam.category.map;
    for (const [key, value] of Object.entries(catMap)) {
      if (value.includes(id)) {
        return key;
      }
    }
    return "";
  };
  const getSource = (id, resolution) => {
    const sourceName = MT_SPECS_MAP.source[id];
    if (sourceName === "bluray" && resolution === "2160p") {
      return "uhdbluray";
    }
    return sourceName;
  };
  const getResolution = (id) => {
    return MT_SPECS_MAP.standard[id];
  };
  const getVideoType = (id, title, resolution) => {
    const videoType = MT_SPECS_MAP.medium[id];
    if (videoType === "bluray" && resolution === "2160p") {
      return "uhdbluray";
    } else if (videoType === "dvd" && title.match(/dvdrip/i)) {
      return "dvdrip";
    }
    return videoType;
  };
  const getMovieInfo = (data) => {
    const { year, title, photo } = data;
    return {
      year,
      movieName: title,
      poster: photo.full || photo.thumb
    };
  };
  const getTorrentURL = async () => {
    var _a2, _b, _c;
    const torrentId = (_b = (_a2 = location.pathname.match(/detail\/(\d+)/)) == null ? void 0 : _a2[1]) != null ? _b : "";
    if (!torrentId) {
      return "";
    }
    const formData = new FormData();
    formData.append("id", torrentId);
    const response = await fetch("https://api.m-team.cc/api/torrent/genDlToken", {
      method: "POST",
      data: formData,
      headers: {
        Authorization: localStorage.getItem("auth") || "",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
      }
    });
    CURRENT_SITE_INFO.torrentLink = (_c = response == null ? void 0 : response.data) != null ? _c : "";
  };
  const siteNameMap = {
    BeyondHD: getBHDInfo,
    HDBits: getHDBInfo,
    Cinematik: getTikInfo,
    TTG: getTTGInfo,
    HDT: getHDTInfo,
    KG: getKGInfo,
    UHDBits: getUHDInfo,
    PTP: getPTPInfo,
    BTN: getBTNInfo,
    TeamHD: getTeamHDInfo,
    HDSpace: getHDSpaceInfo,
    GPW: getGPWInfo,
    EMP: getEMPInfo,
    Bdc: getBdcInfo,
    RED: getGazelleMusicInfo,
    DicMusic: getGazelleMusicInfo,
    MTV: getMTVInfo,
    SpeedApp: getSpeedAppInfo,
    HH: getHHInfo,
    MTeam: getMTInfo,
    Orpheus: getGazelleMusicInfo
  };
  const siteTypeInfoMap = {
    NexusPHP: getNexusPHPInfo,
    UNIT3D: getUNIT3DInfo,
    AvistaZ: getAvistaZInfo
  };
  let getTorrentInfo = () => Promise.resolve();
  if (!CURRENT_SITE_INFO) {
    console.log("do nothing");
  } else if (siteNameMap[CURRENT_SITE_NAME]) {
    getTorrentInfo = siteNameMap[CURRENT_SITE_NAME];
  } else if (siteTypeInfoMap[CURRENT_SITE_INFO.siteType]) {
    getTorrentInfo = siteTypeInfoMap[CURRENT_SITE_INFO.siteType];
  }
  const getTorrentInfo$1 = getTorrentInfo;
  const filterBluTorrent = (imdb = "", name = "") => {
    if (imdb) {
      jQuery("#imdb").val(imdb);
    } else if (name) {
      jQuery("#search").val(name);
    }
    const token = jQuery('meta[name="csrf_token"]').attr("content");
    const url = `${CURRENT_SITE_INFO.url}/torrents/filter?search=${name}&imdb=${imdb}&_token=${token}&sorting=size&direction=desc`;
    fetch(url, {
      responseType: void 0
    }).then((data) => {
      jQuery("#facetedSearch").html(data);
    });
  };
  const fillSearchImdb = () => {
    const imdbParam = getUrlParam("imdb");
    const nameParam = getUrlParam("name");
    const searchType = getUrlParam("search_area");
    if (imdbParam || nameParam) {
      if (CURRENT_SITE_INFO.siteType === "UNIT3D" && CURRENT_SITE_NAME !== "Blutopia") {
        filterBluTorrent(imdbParam, nameParam);
      } else if (CURRENT_SITE_NAME === "Bdc") {
        jQuery("#tsstac").val(imdbParam);
        jQuery("#search_type").val(searchType);
      } else if (CURRENT_SITE_NAME === "PTN") {
        jQuery("#movieimdb").val(imdbParam);
        jQuery("#moviename").val(nameParam);
      }
    }
  };
  if (location.host === "ptpimg.me") {
    const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
    if (!ptpImgApiKey) {
      const div = document.createElement("div");
      preact.render(/* @__PURE__ */ u$1("div", { class: "ptp-api-key-btn", children: /* @__PURE__ */ u$1("button", { class: "btn btn-info", onClick: () => {
        const apiKey = jQuery("#api_key").val();
        GM_setValue("easy-seed.ptp-img-api-key", apiKey);
        Jt.success("Success! Saved to EasyUpload.");
      }, children: [
        /* @__PURE__ */ u$1("i", { class: "glyphicon glyphicon-floppy-saved" }),
        /* @__PURE__ */ u$1("span", { children: "Save ApiKey" })
      ] }) }), div);
      (_a = document.querySelector("#form_file_upload")) == null ? void 0 : _a.appendChild(div);
    }
  }
  const getTvSeasonData = async (data) => {
    var _a2, _b;
    const { title: torrentTitle } = TORRENT_INFO;
    const { season = "", title } = data;
    if (season) {
      const seasonNumber = (_b = (_a2 = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)) == null ? void 0 : _a2[1]) != null ? _b : "1";
      if (parseInt(seasonNumber, 10) === 1) {
        return data;
      }
      const query = title.replace(/第.+?季/, `第${seasonNumber}季`);
      const response = await getDoubanIdByIMDB(query);
      return response;
    }
  };
  const updateTorrentInfo = (data) => {
    var _a2, _b;
    const desc = data.format;
    TORRENT_INFO.doubanInfo = data.format;
    TORRENT_INFO.subtitle = getSubTitle(data);
    const areaMatch = (_b = (_a2 = desc == null ? void 0 : desc.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a2[2]) != null ? _b : "";
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
    const category = TORRENT_INFO.category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  };
  const Douban = () => {
    const [btnText, setBtnText] = h("获取豆瓣简介");
    const [bookBtnText, setBookBtnText] = h("获取豆瓣读书简介");
    const [btnDisable, setBtnDisable] = h(false);
    const [searchValue, setSearchValue] = h("");
    const doubanClosed = GM_getValue("easy-seed.douban-closed") || "";
    const { needDoubanBookInfo, needDoubanInfo } = CURRENT_SITE_INFO;
    const showSearch = (needDoubanBookInfo || needDoubanInfo || !TORRENT_INFO.doubanUrl) && !doubanClosed;
    const getDoubanData = async () => {
      try {
        setBtnText("获取中...");
        setBtnDisable(true);
        const scriptDoubanLink = jQuery(".douban-dom").attr("douban-link");
        const doubanLink = jQuery(".page__title>a").attr("href") || scriptDoubanLink || TORRENT_INFO.doubanUrl || searchValue;
        let doubanUrl = "";
        if (doubanLink && doubanLink.match(/movie\.douban\.com/)) {
          doubanUrl = doubanLink;
        } else {
          const { imdbUrl, movieName } = TORRENT_INFO;
          const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
          if (doubanData) {
            let { id, season = "" } = doubanData;
            if (season) {
              const tvData = await getTvSeasonData(doubanData);
              if (tvData) {
                id = tvData.id;
              }
            }
            doubanUrl = `https://movie.douban.com/subject/${id}`;
          }
        }
        if (doubanUrl) {
          TORRENT_INFO.doubanUrl = doubanUrl;
          setSearchValue(doubanUrl);
          if (!TORRENT_INFO.description.match(/(片|译)\s*名/)) {
            const isTVCategory = !!TORRENT_INFO.category.match(/tv/);
            const movieData = await getDoubanInfo(doubanUrl, isTVCategory);
            if (movieData) {
              Jt.success($t("获取成功"));
              updateTorrentInfo(movieData);
            }
          } else {
            Jt.success($t("获取成功"));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setBtnText("获取豆瓣简介");
        setBtnDisable(false);
      }
    };
    const getBookData = () => {
      let { doubanUrl } = TORRENT_INFO;
      if (!doubanUrl) {
        doubanUrl = searchValue;
      } else {
        setSearchValue(doubanUrl);
      }
      if (doubanUrl) {
        setBookBtnText("获取中...");
        setBtnDisable(true);
        getDoubanBookInfo(doubanUrl).then((data) => {
          if (data) {
            TORRENT_INFO.title = data.chineseTitle || data.foreignTitle;
            TORRENT_INFO.poster = data.poster;
            TORRENT_INFO.description = data.book_intro || "";
            TORRENT_INFO.doubanBookInfo = data || null;
          }
          Jt.success($t("获取成功"));
        }).catch((error) => {
          console.log(error);
          Jt.error(error.message);
        }).finally(() => {
          setBookBtnText("获取豆瓣读书简介");
          setBtnDisable(false);
        });
      } else {
        Jt.error($t("缺少豆瓣链接"));
      }
    };
    return showSearch ? /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("div", { className: "function-list-item", children: /* @__PURE__ */ u$1("div", { className: "douban-section", children: /* @__PURE__ */ u$1(
        "input",
        {
          type: "text",
          placeholder: $t("手动输入豆瓣链接"),
          value: searchValue,
          onChange: (e2) => setSearchValue(e2.target.value)
        }
      ) }) }),
      /* @__PURE__ */ u$1("div", { className: "function-list-item", children: /* @__PURE__ */ u$1("div", { className: "douban-section", children: [
        showSearch && CURRENT_SITE_NAME !== "SoulVoice" && /* @__PURE__ */ u$1(
          "button",
          {
            id: "douban-info",
            disabled: btnDisable,
            className: btnDisable ? "is-disabled" : "",
            onClick: getDoubanData,
            children: $t(btnText)
          }
        ),
        showSearch && CURRENT_SITE_NAME === "SoulVoice" && /* @__PURE__ */ u$1(
          "button",
          {
            disabled: btnDisable,
            className: btnDisable ? "is-disabled" : "",
            id: "douban-book-info",
            onClick: getBookData,
            children: $t(bookBtnText)
          }
        )
      ] }) })
    ] }) : null;
  };
  const Transfer = () => {
    const [imgHost, setImgHost] = h("imgbox");
    const [btnDisable, setBtnDisable] = h(false);
    const [btnText, setBtnText] = h("转缩略图");
    const [progress, setProgress] = h(-1);
    const [imgList, setImgList] = h([]);
    const getThumbnailImgs = async () => {
      var _a2, _b, _c;
      try {
        const comparisons = TORRENT_INFO.comparisons || [];
        const allImgs = TORRENT_INFO.screenshots.concat(...comparisons.map((v2) => v2.imgs));
        const imgList2 = [...new Set(allImgs)];
        setImgList(imgList2);
        if (imgList2.length < 1) {
          throw new Error($t("获取图片列表失败"));
        }
        setBtnText("转换中...");
        setBtnDisable(true);
        setProgress(0);
        const hostMap = {
          imgbb: "https://imgbb.com/json",
          gifyu: "https://gifyu.com/json",
          pixhost: "https://pixhost.to",
          imgbox: "https://imgbox.com",
          HDB: "https://img.hdbits.org"
        };
        const selectHost = hostMap[imgHost];
        let uploadedImgs = [];
        let authToken, tokenSecret;
        if (imgHost.match(/imgbb|gifyu/)) {
          const rawHtml = await fetch(selectHost.replace("/json", ""), {
            responseType: void 0
          });
          authToken = (_a2 = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)) == null ? void 0 : _a2[1];
        } else if (imgHost === "imgbox") {
          const rawHtml = await fetch("https://imgbox.com", {
            responseType: void 0
          });
          authToken = (_b = rawHtml.match(/content="(.+)" name="csrf-token"/)) == null ? void 0 : _b[1];
          tokenSecret = await fetch("https://imgbox.com/ajax/token/generate", {
            responseType: "json",
            method: "POST",
            headers: {
              "X-CSRF-Token": authToken
            }
          });
        }
        if (imgHost === "HDB") {
          const imgContent = await uploadToHDB(imgList2, TORRENT_INFO.title);
          uploadedImgs = (_c = imgContent == null ? void 0 : imgContent.split("\n")) != null ? _c : [];
        } else {
          for (let index = 0; index < imgList2.length; index++) {
            let data;
            if (imgHost.match(/imgbb|gifyu/)) {
              const transferData = await transferImgs(imgList2[index], authToken, selectHost);
              data = `[url=${transferData.url}][img]${transferData.thumb.url}[/img][/url]`;
            } else if (imgHost === "pixhost") {
              const [transferData] = await uploadToPixhost([imgList2[index]]);
              data = `[url=${transferData.show_url}][img]${transferData.th_url}[/img][/url]`;
            } else if (imgHost === "imgbox") {
              const transferData = await uploadToImgbox(imgList2[index], authToken, tokenSecret);
              data = `[url=${transferData.original_url}][img]${transferData.thumbnail_url}[/img][/url]`;
            }
            if (data) {
              uploadedImgs.push(data);
              setProgress(uploadedImgs.length);
            }
          }
        }
        if (uploadedImgs.length) {
          TORRENT_INFO.screenshots = uploadedImgs.slice(0, TORRENT_INFO.screenshots.length);
          let { description } = TORRENT_INFO;
          imgList2.forEach((img, index) => {
            var _a3, _b2;
            if (img.match(/i\.hdbits\.org/)) {
              const imgId = (_b2 = (_a3 = img.match(/i\.hdbits\.org\/(.+)\./)) == null ? void 0 : _a3[1]) != null ? _b2 : "";
              const urlReg = new RegExp(`\\[url=https://img.hdbits.org/${imgId}\\].+?\\[\\/url\\]
*`, "ig");
              if (description.match(urlReg)) {
                description = description.replace(urlReg, uploadedImgs[index] || "");
              }
            } else if (description.includes(img)) {
              const urlReg = new RegExp(`\\[url=${img}\\].+?\\[\\/url\\]
*`, "ig");
              if (description.match(urlReg)) {
                description = description.replace(urlReg, uploadedImgs[index] || "");
              } else {
                description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]
*`, "ig"), uploadedImgs[index] || "");
              }
            }
          });
          TORRENT_INFO.description = description;
          Jt.success($t("转换成功！"));
        }
      } catch (error) {
        Jt.error(error.message);
      } finally {
        setBtnText("转缩略图");
        setBtnDisable(false);
      }
    };
    const transferImgClosed = getValue("easy-seed.transfer-img-closed", false) || "";
    return !(transferImgClosed || CURRENT_SITE_NAME === "BTN") ? /* @__PURE__ */ u$1("div", { className: "function-list-item", children: /* @__PURE__ */ u$1("div", { className: "upload-section", children: [
      /* @__PURE__ */ u$1(
        "button",
        {
          className: btnDisable ? "is-disabled" : "",
          onClick: getThumbnailImgs,
          disabled: btnDisable,
          children: $t(btnText)
        }
      ),
      /* @__PURE__ */ u$1(
        "select",
        {
          value: imgHost,
          onChange: (e2) => setImgHost(e2.target.value),
          children: [
            /* @__PURE__ */ u$1("option", { value: "imgbox", children: "imgbox" }),
            /* @__PURE__ */ u$1("option", { value: "imgbb", children: "imgbb" }),
            /* @__PURE__ */ u$1("option", { value: "gifyu", children: "gifyu" }),
            /* @__PURE__ */ u$1("option", { value: "pixhost", children: "pixhost" }),
            /* @__PURE__ */ u$1("option", { value: "HDB", children: "HDB" })
          ]
        }
      ),
      /* @__PURE__ */ u$1(
        "div",
        {
          id: "transfer-progress",
          hidden: progress < 0,
          children: `${progress} / ${imgList.length}`
        }
      )
    ] }) }) : null;
  };
  const UploadImg = () => {
    const [selectHost, setSelectHost] = h("ptpimg");
    const [btnDisable, setBtnDisable] = h(false);
    const [btnText, setBtnText] = h("转存截图");
    const [canCopy, setCanCopy] = h(false);
    const [screenBBCode, setScreenBBCode] = h([]);
    const [copyText, setCopyText] = h("拷贝");
    const uploadScreenshotsToAnother = async () => {
      var _a2;
      const screenshots = TORRENT_INFO.screenshots;
      setBtnText("上传中，请稍候...");
      setBtnDisable(true);
      try {
        setCanCopy(false);
        setCopyText("拷贝");
        const imgData = [];
        if (selectHost === "ptpimg") {
          for (let index = 0; index < screenshots.length; index++) {
            const originalImg = await getOriginalImgUrl(screenshots[index]);
            const data = await saveScreenshotsToPtpimg([originalImg]);
            if (data) {
              imgData.push(data[0]);
            } else {
              return;
            }
          }
        } else {
          const gifyuHtml = await fetch("https://gifyu.com", {
            responseType: void 0
          });
          const authToken = (_a2 = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)) == null ? void 0 : _a2[1];
          for (let index = 0; index < screenshots.length; index++) {
            const originalImg = await getOriginalImgUrl(screenshots[index]);
            const data = await transferImgs(originalImg, authToken, "https://gifyu.com/json");
            if (data) {
              imgData.push(data.url);
            }
          }
        }
        if (imgData.length > 0) {
          Jt.success($t("成功"));
        }
        let { description, originalDescription } = TORRENT_INFO;
        TORRENT_INFO.screenshots = imgData;
        const screenBBcodeArray = imgData.map((img) => {
          return `[img]${img}[/img]`;
        });
        setScreenBBCode(screenBBcodeArray);
        setCanCopy(true);
        const allImages = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig);
        if (allImages && allImages.length > 0) {
          allImages.forEach((img) => {
            if (img.match(/\[url=.+?\]/)) {
              img += "[/url]";
            }
            originalDescription = originalDescription == null ? void 0 : originalDescription.replace(img, "");
            description = description.replace(img, "");
          });
        }
        TORRENT_INFO.originalDescription = `${originalDescription}
${screenBBcodeArray.join("")}`;
        TORRENT_INFO.description = `${description}
${screenBBcodeArray.join("")}`;
      } catch (error) {
        Jt.error(error.message);
      } finally {
        setBtnText("转存截图");
        setBtnDisable(false);
      }
    };
    const uploadImgClosed = GM_getValue("easy-seed.upload-img-closed") || "";
    return !(uploadImgClosed || CURRENT_SITE_NAME === "BTN") ? /* @__PURE__ */ u$1("div", { className: "function-list-item", children: /* @__PURE__ */ u$1("div", { className: "upload-section", children: [
      /* @__PURE__ */ u$1(
        "button",
        {
          disabled: btnDisable,
          className: btnDisable ? "is-disabled" : "",
          onClick: uploadScreenshotsToAnother,
          children: $t(btnText)
        }
      ),
      /* @__PURE__ */ u$1("select", { value: selectHost, onChange: (e2) => setSelectHost(e2.target.value), children: [
        /* @__PURE__ */ u$1("option", { value: "ptpimg", children: "ptpimg" }),
        /* @__PURE__ */ u$1("option", { value: "gifyu", children: "gifyu" })
      ] }),
      /* @__PURE__ */ u$1(
        "button",
        {
          className: "copy-img",
          hidden: !canCopy,
          onClick: () => {
            GM_setClipboard(screenBBCode.join(""));
            setCopyText("已拷贝");
          },
          children: $t(copyText)
        }
      )
    ] }) }) : null;
  };
  const FunctionList = () => {
    return /* @__PURE__ */ u$1("section", { className: "easy-seed-function-list", children: [
      /* @__PURE__ */ u$1(Douban, {}),
      /* @__PURE__ */ u$1(Transfer, {}),
      /* @__PURE__ */ u$1(UploadImg, {})
    ] });
  };
  const getQuickSearchUrl = (siteName) => {
    var _a2;
    const siteInfo = PT_SITE[siteName];
    const searchConfig = siteInfo.search;
    const { params = {}, imdbOptionKey, nameOptionKey, path: path2, replaceKey } = searchConfig;
    let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
    let searchKeyWord = "";
    const { movieAkaName, movieName, title, musicJson } = TORRENT_INFO;
    if (imdbId && !siteName.match(/(nzbs.in|HDF|TMDB|豆瓣读书|TeamHD|NPUBits)$/) && siteInfo.siteType !== "AvistaZ") {
      if (replaceKey) {
        searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
      } else {
        searchKeyWord = imdbId;
      }
    } else if (CURRENT_SITE_NAME.match(/RED|DicMusic|Orpheus/)) {
      const { year = "", name = "" } = (_a2 = musicJson == null ? void 0 : musicJson.group) != null ? _a2 : {};
      searchKeyWord = `${name} ${year}`;
    } else {
      searchKeyWord = movieAkaName || movieName || title;
      imdbId = "";
    }
    let searchParams = Object.keys(params).map((key) => {
      return `${key}=${params[key]}`;
    }).join("&");
    if (imdbId) {
      searchParams = searchParams.replace(/\w+={name}&{0,1}?/, "").replace(/{imdb}/, searchKeyWord).replace(/{optionKey}/, imdbOptionKey || "");
    } else {
      if (searchParams.match(/{name}/)) {
        searchParams = searchParams.replace(/\w+={imdb}&{0,1}?/, "").replace(/{name}/, searchKeyWord);
      } else {
        searchParams = searchParams.replace(/{imdb}/, searchKeyWord);
      }
      searchParams = searchParams.replace(/{optionKey}/, nameOptionKey || "");
    }
    let url = `${siteInfo.url + path2}${searchParams ? `?${searchParams}` : ""}`;
    if (siteName.match(/nzb|TMDB|豆瓣读书|SubHD|OpenSub/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    return url;
  };
  const SearchList = () => {
    const handleSearchClickEvent = (siteName) => {
      let openUrl = "";
      const attrUrl = jQuery(`.search-list li>a[data-site="${siteName}"]`).data("url");
      if (attrUrl) {
        openUrl = attrUrl;
      } else {
        openUrl = getQuickSearchUrl(siteName);
      }
      GM_openInTab(openUrl);
    };
    const searchListSetting = getValue("easy-seed.enabled-search-site-list");
    const searchSitesEnabled = searchListSetting || [];
    const siteFaviconClosed = getValue("easy-seed.site-favicon-closed", false);
    const getSearchSites = () => {
      const commonSites = [];
      const subtitlesSites = [];
      SORTED_SITE_KEYS.forEach((siteName) => {
        const siteInfo = PT_SITE[siteName];
        if (siteInfo.search) {
          if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
            if (siteInfo.siteType === "subtitles") {
              subtitlesSites.push(siteName);
            } else {
              commonSites.push(siteName);
            }
          }
        }
      });
      return {
        commonSites,
        subtitlesSites
      };
    };
    const batchSearchClick = () => {
      const { commonSites, subtitlesSites } = getSearchSites();
      [...commonSites, ...subtitlesSites].forEach((site) => {
        handleSearchClickEvent(site);
      });
    };
    return /* @__PURE__ */ u$1(preact.Fragment, { children: ["commonSites", "subtitlesSites"].map((key, index) => {
      const siteList = getSearchSites()[key];
      return siteList.length > 0 ? /* @__PURE__ */ u$1("ul", { className: "search-list", children: [
        siteList.map((siteName) => {
          const siteInfo = PT_SITE[siteName];
          const favIcon = !siteFaviconClosed && siteInfo.icon ? siteInfo.icon : "";
          return /* @__PURE__ */ u$1("li", { children: [
            /* @__PURE__ */ u$1(
              "a",
              {
                "data-site": siteName,
                onClick: () => handleSearchClickEvent(siteName),
                children: [
                  !!favIcon && /* @__PURE__ */ u$1("img", { src: favIcon, className: "site-icon" }),
                  siteName
                ]
              }
            ),
            /* @__PURE__ */ u$1("span", { children: "|" })
          ] }, siteName);
        }),
        index === 0 && /* @__PURE__ */ u$1("li", { id: "batch-search-btn", onClick: batchSearchClick, title: $t("同时打开多个搜索标签页"), children: $t("批量检索") })
      ] }) : "";
    }) });
  };
  const getPTPGroupId = async (imdbUrl) => {
    if (!imdbUrl) {
      return "";
    }
    const imdbId = getIMDBIdByUrl(imdbUrl);
    if (imdbId) {
      const url = `${PT_SITE.PTP.url}/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
      const data = await fetch(url);
      if (data && data.Movies && data.Movies.length > 0) {
        return data.Movies[0].GroupId;
      }
      return "";
    }
    return "";
  };
  const openBatchSeedTabs = () => {
    const batchSeedSetting = getValue("easy-seed.enabled-batch-seed-sites") || [];
    if (batchSeedSetting.length === 0) {
      Jt.error($t("请先设置群转列表"));
      return false;
    }
    SORTED_SITE_KEYS.forEach(async (siteName) => {
      const siteInfo = PT_SITE[siteName];
      const { url, uploadPath = "" } = siteInfo;
      if (siteInfo.asTarget) {
        if (batchSeedSetting.includes(siteName)) {
          if (!TORRENT_INFO.torrentData) {
            const torrentData = await getTorrentFileData(CURRENT_SITE_INFO.torrentDownloadLinkSelector, CURRENT_SITE_INFO.torrentLink);
            if (torrentData) {
              TORRENT_INFO.torrentData = torrentData;
            }
          }
          const timestamp = `${Date.now()}`;
          GM_setValue("uploadInfo", TORRENT_INFO);
          GM_openInTab(`${url + uploadPath}#timestamp=${timestamp}`);
        }
      }
    });
    Jt.success($t("转种页面已打开，请前往对应页面操作"));
  };
  const getGPWGroupId = async (imdbUrl) => {
    if (!imdbUrl) {
      return "";
    }
    const imdbId = getIMDBIdByUrl(imdbUrl);
    if (imdbId) {
      const url = `${PT_SITE.GPW.url}/upload.php?action=movie_info&imdbid=${imdbId}&check_only=1`;
      const data = await fetch(url);
      if (data && data.response && data.response.GroupID) {
        return data.response.GroupID;
      }
      return "";
    }
    return "";
  };
  const UploadSiteList = () => {
    const handleSiteClickEvent = async (url) => {
      if (url.match(/hdpost|blutopia|fearnopeer|asiancinema|monikadesign|lst/)) {
        const catMap = {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1"
        };
        const path2 = catMap[TORRENT_INFO.category] || "1";
        url = url.replace("1", path2);
      }
      if (url.match(/aither/)) {
        const catMap = {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1",
          concert: "1",
          sport: "9",
          cartoon: "1",
          app: "10",
          ebook: "11",
          magazine: "11",
          audioBook: "14"
        };
        const path2 = catMap[TORRENT_INFO.category] || "1";
        url = url.replace("1", path2);
      }
      if (url.match(/bibliotik/)) {
        const catMap = {
          ebook: "ebooks",
          magazine: "magazines",
          audioBook: "audiobooks"
        };
        url = url.replace("/upload", `/upload/${catMap[TORRENT_INFO.category] || "ebooks"}`);
      }
      if (url.match(PT_SITE.BYR.host)) {
        const catMap = {
          movie: "408",
          tv: "401",
          tvPack: "401",
          documentary: "410",
          concert: "402",
          sport: "409",
          cartoon: "404",
          variety: "405"
        };
        url = url.replace("/upload.php", `/upload.php?type=${catMap[TORRENT_INFO.category]}`);
      }
      if (url.match(PT_SITE.PTP.host)) {
        const groupId = await getPTPGroupId(TORRENT_INFO.imdbUrl);
        url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
      }
      if (url.match(PT_SITE.GPW.host)) {
        const groupId = await getGPWGroupId(TORRENT_INFO.imdbUrl);
        if (groupId) {
          url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
        }
      }
      if (TORRENT_INFO.isForbidden) {
        const result = window.confirm($t("本种子可能禁止转载，确定要继续转载么？"));
        if (!result) {
          return;
        }
      }
      if (CURRENT_SITE_NAME === "TTG" && !TORRENT_INFO.description) {
        Jt.warning($t("请等待页面加载完成"));
        return;
      }
      const timestamp = `${Date.now()}`;
      if (!TORRENT_INFO.torrentData) {
        const torrentData = await getTorrentFileData(CURRENT_SITE_INFO.torrentDownloadLinkSelector, CURRENT_SITE_INFO.torrentLink);
        if (torrentData) {
          TORRENT_INFO.torrentData = torrentData;
        }
      }
      GM_setValue("uploadInfo", TORRENT_INFO);
      url = `${url}#timestamp=${timestamp}`;
      GM_openInTab(url);
    };
    const targetSitesEnabled = getValue("easy-seed.enabled-target-sites") || [];
    const siteFaviconClosed = getValue("easy-seed.site-favicon-closed", false) || "";
    return /* @__PURE__ */ u$1("ul", { className: "site-list", children: [
      SORTED_SITE_KEYS.map((siteName) => {
        const siteInfo = PT_SITE[siteName];
        const { url, uploadPath } = siteInfo;
        const favIcon = siteFaviconClosed === "" && siteInfo.icon ? siteInfo.icon : "";
        if (siteInfo.asTarget) {
          if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
            return /* @__PURE__ */ u$1("li", { children: [
              /* @__PURE__ */ u$1(
                "a",
                {
                  className: "site-item",
                  onClick: () => handleSiteClickEvent(`${url}${uploadPath}`),
                  children: [
                    !!favIcon && /* @__PURE__ */ u$1("img", { src: favIcon, className: "site-icon" }),
                    siteName
                  ]
                }
              ),
              /* @__PURE__ */ u$1("span", { children: "|" })
            ] }, siteName);
          }
        }
        return "";
      }),
      /* @__PURE__ */ u$1("li", { children: /* @__PURE__ */ u$1("button", { id: "batch-seed-btn", onClick: openBatchSeedTabs, children: $t("一键群转") }) })
    ] });
  };
  const SiteListConfig = [
    {
      name: "enabled-target-sites",
      class: "target-sites-enable-list",
      title: "转种站点启用",
      key: "targetEnabled"
    },
    {
      name: "enabled-search-site-list",
      class: "search-sites-enable-list",
      title: "站点搜索启用",
      key: "searchEnabled"
    },
    {
      name: "enabled-batch-seed-sites",
      class: "batch-seed-sites-enable-list",
      title: "批量转种启用",
      key: "batchEnabled",
      des: "一键批量转发到以下选中的站点"
    }
  ];
  const FeatureSwitchList = [
    {
      name: "quick-search-closed",
      des: "关闭快速检索",
      type: "checkbox",
      key: "quickSearchClosed"
    },
    {
      name: "transfer-img-closed",
      des: "关闭转缩略图功能",
      type: "checkbox",
      key: "transferImgClosed"
    },
    {
      name: "upload-img-closed",
      des: "关闭转存ptpimg功能",
      type: "checkbox",
      key: "uploadImgClosed"
    },
    {
      name: "site-favicon-closed",
      des: "关闭站点图标显示",
      type: "checkbox",
      key: "siteFaviconClosed"
    },
    {
      name: "thanks-quote-closed",
      des: "不显示致谢内容",
      type: "checkbox",
      key: "thanksQuoteClosed"
    },
    {
      name: "douban-closed",
      des: "不显示豆瓣按钮和豆瓣链接",
      type: "checkbox",
      key: "doubanClosed"
    }
  ];
  const SettingPanel = (props) => {
    const getSiteSetList = () => {
      const targetSitesEnabled = getValue("easy-seed.enabled-target-sites") || [];
      const batchSeedSiteEnabled = getValue("easy-seed.enabled-batch-seed-sites") || [];
      const searchSitesEnabled = getValue("easy-seed.enabled-search-site-list") || [];
      return SORTED_SITE_KEYS.map((site) => {
        const targetEnabled = targetSitesEnabled.includes(site);
        const batchEnabled = batchSeedSiteEnabled.includes(site);
        const searchEnabled = searchSitesEnabled.includes(site);
        return {
          site,
          targetEnabled,
          batchEnabled,
          searchEnabled
        };
      });
    };
    const getFeatureList = () => {
      return FeatureSwitchList.map((feature) => {
        const isChecked = getValue(`easy-seed.${feature.name}`, false) || false;
        return __spreadProps(__spreadValues({}, feature), {
          checked: !!isChecked
        });
      });
    };
    const featureList = getFeatureList();
    const siteList = getSiteSetList();
    const { closePanel } = props;
    const [ptpImgApiKey, setPtpImgApiKey] = h(getValue("easy-seed.ptp-img-api-key", false) || "");
    const [doubanCookie, setDoubanCookie] = h(getValue("easy-seed.douban-cookie", false) || "");
    const saveSetting = () => {
      const targetSitesEnabled = [];
      const searchSitesEnabled = [];
      const batchSeedSiteEnabled = [];
      siteList.forEach(({ site, targetEnabled, batchEnabled, searchEnabled }) => {
        if (batchEnabled) {
          batchSeedSiteEnabled.push(site);
        }
        if (searchEnabled) {
          searchSitesEnabled.push(site);
        }
        if (targetEnabled) {
          targetSitesEnabled.push(site);
        }
      });
      try {
        GM_setValue("easy-seed.enabled-target-sites", JSON.stringify(targetSitesEnabled));
        GM_setValue("easy-seed.enabled-search-site-list", JSON.stringify(searchSitesEnabled));
        GM_setValue("easy-seed.enabled-batch-seed-sites", JSON.stringify(batchSeedSiteEnabled));
        GM_setValue("easy-seed.ptp-img-api-key", ptpImgApiKey);
        GM_setValue("easy-seed.douban-cookie", doubanCookie);
        featureList.forEach((feature) => {
          GM_setValue(`easy-seed.${feature.name}`, feature.checked ? "checked" : "");
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
        Jt.error($t("保存本地站点设置失败"));
      }
    };
    const handleCheckChange = (key, index) => {
      const siteInfo = siteList[index];
      siteInfo[key] = !siteInfo[key];
      siteList[index] = siteInfo;
    };
    const handleFeatureChange = (index) => {
      const featureInfo = featureList[index];
      featureInfo.checked = !featureInfo.checked;
      featureList[index] = featureInfo;
    };
    return /* @__PURE__ */ u$1("div", { className: "easy-seed-setting-panel", children: /* @__PURE__ */ u$1("div", { className: "panel-content-wrap", children: [
      /* @__PURE__ */ u$1("div", { className: "panel-content", children: [
        SiteListConfig.map((config) => {
          return /* @__PURE__ */ u$1("div", { children: [
            /* @__PURE__ */ u$1("h3", { children: $t(config.title) }),
            config.des && /* @__PURE__ */ u$1("p", { children: $t(config.des) }),
            /* @__PURE__ */ u$1("section", { className: "site-enable-setting", children: /* @__PURE__ */ u$1("ul", { className: config.class, children: siteList.map((siteInfo, index) => {
              const siteData = PT_SITE[siteInfo.site];
              if (siteData.asTarget && config.key !== "searchEnabled" || config.key === "searchEnabled" && siteData.search) {
                return /* @__PURE__ */ u$1("li", { children: /* @__PURE__ */ u$1("label", { children: [
                  /* @__PURE__ */ u$1(
                    "input",
                    {
                      onChange: () => handleCheckChange(config.key, index),
                      name: "target-site-enabled",
                      type: "checkbox",
                      checked: siteInfo[config.key]
                    }
                  ),
                  siteInfo.site
                ] }) }, siteInfo.site);
              }
              return "";
            }) }) })
          ] }, config.name);
        }),
        /* @__PURE__ */ u$1("h3", { children: $t("图床配置") }),
        /* @__PURE__ */ u$1("section", { className: "site-enable-setting img-upload-setting", children: /* @__PURE__ */ u$1("label", { children: [
          "ptpimg ApiKey:",
          /* @__PURE__ */ u$1(
            "input",
            {
              name: "ptp-img-api-key",
              type: "text",
              value: ptpImgApiKey,
              onChange: (e2) => setPtpImgApiKey(e2.target.value)
            }
          ),
          /* @__PURE__ */ u$1(
            "a",
            {
              target: "_blank",
              href: "https://github.com/techmovie/easy-seed/wiki/%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96ptpimg%E7%9A%84apiKey",
              rel: "noreferrer",
              children: $t("如何获取？")
            }
          )
        ] }) }),
        /* @__PURE__ */ u$1("h3", { children: $t("额外功能关闭") }),
        /* @__PURE__ */ u$1("div", { className: "feature-list", children: featureList.map((feature, index) => {
          return /* @__PURE__ */ u$1("section", { className: "site-enable-setting", children: /* @__PURE__ */ u$1("label", { children: [
            /* @__PURE__ */ u$1(
              "input",
              {
                onChange: () => handleFeatureChange(index),
                name: feature.name,
                type: feature.type,
                checked: feature.checked
              }
            ),
            $t(feature.des)
          ] }) }, feature.name);
        }) }),
        /* @__PURE__ */ u$1("h3", { children: $t("豆瓣配置") }),
        /* @__PURE__ */ u$1("div", { className: "douban-config", children: /* @__PURE__ */ u$1("label", { children: [
          $t("豆瓣Cookie"),
          /* @__PURE__ */ u$1(
            "textarea",
            {
              value: doubanCookie,
              onChange: (e2) => setDoubanCookie(e2.target.value)
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ u$1("div", { className: "confirm-btns", children: [
        /* @__PURE__ */ u$1("button", { onClick: closePanel, children: $t("取消") }),
        /* @__PURE__ */ u$1("button", { onClick: saveSetting, className: "save-setting-btn", children: $t("保存") })
      ] })
    ] }) });
  };
  const SvgSetting = (_b, ref) => {
    var _c = _b, {
      title,
      titleId
    } = _c, props = __objRest(_c, [
      "title",
      "titleId"
    ]);
    return /* @__PURE__ */ preact.createElement("svg", __spreadValues({ t: 1638356346192, className: "icon", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", "p-id": 26515, xmlnsXlink: "http://www.w3.org/1999/xlink", width: 200, height: 200, ref, "aria-labelledby": titleId }, props), title ? /* @__PURE__ */ preact.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ preact.createElement("defs", null, /* @__PURE__ */ preact.createElement("style", { type: "text/css" })), /* @__PURE__ */ preact.createElement("path", { d: "M636.2112 847.7696c5.7344-42.5472 39.8848-76.7488 82.432-82.3808 20.1216-2.6624 39.2192 0.8704 55.6544 9.0112 32.5632 16.0768 72.3456 4.864 92.3136-25.3952 8.1408-12.3392 15.5648-25.1392 22.2208-38.4 16.6912-33.1264 4.8128-72.8064-25.7536-93.8496-1.4336-0.9728-2.816-1.9968-4.1984-3.072-34.2016-26.2656-46.848-73.216-30.2592-113.0496 7.7312-18.6368 20.3264-33.28 35.4816-43.4176 30.3104-20.2752 40.704-60.4672 24.2176-92.9792a383.37536 383.37536 0 0 0-19.3024-33.7408c-20.224-31.5392-60.4672-42.1376-94.5152-26.4192-1.536 0.7168-3.1232 1.3824-4.7616 2.048-39.936 15.9744-86.6304 2.9696-112.4864-31.4368-12.0832-16.0768-18.3296-34.304-19.4048-52.4288-2.1504-36.5056-31.6928-65.6896-68.1472-67.9936a388.59776 388.59776 0 0 0-47.9744-0.0512c-36.9152 2.2528-65.1776 32.2048-68.2496 69.0688-0.1536 1.6896-0.3072 3.3792-0.5632 5.0688-5.7344 42.3936-39.7312 76.4416-82.0736 82.2272-20.0192 2.7136-39.0656-0.7168-55.4496-8.704-32.5632-15.8208-72.192-4.5056-92.0064 25.7536a386.85184 386.85184 0 0 0-22.1696 38.5024c-16.5376 32.9728-4.864 72.3968 25.3952 93.5424 1.3824 0.9728 2.7648 1.9968 4.096 3.0208 33.6896 26.112 46.1312 72.3968 30.1056 111.872-7.6288 18.7904-20.1728 33.6384-35.3792 43.9296-29.952 20.2752-39.8848 60.2112-23.6032 92.4672 5.9392 11.7248 12.3904 23.0912 19.456 34.0992 20.0704 31.3856 59.9552 42.0352 93.9008 26.624 1.536-0.7168 3.1232-1.3824 4.7104-1.9968 39.68-15.6672 85.8624-2.7648 111.6672 31.232 12.288 16.2304 18.6368 34.6112 19.712 52.9408 2.0992 36.352 31.744 65.2288 68.096 67.6864 8.6016 0.5632 17.2544 0.8704 25.9584 0.8704 7.4752 0 14.8992-0.2048 22.3232-0.6656 36.8128-2.1504 65.024-32.1024 68.096-68.864 0.0512-1.6896 0.256-3.4304 0.4608-5.12z", fill: "#FFF7E6", "p-id": 26516 }), /* @__PURE__ */ preact.createElement("path", { d: "M515.7888 514.816m-127.7952 0a127.7952 127.7952 0 1 0 255.5904 0 127.7952 127.7952 0 1 0-255.5904 0Z", fill: "#FD973F", "p-id": 26517 }), /* @__PURE__ */ preact.createElement("path", { d: "M515.7888 668.2112c-84.5824 0-153.3952-68.8128-153.3952-153.3952 0-84.5824 68.8128-153.3952 153.3952-153.3952s153.3952 68.8128 153.3952 153.3952c-0.0512 84.5824-68.8128 153.3952-153.3952 153.3952z m0-255.5392c-56.32 0-102.1952 45.824-102.1952 102.1952s45.824 102.1952 102.1952 102.1952 102.1952-45.824 102.1952-102.1952-45.8752-102.1952-102.1952-102.1952zM886.1696 437.1968c-6.0416 0-12.0832-2.0992-16.9472-6.4a25.6 25.6 0 0 1-2.2016-36.1472c14.8992-16.8448 18.0736-41.5744 7.936-61.5424a388.5568 388.5568 0 0 0-20.224-35.328c-12.4416-19.4048-35.5328-29.0304-58.7776-24.576a25.60512 25.60512 0 0 1-29.952-20.3264 25.60512 25.60512 0 0 1 20.3264-29.952c43.9808-8.3968 87.7056 10.0864 111.5136 47.2064 8.2432 12.8 15.9232 26.2144 22.784 39.8336 19.5584 38.5536 13.4144 86.2208-15.2576 118.6304-5.12 5.6832-12.1344 8.6016-19.2 8.6016z", fill: "#44454A", "p-id": 26518 }), /* @__PURE__ */ preact.createElement("path", { d: "M515.7888 968.448c-10.1888 0-20.48-0.3584-30.6176-1.024-53.7088-3.6352-96.5632-46.3872-99.6352-99.4304-0.9216-16.1792-6.7584-31.6928-16.7936-44.9536-21.9136-28.8768-60.7744-39.7312-94.5152-26.4192-1.3824 0.512-2.7136 1.0752-3.9936 1.6896-50.1248 22.784-107.6224 6.2976-136.704-39.1168a459.9552 459.9552 0 0 1-22.9376-40.2432c-24.064-47.6672-9.1136-105.984 34.816-135.68 13.3632-9.0624 23.7568-21.9648 30.0032-37.3248 13.6192-33.536 3.1744-72.448-25.4976-94.72-1.1776-0.9216-2.3552-1.792-3.5328-2.6112-45.0048-31.4368-60.3648-88.8832-36.5056-136.5504 7.7824-15.5648 16.5888-30.8736 26.1632-45.4656 29.2352-44.6464 87.296-60.8256 135.0144-37.6832 14.4384 7.0144 30.72 9.5232 47.104 7.3216 35.9936-4.9152 64.5632-33.536 69.4784-69.632 0.2048-1.4336 0.3584-2.8672 0.4608-4.3008 4.6592-54.8864 46.6432-97.0752 99.9424-100.352 18.688-1.1264 37.8368-1.1264 56.6272 0.1024 53.76 3.4304 96.6656 46.336 99.7888 99.7888 0.9216 15.9744 6.656 31.3856 16.4864 44.544 14.4384 19.2 37.632 31.232 62.1568 32.2048 14.1312 0.5632 25.1392 12.4928 24.576 26.5728-0.5632 14.1312-12.6976 25.088-26.5728 24.576-40.2944-1.5872-77.1584-20.7872-101.0688-52.6848-15.9232-21.1968-25.1392-46.1824-26.6752-72.2432-1.6384-27.648-23.9616-49.8688-51.9168-51.6608-16.64-1.0752-33.6896-1.0752-50.2272-0.0512-27.6992 1.6896-49.6128 24.1664-52.0704 53.4528-0.2048 2.2528-0.4608 4.608-0.768 6.912-7.9872 58.8288-54.5792 105.472-113.3056 113.5104-26.4192 3.584-52.7872-0.5632-76.3904-11.9808-24.6272-11.9296-54.6816-3.5328-69.8368 19.6608a404.15744 404.15744 0 0 0-23.1936 40.2944c-12.3904 24.7808-3.9936 54.9376 20.0192 71.68 1.8944 1.3312 3.7888 2.7136 5.632 4.1472 46.6432 36.1984 63.744 99.7376 41.472 154.4192-10.0864 24.7808-26.9312 45.6704-48.7424 60.416-22.6304 15.3088-30.2592 45.5168-17.8176 70.2464 6.144 12.1856 13.0048 24.1664 20.3776 35.6864 15.2576 23.808 45.6704 32.256 72.3968 20.1728 2.0992-0.9216 4.2496-1.8432 6.4-2.7136 55.04-21.7088 118.3744-3.9936 154.112 43.1104 16.2304 21.4016 25.6 46.592 27.0848 72.96 1.5872 27.3408 23.9104 49.408 51.968 51.3024 16.6912 1.1264 33.6384 1.2288 50.5344 0.256 27.5456-1.5872 49.3056-24.0128 51.7632-53.248 0.2048-2.3552 0.4608-4.6592 0.768-6.9632 7.9872-59.136 54.784-105.8304 113.8176-113.664 26.5216-3.5328 53.0432 0.768 76.6464 12.4416 24.6272 12.1856 54.784 3.84 70.0416-19.4048 8.4992-12.9024 16.3328-26.4192 23.2448-40.192 12.544-24.8832 3.9936-55.1424-20.3264-71.8848-1.9456-1.3312-3.84-2.7136-5.7344-4.1984-47.5648-36.5568-64.7168-100.7104-41.728-155.9552a25.55904 25.55904 0 0 1 33.4848-13.7728 25.55904 25.55904 0 0 1 13.7728 33.4848c-13.8752 33.3824-3.1232 73.6256 25.6512 95.6928 1.1776 0.9216 2.3552 1.792 3.584 2.6112 45.6192 31.4368 61.184 89.1392 37.0176 137.1136-7.8336 15.5136-16.64 30.72-26.2144 45.312-29.4912 44.7488-87.7056 60.7232-135.4752 37.1712-14.4896-7.168-30.8736-9.7792-47.2576-7.5776-35.6352 4.7104-64.9728 34.048-69.7856 69.7344-0.2048 1.4848-0.3584 2.9696-0.4608 4.4032-4.5568 54.8352-46.5408 96.9728-99.7888 100.0448-8.7552 0.4096-17.6128 0.6656-26.3168 0.6656z", fill: "#44454A", "p-id": 26519 }));
  };
  const ForwardRef = w(SvgSetting);
  const Container = () => {
    const [settingPanelOpen, setSettingPanelOpen] = h(false);
    const isNexusPHP = CURRENT_SITE_INFO.siteType.match(/NexusPHP|AvistaZ/) || (CURRENT_SITE_NAME == null ? void 0 : CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS|MDU|LST|fearnopeer/));
    const isHDB = CURRENT_SITE_NAME === "HDBits";
    const baseTitleClass = ["title-td"];
    const baseContentClass = ["easy-seed-td"];
    if (isNexusPHP) {
      baseTitleClass.push("rowhead", "nowrap");
      baseContentClass.push("rowfollow");
    } else if (CURRENT_SITE_NAME === "HDT") {
      baseTitleClass.push("detailsleft");
      baseContentClass.push("detailshash");
    } else if (CURRENT_SITE_NAME === "HDSpace") {
      baseTitleClass.push("header");
      baseContentClass.push("lista");
    } else if (isHDB) {
      baseTitleClass.push("rowfollow", "hdb-td");
      baseContentClass.push("rowfollow", "hdb-td");
    }
    const openSettingPanel = () => {
      setSettingPanelOpen(true);
    };
    const closePanel = () => {
      setSettingPanelOpen(false);
    };
    const checkQuickResult = () => {
      let searchListSetting = getValue("easy-seed.enabled-search-site-list");
      if (searchListSetting.length === 0) {
        searchListSetting = SORTED_SITE_KEYS;
      }
      searchListSetting.forEach(async (site) => {
        var _a2;
        const siteInfo = PT_SITE[site];
        const resultConfig = (_a2 = siteInfo.search) == null ? void 0 : _a2.result;
        const siteUrl = siteInfo.url;
        if (resultConfig) {
          const { list, name, size, url: urlDom } = resultConfig;
          const { title, size: searchSize } = TORRENT_INFO;
          const url = getQuickSearchUrl(site);
          const domString = await fetch(url, {
            responseType: void 0
          });
          const dom = new DOMParser().parseFromString(domString, "text/html");
          const torrentList = jQuery(list, dom);
          const sameTorrent = Array.prototype.find.call(torrentList, (item) => {
            var _a3, _b, _c, _d2, _e2;
            let torrentName;
            if (site === "TTG") {
              torrentName = (_c = (_b = (_a3 = jQuery(item).find(name).prop("firstChild")) == null ? void 0 : _a3.textContent) == null ? void 0 : _b.trim()) != null ? _c : "";
            } else {
              torrentName = jQuery(item).find(name).attr("title") || jQuery(item).find(name).text();
            }
            if (site === "TJUPT") {
              const matchArray = torrentName.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
              const realTitle = (_e2 = (_d2 = matchArray.filter((item2) => item2.match(/\.| /))) == null ? void 0 : _d2[0]) != null ? _e2 : "";
              torrentName = realTitle.replace(/\[|\]/g, "");
            }
            torrentName = torrentName == null ? void 0 : torrentName.replace(/\s|\./g, "");
            const sizeBytes = getSize(jQuery(item).find(size).text());
            return torrentName === (title == null ? void 0 : title.replace(/\s|\./g, "")) && Math.abs(sizeBytes - searchSize) < Math.pow(1024, 2) * 1e3;
          });
          if (sameTorrent) {
            const url2 = `${siteUrl}/${jQuery(sameTorrent).find(urlDom).attr("href")}`;
            jQuery(`.search-list li>a[data-site=${site}]`).attr("data-url", url2).css("color", "#218380");
          } else {
            jQuery(`.search-list li>a[data-site=${site}]`).css("color", "#D81159");
          }
        }
      });
    };
    const Title = () => {
      return /* @__PURE__ */ u$1("h4", { children: [
        $t("一键转种"),
        /* @__PURE__ */ u$1(Te, { position: "top-right", richColors: true }),
        /* @__PURE__ */ u$1("span", { id: "easy-seed-setting", className: "easy-seed-setting-btn" }),
        /* @__PURE__ */ u$1(ForwardRef, { onClick: openSettingPanel, className: "setting-svg" })
      ] });
    };
    const quickSearchClosed = getValue("easy-seed.quick-search-closed", false) || "";
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      CURRENT_SITE_NAME === "HH" && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: /* @__PURE__ */ u$1(Title, {}) }),
        /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: /* @__PURE__ */ u$1(UploadSiteList, {}) }),
        /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: $t("快捷操作") }),
        /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: /* @__PURE__ */ u$1(FunctionList, {}) }),
        /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: $t("快速检索") }),
        /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: /* @__PURE__ */ u$1(SearchList, {}) })
      ] }),
      CURRENT_SITE_NAME === "MTeam" && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("tr", { class: "ant-descriptions-row", children: [
          /* @__PURE__ */ u$1("th", { class: "ant-descriptions-item-label", colSpan: 1, style: "width: 135px; text-align: right;", children: /* @__PURE__ */ u$1("span", { children: /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: /* @__PURE__ */ u$1(Title, {}) }) }) }),
          /* @__PURE__ */ u$1("td", { class: "ant-descriptions-item-content", colSpan: 1, children: /* @__PURE__ */ u$1(UploadSiteList, {}) })
        ] }),
        /* @__PURE__ */ u$1("tr", { class: "ant-descriptions-row", children: [
          /* @__PURE__ */ u$1("th", { class: "ant-descriptions-item-label", colSpan: 1, style: "width: 135px; text-align: right;", children: /* @__PURE__ */ u$1("span", { children: /* @__PURE__ */ u$1("div", { class: "font-bold leading-6", children: $t("快速检索") }) }) }),
          /* @__PURE__ */ u$1("td", { class: "ant-descriptions-item-content", colSpan: 1, children: /* @__PURE__ */ u$1(SearchList, {}) })
        ] })
      ] }),
      (isNexusPHP || isHDB || (CURRENT_SITE_NAME == null ? void 0 : CURRENT_SITE_NAME.match(/(HDSpace|HDT)$/))) && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("tr", { className: isHDB ? "hdb-tr" : "", children: [
          /* @__PURE__ */ u$1("td", { className: baseTitleClass.join(" "), children: /* @__PURE__ */ u$1(Title, {}) }),
          /* @__PURE__ */ u$1("td", { className: baseContentClass.join(" "), children: /* @__PURE__ */ u$1("div", { id: "seed-dom", className: BROWSER_LANGUAGE === "en" ? "use-eng" : "", children: /* @__PURE__ */ u$1(UploadSiteList, {}) }) })
        ] }),
        /* @__PURE__ */ u$1("tr", { className: isHDB ? "hdb-tr" : "", children: [
          /* @__PURE__ */ u$1("td", { className: baseTitleClass.join(" "), children: /* @__PURE__ */ u$1("h4", { children: $t("快捷操作") }) }),
          /* @__PURE__ */ u$1("td", { className: baseContentClass.join(" "), children: /* @__PURE__ */ u$1(FunctionList, {}) })
        ] }),
        !quickSearchClosed && /* @__PURE__ */ u$1("tr", { className: isHDB ? "hdb-tr" : "", children: [
          /* @__PURE__ */ u$1("td", { className: baseTitleClass.join(" "), children: /* @__PURE__ */ u$1("h4", { className: "quick-search", onClick: checkQuickResult, children: $t("快速检索") }) }),
          /* @__PURE__ */ u$1("td", { className: baseContentClass.join(" "), children: /* @__PURE__ */ u$1(SearchList, {}) })
        ] })
      ] }),
      CURRENT_SITE_NAME === "Cinematik" && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("tr", { children: [
          /* @__PURE__ */ u$1("td", { className: "rowhead", children: /* @__PURE__ */ u$1(Title, {}) }),
          /* @__PURE__ */ u$1("td", { children: /* @__PURE__ */ u$1(UploadSiteList, {}) })
        ] }),
        /* @__PURE__ */ u$1("tr", { children: [
          /* @__PURE__ */ u$1("td", { className: "rowhead", children: $t("快捷操作") }),
          /* @__PURE__ */ u$1("td", { children: /* @__PURE__ */ u$1(FunctionList, {}) })
        ] }),
        !quickSearchClosed && /* @__PURE__ */ u$1("tr", { children: [
          /* @__PURE__ */ u$1("td", { className: "rowhead", children: /* @__PURE__ */ u$1("h4", { className: "quick-search", onClick: checkQuickResult, children: $t("快速检索") }) }),
          /* @__PURE__ */ u$1("td", { children: /* @__PURE__ */ u$1(SearchList, {}) })
        ] })
      ] }),
      CURRENT_SITE_NAME === "TeamHD" && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1(Title, {}),
          /* @__PURE__ */ u$1("div", { className: "easy-seed-td", style: { flexWrap: "wrap" }, children: /* @__PURE__ */ u$1("div", { id: "seed-dom", className: BROWSER_LANGUAGE === "en" ? "use-eng" : "", children: /* @__PURE__ */ u$1(UploadSiteList, {}) }) })
        ] }),
        /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1("h4", { children: $t("快捷操作") }),
          /* @__PURE__ */ u$1(FunctionList, {})
        ] }),
        !quickSearchClosed && /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1("h4", { onClick: checkQuickResult, children: $t("快速检索") }),
          /* @__PURE__ */ u$1("div", { children: /* @__PURE__ */ u$1(SearchList, {}) })
        ] })
      ] }),
      CURRENT_SITE_NAME === "SpeedApp" && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1(Title, {}),
          /* @__PURE__ */ u$1("div", { className: "easy-seed-td", style: { flexWrap: "wrap" }, children: /* @__PURE__ */ u$1("div", { id: "seed-dom", className: BROWSER_LANGUAGE === "en" ? "use-eng" : "", children: /* @__PURE__ */ u$1(UploadSiteList, {}) }) })
        ] }),
        /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1("h4", { children: $t("快捷操作") }),
          /* @__PURE__ */ u$1(FunctionList, {})
        ] }),
        !quickSearchClosed && /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1("h4", { onClick: checkQuickResult, children: $t("快速检索") }),
          /* @__PURE__ */ u$1("div", { children: /* @__PURE__ */ u$1(SearchList, {}) })
        ] })
      ] }),
      CURRENT_SITE_NAME === "Bdc" && /* @__PURE__ */ u$1(preact.Fragment, { children: /* @__PURE__ */ u$1("tr", { children: /* @__PURE__ */ u$1("td", { colSpan: 4, children: [
        /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1(Title, {}),
          /* @__PURE__ */ u$1("div", { className: "easy-seed-td", style: { flexWrap: "wrap" }, children: /* @__PURE__ */ u$1("div", { id: "seed-dom", className: BROWSER_LANGUAGE === "en" ? "use-eng" : "", children: /* @__PURE__ */ u$1(UploadSiteList, {}) }) })
        ] }),
        /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1("h4", { children: $t("快捷操作") }),
          /* @__PURE__ */ u$1(FunctionList, {})
        ] }),
        !quickSearchClosed && /* @__PURE__ */ u$1("div", { className: "custom-site", children: [
          /* @__PURE__ */ u$1("h4", { onClick: checkQuickResult, children: $t("快速检索") }),
          /* @__PURE__ */ u$1("div", { children: /* @__PURE__ */ u$1(SearchList, {}) })
        ] })
      ] }) }) }),
      CURRENT_SITE_INFO.siteType === "gazelle" && /* @__PURE__ */ u$1("div", { id: "seed-dom", className: ["movie-page__torrent__panel", BROWSER_LANGUAGE === "en" ? "use-eng" : ""].join(" "), children: [
        /* @__PURE__ */ u$1("div", { className: "ptp-title-wrapper", children: [
          /* @__PURE__ */ u$1(Title, {}),
          /* @__PURE__ */ u$1(UploadSiteList, {})
        ] }),
        CURRENT_SITE_NAME !== "EMP" && /* @__PURE__ */ u$1(FunctionList, {}),
        /* @__PURE__ */ u$1("div", { class: "ptp-search-list", children: !quickSearchClosed && /* @__PURE__ */ u$1("div", { class: "ptp-title-wrapper", children: [
          /* @__PURE__ */ u$1("h4", { className: "quick-search", onClick: checkQuickResult, children: $t("快速检索") }),
          /* @__PURE__ */ u$1(SearchList, {})
        ] }) })
      ] }),
      /* @__PURE__ */ u$1("div", { style: { display: settingPanelOpen ? "block" : "none" }, children: /* @__PURE__ */ u$1(SettingPanel, { closePanel }) })
    ] });
  };
  window.jQuery = $$1;
  const torrentInfoMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
  const timestampMatchArray = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
  const torrentTimestamp = timestampMatchArray && timestampMatchArray.length > 0 ? timestampMatchArray[2] : null;
  const torrentInfoRaw = torrentInfoMatchArray && torrentInfoMatchArray.length > 0 ? torrentInfoMatchArray[2] : null;
  let torrentInfo = null;
  if (CURRENT_SITE_NAME) {
    fillSearchImdb();
    if (CURRENT_SITE_INFO.asTarget) {
      if (torrentInfoRaw) {
        torrentInfo = JSON.parse(decodeURIComponent(torrentInfoRaw));
      } else if (torrentTimestamp) {
        torrentInfo = GM_getValue("uploadInfo");
      }
      fillTargetForm(torrentInfo);
    }
    if (CURRENT_SITE_INFO.asSource && !location.href.match(/upload|offer/ig) && !(CURRENT_SITE_INFO.search && location.pathname.match(CURRENT_SITE_INFO.search.path) && (getUrlParam("imdb") || getUrlParam("name")))) {
      getTorrentInfo$1().then(() => {
        console.log(TORRENT_INFO);
      });
      let refNode = $$1(CURRENT_SITE_INFO.seedDomSelector)[0];
      const app = document.createElement("div");
      preact.render(/* @__PURE__ */ u$1(Container, {}), app);
      if (["PTP", "BTN", "GPW", "EMP", "RED", "DicMusic", "MTV", "Orpheus"].includes(CURRENT_SITE_NAME)) {
        const torrentId = getUrlParam("torrentid");
        if (CURRENT_SITE_NAME === "GPW") {
          refNode = document.querySelector(`#torrent_detail_${torrentId} >td`);
        } else if (CURRENT_SITE_NAME === "EMP") {
          const groupId = getUrlParam("id");
          refNode = document.querySelector(`.groupid_${groupId}.torrentdetails>td`);
        } else if (CURRENT_SITE_NAME === "MTV") {
          refNode = document.querySelector(`#torrentinfo${torrentId}>td`);
        } else {
          refNode = document.querySelector(`#torrent_${torrentId} >td`);
        }
        refNode == null ? void 0 : refNode.prepend(app);
      } else if (CURRENT_SITE_NAME === "UHDBits") {
        const torrentId = getUrlParam("torrentid");
        $$1(`#torrent_${torrentId} >td`).prepend(document.createElement("blockquote"));
        (_d = $$1(`#torrent_${torrentId} >td blockquote:first`)) == null ? void 0 : _d.prepend(app);
      } else if (CURRENT_SITE_NAME === "SpeedApp") {
        const div = document.createElement("div");
        div.setAttribute("class", "row col-md-12 mt-5");
        app.setAttribute("class", "card-body card");
        div.appendChild(app);
        (_e = refNode == null ? void 0 : refNode.parentNode) == null ? void 0 : _e.insertBefore(div, refNode);
      } else if (CURRENT_SITE_NAME === "MTeam") {
        const targetNode = document.getElementById("root");
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList, observer2) => {
          for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
              const targetElement = $$1(CURRENT_SITE_INFO.seedDomSelector)[0];
              if (targetElement) {
                observer2.disconnect();
                refNode = $$1(CURRENT_SITE_INFO.seedDomSelector)[0];
                Array.from(app.childNodes).forEach((child) => {
                  var _a2;
                  (_a2 = refNode == null ? void 0 : refNode.parentNode) == null ? void 0 : _a2.insertBefore(child, refNode);
                });
                break;
              }
            }
          }
        });
        observer.observe(targetNode, config);
      } else {
        Array.from(app.childNodes).forEach((child) => {
          var _a2;
          (_a2 = refNode == null ? void 0 : refNode.parentNode) == null ? void 0 : _a2.insertBefore(child, refNode);
        });
      }
    }
  }

})(preact, jQuery);