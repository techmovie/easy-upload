// ==UserScript==
// @name         easy-seed PT一键转种
// @namespace    https://github.com/techmovie/easy-seed
// @version      1.2.1
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
// @license      MIT
// ==/UserScript==
(() => {
  var __assign = Object.assign;

  // src/config.json
  var PT_SITE = {
    "1PTBA": {
      url: "https://1ptba.com",
      host: "1ptba.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAerwqYXVnYVNybF9uaFtjXUxTXlcyYnQOb54Ae7wMcKJYaWi0rqbUz8fTz8fSzcXNycG/urKemY1bcXERb50sYnSOioHf29Lt6d/s6N/m4tnBvLFNcntrb2bFwLjt6eHu6eHt6eDr597q5t3n49qRkINrf3+1t7C5u7W6u7S+urG9urG5urTEw7vj39br59/s6eCuqZ0Qc6Uib5Ijb5EkbIxQZGN8d2qAem6JhXlDaXMibpEwaoGVmpLl4disp5sAe70OcKBscWnEv7fV0MjV0cnMx706a3sAe74IcqdjdnXTzcTq59+Mj4UBe7wBerskZoGSj4bi3dTv6+O5urIibpAAerscZod4enLW0cnu6+PPy8JFcoABebg9Y26zrKLp5dyOl5EMcqUCeLcbZodaY12uqJ/t6uHk4Nh3jY4Pb54JcqZdb27Iwrji3tVggYgKbZ4yX21obGavqaDi3dXd2dF9kJIVcZ0Wa5N/f3Xb1s7Lx70zboYvY3WDfXLFwLft6ODKycFhfYESb50AebouZ36emY6nraYWZolMbXXCvLOdoJcTZ44Cd7VIZGi6tKvr5t14jY4HcqgxbIO6tKm6tqprdG/SzcTs6N7e2dBJc38AebsUa5WOk4vn4tns6ODQy8I+dYoAeLgeZoaMi4Lf2tK+vLMncZISa5R3fnnb1czMx743c40AebkCebg2ZXWrpJno5NuSl44YY4IcZYRHXmCcmI6vsKcabpUHc6pYa2vDvbTk4NecnJNnbWd9eW+po5ra1c1nhIoGc6sRbpt3eG3Z1Mza1cze2dHh3dSAk5UUcJ0qa4ajn5Xn5Nzu6uLt6uLv6+Tp5d7Y1MyxtK1hgIgUcZ8lbYyTkYSxrqOxraOwraOtqp+XlIV9iIFReYUfaowGdKz///88yl8CAAAAAWJLR0TixgGeHAAAAAd0SU1FB+UECgcrNELreWwAAAGKSURBVBjTY2BgZGJGABZWNnYOTgYubh5eOODjFxAUEhZhEBUTl5BEBlLSMgyycvIKCvJgoKCgqKSspKyiyqCmrqGhoamlraWtoaGjq6evrGxgyGBkbGJsamZuYWFpZW1sY2unpCxvz8DJwODg6OTs4urmzuDh6eWtpOTjy+Dn5+8QEBikGBwS6hAWHhGpFBUdAxTkjI2LT1CST0xKTklNk0rPyMwCCjpk5+RKSublFxQWFZcEl5aVMzD4cTpUVFYppVfX1NbVSzU0NjUDrfHjbGltk1JSaO/o7FJWUuru8eD0Bwr29vUnKE2YOGnyFEklxanWDJx+DH4OjtOmz5CcOWv2nLnzlOYvWLgIKMjpsHjJUqX0Zcs9VqxcpSS/es1akOC69Rs2Kslv2rxl67Y8peDtOxyAgg47d+1WUtqzd9/+AweV5EsOHXbwAwoeOXoMGDLHp59Qlg8+eeo0JydQMOzM2XPnL1w4H3zx0uUrV68B7QYKMly/cfPW7ds379y9d//BQwZOf6AgACIJgNAMLRaxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQzOjUyKzAwOjAwjJgVBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0Mzo1MiswMDowMP3FrbsAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
          ac3: "18",
          dd: "18",
          "dd+": "18",
          flac: "1",
          dts: "3",
          truehd: "20",
          lpcm: "21",
          dtshdma: "19",
          atmos: "19",
          dtsx: "3",
          ape: "2",
          wav: "22",
          mp3: "4",
          m4a: "5",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "10",
          bluray: "13",
          remux: "3",
          encode: "7",
          web: "11",
          hdtv: "5",
          dvd: "2",
          dvdrip: "7",
          other: "12",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "11",
          "2160p": "10",
          "1080p": "2",
          "1080i": "2",
          "720p": "4",
          "576p": "5",
          "480p": "5"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          "1ptba": "1",
          chd: "2",
          mysilu: "3",
          wiki: "4",
          other: "5"
        }
      }
    },
    ACM: {
      url: "https://asiancinema.me",
      host: "asiancinema.me",
      siteType: "UNIT3D",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBjskFFwRbgAAA11JREFUOMvNlM1vlGUUxc+5zzPvfLT2y5a0BqglgAFCcaGIYaEhAYIaTYgxLo1x5wL+BBf+Ay6NceOChYnGjVVj4wchkAhE1AKKWqopTBinZdrpFGbe97nHBSaSqNENiWd3N79zF/f+gP97ePdwfXwbIJFkXxbsfjfVEjwJvmZ5q1luLffyPmBs6T8AFzbuAIASyAmS0wHaJWhURCHghqA5gHNmpYbkPrkw97fACACXJ3aitdhEdXJ8E8nnSDxF6SFBQ3dquQrgssC3Bc6C1vynDePM1iNYT034g/0bPOCAES9JPgUgI5AgQOQoiL2QfqUw7yE254c3czlU9ciBd/Du6eN4YfHMHWD0hOpwjqXO0DSgpwHfSiGn/JRJ35kxJto0iZql4mSlu3alUe6rLo1MjnW7nfrVmx/kM3/AAIDvbX8GvWT9g5X8FUDH5BqN8FPB/UT0dI7GsoDtJMo91+lWebAWgX3mvsGNdYgnvZ1dZTmlo1feR7ydVSBxdDVkmwENy3wpwD8xaNal+q3lFRN4KY/lEIdHNlWYDko6IFOfyKrLrBgMq0RoAEDslPtJoObw+wAESCuSfoCrDRKLGyd94PZKjhCrA0EPJ/k4oWsulZ22X+CTIH+cWm81Xtv/KuJyrAlAj1ACZAAoB+QAjagwoVMbKhm0pfCiL5IysC7P52Vhj2h7BZ7/cqT/bMmxHtusAMItRbZA3JY4koTdAr+FuNauj7B/fHXCSulFSlsMyA06E3udz0tCIw+VZ53Wy5NXE7EeO8wQPLW6sXJN4E0BEw4eKmCNLuM3Ycr7k6r7otJhQg+AnId0pp63ry38ki8e3DnYJJQ7ilsSERvVGrbYSGfZV644eNHBDQIedVpw8KccqOWwPVRpkoRTWofUTpXx8HXnUj7anTj36dnX/zzszB2XrQdaeQ4WPxQ4lqRdIB4H8BggAiShLsGvDJhh8gtZeaD0/L4nihgy3f0p4cLCF5jaeBTd+sCaD/pvhcW1PGZDuWW1gjEWFnu5xUYRsvOJ8YRkH2We/wzFHmESEi4tzPxVDoeOvAmTYqKNJXK303YDnAAEya8bcN7A760ITZnS7Mcv/7u+dhx+Cy4hkOWBEMfMbFAk5Hl7NbXrF7cdy+PF40ifvXHvhHrP8zvmB8JDHarovgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjo1OTozNiswMDowMLWCrh8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6NTk6MzYrMDA6MDDE3xajAAAAAElFTkSuQmCC" /></svg>',
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
    BTSCHOOL: {
      url: "https://pt.btschool.club",
      host: "btschool.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBwQr3f9M9AAAAz1JREFUOMt91M+LHXYVBfDPefPmR2ZeY0tnWoyxVgihrT8KQoo/SmwUN23RKtGdiAsFS7vRko1/QYdUEMGFS90KcSWoBIRY6mS0oRoTqVLjj9bEpI2pjUle5r3j4k1k6sID39W953A599xvbGPpu2dN3yoDu9UeHMRS2RNeR8ogXMCb5BTOM/13suLGM/eCwOLRM7CEfZkJ3UlW6JsYmwkOMIfbKltYoOdbL0jOYWv8zP2yePSM1m2D5PFwD21C5VTa1/Bak6tUarnskaxq908pRq1T1V9qxsNp7Q6fo7vDivhV6oXE65Lp1W/cbwfGK8+d/WcYTJPTaQ+WEfa3dk3rRObXzzySeGgQBpwIm5Kt/xF6G0bPvexmtyRZaPuB1qFpO5nW8cyv/+6BJJPZ82fcvP5/xHZi/uhZWNC+a1LT1iRrz25gEoaPiYMt+GuS5/FiMcQWS+EOLGN3dS+up/6B82K5bA2bqOGd4cnwoRk3I2zgS/TKFo+RR9vux91JRuosTpf3hC3MqeVhZsl5n3ZSvphYxVe2Y/RuPI0n1Mt4EYfxE3wTnxVPkO9rfxSWB22XtYdxCfdVPlNdxc+rH8R8+Gr4PI4luYLvjTN+VWzip9WH8WFsDvGx8ClxDL+pnsA9eAqb1R+QcWKOHK6exrlFiyIbE9OXwpfF18u5QeIRyVLlZOVPZEAen20qGwOD8bYtH8X78UM8VB1NTQ1YDHuxivcO1RtNx/gWuYB5eqF8e2p6cc4cM8LX8DNyLHxh5mEv4z58Eqfwi6w9u3F7kz1YjRTj6ivVNyKTyDw+YhaZ43gLi/g4Hsbd+C1+jFeyur65Fi1RvRyZXDxyAKytb97KcMzu1q3ajvoC1jrr2RpG98286a7MJjiztn6yjFw88sAtbndeyNr6S+qGMqQPhkfxLxwfkNPkUrlUPlE9hHdwNTsmfNtUNR6EVXoYny6Xw+/DH7ZJXS6H1F24FuaanNNeCH8vYyGyq+yl78SB7f9xiBOR5+mN7PBiSXvvLBJGYk41XC/XxBLZhZF2GQuSv23b9EfcvHjkwCxgsPadk1zFwO2tu8SDYV7ta1zByvY5vqq5Rn+d5C/b3v13Wf8BYeJvdWEcGZ8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDQ6NDMrMDA6MDC0QHbWAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA0OjQzKzAwOjAwxR3OagAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    Bdc: {
      url: "https://broadcity.in",
      host: "broadcity.in",
      siteType: "Bdc",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxMX1XFD5QAABLtJREFUOMs11FtvXFcBhuF3rX2aPcdte8b2xIc4cRIl8di1pbg0QQJEUVGlChASSL2g6v/ggt4gfglcAAKJG0gFEpSUEtJUNK1NfIo99ng84/GcPMc9s9davTD9fsCr7+oR7k9/YQAwBiMkGoHuXmIuSojWOQx7YBQIgbEshJ+EzDRM5LFTAQKN0ZqvZ1+1DEgbVITXrzMRtkhOOjizy+D54LoYYaGiEdcDn5Qj2Dqusn/RIUrnsD0PdARGYGNAWDY6HBAbNFiOjXl9/T652Wu4qQAZ85GWhdKaTDzG7WySjBjz+ctd/viPZzyr1GhHE1h+GozCNlIgtMa0qohOFWd+FiuTh0weP53AHg/oVEoYY1h5tMlrd5cJEh73C/fIBin0n/7F80oXpQWOLbDste99YLp1TLXIeDCgYWfZO21wcHpO+7LF4fYWf/j17/j7k6fEgzRezCPSiiCX5eatBRgNcDrbJNQ+vguWtfLtDyjvobod0lMzPLh/g598a433337Iu29+g0ert0lNZDhpXhKk4hzu71MqlVkvLJIaPWE59hGbkx+T0Gc8O81h02tiOheAZIykcrDNl4My333tJv1Oi3a7ybs/fItuOKTVHXB4VMIdbBM/fcGo/pQpv0Jf9qh15ijWAmw6FzAagBswjKBZq5FYyjKZTuFnAobDkN5lm+LxMXgT3F0Y8Mb0Z+jKkJ1ynvYgTbmRZb95EyN9bNNrg9YYYWHbDou5PD94520cx0aNQoJUkpNSid2jCtPXIn60csYb0zWev1rgRfcdnnzyBWrYRiWTBF4fW0QjMBrCPmlLsX7vFg83N/jk6afsF0/YWC2wVihQuL9Gr/tvArlFZ+jzm/9skJxJcnzSJDbeI51vortz2FJKLBXCRZXRoE513qN6dkaz1WJ6eob5uTylwwNebr9k/UaRqcSYSkNw8GqH709X+NV7RxSLdX7/DM5rOWxleWQnJymsr/Bg83U2H2ywsHidVDpNsVTmww//yuPHf+Nw65BFf8hYWXxzNeSXiWMSjuKLQ8WfP43x/CiJyXiI7Js/M4WM4dHKMrfu3MESgnqjQeO8ylHxmK2dPXYPioRDwWzW8J2NPg/uDBFa0u4n+OiF4LNdaDrXcG6vYbupACV7VM9r9LodKuc1vny5y3m5jNGaiWyW1cJd6o1Lms0Bj5/H+ed2hOe5xJNztJtdhN3Az8QZJ6cQzo9/btSrz1mSbVaXZpnM5Wh3+7i2RSadYnZmhqmJNHvFUy5aXcIwAgOuazM3naF5fsZ/X5XZCZOEcyvYuD4iv8y1nOBhYZ7r1xcJIwXGYEmJ7/skEnHmF5cY9PsoFSEAbcAShqOjODvDOMOGREoLWxiFTE2wc9mi+ZePSXR/i+M4eH4chEQI8GIxhJCMwyFKRWilGA2HhGFINzVPLb2ESAQIrbCN1iAt6iZGredCqYNoV7DV6ApWQFoWUlro/8eMECjbx2Ty4PhYmTiWlKAVthACoxVOPIm4sYKZmkGf/g9TL2H6bUw0ItIKDAjbRfguIp7BnppHzt1DpLNX0qsxQogrsQWgozFCWohgBpkIMI0S5uIEc3mBGfUBEG4ckc4isguIyXlwvKvHOkIIAQa+AvwANNpBILcLAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjE5OjIzKzAwOjAwAUZk1AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzoxOToyMyswMDowMHAb3GgAAAAASUVORK5CYII=" /></svg>',
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
    BeiTai: {
      url: "https://www.beitai.pt",
      host: "beitai.pt",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: false,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    BeyondHD: {
      url: "https://beyond-hd.me",
      host: "beyond-hd.me",
      siteType: "F3NIX",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACMVBMVEUAAAAJIO///wAAAP8IGvAWQ9wWQdsYSNgYSNkWQNgUPd4vgrlGuZU6n6w1kbMVPdwVPdsZRNEYRNUWQtkVQNkGGPGu/zQIHugZStkeV9EhXc4iYcwiYsshYMwgXM4eVdEYRtgSOeEeVtIiYcwkZskkZskiYMwdU9MRNuEVP9wgWs8jZcojZcofWdAUPt4RMt4fWs4kZskkZskQMeMeVc8kZckjZModU9IiYMsiYMwXRdkeVc8fZMcdVNAhW8qxwvNljuBTg9o/dtUgW80iX8n+/v/6+v709f7K1fgiYMsiYMoiYssiYMsiYssiX8siYMsgXMwgW8weVM8kZckdUs8XQtciYMwXQtgdU9MjZModVNEQMeIfWM0fWM0QMOEVOtQfWc0fWM4UOtkSNt4cUtEhXswkZckiYcsdVNARNt4WQNgdUs4gWswhXssiYcoiYcsiYMogXMweVs8YSNUkZ8klaMgkZ8glaMklZ8kkaMglZ8gjZ8hbidxJfNgtbM3B0PSete8kZssiZsgfZMdnkt729/7j5/xGeNkpacw6c9JMf9dnkd7N2vX//////v8ras0jZshKetrL1fjx8/36+v7+/v9GetYnaMp0muLr7/z+/v7k6vpnk9wjZslrk+Du8f3p7vxfi9w0cNDY4PnZ4vk1cdBNgdbu8vzv8f3s7/xJftYhZchgjdzr7f2vwPJVgtxTgtulufDo6/1mkN5GeNhcht4oZ8wmZstUgttHetgkZsmOuILKAAAAdHRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcbLvo9O3DcR4IXcz6+9JmCQ6N9viWEQeN/P0KXfX4aM3TIm7+dbr+/v7+wOf+/v7+6/T28/fr7L++cvtzIdEhafdjCZGMCA+RjA4IYNL6zF0IH2697Pb057prG30aCesAAAABYktHRI0bDOLVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QQKBwYCrXu2GgAAAXtJREFUGNNjYGBgYGSSkJSSlpGRlZNXYGZhAANWRSVllZJSIChTVVPXYAOJsWtqaZeWlpeXlZWXl5bq6OpxMDBw6hsYllaUl1eWlABlKkqNdI25GLhNTEFiVdU1tdUVIFEzcx4GBQuQWElZXX1DY2U5SNTSisFapbS8rLqpuaW1rd2mqbqsvFTVlsGurLyso7Oru6e3z97B0akfyHVmcCktnzBx0uQpU3t7Xd3cPaZNKC/1ZPAC6p4+Y2bvrN6pU3tnz6kA6vdm8AE5ce68+b1AsGBhE8ixvgx+QMHy6kWLQYJLllZXAQX9GQLKqqrKm5Yt752/onflqiagirJAhqDg0qry1WvWrlu/YeOmzavLq0qDQxhC1UqrSids2bqtqWn7jp0TgI4PC2fgjdABKt0FsqGsCSQWGcXHwB8dAwwQUDABAZARHBsnwMAgGJ8QCRUDBp12YpIQKECFk1NS08pAgVyikp6RKQIJelHmrOyc3Lz8gsKiYjFxoAAAdfCapAG3hnMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDY6MDIrMDA6MDCSiKOlAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA2OjAyKzAwOjAw49UbGQAAAABJRU5ErkJggg==" /></svg>',
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
    Bib: {
      url: " https://bibliotik.me",
      host: "bibliotik.me",
      siteType: "Bib",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBwgUxywuxQAAA51JREFUOMvNlM1rXGUUxn/nvfe99733zkxnmk6bxDRaUGwWUsEiSPcF0X+g24JLN4LbLtwJurXQ7rqxuhTcuKiWWlxJaamC1CRtmpjJfGSSSe6dO/fjfV20paDQgiuf1QPnPL8DB86B/7vkZQ3Xrl0DaAEXRVzH97WNopgkSZib61qt9dfW2j/PnHnr5cDLl7/CWtvRWn+odfCl7/tdrQOiKCRJGiRJo/aU+qyy9vb+5DAYDXr/Bl65cvWZ7YIoa8vzwFXt69CYBqEJiSKNMYaytK6ZRLZG3P7kgMPJHv6z9A8/3sTzPGpbqwf37/u+1l+AOy/iKc9TQbPVxDnBGB9jQmazgtpGUtZ44/GAg4OUY91jz4FKKZTnnZ3l+aWqKn1r7Tta6+NBEJA0EowxhKHBGIPnefh+gOeHjHeHOGfpdueIIvMEeP36N4x62+equv54Vsw+qOpaBcpDeepp2MdEBiWKoigJQyGOI8bjMc5ZWq0WsUmwucX79d5v79+/e+e1qio/cs5eyNJDMSYiSRJ83wdxKOVjTBNbW0QcSinyPKfX69Fut4miiKqo0U7j7+2NvyuKgtFwoOYXFul05gjCgMgYiqIgz6dY65jslxw9GtFoBBwcHPJ4YwNfa5TnkaUZZVXS7R7H//mnG/6gv0OWZQxHu8RxTKvVYmVlhcXFBeq6ZjQa4zjAmAbD4ZCtrS3iOGZhYZE8z8nzKUkco0SQG7d+caPhgI2H6zxaX2c42CH0PY7PL7DwyiLLy6+yvHyKophSVRVpmlKWJe0jRzgxP0+apsxmM+qqYprnyKPersvSlOGgT2/7L3Z2tulvbbLd20bhOP3mKc6++za1i3j4cIP0MCXQAVprmq0mYRjSbrdptloIIKuPd74XkVopddrBG/ks59HaGg/++J29QR8lOUFkUapDv79LlmUA2Nqitc/c3BxLJ0+ytLREp9NB1jb7HlADnzjnPn3qTygRfzLZ597dO9y+dZOqLGi32wBMsynW1pRFQRzHJHGMDgI8z3tyemubfZxzLRFpACeBb4Fla21VFIVMp5ma7E+kKGZM9saMd4eMxyPWV1exRY7WIToMnwOfaW2zD2Ccc+8BsYjKlafO4dylsqy8uq4oi4KimFGWBVmakmUp6WFKmh4wy7MXf5vVxzsAr4vIBRFRAKIUSsSKSEeEi0VZHZlmGdNpSjHLX/4PXzDoGPC5iMyLSAUgIv8N+HQ1AN4/a38DST6z5HJSpzwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6MDg6MjArMDA6MDBZ+4VCAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjA4OjIwKzAwOjAwKKY9/gAAAABJRU5ErkJggg==" /></svg>',
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
    },
    Blutopia: {
      url: "https://blutopia.xyz",
      host: "blutopia.xyz",
      siteType: "UNIT3D",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC91BMVEUAAAAAgfQAcdoAacMAbNcAduMAascAZ8UAZbsAct0AaMMAc98AacUAdOAAdeEAacYAdeAAe+4AcdsAaMEAbtMAd+cAiP8AjP8AbMsAduQAaskAd+QAdeEAdOAActoAascAaMUAacYAasoAd+UAdeEAdOAAdN8Ac90Ac90AaMMAaMMAaMQAacUAascAa8kAduMAdeIAdOAAdN8Ac94Ac90AZ8IAZ8MAaMQAacYAascAbckAdeEAc94Ac90AaMMAaMQAacYAdOAAc90AaMMAacUAdOAAc90AaMMAacYAdeEAc94AaMQAacYAdeIAc94AaMQAaccAdeMAc94AaMQAa8kAc94AaMQAc98AacUAdN8Bc90AaMMAacUAdN8Ac90AaMMAacUAdOAAc90AaMMAacUAdOEAc94AaMMAacYAdeEAdN8AaMMAacUAasgAdeIAdN8Ac94AacUAascAdeEAdN8AaMQAacUAascAeOgAdeEAdN8Ac94AaMMAacUAacYAbMwAd+UAdeEActoAasgAa8oAcNkAZ8UAc90ActwAcdwqiOAsgs8AZsIAZ8IhhOHI4PfM4PIlfcsbd8gmfcsfeckVdMcHa8QAc9wDdN2Uw/Dw9vzv9fuWwOYUcscWdMcwg8230+1cndgAZcIBc90Xft89k+Tj7/uHuuuAs+Pj7vgnfcsEacNenthKktQEdN0nh+Egg+BTn+f6/P7c6/na6ff7/P5Sl9YTccYCc90sieIdgeAAcNxiqOn///9qpdsAZcElfMsQcMYihOElhuFkqepsptsYdMccdsgAaMMEdd05kOQGdt1gpun+/v5ppdsScMYadcgBaMMJeN48kuQdguC72fXD2vAsgMw0juMRfN+nzvOuzusRccYFdd0fg+DY6fn9/v76/P3e6/cgesqs0fOkzPJ2sep3rd+gxei00u1xsOvT5vlPneebxu+cw+hRltXP4vN5r98Ufd8oiOITfN+RwO4YdcgmfssAct0Md9sNcMgAcdkAaMWf5sHbAAAAhXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOIja2IU2CQQmZ7Lo/f3nsWYlBAIdWqbi/PzhpFgcAkHT+vrRPUby8EEv5uMrHdfTGQ/EwAwFrqkDlpF9d2P+/l5L+fdGNvDtMSTj4CAPr/urDRRs1WoTIIPhgB4BLpfs6pUsAQZJxMEFGRHyhgAAAAFiS0dEvT3V0nkAAAAHdElNRQflBAoHCQGz6vtvAAABlklEQVQY02NgAAJGJmkZWTl5BUUlZhYGCGBVVlFVU9dobdPU0tbR1WMDCukbGBoZm7R3dHZ19/T2mJqZW1haMVjb2LZ3dLR39vVPmDhp8pSp0+zsHRgcnTqmA0VnzJw1e87cefMXLFzk7MLg6tbR3rF4ydJly1esXLVo9Zq1Pe4eDJ5eHR3r1m/YuGnzlq3bFvVuX9Xr7cPg69exY+eu3Xv2AsG+/b0HDvb6BzAEBnUcOtyx+whI8Oj+Y8d7TwSHMLCHnjx1umP3mbNAwXPnL1zsPRHGwcAZfuny4s4rV0Eqr13v6e09EcHFwB0ZdaPv5q29YHD7Tm9vdAwPA29s3N17O+/vfbDp4YO9jx739MYnAAUTkzo6Tj7Z+/TZ8xd7X07r7U1O4WHgS00DevLV6zdv373/8LHnRG96Bj+DQGaWSUfHp89fvs759n1eb292Ti4bg6BQXn6BRkdn55lzPT29mt6FRcIiwMATFSsuMW7/8fNX74nSsnJxCWgwS1ZUVlX//lNTW1cvxYAArA2NTc0JLWwQHgAYPrx3ZPFt4QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzowOTowMSswMDowMFJr4rUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6MDk6MDErMDA6MDAjNloJAAAAAElFTkSuQmCC" /></svg>',
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
    CHDBits: {
      url: "https://chdbits.co",
      host: "chdbits.co",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA81BMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD0AAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAARAAAjAADaAAD/ICBmiIgEBAQDAwMBAQEAAAAAAAAAAAD/AAD/3d39/v7GxsYAAAAAAAD/AAD/5OT/////AAAAAAADAwMCAgIBAQG5ubmAgIBaWlq6urq1tbWysrI0NDT///9/f3/7+/tJSUnLy8tRUVFOTk6mpqb19fXe3t7d3d3c3Nzu7u69vb0hISEdHR0XFxeOjo5X4OIMAAAAM3RSTlMAgbIHAnne59jwjna/7aAVK0RCQQ1VtrUFA7L7/PhdGBgDAwW2/unnnQaxGKDt6LawIeA+sl6aAAAAAWJLR0QyQNJMyAAAAAd0SU1FB+UECQo4D4hi7WcAAACoSURBVBjTY2BgYDRGBUzMDCysbGiC7EwMjBzGxpxc3HDAymNszACU4uXjFxAUggBhEVExcZCgmISklIk0GMjIyskrKIIExZWUVUzNTExMzE1NVdXUNTRBglraOroWlkBRK2sbWzsTPX2QoIGhkb29jamJiYO9vaMTUAdc0NnF1ckNXdDdw9PLG13Qx9fPPwBdEKuZ6IJYnYTV8Vi9iRkgWIMOayBjiw4AMGtCDVTI3J4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMDlUMTA6NTY6MTUrMDA6MDBQcxNEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTA5VDEwOjU2OjE1KzAwOjAwIS6r+AAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(6)",
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
    DiscFan: {
      url: "https://discfan.net",
      host: "discfan.net",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzkJYndFrgAAAwxJREFUOMt9lFlvJEUQhLOOrj6qp+duH2Ps1bJIIOD//xOeOBZ7oe2Zcc/0XXfyYEu7sBbxlqH8lEopFAQR4S29+oS8jOStHf4m9iI9TagUBRdEEsVpJAQh5P9grbVVOhKJSAVaF+/3pnt4qNpjXFx8+HD7zV2c8DdgRDyfz1VVCRFflJdcCESCwQXVHY/HX5qn3451fap/+vEHKfMXhL6SgF1zru7v6/rcNk3XNICBc8oCjqN56vXAARnW9enjH/dKqX/BMCk4PEmjYuoHNT63J6UnoBQI1q07ekhkNi+KvJCB4vF49N6/wgig2zZV6oLhNecJpX3b1afngL4x6rEbJpGuN5vNuiyKpRBCKTVN4+vPzphmaCgEGUUbgjGxfxn76f7TaVYb5ZrZspyx3VU5X8wjRiLnInTdYS9lzgHAWFM7HdAzChknGeO5MRMAR5JsN5YxpaZ5JBbOiVGlWnMaOq2m8ZIDgJ4mZY1BxwPrECgBT0mayovr3Xq9rqrq14+/R+OptI6gJeAogcFmahg4ACjvD88nPekQggveaTeT8lKkIo6BkCRNMAQ1tBO2hAfCkdNoghA5ywGAEXJ8PNXns7EOrY8ciquNny+qx2oYuqf9HoBM0eyhI2IcGdo4QpWwPMs4AMhMUkJNP4rA1nF0M8vuVmuTZVqNfz7XRo95Khe7azVM/fkc+j511rM8zyQHgCxNv73eRXUzj/ilzHflKru5g91l0zf4d3VrdZQIxUW2TgYp9dAPbb8py0gIDgCUsfffvRfHukC/nC/ysvTbjUjTDEOR95lWmdJ+aE1eZEmSCeEDrMvt52wvtxv/8/difyhmhduuaJ4QQO99ANBA02DkMBrKIC/6pt8sV7Ni9hmmhC5vbgYhFOFQFCllIQR0DgmxlARLYgzS2upwSOWsvLogQL7INkAkxOzqSiexHUeLGBCRECRA4sSzqLX6NE6L5er23S3jryfJf5okhGCMGbpOGWOMmaYxTJOgpNhs56t1kmVf9gH5uoZeHKP1qJRzTjCWScmF+LqJ/gFiT9/X+5vOiQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo1NzowOSswMDowMA4aMCMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NTc6MDkrMDA6MDB/R4ifAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    FL: {
      url: "https://filelist.io",
      host: "filelist.io",
      siteType: "FL",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABAlBMVEUsg6Qsg6MsgqMsWWssRU8sR1IsJiYsKSosLS8sLC4rLS8rLjErLjArLTAsKSkrMjYpSVcjeZsig6oihKsje54oS1okb40nWGwsKissKCkrNDknV2ofm8sifqIlaYQkbIglZ4IoUWIhj7okbIknVWgglsQoTFstIiAoT18laoUrNTogl8UmWm8qNz4qNz0qNjwmXnQglMElaYUsKCgqOkIlaIIfmsogmMcglMIjfJ8mYXgsJycpQUwfnMwpSFUqPkclZ4EsJSQsKy0rKisqNj0oTl4sJCIrMDMnUWIgkb0hi7Ula4glaoYpP0grNDojdZUpRlMsKiosLC0igqgpRlL///+rTVq6AAAAAWJLR0RVkwS4MwAAAAd0SU1FB+UEDAMIEgwtfPAAAADJSURBVBjTbZHHFoIwFAUDAoGoqGAv2BV7r1iw9+7/f4uKiKDMIos5bzM3AGD4DxgAmIUgDRAWDOAEBQ1QBA5wEtIGIKlIRkMnEbK+QDY7o0nW4XRxHO/2eH1+TQaCoXBEiMbiiSSrk6l0JkshMZGDX5n3FYqlcqVaq39lo9lqd7q9TF8vpYF7KIijsbctTyCczt6X82p4sWRX6822vtsfJEXO/MfT+YKYq8xz3O1OqUXIhhj6+SoJahH9DlRTP/J/ELPpTEc2+44Hf1AYDR9uHSMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MDg6MTgrMDA6MDCjgoMzAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjA4OjE4KzAwOjAw0t87jwAAAABJRU5ErkJggg==" /></svg>',
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
    HD4FANS: {
      url: "https://pt.hd4fans.org",
      host: "hd4fans.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    HDAI: {
      url: "http://www.hd.ai",
      host: "hd.ai",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACLlBMVEUnJyciIiInJycnJycnJycnJycnJycoKCgnJycnJycnJycnJycmJiYmJiYmJiYlJSUmJiYkJCQjIyMjIyMjIyMjIyMiIiIiIiIiIiIiIiIhISEiIiIhISEhISEhISEhHx8eQFUaercdUnQhIiIhISEhISEoKCgnJycmJiYlJSUyMjJAQEAkJCQ/Pz+Hh4fCwcHh4OBSUlKtra1ubWxlb3PP298+Pj7Nzc2Zm50cTF8Wg61zwd0WhK4cTmKZnJ2NjY38+/q0y9Mpn8whpdia0+ib0+gpn820y9UzMzO4t7eYoaWGwNar2eqt2OjA4OvD4eyr2Oir2OmGwdiYo6dDQ0OBf38hTV8WlsiHyOHR5e2Yz+OXz+TO5OwWlMYiQU6Bf34jIyNDQkJ/i5AccpYWlMiGxt/J4uqTy+GXzeLP5OsXksUiQU8zMjK0vMCTrLeHvdO12Oat1OS92+e72ua11+Wx1uWFvtWWoqe3trYiJiiKmKD08vG8z9gymMgilcuPxd2Zyt8ll8wslsexydT18/IjIyIhKC07U1/KycmdoqQbUGoUe61erNBosdMUe64ZUGuPlJc9PT0hISEiIiIjIiIiKSwcUWtTWV2sq6tkZGRQYGi0xs69zdRVZGxeXl6lpaVTU1MeWHccUGyFhYW5uLjY19bY19e6ubmEhIQjISEhNkIbdKQePlAiISBBQUEdVXQbc6UhMjwhIB8gICAhISAhKzEbbJwcZ5MhKjD///8cBd9jAAAAJnRSTlMAAA9wx+bs7Q6V+fjF5ezt7e3t7OXGcPgOlfkPcMfm7O3t7e3t7NLV0KEAAAABYktHRLk6uBZgAAAAB3RJTUUH5QQKBykeq2bSOAAAAXFJREFUGNNVi2VbAkEURkexAywMRGydWQdbbMHuxq6xu7u7exe7uzt/nrvKF8+n957nHgA0eVraOrpqdLS1eJoA6OkbuP3DQF8P8Azd/4BQPQx5wOh3IER5eFAI/R5GwJh7wlJPL29vL08p5qQx4EMIsY+vn39AgL+frw9mTz4QIIhlgUHBIaGhYeERgTIMkQCYQITlisio6JjY6Lh4hRwjaMLJhMSk5JTUtPSMzKzsxAROChBW5uTm5RcUFhXnl5SWKTGbCxApr6isqq6prauvbmgsUxJWmmLc1NzS2tbe0dnV3dPbR2Fsysn+gcGh4ZHRsfGJySk54aQZmZ6ZnZtfWFxaXlldm1unCTED5oxqY3Nre2d3b//g8OiYZhjGHFgwKtXJqfTs/OLy6lpKM4QwFkBIyM3t3f0D9fhIMWzLIgSWVmzw9Pzy+vbGpSxWlsDaRkS/f3x+fdNqRDbWQMNWbCexd3B0cnZhcZXYiW01fgC8EXLoIVrAZQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0MTozMCswMDowMNmd3ZQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDE6MzArMDA6MDCowGUoAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/Torrents.upload",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    HDArea: {
      url: "https://www.hdarea.co",
      host: "hdarea.co",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBhQINJhF4AAABH1JREFUOMuNlEtsVGUYht//P/85c86c6bQz7UynMx2mLdALt2IFLZabNaAmGgRMJDFhoe41LtgYNiYsSIxRdxIJMZHISgwmLgjQCLFSC5XWQikNLQidTi+203Yu5/p/LlTUoMi7+r7vTd58m/dheAxRaeavxbMBkoDQAMYAACyYeGCzxwok+nNUYS/qIJ8jELHBmA2AGGOPF/ggKPuDjvmxFgx93SHDTT7VJct87mwdgvEsi7TNILZlGrU7cwAWxSNfO7kbAGIA64bEDkxPbHVE5bLnhZbN/K1WuHM5WNlJZL+7I5Vjg6X1hwYEANBkH1CZUtD/uU73B3Rv1XMuhRJF+ck+n3W0t1M5fxTFhaT0dLUcCFueUP1gcSbIrLtpMLmZHHBZsf6mD3Gak2cBS/eAhfE6OIX9IHmEmHhDKmqSH6OQF+1Y7Si1taVUl5jf9i7chu0/Gw6/ZFU+7UsW4vDBpVoNJ9QqnGBGCCgB4PirQLJut5TikBtsDC2knqzRqjIT+sCnLtPERhKGpeYm1EB6x0Uv1nICeTYumXsDo0NvwkWlHVuDUuypnODiG4Gx08DhsXqc6O7E8nQLk8Izez/cFFi6H0Q5yzhDo2q5KtkeuGr+KpPrbmvJddcxmm9lcBySgG82lpxE980oygMCdy5yZPu7oATXMs+BWpgUyvCZDAVERsICt8sAN1BO7ZBOpH7RBgrapbeisOc2EuyAb8QAIzWG2o7+vOOWBaLNKn76rJPKS62kmPD1GscJt9kU5JqWH1G1wgSnQJCKrbtKMMPn64EhzPc/Czv/PHwZtOJd8EKNNyoC6COmEEdkVRNmb7f5vhJdXnOwmDt4dnhp70dfMT0+otiWTQKQWsim1JY+O9N9C0AIRmwtypMr4EnFij1TLsS2DlUAg4wx4hg+dQAl2WBHm1FueGKYatLvmQqd0+9d9pT8lOEHamCnNpeFHu4RApMYfL8N5HcSMdU1MuBGoo/F24anFvMIaxzCUyOrYSRDXqSl4GW2XqkuLF8IFr20FWk+oNge+WacCmv3ZgXDucTC1TByPS9h7vp26RqslNguSTN7TA3XiFcBAIRX0dRLqU1VqGlz1Xjb98bgkTDGT65zV72+4Bupa1LRVL9uZbZq6HCa2XMvUHFir7RKaSe0QdqpXXMUTF099Rq7/84p+XuXrdyoWg7Xb+NcqHpAu6v+eCiNkY+PU+WGCTe956qr1whl9lp7YOpCA1n5uOSmaletd0rpl2eVzJ5zzIx/QK47UmUKCIVDlGqbXQC9LiBD82MRokAXyAywheFObeHGBs3njEjT3OAKUVi5X9iJnVOoaO41BM5A6D1SwRSTKoTC/kkbf/RLcCMunMXbza419zabvrxHWRyv9dVqFFMvOqhcPQIzcd6tSPc64fRojUBWYchLQIb+C18zPgEcGjx3o37l6BbP4/tcsyHpxNq/peqmPlM3rkQZfiHA4uzfyffQ9W8w5XeX8QqAxnoTXygcswAkY49m8kM89OQfBofkvnuaCMz1IMEZfML/6jelxwpRbOI1GgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjoyMDowOCswMDowML4c7OgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6MjA6MDgrMDA6MDDPQVRUAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    HDAtmos: {
      url: "https://hdatmos.club",
      host: "hdatmos.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAerwqYXVnYVNybF9uaFtjXUxTXlcyYnQOb54Ae7wMcKJYaWi0rqbUz8fTz8fSzcXNycG/urKemY1bcXERb50sYnSOioHf29Lt6d/s6N/m4tnBvLFNcntrb2bFwLjt6eHu6eHt6eDr597q5t3n49qRkINrf3+1t7C5u7W6u7S+urG9urG5urTEw7vj39br59/s6eCuqZ0Qc6Uib5Ijb5EkbIxQZGN8d2qAem6JhXlDaXMibpEwaoGVmpLl4disp5sAe70OcKBscWnEv7fV0MjV0cnMx706a3sAe74IcqdjdnXTzcTq59+Mj4UBe7wBerskZoGSj4bi3dTv6+O5urIibpAAerscZod4enLW0cnu6+PPy8JFcoABebg9Y26zrKLp5dyOl5EMcqUCeLcbZodaY12uqJ/t6uHk4Nh3jY4Pb54JcqZdb27Iwrji3tVggYgKbZ4yX21obGavqaDi3dXd2dF9kJIVcZ0Wa5N/f3Xb1s7Lx70zboYvY3WDfXLFwLft6ODKycFhfYESb50AebouZ36emY6nraYWZolMbXXCvLOdoJcTZ44Cd7VIZGi6tKvr5t14jY4HcqgxbIO6tKm6tqprdG/SzcTs6N7e2dBJc38AebsUa5WOk4vn4tns6ODQy8I+dYoAeLgeZoaMi4Lf2tK+vLMncZISa5R3fnnb1czMx743c40AebkCebg2ZXWrpJno5NuSl44YY4IcZYRHXmCcmI6vsKcabpUHc6pYa2vDvbTk4NecnJNnbWd9eW+po5ra1c1nhIoGc6sRbpt3eG3Z1Mza1cze2dHh3dSAk5UUcJ0qa4ajn5Xn5Nzu6uLt6uLv6+Tp5d7Y1MyxtK1hgIgUcZ8lbYyTkYSxrqOxraOwraOtqp+XlIV9iIFReYUfaowGdKz///88yl8CAAAAAWJLR0TixgGeHAAAAAd0SU1FB+UECgcrNELreWwAAAGKSURBVBjTY2BgZGJGABZWNnYOTgYubh5eOODjFxAUEhZhEBUTl5BEBlLSMgyycvIKCvJgoKCgqKSspKyiyqCmrqGhoamlraWtoaGjq6evrGxgyGBkbGJsamZuYWFpZW1sY2unpCxvz8DJwODg6OTs4urmzuDh6eWtpOTjy+Dn5+8QEBikGBwS6hAWHhGpFBUdAxTkjI2LT1CST0xKTklNk0rPyMwCCjpk5+RKSublFxQWFZcEl5aVMzD4cTpUVFYppVfX1NbVSzU0NjUDrfHjbGltk1JSaO/o7FJWUuru8eD0Bwr29vUnKE2YOGnyFEklxanWDJx+DH4OjtOmz5CcOWv2nLnzlOYvWLgIKMjpsHjJUqX0Zcs9VqxcpSS/es1akOC69Rs2Kslv2rxl67Y8peDtOxyAgg47d+1WUtqzd9/+AweV5EsOHXbwAwoeOXoMGDLHp59Qlg8+eeo0JydQMOzM2XPnL1w4H3zx0uUrV68B7QYKMly/cfPW7ds379y9d//BQwZOf6AgACIJgNAMLRaxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQzOjUyKzAwOjAwjJgVBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0Mzo1MiswMDowMP3FrbsAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    HDBits: {
      url: "https://hdbits.org",
      host: "hdbits.org",
      siteType: "HDB",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACUlBMVEWwxdaswdKswtKtwtKtwdKtwtOovc6juMmit8miuMmes8SftMWtv86qvMues8Omucmwwc+htcaywtC3xtO3x9Oxw9CYrb6fs8Pd5OnQ2uKXrL29y9Xn7PCpusiousjq7vHs8PPi6Ozo7PDp7vHDz9qdscGSp7iarr7g5uvS2+KTp7mRpre8ydTs8PKltsXF0NmesMCktsTG0dry9fbCzteTqLmMobKVqLje5OnP2N+LoLGJnrC3xM/r7vGgscC4xc+Jn7GLoLKOo7PN1t2ZrLuFmqyPorLd4ufY3+SfsL6er73Fz9ebrLrq7fC1wsyEmauGm6yFmquot8P3+PmltMF/lKWJnKzb4OX19/jk6ezw8vTs7/GVp7WWp7Xp7O+xvsh+k6SAlaZ+k6Wpt8N4jZ+DlqbZ3+TO1dyHmqmFmKi1wcro6+6QorDn6+6tusR3jZ55jp94jZ6Yqbb2+PmdrLlyh5h9kaDX3eLFztVwhpeptcDm6u2LnauptsBxhpdziJlyh5m2wcqGmKdxh5hsgZJ3i5rW2+DDy9NtgZNrgJGlsr3l6eyGl6WntL5ug5Nyh5eYp7O6xMxxhZZme4xyhZXU2t+/yM9ne4xkeougrrjk6OuCk6GBkqDk5+vP1tvV29/d4uW5w8p0h5ZnfIxgdYZleYqLm6eCkqBhdoZhdod2iJeRn6trf49rfo6Uoq2dqrWeqrWWo69/kJ5hdYdbcIFZbn9Zb4Bab4BYbn9ab4FYbX9YbX5XbX9Wa3xRZndNYnJMYnJNYXJNYXNNYnNJXm////9b9tfLAAAAAWJLR0TFYwsrdwAAAAd0SU1FB+UECgcqMrKT7RgAAAFGSURBVBjTY2DABhjBgImRkRlEszAyszIyMbBhAQzsSICDkxNMM3Bx8/DycXHxCwgKCgmLiPJzAQGDmLiEpJiYlLSMrJy8gqKSsoqqmBiDmrqGppaato6unp6CvoGhkbGJqRqDmbmFpZWVtY2tnZ2tvYOjk7OSixWDq5u7h6enl7e8j4+vn39AYFBwSCBDaFh4RGRkZFR0TGxcfEJiUmxwcihDSmpaekZGZlZ2Tk5uXn5BYVFxSSFDaVl5RWlpZVV1TU11bV19Q6NvUzNDS2tbe0dHZ1d3T093b1//hOqJk1oYJk+ZOm369BkzZ82ekz133vwFCxdNXsywZOmy5StWLlm1es3ades3bNy0dMmKzQxbtmzdtmXLlu07dm7ZtXvPDhB7C8NeLIBhHxbAsP/AgYP79x86fPjggcOHDwHpw/sPMxzBAgDlBZmERX8RVgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0Mjo1MCswMDowMPTFbxAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDI6NTArMDA6MDCFmNesAAAAAElFTkSuQmCC" /></svg>',
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
    HDChina: {
      url: "https://hdchina.org",
      host: "hdchina.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACPVBMVEUQYakSYqkRYqkPYKgTY6oRYamIsNRpm8kHW6YjbrCgwN0+f7ldlMS90+e+1Oe70uY9frkGWqUKXaceaq6oxd/G2epjl8YFWqWPtdYEWaQsc7Pf6vNSjcGDrdLl7vWRtteNs9ZHhbwudbSGr9OPtdeUuNgAVaIocbGHsNQLXaff6fMmb7BrncmQtte80+eevtwibK9FhLzj7PVSjMDA1ei3z+X3+vze6fPk7fX4+vxOir+0zeRRjMBtn8ro8PYLXqcMXqeLstUAU6Elb7AKXaZQi8BtnsqErtPW5PBbk8RaksOjwt1flcVTjcGTt9iOtNapxuCAq9EpcbLH2utKh75yoszg6vTd6PIDWKRNib7g6/Tm7vZ5ps8kbrAOYKgXZqscaa0sdLMNX6gYZqsrc7ItdLMdaq4LXaYOXqcMXaYIWqUNX6cOX6cKXKYLXKUqgMA1jsoNXqY0jMgqgL8VZ646k84dcbUofr4zi8gWaK4fc7Yid7lEoNdOq98rgcAUZq1auehFodYLW6Qcb7NnyfMsgsFCndRYt+YdcbQthMILW6URYqpWtOZBnNRZuOkbbrNWtedEn9ZlxvMrgcFBm9RWteYccLQ2j8sSZKtXtudDn9YQYqkbbrJYt+hmx/Rt0Po6lM5ZuOdBnNMgdLdNqd4ZbLFCndUIV6JAm9JYuOdAmtNCnNRDntYyicZFoNc+l9EXaa9gwe1DndVEn9cwiMUccLNoyvRSr+I0jMkWaa4KWqQXaq9Mqd1Zuen///9eDam/AAAAAWJLR0S+pNyDwwAAAAd0SU1FB+UECgYZKlRWekkAAAGBSURBVBjTY2BgZGJmYGFlYmFhYWUGsliAXAZGNnYOTi5uHl4+fgFBIWERUTFxoBSvhKSUtIysnLyEgqKSsoSKKjsTUFBBTV1aRoNPU5NPQ0ZLW01Hl5GBRU/fwNDIWMOEkdFEQ0ZaSpOJkYGBxdTM3MLSCiHIDLKO39rG1s4GLmjvIASyyNHJ2RxoposL0ExzZzVXNyaY7e4enl7ePr52tr5+/kCLAgLFg4JDQu3Cwq0iIqWjomMcGBgYYoXjWNTjExKlpOKTklOkUtPimBmYHdIzmO0zM+2FsrJzMjWzcpOACpnz8gsKGYqKC0tKy8orKkurMoCCDNU1tXX1DY1NzS2tbe0dLZ1dQLHunt7yvv4JE5v6J02eMnXapOkzgI7vnjlr9pwZc2GC8+YvyAGqXLho8ZKlM5ctX9pSvGLltEmrVq9hYmBYO3Hd+g3tGzdN7F2zecvWbduX7QDZvmNNBsOquXNrdy7bsWv3nr1r84BBz8wAVM7U3d0NpIFWdAMJAMLpbshyyXdQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjI1OjQyKzAwOjAweA92GAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjoyNTo0MiswMDowMAlSzqQAAAAASUVORK5CYII=" /></svg>',
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
    HDDolby: {
      url: "https://www.hddolby.com",
      host: "hddolby.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBAoGHTIjVicbAAABTUlEQVQY01WOvy9DURzFz/feW0/1pY2gogaLX4lBJBZCqiKxITGYTGIx+wOsRpbGarEwV0SExCTR+LU0GoIYMLw8vFfv1b1fgz6p73DyzUnOOR/SBEL9MVhR+Kz/mdTRpOhhwSUYFgAMJLhhK6sQ3qUWrcfDewDpqR65U64AfG2POlw9HgS69gI287LAAgCYZXY1TitzMcMAIKLJsf6OKcG/IKo2iea0bo7gRERS8fyv6P+Ll0pPV/UmCRIv+bcgXyaiWid9XNgP2wXgdGm5jxwCwDdtDclUQiqllIwnU1Zin4mdg5BBYOBX5USGjPa0HXv/Tn3H6FM3sRUoqehpo7Nx4ER0u7nkpp3xx89m2wVcf+ZyNzN9dO16TuOrWA9bWACsWTATf/jc6g5/5hTLtaB42zN5Xhqxi6bi9Q59jcaJDLORVNUWNJGRxCD8AK0whyYuCRA4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjI5OjUwKzAwOjAwOQaHIQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjoyOTo1MCswMDowMEhbP50AAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    HDF: {
      url: "https://hdf.world",
      host: "hdf.world",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxUG6ZvEkQAABCJJREFUOMt9lc1rXFUUwH/3vq958zIz+ZhJZkzS1Jo0ta0iSCm40YK2SxH3grhUBBf+G/0LBKkFty5cuKq40SIKRdtS0pCpmXxNMpP5yrzv9+510WmLbfG3Oodz4d574PyO4CkCpAUqAyEkQtiobAlYBxqTQwfABrADpIDiOQQv4gEfYdhX0PkKKveAwqQWAT7wD/AL8MMkf4r5JKi89yXpwf3XVJ5+koyOrmohLwrUlA766HEHYRfRaQRagxBjVHYBw1oTUn6HkFs6CZ+9cPrdz9CwKgWfStRXIg0KlhRCCEHQaTHcuoO9sEY2OkLnOcLx0EJr6ZYjhLyuc/2tEGxlu39hVN++hjq4W3SXzn/uzs1/PbNyxp5vzIvlshS1aQ+tNf1Oh9L6Owi7iFGqYTfWsOpnsBvnDLS+LFQ6Nk1+t+ZOZaZVmpVWpfZxxU6uuU7kCHwdOnN46Ygci8BLMUqzlOqLeCurqCTAHLWRhxukvUzE7mwhma1dy5JkE62+N0yn4EydOvuFlw4/KKQjM3crwsoj0Tk+YfdRk9FwgLtynvqMw1x0wNR4D8c/QgZ9oaOx0EKg3XKN0tw4PWz+ZI5am0vilYvLBddxpqSJCELsYoFMl9Gqx4w3xdyrb1AOW0iRo1WApVOM6SWcapHU8vCdGSfQ1vK401oyVRKe7e82vfn1tyjNn0aGPkWvBoakXvQoFzTeTIXIWMC3PbR0sd0Yr7LMfK1KZhRp9SJ29vc8lURrJipfoPvIKb9+jnpjic4opVoymC07GLmFK8ZoUzOqryKHA3KjgmHaTNcWeXNRME5MjodNou6+Q5YsmGgFg0NkPMY0BJoMSyi0dFHCIVMZ5ODhU5l2oFLDVy6hPUs3GLB7sM/2xh8Mtm6jtcIE3UYncRDD/liyedAlHwOFnDyLIR6CkLimIjag3byPPwyoXXifuFple6fNwVGLLDyO0LptTAblap7rM71+n85RC0Pm6KBDt/WA7c27DDotKgVFH5vtjb85uvcbYTCiK1zCxCdOA1Jhb+iToxsmsAvsHO/ci9nfdMzqMsPKJXJius0HdFqPcLwp5qtFholFHEVkUZ/uxq8UCmUapxYpV+tRZJRaIhnvmUAC/AycR2WXVRLqSJuMw1T4QQIqIklMHh6OiQa3SdrNxzOrU9yTPW2c2MKW1h0r9m/J+mpqABrYBBoIeVkUyobROCfC3Q2RHG491plKSXr75IM2pAGg0UrpeHSsR71+eNLv3bQqtW+U30+f9DADdrCKoTaLl3KlrKzTFISDZ17KU1D55P7H6DyNVJJcz3NuJO2tTrp/D+NpdXa9P/Gcr/yejd+bRucOL+cE+BO4iUpvkIyapP7/CvZD4ApwepK/TLC3gB+fF6z4b/j0OxKwgEVg7bkV8BDYm7TphRXwL0hsE/fwC5NaAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjIxOjA2KzAwOjAwm25q+wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzoyMTowNiswMDowMOoz0kcAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "time",
          searchstr: "{name}",
          group_results: "1",
          action: "basic"
        }
      }
    },
    HDHome: {
      url: "https://hdhome.org",
      host: "hdhome.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    HDPOST: {
      url: "https://pt.hdpost.top",
      host: "hdpost.top",
      siteType: "UNIT3D",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QQKBy0Lotfz1wAABIZJREFUOMuNlG1olXUYxn/3//+cs3Oec852ztnRc1LnGG5Zrm2uQvAF0pAUgla+VRZIHyJm1IciiCj8FJWJxqhPUX2QBFHJXqBC0KnlG7nM0XRo6hw62XA76s52Xp7nuftgWkZFv0/3/eG6uLjhvoS/8fI7fQBWlbs10CWB8iCQAwKBQTEcNSLdIgyool1vzLlDL7eGl947he8rxkpj4GunNTxRHXPqamtCTtx1UFWuF3yu5sul8Un/N4VtxsgnqnoFhA9fv/dPwxffP42tCuEVy8tQ3s+lwy3zW2ponhUnVR0i5AgolCsBI/kyJ/rHOdZ3LRi74R0UI6+g2oMIH712D9K5pR/xFRWWC3w8tzE+47FFU8imw/wbqsqFoSJfHBjhzKXJk2JknaAnFMEERvBDptE3srH17sSMp5Zm/9MMQERomBbl2WU5GmZEW33h3cAx6cAKxquyxhNZn51S1dKxIEPCdW4Ly+UylUrl9u77PqVSCVUFYGoqTMfCDPFEaKkn8jQCBrhXQubxBc015P6S7PTp03R1dbFz5048zwOgu7ubTZs2cfjwYYIgAKBpWpS2xrj1raz1wjbjeEYWJ6OmrilrKJeKBHoz2cDAAIsWLSKXy6GqqCqzZ88mk8kwNDTE8PAwyWQSa4T2WXEOnS80Fz1tdzTsPFApjjib3t7MlUsXicfjrF27lunTp3Po0CHK5TLr1q3DdV2OHDnCmTNnWLx4MXv37mX37t3U1qa5Z+583NSSRKGgbaZi9K76+iydLzzPxMQEHR0dNDc347oura2tbNmyhf3793P27Fk2bNhAMpmksbGRnp4eYrEYq1etZtf2z5mYvGY0bHOOZ8W30QgNDQ0kEgnq6+uJRqNs376d3t5eLl68SH9/P8lkkgsXLrBjxw7y+TylUom+vj527dpFW3s7oVQN+QKBE4TM4FgloOQrcPNWiUSC0dFRtm7diuu6ZLNZXNdl6tSp7Nu3j2QySVNTE3V1dXR2duJm69l8fNL3HW/QwZGjQ8XgueEiVfe3t1NTU0MkEmHlypWMjY1RXV3NvHnzSKVSrF+/nt7eXtasWUOhUGDmzJnc19LCkctFRr2JPCFzQlZ8PdSg8M2KxticJ2dFsNZijKFUKlEoFFBVqqursdaSz+cBqKqqIhKJoBqg4tD1yzUOXirucYRVpug6530r2/ZdKem5AhhjbovS6TS1tbWEQiGMMaTTadLpNLFYDGstjhPi2EiJn0YrRRzzme+Y6ybkK+KYT4Yruv/TswUuT/j8X07lK2w9N8ENZYdY+VKNYHxrCBy5gpVXf73undx8apzefAX/j/f6J8qB8sNIiQ/6xxksBnuMlbd8RyYqEXuzvh7tvkoAGLTNh43JsHl4QSbszK8NM9M1RK2gwLinnC/4HBgpc3y0XCxUdKcV3gQGAoFvH8r8WbCPHMvjTPogpH14WuGZqJXmVNjEY44YVbjhqZ+vBPmSrz0Cn1n4CigEyQjftcbubOxbLP9xFLGKepIJoD2ANpScQmCEQQM/C5wU9Hoghu8Xpu7Q/w5HIu8yT4GwdgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NToxMSswMDowMDQkcScAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDU6MTErMDA6MDBFecmbAAAAAElFTkSuQmCC" /></svg>',
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
    HDRoute: {
      url: "http://hdroute.org",
      host: "hdroute.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBy01Y7bufAAAA3xJREFUOMttlc1vlFUUxn/nzjCoTEsnQClBIehIaNTG+hU0rkwXsNBo4n9QF40kuGFh3GqIC1aYEBKtf4NxA4su1ESNCSHYBBrxI7akQK3tQJwO7cw593Hxvh1a40nu5r3v+b3PPc9z8xpb6oPTpwEMaAIngQnDRkEHAQSLwJzQDOISxm+Azp//rM8wgFPvnwITyBpmvA28Z9gYqC7+t9qSZoEvJL6iohZuXLh4Afvkw49ZWF0gWdpvZmeASWUaGYGs0LWlUgLDyi21QNOIc5Hz0qE9h6jOL88DNMLyGdBUSlYfGa4xOFD5L4v19czyao/2mhdHMxrAlCQQZ+eX51vVzsY6O6s73sGYBOqVZLzx+gAvjg0ibSeudYKFxQ2+/eEec7+uUW7XgUmhuY1e58uUzI56xKR7NNwdj0ASZuWQzfqrvqvKs8d28e6b+zj8eI1ez3F33L0RHpMVakdTRJyI8DEPxz0I974yMyNn0XngbGwEADnD8N4aLzxXxyz3e9x9zCNOVMN9AijcFFQq6SEQaK85X1++A8BbJw6we2AHACPDNVIqgMVAqSNNVD18lBImoBoJKfdD1e1mbi894LFHq2Rps5leL+M93wrEYLTq7gc3hy6Bb1EIkCVee6nBM6NDDA3WkEASN27ep73WLd/tx+tgNTw2BYLAq9rursRAvdI/KsDV2VW++3GJbq+HmRXNpcqqeyyCmpvQqle2AQXkrL6SnMWNX+5xZ6lDsodRLXmLycPnPAKP0q3whzMskXf/6tDtFc8qFeNoc5DaDhUOR7HKyM2lHDETEe3wElrmsH/Zzbg6u8L8rXY/m8eagzz9ZJ2eO+FB2duOiJkUEZfDfTbC+19j2w0Ryysdvvn+Nu4ZCYZ27+SV8b2kJDyKU+XIsxFxOZl0M3JMe0RrU2GWSjdLozz46cpdbi0WKiV4eXyY/ft2FgojWpFjOiVu2qvHjwNqCPtIYipVqB95YoDG0COA6HaD3//8h84Dp3lkkN1ldHIWf8zf5979XtuMi5idBVrWPPAUew7vRZH3C86AJiPU0Bb7UjIMiKxyGsIwUrKWGdMY58zS0vrKCpXVdosDIyNkaQ10RWLB0D6Mhhk1K7MoCQPMwIy2GVdAnwo+t6y/s8TP169vxqeo8efHMcyEmkInzZiQGAU2b9MiMAfMAJeg+AVcu3atz/gXdAVC3vg+5BoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDU6NTIrMDA6MDCBhmVAAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ1OjUyKzAwOjAw8Nvd/AAAAABJRU5ErkJggg==" /></svg>',
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
    HDSky: {
      url: "https://hdsky.me",
      host: "hdsky.me",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBh8YytuMTwAAA3NJREFUOMuNlEtrJFUUx3/n3FtV/UinO8lkoslMJjAjPuIIogwDunAjKoMbNy4U134Fwa/ixs+guHDhA9w4I2IwYMBMYqKEyctJpyvdnbp1j4vqTlpE8RQHikvdf53/417hn+VG/X8qAmFyQcYvq0/Wp955ceHuEy3/UiNzHRHFiYmZUcaIqhCjAEYRAon3ZuKKk7Phwx9/63796f3DXaD0I7zme3eX3l/qpB83vC02s0RUFVXDohGj4ZxQlowAFe8TShOaSRzWbnU+Px7y0Wdrh78qIG+sdp5avtL4MEt0CUEihgmoKAiIE5wqojLRSggFzrms3czuvXB9+i2g7oGkXfMrXllUBJFqo2GoU6IpgoCCQ4mxxDmHiJCkCRqFsghZ4t3TwJQHXBFpIDgRQQDVaiKDahpRnBPMIs45EEMEyhAwPCiURgPIfKUKKjoGU9b3Bsw0M27OJ+yfFmwfn3NjNuOnnZwyQrtmrF5rYeEcnyaoydhgqUyRShMVQ1AebOXcXBSeXaqz3xvw3WYPEL7aOGVxNuOoe87OiXHv9hSqgsRKVwC9yI9I1SqoCo/zku3DIQenAVUFEeanPR+8coV378zwcH/AoxycVvuQCtCPBhyBgY6Av9/ssrGXkw8jC520cluExCkrcylTNeXgNHBjJkU0VsZdAsoo4gJiGPDqM21ee67D2k7OD1vdCxaqQhGgKI3UV2tOK6MuAC8pG2CYRVp1ZbGdslMbEA1ElHwQWdvJ2T3sU5hwfS7DRkZiE4A2Hk4VKwvadWjVPKKOeua42k6ZbnhqqfLNRpfEC2+/fJX5VkIIsZrO4gTl8SMgCq8/32S61aSMwq2FOtfmMmqJsjxXI8YSL0arWSOESBD7N1MqYOdSplNH5j0hBhKveCc4Ba05BEcI5xXFkYFgqLqL2Fj/PBYRidWpAO8SRMc3mFz+caJspLVKdaKK0gqgVKBc3z19tLmX/2lmqArep6hUEVIVdByrkSRVVhXEcN7xOC+KX3a7vwN9B9hJPxRnedHOnNxOE5eVUciHJfngnLwf6A0C/WEkHwTOBiW9fsGwgHwQ+ePgLH67fvTgy5/3Pzkr4taYR+pgZbmdvbk0W7tTT33LQMwMs0p0/Rtlw6kSjeKoN9zeOux/cTwI94Hu5FcemAI6QDZ5m/9HBaAHnAADwP4C8PNel3XZzT8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6MzE6MjQrMDA6MDAV1TUfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjMxOjI0KzAwOjAwZIiNowAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    HDT: {
      url: "https://hd-torrents.org",
      host: "hd-torrents.org",
      siteType: "HDT",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBAoHLibMJfxhAAABTklEQVQoz4XSz2oTURzF8c+dyUwSqSUKitJuqq5cFxfWt/BpfCxfwa2CC3VjsUWptYUqJmlmzEzujIuk+SNIzg/u6svh3PP7BSQSrS0KEq+8UG0DSb3Wbp/Ounn6j0erWWZagpkducDSBGqlWrsC+/btm4mIolpEpuvKD5N1cOBYgSBq5DJRqWvP3RUYpGpXDlz76UBuz67SNx/RE7Q3YKvS9cxXlUMDDxUmHrsUzVYgqVyw44GhXbkzb5ReemRsuvp1kMpE9z13pO+DPxpDx3pG6s16glThrU+eKhWmOnouVIuiOjfVRsHQqXe6BvqeqGW+CxKYv/N6K5+dmzpz4rc7bvviAtmq8EYjl3svap0Izt0ycSnom61vpjBxqFSj0WrQc0/fL+P1jIVTI6l2EaTRChLRyPU62BgrZMLGBbeL7W/UMz+G/yvZftlz/QVf65MTdoZVvQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NjozOCswMDowMAiuiIoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDY6MzgrMDA6MDB58zA2AAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: ".listadetails>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
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
    HDU: {
      url: "https://pt.hdupt.com",
      host: "hdupt.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBy8jpVQ5rwAABFlJREFUOMs9lElvXMcBhL9e3j4LZ6gR6SFpLhITWU4gKTSyIRdHgZBTfpN/UZBrTrEBI4ccAmRBLjYgWZFEUZztLTNv6dfdOVAI6lKnQhUKVeIPFydeSokQAqUU86NPePyTSx59/oD9/QFCAEhQA2Q6QURjOgP//vs/+POf/shmtcYLiUfgvUdN48FXjZP0QvOjx5c8f/FrLh/OiAOLNS3O1HR1gbM9QkY4r7HWs394xGCyR1WWrLeGzkmcDFDDwfQrGUb87OkjXjz/gulQ0m+XeG9x3mO6FtM2dKan2Va024reGHpCDo+OOdiL0GHKphHIcIgeTA958ctHfPmLh0i34+b1W7Q3hFFI0xlUlCKlQoUe6x29rXH+hmBUk+7N6KxkOJ5yehpzu2nRz3/zhC9//pBYtbx/ec3bl69wXc1klLLZ9axqwafn53jZkiZDrn94xfHZGYYcnU3wwNff/oXj8yuy0R76d7+6JFaecl1S5iVKK9J4iJWCk4tT5iJmnTfsjOX9as3X3/yNLxYfuHr2BKtb9sZzjk9OeP3uB84uforeFRtcqGi7HofEiwCnY1abNYv8FYfzQzSCemepW8vDkwmZavjvd/+iWP+VbHbO1WdPWVXf4zzodtdQrXdUZYlH8iFvuF0uMX3Htqg4Wu44nB9Q5i1CaT6dZbi25s37FZvSsHj7PU+GF1w9u+LNokW/eXnDeDagqg14i1URr2/f0vUObywqbHAqp1hucb5nfqBpasdt0bIVI75b52z/+R9+/9tjpFLI63crwnTM/aMzVoVhU3UEcYIOI5I0w1rB8npNvioo25Ztp1hXnrIVOBWRjWc0dU1RNQgp0Pkq5/rNguHekKKs2eQlaRKjXI0wHtEZTNNRNTXjyQFNo+gaSW8EWg/Znw7IhiNaGyKQaNc23F7fUOxKrO2YjDKqakfvHML1aC/AexIdEBByuyhZFTmdjrE7x/mDU87OT+/miUCbvmNbViSjmPnhPcp8w2axwjQN2nmQIUpp9pOMUGl6oTAyIBhO+ezzZ5xdXKD13RcIAdpYg7UtUQB917Je5pjWIKxFeEU6mqC8QFpDNrrP+JMfcxanDGbHjOcH6NgjhUAiEEIgvfc02x1lXrL4sKTKS2xrwAm0CkkmBzROki9zgnjK+PwpgQyJtCAbSAZZRJaGpGlAmgToNA5o6o5iVdK3Dar3RCrAek+UjghHM+Ryzfj+KcHsnGg8xfdL9g5HJEmA+OjMA8IL9CgOabYFN+9uieMI7yVeWIIoYrg/xxrBeP+M8fEDiDPiCO4/vkSFdyXcAe6OUyBT4UiVp9gULFYFTddje0iye0gZY27ek907ITu+JBuNiBOPDhXcyQDgAbwHPDrWinESkemGqjXsrCUMIorVmmaZk4QZu+2aqQcZBCgl8fiPEfnI/q+KFl6QRSF7SURtGpwVWCydLSFMcL0nXrzGrG+I9oc4LzEteOfw3uOtA+9xzoJ1/A9EnjRTvBUMaAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0NzozNSswMDowMIa7gnQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDc6MzUrMDA6MDD35jrIAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    KEEPFRDS: {
      url: "https://pt.keepfrds.com",
      host: "keepfrds.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACDVBMVEX////8/Pz19fXs7Oz09PT+/v7p6enQ0NC7u7uwsLCvr6+6urrOzs7n5+f7+/v6+vri4uKrq6uBgYFzc3N5eXl6enp0dHR/f3+np6be3t75+fjj4+OSkpJ8fHyhoaHh4eHT09OlpaV+fn2Li4ve3t3s8PXu8vfh5uu6vsKLjY+3uLjl5eX5+fm8vLyLjY6zt7vf4+isvtSOp8WCnsB+mbl6kKyutb3c3d7v7u7m5ubY2NjY2NfP0NGqsrt1jKd8lreCnr+OqMWcss1chLAvZZ4uZp9ahbPS3ejOzs+3trbLy8ugoKCioqHBwsPK1eJXg7EtZZ8uZJ5bhLCds83t8faoxt9Yl8g/icJ2qtLh6vGwr697e3uNjY3FxcWRkZGenp3MzMvf6fFyqNE8h8FXlseoxd78/f7f7PWPweJWpdZ7uuDh7fWzs7OampqoqKipqamXl5enp6fk8fh4uN9Uo9X6/P3Q6PaQzex3xenX7ffP0dLR0NDW1ta5ubna2trx8fH1+PnY8Pp0xOqOzOz1/P/L5vKUwtaxwMfa3N329fX39/f4+Pjq7e6xwsmOvtLJ5fD2/P/x8/PDyMuMjpC0tLX29va2t7eKjo67wcPu8PH9/P3m5eWXlpabm5vKysrd3d3MzMyQkI/h4OCxsbGGhoZ4eHiEhISurq79/f3U1NTAwMC1tbW/v7/q6urw8PAgqDn/AAAAAWJLR0QAiAUdSAAAAAd0SU1FB+UECgYrK84hHq4AAAEbSURBVBjTY2AgFTAyMTOzMCKLsDKysXNwcnHz8PKxwgX5BQSFhEVExcQlJKXAoqysDIzSMrJy7PICCopKyir8IBFVVTV1DU0tbR1WVj42XT19AzVVVQZDI2MTUzNzC2ZLeStrG1s7ewdHQwYnZxdXN3cPTw4vbm8fXz//gMCgYIaQ0LDwiMio6JhYwbj4hMSk5JTUEIa09IzMrOyc3Lz8gsJY7aLikoz0NAbW0rLyisqq6hqO2rr6hsam5rJSkKtaWtvaOzq7tHm7GXp6+/onQNw+cdLkKfJTWVm7pKdNnzET6qFZs+dEz503f/4Cb9mFi/jg3tRevERs6VKxZcsFdOCeZ13BvHLV6tVrFNYysqIEVHf9uu4VJIc4AFHVRtljPRexAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjQzOjQzKzAwOjAwO9PHqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjo0Mzo0MyswMDowMEqOfxQAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: false,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      uploadPath: "/upload.php",
      needDoubanInfo: true,
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
    KG: {
      url: "https://karagarga.in",
      host: "karagarga.in",
      siteType: "KG",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC0FBMVEUAAADMzMyDgIDBxMSAgIB6gID/4uIAgICAhYXNzc2IiIiXl5eDg4O/v7/BwcHAwMCFhYXGxsbS0tK5ubl7e3tzc3P////Ly8vMzMzMzMzMzMzMzMxvamqlpKSmpqZaWlqChYXP0tJ/gICChYVISUkTExMFBQWJh4fJycmDhYV+hYU9iIhXWloAhIQAgIDNzc3Q0NCsrKxVV1cdDg56OTk4OTkODQ1bAAA9REQAhYWSkpJfX18QEBB4eHiLi4uVlJSZmpqNjY15eXkODg5hYWEgICCIQEC9u7vBxMQ/Pz+CgoJGRkYVeXmuuLjq1NQAAAAZGRljXl5iqKi+v7/BwMBWVlaNjY2IiIiIiIhoaGihoaGMjIycoKCwsLDJw8PAwMC/v7/AwMDAwMCWlpaLi4uDg4PGxsbHx8fDw8PIyMiwsLDAwMDAwMDAwMDAwMC/v7+8vLzAwMDAwMC8vLy4uLi3t7eQkJCenp7BwcHAwMDAwMDAwMDBwcHBwcHPz8+NjY2Hh4eEhISnp6fBwcHAwMDAwMB7e3t7e3t7e3uqqqqHh4dhYWH8/Pyjo6N5eXmAgIB/f3+AgICbm5uKiorCwsLDw8OMjIy9vb3///////+JiYl/f39/f3+AgICwsLCioqK6urq/v7+amprw8PDMzMy/v7/AwMDExMR5eXmAgIDKysp/f3+AgICvr6+hoaG/v7++vr7BwcHAwMDExMR5eXmAgICpqakUFBQRQkIAAAABAABrJiYoQUEAHR0SERGKiopaW1sMBgZOHh4aCwsMAABKLS1OTk45OTlTUVEBDg4BYGAIISE9AAAJCQkDAwMODg4FBQUHBwcLCwsBAwMCDg5TAwNCOTk+Pj5bW1tZWVleXl4rKysWFxdYV1dcWVl3WFg7Ozs8PDxzc3PFxcW2trbAwMC4uLiHh4eIiIiMjIyPj4+zs7OdnZ2/v78GBgb///+lKbQMAAAAtnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTUEIDo3hNxoOBqD3++TnchSh7eSBAgFag32O8PCOfIhfJExJTMrhHQ6N+/v++sYaBp33vCADtuicX5oUv3t/dbruiNi6nO+WikT90FgtpehaxPfEwV7dRgKc9f786eDlxx0BHQkRkfleFR4aAwJ63elXD39/g4iIidzagX9/g1oB3Le5ubO3F6TuswxDUSMVTIEDAwMEBrawIHRE97mnD1YAAAABYktHRBZ80agZAAAAB3RJTUUH5QQMAwUgcVRTPQAAAThJREFUGNNjYKAaYJSQlJJmRBFiYpKR3SYnr6DIjBBjYVVSVtmuqqauwcYOF+TQ1NLesXPnrt06unpgAU59A0MjY5M9e/eZmplbWAIFuaysbWzt9h84eOjwkaP2DtwgVTyOTsecXVyPnzh56vQZN3cPXpCgp5f32XPnL1y8dPnK1Ws+vn58IEH/gOs3bty8dfvO3Xv3A4OCQ/hBgg8ehoaFh0dEPoqKjomNi09ITAIKJ6ekCggKpqU/zsjMevI0Oyc3DyiYXyDEwl9YVPyspLSsvKKyir8aKFhTy8cgLFxX//xFQ2NTc0srP8w3Im3tHS87u7pFYQI9vX39EyZOejV5ytRp02fMFAMLvn4za/acufPmty9YuOjt4iVLly1fsZLh3fNVYqvXrF3XJr5+w9uNm/Kfbt6yFQBipHYOvCm+yAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMlQwMzowNToyOCswMDowMNjzD2AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTJUMDM6MDU6MjgrMDA6MDCprrfcAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: ".outer h1~table:first>tbody>tr:nth-child(6)",
      needDoubanInfo: true,
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
    LemonHD: {
      url: "https://lemonhd.org",
      host: "lemonhd.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBiMh5i19uAAAA25JREFUOMu1lFtoHFUcxn9nLjuzs5lkTdLdNtkmjYJpu9IGIsSK9QaiKN5eWhUfRDBV8EKRFgUpCIIggqAgFN+E4kOrUnxRUUpsgtFG6aZUQ2NIaFrWzSa72fvOzpw5PmxBJbR50e/1HH585///zgf/scSNDtXFNOBDqMWxbxlB1pMoT2D0VPCz55GVLJodinRmc6C6MARBMYJ77wEig+OocASzrwMRBW/eQ2gLBLnPaM4dB1ZFevb6QDV3N/hZG/f+NzH7XqeaiVFfgI4xMBJQ/BKsreCOSJCnqP10GGFkxc6zGBtgV4+BHofq2eeIbD+CnozSmgE/hNAEDAh0UDWIp3QM+wB+tkzz91fVpQeb2gZ7lQkonBggMvAypakoK6eh5zGwdwASVAh6DBJPQ6sMuU8FRvIpjMQ9yBIbgf6fYG7bj1LD1C9D4zIUvoXuh8Dqb8N6HwdvGda+Aq8IftHFTD7KuemNT2brUahO7QHDwNwOpgVhE5qLkDgIwoTid9CYh0gfEAA6aPYQIfpGoHsfNDI6zhhYe9uXVQhGJ1gp0GyI7QFzCwgdCMGwoHFOsMo/HL7Q3rp4/ubBiUMPpPYPeIjCNKgIGHHofQIK34DugqxB/iS0cm2H7gBE4j5DXJvhs8A6NiEvEuXrdyZ/ebImLdAE6E57ZrVZKP8M1QyUJqD7YTBuAhoQSUBYnWHXHdJgHChj7bjVOZLost/wZehcaXjM5pe4c9s+0AahdhHK09B5FwgB5RlAg95HoD4JQl/Cz51Gd9BQgMsz+bJ31POl0xeP4sYt3p2fYlF2gChD5QwoH1CgaMen8gMEy9C5r4J36T3WJmcBdEYZQPCBGzUHHctAKsX58jp/RBtcrS1we1c38c5dCNECKwlGDMIsuLtBUys0Mm+j/E+IpqTYOYHOKCkEB1tBGNeFCFebXtDRb2i7t3SJogw4lZ3jSr1AdyxVScYSOaFRwnCWUY3PaS2+RePCF6ggEOlfr/3lcTQUw0BaR2iyT43a/dpriaht9ds2mfUSdSm9Ycc+NrfXOYFfFTi3tZCda0SEFMNnrlNfJ4E8oPOKKcSHPZZFVNfJNZvFeiA/QvE+UOGlG/fh3zkstDOMoiVRrbznlZVSPyr4GPgeDZ9DbKp/19dxAHpRjAErwG8kqbEEHN4c9r/oL4iZUfYE0NpFAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjM1OjMzKzAwOjAwFTOrdQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjozNTozMyswMDowMGRuE8kAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    MTeam: {
      url: "https://kp.m-team.cc",
      host: "m-team.cc",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABdFBMVEUAAAACAgCCajIDAgEHBgImHw5XSCFcSyNTRCAeGAtpVihSQx9yXSxaSSJxXStZSSKxkUR9ZzCafjvNqE+TeDihhD6niUAdFwsAAAAGBQJ3Yi46MBYAAAAHBQJqVyhmVCcAAAAAAAA1LBSGbjMAAAAgGwx1YC0AAAAAAABENxqNdDYAAAAnIA9NPx0IBwMzKROmiUBSQx8IBgMaFQqCajLOqU86MBa9m0lEOBqSeDhyXStsWSlVRSAuJhJrWClxXCtmVCcjHQ1kUiZvWyoqIxBVRiByXixmVCckHg7rwFruw1zvxFzjulf0yV72yl/uw1v0yF7tw1v1yV74zGD3y1/3yl/1yV/4y1/5zGDxxl3lvFjku1jwxVzIpE3qwFrWsFL5zWDCn0vft1bHpE3MqE/Wr1LvxVz4zF/ctVXet1ZKPBzas1Tyx11ZSSK4l0f6zWDdtlVJPBzYsVNYSCK2lUbetlVIOxvXsFNXSCG1lEXpv1r///+72WvcAAAASXRSTlMAAAAAAKvo6uaQ+OL75/vn++v2/vX5+ogrXOazQ1/e2RsBoO85geUyDrfyRI3Hb6f5y2GA7P79/vz9+/nkwfn7+e35++73+/ejS5QV5gAAAAFiS0dEe0/StfwAAAAHdElNRQflBAoGJSzOxqaDAAAA40lEQVQY02NgZWNHAxycDFyeXqjA24ebgcfXDw348zLwBaALBvKTJhjkFxwSHBoU5hceEREaBFMZKSAoFBXq5ycsIhodAhUMFxOXkJSKCY6VlpGViwuFCEbKKzAoKsUnKKswMqkmRkAEA9TUmTU0kxK0tFkUdZKhgiEpunr6Bn4hqYZGxiZpMNvTTc3M/fyCQjIsLCPh7gzJzMoOCfLzy8nNy4c7KaSgsCgE6OzI4pIIP9IErUCCpWiC1pEBAUEZZeV+AQEB3hWVIQG+VTYMtnZ89nwOjk5W9vZ8zi6ubvZ87h4AngBo3AG4MQYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6Mzc6NDQrMDA6MDDepEzfAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjM3OjQ0KzAwOjAwr/n0YwAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(6)",
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
    NYPT: {
      url: "https://nanyangpt.com",
      host: "nanyangpt.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB71BMVEVTu8ZWu8ZRusVkwctrxM2R09rW7vFTu8ZSusW44ue04eVTu8ZhwMpTu8Z5ydKFzdWs3OLR7O9Tu8bD5enN6u5lwstTu8ZTu8ZiwMpWvMZSusVTu8ZTu8ZTu8bD5up5ydJQucVSu8VSusVVu8aM0NhrxM2W1Nuf2N5Uu8Zpw83S7O98ytO54ueP0dl7ytPT7e93yNFRusVTu8ZiwMpwxs/V7fCO0dmg2d9gwMqz4OWv3uPB5eldv8llwcu64+e34eaBzNTA5emo3OFWvMdQusWw3+Sn2+HO6+6i2d9+y9PG5+tlwst7ytLT7fBvxs93ydHX7/GS09qs3eOFztbh8vTZ7/Ffv8lSusZ/zNTR7O9sxM6T09rc8PKJz9eu3uOp3OLK6e2a1tyAzNRnwsxXvMed193a7/Lf8fNcvsjE5urK6exVvMaHztZWvMa74+eY1dxSu8ZowsxYvMdjwctavchzx9BPucRQucRZvcdtxM6N0diQ0tl6ytKR09qU1NuV1Ntqw82Iz9fQ6+5Zvcie2N7H5+u44uZyx9Btxc6o2+FYvcd4ydHX7vG74+ij2d98y9PW7vFhwMrF5+ub193E5+qd197E5+vM6u3L6u1gv8nT7O90x9C04eW14eWa1t1vxc9uxc7P6+5gv8qy4OT///+e7qWjAAAAHnRSTlMAAEvO+oAXN9f3gYr55/3CaPzNFKD+10sUaMP+6DbE9n4oAAAAAWJLR0SkWb56uQAAAAd0SU1FB+UECgcwCiq8r10AAAFtSURBVBjTJdBlV0JBEAbgtbs7uc5VuZjMKhY2KIqJiV3X7sJusbs7/6gDzqfd58zOeWcZc3SKVQhxIMYnJColAHB2cWVu7qqkZLqIKalp6WrkkOHhybwwU5OVnYOYqxTztPlCQWGRN/NBtaa4pFSnLysXVIaKSmNKFTKO1TW1dfUmbGhAbGxqrmjBVkJzWzt0dHZ19yC29PZx4Jyw3zCA8uDQsBJhZNSE3I7msQyA8aykCYTJqWk7zsBs/BzQo/kFCtm/CDOEdBIselLLfy1RK1ueWFldq1tAcX1jc4vK1I6cbRt2lLG72sq9faPVajVqD9YJD2vMIB8da9SSLJ8sy7pxCTg7PTMjoHx+AYCXW7YfoZmKqzTBIlzf3ALXr91RDlskX43iaPP+4TEBOTY+Pf+j38ur4u39Q0VJsdqwjXb0D/gEUQKkFvj6XrRhIAsKDqHhtj04/Px+EoaGMYfwiMgobi+QrnUQ7RXD/gCppmlft2mUAgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo0ODoxMCswMDowMGet8SMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NDg6MTArMDA6MDAW8EmfAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    OurBits: {
      url: "https://ourbits.club",
      host: "ourbits.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBicSPZHZqgAABUJJREFUOMsFwdlvXFcBB+Dfuefcc7eZ8awZ22M7jpfGxQlZGpoWhxYVgVpaqQuPSMATz/wFiH+BRx4QQkgVCAkQS1GRQIgi5BIVxwlJG+yOxxnbs8+9c5e567mH7yMAwA57+HHtO3jf/56yIHUz0262JPS7Rna0d4m3b+qG1joOr9HzXtlJnOSJTtJ/GWb+b1UMPhV91W5u/FR8fvgTPPy+DvZhcBlNcw2n3i5Zu/hLcyKuf2VCF782L67tLKpRc2W2X5XdkTVJYkzkK7qmE6OqnqwuqZ2XeBr+A0vZByHNTzZfeSHfOPwmWJAu4DwwSZDwK63gozdGY+c9p/rinbReKgmzjJltwu3nsDUus6ppcE2UNeFfbrFHX1ytHW2PM9Z84jR+nTjPP1JAc/YBPVQa/ofNS8GPXick/C4R3nUiZpqRnkFkGp5pb2LWdMHKN0i5UAFPRjAdB5XkMa/jwW7PqVaCfkWd5D/4+Yzu/Y8VaM9SzeReNNfeg0GuWQ1LW8M+iY/vY67fRty4B3rFQKGoQmYZtOEzMPcYPS8l7qTAuq5YhkzfXV74r7ubDX7GcnGxYmmdN1SDvWhSV6+Ih0R1ztAdX4VvrEMhM6jMQJoJZPMh6MUBnN4znAVbmGMXBRN0uzFcb1m/3IuHO49ZlvC7SJ4+5533iheHIYZuiGHxGvr1t5DxDViRi+g0RzhXQdFFiQ9gVAWCwjpCbGO1OSOtQkdV7aPtc4+8zWahvOcnnUY0foZ+bwEd7w5GxXcQNm9D0QTg+eBOAuoF+MLSU6zXn4CSNrbpDIl5ARn68IYjzM4WGt1B4WXW9vhNNTRqXKkgXLkD33sbQt8CoQGkEkEIDQqKaDTGuHX5AZpkH6E7Qb1yCmpJfNzJ8eTxMqajXcO215rsNCqukujLZsW6hGhnD2rwVah2gjycgUdAwSbQcgqjocGNAiTjGFSUUFooIrYD+F4ATxTlJN1SbH9LZyCMjArvkISPoFOKMgMyX4OcFGAmMcwwB+EBfK+AT7xXwWYENcNG5rkwlEOUCjFqNYlR2oAkt8DKIekn5jJz5KK+JNu4av4dTd3D0/YaXOcKJFehFQIIksG3vgSfXIdDp1gr7GPdOIY9tDHzFgjYUl5arkTMdJJHwWhsRTArS6UhWuXfoqF2kJlb6MUvIZbPIZ6XkDICSUsI4mXwvAIxP4BZlshzAtctIRKl0KxlQybt2T+D7mAjEcUNuzFFvxWiwU9xc+cEm/FnOO6/iqPpmwjVZdA4gzzvQsRH8LQD2FaIWFxCltaQhmLCzfl9uvKNb2Vur7uTurNN3+eqm9RJURtha6WPgtHDwDUwEC9DFK8AaYjos2OQ9n2U2CFyjaDd38PF8JaQqXbQoORXzGSyUy+Zfx10zjfdXvn2mbOtlcUNlPUT+HaC9lEFc90E1+YQng3pDzB3HDx+WMbx8Cps7fU8x+KgqIw/QRrss9rqmiuC5G8JoYt5Jip+f75xShdVQymT2NYwOGkhLPpQlD6QJVBLFuLSIvq2IWWyKEldcwwr/TM32O+zrRsuLVdfkMTxPV01JllG0iTJqqHgVUkjFiY1uLN1RK4ic38KmWWQqgZBOBEZF4pqnjI1/QPB9BfFev2BtnlLoRt334WRSik5m2RK0s2helHCY1Ae5aQm0qRIMjck+eQil6Ebg5CpwmiHUvkfXRV/5DJ6P7O7B823vp0CXNLTj3+H2tdfgx/o0ipnbjietRG4nyOz5nle4cipriQ+V0JbKMHUURPvyKLyo5Kp/4Zz+ifEfmf62g/T1vNcSg/i/8nGx5VMcAmaAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjM5OjE4KzAwOjAwTy0YfAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjozOToxOCswMDowMD5woMAAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    PTHome: {
      url: "https://www.pthome.net",
      host: "pthome.net",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABR1BMVEUAAAD/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/sxz/shv/shv/sxz/sxz/sxz/sxz/sxv/sxz/shv/shr/sx3/tB//vj7/zWv/2pH/4ab/zmz/vTz/2Y7/7s7/+e7//v3/////sx7/uS7/ujH/x1j/68T/8dX/1YL/03z/25P/zGj/6b7/7Mj/9OD//fn/shn/033/sxv/w07/8tj/1oX/1oT/vj//uCr/463//v7/893/14r/14j/8db/2Iv/vDn/57n/+vD///7//fv//fr/6b3/vDj/vTv/ymD/35//89z/xE//yV//6Lv/7MX/7Mf/uTD/0nj/+vH/7sz/1YH/3Zr/uC3/x1r/+e3/5bL/yV3/9N3/8NP/yWD/ujP/zm7/xFD/57j/4qr/wkn/vDf/tym6/awGAAAAGHRSTlMAAAEmcLXj+bYPYsPx/hWL7u6LEPTi+u42ThkjAAAAAWJLR0QnLQ+oIwAAAAd0SU1FB+UECgYoFFNqYFAAAAE4SURBVBjTZdFXW8IwFAbgpINKW1pGq0laFRSIC5xUxIkDFTfiwL33/7/2pMUrz+X7nDz58gUhhLAkK2pM02I9iixhJAbjuG6YCQKTMA09jrEwy06SaCilqbQFijO20xXGPN9z0hmMJD3ao8zvHxjM5ryULiHZCIXRoeF8ocizPjVkpJhgI6Nj4xOl8mSpOOVRU0GqsOmZ2blKmQbzhRyjREUuqbKFGue8skjIUn6ZEeKiXsJWVtcAeX19Y3PLp4RogEFju74DuNvc2z9gIbqE+odHx02xe9ISBsdVQslpu3xWATy/YCKyCpGod9m5ur7pcN6+FQiRIDy7q90/PD7x5xdPnIbwkt5HX1tv742Pz6/QkvBMUQgL4Lbvn/AWx4ZCouqgtIBVxZ5tRYX+L/nvO1xNc9Xud/wCUFAuZX3Re8sAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6NDA6MjArMDA6MDAnY2+xAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjQwOjIwKzAwOjAwVj7XDQAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    PTP: {
      url: "https://passthepopcorn.me",
      host: "passthepopcorn.me",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAACAgIEBAQDAwMBAQF7e3u+vr56enoXFxecnJy6urpSUlIuLi6vr6+xsbH///+wsLAhISHg4OB2dnZCQkL8/Px6fHy8vr95ensWFhebm528vL1UVFQuLS6xr7C9vbydnJsXFxZ7e3q/v718fHsXDAoiFQ8gGQ4eHAwfHw4LCwYIDQgQGw8PGxMPHBYNHBkHDg0GCAoOFx0MEBgODxgSDxoOChIDAQGcSj7oh1zgrVng0VrU2lk6Ohc4WzB2x29auXpZv5Fc0rcpY1gXKDVYl8Vae7ZYYqhwXKxZPnYBAQKxVkj/nWv/yWf+8Wj1+WhDQxtAaTiI5oFp145n3alr89Qwc2YaLj1mr+RojtJmcsODa8hoSIkCAQOxVEf/mmn/xWX+7Wbx92ZBQho/ZzeG4X5n04tm2aVp7tAvcGQaLTxkrN9mi85kb7+AacRmR4YCAQJn073lAAAAAWJLR0QPGLoA2QAAAAd0SU1FB+UEDAMAJuVAAk0AAAC+SURBVBjTY2BgZGJkYGZiYWFmZmFhYgZzGRhZ2dg5OLm4eXh5ebi5ODnY2ViBivj4BQSF+IVFREVFhPmFBAX4+YDKxcQlJKWkZWTl5GRl5BUUlZRVgPpV1dQ1NLW0dXT19A0MjYxNTM0YGMwtLK2sbWzt7B0cnZxdXN3cPTy9GMy9fXz9/AMCg4JDQsPCIyKjomNiGczj4hMSk5JTUtPSMzKzsnNy8/IL6CiI1UnYHI/Vm1gDBHvQYQtkbNEBAFOfVLHCxSMQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjAwOjM4KzAwOjAw8nDEugAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzowMDozOCswMDowMIMtfAYAAAAASUVORK5CYII=" /></svg>',
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
    PTSBAO: {
      url: "https://ptsbao.club",
      host: "ptsbao.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBiwfoNR83AAABVJJREFUOMtNlVtsVNcVhr+99zlnPL6Mz4wBu1zsEpvB9hjHxLeYEFzapDWkTqNEFFoUhHGLlD60VZuXoEhVeKFBVQtRE1tIEEIkEqnKQxrJiSBxXCfFTl1gggHjxJdxgrGxPXicsWcyMz5n9wFSsaRf618vS1r/w7cE91VzczM9PT3U19V5f/u731fl+fIeUUptKihYscqb7SWVSs0sxuODExMT/z5+7G9Xr1wZTG7fvp2enp7/7xDfmf1t+zn9+mnZ0dlZEwqF2sZGR1r6L/SuXYjFPKsKi0TLzieprtmstdapdDp18040+kE4HH79V+3t4fb2dvfkyZMAKIDW1lbGxyPW8Vde2V39YM1fp6du/fTNU52Bm5EvjcTigpj8OsKVK2GC5ZVizbpiw/JYAZ8vv2HNmjWPtrS0xN46e3a4vr7eGR4eRkkpSCaTxuHDh39ZWlp21OPxPHCu65+M3Bgky+NBKYllmiQTi5iWh811DUghMQwDr9e70h/wb6kKVd3u7Oy4Fo/HXek4Li8cOtRYXFzyojKMIq01y5kUUgo0gAaNRklJOpXCdVw0kEgsMTs7g6t1UUWo8sWXXz7aqLXG2LNnT/6vDx48aJhmGYAQgtCmGsL/7SeTSSGlBC2wPB6qqmtACPo+7eW9d99h9vYU+XaAx36ys2xDsPzg/ra2q+q5536ztbik5A/KUD4lFUIICotWk52TzfTUTRKJJbTrUlPbSOvTu7kxdI1Xjx1lejKCk0kRuzPH4OeXWVlYtKKiMjSg2g4c2Gf7/Ts0Ws3OzjA9NYWQgtCmzVRVb0YAyxmHZ36xj5xcH2+c7GDq5jhZHg9S3c3SWc6glOktr6yKGF6vd2MymTDOf9DFQP8nfJtM4rNtHt7SzPbHfsyuvQeIzt7GX7CS3o8/5PrgZSzTQKMRWqCFRgiBZZlGbp5vo9r77LP7Lg70l5977x20k8aQkEouMXzjKuHLF8nJ8VG2IYgUgnQ6xVJ8gfk7UZzlZQBc7ZLl9fLEz3aJVYXfGzeWFhe/GR2+rpVCGEoBYBgGytAsLUQRaKRUfDURoXTDRsorDnFpoI8Lvd3Mzc3g8+Xzgx+10NC0VX81MRE3ksnkDa83KwPC0mgEAq01rutS17iV2vqHCYcvcqrz75SsL2VH61M0bNlGXeMjJBNLZOfkkJuXTzqdzsRisSG1bVuzLF637vGJyEh+MpFAa43WLqvXFvP07n0IKXn7zVNEZyaZm5lm4LM+5mMLVISqsf0BTNPCdV0SS0uTAwP/Oa5S6dSdlpadpcHy0EOgRW5uHpVVD/LEUz9n9boSPu3tpv+TbkxTYRgKoV3GRoaxAysoLQuitcZxHH1r6tY/Ol597Q3j/PkP438+cuTEtubmLbv2BkNojWlZgCCVThEZ/RKhXQQKNEgpka7D6BdDZB7fgZSC+Dfxoc/6+k90d38UN0xDAVx6raPjpfKKir+YllXspjMoKVFKYdt+EKC1BiFA383Ztv33Tk1OhMOX//T883+8NHDho7u0CQaD+syZM1/U1dWN2fl2mWEYhYAUUmLbfr4eH2MhNo/WLhpN8fcfYMeTz7iO41zr77vw0tnTJ97/4aONyjQNRwFEo1EJeN/v6pqem5sbzMvNdbKysvxKqux82zY2VoTI8+Vh2wEqKjfxUEMT42Oj4lzXu4nI6FAwELB3aa0LhBDXvwOsCRQA+YAFZNfW1q5tamrasH79+hJ/IOCzLIvYfHR5+tZkcnxsJL24MO9YHsu1THPZMNS3Qoh/CSE+Fvd9AOOeFCDvI/r9swss3+vOPS0fO/KC/vzqMFpr/gfBWD3aoENSLwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNjo0NDozMSswMDowMERVxOEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDY6NDQ6MzErMDA6MDA1CHxdAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    PTer: {
      url: "https://pterclub.com",
      host: "pterclub.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACu1BMVEUAAAD////Cl3f/sZv/88f/NgD/z6j/VAD/AAD/++v/NwCGe33/rGgAAAX/6dgABBr/zqgTL1vxCACLblsAAAwAEzYAAgiZgmoCAwX9AAAFBAb7q3IEAAADAgL217wFAAD//////////////f///f////9IPkDRiEj/mTr/lTr/lTr9mz3InGrZlFv9tXP/3r0AAAAkGh27YRL7gBBsUTKpVBb/exP/j0D/xJIAAAE5KiX1ewT5eQLpfhxhSzbOagv/lU3/7dkAAAArIBqFUSWNUh9+TCOtXxv5fgy0aimFTh6OUh6NWzJROCbneA3/gCf/yp0EAAABAAIAABQAABUNDB2YVhz7hiDCpYoAAAAAABIAAAsTFBmlXRv/fBX/vYQbGB+4ZRb/iCT/+eUBDx6PVSH/fhz/wowAAAAwJyP0jjnTuKXvx6kABUtfOybTcBP/hTD/1K0AAAJONCH8fwaPXCikcUz/unz/rnPpjT/dcg7/cQn/lUf///8AABVqQSL5gQ1iSCy1XhL/eAr+cgr+dgf+fSb/zKQAChyFTyHndw9bQi/TbwvrdgrrfC77rXUUFhumXBrFbhBhQCy8bByuYRWxYhiuYBunXh+OXDSai38AAAAsIB+kXQ9dRzqogmIjHRstKCgOFyoAAyAAAAk9KyPShTM1O0gAAAtWOSP+nksAAwxxRyPtcxv7pmwDAgNALB5zRyZnPh2WYzz82LoEAAABAAEAAAUAAAP/dwD/dAH/cwH/cgDTdRX2fAT+eAD/eAD+dwD4eAP0ewX2egT/eQD/bwb9ewH/egD/dAD/fQD/dgD+fgH/dQD/fAD/cwD+fgPUcRP+cwP/ewDpdgr+ewLzeQX+fAD+eQD9bwP7fQT/fwD/fQH+fQT0ewb/fgHBZxP/fgLYcRD/egfufAv+dgznew3ndwb///9+450wAAAAuXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkNDA4HASCOq6ipq2FhZxcCh/r8yuT4vjQVtf7+99b3tRYnq8fCyvH70sLBpNv981gIHBsXafLnTRYYH6n1/HOC/NEhafX3Xw+pui4IB5D+zSYdxv7PwHBdj+36egIw3P3c8Pf2/LIaUO773Pfrlx9y+/Tj9e3hyJdGBwOR87dgNikaBw+xuyEkz4ZA6PVdQ6WmqX0YBw0LDAI5k3AAAAABYktHRAH/Ai3eAAAAB3RJTUUH5QQKBzAvYbh7GgAAAUJJREFUGNNjYMAGGBkVFJWgQFlFlZERJMikpq6hqQUGmto6unr6zCwMDAaGRjt37dq9e/euXXuMTUzNzC1YGRksrfbus7bZf+DgocNHbO3sjx5zcGRjcHJ2cXVzP37Uw9PL28fX78RJ/wB2hsCg4JDQsFOnwyMio6JjYs+cjYvnANllkJB47nxSMicDQ0rqhbNp6VwgwYzMi+cuZWXncOfm5V8+X1DIAxTjLSq+cqKktKy8orLq6oHqmlo+oCB/Xf21Aw2NTc0trddv3GxrFwDpFuzovHW0q7vn9p2793r7+oXAfmKYMPH+uUmTp0ydNn3GzFnCYCGR2XMenHs4d978BQsXLRaFhojYkqWPTjxetlycESmYJFasfHLi6SpJZDEGqdVrnj1fu04aWUxGdv2GjZs2b5FDEZTfum37jtkMBAEAezt4kKiqYGgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDg6NDYrMDA6MDBMncp9AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ4OjQ2KzAwOjAwPcBywQAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    SSD: {
      url: "https://springsunday.net",
      host: "springsunday.net",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBjAw7XIc2AAAA6pJREFUOMt11F+o33UdBvDX8/19f2dtMk87W42tieco889GgQtBAhllobmzLBsUEiyoLrLQiXgT5J0RQU23izQk6sLdhYbbWTIxhtnUvCiqZcPtKDQw286O4M7Ozu/8vu8ufktc4Ac+F++L53m/P5/neT/xf2dyer+mu6jS26o8KD6PFn/Bz+kdZngXBspvZ2ceuAzf+2Cx5SeLlmdfIc2NeCIxGfl15PnwcXyTWod7IvN0L05cv9O5E4ff52g/SHjh6OOkWUX9AFeV3KOGf9T0kSfV8N6oH2IcR6pb1vRWXDbh+4Qbd/1CFhZUsoX6AmbIv6V3vepgWfKsqlvx5f/hOlw9vV/DyqiL7dT0Pui7cGGr5FNRnyg+ivmob0vGVbUYo0LWU+epzzW9Fad1y39vGFJfwb4WG1R3L7Ub8ziiakyyXpo9iQXSqmqLldSakk34ZLidejCsVs6WeqJV3U+jdqnqV/IC3gxV3F7V7SrNgWb+tXe7j91m9und8K+p6f1/HV4xcbh3/uwq1W2P+hF1JT6SqR17z6ZqAio5iT+HncqYOF+8FHmG/L6a5mRqODh1cA+YuvMxMkTuwEPK9zO1Y++BlK+KMdSlG0QVyUgQ3iIvFM/hb2ROvNsOx5eWm3N9ZRKnexOb7/hDcUasCVegjwaRS48f1RPi02FnuHskQt3WZXELhnhdaiFTd+51aY71uAGTiU3YhA1Ghl6L1UYNV6ItJYWkMFfM4MctvpR4+5ajD7x6bPu+t5tmg/rPa6zb2KSMYVWpcbI16roamXp9uFZsHTWttal8Q2xs8F08/vL2R29Ou0p1p2+xdsNkStcNlxa7qrnZQ3tmpXmp0hzHJDVZnKJ5uDihKBXc0ER1KTdF/crye9+h7qO+FgNp+t6cGSmq6Z0zWPgdnsK28HUsYV4iyXzJky164gzey2iH1xSTpf1nkreumX5svrioGyynv3IFOVk1PI5t1OawDs+RXybts20lr5AD0syouga3Rm3GDioli7igXBRXUiewiKERdqbkH3n96LwbP6uV3iM0y1Fder25Gg52UDeVHJFmP915NbJRsaxyVfhecVzVq3hn9tD9o2954zfa2YP3LcG1O/dJk9Swrq6yTWpjqlNpHu0P5s4MxtaIrKbbXUzgYcOld9J+SHxV1WhHiHhaeapSD6nhZwb98WOpbqm4GdfhEZpn9FY4dfD+DyPEcFglz1NvJHWs5AS+hS/WKML+RH4mXqQbzB66PP7hvxsRnTJglc+dAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA2OjQ4OjQ4KzAwOjAwwTRopQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNjo0ODo0OCswMDowMLBp0BkAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.new.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    SoulVoice: {
      url: "https://pt.soulvoice.club",
      host: "soulvoice.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzEdsHQb2wAAA2FJREFUOMut1FuIn9UVBfDf/r7/TKPJSJLGJrWJJo1WMKLgpcSoEYn4oq21gihSCvpii29qC0ZpQSKooeCDLwUvoKDWgigqiBeiBjUVNCApasTMkIpJkwzKjLnM5Vs+/D+pUEtf3LBhwz5ns85eax2+56gtO7oaTVZggOnwVcqM8Mf17Xdeuv/VC9BRg5bueLFIGcH+wcxc5weD5ib8Cp9jomQHXtn6bvd55uP2fvB9r6zXNgNdNz9W1W4gl1JrlVX4JMmtg7GRJpIJah3OLUL9VnkrXbaU2r51R9eZ2iBtK9386mrqjh7AD1F97uy6HGok8B4+wzFM9AcuL/WXyJnD5RTplqr6M27EYvwLX+JIeHMwaOaapCQmsB2jaMg27MU5VXVDKo1mCWzskX2FN3AQJ2C3+EcXmgrV1LTksR7dydRp5DXsJOeLZRa+oNRGfIHnsABn4Wji8ag9Cc1tFzQIjdcj9/bE/Iy6XPJ+4k0MspQk40me7wddiFk8ikcamfvDprc0cNvPW2FO1cPkN3gI46p+Qh2iaUysX4R9qpbiKJ4Jvwt3ah2MDFf9bX3d9/asZF7TjIyoGitaVSvE2Pz0VVPlwOKq+siQySmdo4rbN739H2H/L8Vfc+uoE9f+3uTev5+0csWqJZt/MTmindlzeHrBlyvXHlALDn63U74prtt8CtLQnFJVF+E0HEmy/7jRbttDN9UynEctxwx2hndqduZQjl+oXb6boUS4fvMalbal+WVVPY2HcYs4A4cfearZU2U8jPRk3IWni78aGT275mZ1e1cPB163eY3R0U4ql1TVvTgXB/C88qOqusxkVeIE6ooMey9jHr/GPemcnKL7cPUQ4bGZZnGVm4dy8VmS7Tgbl2L3ow/oovYVh4urw6LIG5jGpuLa6tJY2D+5yrreBdNJ/l1Vl/Ra+zDx4ksfUDGNv+FIcXGp0zN000C5MuXEVAyaZiCZ24BlmKuqdf1X9s/En7pkVyEV1HPFqbgFa2uoRzhD1enY33SZXYjze+YmsQsPJm6UPNuU7qkt49qVEyTTSbYmbsaTvVUncRzOK626/q41Y4mNkhb7sa/PY09uGf8vnc3u/akobc2N4cdiObW8yj7mtw9YNlXlBcUTd7/r/8XIqk+/Kaf6/Pjb/a8BRYVt72oJuZAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NDk6MjkrMDA6MDCTeNgtAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjQ5OjI5KzAwOjAw4iVgkQAAAABJRU5ErkJggg==" /></svg>',
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
    TCCF: {
      url: "https://et8.org",
      host: "et8.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzILb439SQAABFZJREFUOMuV1MlvVVUcB/DvuecO597XN7Slw6ulLdQCEqcAQQZBIzEhLnRDjNFo4tqd/4BxZ3RhjAtNTIzGGAwKYnAgBEVaEgQBGxFf6SvQuX19452Hc+69LupAE2Lgm5ztJ998T/IjPX19qCwuYuSxvXTvtkc3M017RtGNrsB1T0yNX75U6O4Jvv7qS9xtZNdsgUnYKjK5g9eyfU91bnlkqE1W1eXRU4NVR3y0AuvHu9YAyMe/+yH/8TffH8r2D76SFDdunEGezDV5avJMf1QYupRk8vcGakzPFDeO7Bl8YOuwUrwflSszmLi5AGGLWEoldeXEB7kikI+BJAKScPXFCcABWADSNaAfBr5tNhuWaQrFaNHEMTlfmXXjxdI4cWYTaeeTzwZIN1ACoUskLFAaaVQKFQmNqNW4GNSry7KR4TcnSqvg6M9nrXPHjx/d/MTTvay9tKM6US7L1//8SY6DznD744eSLTsG3XwXzUpJmlcIiqqU9ioEGc+0fz/y6bd1x36fZdom/2343ttvxYHrnukc2TqXCUVHbFbohoF1L287+Nx2OrCpr0qY4VEVSBJIaYIMlVCgBKSpZfO9Q/sloh5WmDGJy7+ugrbrAkBj7MhnFw+99jr09f19iqq+sfvhB4fWD2+Sm14AJxLweQJPxFi0AqzUPYS1SAqDuC1OoBDx34zy7YNqjEEIAU1V074Mw3BWQ0sG3CiGGQoEIkG14WN+tgJvatJuVatjYbOyQjXjzmCrZYILkTBNdZyQCzuKZTuMYYUcC3YI0+eYr7qozi+kXulirTlb/nypPD6dK3TcGTQtC0KINNQ0x4+EcHkMlwu0QoFS3cGF8XnM3KjBr4ckpus7IV3f193dWZZY+7QsU9Rr1bWgbdvgnCdM112PC+FEAhU3wpwdIKfKyLQbiAhgOjEkqSOndu98EYQtRxNnj5GcsQwA9HYw19uPwPcNpOn+7Xv2bTLaO43ysoVz11eQzzCougqbx2hYIbgnJMisIFOyjrblWvWF8g2NIFrTMLQtRGGQSLEwzYBHVhijagX4rbQEYZu4b7AHxf4O1JwISwEHdyRCM/275IQ3ugdG5lLKzqxpaBgM3LVkinRwYNvuh8CMrkrDSf+4Nh01pkoWZQq0QlYGU0lLJIhtn4hEh5z4Xboch9RoP7UGlCQJbrMeS7K86Hn+UM20B5uNGmlcHb0a3LryYezWWaSwIjqLChSauj4nSSCgRi5TpGQGStvRNWDo+0iSNAWRXIXpkyEXl9xm7bS3NHPYny2Ncd+dSvW2Dp6SLVFuHfwUJDVdqK05W3OnzyP2T67Z8J/4thmXL4xN4MLYrb8/zgMA1Kt10tFryAnRY54eSFNdUv2ZGnUWTqZe5VhKlITi/xNj9UwBABgQN+duLOjZQkVlTNc1VmeL46fprV8+2XXw+dHzJ78AuZfjmc3lYJkm3nznXbXY29OTb8sMe54/8epLLywTQkApxV987U+PhqXfyQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0xMFQwNzo1MDoxMSswMDowMBODZaMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMTBUMDc6NTA6MTErMDA6MDBi3t0fAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    TJUPT: {
      url: "https://www.tjupt.org",
      host: "tjupt.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(5)",
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
    TLF: {
      url: "https://pt.eastgame.org",
      host: "eastgame.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBzMtpJtJ9QAAArNJREFUOMuVk7+OHEUQh7+q7umZm929s2wJjCAhQESEPAIJgXMewvIrOPSDIJEREPAEZEiIiMTZSZjDt3vr3Z2d/93lYJa7PVsW65J6unvU9fXv19Ut3724dIuZY1E6Ls6UhwvhwcxxMRMezRyfzD2PSsUrNNFY70eW25F1PbJpI3Ub6YbEy8stv/1xhQd+BhCm+K83jkMO37u/drToeK0fkj0ZkxGTMSZjsCnfC6iAYUQz1CCmKVWdkB2aV8gUvAJi+H0TUTEEw1DUKcELmZtsqkybZQp9NKou0vSJYUikmEgpEWNkHEfiMOA3q46uVupSqUqlrh1VM7IsHRelcH4mzAPkqiSMbjTaPtH3I+2YGMbErh5YrmraTY1fX3dkORRnSlEI60KYlcq8cJS5UuSQe6Hwgvc2HYNBNANLiMLrVc3VPxu6N3t8W7fEHmIn9LnS50JfC22uFEHJg5BlQghCnkHmBe8EVRA1khnXr3esrt4QuxafYnyeEKKASCKijCI6kH6QJF+RFDMBBEGnWhsvMyc/iZCGMdE2PV3dYzHe3pLb+PbZ7wDO4Bfv+b4ISsgnpSEoIRO88qvBEyD++PSbe/n+XWAId3t4LxMog5AJwUN2sPuheA9Y5BPQbAKGI2WZV8wS3ZDet/YhYB6OgJmSH2BOYVe1rK53VNsWETkNKGKHHlKM1PuBbT/Q1B03y4r1akfX9Kcr/PfV9nacYqTvBup9S7VtqDY1cejvven/Bf7156ujWQKLmEVICWycHFg6HWgp3gMaCbEExAlkET5GIXoEFHBOcV4AJXYQ+4jFj1Ao7q7KIVfK85zZPGCSaHYN1bqia1vgxCq7oAfrUJ7nfP7FBY8/XeA83CwrLi9hdWO316Y7HWjM5jmfPV7w9ZcPKIPj70WgaRqarkd1Au7eyX8L7wlhtfLjAQYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDc6NTE6NDUrMDA6MDBA7iTqAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA3OjUxOjQ1KzAwOjAwMbOcVgAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
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
    TTG: {
      url: "https://totheglory.im",
      host: "totheglory.im",
      siteType: "TTG",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBi4O+FI+rAAAA/RJREFUOMttlNtuE1cUhr/Z24nH8dg5QYmT0JQUkEgq2psGaNWb9PQSqHd9m74EfYCWqtdFanNRpIa21CGKCAHJiR3jJNgex+OZ2adejOMAYktLMyPNrFnr/9a/vLt37/7w4bWry37Bn0qTxFlrcdbhrMVaSxwndLtd4jjGGIO1FmMMWuvR9eweILd6c3Xly/Wvrlbm5ma01hYHAM45hBA0m00ePvyTw0YTpRXWWpRSaK1RSo3i7Ge58mQwOT83N7uwsDjDO04ulyMolfBECyEEHh5WGqwV2bPn4Xne+fuDKBoM4sikKkF4AilzACiVopSi3T6h0+kQhl200jjnUFpjrXmjSq11VmGn3fFevNjDWcP09CyzsxcBaHdecdio8/z5c/qnPYQQSCnQxgJuqJ1CK41WeiRHrvMq5O9H/9J6ecyNG6vDhI4kiemEIXiSldVVjNZY57DWcdRqUd3a4uQkQqXpCIy1lpxSmiiKiaIBSqkhDI8LF95johCgtUYIOVTIIaVk99kzavv7NOqHpGk6JD9MaK3FOYdzGdnsMygUJpgoFN/FiaOjY1Sa0u120VrhcFhjkVKSe32WzhLioBt2SZOEfN6nXC4D0Ol06PVC9vdrFAoFrl+/hsh5xIOY1ssjTk5Osgpfp5SNgGNnZ5t6vc7iwvusra3hnGNr6z82H/1Fmipu37nN5cuLTEwUOTpu8eC3B/xy/1dyZ+iNMcPWs2g2W+zu7iHFWFa5cxyfHFMsBqytfcTHNz9hbHwM4QkqlQq12j5Siqxl5xxhGLK3t0c+n8day+7uM8JuONLNebCyuoLnPCqVeYrFTN8kSehHfU5PTxkM4iwhQK/XY3t7m1qthtaaWq1GuVxGyoyw53l8sHQF4QnGxsZJkpgn20+oVqu0jo7Y2dkhjpOsZWMMxhh6YY84iUnTlH6/z/j4OJDZSniC/LgPgLWGZrPJz/d/4rBxSDEIKAUBt259mlWYpinCEzjc0BES59zI8G+fJEk4qO/z+J/HfPPt16yvr+P7BcKwew5FCDGifRZxHBNFfdI0QUqJEBIpJVLmKJVKVOYvcXlxgYX5BYKgjDEWuby8/J3v+5estcUkSUaG11qTpintdpunT5+ysbGBMZqpqSmCICCfzzMzM82Fi7NMTk5RLJaywdZae1rr4YY533POOU5PT9na2qJarRJFfQ7qB+T9PJ9/9gXl8iS31u4QxxG+XzhfX9ZaqbX2gDfaNUajVEocJ0RRRBRF/PH7BtPT0wTFIktLVwiCEkFQQmtNq/WSg8YBcmlp6Xvf9y865wpva2iMHblHSkm706HRaBANBiwsViiVJpE5wWAwYPPRJvd+vMf//rPQ9LLrwoAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTBUMDY6NDY6MTQrMDA6MDBQvTwGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEwVDA2OjQ2OjE0KzAwOjAwIeCEugAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#main_table h1~table:first>tbody>tr:nth-child(2)",
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
    UHDBits: {
      url: "https://uhdbits.org",
      host: "uhdbits.org",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxYgELsSrwAABEJJREFUOMtFlE1vXeUVhZ/9fp1zP3x9bcc2TnCCQwIFVIUCA0/opEiIEYNW7RipP6I/pr+AYVVVQkJCKghKFYKliEBCCIkTwHEcfJPre4/PeT92BwZ3S1ta0paewdJaW8796e8fqTF3xZgdEXZw/tuU3eStC4+7v16+pquyTydBAcRGibMRN//Vk/v/bbxIN7JFLir6uyzltULZcoj8xtfVlg/uDYP+nFPZV7F708ff7d2cf3Io7pujeaEDsBV+9nB90Oy/suTN1prx5qw3ds0UWY6xGzWlqRzGjF3wvqq9tSgpa9FSPa0rOwk1U+849oX4C9CFntR17Ydd1V80Po2tFStZUMjSttFhaK0V65213ggWMVqqcfBm7CtwDlwBABvAVxAqS+VrrE9gFRXFRltEpHWiCAgCiChGBSOCtWAtGAdOQQHrwVhBrCBGUCOcXH5ZVXF1cNTBYq1BtWCMMHCWqupjQx9jLKQMAsY6bOjj6gF+1MOGjBhFYyFppswU985rZ1lcWuSbvSO+3v2ZzdWad14/y4C3WdOa4ZOap7c/BWBpa5v+md8zXP8tg/ULLJ5fwQZL6TIPvrjFtfc/xL3wzAJLZ0bsTTtiVvrBcuX8AvOyyqCbEPQamj8DIIwuYOwV6vHLjF9YpOka5s0R/ZURy69usnHvMk7g1IOiiuqJ1hwx1TLDZ7dZO44AjM5tczxZoW0j88mUr/7xCQffPWDjyiXWX3mO5UsbONUTUDn1FYoquTvCjs6ydP49hpf+AoDrDXm4c5/5wWPSFCaf3+fgi9v0msB4ZQVjDU4B7wyDyrHQ8wxqhzGC8YFuNmH/xnUefX8TgOXnXyLOBhjnsc6ysLpEe26dhdVlQq8mNhH3w/5Ttq9s8vqLz/DnN7cYBIOXwpPOUuJdjvc/YO/qPwGoeu/iwx/w/YssXRyz/bc/EqcNvTMjjmZTfvzgU9zVW/s8v7nMq5fXGFihnWau3pswnXdU4TqL0x1Mvo0CzcEOc12jmxWauERvdQEzMLSzQ/au32H3PzdwN/dmvP/vO3z29UN6wdAmZfeJ8py/w8bwY9bct9RjBaA5vMX8wDPZ/ZHm43XcwCBWKF1i+sMBj27s4giBW4eJO9MploKKRaoRG/VdSvmSFB6AP6lenu0SJy3N/cjh7QjSghRISooRjzmJTV17enXAG8gYojhc8LjKYB2nYzy42hDqmt5wiLHhtClt09A1EacKIoI1gjGg+msy5VSj/4eigmAwCEYMGEUsiDEg4FTV5VxMzBktkFTpSqIjEVG6BO2v3yZBPC7ENhK7DqsJyUBSSsoGVedQPcopPY2dHGdKU9QcR5W209J0aNMlujZRAFzBxLb4rkt1jG0/k2qESjL9nFOlqHWiZVdjfNzldI8Yd0vRn5If7bUD96j07MQ75vmYqEAd8GD7KbLYpPlqys2GCOtB/KZSzhfR1f8B1roU+C5nEcAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MjI6MzIrMDA6MDAKmfIIAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjIyOjMyKzAwOjAwe8RKtAAAAABJRU5ErkJggg==" /></svg>',
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
    bB: {
      url: "https://baconbits.org",
      host: "baconbits.org",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC5VBMVEX///9vAAAAAABrAAB5BARsAAB4AgLEzc2/ycmtubnDyMi9w8P///+7d3eZNDSZMzOYMjKhQ0P48vJ6AAB6AAB6AAB6AAB6AACADAxtAACWAAC8AACwAAB5AAB0AQF3AAB6AACAAAB4AgJxAgKUAACjAACFAQF1AgJ4AgJxAgKbAACEBgaJAADwAACbAACNAAB8CQmABweCBgaJAACBAADQAAC8AAB+AACDAADSAACUQ0O+urq/vb3Bw8OriYmVFhaVRUWAAACJAAC6sbHCw8PDx8fDxsbH0dG8uLizlZW6sbGDCQmmenqym5vI2NjEzc3L39+sjIyyoaHI2NjEzc3Ezc3Ezc3Ezc3H09OqhoadY2Oznp7K3d3CyMjCyMjCyMjCyMjCyMjV1dXMzMzd3d29AAC+AAD9AAD/AADjAACZAACAAADEAAD/Bgb+Fxf/Fxf/GBj/EBCMAADJAADaAACBAAD6AAD/NDT/ra3/sLD/r6//tbX/fX39BATxAADyAAD/AQHYAQHYAAD/R0f/l5f/mJj/mZn/f3/rAADXAADZAADzAAD/TU3YaGiBAgKBAQHYRUX/jY3/n5//e3v/enr/eXn/ior/oqL/bm7/aGj/MzP/Rkb/kpLYeXnYgoL/oKD/goL/j4//g4P/sbH/vr7/Nzf/Ojr/PT3/lpb/o6PYVFTYWVn/h4f/lJT/pKT/iIj/gYH/fn7/np7/vb3/vLz/kZHYX1/YV1f/qan/jo7/GRn/ERH/SEj/s7P/hIT/iYn/paXYhYXYhIT/Jib/Dg7/SUn/qqr/mpr/fHz/q6vYJSXYSkr/Nja6AADQAAD+Cwv/Wlr/Zmb/rKz/MDB/AADCEBCQOTmPOjqNPDykKSncAAD/kJD/KSnuAADCERGUOTnRAAC+BgbjAgL3AQH/AgL+AgL3AAC6BgakV1eUFhaLAADGAQH7AACuAACgV1erjY2nRUWiAACiAQGoYmKcYWGcY2P///8ZpM3CAAAAZXRSTlMAAAAAAAAAAAAAAAABAgQEBQMBM6+yuH4CO6j93HIOP4OAAS6n6V9JJS+nIbj++40XHSG74fbw4OH29uHh4On+9vv+uyEdHhZe+LhNza0vARLqpy5cRA5xfr/9qDtZt7KvMwIEAmw4yNkAAAABYktHRACIBR1IAAAAB3RJTUUH5QQMAxcTtnBC+AAAAZNJREFUGNNj4OFh4OXj5xcQFGLggQEgi1FYRFRUTFwCKsjAwMTAwCwpJZ2amiYjK8cCFGZglVdQZFBSVklNz8jIyFRVU9dgY1PS1MrKZtDWycnNy88vKNTVK9I3MDQyLi4pZTAxLSuvqKyqrqmtqzczN7GwbGgsZShtam5pbW1ta2svzOjobOrq7untY+ifMHHS5CmTp06bPmPmrIyMhtlz5vYx9M2bvwCkcuGixUumLF22fMXKVf0M/avXrK2qqlq8bv2GjZuWbN6ydc02oPbtO3buys/fvWfv+vZ9+9ev33DgIFD7oQWHgc7MOHL02ObjU07UnNx4qpSh//SZjrTU1LPnzl+4uP7SyWM1lzuvMJR21V+9dv36jZu3yjL2rL29887de/cZSh88tLK2sbG1s39U9/jJk6fPnjtYMzg6vXB2cXVz9/B8+ep1Rvqbt++8XBi8fXz9/NmZ2AM8At9/+Pjx0+egYH8G/5BQDlBIcoaFR0R++RoVHcPBAAKwwOWKjYtPSOQGhzwiFpKSk5NTgCIAn+ukv+ne1I0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MjM6MTkrMDA6MDClecqxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjIzOjE5KzAwOjAw1CRyDQAAAABJRU5ErkJggg==" /></svg>',
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}",
          order_by: "s4",
          order_way: "desc",
          disablegrouping: 1
        }
      }
    },
    iTS: {
      url: "http://shadowthein.net",
      host: "shadowthein.net",
      siteType: "its",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxcfv8YO0wAABQ5JREFUOMutlF2MVPUZxn//c86cMzOH2ZllZ2YZYIddlv2gyAJiEWK9MKXEQk1TUYGqbaQ3LdoES1pNbFou2qSJadI0XDTWikntRzBpVD6k0hBJU8S1iwou7MCwOw7L7Lq7M+zsfJ3vvxerTZv2ss/Ve/HLm/d9nuSB/7PEXKpTm+hfZ06s+Edzdd6Obr5I/fw2jOQc4b7rcGErSLE1+NXTv61uHlkf6i4QaURZ2H+UWGEVmm3AwDWFE7u+7jxw4i917Ur/qt3Uc4fc0sCpjsrVHefu7T9yx+hoFthf13D7rqFMp3OzTu6Rbz30Kmsb8dhPSxvuO1Ruf+N7bQvcJQX+bCquhuqjw/qR5w5oq/K5+bzSXGcpy1N6S8nMyOmHkSFZU9S+UqdPf93Ft6xB74PUfb3jV6vFjuaW95SLu7e12BBEGPAV0J0q7lxbevdZ/zfa1NLl8zfsZrXRmvzDgpbs7ilUH/3Y8IP2sEKnHeCGw7ieQSqoRYKOFW/WDW90qLzwdKlDk2nLQ0iQIiCkiZCRQtOu3tVstoyhCcVLfzL84chaoyxZ3rKU/oZNMwKGDVpIRzYS8vUd6XQmNyajcw1Cniqk8PAVUAQ4ARTHQdvx2lT7hYw/dGvVmqC7Xlo/ZnjcE4D0QbdBCh+BT6RmBFtyf+03q3K9p4AbAtUDXwdfBflZykpuaHPvkrmqLqYLqt50ZO/8Am4koBiDyRh4IXClpLHSxZExpKWBhIgFjgFhCzQHVBfiAtTeR7ZXJmYraxur7+yyPdcpWCSy4CWFo4a9xXemTBNscamcHDjzTuCnroUjbRnctnDgC1dfvPR6IuFYyTv+qDz20hvF7xTLr6y5Pb5ma/Pj7sEus1Fvz0ybDQi7ix5aBKi11gE/0uw6WCjsXdj25V3pOlckoHngK1AP6aXKxtCU1nO7wkgmmWzNVOz5+lK77DbjCTVu2gbYOpgWVIhKA5GYjJl7FSnPBkIft3W31lRA+OD7UBDOjRdnsuNaAJSz2cCLBd6oHvHFzSJh6QuzsWi02oT8uvhkd8vMRwjtOvm1L506d8/g7NDlfEr1W/gq1FSFmY4Om1uPo/38wFMIX/1z4BcyD57/4FBbpURD1WlFQAC5lEHeajsTbN76fNtM/idD71/dV2WBmgpRINqCtxOdVPX06Ydv9vlKvbeHt/bvW9g4p32UKs97qqviSQPVB9WC4UjaHlm54k3riYeKG2/X87rXQOKB9ACYDcP5ZHuxNtjzd/Xe7ajHLl9m03sj38gWLx017PISXw+IeQ6ocNFYwvGevrPBzu2/fuLIC7/MFke/b1h1ITXQFIg6cNzsdM4tjR8+eez4qeErOZQVpZIiBXuXTU2ZIU9iuLCkKckpCke7+kanB1LP3S1NNTl7e/uy6YqCANODRA1eb0vwau/gyWDNht9/89Fvy+d/+CwaIDxNM/FASLBROd0e9c90rr70/qah7z7QcP7pes5KgUQBhCuouAqvrEw4b6cHTl784qYnzWJm/m/HngFAk0L4p7bc/eE7RvSrk5GQHDaXjY0vjb+s79z5p7Gx0Zt7+7+Ap6rudEivzWkRzkVizkSm492Psl0vZHfcf+LOWm3+rc+WAWg/3rMHRSgv30olqo2wcsONLx9+8KXfFScvvCtPAxw+zM8OHvzE2rPnR1OJeP98Mn49RPL8yLEXK18R+/gFP/jPxpZS/msGpBDiv2r935hF8H8wn+tTfi1WST2Ov5MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MjM6MzErMDA6MDDUs4OrAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjIzOjMxKzAwOjAwpe47FwAAAABJRU5ErkJggg==" /></svg>',
      asSource: false,
      asTarget: false,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        params: {
          incldead: 1,
          search: "{imdb}",
          search_in: "names",
          sort: 5,
          type: "desc"
        }
      }
    },
    "nzb.in": {
      url: "https://nzbs.in",
      host: "nzbs.in",
      siteType: "nzb",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QATwB9ALSzxfhxAAAAB3RJTUUH5QQMAx4c9w3kIAAAA6xJREFUOMt1lM9rVFcUxz/nvDszieOYMUrGxAR/RU0VreBCUFIo7UIRUqEroUJLVyJ02x9QaKHrLtq/oKUUpKvSdV0VoRulBEG0JJpR44+aTExiMvPuPaeLN5lQ2x54D+65j885993v+crZz645/4ju0gUnQ9SpkHCB3DLMQTAQB4TivRnhXzDf3DaLHB6pcumtfYgIP/x6j9tzy2gmuNOD8r/ALs9RUkqc2Fdj6tQog+M7cHHezSO/XH/A9OwLyDJwR16Bhk2WI9284hwcrTJ1apTjxxt81emwps7nx3YylSDv3Ofu43VS7wcVUAG0B3PBXcgEdg2U+PDsOG+cGOZ5jDQ9Z94TC9GYPN7g/XMHGa4HsgzEpfsUWMWLAgJkRBp14eOLRzi6t455YixkvBeUDzTjoAZM4OieOh9fPMbueongEe0d2VEXBxGiJQ4M93PlwhH276pRDoqIUBI4Hyqcz8pk4kWulLGnsZXL70ywf2QL0SJO0WIIYiQpcWhvjbdf38nE2CC5wbV7OQ9XjLGqMDlWwgWuz0XmVpzRmjM5Eji8ZzvnTo9RuvGMO3OriIBcvnrPV2NgohE4s7ePTJU7C86NVomyRE7WE2utZRZXE82lyFJHKKVF1m/+xMulBXB43mrzvNVBRAhP/rxBa1XJZw2ZEYI4TR/gafU1tvc7z1S4df8FFRfWOhGLQifvMHv/MU8ePcQMREGl0Ka8+dGPLgJu4BF2bqvwyaWTfDc/xPXH4O40thpfninz/bTx2wPh9AhcmVjn66u3eLq0hoj0pBMqtRHEQUjgTq3ex67hBvZXiRUvdDW/bnz7B8wsBVZESJlTq1aIrrSjdIHFTQfFMTXcHHMnOkR3zCF1P3uZC7/PG6iCFrmeiHFMQLsWEBbtNn1a5VA2jmrGYKmfIMpudY5oQivGtpoytyDUvMPDFBBXRKAeKvSFosKGEtU1kHmZdjTWUyK5kQHJnVUzDg8KX5wOTGw3TIr8RrQt8TLltGOkHXPaMUfrNk7wBo/IabLGI1smx5g3ZSaVaXnG8Bbn08nAYCOw7IrjGLBiOQ+8TVPWadKmSZuAOI6jruCyOUTuuAnujgoM90MVw5KSKG5VETIE9WLaem4jPccohrqkwtSBjKODcGAAgijgXNgPx3Yo+waUssRNrxHpWe0rBiu0c2N6ZpGhWomhLSC5cPNusTckzlDVsQjTsx3aeexZ3n8arIjSWja++fk2Ilb07pvFpGt1LoAX4A3xbMTfU7u3vspnhj4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MzA6MjcrMDA6MDBRcNLMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjMwOjI3KzAwOjAwIC1qcAAAAABJRU5ErkJggg==" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}",
        params: {
          t: -1,
          ob: "size_desc"
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
    var _a, _b;
    const {description, title, subtitle, doubanInfo} = torrentInfo;
    const movieGenre = (_b = (_a = (description + doubanInfo).match(/(类\s+别)\s+(.+)?/)) == null ? void 0 : _a[2]) != null ? _b : "";
    if (category === "movie") {
      if (movieGenre.match(/动画/)) {
        category = "cartoon";
      } else if (movieGenre.match(/纪录/)) {
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
    } else if (width && height) {
      return `${width}x${height}`;
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
          case "SCRIPT": {
            return "";
          }
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
            const {className} = node;
            if (className === "codemain") {
              if (node.firstChild && node.firstChild.tagName === "PRE") {
                pp("");
                break;
              } else {
                pp("\n[quote]", "[/quote]");
                break;
              }
            } else if (className === "hidden" && CURRENT_SITE_NAME === "HDT") {
              pp("\n[quote]", "[/quote]");
              break;
            } else if (className.match("spoiler") && CURRENT_SITE_NAME === "KG") {
              if (className === "spoiler-content") {
                pp("\n[quote]", "[/quote]");
              } else if (className === "spoiler-header") {
                return "";
              }
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
            pp("[quote]", "[/quote]");
            break;
          }
          case "CENTER": {
            pp("[center]", "[/center]");
            break;
          }
          case "TD": {
            if (CURRENT_SITE_NAME.match(/TTG|HDBits|KG/) || CURRENT_SITE_NAME === "HDT") {
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
            } else if (src && !src.match(/ico_\w+.gif|jinzhuan|thumbsup|kralimarko/)) {
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
              if (href.match(/javascript:void/) || textContent === "show" && CURRENT_SITE_NAME === "HDT") {
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
        if (node.textContent.trim().match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\])/)) {
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
      bdInfo = (_b = (_a = bbcode.match(/Disc\s+(Info|Title|Label)[^[]+/i)) == null ? void 0 : _a[0]) != null ? _b : "";
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
  var replaceRegSymbols = (string) => {
    return string.replace(/([*.?+$^[\](){}|\\/])/g, "\\$1");
  };

  // src/target.js
  var fillTargetForm = (info) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
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
          description = doubanInfo + "\n" + description;
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
      let poster = "";
      const doubanPosterImage = (info.description + info.doubanInfo).match(/\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/);
      if (doubanPosterImage && doubanPosterImage[1]) {
        poster = doubanPosterImage[1];
      } else {
        poster = (_d = (_c = description.match(/\[img\](.+?)\[\/img\]/)) == null ? void 0 : _c[1]) != null ? _d : "";
      }
      if (poster) {
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
            return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
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
      const image = (_f = (_e = info.description.match(/\[img\](.+?)\[\/img\]/)) == null ? void 0 : _e[1]) != null ? _f : "";
      $(CURRENT_SITE_INFO.image.selector).val(image);
    }
    if (CURRENT_SITE_NAME.match(/HDHome|PTHome|SoulVoice|1PTBA/i)) {
      setTimeout(() => {
        const event = new Event("change");
        document.querySelector(CURRENT_SITE_INFO.category.selector).dispatchEvent(event);
      }, 500);
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
    if (CURRENT_SITE_NAME.match(/PTHome|HDSky|LemonHD|1PTBA/i)) {
      if (info.tags.DIY) {
        let categoryValue = "";
        if (CURRENT_SITE_NAME === "PTHome") {
          categoryValue = info.videoType === "bluray" ? "14" : "13";
        } else if (CURRENT_SITE_NAME === "HDSky") {
          categoryValue = info.videoType === "bluray" ? "12" : "14";
        } else if (CURRENT_SITE_NAME === "LemonHD") {
          $('select[name="tag_diy"]').val("yes");
          return;
        } else if (CURRENT_SITE_NAME === "1PTBA") {
          categoryValue = info.videoType === "bluray" ? "1" : "4";
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
      const season = (_h = (_g = info.title.match(/S0?(\d{1,2})/i)) == null ? void 0 : _g[1]) != null ? _h : 1;
      const episode = (_j = (_i = info.title.match(/EP?0?(\d{1,3})/i)) == null ? void 0 : _i[1]) != null ? _j : 0;
      $("#season_number").val(season);
      $("#episode_number").val(episode);
    }
    if (CURRENT_SITE_NAME === "HDRoute") {
      const {description: description2, doubanInfo} = info;
      const fullDescription = description2 + doubanInfo;
      const imdbRank = (_l = (_k = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)) == null ? void 0 : _k[1]) != null ? _l : "";
      $("#upload-imdb").val(imdbRank);
      const originalName = (_n = (_m = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _m[2]) != null ? _n : "";
      const translateName = (_r = (_q = (_p = (_o = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _o[2]) == null ? void 0 : _p.split("/")) == null ? void 0 : _q[0]) != null ? _r : "";
      const summary = (_v = (_u = (_t = (_s = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)) == null ? void 0 : _s[2]) == null ? void 0 : _t.split("/")) == null ? void 0 : _u[0]) != null ? _v : "";
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
      if (imdbId) {
        $(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${imdbId}/`);
      }
    }
    if (CURRENT_SITE_NAME === "Pter") {
      const language = (_x = (_w = info.description.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _w[2]) != null ? _x : "";
      if (!language.match(/英语/) && info.area === "EU") {
        $(CURRENT_SITE_INFO.area.selector).val("8");
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
    let thanksQuote = `\u8F6C\u81EA[b]${info.sourceSite}[/b]\uFF0C\u611F\u8C22\u539F\u53D1\u5E03\u8005\uFF01`;
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
    const reg = new RegExp("\\[(\\w+)(?:=(?:\\w|\\s)+)?\\]\\s*\\[\\/(\\w+)\\]", "g");
    if (description.match(reg)) {
      description = description.replace(reg, function(match, p1, p2) {
        if (p1 === p2) {
          return "";
        }
      });
      return filterEmptyTags(description);
    } else {
      return description;
    }
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
    const mediaInfoArray = [];
    torrentDom.find(".mediainfo.mediainfo--in-release-description").next("blockquote").each(function() {
      const textContent = $(this).text();
      if (textContent.match(/(Codec\s*ID)|mpls/i)) {
        mediaInfoArray.push(textContent);
      }
    });
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.movieAkaName = movieAkaName;
    TORRENT_INFO.imdbUrl = (_c = (_b = $("#imdb-title-link")) == null ? void 0 : _b.attr("href")) != null ? _c : "";
    TORRENT_INFO.year = $(".page__title").text().match(/\[(\d+)\]/)[2];
    const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`);
    TORRENT_INFO.category = getPTPType();
    const screenshots = getPTPImage(torrentDom);
    getDescription(torrentId).then((res) => {
      const descriptionData = formatDescriptionData(res, screenshots, mediaInfoArray);
      TORRENT_INFO.description = descriptionData;
      const infoArray = torrentHeaderDom.find("#PermaLinkedTorrentToggler").text().replace(/ /g, "").split("/");
      const [codes, container, source, ...otherInfo] = infoArray;
      const isRemux = otherInfo.includes("Remux");
      TORRENT_INFO.videoType = source === "WEB" ? "web" : getVideoType(container, isRemux, codes, source);
      const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
      const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo(descriptionData);
      const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
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
      console.log(TORRENT_INFO);
    });
    let country = [];
    const matchArray = $("#movieinfo div").text().match(/Country:\s+([^\n]+)/);
    if (matchArray && matchArray.length > 0) {
      country = matchArray == null ? void 0 : matchArray[1].replace(/(,)\s+/g, "$1").split(",");
    }
    TORRENT_INFO.area = getAreaCode(country == null ? void 0 : country[0]);
    return TORRENT_INFO;
  };
  var getBDInfoOrMediaInfo = (bbcode) => {
    const quoteList = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g) || [];
    let bdinfo = "";
    let mediaInfo = "";
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = quoteList[i].replace(/\[\/?quote\]/g, "");
      if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
        bdinfo += quoteContent;
      }
      if (quoteContent.match(/Unique ID/i)) {
        mediaInfo += quoteContent;
      }
    }
    return {
      bdinfo,
      mediaInfo
    };
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
    const imgList = [];
    const torrentInfoPanel = $(".movie-page__torrent__panel");
    const imageDom = torrentInfoPanel.find(".bbcode__image");
    for (let i = 0; i < imageDom.length; i++) {
      imgList.push(imageDom[i].getAttribute("src"));
    }
    return imgList;
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
  var getDescription = (id) => {
    return new Promise((resolve, reject) => {
      try {
        GM_xmlhttpRequest({
          method: "GET",
          url: `https://passthepopcorn.me/torrents.php?action=get_description&id=${id}`,
          onload(res) {
            const data = res.responseText;
            if (data) {
              const element = document.createElement("span");
              element.innerHTML = data;
              resolve(element.innerText || element.textContent);
            }
          }
        });
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  };
  var formatDescriptionData = (data, screenshots, mediaInfoArray) => {
    let descriptionData = data.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n");
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(new RegExp(screenshot, "g"), `[img]${screenshot}[/img]`);
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?mediainfo\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, function(match, p1, p2) {
      const slash = p1 || "";
      return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\s)+?)\[\/align\]/g, "[$2]$3[/$2]");
    const comparisonArray = descriptionData.match(/\[comparison=(?:.+?)\]((.|\n|\s)+?)\[\/comparison\]/g) || [];
    let comparisonImgArray = [];
    comparisonArray.forEach((item) => {
      comparisonImgArray = comparisonImgArray.concat(item.replace(/\[\/?comparison(=(.+?))?\]/g, "").split(/[ \r\n]/));
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
    });
    const comparisonImgs = [];
    [...new Set(comparisonImgArray)].forEach((item) => {
      const formatImg = item.replace(/\s*/g, "");
      if (item.match(/^https?.+/)) {
        comparisonImgs.push(formatImg);
        descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item}`, "gi"), `[img]${formatImg}[/img]`);
      } else if (item.match(/^\[img\]/i)) {
        comparisonImgs.push(formatImg.replace(/\[\/?img\]/g, ""));
      }
    });
    TORRENT_INFO.comparisonImgs = comparisonImgs;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/g, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/g, "");
    mediaInfoArray.forEach((mediaInfo) => {
      const regStr = new RegExp(`\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo)}`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(mediaInfo, `[quote]${mediaInfo}[/quote]`);
      }
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = $("#synopsis").text() + "\n" + descriptionData;
    }
    return descriptionData;
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
      const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo2(bbCodes);
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
  var getBDInfoOrMediaInfo2 = (bbcode) => {
    const quoteList = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g) || [];
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
      siteImdbUrl = $("#kimdb .imdbwp__link").attr("href");
      TORRENT_INFO.doubanUrl = $("#kdouban .imdbwp__link").attr("href");
      const element = document.createElement("div");
      $(element).html($("#outer td").has("#kdescr").html());
      descriptionBBCode = getFilterBBCode(element);
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
    const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo3(descriptionBBCode);
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
  var getBDInfoOrMediaInfo3 = (bbcode) => {
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

  // src/source/hdt.js
  var hdt_default = () => {
    var _a, _b, _c, _d, _e;
    const title = document.title.replace(/HD-Torrents.org\s*-/ig, "").trim();
    const imdbInfoDom = $("#IMDBDetailsInfoHideShowTR .imdbnew2");
    const imdbUlrDom = imdbInfoDom.find(">a");
    const imdbUrl = imdbUlrDom.attr("href");
    const movieName = imdbUlrDom.text();
    const year = (_b = (_a = imdbInfoDom.text().match(/Year:\s*(\d{4})/)) == null ? void 0 : _a[1]) != null ? _b : "";
    const country = (_d = (_c = imdbInfoDom.text().match(/Country:\s*([^\n]+)/)) == null ? void 0 : _c[1]) != null ? _d : "";
    const {Category, Size, Genre} = getBasicInfo4();
    let tags = getTagsFromSubtitle(title);
    let category = Category.toLowerCase().split(/\s|\//)[0];
    category = Genre.match(/Animation/i) ? "cartoon" : category;
    const videoType = getVideoType6(Category, title);
    const source = getSourceFromTitle(title);
    let resolution = (_e = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _e[0];
    if (!resolution && resolution.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const descriptionDom = $("#technicalInfoHideShowTR");
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    descriptionBBCode = descriptionBBCode.replace(/\[center\]((?:.|\n)+?)\[\/center\]/g, (match, p1) => {
      if (p1.match(/(keep seeding)|(spank your ass)/)) {
        return "";
      } else {
        return match;
      }
    });
    const isBluray = videoType.match(/bluray/i);
    const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo4(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : TORRENT_INFO.mediaInfo || mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const {videoCodec, audioCodec, resolution: mediaResolution, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
      if (videoCodec !== "" && audioCodec !== "" && resolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution;
        tags = __assign(__assign({}, tags), mediaTags);
      }
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.source = source;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  };
  var getBasicInfo4 = () => {
    const basicInfo = {};
    $(".detailsleft").each((index, element) => {
      const key = $(element).text().replace(/:/g, "").trim();
      const value = $(element).next("td").text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  var getBDInfoOrMediaInfo4 = (bbcode) => {
    var _a;
    const quoteList = (_a = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g)) != null ? _a : [];
    let bdinfo = "";
    let mediaInfo = "";
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = quoteList[i].replace(/\[\/?quote\]/g, "");
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
  var getVideoType6 = (type, title) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/UHD\/Blu-Ray/i)) {
      return "uhdbluray";
    } else if (type.match(/Blu-Ray/i)) {
      return "bluray";
    }
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/kg.js
  var kg_default = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const {InternetLink, Year, Type, Genres, Source, Size, Filename = "", RipSpecs = "", Subtitles, "Language(s)": language} = getBasicInfo5();
    const torrentFileDom = getBasicInfoDom("Download").find("a.index");
    const torrentFileName = torrentFileDom.text().replace(/\.torrent$/, "");
    const fileName = Filename.replace(/\.\w+$/, "");
    const title = formatTorrentTitle(fileName || torrentFileName);
    const imdbUrl = InternetLink.match(/imdb/) ? InternetLink : "";
    const [movieName, movieAkaName = ""] = (_a = $(".outer h1").text().split("- ")) == null ? void 0 : _a[1].replace(/\(\d+\)/, "").trim().split(/AKA/i);
    const country = $(".outer h1 img").attr("alt");
    const year = Year;
    const size = (_b = Size.match(/\((.+?)\)/)) == null ? void 0 : _b[1].replace(/,|(bytes)/g, "");
    let tags = getTagsFromSubtitle(title);
    if (Subtitles.match(/Chinese/i)) {
      tags.chineseSubtitle = true;
    }
    if (language.match(/Chinese|Mandarin/i)) {
      tags.chineseAudio = true;
    }
    if (language.match(/Cantonese/)) {
      tags.cantoneseAudio = true;
    }
    let category = Type.toLowerCase();
    category = Genres.match(/Animation/i) ? "cartoon" : category;
    const mediaInfo = $("div.mediainfo").text();
    let source = Source.replace(/-/g, "").toLowerCase();
    if (source === "tv") {
      source = "hdtv";
    }
    let genreVideoType = (_e = (_d = (_c = getBasicInfoDom("Genres").find("tr td>img").attr("src")) == null ? void 0 : _c.match(/genreimages\/(\w+)\.\w+/)) == null ? void 0 : _d[1]) != null ? _e : "";
    genreVideoType = RipSpecs.match(/DVD\sFormat/) ? "dvdr" : genreVideoType;
    const videoType = getVideoType7(title, source, genreVideoType, !!mediaInfo);
    let resolution = (_g = (_f = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _f[0]) != null ? _g : "";
    if (!resolution && resolution.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    if (genreVideoType === "dvdr" && RipSpecs) {
      TORRENT_INFO.videoCodec = "mepg2";
      const audioCodec = (_i = (_h = RipSpecs.match(/DVD\sAudio:(.+)/)) == null ? void 0 : _h[1]) != null ? _i : "";
      TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec);
      resolution = "480p";
    }
    const descriptionDom = getBasicInfoDom("Description");
    let descriptionBBCode = getFilterBBCode(descriptionDom.find("article")[0]);
    descriptionBBCode = descriptionBBCode.replace(/(.|\n)+?_{5,}/g, "");
    const isBluray = videoType.match(/bluray/i);
    const {bdinfo} = getBDInfoOrMediaInfo5(descriptionBBCode);
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    if (mediaInfoOrBDInfo) {
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const {videoCodec, audioCodec, resolution: mediaResolution, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
      if (videoCodec !== "" && audioCodec !== "" && mediaResolution !== "") {
        TORRENT_INFO.videoCodec = videoCodec;
        TORRENT_INFO.audioCodec = audioCodec;
        resolution = mediaResolution;
        tags = __assign(__assign({}, tags), mediaTags);
      }
    }
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName.trim();
    TORRENT_INFO.movieAkaName = movieAkaName.trim();
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = size;
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  };
  var getBasicInfo5 = () => {
    const basicInfo = {};
    $(".outer h1~table:first>tbody>tr").each((index, element) => {
      const key = $(element).find("td.heading").text().replace(/\s/g, "");
      const value = $(element).find("td.heading").next("td").text();
      if (value) {
        basicInfo[key] = value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  var getBDInfoOrMediaInfo5 = (bbcode) => {
    var _a;
    const quoteList = (_a = bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g)) != null ? _a : [];
    let bdinfo = "";
    let mediaInfo = "";
    for (let i = 0; i < quoteList.length; i++) {
      const quoteContent = quoteList[i].replace(/\[\/?quote\]/g, "");
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
  var getVideoType7 = (title, source, genreVideoType, hasMediainfo) => {
    if (source) {
      if (source === "bluray") {
        const blurayFlag = genreVideoType === "bluray" || !hasMediainfo;
        return blurayFlag ? "bluray" : "encode";
      } else if (source === "dvd") {
        const dvdFlag = genreVideoType === "dvdr" || !hasMediainfo;
        return dvdFlag ? "dvd" : "dvdrip";
      } else {
        return source;
      }
    }
    if (title.match(/Remux/i)) {
      return "remux";
    } else if (title.match(/UHD/i) && title.match(/Blu-Ray/i)) {
      return "uhdbluray";
    } else if (title.match(/Blu-Ray/i)) {
      return "bluray";
    } else if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };
  var getBasicInfoDom = (key) => {
    return $(`.outer h1~table:first>tbody>tr td:contains(${key})`).next("td");
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
  } else if (CURRENT_SITE_NAME === "HDT") {
    getTorrentInfo = hdt_default;
  } else if (CURRENT_SITE_NAME === "KG") {
    getTorrentInfo = kg_default;
  }
  var source_default = getTorrentInfo;

  // src/style.js
  var style_default = GM_addStyle(`
td.title-td{
  min-width: 80px;
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
  animation: 3s linear rotate infinite;
}
@keyframes rotate {
  from {transform: rotate(0deg)}
  to   {transform: rotate(360deg) }
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
.easy-seed-setting-panel .panel-content-wrap{
  margin-top: 200px;
  max-width: 800px;
  box-sizing: border-box;
  margin: 50px auto;
  border-radius: 8px;
  background: #fff;
  position: relative;
  text-align:center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  padding: 20px 10px 10px 20px;
}
.easy-seed-setting-panel .panel-content{
  height: 500px;
  overflow-y: auto;
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
  margin-bottom: 10px;
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
    const siteFaviconClosed = GM_getValue("easy-seed.site-favicon-closed") === void 0 ? "" : GM_getValue("easy-seed.site-favicon-closed");
    const siteKeys = Object.keys(PT_SITE).sort();
    const siteList = siteKeys.map((siteName, index) => {
      const {url, uploadPath} = PT_SITE[siteName];
      const favIcon = siteFaviconClosed === "" && PT_SITE[siteName].icon ? PT_SITE[siteName].icon : "";
      if (PT_SITE[siteName].asTarget) {
        if (targetSitesEnabled.length === 0 || targetSitesEnabled.includes(siteName)) {
          return `<li>
        <a href="javascript:void(0);" data-link="${url}${uploadPath}#torrentInfo=null">${favIcon} ${siteName} </a>
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
    const siteFaviconClosed = GM_getValue("easy-seed.site-favicon-closed") === void 0 ? "" : GM_getValue("easy-seed.site-favicon-closed");
    const searchList = Object.keys(PT_SITE).sort().map((siteName) => {
      const siteInfo = PT_SITE[siteName];
      if (siteInfo.search) {
        const searchConfig = siteInfo.search;
        const {params, imdbOptionKey, nameOptionKey, path, replaceKey} = searchConfig;
        let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
        let searchKeyWord = "";
        const {movieAkaName, movieName} = TORRENT_INFO;
        if (imdbId && !siteName.match(/nzb|HDF|bB/)) {
          if (replaceKey) {
            searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
          } else {
            searchKeyWord = imdbId;
          }
        } else {
          searchKeyWord = movieAkaName || movieName;
          imdbId = "";
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
          const favIcon = siteFaviconClosed === "" && PT_SITE[siteName].icon ? PT_SITE[siteName].icon : "";
          return `<li><a href="${url}" target="_blank">${favIcon} ${siteName}</a> <span>|</span></li>`;
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
    const siteFaviconClosed = GM_getValue("easy-seed.site-favicon-closed") === void 0 ? "" : GM_getValue("easy-seed.site-favicon-closed");
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
    <div class="panel-content-wrap">
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
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="site-favicon-closed" type="checkbox" ${siteFaviconClosed}/>\u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A</label>
        </section>
      </div>
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
    const siteFaviconEnabled = $("input[name='site-favicon-closed']").attr("checked") || "";
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
      GM_setValue("easy-seed.site-favicon-closed", siteFaviconEnabled);
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
    const imgList = [...new Set(allImgs)];
    if (imgList.length < 1) {
      throw new Error("\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25");
    }
    const isNSFW = $("#nsfw").is(":checked");
    statusDom.text("\u8F6C\u6362\u4E2D...");
    $("#img-transfer").attr("disabled", true).addClass("is-disabled");
    transferImgs(imgList.join("\n"), isNSFW).then((data) => {
      if (data.length) {
        const thumbnailImgs = data.map((imgData) => {
          return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
        });
        TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
        let {description} = TORRENT_INFO;
        imgList.forEach((img, index) => {
          if (description.includes(img)) {
            description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]`, "ig"), thumbnailImgs[index]);
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
    const doubanLink = $(".page__title>a").attr("href") || TORRENT_INFO.doubanUrl;
    statusDom.text("\u83B7\u53D6\u4E2D...");
    if (doubanLink && doubanLink.match("movie.douban.com")) {
      TORRENT_INFO.doubanUrl = doubanLink;
      getDoubanData();
      return false;
    }
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
    const category = TORRENT_INFO.category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
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
    const searchListDom = `<td class="rowhead nowrap title-td detailsleft">
  <h4>\u5FEB\u901F\u68C0\u7D22</h4>
  </td>
  <td class="rowfollow detailshash"> 
  <ul class="search-list ">
    ${searchList.join("")}
  </ul>
  </td>`;
    const easySeedTitleDom = `
  <h4>\u4E00\u952E\u8F6C\u79CD <span id="easy-seed-setting" class="easy-seed-setting-btn">
  <svg t="1616602641809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1165" width="32" height="32"><path d="M636.2112 847.7696c5.7344-42.5472 39.8848-76.7488 82.432-82.3808 20.1216-2.6624 39.2192 0.8704 55.6544 9.0112 32.5632 16.0768 72.3456 4.864 92.3136-25.3952 8.1408-12.3392 15.5648-25.1392 22.2208-38.4 16.6912-33.1264 4.8128-72.8064-25.7536-93.8496-1.4336-0.9728-2.816-1.9968-4.1984-3.072-34.2016-26.2656-46.848-73.216-30.2592-113.0496 7.7312-18.6368 20.3264-33.28 35.4816-43.4176 30.3104-20.2752 40.704-60.4672 24.2176-92.9792a383.37536 383.37536 0 0 0-19.3024-33.7408c-20.224-31.5392-60.4672-42.1376-94.5152-26.4192-1.536 0.7168-3.1232 1.3824-4.7616 2.048-39.936 15.9744-86.6304 2.9696-112.4864-31.4368-12.0832-16.0768-18.3296-34.304-19.4048-52.4288-2.1504-36.5056-31.6928-65.6896-68.1472-67.9936a388.59776 388.59776 0 0 0-47.9744-0.0512c-36.9152 2.2528-65.1776 32.2048-68.2496 69.0688-0.1536 1.6896-0.3072 3.3792-0.5632 5.0688-5.7344 42.3936-39.7312 76.4416-82.0736 82.2272-20.0192 2.7136-39.0656-0.7168-55.4496-8.704-32.5632-15.8208-72.192-4.5056-92.0064 25.7536a386.85184 386.85184 0 0 0-22.1696 38.5024c-16.5376 32.9728-4.864 72.3968 25.3952 93.5424 1.3824 0.9728 2.7648 1.9968 4.096 3.0208 33.6896 26.112 46.1312 72.3968 30.1056 111.872-7.6288 18.7904-20.1728 33.6384-35.3792 43.9296-29.952 20.2752-39.8848 60.2112-23.6032 92.4672 5.9392 11.7248 12.3904 23.0912 19.456 34.0992 20.0704 31.3856 59.9552 42.0352 93.9008 26.624 1.536-0.7168 3.1232-1.3824 4.7104-1.9968 39.68-15.6672 85.8624-2.7648 111.6672 31.232 12.288 16.2304 18.6368 34.6112 19.712 52.9408 2.0992 36.352 31.744 65.2288 68.096 67.6864 8.6016 0.5632 17.2544 0.8704 25.9584 0.8704 7.4752 0 14.8992-0.2048 22.3232-0.6656 36.8128-2.1504 65.024-32.1024 68.096-68.864 0.0512-1.6896 0.256-3.4304 0.4608-5.12z" fill="#FFF7E6" p-id="1166"></path><path d="M515.7888 514.816m-127.7952 0a127.7952 127.7952 0 1 0 255.5904 0 127.7952 127.7952 0 1 0-255.5904 0Z" fill="#FD973F" p-id="1167"></path><path d="M515.7888 668.2112c-84.5824 0-153.3952-68.8128-153.3952-153.3952 0-84.5824 68.8128-153.3952 153.3952-153.3952s153.3952 68.8128 153.3952 153.3952c-0.0512 84.5824-68.8128 153.3952-153.3952 153.3952z m0-255.5392c-56.32 0-102.1952 45.824-102.1952 102.1952s45.824 102.1952 102.1952 102.1952 102.1952-45.824 102.1952-102.1952-45.8752-102.1952-102.1952-102.1952zM886.1696 437.1968c-6.0416 0-12.0832-2.0992-16.9472-6.4a25.6 25.6 0 0 1-2.2016-36.1472c14.8992-16.8448 18.0736-41.5744 7.936-61.5424a388.5568 388.5568 0 0 0-20.224-35.328c-12.4416-19.4048-35.5328-29.0304-58.7776-24.576a25.60512 25.60512 0 0 1-29.952-20.3264 25.60512 25.60512 0 0 1 20.3264-29.952c43.9808-8.3968 87.7056 10.0864 111.5136 47.2064 8.2432 12.8 15.9232 26.2144 22.784 39.8336 19.5584 38.5536 13.4144 86.2208-15.2576 118.6304-5.12 5.6832-12.1344 8.6016-19.2 8.6016z" fill="#44454A" p-id="1168"></path><path d="M515.7888 968.448c-10.1888 0-20.48-0.3584-30.6176-1.024-53.7088-3.6352-96.5632-46.3872-99.6352-99.4304-0.9216-16.1792-6.7584-31.6928-16.7936-44.9536-21.9136-28.8768-60.7744-39.7312-94.5152-26.4192-1.3824 0.512-2.7136 1.0752-3.9936 1.6896-50.1248 22.784-107.6224 6.2976-136.704-39.1168a459.9552 459.9552 0 0 1-22.9376-40.2432c-24.064-47.6672-9.1136-105.984 34.816-135.68 13.3632-9.0624 23.7568-21.9648 30.0032-37.3248 13.6192-33.536 3.1744-72.448-25.4976-94.72-1.1776-0.9216-2.3552-1.792-3.5328-2.6112-45.0048-31.4368-60.3648-88.8832-36.5056-136.5504 7.7824-15.5648 16.5888-30.8736 26.1632-45.4656 29.2352-44.6464 87.296-60.8256 135.0144-37.6832 14.4384 7.0144 30.72 9.5232 47.104 7.3216 35.9936-4.9152 64.5632-33.536 69.4784-69.632 0.2048-1.4336 0.3584-2.8672 0.4608-4.3008 4.6592-54.8864 46.6432-97.0752 99.9424-100.352 18.688-1.1264 37.8368-1.1264 56.6272 0.1024 53.76 3.4304 96.6656 46.336 99.7888 99.7888 0.9216 15.9744 6.656 31.3856 16.4864 44.544 14.4384 19.2 37.632 31.232 62.1568 32.2048 14.1312 0.5632 25.1392 12.4928 24.576 26.5728-0.5632 14.1312-12.6976 25.088-26.5728 24.576-40.2944-1.5872-77.1584-20.7872-101.0688-52.6848-15.9232-21.1968-25.1392-46.1824-26.6752-72.2432-1.6384-27.648-23.9616-49.8688-51.9168-51.6608-16.64-1.0752-33.6896-1.0752-50.2272-0.0512-27.6992 1.6896-49.6128 24.1664-52.0704 53.4528-0.2048 2.2528-0.4608 4.608-0.768 6.912-7.9872 58.8288-54.5792 105.472-113.3056 113.5104-26.4192 3.584-52.7872-0.5632-76.3904-11.9808-24.6272-11.9296-54.6816-3.5328-69.8368 19.6608a404.15744 404.15744 0 0 0-23.1936 40.2944c-12.3904 24.7808-3.9936 54.9376 20.0192 71.68 1.8944 1.3312 3.7888 2.7136 5.632 4.1472 46.6432 36.1984 63.744 99.7376 41.472 154.4192-10.0864 24.7808-26.9312 45.6704-48.7424 60.416-22.6304 15.3088-30.2592 45.5168-17.8176 70.2464 6.144 12.1856 13.0048 24.1664 20.3776 35.6864 15.2576 23.808 45.6704 32.256 72.3968 20.1728 2.0992-0.9216 4.2496-1.8432 6.4-2.7136 55.04-21.7088 118.3744-3.9936 154.112 43.1104 16.2304 21.4016 25.6 46.592 27.0848 72.96 1.5872 27.3408 23.9104 49.408 51.968 51.3024 16.6912 1.1264 33.6384 1.2288 50.5344 0.256 27.5456-1.5872 49.3056-24.0128 51.7632-53.248 0.2048-2.3552 0.4608-4.6592 0.768-6.9632 7.9872-59.136 54.784-105.8304 113.8176-113.664 26.5216-3.5328 53.0432 0.768 76.6464 12.4416 24.6272 12.1856 54.784 3.84 70.0416-19.4048 8.4992-12.9024 16.3328-26.4192 23.2448-40.192 12.544-24.8832 3.9936-55.1424-20.3264-71.8848-1.9456-1.3312-3.84-2.7136-5.7344-4.1984-47.5648-36.5568-64.7168-100.7104-41.728-155.9552a25.55904 25.55904 0 0 1 33.4848-13.7728 25.55904 25.55904 0 0 1 13.7728 33.4848c-13.8752 33.3824-3.1232 73.6256 25.6512 95.6928 1.1776 0.9216 2.3552 1.792 3.584 2.6112 45.6192 31.4368 61.184 89.1392 37.0176 137.1136-7.8336 15.5136-16.64 30.72-26.2144 45.312-29.4912 44.7488-87.7056 60.7232-135.4752 37.1712-14.4896-7.168-30.8736-9.7792-47.2576-7.5776-35.6352 4.7104-64.9728 34.048-69.7856 69.7344-0.2048 1.4848-0.3584 2.9696-0.4608 4.4032-4.5568 54.8352-46.5408 96.9728-99.7888 100.0448-8.7552 0.4096-17.6128 0.6656-26.3168 0.6656z" fill="#44454A" p-id="1169">
  </path>
  </svg>
  </span></h4>`;
    if (CURRENT_SITE_INFO.siteType === "NexusPHP" || CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST|ACM|KG/)) {
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
    if (CURRENT_SITE_NAME === "HDT") {
      const trDom = `<tr>
    <td class="detailsleft" title-td" align="right">
    ${easySeedTitleDom}
    </td>
    <td class="detailshash easy-seed-td" align="center"></td>
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
