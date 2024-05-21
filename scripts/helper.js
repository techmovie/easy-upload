import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { fileURLToPath } from 'node:url';
import notifier from 'node-notifier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
const yamlToJSON = () => {
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
      const source = fs.readFileSync(`${yamlDir}/${file}`, 'UTF-8');
      JSON_DATA.PT_SITE[fileName] = YAML.parse(source);
    });
    i18nFiles.forEach(file => {
      const fileName = file.replace('.yaml', '');
      const i18nSource = fs.readFileSync(`${i18nDir}/${file}`, 'UTF-8');
      I18N_DATA[fileName] = YAML.parse(i18nSource);
    });
    fs.writeFileSync(`${srcFolder}/config.json`, JSON.stringify(JSON_DATA, null, 2));
    fs.writeFileSync(`${srcFolder}/i18n.json`, JSON.stringify(I18N_DATA, null, 2));
  } catch (error) {
    notify('yamlToJSON Error', `${error.name}:${error.message}`);
    console.log(error);
  }
};

const { version, author, description = '' } = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));

// 油猴前置注释
const userScriptComment = `// ==UserScript==
// @name         EasyUpload PT一键转种
// @name:en      EasyUpload - Trackers Transfer Tool 
// @namespace    https://github.com/techmovie/easy-upload
// @version      ${version}
// @description  ${description}
// @description:en ${description}
// @author       ${author}
// @require      https://cdn.staticfile.org/jquery/1.7.1/jquery.min.js
// @match        https://*/torrents.php?id=*
// @match        http://*/torrents.php?id=*
// @match        https://broadcasthe.net/torrents.php?torrentid=*
// @match        http://*/details.php?id=*
// @match        https://*/details.php?id=*
// @match        https://totheglory.im/t/*
// @match        https://beyond-hd.me/torrents/*
// @match        https://blutopia.cc/torrents/*
// @match        https://blutopia.cc/torrents?*
// @match        https://blutopia.cc/upload/*
// @match        https://pt.hdpost.top/torrents?*
// @match        https://pt.hdpost.top/torrents/*
// @match        https://asiancinema.me/torrents/*
// @match        https://asiancinema.me/torrents?*
// @match        https://aither.cc/torrents/*
// @match        https://aither.cc/torrents?*
// @match        https://ptpimg.me/*
// @match        https://*/upload*
// @match        http://*/upload*
// @match        https://broadcity.in/browse.php?imdb=*
// @match        https://privatehd.to/torrent/*
// @match        https://avistaz.to/torrent/*
// @exclude      https://privatehd.to/torrent/peers*
// @exclude      https://avistaz.to/torrent/peers*
// @exclude      https://privatehd.to/torrent/history*
// @exclude      https://avistaz.to/torrent/history*
// @match        https://cinemaz.to/torrent/*
// @exclude      https://cinemaz.to/torrent/peers*
// @exclude      https://cinemaz.to/torrent/history*
// @match        https://piratethenet.org/browse.php?*
// @match        https://teamhd.org/details/id*
// @match        https://hd-space.org/index.php?page=upload
// @match        https://hd-space.org/index.php?page=torrent-details&id=*
// @match        https://speedapp.io/browse/*
// @match        https://zhuque.in/torrent/upload
// @match        https://monikadesign.uk/torrents/*
// @match        https://monikadesign.uk/torrents?*
// @match        https://monikadesign.uk/upload/*
// @match        https://lst.gg/torrents/*
// @match        https://lst.gg/torrents?*
// @match        https://*.m-team.cc/detail/*

// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @downloadURL  https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js
// @updateURL    https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js
// @license      MIT
// ==/UserScript==`;

export {
  userScriptComment,
  yamlToJSON,
  notify,
};
