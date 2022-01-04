import { CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO } from '../const';
import {
  formatTorrentTitle, getInfoFromMediaInfo,
  getInfoFromBDInfo, getSize, getSourceFromTitle,
  getFilterBBCode, getBDInfoOrMediaInfo,
  getTagsFromSubtitle, getPreciseCategory, getScreenshotsFromBBCode,
} from '../common';
interface BasicInfo {
  Category: string
  Name:string
  Type: string
  Size: string
  Resolution: string
}
export default async () => {
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  const { Category, Name, Type, Size, Resolution } = getBasicInfo();
  TORRENT_INFO.size = getSize(Size);
  let title = formatTorrentTitle(Name);
  const tags = getTagsFromSubtitle(TORRENT_INFO.title);
  const category = getCategory(Category);
  const videoType = getVideoType(Type, Resolution);
  let IMDBYear = $('.movie-heading span:last').text();
  const movieName = $('.movie-heading span:first').text();

  if (CURRENT_SITE_NAME === 'HDPOST') {
    const englishTitle = title.match(/[\s\W\d]+(.+)/)?.[1] ?? '';
    TORRENT_INFO.subtitle = title.replace(englishTitle, '')?.trim();
    title = englishTitle;
  }
  if (CURRENT_SITE_NAME === 'ACM') {
    title = title.replace(/\/\s+\W+/, '');
  }
  if (!IMDBYear) {
    const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
    IMDBYear = matchYear?.pop() ?? '';
  } else {
    IMDBYear = IMDBYear.replace(/\(|\)|\s/g, '');
  }
  const imdbUrl = $('.movie-details a:contains(IMDB)').attr('href') as string;
  const resolution = Resolution.match(/\d+(i|p)/i)?.[0] ?? '';

  const descriptionDom = $('.fa-sticky-note').parents('.panel-heading')
    .siblings('.table-responsive').find('.panel-body').clone();
  descriptionDom.find('#collection_waypoint').remove();
  let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
  const mediaInfo = $('.decoda-code code').text();
  const { bdinfo } = getBDInfoOrMediaInfo(descriptionBBCode);
  if (mediaInfo) {
    descriptionBBCode = `\n[quote]${mediaInfo}[/quote]${descriptionBBCode}`;
  }
  const isBluray = videoType.match(/bluray/i);
  const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
  const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
  const { videoCodec, audioCodec, mediaTags } = getInfoFunc(mediaInfoOrBDInfo);
  TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
  TORRENT_INFO.videoCodec = videoCodec;
  TORRENT_INFO.audioCodec = audioCodec;
  TORRENT_INFO.tags = { ...tags, ...mediaTags };
  TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  TORRENT_INFO.title = title;
  TORRENT_INFO.year = IMDBYear;
  TORRENT_INFO.movieName = CURRENT_SITE_NAME === 'HDPOST' ? '' : movieName;
  TORRENT_INFO.resolution = resolution;
  TORRENT_INFO.imdbUrl = imdbUrl;
  TORRENT_INFO.poster = $('.movie-poster').attr('src');
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
  TORRENT_INFO.source = getSourceFromTitle(title);
  TORRENT_INFO.videoType = videoType.toLowerCase();
  TORRENT_INFO.description = descriptionBBCode;
};
const getBasicInfo = () => {
  const basicInfo:BasicInfo = {
    Category: '',
    Name: '',
    Type: '',
    Size: '',
    Resolution: '',
  };
  const keyMap = {
    Name: 'Name',
    名称: 'Name',
    名稱: 'Name',
    Size: 'Size',
    体积: 'Size',
    體積: 'Size',
    3: 'Size',
    Category: 'Category',
    类别: 'Category',
    類別: 'Category',
    0: 'Category',
    Type: 'Type',
    规格: 'Type',
    規格: 'Type',
    2: 'Type',
    Resolution: 'Resolution',
    1: 'Resolution',
  };
  if (CURRENT_SITE_NAME !== 'Blutopia') {
    const lineSelector = $('#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr');
    lineSelector.each((index, element) => {
      const key = $(element).find('td:first').text().replace(/\s|\n/g, '');
      const basicKey = keyMap[key as keyof typeof keyMap];
      if (basicKey) {
        let value = $(element).find('td:last').text();
        if (basicKey === 'Name') {
          value = $(element).find('td:last')[0]?.firstChild?.textContent ?? '';
        }
        basicInfo[basicKey as keyof BasicInfo] = value.replace(/\n/g, '').trim();
      }
    });
  } else {
    const formats = $('.torrent-format .text-info');
    formats.each((index, item) => {
      type keyIndex = Pick<typeof keyMap, 0|1|2|3>
      basicInfo[keyMap[index as keyof keyIndex] as keyof BasicInfo] = $(item).text().trim();
    });
    const title = $('h1.text-center').text();
    basicInfo.Name = title;
    console.log(basicInfo);
  }

  return basicInfo;
};
const getCategory = (key:string) => {
  if (!key) {
    return '';
  }
  if (key.match(/movie|电影/i)) {
    return 'movie';
  } else if (key.match(/tv|电视|剧集/i)) {
    return 'tv';
  }
  return '';
};
const getVideoType = (type:string, resolution:string) => {
  type = type.replace(/\s/g, '');
  if (type.match(/FullDisc/)) {
    if (resolution.match(/2160p/i)) {
      return 'uhdbluray';
    } else if (resolution.match(/1080/)) {
      return 'bluray';
    }
    return 'dvd';
  } else if (type.match(/Encode/i)) {
    return 'encode';
  } else if (type.match(/web/i)) {
    return 'web';
  } else if (type.match(/HDTV/i)) {
    return 'hdtv';
  } else if (type.match(/DVD/i)) {
    return 'dvd';
  }
  return type;
};
