
const formatTorrentTitle = (title) => {
  // 保留5.1 H.264中间的点
  return title.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig, ' ').replace(/\.(?!(\d+))/, ' ').trim();
};

const getUrlParam = (key) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  const regArray = location.search.substr(1).match(reg);
  if (regArray) {
    return unescape(regArray[2]);
  }
  return '';
};
const getAudioCodes = (torrentInfo) => {
  const { title, mediaInfo, bdinfo } = torrentInfo;
};

// 获取副标题
const getSubTitle = (data) => {
  const titles = data.trans_title.join('/');
  const { director = [] } = data;
  const directorArray = director.map(item => {
    return replaceEngName(item.name);
  });
  // 演员只选择前两位
  const mainCast = data.cast.slice(0, 2).map(cast => {
    return replaceEngName(cast.name);
  });
  const directorStr = directorArray.length > 0 ? `|导演: ${directorArray.join(' ')}` : '';
  const castStr = mainCast.length > 0 ? `|主演:${mainCast.join(' ')}` : '';
  return titles + directorStr + castStr;
};
/*
* 替换豆瓣演员中的英文名称
* @param {any}
* @return
* */
const replaceEngName = (string) => {
  return string.replace(/\s+[A-Za-z\s]+/, '');
};

export {
  getUrlParam,
  formatTorrentTitle,
  getAudioCodes,
  replaceEngName,
  getSubTitle,
}
;
