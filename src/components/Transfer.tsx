import { useState } from 'preact/hooks';

import {
  TORRENT_INFO, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, showNotice, fetch, transferImgs, uploadToPixhost, getValue,
} from '../common';

const Transfer = () => {
  const [imgHost, setImgHost] = useState('imgbb');
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState('获取豆瓣简介');
  const [progress, setProgress] = useState(-1);
  const [imgList, setImgList] = useState([]);
  const getThumbnailImgs = async () => {
    try {
      const allImgs: string[] = TORRENT_INFO.screenshots.concat(...TORRENT_INFO.comparisons.map(v => v.imgs));
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
      };
      const selectHost = hostMap[imgHost];
      const uploadedImgs = [];
      let authToken;
      if (imgHost !== 'pixhost') {
        const rawHtml = await fetch(selectHost.replace('/json', ''), {
          responseType: undefined,
        });
        authToken = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)?.[1];
      }

      for (let index = 0; index < imgList.length; index++) {
        let data;
        if (imgHost !== 'pixhost') {
          data = await transferImgs(imgList[index], authToken, selectHost);
        } else {
          [data] = await uploadToPixhost([imgList[index]]);
        }
        if (data) {
          uploadedImgs.push(data);
          setProgress(uploadedImgs.length);
        }
      }
      if (uploadedImgs.length) {
        const thumbnailImgs = uploadedImgs.map(imgData => {
          if (imgHost !== 'pixhost') {
            return `[url=${imgData.url}][img]${imgData.thumb.url}[/img][/url]`;
          }
          return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
        });
        TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
        let { description } = TORRENT_INFO;
        imgList.forEach((img, index) => {
          if (description.includes(img)) {
            description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]\n*`, 'ig'), thumbnailImgs[index] || '');
          }
        });
        TORRENT_INFO.description = description;
        showNotice({
          title: $t('成功'),
          text: $t('转换成功！'),
        });
      }
    } catch (error) {
      showNotice({
        title: $t('错误'),
        text: error.message,
      });
    } finally {
      setBtnText('转缩略图');
      setBtnDisable(true);
    }
  };
  const transferImgClosed = getValue('easy-seed.transfer-img-closed', false) || '';
  return !(transferImgClosed || CURRENT_SITE_NAME === 'BTN') &&
    <div className="function-list-item">
      <div className="upload-section">
        <button id="img-transfer" onClick={getThumbnailImgs} disabled={btnDisable}>{$t(btnText)}</button>
        <select
          id="img-transfer-select" value={imgHost}
          onChange={(e) => setImgHost(e.target.value)}>
          <option value="imgbb" selected>imgbb</option>
          <option value="gifyu">gifyu</option>
          <option value="pixhost">pixhost</option>
        </select>
        <div
          id="transfer-progress"
          hidden={progress < 0}>{`${progress} / ${imgList.length}`}</div>
      </div>
    </div>;
};
export default Transfer;
