import { useMemo } from 'preact/hooks';
import { CURRENT_SITE_NAME, CURRENT_SITE_INFO } from '@/const';

export const useSiteConfig = () => {
  return useMemo(() => {
    let siteType = 'default';

    if (CURRENT_SITE_NAME === 'HH') {
      siteType = 'HH';
    } else if (CURRENT_SITE_NAME === 'MTeam') {
      siteType = 'MTeam';
    } else if (CURRENT_SITE_INFO.siteType === 'gazelle') {
      siteType = 'Gazelle';
    } else if (CURRENT_SITE_NAME === 'Cinematik') {
      siteType = 'Cinematik';
    } else if (CURRENT_SITE_NAME === 'SpeedApp') {
      siteType = 'SpeedApp';
    } else if (CURRENT_SITE_NAME === 'HDBits') {
      siteType = 'HDBits';
    } else if (
      CURRENT_SITE_INFO.siteType.match(/NexusPHP|AvistaZ/) ||
      CURRENT_SITE_NAME?.match(
        /BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS|MDU|LST|fearnopeer/,
      )
    ) {
      siteType = 'NexusPHP';
    }

    return siteType;
  }, []);
};
