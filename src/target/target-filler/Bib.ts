import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import $ from 'jquery';

class Bib extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'Bib';
  }

  fill(info: TorrentInfo.Info) {
    this.info = info;
    if (!this.info || !this.info.doubanBookInfo) return;
    const {
      year,
      pager,
      translator,
      author,
      publisher,
      ISBN,
      book_intro: intro,
      poster,
    } = this.info.doubanBookInfo;
    $('#AuthorsField').val(author.join(','));
    $('#PublishersField').val(publisher);
    $('#IsbnField').val(ISBN);
    $('#YearField').val(year);
    $('#PagesField').val(pager);
    $('#LanguageField').val('17');
    $('#inputFileID').replaceWith(
      '<textarea name="DescriptionField" id="DescriptionField" rows="15" cols="90"></textarea>',
    );
    $('#TranslatorsField').val(translator.join(','));
    $('#DescriptionField').val(intro);
    $('#ImageField').val(poster);
    const event = new Event('change');
    document.getElementById('DescriptionField')?.dispatchEvent(event);
    this.fillTorrentFile();
  }
}

registry.register(new Bib());
