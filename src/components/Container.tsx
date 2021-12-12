import { useState } from 'preact/hooks';
import {
  CURRENT_SITE_NAME, CURRENT_SITE_INFO,
} from '../const';
import {
  $t,
} from '../common';
import FunctionList from '../components/FunctionList';
import SearchList from '../components/SearchList';
import UploadSiteList from '../components/UploadSiteList';
import SettingPanel from './SettingPanel';
import ConfigSvg from '../assets/setting.svg';

const Container = () => {
  const [settingPanelOpen, setSettingPanelOpen] = useState(false);
  const isNexusPHP = CURRENT_SITE_INFO.siteType.match(/NexusPHP|AvistaZ/) ||
    CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS/);
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
  const Title = () => {
    return <h4>
      {$t('一键转种')}
      <span id="easy-seed-setting" className="easy-seed-setting-btn" />
      <ConfigSvg onClick={openSettingPanel} className='setting-svg' />
    </h4>;
  };
  return <>
    {
      (isNexusPHP || isHDB || CURRENT_SITE_NAME.match(/(HDSpace|HDT)$/)) &&
      <>
        <tr className={isHDB ? 'hdb-tr' : ''}>
          <td className={baseTitleClass.join(' ')}>
            <Title />
          </td>
          <td className={baseContentClass.join(' ')}>
            <UploadSiteList />
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
        <tr className={isHDB ? 'hdb-tr' : ''}>
          <td className={baseTitleClass.join(' ')}>
            <h4 className="quick-search">{$t('快速检索')}</h4>
          </td>
          <td className={baseContentClass.join(' ')}>
            <SearchList />
          </td>
        </tr>
      </>
    }
    {
      CURRENT_SITE_NAME === 'TeamHD' &&
      <>
        <div className="team-hd">
          <Title />
          <div className="easy-seed-td" style={{ flexWrap: 'wrap' }} >
            <UploadSiteList />
          </div>
        </div>
        <div className="team-hd">
          <h4>{$t('快捷操作')}</h4>
          <FunctionList />
        </div>
        <div className="team-hd">
          <h4>{$t('快速检索')}</h4>
          <SearchList />
        </div>
      </>
    }
    {
      <div style={{ display: settingPanelOpen ? 'block' : 'none' }}>
        <SettingPanel closePanel={closePanel} />
      </div>
    }
  </>;
};
export default Container;
