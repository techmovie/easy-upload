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
import handleRED from './red';
import handleGazelleMusic from './gazelle-music';
import handleHDRoute from './hdr';
import handleITS from './its';
import handlePTN from './ptn';

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
  RED: handleRED,
  HDRoute: handleHDRoute,
  DicMusic: handleGazelleMusic,
  Orpheus: handleGazelleMusic,
  iTS: handleITS,
  PTN: handlePTN,
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
  const targetTorrentInfo: TorrentInfo.TargetTorrentInfo = { ...info };
  const isBluray = !!info?.videoType?.match(/bluray/i);
  targetTorrentInfo.isBluray = isBluray;
  const targetHelper = new TargetHelper(targetTorrentInfo);
  // 避免选择种子文件后自动改变种子名称
  targetHelper.disableTorrentChange();
  targetHelper.fillTorrentFile();

  if (!!handler && !CURRENT_SITE_NAME.match(/TJUPT|HDRoute|PTN|iTS/)) {
    return;
  }
  targetHelper.prepareToFillInfo();
  targetHelper.torrentTitleHandler();
  targetHelper.imdbHandler();
  targetHelper.descriptionHandler();
  targetHelper.fillBasicAttributes();
  targetHelper.categoryHandler();
  targetHelper.fillRemainingInfo();
  targetHelper.dealWithMoreSites();
};

export {
  fillTargetForm,
};
