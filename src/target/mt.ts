import { PT_SITE } from '../const';
import { setSelectValue } from './common';
import TargetHelper from './helper';

export default async (info:TorrentInfo.Info) => {
  const targetNode = document.getElementById('root');
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const targetElement = document.querySelector('#name');
        const editor = document.querySelector('.editor-input');
        if (targetElement && editor) {
          observer.disconnect();
          fillMTInfo(info);
          break;
        }
      }
    }
  });
  observer.observe(targetNode as HTMLElement, config);
};

const fillMTInfo = async (info:TorrentInfo.Info) => {
  const currentSiteInfo = PT_SITE.MTeam;
  const { title, subtitle, audioCodec, doubanUrl, imdbUrl, mediaInfo, tags } = info;
  setInputValue(currentSiteInfo.name.selector, title);
  setInputValue(currentSiteInfo.subtitle.selector, subtitle || '');
  setInputValue(currentSiteInfo.douban.selector, doubanUrl || '');
  setInputValue(currentSiteInfo.imdb.selector, imdbUrl || '');
  setInputValue(currentSiteInfo.mediainfo.selector, mediaInfo);
  setSelectValue(currentSiteInfo.audioCodec.selector, currentSiteInfo.audioCodec.map[audioCodec as keyof typeof currentSiteInfo.audioCodec.map]);
  const targetHelper = new TargetHelper(info);
  targetHelper.descriptionHandler();

  // 避免选择种子文件后自动改变种子名称
  targetHelper.disableTorrentChange();
  targetHelper.categoryHandler();

  let timeout = 0;
  Object.keys(tags).forEach(key => {
    const siteTagMap = currentSiteInfo.tags[key as keyof typeof currentSiteInfo.tags];
    if (tags[key] && siteTagMap) {
      setTimeout(() => {
        setInputValue(siteTagMap, '', true);
      }, timeout);
      timeout += 100;
    }
  });
  fillDescription(targetHelper.info.description);
};

function setInputValue (selector:string, value:string, isCheckbox = false) {
  // https://github.com/facebook/react/issues/11488#issuecomment-347775628
  // Trigger simulated input value change for React 16
  const input = document.querySelector(selector) as HTMLInputElement;
  if (input) {
    const lastValue = input.value;
    input.value = value;
    const tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    const event = new Event(isCheckbox ? 'click' : 'input', { bubbles: true });
    input.dispatchEvent(event);
  }
}

function fillDescription (description:string) {
  const editor = document.querySelector('.editor-input')?.__lexicalEditor;
  const descriptionArray = description.split('\n').map(line => {
    return {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: line,
        },
      ],
    };
  });
  const content = JSON.stringify({
    root: {
      children: descriptionArray,
      type: 'root',
    },
  });
  const editorState = editor.parseEditorState(content);
  editor.update(() => {
    editor.setEditorState(editorState);
  });
}
