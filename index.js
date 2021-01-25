// ==UserScript==
// @name         easy seed
// @namespace    https://github.com/techmovie/easy-seed
// @version      0.1
// @description  easy seeding for different trackers
// @author       birdplane
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        https://hdbits.org/offer.php
// @match        http*://*/upload*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @note
// ==/UserScript==

(function ($) {
  'use strict'
  const SITE_MAP = {
    HDB: {
      url: 'https://hdbits.org',
      host: 'hdbits.org',
      siteType: 'HDB',
      asSource: false,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: '/upload.php',
      searchPath: '/browse.php',
      searchKey: 'search',
      searchParam: {
        sort: 'size',
        d: 'DESC' // orderBy
      },
      name: {
        selector: '#name'
      },
      description: {
        selector: '#descr'
      },
      imdb: {
        selector: 'input[name="imdb"]'
      },
      mediaInfo: {
        selector: 'textarea[name="techinfo"]'
      },
      category: {
        selector: '#type_category',
        map: {
          movie: '1',
          tv: '2',
          documentary: '3',
          concert: '4',
          sport: '5'
        }
      },
      codes: {
        selector: '#type_codec',
        map: {
          h264: '1',
          hevc: '5',
          x264: '1',
          x265: '5',
          mpeg2: '2',
          vc1: '3',
          xvid: '4',
          bluray: '1',
          uhdbluray: '5',
          vp9: '6'
        }
      },
      videoType: {
        selector: '#type_medium',
        map: {
          bluray: '1',
          remux: '5',
          encode: '3',
          web: '6',
          hdtv: '4'
        }
      }
    },
    MTeam: {
      url: 'https://pt.m-team.cc',
      host: 'pt.m-team.cc',
      siteType: 'NexusPHP',
      asSource: false,
      asTarget: true,
      uploadPath: '/upload.php',
      searchPath: '/browse.php',
      searchKey: 'search',
      searchParam: {
        search_area: '{key}',
        sort: '5',
        type: 'desc'
      },
      name: {
        selector: '#name'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: '#descr'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      category: {
        selector: '#browsecat',
        map: {
          movie: ['401', '419', '420', '421', '439'],
          tv: ['403', '402', '435', '402', '439', '435', '438'],
          documentary: '404',
          concert: '406',
          sport: '407'
        }
      },
      codes: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: ['1', '11'],
          hevc: '16',
          x264: '1',
          x265: '16',
          mpeg2: '4',
          mpeg4: '15',
          vc1: '2',
          xvid: '3'
        }
      },
      videoType: {
        map: {
          bluray: ['421', '438'],
          remux: '439',
          encode: ['401', '419', '403', '402'],
          web: ['419', '402'],
          hdtv: ['419', '402'],
          dvd: ['420', '435'],
          dvdrip: ['401', '403'],
          other: ''
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          '2160p': ['6', '419', '402'],
          '1080p': ['1', '419', '402'],
          '1080i': ['2', '419', '402'],
          '720p': ['3', '419', '402'],
          '576p': ['5', '401', '403'],
          '480p': ['5', '401', '403']
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: '1',
          US: '2',
          EU: '2',
          HK: '3',
          TW: '3',
          JP: '4',
          KR: '5',
          OT: '6'
        }
      }
    },
    TTG: {
      url: 'https://totheglory.im',
      host: 'totheglory.im',
      siteType: 'TTG',
      asSource: false,
      asTarget: true,
      uploadPath: '/upload.php',
      searchPath: '/browse.php',
      searchKey: 'search_field',
      searchParam: {
        sort: '5',
        type: 'desc'
      },
      name: {
        selector: 'input[name="name"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="imdb_c"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: ['51', '52', '53', '54', '108', '109'],
          moviePack: [],
          tv: ['69', '70', '73', '74', '75', '76', '87', '88', '99', '90'],
          tvPack: [],
          documentary: ['62', '63', '67'],
          concert: '59',
          sport: '57',
          cartoon: '58',
          variety: ['103', '60', '101']
        }
      },
      videoType: {
        map: {
          bluray: ['54', '109', '67'],
          remux: '',
          encode: '',
          web: '',
          hdtv: '',
          dvd: ['51'],
          dvdrip: ['51'],
          other: ''
        }
      },
      resolution: {
        map: {
          '2160p': ['108', '109', '67'],
          '1080p': ['53', '63', '70', '75'],
          '1080i': ['53', '63', '70', '75'],
          '720p': ['52', '62', '69', '76'],
          '576p': '',
          '480p': ''
        }
      },
      area: {
        map: {
          CN: ['76', '75', '90'],
          US: ['69', '70', '87'],
          EU: ['69', '70', '87'],
          HK: ['76', '75', '90'],
          TW: ['76', '75', '90'],
          JP: ['73', '88', '101'],
          KR: ['74', '99', '103'],
          OT: ''
        }
      }
    },
    HDHome: {
      url: 'https://hdhome.org',
      host: 'hdhome.org',
      siteType: 'NexusPHP',
      asSource: false,
      asTarget: true,
      uploadPath: '/upload.php',
      searchPath: '/torrents.php',
      searchKey: 'search',
      searchParam: {
        search_area: '{key}',
        sort: '5',
        type: 'desc'
      },
      name: {
        selector: '#name'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: '#descr'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      category: {
        selector: '#browsecat',
        map: {
          movie: ['411', '412', '413', '414', '415', '450', '499', '416'],
          moviePack: '',
          tv: ['425', '426', '471', '427', '428', '429', '430', '452', '431'],
          tvPack: ['432', '433', '434', '435', '436', '437', '438', '502'],
          documentary: ['417', '418', '419', '420', '421', '451', '500', '422'],
          concert: '441',
          sport: ['442', '443'],
          cartoon: ['444', '445', '446', '447', '448', '454', '449', '501'],
          variety: []
        }
      },
      codes: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: '1',
          hevc: '12',
          x264: '1',
          x265: '2',
          mpeg2: '4',
          mpeg4: '5',
          vc1: '3',
          xvid: '5'
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: '9',
          bluray: '1',
          hdtv: '4',
          dvd: '3',
          web: '7',
          vhs: '8',
          hddvd: '8'
        }
      },
      audioCodes: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: '6',
          ac3: '15',
          dd: '15',
          'dd+': '15',
          dts: '3',
          truehd: '13',
          lpcm: '14',
          dtshdma: '11',
          atmos: '12',
          dtsx: '17'
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: '10',
          bluray: '1',
          remux: '3',
          encode: '7',
          web: '11',
          hdtv: '5',
          dvd: '',
          dvdrip: '7',
          other: ''
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          '2160p': '1',
          '1080p': '2',
          '1080i': '3',
          '720p': '4',
          '576p': '5',
          '480p': '5'
        }
      }
    },
    PTP: {
      url: 'https://passthepopcorn.me',
      host: 'passthepopcorn.me',
      siteType: 'gazelle',
      asSource: true,
      asTarget: false,
      needDoubanInfo: true,
      uploadPath: '/upload.php',
      searchPath: '/torrents.php',
      searchKey: 'search',
      searchParam: {
        action: 'advanced'
      }
    }
  }
  // 快速检索
  const SEARCH_SITE_MAP = {
    HDB: 'https://hdbits.org/browse.php?search={imdbid}&sort=size&h=8&d=DESC',
    PTP: 'https://passthepopcorn.me/torrents.php?action=advanced&searchstr={imdbid}',
    MTeam: 'https://pt.m-team.cc/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area={searchArea}&search_mode=0',
    TTG: 'https://totheglory.im/browse.php?search_field={imdbid}&c=M&sort=5&type=desc',
    CHD: 'https://chdbits.co/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area=4&search_mode=0',
    BHD: 'https://beyond-hd.me/torrents/all?doSearch=Search&imdb={imdbid}&sorting=size&direction=desc',
    BLU: 'https://blutopia.xyz/torrents?imdb={imdbid}',
    AHD: 'https://awesome-hd.me/torrents.php?searchstr={imdbid}'
  }

  const TORRENT_INFO = {
    title: '', // 标题
    subtitle: '', // 副标题
    description: '', // 描述
    year: '',
    type: '', // 电影、电视、音乐等
    videoType: '', // bluray remux encodes web-dl
    source: '', // 视频来源
    codes: '', // 视频编码
    audioCodes: '',
    resolution: '', // 分辨率
    area: '', // 地区
    doubanUrl: '', // 豆瓣地址
    doubanInfo: '',
    imdbUrl: '', // imdb地址
    tags: '',
    mediaInfo: '',
    bdinfo: '',
    screenshots: [],
    movieAkaName: '',
    movieName: '',
    sourceSite: ''
  }
  const API_KEY = '054022eaeae0b00e0fc068c0c0a2102a'
  const DOUBAN_API_URL = 'https://frodo.douban.com/api/v2'
  const DOUBAN_SEARCH_API = 'https://omit.mkrobot.org/movie/infos'
  const PT_GEN_API = 'https://media.pttool.workers.dev'
  const getSiteName = (host) => {
    let siteName = ''
    try {
      Object.keys(SITE_MAP).forEach(key => {
        const hostName = SITE_MAP[key].host
        if (hostName && host === hostName) {
          siteName = key
        }
      })
      return siteName
    } catch (error) {
      if (error.message !== 'end loop') {
        console.log(error)
      }
    }
  }
  const currentSiteName = getSiteName(location.host)
  const currentSiteInfo = SITE_MAP[currentSiteName]

  // =============目标站点方法============

  const getDescription = (info) => {
    const thanksQuote = `[quote][size=4]source from [b][color=#1A73E8]${info.sourceSite}[/color][/b]. Thanks![/size][/quote]`
    const siteInfo = currentSiteInfo
    const doubanInfo = (!siteInfo.needDoubanInfo && info.doubanInfo) ? `${info.doubanInfo}\n` : ''
    const logs = info.logs ? `eac3to logs:\n[hide]${info.logs}[/hide]\n\n` : ''
    const bdinfo = info.bdinfo ? `BDInfo:\n${info.bdinfo}\n\n` : ''
    const mediaInfo = siteInfo.mediaInfo ? '' : `[quote]${info.mediaInfo}[/quote]\n`
    return `${thanksQuote}\n\n${doubanInfo}${mediaInfo}${info.description}\n\n${logs}${bdinfo}\n\nScreens:\n${info.screenshots.join('')}`
  }
  const fillTargetForm = (info) => {
    console.log(info)
    const siteInfo = currentSiteInfo
    if (currentSiteName === 'HDB') {
      let mediaTitle = info.title.replace(/([^\d]+)\s+(\d+)/, (match, p1, p2) => {
        return `${info.movieName || info.movieAkaName} ${p2}`
      })
      if (info.videoType === 'remux') {
        mediaTitle = mediaTitle.replace(/ (bluray|blu-ray)/ig, '')
      }
      info.title = mediaTitle
    }
    $(siteInfo.name.selector).val(info.title)
    if (siteInfo.subtitle) {
      $(siteInfo.subtitle.selector).val(info.subtitle)
    }
    const mediaInfo = info.videoType === 'bluray' ? '' : info.mediaInfo
    const description = getDescription(info)
    if (siteInfo.mediaInfo) {
      $(siteInfo.mediaInfo.selector).val(mediaInfo)
    }
    $(siteInfo.description.selector).val(description)
    if (siteInfo.area && siteInfo.area.selector) {
      $(siteInfo.area.selector).val(siteInfo.area.map[info.area])
    }
    $(siteInfo.description.selector).val(description)
    const category = siteInfo.category.map[info.type]
    const videoCodes = siteInfo.codes ? siteInfo.codes.map[info.codes] : undefined
    const videoType = siteInfo.videoType.map[info.videoType]
    const resolution = siteInfo.resolution ? siteInfo.resolution.map[info.resolution] : undefined
    let finalSelectArray = []
    if (Array.isArray(category)) {
      finalSelectArray = [...category]
      if (Array.isArray(videoCodes)) {
        finalSelectArray = finalSelectArray.filter(item => videoCodes.includes(item))
      } else if (siteInfo.codes) {
        $(siteInfo.codes.selector).val(videoCodes)
      }
      if (Array.isArray(videoType)) {
        finalSelectArray = finalSelectArray.filter(item => videoType.includes(item))
      } else if (siteInfo.videoType) {
        $(siteInfo.videoType.selector).val(videoType)
      }
      if (resolution) {
        if (Array.isArray(resolution)) {
          finalSelectArray = finalSelectArray.filter(item => resolution.includes(item))
          if (siteInfo.resolution.selector) {
            $(siteInfo.resolution.selector).val(resolution[0])
          }
        } else {
          $(siteInfo.resolution.selector).val(resolution)
        }
      }
      $(siteInfo.category.selector).val(finalSelectArray[0])
    } else {
      $(siteInfo.category.selector).val(category)
      $(siteInfo.codes.selector).val(videoCodes)
      $(siteInfo.videoType.selector).val(videoType)
      $(siteInfo.resolution.selector).val(resolution)
    }
    $(siteInfo.imdb.selector).val(info.imdbUrl)
  }
  // =============源站点方法==============

  // =======PTP站点方法=======
  const getPTPInfo = () => {
    const torrentId = getUrlParam('torrentid')
    if (!torrentId) {
      return false
    }
    TORRENT_INFO.sourceSite = currentSiteName
    const torrentDom = $(`#torrent_${torrentId}`)
    const ptpMovieTitle = $('.page__title').text().match(/(^|])([^\d[]+)/)[2].trim()
    const [movieName, movieAkaName = ''] = ptpMovieTitle.split(' AKA ')
    TORRENT_INFO.movieName = movieName
    TORRENT_INFO.movieAkaName = movieAkaName
    TORRENT_INFO.imdbUrl = $('#imdb-title-link').attr('href') || ''
    TORRENT_INFO.year = $('.page__title').text().match(/\[(\d+)\]/)[2]
    const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`)
    let torrentName = torrentHeaderDom.data('releasename')
    torrentName = formatTorrentTitle(torrentName)
    TORRENT_INFO.title = torrentName
    TORRENT_INFO.type = getPTPType()
    if (TORRENT_INFO.type === 'music') {
      TORRENT_INFO.description = $('#synopsis').text()
    }
    const infoArray = torrentHeaderDom.find('#PermaLinkedTorrentToggler').text().replace(/ /g, '').split('/')
    const [codes, container, source, resolution, ...otherInfo] = infoArray
    const isRemux = otherInfo.includes('Remux')
    TORRENT_INFO.videoType = source === 'WEB' ? 'web' : getVideoType(container, isRemux)
    TORRENT_INFO.codes = getPtpCodes(codes)
    TORRENT_INFO.source = getPTPSource(source, codes)
    TORRENT_INFO.resolution = resolution
    const { logs, bdinfo } = getPTPLogsOrBDInfo(torrentDom)
    TORRENT_INFO.logs = logs
    TORRENT_INFO.bdinfo = bdinfo
    TORRENT_INFO.mediaInfo = `${torrentDom.find('.mediainfo.mediainfo--in-release-description').next('blockquote').text()}`
    TORRENT_INFO.screenshots = getPTPImage(torrentDom).map(img => {
      return `[img]${img}[/img]`
    })
    TORRENT_INFO.area = getAreaCode()
    createSeedDom(torrentDom.find('>td'), TORRENT_INFO)
  }
  const getPTPType = () => {
    const typeMap = {
      'Feature Film': 'movie',
      'Short Film': 'movie',
      'Stand-up Comedy': 'other',
      Miniseries: 'tv',
      'Live Performance': 'concert',
      'Movie Collection': 'movie'
    }
    const ptpType = $('#torrent-table .basic-movie-list__torrent-edition__main').eq(0).text()
    return typeMap[ptpType]
  }
  // 获取eac3to日志
  const getPTPLogsOrBDInfo = (torrentDom) => {
    const quoteList = torrentDom.find('.movie-page__torrent__panel blockquote')
    let logs = ''; let bdinfo = ''
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = quoteList[i].textContent
      if (quoteContent.includes('eac3to')) {
        logs += `[quote]${quoteContent}[/quote]`
      }
      if (quoteContent.includes('DISC INFO:')) {
        bdinfo += `[quote]${quoteContent}[/quote]`
      }
    }
    return {
      logs,
      bdinfo
    }
  }
  // 获取截图
  const getPTPImage = () => {
    let isComparison = false
    let imgList = []
    const torrentInfoPanel = $('.movie-page__torrent__panel')
    const links = torrentInfoPanel.find('a')
    for (let i = 0; i < links.length; i++) {
      const clickFunc = links[i].getAttribute('onclick')
      if (clickFunc && clickFunc.includes('BBCode.ScreenshotComparisonToggleShow')) {
        isComparison = true
        imgList = JSON.parse(clickFunc.match(/\["http([^\]]*)\]/)[0])
        break
      }
    }
    if (!isComparison) {
      const imageDom = torrentInfoPanel.find('.bbcode__image')
      for (let i = 0; i < imageDom.length; i++) {
        imgList.push(imageDom[i].getAttribute('src'))
      }
    }
    return imgList
  }
  const getPTPSource = (source, codes) => {
    if (codes.match(/BD100|BD66/g)) {
      return 'uhdbluray'
    }
    return source.replace(/-/g, '').toLowerCase()
  }
  const getPtpCodes = (codes) => {
    if (codes === 'BD66' || codes === 'BD100') {
      return 'hevc'
    }
    if (codes.startsWith('BD')) {
      return 'h264'
    }
    if (codes.startsWith('DVD')) {
      return 'dvd'
    }
    return codes.replace(/[.-]/g, '').toLowerCase()
  }
  const getVideoType = (container, isRemux) => {
    const isBluray = container === 'm2ts' || container === 'ISO'
    const isDVD = container === 'DVD9' || container === 'DVD5'
    let type = ''
    if (isRemux) {
      type = 'remux'
    } else if (isBluray) {
      type = 'bluray'
    } else if (isDVD) {
      type = 'dvd'
    } else if (container.match(/MKV|AVI|MP4/i)) {
      type = 'encode'
    }
    return type
  }
  const getAreaCode = () => {
    const europeList = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City']
    let country = []
    const matchArray = $('#movieinfo div').text().match(/Country:\s+([^\n]+)/)
    if (matchArray && matchArray.length > 0) {
      country = matchArray[1].replace(/(,)\s+/g, '$1').split(',')
    }
    if (country[0]) {
      if (country[0].match(/USA|Canada/i)) {
        return 'US'
      } else if (europeList.includes(country[0])) {
        return 'EU'
      } else if (country[0].match(/Japan/i)) {
        return 'JP'
      } else if (country[0].match(/Korea/i)) {
        return 'KR'
      } else if (country[0].match(/Taiwan/i)) {
        return 'TW'
      } else if (country[0].match(/Hong Kong/i)) {
        return 'HK'
      } else if (country[0].match(/China/i)) {
        return 'CN'
      }
    }
    return 'OT'
  }
  // =======PTP站点方法结束=======

  // =============公共方法=================

  const getTorrentInfo = () => {
    if (currentSiteName === 'PTP') {
      getPTPInfo()
    }
  }
  const formatTorrentTitle = (title) => {
    // 保留5.1 H.264中间的点
    return title.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig, ' ').replace(/\.(?!(\d+))/, ' ').trim()
  }
  const getUrlParam = (key) => {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    const regArray = location.search.substr(1).match(reg)
    if (regArray) {
      return unescape(regArray[2])
    }
    return ''
  }
  const createSeedDom = (torrentDom, torrentInfo) => {
    const siteList = Object.keys(SITE_MAP).map(siteName => {
      const { url, uploadPath } = SITE_MAP[siteName]
      if (SITE_MAP[siteName].asTarget) {
        return `<li><a href="${url}${uploadPath}#torrentInfo=${encodeURIComponent(JSON.stringify(torrentInfo))}" target="_blank">${siteName}</a></li>`
      }
      return ''
    })
    const searchList = Object.keys(SEARCH_SITE_MAP).map(siteName => {
      const imdbId = torrentInfo.imdbUrl ? /tt\d+/.exec(torrentInfo.imdbUrl)[0] : ''
      let url = ''
      let searchKeyWord = imdbId || torrentInfo.movieAkaName || torrentInfo.movieName
      if (siteName === 'TTG' && imdbId) {
        searchKeyWord = searchKeyWord.replace('tt', 'imdb')
      }
      url = SEARCH_SITE_MAP[siteName].replace('{imdbid}', searchKeyWord)
      url = url.replace('{searchArea}', imdbId ? '4' : '0')
      return `<li><a href="${url}" target="_blank">${siteName}</a></li>`
    })
    const doubanDom = currentSiteInfo.needDoubanInfo
      ? `<h4>获取豆瓣简介</h4>
    <div class="douban-section">
      <button id="douban-info">开始获取</button>
      <div class="douban-status"></div>
    </div>`
      : ''
    const seedDom = `
    <div class="seed-dom movie-page__torrent__panel">
      <h4>一键转种 🎬</h4>
      <ul class="site-list">
        ${siteList.join('')}
      </ul>
      ${doubanDom}
      <h4>转缩略图 ⏫</h4>
      <div class="upload-section">
        <button id="img-transfer">开始转换</button>
        <div class="checkbox">
          <input type="checkbox" id="nsfw">
          <label for="nsfw">是否为NSFW</label>
        </div>
        <div class="upload-status"></div>
      </div>
      <h4>快速检索 🔍</h4>
      <ul class="search-list">
        ${searchList.join('')}
      </ul>
    </div>
    `
    torrentDom.prepend(seedDom)
  }
  const getDoubanLink = () => {
    const doubanLink = $('.page__title>a').attr('href')
    if (doubanLink && doubanLink.match('movie.douban.com')) {
      TORRENT_INFO.doubanUrl = doubanLink
      getDoubanInfo()
      return false
    }
    if (TORRENT_INFO.imdbUrl) {
      const imdbId = /tt\d+/.exec(TORRENT_INFO.imdbUrl)[0]
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${DOUBAN_SEARCH_API}/${imdbId}`,
        onload (res) {
          const data = JSON.parse(res.responseText)
          console.log(data)
          if (data && data.data) {
            TORRENT_INFO.doubanUrl = `https://movie.douban.com/subject/${data.data.id}`
            getDoubanInfo()
          }
        }
      })
    } else {
      GM_xmlhttpRequest({
        method: 'GET',
        url: `${DOUBAN_API_URL}/search/weixin?q=${TORRENT_INFO.movieName}&start=0&count=1&apiKey=${API_KEY}`,
        onload (res) {
          const data = JSON.parse(res.responseText)
          console.log(data)
          if (data && data.items && data.items.length > 0) {
            TORRENT_INFO.doubanUrl = `https://movie.douban.com/subject/${data.items[0].id}`
            getDoubanInfo()
          }
        }
      })
    }
  }
  const getDoubanInfo = () => {
    const { doubanUrl } = TORRENT_INFO
    const statusDom = $('.douban-section .douban-status')
    try {
      if (doubanUrl) {
        statusDom.text('获取中...')
        GM_xmlhttpRequest({
          method: 'GET',
          url: `${PT_GEN_API}?url=${doubanUrl}`,
          onload (res) {
            const data = JSON.parse(res.responseText)
            if (data && data.success) {
              TORRENT_INFO.doubanInfo = data.format
              getSubTitle(data)
              replaceTorrentInfo()
              statusDom.text('获取成功')
            } else {
              throw new Error('获取豆瓣信息失败')
            }
          }
        })
      } else {
        throw new Error('无法获取豆瓣信息')
      }
    } catch (error) {
      statusDom.text(error.message)
    }
  }
  const getSubTitle = (data) => {
    const titles = data.trans_title.join('/')
    const { director = [] } = data
    const directorArray = director.map(item => {
      return replaceEngName(item.name)
    })
    const mainCast = data.cast.slice(0, 2).map(cast => {
      return replaceEngName(cast.name)
    })
    const directorStr = directorArray.length > 0 ? `|导演: ${directorArray.join(' ')}` : ''
    const castStr = mainCast.length > 0 ? `|主演:${mainCast.join(' ')}` : ''
    TORRENT_INFO.subtitle = titles + directorStr + castStr
  }
  const replaceEngName = (string) => {
    return string.replace(/\s+[A-Za-z\s]+/, '')
  }
  const transferImgs = () => {
    const statusDom = $('.upload-section .upload-status')
    const ptpImgList = getPTPImage($())
    try {
      if (ptpImgList.length < 1) {
        throw new Error('获取图片列表失败')
      }
      const imgList = ptpImgList.join('\n')
      const isNSFW = $('#nsfw').is(':checked')
      const params = encodeURI(`imgs=${imgList}&content_type=${isNSFW ? 1 : 0}&max_th_size=300`)
      statusDom.text('转换中...')
      $('#img-transfer').attr('disabled', true).addClass('is-disabled')
      GM_xmlhttpRequest({
        url: 'https://pixhost.to/remote/',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: params,
        onload (res) {
          $('#img-transfer').removeAttr('disabled').removeClass('is-disabled')
          const data = res.responseText.match(/(upload_results = )({.*})(;)/)
          if (!data) {
            throw new Error('上传失败，请重试')
          }
          let imgResultList = []
          if (data && data.length) {
            imgResultList = JSON.parse(data[2]).images
            if (imgResultList.length) {
              TORRENT_INFO.screenshots = imgResultList.map(imgData => {
                return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`
              })
              replaceTorrentInfo()
              statusDom.text('转换成功！')
            }
          } else {
            throw new Error('上传失败，请重试')
          }
        }
      })
    } catch (error) {
      $('#img-transfer').removeAttr('disabled').removeClass('is-disabled')
      statusDom.text(error.message)
    }
  }

  const replaceTorrentInfo = () => {
    $('.site-list a').each((index, link) => {
      const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO))
      const newHref = $(link).attr('href').replace(/(#torrentInfo=)(.+)/, `$1${torrentInfo}`)
      $(link).attr('href', newHref)
    })
  }
  // =============页面注入开始==============
  const paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/)
  let torrentParams = (paramsMatchArray && paramsMatchArray.length > 0) ? paramsMatchArray[2] : null
  if (currentSiteName) {
    if (torrentParams && currentSiteInfo.asTarget) {
      torrentParams = JSON.parse(decodeURIComponent(torrentParams))
      fillTargetForm(torrentParams)
    }
    if (currentSiteInfo.asSource) {
      // 向当前所在站点添加按钮等内容
      getTorrentInfo()
      // 原图转缩略图
      if ($('#img-transfer')) {
        $('#img-transfer').click(() => {
          transferImgs()
        })
      }
      if ($('#douban-info')) {
        $('#douban-info').click(() => {
          getDoubanLink()
        })
      }
    }
  }
  GM_addStyle(`
    .seed-dom h4{
      text-align: center;
      margin: 0;
      margin-bottom: 15px;
    }
    .site-list,.search-list{
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    .seed-dom li {
      margin-right: 5px;
      padding-right: 5px;
      border-right: 1px solid #fff;
    }
    .seed-dom li:last-child{
      border: none;
    }
    .seed-dom li a{
      font-weight: 600;
    }
    .upload-section,.douban-section{
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
      align-items: center;
    }
    .upload-section .upload-status,.douban-section .douban-status{
      margin-left: 5px;
      font-size: 14px;
    }
    #img-transfer,#douban-info{
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 8px 20px;
      font-size: 14px;
      border-radius: 4px;
      margin:0;
      margin-right: 5px;
    }
    #img-transfer:hover {
      background: #fff;
      border-color: #409eff;
      color: #409eff
    }
    #img-transfer.is-disabled, #img-transfer.is-disabled:hover {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: #fff;
      border-color: #ebeef5;
    }
  `)
})(jQuery)
