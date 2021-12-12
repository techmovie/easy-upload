
declare namespace TorrentInfo {
  interface MediaTags {
    diy?: boolean,
    chinese_audio?: boolean,
    cantonese_audio?: boolean,
    chinese_subtitle?: boolean,
    dolby_atoms?: boolean,
    dts_x?: boolean,
    hdr?: boolean,
    dolby_vision?: boolean,
    hdr10_plus?: boolean,
    dolby_atmos?: boolean,
    the_criterion_collection?: boolean
  }
  interface comparison {
    title?: string
    imgs: string[],
    reason?: string
  }
  interface Info {
    title: string, // 标题
    subtitle: string, // 副标题
    description: string, // 描述
    originalDescription: string, // 原始描述
    year: string, // 电影年份
    category: string, // 电影、电视、音乐等
    videoType: string, // bluray remux encodes web-dl
    format: string, // 文件格式
    source: string, // 视频来源
    videoCodec: string, // 视频编码
    audioCodec: string, // 音频编码
    resolution: string, // 分辨率
    area: string, // 地区
    doubanUrl: string, // 豆瓣地址
    doubanInfo: string, // 豆瓣简介
    imdbUrl: string, // imdb地址
    mediaInfo: string // mediainfo或者bdInfo
    mediaInfos: Array<string>, // 多个mediainfo
    screenshots: Array<string>,
    comparisons: Array<comparison>, // 对比图
    movieAkaName: string, // 别名一般为电影英文名称
    movieName: string, // imdb电影原始名称 一般为拼音
    sourceSite: string, // 种子来源站点简称
    sourceSiteType: string, // 种子来源站点类型
    size: number, // 种子大小 转换成 Bytes
    isForbidden: boolean, // 是否禁转
    poster: string, // 海报
    tags: MediaTags,
    otherTags: any,
    hardcodedSub?: boolean, // 是否包含硬字幕
    doubanBookInfo?: object,
    formDom?: string // bB专用
  }
}
declare namespace Site {
  interface Selector {
    selector: string
  }
  interface SelectorMap {
    selector: string,
    map: object
  }
  interface SiteInfo {
    url: string,
    host: string,
    siteType: string,
    icon: string,
    asSource: boolean,
    asTarget: boolean,
    uploadPath: string,
    seedDomSelector: string,
    needDoubanInfo?: false,
    needDoubanBookInfo?: false,
    search?: {
      path: string,
      replaceKey?: string,
      imdbOptionKey?: string,
      nameOptionKey?: string,
      params?: object,
      result?: object
    },
    name?: Selector,
    subtitle?: Selector,
    description: Selector,
    imdb?: Selector,
    anonymous?: Selector,
    category: SelectorMap,
    videoCodec?: SelectorMap,
    audioCodec?: SelectorMap,
    videoType?: SelectorMap,
    resolution?: SelectorMap,
    team?: SelectorMap,
  }
}
declare namespace Douban {
  interface Person {
    name: string
  }
  interface DoubanData {
    imdbLink: string,
    imdbId: string,
    imdbAverageRating: string,
    imdbVotes: string,
    imdbRating: string,
    chineseTitle: string,
    foreignTitle: string,
    aka: string[],
    transTitle: string[],
    thisTitle: string[],
    year: string,
    playDate: string[],
    region: string,
    genre: string[],
    language: string[],
    episodes: string,
    duration: string,
    introduction: string,
    doubanLink: string,
    doubanRatingAverage: string | number,
    doubanVotes: string,
    doubanRating: string
    poster: string,
    director: Person[],
    cast: Person[],
    writer: Person[],
    awards?: string
    tags?: string[],
    format?: string,
    bookIntro?: string
  }
}

declare module '*.svg';