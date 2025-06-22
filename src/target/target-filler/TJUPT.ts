import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';

import $ from 'jquery';

class TJUPT extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'TJUPT';
  }

  fill(info: TorrentInfo.Info) {
    this.info = info;
    this.fillBasicAttributes();
    this.fillCategory();
    this.fillIMDb();
    this.processDescription();
    this.fillDescription();
    this.fillTorrentFile();
    const observer = new MutationObserver(() => {
      if ($('#ename')[0] && $('#cname')[0]) {
        this.fillSiteSpecificInfo();
        observer.disconnect();
      }
    });
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  }

  private fillSiteSpecificInfo(): void {
    if (!this.info) return;

    const { title, description, doubanInfo, category, tags } = this.info;
    $('#ename').val(title);

    const fullDescription = description + doubanInfo;
    let area = this.extractPattern(
      fullDescription,
      /(产\s+地|国\s+家)\s+(.+)/,
      2,
    );
    area = area.replace(/\[\/?.+?\]/g, '');

    const originalName = this.extractPattern(
      fullDescription,
      /(片\s+名)\s+(.+)?/,
      2,
    );
    const translateName =
      this.extractPattern(fullDescription, /(译\s+名)\s+(.+)/, 2)?.split(
        '/',
      )?.[0] || '';
    const language = this.extractPattern(
      fullDescription,
      /(语\s+言)\s+(.+)/,
      2,
    );

    this.fillAreaInfo(area, category);

    // 填充语言信息
    this.fillLanguageInfo(language);

    // 填充中文名
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/)
        ? translateName
        : '';
    }
    $('#cname').val(chineseName);

    // 填充字幕信息
    if (tags.chinese_subtitle && !tags.chinese_audio) {
      $('input[name="chinese"]').attr('checked', 'true');
    }
  }

  private extractPattern(
    text: string,
    pattern: RegExp,
    groupIndex: number,
  ): string {
    return text.match(pattern)?.[groupIndex] || '';
  }

  /**
   * 填充区域信息
   * @param area 区域信息
   * @param category 种子类别
   */
  private fillAreaInfo(area: string, category?: string): void {
    if (!area || !this.info) return;

    const areaString = area.replace(/,/g, '/').replace(/\s|中国/g, '');

    if (category === 'movie') {
      $('#district').val(areaString);
    } else if (category?.match(/tv/)) {
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
        this.callGetcheckboxvalue('specificcat');
      } else {
        $('#specificcat').val(areaString);
      }
    } else if (category?.match(/variety/)) {
      // 综艺分类
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

      const areaKey = this.info.area as keyof typeof districtMap;
      if (districtMap[areaKey]) {
        $(districtMap[areaKey]).attr('checked', 'true');
        this.callGetcheckboxvalue('district');
      }
    }
  }

  private fillLanguageInfo(language: string): void {
    if (!$('#language').length || !language) return;

    let selector = '';
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

    if (selector) {
      $(selector).attr('checked', 'true');
      this.callGetcheckboxvalue('language');
    }
  }

  private callGetcheckboxvalue(name: string): void {
    if (typeof window.getcheckboxvalue === 'function') {
      window.getcheckboxvalue(name);
    }
  }

  processDescription() {
    let { description, mediaInfos } = this.info!;
    mediaInfos.forEach((info) => {
      description = description.replace(
        `[quote]${info}[/quote]`,
        `[mediainfo]${info}[/mediainfo]`,
      );
    });
    return description;
  }
}

registry.register(new TJUPT());
