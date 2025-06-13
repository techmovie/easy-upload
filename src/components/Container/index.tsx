import { useState } from 'preact/hooks';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useQuickSearch } from '@/hooks/useQuickSearch';
import FunctionList from '@/components/FunctionList';
import SearchList from '@/components/SearchList';
import UploadSiteList from '@/components/UploadSiteList';
import SettingPanel from '@/components/SettingPanel';
import { $t } from '@/common';
import { Toaster } from 'sonner';
import {
  HHLayout,
  MTeamLayout,
  NexusPHPLayout,
  TikLayout,
  SpeedAppLayout,
  GazelleLayout,
  HDBLayout,
} from '@/components/Container/layouts';
import ConfigSvg from '@/assets/setting.svg';

const SiteLayouts = {
  HH: HHLayout,
  MTeam: MTeamLayout,
  NexusPHP: NexusPHPLayout,
  Cinematik: TikLayout,
  SpeedApp: SpeedAppLayout,
  Gazelle: GazelleLayout,
  HDBits: HDBLayout,
};
const Container = () => {
  const [settingPanelOpen, setSettingPanelOpen] = useState(false);

  const siteType = useSiteConfig();
  const { checkQuickResult } = useQuickSearch();

  const handleSearchClick = () => {
    checkQuickResult();
  };

  const TitleBar = () => (
    <h4>
      {$t('一键转种')}
      <Toaster position="top-right" richColors />
      <span id="easy-upload-setting" className="easy-upload-setting-btn" />
      <ConfigSvg
        onClick={() => setSettingPanelOpen(true)}
        className="setting-svg"
      />
    </h4>
  );

  const LayoutComponent =
    SiteLayouts[siteType as keyof typeof SiteLayouts] || SiteLayouts.NexusPHP;
  const quickSearchClosed = GM_getValue<boolean>(
    'easy-upload.quick-search-closed',
    false,
  );
  return (
    <>
      <LayoutComponent quickSearchClosed={quickSearchClosed}>
        {{
          title: <TitleBar />,
          upload: <UploadSiteList />,
          functions: <FunctionList />,
          search: <SearchList />,
          onSearchClick: handleSearchClick,
        }}
      </LayoutComponent>
      <div style={{ display: settingPanelOpen ? 'block' : 'none' }}>
        <SettingPanel closePanel={() => setSettingPanelOpen(false)} />
      </div>
    </>
  );
};
export default Container;
