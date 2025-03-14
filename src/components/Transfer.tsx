import { useState } from 'preact/hooks';

import {
  TORRENT_INFO, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, transferImgToCheveretoSite, uploadToPixhost, uploadToImgbox, uploadToHDB,
} from '../common';
import { toast } from 'sonner';
import { ImgInfo } from '@/common/image/image.types';

const Transfer = () => {
  const [imgHost, setImgHost] = useState('imgbox');
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState('转缩略图');
  const [progress, setProgress] = useState(-1);
  const [imgList, setImgList] = useState([] as string[]);
  const getThumbnailImgs = async () => {
    try {
      const comparisons = TORRENT_INFO.comparisons || [];
      const allImgs: string[] = TORRENT_INFO.screenshots.concat(...comparisons.map(v => v.imgs));
      const imgList: string[] = [...new Set(allImgs)];
      setImgList(imgList);
      if (imgList.length < 1) {
        throw new Error($t('获取图片列表失败'));
      }
      setBtnText('转换中...');
      setBtnDisable(true);
      setProgress(0);
      let uploadedImgs:ImgInfo[] = [];
      const hostMap = {
        imgbb: 'https://imgbb.com/json',
        gifyu: 'https://gifyu.com/json',
        pixhost: 'https://pixhost.to',
        imgbox: 'https://imgbox.com',
        HDB: 'https://img.hdbits.org',
      };
      const selectHost = hostMap[imgHost as keyof typeof hostMap];
      if (imgHost === 'HDB') {
        uploadedImgs = await (await uploadToHDB)(imgList, TORRENT_INFO.title);
      } else if (imgHost.match(/imgbb|gifyu/)) {
        uploadedImgs = await (await transferImgToCheveretoSite)(imgList, selectHost);
      } else if (imgHost === 'pixhost') {
        uploadedImgs = await (await uploadToPixhost)(imgList);
      } else if (imgHost === 'imgbox') {
        uploadedImgs = await (await uploadToImgbox)(imgList);
      }

      const imgsBBCodeArray = uploadedImgs.map(img => {
        return `[url=${img.original}][img]${img.thumbnail}[/img][/url]`;
      });

      if (uploadedImgs.length) {
        TORRENT_INFO.screenshots = imgsBBCodeArray.slice(0, TORRENT_INFO.screenshots.length);
        let { description } = TORRENT_INFO;
        imgList.forEach((img, index) => {
          if (img.match(/i\.hdbits\.org/)) {
            const imgId = img.match(/i\.hdbits\.org\/(.+)\./)?.[1] ?? '';
            const urlReg = new RegExp(`\\[url=https://img.hdbits.org/${imgId}\\].+?\\[\\/url\\]\n*`, 'ig');
            if (description.match(urlReg)) {
              description = description.replace(urlReg, imgsBBCodeArray[index] || '');
            }
          } else if (description.includes(img)) {
            const urlReg = new RegExp(`\\[url=${img}\\].+?\\[\\/url\\]\n*`, 'ig');
            if (description.match(urlReg)) {
              description = description.replace(urlReg, imgsBBCodeArray[index] || '');
            } else {
              description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]\n*`, 'ig'), imgsBBCodeArray[index] || '');
            }
          }
        });
        TORRENT_INFO.description = description;
        toast.success($t('转换成功！'));
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBtnText('转缩略图');
      setBtnDisable(false);
    }
  };
  const transferImgClosed = GM_getValue<string>('easy-seed.transfer-img-closed');
  return !(transferImgClosed || CURRENT_SITE_NAME === 'BTN')
    ? <div className="function-list-item">
      <div className="upload-section">
        <button
          className={btnDisable ? 'is-disabled' : ''}
          onClick={getThumbnailImgs}
          disabled={btnDisable}>{$t(btnText)}</button>
        <select
          value={imgHost}
          onChange={(e) => setImgHost((e.target as HTMLSelectElement).value)}>
          <option value="imgbox">imgbox</option>
          <option value="imgbb">imgbb</option>
          <option value="gifyu">gifyu</option>
          <option value="pixhost">pixhost</option>
          <option value="HDB">HDB</option>
        </select>
        <div
          id="transfer-progress"
          hidden={progress < 0}>{`${progress} / ${imgList.length}`}</div>
      </div>
    </div>
    : null;
};
export default Transfer;
