const SiteListConfig = [
  {
    name: 'enabled-target-sites',
    class: 'target-sites-enable-list',
    title: '转种站点启用',
    key: 'targetEnabled',
  },
  {
    name: 'enabled-search-site-list',
    class: 'search-sites-enable-list',
    title: '站点搜索启用',
    key: 'searchEnabled',
  },
  {
    name: 'enabled-batch-seed-sites',
    class: 'batch-seed-sites-enable-list',
    title: '批量转种启用',
    key: 'batchEnabled',
    des: '一键批量转发到以下选中的站点',
  },
];
const FeatureSwitchList = [
  {
    name: 'quick-search-closed',
    des: '关闭快速检索',
    type: 'checkbox',
    key: 'quickSearchClosed',
  },
  {
    name: 'transfer-img-closed',
    des: '关闭转缩略图功能',
    type: 'checkbox',
    key: 'transferImgClosed',
  },
  {
    name: 'upload-img-closed',
    des: '关闭转存ptpimg功能',
    type: 'checkbox',
    key: 'uploadImgClosed',
  },
  {
    name: 'site-favicon-closed',
    des: '关闭站点图标显示',
    type: 'checkbox',
    key: 'siteFaviconClosed',
  },
  {
    name: 'thanks-quote-closed',
    des: '不显示致谢内容',
    type: 'checkbox',
    key: 'thanksQuoteClosed',
  },
  {
    name: 'douban-closed',
    des: '不显示豆瓣按钮和豆瓣链接',
    type: 'checkbox',
    key: 'doubanClosed',
  },
];
export {
  FeatureSwitchList,
  SiteListConfig,
};
