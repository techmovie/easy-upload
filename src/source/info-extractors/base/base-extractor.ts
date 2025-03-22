import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import { getAreaCode } from '@/common';

export abstract class BaseExtractor {
  protected info: TorrentInfo.Info;

  constructor () {
    this.info = {
      title: '',
      year: '',
      description: '',
      screenshots: [],
      category: '',
      videoType: '',
      format: '',
      source: '',
      videoCodec: '',
      audioCodec: '',
      resolution: '',
      area: '',
      doubanInfo: '',
      doubanUrl: '',
      imdbUrl: '',
      movieAkaName: '',
      comparisons: [],
      movieName: '',
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      mediaInfos: [],
      tags: {},
      size: 0,
    };
  }

  protected extractYear () {
    const year = this.info.title.match(/(18|19|20)\d{2}/g) ?? [];
    this.info.year = year.length > 0 ? year.pop() as string : '';
  }

  protected extractArea () {
    const { area, description } = this.info;
    if (!area) {
      const areaMatch = description?.match(/(产\s*地|国\s*家|地\s*区)】?\s*(.+)/)?.[2] ?? '';
      this.info.area = getAreaCode(areaMatch);
    }
  }
}
