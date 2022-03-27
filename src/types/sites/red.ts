
export interface Info {
  group: GroupInfo
  torrent: TorrentInfo
}
export interface GroupInfo{
  bbBody: string
  categoryId: 1|2|3|4|5|6|7
  categoryName: 'Music'|'Applications'|'E-Books'|'Audiobooks'|'E-Learning Videos'|'Comedy'|'Comics'
  id: number
  musicInfo: MusicInfo
  name: string
  tags: string[]
  wikiBody: string
  wikiImage: string
  year: number
}
export interface TorrentInfo{
  description: string
  encoding: '192'| 'APS (VBR)' | 'V2 (VBR)' | 'V1 (VBR)' | 'APX (VBR)' | 'V0 (VBR)' | '320' | 'Lossless' | '24bit Lossless'
  format: 'MP3' | 'FLAC'| 'AAC'| 'AC3'| 'DTS'
  categoryName: string
  id: number
  media: 'CD'| 'DVD' | 'Vinyl' | 'Soundboard' |' SACD' | 'DAT' | 'Cassette' | 'WEB' | 'Blu-Ray'
  size: number
}
export interface MusicInfo{
  artists: People[]
  with: People[]
  composers: People[]
  conductor: People[]
  dj: People[]
  producer: People[]
  remixedBy: People[]
}
export interface People{
  id: number
  name: string
}
