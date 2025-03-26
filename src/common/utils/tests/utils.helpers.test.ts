import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';

import { HTMLToBBCodeConverter } from '../utils.helpers';

describe('HTMLToBBCodeConverter', () => {
  let converter: HTMLToBBCodeConverter;
  let defaultSiteInfo: { siteType: string; siteName: string };

  const createElement = (
    tag: string,
    attributes = {},
    style = {},
    innerHTML = '',
  ): HTMLElement => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value as string);
    });
    Object.entries(style).forEach(([key, value]) => {
      element.style.setProperty(key, value as string);
    });
    element.innerHTML = innerHTML;
    return element;
  };
  beforeEach(() => {
    vi.clearAllMocks();
    defaultSiteInfo = { siteType: 'NexusPHP', siteName: 'Test Site' };
    converter = new HTMLToBBCodeConverter(defaultSiteInfo);
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'https://www.example.com',
      },
      writable: true,
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('basic conversion', () => {
    it('should convert text node', () => {
      const textNode = document.createTextNode('Hello, World!');
      const bbcode = converter.convert(textNode);
      expect(bbcode).toBe('Hello, World!');
    });
    it('should ignore special control text', () => {
      const textNode = document.createTextNode('Quote');
      const bbcode = converter.convert(textNode);
      expect(bbcode).toBe('');
    });
    it('should ignore for non-element, non-text node', () => {
      const comment = document.createComment('Comment');
      const bbcode = converter.convert(comment);
      expect(bbcode).toBe('');
    });
  });

  describe('HTML tags conversion', () => {
    it('should convert basic formatting tags', () => {
      // <b> tag
      const boldElement = createElement('b', {}, {}, 'Bold Text');
      expect(converter.convert(boldElement)).toBe('[b]Bold Text[/b]');

      // <i> tag
      const italicElement = createElement('i', {}, {}, 'Italic Text');
      expect(converter.convert(italicElement)).toBe('[i]Italic Text[/i]');

      // <u> tag
      const underlineElement = createElement('u', {}, {}, 'Underline Text');
      expect(converter.convert(underlineElement)).toBe('[u]Underline Text[/u]');

      // <strong> tag
      const strongElement = createElement('strong', {}, {}, 'Strong Text');
      expect(converter.convert(strongElement)).toBe('[b]Strong Text[/b]');

      // <script> tag
      const scriptElement = createElement('script', {}, {}, 'Script Text');
      expect(converter.convert(scriptElement)).toBe('');

      // <p> tag
      const pElement = createElement('p', {}, {}, 'Paragraph Text');
      expect(converter.convert(pElement)).toBe('\nParagraph Text');

      // <th> tag
      const thElement = createElement('th', {}, {}, 'Table Header');
      expect(converter.convert(thElement)).toBe('Table Header');
    });
    it('should convert headings', () => {
      const h1Element = createElement('h1', {}, {}, 'Heading 1');
      expect(converter.convert(h1Element)).toBe(
        '[b][size="7"]Heading 1[/size][/b]\n',
      );

      const h2Element = createElement('h2', {}, {}, 'Heading 2');
      expect(converter.convert(h2Element)).toBe(
        '[b][size="6"]Heading 2[/size][/b]\n',
      );

      const h3Element = createElement('h3', {}, {}, 'Heading 3');
      expect(converter.convert(h3Element)).toBe(
        '[b][size="5"]Heading 3[/size][/b]\n',
      );

      const h4Element = createElement('h4', {}, {}, 'Heading 4');
      expect(converter.convert(h4Element)).toBe(
        '[b][size="4"]Heading 4[/size][/b]\n',
      );
    });

    it('should convert lists', () => {
      const ulElement = createElement(
        'ul',
        {},
        {},
        '<li>Item 1</li><li>Item 2</li>',
      );
      expect(converter.convert(ulElement)).toBe('[*]Item 1\n[*]Item 2\n');

      const olElement = createElement(
        'ol',
        {},
        {},
        '<li>Item 1</li><li>Item 2</li>',
      );
      expect(converter.convert(olElement)).toBe(
        '[list=1][*]Item 1\n[*]Item 2\n[/list]',
      );

      const ulElement1 = createElement('ul', {});
      expect(converter.convert(ulElement1)).toBe('');
    });

    it('should convert quote-like elements', () => {
      // <blockquote> tag
      const blockquoteElement = createElement(
        'blockquote',
        {},
        {},
        'blockquote text',
      );
      expect(converter.convert(blockquoteElement)).toBe(
        '[quote]blockquote text[/quote]',
      );

      // <pre> tag
      const preElement = createElement('pre', {}, {}, 'Pre Text');
      expect(converter.convert(preElement)).toBe('[quote]Pre Text[/quote]');

      // <FIELDSET> tag
      const fieldsetElement = createElement(
        'fieldset',
        {},
        {},
        'fieldset text',
      );
      expect(converter.convert(fieldsetElement)).toBe(
        '[quote]fieldset text[/quote]',
      );
    });

    it('should convert center element', () => {
      const centerElement = createElement('center', {}, {}, 'centered text');
      expect(converter.convert(centerElement)).toBe(
        '[center]centered text[/center]',
      );
    });
  });

  describe('inline style conversion', () => {
    it('should convert text alignment styles', () => {
      const divElement = createElement(
        'div',
        {},
        { 'text-align': 'center' },
        'Centered Text',
      );
      expect(converter.convert(divElement)).toBe(
        '\n[center]Centered Text[/center]\n',
      );

      const spanElement = createElement(
        'div',
        {},
        { 'text-align': 'right' },
        'Right Text',
      );
      expect(converter.convert(spanElement)).toBe(
        '\n[right]Right Text[/right]\n',
      );

      const pElement = createElement(
        'div',
        {},
        { 'text-align': 'left' },
        'Left Text',
      );
      expect(converter.convert(pElement)).toBe('\n[left]Left Text[/left]\n');
    });

    it('should convert font styles', () => {
      const fontElement = createElement(
        'font',
        { color: 'red' },
        {},
        'red text',
      );
      expect(converter.convert(fontElement)).toBe(
        '[color=red]red text[/color]',
      );

      const fontElement1 = createElement(
        'font',
        { size: '5' },
        {},
        'size 5 text',
      );
      expect(converter.convert(fontElement1)).toBe(
        '[size=5]size 5 text[/size]',
      );

      const fontElement2 = createElement('font', { color: 'rgba(0,0,0,0)' });
      expect(converter.convert(fontElement2)).toBe('[color=#000000][/color]');

      const fontElement3 = createElement('font', { color: 'rgb(0,0,0)' });
      expect(converter.convert(fontElement3)).toBe('[color=#000000][/color]');

      const fontElement4 = createElement('font', { color: 'rgb(0,0)' });
      expect(converter.convert(fontElement4)).toBe('[color=][/color]');
    });

    it('should convert inline styles', () => {
      const spanElement = createElement(
        'span',
        {},
        { 'font-weight': 'bold' },
        'bold text',
      );
      expect(converter.convert(spanElement)).toBe('[b]bold text[/b]');

      const spanElement1 = createElement(
        'span',
        {},
        { 'font-weight': '700' },
        'bold text',
      );
      expect(converter.convert(spanElement1)).toBe('[b]bold text[/b]');

      const spanElement2 = createElement(
        'span',
        {},
        { 'font-weight': '500' },
        '500 weight non-bold text',
      );
      expect(converter.convert(spanElement2)).toBe('500 weight non-bold text');

      const spanElement3 = createElement(
        'span',
        {},
        { 'font-style': 'italic' },
        'italic text',
      );
      expect(converter.convert(spanElement3)).toBe('[i]italic text[/i]');

      const spanElement4 = createElement(
        'span',
        {},
        { 'text-decoration': 'underline' },
        'underline text',
      );
      expect(converter.convert(spanElement4)).toBe('[u]underline text[/u]');

      const spanElement5 = createElement(
        'span',
        {},
        { 'text-decoration': 'overline' },
        'overline text',
      );
      expect(converter.convert(spanElement5)).toBe('[u]overline text[/u]');

      const spanElement6 = createElement(
        'span',
        {},
        { 'text-decoration': 'line-through' },
        'line-through text',
      );
      expect(converter.convert(spanElement6)).toBe('[s]line-through text[/s]');

      const spanElement7 = createElement(
        'span',
        {},
        { color: 'red' },
        'red text',
      );
      expect(converter.convert(spanElement7)).toBe(
        '[color=red]red text[/color]',
      );
    });
  });
  describe('special elements conversion', () => {
    it('should convert anchor elements', () => {
      const anchorElement = createElement(
        'a',
        { href: 'https://www.example.com/test' },
        {},
        'example link',
      );
      expect(converter.convert(anchorElement)).toBe(
        '[url=https://www.example.com/test]example link[/url]',
      );

      const anchorElement1 = createElement(
        'a',
        { href: 'javascript:void(0)' },
        {},
        'js Link',
      );
      expect(converter.convert(anchorElement1)).toBe('');

      const anchorElement2 = createElement('a', {});
      expect(converter.convert(anchorElement2)).toBe('');
    });

    it('should convert image elements', () => {
      const imgElement = createElement('img', {
        src: 'https://www.example.com/test.jpg',
      });
      expect(converter.convert(imgElement)).toBe(
        '[img]https://www.example.com/test.jpg[/img]',
      );

      const imgElement1 = createElement('img', {
        'data-src': 'https://www.example.com/test.jpg',
      });
      expect(converter.convert(imgElement1)).toBe(
        '[img]https://www.example.com/test.jpg[/img]',
      );

      const imgElement2 = createElement('img', { title: ':m:' });
      expect(converter.convert(imgElement2)).toBe(':m:');

      const imgElement3 = createElement('img', { 'data-src': 'image.jpg' });
      expect(converter.convert(imgElement3)).toBe(
        '[img]https://www.example.com/image.jpg[/img]',
      );

      const imgElement4 = createElement('img', { src: 'jinzhuan' });
      expect(converter.convert(imgElement4)).toBe('');
    });

    it('should convert div elements', () => {
      const divElement = createElement(
        'div',
        { class: 'codemain' },
        {},
        '<span>code text</span>',
      );
      expect(converter.convert(divElement)).toBe('\n[quote]code text[/quote]');

      const divElement1 = createElement(
        'div',
        { class: 'codemain' },
        {},
        'div text',
      );
      expect(converter.convert(divElement1)).toBe('');

      const divElement2 = createElement(
        'div',
        { class: 'codetop' },
        {},
        'div text',
      );
      expect(converter.convert(divElement2)).toBe('');
    });

    it('should convert span elements', () => {
      const spanElement = createElement(
        'span',
        { class: 'size5' },
        {},
        'span text',
      );
      expect(converter.convert(spanElement)).toBe('[size=5]span text[/size]');

      const spanElement1 = createElement(
        'span',
        { class: 'size' },
        {},
        'span text',
      );
      expect(converter.convert(spanElement1)).toBe('span text');
    });

    it('should convert table elements', () => {
      const tableElement = createElement(
        'table',
        {},
        {},
        '<tr><td>table text</td></tr>',
      );
      expect(converter.convert(tableElement)).toBe('');
    });

    it('should convert br elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'Test',
        siteName: 'Test Site',
      });
      const brElement = createElement('br', {});
      expect(converter.convert(brElement)).toBe('\n');
    });
  });

  describe('site-specific conversion', () => {
    it('should convert UNIT3D site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'UNIT3D',
        siteName: 'Test Site',
      });
      const liElement = createElement(
        'li',
        { class: 'spoiler' },
        {},
        'li item text',
      );
      expect(converter.convert(liElement)).toBe('[quote]li item text[/quote]');

      const liElement1 = createElement('li', {}, {}, 'li item text');
      expect(converter.convert(liElement1)).toBe('[*]li item text\n');

      const tdElement = createElement('td', {}, {}, 'td text');
      expect(converter.convert(tdElement)).toBe('[quote]td text[/quote]');
    });

    it('should convert NexusPHP site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'NexusPHP',
        siteName: 'Test Site',
      });
      const brElement = createElement('br', {});
      expect(converter.convert(brElement)).toBe('');
    });

    it('should handle HDT site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'HDT',
        siteName: 'HDT',
      });
      const anchorElement = createElement(
        'a',
        { href: 'http://example.com' },
        {},
        'show',
      );
      expect(converter.convert(anchorElement)).toBe('');

      const divElement = createElement(
        'div',
        { class: 'hidden' },
        {},
        'quote text',
      );
      expect(converter.convert(divElement)).toBe('\n[quote]quote text[/quote]');

      const tdElement = createElement('td', {}, {}, 'quote text');
      expect(converter.convert(tdElement)).toBe('[quote]quote text[/quote]');
    });

    it('should handle BeyondHD site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'BeyondHD',
        siteName: 'BeyondHD',
      });
      const divElement = createElement(
        'div',
        { class: 'spoilerChild' },
        {},
        'quote text',
      );
      expect(converter.convert(divElement)).toBe('\n[quote]quote text[/quote]');

      const divElement1 = createElement(
        'div',
        { class: 'spoilerChild' },
        {},
        '<pre>quote text</pre>',
      );
      expect(converter.convert(divElement1)).toBe(
        '\n[quote]quote text[/quote]',
      );

      const divElement3 = createElement(
        'div',
        { class: 'spoilerChild' },
        {},
        '<blockquote>quote text</blockquote>',
      );
      expect(converter.convert(divElement3)).toBe(
        '\n[quote]quote text[/quote]',
      );

      const divElement4 = createElement(
        'div',
        { id: 'screenMain' },
        {},
        'div text',
      );
      expect(converter.convert(divElement4)).toBe('\n');

      const divElement5 = createElement(
        'div',
        { class: 'spoilerHide' },
        {},
        'div text',
      );
      expect(converter.convert(divElement5)).toBe('');
    });

    it('should handle HDSpace site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'HDSpace',
        siteName: 'HDSpace',
      });
      const originalUrl = 'https://example.com/original.jpg';
      const thumbUrl = 'https://example.com/thumb.jpg';
      const anchorElement = createElement(
        'a',
        { href: originalUrl },
        {},
        `<div id="randomID"><img src="${thumbUrl}"></div>`,
      );
      expect(converter.convert(anchorElement)).toBe(
        `[url=${originalUrl}][img]${thumbUrl}[/img][/url]`,
      );

      const tdElement = createElement('td', {}, {}, 'quote text');
      expect(converter.convert(tdElement)).toBe('[quote]quote text[/quote]');
    });

    it('should handle PTer site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'NexusPHP',
        siteName: 'PTer',
      });
      const tdElement = createElement('td', {}, {}, 'td text');
      expect(converter.convert(tdElement)).toBe('td text');

      const tableElement = createElement(
        'table',
        { class: 'table' },
        {},
        'quote text',
      );
      expect(converter.convert(tableElement)).toBe('');
    });

    it('should handle KG site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({ siteType: 'KG', siteName: 'KG' });
      const divElement = createElement(
        'div',
        { class: 'spoiler-content' },
        {},
        'div text',
      );
      expect(converter.convert(divElement)).toBe('\n[quote]div text[/quote]');

      const divElement1 = createElement(
        'div',
        { class: 'spoiler-header' },
        {},
        'div text',
      );
      expect(converter.convert(divElement1)).toBe('');

      const divElement2 = createElement(
        'div',
        { class: 'spoiler' },
        {},
        'div text',
      );
      expect(converter.convert(divElement2)).toBe('div text');
    });

    it('should handle AvistaZ site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'AvistaZ',
        siteName: 'AvistaZ',
      });
      const divElement = createElement(
        'div',
        { class: 'spoiler-text' },
        {},
        'div text',
      );
      expect(converter.convert(divElement)).toBe('\n[quote]div text[/quote]');

      const divElement1 = createElement(
        'div',
        { class: 'spoiler-toggle' },
        {},
        'div text',
      );
      expect(converter.convert(divElement1)).toBe('');
    });

    it('should handle EMP site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'EMP',
        siteName: 'EMP',
      });
      const tdElement = createElement('td', {}, {}, 'td text');
      expect(converter.convert(tdElement)).toBe('td text');
    });

    it('should handle Ourbits site-specific elements', () => {
      converter = new HTMLToBBCodeConverter({
        siteType: 'NexusPHP',
        siteName: 'OurBits',
      });
      const brElement = createElement('br', {});
      expect(converter.convert(brElement)).toBe('\n');
    });
  });
  describe('complex nested elements', () => {
    it('should correctly handle nested formatting', () => {
      const nestedElement = createElement(
        'div',
        {},
        {},
        '<b>Bold <i>and italic</i></b> text',
      );
      expect(converter.convert(nestedElement)).toBe(
        '\n[b]Bold [i]and italic[/i][/b] text\n',
      );
    });

    it('should correctly handle deeply nested elements with mixed formatting', () => {
      const complexElement = createElement(
        'div',
        { class: 'container' },
        { 'text-align': 'center' },
        '<h2>Title</h2>' +
          '<p>Normal paragraph <b>with bold <a href="http://example.com/">and a link</a></b></p>' +
          '<ul><li>List item 1</li><li>List item <i>with italic</i></li></ul>' +
          '<blockquote>A quote with <span style="color: rgb(0,0,0);">colored text</span></blockquote>',
      );

      const result = converter.convert(complexElement);
      expect(result).toContain('[center]');
      expect(result).toContain('[b][size="6"]Title[/size][/b]');
      expect(result).toContain(
        '[b]with bold [url=http://example.com/]and a link[/url][/b]',
      );
      expect(result).toContain('[*]List item [i]with italic[/i]');
      expect(result).toContain(
        '[quote]A quote with [color=#000000]colored text[/color][/quote]',
      );
    });
  });
});
