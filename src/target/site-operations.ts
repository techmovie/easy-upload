// import {
//   getBDInfoOrMediaInfo,
// } from '../common';

import $ from 'jquery';

export const SITE_OPERATIONS = {
  // KEEPFRDS: {
  //   handleDescription: (info: TorrentInfo.TargetTorrentInfo) => {
  //     let { description, screenshots } = info;
  //     description = description.replace(/\[\/?(center|code)\]/g, '');
  //     if (info.sourceSite === 'PTP') {
  //       description = info?.originalDescription?.replace(/^(\s+)/g, '') ?? '';
  //       description = filterEmptyTags(description);
  //       description = description.replace(/http:\/\/ptpimg/g, 'https://ptpimg');
  //       screenshots.forEach((screenshot) => {
  //         const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, 'i');
  //         if (!description.match(regStr)) {
  //           // torrents.php?id=78613&torrentid=590102 [img=https://ptpimg.me/yvm3e5.png]
  //           const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, 'i');
  //           if (description.match(regOldFormat)) {
  //             description = description.replace(
  //               regOldFormat,
  //               `[img]${screenshot}[/img]`,
  //             );
  //           } else {
  //             description = description.replace(
  //               new RegExp(`(?<!\\[img\\])${screenshot}`, 'gi'),
  //               `[img]${screenshot}[/img]`,
  //             );
  //           }
  //         }
  //       });
  //     } else if (info.sourceSite === 'RED') {
  //       description = description.replace(/\[#\]/g, '[*]');
  //     }
  //     $('#torrent').on('change', () => {
  //       if (info.category !== 'music') {
  //         $(CURRENT_SITE_INFO.name.selector).val(info.title);
  //         if (info.subtitle)
  //           $(CURRENT_SITE_INFO.subtitle.selector).val(info.subtitle);
  //       } else {
  //         $(CURRENT_SITE_INFO.name.selector).val(info.subtitle || '');
  //         if (info.subtitle)
  //           $(CURRENT_SITE_INFO.subtitle.selector).val(info.title);
  //       }
  //     });
  //     info.mediaInfos?.forEach((mediaInfo) => {
  //       if (!/\[mediainfo\]/.test(description)) {
  //         description = description.replace(
  //           `[quote]${mediaInfo}[/quote]`,
  //           `[mediainfo]${mediaInfo}[/mediainfo]`,
  //         );
  //       }
  //     });

  //     return description;
  //   },
  // },

  MTV: {
    handleDescription: (info: TorrentInfo.TargetTorrentInfo) => {
      let { description } = info;
      info.mediaInfos?.forEach((mediaInfo) => {
        description = description.replace(
          `[quote]${mediaInfo}[/quote]`,
          `[mediainfo]${mediaInfo}[/mediainfo]`,
        );
      });
      return description;
    },
    afterHandler: (info: TorrentInfo.TargetTorrentInfo) => {
      if (info.resolution !== '') {
        const resolution = info.resolution.replace('p', '');
        $(`input[name="Resolution"][value="${resolution}"]`)[0]?.click();
        $('#taginput').val(info.resolution);
      }

      if (info.videoCodec !== '') {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} ${info.videoCodec}`);
      }

      if (info.audioCodec === 'dd+') {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} ddp.audio`);
      } else if (info.audioCodec?.match(/dd|ac3/i)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} dd.audio`);
      } else if (info.audioCodec?.match(/dtshd/i)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} dts.hd.audio`);
      } else if (info.audioCodec?.match(/dtsx/i)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} dts.x.audio`);
      } else {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} ${info.audioCodec}.audio`);
      }
      if (info.title.match(/(\s|.)hybrid(\s|.)/i)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} hybrid`);
      }
      if (/web-dl/i.test(info.title)) {
        const tagvalue = $('#taginput').attr('value');
        $('input[name="source"][value="9"]')[0]?.click();
        if (/NF|Netflix/i.test(info.title)) {
          $('#taginput').val(`${tagvalue} web.dl netflix.source`);
        } else $('#taginput').val(`${tagvalue} web.dl`);
      } else if (/webrip/i.test(info.title)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} webrip`);
        $('input[name="source"][value="10"]')[0]?.click();
      } else if (info.videoType.match(/bluray/i)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} bluray`);
        $('input[name="source"][value="7"]')[0]?.click();
      } else if (info.videoType.match(/remux/i)) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} ${info.videoType}`);
        $('input[name="source"][value="7"]')[0]?.click();
      } else {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} ${info.videoType}`);
      }

      if (info.tags.cantonese_audio === true) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} cantonese.audio.track`);
      }
      if (info.tags.chinese_audio === true) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} chinese.audio.track`);
      }
      if (info.tags.chinese_subtitle === true) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} chinese.subs`);
      }
      if (info.tags.hdr === true) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} hdr`);
      }
      if (info.tags.dolby_vision === true) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} dovi`);
      }
      if (info.tags.hdr10_plus === true) {
        const tagvalue = $('#taginput').attr('value');
        $('#taginput').val(`${tagvalue} hdr10plus`);
      }
    },
  },
};
