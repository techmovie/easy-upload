import { registry } from './registry';
import { NexusPHPExtractor } from './base/nexusphp-base';
import { getTagsFromSource, getFilterBBCode } from '@/source/helper/index';
import { CONFIG } from '../config';
import $ from 'jquery';

class PTerExtractor extends NexusPHPExtractor {
  priority = 10;

  canHandle(siteName: string): boolean {
    return siteName === 'PTer';
  }

  extractDescription() {
    let description: string;
    if ($('#descrcopyandpaster')[0]) {
      description = ($('#descrcopyandpaster').val() as string)?.replace(
        /hide(=(MediaInfo|BDInfo))?\]/gi,
        'quote]',
      );
    } else {
      description = getFilterBBCode($('#kdescr')[0]);
    }
    this.info.description = description.replace(/\[img\d\]/g, '[img]');
  }

  extractTags() {
    const tags: TorrentInfo.MediaTags = {};
    const tagImgs = $("td.rowhead:contains('类别与标签')").next().find('img');
    const links = Array.from(
      tagImgs.map((_, item) => {
        return (
          $(item)
            .attr('src')
            ?.replace(/(lang\/chs\/)|(\.gif)/g, '') ?? ''
        );
      }),
    );
    const tagRules = {
      chinese_subtitle: 'pter-zz',
      chinese_audio: 'pter-gy',
      cantonese_audio: 'pter-yy',
      diy: 'pter-diy',
    };
    for (const [tag, rule] of Object.entries(tagRules)) {
      tags[tag as keyof TorrentInfo.MediaTags] = links.includes(rule);
    }
    this.info.tags = {
      ...tags,
      ...this.info.tags,
      ...getTagsFromSource(this.info?.subtitle ?? ''),
    };
  }

  getMetaInfoRules() {
    return {
      ...CONFIG.META_INFO_MATCH_RULES,
      category: /(类型):\s*([^\s]+)?/i,
      area: /(地区):\s*([^\s]+)?/i,
    };
  }
}

registry.register(new PTerExtractor());
