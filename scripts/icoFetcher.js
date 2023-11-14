import path from 'path';
import fs from 'fs';
import got from 'got';
import YAML from 'yaml';
import { fileURLToPath } from 'node:url';
import decodeIco from 'decode-ico';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcFolder = path.join(__dirname, '..', 'src');
const yamlDir = path.join(srcFolder, 'config');
const siteName = process.argv?.[2];
try {
  if (siteName) {
    const source = fs.readFileSync(`${yamlDir}/${siteName}.yaml`, 'UTF-8');
    const siteData = YAML.parse(source);
    const img = await got(`${siteData.url}/favicon.ico`, {
      responseType: 'buffer',
    }).buffer();
    const imgList = decodeIco(img).map(icon => {
      const image = icon.type === 'png'
        ? sharp(icon.data)
        : sharp(icon.data, {
          raw: {
            width: icon.width,
            height: icon.height,
            channels: 4,
          },
        });
      return image;
    });
    const fileName = `${siteName}.png`;
    if (imgList.length > 0) {
      await imgList[0].resize({
        width: 20,
      }).toFile(fileName);
      const base64Content = fs.readFileSync(fileName, { encoding: 'base64' });
      siteData.icon = `data:image/png;base64,${base64Content}`;
      const yamlStr = YAML.stringify(siteData);
      fs.writeFileSync(`${yamlDir}/${siteName}.yaml`, yamlStr, 'UTF-8');
      fs.unlinkSync(fileName);
      console.log('icon获取成功！');
    } else {
      console.log('icon获取失败☹️');
    }
  }
} catch (error) {
  console.log(error);
}
