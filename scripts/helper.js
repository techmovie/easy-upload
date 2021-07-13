const notifier = require('node-notifier');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const srcFolder = path.join(__dirname, '..', 'src');
const yamlDir = path.join(srcFolder, 'config');
const i18nDir = path.join(srcFolder, 'i18n');
const notify = (title, message) => {
  notifier.notify(
    {
      title,
      message,
      sound: true,
      wait: false,
    },
  );
};
exports.yamlToJSON = () => {
  const yamlFiles = fs.readdirSync(yamlDir);
  const i18nFiles = fs.readdirSync(i18nDir);
  const JSON_DATA = {
    PT_SITE: {
    },
  };
  const I18N_DATA = {};
  try {
    yamlFiles.forEach(file => {
      const fileName = file.replace('.yaml', '');
      const source = fs.readFileSync(yamlDir + '/' + file, 'UTF-8');
      JSON_DATA.PT_SITE[fileName] = YAML.parse(source);
    });
    i18nFiles.forEach(file => {
      const fileName = file.replace('.yaml', '');
      const i18nSource = fs.readFileSync(i18nDir + '/' + file, 'UTF-8');
      I18N_DATA[fileName] = YAML.parse(i18nSource);
    });
    fs.writeFileSync(`${srcFolder}/config.json`, JSON.stringify(JSON_DATA, null, 2));
    fs.writeFileSync(`${srcFolder}/i18n.json`, JSON.stringify(I18N_DATA, null, 2));
  } catch (error) {
    notify('yamlToJSON Error', `${error.name}:${error.message}`);
    console.log(error);
  }
};

const { version, author, description = '' } = require('../package.json');

// 油猴前置注释
exports.userScriptComment = `// ==UserScript==
// @name         EasyUpload PT一键转种
// @namespace    https://github.com/techmovie/easy-upload
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @require      https://cdn.staticfile.org/jquery/1.7.1/jquery.min.js
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        https://broadcasthe.net/torrents.php?id=*
// @match        https://broadcasthe.net/torrents.php?torrentid=*
// @match        https://uhdbits.org/torrents.php?id=*
// @match        http://*/details.php?id=*
// @match        https://*/details.php?id=*
// @match        https://totheglory.im/t/*
// @match        https://beyond-hd.me/torrents/*
// @match        https://lemonhd.org/upload_*
// @match        https://lemonhd.org/details*
// @match        https://blutopia.xyz/torrents/*
// @match        https://blutopia.xyz/torrents?*
// @match        https://blutopia.xyz/upload/*
// @match        https://pt.hdpost.top/torrents?*
// @match        https://pt.hdpost.top/torrents/*
// @match        https://asiancinema.me/torrents/*
// @match        https://asiancinema.me/torrents?*
// @match        https://aither.cc/torrents/*
// @match        https://aither.cc/torrents?*
// @match        https://ptpimg.me/*
// @match        https://*/upload*
// @match        http://*/upload*
// @match        http://www.hd.ai/Torrents.upload
// @match        http://www.hd.ai/Torrents.index?*
// @match        https://broadcity.in/browse.php?imdb=*
// @match        https://privatehd.to/torrent/*
// @match        https://avistaz.to/torrent/*
// @match        https://piratethenet.org/browse.php?*
// @match        https://teamhd.org/details/id*
// @match        https://hd-space.org/index.php?page=upload
// @match        https://hd-space.org/index.php?page=torrent-details&id=*
// @match        https://greatposterwall.com/torrents.php?id=*
// @match        https://www.empornium.is/torrents.php?id=*
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @license      MIT
// ==/UserScript==`;

exports.notify = notify;
