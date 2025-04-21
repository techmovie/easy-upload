import $ from 'jquery';

export default (info: TorrentInfo.Info) => {
  if (!info.doubanBookInfo) {
    return;
  }
  const {
    year,
    pager,
    translator,
    author,
    publisher,
    ISBN,
    book_intro: intro,
    poster,
  } = info.doubanBookInfo;
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
};
