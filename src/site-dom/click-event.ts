
import { openSettingPanel } from './setting-panel';
import {
  checkQuickResult,
} from './button-function';

export default () => {
  if ($('#easy-seed-setting')[0]) {
    $('#easy-seed-setting').click(() => {
      openSettingPanel();
    });
  }
  $('h4.quick-search').click(() => {
    checkQuickResult();
  });
};
