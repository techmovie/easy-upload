export const CONFIG = {
  NEXUS_FILTER_KEYWORDS: [
    '温馨提示',
    '郑重',
    'PT站',
    '网上搜集',
    '本种子',
    '商业盈利',
    '商业用途',
    '带宽',
    '寬帶',
    '法律责任',
    'Quote:',
    '正版',
    '商用',
    '注明',
    '后果',
    '负责',
  ],
  FORBIDDEN_KEYWORDS: [
    '禁转', '禁轉', '严禁转载', '嚴禁轉載', '谢绝转载', '謝絕轉載', 'exclusive',
  ],
  META_INFO_MATCH_RULES: {
    resolution: /(分辨率|解析度|格式):\s?([^\u4e00-\u9fa5]+)?/i,
    videoType: /(媒介|来源|质量):\s?([^\u4e00-\u9fa5]+)?/i,
    category: /(类型|分类|類別):\s?([^\u4e00-\u9fa5]+)?/i,
    audioCodec: /(音频|音频编码):\s?([^\u4e00-\u9fa5]+)?/i,
    videoCodec: /(编码|編碼):\s?([^\u4e00-\u9fa5]+)?/i,
    area: /(处理|處理|地区|地區):\s?([^\u4e00-\u9fa5]+)?/i,
    size: /(大小|容量):\s?([^\u4e00-\u9fa5]+)?/i,
  },
  VIDEO_TYPE_MATCH_MAP: (resolution?: string) => [
    {
      type: 'encode',
      regex: /压制|encode|x264|x265|bdrip|hdrip/i,
    },
    {
      type: 'remux',
      regex: /remux/i,
    },
    {
      type: 'uhdbluray',
      regex: /uhd|ultra|UHD原盘|FullDisc/i,
      condition: () => !resolution || /2160|4k/i.test(resolution),
    },
    {
      type: 'bluray',
      regex: /blu|discs|bluray原盘|FullDisc/i,
      condition: () => !resolution || /1080/i.test(resolution),
    },
    {
      type: 'web',
      regex: /webdl/i,
    },
    {
      type: 'hdtv',
      regex: /hdtv/i,
    },
    {
      type: 'dvdrip',
      regex: /dvdr/i,
    },
    {
      type: 'dvd',
      regex: /dvd/i,
    },
  ],
  VIDEO_SOURCE_MATCH_MAP: {
    uhdbluray: /(uhd|2160|4k).*(blu(-)?ray|remux)/i,
    bluray: /(blu(-)?ray|remux)/i,
    hdtv: /hdtv/i,
    web: /web(-?(rip|dl))+/i,
    hddvd: /hddvd/i,
    dvd: /dvd/i,
    vhs: /vhs/i,
  },
  VIDEO_CATEGORY_MAP: {
    movie: /movie|电影/gi,
    variety: /综艺|variety/gi,
    tv: /tv|drama|剧集|电视|剧/,
    tvPack: /TVSeries|剧包/gi,
    cartoon: /anim|动(画|漫)/gi,
    sport: /sport|体育/gi,
    concert: /mv|演唱|concert/gi,
    app: /App|软件|Software|軟體/gi,
    ebook: /电子书|小说|Ebook/gi,
    audiobook: /有声书|AudioBook/gi,
    magazine: /杂志|magazine/gi,
    comics: /漫画|comics/gi,
    onlineCourse: /公开课/gi,
    documentary: /纪录片|documentary|记录/gi,
  },
  RESOLUTION_MAP: {
    '4320p': /4320p|8k/i,
    '2160p': /2160p|UHD|4k/i,
    '1080p': /1080(p)?/i,
    '1080i': /1080i/i,
    '720p': /720(p)?/i,
    '576p': /576p|576i/i,
    '480p': /480(p|i)|sd/i,
  },
  VIDEO_CODEC_RULES: (source: string, videoType: string) => [
    {
      codec: 'x264',
      regex: /x264/i,
      condition: () => /h264|avc/i.test(source) && videoType === 'encode',
    },
    {
      codec: 'h264',
      regex: /h264|AVC/i,
    },
    {
      codec: 'x265',
      regex: /x265/i,
      condition: () => /h265|hevc/i.test(source) && videoType === 'encode',
    },
    { codec: 'hevc', regex: /hevc|h265/i },
    { codec: 'vc1', regex: /vc-?1/i },
    { codec: 'mpeg2', regex: /mpeg-?2/i },
    { codec: 'mpeg4', regex: /mpeg-?4/i },
    { codec: 'vvc', regex: /vvc/i },
  ],
  MEDIA_TAG_RULES: (source:string) => [
    { regex: /diy/i, tag: 'diy' },
    {
      regex: /国配|国语|普通话|国粤/i,
      tag: 'chinese_audio',
      condition: () => !/多国语(言|字幕)/.test(source),
    },
    { regex: /Atmos|杜比全景声/i, tag: 'dolby_atmos' },
    { regex: /HDR10\+/i, tag: 'hdr10_plus' },
    { regex: /HDR/i, tag: 'hdr10' },
    { regex: /DoVi|(Dolby\s*Vision)|杜比视界/i, tag: 'dolby_vision' },
    { regex: /粤/i, tag: 'cantonese_audio' },
    {
      regex: /简繁|繁简|繁体|简体|中字|中英|中文/i,
      tag: 'chinese_subtitle',
      condition: () => !/无中(字|文)/.test(source),
    },
    { regex: /Criterion|CC标准/i, tag: 'the_criterion_collection' },
    {
      regex:
        /禁转|禁轉|严禁转载|嚴禁轉載|谢绝转载|謝絕轉載|禁止转载|exclusive/i,
      tag: 'exclusive',
    },
  ],
  MT_BASE_API_URL: 'https://api2.m-team.cc/api',
  MT_REQUEST_VERSION: '1.1.2',
  MT_SPECS_MAP: {
    source: {
      8: 'web',
      1: 'bluray',
      3: 'dvd',
      4: 'hdtv',
      5: 'hdtv',
      6: 'other',
      7: 'cd',
    },
    medium: {
      1: 'bluray',
      2: 'hddvd',
      3: 'remux',
      7: 'encode',
      4: 'bluray',
      5: 'hdtv',
      6: 'dvd',
      8: 'cd',
      10: 'web',
    },
    standard: {
      1: '1080p',
      2: '1080i',
      3: '720p',
      5: '480p',
      6: '2160p',
    },
  },
  UNIT3D_BASIC_KEY_MAP: {
    name: ['Name', '名称', '名稱'],
    size: ['Size', '体积', '體積'],
    category: ['Category', '类别', '類別'],
    type: ['Type', '规格', '規格'],
    resolution: ['Resolution'],
  },
};
