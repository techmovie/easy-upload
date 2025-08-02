import { $t } from '@/common';
import { ContainerLayoutType } from './type';
import { BROWSER_LANGUAGE, CURRENT_SITE_NAME } from '@/const';

export const HHLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => (
  <>
    <div class="font-bold leading-6">{children.title}</div>
    <div class="font-bold leading-6">{children.upload}</div>
    <div class="font-bold leading-6">{$t('快捷操作')}</div>
    <div class="font-bold leading-6">{children.functions}</div>
    {!quickSearchClosed && (
      <>
        <div class="font-bold leading-6" onClick={children.onSearchClick}>
          {$t('快速检索')}
        </div>
        <div class="font-bold leading-6">{children.search}</div>
      </>
    )}
  </>
);

export const MTeamLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => (
  <>
    <div class="pb-[20px] mb-[20px] border-0 border-b border-solid border-[--mt-line-color]">
      <label class="block text-[--mt-text-base] font-bold text-[16px] mb-[1em]">
        {children.title}
      </label>
      <div />

      <div class="ant-descriptions__no-border mt-3 mb-1">{children.upload}</div>
    </div>

    {!quickSearchClosed && (
      <div class="pb-[20px] mb-[20px] border-0 border-b border-solid border-[--mt-line-color]">
        <label class="block text-[--mt-text-base] font-bold text-[16px] mb-[1em]">
          <div
            class="font-bold cursor-pointer"
            onClick={children.onSearchClick}
          >
            {$t('快速检索')}
          </div>
        </label>

        <div class="ant-descriptions__no-border mt-3 mb-1">
          {children.search}
        </div>
      </div>
    )}
  </>
);

export const NexusPHPLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => {
  const baseTitleClass = ['title-td', 'rowhead', 'nowrap'];
  const baseContentClass = ['easy-upload-td', 'rowfollow'];
  if (CURRENT_SITE_NAME === 'HDT') {
    baseTitleClass.push('detailsleft');
    baseContentClass.push('detailshash');
  } else if (CURRENT_SITE_NAME === 'HDSpace') {
    baseTitleClass.push('header');
    baseContentClass.push('lista');
  }
  return (
    <>
      <tr>
        <td className={baseTitleClass.join(' ')}>{children.title}</td>
        <td className={baseContentClass.join(' ')}>
          <div
            id="seed-dom"
            className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}
          >
            {children.upload}
          </div>
        </td>
      </tr>
      <tr>
        <td className={baseTitleClass.join(' ')}>
          <h4>{$t('快捷操作')}</h4>
        </td>
        <td className={baseContentClass.join(' ')}>{children.functions}</td>
      </tr>
      {!quickSearchClosed && (
        <tr>
          <td className={baseTitleClass.join(' ')}>
            <h4 className="quick-search" onClick={children.onSearchClick}>
              {$t('快速检索')}
            </h4>
          </td>
          <td className={baseContentClass.join(' ')}>{children.search}</td>
        </tr>
      )}
    </>
  );
};

export const TikLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => (
  <>
    <tr>
      <td className="rowhead">{children.title}</td>
      <td>{children.upload}</td>
    </tr>
    <tr>
      <td className="rowhead">{$t('快捷操作')}</td>
      <td>{children.functions}</td>
    </tr>
    {!quickSearchClosed && (
      <tr>
        <td className="rowhead">
          <h4 className="quick-search" onClick={children.onSearchClick}>
            {$t('快速检索')}
          </h4>
        </td>
        <td>{children.search}</td>
      </tr>
    )}
  </>
);

export const SpeedAppLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => (
  <>
    <div className="custom-site">
      {children.title}
      <div className="easy-upload-td" style={{ flexWrap: 'wrap' }}>
        <div
          id="seed-dom"
          className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}
        >
          {children.upload}
        </div>
      </div>
    </div>
    <div className="custom-site">
      <h4>{$t('快捷操作')}</h4>
      {children.functions}
    </div>
    {!quickSearchClosed && (
      <div className="custom-site">
        <h4 onClick={children.onSearchClick}>{$t('快速检索')}</h4>
        <div>{children.search}</div>
      </div>
    )}
  </>
);

export const GazelleLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => (
  <div
    id="seed-dom"
    className={[
      'movie-page__torrent__panel',
      BROWSER_LANGUAGE === 'en' ? 'use-eng' : '',
    ].join(' ')}
  >
    <div className="ptp-title-wrapper">
      {children.title}
      {children.upload}
    </div>

    {children.functions}
    <div class="ptp-search-list">
      {!quickSearchClosed && (
        <div class="ptp-title-wrapper">
          <h4 className="quick-search" onClick={children.onSearchClick}>
            {$t('快速检索')}
          </h4>
          {children.search}
        </div>
      )}
    </div>
  </div>
);

export const HDBLayout = ({
  children,
  quickSearchClosed = false,
}: {
  children: ContainerLayoutType;
  quickSearchClosed: boolean;
}) => {
  const baseTitleClass = ['rowfollow', 'hdb-td'];
  const baseContentClass = ['rowfollow', 'hdb-td'];
  return (
    <>
      <tr class="hdb-tr">
        <td className={baseTitleClass.join(' ')}>{children.title}</td>
        <td className={baseContentClass.join(' ')}>
          <div
            id="seed-dom"
            className={BROWSER_LANGUAGE === 'en' ? 'use-eng' : ''}
          >
            {children.upload}
          </div>
        </td>
      </tr>
      <tr class="hdb-tr">
        <td className={baseTitleClass.join(' ')}>
          <h4>{$t('快捷操作')}</h4>
        </td>
        <td className={baseContentClass.join(' ')}>{children.functions}</td>
      </tr>
      {!quickSearchClosed && (
        <tr class="hdb-tr">
          <td className={baseTitleClass.join(' ')}>
            <h4 className="quick-search" onClick={children.onSearchClick}>
              {$t('快速检索')}
            </h4>
          </td>
          <td className={baseContentClass.join(' ')}>{children.search}</td>
        </tr>
      )}
    </>
  );
};
