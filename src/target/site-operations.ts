import { CURRENT_SITE_INFO } from '../const';
import {
  getBDInfoOrMediaInfo,
} from '../common';
import { filterEmptyTags, fixTorrentTitle, getTeamName } from './common';
import handleIts from './its';
import handleTJUPT from './tjupt';
import handleHDRoute from './hdr';
import handleBib from './bib';
import handlePTN from './ptn';

export const SITE_OPERATIONS = {
  PTSBAO: {
    beforeHandler: () => {
      if (localStorage.getItem('autosave')) {
        localStorage.removeItem('autosave');
      }
    },
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      $('a[data-sceditor-command="source"]')[0].click();
      $(CURRENT_SITE_INFO.description.selector).val(info.description);
    },
  },
  Concertos: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description, mediaInfos } = info;
      $('#add').trigger('click');
      $('.sceditor-button.sceditor-button-source.has-icon')[0].click();
      mediaInfos.forEach(mediaInfo => {
        description = description.replace(mediaInfo.trim(), '');
      });
      return description;
    },
  },
  PTer: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let description = info.description;
      const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
      mediaInfo.forEach(info => {
        description = description.replace(`[quote]${info}[/quote]`, `[hide=mediainfo]${info}[/hide]`);
      });
      bdinfo.forEach(info => {
        description = description.replace(`[quote]${info}[/quote]`, `[hide=BDInfo]${info}[/hide]`);
      });
      if (info.comparisons?.length) {
        for (const comparison of info.comparisons) {
          const { title, imgs } = comparison;
          const titleCount = title?.split(',').length ?? '';
          imgs.forEach(img => {
            description = description.replace(`[img]${img}[/img]`, `[img${titleCount}]${img}[/img]`);
          });
        }
      }
      return description;
    },
    titleHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const isWebSource = !!info.source.match(/web/gi);
      const title = fixTorrentTitle(info.title, isWebSource);
      info.title = title;
      return info;
    },
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const language = info.description.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';
      if (!language.match(/英语/) && info.area === 'EU') {
        $(CURRENT_SITE_INFO.area.selector).val('8');
      }
    },
  },
  Blutopia: {
    titleHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const isWebSource = !!info.source.match(/web/gi);
      const title = fixTorrentTitle(info.title, isWebSource);
      info.title = title;
      return info;
    },
  },
  fearnopeer: {
    titleHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const isWebSource = !!info.source.match(/web/gi);
      const title = fixTorrentTitle(info.title, isWebSource);
      info.title = title;
      return info;
    },
  },
  Aither: {
    titleHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const isWebSource = !!info.source.match(/web/gi);
      const title = fixTorrentTitle(info.title, isWebSource);
      info.title = title;
      return info;
    },
  },
  KEEPFRDS: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description, screenshots } = info;
      description = description.replace(/\[\/?(center|code)\]/g, '');
      if (info.sourceSite === 'PTP') {
        description = info?.originalDescription?.replace(/^(\s+)/g, '') ?? '';
        description = filterEmptyTags(description);
        description = description.replace(/http:\/\/ptpimg/g, 'https://ptpimg');
        screenshots.forEach(screenshot => {
          const regStr = new RegExp(`\\[img${screenshot}\\[\\/img\\]`, 'i');
          if (!description.match(regStr)) {
            // torrents.php?id=78613&torrentid=590102 [img=https://ptpimg.me/yvm3e5.png]
            const regOldFormat = new RegExp(`\\[img=${screenshot}\\]`, 'i');
            if (description.match(regOldFormat)) {
              description = description.replace(regOldFormat, `[img]${screenshot}[/img]`);
            } else {
              description = description.replace(new RegExp(`(?<!\\[img\\])${screenshot}`, 'gi'), `[img]${screenshot}[/img]`);
            }
          }
        });
      } else if (info.sourceSite === 'RED') {
        description = description.replace(/\[#\]/g, '[*]');
      }
      $('#torrent').on('change', () => {
        if (info.category !== 'music') {
          $(CURRENT_SITE_INFO.name.selector).val(info.title);
          if (info.subtitle)$(CURRENT_SITE_INFO.subtitle.selector).val(info.subtitle);
        } else {
          $(CURRENT_SITE_INFO.name.selector).val(info.subtitle || '');
          if (info.subtitle)$(CURRENT_SITE_INFO.subtitle.selector).val(info.title);
        }
      });
      info.mediaInfos?.forEach(mediaInfo => {
        if (!/\[mediainfo\]/.test(description)) {
          description = description.replace(`[quote]${mediaInfo}[/quote]`, `[mediainfo]${mediaInfo}[/mediainfo]`);
        }
      });

      return description;
    },
    titleHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      if (info.category === 'music') {
        const subtitle = info.title;
        if (info.subtitle !== undefined) info.title = info.subtitle;
        info.subtitle = subtitle;
      } else if (info.subtitle === '') {
        info.subtitle = info.title;
      }
      return info;
    },
  },
  SpeedApp: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description } = info;
      description = description
        .replace(/\[url.*\[\/url\]/g, '')
        .replace(/\[img.*\[\/img\]/g, '')
        .replace(/\[\/?(i|b|center|quote|size|color)\]/g, '')
        .replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, '')
        .replace(/\n\n*/g, '\n');
      return description;
    },
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      // IMDB地址需要完整url
      if (info.imdbId) {
        $(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${info.imdbId}/`);
      }
    },
  },

  PTN: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description, imdbUrl } = info;
      description = `${imdbUrl}\n\n${description}`;
      return description;
    },
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      handlePTN(info);
    },
  },
  HDT: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description } = info;
      description = description
        .replace(/(\[\/img\])(\[img\])/g, '$1 $2')
        .replace(/(\[\/url\])(\[url)/g, '$1 $2');
      return description;
    },
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      if (info.category !== 'tvPack') {
        $('select[name="season"').val('true');
      }
      // IMDB地址最后需要带上「/」
      if (info.imdbId) {
        $(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${info.imdbId}/`);
      }
    },
  },
  HDRoute: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      handleHDRoute(info);
    },
  },
  HDBits: {
    titleHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      let mediaTitle = info.title.replace(/([^\d]+)\s+([12][90]\d{2})/, (match, p1, p2) => {
        return `${info.movieName || info.movieAkaName} ${p2}`;
      });
      if (info.videoType === 'remux') {
        mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/ig, '');
      }
      info.title = mediaTitle;
      return info;
    },

  },
  SSD: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      if (info.category === 'tvPack' || info.title.match(/Trilogy|Collection/i) || (info.subtitle && info.subtitle.match(/合集/))) {
        $('input[name="pack"]').attr('checked', 'true');
      }
      $(CURRENT_SITE_INFO.imdb.selector).val((info.doubanUrl || info.imdbUrl) as string);
      $(CURRENT_SITE_INFO.screenshots.selector).val(info.screenshots.join('\n'));
    },
  },
  HDU: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      let videoTypeValue = '';
      const { resolution, videoType, category } = info;
      const isTV = category.match(/tv/);
      if (videoType === 'remux') {
        if (resolution === '2160p') {
          videoTypeValue = isTV ? '16' : '15';
        } else {
          videoTypeValue = isTV ? '12' : '3';
        }
      }
      if (isTV) {
        if (videoType === 'encode') {
          videoTypeValue = '14';
        } else if (videoType === 'web') {
          videoTypeValue = '13';
        }
      }
      if (videoTypeValue) {
        $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
      }
    },
  },
  TJUPT: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description } = info;
      const { mediaInfo, bdinfo } = getBDInfoOrMediaInfo(description);
      [...mediaInfo, ...bdinfo].forEach(info => {
        description = description.replace(`[quote]${info}[/quote]`, `[mediainfo]${info}[/mediainfo]`);
      });
      return description;
    },
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      $('#browsecat').trigger('change');
      handleTJUPT(info);
    },
  },
  NYPT: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      $('#browsecat').trigger('change');
      const domTimeout = setTimeout(() => {
        const catMap = {
          movie: '#movie_enname',
          tv: '#series_enname',
          tvPack: '#series_enname',
          documentary: '#doc_enname',
          variety: '#show_enname',
          cartoon: '#anime_enname',
        };
        const selector = catMap[info.category as keyof typeof catMap];
        if (selector) {
          $(selector).val(info.title);
        }
        clearTimeout(domTimeout);
      }, 2000);
    },
  },
  iTS: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      handleIts(info);
    },
  },
  UHDBits: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      $(CURRENT_SITE_INFO.imdb.selector).val(info.imdbId || '');
      if (info.title.match(/web-?rip/i)) {
        $(CURRENT_SITE_INFO.videoType.selector).val('WEBRip');
      }
      const teamName = getTeamName(info);
      $('#team').val(teamName === 'other' ? 'Unknown' : teamName);
      $('#imdb_button').trigger('click');
    },
  },
  '52pt': {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const { tags, videoType, resolution } = info;
      let videoTypeValue = videoType;
      if (videoType.match(/bluray/)) {
        if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
          videoTypeValue = videoType === 'bluray' ? '14' : '15';
        }
      } else if (videoType === 'remux' && resolution === '2160p') {
        videoTypeValue = '5';
      }
      $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
    },
  },
  BTSCHOOL: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      $(CURRENT_SITE_INFO.imdb.selector).val(info.imdbId || '');
      if (info.doubanUrl) {
        const doubanId = info.doubanUrl.match(/\/(\d+)/)?.[1] ?? '';
        $(CURRENT_SITE_INFO.douban.selector).val(doubanId);
      }
    },
  },
  HDTime: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      if (info.videoType.match(/bluray/i)) {
        $(CURRENT_SITE_INFO.category.selector).val('424');
      }
    },
  },
  RedLeaves: {
    afterHandler: () => {
      try {
        $(CURRENT_SITE_INFO.category.selector).trigger('change');
      } catch (err) {

      }
      $('tr.mode_5').css('display', '');
    },
  },
  HDFans: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      const { videoType, resolution, tags } = info;
      if (videoType === 'remux') {
        $(CURRENT_SITE_INFO.videoType.selector).val(resolution === '2160p' ? '10' : '8');
      } else if (videoType === 'encode') {
        const map = {
          '2160p': '9',
          '1080p': '5',
          '1080i': '5',
          '720p': '11',
        };
        $(CURRENT_SITE_INFO.videoType.selector).val(map[resolution as keyof typeof map] || '16');
      }
      if (tags.diy) {
        $(CURRENT_SITE_INFO.videoType.selector).val(resolution === '2160p' ? '2' : '4');
      }
    },
  },
  Bib: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      if (info.doubanBookInfo) {
        handleBib(info);
      }
    },
  },
  HaresClub: {
    afterHandler: (info:TorrentInfo.TargetTorrentInfo) => {
      $('.modesw').trigger('click');
      $(CURRENT_SITE_INFO.screenshots.selector).val(info.screenshots.join('\n'));
      if (layui) {
        setTimeout(() => {
          layui.form.render('select');
          layui.form.render('checkbox');
        }, 1000);
      }
    },
  },
  TTG: {
    afterHandler: (info: TorrentInfo.TargetTorrentInfo) => {
      if (info.doubanUrl) {
        const doubanId = info.doubanUrl.match(/\/(\d+)/)?.[1] ?? '';
        $(CURRENT_SITE_INFO.douban.selector).val(doubanId);
      }
    },
  },
  MTV: {
    handleDescription: (info:TorrentInfo.TargetTorrentInfo) => {
      let { description } = info;
      info.mediaInfos?.forEach(mediaInfo => {
        description = description.replace(`[quote]${mediaInfo}[/quote]`, `[mediainfo]${mediaInfo}[/mediainfo]`);
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
