const fs = require('fs');
const YAML = require('yaml');

const { name, version, author, description = '' } = require('../package.json');

// 油猴前置注释
exports.userScriptComment = `// ==UserScript==
// @name         ${name}
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        https://hdbits.org/offer.php
// @match        https://*/details.php?id=*
// @match        https://totheglory.im/t/*
// @match        https://totheglory.im/details.php?id=*
// @match        https://ourbits.club/details.php?id=*
// @match        https://hdsky.me/details.php?id=*
// @match        https://hdchina.org/details.php?id=*
// @match        https://pt.keepfrds.com/details.php?id=*
// @match        https://ptsbao.club/details.php?id=*
// @match        https://www.beitai.pt/details.php?id=*
// @match        https://pthome.net/details.php?id=*
// @match        https://springsunday.net/details.php?id=*
// @match        https://lemonhd.org/details*
// @match        http*://*/upload*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==`;

// yaml 插件
exports.yamlPlugin = {
  name: 'yaml',
  setup (build) {
    build.onLoad({ filter: /\.yaml/ }, async (args) => {
      const source = await fs.promises.readFile(args.path, 'utf8');
      try {
        const contents = JSON.stringify(YAML.parse(source), null, 2);
        return { contents, loader: 'json' };
      } catch (e) {
        return {
          errors: [{
            text: (e && e.reason) || (e && e.message) || e,
            location: e.mark && {
              line: e.mark.line,
              column: e.mark.column,
              lineText: source.split(/\r\n|\r|\n/g)[e.mark.line],
            },
          }],
        };
      }
    });
  },
};
