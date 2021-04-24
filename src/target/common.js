const getScreenshotsBBCode = (imgArray) => {
  return imgArray.map(img => {
    if (img.match(/\[url=.+\]/i)) {
      return img;
    }
    return `[img]${img}[/img]`;
  });
};
// 获取制作组名称
const getTeamName = (info) => {
  const teamMatch = info.title.match(/-([^-]+)$/);
  let teamName = teamMatch?.[1]?.replace(/-/g, '')?.split('@') ?? '';
  if (teamName) {
    teamName = teamName.length > 1 ? teamName[1] : teamName[0];
  } else {
    teamName = 'other';
  }
  return teamName;
};
export {
  getScreenshotsBBCode,
  getTeamName,
};
