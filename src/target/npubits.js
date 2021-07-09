import { CURRENT_SITE_INFO } from '../const';

export default (info) => {
  const { title, year, movieName, category } = info;
  ['subtitle', 'description'].forEach(key => {
    $(CURRENT_SITE_INFO[key].selector).val(info[key]);
  });
  $('#torrent_name_checkbox').attr('checked', true);
  $(CURRENT_SITE_INFO.name.selector).val(title);
  $(CURRENT_SITE_INFO.category.selector).val(CURRENT_SITE_INFO.category.map[category]);
  $(CURRENT_SITE_INFO.category.selector)[0].dispatchEvent(new Event('change'));
  if (category.match(/tv/)) {
    const districtMap = {
      CN: '23',
      HK: '24',
      TW: '24',
      JP: '26',
      KR: '27',
      US: '25',
      EU: '65',
      OT: '63',
    };
    $(CURRENT_SITE_INFO.area.selector).val(districtMap[info.area]);
  } else if (category.match(/movie/)) {
    $(CURRENT_SITE_INFO.area.selector).val(CURRENT_SITE_INFO.area.map[info.area]);
  }
  $(CURRENT_SITE_INFO.area.selector)[0].dispatchEvent(new Event('change'));
  ['videoCodec', 'videoType', 'resolution', 'team'].forEach(key => {
    // eslint-disable-next-line no-undef
    fill_field(CURRENT_SITE_INFO[key].selector, CURRENT_SITE_INFO[key].map[info[key]]);
  });
  $('#torrent_name_field0').val(movieName);
  if (category === 'movie') {
    $('#torrent_name_field1').val(year);
  } else if (category.match(/tv/)) {
    const episode = title.match(/S\d+(E\d+)?/i)?.[0] ?? '';
    $('#torrent_name_field1').val(episode);
  }
  $('input[name="uplver"]').attr('checked', true);
};
