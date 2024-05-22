import { CURRENT_SITE_NAME } from '../const';
import TargetHelper from './helper';

import handlePTP from './ptp';
import handleGPW from './gpw';
import handleNPU from './npubits';
import handleBYR from './byr';
import handleSC from './sc';
import handleKG from './kg';
import handleBHD from './bhd';
import handleBdc from './bdc';
import handleZQ from './zhuque';
import autoFill from './autofill';
import handleMT from './mt';

const siteHandlers: { [key: string]: (info: TorrentInfo.Info) => void } = {
  PTP: handlePTP,
  GPW: handleGPW,
  NPUBits: handleNPU,
  BYR: handleBYR,
  SC: handleSC,
  KG: handleKG,
  BeyondHD: handleBHD,
  Bdc: handleBdc,
  ZHUQUE: handleZQ,
  MTeam: handleMT,
};

const fillTargetForm = (info: TorrentInfo.Info) => {
  autoFill(info || {});
  if (!info) {
    return;
  }
  console.log(info);
  const handler = siteHandlers[CURRENT_SITE_NAME];
  if (handler) {
    handler(info);
  }
  if (CURRENT_SITE_NAME === 'MTeam') {
    return;
  }

  const targetTorrentInfo: TorrentInfo.TargetTorrentInfo = { ...info };
  const isBluray = !!info?.videoType?.match(/bluray/i);
  targetTorrentInfo.isBluray = isBluray;
  const targetHelper = new TargetHelper(targetTorrentInfo);
  targetHelper.prepareToFillInfo();
  targetHelper.torrentTitleHandler();
  targetHelper.imdbHandler();
  targetHelper.descriptionHandler();

  // 避免选择种子文件后自动改变种子名称
  targetHelper.disableTorrentChange();
  targetHelper.fillBasicAttributes();

  targetHelper.categoryHandler();
  targetHelper.fillRemainingInfo();
  targetHelper.dealWithMoreSites();
};

export {
  fillTargetForm,
};
