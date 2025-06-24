import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

function formatChangelog(content) {
  if (!content) return '';
  return content
    .replace(/\*{2}(.+)?\*{2}/g, '<b>$1</b>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

export default function createTgChannelMsg(core) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const changeLogPath = path.join(__dirname, '..', 'CHANGELOG.md');
  const changeLogData = fs.readFileSync(changeLogPath, 'UTF-8');
  const recentLog = changeLogData.match(
    /(#{1,}\s\[\d\.\d\.\d{1,}(.+)?\](.|\n)+?)#{1,}\s\[\d\.\d\.\d{1,}(.+)?\]/,
  )[1];
  const newVersion = recentLog.match(/\[\d\.\d\.\d{1,}(.+)?\]/)[0];

  let featureContent = recentLog.match(/#{3}\s+Features((.|\n)+?)\n{3}/) || '';
  featureContent = featureContent && featureContent[1] ? featureContent[1] : '';
  let bugContent = recentLog.match(/#{3}\s+Bug Fixes((.|\n)+?)\n{3}/) || '';
  bugContent = bugContent && bugContent[1] ? bugContent[1] : '';
  let perfContent =
    recentLog.match(/#{3}\s+Performance Improvements((.|\n)+?)\n{3}/) || '';
  perfContent = perfContent && perfContent[1] ? perfContent[1] : '';
  featureContent = formatChangelog(featureContent.replace(/\n\*\s/g, '\n🔨 '));
  bugContent = formatChangelog(bugContent.replace(/\n\*\s/g, '\n🐛 '));
  perfContent = formatChangelog(perfContent.replace(/\n\*\s/g, '\n🎉 '));
  let tgMsg = `
📣 <b>更新至${newVersion}</b>

👉 <a href="https://greasyfork.org/zh-CN/scripts/423199">安装地址1</a>
👉 <a href="https://github.com/techmovie/easy-upload/raw/master/dist/easy-upload.user.js">安装地址2</a>
👉 <a href="https://github.com/techmovie/easy-upload/blob/master/CHANGELOG.md">CHANGELOG</a>
👉 <a href="https://github.com/techmovie/easy-upload/wiki/%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B">使用教程</a>
`;
  tgMsg += bugContent ? `\n<b>修复</b>\n${bugContent}\n` : '';
  tgMsg += featureContent ? `\n<b>功能</b>\n${featureContent}\n` : '';
  tgMsg += perfContent ? `\n<b>优化</b>\n${perfContent}` : '';
  core.exportVariable('tgMsg', tgMsg);
  return tgMsg;
}

// const mockCore = {
//   exportVariable: (name, value) => {
//     console.log(`${name}:\n${value}`);
//   },
//   setFailed: (message) => {
//     console.error(`错误: ${message}`);
//   },
// };

// createTgChannelMsg(mockCore);
