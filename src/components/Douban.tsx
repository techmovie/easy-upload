import { useState, useCallback } from 'preact/hooks';
import { CURRENT_SITE_INFO, CURRENT_SITE_NAME } from '@/const';
import {
  $t,
  getDoubanBasicDataByQuery,
  getDoubanBookInfo,
  getAreaCode,
  getDoubanInfoByIdOrDoubanUrl,
  getSubTitleFromDoubanInfo,
  getDoubanTVItemData,
} from '@/common';
import { toast } from 'sonner';
import $ from 'jquery';
import { refineCategory } from '@/source/helper/index';
import { useTorrentInfo } from '@/hooks/useTorrentInfo';

const Douban = () => {
  const { torrentInfo, updateTorrentInfo } = useTorrentInfo();

  const [btnText, setBtnText] = useState('获取豆瓣简介');
  const [bookBtnText, setBookBtnText] = useState('获取豆瓣读书简介');
  const [btnDisable, setBtnDisable] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const doubanClosed = GM_getValue<boolean>('easy-upload.douban-closed');
  const { needDoubanBookInfo, needDoubanInfo } = CURRENT_SITE_INFO;
  const showSearch =
    (needDoubanBookInfo || needDoubanInfo || !torrentInfo.doubanUrl) &&
    !doubanClosed;

  const handleDoubanInfoUpdate = useCallback(
    (formatDoubanInfo: string) => {
      updateTorrentInfo((prevInfo) => {
        const areaMatch =
          formatDoubanInfo?.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
        const area = areaMatch ? getAreaCode(areaMatch) : prevInfo.area;

        return {
          ...prevInfo,
          doubanInfo: formatDoubanInfo,
          area,
          category: refineCategory({ ...prevInfo, area }, prevInfo.category),
        };
      });
    },
    [updateTorrentInfo],
  );

  const getDoubanData = useCallback(async () => {
    if (btnDisable) return;

    try {
      setBtnText('获取中...');
      setBtnDisable(true);

      const scriptDoubanLink = $('.douban-dom').attr('douban-link');
      const doubanLink =
        $('.page__title>a').attr('href') ||
        scriptDoubanLink ||
        torrentInfo.doubanUrl ||
        searchValue;

      let doubanUrl = '';

      if (doubanLink && doubanLink.match(/movie\.douban\.com/)) {
        doubanUrl = doubanLink;
      } else {
        const { imdbUrl, movieName } = torrentInfo;
        const doubanData = await getDoubanBasicDataByQuery(
          imdbUrl || movieName,
        );

        if (doubanData) {
          let { id, season = '' } = doubanData;
          if (season) {
            const tvData = await getDoubanTVItemData(
              doubanData,
              torrentInfo.title,
            );
            if (tvData) {
              id = tvData.id;
            }
          }
          doubanUrl = `https://movie.douban.com/subject/${id}`;
        }
      }

      if (doubanUrl) {
        updateTorrentInfo({ doubanUrl });
        setSearchValue(doubanUrl);

        // 如果描述中没有片名/译名，获取完整豆瓣信息
        if (!torrentInfo.description.match(/(片|译)\s*名/)) {
          const isTVCategory = !!torrentInfo.category.match(/tv/);
          const formatDoubanInfo = await getDoubanInfoByIdOrDoubanUrl(
            doubanUrl,
            isTVCategory ? 'tv' : 'movie',
          );

          if (formatDoubanInfo.format) {
            toast.success($t('获取成功'));
            handleDoubanInfoUpdate(formatDoubanInfo.format);
            const subtitle = getSubTitleFromDoubanInfo(
              formatDoubanInfo,
              torrentInfo,
            );
            updateTorrentInfo({
              subtitle,
            });
          }
        } else {
          toast.success($t('获取成功'));
        }
      }
    } catch (error) {
      console.error('获取豆瓣数据失败:', error);
      toast.error($t('获取失败'));
    } finally {
      setBtnText('获取豆瓣简介');
      setBtnDisable(false);
    }
  }, [
    btnDisable,
    searchValue,
    torrentInfo,
    updateTorrentInfo,
    handleDoubanInfoUpdate,
  ]);
  const getBookData = useCallback(async () => {
    if (btnDisable) return;

    const doubanUrl = torrentInfo.doubanUrl || searchValue;

    if (!doubanUrl) {
      toast.error($t('缺少豆瓣链接'));
      return;
    }

    try {
      setBookBtnText('获取中...');
      setBtnDisable(true);
      setSearchValue(doubanUrl);

      const data = await getDoubanBookInfo(doubanUrl);

      if (data) {
        updateTorrentInfo({
          title: data.chinese_title || data.foreign_title,
          poster: data.poster,
          description: data.book_intro || '',
          doubanBookInfo: data,
        });

        toast.success($t('获取成功'));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('获取豆瓣图书数据失败:', error);
      toast.error(error.message);
    } finally {
      setBookBtnText('获取豆瓣读书简介');
      setBtnDisable(false);
    }
  }, [btnDisable, searchValue, torrentInfo.doubanUrl, updateTorrentInfo]);

  if (!showSearch) return null;
  return (
    <>
      <div className="function-list-item">
        <div className="douban-section">
          <input
            type="text"
            placeholder={$t('手动输入豆瓣链接')}
            value={searchValue}
            onChange={(e) =>
              setSearchValue((e.target as HTMLInputElement).value)
            }
          />
        </div>
      </div>
      <div className="function-list-item">
        <div className="douban-section">
          {CURRENT_SITE_NAME !== 'SoulVoice' ? (
            <button
              id="douban-info"
              disabled={btnDisable}
              className={btnDisable ? 'is-disabled' : ''}
              onClick={getDoubanData}
            >
              {$t(btnText)}
            </button>
          ) : (
            <button
              disabled={btnDisable}
              className={btnDisable ? 'is-disabled' : ''}
              id="douban-book-info"
              onClick={getBookData}
            >
              {$t(bookBtnText)}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Douban;
