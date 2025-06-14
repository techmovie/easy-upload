import { PT_SITE } from './config.json';

export const BROWSER_LANGUAGE = navigator.language.toLowerCase().split('-')[0];

export type SiteName = keyof typeof PT_SITE;

const siteRegexCache = new Map<SiteName, RegExp>();

export const getSiteName = (host: string): SiteName | '' => {
  try {
    const siteEntry = Object.entries(PT_SITE).find(([siteKey, siteInfo]) => {
      const hostName = 'host' in siteInfo ? siteInfo.host : '';
      if (!hostName) return false;
      const siteKeyTyped = siteKey as SiteName;
      if (!siteRegexCache.has(siteKeyTyped)) {
        siteRegexCache.set(siteKeyTyped, new RegExp(`^${hostName}`, 'i'));
      }
      return siteRegexCache.get(siteKeyTyped)!.test(host);
    });

    return siteEntry ? (siteEntry[0] as SiteName) : '';
  } catch (error) {
    console.error(error);
    return '';
  }
};

const CHINESE_REGEX = /[\u4e00-\u9fa5]+/;

export const getSortedSiteKeys = (): SiteName[] => {
  return Object.keys(PT_SITE).sort((a, b) => {
    const aHasChinese = CHINESE_REGEX.test(a);
    const bHasChinese = CHINESE_REGEX.test(b);

    if (aHasChinese && !bHasChinese) return 1;
    if (!aHasChinese && bHasChinese) return -1;

    return a.toLowerCase().localeCompare(b.toLowerCase());
  }) as SiteName[];
};

export const SORTED_SITE_KEYS = getSortedSiteKeys();

export const CURRENT_SITE_NAME = getSiteName(location.host);

export const CURRENT_SITE_INFO = CURRENT_SITE_NAME
  ? (PT_SITE[CURRENT_SITE_NAME] as Site.SiteInfo)
  : (undefined as unknown as Site.SiteInfo);

export { PT_SITE };
