export interface GPWSiteTorrentInfo {
  status: string;
  response: {
    group: {
      description: string;
      conver: string;
      name: string;
      subName: string;
      year: string;
      releaseType: string;
      categoryId: string;
      imdbId: string;
      doubanId: string;
      region: string;
    };
    torrent: GPWSiteTorrent;
  };
}

export interface GPWSiteTorrent {
  size: number;
  description: string;
  mediainfos: string[];
  fileList: string;
  filePath: string;
  fileName: string;
  source: string;
  codec: string;
  container: string;
  processing: string;
  subtitles: string;
  resolution: string;
  chineseDubbed: string;
  remasterTitle: string;
}

export interface GPWSiteGroup {
  description: string;
  conver: string;
  name: string;
  subName: string;
  year: string;
  releaseType: string;
  categoryId: string;
  imdbId: string;
  doubanId: string;
  region: string;
}
