type BBCodeTagsAccumulator = {
  openingTags: string[];
  closingTags: string[];
};

type SiteType = string;
type SiteMatch = string | RegExp;

interface BBCodeConverterResult {
  content?: string;
  openTag?: string;
  closeTag?: string;
}

export class HTMLToBBCodeConverter {
  private readonly siteInfo: { siteType: SiteType; siteName: string };

  constructor(siteInfo: { siteType: SiteType; siteName: string }) {
    this.siteInfo = siteInfo;
  }

  /**
   * Check if the site matches the given site match
   *
   * @private
   * @param {SiteMatch} siteMatch
   * @returns {boolean}
   */
  private isMatchingSite(siteMatch: SiteMatch): boolean {
    const { siteName } = this.siteInfo;

    if (typeof siteMatch === 'string') {
      return siteName === siteMatch;
    }
    return !!siteName.match(siteMatch);
  }

  /**
   * Check if the text is a special control text (should be ignored)
   *
   * @private
   * @param {string} text
   * @returns {boolean}
   */
  private isSpecialControlText(text: string): boolean {
    return !!text
      .trim()
      .match(
        /^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\]|\[Show\])/,
      );
  }

  /**
   * Convert RGB color to HEX color
   *
   * @private
   * @param {string} rgb
   * @returns {string}
   */
  private convertRgbToHex = (rgb: string): string => {
    const rgbMatch = rgb?.match(
      /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/i,
    );

    if (!rgbMatch || rgbMatch.length < 4) {
      return '';
    }

    const hexComponents = rgbMatch.slice(1, 4).map((component) => {
      return `0${parseInt(component, 10).toString(16)}`.slice(-2);
    });

    return `#${hexComponents.join('')}`;
  };

  /**
   * Normalize the color format
   *
   * @private
   * @param {string} color
   * @returns {string}
   */
  private normalizeColorFormat(color: string): string {
    return /rgba?/.test(color) ? this.convertRgbToHex(color) : color;
  }

  /**
   * Add BBCode tags to the accumulator
   *
   * @private
   * @param {BBCodeTagsAccumulator} accumulator
   * @param {string | null} openTag
   * @param {string | null
   * @returns {void}
   */
  private addBBCodeTags(
    accumulator: BBCodeTagsAccumulator,
    openTag: string | null,
    closeTag: string | null = null,
  ): void {
    if (openTag !== null) accumulator.openingTags.push(openTag);
    if (closeTag !== null) accumulator.closingTags.unshift(closeTag);
  }

  /**
   * Convert image element to BBCode
   *
   * @private
   * @param {HTMLImageElement} imgElement
   * @returns {string}
   */
  private convertImageToBBCode(imgElement: HTMLImageElement): string {
    const { src, title } = imgElement;
    const dataSrc =
      imgElement.getAttribute('data-src') ||
      imgElement.getAttribute('data-echo');

    // emoji
    if (title === ':m:') {
      return ':m:';
    }

    const imgUrl = this.determineImageUrl(src, dataSrc);
    if (!imgUrl) return '';

    return `[img]${imgUrl}[/img]`;
  }

  /**
   * Determine the image URL
   *
   * @private
   * @param {string} src
   * @param {string | null} dataSrc
   * @returns {string}
   */
  private determineImageUrl(src: string, dataSrc: string | null): string {
    if (dataSrc) {
      return dataSrc.match(/(http(s)?:)?\/\//)
        ? dataSrc
        : `${location.origin}/${dataSrc}`;
    }

    if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
      return src;
    }
    return '';
  }

  /**
   * Convert anchor element to BBCode
   *
   * @private
   * @param {HTMLAnchorElement} anchorElement
   * @returns {BBCodeConverterResult}
   */
  private convertLinkToBBCode(
    anchorElement: HTMLAnchorElement,
  ): BBCodeConverterResult {
    const { href, textContent } = anchorElement;
    if (!href || href.length === 0) {
      return {};
    }

    if (this.isMatchingSite('HDSpace')) {
      const div = anchorElement.querySelector('div');
      if (div && div.id) {
        const img = div.querySelector('img');
        if (img) {
          const imgUrl = img.getAttribute('src');
          return {
            content: `[url=${href}][img]${imgUrl}[/img][/url]`,
          };
        }
      }
    }

    // Ignore JavaScript links or "show" links on specific sites
    if (
      href.match(/javascript:void/) ||
      (textContent === 'show' && this.isMatchingSite('HDT'))
    ) {
      return {};
    }

    return {
      openTag: `[url=${href}]`,
      closeTag: '[/url]',
    };
  }

  /**
   * handle special cases for div element
   *
   * @private
   * @param {HTMLElement} element
   * @param {BBCodeTagsAccumulator} accumulator
   * @returns {(string | null)}
   */
  private handleSpecialDivElement(
    element: HTMLElement,
    accumulator: BBCodeTagsAccumulator,
  ): string | null {
    const { className, id } = element;
    const { siteType } = this.siteInfo;
    const addTags = this.addBBCodeTags.bind(this, accumulator);

    if (className === 'codemain') {
      if (element.children.length > 0) {
        addTags('\n[quote]', '[/quote]');
        return null;
      }
      return '';
    }

    if (className === 'hidden' && this.isMatchingSite('HDT')) {
      addTags('\n[quote]', '[/quote]');
      return null;
    }

    if (className.match('spoiler') && this.isMatchingSite('KG')) {
      if (className === 'spoiler-content') {
        addTags('\n[quote]', '[/quote]');
      } else if (className === 'spoiler-header') {
        return '';
      }
      return null;
    }

    if (this.isMatchingSite('BeyondHD')) {
      if (className === 'spoilerChild') {
        const firstChildTag = element.children[0]?.tagName?.toUpperCase();
        if (firstChildTag === 'BLOCKQUOTE' || firstChildTag === 'PRE') {
          addTags('\n', '');
        } else {
          addTags('\n[quote]', '[/quote]');
        }
      } else if (id === 'screenMain') {
        return '\n';
      } else if (className === 'spoilerHide') {
        return '';
      }
      return null;
    }

    if (siteType === 'AvistaZ') {
      if (className === 'spoiler-text') {
        addTags('\n[quote]', '[/quote]');
        return null;
      }
      if (className === 'spoiler-toggle') {
        return '';
      }
    }

    if (className.match(/codetop|highlight/)) {
      return '';
    }

    addTags('\n', '\n');
    return null;
  }

  /**
   * handle special cases for TD element
   *
   * @private
   * @param {BBCodeTagsAccumulator} accumulator
   * @returns {(string | null)}
   */
  private handleTDElement(accumulator: BBCodeTagsAccumulator): string | null {
    const { siteType } = this.siteInfo;
    const addTags = this.addBBCodeTags.bind(this, accumulator);

    if (
      this.isMatchingSite(/^(TTG|HDBits|KG|HDSpace)/) ||
      this.isMatchingSite('HDT') ||
      siteType === 'UNIT3D'
    ) {
      addTags('[quote]', '[/quote]');
    } else if (this.isMatchingSite('EMP')) {
      addTags('');
    } else if (this.isMatchingSite('PTer')) {
      addTags(null, null);
    } else {
      return '';
    }

    return null;
  }

  /**
   * handle BR element
   *
   * @private
   * @param {BBCodeTagsAccumulator} accumulator
   * @returns {void}
   */
  private handleBRElement(accumulator: BBCodeTagsAccumulator): void {
    const { siteType } = this.siteInfo;
    const siteName = this.siteInfo.siteName;
    const addTags = this.addBBCodeTags.bind(this, accumulator);

    if (
      (siteType === 'NexusPHP' && siteName !== 'OurBits') ||
      siteName?.match(/^(UHDBits|HDBits|BTN)/)
    ) {
      addTags('');
    } else {
      addTags('\n');
    }
  }

  /**
   * handle inline styles
   *
   * @private
   * @param {HTMLElement} element
   * @param {BBCodeTagsAccumulator} accumulator
   * @returns {void}
   */
  private handleInlineStyles(
    element: HTMLElement,
    accumulator: BBCodeTagsAccumulator,
  ): void {
    const { style } = element;
    const addTags = this.addBBCodeTags.bind(this, accumulator);

    if (style.textAlign) {
      const alignment = style.textAlign.toUpperCase();
      if (alignment === 'LEFT') addTags('[left]', '[/left]');
      else if (alignment === 'RIGHT') addTags('[right]', '[/right]');
      else if (alignment === 'CENTER') addTags('[center]', '[/center]');
    }

    if (style.fontWeight === 'bold' || parseInt(style.fontWeight, 10) >= 600) {
      addTags('[b]', '[/b]');
    }

    if (style.fontStyle === 'italic') {
      addTags('[i]', '[/i]');
    }

    if (
      style.textDecoration === 'underline' ||
      style.textDecoration === 'overline'
    ) {
      addTags('[u]', '[/u]');
    }

    if (style.textDecoration === 'line-through') {
      addTags('[s]', '[/s]');
    }

    if (style.color && style.color.trim() !== '') {
      addTags(`[color=${this.normalizeColorFormat(style.color)}]`, '[/color]');
    }
  }

  /**
   * handle element by tag name
   *
   * @private
   * @param {string} tagName
   * @param {HTMLElement} element
   * @param {BBCodeTagsAccumulator} accumulator
   * @returns {(string | null)}
   */
  private handleElementByTagName(
    tagName: string,
    element: HTMLElement,
    accumulator: BBCodeTagsAccumulator,
  ): string | null {
    const addTags = this.addBBCodeTags.bind(this, accumulator);
    const { siteType } = this.siteInfo;

    switch (tagName) {
      case 'SCRIPT':
        return '';

      case 'UL':
        addTags(null, null);
        break;

      case 'OL':
        addTags('[list=1]', '[/list]');
        break;

      case 'LI': {
        const { className } = element;
        if (siteType === 'UNIT3D' && className) {
          return `[quote]${element.textContent?.trim()}[/quote]`;
        }
        addTags('[*]', '\n');
        break;
      }

      case 'B':
        addTags('[b]', '[/b]');
        break;

      case 'U':
        addTags('[u]', '[/u]');
        break;

      case 'I':
        addTags('[i]', '[/i]');
        break;

      case 'DIV':
        return this.handleSpecialDivElement(element, accumulator);

      case 'P':
        addTags('\n');
        break;

      case 'BR':
        this.handleBRElement(accumulator);
        break;

      case 'SPAN': {
        const { className } = element;
        if (className?.match(/size/)) {
          const matchSize = className.match(/size(\d)/)?.[1] ?? '';
          if (matchSize) {
            addTags(`[size=${matchSize}]`, '[/size]');
          }
        } else {
          addTags(null, null);
        }
        break;
      }

      case 'BLOCKQUOTE':
      case 'PRE':
      case 'FIELDSET':
        addTags('[quote]', '[/quote]');
        break;

      case 'CENTER':
        addTags('[center]', '[/center]');
        break;

      case 'TD':
        return this.handleTDElement(accumulator);

      case 'IMG':
        return this.convertImageToBBCode(element as HTMLImageElement);

      case 'FONT': {
        const fontElement = element as HTMLFontElement;
        if (fontElement.color) {
          addTags(
            `[color=${this.normalizeColorFormat(fontElement.color)}]`,
            '[/color]',
          );
        }
        if (fontElement.size) {
          addTags(`[size=${fontElement.size}]`, '[/size]');
        }
        break;
      }

      case 'A': {
        const result = this.convertLinkToBBCode(element as HTMLAnchorElement);
        if (result.content) return result.content;
        if (result.openTag) addTags(result.openTag, result.closeTag);
        if (Object.keys(result).length < 1) return '';
        break;
      }

      case 'H1':
        addTags('[b][size="7"]', '[/size][/b]\n');
        break;

      case 'H2':
        addTags('[b][size="6"]', '[/size][/b]\n');
        break;

      case 'H3':
        addTags('[b][size="5"]', '[/size][/b]\n');
        break;

      case 'H4':
        addTags('[b][size="4"]', '[/size][/b]\n');
        break;

      case 'STRONG':
        addTags('[b]', '[/b]');
        break;

      case 'TABLE': {
        if (this.isMatchingSite('PTer') && element.className === 'table') {
          return '';
        }
        addTags('');
        break;
      }

      case 'TH':
        addTags('');
        break;

      default:
        addTags(null, null);
    }

    return null;
  }

  /**
   * Convert HTML node to BBCode
   *
   * @param {Element | ChildNode} node
   * @returns {string}
   */
  public convert(node: Element | ChildNode): string {
    if (node.nodeType === 3) {
      // text node
      // only the textContent of document node could be null, which is not possible here
      const textContent = node.textContent as string;
      if (this.isSpecialControlText(textContent)) {
        return '';
      }
      return textContent;
    }

    if (node.nodeType !== 1) {
      return '';
    }

    const element = node as HTMLElement;
    const tagName = element.tagName.toUpperCase();
    const accumulator: BBCodeTagsAccumulator = {
      openingTags: [],
      closingTags: [],
    };

    const specialTagResult = this.handleElementByTagName(
      tagName,
      element,
      accumulator,
    );
    if (specialTagResult !== null) {
      return specialTagResult;
    }

    this.handleInlineStyles(element, accumulator);

    const bbCodeParts: string[] = [];
    element.childNodes.forEach((childNode) => {
      const childCode = this.convert(childNode);
      if (childCode) {
        bbCodeParts.push(childCode);
      }
    });

    return accumulator.openingTags
      .concat(bbCodeParts)
      .concat(accumulator.closingTags)
      .join('');
  }
}

export class NetworkError extends Error {
  public readonly status?: number;
  public readonly statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.statusText = statusText;
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}
