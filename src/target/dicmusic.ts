
import { base64ToBlob } from './common';
import { Buffer } from 'buffer/index';
import { CURRENT_SITE_INFO } from '../const';
import { getUrlParam, fetch } from '../common';

export default async (info:TorrentInfo.Info) => {
  const { musicJson } = info;
  if (!musicJson) {
    return;
  }
  const { name, year } = musicJson.group;
  const groupId = getUrlParam('groupid');
  if (!groupId) {
    const searchResult = await fetch(`/ajax.php?action=browse&searchstr=${name} ${year}`);
    if (searchResult.status === 'success' && searchResult.response.results.length > 0) {
      const groupId = searchResult.response.results[0].groupId;
      const timestampMatchArray = location.hash && location.hash.match(/(^|#)timestamp=([^#]*)(#|$)/);
      const timestamp = timestampMatchArray?.[2] ?? '';
      location.href = `${CURRENT_SITE_INFO.url}${CURRENT_SITE_INFO.uploadPath}?groupid=${groupId}#timestamp=${timestamp}`;
      return;
    }
  }
  fillJsonToUploadTable(musicJson, name);
};
function fillJsonToUploadTable (musicJson:MusicJson.Info, name:string) {
  const buf = Buffer.from(JSON.stringify({
    status: 'success',
    response: musicJson,
  }));
  const jsonData = buf.toString('base64');
  const fileInput = $('#torrent-json-file');
  if (jsonData && fileInput.length > 0) {
    const blob = base64ToBlob(jsonData, 'application/json');
    const torrentFileName = name?.replace(/\s/g, '.');
    const file = new File([blob], `${torrentFileName}.json`, { type: 'application/json' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const uploadInput = fileInput[0] as HTMLInputElement;
    uploadInput.files = dataTransfer.files;
    uploadInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
