import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const changeLogPath = path.join(__dirname, '..', 'CHANGELOG.md');
const changeLogData = fs.readFileSync(changeLogPath, 'UTF-8');
const recentLog = changeLogData.match(/(#{1,}\s\[\d\.\d\.\d{1,}\](.|\n)+?)##\s\[\d\.\d\.\d{1,}\]/)[1];
const newVersion = recentLog.match(/\[\d\.\d\.\d{1,}\]/)[0];

let featureContent = recentLog.match(/#{3}\s+Features((.|\n)+?)\n{3}/) || '';
featureContent = featureContent && featureContent[1] ? featureContent[1] : '';
let bugContent = recentLog.match(/#{3}\s+Bug Fixes((.|\n)+?)\n{3}/) || '';
bugContent = bugContent && bugContent[1] ? bugContent[1] : '';
let perfContent = recentLog.match(/#{3}\s+Performance Improvements((.|\n)+?)\n{3}/) || '';
perfContent = perfContent && perfContent[1] ? perfContent[1] : '';
featureContent = featureContent.replace(/\n\*\s/g, '\n🔨 ').replace(/\*{2}/g, '*');
bugContent = bugContent.replace(/\n\*\s/g, '\n🐛 ').replace(/\*{2}/g, '*');
perfContent = perfContent.replace(/\n\*\s/g, '\n🎉 ').replace(/\*{2}/g, '*');

let tgMsg = `
📣 *更新至${newVersion}*

👉 [安装地址1](https://openuserjs.org/scripts/birdplane/EasyUpload_PT%E4%B8%80%E9%94%AE%E8%BD%AC%E7%A7%8D)
👉 [安装地址2](https://greasyfork.org/zh-CN/scripts/423199)
👉 [CHANGELOG](https://github.com/techmovie/easy-upload/blob/master/CHANGELOG.md)
👉 [使用教程](https://github.com/techmovie/easy-upload/wiki/%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B)
`;
tgMsg += bugContent
  ? `\n*修复*\n${bugContent}\n`
  : '';
tgMsg += featureContent
  ? `\n*功能*\n${featureContent}\n`
  : '';
tgMsg += perfContent
  ? `\n*优化*\n${perfContent}`
  : '';

fs.writeFileSync('tg-channel.txt', tgMsg);
