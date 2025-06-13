import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '../const';
import { getLocationSearchValueByKey, GMFetch } from '../common';
import $ from 'jquery';

const filterBluTorrent = (imdb = '', name = '') => {
  if (imdb) {
    $('#imdb').val(imdb);
  } else if (name) {
    $('#search').val(name);
  }
  const token = $('meta[name="csrf_token"]').attr('content');
  const url = `${CURRENT_SITE_INFO.url}/torrents/filter?search=${name}&imdb=${imdb}&_token=${token}&sorting=size&direction=desc`;
  GMFetch<string>(url).then((data) => {
    $('#facetedSearch').html(data);
  });
};
// 某些站点需要将IMDB填入检索表单
const fillSearchImdb = () => {
  const imdbParam = getLocationSearchValueByKey('imdb');
  const nameParam = getLocationSearchValueByKey('name');
  if (imdbParam || nameParam) {
    if (
      CURRENT_SITE_INFO.siteType === 'UNIT3D' &&
      CURRENT_SITE_NAME !== 'Blutopia'
    ) {
      filterBluTorrent(imdbParam, nameParam);
    } else if (CURRENT_SITE_NAME === 'PTN') {
      $('#movieimdb').val(imdbParam);
      $('#moviename').val(nameParam);
    }
  }
};
export { fillSearchImdb };
