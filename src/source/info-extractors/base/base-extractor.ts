import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';

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
}
