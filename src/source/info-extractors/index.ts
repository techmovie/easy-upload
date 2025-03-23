import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import { registry } from './registry';

import './nexusphp';
import './pter';
import './ssd';
import './hdarea';
import './putao';
import './tjupt';
import './ourbits';
import './keepfrds';
import './tlf';
import './hdhome';
import './hdfans';
import './shared-nexusphp-sites';
import './ttg';
import './hanhan';
import './mt';
import './ptp';
import './uhd';
import './gpw';

export async function getTorrentInfo (): Promise<TorrentInfo.Info | null> {
  if (!CURRENT_SITE_INFO) {
    console.log('No site info found');
    return null;
  }
  const extractor = registry.getExtractor(
    CURRENT_SITE_NAME,
    CURRENT_SITE_INFO.siteType,
  );

  if (!extractor) {
    console.log(`No extractor found for this site ${CURRENT_SITE_NAME}`);
    return null;
  }

  try {
    return await extractor.extract();
  } catch (error) {
    console.log('Error extracting torrent info', error);
    return null;
  }
}
