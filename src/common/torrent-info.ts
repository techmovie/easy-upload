import { FormattedMovieData } from '@/common/movie/movie.types';

// 获取副标题
export const getSubTitleFromDoubanInfo = (
  data: FormattedMovieData,
  torrentInfo: TorrentInfo.Info,
) => {
  const { originalTitle, translatedTitle, title: doubanDefaultTitle } = data;
  let title = '';
  if (doubanDefaultTitle.match(/[\u4e00-\u9fa5]+/)) {
    title += doubanDefaultTitle;
  }
  const moreTitle = [originalTitle, ...translatedTitle].filter(
    (item: string) => title !== item,
  );
  const { title: torrentTitle, hardcodedSub } = torrentInfo;
  let seasonEpisode = torrentTitle.match(/S\d+EP?(\d+)?/i)?.[1] ?? '';
  seasonEpisode = seasonEpisode.replace(/^0/i, '');
  const episode = seasonEpisode ? ` 第${seasonEpisode}集` : '';
  const hardcodedSubStr = hardcodedSub ? '| 硬字幕' : '';
  return `${title}${moreTitle.length > 0 ? '/' : ''}${moreTitle.join('/')}${episode} ${hardcodedSubStr}`;
};
