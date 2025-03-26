import { TORRENT_INFO } from '../const';

// 获取副标题
export const getSubTitle = (data: Douban.DoubanData) => {
  const { chineseTitle, thisTitle: originalTitle, transTitle } = data;
  let title = '';
  if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
    title += chineseTitle;
  }
  const moreTitle = originalTitle
    .concat(transTitle)
    .filter((item) => title !== item);
  let seasonEpisode = TORRENT_INFO.title.match(/S\d+EP?(\d+)?/i)?.[1] ?? '';
  seasonEpisode = seasonEpisode.replace(/^0/i, '');
  const episode = seasonEpisode ? ` 第${seasonEpisode}集` : '';
  const hardcodedSub = TORRENT_INFO.hardcodedSub ? '| 硬字幕' : '';
  return `${title}${moreTitle.length > 0 ? '/' : ''}${moreTitle.join('/')}${episode} ${hardcodedSub}`;
};
