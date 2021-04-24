export default (info) => {
  // eslint-disable-next-line camelcase
  const { year, pager, translator, author, publisher, ISBN, book_intro } = info.doubanBookInfo;
  $('#AuthorsField').val(author.join(','));
  $('#PublishersField').val(publisher);
  $('#IsbnField').val(ISBN);
  $('#YearField').val(year);
  $('#PagesField').val(pager);
  $('#LanguageField').val('17');
  $('#inputFileID').replaceWith('<textarea name="DescriptionField" id="DescriptionField" rows="15" cols="90"></textarea>');
  $('#TranslatorsField').val(translator.join(','));
  $('#DescriptionField').val(book_intro);
  const event = new Event('change');
  document.getElementById('DescriptionField').dispatchEvent(event);
};
