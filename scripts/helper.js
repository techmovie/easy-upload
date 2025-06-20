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
  notifier.notify({
    title,
    message,
    sound: true,
    wait: false,
  });
};
const yamlToJSON = () => {
  const yamlFiles = fs.readdirSync(yamlDir);
  const i18nFiles = fs.readdirSync(i18nDir);
  const JSON_DATA = {
    PT_SITE: {},
  };
  const I18N_DATA = {};
  try {
    yamlFiles.forEach((file) => {
      const fileName = file.replace('.yaml', '');
      const source = fs.readFileSync(`${yamlDir}/${file}`, 'UTF-8');
      JSON_DATA.PT_SITE[fileName] = YAML.parse(source);
    });
    i18nFiles.forEach((file) => {
      const fileName = file.replace('.yaml', '');
      const i18nSource = fs.readFileSync(`${i18nDir}/${file}`, 'UTF-8');
      I18N_DATA[fileName] = YAML.parse(i18nSource);
    });
    fs.writeFileSync(
      `${srcFolder}/config.json`,
      JSON.stringify(JSON_DATA, null, 2),
    );
    fs.writeFileSync(
      `${srcFolder}/i18n.json`,
      JSON.stringify(I18N_DATA, null, 2),
    );
  } catch (error) {
    notify('yamlToJSON Error', `${error.name}:${error.message}`);
    console.log(error);
  }
};

export { yamlToJSON, notify };
