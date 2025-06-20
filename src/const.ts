import { PT_SITE } from './config.json';

export const BROWSER_LANGUAGE = navigator.language.toLowerCase().split('-')[0];

export type SiteName = keyof typeof PT_SITE;

export const getSiteName = (host: string): SiteName | '' => {
  let siteName = '' as SiteName | '';
  try {
    Object.keys(PT_SITE).forEach((key) => {
      const siteKey = key as SiteName;
      const hostName = PT_SITE[siteKey].host;
      const matchReg = new RegExp(hostName, 'i');
      if (hostName && host.match(matchReg)) {
        siteName = siteKey;
      }
    });
    return siteName;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message !== 'end loop') {
      console.log(error);
    }
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
