import { PT_SITE } from '../const';
import { parseMedia } from '../common';
import $ from 'jquery';

export default (info:TorrentInfo.Info) => {
  const currentSiteInfo = PT_SITE.BYR;
  const {
    title, description, doubanInfo,
    category, videoType, mediaInfos, subtitle, imdbUrl, doubanUrl,
  } = info;
  $(currentSiteInfo.subtitle.selector).val(subtitle || '');
  $(currentSiteInfo.imdb.selector).val(imdbUrl || '');
  $(currentSiteInfo.douban.selector).val(doubanUrl || '');
  CKEDITOR.on('instanceReady', () => {
    CKEDITOR.instances.descr.setData(bbcode2Html(description));
  });
  $('#ename0day').val(title);
  const fullDescription = description + doubanInfo;
  let area = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
  area = area.replace(/\[\/?.+?\]/g, '');
  const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
  const translateName = fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
  const movieType = fullDescription.match(/(类\s+别)\s+(.+)/)?.[2] ?? '';
  const language = fullDescription.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
  let chineseName = originalName;
  if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
    chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : '';
  }

  if (category.match(/movie/)) {
    let selector = '';
    if (area.match(/华语|台|港/)) {
      selector = '华语';
    } else if (area.match(/日本|韩国|泰国/)) {
      selector = '亚洲';
    } else if (area.match(/美国|加拿大/)) {
      selector = '北美';
    } else if (area.match(/欧|英|法|德|俄|意|苏联|EU/)) {
      selector = '欧洲';
    } else {
      selector = '其他';
    }
    const typeMap = {
      华语: '11',
      欧洲: '12',
      北美: '13',
      亚洲: '14',
      其他: '1',
    };
    $('select[name="second_type"]').val((typeMap[selector as keyof typeof typeMap]));
    $('select[name="second_type"]')[0].dispatchEvent(new Event('change'));
    const movieTypeArr = movieType.split(/\s\//);
    $('#movie_type').val(movieTypeArr.join('/'));
    fillField(selector, category === 'movie' ? 'movie_country' : 'show_country');
    $('#movie_cname').val(chineseName);
  } else if (category.match(/tv/)) {
    let selector = 'movie_country';
    if (area.match(/大陆/)) {
      selector = '大陆';
    } else if (area.match(/台|港/)) {
      selector = '港台';
    } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
      selector = '欧美';
    } else if (area.match(/日本|韩国/)) {
      selector = '日韩';
    } else {
      selector = '其他';
    }
    const typeMap = {
      大陆: '15',
      港台: '16',
      欧美: '17',
      日韩: '18',
      其他: '2',
    };
    $('select[name="second_type"]').val((typeMap[selector as keyof typeof typeMap]));
    $('select[name="second_type"]')[0].dispatchEvent(new Event('change'));
    fillField(selector, 'tv_type');
    $('#tv_ename').val(title);
    $('#cname').val(chineseName);
    const episode = title.match(/S\d+(E\d+)?/i)?.[0] ?? '';
    $('#tv_season').val(episode);
    const isBluray = videoType.match(/bluray/i);
    const { format } = parseMedia(mediaInfos?.[0], !!isBluray);
    fillField(format?.toUpperCase() || 'MKV', 'tv_filetype');
  } else if (category.match(/variety/)) {
    let selector = '';
    if (area.match(/大陆/)) {
      selector = '大陆';
    } else if (area.match(/台|港/)) {
      selector = '港台';
    } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
      selector = '欧美';
    } else if (area.match(/日本|韩国/)) {
      selector = '日韩';
    } else {
      selector = '其他';
    }
    const typeMap = {
      大陆: '27',
      港台: '29',
      欧美: '30',
      日韩: '28',
      其他: '5',
    };
    $('select[name="second_type"]').val((typeMap[selector as keyof typeof typeMap]));
    $('select[name="second_type"]')[0].dispatchEvent(new Event('change'));
    fillField(selector, 'show_country');
    $('#show_cname').val(chineseName);
    $('#show_ename').val(title);
    let languageVal = '';
    if (language.match(/汉语/)) {
      languageVal = '国语';
    } else if (language.match(/粤/)) {
      languageVal = '粤语';
    } else if (language.match(/英语/)) {
      languageVal = '英语';
    } else if (language.match(/日语/)) {
      languageVal = '日语';
    } else if (language.match(/韩语/)) {
      languageVal = '韩语';
    }
    fillField(languageVal, 'show_language');
  }
  function bbcode2Html (bbcode:string) {
    let html = bbcode.replace(/\[\*\]([^\n]+)/ig, '<li>$1</li>');
    html = html.replace(/(\r\n)|\n/g, '<br>');
    html = html.replace(/\[(quote|hide=.+?)\]/ig, '<fieldset><legend>引用</legend>');
    html = html.replace(/\[(\/)(quote|hide)\]/ig, '<$1fieldset>');
    html = html.replace(/(?!\[url=(http(s)*:\/{2}.+?)\])\[img\](.+?)\[\/img]\[url\]/g, '<a href="$1"><img src="$2"/></a>');
    html = html.replace(/\[img\](.+?)\[\/img]/g, '<img src="$1"/>');
    html = html.replace(/\[(\/)?(left|right|center)\]/ig, '<$1$2>');
    html = html.replace(/\[(\/)?b\]/ig, '<$1strong>');
    html = html.replace(/\[color=(.+?)\]/ig, '<span style="color: $1">').replace(/\[\/color\]/g, '</span>');
    html = html.replace(/\[size=(.+?)\]/ig, '<font size="$1">').replace(/\[\/size\]/g, '</font>');
    html = html.replace(/\[url=(.+?)\](.+?)\[\/url\]/ig, '<a href="$1">$2</a>');
    return html;
  }
};
