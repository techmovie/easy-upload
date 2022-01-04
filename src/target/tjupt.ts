export default (info:TorrentInfo.Info) => {
  const domTimeout = setTimeout(() => {
    if ($('#ename')) {
      const { title, description, doubanInfo, category, resolution } = info;
      $('#ename').val(title);
      const fullDescription = description + doubanInfo;
      let area = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
      area = area.replace(/\[\/?.+?\]/g, '');
      const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
      const translateName = fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
      const castArray = fullDescription.match(/(主\s+演)\s+([^◎]+)/)?.[2]?.split('\n')?.filter(item => !!item) ?? [];
      const language = fullDescription.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
      const castStr = castArray.map(item => {
        return item.trim().split(/\s+/)?.[0];
      }).join('/');
      if (area) {
        if (category === 'movie') {
          $('#district').val(area.replace(/,/g, '/').replace(/中国/, ''));
        } else if (category.match(/tv/)) {
          let selector = '';
          if (area.match(/大陆/)) {
            selector = '#specificcat1';
          } else if (area.match(/台|港/)) {
            selector = '#specificcat2';
          } else if (area.match(/美国/)) {
            selector = '#specificcat3';
          } else if (area.match(/英国/)) {
            selector = '#specificcat7';
          } else if (area.match(/日本/)) {
            selector = '#specificcat4';
          } else if (area.match(/韩国/)) {
            selector = '#specificcat5';
          } else {
            selector = '#specificcat6';
          }
          $(selector).attr('checked', 'true');
          // eslint-disable-next-line no-undef
          getcheckboxvalue('specificcat');
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
      if ($('#format')) {
        if (category.match(/variety/)) {
          if (resolution.match(/720/)) {
            $('#format3').attr('checked', 'true');
          } else if (resolution.match(/1080/)) {
            $('#format5').attr('checked', 'true');
          }
          // eslint-disable-next-line no-undef
          getcheckboxvalue('format');
        } else if (category.match(/documentary/)) {
          // 这里的单选很不合理 同时是BDRip和1080p的该如何选？
          if (resolution.match(/720/)) {
            $('#format2').attr('checked', 'true');
          } else if (resolution.match(/1080/)) {
            $('#format1').attr('checked', 'true');
          }
          // eslint-disable-next-line no-undef
          getradiovalue('format');
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
      if (category.match(/variety/)) {
        $('#tvshowsguest').val(castStr);
      }
      let chineseName = originalName;
      if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
        chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : '';
      }
      $('#cname').val(chineseName);
      clearTimeout(domTimeout);
    }
  }, 2000);
};
function getcheckboxvalue (arg0: string) {
  throw new Error('Function not implemented.');
}
function getradiovalue (arg0: string) {
  throw new Error('Function not implemented.');
}
