import path from 'path';
import fs from 'fs';
import got from 'got';
import YAML from 'yaml';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcFolder = path.join(__dirname, '..', 'src');
const yamlDir = path.join(srcFolder, 'config');
const siteName = process.argv?.[2];
try {
  if (siteName) {
    const source = fs.readFileSync(`${yamlDir}/${siteName}.yaml`, 'UTF-8');
    const siteData = YAML.parse(source);
    const img = await got(`${siteData.url}/favicon.ico`, {
      encoding: 'base64',
    }).text();
    const ico = `data:image/png;base64,${img}`;
    siteData.icon = ico;
    const yamlStr = YAML.stringify(siteData);
    fs.writeFileSync(`${yamlDir}/${siteName}.yaml`, yamlStr, 'UTF-8');
    console.log('icon获取成功！');
  }
} catch (error) {
  console.log(error);
}
