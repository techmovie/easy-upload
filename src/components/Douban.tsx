import { useState } from 'preact/hooks';
import {
  CURRENT_SITE_INFO, CURRENT_SITE_NAME, TORRENT_INFO,
} from '../const';
import {
  $t, getDoubanIdByIMDB, getDoubanInfo, getDoubanBookInfo,
  getSubTitle, getAreaCode, getPreciseCategory,
} from '../common';
import Notification from './Notification';

const getTvSeasonData = async (data:Douban.Season) => {
  const { title: torrentTitle } = TORRENT_INFO;
  const { season = '', title } = data;
  if (season) {
    const seasonNumber = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)?.[1] ?? '1';
    if (parseInt(seasonNumber, 10) === 1) {
      return data;
    }
    const query = title.replace(/第.+?季/, `第${seasonNumber}季`);
    const response = await getDoubanIdByIMDB(query);
    return response;
  }
};
const updateTorrentInfo = (data: Douban.DoubanData) => {
  const desc = data.format;
  TORRENT_INFO.doubanInfo = data.format;
  TORRENT_INFO.subtitle = getSubTitle(data);
  const areaMatch = desc?.match(/(产\s+地|国\s+家)\s+(.+)/)?.[2] ?? '';
  if (areaMatch) {
    TORRENT_INFO.area = getAreaCode(areaMatch);
  }
  const category = TORRENT_INFO.category;
  TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
};
const Douban = () => {
  const [btnText, setBtnText] = useState('获取豆瓣简介');
  const [bookBtnText, setBookBtnText] = useState('获取豆瓣读书简介');
  const [btnDisable, setBtnDisable] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const doubanClosed = GM_getValue('easy-seed.douban-closed') || '';
  const { needDoubanBookInfo, needDoubanInfo } = CURRENT_SITE_INFO;
  const showSearch = (needDoubanBookInfo || needDoubanInfo || !TORRENT_INFO.doubanUrl) &&
   !doubanClosed;

  const getDoubanData = async () => {
    try {
      setBtnText('获取中...');
      setBtnDisable(true);
      // https://github.com/techmovie/DouBan-Info-for-PT
      const scriptDoubanLink = $('.douban-dom').attr('douban-link');
      const doubanLink = $('.page__title>a').attr('href') ||
        scriptDoubanLink ||
        TORRENT_INFO.doubanUrl || searchValue;
      let doubanUrl: string = '';
      if (doubanLink && doubanLink.match(/movie\.douban\.com/)) {
        doubanUrl = doubanLink;
      } else {
        const { imdbUrl, movieName } = TORRENT_INFO;
        const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
        if (doubanData) {
          let { id, season = '' } = doubanData;
          if (season) {
            const tvData = await getTvSeasonData(doubanData);
            if (tvData) {
              id = tvData.id;
            }
          }
          doubanUrl = `https://movie.douban.com/subject/${id}`;
        }
      }
      if (doubanUrl) {
        TORRENT_INFO.doubanUrl = doubanUrl;
        setSearchValue(doubanUrl);
        if (!TORRENT_INFO.description.match(/(片|译)\s*名/)) {
          const isTVCategory = !!TORRENT_INFO.category.match(/tv/);
          const movieData = await getDoubanInfo(doubanUrl, isTVCategory);
          if (movieData) {
            Notification.open({
              message: $t('成功'),
              description: $t('获取成功'),
            });
            updateTorrentInfo(movieData);
          }
        } else {
          Notification.open({
            message: $t('成功'),
            description: $t('获取成功'),
          });
        }
      }
    } catch (error) {

    } finally {
      setBtnText('获取豆瓣简介');
      setBtnDisable(false);
    }
  };
  const getBookData = () => {
    let { doubanUrl } = TORRENT_INFO;
    if (!doubanUrl) {
      doubanUrl = searchValue;
    } else {
      setSearchValue(doubanUrl);
    }
    if (doubanUrl) {
      setBookBtnText('获取中...');
      setBtnDisable(true);
      getDoubanBookInfo(doubanUrl).then(data => {
        if (data) {
          TORRENT_INFO.title = data.chineseTitle || data.foreignTitle;
          TORRENT_INFO.poster = data.poster;
          TORRENT_INFO.description = data.book_intro || '';
          TORRENT_INFO.doubanBookInfo = data || null;
        }
        Notification.open({
          message: $t('成功'),
          description: $t('获取成功'),
        });
      }).catch(error => {
        console.log(error);
        Notification.open({
          message: $t('错误'),
          description: error.message,
        });
      }).finally(() => {
        setBookBtnText('获取豆瓣读书简介');
        setBtnDisable(false);
      });
    } else {
      Notification.open({
        message: $t('错误'),
        description: $t('缺少豆瓣链接'),
      });
    }
  };
  return showSearch
    ? <>
      <div className="function-list-item">
        <div className="douban-section">
          <input type="text"
            placeholder={$t('手动输入豆瓣链接')}
            value={searchValue}
            onChange={(e) => setSearchValue((e.target as HTMLInputElement).value)} />
        </div>
      </div>
      <div className="function-list-item" >
        <div className="douban-section">
          {
            (showSearch && CURRENT_SITE_NAME !== 'SoulVoice') && <button
              id="douban-info"
              disabled={btnDisable}
              className={btnDisable ? 'is-disabled' : ''}
              onClick={getDoubanData}>{$t(btnText)}</button>
          }
          {
            (showSearch && CURRENT_SITE_NAME === 'SoulVoice') && <button
              disabled={btnDisable}
              className={btnDisable ? 'is-disabled' : ''}
              id="douban-book-info"
              onClick={getBookData}>{$t(bookBtnText)}</button>
          }
        </div>
      </div >
    </>
    : null;
};
export default Douban;
