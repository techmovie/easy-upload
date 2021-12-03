import { useState } from 'preact/hooks';
import {
  TORRENT_INFO, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, fetch, getOriginalImgUrl, saveScreenshotsToPtpimg, transferImgs, showNotice,
} from '../common';
const UploadImg = () => {
  const [selectHost, setSelectHost] = useState('ptpimg');
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState('转存截图');
  const [canCopy, setCanCopy] = useState(false);
  const [screenBBCode, setScreenBBCode] = useState([]);
  const [copyText, setCopyText] = useState('复制');
  const uploadScreenshotsToAnother = async () => {
    const screenshots = getOriginalImgUrl(TORRENT_INFO.screenshots);
    setBtnText('上传中，请稍候...');
    setBtnDisable(true);
    try {
      setCanCopy(false);
      setCopyText('复制');
      const imgData = [];
      if (selectHost === 'ptpimg') {
        for (let index = 0; index < screenshots.length; index++) {
          const data = await saveScreenshotsToPtpimg([screenshots[index]]);
          if (data) {
            imgData.push(data);
          }
        }
      } else {
        const gifyuHtml = await fetch('https://gifyu.com', {
          responseType: undefined,
        });
        const authToken = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)?.[1];
        for (let index = 0; index < screenshots.length; index++) {
          const data = await transferImgs(screenshots[index], authToken, 'https://gifyu.com/json');
          if (data) {
            imgData.push(data.url);
          }
        }
      }
      showNotice({ text: $t('成功') });
      let { description, originalDescription } = TORRENT_INFO;
      TORRENT_INFO.screenshots = imgData;

      setScreenBBCode(imgData.map(img => {
        return `[img]${img}[/img]`;
      }));
      setCanCopy(true);
      const allImages = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig);
      if (allImages && allImages.length > 0) {
        allImages.forEach(img => {
          if (img.match(/\[url=.+?\]/)) {
            img += '[/url]';
          }
          originalDescription = originalDescription.replace(img, '');
          description = description.replace(img, '');
        });
      }
      TORRENT_INFO.originalDescription = `${originalDescription}\n${screenBBCode.join('')}`;
      TORRENT_INFO.description = `${description}\n${screenBBCode.join('')}`;
    } catch (error) {
      showNotice({ title: $t('错误'), text: error.message });
    } finally {
      setBtnText('转存截图');
      setBtnDisable(false);
    }
  };
  const uploadImgClosed = GM_getValue('easy-seed.upload-img-closed') || '';
  return !(uploadImgClosed || CURRENT_SITE_NAME === 'BTN') &&
    <div className="function-list-item">
      <div className="upload-section">
        <button
          id="upload-to-another"
          disabled={btnDisable}
          onClick={uploadScreenshotsToAnother}>{$t(btnText)}</button>
        <select value={selectHost} onChange={(e) => setSelectHost(e.target.value)}>
          <option value="ptpimg" selected>ptpimg</option>
          <option value="gifyu">gifyu</option>
        </select>
        <button id="copy-img" hidden={!canCopy} onClick={() => {
          GM_setClipboard(screenBBCode.join(''));
          setCopyText('已复制');
        }}>${$t(copyText)}</button>
      </div>
    </div>;
};
export default UploadImg;
