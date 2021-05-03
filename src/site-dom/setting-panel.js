import { $t, showNotice } from '../common';
import {
  PT_SITE,
  TORRENT_INFO, SORTED_SITE_KEYS,
} from '../const';
// 设置面板相关
const openSettingPanel = () => {
  const targetSitesEnabled = GM_getValue('easy-seed.enabled-target-sites') === undefined
    ? []
    : JSON.parse(GM_getValue('easy-seed.enabled-target-sites'));
  const batchSeedSiteEnabled = GM_getValue('easy-seed.enabled-batch-seed-sites') === undefined
    ? []
    : JSON.parse(GM_getValue('easy-seed.enabled-batch-seed-sites'));
  const searchSitesEnabled = GM_getValue('easy-seed.enabled-search-site-list') === undefined
    ? []
    : JSON.parse(GM_getValue('easy-seed.enabled-search-site-list'));
  const transferImgClosed = GM_getValue('easy-seed.transfer-img-closed') === undefined
    ? ''
    : GM_getValue('easy-seed.transfer-img-closed');
  const siteFaviconClosed = GM_getValue('easy-seed.site-favicon-closed') === undefined
    ? ''
    : GM_getValue('easy-seed.site-favicon-closed');
  const ptpImgApiKey = GM_getValue('easy-seed.ptp-img-api-key') === undefined
    ? ''
    : GM_getValue('easy-seed.ptp-img-api-key');
  const targetSiteList = SORTED_SITE_KEYS.map((siteName, index) => {
    if (PT_SITE[siteName].asTarget) {
      const checked = (targetSitesEnabled.includes(siteName)) ? 'checked' : '';
      return `<li>
      <label><input name="target-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
    }
    return '';
  });
  const batchSeedSiteList = SORTED_SITE_KEYS.map((siteName, index) => {
    if (PT_SITE[siteName].asTarget) {
      const checked = (batchSeedSiteEnabled.includes(siteName)) ? 'checked' : '';
      return `<li>
      <label><input name="batch-seed-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
    }
    return '';
  });
  const searchSiteList = SORTED_SITE_KEYS.map(siteName => {
    const checked = (searchSitesEnabled.includes(siteName)) ? 'checked' : '';
    return `<li>
      <label><input name="search-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
  });

  const panelHtml = `
  <div id="easy-seed-setting-panel" class="easy-seed-setting-panel">
    <div class="panel-content-wrap">
      <div class="panel-content">
        <h3>${$t('转种站点启用')}</h3>
        <section class="site-enable-setting">
            <ul class="target-sites-enable-list" >
              ${targetSiteList.join('')}
            </ul>
          </section>
        <h3>${$t('批量转种启用')}</h3>
        <i>${$t('一键批量转发到以下选中的站点')}</i>
        <section class="site-enable-setting">
          <ul class="batch-seed-sites-enable-list">
              ${batchSeedSiteList.join('')}
          </ul>
        </section>
        <h3>${$t('站点搜索启用')}</h3>
        <section class="site-enable-setting">
          <ul class="search-sites-enable-list">
            ${searchSiteList.join('')}
          </ul>
        </section>
        <h3>${$t('图床配置')}</h3>
        <section class="site-enable-setting img-upload-setting">
        <label>
        ptpimg ApiKey:   
        <input name="ptp-img-api-key" type="text" value='${ptpImgApiKey}'/>
        <a 
        target="_blank"
        href="https://github.com/techmovie/easy-seed/wiki/%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96ptpimg%E7%9A%84apiKey"
        >
        ${$t('如何获取？')}
        </a>
        </label>
       
        </section>
        <h3>${$t('额外功能关闭')}</h3>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="transfer-img-closed" type="checkbox" ${transferImgClosed}/>${$t('关闭转缩略图功能')}</label>
        </section>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="site-favicon-closed" type="checkbox" ${siteFaviconClosed}/>${$t('关闭站点图标显示')}</label>
        </section>
      </div>
      <div class="confirm-btns">
        <button id="save-setting-btn">${$t('保存')}</button>
        <button id="cancel-setting-btn">${$t('取消')}</button>
      </div>
    </div>
  </div>
  `;
  $('body').append(panelHtml);
  $('#easy-seed-setting-panel').on('click', '#save-setting-btn', () => {
    saveSetting();
  });
  $('#easy-seed-setting-panel').on('click', '#cancel-setting-btn', () => {
    $('#easy-seed-setting-panel').remove();
  });
};
const saveSetting = () => {
  const targetSitesEnabled = [];
  const searchSitesEnabled = [];
  const batchSeedSiteEnabled = [];
  const transferImgEnabled = $("input[name='transfer-img-closed']").attr('checked') || '';
  const siteFaviconEnabled = $("input[name='site-favicon-closed']").attr('checked') || '';
  const ptpImgApiKey = $("input[name='ptp-img-api-key']").val();
  $("input[name='target-site-enabled']:checked").each(function () {
    targetSitesEnabled.push($(this).val());
  });
  $("input[name='search-site-enabled']:checked").each(function () {
    searchSitesEnabled.push($(this).val());
  });
  $("input[name='batch-seed-site-enabled']:checked").each(function () {
    batchSeedSiteEnabled.push($(this).val());
  });
  console.log(targetSitesEnabled);
  try {
    GM_setValue('easy-seed.enabled-target-sites', JSON.stringify(targetSitesEnabled));
    GM_setValue('easy-seed.enabled-search-site-list', JSON.stringify(searchSitesEnabled));
    GM_setValue('easy-seed.enabled-batch-seed-sites', JSON.stringify(batchSeedSiteEnabled));
    GM_setValue('easy-seed.transfer-img-closed', transferImgEnabled);
    GM_setValue('easy-seed.site-favicon-closed', siteFaviconEnabled);
    GM_setValue('easy-seed.ptp-img-api-key', ptpImgApiKey);
    $('#easy-seed-setting-panel').remove();
    window.location.reload();
  } catch (error) {
    showNotice({ title: $t('错误'), text: $t('保存本地站点设置失败') });
  }
};
const openBatchSeedTabs = () => {
  const batchSeedSiteEnabled = GM_getValue('easy-seed.enabled-batch-seed-sites') === undefined
    ? []
    : JSON.parse(GM_getValue('easy-seed.enabled-batch-seed-sites'));
  if (batchSeedSiteEnabled.length === 0) {
    showNotice({ title: $t('错误'), text: $t('请先设置群转列表') });
    return false;
  }
  const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
  SORTED_SITE_KEYS.forEach((siteName, index) => {
    const { url, uploadPath } = PT_SITE[siteName];
    if (PT_SITE[siteName].asTarget) {
      if (batchSeedSiteEnabled.includes(siteName)) {
        GM_openInTab(url + uploadPath + '#torrentInfo=' + torrentInfo);
      }
    }
  });
  showNotice({ title: $t('成功'), text: $t('转种页面已打开，请前往对应页面操作') });
};
export {
  openSettingPanel,
  openBatchSeedTabs,
};
