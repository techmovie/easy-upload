import { useState } from 'preact/hooks';

import {
  TORRENT_INFO, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, fetch, transferImgs, uploadToPixhost, getValue, uploadToImgbox, uploadToHDB,
} from '../common';
import { toast } from 'sonner';

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
      const hostMap = {
        imgbb: 'https://imgbb.com/json',
        gifyu: 'https://gifyu.com/json',
        pixhost: 'https://pixhost.to',
        imgbox: 'https://imgbox.com',
        HDB: 'https://img.hdbits.org',
      };
      const selectHost = hostMap[imgHost as keyof typeof hostMap];
      let uploadedImgs:string[] = [];
      let authToken = ''; let tokenSecret = { token_id: '', token_secret: '' };
      if (imgHost.match(/imgbb|gifyu/)) {
        const rawHtml = await fetch(selectHost.replace('/json', ''), {
          responseType: undefined,
        });
        authToken = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)?.[1];
      } else if (imgHost === 'imgbox') {
        const rawHtml = await fetch('https://imgbox.com', {
          responseType: undefined,
        });
        authToken = rawHtml.match(/content="(.+)" name="csrf-token"/)?.[1];
        tokenSecret = await fetch('https://imgbox.com/ajax/token/generate', {
          responseType: 'json',
          method: 'POST',
          headers: {
            'X-CSRF-Token': authToken,
          },
        });
      }
      if (imgHost === 'HDB') {
        const imgContent = await uploadToHDB(imgList, TORRENT_INFO.title);
        uploadedImgs = imgContent?.split('\n') ?? [];
      } else {
        for (let index = 0; index < imgList.length; index++) {
          let data;
          if (imgHost.match(/imgbb|gifyu/)) {
            const transferData = await transferImgs(imgList[index], authToken, selectHost);
            data = `[url=${transferData.url}][img]${transferData.thumb.url}[/img][/url]`;
          } else if (imgHost === 'pixhost') {
            const [transferData] = await uploadToPixhost([imgList[index]]);
            data = `[url=${transferData.show_url}][img]${transferData.th_url}[/img][/url]`;
          } else if (imgHost === 'imgbox') {
            const transferData = await uploadToImgbox(imgList[index], authToken, tokenSecret);
            data = `[url=${transferData.original_url}][img]${transferData.thumbnail_url}[/img][/url]`;
          }
          if (data) {
            uploadedImgs.push(data);
            setProgress(uploadedImgs.length);
          }
        }
      }

      if (uploadedImgs.length) {
        TORRENT_INFO.screenshots = uploadedImgs.slice(0, TORRENT_INFO.screenshots.length);
        let { description } = TORRENT_INFO;
        imgList.forEach((img, index) => {
          if (img.match(/i\.hdbits\.org/)) {
            const imgId = img.match(/i\.hdbits\.org\/(.+)\./)?.[1] ?? '';
            const urlReg = new RegExp(`\\[url=https://img.hdbits.org/${imgId}\\].+?\\[\\/url\\]\n*`, 'ig');
            if (description.match(urlReg)) {
              description = description.replace(urlReg, uploadedImgs[index] || '');
            }
          } else if (description.includes(img)) {
            const urlReg = new RegExp(`\\[url=${img}\\].+?\\[\\/url\\]\n*`, 'ig');
            if (description.match(urlReg)) {
              description = description.replace(urlReg, uploadedImgs[index] || '');
            } else {
              description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]\n*`, 'ig'), uploadedImgs[index] || '');
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
  const transferImgClosed = getValue('easy-seed.transfer-img-closed', false) || '';
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
