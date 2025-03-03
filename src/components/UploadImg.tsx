import { useState } from 'preact/hooks';
import {
  TORRENT_INFO, CURRENT_SITE_NAME,
} from '../const';
import {
  $t, fetch, getOriginalImgUrl, transferImgs, saveScreenshotsToPtpimg,
} from '../common';
import { toast } from 'sonner';

const UploadImg = () => {
  const [selectHost, setSelectHost] = useState('ptpimg');
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnText, setBtnText] = useState('转存截图');
  const [canCopy, setCanCopy] = useState(false);
  const [screenBBCode, setScreenBBCode] = useState([] as string[]);
  const [copyText, setCopyText] = useState('拷贝');
  const uploadScreenshotsToAnother = async () => {
    const screenshots = TORRENT_INFO.screenshots;
    setBtnText('上传中，请稍候...');
    setBtnDisable(true);
    try {
      setCanCopy(false);
      setCopyText('拷贝');
      const imgData:string[] = [];
      if (selectHost === 'ptpimg') {
        for (let index = 0; index < screenshots.length; index++) {
          const originalImg = await getOriginalImgUrl(screenshots[index]);
          const data = await saveScreenshotsToPtpimg([originalImg]);
          if (data) {
            imgData.push(data[0]);
          } else {
            return;
          }
        }
      } else {
        const gifyuHtml = await fetch('https://gifyu.com', {
          responseType: undefined,
        });
        const authToken = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)?.[1];
        for (let index = 0; index < screenshots.length; index++) {
          const originalImg = await getOriginalImgUrl(screenshots[index]);
          const data = await transferImgs(originalImg, authToken, 'https://gifyu.com/json');
          if (data) {
            imgData.push(data.url);
          }
        }
      }
      if (imgData.length > 0) {
        toast.success($t('成功'));
      }
      let { description, originalDescription } = TORRENT_INFO;
      TORRENT_INFO.screenshots = imgData;

      const screenBBcodeArray = imgData.map(img => {
        return `[img]${img}[/img]`;
      });
      setScreenBBCode(screenBBcodeArray);
      setCanCopy(true);
      const allImages:string[] = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig) ?? [];
      if (allImages && allImages.length > 0) {
        allImages.forEach(img => {
          if (img.match(/\[url=.+?\]/)) {
            img += '[/url]';
          }
          originalDescription = originalDescription?.replace(img, '');
          description = description.replace(img, '');
        });
      }
      TORRENT_INFO.originalDescription = `${originalDescription}\n${screenBBcodeArray.join('')}`;
      TORRENT_INFO.description = `${description}\n${screenBBcodeArray.join('')}`;
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBtnText('转存截图');
      setBtnDisable(false);
    }
  };
  const uploadImgClosed = GM_getValue('easy-seed.upload-img-closed') || '';
  return !(uploadImgClosed || CURRENT_SITE_NAME === 'BTN')
    ? <div className="function-list-item">
      <div className="upload-section">
        <button
          disabled={btnDisable}
          className={btnDisable ? 'is-disabled' : ''}
          onClick={uploadScreenshotsToAnother}>{$t(btnText)}</button>
        <select value={selectHost} onChange={(e) => setSelectHost((e.target as HTMLSelectElement).value)}>
          <option value="ptpimg">ptpimg</option>
          <option value="gifyu">gifyu</option>
        </select>
        <button
          className="copy-img"
          hidden={!canCopy}
          onClick={() => {
            GM_setClipboard(screenBBCode.join(''));
            setCopyText('已拷贝');
          }}>{$t(copyText)}</button>
      </div>
    </div >
    : null;
};
export default UploadImg;
