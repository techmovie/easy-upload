import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { parseMedia } from '@/common';
import $ from 'jquery';

class BYR extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'BYR';
  }

  fill(info: TorrentInfo.Info): void {
    this.info = info;

    if (!this.info) return;

    this.fillBasicInfo();

    this.setupDescriptionEditor();

    this.fillOriginalTitle();

    this.extractAndFillCategoryFields();

    this.fillTorrentFile();
  }

  private fillBasicInfo(): void {
    const { subtitle, imdbUrl, doubanUrl } = this.info!;

    $(this.siteInfo.subtitle.selector).val(subtitle || '');
    $(this.siteInfo.imdb.selector).val(imdbUrl || '');
    $(this.siteInfo.douban.selector).val(doubanUrl || '');
  }

  private setupDescriptionEditor(): void {
    const { description } = this.info!;

    CKEDITOR.on('instanceReady', () => {
      CKEDITOR.instances.descr.setData(this.convertBBCodeToHtml(description));
    });
  }

  private fillOriginalTitle(): void {
    this.processTorrentTitle();
    const { title } = this.info!;
    $('#movie_ename0day').val(title);
  }

  private extractAndFillCategoryFields(): void {
    const { category } = this.info!;
    const torrentInfo = this.extractTorrentInfo();

    if (category.match(/movie/)) {
      this.fillMovieFields(torrentInfo);
    } else if (category.match(/tv/)) {
      this.fillTVFields(torrentInfo);
    } else if (category.match(/variety/)) {
      this.fillVarietyFields(torrentInfo);
    }
  }

  private extractTorrentInfo(): {
    area: string;
    originalName: string;
    translateName: string;
    movieType: string;
    language: string;
    chineseName: string;
  } {
    const { description, doubanInfo } = this.info!;
    const fullDescription = description + doubanInfo;

    let area = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
    area = area.replace(/\[\/?.+?\]/g, '');

    const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
    const translateName =
      fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';

    const movieType = fullDescription.match(/(类\s+别)\s+(.+)/)?.[2] ?? '';
    const language = fullDescription.match(/(语\s+言)\s+(.+)/)?.[2] ?? '';

    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/)
        ? translateName
        : '';
    }

    return {
      area,
      originalName,
      translateName,
      movieType,
      language,
      chineseName,
    };
  }

  private fillMovieFields(torrentInfo: {
    area: string;
    chineseName: string;
    movieType: string;
  }): void {
    const { area, chineseName, movieType } = torrentInfo;
    const { category } = this.info!;

    const regionSelector = this.determineMovieRegion(area);

    const typeMap = {
      华语: '11',
      欧洲: '12',
      北美: '13',
      亚洲: '14',
      其他: '1',
    };
    $('select[name="second_type"]').val(
      typeMap[regionSelector as keyof typeof typeMap],
    );
    $('select[name="second_type"]')[0].dispatchEvent(new Event('change'));

    const movieTypeArr = movieType.split(/\s\//);
    $('#movie_type').val(movieTypeArr.join('/'));

    fillField(
      regionSelector,
      category === 'movie' ? 'movie_country' : 'show_country',
    );

    $('#movie_cname').val(chineseName);
  }

  private determineMovieRegion(area: string): string {
    if (area.match(/华语|台|港/)) {
      return '华语';
    } else if (area.match(/日本|韩国|泰国/)) {
      return '亚洲';
    } else if (area.match(/美国|加拿大/)) {
      return '北美';
    } else if (area.match(/欧|英|法|德|俄|意|苏联|EU/)) {
      return '欧洲';
    }
    return '其他';
  }

  private fillTVFields(torrentInfo: {
    area: string;
    chineseName: string;
  }): void {
    const { area, chineseName } = torrentInfo;
    const { title, videoType, mediaInfos } = this.info!;

    const regionSelector = this.determineTVRegion(area);

    const typeMap = {
      大陆: '15',
      港台: '16',
      欧美: '17',
      日韩: '18',
      其他: '2',
    };
    $('select[name="second_type"]').val(
      typeMap[regionSelector as keyof typeof typeMap],
    );
    $('select[name="second_type"]')[0].dispatchEvent(new Event('change'));

    fillField(regionSelector, 'tv_type');

    $('#tv_ename').val(title);
    $('#cname').val(chineseName);

    const episode = title.match(/S\d+(E\d+)?/i)?.[0] ?? '';
    $('#tv_season').val(episode);

    const isBluray = !!videoType.match(/bluray/i);
    const parsedMedia = parseMedia(mediaInfos?.[0], isBluray);
    if (!parsedMedia) {
      console.warn('Failed to parse media info:', mediaInfos?.[0]);
      return;
    }
    const { format } = parsedMedia;
    fillField(format?.toUpperCase() || 'MKV', 'tv_filetype');
  }

  private determineTVRegion(area: string): string {
    if (area.match(/大陆/)) {
      return '大陆';
    } else if (area.match(/台|港/)) {
      return '港台';
    } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
      return '欧美';
    } else if (area.match(/日本|韩国/)) {
      return '日韩';
    }
    return '其他';
  }

  private fillVarietyFields(torrentInfo: {
    area: string;
    chineseName: string;
    language: string;
  }): void {
    const { area, chineseName, language } = torrentInfo;
    const { title } = this.info!;

    const regionSelector = this.determineTVRegion(area);

    const typeMap = {
      大陆: '27',
      港台: '29',
      欧美: '30',
      日韩: '28',
      其他: '5',
    };
    $('select[name="second_type"]').val(
      typeMap[regionSelector as keyof typeof typeMap],
    );
    $('select[name="second_type"]')[0].dispatchEvent(new Event('change'));

    fillField(regionSelector, 'show_country');

    $('#show_cname').val(chineseName);
    $('#show_ename').val(title);

    const languageVal = this.determineLanguage(language);
    fillField(languageVal, 'show_language');
  }

  private determineLanguage(language: string): string {
    if (language.match(/汉语/)) {
      return '国语';
    } else if (language.match(/粤/)) {
      return '粤语';
    } else if (language.match(/英语/)) {
      return '英语';
    } else if (language.match(/日语/)) {
      return '日语';
    } else if (language.match(/韩语/)) {
      return '韩语';
    }
    return '';
  }

  private convertBBCodeToHtml(bbcode: string): string {
    let html = bbcode.replace(/\[\*\]([^\n]+)/gi, '<li>$1</li>');
    html = html.replace(/(\r\n)|\n/g, '<br>');
    html = html.replace(
      /\[(quote|hide=.+?)\]/gi,
      '<fieldset><legend>引用</legend>',
    );
    html = html.replace(/\[(\/)(quote|hide)\]/gi, '<$1fieldset>');
    html = html.replace(
      /(?!\[url=(http(s)*:\/{2}.+?)\])\[img\](.+?)\[\/img]\[url\]/g,
      '<a href="$1"><img src="$2"/></a>',
    );
    html = html.replace(/\[img\](.+?)\[\/img]/g, '<img src="$1"/>');
    html = html.replace(/\[(\/)?(left|right|center)\]/gi, '<$1$2>');
    html = html.replace(/\[(\/)?b\]/gi, '<$1strong>');
    html = html
      .replace(/\[color=(.+?)\]/gi, '<span style="color: $1">')
      .replace(/\[\/color\]/g, '</span>');
    html = html
      .replace(/\[size=(.+?)\]/gi, '<font size="$1">')
      .replace(/\[\/size\]/g, '</font>');
    html = html.replace(/\[url=(.+?)\](.+?)\[\/url\]/gi, '<a href="$1">$2</a>');

    return html;
  }
}

registry.register(new BYR());
