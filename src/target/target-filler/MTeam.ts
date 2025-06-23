import { registry, TargetFiller } from './registry';
import { BaseFiller } from './base/base-filler';
import { PT_SITE } from '@/const';

class MTeam extends BaseFiller implements TargetFiller {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'MTeam';
  }

  fill(info: TorrentInfo.Info) {
    this.info = info;
    this.setupMutationObserver();
  }

  private setupMutationObserver(): void {
    const targetNode = document.getElementById('root');
    if (!targetNode) return;

    const config = { childList: true, subtree: true };
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const targetElement = document.querySelector('#name');
          const editor = document.querySelector('.editor-input');
          if (targetElement && editor) {
            observer.disconnect();
            this.fillMTeamInfo();
            break;
          }
        }
      }
    });

    observer.observe(targetNode, config);
  }

  private fillMTeamInfo(): void {
    if (!this.info) return;

    const currentSiteInfo = PT_SITE.MTeam;
    const {
      title,
      subtitle,
      audioCodec,
      doubanUrl,
      imdbUrl,
      mediaInfos,
      tags,
      source,
    } = this.info;
    const mediaInfo = mediaInfos?.[0] ?? '';

    this.setInputValue(currentSiteInfo.name.selector, title);
    this.setInputValue(currentSiteInfo.subtitle.selector, subtitle || '');
    this.setInputValue(currentSiteInfo.douban.selector, doubanUrl || '');
    this.setInputValue(currentSiteInfo.imdb.selector, imdbUrl || '');
    this.setInputValue(currentSiteInfo.mediaInfo.selector, mediaInfo);
    this.setSelectValue(currentSiteInfo.source.selector, source || '');

    this.setSelectValue(
      currentSiteInfo.audioCodec.selector,
      currentSiteInfo.audioCodec.map[
        audioCodec as keyof typeof currentSiteInfo.audioCodec.map
      ],
    );

    this.info.description = this.info.description.replace(mediaInfo.trim(), '');

    this.processDescription();
    this.fillMTDescription(this.info.description);
    this.fillCategory();

    this.fillTags(tags, currentSiteInfo.tags);
    this.fillTorrentFile();
  }

  private fillTags(
    tags: TorrentInfo.MediaTags,
    siteTagsMap: Record<string, string>,
  ): void {
    let timeout = 0;
    Object.keys(tags).forEach((key) => {
      const siteTagSelector = siteTagsMap[key as keyof typeof siteTagsMap];
      if (tags[key as keyof TorrentInfo.MediaTags] && siteTagSelector) {
        setTimeout(() => {
          this.setInputValue(siteTagSelector, '', true);
        }, timeout);
        timeout += 100;
      }
    });
  }

  protected setSelectValue(selector: string, value: string): void {
    const select = document.querySelector(selector) as HTMLSelectElement;
    if (select) {
      const lastValue = select.value;
      select.value = value;
      const tracker = select._valueTracker;
      if (tracker) {
        tracker.setValue(lastValue);
      }
      const event = new Event('change', { bubbles: true });
      select.dispatchEvent(event);
      setTimeout(() => {
        Array.from(
          document.querySelectorAll(
            '.ant-select-item-option-active .ant-select-item-option-content',
          ),
        ).forEach((el) => {
          el.dispatchEvent(new Event('click', { bubbles: true }));
        });
      }, 1000);
    }
  }

  private setInputValue(
    selector: string,
    value: string,
    isCheckbox = false,
  ): void {
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
      const event = new Event(isCheckbox ? 'click' : 'input', {
        bubbles: true,
      });
      input.dispatchEvent(event);
    }
  }

  private fillMTDescription(description: string): void {
    const editor = document.querySelector('.editor-input')?.__lexicalEditor;
    if (!editor) return;

    const descriptionArray = description.split('\n').map((line) => ({
      type: 'paragraph',
      children: [{ type: 'text', text: line }],
    }));

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
}

registry.register(new MTeam());
