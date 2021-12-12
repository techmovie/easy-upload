import { useState } from 'preact/hooks';
import { $t, getValue } from '../common';
import {
  PT_SITE,
  SORTED_SITE_KEYS,
} from '../const';
import { FeatureSwitchList, SiteListConfig } from './conf';
import Notification from './Notification';

const SettingPanel = (props) => {
  const getSiteSetList = () => {
    const targetSitesEnabled = getValue('easy-seed.enabled-target-sites') || [];
    const batchSeedSiteEnabled = getValue('easy-seed.enabled-batch-seed-sites') || [];
    const searchSitesEnabled = getValue('easy-seed.enabled-search-site-list') || [];

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

  const saveSetting = () => {
    const targetSitesEnabled = [];
    const searchSitesEnabled = [];
    const batchSeedSiteEnabled = [];
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
  const handleCheckChange = (key: string, index: number) => {
    const siteInfo = siteList[index];
    siteInfo[key] = !siteInfo[key];
    siteList[index] = siteInfo;
  };
  const handleFeatureChange = (index: number) => {
    const featureInfo = featureList[index];
    featureInfo.checked = !featureInfo.checked;
    featureInfo[index] = featureInfo;
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
                      if (PT_SITE[siteInfo.site].asTarget) {
                        return <li key={siteInfo.site}>
                          <label>
                            <input
                              onChange={() => handleCheckChange(config.key, index)}
                              name="target-site-enabled"
                              type="checkbox"
                              checked={siteInfo[config.key]}
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

      </div>
      <div className="confirm-btns">
        <button onClick={closePanel}>{$t('取消')}</button>
        <button onClick={saveSetting} className="save-setting-btn">{$t('保存')}</button>
      </div>
    </div>
  </div >;
};
export default SettingPanel;
