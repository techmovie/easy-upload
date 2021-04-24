export default (info) => {
  const { description, doubanInfo } = info;
  const fullDescription = description + doubanInfo;
  const imdbRank = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)?.[1] ?? '';
  $('#upload-imdb').val(imdbRank);
  const originalName = fullDescription.match(/(片\s+名)\s+(.+)?/)?.[2] ?? '';
  const translateName = fullDescription.match(/(译\s+名)\s+(.+)/)?.[2]?.split('/')?.[0] ?? '';
  const summary = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)?.[2]?.split('/')?.[0] ?? '';
  let chineseName = originalName;
  if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
    chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : originalName;
  }
  $('#title_chs').val(chineseName);
  $('#upload_introduction').val(summary);
};
