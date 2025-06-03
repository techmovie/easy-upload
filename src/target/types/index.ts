export type SelectFillKey =
  | 'videoCodec'
  | 'videoType'
  | 'resolution'
  | 'source'
  | 'area';

export enum SiteIMDbType {
  Standard = 'standard',
  StripTT = 'strip_tt',
  UNIT3D = 'unit3d',
}

export const siteIMDbTypeMap: Record<string, SiteIMDbType> = {
  HDRoute: SiteIMDbType.StripTT,
  HDSpace: SiteIMDbType.StripTT,
  Blutopia: SiteIMDbType.UNIT3D,
  fearnopeer: SiteIMDbType.UNIT3D,
  HDPOST: SiteIMDbType.UNIT3D,
  ACM: SiteIMDbType.UNIT3D,
  Aither: SiteIMDbType.UNIT3D,
  Concertos: SiteIMDbType.UNIT3D,
  MDU: SiteIMDbType.UNIT3D,
  LST: SiteIMDbType.UNIT3D,
  HUNO: SiteIMDbType.UNIT3D,
};

export interface REDSearchResultResponse {
  status: string;
  response: {
    results: {
      groupId: number;
      groupName: string;
      artist: string;
      groupYear: number;
    }[];
  };
}
