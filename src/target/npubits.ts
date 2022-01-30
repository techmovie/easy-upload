import { PT_SITE } from '../const';
import { getTeamName } from './common';

export default (info:TorrentInfo.Info) => {
  const currentSiteInfo = PT_SITE.NPUBits;
  let { title, year, movieName, category, doubanInfo, description, subtitle } = info;
  $(currentSiteInfo.subtitle.selector).val(subtitle || '');
  if (doubanInfo) {
    description = `${doubanInfo}\n${description}`;
  }
  $(currentSiteInfo.description.selector).val(description);
  $('#torrent_name_checkbox').attr('checked', 'true');
  $(currentSiteInfo.name.selector).val(title);
  type Category = keyof typeof currentSiteInfo.category.map
  $(currentSiteInfo.category.selector).val(
    currentSiteInfo.category.map[category as Category]);
  $(currentSiteInfo.category.selector)[0].dispatchEvent(new Event('change'));
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
    $(currentSiteInfo.area.selector).val(districtMap[info.area as keyof typeof districtMap]);
  } else if (category.match(/movie/)) {
    type Area = keyof typeof currentSiteInfo.area.map
    $(currentSiteInfo.area.selector).val(currentSiteInfo.area.map[info.area as Area]);
  }
  $(currentSiteInfo.area.selector)[0].dispatchEvent(new Event('change'));

  const keyArray = ['videoCodec', 'videoType', 'resolution'] as const;
  type Key = typeof keyArray[number]
  keyArray.forEach(key => {
    const { selector, map } = currentSiteInfo[key as Key];
    type MapKey = keyof typeof map;
    // eslint-disable-next-line no-undef
    fill_field(
      selector,
      map[info[key as Key] as MapKey]);
  });
  const teamName = getTeamName(info);
  const teamConfig = currentSiteInfo.team;
  $(`${teamConfig.selector}`).val(teamConfig.map[teamName as keyof typeof teamConfig.map]);

  $('#torrent_name_field0').val(movieName);
  if (category === 'movie') {
    $('#torrent_name_field1').val(year);
  } else if (category.match(/tv/)) {
    const episode = title.match(/S\d+(E\d+)?/i)?.[0] ?? '';
    $('#torrent_name_field1').val(episode);
  }
  $('input[name="uplver"]').attr('checked', 'true');
};
