export interface AudioTrack {
  id: string
  codec: string
  language: string
  channelName: string
  default: boolean
  forced: boolean
}
export interface VideoTrack {
  id: string
  codec: string
  resolution: string
  default: boolean
  forced: boolean
  isEncoded: boolean
  hdrType?: string
}
export interface SubtitleTrack {
  id: string
  title: string
  language: string
  default: boolean
  forced: boolean
}
export interface BasicMediaInfo {
  fileName: string
  fileSize: number
  duration: number
  format: string
}
export interface MediaInfo extends BasicMediaInfo {
  resolution: string
  audioTracks: AudioTrack[]
  subtitleTracks: SubtitleTrack[]
  videoTracks: VideoTrack[]
  mediaTags?: string[];
}
