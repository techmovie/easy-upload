import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { getBDTypeBasedOnSize } from '@/common/media';
import { getIdByIMDbUrl, getTMDBDataByIMDBId } from '@/common/movie';
import {
  buildPTPDescription,
  filterNexusDescription,
} from '@/target/helper/index';
import $ from 'jquery';
import { PT_SITE } from '@/const';

class BeyondHD extends BaseFiller implements TargetFiller {
  priority = 10;
  bhdSiteInfo = PT_SITE.BeyondHD;

  canHandle(siteName: string): boolean {
    return siteName === 'BeyondHD';
  }

  protected processTorrentTitle() {
    let title = this.info!.title;
    if (this.info!.videoType === 'dvd') {
      title = this.buildDVDTitle(this.info!);
    }
    this.info!.title = title;
  }

  protected fillCategory() {
    const { category, videoType, size } = this.info!;
    const isBluray = videoType.match(/bluray/i);
    // videoType和category交换
    this.info!.category = videoType;
    this.info!.videoType = category;
    // BHD需要细分蓝光类型
    if (isBluray || videoType === 'dvd') {
      let bdType = getBDTypeBasedOnSize(size);
      if (videoType === 'uhdbluray' && bdType === 'BD50') {
        bdType = 'UHD50';
      }
      this.info!.category = bdType || '';
    }
    super.fillCategory();
  }

  protected processDescription() {
    let { description, sourceSite, originalDescription, screenshots } =
      this.info!;
    if (sourceSite === 'PTP') {
      description = buildPTPDescription(this.info!);
    } else if (sourceSite.match(/BeyondHD|UHDBits/)) {
      description = originalDescription || '';
    } else {
      description = this.buildDescription();
    }
    if (screenshots.length > 0) {
      screenshots.forEach((img) => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\](\n*)?`);
        if (description.match(regStr)) {
          description = description.replace(regStr, (_, p2) => {
            return `[url=${p2}][img=350x350]${p2}[/img][/url]\n`;
          });
        }
      });
    }
    this.info!.description = description;
  }

  private buildDescription() {
    let { sourceSiteType, description, mediaInfos, comparisons, screenshots } =
      this.info!;
    if (this.isChineseTacker(sourceSiteType)) {
      description = filterNexusDescription(description, screenshots);
    }
    description = description
      .replace(`[quote]${mediaInfos?.[0] ?? ''}[/quote]`, '')
      .replace(/\[url.*\[\/url\]/g, '')
      .replace(/\[img.*\[\/img\]/g, '');
    if (comparisons && comparisons.length > 0) {
      for (const comparison of comparisons) {
        description += `\n${comparison.reason}[comparison=${comparison.title}]\n${comparison.imgs.join('\n')}\n[/comparison]\n\n`;
      }
    }
    if (screenshots.length > 0) {
      description += `${screenshots.map((v) => `[img]${v}[/img]`).join('\n')}\n\n`;
    }
    return description.trim();
  }

  fill(info: TorrentInfo.Info) {
    this.info = info;
    this.fillTorrentTitle();
    this.disableTorrentChange();
    this.fillIMDb();
    this.fillTMDBId();
    this.selectTag();
    this.fillDescription();
    this.fillMediaInfo(info.description);
    this.fillCategory();
    this.fillRemainingInfo();
    this.fillTorrentFile();
  }

  private buildDVDTitle(info: TorrentInfo.Info) {
    const { movieName, movieAkaName, year, mediaInfos, size, audioCodec } =
      info;
    const mediaInfo = mediaInfos?.[0] ?? '';
    const scanType = mediaInfo.includes('NTSC') ? 'NTSC' : 'PAL';
    const dvdType = getBDTypeBasedOnSize(size);
    const audioChannelNumber =
      mediaInfo.match(/Channel\(s\)\s+:\s+(\d)/)?.[1] || '2';
    const audio = audioCodec === 'ac3' ? 'dd' : audioCodec;
    const audioName = `${audio?.toUpperCase()}${audioChannelNumber === '6' ? '5.1' : `${audioChannelNumber}.0`}`;
    const akaName = movieAkaName ? ` AKA ${movieAkaName} ` : ' ';
    return `${movieName}${akaName}${year} ${scanType} ${dvdType} ${audioName}`;
  }

  private fillTMDBId() {
    const imdbId = getIdByIMDbUrl(this.info!.imdbUrl || '');
    getTMDBDataByIMDBId(imdbId).then((data) => {
      $(this.siteInfo.tmdb.selector).val(data.id);
    });
  }

  private selectTag() {
    type Tag = keyof typeof this.bhdSiteInfo.targetInfo.editionTags;
    const editionTags = Object.keys(this.info!.tags)
      .map(
        (tag) =>
          this.info!.tags[tag as keyof TorrentInfo.MediaTags] &&
          this.bhdSiteInfo.targetInfo.editionTags[tag as Tag],
      )
      .filter(Boolean);
    // Edition Select
    const editionOption = Array.from($('select[name="edition"] option')).map(
      (opt) => $(opt).attr('value'),
    );
    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        setTimeout(() => {
          document
            .querySelector(`.bhd-tag #${tag}`)
            ?.dispatchEvent(new Event('click'));
        }, 0);
        if (tag && editionOption.includes(tag)) {
          $('select[name="edition"]').val(tag);
        }
      }
    }
  }
}

registry.register(new BeyondHD());
