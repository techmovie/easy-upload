import { useState } from 'preact/hooks';
import {
  CURRENT_SITE_NAME, CURRENT_SITE_INFO,
  SORTED_SITE_KEYS, PT_SITE, TORRENT_INFO, BROWSER_LANGUAGE,
} from '../const';
import {
  $t, getValue, getSize, fetch,
} from '../common';
import FunctionList from '../components/FunctionList';
import SearchList from '../components/SearchList';
import UploadSiteList from '../components/UploadSiteList';
import SettingPanel from './SettingPanel';
import ConfigSvg from '../assets/setting.svg';
import { getQuickSearchUrl } from './common';

const Container = () => {
  const [settingPanelOpen, setSettingPanelOpen] = useState(false);
  const isNexusPHP = CURRENT_SITE_INFO.siteType.match(/NexusPHP|AvistaZ/) ||
    CURRENT_SITE_NAME?.match(/BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS|MDU|LST|fearnopeer/);
  const isHDB = CURRENT_SITE_NAME === 'HDBits';
  const baseTitleClass = ['title-td'];
  const baseContentClass = ['easy-seed-td'];
  if (isNexusPHP) {
    baseTitleClass.push('rowhead', 'nowrap');
    baseContentClass.push('rowfollow');
  } else if (CURRENT_SITE_NAME === 'HDT') {
    baseTitleClass.push('detailsleft');
    baseContentClass.push('detailshash');
  } else if (CURRENT_SITE_NAME === 'HDSpace') {
    baseTitleClass.push('header');
    baseContentClass.push('lista');
  } else if (isHDB) {
    baseTitleClass.push('rowfollow', 'hdb-td');
    baseContentClass.push('rowfollow', 'hdb-td');
  }
  const openSettingPanel = () => {
    setSettingPanelOpen(true);
  };
  const closePanel = () => {
    setSettingPanelOpen(false);
  };
  const checkQuickResult = () => {
    let searchListSetting:string[] = getValue('easy-seed.enabled-search-site-list');
    if (searchListSetting.length === 0) {
      searchListSetting = SORTED_SITE_KEYS;
    }
    searchListSetting.forEach(async (site) => {
      const siteInfo = (PT_SITE[site as keyof typeof PT_SITE] as Site.SiteInfo);
      const resultConfig = siteInfo.search?.result;
      const siteUrl = siteInfo.url;
      if (resultConfig) {
        const { list, name, size, url: urlDom } = resultConfig;
        const { title, size: searchSize } = TORRENT_INFO;
        const url = getQuickSearchUrl(site);
        const domString = await fetch(url, {
          responseType: undefined,
        });

        const dom = new DOMParser().parseFromString(domString, 'text/html');
        const torrentList = $(list, dom);
        const sameTorrent = Array.prototype.find.call(torrentList, (item) => {
          let torrentName;
          if (site === 'TTG') {
            torrentName = $(item).find(name).prop('firstChild')?.textContent?.trim() ?? '';
          } else {
            torrentName = $(item).find(name).attr('title') || $(item).find(name).text();
          }
          if (site === 'TJUPT') {
            const matchArray:string[] = torrentName.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
            const realTitle = matchArray.filter(item => item.match(/\.| /))?.[0] ?? '';
            torrentName = realTitle.replace(/\[|\]/g, '');
          }
          torrentName = torrentName?.replace(/\s|\./g, '');

          const sizeBytes = getSize($(item).find(size).text());
          return torrentName === title?.replace(/\s|\./g, '') && Math.abs(sizeBytes - searchSize) < Math.pow(1024, 2) * 1000;
        });
        if (sameTorrent) {
          const url = `${siteUrl}/${$(sameTorrent).find(urlDom).attr('href')}`;
          $(`.search-list li>a[data-site=${site}]`).attr('data-url', url).css('color', '#218380');
        } else {
          $(`.search-list li>a[data-site=${site}]`).css('color', '#D81159');
        }
      }
    });
  };
  const Title = () => {
    return <h4>
      {$t('一键转种')}
      <span id="easy-seed-setting" className="easy-seed-setting-btn" />
      <ConfigSvg onClick={openSettingPanel} className='setting-svg' />
    </h4>;
  };
  const quickSearchClosed = getValue('easy-seed.quick-search-closed', false) || '';
  return <>
    { (CURRENT_SITE_NAME === 'HH') && <>
      <div class="font-bold leading-6"><Title /></div>
      <div class="font-bold leading-6"><UploadSiteList /></div>
      <div class="font-bold leading-6">{$t('快捷操作')}</div>
      <div class="font-bold leading-6"><FunctionList /></div>
      <div class="font-bold leading-6">{$t('快速检索')}</div>
      <div class="font-bold leading-6"><SearchList /></div>
    </>}
    {
      (isNexusPHP || isHDB || CURRENT_SITE_NAME?.match(/(HDSpace|HDT)$/)) &&
      <>
        <tr className={isHDB ? 'hdb-tr' : ''}>
          <td className={baseTitleClass.join(' ')}>
            <Title />
          </td>
          <td className={baseContentClass.join(' ')}>
            <div id='seed-dom' className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}>
              <UploadSiteList />
            </div>
          </td>
        </tr>
        <tr className={isHDB ? 'hdb-tr' : ''}>
          <td className={baseTitleClass.join(' ')}>
            <h4>{$t('快捷操作')}</h4>
          </td>
          <td className={baseContentClass.join(' ')}>
            <FunctionList />
          </td>
        </tr>
        {
          !quickSearchClosed && <tr className={isHDB ? 'hdb-tr' : ''}>
            <td className={baseTitleClass.join(' ')}>
              <h4 className="quick-search" onClick={checkQuickResult}>{$t('快速检索')}</h4>
            </td>
            <td className={baseContentClass.join(' ')}>
              <SearchList />
            </td>
          </tr>
        }
      </>
    }
    {CURRENT_SITE_NAME === 'Cinematik' && <>
      <tr>
        <td className="rowhead"><Title /></td>
        <td><UploadSiteList /></td>
      </tr>
      <tr>
        <td className="rowhead">
          {$t('快捷操作')}
        </td>
        <td>
          <FunctionList />
        </td>
      </tr>
      {!quickSearchClosed && <tr>
        <td className="rowhead">
          <h4 className="quick-search" onClick={checkQuickResult}>{$t('快速检索')}</h4>
        </td>
        <td>
          <SearchList />
        </td>
      </tr>
      }
    </>
    }
    {
      CURRENT_SITE_NAME === 'TeamHD' &&
      <>
        <div className="custom-site">
          <Title />
          <div className="easy-seed-td" style={{ flexWrap: 'wrap' }} >
            <div id='seed-dom' className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}>
              <UploadSiteList />
            </div>
          </div>
        </div>
        <div className="custom-site">
          <h4>{$t('快捷操作')}</h4>
          <FunctionList />
        </div>
        {
          !quickSearchClosed && <div className="custom-site">
            <h4 onClick={checkQuickResult}>{$t('快速检索')}</h4>
            <div>
              <SearchList />
            </div>
          </div>
        }
      </>
    }
    {
      CURRENT_SITE_NAME === 'SpeedApp' &&
          <>
            <div className="custom-site">
              <Title />
              <div className="easy-seed-td" style={{ flexWrap: 'wrap' }} >
                <div id='seed-dom' className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}>
                  <UploadSiteList />
                </div>
              </div>
            </div>
            <div className="custom-site">
              <h4>{$t('快捷操作')}</h4>
              <FunctionList />
            </div>
            {
              !quickSearchClosed && <div className="custom-site">
                <h4 onClick={checkQuickResult}>{$t('快速检索')}</h4>
                <div>
                  <SearchList />
                </div>
              </div>
            }
          </>
    }
    {
      CURRENT_SITE_NAME === 'Bdc' && <>
        <tr>
          <td colSpan={4}>
            <div className='custom-site'>
              <Title />
              <div className="easy-seed-td" style={{ flexWrap: 'wrap' }} >
                <div id='seed-dom' className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}>
                  <UploadSiteList />
                </div>
              </div>
            </div>
            <div className='custom-site'>
              <h4>{$t('快捷操作')}</h4>
              <FunctionList />
            </div>
            {
              !quickSearchClosed && <div className='custom-site'>
                <h4 onClick={checkQuickResult}>{$t('快速检索')}</h4>
                <div>
                  <SearchList />
                </div>
              </div>
            }
          </td>
        </tr>

      </>
    }
    {
      CURRENT_SITE_INFO.siteType === 'gazelle' &&
      <div id="seed-dom" className={['movie-page__torrent__panel', BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''].join(' ')}>
        <div className="ptp-title-wrapper">
          <Title />
          <UploadSiteList />
        </div>

        {CURRENT_SITE_NAME !== 'EMP' && <FunctionList />}
        <div class="ptp-search-list">
          {
            !quickSearchClosed && <div class="ptp-title-wrapper">
              <h4 className="quick-search" onClick={checkQuickResult}>{$t('快速检索')}</h4>
              <SearchList />
            </div>
          }

        </div>
      </div>

    }
    {
      <div style={{ display: settingPanelOpen ? 'block' : 'none' }}>
        <SettingPanel closePanel={closePanel} />
      </div>
    }
  </>;
};
export default Container;
