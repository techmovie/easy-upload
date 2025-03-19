import { CURRENT_SITE_NAME, CURRENT_SITE_INFO, TORRENT_INFO } from '../const';
import {
  getLocationSearchValueByKey,
} from '@/common';
import { getFilterBBCode } from '@/source/helper/index';
import $ from 'jquery';

export default async () => {
  const torrentId = getLocationSearchValueByKey('id');
  if (!torrentId) {
    return false;
  }
  const title = $('#content > .details > h2').text().trim();
  const descriptionBBCode = getFilterBBCode($(`#content${torrentId}`)[0]);
  TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
  TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
  TORRENT_INFO.title = title;
  TORRENT_INFO.description = descriptionBBCode.replace(/\[color=#ffffff\]/g, '[color=#000]').replace(/\n\n*/g, '\n');
};
