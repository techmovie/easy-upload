export default (info:TorrentInfo.Info) => {
  const observer = new MutationObserver(() => {
    if ($('#ename')[0] && $('#cname')[0]) {
      fillInfo(info);
      observer.disconnect();
    }
  });
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
};

function fillInfo (info:TorrentInfo.Info) {
  const { title, description, doubanInfo, category, tags } = info;
  $('#ename').val(title);
  const fullDescription = description + doubanInfo;
  let area = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
  area = area.replace(/\[\/?.+?\]/g, '');
  const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
  const translateName = fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
  const language = fullDescription.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
  if (area) {
    const areaString = area.replace(/,/g, '/').replace(/\s|中国/g, '');
    if (category === 'movie') {
      $('#district').val(areaString);
    } else if (category.match(/tv/)) {
      const areaToSelectorMap = {
        大陆: '#specificcat1',
        '台|港': '#specificcat2',
        美国: '#specificcat3',
        日本: '#specificcat4',
        韩国: '#specificcat5',
        英国: '#specificcat6',
        泰剧: '#specificcat7',
      };
      let selector = '';
      for (const [key, value] of Object.entries(areaToSelectorMap)) {
        if (area.match(new RegExp(key))) {
          selector = value;
          break;
        }
      }
      if (selector) {
        $(selector).attr('checked', 'true');
        // eslint-disable-next-line no-undef
        getcheckboxvalue('specificcat');
      } else {
        $('#specificcat').val(areaString);
      }
    } else if (category.match(/variety/)) {
      const districtMap = {
        CN: '#district1',
        HK: '#district2',
        TW: '#district2',
        JP: '#district4',
        KR: '#district4',
        US: '#district3',
        EU: '#district3',
        OT: '#district5',
      };
      $(districtMap[info.area as keyof typeof districtMap]).attr('checked', 'true');
      // eslint-disable-next-line no-undef
      getcheckboxvalue('district');
    }
  }
  if ($('#language')) {
    let selector = '';
    if (language) {
      if (language.match(/汉语/)) {
        selector = '#language1';
      } else if (language.match(/粤/)) {
        selector = '#language2';
      } else if (language.match(/英语/)) {
        selector = '#language3';
      } else if (language.match(/日语/)) {
        selector = '#language4';
      } else if (language.match(/韩语/)) {
        selector = '#language5';
      }
      $(selector).attr('checked', 'true');
      // eslint-disable-next-line no-undef
      getcheckboxvalue('language');
    }
  }
  let chineseName = originalName;
  if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
    chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : '';
  }
  $('#cname').val(chineseName);
  if (tags.chinese_subtitle && !tags.chinese_audio) {
    $('input[name="chinese"]').attr('checked', 'true');
  }
}
