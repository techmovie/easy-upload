import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { PT_SITE } from '@/const';
import { buildPTPDescription } from '@/target/helper/index';
import { getIdByIMDbUrl } from '@/common';
import $ from 'jquery';

class ZHUQUE extends BaseFiller implements TargetFiller {
  priority = 10;
  currentSiteInfo = PT_SITE.ZHUQUE;

  canHandle(siteName: string): boolean {
    return siteName === 'ZHUQUE';
  }

  fill(info: TorrentInfo.Info): void {
    this.info = info;

    this.setupMutationObserver();
  }

  private setupMutationObserver(): void {
    if (!this.info) return;

    const targetNode = document;
    const imdbId = getIdByIMDbUrl(this.info.imdbUrl || '');

    const insert = new MutationObserver(() => {
      this.fillBasicFields(imdbId);
      this.fillZhuqueScreenshots();
      this.fillZhuqueMediaInfo();
      this.fillZhuqueDescription();
      this.setupSelectObserver();
      this.fillTorrentFile();
      insert.disconnect();
    });

    insert.observe(targetNode, {
      attributes: false,
      childList: false,
      subtree: true,
      characterDataOldValue: false,
    });
  }

  private fillBasicFields(imdbId: string): void {
    if (!this.info) return;

    $('input.ant-select-selection-search-input[id]').each(function () {
      this.dispatchEvent(new Event('keydown'));
    });

    $(this.currentSiteInfo.name.selector).val(this.info.title);
    $(this.currentSiteInfo.name.selector)[0].dispatchEvent(new Event('input'));

    $(this.currentSiteInfo.imdb.selector).val(imdbId);
    $(this.currentSiteInfo.imdb.selector)[0].dispatchEvent(new Event('input'));

    if (this.info.subtitle) {
      $(this.currentSiteInfo.subtitle.selector).val(this.info.subtitle);
      $(this.currentSiteInfo.subtitle.selector)[0].dispatchEvent(
        new Event('input'),
      );
    }
    $(`.ant-btn-primary span:contains(查 询)`).trigger('click');
  }

  private fillZhuqueScreenshots(): void {
    if (!this.info) return;

    let screenshotStr = '';
    if (this.info.screenshots.length > 0) {
      this.info.screenshots.forEach((img) => {
        screenshotStr += `${img}\n`;
      });
    }

    $(this.currentSiteInfo.screenshots.selector).val(screenshotStr);
    $(this.currentSiteInfo.screenshots.selector)[0].dispatchEvent(
      new Event('input'),
    );
  }

  private fillZhuqueMediaInfo(): void {
    if (!this.info) return;

    $(this.currentSiteInfo.mediaInfo.selector).val(
      this.info.mediaInfos?.[0] ?? '',
    );
    $(this.currentSiteInfo.mediaInfo.selector)[0].dispatchEvent(
      new Event('input'),
    );
  }

  private fillZhuqueDescription(): void {
    if (!this.info) return;

    let description = this.info.description
      .replace(`[quote]${this.info.mediaInfos?.[0] ?? ''}[/quote]`, '')
      .trim();

    if (this.info.mediaInfos && this.info.mediaInfos.length > 1) {
      this.info.mediaInfos.forEach((mediaInfo) => {
        description = description.replace(`[quote]${mediaInfo}[/quote]`, '');
      });
    }

    if (this.info.sourceSite === 'PTP') {
      description = buildPTPDescription(this.info);
      description = description.replace(
        /\[comparison[^[]*\[\/comparison\]/gi,
        '',
      );
    } else if (this.info.sourceSite.match(/BeyondHD|UHDBits/)) {
      description = this.info.originalDescription || '';
    }

    description = description
      .replace(/\[url.*\[\/url\]/g, '')
      .replace(/\[img.*\[\/img\]/g, '')
      .replace(/\[\/?(i|b|center|quote|size|color)\]/g, '')
      .replace(/\[(size|color)=#?[a-zA-Z0-9]*\]/g, '')
      .replace(/\n\n*/g, '\n');

    description = description.replace(/Screen(shot)?s:(\s*)\n?/gi, '').trim();

    if (this.info.sourceSite === 'KEEPFRDS') {
      description = description.replace(/截图对比:[^\n]*\n?/gi, '');
    }

    if (description !== '') {
      description = `\`\`\`\n${description}\n\`\`\``; // quote everything
    }

    if (this.info.comparisons && this.info.comparisons.length > 0) {
      for (const comparison in this.info.comparisons) {
        description += `\n对比图 ${this.info.comparisons[comparison].title}\n\n`;
        for (const img in this.info.comparisons[comparison].imgs) {
          description += `${this.info.comparisons[comparison].imgs[img]}\n\n`;
        }
      }
    }

    const thanksQuoteClosed = GM_getValue('easy-seed.thanks-quote-closed', '');
    if (!thanksQuoteClosed && this.info.sourceSite !== undefined) {
      description = `\`\`\`\n转自 ${this.info.sourceSite} ，感谢原发布者！\n\`\`\`\n${description}`;
    }

    $(this.currentSiteInfo.description.selector).val(description);
    $(this.currentSiteInfo.description.selector)[0].dispatchEvent(
      new Event('input'),
    );
  }

  private setupSelectObserver(): void {
    if (!this.info) return;

    const selectNodeParent = document.querySelector('form');
    if (!selectNodeParent) return;

    const select = new MutationObserver(async () => {
      this.fillCategory();
      this.fillVideoAndAudioParameters();

      select.disconnect();
    });

    select.observe(selectNodeParent, {
      attributes: false,
      childList: true,
      subtree: true,
      characterDataOldValue: false,
    });
  }

  protected fillCategory(): void {
    if (!this.info) return;

    const { category: categoryConfig } = this.currentSiteInfo;
    $(
      `div.ant-select-item-option-content:contains(${categoryConfig.map[this.info.category as keyof typeof categoryConfig.map]})`,
    ).trigger('click');
  }

  private fillVideoAndAudioParameters(): void {
    if (!this.info) return;

    this.fillTags();

    const keyArray = ['videoType', 'videoCodec', 'audioCodec'] as const;
    type Key = (typeof keyArray)[number];

    keyArray.forEach((key) => {
      const { map } = this.currentSiteInfo[key as Key];
      if (!map) return;

      const mapValue = map[this.info![key as Key] as keyof typeof map];
      if (!mapValue) return;

      this.clickAppropriateOption(key, mapValue);
    });

    if (this.info.resolution !== '') {
      $(
        `div.ant-select-item-option-content:contains(${this.info.resolution})`,
      )[0]?.click();
    }
  }

  private async fillTags(): Promise<void> {
    if (!this.info) return;

    const sleep = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const { tags } = this.currentSiteInfo;
    for (const tag in this.info.tags) {
      if (tags[tag as keyof typeof tags]) {
        await sleep(100).then(() =>
          $(tags[tag as keyof typeof tags])[0].click(),
        );
      }
    }
  }

  private clickAppropriateOption(key: string, mapValue: string): void {
    if (
      key !== 'videoType' &&
      $(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0
    ) {
      $(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
    } else if (mapValue === 'Blu-ray') {
      $(`div.ant-select-item-option-content:contains(${mapValue})`)[2].click();
    } else if (
      $(`div.ant-select-item-option-content:contains(${mapValue})`).length > 0
    ) {
      $(`div.ant-select-item-option-content:contains(${mapValue})`)[0].click();
    }
  }
}

registry.register(new ZHUQUE());
