export interface TorrentDetailInfo {
  name: string;
  smallDescr: string;
  imdb: string;
  douban: string;
  category: string;
  source: 1 | 3 | 4 | 5 | 6 | 7 | 8;
  medium: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10;
  standard: 1 | 2 | 3 | 5 | 6;
  videoCodec: string;
  audioCodec: string;
  processing: string;
  size: string;
  descr: string;
  mediainfo: string;
}

export interface IMDbInfo {
  year: string;
  title: string;
  photo: string;
}
