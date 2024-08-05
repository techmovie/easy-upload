import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { yamlToJSON } from './helper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcFolder = path.join(__dirname, '..', 'src');
yamlToJSON();
const source = fs.readFileSync(`${srcFolder}/config.json`, 'UTF-8');
const PT_SITE = JSON.parse(source).PT_SITE;
let result = `
| Site name  | Source(supports transfer) | Target(allows transfer) |
| :--------: | :-----------------------: | :---------------------: |
`;
Object.keys(PT_SITE).forEach(key => {
  const { asSource, asTarget } = PT_SITE[key];
  if (!asSource && !asTarget) return;
  result += `|  ${key}    |            ${asSource ? '✅' : '❌ '}             |            ${asTarget ? '✅' : '❌ '}           |\n`;
});

fs.writeFileSync(`${__dirname}/../SUPPORTED.md`, result);
