// ==UserScript==
// @name         easy-seed PT一键转种
// @namespace    https://github.com/techmovie/easy-seed
// @version      1.1.4
// @description  easy seeding for different trackers
// @author       birdplane
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        http://*/details.php?id=*
// @match        https://*/details.php?id=*
// @match        https://totheglory.im/t/*
// @match        https://beyond-hd.me/torrents/*
// @match        https://lemonhd.org/upload_*
// @match        https://lemonhd.org/details*
// @match        https://blutopia.xyz/torrents/*
// @match        https://blutopia.xyz/torrents?*
// @match        https://blutopia.xyz/upload/*
// @match        https://pt.hdpost.top/torrents?*
// @match        https://pt.hdpost.top/torrents/*
// @match        https://asiancinema.me/torrents/*
// @match        https://asiancinema.me/torrents?*
// @match        https://*/upload*
// @match        http://*/upload*
// @match        http://www.hd.ai/Torrents.upload
// @match        http://www.hd.ai/Torrents.index?*
// @match        https://broadcity.in/browse.php?imdb=*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(() => {
  var __assign = Object.assign;

  // src/config.yaml
  var PT_SITE = {
    ACM: {
      url: "https://asiancinema.me",
      host: "asiancinema.me",
      siteType: "UNIT3D",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#vue+.panel table>tbody>tr:last",
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.radio-inline:first input[name="anonymous"]'
      },
      videoType: {
        selector: "#autocat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      category: {
        selector: "#autotype",
        map: {
          BD100: "1",
          BD66: "2",
          UHD50: "3",
          BD50: "4",
          BD25: "5",
          remux: [
            "12",
            "7"
          ],
          encode: [
            "8",
            "10",
            "11",
            "13"
          ],
          web: "9",
          hdtv: "17",
          dvd: [
            "14",
            "16"
          ],
          dvdrip: "13",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "2160p": [
            "1",
            "1",
            "2",
            "3",
            "12",
            "8"
          ],
          "1080p": [
            "2",
            "4",
            "5",
            "7",
            "10"
          ],
          "1080i": [
            "2",
            "4",
            "5",
            "7",
            "10"
          ],
          "720p": [
            "3",
            "11"
          ],
          "576p": [
            "4",
            "13"
          ],
          "480p": [
            "5",
            "14",
            "16",
            "13"
          ],
          other: ""
        }
      }
    },
    KG: {
      url: "https://karagarga.in",
      host: "karagarga.in",
      siteType: "KG",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "imdb",
        nameOptionKey: "title",
        params: {
          search: "{imdb}",
          search_type: "{optionKey}",
          sort: "size",
          d: "DESC"
        }
      }
    },
    FL: {
      url: "https://filelist.io",
      host: "filelist.io",
      siteType: "FL",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "3",
        nameOptionKey: "0",
        params: {
          search: "{imdb}",
          searchin: "{optionKey}",
          sort: "3"
        }
      }
    },
    HDT: {
      url: "https://hd-torrents.org",
      host: "hd-torrents.org",
      siteType: "HDT",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "2",
        nameOptionKey: "3",
        params: {
          search: "{imdb}",
          options: "{optionKey}",
          order: "size",
          by: "DESC"
        }
      },
      name: {
        selector: 'input[name="filename"]'
      },
      imdb: {
        selector: 'input[name="infosite"]'
      },
      description: {
        selector: 'textarea[name="info"]'
      },
      tags: {
        HDR: 'input[name="HDR10"]',
        "HDR10+": 'input[name="HDR10Plus"]',
        DolbyVision: 'input[name="DolbyVision"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="category"]',
        map: {
          movie: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          tv: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ],
          tvPack: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ],
          documentary: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          cartoon: [
            "70",
            "1",
            "71",
            "2",
            "64",
            "5",
            "3",
            "63"
          ],
          concert: [
            "61",
            "62",
            "66",
            "57",
            "45",
            "44"
          ],
          variety: [
            "72",
            "59",
            "73",
            "60",
            "65",
            "30",
            "38"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "70",
            "72"
          ],
          bluray: [
            "1",
            "59",
            "61"
          ],
          remux: [
            "71",
            "2",
            "62",
            "73",
            "60"
          ],
          encode: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ],
          web: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ],
          hdtv: [
            "64",
            "5",
            "3",
            "65",
            "30",
            "38",
            "66",
            "57",
            "45"
          ]
        }
      },
      resolution: {
        map: {
          "2160p": [
            "70",
            "72",
            "71",
            "73",
            "64",
            "65",
            "66"
          ],
          "1080p": [
            "1",
            "59",
            "61",
            "2",
            "60",
            "62",
            "5",
            "30",
            "57"
          ],
          "1080i": [
            "1",
            "59",
            "61",
            "2",
            "60",
            "62",
            "5",
            "30",
            "57"
          ],
          "720p": [
            "3",
            "38",
            "45"
          ]
        }
      }
    },
    UHDBits: {
      url: "https://uhdbits.org",
      host: "uhdbits.org",
      siteType: "gazelle",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "size",
          searchstr: "{imdb}"
        }
      }
    },
    "nzb.in": {
      url: "https://nzbs.in",
      host: "nzbs.in",
      siteType: "nzb",
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}",
        params: {
          t: -1,
          ob: "size_desc"
        }
      }
    },
    SoulVoice: {
      url: "https://pt.soulvoice.club",
      host: "soulvoice.club",
      siteType: "NexusPHP",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "2",
          h265: "2",
          x264: "1",
          x265: "2",
          mpeg2: "5",
          mpeg4: "1",
          vc1: "5",
          xvid: "5"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "3",
          "1080p": "1",
          "1080i": "2",
          "720p": "4",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hds: "1",
          chd: "2",
          frds: "3",
          cmct: "4",
          other: "5"
        }
      }
    },
    HDRoute: {
      url: "http://hdroute.org",
      host: "hdroute.org",
      siteType: "NexusPHP",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          s: "{name}",
          dp: "0",
          add: "0",
          action: "s",
          or: "4",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title_eng"
      },
      subtitle: {
        selector: 'input[name="title_sub"]'
      },
      description: {
        selector: 'textarea[name="description"]'
      },
      poster: 'input[name="poster_big"]',
      imdb: {
        selector: "#upload-imdb_url"
      },
      anonymous: {
        selector: 'input[name="is_anonymous"]'
      },
      tags: {
        chineseAudio: 'input[name="is_mandrain"]',
        cantoneseAudio: 'input[name="is_cantonese"]',
        DIY: 'input[name="is_diyed"]',
        chineseSubtitle: 'input[name="is_chs_sub_incl"]'
      },
      category: {
        selector: "#type_category",
        map: {
          movie: "1",
          tv: "3",
          tvPack: "3",
          documentary: "2",
          concert: "5",
          sport: "6",
          cartoon: "4",
          variety: "9"
        }
      },
      videoCodec: {
        selector: "#type_codec",
        map: {
          h264: "1",
          hevc: "7",
          x264: "1",
          x265: "7",
          h265: "7",
          mpeg2: "3",
          mpeg4: "1",
          vc1: "2",
          xvid: "4",
          dvd: "3"
        }
      },
      audioCodec: {
        selector: "#type_audio",
        map: {
          aac: "9",
          ac3: "5",
          dd: "5",
          "dd+": "5",
          flac: "7",
          dts: "4",
          truehd: "3",
          lpcm: "1",
          dtshdma: "2",
          atmos: "2",
          dtsx: "4"
        }
      },
      videoType: {
        selector: "#type_medium",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "4",
          web: "6",
          hddvd: "6",
          hdtv: "3",
          dvd: "6",
          dvdrip: "6",
          other: "6"
        }
      },
      resolution: {
        selector: "#type_resolution",
        map: {
          "2160p": "7",
          "1080p": "1",
          "1080i": "2",
          "720p": "4",
          "576p": "6",
          "480p": "6"
        }
      }
    },
    Bdc: {
      url: "https://broadcity.in",
      host: "broadcity.in",
      siteType: "Bdc",
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        imdbOptionKey: "t_genre",
        nameOptionKey: "t_name",
        params: {
          imdb: "{imdb}",
          search_area: "{optionKey}"
        }
      }
    },
    HDPOST: {
      url: "https://pt.hdpost.top",
      host: "hdpost.top",
      siteType: "UNIT3D",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#vue+.panel table>tbody>tr:last",
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.radio-inline:first input[name="anonymous"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "3",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    HDBits: {
      url: "https://hdbits.org",
      host: "hdbits.org",
      siteType: "HDB",
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#details >tbody >tr:contains(Last seeded)",
      search: {
        path: "/browse.php",
        params: {
          sort: "size",
          d: "DESC",
          search: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: "#imdb"
      },
      mediaInfo: {
        selector: 'textarea[name="techinfo"]'
      },
      category: {
        selector: "#type_category",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "3",
          concert: "4",
          sport: "5",
          cartoon: "1"
        }
      },
      videoCodec: {
        selector: "#type_codec",
        map: {
          h264: "1",
          h265: "5",
          hevc: "5",
          x264: "1",
          x265: "5",
          mpeg2: "2",
          vc1: "3",
          xvid: "4",
          bluray: "1",
          uhdbluray: "5",
          vp9: "6"
        }
      },
      videoType: {
        selector: "#type_medium",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "5",
          encode: "3",
          web: "6",
          hdtv: "4"
        }
      }
    },
    MTeam: {
      url: "https://kp.m-team.cc",
      host: "m-team.cc",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#outer tr:contains(\u57FA\u672C\u8CC7\u8A0A)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      tags: {
        chineseAudio: "#l_dub",
        DIY: "#l_diy",
        chineseSubtitle: "#l_sub"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "401",
            "419",
            "420",
            "421",
            "439"
          ],
          tv: [
            "403",
            "402",
            "435",
            "438"
          ],
          tvPack: [
            "403",
            "402",
            "435",
            "438"
          ],
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          app: "422",
          ebook: "427",
          magazine: "427",
          audioBook: "427"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "16",
          h265: "16",
          x264: "1",
          x265: "16",
          mpeg2: "4",
          mpeg4: "15",
          vc1: "2",
          xvid: "3"
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "421",
            "438"
          ],
          bluray: [
            "421",
            "438"
          ],
          remux: "439",
          encode: [
            "401",
            "419",
            "403",
            "402"
          ],
          web: [
            "419",
            "402"
          ],
          hdtv: [
            "419",
            "402"
          ],
          dvd: [
            "420",
            "435"
          ],
          dvdrip: [
            "401",
            "403"
          ],
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "6",
            "419",
            "402"
          ],
          "1080p": [
            "1",
            "419",
            "402"
          ],
          "1080i": [
            "2",
            "419",
            "402"
          ],
          "720p": [
            "3",
            "419",
            "402"
          ],
          "576p": [
            "5",
            "401",
            "403"
          ],
          "480p": [
            "5",
            "401",
            "403"
          ]
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          mteam: "9",
          mpad: "10",
          tnp: "23",
          mteamtv: "17",
          kishd: "7",
          bmdru: "6",
          onehd: "18",
          cnhk: "19",
          stbox: "20",
          r2hd: "21",
          pack: "8",
          geek: "24"
        }
      }
    },
    CHDBits: {
      url: "https://chdbits.co",
      host: "chdbits.co",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(6)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chineseAudio: 'input[name="cnlang"]',
        chineseSubtitle: 'input[name="cnsub"]',
        DIY: 'input[name="diy"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "5",
          h265: "5",
          x264: "1",
          x265: "5",
          mpeg2: "4",
          mpeg4: "6",
          vc1: "2",
          xvid: "6"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "7",
          dd: "4",
          "dd+": "7",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "13",
          dtshdma: "10",
          atmos: "10",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "19"
          ],
          bluray: [
            "1"
          ],
          remux: [
            "3"
          ],
          encode: [
            "4"
          ],
          web: [
            "18"
          ],
          hdtv: [
            "6"
          ]
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "6"
          ],
          "1080p": [
            "1"
          ],
          "1080i": [
            "2"
          ],
          "720p": [
            "3"
          ],
          "480p": [
            "5"
          ]
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "8",
          US: "3",
          EU: "7",
          HK: "5",
          TW: "9",
          JP: "4",
          KR: "6",
          OT: "0"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chdbits: "14",
          sgnb: "13",
          remux: "1",
          chdtv: "2",
          chdpad: "15",
          chdweb: "12",
          chdhktv: "11",
          stbox: "10",
          onehd: "8",
          blucook: "16",
          hqc: "17",
          gbt: "18",
          kan: "19"
        }
      }
    },
    TTG: {
      url: "https://totheglory.im",
      host: "totheglory.im",
      siteType: "TTG",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#main_table h1+table>tbody>tr:nth-child(2)",
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        replaceKey: [
          "tt",
          "imdb"
        ],
        params: {
          search_field: "{imdb}",
          sort: "5",
          type: "desc",
          c: "M"
        }
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
      anonymous: {
        selector: 'select[name="anonymity"]',
        value: "yes"
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: [
            "51",
            "52",
            "53",
            "54",
            "108",
            "109"
          ],
          tv: [
            "69",
            "70",
            "73",
            "74",
            "75",
            "76"
          ],
          tvPack: [
            "87",
            "88",
            "99",
            "90"
          ],
          documentary: [
            "62",
            "63",
            "67"
          ],
          concert: "59",
          sport: "57",
          cartoon: "58",
          variety: [
            "103",
            "60",
            "101"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "109"
          ],
          bluray: [
            "54",
            "109",
            "67"
          ],
          remux: [
            "53",
            "108",
            "63",
            "70",
            "75"
          ],
          encode: [
            "53",
            "63",
            "70",
            "75",
            "52",
            "62",
            "69",
            "76",
            "108"
          ],
          web: [
            "53",
            "62",
            "63",
            "70",
            "75",
            "52",
            "69",
            "76",
            "108",
            "87",
            "88",
            "99",
            "90"
          ],
          hdtv: [
            "53",
            "63",
            "70",
            "75",
            "52",
            "62",
            "69",
            "76",
            "108",
            "87",
            "88",
            "99",
            "90"
          ],
          dvd: [
            "51"
          ],
          dvdrip: [
            "51"
          ],
          other: ""
        }
      },
      resolution: {
        map: {
          "2160p": [
            "108",
            "109",
            "67"
          ],
          "1080p": [
            "53",
            "63",
            "70",
            "75",
            "54",
            "67",
            "87",
            "88",
            "99",
            "90"
          ],
          "1080i": [
            "53",
            "63",
            "70",
            "75",
            "87",
            "88",
            "99",
            "90"
          ],
          "720p": [
            "52",
            "62",
            "69",
            "76",
            "87",
            "88",
            "99",
            "90"
          ],
          "576p": "51",
          "480p": "51"
        }
      },
      area: {
        map: {
          CN: [
            "76",
            "75",
            "90"
          ],
          US: [
            "69",
            "70",
            "87"
          ],
          EU: [
            "69",
            "70",
            "87"
          ],
          HK: [
            "76",
            "75",
            "90"
          ],
          TW: [
            "76",
            "75",
            "90"
          ],
          JP: [
            "73",
            "88",
            "101"
          ],
          KR: [
            "74",
            "99",
            "103"
          ],
          OT: ""
        }
      }
    },
    SSD: {
      url: "https://springsunday.net",
      host: "springsunday.net",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.new.php",
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: "#descr"
      },
      poster: "#url_poster",
      imdb: {
        selector: "#url"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      mediaInfo: {
        selector: "#Media_BDInfo"
      },
      screenshots: {
        selector: "#url_vimages"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "501",
          tv: "502",
          tvPack: "502",
          documentary: "503",
          concert: "507",
          sport: "506",
          cartoon: "504",
          variety: "505"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "2",
          hevc: "1",
          x264: "2",
          x265: "1",
          h265: "1",
          mpeg2: "4",
          mpeg4: "2",
          vc1: "3",
          xvid: "",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "5",
          ac3: "4",
          dd: "4",
          "dd+": "4",
          flac: "7",
          dts: "3",
          truehd: "2",
          lpcm: "6",
          dtshdma: "1",
          atmos: "3",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "4",
          encode: "6",
          web: "7",
          hdtv: "5",
          dvd: "3",
          dvdrip: "10",
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      area: {
        selector: 'select[name="source_sel"]',
        map: {
          CN: "1",
          US: "9",
          EU: "9",
          HK: "2",
          TW: "2",
          JP: "10",
          KR: "10",
          OT: "3"
        }
      }
    },
    HDHome: {
      url: "https://hdhome.org",
      host: "hdhome.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#outer tr:contains(\u57FA\u672C\u4FE1\u606F)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chineseAudio: "#tag_gy",
        DIY: "#tag_diy",
        cantoneseAudio: "#tag_yy",
        chineseSubtitle: "#tag_zz",
        HDR: "#tag_hdr10",
        "HDR10+": "#tag_hdrm",
        DolbyVision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "411",
            "412",
            "413",
            "414",
            "415",
            "450",
            "499",
            "416"
          ],
          tv: [
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "430",
            "452",
            "431"
          ],
          tvPack: [
            "432",
            "433",
            "434",
            "435",
            "436",
            "437",
            "438",
            "502"
          ],
          documentary: [
            "417",
            "418",
            "419",
            "420",
            "421",
            "451",
            "500",
            "422"
          ],
          concert: "441",
          sport: [
            "442",
            "443"
          ],
          cartoon: [
            "444",
            "445",
            "446",
            "447",
            "448",
            "454",
            "449",
            "501"
          ],
          variety: []
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "1",
          x265: "2",
          h265: "2",
          mpeg2: "4",
          mpeg4: [
            "5",
            "412",
            "418",
            "426",
            "433",
            "445"
          ],
          vc1: "3",
          xvid: "5",
          dvd: "5"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "7",
          vhs: "8",
          hddvd: "8"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "15",
          dd: "15",
          "dd+": "15",
          dts: "3",
          truehd: "13",
          lpcm: "14",
          dtshdma: "11",
          atmos: "12",
          dtsx: "17"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "10",
            "499",
            "500",
            "502",
            "501"
          ],
          bluray: [
            "1",
            "450",
            "451",
            "452",
            "453",
            "454"
          ],
          remux: [
            "3",
            "415",
            "421",
            "430",
            "437",
            "448"
          ],
          encode: [
            "7",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "428",
            "429",
            "431",
            "432",
            "433",
            "434",
            "435",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          web: [
            "11",
            "411",
            "412",
            "413",
            "414",
            "416",
            "417",
            "418",
            "419",
            "420",
            "422",
            "425",
            "426",
            "471",
            "427",
            "429",
            "431",
            "432",
            "433",
            "434",
            "436",
            "438",
            "444",
            "445",
            "446",
            "447",
            "449"
          ],
          hdtv: [
            "5",
            "412",
            "413",
            "416",
            "418",
            "419",
            "422",
            "424",
            "426",
            "471",
            "427",
            "428",
            "431",
            "433",
            "434",
            "435",
            "438",
            "442",
            "443",
            "445",
            "446",
            "449"
          ],
          dvd: [
            "",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          dvdrip: [
            "7",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "1",
            "499",
            "416",
            "500",
            "422",
            "431",
            "438",
            "502",
            "449",
            "501"
          ],
          "1080p": [
            "2",
            "414",
            "420",
            "429",
            "436",
            "447"
          ],
          "1080i": [
            "3",
            "424",
            "428",
            "435",
            "443"
          ],
          "720p": [
            "4",
            "413",
            "419",
            "423",
            "427",
            "434",
            "442",
            "446"
          ],
          "576p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ],
          "480p": [
            "5",
            "411",
            "417",
            "425",
            "432",
            "444"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          "3201": "20",
          "969154968": "22",
          hdhome: "1",
          hdh: "2",
          hdhtv: "3",
          hdhpad: "4",
          hdhweb: "12",
          shma: "17",
          tvman: "21",
          arin: "19",
          ttg: "6",
          mteam: "7",
          other: "11"
        }
      }
    },
    OurBits: {
      url: "https://ourbits.club",
      host: "ourbits.club",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="picture"]',
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chineseAudio: "#tagGY",
        DIY: "#tagDIY",
        cantoneseAudio: "#tag_yy",
        chineseSubtitle: "#tagZZ",
        HDR: "#tagHDR10",
        "HDR10+": "#tagHDR10P",
        DolbyVision: "#tagDB"
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "401",
          "3d": "402",
          tv: "412",
          tvPack: "405",
          documentary: "410",
          concert: "419",
          sport: "415",
          cartoon: "411",
          variety: "413"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "12",
          hevc: "14",
          x264: "12",
          x265: "14",
          h265: "14",
          mpeg2: "15",
          mpeg4: "12",
          vc1: "16",
          xvid: "17",
          dvd: "18"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "7",
          ac3: "6",
          dd: "6",
          "dd+": "6",
          flac: "13",
          dts: "4",
          truehd: "2",
          lpcm: "5",
          dtshdma: "1",
          atmos: "14",
          dtsx: "21"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "4",
          encode: "7",
          web: "9",
          hdtv: "5",
          dvd: "2",
          dvdrip: "2",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      }
    },
    HDSky: {
      url: "https://hdsky.me",
      host: "hdsky.me",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#outer tr:contains(\u57FA\u672C\u4FE1\u606F)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: 'input[name="name"]'
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="url_douban"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "411",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "12",
          x264: "10",
          x265: "13",
          h265: "12",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "12",
          dd: "12",
          "dd+": "12",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "13",
          dtshdma: "10",
          atmos: "17",
          dtsx: "16"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "13",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "11",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      }
    },
    HDChina: {
      url: "https://hdchina.org",
      host: "hdchina.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".table_details>tbody>tr:nth-child(1)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: "#cover",
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "20",
            "17",
            "16",
            "9",
            "410",
            "27"
          ],
          tv: [
            "13",
            "25",
            "26",
            "24",
            "27"
          ],
          tvPack: [
            "20",
            "21",
            "22",
            "23",
            "27"
          ],
          documentary: [
            "20",
            "5",
            "27"
          ],
          concert: "402",
          sport: "15",
          cartoon: "14",
          variety: "401"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "6",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: [
            "1",
            "27"
          ],
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "8",
          dd: "8",
          "dd+": "8",
          dts: "3",
          truehd: "13",
          lpcm: "11",
          dtshdma: "12",
          atmos: "15",
          dtsx: "14",
          flac: "1"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "11",
            "20",
            "410"
          ],
          bluray: [
            "11",
            "20"
          ],
          remux: "6",
          encode: "5",
          web: "21",
          hdtv: "13",
          dvd: "14",
          dvdrip: "4",
          other: "15"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "17",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23",
            "410"
          ],
          "1080p": [
            "11",
            "17",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "1080i": [
            "12",
            "16",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "720p": [
            "13",
            "9",
            "13",
            "25",
            "26",
            "24",
            "21",
            "22",
            "23"
          ],
          "576p": "15",
          "480p": "15"
        }
      },
      area: {
        map: {
          CN: [
            "25",
            "22"
          ],
          US: [
            "13",
            "21"
          ],
          EU: [
            "13",
            "21"
          ],
          HK: [
            "25",
            "22"
          ],
          TW: [
            "25",
            "22"
          ],
          JP: [
            "24",
            "23"
          ],
          KR: [
            "26",
            "23"
          ]
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdchina: "15",
          hdctv: "16",
          ihd: "12",
          hdwing: "10",
          hdwtv: "11",
          kishd: "17",
          openmv: "7",
          hdc: "22",
          diy: "23",
          khq: "6",
          exren: "30",
          joma: "26",
          anonymous: "25",
          crss: "24",
          ebp: "18",
          don: "19",
          esir: "20",
          trollhd: "29",
          wiki: "9",
          beast: "4",
          cmct: "2",
          ngb: "8",
          lu9998: "21",
          taichi: "28",
          u2: "27",
          enichi: "31",
          arey: "32",
          other: "5"
        }
      }
    },
    KEEPFRDS: {
      url: "https://pt.keepfrds.com",
      host: "keepfrds.com",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: false,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      }
    },
    PTSBAO: {
      url: "https://ptsbao.club",
      host: "ptsbao.club",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+font+table>tbody>tr:nth-child(5)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: "#small_descr"
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="imdburl"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chineseSubtitle: 'input[type="checkbox"][name="zz"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "414",
          sport: "409",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: "#medium_sel",
        map: {
          uhdbluray: "10",
          bluray: "1",
          hdtv: "5",
          dvd: "3",
          web: "2",
          vhs: "9",
          hddvd: "9"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          x264: "1",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "5",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: "#audiocodec_sel",
        map: {
          aac: "6",
          ac3: "11",
          dd: "10",
          "dd+": "10",
          dts: "3",
          truehd: "9",
          lpcm: "12",
          dtshdma: "8",
          atmos: "8",
          dtsx: "13",
          flac: "1"
        }
      },
      videoType: {
        selector: "#source_sel",
        map: {
          uhdbluray: "92",
          bluray: "55",
          remux: "88",
          encode: [
            "3",
            "91",
            "92"
          ],
          web: "4",
          hdtv: "94",
          dvd: "89",
          dvdrip: "89",
          other: ""
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": [
            "5",
            "92"
          ],
          "1080p": [
            "1",
            "3"
          ],
          "1080i": "1",
          "720p": [
            "2",
            "91"
          ],
          "576p": "3",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          ffansbd: "8",
          ops: "11",
          ffansweb: "12",
          ffanstv: "13",
          hqc: "10",
          ttg: "3",
          hdc: "6",
          chd: "2",
          hdsky: "9",
          cmct: "4",
          frds: "5",
          other: "7",
          ffansdvd: "14",
          fhdmv: "15",
          enichi: "16"
        }
      }
    },
    BeiTai: {
      url: "https://www.beitai.pt",
      host: "beitai.pt",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: false,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      }
    },
    LemonHD: {
      url: "https://lemonhd.org",
      host: "lemonhd.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#outer>table>tbody>tr:nth-child(5)",
      uploadPath: "/upload_movie.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "imdb",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      tags: {
        chineseAudio: 'input[name="tag_gy"]',
        DIY: "#tagDIY",
        cantoneseAudio: 'input[name="tag_yy"]',
        chineseSubtitle: 'input[name="tag_zz"]',
        CC: 'input[name="tag_cc"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "12",
          x265: "11",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "8",
          ac3: "14",
          dd: "14",
          "dd+": "14",
          flac: "7",
          dts: "6",
          truehd: "2",
          lpcm: "15",
          dtshdma: "5",
          atmos: "1",
          dtsx: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "9",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "11",
          hdtv: "5",
          dvd: "6",
          dvdrip: "7",
          hddvd: "2",
          other: "4"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "6",
          "2160p": "1",
          "1080p": "2",
          "1080i": "2",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "3",
          EU: "3",
          HK: "2",
          TW: "2",
          JP: "4",
          KR: "4",
          OT: "5"
        }
      }
    },
    PTP: {
      url: "https://passthepopcorn.me",
      host: "passthepopcorn.me",
      siteType: "gazelle",
      asSource: true,
      asTarget: false,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchstr: "{imdb}"
        }
      },
      seedDomSelector: ""
    },
    BeyondHD: {
      url: "https://beyond-hd.me",
      host: "beyond-hd.me",
      siteType: "F3NIX",
      asSource: true,
      asTarget: true,
      seedDomSelector: ".table-details tr:last",
      needDoubanInfo: true,
      uploadPath: "/upload",
      search: {
        path: "/torrents/all",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          imdb: "{imdb}",
          search: "{name}",
          sorting: "size",
          direction: "desc",
          doSearch: "Search"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#imdbauto"
      },
      tmdb: {
        selector: "#tmdbauto"
      },
      mediaInfo: {
        selector: "#mediainfo"
      },
      anonymous: {
        selector: 'input[name="anonymous"]'
      },
      videoType: {
        selector: "#category_id",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      category: {
        selector: "#autotype",
        map: {
          BD100: "UHD 100",
          BD66: "UHD 66",
          UHD50: "UHD 50",
          BD50: "BD 50",
          BD25: "BD 25",
          remux: [
            "UHD Remux",
            "BD Remux",
            "DVD Remux"
          ],
          encode: [
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          web: [
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hdtv: [
            "2160p",
            "1080p",
            "1080i",
            "720p"
          ],
          dvd: [
            "DVD 9",
            "DVD 5",
            "DVD Remux"
          ],
          dvdrip: [
            "480p"
          ],
          other: ""
        }
      },
      source: {
        selector: "#autosource",
        map: {
          uhdbluray: [
            "Blu-ray"
          ],
          bluray: [
            "Blu-ray",
            "BD 50",
            "BD 25",
            "BD Remux",
            "UHD 100",
            "UHD 66",
            "UHD 50",
            "UHD Remux",
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hdtv: [
            "HDTV",
            "2160p",
            "1080p",
            "1080i",
            "720p"
          ],
          dvd: [
            "DVD",
            "DVD 9",
            "DVD 5",
            "DVD Remux",
            "480p"
          ],
          web: [
            "WEB",
            "2160p",
            "1080p",
            "720p",
            "576p",
            "540p",
            "480p"
          ],
          hddvd: "HD-DVD"
        }
      },
      resolution: {
        map: {
          "2160p": [
            "UHD 100",
            "UHD 66",
            "UHD 50",
            "UHD Remux",
            "2160p"
          ],
          "1080p": [
            "BD 50",
            "BD 25",
            "BD Remux",
            "1080p"
          ],
          "1080i": [
            "BD 50",
            "BD 25",
            "BD Remux",
            "1080i"
          ],
          "720p": [
            "720p"
          ],
          "576p": [
            "576p"
          ],
          "540p": [
            "540p"
          ],
          "480p": [
            "DVD 9",
            "DVD 5",
            "DVD Remux",
            "480p"
          ],
          other: [
            "Other"
          ]
        }
      }
    },
    PTer: {
      url: "https://pterclub.com",
      host: "pterclub.com",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chineseAudio: "#guoyu",
        DIY: "#diy",
        cantoneseAudio: "#yueyu",
        chineseSubtitle: "#zhongzi"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "404",
          tvPack: "404",
          documentary: "402",
          concert: "406",
          sport: "407",
          cartoon: "403",
          variety: "405"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "6",
          web: "5",
          hdtv: "4",
          dvd: "7",
          dvdrip: "7",
          other: "15"
        }
      },
      area: {
        selector: 'select[name="team_sel"]',
        map: {
          CN: "1",
          US: "4",
          EU: "4",
          HK: "2",
          TW: "3",
          JP: "6",
          KR: "5",
          IND: "7",
          OT: "8"
        }
      }
    },
    HD4FANS: {
      url: "https://pt.hd4fans.org",
      host: "hd4fans.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "405"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          hddvd: "2",
          remux: "3",
          encode: "7",
          web: "7",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: ""
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          x264: "1",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "5",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5",
          cmct: "6",
          r2ts: "7",
          kbits: "8"
        }
      }
    },
    TJUPT: {
      url: "https://www.tjupt.org",
      host: "tjupt.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top+table>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: "#external_url"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "411",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      }
    },
    NYPT: {
      url: "https://nanyangpt.com",
      host: "nanyangpt.com",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top+table>tbody>tr:nth-child(5)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "406",
          concert: "407",
          sport: "405",
          cartoon: "403",
          variety: "404"
        }
      }
    },
    Blutopia: {
      url: "https://blutopia.xyz",
      host: "blutopia.xyz",
      siteType: "UNIT3D",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#vue+.panel table tr:last",
      search: {
        path: "/torrents",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#upload-form-description"
      },
      imdb: {
        selector: "#autoimdb"
      },
      tmdb: {
        selector: "#autotmdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      anonymous: {
        selector: '.radio-inline:first input[name="anonymous"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2"
        }
      },
      videoType: {
        selector: "#autotype",
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "12",
          web: "4",
          hdtv: "6",
          dvd: "1",
          dvdrip: "12",
          other: ""
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "11",
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    PTHome: {
      url: "https://www.pthome.net",
      host: "pthome.net",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chineseAudio: "#tag_gy",
        DIY: "#tag_diy",
        cantoneseAudio: "#tag_yy",
        chineseSubtitle: "#tag_zz",
        HDR: "#tag_hdr10",
        "HDR10+": "#tag_hdrm",
        DolbyVision: "#tag_db"
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "408",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "5",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "15",
          web: "10",
          hdtv: "5",
          dvd: "2",
          dvdrip: "15",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "10",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          pthome: "19",
          pth: "21",
          pthweb: "20",
          pthtv: "22",
          pthaudio: "23",
          pthebook: "24",
          pthmusic: "25",
          other: "5"
        }
      }
    },
    TCCF: {
      url: "https://et8.org",
      host: "et8.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "622",
          tv: "623",
          tvPack: "623",
          documentary: "404",
          concert: "626",
          sport: "627",
          cartoon: "627",
          variety: "627",
          app: "625",
          ebook: "629",
          magazine: "631",
          comics: "632",
          audioBook: "633",
          onlineCourse: "634"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "7",
          hevc: "8",
          x265: "6",
          h265: "8",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "4",
          dd: "4",
          "dd+": "4",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "10",
          dtshdma: "8",
          atmos: "8",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          remux: "5",
          encode: "11",
          web: "9",
          hdtv: "6",
          dvd: "7",
          dvdrip: "4",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          torrentccf: "1",
          tccf: "1",
          tlf: "2",
          bmdru: "3",
          catedu: "4",
          madfox: "5",
          other: "7"
        }
      }
    },
    HDDolby: {
      url: "https://www.hddolby.com",
      host: "hddolby.com",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_id"]'
      },
      tags: {
        chineseAudio: "#tag_gy",
        DIY: "#tag_diy",
        chineseSubtitle: "#tag_zz",
        cantoneseAudio: "#tag_yy",
        HDR: "#tag_hdr10",
        "HDR10+": "#tag_hdrm",
        DolbyVision: "#tag_db"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "3",
          hevc: "2",
          x265: "4",
          h265: "2",
          mpeg2: "6",
          mpeg4: "0",
          vc1: "5",
          xvid: "0",
          dvd: "0"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "10",
          web: "6",
          hdtv: "5",
          dvd: "8",
          dvdrip: "8",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "1",
          "1080p": "2",
          "1080i": "3",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          dream: "1",
          hdo: "9",
          dbtv: "10",
          nazorip: "12",
          mteam: "2",
          frds: "7",
          wiki: "4",
          beast: "11",
          chd: "5",
          cmct: "6",
          pthome: "3",
          other: "8"
        }
      }
    },
    HDArea: {
      url: "https://www.hdarea.co",
      host: "hdarea.co",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "300",
            "401",
            "415",
            "416",
            "410",
            "411",
            "414",
            "412",
            "413",
            "417"
          ],
          tv: [
            "402",
            "403"
          ],
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "7",
          x264: "7",
          hevc: "6",
          x265: "6",
          h265: "6",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "0",
          dvd: "0"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "11",
          dd: "5",
          "dd+": "4",
          flac: "1",
          dts: "3",
          truehd: "7",
          lpcm: "8",
          dtshdma: "4",
          atmos: "10",
          dtsx: "0"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: [
            "1",
            "300"
          ],
          bluray: [
            "1",
            "401"
          ],
          remux: [
            "3",
            "415"
          ],
          encode: "7",
          web: [
            "9",
            "412"
          ],
          hdtv: [
            "5",
            "413"
          ],
          dvd: [
            "2",
            "414"
          ],
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": [
            "1",
            "410"
          ],
          "1080i": "2",
          "720p": [
            "3",
            "411"
          ],
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          epic: "1",
          hdarea: "2",
          hdwing: "3",
          wiki: "4",
          ttg: "5",
          other: "6",
          mteam: "7",
          hdapad: "8",
          chd: "9",
          hdaccess: "10",
          hdatv: "11",
          cxcy: "12",
          cmct: "13"
        }
      }
    },
    BTSCHOOL: {
      url: "https://pt.btschool.club",
      host: "btschool.club",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="picture"]',
      imdb: {
        selector: 'input[name="imdbid"]'
      },
      douban: {
        selector: 'input[name="doubanid"]'
      },
      tags: {
        chineseAudio: 'input[type="checkbox"][name="span[]"][value="5"]',
        chineseSubtitle: 'input[type="checkbox"][name="span[]"][value="6"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "405",
          tv: "406",
          tvPack: "406",
          documentary: "408",
          concert: "409",
          sport: "410",
          cartoon: "407",
          variety: "412"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          x264: "1",
          hevc: "10",
          x265: "10",
          h265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "10",
          dd: "10",
          "dd+": "10",
          flac: "1",
          dts: "3",
          truehd: "11",
          lpcm: "5",
          dtshdma: "3",
          atmos: "3",
          dtsx: "3"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "12",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "11"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "1",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          btschool: "1",
          zone: "13",
          btshd: "2",
          btstv: "3",
          btspad: "4",
          wiki: "5",
          hdchina: "6",
          hdbint: "7",
          mteam: "9",
          cmct: "10",
          ourbits: "11",
          other: "12"
        }
      }
    },
    HDU: {
      url: "https://pt.hdupt.com",
      host: "hdupt.com",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "14",
          x264: "16",
          x265: "14",
          h265: "14",
          mpeg2: "18",
          mpeg4: "18",
          vc1: "2",
          xvid: "3",
          dvd: "18"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "2",
          dd: "2",
          "dd+": "2",
          flac: "7",
          dts: "4",
          truehd: "3",
          lpcm: "11",
          dtshdma: "1",
          atmos: "17",
          dtsx: "16"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "11",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          IND: "6",
          SEA: "8",
          OT: "7"
        }
      }
    },
    HDAtmos: {
      url: "https://hdatmos.club",
      host: "hdatmos.club",
      siteType: "NexusPHP",
      asSource: false,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          cartoon: "405",
          sport: "407",
          concert: "406"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "10",
          h265: "10",
          x264: "1",
          x265: "10",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "20",
          ac3: "22",
          dd: "23",
          "dd+": "23",
          flac: "17",
          dts: "14",
          truehd: "13",
          lpcm: "15",
          dtshdma: "10",
          atmos: "11",
          dtsx: "12"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "10",
          hdtv: "5",
          dvd: "6",
          hddvd: "2",
          dvdrip: "13",
          other: "13"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "15",
          "2160p": "10",
          "1080p": "11",
          "1080i": "12",
          "720p": "13",
          "576p": "14",
          "480p": "14"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "3",
          US: "4",
          EU: "8",
          HK: "5",
          TW: "3",
          JP: "5",
          KR: "6",
          OT: "9"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "6",
          bluray: "6",
          hdtv: "3",
          dvd: "8",
          web: "2",
          vhs: "12",
          hddvd: "7"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "22"
        }
      }
    },
    TLF: {
      url: "https://pt.eastgame.org",
      host: "eastgame.org",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "438",
          tv: "440",
          tvPack: "440",
          documentary: "443",
          cartoon: "442",
          sport: "444",
          concert: "445",
          variety: "441"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          h265: "6",
          x264: "1",
          x265: "6",
          mpeg2: "4",
          mpeg4: "0",
          vc1: "2",
          xvid: "3"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "9",
          dd: "9",
          "dd+": "9",
          flac: "1",
          dts: "10",
          truehd: "14",
          lpcm: "12",
          dtshdma: "11",
          atmos: "13",
          dtsx: "10"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "4",
          hdtv: "5",
          dvd: "6",
          hddvd: "1",
          dvdrip: "6",
          other: "9"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      }
    },
    DiscFan: {
      url: "https://discfan.net",
      host: "discfan.net",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        imdbOptionKey: "4",
        nameOptionKey: "0",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="douban_url"]'
      },
      category: {
        selector: "#browsecat1",
        map: {
          tv: "411",
          tvPack: "411",
          documentary: "413",
          cartoon: "419",
          sport: "417",
          concert: "414",
          variety: "416"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "2",
          bluray: "3",
          remux: "0",
          encode: "0",
          web: "9",
          hdtv: "1",
          dvd: "4",
          hddvd: "4",
          dvdrip: "10",
          other: "0"
        }
      },
      area: {
        selector: "#browsecat",
        map: {
          CN: "401",
          US: "410",
          EU: "410",
          HK: "404",
          TW: "405",
          JP: "403",
          KR: "406"
        }
      }
    },
    HDAI: {
      url: "http://www.hd.ai",
      host: "hd.ai",
      siteType: "NexusPHP",
      asSource: true,
      asTarget: true,
      uploadPath: "/Torrents.upload",
      seedDomSelector: "#top+table>tbody>tr:nth-child(3)",
      search: {
        path: "/Torrents.index",
        imdbOptionKey: "9",
        nameOptionKey: "1",
        params: {
          name: "{name}",
          search_area: "{optionKey}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      description: {
        selector: "#descr"
      },
      poster: 'input[name="poster"]',
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      mediaInfo: {
        selector: 'textarea[name="nfo"]'
      },
      screenshots: {
        selector: 'textarea[name="screenshot"]'
      },
      tags: {
        chineseAudio: 'input[type="checkbox"][name="tag[cn]"]',
        chineseSubtitle: 'input[type="checkbox"][name="tag[zz]"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "4",
          concert: "6",
          sport: "7",
          cartoon: "5",
          variety: "3"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "2",
          hevc: "1",
          x264: "2",
          x265: "1",
          h265: "1",
          mpeg2: "5",
          mpeg4: "2",
          vc1: "3",
          xvid: "4",
          dvd: "5"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "10",
          ac3: "11",
          dd: "11",
          "dd+": "11",
          flac: "7",
          dts: "5",
          truehd: "4",
          lpcm: "6",
          dtshdma: "2",
          atmos: "3",
          dtsx: "1"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          remux: "3",
          encode: "5",
          web: "4",
          hdtv: "6",
          dvd: "7",
          dvdrip: "10",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "1",
          "2160p": "2",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "6"
        }
      },
      area: {
        selector: 'select[name="source_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "2",
          HK: "3",
          TW: "3",
          JP: "4",
          KR: "5",
          OT: "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          other: "1",
          ao: "20",
          beitai: "18",
          beyondhd: "19",
          beast: "23",
          chd: "2",
          chdbits: "3",
          cmct: "4",
          frds: "5",
          fltth: "17",
          hdai: "6",
          hdchina: "7",
          hdhome: "8",
          hdsky: "9",
          lemonhd: "28",
          leaguehd: "29",
          mteam: "10",
          nypt: "24",
          ngb: "26",
          ourtv: "11",
          ourbits: "12",
          pter: "13",
          pthome: "14",
          putao: "22",
          strife: "21",
          tjupt: "15",
          ttg: "16",
          tlf: "30",
          u2: "31",
          wiki: "25"
        }
      }
    },
    Bib: {
      url: " https://bibliotik.me",
      host: "bibliotik.me",
      siteType: "Bib",
      asSource: false,
      asTarget: true,
      uploadPath: "/upload",
      name: {
        selector: "#TitleField"
      },
      description: {
        selector: "#DescriptionField"
      },
      anonymous: {
        selector: "#AnonymousField"
      },
      image: {
        selector: "#ImageField"
      },
      format: {
        selector: "#FormatField",
        map: {
          epub: "15",
          mobi: "16",
          pdf: "2",
          azw3: "21"
        }
      }
    }
  };

  // src/const.js
  var TORRENT_INFO = {
    title: "",
    subtitle: "",
    description: "",
    year: "",
    category: "",
    videoType: "",
    format: "",
    source: "",
    videoCodec: "",
    audioCodec: "",
    resolution: "",
    area: "",
    doubanUrl: "",
    doubanInfo: "",
    imdbUrl: "",
    tags: {
      DIY: false,
      chineseAudio: false,
      cantoneseAudio: false,
      chineseSubtitle: false,
      atoms: false,
      dtsx: false,
      HDR: false,
      DolbyVision: false
    },
    mediaInfo: "",
    screenshots: [],
    comparisonImgs: [],
    movieAkaName: "",
    movieName: "",
    sourceSite: "",
    sourceSiteType: "",
    size: "",
    isForbidden: false
  };
  var DOUBAN_SEARCH_API = "https://omit.mkrobot.org/movie/infos";
  var DOUBAN_SUGGEST_API = "https://movie.douban.com/j/subject_suggest";
  var PT_GEN_API = "https://media.pttool.workers.dev";
  var TMDB_API_URL = "https://api.tmdb.org";
  var TMDB_API_KEY = "3d62cb1443c6b34b61262ab332aaf78c";
  var getSiteName = (host) => {
    let siteName = "";
    try {
      Object.keys(PT_SITE).forEach((key) => {
        const hostName = PT_SITE[key].host;
        const matchReg = new RegExp(hostName, "i");
        if (hostName && host.match(matchReg)) {
          siteName = key;
        }
      });
      return siteName;
    } catch (error) {
      if (error.message !== "end loop") {
        console.log(error);
      }
    }
  };
  var EUROPE_LIST = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "UK", "Vatican City"];
  var CURRENT_SITE_NAME = getSiteName(location.host);
  var CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
  var HDB_TEAM = ["Chotab", "CRiSC", "CtrlHD", "DON", "EA", "EbP", "Geek", "LolHD", "NTb", "RightSiZE", "SA89", "SbR", "TayTo", "VietHD"];

  // src/common.js
  var formatTorrentTitle = (title) => {
    return title.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig, " ").replace(/\.(?!(\d+))/, " ").trim();
  };
  var getDoubanInfo = (doubanUrl) => {
    return new Promise((resolve, reject) => {
      try {
        if (doubanUrl) {
          GM_xmlhttpRequest({
            method: "GET",
            url: `${PT_GEN_API}?url=${doubanUrl}`,
            onload(res) {
              const data = JSON.parse(res.responseText);
              if (data && data.success) {
                resolve(data);
              } else {
                getAnotherDoubanInfo(doubanUrl).then((res2) => {
                  resolve(res2);
                }).catch((error) => {
                  reject(new Error(error.message));
                });
              }
            }
          });
        } else {
          reject(new Error("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25"));
        }
      } catch (error) {
        console.log(error);
        reject(new Error(error.message));
      }
    });
  };
  var getAnotherDoubanInfo = (doubanUrl) => {
    return new Promise((resolve, reject) => {
      var _a, _b;
      try {
        if (doubanUrl) {
          const doubanId = (_b = (_a = doubanUrl.match(/subject\/(\d+)/)) == null ? void 0 : _a[1]) != null ? _b : "";
          if (!doubanId) {
            reject(new Error("\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25"));
          }
          GM_xmlhttpRequest({
            method: "GET",
            url: `https://movie.querydata.org/api?id=${doubanId}`,
            onload(res) {
              const data = JSON.parse(res.responseText);
              if (data && data.id) {
                resolve(formatDoubanInfo(data));
              } else {
                reject(new Error(data.message || "\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25"));
              }
            }
          });
        } else {
          reject(new Error("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25"));
        }
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  };
  var formatDoubanInfo = (data) => {
    const {doubanId, imdbId, imdbRating, imdbVotes, dateReleased, alias, originalName, doubanRating, episodes, doubanVotes, year, duration, director, data: info, actor, writer} = data;
    const [chineseInfo, englishInfo] = info;
    const chineseTitle = chineseInfo.name;
    const foreignTitle = englishInfo.name;
    const directorArray = director.map((item) => {
      return {
        name: `${item.data[0].name} ${item.data[1].name}`
      };
    });
    const actorArray = actor.map((item) => {
      return {
        name: `${item.data[0].name} ${item.data[1].name}`
      };
    });
    const writerArray = writer.map((item) => {
      return {
        name: `${item.data[0].name} ${item.data[1].name}`
      };
    });
    let transTitle = alias.split("/");
    if (chineseTitle !== originalName && !alias.includes(chineseTitle)) {
      transTitle = [chineseTitle].concat(transTitle);
    }
    const formatData = {
      imdb_link: `https://www.imdb.com/title/${imdbId}`,
      imdb_id: imdbId,
      imdb_rating_average: imdbRating,
      imdb_votes: imdbVotes,
      imdb_rating: `${imdbRating}/10 from ${imdbVotes} users`,
      chinese_title: chineseTitle,
      foreign_title: foreignTitle,
      aka: alias.split("/"),
      trans_title: transTitle,
      this_title: [originalName],
      year,
      playdate: dateReleased.match(/\d+-\d+-\d+/)[0],
      region: info[0].country,
      genre: chineseInfo.genre,
      language: chineseInfo.language,
      episodes,
      duration: `${duration / 60}\u5206\u949F`,
      introduction: chineseInfo.description,
      douban_link: `https://movie.douban.com/subject/${doubanId}`,
      douban_rating_average: doubanRating || 0,
      douban_votes: doubanVotes,
      douban_rating: `${doubanRating}/10 from ${doubanVotes} users`,
      poster: chineseInfo.poster,
      director: directorArray,
      cast: actorArray,
      writer: writerArray
    };
    const {poster, this_title, trans_title, genre, year: movieYear, region, language, playdate, imdb_rating, imdb_link, douban_rating, douban_link, episodes: showEpisodes, duration: movieDuration, director: directors, writer: writers, cast: actors, introduction} = formatData;
    let descr = poster ? `[img]${poster}[/img]

` : "";
    descr += trans_title ? `\u25CE\u8BD1\u3000\u3000\u540D\u3000${trans_title.join("/")}
` : "";
    descr += this_title ? `\u25CE\u7247\u3000\u3000\u540D\u3000${this_title}
` : "";
    descr += movieYear ? `\u25CE\u5E74\u3000\u3000\u4EE3\u3000${movieYear.trim()}
` : "";
    descr += region ? `\u25CE\u4EA7\u3000\u3000\u5730\u3000${region}
` : "";
    descr += genre ? `\u25CE\u7C7B\u3000\u3000\u522B\u3000${genre}
` : "";
    descr += language ? `\u25CE\u8BED\u3000\u3000\u8A00\u3000${language}
` : "";
    descr += playdate ? `\u25CE\u4E0A\u6620\u65E5\u671F\u3000${playdate}
` : "";
    descr += imdb_rating ? `\u25CEIMDb\u8BC4\u5206  ${imdb_rating}
` : "";
    descr += imdb_link ? `\u25CEIMDb\u94FE\u63A5  ${imdb_link}
` : "";
    descr += douban_rating ? `\u25CE\u8C46\u74E3\u8BC4\u5206\u3000${douban_rating}
` : "";
    descr += douban_link ? `\u25CE\u8C46\u74E3\u94FE\u63A5\u3000${douban_link}
` : "";
    descr += showEpisodes ? `\u25CE\u96C6\u3000\u3000\u6570\u3000${showEpisodes}
` : "";
    descr += movieDuration ? `\u25CE\u7247\u3000\u3000\u957F\u3000${movieDuration}
` : "";
    descr += directors && directors.length > 0 ? `\u25CE\u5BFC\u3000\u3000\u6F14\u3000${directors.map((x) => x.name).join(" / ")}
` : "";
    descr += writers && writers.length > 0 ? `\u25CE\u7F16\u3000\u3000\u5267\u3000${writers.map((x) => x.name).join(" / ")}
` : "";
    descr += actors && actors.length > 0 ? `\u25CE\u4E3B\u3000\u3000\u6F14\u3000${actors.map((x) => x.name).join("\n" + "\u3000".repeat(4) + "  \u3000").trim()}
` : "";
    descr += introduction ? `
\u25CE\u7B80\u3000\u3000\u4ECB

\u3000\u3000${introduction.replace(/\n/g, "\n" + "\u3000".repeat(2))}
` : "";
    formatData.format = descr.trim();
    return formatData;
  };
  var getDoubanLinkByIMDB = (imdbUrl, movieName) => {
    return new Promise((resolve, reject) => {
      try {
        if (!imdbUrl) {
          throw new Error("\u7F3A\u5C11IMDB\u4FE1\u606F");
        }
        const doubanUrl = " https://movie.douban.com/subject/";
        const imdbId = getIMDBIdByUrl(imdbUrl);
        if (imdbId) {
          GM_xmlhttpRequest({
            method: "GET",
            url: `${DOUBAN_SEARCH_API}/${imdbId}`,
            onload(res) {
              const data = JSON.parse(res.responseText);
              if (data && data.data) {
                resolve(doubanUrl + data.data.id);
              } else {
                getDoubanLinkBySuggest(imdbId).then((res2) => {
                  resolve(doubanUrl + res2);
                }).catch((error) => {
                  reject(new Error(error.message || "\u83B7\u53D6\u5931\u8D25"));
                });
              }
            }
          });
        }
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  };
  var getDoubanLinkBySuggest = (imdbId) => {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `${DOUBAN_SUGGEST_API}?q=${imdbId}`,
        onload(res) {
          const data = JSON.parse(res.responseText);
          if (data.length > 0) {
            const doubanId = data[0].id;
            resolve(doubanId);
          } else {
            reject(new Error("\u8C46\u74E3id\u83B7\u53D6\u5931\u8D25"));
          }
        }
      });
    });
  };
  var transferImgs = (screenshots, isNSFW) => {
    return new Promise((resolve, reject) => {
      const params = encodeURI(`imgs=${screenshots}&content_type=${isNSFW ? 1 : 0}&max_th_size=300`);
      try {
        GM_xmlhttpRequest({
          url: "https://pixhost.to/remote/",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: params,
          onload(res) {
            const data = res.responseText.match(/(upload_results = )({.*})(;)/);
            if (!data) {
              reject(new Error("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
            }
            let imgResultList = [];
            if (data && data.length) {
              imgResultList = JSON.parse(data[2]).images;
              if (imgResultList.length.length < 1) {
                throw new Error(new Error("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
              }
              resolve(imgResultList);
            } else {
              throw new Error("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
            }
          }
        });
      } catch (error) {
        reject(error.message);
      }
    });
  };
  var getPreciseCategory = (torrentInfo, category) => {
    const {description, title, subtitle} = torrentInfo;
    if (category === "movie") {
      if (description.match(/动画/)) {
        category = "cartoon";
      } else if (description.match(/纪录/)) {
        category = "documentary";
      }
    } else if (category == null ? void 0 : category.match(/tv/)) {
      if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || subtitle.match(/第[^\s]集/)) {
        category = "tv";
      } else {
        category = "tvPack";
      }
    }
    return category;
  };
  var getUrlParam = (key) => {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    const regArray = location.search.substr(1).match(reg);
    if (regArray) {
      return unescape(regArray[2]);
    }
    return "";
  };
  var getAudioCodecFromTitle = (title) => {
    if (!title) {
      return "";
    }
    title = title.replace(/:|-|\s/g, "");
    if (title.match(/atoms/i)) {
      return "atoms";
    } else if (title.match(/dtshdma/i)) {
      return "dtshdma";
    } else if (title.match(/dtsx/i)) {
      return "dtsx";
    } else if (title.match(/dts/i)) {
      return "dts";
    } else if (title.match(/truehd/i)) {
      return "truehd";
    } else if (title.match(/lpcm/i)) {
      return "lpcm";
    } else if (title.match(/flac/i)) {
      return "flac";
    } else if (title.match(/aac/i)) {
      return "aac";
    } else if (title.match(/DD\+|DDP|DolbyDigitalPlus/i)) {
      return "dd+";
    } else if (title.match(/DD|DolbyDigital/i)) {
      return "dd";
    } else if (title.match(/ac3/i)) {
      return "ac3";
    }
    return "";
  };
  var getVideoCodecFromTitle = (title, videoType = "") => {
    title = title.replace(/\.|-/g, "");
    if (title.match(/x264/i) || title.match(/h264|avc/i) && videoType === "encode") {
      return "x264";
    } else if (title.match(/h264|AVC/i)) {
      return "h264";
    } else if (title.match(/x265/i) || title.match(/h265|hevc/i) && videoType === "encode") {
      return "x265";
    } else if (title.match(/hevc|h265/i)) {
      return "hevc";
    } else if (title.match(/vc-?1/i)) {
      return "vc1";
    } else if (title.match(/mpeg-?2/i)) {
      return "mpeg2";
    } else if (title.match(/mpeg-?4/i)) {
      return "mpeg4";
    }
    return "";
  };
  var getScreenshotsFromBBCode = (bbcode) => {
    let allImages = bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
    if (allImages && allImages.length > 0) {
      allImages = allImages.filter((item) => {
        return !item.match(/MoreScreens|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
      });
      return allImages.map((item) => {
        var _a, _b;
        let imgUrl = "";
        if (item.match(/\[url=http(s)*:.+/)) {
          imgUrl = (_a = item.match(/=(([^\]])+)/)) == null ? void 0 : _a[1];
        } else {
          imgUrl = (_b = item.match(/img\](([^[])+)/)) == null ? void 0 : _b[1];
        }
        return imgUrl;
      });
    }
  };
  var getSourceFromTitle = (title) => {
    if (title.match(/(uhd|2160|4k).*(blu(-)?ray|remux)/i)) {
      return "uhdbluray";
    } else if (title.match(/blu(-)?ray|remux/i)) {
      return "bluray";
    } else if (title.match(/hdtv/i)) {
      return "hdtv";
    } else if (title.match(/web(-(rip|dl))+/i)) {
      return "web";
    } else if (title.match(/hddvd/i)) {
      return "hddvd";
    } else if (title.match(/dvd/i)) {
      return "dvd";
    } else if (title.match(/vhs/i)) {
      return "vhs";
    }
    return "other";
  };
  var getSubTitle = (data) => {
    const {chinese_title: chineseTitle, this_title: originalTitle, trans_title: transTitle} = data;
    let title = "";
    if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
      title += chineseTitle;
    }
    const moreTitle = originalTitle.concat(transTitle).filter((item) => title !== item);
    return `${title}${moreTitle.length > 0 ? "/" : ""}${moreTitle.join("/")}`;
  };
  var getAreaCode = (area) => {
    const europeList = EUROPE_LIST;
    if (area) {
      if (area.match(/USA|US|Canada|CA|美国|加拿大/i)) {
        return "US";
      } else if (europeList.includes(area) || area.match(/欧|英|法|德|俄|意|苏联|EU/i)) {
        return "EU";
      } else if (area.match(/Japan|日本|JP/i)) {
        return "JP";
      } else if (area.match(/Korea|韩国|KR/i)) {
        return "KR";
      } else if (area.match(/Taiwan|台湾|TW/i)) {
        return "TW";
      } else if (area.match(/Hong\s?Kong|香港|HK/i)) {
        return "HK";
      } else if (area.match(/CN|China|大陆|中|内地|Mainland/i)) {
        return "CN";
      }
    }
    return "OT";
  };
  var getBDType = (size) => {
    const GBSize = size / 1e9;
    if (GBSize < 25) {
      return "BD25";
    } else if (GBSize < 50) {
      return "BD50";
    } else if (GBSize < 66) {
      return "BD66";
    } else if (GBSize < 100) {
      return "BD100";
    }
  };
  var getTMDBIdByIMDBId = (imdbid) => {
    try {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url: `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`,
          onload(res) {
            var _a;
            const data = JSON.parse(res.responseText);
            const isMovie = data.movie_results && data.movie_results.length > 0;
            const isTV = !data.tv_results && data.tv_results.length > 0;
            if (res.status !== 200 && (!isMovie && !isTV)) {
              reject(new Error("\u8BF7\u6C42\u5931\u8D25"));
            }
            const id = isMovie ? data.movie_results[0].id : (_a = data.tv_results[0]) == null ? void 0 : _a.id;
            resolve(id);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  var getIMDBIdByUrl = (imdbLink) => {
    const imdbIdArray = /tt\d+/.exec(imdbLink);
    if (imdbIdArray && imdbIdArray[0]) {
      return imdbIdArray[0];
    }
    return "";
  };
  var getSize = (size) => {
    if (!size) {
      return "";
    }
    if (size.match(/T/i)) {
      return parseFloat(size) * 1024 * 1024 * 1024 * 1024 || 0;
    } else if (size.match(/G/i)) {
      return parseFloat(size) * 1024 * 1024 * 1024 || 0;
    } else if (size.match(/M/i)) {
      return parseFloat(size) * 1024 * 1024 || 0;
    } else if (size.match(/K/i)) {
      return parseFloat(size) * 1024 || 0;
    }
    return "";
  };
  var getInfoFromMediaInfo = (mediaInfo) => {
    if (!mediaInfo) {
      return false;
    }
    const mediaArray = mediaInfo.split(/\n\s*\n/);
    const [generalPart, videoPart] = mediaArray;
    const secondVideoPart = mediaArray.filter((item) => item.startsWith("Video #2"));
    const [audioPart, ...otherAudioPart] = mediaArray.filter((item) => item.startsWith("Audio"));
    const textPart = mediaArray.filter((item) => item.startsWith("Text"));
    const fileName = getMediaValueByKey("Complete name", generalPart).replace(/\.avi|\.mkv|\.mp4|\.ts/i, "");
    const fileSize = getSize(getMediaValueByKey("File size", generalPart));
    const {videoCodec, hdrFormat, isDV} = getVideoCodecByMediaInfo(videoPart, generalPart, secondVideoPart);
    const {audioCodec, channelName, languageArray} = getAudioCodecByMediaInfo(audioPart, otherAudioPart);
    const subtitleLanguageArray = textPart.map((item) => {
      return getMediaValueByKey("Language", item);
    });
    const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
    const resolution = getResolution(videoPart);
    return {
      fileName,
      fileSize,
      videoCodec,
      audioCodec,
      resolution,
      mediaTags
    };
  };
  var getMediaValueByKey = (key, mediaInfo) => {
    if (!mediaInfo) {
      return "";
    }
    const keyRegStr = key.replace(/\s/, "\\s*").replace(/(\(|\))/g, "\\$1");
    const reg = new RegExp(`${keyRegStr}\\s*:\\s([^
]+)`, "i");
    return mediaInfo.match(reg) ? mediaInfo.match(reg)[1] : "";
  };
  var getResolution = (mediaInfo) => {
    const height = parseInt(getMediaValueByKey("Height", mediaInfo).replace(/\s/g, ""));
    const width = parseInt(getMediaValueByKey("Width", mediaInfo).replace(/\s/g, ""));
    const ScanType = getMediaValueByKey("Scan type", mediaInfo);
    if (height > 1080) {
      return "2160p";
    } else if (height > 720 && ScanType === "Progressive") {
      return "1080p";
    } else if (height > 720 && ScanType !== "Progressive") {
      return "1080i";
    } else if (height > 576 || width > 1024) {
      return "720p";
    } else if (height > 480 || width === 1024) {
      return "576p";
    } else if (width >= 840 || height === 480) {
      return "480p";
    } else {
      return "";
    }
  };
  var getMediaTags = (audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV) => {
    const hasChineseAudio = languageArray.includes("Chinese");
    const hasChineseSubtitle = subtitleLanguageArray.includes("Chinese");
    const mediaTags = {};
    if (hasChineseAudio) {
      mediaTags.chineseAudio = true;
    }
    if (languageArray.includes("Cantonese")) {
      mediaTags.cantoneseAudio = true;
    }
    if (hasChineseSubtitle) {
      mediaTags.chineseSubtitle = true;
    }
    if (hdrFormat) {
      if (hdrFormat.match(/HDR10\+/i)) {
        mediaTags["HDR10+"] = true;
      } else if (hdrFormat.match(/HDR\+/i)) {
        mediaTags.HDR = true;
      }
    }
    if (isDV) {
      mediaTags.DolbyVision = true;
    }
    if (audioCodec.match(/dtsx|atmos/ig)) {
      mediaTags[audioCodec] = true;
    }
    return mediaTags;
  };
  var getVideoCodecByMediaInfo = (mainVideo, generalPart, secondVideo) => {
    const generalFormat = getMediaValueByKey("Format", generalPart);
    const videoFormat = getMediaValueByKey("Format", mainVideo);
    const videoFormatVersion = getMediaValueByKey("Format version", mainVideo);
    const videoCodeId = getMediaValueByKey("Codec ID", mainVideo);
    const hdrFormat = getMediaValueByKey("HDR format", mainVideo);
    const isDV = hdrFormat.match(/Dolby\s*Vision/i) || secondVideo.length > 0 && getMediaValueByKey("HDR format", secondVideo[0]).match(/Dolby\s*Vision/i);
    const isEncoded = !!getMediaValueByKey("Encoding settings", mainVideo);
    let videoCodec = "";
    if (generalFormat === "DVD Video") {
      videoCodec = "DVD";
    } else if (generalFormat === "MPEG-4") {
      videoCodec = "mpeg4";
    } else if (videoFormat === "MPEG Video" && videoFormatVersion === "Version 2") {
      videoCodec = "mpeg2";
    } else if (videoCodeId.match(/xvid/i)) {
      videoCodec = "xvid";
    } else if (videoFormat.match(/HEVC/i) && !isEncoded) {
      videoCodec = "hevc";
    } else if (videoFormat.match(/HEVC/i) && isEncoded) {
      videoCodec = "x265";
    } else if (videoFormat.match(/AVC/i) && isEncoded) {
      videoCodec = "x264";
    } else if (videoFormat.match(/AVC/i) && !isEncoded) {
      videoCodec = "h264";
    } else if (videoFormat.match(/VC-1/i)) {
      videoCodec = "vc1";
    }
    return {
      videoCodec,
      hdrFormat,
      isDV
    };
  };
  var getAudioCodecByMediaInfo = (mainAudio, otherAudio = []) => {
    const audioFormat = getMediaValueByKey("Format", mainAudio);
    const audioChannels = getMediaValueByKey("Channel(s)", mainAudio);
    const commercialName = getMediaValueByKey("Commercial name", mainAudio);
    const languageArray = [mainAudio, ...otherAudio].map((item) => {
      return getMediaValueByKey("Language", item);
    });
    let channelName = "";
    let audioCodec = "";
    const channelNumber = parseInt(audioChannels);
    if (channelNumber && channelNumber >= 6) {
      channelName = `${channelNumber - 1}.1`;
    } else {
      channelName = `${channelNumber}.0`;
    }
    if (audioFormat.match(/MLP FBA/i) && commercialName.match(/Dolby Atmos/i)) {
      audioCodec = "atmos";
    } else if (audioFormat.match(/MLP FBA/i) && !commercialName.match(/Dolby Atmos/i)) {
      audioCodec = "truehd";
    } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital Plus/i)) {
      audioCodec = "dd+";
    } else if (audioFormat.match(/AC-3/i) && commercialName.match(/Dolby Digital/i)) {
      audioCodec = "dd";
    } else if (audioFormat.match(/AC-3/i)) {
      audioCodec = "ac3";
    } else if (audioFormat.match(/DTS XLL X/i)) {
      audioCodec = "dtsx";
    } else if (audioFormat.match(/DTS/i) && commercialName.match(/DTS-HD Master Audio/i)) {
      audioCodec = "dtshdma";
    } else if (audioFormat.match(/DTS/i)) {
      audioCodec = "dts";
    } else if (audioFormat.match(/FLAC/i)) {
      audioCodec = "flac";
    } else if (audioFormat.match(/AAC/i)) {
      audioCodec = "aac";
    } else if (audioFormat.match(/LPCM/i)) {
      audioCodec = "lpcm";
    }
    return {
      audioCodec,
      channelName,
      languageArray
    };
  };
  var getInfoFromBDInfo = (bdInfo) => {
    var _a, _b, _c, _d;
    if (!bdInfo) {
      return "";
    }
    const splitArray = bdInfo.split("Disc Title");
    if (splitArray.length > 2) {
      bdInfo = splitArray[1];
    }
    const videoMatch = bdInfo.match(/VIDEO:(\s|Codec|Bitrate|Description|Language|-)*((.|\n)*)AUDIO:/i);
    const hasFileInfo = bdInfo.match(/FILES:/i);
    const subtitleReg = new RegExp(`SUBTITLE(S)*:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${hasFileInfo ? "FILES:" : ""}`, "i");
    const subtitleMatch = bdInfo.match(subtitleReg);
    const audioReg = new RegExp(`AUDIO:(\\s|Codec|Bitrate|Description|Language|-)*((.|\\n)*)${subtitleMatch ? "(SUBTITLE(S)?)" : hasFileInfo ? "FILES:" : ""}`, "i");
    const audioMatch = bdInfo.match(audioReg);
    const fileSize = (_b = (_a = bdInfo.match(/Disc\s*Size:\s*((\d|,| )+)bytes/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.replace(/,/g, "");
    const quickSummaryStyle = !bdInfo.match(/PLAYLIST REPORT/i);
    const videoPart = splitBDMediaInfo(videoMatch, 2);
    const [mainVideo = "", otherVideo = ""] = videoPart;
    const videoCodec = mainVideo.match(/2160/) ? "hevc" : "h264";
    const hdrFormat = (_c = mainVideo.match(/\/\s*HDR(\d)*(\+)*\s*\//i)) == null ? void 0 : _c[0];
    const isDV = !!otherVideo.match(/\/\s*Dolby\s*Vision\s*/i);
    const audioPart = splitBDMediaInfo(audioMatch, 2);
    const subtitlePart = splitBDMediaInfo(subtitleMatch, 3);
    const resolution = (_d = mainVideo.match(/\d{3,4}(p|i)/)) == null ? void 0 : _d[0];
    const {audioCodec = "", channelName = "", languageArray = []} = getBDAudioInfo(audioPart, quickSummaryStyle);
    const subtitleLanguageArray = subtitlePart.map((item) => {
      var _a2, _b2;
      const quickStyleMatch = (_a2 = item.match(/(\w+)\s*\//)) == null ? void 0 : _a2[1];
      const normalMatch = (_b2 = item.match(/Graphics\s*(\w+)\s*(\d|\.)+\s*kbps/i)) == null ? void 0 : _b2[1];
      const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
      return language;
    });
    const mediaTags = getMediaTags(audioCodec, channelName, languageArray, subtitleLanguageArray, hdrFormat, isDV);
    return {
      fileSize,
      videoCodec,
      audioCodec,
      resolution,
      mediaTags
    };
  };
  var splitBDMediaInfo = (matchArray, matchIndex) => {
    var _a, _b;
    return (_b = (_a = matchArray == null ? void 0 : matchArray[matchIndex]) == null ? void 0 : _a.split("\n").filter((item) => !!item)) != null ? _b : [];
  };
  var getBDAudioInfo = (audioPart, quickSummaryStyle) => {
    var _a, _b;
    if (audioPart.length < 1) {
      return {};
    }
    const sortArray = audioPart.sort((a, b) => {
      var _a2, _b2;
      const firstBitrate = parseInt((_a2 = a.match(/\/\s*(\d+)\s*kbps/i)) == null ? void 0 : _a2[1]);
      const lastBitrate = parseInt((_b2 = b.match(/\/\s*(\d+)\s*kbps/i)) == null ? void 0 : _b2[1]);
      return lastBitrate - firstBitrate;
    });
    const [mainAudio, secondAudio] = sortArray;
    const mainAudioCodec = getAudioCodecFromTitle(mainAudio);
    const secondAudioCodec = getAudioCodecFromTitle(secondAudio);
    let audioCodec = mainAudioCodec;
    let channelName = (_a = mainAudio.match(/\d\.\d/)) == null ? void 0 : _a[0];
    if (mainAudioCodec === "lpcm" && secondAudioCodec === "dtshdma") {
      audioCodec = secondAudioCodec;
      channelName = (_b = mainAudio.match(/\d\.\d/)) == null ? void 0 : _b[0];
    }
    const languageArray = sortArray.map((item) => {
      var _a2, _b2;
      const quickStyleMatch = (_a2 = item.match(/(\w+)\s*\//)) == null ? void 0 : _a2[1];
      const normalMatch = (_b2 = item.match(/Audio\s*(\w+)\s*\d+\s*kbps/)) == null ? void 0 : _b2[1];
      const language = quickSummaryStyle ? quickStyleMatch : normalMatch;
      return language;
    });
    return {
      audioCodec,
      channelName,
      languageArray
    };
  };
  var wrappingBBCodeTag = ({pre, post, tracker}, preTag, poTag) => {
    const isPre = typeof pre !== "undefined" && pre !== null;
    const isPost = typeof post !== "undefined" && post !== null;
    if (isPre) {
      pre.unshift(preTag);
    }
    if (isPost) {
      post.push(poTag);
    }
  };
  var getFilterBBCode = (content) => {
    if (content) {
      const bbCodes = htmlToBBCode(content);
      return bbCodes.replace(/\[quote\]((.|\n)*?)\[\/quote\]/g, function(match, p1) {
        if (p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/)) {
          return "";
        }
        return match;
      });
    }
  };
  var rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : "";
  };
  var ensureProperColor = (color) => {
    if (/rgba?/.test(color))
      return rgb2hex(color);
    return color;
  };
  var htmlToBBCode = (node) => {
    const bbCodes = [];
    const pre = [];
    const post = [];
    const pp = wrappingBBCodeTag.bind(null, {pre, post});
    switch (node.nodeType) {
      case 1: {
        switch (node.tagName.toUpperCase()) {
          case "UL": {
            pp(null, null);
            break;
          }
          case "OL": {
            pp("[list=1]", "[/list]");
            break;
          }
          case "LI": {
            const {className} = node;
            if (CURRENT_SITE_INFO.siteType === "UNIT3D" && className) {
              pp("[quote]", "[/quote]");
              break;
            } else {
              pp("[*]", "\n");
              break;
            }
          }
          case "B": {
            pp("[b]", "[/b]");
            break;
          }
          case "U": {
            pp("[u]", "[/u]");
            break;
          }
          case "I": {
            pp("[i]", "[/i]");
            break;
          }
          case "DIV": {
            if (node.className === "codemain") {
              pp("\n[quote]", "[/quote]");
              break;
            } else {
              pp("\n", "\n");
              break;
            }
          }
          case "P": {
            pp("\n");
            break;
          }
          case "BR": {
            if (CURRENT_SITE_INFO.siteType === "NexusPHP" && CURRENT_SITE_NAME !== "OurBits") {
              pp("");
            } else {
              pp("\n");
            }
            break;
          }
          case "SPAN": {
            pp(null, null);
            break;
          }
          case "BLOCKQUOTE":
          case "PRE":
          case "FIELDSET": {
            const {tagName, className, lastElementChild} = node;
            if (tagName === "BLOCKQUOTE" && CURRENT_SITE_NAME === "PTP" && className.match(/spoiler/)) {
              if (lastElementChild.tagName === "BLOCKQUOTE") {
                return `[quote]${lastElementChild.textContent}[/quote]`;
              }
              return `[quote]${node.textContent}[/quote]`;
            }
            pp("[quote]", "[/quote]");
            break;
          }
          case "TD": {
            if (CURRENT_SITE_NAME.match(/TTG|HDBits/)) {
              pp("[quote]", "[/quote]");
              break;
            } else {
              return "";
            }
          }
          case "IMG": {
            let imgUrl = "";
            const {src} = node;
            const dataSrc = node.getAttribute("data-src") || node.getAttribute("data-echo");
            if (dataSrc) {
              imgUrl = dataSrc.match(/(http(s)?:)?\/\//) ? dataSrc : location.origin + "/" + dataSrc;
            } else if (src && !src.match(/ico_\w+.gif|jinzhuan/)) {
              imgUrl = src;
            } else {
              return "";
            }
            return `[img]${imgUrl}[/img]`;
          }
          case "FONT": {
            const {color: color2, size} = node;
            if (color2) {
              pp(`[color=${ensureProperColor(color2)}]`, "[/color]");
            }
            if (size) {
              pp(`[size=${size}]`, "[/size]");
            }
            break;
          }
          case "A": {
            const {href, textContent} = node;
            if (href && href.length > 0) {
              if (href.match(/javascript:void/)) {
                return "";
              } else if (CURRENT_SITE_NAME === "PTP" && textContent.match(/Show comparison/)) {
                return "";
              } else {
                pp(`[url=${href}]`, "[/url]");
              }
            }
            break;
          }
          case "H1": {
            pp('[b][size="7"]', "[/size][/b]\n");
            break;
          }
          case "H2": {
            pp('[b][size="6"]', "[/size][/b]\n");
            break;
          }
          case "H3": {
            pp('[b][size="5"]', "[/size][/b]\n");
            break;
          }
          case "H4": {
            pp('[b][size="4"]', "[/size][/b]\n");
            break;
          }
        }
        const {textAlign, fontWeight, fontStyle, textDecoration, color} = node.style;
        if (textAlign) {
          switch (textAlign.toUpperCase()) {
            case "LEFT": {
              pp("[left]", "[/left]");
              break;
            }
            case "RIGHT": {
              pp("[right]", "[/right]");
              break;
            }
            case "CENTER": {
              pp("[center]", "[/center]");
              break;
            }
          }
        }
        if (fontWeight === "bold" || ~~fontWeight >= 600) {
          pp("[b]", "[/b]");
        }
        if (fontStyle === "italic")
          pp("[i]", "[/i]");
        if (textDecoration === "underline")
          pp("[u]", "[/u]");
        if (color && color.trim() !== "")
          pp(`[color=${ensureProperColor(color)}]`, "[/color]");
        break;
      }
      case 3: {
        if (node.textContent.trim().match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|\[show\]|Spoiler)/)) {
          return "";
        }
        return node.textContent;
      }
      default:
        return null;
    }
    node.childNodes.forEach((node2, i) => {
      const code = htmlToBBCode(node2);
      if (code) {
        bbCodes.push(code);
      }
    });
    return pre.concat(bbCodes).concat(post).join("");
  };
  var getTagsFromSubtitle = (title) => {
    const tags = {};
    if (title.match(/diy/i)) {
      tags.DIY = true;
    }
    if (title.match(/国配|国语/i)) {
      tags.chineseAudio = true;
    }
    if (title.match(/Atoms|杜比全景声/i)) {
      tags.atoms = true;
    }
    if (title.match(/HDR/i)) {
      if (title.match(/HDR10\+/i)) {
        tags["HDR10+"] = true;
      } else {
        tags.HDR = true;
      }
    }
    if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
      tags.DolbyVision = true;
    }
    if (title.match(/粤/i)) {
      tags.cantoneseAudio = true;
    }
    if (title.match(/简|繁|中字/i)) {
      tags.chineseSubtitle = true;
    }
    if (title.match(/Criterion|CC标准/i)) {
      tags.CC = true;
    }
    return tags;
  };
  var getBDInfoFromBBCode = (bbcode) => {
    var _a, _b;
    if (!bbcode) {
      return "";
    }
    const quoteList = bbcode.match(/\[quote(=\w+)?\](.|\n)+?\[\/quote\]/g);
    let bdInfo = "";
    if (quoteList && quoteList.length > 0) {
      quoteList.forEach((quote) => {
        if (quote.match(/Disc\s*Size/i)) {
          bdInfo += quote.replace(/\[(\/)?(quote|font)(=(\w| )+)?\]/gi, "").trim() + "\n";
        }
      });
    }
    if (!bdInfo) {
      bdInfo = (_b = (_a = bbcode.match(/Disc\s+(Title|Label)[^[]+/i)) == null ? void 0 : _a[0]) != null ? _b : "";
    }
    return bdInfo;
  };
  var showNotice = (message) => {
    if (!("Notification" in window) || Notification.permission === "denied") {
      alert(message.text);
    } else if (Notification.permission === "granted") {
      const myNotification = new Notification(message.title, {
        body: message.text
      });
      myNotification.onerror = () => {
        alert(message.text);
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission) {
        if (permission === "granted") {
          const myNotification = new Notification(message.title, {
            body: message.text
          });
          myNotification.onerror = () => {
            alert(message.text);
          };
        } else {
          alert(message.text);
        }
      });
    }
  };

  // src/target.js
  var fillTargetForm = (info) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
    console.log(info);
    if (CURRENT_SITE_NAME === "PTSBAO" && localStorage.getItem("autosave")) {
      localStorage.removeItem("autosave");
    }
    const imdbId = getIMDBIdByUrl(info.imdbUrl);
    const isBluray = info.videoType.match(/bluray/i);
    const {screenshots = []} = info;
    const imdbSelector = (_a = CURRENT_SITE_INFO.imdb) == null ? void 0 : _a.selector;
    if (CURRENT_SITE_NAME === "HDRoute") {
      $(imdbSelector).val((_b = imdbId == null ? void 0 : imdbId.replace("tt", "")) != null ? _b : "");
    } else {
      if (imdbSelector) {
        $(imdbSelector).val(info.imdbUrl);
      }
    }
    if (CURRENT_SITE_NAME === "HDBits") {
      let mediaTitle = info.title.replace(/([^\d]+)\s+([12][90]\d{2})/, (match, p1, p2) => {
        return `${info.movieName || info.movieAkaName} ${p2}`;
      });
      if (info.videoType === "remux") {
        mediaTitle = mediaTitle.replace(/\s+(bluray|blu-ray)/ig, "");
      }
      info.title = mediaTitle;
    }
    if (CURRENT_SITE_INFO.name) {
      const {title, subtitle} = info;
      let torrentTitle = title;
      if (CURRENT_SITE_NAME === "TTG") {
        torrentTitle += `[${subtitle}]`;
      } else if (CURRENT_SITE_NAME === "SSD") {
        torrentTitle = title.replace(/\s/ig, ".");
      }
      $(CURRENT_SITE_INFO.name.selector).val(torrentTitle);
    }
    disableTorrentChange();
    const commonInfoKeys = ["subtitle", "douban", "area", "audioCodec"];
    commonInfoKeys.forEach((key) => {
      const siteInfo = CURRENT_SITE_INFO[key];
      if (siteInfo && siteInfo.selector) {
        let value = info[key];
        if (key === "douban") {
          value = info.doubanUrl;
        } else if (key === "area" || key === "audioCodec") {
          value = siteInfo.map[info[key]];
        }
        $(siteInfo.selector).val(value);
      }
    });
    const mediaInfo = info.mediaInfo;
    let description = "";
    if (info.description) {
      description = info.description;
      if (isChineseTacker(CURRENT_SITE_INFO.siteType) && CURRENT_SITE_NAME !== "SSD") {
        const {doubanInfo} = info;
        if (doubanInfo) {
          description = doubanInfo + description;
        }
      } else {
        const {sourceSiteType} = info;
        if (isChineseTacker(sourceSiteType) && CURRENT_SITE_NAME !== "Bib") {
          description = filterNexusDescription(info);
        }
      }
    }
    if (CURRENT_SITE_INFO.mediaInfo) {
      if (!(isBluray && CURRENT_SITE_NAME.match(/HDBits|Blutopia/))) {
        $(CURRENT_SITE_INFO.mediaInfo.selector).val(mediaInfo);
        description = description.replace(mediaInfo.trim(), "");
      }
    }
    if (CURRENT_SITE_INFO.screenshots) {
      screenshots.forEach((img) => {
        if (description.includes(img)) {
          description = description.replace(img, "");
          if (!img.match(/\[url=.+?\[url]/)) {
            description = description.replace(/\[img\]\[\/img\]\n*/g, "");
          }
        }
      });
    }
    if (CURRENT_SITE_NAME === "SSD") {
      $(CURRENT_SITE_INFO.imdb.selector).val(info.doubanUrl || info.imdbUrl);
      $(CURRENT_SITE_INFO.screenshots.selector).val(screenshots.join("\n"));
      if (info.category === "tvPack" || info.title.match(/Trilogy|Collection/i) || info.subTitle && info.subTitle.match(/合集/)) {
        $('input[name="pack"]').attr("checked", true);
      }
    }
    if (CURRENT_SITE_NAME === "HDAI") {
      $(CURRENT_SITE_INFO.imdb.selector).val(info.doubanUrl || info.imdbUrl);
      $(CURRENT_SITE_INFO.screenshots.selector).val(screenshots.join("\n"));
      if (isBluray) {
        $('input[type="checkbox"][name="tag[o]"]').attr("checked", true);
      }
    }
    if (CURRENT_SITE_INFO.poster) {
      const posterImage = (info.description + info.doubanInfo).match(/\[img\](http[^[]+?poster[^[]+?)\[\/img\]/);
      if (posterImage && posterImage[1]) {
        const poster = posterImage[1];
        $(CURRENT_SITE_INFO.poster).val(poster);
        if (CURRENT_SITE_NAME === "HDRoute") {
          $('input[name="poster"]').val(poster);
          description = description.replace(poster, "");
        }
      }
    }
    description = filterEmptyTags(description);
    if (CURRENT_SITE_NAME === "BeyondHD") {
      info.screenshots.forEach((img) => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\]`);
        if (description.match(regStr)) {
          description = description.replace(regStr, function(p1, p2) {
            return `[img=350x350]${p2}[/img]`;
          });
        }
      });
    }
    $(CURRENT_SITE_INFO.description.selector).val(getThanksQuote(info) + description.trim());
    if (CURRENT_SITE_NAME.match(/BeyondHD|Blutopia|HDPOST|ACM/)) {
      const fillIMDBId = CURRENT_SITE_INFO.siteType === "UNIT3D" ? imdbId.replace("tt", "") : imdbId;
      $(CURRENT_SITE_INFO.imdb.selector).val(fillIMDBId);
      getTMDBIdByIMDBId(imdbId).then((id) => {
        $(CURRENT_SITE_INFO.tmdb.selector).val(id);
      });
      if (CURRENT_SITE_NAME.match(/BeyondHD|ACM/i)) {
        const {category, videoType} = info;
        info.category = videoType;
        info.videoType = category;
        if (isBluray) {
          let bdType = getBDType(info.size);
          if (videoType === "uhdbluray" && bdType === "BD50") {
            bdType = "uhd50";
          }
          info.category = bdType;
        }
      }
    }
    if (CURRENT_SITE_INFO.category) {
      const category = CURRENT_SITE_INFO.category.map[info.category];
      const keyArray = ["videoCodec", "videoType", "resolution", "source", "area"];
      let finalSelectArray = [];
      if (Array.isArray(category)) {
        finalSelectArray = [...category];
        keyArray.forEach((key) => {
          finalSelectArray = matchSelectForm(CURRENT_SITE_INFO, info, key, finalSelectArray);
          if (finalSelectArray.length === 1) {
            $(CURRENT_SITE_INFO.category.selector).val(finalSelectArray[0]);
          }
        });
      } else {
        [...keyArray, "category"].forEach((key) => {
          matchSelectForm(CURRENT_SITE_INFO, info, key, finalSelectArray);
        });
      }
    }
    if (CURRENT_SITE_INFO.format) {
      const formatData = CURRENT_SITE_INFO.format;
      $(formatData.selector).val(formatData.map[info.format]);
    }
    if (CURRENT_SITE_INFO.image) {
      const image = (_d = (_c = info.description.match(/\[img\](.+?)\[\/img\]/)) == null ? void 0 : _c[1]) != null ? _d : "";
      $(CURRENT_SITE_INFO.image.selector).val(image);
    }
    if (CURRENT_SITE_NAME.match(/HDHome|PTHome|SoulVoice/i)) {
      $(CURRENT_SITE_INFO.category.selector).change();
    }
    if (CURRENT_SITE_INFO.anonymous) {
      const {selector, value = ""} = CURRENT_SITE_INFO.anonymous;
      if (value) {
        $(selector).val(value);
      } else {
        $(selector).attr("checked", true);
      }
    }
    if (CURRENT_SITE_INFO.tags) {
      Object.keys(info.tags).forEach((key) => {
        if (info.tags[key] && CURRENT_SITE_INFO.tags[key]) {
          $(CURRENT_SITE_INFO.tags[key]).attr("checked", true);
        }
      });
    }
    fillTeamName(info);
    if (CURRENT_SITE_NAME.match(/PTHome|HDSky|LemonHD/i)) {
      if (info.tags.DIY) {
        let categoryValue = "";
        if (CURRENT_SITE_NAME === "PTHome") {
          categoryValue = info.videoType === "bluray" ? "14" : "13";
        } else if (CURRENT_SITE_NAME === "HDSky") {
          categoryValue = info.videoType === "bluray" ? "12" : "14";
        } else if (CURRENT_SITE_NAME === "LemonHD") {
          $('select[name="tag_diy"]').val("yes");
          return;
        }
        $(CURRENT_SITE_INFO.videoType.selector).val(categoryValue);
      }
    }
    if (CURRENT_SITE_NAME.match(/HDU/)) {
      let videoTypeValue = "";
      const {resolution, videoType, category} = info;
      const isTV = category.match(/tv/);
      if (videoType === "remux") {
        if (resolution === "2160p") {
          videoTypeValue = isTV ? "16" : "15";
        } else {
          videoTypeValue = isTV ? "12" : "3";
        }
      }
      if (isTV) {
        if (videoType === "encode") {
          videoTypeValue = "14";
        } else if (videoType === "web") {
          videoTypeValue = "13";
        }
      }
      if (videoTypeValue) {
        $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
      }
      if (videoType.match(/bluray/)) {
        $(CURRENT_SITE_INFO.category.selector).val("424");
      }
    }
    if (CURRENT_SITE_NAME === "TJUPT") {
      $("#browsecat").change();
      handleTJUPT(info);
    }
    if (CURRENT_SITE_NAME === "NYPT") {
      $("#browsecat").change();
      const domTimeout = setTimeout(() => {
        const catMap = {
          movie: "#movie_enname",
          tv: "#series_enname",
          tvPack: "#series_enname",
          documentary: "#doc_enname",
          variety: "#show_enname",
          cartoon: "#anime_enname"
        };
        const selector = catMap[info.category];
        if (selector) {
          $(selector).val(info.title);
        }
        clearTimeout(domTimeout);
      }, 2e3);
    }
    if (CURRENT_SITE_INFO.siteType === "UNIT3D" && info.category.match(/tv/)) {
      const season = (_f = (_e = info.title.match(/S0?(\d{1,2})/i)) == null ? void 0 : _e[1]) != null ? _f : 1;
      const episode = (_h = (_g = info.title.match(/EP?0?(\d{1,3})/i)) == null ? void 0 : _g[1]) != null ? _h : 0;
      $("#season_number").val(season);
      $("#episode_number").val(episode);
    }
    if (CURRENT_SITE_NAME === "HDRoute") {
      const {description: description2, doubanInfo} = info;
      const fullDescription = description2 + doubanInfo;
      const imdbRank = (_j = (_i = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)) == null ? void 0 : _i[1]) != null ? _j : "";
      $("#upload-imdb").val(imdbRank);
      const originalName = (_l = (_k = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _k[2]) != null ? _l : "";
      const translateName = (_p = (_o = (_n = (_m = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _m[2]) == null ? void 0 : _n.split("/")) == null ? void 0 : _o[0]) != null ? _p : "";
      const summary = (_t = (_s = (_r = (_q = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)) == null ? void 0 : _q[2]) == null ? void 0 : _r.split("/")) == null ? void 0 : _s[0]) != null ? _t : "";
      let chineseName = originalName;
      if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
        chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : originalName;
      }
      $("#title_chs").val(chineseName);
      $("#upload_introduction").val(summary);
    }
    if (CURRENT_SITE_NAME === "HDT") {
      if (info.category !== "tvPack") {
        $('select[name="season"').val("true");
      }
    }
  };
  var matchSelectForm = (siteInfo, movieInfo, key, selectArray) => {
    const valueArray = siteInfo[key] ? siteInfo[key].map[movieInfo[key]] : void 0;
    if (Array.isArray(valueArray) && selectArray) {
      if (siteInfo[key].selector) {
        $(siteInfo[key].selector).val(valueArray.shift());
      }
      if (selectArray.length > 1) {
        selectArray = selectArray.filter((item) => valueArray.includes(item));
      }
    } else if (siteInfo[key] && siteInfo[key].selector) {
      $(siteInfo[key].selector).val(valueArray);
    }
    return selectArray;
  };
  var fillTeamName = (info) => {
    var _a, _b, _c;
    const teamMatch = info.title.match(/-([^-]+)$/);
    const teamConfig = CURRENT_SITE_INFO.team;
    let teamName = (_c = (_b = (_a = teamMatch == null ? void 0 : teamMatch[1]) == null ? void 0 : _a.replace(/-/g, "")) == null ? void 0 : _b.split("@")) != null ? _c : "";
    if (teamName) {
      teamName = teamName.length > 1 ? teamName[1] : teamName[0];
      if (HDB_TEAM.includes(teamName) && CURRENT_SITE_NAME === "BTSCHOOL") {
        $(teamConfig.selector).val(teamConfig.map.hdbint);
        return;
      }
    } else {
      teamName = "other";
    }
    if (teamName && teamConfig) {
      const formateTeamName = teamConfig.map[teamName.toLowerCase()];
      const matchValue = formateTeamName || teamConfig.map.other;
      if (CURRENT_SITE_NAME === "HDAI" && !formateTeamName) {
        $('input[name="team"]').val(teamName);
        return;
      }
      if (matchValue) {
        $(teamConfig.selector).val(matchValue.toLowerCase());
      }
    }
  };
  var disableTorrentChange = () => {
    var _a, _b;
    const nameSelector = (_b = (_a = CURRENT_SITE_INFO.name) == null ? void 0 : _a.selector) != null ? _b : "";
    if (nameSelector.match(/^#\w+/)) {
      const nameDom = $(nameSelector).clone().attr("name", "").hide();
      $(nameSelector).attr("id", "").after(nameDom);
    }
  };
  var filterNexusDescription = (info) => {
    const {description, screenshots = []} = info;
    let filterDescription = "";
    const quoteList = description.match(/\[quote(=\w+)?\](.|\n)+?\[\/quote\]/g);
    if (quoteList && quoteList.length > 0) {
      quoteList.forEach((quote) => {
        const isMediaInfoOrBDInfo = quote.match(/Disc\s?Size|\.mpls|Unique\s?ID|唯一ID|Resolution/i);
        if (!quote.match(/[\u4e00-\u9fa5]+/i) || isMediaInfoOrBDInfo) {
          filterDescription += quote + "\n";
        }
      });
    }
    const screenshotsBBCode = screenshots.map((img) => {
      if (img.match(/\[url=.+\]/i)) {
        return img;
      }
      return `[img]${img}[/img]`;
    });
    return filterDescription + "\n" + screenshotsBBCode.join("");
  };
  var getThanksQuote = (info) => {
    const isChineseSite = isChineseTacker(CURRENT_SITE_INFO.siteType) || CURRENT_SITE_NAME === "HDPOST";
    let thanksQuote = `\u8F6C\u53D1\u81EA[b]${info.sourceSite}[/b]\uFF0C\u611F\u8C22\u539F\u53D1\u5E03\u8005\uFF01`;
    if (!isChineseSite) {
      thanksQuote = `Torrent from [b]${info.sourceSite}[/b].
All thanks to the original uploader\uFF01`;
    }
    return `[quote]${thanksQuote}[/quote]

`;
  };
  var isChineseTacker = (siteType) => {
    return siteType.match(/NexusPHP|TTG/);
  };
  var filterEmptyTags = (description) => {
    return description.replace(/(\[\w+(=(\w|\s)+)?\](\s|\n)*)+(\s|\n)*(\[\/\w+\](\s|\n)*)+/g, "");
  };
  var handleTJUPT = (info) => {
    const domTimeout = setTimeout(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      if ($("#ename")) {
        const {title, description, doubanInfo, category, resolution} = info;
        $("#ename").val(title);
        const fullDescription = description + doubanInfo;
        let area = (_b = (_a = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a[2]) != null ? _b : "";
        area = area.replace(/\[\/?.+?\]/g, "");
        const originalName = (_d = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d : "";
        const translateName = (_h = (_g = (_f = (_e = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
        const castArray = (_l = (_k = (_j = (_i = fullDescription.match(/(主\s+演)\s+([^◎]+)/)) == null ? void 0 : _i[2]) == null ? void 0 : _j.split("\n")) == null ? void 0 : _k.filter((item) => !!item)) != null ? _l : [];
        const language = (_n = (_m = fullDescription.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _m[2]) != null ? _n : "";
        const castStr = castArray.map((item) => {
          var _a2;
          return (_a2 = item.trim().split(/\s+/)) == null ? void 0 : _a2[0];
        }).join("/");
        if (area) {
          if (category === "movie") {
            $("#district").val(area.replace(/,/g, "/").replace(/中国/, ""));
          } else if (category.match(/tv/)) {
            let selector = "";
            if (area.match(/大陆/)) {
              selector = "#specificcat1";
            } else if (area.match(/台|港/)) {
              selector = "#specificcat2";
            } else if (area.match(/美国/)) {
              selector = "#specificcat3";
            } else if (area.match(/英国/)) {
              selector = "#specificcat7";
            } else if (area.match(/日本/)) {
              selector = "#specificcat4";
            } else if (area.match(/韩国/)) {
              selector = "#specificcat5";
            } else {
              selector = "#specificcat6";
            }
            $(selector).attr("checked", true);
            getcheckboxvalue("specificcat");
          } else if (category.match(/variety/)) {
            const districtMap = {
              CN: "#district1",
              HK: "#district2",
              TW: "#district2",
              JP: "#district4",
              KR: "#district4",
              US: "#district3",
              EU: "#district3",
              OT: "#district5"
            };
            $(districtMap[info.area]).attr("checked", true);
            getcheckboxvalue("district");
          }
        }
        if ($("#format")) {
          if (category.match(/variety/)) {
            if (resolution.match(/720/)) {
              $("#format3").attr("checked", true);
            } else if (resolution.match(/1080/)) {
              $("#format5").attr("checked", true);
            }
            getcheckboxvalue("format");
          } else if (category.match(/documentary/)) {
            if (resolution.match(/720/)) {
              $("#format2").attr("checked", true);
            } else if (resolution.match(/1080/)) {
              $("#format1").attr("checked", true);
            }
            getradiovalue("format");
          }
        }
        if ($("#language")) {
          let selector = "";
          if (language) {
            if (language.match(/汉语/)) {
              selector = "#language1";
            } else if (language.match(/粤/)) {
              selector = "#language2";
            } else if (language.match(/英语/)) {
              selector = "#language3";
            } else if (language.match(/日语/)) {
              selector = "#language4";
            } else if (language.match(/韩语/)) {
              selector = "#language5";
            }
            $(selector).attr("checked", true);
            getcheckboxvalue("language");
          }
        }
        if (category.match(/variety/)) {
          $("#tvshowsguest").val(castStr);
        }
        let chineseName = originalName;
        if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
          chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
        }
        $("#cname").val(chineseName);
        clearTimeout(domTimeout);
      }
    }, 2e3);
  };

  // src/source/ptp.js
  var ptp_default = () => {
    var _a, _b, _c;
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const torrentDom = $(`#torrent_${torrentId}`);
    const ptpMovieTitle = (_a = $(".page__title").text().match(/]?([^[]+)/)[1]) == null ? void 0 : _a.trim();
    const [movieName, movieAkaName = ""] = ptpMovieTitle.split(" AKA ");
    TORRENT_INFO.mediaInfo = `${torrentDom.find(".mediainfo.mediainfo--in-release-description").next("blockquote:contains(Codec ID)").text()}`;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.movieAkaName = movieAkaName;
    TORRENT_INFO.imdbUrl = (_c = (_b = $("#imdb-title-link")) == null ? void 0 : _b.attr("href")) != null ? _c : "";
    TORRENT_INFO.year = $(".page__title").text().match(/\[(\d+)\]/)[2];
    const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`);
    TORRENT_INFO.category = getPTPType();
    let descriptionBBCode = getFilterBBCode(torrentDom.find("#subtitle_manager+.movie-page__torrent__panel .bbcode-table-guard")[0]);
    if (TORRENT_INFO.category === "concert") {
      descriptionBBCode = $("#synopsis").text() + descriptionBBCode;
    }
    const {comparisonData, screenshots} = getPTPImage(torrentDom);
    if (comparisonData) {
      let comparisonImgs = [];
      Object.keys(comparisonData).forEach((key) => {
        comparisonImgs = comparisonImgs.concat(comparisonData[key]);
        descriptionBBCode = descriptionBBCode.replace(key + ":", "");
        descriptionBBCode += "\n[b]" + key + ":[/b]\n" + comparisonData[key].map((url) => {
          return `[img]${url}[/img]`;
        }).join("");
      });
      TORRENT_INFO.comparisonImgs = comparisonImgs;
    }
    TORRENT_INFO.description = descriptionBBCode;
    const infoArray = torrentHeaderDom.find("#PermaLinkedTorrentToggler").text().replace(/ /g, "").split("/");
    const [codes, container, source, ...otherInfo] = infoArray;
    const isRemux = otherInfo.includes("Remux");
    TORRENT_INFO.videoType = source === "WEB" ? "web" : getVideoType(container, isRemux, codes, source);
    const bdinfo = getBDInfoFromBBCode(descriptionBBCode);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const mediaInfoOrBDInfo = isBluray ? bdinfo : TORRENT_INFO.mediaInfo;
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
    const {videoCodec, audioCodec, fileName = "", resolution, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = mediaTags;
    let torrentName = fileName || torrentHeaderDom.data("releasename");
    torrentName = formatTorrentTitle(torrentName);
    TORRENT_INFO.title = torrentName;
    TORRENT_INFO.source = getPTPSource(source, codes, resolution);
    TORRENT_INFO.size = torrentHeaderDom.find(".nobr span").attr("title").replace(/[^\d]/g, "");
    TORRENT_INFO.screenshots = screenshots;
    let country = [];
    const matchArray = $("#movieinfo div").text().match(/Country:\s+([^\n]+)/);
    if (matchArray && matchArray.length > 0) {
      country = matchArray == null ? void 0 : matchArray[1].replace(/(,)\s+/g, "$1").split(",");
    }
    TORRENT_INFO.area = getAreaCode(country == null ? void 0 : country[0]);
    return TORRENT_INFO;
  };
  var getPTPType = () => {
    const typeMap = {
      "Feature Film": "movie",
      "Short Film": "movie",
      "Stand-up Comedy": "other",
      Miniseries: "tvPack",
      "Live Performance": "concert",
      "Movie Collection": "movie"
    };
    const ptpType = $("#torrent-table .basic-movie-list__torrent-edition__main").eq(0).text();
    return typeMap[ptpType];
  };
  var getPTPImage = () => {
    var _a, _b, _c, _d;
    const imgList = [];
    let comparisonData = {};
    const torrentInfoPanel = $(".movie-page__torrent__panel");
    const links = torrentInfoPanel.find("a:contains(Show comparison)");
    for (let i = 0; i < links.length; i++) {
      const clickFunc = links[i].getAttribute("onclick");
      if (clickFunc && clickFunc.match(/BBCode.ScreenshotComparisonToggleShow/)) {
        try {
          const paramsStr = (_b = (_a = clickFunc.match(/\((.+)\)/)) == null ? void 0 : _a[1]) != null ? _b : "";
          const [comparisonTextStr = "null", imgListStr = "null"] = paramsStr.match(/\[.+?\]/g);
          const comparisonText = (_d = (_c = JSON.parse(comparisonTextStr)) == null ? void 0 : _c.join(",")) != null ? _d : "";
          const comparisonList = JSON.parse(imgListStr);
          comparisonData[comparisonText] = comparisonList;
        } catch (error) {
          comparisonData = null;
        }
      }
    }
    const imageDom = torrentInfoPanel.find(".bbcode__image");
    for (let i = 0; i < imageDom.length; i++) {
      imgList.push(imageDom[i].getAttribute("src"));
    }
    return {
      screenshots: imgList,
      comparisonData
    };
  };
  var getPTPSource = (source, codes, resolution) => {
    if (codes.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return "uhdbluray";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  var getVideoType = (container, isRemux, codes, source) => {
    let type = "";
    if (isRemux) {
      type = "remux";
    } else if (codes.match(/BD50|BD25/ig)) {
      type = "bluray";
    } else if (codes.match(/BD66|BD100/ig)) {
      type = "uhdbluray";
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      type = "dvdrip";
    } else if (codes.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      type = "dvd";
    } else if (container.match(/MKV|MP4/i)) {
      type = "encode";
    }
    return type;
  };

  // src/source/bhd.js
  var bhd_default = () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const {Category, Name, Source, Type, Size} = getBasicInfo();
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const TMDBYear = $(".movie-heading a:last").text();
    const movieName = $(".movie-heading a:first").text();
    if (!TMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
      TORRENT_INFO.year = matchYear ? matchYear[0] : "";
    } else {
      TORRENT_INFO.year = TMDBYear;
    }
    const descriptionDom = $(".panel-heading:contains(Description)").next(".panel-body").find(".forced-nfo");
    const descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    TORRENT_INFO.description = descriptionBBCode;
    const {category: movieCat, countries, imdbUrl} = getMovieDetails();
    TORRENT_INFO.movieName = movieName;
    let category = Category.toLowerCase().replace(/s/, "");
    category = movieCat === "Animation" ? "cartoon" : category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSource(Source, Type);
    TORRENT_INFO.area = getAreaCode(countries);
    TORRENT_INFO.videoType = getVideoType2(Type);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const mediaInfo = $("#stats-full code").text();
    TORRENT_INFO.mediaInfo = mediaInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {videoCodec, audioCodec, resolution, mediaTags} = getInfoFunc(mediaInfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = __assign(__assign({}, tags), mediaTags);
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.screenshots = getImages();
    return TORRENT_INFO;
  };
  var getBasicInfo = () => {
    const basicInfo = {};
    $(".dotborder").each((index, element) => {
      const key = $(element).find("td:first").text();
      const value = $(element).find("td:last").text();
      basicInfo[key] = value.replace(/\n/g, "").trim();
    });
    console.log(basicInfo);
    return basicInfo;
  };
  var getMovieDetails = () => {
    const infoList = $(".movie-details a");
    const movieDetail = {};
    infoList.each((index, element) => {
      const urlParams = $(element).attr("href").replace(/.+\?/g, "").split("=");
      if (urlParams.length > 1) {
        let key = decodeURI(urlParams[0]);
        const value = urlParams[1];
        if (key === "g[]") {
          key = "category";
        }
        movieDetail[key] = value;
      } else if (urlParams == null ? void 0 : urlParams[0].match(/tt\d+/)) {
        movieDetail.imdbUrl = urlParams[0];
      }
    });
    return movieDetail;
  };
  var getImages = () => {
    var _a;
    const screenshots = (_a = TORRENT_INFO.description.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g)) != null ? _a : [];
    return screenshots;
  };
  var getSource = (source, resolution) => {
    if (resolution.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/UHD/i)) {
      return "uhdbluray";
    }
    if (source.match(/WEB|WEB-DL/i)) {
      return "web";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  var getVideoType2 = (type) => {
    type = type.replace(/\s/g, "");
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/BD50|BD25/i)) {
      return "bluray";
    } else if (type.match(/UHD50|UHD66|UHD100/i)) {
      return "uhdbluray";
    } else if (type.match(/DVD5|DVD9/i)) {
      return "dvd";
    } else if (type.match(/\d{3,4}p/i)) {
      return "encode";
    }
    return type;
  };

  // src/source/hdb.js
  var hdb_default = () => {
    var _a, _b;
    const torrentId = getUrlParam("id");
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const editDom = $("#details tr").has("a:contains(Edit torrent)");
    const descriptionDom = editDom.length > 0 ? editDom.prev() : $("#details tr").has(".js-tagcontent").prev();
    let descriptionBBCode = getFilterBBCode(descriptionDom.find(">td")[0]);
    descriptionBBCode = (_b = (_a = descriptionBBCode.match(/\[quote\]((.|\n)+)\[\/quote\]/)) == null ? void 0 : _a[1]) != null ? _b : "";
    TORRENT_INFO.description = descriptionBBCode;
    const {size, category, videoType} = getBasicInfo2();
    const title = $("h1").eq(0).text();
    TORRENT_INFO.title = formatTorrentTitle(title);
    const tags = getTagsFromSubtitle(title);
    const isMovieType = $(".contentlayout h1").length > 0;
    const IMDBLinkDom = isMovieType ? $(".contentlayout h1") : $("#details .showlinks li").eq(1);
    if (isMovieType) {
      const IMDBYear = IMDBLinkDom.prop("lastChild").nodeValue.replace(/\s|\(|\)/g, "");
      const movieName = IMDBLinkDom.find("a").text();
      TORRENT_INFO.movieName = movieName;
      if (!IMDBYear) {
        const matchYear = TORRENT_INFO.title.match(/\s([12][90]\d{2})/);
        TORRENT_INFO.year = matchYear ? matchYear[0] : "";
      } else {
        TORRENT_INFO.year = IMDBYear;
      }
    }
    TORRENT_INFO.imdbUrl = IMDBLinkDom.find("a").attr("href");
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.videoType = videoType;
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const bdinfo = getBDInfoFromBBCode(descriptionBBCode);
    if (!isBluray) {
      TORRENT_INFO.bdinfo = bdinfo;
      getMediaInfo(torrentId).then((data) => {
        if (data) {
          TORRENT_INFO.mediaInfo = data;
          const {videoCodec, audioCodec, resolution, mediaTags} = getInfoFunc(TORRENT_INFO.mediaInfo);
          TORRENT_INFO.videoCodec = videoCodec;
          TORRENT_INFO.audioCodec = audioCodec;
          TORRENT_INFO.resolution = resolution;
          TORRENT_INFO.tags = __assign(__assign({}, tags), mediaTags);
        }
      });
    } else {
      TORRENT_INFO.mediaInfo = bdinfo;
      const {videoCodec, audioCodec, resolution, mediaTags} = getInfoFunc(bdinfo || descriptionBBCode);
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.resolution = resolution;
      TORRENT_INFO.tags = __assign(__assign({}, tags), mediaTags);
    }
    TORRENT_INFO.size = size;
    TORRENT_INFO.screenshots = getImages2(descriptionDom);
  };
  var getBasicInfo2 = () => {
    const videoTypeMap = {
      "Blu-ray/HD DVD": "bluray",
      Capture: "hdtv",
      Encode: "encode",
      Remux: "remux",
      "WEB-DL": "web"
    };
    const info = $("th:contains(Category)").next().text();
    const size = $("th:contains(Size)").eq(0).next().text();
    const splitArray = info.split("(");
    const category = splitArray[0].trim().toLowerCase();
    const videoCodec = splitArray[1].split(",")[0].toLowerCase().replace(/\./g, "");
    const videoType = splitArray[1].split(",")[1].replace(/\)/g, "").trim();
    return {
      size: getSize(size),
      category,
      videoCodec,
      videoType: videoTypeMap[videoType]
    };
  };
  var getMediaInfo = (torrentId) => {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `https://hdbits.org/details/mediainfo?id=${torrentId}`,
        onload(res) {
          const data = res.responseText;
          if (res.status !== 200 || !data) {
            reject(new Error("\u8BF7\u6C42\u5931\u8D25"));
          }
          resolve(data);
        }
      });
    });
  };
  var getImages2 = (descriptionDom) => {
    var _a;
    const screenshots = (_a = TORRENT_INFO.description.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g)) != null ? _a : [];
    return screenshots;
  };

  // src/source/ttg.js
  var ttg_default = () => {
    var _a, _b;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const headTitle = $("#main_table h1").eq(0).text();
    const title = (_a = headTitle.match(/[^[]+/)) == null ? void 0 : _a[0];
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.subtitle = headTitle.replace(title, "").replace(/\[|\]/g, "");
    const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle + TORRENT_INFO.title);
    const mediaTecInfo = getTorrentValueDom("\u7C7B\u578B").text();
    const {category, area, videoType} = getCategoryAndArea(mediaTecInfo);
    TORRENT_INFO.area = area;
    TORRENT_INFO.videoType = getVideoType3(title, videoType);
    const year = TORRENT_INFO.title.match(/(18|19|20)\d{2}/g);
    TORRENT_INFO.year = year ? year.pop() : "";
    TORRENT_INFO.imdbUrl = getTorrentValueDom("IMDB").find("a").attr("href");
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    const sizeStr = (_b = getTorrentValueDom("\u5C3A\u5BF8").text().match(/\(((\d|,)+)\s*字节\)/i)) == null ? void 0 : _b[1];
    TORRENT_INFO.size = sizeStr.replace(/,/g, "");
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    TORRENT_INFO.isForbidden = !!$("#kt_d").text().match(/禁转/);
    window.onload = () => {
      var _a2, _b2, _c, _d, _e, _f, _g;
      const descriptionDom = $("#kt_d");
      let bbCodes = getFilterBBCode(descriptionDom[0]);
      const discountMatch = (_b2 = (_a2 = bbCodes.match(/\[color=\w+\]本种子.+?\[\/color\]/)) == null ? void 0 : _a2[0]) != null ? _b2 : "";
      if (bbCodes.match) {
        bbCodes = bbCodes.replace(discountMatch, "");
      }
      TORRENT_INFO.description = bbCodes;
      const doubanUrl = (_c = bbCodes.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)) == null ? void 0 : _c[0];
      if (doubanUrl) {
        TORRENT_INFO.doubanUrl = doubanUrl;
      }
      const areaMatch = (_d = bbCodes.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _d[2];
      if (areaMatch) {
        TORRENT_INFO.area = getAreaCode(areaMatch);
      }
      if (!category) {
        TORRENT_INFO.category = getCategoryFromDesc(bbCodes);
      } else {
        TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
      }
      const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo(bbCodes);
      const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
      if (mediaInfoOrBDInfo) {
        TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
        const {videoCodec, audioCodec, resolution, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        TORRENT_INFO.resolution = resolution;
        TORRENT_INFO.tags = __assign(__assign({}, tags), mediaTags);
      } else {
        let resolution = (_e = TORRENT_INFO.title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _e[0];
        if (!resolution && resolution.match(/4k|uhd/i)) {
          resolution = "2160p";
        }
        TORRENT_INFO.resolution = resolution;
        TORRENT_INFO.audioCodec = getAudioCodecFromTitle(TORRENT_INFO.title);
        if (bbCodes.match(/VIDEO(\.| )*CODEC/i)) {
          const matchCodec = (_f = bbCodes.match(/VIDEO(\.| )*CODEC\.*:?\s*([^\s_:]+)?/i)) == null ? void 0 : _f[2];
          if (matchCodec) {
            TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, "").toLowerCase();
          } else {
            const {title: title2} = TORRENT_INFO;
            TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title2);
          }
        }
        if (bbCodes.match(/AUDIO\s*CODEC/i)) {
          const matchCodec = (_g = bbCodes.match(/AUDIO\s*CODEC\.*:?\s*(.+)/i)) == null ? void 0 : _g[1];
          if (matchCodec) {
            TORRENT_INFO.audioCodec = getAudioCodecFromTitle(matchCodec);
          }
        }
      }
      TORRENT_INFO.screenshots = getImages3(bbCodes);
      console.log(TORRENT_INFO);
    };
  };
  var getCategoryAndArea = (mediaInfo) => {
    let category = "";
    let area = "";
    let videoType = "";
    if (mediaInfo.match(/电影/)) {
      category = "movie";
    } else if (mediaInfo.match(/剧包/)) {
      category = "tvPack";
    } else if (mediaInfo.match(/剧/)) {
      category = "tv";
    } else if (mediaInfo.match(/纪录/)) {
      category = "documentary";
    } else if (mediaInfo.match(/综艺/)) {
      category = "variety";
    } else if (mediaInfo.match(/体育/)) {
      category = "sport";
    } else if (mediaInfo.match(/演唱会/)) {
      category = "concert";
    } else if (mediaInfo.match(/动漫/)) {
      category = "cartoon";
    }
    if (mediaInfo.match(/韩/)) {
      area = "KR";
    } else if (mediaInfo.match(/日/)) {
      area = "JP";
    } else if (mediaInfo.match(/华/)) {
      area = "CN";
    } else if (mediaInfo.match(/欧/)) {
      area = "US";
    }
    if (mediaInfo.match(/UHD原盘/i)) {
      videoType = "uhdbluray";
    } else if (mediaInfo.match(/bluray原盘/i)) {
      videoType = "bluray";
    } else if (mediaInfo.match(/DVD/i)) {
      videoType = "dvd";
    }
    return {
      category,
      area,
      videoType
    };
  };
  var getBDInfoOrMediaInfo = (bbcode) => {
    const quoteList = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g);
    let bdinfo = "";
    let mediaInfo = "";
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = formatQuoteContent(quoteList[i]);
      if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
        bdinfo += quoteContent;
      }
      if (quoteContent.match(/Unique ID/i)) {
        mediaInfo += quoteContent;
      }
    }
    if (!bdinfo) {
      bdinfo = getBDInfoFromBBCode(bbcode);
    }
    return {
      bdinfo,
      mediaInfo
    };
  };
  var formatQuoteContent = (content) => {
    return content.replace(/\[(.+)\]?/g, "").replace(/\u200D/g, "");
  };
  var getImages3 = (bbcode) => {
    var _a;
    if (bbcode.match(/More\.Screens/i)) {
      const moreScreen = (_a = bbcode.match(/\.More\.Screens\[\/u\]\[\/color\]\n((.|\n)+\[\/(url|img)\])/)) == null ? void 0 : _a[1];
      return getScreenshotsFromBBCode(moreScreen);
    } else {
      return getScreenshotsFromBBCode(bbcode);
    }
  };
  var getVideoType3 = (title, videoType) => {
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/remux/i)) {
      return "remux";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return videoType;
  };
  var getTorrentValueDom = (key) => {
    return $(`#main_table td.heading:contains(${key})`).next();
  };
  var getCategoryFromDesc = (desc) => {
    let category = "movie";
    const {title, subtitle} = TORRENT_INFO;
    if (title.match(/s0?\d{1,2}/i) || desc.match(/集\s*数/)) {
      if (title.match(/s0?\d{1,2}e0\d{1,2}/i) || subtitle.match(/第[^\s]集/)) {
        category = "tv";
      } else {
        category = "tvPack";
      }
    } else if (desc.match(/动画/)) {
      category = "cartoon";
    } else if (desc.match(/纪录/)) {
      category = "documentary";
    }
    return category;
  };

  // src/source/unit3d.js
  var unit3d_default = () => {
    var _a, _b, _c, _d, _e, _f;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const {Category, Name, Type, Size, Resolution} = getBasicInfo3();
    TORRENT_INFO.size = getSize(Size);
    let title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const IMDBYear = $(".movie-heading span:last").text();
    const movieName = $(".movie-heading span:first").text();
    if (CURRENT_SITE_NAME === "HDPOST") {
      const englishTitle = (_b = (_a = title.match(/[\s\W\d]+(.+)/)) == null ? void 0 : _a[1]) != null ? _b : "";
      TORRENT_INFO.subtitle = (_c = title.replace(englishTitle, "")) == null ? void 0 : _c.trim();
      title = englishTitle;
    }
    TORRENT_INFO.title = title;
    if (!IMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
      TORRENT_INFO.year = (_d = matchYear == null ? void 0 : matchYear.pop()) != null ? _d : "";
    } else {
      TORRENT_INFO.year = IMDBYear.replace(/\(|\)|\s/g, "");
    }
    TORRENT_INFO.resolution = (_e = Resolution.match(/\d+(i|p)/i)) == null ? void 0 : _e[0];
    const descriptionDom = $(".panel:contains(Media Info)").next().find(".panel-body");
    const descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    const mediaInfo = $(".decoda-code code").text();
    TORRENT_INFO.description = `${descriptionBBCode}
[quote]${mediaInfo}[/quote]`;
    const imdbUrl = $(".movie-details a:contains(IMDB)").attr("href");
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.movieName = CURRENT_SITE_NAME === "HDPOST" ? "" : movieName;
    const category = getCategory(Category);
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.videoType = getVideoType4(Type, Resolution);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const bdinfo = getBDInfoFromBBCode(descriptionBBCode);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    const {videoCodec, audioCodec, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.tags = __assign(__assign({}, tags), mediaTags);
    TORRENT_INFO.screenshots = (_f = TORRENT_INFO.description.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g)) != null ? _f : [];
    return TORRENT_INFO;
  };
  var getBasicInfo3 = () => {
    const basicInfo = {};
    const keyMap = {
      Name: "Name",
      \u540D\u79F0: "Name",
      \u540D\u7A31: "Name",
      Size: "Size",
      \u4F53\u79EF: "Size",
      \u9AD4\u7A4D: "Size",
      Category: "Category",
      \u7C7B\u522B: "Category",
      \u985E\u5225: "Category",
      Type: "Type",
      \u89C4\u683C: "Type",
      \u898F\u683C: "Type",
      Resolution: "Resolution"
    };
    $("#vue+.panel table tr").each((index, element) => {
      const key = $(element).find("td:first").text().replace(/\s|\n/g, "");
      const value = $(element).find("td:last").text();
      basicInfo[keyMap[key]] = value.replace(/\n/g, "").trim();
    });
    return basicInfo;
  };
  var getCategory = (key) => {
    if (!key) {
      return "";
    }
    if (key.match(/movie|电影/i)) {
      return "movie";
    } else if (key.match(/tv|电视|剧集/)) {
      return "tv";
    }
  };
  var getVideoType4 = (type, resolution) => {
    type = type.replace(/\s/g, "");
    if (type.match(/FullDisc/)) {
      if (resolution.match(/2160p/i)) {
        return "uhdbluray";
      } else if (resolution.match(/1080/)) {
        return "bluray";
      } else {
        return "dvd";
      }
    } else if (type.match(/Encode/i)) {
      return "encode";
    } else if (type.match(/web/i)) {
      return "web";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    }
    return type;
  };

  // src/source/nexusphp.js
  var nexusphp_default = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    let title = formatTorrentTitle((_b = (_a = $("#top").text().split(/\s{3,}/)) == null ? void 0 : _a[0]) == null ? void 0 : _b.trim());
    let metaInfo = $("td.rowhead:contains('\u57FA\u672C\u4FE1\u606F'), td.rowhead:contains('\u57FA\u672C\u8CC7\u8A0A')").next().text().replace(/：/g, ":");
    let subtitle = $("td.rowhead:contains('\u526F\u6807\u9898'), td.rowhead:contains('\u526F\u6A19\u984C')").next().text();
    let siteImdbUrl = $("#kimdb>a").attr("href");
    let descriptionBBCode = getFilterBBCode($("#kdescr")[0]);
    if (CURRENT_SITE_NAME === "HDArea") {
      title = (_d = (_c = $("h1#top").text().split(/\s{3,}/)) == null ? void 0 : _c[0]) == null ? void 0 : _d.trim();
    }
    if (CURRENT_SITE_NAME === "TJUPT") {
      const matchArray = title.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
      const realTitle = (_f = (_e = matchArray.filter((item) => item.match(/\.| /))) == null ? void 0 : _e[0]) != null ? _f : "";
      title = realTitle.replace(/\[|\]/g, "");
    }
    if (CURRENT_SITE_NAME === "PTer") {
      if ($("#descrcopyandpaster")[0]) {
        descriptionBBCode = (_g = $("#descrcopyandpaster").val()) == null ? void 0 : _g.replace(/hide(=(MediaInfo|BDInfo))?\]/ig, "quote]");
      } else {
        descriptionBBCode = getFilterBBCode($("#kdescr")[0]);
      }
    }
    if (CURRENT_SITE_NAME === "LemonHD") {
      descriptionBBCode = descriptionBBCode.replace(/\[b\]\[color=\w+\][^[]+?网上搜集[^[]+?\[\/color\]\[\/b\]/, "");
    }
    if (CURRENT_SITE_NAME === "HDChina") {
      const meta = [];
      $("li:contains('\u57FA\u672C\u4FE1\u606F'):last").next("li").children("i").each(function() {
        meta.push($(this).text().replace("\uFF1A", ":"));
      });
      metaInfo = meta.join("\xA0\xA0\xA0");
      subtitle = $("#top").next("h3").text();
    }
    if (CURRENT_SITE_NAME === "OurBits") {
      siteImdbUrl = $(".imdbnew2 a:first").attr("href");
      TORRENT_INFO.doubanUrl = $("#doubaninfo .doubannew a").attr("href");
      if (TORRENT_INFO.doubanUrl) {
        const doubanInfo = getFilterBBCode((_h = $(".doubannew2 .doubaninfo")) == null ? void 0 : _h[0]);
        const doubanPoster = `[img]${$("#doubaninfo .doubannew a img").attr("src")}[/img]
`;
        TORRENT_INFO.doubanInfo = doubanPoster + doubanInfo;
      }
    }
    if (CURRENT_SITE_NAME === "KEEPFRDS") {
      [title, subtitle] = [subtitle, title];
    }
    if (CURRENT_SITE_NAME === "SSD") {
      TORRENT_INFO.doubanUrl = $(".douban_info a:contains('://movie.douban.com/subject/')").attr("href");
      const doubanInfo = getFilterBBCode((_i = $(".douban-info artical")) == null ? void 0 : _i[0]);
      const postUrl = (_k = (_j = $("#kposter").find("img")) == null ? void 0 : _j.attr("src")) != null ? _k : "";
      const doubanPoster = postUrl ? `[img]${postUrl} [/img]
` : "";
      TORRENT_INFO.doubanInfo = doubanPoster + (doubanInfo == null ? void 0 : doubanInfo.replace(/\n{2,}/g, "\n"));
      if (descriptionBBCode === "" || descriptionBBCode === void 0) {
        let extraTextInfo = getFilterBBCode((_l = $(".torrent-extra-text-container .extra-text")) == null ? void 0 : _l[0]);
        extraTextInfo = extraTextInfo ? `
[quote]${extraTextInfo}[/quote]
` : "";
        const extraScreenshotDom = $(".screenshot").find("img");
        const imgs = [];
        if (extraScreenshotDom) {
          extraScreenshotDom.each((index, item) => {
            imgs.push(`[img]${$(item).attr("src").trim()}[/img]`);
          });
        }
        const extraScreenshot = imgs.join("");
        const mediaInfo2 = $("section[data-group='mediainfo'] .codemain").text();
        const extraMediaInfo = `
[quote]${mediaInfo2}[/quote]
`;
        TORRENT_INFO.mediaInfo = mediaInfo2;
        descriptionBBCode = extraTextInfo + extraMediaInfo + extraScreenshot;
      }
      siteImdbUrl = $(".douban_info a:contains('://www.imdb.com/title/')").attr("href");
    }
    if (CURRENT_SITE_NAME === "LemonHD") {
      metaInfo += $("td.rowhead:contains('\u8BE6\u7EC6\u4FE1\u606F')").next().text().replace(/：/g, ":");
      if (metaInfo.match(/分辨率:/) === null) {
        metaInfo = metaInfo.replace("\u5206\u8FA8\u7387", "\u5206\u8FA8\u7387:");
      }
    }
    const year = title.match(/(19|20)\d{2}/g);
    const {category, videoType, videoCodec, audioCodec, resolution, processing, size} = getMetaInfo(metaInfo);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const doubanUrl = (_m = descriptionBBCode.match(/https:\/\/(movie\.)?douban.com\/subject\/\d+/)) == null ? void 0 : _m[0];
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
    }
    const imdbUrl = (_n = descriptionBBCode.match(/http(s)?:\/\/www.imdb.com\/title\/tt\d+/)) == null ? void 0 : _n[0];
    if (imdbUrl) {
      TORRENT_INFO.imdbUrl = imdbUrl;
    } else if (siteImdbUrl) {
      TORRENT_INFO.imdbUrl = siteImdbUrl.match(/www.imdb.com\/title/) ? siteImdbUrl : "";
    }
    TORRENT_INFO.year = year ? year.pop() : "";
    TORRENT_INFO.title = title;
    TORRENT_INFO.subtitle = subtitle;
    TORRENT_INFO.description = descriptionBBCode;
    const originalName = (_p = (_o = descriptionBBCode.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _o[2]) != null ? _p : "";
    const translateName = (_r = (_q = descriptionBBCode.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _q[2]) != null ? _r : "";
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      TORRENT_INFO.movieName = originalName;
    } else {
      TORRENT_INFO.movieName = (_u = (_t = (_s = translateName.match(/(\w|\s){2,}/)) == null ? void 0 : _s[0]) == null ? void 0 : _t.trim()) != null ? _u : "";
    }
    const fullInformation = $("#top").text() + subtitle + descriptionBBCode;
    const isForbidden = fullInformation.match(/独占|禁转|严禁转载|谢绝转载|exclusive/);
    TORRENT_INFO.isForbidden = !!isForbidden;
    if (!processing || processing.match(/raw|encode/)) {
      const areaMatch = (_v = descriptionBBCode.match(/(产\s+地|国\s+家)】?\s*(.+)/)) == null ? void 0 : _v[2];
      if (areaMatch) {
        TORRENT_INFO.area = getAreaCode(areaMatch);
      }
    } else {
      TORRENT_INFO.area = getAreaCode(processing);
    }
    const specificCategory = getPreciseCategory(TORRENT_INFO, getCategory2(category || descriptionBBCode));
    TORRENT_INFO.category = specificCategory;
    TORRENT_INFO.videoType = getVideoType5(videoType || TORRENT_INFO.title);
    TORRENT_INFO.source = getSourceFromTitle(TORRENT_INFO.title);
    TORRENT_INFO.size = size ? getSize(size) : "";
    TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
    if (CURRENT_SITE_NAME.match(/beitai/i)) {
      if (descriptionBBCode.match(/VIDEO\s*(\.)?CODEC/i)) {
        const matchCodec = (_w = descriptionBBCode.match(/VIDEO\s*(\.)?CODEC\.*:?\s*([^\s_,]+)?/i)) == null ? void 0 : _w[2];
        if (matchCodec) {
          TORRENT_INFO.videoCodec = matchCodec.replace(/\.|-/g, "").toLowerCase();
        }
      }
    } else {
      TORRENT_INFO.videoCodec = getVideoCodecFromTitle(videoCodec || TORRENT_INFO.title, TORRENT_INFO.videoType);
    }
    TORRENT_INFO.resolution = getResolution2(resolution || TORRENT_INFO.title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec || TORRENT_INFO.title);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo2(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : TORRENT_INFO.mediaInfo || mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const {videoCodec: videoCodec2, audioCodec: audioCodec2, resolution: resolution2, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
      if (videoCodec2 !== "" && audioCodec2 !== "" && resolution2 !== "") {
        TORRENT_INFO.videoCodec = videoCodec2;
        TORRENT_INFO.audioCodec = audioCodec2;
        TORRENT_INFO.resolution = resolution2;
        TORRENT_INFO.tags = __assign(__assign({}, TORRENT_INFO.tags), mediaTags);
      }
    }
    if (CURRENT_SITE_INFO === "TCCF") {
      TORRENT_INFO.format = getFormat(videoType);
    } else {
      TORRENT_INFO.format = getFormat($("#top").text() + subtitle);
    }
  };
  var getMetaInfo = (metaInfo) => {
    let resolutionKey = "\u5206\u8FA8\u7387|\u89E3\u6790\u5EA6|\u683C\u5F0F";
    let videoTypeKey = "\u5A92\u4ECB|\u6765\u6E90|\u8D28\u91CF";
    if (CURRENT_SITE_NAME === "SSD") {
      resolutionKey = "\u5206\u8FA8\u7387|\u89E3\u6790\u5EA6";
      videoTypeKey = "\u683C\u5F0F";
    }
    if (CURRENT_SITE_NAME.match(/TLF|HDAI|HDHome/i)) {
      videoTypeKey = "\u5A92\u4ECB";
    }
    const category = getMetaValue("\u7C7B\u578B|\u5206\u7C7B|\u985E\u5225", metaInfo);
    const videoType = getMetaValue(videoTypeKey, metaInfo);
    const videoCodec = getMetaValue("\u7F16\u7801|\u7DE8\u78BC", metaInfo);
    const audioCodec = getMetaValue("\u97F3\u9891|\u97F3\u9891\u7F16\u7801", metaInfo);
    const resolution = getMetaValue(resolutionKey, metaInfo);
    const processing = getMetaValue("\u5904\u7406|\u8655\u7406|\u5730\u533A", metaInfo);
    const size = getMetaValue("\u5927\u5C0F", metaInfo);
    console.log({
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    });
    return {
      category,
      videoType,
      videoCodec,
      audioCodec,
      resolution,
      processing,
      size
    };
  };
  var getBDInfoOrMediaInfo2 = (bbcode) => {
    var _a;
    const quoteList = (_a = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g)) != null ? _a : [];
    let bdinfo = "";
    let mediaInfo = "";
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = formatQuoteContent2(quoteList[i]);
      if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
        bdinfo += quoteContent;
      }
      if (quoteContent.match(/Unique\s*ID/i)) {
        mediaInfo += quoteContent;
      }
    }
    if (!bdinfo) {
      bdinfo = getBDInfoFromBBCode(bbcode);
    }
    return {
      bdinfo,
      mediaInfo
    };
  };
  var formatQuoteContent2 = (content) => {
    return content.replace(/\[\/?(quote)\]{1}?/g, "").replace(/\u200D/g, "");
  };
  var getMetaValue = (key, metaInfo) => {
    var _a;
    let regStr = `(${key}):\\s?([^\u4E00-\u9FA5]+)?`;
    if (key.match(/大小/)) {
      regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)(i)?B)`;
    }
    if (CURRENT_SITE_NAME.match(/KEEPFRDS|TJUPT|PTSBAO|PTHome|HDTime|BTSCHOOL|TLF|HDAI/) && key.match(/类型/)) {
      regStr = `(${key}):\\s?([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "PTer" && key.match(/类型|地区/)) {
      regStr = `(${key}):\\s?([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "HDSky" && key.match(/类型/)) {
      regStr = `(${key}):\\s?.+?/([^\\s]+)?`;
    }
    if (CURRENT_SITE_NAME === "TCCF" && key.match(/类型/)) {
      regStr = `(${key}):(.+?)\\s{2,}`;
    }
    const reg = new RegExp(regStr);
    const matchValue = (_a = metaInfo.match(reg, "i")) == null ? void 0 : _a[2];
    if (matchValue) {
      return matchValue.replace(/\s/g, "").trim().toLowerCase();
    }
  };
  var getVideoType5 = (videoType) => {
    if (!videoType) {
      return "";
    }
    videoType = videoType.replace(/[.-]/g, "").toLowerCase();
    if (videoType.match(/encode|x264|x265|bdrip|hdrip/ig)) {
      return "encode";
    } else if (videoType.match(/remux/ig)) {
      return "remux";
    } else if (videoType.match(/uhd|ultra/ig)) {
      return "uhdbluray";
    } else if (videoType.match(/blu/ig)) {
      return "bluray";
    } else if (videoType.match(/webdl/ig)) {
      return "web";
    } else if (videoType.match(/hdtv/ig)) {
      return "hdtv";
    } else if (videoType.match(/dvdr/ig)) {
      return "dvdrip";
    } else if (videoType.match(/dvd/ig)) {
      return "dvd";
    }
    return "";
  };
  var getCategory2 = (category) => {
    if (!category) {
      return "";
    }
    category = category.replace(/[.-]/g, "").toLowerCase();
    if (category.match(/movie|bd|ultra|电影/ig)) {
      return "movie";
    } else if (category.match(/综艺/ig)) {
      return "variety";
    } else if (category.match(/tv|drama|剧集|电视/ig)) {
      return "tv";
    } else if (category.match(/TVSeries/ig)) {
      return "tvPack";
    } else if (category.match(/document|纪录|紀錄|Doc/ig)) {
      return "documentary";
    } else if (category.match(/sport|体育/ig)) {
      return "sport";
    } else if (category.match(/mv|演唱|concert/ig)) {
      return "concert";
    } else if (category.match(/anim|动(画|漫)/ig)) {
      return "cartoon";
    } else if (category.match(/App|软件|Software|軟體/ig)) {
      return "app";
    } else if (category.match(/电子书|小说|Ebook/ig)) {
      return "ebook";
    } else if (category.match(/杂志|magazine/ig)) {
      return "magazine";
    } else if (category.match(/漫画|comics/ig)) {
      return "comics";
    } else if (category.match(/公开课/ig)) {
      return "onlineCourse";
    } else if (category.match(/资料/ig)) {
      return "ebook";
    }
    return "";
  };
  var getResolution2 = (resolution) => {
    resolution = resolution === void 0 ? "" : resolution.toLowerCase();
    if (resolution.match(/4k|2160|UHD/ig)) {
      return "2160p";
    } else if (resolution.match(/1080(p)?/ig)) {
      return "1080p";
    } else if (resolution.match(/1080i/ig)) {
      return "1080i";
    } else if (resolution.match(/720(p)?/ig)) {
      return "720p";
    } else if (resolution.match(/sd/ig)) {
      return "480p";
    }
    return resolution;
  };
  var getFormat = (data) => {
    if (data.match(/pdf/i)) {
      return "pdf";
    } else if (data.match(/EPUB/i)) {
      return "epub";
    } else if (data.match(/MOBI/i)) {
      return "mobi";
    } else if (data.match(/mp3/i)) {
      return "mp3";
    } else if (data.match(/mp4/i)) {
      return "mp4";
    } else if (data.match(/txt/i)) {
      return "txt";
    } else if (data.match(/azw3/i)) {
      return "azw3";
    } else if (data.match(/镜像/i)) {
      return "iso";
    }
    return "other";
  };

  // src/source/index.js
  var getTorrentInfo = ptp_default;
  if (!CURRENT_SITE_INFO) {
    getTorrentInfo = void 0;
  } else if (CURRENT_SITE_INFO.siteType === "NexusPHP") {
    getTorrentInfo = nexusphp_default;
  } else if (CURRENT_SITE_NAME === "BeyondHD") {
    getTorrentInfo = bhd_default;
  } else if (CURRENT_SITE_NAME === "HDBits") {
    getTorrentInfo = hdb_default;
  } else if (CURRENT_SITE_NAME === "TTG") {
    getTorrentInfo = ttg_default;
  } else if (CURRENT_SITE_INFO.siteType === "UNIT3D") {
    getTorrentInfo = unit3d_default;
  }
  var source_default = getTorrentInfo;

  // src/style.js
  var style_default = GM_addStyle(`
td.title-td{
  vertical-align: middle !important;
}
td.title-td h4{
  text-align: right;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ptp-seed-title h4{
  margin: 0;
  margin-right: 10px;
  display: flex;
  align-item: center;
}
.seed-dom button{
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
  padding: 6px 16px;
  font-size: 13px;
  border-radius: 4px;
  margin:0;
  margin-right: 5px;
}
.seed-dom button:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
.seed-dom button.is-disabled, .seed-dom button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.site-list,.search-list{
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.ptp-search-list{
  display: flex;
  align-items: center;
  padding-top:10px;
  justify-content: center;
}
.ptp-search-list h4{
  margin: 0;
  min-width: 60px;
  margin-right: 15px;
}
.seed-dom li,.search-list li {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 5px;
  line-height: 24px;
  font-weight: 600;
}
.seed-dom li:last-child span{
  display: none;
}
.search-list li:last-child span{
  display: none;
}
.seed-dom li a{
  font-weight: 600;
}
.seed-dom .function-list{
  display: flex;
  justify-content: space-around; 
  padding: 12px 20px 0;
}
.function-list-item{
  display: flex;
  align-items: center;
  justify-content: space-between; 
}
.hdb-tr{
  display: flex;
}
.hdb-tr td:last-child{
  flex: 1;
}
.hdb-tr td:first-child>h4{
  width:100px;
}
.function-list-item h4{
  margin: 0;
  padding: 0;
  margin-right: 10px;
  font-weight: 600;
  font-size: 14px;
}
.upload-section,.douban-section{
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-section .upload-status,.douban-section .douban-status{
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
}
.upload-section #nsfw{
  margin-left: 0;
  position: static;
}
.upload-section label{
  padding-left: 0;
}
#kdescr img{
  max-width: 100%;
}
.easy-seed-setting-btn{
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-left: 3px;
}
.easy-seed-setting-btn svg{
  height: 20px;
  width: 20px;
}
.easy-seed-setting-panel{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0,0,0,0.5);
  color: #000;
}
#batch-seed-btn{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 20px;
}
.easy-seed-setting-panel *{
  padding: 0;
  margin: 0;
}
.easy-seed-setting-panel h3,.easy-seed-setting-panel h1{ 
  color: #000;
  margin-bottom: 15px;
}
.easy-seed-setting-panel .panel-content{
  margin-top: 200px;
  max-width: 800px;
  box-sizing: border-box;
  margin: 50px auto;
  border-radius: 8px;
  background: #fff;
  position: relative;
  text-align:center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  padding: 20px 30px 10px;
}
.easy-seed-setting-panel .panel-content ul{
  list-style: none;
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0 10px;
}
.easy-seed-setting-panel .panel-content li{
  width: 90px;
  text-align: left;
  margin-bottom: 10px;
}
.easy-seed-setting-panel .panel-content label{
  cursor: pointer;
  color: #000 !important;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.easy-seed-setting-panel .panel-content label input{
  margin: 0;
  margin-right: 3px;
  padding:0;
}
.transfer-img-closed label {
  justify-content: center;
}
.easy-seed-setting-panel .site-enable-setting{
  padding-top: 5px;
}
.easy-seed-setting-panel button{
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
  margin-bottom: 20px;
}
.easy-seed-setting-panel button:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
.easy-seed-setting-panel .confirm-btns {
  padding-top: 15px;
}
#save-setting-btn{
  background-color: #007bff;
  border-color: #007bff;
  color:#fff;
}
#save-setting-btn:hover{
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff
}
`);

  // src/index.js
  var createSeedDom = (torrentDom, titleDom = "", searchListDom = "") => {
    const targetSitesEnabled = GM_getValue("easy-seed.enabled-target-sites") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-target-sites"));
    const transferImgClosed = GM_getValue("easy-seed.transfer-img-closed") === void 0 ? "" : GM_getValue("easy-seed.transfer-img-closed");
    const siteKeys = Object.keys(PT_SITE).sort();
    const siteList = siteKeys.map((siteName, index) => {
      const {url, uploadPath} = PT_SITE[siteName];
      if (PT_SITE[siteName].asTarget) {
        if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
          return `<li>
        <a href="javascript:void(0);" data-link="${url}${uploadPath}#torrentInfo=null">${siteName} </a>
        <span>|</span>
        </li>`;
        }
      }
      return "";
    });
    const doubanDom = CURRENT_SITE_INFO.needDoubanInfo ? `
  <div class="function-list-item">
    <h4>\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB</h4>
    <div class="douban-section">
      <button id="douban-info">\u5F00\u59CB\u83B7\u53D6</button>
      <div class="douban-status"></div>
    </div>
  </div>` : "";
    const transferDom = transferImgClosed ? "" : `
      <div class="function-list-item">
      <h4>\u8F6C\u7F29\u7565\u56FE</h4>
      <div class="upload-section">
        <button id="img-transfer">\u5F00\u59CB\u8F6C\u6362</button>
        <div class="checkbox">
          <input type="checkbox" id="nsfw">
          <label for="nsfw">\u662F\u5426\u5305\u542BNSFW</label>
        </div>
        <div class="upload-status"></div>
      </div>
    </div>`;
    const seedDom = `
  <div class="seed-dom movie-page__torrent__panel">
    <ul class="site-list">
      <div class="ptp-seed-title">${CURRENT_SITE_NAME === "PTP" ? titleDom : ""}</div>
      ${siteList.join("")}
      <li>
        <button id="batch-seed-btn">\u4E00\u952E\u7FA4\u8F6C</button>
      </li>
    </ul>
    ${doubanDom || transferDom ? `<section class="function-list">
        ${doubanDom}
        ${transferDom}
      </section>` : ""}
    ${CURRENT_SITE_NAME === "PTP" ? `<div class="ptp-search-list">
        ${searchListDom}
        <div/> ` : ""}
  </div>
  `;
    torrentDom.prepend(seedDom);
  };
  var getSearchList = () => {
    const searchSitesEnabled = GM_getValue("easy-seed.enabled-search-site-list") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-search-site-list"));
    const searchList = Object.keys(PT_SITE).sort().map((siteName) => {
      const siteInfo = PT_SITE[siteName];
      if (siteInfo.search) {
        const searchConfig = siteInfo.search;
        const {params, imdbOptionKey, nameOptionKey, path, replaceKey} = searchConfig;
        const imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
        let searchKeyWord = "";
        const {movieAkaName, movieName} = TORRENT_INFO;
        if (imdbId && !siteName.match("nzb")) {
          if (replaceKey) {
            searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
          } else {
            searchKeyWord = imdbId;
          }
        } else {
          searchKeyWord = movieAkaName || movieName;
        }
        let searchParams = Object.keys(params).map((key) => {
          return `${key}=${params[key]}`;
        }).join("&");
        if (imdbId) {
          searchParams = searchParams.replace(/\w+={name}&{0,1}?/, "").replace(/{imdb}/, searchKeyWord).replace(/{optionKey}/, imdbOptionKey);
        } else {
          if (searchParams.match(/{name}/)) {
            searchParams = searchParams.replace(/\w+={imdb}&{0,1}?/, "").replace(/{name}/, searchKeyWord);
          } else {
            searchParams = searchParams.replace(/{imdb}/, searchKeyWord);
          }
          searchParams = searchParams.replace(/{optionKey}/, nameOptionKey);
        }
        if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
          let url = `${siteInfo.url + path}?${searchParams}`;
          if (siteName.match("nzb")) {
            url = url.replace(/{name}/, searchKeyWord);
          }
          return `<li><a href="${url}" target="_blank">${siteName}</a> <span>|</span></li>`;
        }
      }
      return "";
    });
    return searchList;
  };
  var openSettingPanel = () => {
    const targetSitesEnabled = GM_getValue("easy-seed.enabled-target-sites") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-target-sites"));
    ;
    const batchSeedSiteEnabled = GM_getValue("easy-seed.enabled-batch-seed-sites") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-batch-seed-sites"));
    const searchSitesEnabled = GM_getValue("easy-seed.enabled-search-site-list") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-search-site-list"));
    const transferImgClosed = GM_getValue("easy-seed.transfer-img-closed") === void 0 ? "" : GM_getValue("easy-seed.transfer-img-closed");
    const siteKeys = Object.keys(PT_SITE).sort();
    const targetSiteList = siteKeys.map((siteName, index) => {
      if (PT_SITE[siteName].asTarget) {
        const checked = targetSitesEnabled.includes(siteName) ? "checked" : "";
        return `<li>
      <label><input name="target-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
      }
      return "";
    });
    const batchSeedSiteList = siteKeys.map((siteName, index) => {
      if (PT_SITE[siteName].asTarget) {
        const checked = batchSeedSiteEnabled.includes(siteName) ? "checked" : "";
        return `<li>
      <label><input name="batch-seed-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
      }
      return "";
    });
    const searchSiteList = Object.keys(PT_SITE).sort().map((siteName) => {
      const checked = searchSitesEnabled.includes(siteName) ? "checked" : "";
      return `<li>
      <label><input name="search-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
    });
    const panelHtml = `
  <div id="easy-seed-setting-panel" class="easy-seed-setting-panel">
    <div class="panel-content">
      <h3>\u8F6C\u79CD\u7AD9\u70B9\u542F\u7528</h3>
      <section class="site-enable-setting">
          <ul class="target-sites-enable-list" >
            ${targetSiteList.join("")}
          </ul>
        </section>
      <h3>\u6279\u91CF\u8F6C\u79CD\u542F\u7528</h3>
      <i>\u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9</i>
      <section class="site-enable-setting">
        <ul class="batch-seed-sites-enable-list">
            ${batchSeedSiteList.join("")}
        </ul>
      </section>
      <h3>\u7AD9\u70B9\u641C\u7D22\u542F\u7528</h3>
      <section class="site-enable-setting">
        <ul class="search-sites-enable-list">
          ${searchSiteList.join("")}
        </ul>
      </section>
      <h3>\u989D\u5916\u529F\u80FD\u5173\u95ED</h3>
      <section class="site-enable-setting transfer-img-closed">
      <label><input name="transfer-img-closed" type="checkbox" ${transferImgClosed}/>\u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD</label>
      </section>
      <div class="confirm-btns">
        <button id="save-setting-btn">\u4FDD\u5B58</button>
        <button id="cancel-setting-btn">\u53D6\u6D88</button>
      </div>
    </div>
  </div>
  `;
    $("body").append(panelHtml);
    $("#easy-seed-setting-panel").on("click", "#save-setting-btn", () => {
      saveSetting();
    });
    $("#easy-seed-setting-panel").on("click", "#cancel-setting-btn", () => {
      $("#easy-seed-setting-panel").remove();
    });
  };
  var saveSetting = () => {
    const targetSitesEnabled = [];
    const searchSitesEnabled = [];
    const batchSeedSiteEnabled = [];
    const transferImgEnabled = $("input[name='transfer-img-closed']").attr("checked") || "";
    $("input[name='target-site-enabled']:checked").each(function() {
      targetSitesEnabled.push($(this).val());
    });
    $("input[name='search-site-enabled']:checked").each(function() {
      searchSitesEnabled.push($(this).val());
    });
    $("input[name='batch-seed-site-enabled']:checked").each(function() {
      batchSeedSiteEnabled.push($(this).val());
    });
    console.log(targetSitesEnabled);
    try {
      GM_setValue("easy-seed.enabled-target-sites", JSON.stringify(targetSitesEnabled));
      GM_setValue("easy-seed.enabled-search-site-list", JSON.stringify(searchSitesEnabled));
      GM_setValue("easy-seed.enabled-batch-seed-sites", JSON.stringify(batchSeedSiteEnabled));
      GM_setValue("easy-seed.transfer-img-closed", transferImgEnabled);
      $("#easy-seed-setting-panel").remove();
      window.location.reload();
    } catch (error) {
      showNotice({title: "\u9519\u8BEF", text: "\u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25"});
    }
  };
  var openBatchSeedTabs = () => {
    const batchSeedSiteEnabled = GM_getValue("easy-seed.enabled-batch-seed-sites") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-batch-seed-sites"));
    if (batchSeedSiteEnabled.length === 0) {
      showNotice({title: "\u9519\u8BEF", text: "\u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868"});
      return false;
    }
    const siteKeys = Object.keys(PT_SITE).sort();
    const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
    siteKeys.forEach((siteName, index) => {
      const {url, uploadPath} = PT_SITE[siteName];
      if (PT_SITE[siteName].asTarget) {
        if (batchSeedSiteEnabled.includes(siteName)) {
          GM_openInTab(url + uploadPath + "#torrentInfo=" + torrentInfo);
        }
      }
    });
    showNotice({title: "\u6210\u529F", text: "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C"});
  };
  var getThumbnailImgs = () => {
    const statusDom = $(".upload-section .upload-status");
    const allImgs = TORRENT_INFO.screenshots.concat(TORRENT_INFO.comparisonImgs);
    let imgList = allImgs;
    if (imgList.length < 1) {
      throw new Error("\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25");
    }
    imgList = imgList.join("\n");
    const isNSFW = $("#nsfw").is(":checked");
    statusDom.text("\u8F6C\u6362\u4E2D...");
    $("#img-transfer").attr("disabled", true).addClass("is-disabled");
    transferImgs(imgList, isNSFW).then((data) => {
      if (data.length) {
        const thumbnailImgs = data.map((imgData) => {
          return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
        });
        TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
        let {description} = TORRENT_INFO;
        allImgs.forEach((img, index) => {
          if (description.includes(img)) {
            description = description.replace(`[img]${img}[/img]`, thumbnailImgs[index]);
          }
        });
        TORRENT_INFO.description = description;
        statusDom.text("\u8F6C\u6362\u6210\u529F\uFF01");
      }
    }).catch((error) => {
      statusDom.text(error.message);
    }).finally(() => {
      $("#img-transfer").removeAttr("disabled").removeClass("is-disabled");
    });
  };
  var getDoubanLink = () => {
    $("#douban-info").attr("disabled", true).addClass("is-disabled");
    const statusDom = $(".douban-section .douban-status");
    const doubanLink = $(".page__title>a").attr("href");
    if (doubanLink && doubanLink.match("movie.douban.com")) {
      TORRENT_INFO.doubanUrl = doubanLink;
      getDoubanData();
      return false;
    }
    statusDom.text("\u83B7\u53D6\u4E2D...");
    const {imdbUrl, movieName} = TORRENT_INFO;
    getDoubanLinkByIMDB(imdbUrl, movieName).then((doubanUrl) => {
      if (!doubanUrl) {
        throw new Error("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
      }
      TORRENT_INFO.doubanUrl = doubanUrl;
      getDoubanData();
    }).catch((error) => {
      statusDom.text(error.message);
    });
  };
  var getDoubanData = () => {
    const {doubanUrl} = TORRENT_INFO;
    const statusDom = $(".douban-section .douban-status");
    try {
      if (doubanUrl) {
        getDoubanInfo(doubanUrl).then((data) => {
          updateTorrentInfo(data);
          statusDom.text("\u83B7\u53D6\u6210\u529F");
        }).catch((error) => {
          statusDom.text(error.message);
        }).finally(() => {
          $("#douban-info").removeAttr("disabled").removeClass("is-disabled");
        });
      }
    } catch (error) {
      statusDom.text(error.message);
    }
  };
  var updateTorrentInfo = (data) => {
    var _a;
    const desc = data.format;
    TORRENT_INFO.doubanInfo = data.format;
    TORRENT_INFO.subtitle = getSubTitle(data);
    const areaMatch = (_a = desc.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a[2];
    if (areaMatch) {
      TORRENT_INFO.area = getAreaCode(areaMatch);
    }
    let category = TORRENT_INFO.category;
    if (category === "movie") {
      if (desc.match(/动画/)) {
        category = "cartoon";
      } else if (desc.match(/纪录/)) {
        category = "documentary";
      }
      TORRENT_INFO.category = category;
    }
  };
  var filterBluTorrent = (imdb = "", name = "") => {
    if (imdb) {
      $("#imdb").val(imdb);
    } else if (name) {
      $("#search").val(name);
    }
    const token = $('meta[name="csrf_token"]').attr("content");
    GM_xmlhttpRequest({
      method: "GET",
      url: `${CURRENT_SITE_INFO.url}/torrents/filter?search=${name}&imdb=${imdb}&_token=${token}&sorting=size&direction=desc`,
      onload(res) {
        $("#facetedSearch").html(res.responseText);
      }
    });
  };
  var fillSearchImdb = () => {
    const imdbParam = getUrlParam("imdb");
    const nameParam = getUrlParam("name");
    const searchType = getUrlParam("search_area");
    if (imdbParam || nameParam) {
      if (CURRENT_SITE_NAME.match(/Blutopia|HDPOST|ACM/)) {
        filterBluTorrent(imdbParam, nameParam);
      } else if (CURRENT_SITE_NAME === "Bdc") {
        $("#tsstac").val(imdbParam);
        $("#search_type").val(searchType);
      } else if (CURRENT_SITE_NAME === "HDAI") {
        $('input[name="keyword"]').val(imdbParam || nameParam);
        $('select[name="keyword_area"]').val(searchType);
      }
    }
  };
  var insertTorrentPage = () => {
    let torrentInsertDom = $(CURRENT_SITE_INFO.seedDomSelector);
    const searchList = getSearchList();
    const searchListDom = `<td class="rowhead nowrap title-td">
  <h4>\u5FEB\u901F\u68C0\u7D22</h4>
  </td>
  <td class="rowfollow"> 
  <ul class="search-list">
    ${searchList.join("")}
  </ul>
  </td>`;
    const easySeedTitleDom = `
  <h4>\u4E00\u952E\u8F6C\u79CD <span id="easy-seed-setting" class="easy-seed-setting-btn">
  <svg t="1616602641809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1165" width="32" height="32"><path d="M636.2112 847.7696c5.7344-42.5472 39.8848-76.7488 82.432-82.3808 20.1216-2.6624 39.2192 0.8704 55.6544 9.0112 32.5632 16.0768 72.3456 4.864 92.3136-25.3952 8.1408-12.3392 15.5648-25.1392 22.2208-38.4 16.6912-33.1264 4.8128-72.8064-25.7536-93.8496-1.4336-0.9728-2.816-1.9968-4.1984-3.072-34.2016-26.2656-46.848-73.216-30.2592-113.0496 7.7312-18.6368 20.3264-33.28 35.4816-43.4176 30.3104-20.2752 40.704-60.4672 24.2176-92.9792a383.37536 383.37536 0 0 0-19.3024-33.7408c-20.224-31.5392-60.4672-42.1376-94.5152-26.4192-1.536 0.7168-3.1232 1.3824-4.7616 2.048-39.936 15.9744-86.6304 2.9696-112.4864-31.4368-12.0832-16.0768-18.3296-34.304-19.4048-52.4288-2.1504-36.5056-31.6928-65.6896-68.1472-67.9936a388.59776 388.59776 0 0 0-47.9744-0.0512c-36.9152 2.2528-65.1776 32.2048-68.2496 69.0688-0.1536 1.6896-0.3072 3.3792-0.5632 5.0688-5.7344 42.3936-39.7312 76.4416-82.0736 82.2272-20.0192 2.7136-39.0656-0.7168-55.4496-8.704-32.5632-15.8208-72.192-4.5056-92.0064 25.7536a386.85184 386.85184 0 0 0-22.1696 38.5024c-16.5376 32.9728-4.864 72.3968 25.3952 93.5424 1.3824 0.9728 2.7648 1.9968 4.096 3.0208 33.6896 26.112 46.1312 72.3968 30.1056 111.872-7.6288 18.7904-20.1728 33.6384-35.3792 43.9296-29.952 20.2752-39.8848 60.2112-23.6032 92.4672 5.9392 11.7248 12.3904 23.0912 19.456 34.0992 20.0704 31.3856 59.9552 42.0352 93.9008 26.624 1.536-0.7168 3.1232-1.3824 4.7104-1.9968 39.68-15.6672 85.8624-2.7648 111.6672 31.232 12.288 16.2304 18.6368 34.6112 19.712 52.9408 2.0992 36.352 31.744 65.2288 68.096 67.6864 8.6016 0.5632 17.2544 0.8704 25.9584 0.8704 7.4752 0 14.8992-0.2048 22.3232-0.6656 36.8128-2.1504 65.024-32.1024 68.096-68.864 0.0512-1.6896 0.256-3.4304 0.4608-5.12z" fill="#FFF7E6" p-id="1166"></path><path d="M515.7888 514.816m-127.7952 0a127.7952 127.7952 0 1 0 255.5904 0 127.7952 127.7952 0 1 0-255.5904 0Z" fill="#FD973F" p-id="1167"></path><path d="M515.7888 668.2112c-84.5824 0-153.3952-68.8128-153.3952-153.3952 0-84.5824 68.8128-153.3952 153.3952-153.3952s153.3952 68.8128 153.3952 153.3952c-0.0512 84.5824-68.8128 153.3952-153.3952 153.3952z m0-255.5392c-56.32 0-102.1952 45.824-102.1952 102.1952s45.824 102.1952 102.1952 102.1952 102.1952-45.824 102.1952-102.1952-45.8752-102.1952-102.1952-102.1952zM886.1696 437.1968c-6.0416 0-12.0832-2.0992-16.9472-6.4a25.6 25.6 0 0 1-2.2016-36.1472c14.8992-16.8448 18.0736-41.5744 7.936-61.5424a388.5568 388.5568 0 0 0-20.224-35.328c-12.4416-19.4048-35.5328-29.0304-58.7776-24.576a25.60512 25.60512 0 0 1-29.952-20.3264 25.60512 25.60512 0 0 1 20.3264-29.952c43.9808-8.3968 87.7056 10.0864 111.5136 47.2064 8.2432 12.8 15.9232 26.2144 22.784 39.8336 19.5584 38.5536 13.4144 86.2208-15.2576 118.6304-5.12 5.6832-12.1344 8.6016-19.2 8.6016z" fill="#44454A" p-id="1168"></path><path d="M515.7888 968.448c-10.1888 0-20.48-0.3584-30.6176-1.024-53.7088-3.6352-96.5632-46.3872-99.6352-99.4304-0.9216-16.1792-6.7584-31.6928-16.7936-44.9536-21.9136-28.8768-60.7744-39.7312-94.5152-26.4192-1.3824 0.512-2.7136 1.0752-3.9936 1.6896-50.1248 22.784-107.6224 6.2976-136.704-39.1168a459.9552 459.9552 0 0 1-22.9376-40.2432c-24.064-47.6672-9.1136-105.984 34.816-135.68 13.3632-9.0624 23.7568-21.9648 30.0032-37.3248 13.6192-33.536 3.1744-72.448-25.4976-94.72-1.1776-0.9216-2.3552-1.792-3.5328-2.6112-45.0048-31.4368-60.3648-88.8832-36.5056-136.5504 7.7824-15.5648 16.5888-30.8736 26.1632-45.4656 29.2352-44.6464 87.296-60.8256 135.0144-37.6832 14.4384 7.0144 30.72 9.5232 47.104 7.3216 35.9936-4.9152 64.5632-33.536 69.4784-69.632 0.2048-1.4336 0.3584-2.8672 0.4608-4.3008 4.6592-54.8864 46.6432-97.0752 99.9424-100.352 18.688-1.1264 37.8368-1.1264 56.6272 0.1024 53.76 3.4304 96.6656 46.336 99.7888 99.7888 0.9216 15.9744 6.656 31.3856 16.4864 44.544 14.4384 19.2 37.632 31.232 62.1568 32.2048 14.1312 0.5632 25.1392 12.4928 24.576 26.5728-0.5632 14.1312-12.6976 25.088-26.5728 24.576-40.2944-1.5872-77.1584-20.7872-101.0688-52.6848-15.9232-21.1968-25.1392-46.1824-26.6752-72.2432-1.6384-27.648-23.9616-49.8688-51.9168-51.6608-16.64-1.0752-33.6896-1.0752-50.2272-0.0512-27.6992 1.6896-49.6128 24.1664-52.0704 53.4528-0.2048 2.2528-0.4608 4.608-0.768 6.912-7.9872 58.8288-54.5792 105.472-113.3056 113.5104-26.4192 3.584-52.7872-0.5632-76.3904-11.9808-24.6272-11.9296-54.6816-3.5328-69.8368 19.6608a404.15744 404.15744 0 0 0-23.1936 40.2944c-12.3904 24.7808-3.9936 54.9376 20.0192 71.68 1.8944 1.3312 3.7888 2.7136 5.632 4.1472 46.6432 36.1984 63.744 99.7376 41.472 154.4192-10.0864 24.7808-26.9312 45.6704-48.7424 60.416-22.6304 15.3088-30.2592 45.5168-17.8176 70.2464 6.144 12.1856 13.0048 24.1664 20.3776 35.6864 15.2576 23.808 45.6704 32.256 72.3968 20.1728 2.0992-0.9216 4.2496-1.8432 6.4-2.7136 55.04-21.7088 118.3744-3.9936 154.112 43.1104 16.2304 21.4016 25.6 46.592 27.0848 72.96 1.5872 27.3408 23.9104 49.408 51.968 51.3024 16.6912 1.1264 33.6384 1.2288 50.5344 0.256 27.5456-1.5872 49.3056-24.0128 51.7632-53.248 0.2048-2.3552 0.4608-4.6592 0.768-6.9632 7.9872-59.136 54.784-105.8304 113.8176-113.664 26.5216-3.5328 53.0432 0.768 76.6464 12.4416 24.6272 12.1856 54.784 3.84 70.0416-19.4048 8.4992-12.9024 16.3328-26.4192 23.2448-40.192 12.544-24.8832 3.9936-55.1424-20.3264-71.8848-1.9456-1.3312-3.84-2.7136-5.7344-4.1984-47.5648-36.5568-64.7168-100.7104-41.728-155.9552a25.55904 25.55904 0 0 1 33.4848-13.7728 25.55904 25.55904 0 0 1 13.7728 33.4848c-13.8752 33.3824-3.1232 73.6256 25.6512 95.6928 1.1776 0.9216 2.3552 1.792 3.584 2.6112 45.6192 31.4368 61.184 89.1392 37.0176 137.1136-7.8336 15.5136-16.64 30.72-26.2144 45.312-29.4912 44.7488-87.7056 60.7232-135.4752 37.1712-14.4896-7.168-30.8736-9.7792-47.2576-7.5776-35.6352 4.7104-64.9728 34.048-69.7856 69.7344-0.2048 1.4848-0.3584 2.9696-0.4608 4.4032-4.5568 54.8352-46.5408 96.9728-99.7888 100.0448-8.7552 0.4096-17.6128 0.6656-26.3168 0.6656z" fill="#44454A" p-id="1169">
  </path>
  </svg>
  </span></h4>`;
    if (CURRENT_SITE_INFO.siteType === "NexusPHP" || CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST|ACM/)) {
      const trDom = `<tr>
    <td class="rowhead nowrap title-td">
    ${easySeedTitleDom}
    </td>
    <td class="rowfollow easy-seed-td"></td>
    </tr>
    <tr>
    ${searchListDom}
    </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(".easy-seed-td");
    }
    if (CURRENT_SITE_NAME === "HDBits") {
      const trDom = `<tr class="hdb-tr">
    <td class="rowfollow title-td hdb-td">${easySeedTitleDom}</td>
    <td class="rowfollow easy-seed-td hdb-td"></td>
    </tr>
    <tr class="hdb-tr">
    ${searchListDom}
    </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(".easy-seed-td");
    }
    if (CURRENT_SITE_NAME === "PTP") {
      const torrentId = getUrlParam("torrentid");
      torrentInsertDom = $(`#torrent_${torrentId} >td`);
    }
    createSeedDom(torrentInsertDom, easySeedTitleDom, searchListDom);
  };
  var handleClickEvent = () => {
    $(".site-list li>a").click(function() {
      const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
      let url = $(this).data("link");
      if (url.match(/lemonhd/)) {
        const catMap = {
          movie: "movie",
          tv: "tv",
          tvPack: "tv",
          variety: "tv",
          documentary: "doc",
          concert: "mv"
        };
        const path = catMap[TORRENT_INFO.category] || "movie";
        url = url.replace("upload_movie", `upload_${path}`);
      }
      if (url.match(/hdpost|blutopia|asiancinema/)) {
        const catMap = {
          movie: "1",
          tv: "2",
          tvPack: "2"
        };
        const path = catMap[TORRENT_INFO.category] || "1";
        url = url.replace("1", path);
      }
      if (url.match(/bibliotik/)) {
        const catMap = {
          ebook: "ebooks",
          magazine: "magazines",
          audioBook: "audiobooks"
        };
        url = url.replace("/upload", `/upload/${catMap[TORRENT_INFO.category] || "ebooks"}`);
      }
      if (TORRENT_INFO.isForbidden) {
        const result = window.confirm("\u672C\u79CD\u5B50\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F");
        if (!result) {
          return;
        }
      }
      if (CURRENT_SITE_NAME === "TTG" && !TORRENT_INFO.description) {
        alert("\u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210");
        return;
      }
      url = url.replace(/(#torrentInfo=)(.+)/, `$1${torrentInfo}`);
      window.open(url);
    });
  };
  var paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
  var torrentParams = paramsMatchArray && paramsMatchArray.length > 0 ? paramsMatchArray[2] : null;
  if (CURRENT_SITE_NAME) {
    fillSearchImdb();
    if (torrentParams && CURRENT_SITE_INFO.asTarget) {
      torrentParams = JSON.parse(decodeURIComponent(torrentParams));
      fillTargetForm(torrentParams);
    }
    if (CURRENT_SITE_INFO.asSource && !location.pathname.match(/upload/ig) && !(location.pathname.match(CURRENT_SITE_INFO.search.path) && (getUrlParam("imdb") || getUrlParam("name")))) {
      source_default();
      console.log(TORRENT_INFO);
      insertTorrentPage();
      handleClickEvent();
      if ($("#img-transfer")) {
        $("#img-transfer").click(() => {
          getThumbnailImgs();
        });
      }
      if ($("#douban-info")) {
        $("#douban-info").click(() => {
          getDoubanLink();
        });
      }
      if ($("#easy-seed-setting")) {
        $("#easy-seed-setting").on("click", () => {
          openSettingPanel();
        });
      }
      if ($("#batch-seed-btn")) {
        $("#batch-seed-btn").on("click", () => {
          openBatchSeedTabs();
        });
      }
    }
  }
})();
