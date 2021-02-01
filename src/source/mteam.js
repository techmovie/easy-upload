
import { NexusPHPCommon } from './nexusphp_common';
export default class Mteam extends NexusPHPCommon {
  constructor () {
    super();

    this.metaTextMap = {
      category: '類別',
      videoCodes: '編碼',
      resolution: '解析度',
      area: '處理',
    };
  }
}
