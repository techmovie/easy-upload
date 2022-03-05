import { useState } from 'preact/hooks';
import { JSX } from 'preact';
import { $t, getValue } from '../common';
import {
  PT_SITE,
  SORTED_SITE_KEYS,
} from '../const';
import { FeatureSwitchList, SiteListConfig } from './conf';
import Notification from './Notification';
interface Props {
  closePanel: JSX.MouseEventHandler<HTMLButtonElement>
}
const SettingPanel = (props:Props) => {
  const getSiteSetList = () => {
    const targetSitesEnabled:string[] = getValue('easy-seed.enabled-target-sites') || [];
    const batchSeedSiteEnabled:string[] = getValue('easy-seed.enabled-batch-seed-sites') || [];
    const searchSitesEnabled:string[] = getValue('easy-seed.enabled-search-site-list') || [];

    return SORTED_SITE_KEYS.map(site => {
      const targetEnabled = targetSitesEnabled.includes(site);
      const batchEnabled = batchSeedSiteEnabled.includes(site);
      const searchEnabled = searchSitesEnabled.includes(site);
      return {
        site,
        targetEnabled,
        batchEnabled,
        searchEnabled,
      };
    });
  };
  const getFeatureList = () => {
    return FeatureSwitchList.map(feature => {
      const isChecked = getValue(`easy-seed.${feature.name}`, false) || false;
      return {
        ...feature,
        checked: !!isChecked,
      };
    });
  };

  const featureList = getFeatureList();
  const siteList = getSiteSetList();

  const { closePanel } = props;

  const [ptpImgApiKey, setPtpImgApiKey] = useState(getValue('easy-seed.ptp-img-api-key', false) || '');
  const [doubanCookie, setDoubanCookie] = useState(getValue('easy-seed.douban-cookie', false) || '');

  const saveSetting = () => {
    const targetSitesEnabled:string[] = [];
    const searchSitesEnabled:string[] = [];
    const batchSeedSiteEnabled:string[] = [];
    siteList.forEach(({ site, targetEnabled, batchEnabled, searchEnabled }) => {
      if (batchEnabled) {
        batchSeedSiteEnabled.push(site);
      }
      if (searchEnabled) {
        searchSitesEnabled.push(site);
      }
      if (targetEnabled) {
        targetSitesEnabled.push(site);
      }
    });
    try {
      GM_setValue('easy-seed.enabled-target-sites', JSON.stringify(targetSitesEnabled));
      GM_setValue('easy-seed.enabled-search-site-list', JSON.stringify(searchSitesEnabled));
      GM_setValue('easy-seed.enabled-batch-seed-sites', JSON.stringify(batchSeedSiteEnabled));
      GM_setValue('easy-seed.ptp-img-api-key', ptpImgApiKey);
      GM_setValue('easy-seed.douban-cookie', doubanCookie);
      featureList.forEach(feature => {
        GM_setValue(`easy-seed.${feature.name}`, feature.checked ? 'checked' : '');
      });
      window.location.reload();
    } catch (error) {
      Notification.open({
        message: $t('错误'), description: $t('保存本地站点设置失败'),
      });
    }
  };
  interface InfoKey {
    targetEnabled: boolean
    batchEnabled: boolean
    searchEnabled: boolean
  }
  const handleCheckChange = (key: keyof InfoKey, index: number) => {
    const siteInfo = siteList[index];
    siteInfo[key] = !siteInfo[key];
    siteList[index] = siteInfo;
  };
  const handleFeatureChange = (index: number) => {
    const featureInfo = featureList[index];
    featureInfo.checked = !featureInfo.checked;
    featureList[index] = featureInfo;
  };
  return <div className="easy-seed-setting-panel">
    <div className="panel-content-wrap">
      <div className="panel-content">
        {
          SiteListConfig.map(config => {
            return <div key={config.name} >
              <h3>{$t(config.title)}</h3>
              {
                config.des && <p>{$t(config.des)}</p>
              }
              <section className="site-enable-setting">
                <ul className={config.class} >
                  {
                    siteList.map((siteInfo, index) => {
                      const siteData = PT_SITE[siteInfo.site as keyof typeof PT_SITE] as Site.SiteInfo;
                      if ((siteData.asTarget && config.key !== 'searchEnabled') ||
                      (config.key === 'searchEnabled' && siteData.search)) {
                        return <li key={siteInfo.site}>
                          <label>
                            <input
                              onChange={() => handleCheckChange(config.key as keyof InfoKey, index)}
                              name="target-site-enabled"
                              type="checkbox"
                              checked={siteInfo[config.key as keyof InfoKey]}
                            />{siteInfo.site}
                          </label>
                        </li>;
                      }
                      return '';
                    })}
                </ul>
              </section>
            </div>;
          })
        }
        <h3>{$t('图床配置')}</h3>
        <section className="site-enable-setting img-upload-setting">
          <label>
            ptpimg ApiKey:
            <input
              name="ptp-img-api-key"
              type="text"
              value={ptpImgApiKey}
              onChange={(e) => setPtpImgApiKey((e.target as HTMLInputElement).value)} />
            <a
              target="_blank"
              href="https://github.com/techmovie/easy-seed/wiki/%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96ptpimg%E7%9A%84apiKey"
              rel="noreferrer"
            >
              {$t('如何获取？')}
            </a>
          </label>

        </section>
        <h3>{$t('额外功能关闭')}</h3>
        <div className="feature-list">
          {
            featureList.map((feature, index) => {
              return <section className="site-enable-setting" key={feature.name}>
                <label>
                  <input
                    onChange={() => handleFeatureChange(index)}
                    name={feature.name}
                    type={feature.type}
                    checked={feature.checked}
                  />
                  {$t(feature.des)}
                </label>
              </section>;
            })
          }
        </div>
        <h3>{$t('豆瓣配置')}</h3>
        <div className='douban-config'>
          <label>
            {$t('豆瓣Cookie')}
            <textarea
              value={doubanCookie}
              onChange={(e) => setDoubanCookie((e.target as HTMLTextAreaElement).value)}
            />
          </label>
        </div>
      </div>
      <div className="confirm-btns">
        <button onClick={closePanel}>{$t('取消')}</button>
        <button onClick={saveSetting} className="save-setting-btn">{$t('保存')}</button>
      </div>
    </div>
  </div >;
};
export default SettingPanel;
