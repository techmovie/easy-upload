import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

export default (core) => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const changeLogPath = path.join(__dirname, '..', 'CHANGELOG.md');
    const changeLogData = fs.readFileSync(changeLogPath, 'UTF-8');
    const recentLog = changeLogData.match(/(#{1,}\s\[\d\.\d\.\d{1,}\](.|\n)+?)##\s\[\d\.\d\.\d{1,}\]/)[1];
    const newVersion = recentLog.match(/\[\d\.\d\.\d{1,}\]/)[0];
    core.exportVariable('body', recentLog);
    core.exportVariable('version', newVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
};
