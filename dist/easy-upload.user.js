// ==UserScript==
// @name         EasyUpload PT一键转种
// @namespace    https://github.com/techmovie/easy-upload
// @version      2.4.3
// @description  easy uploading torrents to other trackers
// @author       birdplane
// @require      https://cdn.staticfile.org/jquery/1.7.1/jquery.min.js
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        https://broadcasthe.net/torrents.php?id=*
// @match        https://broadcasthe.net/torrents.php?torrentid=*
// @match        https://uhdbits.org/torrents.php?id=*
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
// @match        https://aither.cc/torrents/*
// @match        https://aither.cc/torrents?*
// @match        https://ptpimg.me/*
// @match        https://*/upload*
// @match        http://*/upload*
// @match        http://www.hd.ai/Torrents.upload
// @match        http://www.hd.ai/Torrents.index?*
// @match        https://broadcity.in/browse.php?imdb=*
// @match        https://privatehd.to/torrent/*
// @match        https://avistaz.to/torrent/*
// @match        https://piratethenet.org/browse.php?*
// @match        https://teamhd.org/details/id*
// @match        https://hd-space.org/index.php?page=upload
// @match        https://hd-space.org/index.php?page=torrent-details&id=*
// @match        https://greatposterwall.com/torrents.php?id=*
// @match        https://www.empornium.is/torrents.php?id=*
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
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
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
    "3Wmg": {
      url: "https://www.3wmg.com",
      host: "3wmg.com",
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        selector: 'input[name="pt_gen[douban][link]"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      tags: {
        chinese_audio: 'input[name="tags[]"][value="16"]',
        diy: 'input[name="tags[]"][value="8"]',
        hdr: 'input[name="tags[]"][value="64"]',
        chinese_subtitle: 'input[name="tags[]"][value="32"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: "401",
          tv: "403",
          tvPack: "402",
          documentary: "404",
          concert: "406",
          sport: "410",
          cartoon: "405",
          variety: "403"
        }
      },
      source: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          hdtv: "4",
          dvd: "3",
          web: "6",
          vhs: "6",
          hddvd: "2"
        }
      }
    },
    "52pt": {
      url: "https://52pt.site",
      host: "52pt.site",
      siteType: "NexusPHP",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABtlBMVEUAAAD/f1D+f1D8f0nrlATcRhAAAP8AAP72vAX2vAX2uwX2vAX2vAX1vAT2vAX2vAX2vAX2uwX/f1D/f1D/f1D/f1D2vAX2vAX2uwX1ugX0tQT/flD/f1D+f1D+fk/+f1D+f1D2vAX1uAXyrQTwpgT+fk//f1D/f1D/flD/f0//f1D1uwX0twTxqgTuoATslgTohAX/f1D/fk/+flD/f1D/f1DwpQTtmwTqkATohQTmfwT+flD/f0//f1D/f1D/f1D/f1DxqgTvogTslQTpigTmfwTldwXiaAr+f1D/f1D/f1D+f1DrlQPqjQTohQTleQXjbQnhYgrgYgr/f1D/f1D/f1D/f1D/f1DqjwTpiwTkcwfiaArfWwvdTw7/f1D+flD+f1D/f1DpiwXkdgbjbwnhYgreVA3cRRDbPRL/f0/hZArgXQveUA7bQRHbOhLbOhPeUQ3cSQ/bOhLbOhPbOhMAAP8AAP4AAP/bPhLbOhLbOhMAAP8AAP4AAP8AAP8AAP8AAP/bORPaORPbOhMAAP8AAP8AAP8AAP8AAP8AAP/bOhPbOhPbOhPbOhP2uwXysATmfwT////emFSbAAAAjnRSTlMAAAAAAAAAACiIUl5wyHjAdsYQChQGvkoOeMawXHYIIjbQ0IjGLDhAKEZS5Hbk+MoygkRUYljmUu78XiJoaFBKVnCo+t5KQghmVEhuVJJi+vrUAgKApERuMt7AaPjGMhIgDAp44u7QvroGdsg+6rjEdsgEdsYiGih2yHhsOlJKTgZqyLo0OlBYPAQWYDo8iaK1gQAAAAFiS0dEkQ8NvpoAAAAHdElNRQflBBUOAAFlgzxgAAAA50lEQVQY02Ng4OBkYODiZkAAHl4GBj5+JAEBkIAgA6OQsAgDoyhIQExcQlKKgUlaRlZOXgEkoNinpKzCwKSqpq6hqQUS0NbR1dM3YDY0MjYxNQEK6PSbmVtYWjFY29ja2TsABRydnF1c3dxFPWztPb28GRhYfHz9/AMCg4LtQ0Jtw8IZGCIiJ0RFx8QyMMTFJ2glJjIwJCWnpKalZ4CdpJUJIrOyc3Lz8sECTIwgsqCQtai4hIGttKycnQ0kUFHJwFAFFKiuqa2rbwAKNDYBBZoZ2Fpa29o7OoECXd0MDD29QAYbCDAAALdvLFoE/tjvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTIxVDE0OjAwOjAxKzAwOjAwc0mO0gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0yMVQxNDowMDowMSswMDowMAIUNm4AAAAASUVORK5CYII=" /></svg>',
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
          h264: "13",
          x264: "11",
          hevc: "1",
          x265: "12",
          h265: "1",
          mpeg2: "4",
          mpeg4: "13",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "13",
          ac3: "6",
          dd: "6",
          "dd+": "6",
          flac: "1",
          dts: "15",
          truehd: "12",
          lpcm: "14",
          dtshdma: "4",
          atmos: "10",
          dtsx: "3",
          ape: "2",
          wav: "11",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "11",
          remux: "4",
          encode: "7",
          web: "10",
          hdtv: "3",
          dvd: "6",
          dvdrip: "7",
          other: "9",
          cd: "8"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "7",
          "2160p": "5",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "6",
          "480p": "6"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          beyondhd: "1",
          hdsky: "2",
          ttg: "3",
          mteam: "8",
          coaster: "4",
          chdbits: "9",
          ourbits: "10",
          hdhome: "11",
          cmct: "12",
          hdchina: "14",
          pthome: "15",
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
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
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
    Aither: {
      url: "https://aither.cc",
      host: "aither.cc",
      siteType: "UNIT3D",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABO1BMVEUnPUA0UVVAZWpQfoRTgolJc3lIcXdSgYc5Wl4zUFQfMDIuSExCaG1SgYhckZhimKBbkJdajpVPfIJEa3Bdk5pXiZBLdnxFbXI4WFwvSU1PfYN1paxvoahsn6aGsLZhmKBbj5ZRgIZVho06W182VVlYi5Jgl59elJyLs7miw8eoxsqryMywy8+px8ucvsNrn6ZflZ0yTlJJcng/Y2iavcJtoKeBrbNelJtDaW4rREcxTVE9X2R5qK5KdHoqQkUoP0IsRUiNtbo3VlomOz5NeX8lOj0jNjkeLzEgMjQiNDchMzYkODslOTxYipEoPkEiNTgbKiwZJykcLC4dLS8uR0tBZmsaKCoZJig+YWYSHB0XIyUWIiQWISMfMTMRGhsVICIUHyATHR4cKy0QGRoTHh8YJScQGBkPFxj////TR8cdAAAAAWJLR0Roy2z0IgAAAAd0SU1FB+UEFw4WFlDBxPsAAAEBSURBVBjTFcppX4IwHADgPwmWmuWRVmCZdF9W2mmFlnlWNtBGY7YxWfL9v0H69vk9AMpCRFVVLaotaksxiENiObmymkpnsupaLr++sQmKbhS2UoVtwyjulEx9F/b2Dw6Pjk9Oz87LF1rpMgtXlap5faNG8+nb8l0ldw8PtcenZwvq9Yaiv5jVV2jWI2+tdqfb679bmWQsAR/Nz8FXHNkOGvZH2qgBqPfdH2LXdTFy2j/NLhBc8+iYenP6VbpjYHzgC59zOtOJhSgEojNmbE5c4tafD4RxTKaMCCGkg6WEMAypx8kscdcOwhACSTjFtkddNJFMBMCoCIj0bIq4DKY++wfZwT9SAOOuEQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNC0yM1QxNDoyMjoyMiswMDowMNu9360AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDQtMjNUMTQ6MjI6MjIrMDA6MDCq4GcRAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
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
          tvPack: "2",
          documentary: "1",
          concert: "3",
          sport: "9",
          cartoon: "405",
          app: "10",
          ebook: "11",
          magazine: "11",
          audioBook: "14"
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
          dvdrip: "3",
          other: "7"
        }
      },
      resolution: {
        selector: "#autores",
        map: {
          "4320p": "1",
          "2160p": "3",
          "1080p": "3",
          "1080i": "4",
          "720p": "5",
          "576p": "6",
          "480p": "8"
        }
      }
    },
    AvistaZ: {
      url: "https://avistaz.to",
      host: "avistaz.to",
      siteType: "AvistaZ",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 22 22" enable-background="new 0 0 22 22" xml:space="preserve">  <image id="image0" width="22" height="22" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QUPDicuFlMtFwAABCJJREFUOMu1lW1olWUYx3/3/TzPeT9nZ+7NHecr25TFFPFl2UJNtJqURUYFkVFQoCAlTIrCXiDB8IuUFGqCJYn2oZJEhH0Im1NC0G3OaJ7N6Uhzm562s7Oz85w9z3P1wQ2cVh+s/nB9u+7ffV339XLD/yT1L86FgKlAAMgDvYD9t+DtEc11T3SDX5WVKjUjrIg7wtgQ3NiW8VIn87IMeBqYDlSOX5AB9gI7AA/AnAB+ZkHPGMaagLe03G9siMIKS0hoCAh4KNIvofraBqVi2GOKC1lgFDgJ/AI4wHKgBxhSAE1zNKkRL7Jk9sw3SyLxzYFrl0qVYyMo9HieWQ+yAl2O0JyT9JEhOXTRpgC4AMwDHgVc4ArQah6t0fzmEVod5aMSX36TWVxgySCIA0pBly3s7hd+yghBDcvCisqQiq3SrE/2SVNeKAeqgONAB9AC9Jjr3vLTvdd+tVipjUbUsMRyIW6BbYMCx4IZLhQBHRnoTguFGaE6rIoVPD9esIPAaeB34BzgmM0H7Jr5MTabiI8pIVSijHSqlayCMp8wTytqsopnA9AaFE5pQfthSRw1amD4DZLHr9MGnAIuT9TMnFbIC0EflYgCXxroo1PyTI+C6lPY7eDLKkoRUgIRv2LqLKHDgVEPttSqkuIQya+6JHtnd+lIAQ06ipaYQpm3uHnjZ5ygQ7mGs+3w4rDHOQQDiAFeDhLXFLVBiEdgfkIVf1Cvwn+8rm/cCTatmFRhKhABy09vOszMWAp93qUrI3yPUCfCEq1ZrxTPALmssLFdWFmnSJTi681Kdbxi8khoYoSJCCoijJTXMDpnFaUVJciIUCaKEmCf5/GG65IUQQM/ukKbT3iqFiQiECFOzeRBMwkxIiYFWinOX+0gELwMRWl+CEEjLv1AP/CJCM2uy3bD4LAIK2ph9jTwBIBBMjIZPBYkiY/FoqC13+Z0t0tqKE/7tdvACcXHO/851+WBCBx4UKEjkPfI2w7J1NDkiHXG4IQXwsv7hLqFCSrmLuZsLyyqhHfXQti67TgdeF9pChQYU6HTESQIY356BxzO/zp4F/h6Tg7nLLrNMCyoCrPlyRAtO6Pseg3SGpzxDJMKhmqEdUth2IOqWSBBSGv5bvk2udp8afJT6IcbjYsDjux2feStgCZRlKOk2M87h+DTY2A7tx1zAj0zhbpHYGAQBkYgZ0rr1Qx7LuyHt7+8K+JjO13O9LD/Zo49rhFydLSaIy3wbfO9S/hmCuqroSAELUmupF221q+g++sW/lpNu+DIh0R7ji58b/hE1cArj2kB7rENq5Fb3+A+vpQzpYWsBNi1lX/WF42w/WWM059Tv2gu+4BOIF0Ux9aaUaC/oY7mzoNs+XgT5SL39/kYwDTL5KEnlrM2HGQNUOv3Ed25QzF/wX0x/xv9CdGEqkHFq79tAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTE1VDE0OjM5OjQ2KzAwOjAwBxpkNgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0xNVQxNDozOTo0NiswMDowMHZH3IoAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      needDoubanInfo: true,
      search: {
        path: "/torrents",
        params: {
          search: "{imdb}",
          in: "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    BTN: {
      url: "https://broadcasthe.net",
      host: "broadcasthe.net",
      siteType: "gazelle",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><image id="image0" width="32" height="32" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAFR0lEQVRYw72Xa4hVVRTH/2ufM/ecO2rWlI+iLClUyuqLVPSQRDR6CzpjZYUladibUqEv00QfytA0GfEZZhFqokWFEoE9JdIgSEIoyyJxepjPmXvP2evRB7t3zp17Zxyv0IYFh7PX/q/fXnudxT7AGYyofedlAxbuGH4mGlT3yrd/vy62dBUIscAt9fdf0v6/AeTbv78Ig+LdznQoABiRpV4n8qwxO05Xy9W1+zicQpwOhTAgDLCnMKTx9UiFdQEIO5DAKt5pXdnsHWDTnlwuaWwxR5M0jDfKDyu2o61NAQCaVPtTFscI7+wfHxE9oEK7fc69iZaLCrXC1D6C13+M4mK0NiRd36D8YC49sTkYdf+d5XnPANew0lj3w+V54fcC9rMa4JfnE78RKw809g+gfc/AeJAsd7AZJEKkCqeab7BwejeAAt5XGqfl6SiIZjrVs0kVJEJkfEccdW7Bmj1NpwSIG4NnHdlDJExQAVQAU4NPjpWdNAHEV1omA5byLlPV0noSJgeZHIfhwr4Blu0cQypzoUJmipKJyt4i+IWyHycnd1xhxfJ0yic+VOiOrAZUiJRnYO2eCbUBWjfloji/BdAh5Z2rwFTAheJsPDS2o+zbc/c9MoA547qKOWlWkV+yWjCNIpMNWLy9qQogHjriBlIZlU29KYulSSs/Nu7LikwxAz6ttEwNAABmXHXYuPikCXdmj4JEzstFTZOqANSF15LCQQQlMy/7i52HV1QVqq9xBD6tcks6fv0YIt9lNUnFuSCcUAUQFLumgpnAArDAWEBJ4T3Mu+WvagCPrChEAOUqN7S1pHbiyAr7T7NklBRurQS4uTU0F55F2bMHGEf/3gxUNryT6TpFDWRGsbNhg6ketNIxqADOnYX5aweVAZrGnjORlC+FMkrm0s4jhbapX9cSZfHHrSeA+qQmQdsEdoXjR7LaUB48MIzvLQNYQ3QO2AeljmbMoKRo6GX4v45tNJF9xmImYqp6oHisa1Nv/pQWKjum92Sw7gyQ7zKYIGumvcYH3prXWUyP3yjGr6pwe1GK12PVk/t6X2AV2lAB0pMbDAHgH0s+yav8CbOhwMlLggVBI55aPQxLH/mjpuby+R0psAD9GOqCHCRTI84lZvpFdxG2P38IadphFVUtjfl83NyfAH2NAU+snGzkRlLp0xaBpemhrkWzd3UDADBOdkHZuqs6JYvyLZi9srHu6K2tjs89727i1FV+NcnecjK6AexdeK+lWw4Jg5SvCYcMGFc3QDLqEqc8hUo3J2GA2Uz0/SqAROhrmBzKFgvBotCF6zB/9YV1bN9FQbAYaudXFDdpAWYfVQHglZajzH6BiiYQRcmcyMgozK/A42sv6HfsZ9Y0Rc+PXuJM7yIVKmmZqKqXJclL9+yrBgDgX37wTRi/36NpwKncGg9q+DI3743pp4odPL3y9jjKfeXUP0rqKatjqt+k3x16MetffZFcsO6KWGQzuWA0wSrmzWAGfK7stzmTXeX2G4YwR1dR0HA7gSYSUZWuAh3Meh8vnrWjbwAAmNs+PG6MPnPAqJ5T/7UnNYCzb8gQgsjVEjSgo2AyAYvm7O051+tVOvf4sispzK13RFcTWV1XbgOZwX5ho4f5tdmf1fLpW/i59QNyvnONczaNjIKeR9J3YKgRfZpYYRqWPHOkN99TCzY3B9GQm25D6O5ywJ0gGlZroXU/HBaHrUixLQ32foBly5K+5E8vtc2L88EwNyk0NxNhONipjAVAQu5nMj2oIls9H96MVW1d/ZWs/++4uTmIcfEIc+SSn47+hm9X+Xpk/gV3p5H+s+SSlQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNS0wM1QxNDoyNjowMyswMDowMDXaY4EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDUtMDNUMTQ6MjY6MDMrMDA6MDBEh9s9AAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: false,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          imdb: "{imdb}",
          artistname: "{name}"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: 'input[type="checkbox"][name="span[]"][value="5"]',
        chinese_subtitle: 'input[type="checkbox"][name="span[]"][value="6"]'
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
    BYR: {
      url: "https://byr.pt",
      host: "byr.pt",
      siteType: "NexusPHP",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">  <image id="image0" width="48" height="48" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
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
      subtitle: {
        selector: 'input[name="small_descr"]'
      },
      imdb: {
        selector: 'input[name="url"][type="text"]'
      },
      douban: {
        selector: 'input[name="dburl"]'
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2-Disc Set": "2_disc_set",
          "2D/3D Edition": "2d_3d_edition",
          "2in1": "2_in_1",
          "3D": "3d",
          "3D Anaglyph": "3d_anaglyph",
          "3D Full SBS": "3d_full_sbs",
          "3D Half OU": "3d_half_ou",
          "3D Half SBS": "3d_half_sbs",
          "4K Remaster": "4k_remaster",
          "4K Restoration": "4k_restoration",
          "Digital Extras": "extras",
          "Director's Cut": "director_s_cut",
          "Dolby Atmos": "dolby_atmos",
          "Dolby Vision": "dolby_vision",
          "Dual Audio": "dual_audio",
          "English Dub": "english_dub",
          "Extended Cut": "extended_edition",
          "Extended Edition": "extended_edition",
          Extras: "extras",
          HDR10: "hdr10",
          "HDR10+": "hdr10_plus",
          "Masters of Cinema": "masters_of_cinema",
          Scene: "scene",
          "The Criterion Collection": "the_criterion_collection",
          "Theatrical Cut": "theatrical_cut",
          Trumpable: null,
          "Two-Disc Set": "two_disc_set",
          Remux: "remux",
          Rifftrax: "rifftrax",
          Uncut: "uncut",
          Unrated: "unrated",
          "Warner Archive Collection": "warner_archive_collection",
          Commentary: "with_commentary"
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
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload/1",
      needDoubanInfo: true,
      seedDomSelector: "#meta-info+.meta-general>.panel:first",
      search: {
        path: "/torrents",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          name: "{name}",
          imdbId: "{imdb}",
          sortField: "size"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: 'input[name="cnlang"]',
        chinese_subtitle: 'input[name="cnsub"]',
        diy: 'input[name="diy"]'
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
    EMP: {
      url: "https://www.empornium.is",
      host: "empornium.is",
      siteType: "gazelle",
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php"
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
    GPW: {
      url: "https://greatposterwall.com",
      host: "greatposterwall.com",
      siteType: "gazelle",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="12px" viewBox="0 0 22 24" enable-background="new 0 0 22 24" xml:space="preserve">  <image id="image0" width="22" height="24" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABVlBMVEUAAAAvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMEvnMH////T/m9bAAAAcHRSTlMAABScbxoq5/nNlouiawwn4/36fQENv7PZH3D85e83GcnmK5OtCcbdOWzyWjjfowdURS3wQ3PcxQ8bYuGdBChjj5rWqqu2ICRMCL0y29cCprcje/v30U/+znJJX/boSPQGEsM6CpX1hBGN4FCw6p41N9CYMAAAAAFiS0dEca8HXOIAAAAHdElNRQflBg8QJipZPSzlAAABIUlEQVQoz13R11bCQBAG4AyCYkGToKImWBAsCAQLKmLsLRbsohKw9zbvf+WWILv+V3u+zJmdnSgKCfga/AGgUcRAY1OwuaW1LdQuOXSoiKhperhTdOjqJhyJYE+vxNBnIJomRvvlLgODSDMUkxmGGccTMvtGqI6O/Sse14kmJ0C+MZWmxRmrrlYsOzlF58PpGaE2N2sk0wbluXmB8wsF5FmkncFesoE1Xg5yXmGcWE2xiyG/xnndZtUbm1vbO+Tg7HJW9yhDzthXD8iheOg1PzomG3dOTs/OL+j3sMely6vrctytZAOsefXGc9R0Mmrmlg0Kd/coxHzgKwAou3V1/bU/BI9PRk2fX5y/t8LrW5Rf+h5yhA2A9fH5VdIK3z9Frr/KLlYZgS4NmAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0xNVQxNjozODo0MiswMDowMN+dGPkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMTVUMTY6Mzg6NDIrMDA6MDCuwKBFAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{imdb}",
          order_by: "size",
          order_way: "desc",
          group_results: 1,
          action: "basic",
          searchsubmit: 1
        }
      },
      needDoubanInfo: true,
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2D/3D\u7248": "2d_3d_edition",
          "4K\u4FEE\u590D\u7248": "4k_restoration",
          "4K\u91CD\u5236\u7248": "4k_remaster",
          DIY: "diy",
          "DTS:X": "dts_x",
          "HDR10+": "hdr10plus",
          HDR10: "hdr10",
          Remux: "remux",
          Rifftrax: "rifftrax",
          Scene: null,
          \u534A\u9AD83D: "3d_half_ou",
          \u534A\u5BBD3D: "3d_half_sbs",
          \u6807\u51C6\u6536\u85CF: "the_criterion_collection",
          \u91CD\u5236\u7248: "remaster",
          \u5BFC\u6F14\u526A\u8F91\u7248: "director_s_cut",
          \u7535\u5F71\u5927\u5E08: "masters_of_cinema",
          \u675C\u6BD4\u5168\u666F\u58F0: "dolby_atmos",
          \u675C\u6BD4\u89C6\u754C: "dolby_vision",
          \u989D\u5916\u5185\u5BB9: "extras",
          \u4E8C\u5408\u4E00: "2_in_1",
          \u7EA2\u84DD3D: "3d_anaglyph",
          \u534E\u7EB3\u6863\u6848\u9986: "warner_archive_collection",
          \u52A0\u957F\u7248: "extended_edition",
          \u8BC4\u8BBA\u97F3\u8F68: "with_commentary",
          \u5168\u5BBD3D: "3d_full_sbs",
          \u53CC\u789F\u5957\u88C5: "2_disc_set",
          \u53CC\u97F3\u8F68: "dual_audio",
          \u672A\u5206\u7EA7\u7248: "unrated",
          \u672A\u5220\u51CF\u7248: "uncut",
          \u82F1\u8BED\u914D\u97F3: "english_dub",
          \u5F71\u9662\u7248: "theatrical_cut",
          \u4E2D\u5B57: "chinese_subtitle"
        }
      },
      targetInfo: {
        editionTags: {
          "10_bit": "10_bit",
          "2_disc_set": "2_disc_set",
          "2d_3d_edition": "2d_3d_edition",
          "2_in_1": "2_in_1",
          "3d": "3d",
          "3d_anaglyph": "3d_anaglyph",
          "3d_full_sbs": "3d_full_sbs",
          "3d_half_ou": "3d_half_ou",
          "3d_half_sbs": "3d_half_sbs",
          "4k_remaster": "4k_remaster",
          "4k_restoration": "4k_restoration",
          director_s_cut: "director_s_cut",
          dolby_atmos: "dolby_atmos",
          dolby_vision: "dolby_vision",
          dual_audio: "dual_audio",
          english_dub: "english_dub",
          extended_edition: "extended_edition",
          extras: "extras",
          hdr10: "hdr10",
          hdr10_plus: "hdr10plus",
          masters_of_cinema: "masters_of_cinema",
          scene: null,
          the_criterion_collection: "the_criterion_collection",
          theatrical_cut: "theatrical_cut",
          two_disc_set: "2_disc_set",
          remux: null,
          rifftrax: "rifftrax",
          uncut: "uncut",
          unrated: "unrated",
          warner_archive_collection: "warner_archive_collection",
          with_commentary: "with_commentary"
        }
      },
      description: {
        selector: "#release_desc"
      },
      imdb: {
        selector: "#imdb"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo[]"]'
      },
      category: {
        selector: "#releasetype",
        map: {
          movie: "1",
          tv: "3",
          tvPack: "3",
          concert: "5"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          web: "WEB",
          hdtv: "HDTV",
          hddvd: "HD-DVD",
          dvd: "DVD",
          other: "Other"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "Other",
          mpeg4: "H.264",
          vc1: "Other",
          xvid: "xvid"
        }
      },
      resolution: {
        selector: "#resolution",
        map: {
          NTSC: "NTSC",
          PAL: "PAL",
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p"
        }
      },
      format: {
        selector: "#container",
        map: {
          mkv: "MKV",
          mp4: "MP4",
          avi: "AVI",
          ts: "TS",
          wmv: "WMV",
          vob: "VOB IFO",
          iso: "ISO",
          mpg: "MPG",
          m2ts: "m2ts"
        }
      },
      videoType: {
        selector: "#processing",
        map: {
          encode: "Encode",
          remux: "Remux",
          DIY: "DIY",
          bluray: "Untouched",
          uhdbluray: "Untouched",
          dvd: "Untouched",
          dvdrip: "Encode"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: 'input[type="checkbox"][name="tag[cn]"]',
        chinese_subtitle: 'input[type="checkbox"][name="tag[zz]"]'
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        },
        result: {
          list: ".torrent_list>tbody>tr",
          url: '.tbname td a[href*="details.php?id="]',
          name: '.tbname td a[href*="details.php?id="]',
          size: ".t_size"
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
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        chinese_subtitle: "#tag_zz",
        cantonese_audio: "#tag_yy",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
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
    HDFans: {
      url: "https://hdfans.org",
      host: "hdfans.org",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~b font table:first>tbody>tr:nth-child(5)",
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
          documentary: "403",
          concert: "441",
          sport: "418",
          cartoon: "417",
          variety: "416",
          app: "419",
          ebook: "423",
          audioBook: "405"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "3",
          x264: "2",
          x265: "4",
          h265: "3",
          mpeg2: "10",
          mpeg4: "11",
          vc1: "5",
          xvid: "12"
        }
      },
      source: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "2",
          hdtv: "6",
          dvd: "7",
          web: "5",
          vhs: "10",
          hddvd: "17",
          cd: "9",
          sacd: "16"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "11",
          ac3: "10",
          dd: "21",
          "dd+": "21",
          flac: "12",
          dts: "2",
          truehd: "6",
          lpcm: "7",
          dtshdma: "4",
          atmos: "1",
          dtsx: "3",
          ape: "13",
          wav: "14",
          mp3: "17",
          m4a: "5",
          other: "7"
        }
      },
      videoType: {
        selector: 'select[name="source_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "3",
          remux: "10",
          encode: "9",
          web: "7",
          hdtv: "6",
          dvd: "17",
          dvdrip: "17",
          other: "10"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "1",
          "2160p": [
            "2",
            "10",
            "9"
          ],
          "1080p": [
            "3",
            "5",
            "8"
          ],
          "1080i": [
            "4",
            "5",
            "8"
          ],
          "720p": [
            "5",
            "11"
          ],
          "576p": "6",
          "480p": "6"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          CN: "1",
          US: "2",
          EU: "8",
          HK: "4",
          TW: "5",
          JP: "6",
          KR: "7",
          OT: "9"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdfans: "9",
          hdf: "10",
          chd: "1",
          hdc: "2",
          ttg: "19",
          wiki: "3",
          beast: "4",
          cmct: "5",
          frds: "6",
          hdsky: "7",
          ourbits: "17",
          hdhome: "18",
          pthome: "16",
          tlf: "8",
          pter: "20",
          pbk: "21"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
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
          mpeg4: "1",
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
    HDMaYi: {
      url: "http://hdmayi.com",
      host: "hdmayi.com",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
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
          h264: "2",
          x264: "6",
          hevc: "3",
          x265: "5",
          h265: "1",
          mpeg2: "7",
          mpeg4: "4",
          vc1: "7",
          xvid: "7",
          dvd: "7"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1",
          bluray: "1",
          remux: "2",
          encode: "4",
          web: "5",
          hdtv: "6",
          dvd: "7",
          dvdrip: "4",
          other: "0",
          cd: "8"
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
          hds: "1",
          chd: "2",
          mt: "3",
          wiki: "4",
          cmct: "5",
          cnxp: "6",
          hdh: "7",
          fgt: "8",
          mz: "9",
          other: "10"
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
      seedDomSelector: '#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr:last',
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
        chinese_audio: 'input[name="is_mandrain"]',
        cantonese_audio: 'input[name="is_cantonese"]',
        diy: 'input[name="is_diyed"]',
        chinese_subtitle: 'input[name="is_chs_sub_incl"]'
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
    HDSpace: {
      url: "https://hd-space.org",
      host: "hd-space.org",
      siteType: "HDSpace",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">  <image id="image0" width="48" height="48" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACK1BMVEUAAABMUFBITExMTFBOUFJQUlRSUlZQUFRMTlBUVFhaWlxKTE5ERkhISEw6PD48PkA8PEA+PkJAQkRCQkZEREhUVlhcXGBGRkg4OjxSVFZYWlxWVlpcYGBYWFxAQERiZGZwcHRoaGxEREZsbnBqam5gYGRwdHRsbHAgICIYGBgsLCweHh48PDxkZmh4eHyEhIgkJCREREQ0NDYqKiooKCgyMjRcXmBkZGimpqpUVFYuLi5gYmRqamoyMjJQUFBwcHA0NDReXmBISEg4ODhucHBsbGxwcnBwdHBeYGJmaGpGREZAQEB4fHyanJyIjIxgZGRISkxoamxYWFp+foKMjI5kZGS+wL6mqqiMkI52eHhMTEyEiIiYnJxUVFR4eHjO0tCoqqqQkpJ0dHScnKBISkpITE5ucHJ0dHhgYGJOTEx4enyQkpSYmJiQkJDc4ODY2NjAxMSgpKR8fICAhIRKSkxGSEp0eHgAAACIiIzk5OS4uLhydHQ4ODwmJiY8PD4ICAiChIaAgIQMDAwwMDC0tLi4uLx2dnb0+PTs8PDg4ODAxMAUFBSsrLDExMiQlJTk6Ojo7OzY3NiwtLQgICCcoKCoqKxgYGDw9PDc4NzMzMxQUFIcHBw4NjaMjJDAwMCwsLCanJ5AQkI0ODh4eHqQkJSgoKDM0NCkpKiUlJiwsLTY2NzIyMjAwMSUmJjU2NhscHBobGyIjIrQ0NB8gIDIyMz4+Py8vLy8vMD///8yzIHDAAAAAXRSTlMAQObYZgAAAAFiS0dEuE2/JvYAAAAHdElNRQflBhsHHAEWOn7hAAADz0lEQVRIx+3U63vTVBwH8JGeJD1J7+s5HU3SJKyX3bJWuXQuULRTaew2DGMD2ym6ame7S12HnIHILoBON0Bx3p3zAjjFu0z/PYN75M35B3jB91WeJ+dzvvklT05Ly6M8VNnDMC7AAsABlndDAbhFHjAer+jz+wPBUGuYArzIu92i6EIsDznEA57HrDcS8Xpa/W2Q8YcosJcHbpcIoyxEEsfKCkQuxu31eFqDgYAnFqQBhDwAIqtwURVCSdOjrOhlmHA45HMS8O+jG1iWBTyHOFZShKjcHpcQEL2RcDjmDbbFfHQDCzjIKhLLQYjlhKwlEynkFplIuJWJ+QK+GN3AKYiTEAc7OrswjupJjBHkGMbtDOBr87XSDZKAkMK6UHd3jwKB0Qu9eyASXZCJhfyxIA0k6Dw7EtIok3lMER7PdKns/sxuDhwMxYIUOIQQxjDb90R/PzAPH+nPHc31P8iTQQ8FnsIYJ2QzmR8YSDz9zMDAs8ecqwcJ8RRIFBKyahnqc8V8avBwsTg0fOy4gDjAs88Xi8V9LgoYhUJWtVN6Pn9i5ORoPjd26vQLVi6fNw2plM9HvDQwE4ZhJ0dLpdHy+Iull86MvfzKRK6Uq1QEplR69TUKHDeztl2dfL1Wq09N12ozs4035pq1GkrPI6ZWO/smBSzTiqfONfcTsjA3SMj0+fONC28RcpHFchchb9PAsFKXFgmVc0vL9QwhJZYCcXtld8mBE/8vXrlMFucntSwhGQnSr7XTKVZzhFhXrhLyzrurq++93006dVntIAQoiAIXCRmwtYNkbf3adUKGbtz44MObhBwx5MvOjYJwiAIfOdtO6ovE3Pj4E0Ian372+dgSIT1ffOkUy0KUBmtkpZL+iqxsLi10k46vG2e25s7ujtIWbxcUGnSSxW+ccbXm/SG/vb5+dXzpO2f1Wo9qVG2MVQoE/tvNuzzx/fJ0uXdkemg+GdctKxWfrKRNu3mLArcvEdIdUdX65tSMVtWWysl2S7WrWnLuTt/QlfU5CvyQHpmaMOvb2+nlCdNSq71xPR4fKQ//+NPd9TuzfU36w2VTOsSVn08aVtU21JRm2/Xh7V/WZ3/dKN8e1ywKqGpC5BPbCwWc7dUtvaqltOXNcnpmY3vwt9+Pzv9BgUnTAghzvIKxJpvOn2HdL6nG25u3hk+f+nOLAgLggYB5SZE4XpBxQVWzhlHXtM0LjWtjd7f+osBeFkDn8HOOYZdz9kkKLuhNo14Zv7ez07i5qcoUYEUQdYmAYUS3m+Pl9gIu2NmZe3/P7qz+kzYKiZZHeajyL1zy+j56IdRgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTI3VDA3OjI4OjAxKzAwOjAwPxKVSgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0yN1QwNzoyODowMSswMDowME5PLfYAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#mcol>table>tbody>tr:last table:first>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
      uploadPath: "/index.php?page=upload",
      search: {
        path: "/index.php",
        imdbOptionKey: "2",
        nameOptionKey: "0",
        replaceKey: [
          "tt",
          ""
        ],
        params: {
          search: "{imdb}",
          page: "torrents",
          options: "{optionKey}",
          order: 4,
          by: 2
        }
      },
      name: {
        selector: "#filename"
      },
      imdb: {
        selector: 'input[name="imdb"]'
      },
      description: {
        selector: 'textarea[name="info"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="category"]',
        map: {
          movie: [
            "15",
            "40",
            "16",
            "18",
            "19",
            "41"
          ],
          tv: [
            "15",
            "40",
            "16",
            "21",
            "22"
          ],
          tvPack: [
            "15",
            "40",
            "16",
            "21",
            "22"
          ],
          documentary: [
            "15",
            "40",
            "16",
            "24",
            "25"
          ],
          cartoon: [
            "15",
            "40",
            "16",
            "27",
            "28"
          ],
          concert: [
            "15",
            "40",
            "16",
            "31"
          ]
        }
      },
      videoType: {
        map: {
          uhdbluray: [
            "15"
          ],
          bluray: [
            "15"
          ],
          remux: [
            "40"
          ],
          encode: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ],
          web: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ],
          hdtv: [
            "18",
            "19",
            "41",
            "21",
            "22",
            "24",
            "25",
            "27",
            "28",
            "31"
          ]
        }
      },
      resolution: {
        map: {
          "2160p": [
            "15",
            "40",
            "16",
            "41"
          ],
          "1080p": [
            "19",
            "22",
            "25",
            "28",
            "31"
          ],
          "1080i": [
            "19",
            "22",
            "25",
            "28",
            "31"
          ],
          "720p": [
            "18",
            "21",
            "24",
            "24",
            "31"
          ]
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
        hdr: 'input[name="HDR10"]',
        hdr10_plus: 'input[name="HDR10Plus"]',
        dolby_vision: 'input[name="DolbyVision"]'
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
    HDTime: {
      url: "https://hdtime.org",
      host: "hdtime.org",
      siteType: "NexusPHP",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABnlBMVEVyICB6Hh57HR2GGhqKGBiLGBiRJiajTEx+IiKeQkKDLS2BKiqYOjp9ISGYODiNHh6PFxeQFxeuWlqzYWGeNjaxXl6iQECSHx+nSUm1ZGS0Y2OtV1eaMDCTIyOuV1e0ZGTt4eH59fW7dHTz7OzIlJSXLy/Vr6/////+/f3y6enJmJicNDSbOzvq19fStbX28PDjzs7izMzw5ub17+/CioqeQ0PRq6vhysrz6+vizc3gysrBlZXl09OpU1OjRka0amrn1NTfxsakSUmfPDyjRESqVVXu4uLcvr6pVlaiRETfysqXKSmSHR27dXX8+vqsVVWZKyvq3Nz37+/y5eX9/PytVlbx6Oj38vKwXFz+/v77+Pj59PSsVlbw5+f38/OwXV37+fnWs7O8gYH48/OQGBixYGCvW1uZMTHLm5vr3d2pUFDFiIjBgIDPoqL17u7Tra2bNDT8+/vkz8+tXFyRGxvRr6/ZvLyvXl7XubnXurq4d3eVKCi+hYXbv7/Zvb2mSUmTISGWJyfQra2aMzOcNTWVJCSQGhqXKiqRGhqbMzMP6rAIAAAAEHRSTlPB4en7/f39/en96en96f39DMn6iQAAAAFiS0dEJy0PqCMAAAAHdElNRQflBgoEEjQ06RnvAAABJUlEQVQ4y2NgYGTCAxgZGBiZWVhxAhZmRgYmFgE8gIWJgYlVQBAnEGAdNgrYhIRFgGxRYTFxCUkgkJKWEZSVkwQDeXYOBiZOBUUloAJlRRVVNXUg0NDU0tbRVYcAPS40BfoGhkbqxiamZuYGiuoWllbW3GgKbGzt7B3UHZ2cXVzd1N09PHl40RR4eQv6+PoZ+QsKBgSqq6mCHcmpoBEUHBwcAlMgGBoWHoGqIDIqOjpaA64gJjYuHlVBQmJSUlIyTEFKqr5+GqoCFDekpGeoZ2bhVKCQnZObF5JfgFMBCBQWFZcgK+ArLSsHKqiorKquqQWCOq36BiC/sam2phqsgL+5pRUo0KLt3dbeAgTa3uB46uhsaW8bNAmGcgWEsh7BzEso+wMAFb1rT/22c/EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDYtMTBUMDQ6MTg6NTErMDA6MDD9uTIQAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA2LTEwVDA0OjE4OjUxKzAwOjAwjOSKrAAAAABJRU5ErkJggg==" /></svg>',
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      tags: {
        diy: 'input[type="checkbox"][name="tags[]"][value="8"]',
        chinese_audio: 'input[type="checkbox"][name="tags[]"][value="16"]',
        chinese_subtitle: 'input[type="checkbox"][name="tags[]"][value="32"]',
        hdr: 'input[type="checkbox"][name="tags[]"][value="64"]',
        hdr10_plus: 'input[type="checkbox"][name="tags[]"][value="64"]'
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
          hevc: "12",
          x264: "10",
          x265: "12",
          h265: "12",
          mpeg2: "4",
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "1 ",
          bluray: "1",
          remux: "3",
          encode: "7",
          web: "7",
          hddvd: "2",
          hdtv: "5",
          dvd: "6",
          dvdrip: "6",
          other: "0"
        }
      },
      team: {
        selector: 'select[name="team_sel"]',
        map: {
          hdtime: "6",
          hdt: "12",
          vtime: "15",
          padtime: "7",
          cmct: "8",
          wiki: "4",
          beast: "3",
          chd: "2",
          other: "5"
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
    HaresClub: {
      url: "https://club.hares.top",
      host: "hares.top",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQKBykVPLQLsAAABCVJREFUOMuVlctvVVUYxX97n3PPvb0t0BZKSKW0FdpSDCAkViMmjU9kAImaMDVGnOo/4IApGo0xccLQmYkgJhhfCSA4sgUJjz5JsbVwS/q6lN7bc/brc3AanGiiO9mjb+1k7d/KXlvxP9ax04tsfyKmMucatGYrsAysnHln82ON+rfDB967RXU+Zc/hroZSSTeXErVNKfq0Ym8cq6cizQ7rZKyeyYdxxFQ9Fc69u5kYYLxi8Q4aSiq5Mp2VhmZse93SGxS7g7BHK/qiiO44Ui1xRBxppZUC6+TpWMvVjw4WP/n6QeAcoE58s8xCVXZtKKmXTwyUD+/cHHWlTppTK80La7Lxh8ksWloLaKUoFWCwK+HJlhgBRIRI8WtXS3S8oFWlIdHElYWwt6msT0UFdeTStGEpjTnSWySJQIBqKpwfz/AiiFWMzjs2FTWD3QUmFz0/T2StFzxxMcrpxcAhYJ8XmJh3LNQCg90J09VAZ3PEoc4CN+Ys4wsOreBmxZFZ2L8t5uo9y6W7ZkOtJluBPwG0dVzNrCxlRjAOjBVEYHjWMjRr2VLWvNidUECRGcE6wTjBeGGpFgieFgV9CnjliwW0MWHEmjBjTMCagLUCwKO1wPmRlPlVz0BHgYPtMcYEjBXcusYHwXtpEpE9v99ew3tBX3x/S81YGXEu4HzA+wDrwEcrhh/HUwoaXu8t0lZWWJtrRCB4wftACNK/qzPZGIKgj56ex1q5YYxYawRrBRHBeyHNhJ9GUkYfOHraYl7aVUS84JyAgPe52+ClVylpQQT9qBbwPoxZEx46G3A2dxg8eBe4v+w4c61O3QRe6yuye0uMMYIA3gnWBLwLHRJkByLoNBMyIxVj5K5ZZygCzkvOzAhXJte4OJbS2hjxxv4GmhIIQXKNDTgnjc5Jf6wCsXMQhCpaJpSSZx4Dd4I1gkJYyeCroRr7ticMdBWp1sPfmkxQSmIvau9vS41o74VStlZzVkZsFoIxOXDvBJMFjMkxjM4azg7XiDS82l9iY0njbH5lawLehv7u0mqLvn6ynVUSrJMxa+WRMzlw5/OArMl3lga+HV5leCqjIdEkETgnmPW5s7IteGnXkKflvUxYK8utZU0hgnKs8OshORvwLlBZcnx5eYVq3aOUwjtZnwvOyR8SWIwBerYWKBfV7As9xeXne0pdm8qa48810dEa8fn3Ve4vO7TK3+rlkTX57lotvPVsky4X9YzzXItidV0JZ0Pq52KAYwfKbGiMaosP7egvt+sHLt6s5Q6CSGokeE8mmorSTNaMjF0YSWfeHGgqHT3YePnkmepQT2diAZn8uD0v2Ia3p+hrU9xbkcGCklME2kQxh2IyKeibkeIWSk2pSC8prR4iuDufdvxjMT9u7O4PpkGhEXYi0opS0yjmAX/3s87//E38BWXDuj9j0ViVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEwVDA3OjQxOjIxKzAwOjAws0DWvgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMFQwNzo0MToyMSswMDowMMIdbgIAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "#top~table:first+table:first>tbody>tr:nth-child(3)",
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        selector: 'input[name="pt_gen[imdb][link]"]'
      },
      douban: {
        selector: 'input[name="pt_gen[douban][link]"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      mediaInfo: {
        selector: 'textarea[name="technical_info"]'
      },
      tags: {
        chinese_audio: 'input[name="tags[]"][value="32"]',
        cantonese_audio: 'input[name="tags[]"][value="64"]',
        diy: 'input[name="tags[]"][value="1024"]',
        hdr: 'input[name="tags[]"][value="4096"]',
        hdr10_plus: 'input[name="tags[]"][value="8192"]',
        dolby_vision: 'input[name="tags[]"][value="16384"]',
        chinese_subtitle: 'input[name="tags[]"][value="256"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "401",
          tv: "402",
          tvPack: "402",
          documentary: "404",
          concert: "409",
          sport: "407",
          cartoon: "405",
          variety: "403"
        }
      },
      videoCodec: {
        selector: 'select[name="codec_sel"]',
        map: {
          h264: "1",
          hevc: "6",
          x264: "8",
          x265: "7",
          h265: "6",
          mpeg2: "4",
          mpeg4: "9",
          vc1: "2",
          xvid: "3",
          dvd: "4"
        }
      },
      audioCodec: {
        selector: 'select[name="audiocodec_sel"]',
        map: {
          aac: "6",
          ac3: "13",
          dd: "13",
          mp3: "4",
          "dd+": "13",
          flac: "1",
          dts: "3",
          truehd: "9",
          lpcm: "14",
          dtshdma: "11",
          atmos: "8",
          dtsx: "10",
          ape: "2",
          ogg: "5",
          wav: "15"
        }
      },
      videoType: {
        selector: 'select[name="medium_sel"]',
        map: {
          uhdbluray: "2",
          bluray: "2",
          remux: "3",
          encode: "4",
          web: "5",
          hdtv: "8",
          dvd: "0",
          dvdrip: "0",
          other: "0"
        }
      },
      resolution: {
        selector: 'select[name="standard_sel"]',
        map: {
          "4320p": "5",
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3"
        }
      },
      area: {
        selector: 'select[name="processing_sel"]',
        map: {
          chd: "4",
          hds: "5",
          wiki: "6",
          cmct: "8",
          beast: "9",
          hdc: "10",
          frds: "11",
          pter: "12",
          bhd: "13",
          pth: "14",
          other: "15"
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
        nameOptionKey: "name",
        params: {
          incldead: "0",
          search_area: "{optionKey}",
          search: "{imdb}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: ".torrents>tbody>tr",
          url: 'td a[href*="details_"]:first',
          name: 'td a[href*="details_"]:first b',
          size: "td:nth-child(6)"
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
        chinese_audio: 'input[name="tag_gy"]',
        diy: "#tagDIY",
        cantonese_audio: 'input[name="tag_yy"]',
        chinese_subtitle: 'input[name="tag_zz"]',
        the_criterion_collection: 'input[name="tag_cc"]'
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrenttr .torrentname td a[href*="details.php?id="]',
          name: '.torrenttr .torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: "#l_dub",
        diy: "#l_diy",
        chinese_subtitle: "#l_sub"
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
    NPUBits: {
      url: "https://npupt.com",
      host: "npupt.com",
      siteType: "NexusPHP",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          incldead: "0",
          search: "{name}",
          sort: "5",
          type: "desc"
        },
        result: {
          list: "#torrents_table>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(3)>center:first"
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
      anonymous: {
        selector: 'input[name="uplver"]',
        value: "yes"
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
          variety: "403",
          music: "414",
          app: "408",
          ebook: "411",
          magazine: "411",
          audioBook: "411"
        }
      },
      area: {
        selector: "#source_sel",
        map: {
          CN: "6",
          US: "5",
          EU: "5",
          HK: "6",
          TW: "6",
          JP: "5",
          KR: "5",
          OT: "7"
        }
      },
      videoCodec: {
        selector: 4,
        map: {
          h264: "H264",
          hevc: "x265",
          x264: "x264",
          x265: "x265",
          h265: "x265",
          mpeg2: "MPEG2",
          mpeg4: "H264",
          xvid: "Xvid",
          dvd: "MPEG2"
        }
      },
      videoType: {
        selector: 2,
        map: {
          uhdbluray: "BluRay",
          bluray: "BluRay",
          remux: "Remux",
          encode: "BluRay",
          web: "WEB-DL",
          hdtv: "HDTV",
          dvd: "DVD",
          dvdrip: "DVDRip",
          other: ""
        }
      },
      resolution: {
        selector: 3,
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p"
        }
      },
      team: {
        selector: 5,
        map: {
          wiki: "WiKi",
          cmct: "CMCT",
          mteam: "MTeam",
          epic: "EPiC",
          hdchina: "HDChina",
          hds: "HDS",
          beast: "beAst",
          ctrlhd: "CtrlHD",
          chd: "CHD"
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
    OpenSub: {
      url: "https://www.opensubtitles.org",
      host: "opensubtitles.org",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAAAAAD/aE28AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QADzoyPqMAAAAHdElNRQflBxcLOzjtVivgAAAARElEQVQI12NggAH+D//BCMHAAjj/L2B6/w/IqGRYzuMgC2RcYpDldQBJPWSQY/l/GSw1g4PBF8jg+r+A5/1XbMbgtgsAjDUiHY8LnyYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDctMjNUMTE6NTk6NTUrMDA6MDB7fTP0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA3LTIzVDExOjU5OjU1KzAwOjAwCiCLSAAAAABJRU5ErkJggg==" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/en/search/sublanguageid-all/imdbid-{name}"
      }
    },
    OurBits: {
      url: "https://ourbits.club",
      host: "ourbits.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
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
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: "#tagGY",
        diy: "#tagDIY",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tagZZ",
        hdr: "#tagHDR10",
        hdr10_plus: "#tagHDR10P",
        dolby_vision: "#tagDB"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: "#tag_gy",
        diy: "#tag_diy",
        cantonese_audio: "#tag_yy",
        chinese_subtitle: "#tag_zz",
        hdr: "#tag_hdr10",
        hdr10_plus: "#tag_hdrm",
        dolby_vision: "#tag_db"
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
    PTN: {
      url: "https://piratethenet.org",
      host: "piratethenet.org",
      siteType: "PTN",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBR0NCTVvZ8yaAAAB3UlEQVQozwXBT0hTcQDA8e977/c298I5Xchaf9S1ZRNLttmhltUQnSc9VAgFUWAgCzrYTYnOEZ0G0T/IiKi0Dv0jughJ64/YQB0q2imTwjmI2h/3tvden4/Ui4Tpczyt/qgkpA2wACvguFet+Zz4k65F2YuOc3L0qK8t5Si9U5GxUB+N9BzZlW7SH1vIZkSbMmIGBQobClV7RZQp5coUcMci72vahOvBlQN5DKYrZWXHhLejov/8lMumiDNmr/SOJUWRv2T5gqkOXztDAzor7ffZ4Dm96FSRghHn6NYvQxu60MUKIVoBuMTLu/UuWXy/Kvn5x3Y6pjpj8+xhkRH2s4Bg6M7SMICQcOPyqJ3zJGhimoc0YqIS6F6yoYNoxGRLRQEJCQkLExkLVBQnJYSGTHYtvxwN36KZDJcJMoediRl3ycsySnMzSfngWulQ6DQmZwmj0cIN5t+2nNL6N9PSwMeL0RyzZkEOc45aTFa5TRGVHnSuvxDC78GBTx43bz6ZbN0XqBiZb/n1k+fjKFSx7WbnYM/igJmyxq32USE5PLZGFyeSb6xXVp9x7GtdVKw/K74+vmD31SP7hcVvmRqkUB0Gmx9mu7EQKHgH+1djM9uCoGEHGrr6MvGM6zDAf9rgrjhkXWjnAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI5VDEzOjA5OjUzKzAwOjAwiaGjGgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yOVQxMzowOTo1MyswMDowMPj8G6YAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC" /></svg>',
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/browse.php",
        params: {
          name: "{name}",
          imdb: "{imdb}"
        }
      },
      name: {
        selector: "#name"
      },
      description: {
        selector: "#descr"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      }
    },
    PTP: {
      url: "https://passthepopcorn.me",
      host: "passthepopcorn.me",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAACAgIEBAQDAwMBAQF7e3u+vr56enoXFxecnJy6urpSUlIuLi6vr6+xsbH///+wsLAhISHg4OB2dnZCQkL8/Px6fHy8vr95ensWFhebm528vL1UVFQuLS6xr7C9vbydnJsXFxZ7e3q/v718fHsXDAoiFQ8gGQ4eHAwfHw4LCwYIDQgQGw8PGxMPHBYNHBkHDg0GCAoOFx0MEBgODxgSDxoOChIDAQGcSj7oh1zgrVng0VrU2lk6Ohc4WzB2x29auXpZv5Fc0rcpY1gXKDVYl8Vae7ZYYqhwXKxZPnYBAQKxVkj/nWv/yWf+8Wj1+WhDQxtAaTiI5oFp145n3alr89Qwc2YaLj1mr+RojtJmcsODa8hoSIkCAQOxVEf/mmn/xWX+7Wbx92ZBQho/ZzeG4X5n04tm2aVp7tAvcGQaLTxkrN9mi85kb7+AacRmR4YCAQJn073lAAAAAWJLR0QPGLoA2QAAAAd0SU1FB+UEDAMAJuVAAk0AAAC+SURBVBjTY2BgZGJkYGZiYWFmZmFhYgZzGRhZ2dg5OLm4eXh5ebi5ODnY2ViBivj4BQSF+IVFREVFhPmFBAX4+YDKxcQlJKWkZWTl5GRl5BUUlZRVgPpV1dQ1NLW0dXT19A0MjYxNTM0YGMwtLK2sbWzt7B0cnZxdXN3cPTy9GMy9fXz9/AMCg4JDQsPCIyKjomNiGczj4hMSk5JTUtPSMzKzsnNy8/IL6CiI1UnYHI/Vm1gDBHvQYQtkbNEBAFOfVLHCxSMQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTEyVDAzOjAwOjM4KzAwOjAw8nDEugAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xMlQwMzowMDozOCswMDowMIMtfAYAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: true,
      needDoubanInfo: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchstr: "{imdb}"
        }
      },
      sourceInfo: {
        editionTags: {
          "10-bit": "10_bit",
          "2-Disc Set": "2_disc_set",
          "2D/3D Edition": "2d_3d_edition",
          "2in1": "2_in_1",
          "3D": "3d",
          "3D Anaglyph": "3d_anaglyph",
          "3D Full SBS": "3d_full_sbs",
          "3D Half OU": "3d_half_ou",
          "3D Half SBS": "3d_half_sbs",
          "4K Remaster": "4k_remaster",
          "4K Restoration": "4k_restoration",
          "Director's Cut": "director_s_cut",
          "Dolby Atmos": "dolby_atmos",
          "Dolby Vision": "dolby_vision",
          "Dual Audio": "dual_audio",
          "English Dub": "english_dub",
          "Extended Cut": "extended_edition",
          "Extended Edition": "extended_edition",
          Extras: "extras",
          HDR10: "hdr10",
          "HDR10+": "hdr10_plus",
          "Masters of Cinema": "masters_of_cinema",
          Scene: "scene",
          "The Criterion Collection": "the_criterion_collection",
          "Theatrical Cut": "theatrical_cut",
          Trumpable: null,
          "Two-Disc Set": "two_disc_set",
          Remux: "remux",
          Reported: null,
          Rifftrax: "rifftrax",
          Uncut: "uncut",
          Unrated: "unrated",
          "Warner Archive Collection": "warner_archive_collection",
          "With Commentary": "with_commentary"
        }
      },
      description: {
        selector: "#release_desc"
      },
      poster: "#image",
      imdb: {
        selector: "#imdb"
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
        selector: "#categories",
        map: {
          movie: "Feature Film",
          tv: "Miniseries",
          tvPack: "Miniseries",
          documentary: "Feature Film",
          concert: "Live Performance"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "Other",
          mpeg4: "H.264",
          vc1: "Other",
          xvid: "XviD",
          DVD5: "DVD5",
          DVD9: "DVD9",
          BD100: "BD100",
          BD66: "BD66",
          BD50: "BD50",
          BD25: "BD25"
        }
      },
      source: {
        selector: "#source",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          hdtv: "HDTV",
          dvd: "DVD",
          web: "WEB",
          vhs: "VHS",
          hddvd: "HD-DVD"
        }
      },
      resolution: {
        selector: "#resolution",
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "576p",
          "480p": "480p",
          NTSC: "NTSC",
          PAL: "PAL",
          other: "Other"
        }
      }
    },
    PTSBAO: {
      url: "https://ptsbao.club",
      host: "ptsbao.club",
      siteType: "NexusPHP",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(7)"
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
        chinese_subtitle: 'input[type="checkbox"][name="zz"]'
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
        },
        result: {
          list: "#torrenttable>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        chinese_audio: "#guoyu",
        diy: "#diy",
        cantonese_audio: "#yueyu",
        chinese_subtitle: "#zhongzi"
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
    PrivateHD: {
      url: "https://privatehd.to",
      host: "privatehd.to",
      siteType: "AvistaZ",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 22 22" enable-background="new 0 0 22 22" xml:space="preserve">  <image id="image0" width="22" height="22" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACDVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAQFGPyRwZTsXFQxVTS1nXTYpJRVwZTp5bT93az52aj51aj14bD9NRSgEAwIhHQ7FrlbUvF4rJhMDAwGfjUblymWPfj7RuV3jyWXiyGPgxmPfxmLLtFktJxM1LRDWt0HRskAqJA2chTDmxUaskzTPsD/Ss0B/bipwYSZ5aCnHqj7YuUJCORQ0LAzUsTDPri82LQwMCgIODAISDwOfhSTivjSojSbMqy/CoywcFwYPDQOxlSjYtTFCNw80KwnQrCbXsSe5mSGxkh+ykx/NqiXbtSiliR7JpiTAnyMbFwUPDQKwkiDWsSdBNgw0KgfQqhzYsB3Bnhu7mRq8mhrbsx6lhxbJpBvAnRobFgMQDQKxkRjXsB1CNgk1KgXVrBTSqRM8MAYSDwIVEQIYFAKigg/kuBWqiRDOphPEnhIcFgIQDQGzkBDarxRDNgY1KgPZrQzTqQwrIgIDAwCefgnpug2uiwnRpwvUqgyAZgZwWQV5YAXKoQvbrwxDNgMiGwHKoAXZrAUsIwEEAwCigATquQaSdATWqQXouAXntwbltQbltQXRpQUuJAECAQBJOQB0WwEYEgBYRQBrVAErIgBzWwB9YwF7YQF6YAF8YQFQPwD///9sRWxwAAAAE3RSTlMAD2jG8P0cpvgOpWf292nCxe3vW6icJgAAAAFiS0dErrlrk6cAAAAHdElNRQflBR0MDgqXgh1XAAABKUlEQVQY02NgYGBkYmZhFYYCVhZmJkYGIGBj5xBGARzsbAwMnFzCGICdk4GbB1OYl4+BXxgLEGAQxCYsxMAqIiomLiwsIiEpJS0jKycvL6egqMTKIKysoqomLKyuoamlraOrp6+vp2dgKMwgbGRsYgoUNjO3sLSytrGxsbWzdwAKOzo5u7i6uXt4enn7+ALN9fMPCAQKBwWHhIaFh0dERkXHxAKF4+ITEoHCSckpqWlp6ckZmVnZOUDh3Lz8AqBwYVFxSWlZeUVlVXVNLVC4rr6hESjc1NzSKizc1t7R2dXd09vb29c/YSJQeNLkKVOFhadNnzFz1uw5c+fNmztv/gJhBtaFixYvERZeuHTZ8hUrV60GgjVrp7Hi8jyOoMIRsDiiAUekYY9iAOujViqpcnSrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA1LTI5VDEyOjE0OjEwKzAwOjAw1eU6iAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNS0yOVQxMjoxNDoxMCswMDowMKS4gjQAAAAASUVORK5CYII=" /></svg>',
      asSource: true,
      asTarget: false,
      uploadPath: "/upload.php",
      seedDomSelector: "#content-area .block:last table:first>tbody>tr:nth-child(3)",
      needDoubanInfo: true,
      search: {
        path: "/browse.php",
        params: {
          search: "{name}",
          in: "1",
          order: "size",
          sort: "desc"
        }
      }
    },
    PuTao: {
      url: "https://pt.sjtu.edu.cn",
      host: "sjtu.edu.cn",
      siteType: "NexusPHP",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 28 29" enable-background="new 0 0 28 29" xml:space="preserve">  <image id="image0" width="28" height="29" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
      asSource: true,
      asTarget: true,
      seedDomSelector: "h1~table:first>tbody>tr:nth-child(3)",
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
        selector: 'input[name="douban_url"]'
      },
      anonymous: {
        selector: 'input[name="uplver"]'
      },
      category: {
        selector: "#browsecat",
        map: {
          movie: [
            "401",
            "402",
            "403"
          ],
          tv: [
            "407",
            "408",
            "409",
            "410"
          ],
          tvPack: [
            "407",
            "408",
            "409",
            "410"
          ],
          documentary: "406",
          concert: "427",
          cartoon: "431",
          app: "434",
          sport: "432",
          variety: [
            "411",
            "412",
            "413",
            "414"
          ]
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
          mpeg4: "1",
          vc1: "2",
          xvid: "3",
          dvd: "4"
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
          "2160p": "6",
          "1080p": "1",
          "1080i": "2",
          "720p": "3",
          "576p": "4",
          "480p": "4"
        }
      },
      area: {
        map: {
          CN: [
            "401",
            "409",
            "411"
          ],
          US: [
            "402",
            "410",
            "413"
          ],
          EU: [
            "402",
            "410",
            "413"
          ],
          HK: [
            "403",
            "407",
            "412"
          ],
          TW: [
            "403",
            "407",
            "412"
          ],
          JP: [
            "403",
            "408",
            "414"
          ],
          KR: [
            "403",
            "408",
            "414"
          ]
        }
      }
    },
    SC: {
      url: "https://secret-cinema.pw",
      host: "secret-cinema.pw",
      siteType: "gazelle",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 30 32" enable-background="new 0 0 30 32" xml:space="preserve">  <image id="image0" width="30" height="32" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAAAAAAgK5ejAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQflBw0KAxGGHdK7AAAAuklEQVQoz2MUY8AHmBhGpbEAFgYGBgaGjZwYEt/9EdIauHQzijEwMDBwMWJI/P+G0P2NgYGBgaFM6lkXg2w6z5Iz2JzW8qjgYgZDw4aCGBM0pzEwMDAwPLE4upPB/eYZhgKEGDM3nHnmf1ziZ8GPVzA9xsDAwMBgsnMnw9zpAQwMsgyPsei2SxHwur/JT082+cAnVI9BgKz1nTMMDCYqK9D9TSBQS9kwJH51I3TfxKJRnQjDB3Fioqk0ADLEKO5/ENcdAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA3LTEzVDEwOjAzOjE3KzAwOjAwgNGSrQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNy0xM1QxMDowMzoxNyswMDowMPGMKhEAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          action: "advanced",
          searchsubmit: 1,
          filter_cat: 1,
          groupname: "{name}",
          cataloguenumber: "{imdb}",
          order_by: "size",
          order_way: "desc",
          tags_type: 0
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(6)"
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
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      seedDomSelector: "#top~table:first>tbody>tr:nth-child(3)",
      needDoubanBookInfo: true,
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
    SubHD: {
      url: "https://subhd.tv",
      host: "subhd.tv",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 11 11" enable-background="new 0 0 11 11" xml:space="preserve">  <image id="image0" width="11" height="11" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA5FBMVEUAie0Aie4AiO0Lje4wn/FBpvIsnfAIjO4mmvCo1vnb7vzc7vzc7/yd0fgcle8Fi+6j1PjR6ftNrPMzoPFktvTk8v2Py/cBie4Tke/V6/wHi+4Ahe0Bh+1etPRwvfUGjO4HjO6h0/j1+v5kt/QNj+4ble9/w/bJ5vvo9P3q9f3B4vpRrvMSke8PkO5lt/TP6PvY7Pwfl+8Ah+0om/C94PpQrfMAhu0AhO1suvUvnvEQkO+/4frM5/tMrPPF5Pu+4PoAiO44ovG84Prg8Pze7/y33fo1ofERkO82ovFFqfIPj+7///92Ih8bAAAAAXRSTlPpmTCCugAAAAFiS0dES2kLhVAAAAAHdElNRQflBgQEKCzi8yjzAAAAgUlEQVQI1xXK5xbBQBRF4TtHlAgG0YPoojMEiRYtyvs/kOvft9faRAIRLRqLQxAzoSeNVDrDAZnN5c1CsVQGoVLVa1a90bTZrXZH75o98CPQHwyd0Xjyf+RUzrT5YrlSpNYb19ru9o6nCP7h6Hqn88UHBbje7sbjGSIgjtf7E36ZP28ZDcGwKhEtAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA2LTA0VDA0OjQwOjQ0KzAwOjAwUjx2WwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNi0wNFQwNDo0MDo0NCswMDowMCNhzucAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/search/{name}"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
        },
        result: {
          list: ".torrents>tbody>tr",
          url: '.torrentname td a[href*="details.php?id="]',
          name: '.torrentname td a[href*="details.php?id="]',
          size: "td:nth-child(5)"
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
    TMDB: {
      url: "https://www.themoviedb.org",
      host: "www.themoviedb.org",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 11 11" enable-background="new 0 0 11 11" xml:space="preserve">  <image id="image0" width="11" height="11" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA4VBMVEUDJUEDJUEDJUEDJUECJEABI0ACI0ACIz8CIj4QNUobRFQQOU8PPFIQQlkJOFINVHAHUnEDME0TOk0oVl8rY2wpanUjbHwWZXwhr8kQqc4ET3ARN0scRlUXRFYbUWMVTWIMQVsNU28IWnoDNlQBIj8oU1xHf3kxbHJGn54fZXYVWnALTGgIZocDQF8RNkstXmUlWmYoaHQSR10NQ1wIP1oGTm4DOVcfSFVvtZxmvKpVurM1kpsWYHcPXXgKbo8ESWoLL0YqWWIpX2kiXm0USl8LP1kIPFcFQmADNFIBIj7///8y4y3nAAAAA3RSTlOL8/J7NBHxAAAAAWJLR0RKHgy1xgAAAAd0SU1FB+UEDxE0CxaidT8AAAB5SURBVAjXY2BgZIYARgYGJhZWFjZ2Ng4OFiYGFk4ubh5ePn4BQRYGViFhEVExcQlJKQ4GNmkZWTl5BUUlZXYGFVU1dQ1NLW0dXXYGFj19A0MjYxNTM6C4uYWllbWNrZ09UNzB0cnZxdXN3YMFaL6Kiic7EADNR7IXAHnLC6fWgfiqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjUyOjA5KzAwOjAwD2XHBwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo1MjowOSswMDowMH44f7sAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/search?query={name}"
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
        },
        result: {
          list: "#torrent_table>tbody>tr",
          url: '.name_left a[href*="/t/"]',
          name: '.name_left a[href*="/t/"] b',
          size: "td:nth-child(7)"
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
    TeamHD: {
      url: "https://teamhd.org",
      host: "teamhd.org",
      siteType: "TeamHD",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA/1BMVEUnb4xDgZs/fpkdaIc5epUtc48haokeaYcwdJFXj6ZTjKQvdJAha4keaIcwdZE1eJRAf5knbozu8/bV4+kdaIe1zdd4pLcydpLs8vUmboyFrb44Y3s4Y3qbU1CcU1Cxy9KAqrne6elPiaCudHH9/fj39O/59vHr3trBlJD17+qdVVK1f3zx6OTGnpqzfXn38+6dV1Tk7u3R4OP3+vb6+POrb2yVucRDgZrk7eycVFH59/KscG2vdHH49O+eV1Wrbmrr39rKpKD8/Pfv5ODz7Oj07ejIoZ0qcI0lbYsuc48ha4mdVlOkYl+iXluCq7w3eZUkbYuGrr+iwc3a5uv////JDiEOAAAAEnRSTlP8/Pz8/Pz8/Pz8/Pz8/Pz8/Pxv/XQeAAAAAWJLR0RU5AOIpQAAAAd0SU1FB+UGFAUQNy7SYEwAAACnSURBVBjTXc/VDsJAEAXQHYo7Q3G6uBUvUtyd4v//LyxsQlru25xkjBAAk2AGsFgBwGYH4kAMiiHEcAQxGosjEUSeRJLnBxL9RiJCKs3KTDaXLxRLZT1UqFyt1Q1AaaPZYtBWFKXDQe72GPRVVR1wGI7GxpbJdGaA+WKpG7pab7a7z9r9gcHxdNa0Cz/s/3S83thX9wfiU3whOgm43OxvjxfAJ/gBAm8tFB1sxKb5KwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wNi0yMFQwNToxNjo1NSswMDowMJkzpLEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDYtMjBUMDU6MTY6NTUrMDA6MDDobhwNAAAAAElFTkSuQmCC" /></svg>',
      asSource: true,
      asTarget: false,
      seedDomSelector: "#details_hop",
      needDoubanInfo: true,
      search: {
        path: "/browse",
        params: {
          incldead: "0",
          search: "{name}"
        }
      }
    },
    UHDBits: {
      url: "https://uhdbits.org",
      host: "uhdbits.org",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5QQMAxYgELsSrwAABEJJREFUOMtFlE1vXeUVhZ/9fp1zP3x9bcc2TnCCQwIFVIUCA0/opEiIEYNW7RipP6I/pr+AYVVVQkJCKghKFYKliEBCCIkTwHEcfJPre4/PeT92BwZ3S1ta0paewdJaW8796e8fqTF3xZgdEXZw/tuU3eStC4+7v16+pquyTydBAcRGibMRN//Vk/v/bbxIN7JFLir6uyzltULZcoj8xtfVlg/uDYP+nFPZV7F708ff7d2cf3Io7pujeaEDsBV+9nB90Oy/suTN1prx5qw3ds0UWY6xGzWlqRzGjF3wvqq9tSgpa9FSPa0rOwk1U+849oX4C9CFntR17Ydd1V80Po2tFStZUMjSttFhaK0V65213ggWMVqqcfBm7CtwDlwBABvAVxAqS+VrrE9gFRXFRltEpHWiCAgCiChGBSOCtWAtGAdOQQHrwVhBrCBGUCOcXH5ZVXF1cNTBYq1BtWCMMHCWqupjQx9jLKQMAsY6bOjj6gF+1MOGjBhFYyFppswU985rZ1lcWuSbvSO+3v2ZzdWad14/y4C3WdOa4ZOap7c/BWBpa5v+md8zXP8tg/ULLJ5fwQZL6TIPvrjFtfc/xL3wzAJLZ0bsTTtiVvrBcuX8AvOyyqCbEPQamj8DIIwuYOwV6vHLjF9YpOka5s0R/ZURy69usnHvMk7g1IOiiuqJ1hwx1TLDZ7dZO44AjM5tczxZoW0j88mUr/7xCQffPWDjyiXWX3mO5UsbONUTUDn1FYoquTvCjs6ydP49hpf+AoDrDXm4c5/5wWPSFCaf3+fgi9v0msB4ZQVjDU4B7wyDyrHQ8wxqhzGC8YFuNmH/xnUefX8TgOXnXyLOBhjnsc6ysLpEe26dhdVlQq8mNhH3w/5Ttq9s8vqLz/DnN7cYBIOXwpPOUuJdjvc/YO/qPwGoeu/iwx/w/YssXRyz/bc/EqcNvTMjjmZTfvzgU9zVW/s8v7nMq5fXGFihnWau3pswnXdU4TqL0x1Mvo0CzcEOc12jmxWauERvdQEzMLSzQ/au32H3PzdwN/dmvP/vO3z29UN6wdAmZfeJ8py/w8bwY9bct9RjBaA5vMX8wDPZ/ZHm43XcwCBWKF1i+sMBj27s4giBW4eJO9MploKKRaoRG/VdSvmSFB6AP6lenu0SJy3N/cjh7QjSghRISooRjzmJTV17enXAG8gYojhc8LjKYB2nYzy42hDqmt5wiLHhtClt09A1EacKIoI1gjGg+msy5VSj/4eigmAwCEYMGEUsiDEg4FTV5VxMzBktkFTpSqIjEVG6BO2v3yZBPC7ENhK7DqsJyUBSSsoGVedQPcopPY2dHGdKU9QcR5W209J0aNMlujZRAFzBxLb4rkt1jG0/k2qESjL9nFOlqHWiZVdjfNzldI8Yd0vRn5If7bUD96j07MQ75vmYqEAd8GD7KbLYpPlqys2GCOtB/KZSzhfR1f8B1roU+C5nEcAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDQtMTJUMDM6MjI6MzIrMDA6MDAKmfIIAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA0LTEyVDAzOjIyOjMyKzAwOjAwe8RKtAAAAABJRU5ErkJggg==" /></svg>',
      asSource: true,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          order_way: "desc",
          order_by: "size",
          searchstr: "{imdb}"
        }
      },
      needDoubanInfo: true,
      description: {
        selector: "#release_desc"
      },
      imdb: {
        selector: "#imdbid"
      },
      anonymous: {
        selector: "#anonymous"
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      category: {
        selector: "#categories",
        map: {
          movie: "0",
          tv: "2",
          tvPack: "2",
          music: "1"
        }
      },
      videoType: {
        selector: "#media",
        map: {
          uhdbluray: "Blu-ray",
          bluray: "Blu-ray",
          remux: "Remux",
          encode: "Encode",
          web: "WEB-DL",
          hdtv: "HDTV",
          dvdrip: "Encode",
          other: "Others"
        }
      },
      videoCodec: {
        selector: "#codec",
        map: {
          h264: "AVC/H.264",
          hevc: "HEVC",
          x264: "x264",
          x265: "x265",
          h265: "HEVC",
          mpeg2: "MPEG-2",
          mpeg4: "AVC/H.264",
          vc1: "VC-1",
          dvd: "MPEG"
        }
      },
      resolution: {
        selector: "#format",
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "576p": "Others",
          "480p": "Others"
        }
      }
    },
    bB: {
      url: "https://baconbits.org",
      host: "baconbits.org",
      siteType: "gazelle",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
      asSource: false,
      asTarget: true,
      uploadPath: "/upload.php",
      search: {
        path: "/torrents.php",
        params: {
          searchstr: "{name}",
          order_by: "s4",
          order_way: "desc",
          disablegrouping: 1
        }
      },
      name: {
        selector: "#title"
      },
      description: {
        selector: "#desc"
      },
      category: {
        selector: "#categories",
        map: {
          movie: "Movies",
          tv: "TV",
          tvPack: "TV",
          documentary: "Movies",
          cartoon: "Anime",
          app: "Applications",
          ebook: "E-Books",
          magazine: "Magazines",
          audioBook: "Audiobooks",
          comics: "Comics"
        }
      },
      source: {
        selector: 'select[name="source"]',
        map: {
          uhdbluray: "BluRay",
          bluray: "BluRay",
          hdtv: "HDTV",
          dvd: "DVD9",
          web: "WEB-DL",
          webrip: "WebRip",
          vhs: "VHSRip",
          hddvd: "HD-DVD",
          bluray3d: "BluRay 3D"
        }
      },
      videoCodec: {
        selector: 'select[name="videoformat"]',
        map: {
          h264: "H.264",
          hevc: "H.265",
          x264: "x264",
          x265: "x265",
          h265: "H.265",
          mpeg2: "MPEG-2",
          mpeg4: "H.264",
          vc1: "VC-1",
          xvid: "XVid",
          dvd: "MPEG-2"
        }
      },
      audioCodec: {
        selector: 'select[name="audioformat"]',
        map: {
          aac: "AAC",
          ac3: "AC-3",
          dd: "AC-3",
          "dd+": "AC-3",
          dts: "DTS",
          truehd: "True-HD",
          lpcm: "PCM",
          flac: "FLAC",
          dtshdma: "DTS-HD",
          atmos: "Dolby Atmos",
          dtsx: "DTS:X",
          mp3: "MP3"
        }
      },
      format: {
        selector: 'select[name="container"]',
        map: {
          mkv: "MKV",
          mp4: "MP4",
          avi: "AVI",
          ts: "TS",
          wmv: "WMV",
          vob: "VOB",
          m2ts: "m2ts"
        }
      },
      resolution: {
        selector: 'select[name="resolution"]',
        map: {
          "2160p": "2160p",
          "1080p": "1080p",
          "1080i": "1080i",
          "720p": "720p",
          "480p": "480p",
          "480i": "480i",
          other: "SD"
        }
      },
      mediaInfo: {
        selector: "#release_desc"
      },
      poster: {
        selector: "#image"
      },
      year: {
        selector: 'input[name="year"]'
      },
      tags: {
        selector: "#tags"
      }
    },
    iTS: {
      url: "http://shadowthein.net",
      host: "shadowthein.net",
      siteType: "its",
      asSource: false,
      asTarget: true,
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"    href="data:image/png;base64,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" /></svg>',
      seedDomSelector: "h1~.line>tbody>tr:nth-child(2)",
      needDoubanInfo: true,
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
      },
      name: {
        selector: 'input[name="name"]'
      },
      imdb: {
        selector: 'input[name="imdblink"]'
      },
      description: {
        selector: 'textarea[name="descr"]'
      },
      mediaInfo: {
        selector: 'textarea[name="mediainfo"]'
      },
      tags: {
        hdr: 'input[name="HDR10"]',
        hdr10_plus: 'input[name="HDR10Plus"]',
        dolby_vision: 'input[name="DolbyVision"]'
      },
      anonymous: {
        selector: 'input[name="anonymous"][value="true"]'
      },
      category: {
        selector: 'select[name="type"]',
        map: {
          movie: "68",
          tv: "65",
          concert: "61",
          music: "6",
          ebook: "26"
        }
      }
    },
    "nzbs.in": {
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
    },
    zimuku: {
      url: "http://zimuku.org",
      host: "zimuku.org",
      icon: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">  <image id="image0" width="32" height="32" x="0" y="0"    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAACXlBMVEUbbZ0ZbJwAWpCpx9n///4DWIoZbJ0abJwEXpP6/P3///+5yNEAW5EIYZbK1NlMgJ8QaJsZa5wDXpQAQ3rd4+b///0AUIMDXpMYbJ0OZJcYX4kYbJ4LYZQTR2UYbqEabJ0AWo8FQGIab6EAGC4ALU8ALU0ALE0AIUMAPWIBXJETTW4WcKYZcKIacKMMZpoKRmkZbqARZZcJRGUnd6YWaZoNZJcMY5YJYZUIYpUeU3MYbaAPZ5qjq7CnpKOZlZNCa4MOWodzjJuBhol8foAISG0bb6EabZ0KYJIHW4wAV4pbmLshUm8MZ50NZJgOZpkbbZ4SaJtYkrUjVHIXbaAPZpgrUGYVPVQOOlQKOFMLOFMAK0oiRVr08vBeX2AJTXUbb6AXbqEYb6IZcKMSa6AAXJWHtdC4sawAHzQMYpUbcKIRZ5k4fqjs8vZFTE8APWYac6gbbp4Ya5sgb53l3dkCHzAOZJgccaMIYZUBXJICXZIASoWkpKQAEjcAY50CXpQCXJIWa50HYJTW4+z9/f33+fr2+Prz9vjy8/T1/P/9/f4oapEXa53n7fM1YHgVbJ/09/s5ZHwVa50+c5NXZm9DW2k/WWk+WWkqSVv5+fmLkpc1U2Q/WmpOZXNmdn+EiIoLQ2QacKEVa5wSap4TbKAUbKD6+/xthJMJaKASa58QaZ0OZZn7/PxxhpQPaJwOZZcAVY32+PlmnLyArcdqnr1kmrtwhZIGYJTf6O5OanoTa59tnboAMU8acKIWapsoc5/99PA6Q0cQZpgSaZyFkplXanY2VGYJNU8ANlsSaJobbp8uYKy2AAAAAWJLR0QKaND0VgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+UGBAQjFV4CeTAAAAGYSURBVDjLY2BAAEYmZhZWNgacgJ2Dk4uLmwebDBTw8nFxcfELsMMBVF6QAwqEhEW4uETFxGF8DgmIzZJcuICUNFiBDE4FsnIgBfIKOBUoKoHt4AEylVVUUYGaOlBUA6yAXRPI1NLW0UUBOnpAUX0DsBsMgUwjYxNTM2RgbgEUtbQCm2BtY2tnj2G/g6OTs4sr2A1u7h6eXhgKvH18/VxhQekfEIihICgYObDdQkLDwiMigSAiKjoGJB8bF48SHW4JiUkgkJySCpJOS8/IxBqhWdk5IPncvPwClMiEsQqLQNLFJaVlyBLs5ZoVlVBQBZSvrqmtA3MqNOsbQAoam7iaW1ohoA2ooL0Dwm7p5OLq6gYq4OjBGVlcvX0gBf24FUwAKZg4afKUqdMgYPoMLq6ZsyDs2XPmzpu/AOSIhYsWL4GClKVcXMuWQzkrVq5SQg+HitVcXGvW4k74lCrIWheyfgMeBVkbN23eAvTaVlwKtm2H+H3HThwKQnZBFOzeg0PB3n0g6f0HDvrjUMB+6PCRo8eOnziJKgwAyLSNK8OfEhgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDYtMDRUMDQ6MzU6MjErMDA6MDAJeY68AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA2LTA0VDA0OjM1OjIxKzAwOjAweCQ2AAAAAABJRU5ErkJggg==" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/search",
        params: {
          q: "{imdb}"
        }
      }
    },
    \u8C46\u74E3\u7535\u5F71: {
      url: "https://search.douban.com",
      host: "search.douban.com",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 11 11" enable-background="new 0 0 11 11" xml:space="preserve">  <image id="image0" width="11" height="11" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUWgSUAdQ4AdA0AdQ0NfR1sr3aZyKCWx50KexlUn110r3tyrnlWn14LehoAdhAegiuGuYuRwJaOvpOOv5OGuowhgiwCdhEAdg8wjT3j7+WgyqRdo2Fgpmadx5/i7+QHdRR3sn8efyojgi9zsHvf7eIJdRUpiTbS5dWz1biv0rRipmnw9/FPmlgngzPu9e9cpWYMdRcHehcdhCtLnVbY6dp1r3wthTZInVQihC4VeR8oizaq0LDR5dTY6dvV59jO49Gr0LApizYhhjAwjz07lUg6lUc6lUj///+7fLO6AAAAAWJLR0RHYL3JewAAAAd0SU1FB+UEDxExDPWxFNkAAAB/SURBVAjXFcbZAoFAAAXQWyqEKEtDTMJUyF7WCm3//0nMeTqAINY4UQAkWalziiyh0VRbnNruQOv2dKNv6IPhCCYZT6ypNaPE/p/OnYWzXBEG0/Wov/ap5zJo9mYb7IL9gR1xOl/C6BqFt/sDz1ecpO80iT9fZHlRVkVVFnn2A2t6DyUkoLRcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjQ5OjEyKzAwOjAw+Ka3VAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo0OToxMiswMDowMIn7D+gAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/movie/subject_search",
        params: {
          search_text: "{imdb}"
        }
      }
    },
    \u8C46\u74E3\u8BFB\u4E66: {
      url: "https://search.douban.com",
      host: "search.douban.com",
      icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="11px" viewBox="0 0 11 11" enable-background="new 0 0 11 11" xml:space="preserve">  <image id="image0" width="11" height="11" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEUWgSUAdQ4AdA0AdQ0NfR1sr3aZyKCWx50KexlUn110r3tyrnlWn14LehoAdhAegiuGuYuRwJaOvpOOv5OGuowhgiwCdhEAdg8wjT3j7+WgyqRdo2Fgpmadx5/i7+QHdRR3sn8efyojgi9zsHvf7eIJdRUpiTbS5dWz1biv0rRipmnw9/FPmlgngzPu9e9cpWYMdRcHehcdhCtLnVbY6dp1r3wthTZInVQihC4VeR8oizaq0LDR5dTY6dvV59jO49Gr0LApizYhhjAwjz07lUg6lUc6lUj///+7fLO6AAAAAWJLR0RHYL3JewAAAAd0SU1FB+UEDxExDPWxFNkAAAB/SURBVAjXFcbZAoFAAAXQWyqEKEtDTMJUyF7WCm3//0nMeTqAINY4UQAkWalziiyh0VRbnNruQOv2dKNv6IPhCCYZT6ypNaPE/p/OnYWzXBEG0/Wov/ap5zJo9mYb7IL9gR1xOl/C6BqFt/sDz1ecpO80iT9fZHlRVkVVFnn2A2t6DyUkoLRcAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA0LTE1VDE3OjQ5OjEyKzAwOjAw+Ka3VAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNC0xNVQxNzo0OToxMiswMDowMIn7D+gAAAAASUVORK5CYII=" /></svg>',
      asSource: false,
      asTarget: false,
      search: {
        path: "/book/subject_search?search_text={name}"
      }
    }
  };

  // src/const.js
  var TORRENT_INFO = {
    title: "",
    subtitle: "",
    description: "",
    originalDescription: "",
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
      diy: false,
      chinese_audio: false,
      cantonese_audio: false,
      chinese_subtitle: false,
      dolby_atoms: false,
      dts_x: false,
      hdr: false,
      dolby_vision: false
    },
    otherTags: {},
    mediaInfo: "",
    mediaInfos: [],
    screenshots: [],
    comparisons: [],
    movieAkaName: "",
    movieName: "",
    sourceSite: "",
    sourceSiteType: "",
    size: "",
    isForbidden: false,
    poster: ""
  };
  var DOUBAN_SUGGEST_API = "https://www.douban.com/search?cat=1002&q={query}";
  var PT_GEN_API = "https://media.pttool.workers.dev";
  var TMDB_API_URL = "https://api.tmdb.org";
  var TMDB_API_KEY = "3d62cb1443c6b34b61262ab332aaf78c";
  var USE_CHINESE = /zh-cn|zh-hk|zh-tw/.test(navigator.language.toLowerCase());
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
  var getSortedSiteKeys = () => {
    return Object.keys(PT_SITE).sort((a, b) => {
      const isChineseReg = /[\u4e00-\u9fa5]+/;
      if (isChineseReg.test(a) && !isChineseReg.test(b)) {
        return 1;
      }
      if (!isChineseReg.test(a) && isChineseReg.test(b)) {
        return -1;
      }
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  };
  var SORTED_SITE_KEYS = getSortedSiteKeys();
  var EUROPE_LIST = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "UK", "Vatican City"];
  var CURRENT_SITE_NAME = getSiteName(location.host);
  var CURRENT_SITE_INFO = PT_SITE[CURRENT_SITE_NAME];
  var HDB_TEAM = ["Chotab", "CRiSC", "CtrlHD", "DON", "EA", "EbP", "Geek", "LolHD", "NTb", "RightSiZE", "SA89", "SbR", "TayTo", "VietHD"];
  var NOTIFICATION_TEMPLATE = `
<div class="easy-notification" id="#id#" style="top: #top#px; z-index:#zIndex#;">
  <div class="notification-wrapper">
    <h2 class="notification-title">#title#</h2>
    <div class="notification-content">
      <p>#message#</p>
    </div>
    <div class="notification-close-btn">
    <svg t="1619966620126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2006" width="200" height="200"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2007" fill="#909399"></path></svg>
    </div>
  </div>
</div>
`;

  // src/i18n.json
  var en_US = {
    \u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25: "Failed to get Douban link",
    \u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25: "Failed to get Douban ID",
    \u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25: "Failed to get Douban data",
    \u7F3A\u5C11IMDB\u4FE1\u606F: "Missing IMDB information",
    \u83B7\u53D6\u5931\u8D25: "Request failed",
    \u83B7\u53D6\u6210\u529F: "Data request successful",
    \u8BF7\u6C42\u5931\u8D25: "Request failed",
    "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5": "Upload failed, please try again",
    ptpimg\u4E0A\u4F20\u5931\u8D25: "PtpImg upload failed",
    \u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key: "Please enter the API_KEY of ptpimg in the setting panel",
    \u5C01\u9762\u4E0A\u4F20\u5931\u8D25: "Failed to upload poster",
    "\u6570\u636E\u52A0\u8F7D\u4E2D...": "Loading data...",
    \u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25: "Failed to get list of images",
    "\u8F6C\u6362\u4E2D...": "Converting...",
    "\u8F6C\u6362\u6210\u529F\uFF01": "Converted!",
    "\u83B7\u53D6\u4E2D...": "Requesting...",
    \u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5: "Missing Douban link",
    "\u672C\u79CD\u5B50\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F": "Transfer of this torrent is prohibited, are you sure to continue?",
    \u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210: "Please wait for the page to load",
    \u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5: "Enter the Douban link",
    \u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB: "Get data of Douban",
    \u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB: "Get data of Douban Book",
    \u8F6C\u7F29\u7565\u56FE: "Convert to thumbnails",
    \u5FEB\u901F\u68C0\u7D22: "Quick search",
    \u4E00\u952E\u7FA4\u8F6C: "Batch transfer",
    \u5FEB\u6377\u64CD\u4F5C: "Quick operation",
    \u4E00\u952E\u8F6C\u79CD: "Transfer to",
    \u8F6C\u79CD\u7AD9\u70B9\u542F\u7528: "Select sites for the 'Transfer to' section",
    \u6279\u91CF\u8F6C\u79CD\u542F\u7528: "Select sites for the 'Batch transfer' button",
    \u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9: "One-click batch transfer to the selected sites below",
    \u7AD9\u70B9\u641C\u7D22\u542F\u7528: "Select sites for the 'Quick search' section",
    \u56FE\u5E8A\u914D\u7F6E: "Image Host Settings",
    "\u5982\u4F55\u83B7\u53D6\uFF1F": "How to get it?",
    \u989D\u5916\u529F\u80FD\u5173\u95ED: "Turn off extra features",
    \u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD: "Remove the 'Convert to thumbnails' button",
    \u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A: "Remove the icons",
    \u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD: "Remove the 'Upload screenshots to ptpimg' button",
    \u4FDD\u5B58: "Save",
    \u53D6\u6D88: "Cancel",
    \u9519\u8BEF: "Error",
    \u6210\u529F: "Success",
    \u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25: "Failed to save local site settings",
    \u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868: "Please set up the batch transfer list first",
    "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C": "The transfer pages have been opened, please go to the corresponding page to operate",
    \u63D0\u793A: "Hint",
    \u8F6C\u5B58\u622A\u56FE: "Upload screenshots to another host",
    \u65E0\u9700\u8F6C\u5B58: "No need to upload",
    "\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...": "Uploading, be patient",
    \u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9: "Do not include thanks",
    \u62F7\u8D1D: "Copy",
    \u5DF2\u590D\u5236: "Copied",
    \u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5: "Hide Douban button & link field",
    \u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5: "Please fill the correct link"
  };
  var zh_CN = {
    \u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25: "\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25",
    \u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25: "\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25",
    \u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25: "\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25",
    \u7F3A\u5C11IMDB\u4FE1\u606F: "\u7F3A\u5C11IMDB\u4FE1\u606F",
    \u83B7\u53D6\u5931\u8D25: "\u83B7\u53D6\u5931\u8D25",
    \u83B7\u53D6\u6210\u529F: "\u83B7\u53D6\u6210\u529F",
    \u8BF7\u6C42\u5931\u8D25: "\u8BF7\u6C42\u5931\u8D25",
    "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5": "\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
    ptpimg\u4E0A\u4F20\u5931\u8D25: "ptpimg\u4E0A\u4F20\u5931\u8D25",
    \u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key: "\u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key",
    \u5C01\u9762\u4E0A\u4F20\u5931\u8D25: "\u5C01\u9762\u4E0A\u4F20\u5931\u8D25",
    "\u6570\u636E\u52A0\u8F7D\u4E2D...": "\u6570\u636E\u52A0\u8F7D\u4E2D...",
    \u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25: "\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25",
    "\u8F6C\u6362\u4E2D...": "\u8F6C\u6362\u4E2D...",
    "\u8F6C\u6362\u6210\u529F\uFF01": "\u8F6C\u6362\u6210\u529F\uFF01",
    "\u83B7\u53D6\u4E2D...": "\u83B7\u53D6\u4E2D...",
    \u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5: "\u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5",
    "\u672C\u79CD\u5B50\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F": "\u672C\u79CD\u5B50\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F",
    \u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210: "\u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210",
    \u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5: "\u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5",
    \u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB: "\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB",
    \u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB: "\u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB",
    \u8F6C\u7F29\u7565\u56FE: "\u8F6C\u7F29\u7565\u56FE",
    \u5FEB\u901F\u68C0\u7D22: "\u5FEB\u901F\u68C0\u7D22",
    \u4E00\u952E\u7FA4\u8F6C: "\u4E00\u952E\u7FA4\u8F6C",
    \u5FEB\u6377\u64CD\u4F5C: "\u5FEB\u6377\u64CD\u4F5C",
    \u4E00\u952E\u8F6C\u79CD: "\u4E00\u952E\u8F6C\u79CD",
    \u8F6C\u79CD\u7AD9\u70B9\u542F\u7528: "\u8F6C\u79CD\u7AD9\u70B9\u542F\u7528",
    \u6279\u91CF\u8F6C\u79CD\u542F\u7528: "\u6279\u91CF\u8F6C\u79CD\u542F\u7528",
    \u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9: "\u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9",
    \u7AD9\u70B9\u641C\u7D22\u542F\u7528: "\u7AD9\u70B9\u641C\u7D22\u542F\u7528",
    \u56FE\u5E8A\u914D\u7F6E: "\u56FE\u5E8A\u914D\u7F6E",
    "\u5982\u4F55\u83B7\u53D6\uFF1F": "\u5982\u4F55\u83B7\u53D6\uFF1F",
    \u989D\u5916\u529F\u80FD\u5173\u95ED: "\u989D\u5916\u529F\u80FD\u5173\u95ED",
    \u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD: "\u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD",
    \u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A: "\u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A",
    \u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD: "\u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD",
    \u4FDD\u5B58: "\u4FDD\u5B58",
    \u53D6\u6D88: "\u53D6\u6D88",
    \u9519\u8BEF: "\u9519\u8BEF",
    \u6210\u529F: "\u6210\u529F",
    \u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25: "\u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25",
    \u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868: "\u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868",
    "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C": "\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C",
    \u63D0\u793A: "\u63D0\u793A",
    \u8F6C\u5B58\u622A\u56FE: "\u8F6C\u5B58\u622A\u56FE",
    \u65E0\u9700\u8F6C\u5B58: "\u65E0\u9700\u8F6C\u5B58",
    "\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...": "\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...",
    \u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9: "\u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9",
    \u62F7\u8D1D: "\u62F7\u8D1D",
    \u5DF2\u590D\u5236: "\u5DF2\u590D\u5236",
    \u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5: "\u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5",
    \u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5: "\u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5"
  };
  var i18n_default = {
    en_US,
    "zh-CN": zh_CN
  };

  // src/common.js
  var formatTorrentTitle = (title) => {
    return title.replace(/\.(?!(\d+))/ig, " ").replace(/\.(?=\d{4}|48|57|72|2k|4k|7.1|6.1|5.1|4.1|2.0|1.0)/ig, " ").trim();
  };
  var handleError = (error) => {
    showNotice({
      text: error.message || error
    });
  };
  var getDoubanInfo = async (doubanUrl) => {
    try {
      if (doubanUrl) {
        const data = await fetch(doubanUrl, {
          responseType: "text"
        });
        if (data) {
          const doubanData = await getDataFromDoubanPage(data);
          doubanData.format = getDoubanFormat(doubanData);
          return doubanData;
        } else {
          if (doubanUrl.match(/\/book/)) {
            throw data.error;
          } else {
            const doubanInfo = await getAnotherDoubanInfo(doubanUrl);
            return doubanInfo;
          }
        }
      } else {
        throw $t("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
      }
    } catch (error) {
      handleError(error);
    }
  };
  var getDataFromDoubanPage = async (domString) => {
    var _a, _b, _c, _d;
    const dom = new DOMParser().parseFromString(domString, "text/html");
    const fetchAnchor = function(anchor) {
      var _a2, _b2, _c2, _d2;
      return (_d2 = (_c2 = (_b2 = (_a2 = anchor[0]) == null ? void 0 : _a2.nextSibling) == null ? void 0 : _b2.nodeValue) == null ? void 0 : _c2.trim()) != null ? _d2 : "";
    };
    const chineseTitle = $("title", dom).text().replace("(\u8C46\u74E3)", "").trim();
    const foreignTitle = $('span[property="v:itemreviewed"]', dom).text().replace(chineseTitle, "").trim();
    let aka = [];
    let transTitle;
    let thisTitle;
    const akaAnchor = $('#info span.pl:contains("\u53C8\u540D")', dom);
    if (akaAnchor.length > 0) {
      aka = fetchAnchor(akaAnchor).split(" / ").sort(function(a, b) {
        return a.localeCompare(b);
      }).join("/");
      aka = aka.split("/");
    }
    if (foreignTitle) {
      transTitle = chineseTitle + (aka.length > 0 ? "/" + aka.join("/") : "");
      thisTitle = foreignTitle;
    } else {
      transTitle = aka.join("/") || "";
      thisTitle = chineseTitle;
    }
    transTitle = transTitle.split("/");
    thisTitle = thisTitle.split("/");
    const jsonData = JSON.parse($('head > script[type="application/ld+json"]', dom).html().replace(/(\r\n|\n|\r|\t)/gm, ""));
    const rating = jsonData.aggregateRating ? jsonData.aggregateRating.ratingValue : 0;
    const votes = jsonData.aggregateRating ? jsonData.aggregateRating.ratingCount : 0;
    const director = jsonData.director ? jsonData.director : [];
    const writer = jsonData.author ? jsonData.author : [];
    const cast = jsonData.actor ? jsonData.actor : [];
    const poster = jsonData.image.replace(/s(_ratio_poster|pic)/g, "l$1").replace(/img\d/, "img9");
    const doubanLink = `https://movie.douban.com${jsonData.url}`;
    let imdbId, imdbLink, imdbAverageRating, imdbVotes, imdbRating;
    const imdbLinkAnchor = $('#info span.pl:contains("IMDb")', dom);
    const hasImdb = imdbLinkAnchor.length > 0;
    if (hasImdb) {
      imdbId = fetchAnchor(imdbLinkAnchor);
      imdbLink = `https://www.imdb.com/title/${imdbId}/`;
      const imdbData = await fetch(`https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json`, {
        responseType: "text"
      });
      imdbAverageRating = (_b = (_a = imdbData.match(/rating":(\d\.\d)/)) == null ? void 0 : _a[1]) != null ? _b : 0;
      imdbVotes = (_d = (_c = imdbData.match(/ratingCount":(\d+)/)) == null ? void 0 : _c[1]) != null ? _d : 0;
      imdbRating = `${imdbAverageRating}/10 from ${imdbVotes} users`;
    }
    const year = " " + $("#content > h1 > span.year", dom).text().substr(1, 4);
    const playdate = $('#info span[property="v:initialReleaseDate"]', dom).map(function() {
      return $(this).text().trim();
    }).toArray().sort(function(a, b) {
      return new Date(a) - new Date(b);
    });
    const introductionDom = $('#link-report > span.all.hidden, #link-report > [property="v:summary"]', dom);
    const summary = (introductionDom.length > 0 ? introductionDom.text() : "\u6682\u65E0\u76F8\u5173\u5267\u60C5\u4ECB\u7ECD").split("\n").map((a) => a.trim()).filter((a) => a.length > 0).join("\n");
    const genre = $('#info span[property="v:genre"]', dom).map(function() {
      return $(this).text().trim();
    }).toArray();
    const language = fetchAnchor($('#info span.pl:contains("\u8BED\u8A00")', dom));
    const region = fetchAnchor($('#info span.pl:contains("\u5236\u7247\u56FD\u5BB6/\u5730\u533A")', dom));
    const runtimeAnchor = $('#info span.pl:contains("\u5355\u96C6\u7247\u957F")', dom);
    const runtime = runtimeAnchor[0] ? fetchAnchor(runtimeAnchor) : $('#info span[property="v:runtime"]', dom).text().trim();
    const episodesAnchor = $('#info span.pl:contains("\u96C6\u6570")');
    const episodes = episodesAnchor[0] ? fetchAnchor(episodesAnchor) : "";
    let tags;
    const tag_another = $('div.tags-body > a[href^="/tag"]', dom);
    if (tag_another.length > 0) {
      tags = tag_another.map(function() {
        return $(this).text();
      }).get();
    }
    const awardsPage = await fetch(`${doubanLink}/awards`, {
      responseType: "text"
    });
    const awardsDoc = new DOMParser().parseFromString(awardsPage, "text/html");
    const awards = $("#content > div > div.article", awardsDoc).html().replace(/[ \n]/g, "").replace(/<\/li><li>/g, "</li> <li>").replace(/<\/a><span/g, "</a> <span").replace(/<(div|ul)[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/ +\n/g, "\n").trim();
    return {
      imdb_link: imdbLink,
      imdb_id: imdbId,
      imdb_rating_average: imdbAverageRating,
      imdb_votes: imdbVotes,
      imdb_rating: imdbRating,
      chinese_title: chineseTitle,
      foreign_title: foreignTitle,
      aka,
      trans_title: transTitle,
      this_title: thisTitle,
      year,
      playdate,
      region,
      genre,
      language,
      episodes,
      duration: runtime,
      introduction: summary,
      douban_link: doubanLink,
      douban_rating_average: rating || 0,
      douban_votes: votes,
      douban_rating: `${rating}/10 from ${votes} users`,
      poster,
      director,
      cast,
      writer,
      awards,
      tags
    };
  };
  var getAnotherDoubanInfo = async (doubanUrl) => {
    var _a, _b;
    try {
      if (doubanUrl) {
        const doubanId = (_b = (_a = doubanUrl.match(/subject\/(\d+)/)) == null ? void 0 : _a[1]) != null ? _b : "";
        if (!doubanId) {
          throw $t("\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25");
        }
        const data = await fetch(`https://movie.querydata.org/api?id=${doubanId}`);
        if (data && data.id) {
          return formatDoubanInfo(data);
        } else {
          throw data.message || $t("\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25");
        }
      } else {
        throw $t("\u8C46\u74E3\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
      }
    } catch (error) {
      handleError(error);
    }
  };
  var formatDoubanInfo = (data) => {
    var _a;
    const {
      doubanId,
      imdbId,
      imdbRating,
      imdbVotes,
      dateReleased,
      alias,
      originalName,
      doubanRating,
      episodes,
      doubanVotes,
      year,
      duration,
      director,
      data: info,
      actor,
      writer
    } = data;
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
    let transTitle = (_a = alias == null ? void 0 : alias.split("/")) != null ? _a : "";
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
      playdate: [dateReleased == null ? void 0 : dateReleased.match(/\d+-\d+-\d+/)[0]],
      region: info[0].country,
      genre: chineseInfo.genre.split("/"),
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
    formatData.format = getDoubanFormat(formatData);
    return formatData;
  };
  var getDoubanFormat = (data) => {
    const {
      poster,
      this_title,
      trans_title,
      genre,
      year: movieYear,
      region,
      language,
      playdate,
      imdb_rating,
      imdb_link,
      douban_rating,
      douban_link,
      episodes: showEpisodes,
      duration: movieDuration,
      director: directors,
      writer: writers,
      cast: actors,
      introduction,
      awards,
      tags
    } = data;
    let descr = poster ? `[img]${poster}[/img]

` : "";
    descr += trans_title ? `\u25CE\u8BD1\u3000\u3000\u540D\u3000${trans_title.join("/")}
` : "";
    descr += this_title ? `\u25CE\u7247\u3000\u3000\u540D\u3000${this_title.join("/")}
` : "";
    descr += movieYear ? `\u25CE\u5E74\u3000\u3000\u4EE3\u3000${movieYear.trim()}
` : "";
    descr += region ? `\u25CE\u4EA7\u3000\u3000\u5730\u3000${region}
` : "";
    descr += genre ? `\u25CE\u7C7B\u3000\u3000\u522B\u3000${genre.join(" / ")}
` : "";
    descr += language ? `\u25CE\u8BED\u3000\u3000\u8A00\u3000${language}
` : "";
    descr += playdate ? `\u25CE\u4E0A\u6620\u65E5\u671F\u3000${playdate.join(" / ")}
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
    descr += tags && tags.length > 0 ? `
\u25CE\u6807\u3000\u3000\u7B7E\u3000${tags.join(" | ")}
` : "";
    descr += introduction ? `
\u25CE\u7B80\u3000\u3000\u4ECB

\u3000\u3000${introduction.replace(/\n/g, "\n" + "\u3000".repeat(2))}
` : "";
    descr += awards ? `
\u25CE\u83B7\u5956\u60C5\u51B5

\u3000\u3000${awards.replace(/\n/g, "\n" + "\u3000".repeat(2))}
` : "";
    return descr.trim();
  };
  var getDoubanIdByIMDB = async (query) => {
    var _a, _b, _c;
    try {
      const imdbId = getIMDBIdByUrl(query);
      const params = imdbId || query;
      const url = DOUBAN_SUGGEST_API.replace("{query}", params);
      const data = await fetch(url, {
        responseType: "text"
      });
      const doc = new DOMParser().parseFromString(data, "text/html");
      const linkDom = doc.querySelector(".result-list .result h3 a");
      if (!linkDom) {
        throw $t("\u8C46\u74E3ID\u83B7\u53D6\u5931\u8D25");
      } else {
        const {href, textContent} = linkDom;
        const season = (_b = (_a = textContent.match(/第(.+?)季/)) == null ? void 0 : _a[1]) != null ? _b : "";
        const doubanId = (_c = decodeURIComponent(href).match(/subject\/(\d+)/)) == null ? void 0 : _c[1];
        return {
          id: doubanId,
          season,
          title: textContent
        };
      }
    } catch (error) {
      handleError(error);
    }
  };
  var getIMDBData = async (imdbUrl) => {
    try {
      if (!imdbUrl) {
        throw new Error("$t(\u7F3A\u5C11IMDB\u4FE1\u606F)");
      }
      const data = await fetch(`${PT_GEN_API}?url=${imdbUrl}`);
      if (data && data.success) {
        return data;
      } else {
        throw data.error || $t("\u8BF7\u6C42\u5931\u8D25");
      }
    } catch (error) {
      handleError(error);
    }
  };
  var transferImgs = async (screenshot, authToken, imgHost = "https://imgbb.com/json") => {
    try {
      const isHdbHost = !!screenshot.match(/i\.hdbits\.org/);
      const formData = new FormData();
      if (isHdbHost) {
        const promiseArray = [urlToFile(screenshot)];
        const [fileData] = await Promise.all(promiseArray);
        formData.append("type", "file");
        formData.append("source", fileData);
      } else {
        formData.append("type", "url");
        formData.append("source", screenshot);
      }
      formData.append("action", "upload");
      formData.append("timestamp", Date.now());
      formData.append("auth_token", authToken);
      const res = await fetch(imgHost, {
        method: "POST",
        data: formData,
        timeout: 3e5
      });
      if (res.status_txt !== "OK") {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
      if (res.image) {
        return res.image;
      } else {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
    } catch (error) {
      handleError(error);
    }
  };
  var uploadToPixhost = async (screenshots) => {
    try {
      const params = encodeURI(`imgs=${screenshots}&content_type=1&max_th_size=300`);
      const res = await fetch("https://pixhost.to/remote/", {
        method: "POST",
        data: params,
        timeout: 3e5,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        responseType: "text"
      });
      const data = res.match(/(upload_results = )({.*})(;)/);
      if (!data) {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
      let imgResultList = [];
      if (data && data.length) {
        imgResultList = JSON.parse(data[2]).images;
        if (imgResultList.length < 1) {
          throw new Error($t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
        }
        return imgResultList;
      } else {
        throw new Error($t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
      }
    } catch (error) {
      handleError(error);
    }
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
      if (movieGenre.match(/动画/)) {
        category = "cartoon";
      } else if (movieGenre.match(/纪录/)) {
        category = "documentary";
      } else if (title.match(/(s0?\d{1,2})?e(p)?\d{1,2}/i) || (subtitle == null ? void 0 : subtitle.match(/第[^\s]集/))) {
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
    if (title.match(/atmos/i)) {
      return "atmos";
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
  var getFilterImages = (bbcode) => {
    if (!bbcode) {
      return [];
    }
    let allImages = bbcode.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/g);
    if (allImages && allImages.length > 0) {
      allImages = allImages.map((img) => {
        if (img.match(/\[url=.+?\]/)) {
          return img + "[/url]";
        }
        return img;
      });
      return allImages.filter((item) => {
        return !item.match(/MoreScreens|PTer\.png|trans\.gif|PTerREMUX\.png|PTerWEB\.png|CS\.png|Ourbits_info|GDJT|douban|logo|(2019\/03\/28\/5c9cb8f8216d7\.png)|_front|(info_01\.png)|(screens\.png)|(04\/6b\/Ggp5ReQb_o)|(ce\/e7\/KCmGFMOB_o)/);
      });
    }
    return [];
  };
  var getScreenshotsFromBBCode = (bbcode) => {
    const allImages = getFilterImages(bbcode);
    if (allImages && allImages.length > 0) {
      return getOriginalImgUrl(allImages);
    }
    return [];
  };
  var getOriginalImgUrl = (imgArray) => {
    return imgArray.map((item) => {
      var _a, _b, _c, _d, _e, _f;
      let imgUrl = item;
      if (item.match(/\[url=http(s)*:.+/)) {
        imgUrl = (_a = item.match(/=(([^\]])+)/)) == null ? void 0 : _a[1];
        if (imgUrl.match(/img\.hdbits\.org/)) {
          const imgId = item.match(/\[url=https:\/\/img\.hdbits\.org\/(\w+)?\]/)[1];
          imgUrl = `https://i.hdbits.org/${imgId}.png`;
        } else if (item.match(/img\.pterclub\.com/)) {
          imgUrl = (_b = item.match(/img\](([^[])+)/)) == null ? void 0 : _b[1];
          imgUrl = imgUrl.replace(/\.th/g, "");
        } else if (item.match(/https?:\/\/imgbox\.com/)) {
          imgUrl = (_c = item.match(/img\](([^[])+)/)) == null ? void 0 : _c[1];
          imgUrl = imgUrl.replace(/thumbs(\d)/, "images$1").replace(/_t(\.png)/, "_o.png");
        } else if (!imgUrl.match(/\.(jpg|png|gif|bmp)$/)) {
          imgUrl = (_d = item.match(/img\](([^[])+)/)) == null ? void 0 : _d[1];
        } else if (item.match(/https:\/\/pixhost\.to/)) {
          const hostNumber = (_e = item.match(/img\]https:\/\/t(\d+)\./)) == null ? void 0 : _e[1];
          imgUrl = imgUrl.replace(/(pixhost\.to)\/show/, `img${hostNumber}.$1/images`);
        }
      } else if (item.match(/\[img\]/)) {
        imgUrl = (_f = item.match(/img\](([^[])+)/)) == null ? void 0 : _f[1];
      }
      return imgUrl;
    });
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
    var _a, _b;
    const {chinese_title: chineseTitle, this_title: originalTitle, trans_title: transTitle} = data;
    let title = "";
    if (chineseTitle.match(/[\u4e00-\u9fa5]+/)) {
      title += chineseTitle;
    }
    const moreTitle = originalTitle.concat(transTitle).filter((item) => title !== item);
    let seasonEpisode = (_b = (_a = TORRENT_INFO.title.match(/S\d+EP?(\d+)?/i)) == null ? void 0 : _a[1]) != null ? _b : "";
    seasonEpisode = seasonEpisode.replace(/^0/i, "");
    const episode = seasonEpisode ? ` \u7B2C${seasonEpisode}\u96C6` : "";
    const hardcodedSub = TORRENT_INFO.hardcodedSub ? "| \u786C\u5B57\u5E55" : "";
    return `${title}${moreTitle.length > 0 ? "/" : ""}${moreTitle.join("/")}${episode} ${hardcodedSub}`;
  };
  var getAreaCode = (area) => {
    const europeList = EUROPE_LIST;
    if (area) {
      if (area.match(/USA|US|Canada|CA|美国|加拿大|United States/i)) {
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
    if (GBSize < 5) {
      return "DVD5";
    } else if (GBSize < 9) {
      return "DVD9";
    } else if (GBSize < 25) {
      return "BD25";
    } else if (GBSize < 50) {
      return "BD50";
    } else if (GBSize < 66) {
      return "BD66";
    } else if (GBSize < 100) {
      return "BD100";
    }
  };
  var getTMDBIdByIMDBId = async (imdbid) => {
    try {
      const url = `${TMDB_API_URL}/3/find/${imdbid}?api_key=${TMDB_API_KEY}&language=en&external_source=imdb_id`;
      const data = await fetch(url);
      const isMovie = data.movie_results && data.movie_results.length > 0;
      const isTV = !data.tv_results && data.tv_results.length > 0;
      if (!isMovie && !isTV) {
        throw $t("\u8BF7\u6C42\u5931\u8D25");
      }
      const tmdbData = isMovie ? data.movie_results[0] : data.tv_results[0];
      return tmdbData;
    } catch (error) {
      return {};
    }
  };
  var getTMDBVideos = async (tmdbId) => {
    const url = `${TMDB_API_URL}/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en`;
    const data = await fetch(url);
    return data.results || [];
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
    var _a, _b, _c;
    if (!mediaInfo) {
      return false;
    }
    const mediaArray = mediaInfo.split(/\n\s*\n/).filter((item) => !!item.trim());
    const [generalPart, videoPart] = mediaArray;
    const secondVideoPart = mediaArray.filter((item) => item.startsWith("Video #2"));
    const [audioPart, ...otherAudioPart] = mediaArray.filter((item) => item.startsWith("Audio"));
    const textPart = mediaArray.filter((item) => item.startsWith("Text"));
    const completeName = getMediaValueByKey("Complete name", generalPart);
    const format = (_c = (_b = (_a = completeName == null ? void 0 : completeName.match(/\.(\w+)$/i)) == null ? void 0 : _a[1]) == null ? void 0 : _b.toLowerCase()) != null ? _c : "";
    const fileName = completeName.replace(/\.\w+$/i, "");
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
      format,
      subtitles: subtitleLanguageArray,
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
    const reg = new RegExp(`${keyRegStr}\\s*:\\s([^\\n]+)`, "i");
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
      mediaTags.chinese_audio = true;
    }
    if (languageArray.includes("Cantonese")) {
      mediaTags.cantonese_audio = true;
    }
    if (hasChineseSubtitle) {
      mediaTags.chinese_subtitle = true;
    }
    if (hdrFormat) {
      if (hdrFormat.match(/HDR10\+/i)) {
        mediaTags.hdr10_plus = true;
      } else if (hdrFormat.match(/HDR/i)) {
        mediaTags.hdr = true;
      }
    }
    if (isDV) {
      mediaTags.dolby_vision = true;
    }
    if (audioCodec.match(/dtsx|atmos/ig)) {
      mediaTags.dts_x = true;
    } else if (audioCodec.match(/atmos/ig)) {
      mediaTags.dolby_atmos = true;
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
      videoCodec = "mpeg2";
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
      subtitles: subtitleLanguageArray,
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
        if (p1 && p1.match(/温馨提示|郑重|PT站|网上搜集|本种子|商业盈利|商业用途|带宽|寬帶|法律责任|Quote:|正版|商用|注明|后果|负责/)) {
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
              return `[quote]${node.textContent.trim()}[/quote]`;
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
                node.innerHTML = node.innerHTML.replace(/&nbsp;/g, " ");
                return `
[quote]${node.textContent}[/quote]`;
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
            } else if (CURRENT_SITE_NAME === "BeyondHD") {
              if (className === "spoilerChild") {
                pp("\n[quote]", "[/quote]");
              } else if (className === "spoilerHide") {
                return "";
              }
              break;
            } else if (className === "spoiler-text" && CURRENT_SITE_INFO.siteType === "AvistaZ") {
              pp("\n[quote]", "[/quote]");
              break;
            } else if (className === "spoiler-toggle" && CURRENT_SITE_INFO.siteType === "AvistaZ") {
              return "";
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
            if (CURRENT_SITE_INFO.siteType === "NexusPHP" && CURRENT_SITE_NAME !== "OurBits" || CURRENT_SITE_NAME.match(/^(UHDBits|HDBits|BTN)/)) {
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
            if (CURRENT_SITE_NAME.match(/^(TTG|HDBits|KG|HDSpace)/) || CURRENT_SITE_NAME === "HDT" || CURRENT_SITE_INFO.siteType === "UNIT3D") {
              pp("[quote]", "[/quote]");
              break;
            } else if (CURRENT_SITE_NAME === "EMP") {
              pp("");
              break;
            } else {
              return "";
            }
          }
          case "IMG": {
            let imgUrl = "";
            const {src, title} = node;
            const dataSrc = node.getAttribute("data-src") || node.getAttribute("data-echo");
            if (title === ":m:") {
              return ":m:";
            }
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
              if (CURRENT_SITE_NAME === "HDSpace") {
                const div = $(node).find("div");
                if (div[0] && div.attr("id")) {
                  const imgUrl = div.find("img").attr("src");
                  return `[url=${href}][img]${imgUrl}[/img][/url]`;
                }
              } else if (href.match(/javascript:void/) || textContent === "show" && CURRENT_SITE_NAME === "HDT") {
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
        if (node.textContent.trim().match(/^(引用|Quote|代码|代碼|Show|Hide|Hidden text|Hidden content|\[show\]|\[Show\])/)) {
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
      tags.diy = true;
    }
    if (title.match(/国配|国语|普通话|国粤/i) && !title.match(/多国语言/)) {
      tags.chinese_audio = true;
    }
    if (title.match(/Atmos|杜比全景声/i)) {
      tags.dolby_atoms = true;
    }
    if (title.match(/HDR/i)) {
      if (title.match(/HDR10\+/i)) {
        tags.hdr10_plus = true;
      } else {
        tags.hdr = true;
      }
    }
    if (title.match(/DoVi|(Dolby\s*Vision)|杜比视界/i)) {
      tags.dolby_vision = true;
    }
    if (title.match(/粤/i)) {
      tags.cantonese_audio = true;
    }
    if (title.match(/简繁|繁简|繁体|简体|中字|中英|中文/i)) {
      tags.chinese_subtitle = true;
    }
    if (title.match(/Criterion|CC标准/i)) {
      tags.the_criterion_collection = true;
    }
    return tags;
  };
  var getBDInfoOrMediaInfo = (bbcode) => {
    var _a, _b, _c;
    const quoteList = (_a = bbcode == null ? void 0 : bbcode.match(/\[quote\](.|\n)+?\[\/quote\]/g)) != null ? _a : [];
    let bdinfo = "";
    let mediaInfo = "";
    quoteList.forEach((quote) => {
      const quoteContent = quote.replace(/\[\/?quote\]/g, "").replace(/\u200D/g, "");
      if (quoteContent.match(/Disc\s?Size|\.mpls/i)) {
        bdinfo += quoteContent;
      }
      if (quoteContent.match(/(Unique\s*ID)|(Codec\s*ID)|(Stream\s*size)/i)) {
        mediaInfo += quoteContent;
      }
    });
    if (!bdinfo) {
      bdinfo = (_c = (_b = bbcode.match(/Disc\s+(Info|Title|Label)[^[]+/i)) == null ? void 0 : _b[0]) != null ? _c : "";
    }
    return {
      bdinfo,
      mediaInfo
    };
  };
  var replaceRegSymbols = (string) => {
    return string.replace(/([*.?+$^[\](){}|\\/])/g, "\\$1");
  };
  var getRtIdFromTitle = async (title, tv, year) => {
    var _a;
    console.log(title, year);
    const MAX_YEAR_DIFF = 2;
    tv = tv || false;
    year = parseInt(year) || 1800;
    const url = `https://www.rottentomatoes.com/api/private/v2.0/search/?limit=2&q=${title}`;
    const data = await fetch(url);
    const movies = tv ? data.tvSeries : data.movies;
    if (!Array.isArray(movies) || movies.length < 1) {
      console.log("no search results");
      return {};
    }
    const sorted = movies.concat();
    if (year && sorted) {
      sorted.sort((a, b) => {
        if (Math.abs(a.year - year) !== Math.abs(b.year - year)) {
          return Math.abs(a.year - year) - Math.abs(b.year - year);
        } else {
          return b.year - a.year;
        }
      });
    }
    let bestMatch, closeMatch;
    for (const m of sorted) {
      m.title = m.title || m.name;
      if (m.title.toLowerCase() === title.toLowerCase()) {
        bestMatch = bestMatch || m;
        console.log("bestMatch", bestMatch);
      } else if (m.title.toLowerCase().startsWith(title.toLowerCase())) {
        closeMatch = closeMatch || m;
        console.log("closeMatch", closeMatch);
      }
      if (bestMatch && closeMatch) {
        break;
      }
    }
    function yearComp(imdb, rt) {
      return rt - imdb <= MAX_YEAR_DIFF && imdb - rt < MAX_YEAR_DIFF;
    }
    if (year && (!bestMatch || !yearComp(year, bestMatch.year))) {
      if (closeMatch && yearComp(year, closeMatch.year)) {
        bestMatch = closeMatch;
      } else if (yearComp(year, sorted[0].year)) {
        bestMatch = sorted[0];
      }
    }
    bestMatch = bestMatch || closeMatch || movies[0];
    if (bestMatch) {
      const id = bestMatch && bestMatch.url.replace(/\/s\d{2}\/?$/, "");
      const score = (_a = bestMatch == null ? void 0 : bestMatch.meterScore) != null ? _a : "0";
      return {
        id,
        score
      };
    } else {
      console.log("no match found on rt");
      return {};
    }
  };
  var showNotice = ({title = `${$t("\u63D0\u793A")}`, text = ""}) => {
    const id = new Date().getTime();
    const lastId = $(".easy-notification:last").attr("id");
    if (lastId && id - lastId < 800) {
      return;
    }
    const zIndex = parseInt($(".easy-notification:last").css("zIndex")) || 2e3;
    let removeTimer = null;
    const notificationDom = NOTIFICATION_TEMPLATE.replace("#title#", title).replace("#message#", text).replace("#id#", id).replace("#top#", 16).replace("#zIndex#", zIndex + 1);
    $("body").append(notificationDom);
    const offsetHeight = $(".easy-notification:last")[0].offsetHeight;
    $(".easy-notification:last").prevAll(".easy-notification").each(function() {
      const top = parseInt($(this).css("top"));
      $(this).css("top", offsetHeight + top + 16 + "px");
    });
    $(".easy-notification:last").addClass("easy-notification-enter");
    $(`#${id}`).find(".notification-close-btn").click(function() {
      const offsetHeight2 = $(`#${id}`)[0].offsetHeight;
      const nextDom = $(`#${id}`).prevAll(".easy-notification");
      $(`#${id}`).remove();
      nextDom.each(function() {
        const top = parseInt($(this).css("top"));
        $(this).css("top", top - offsetHeight2 + "px");
      });
      clearTimeout(removeTimer);
    });
    removeTimer = setTimeout(() => {
      $(`#${id}`).remove();
      clearTimeout(removeTimer);
    }, 4e3);
  };
  var uploadToPtpImg = async (imgArray, isFiles = false) => {
    try {
      const apiKey = GM_getValue("easy-seed.ptp-img-api-key");
      if (!apiKey) {
        showNotice({
          title: $t("ptpimg\u4E0A\u4F20\u5931\u8D25"),
          text: $t("\u8BF7\u5230\u914D\u7F6E\u9762\u677F\u4E2D\u586B\u5165ptpimg\u7684api_key")
        });
        return;
      }
      let formData;
      const options = {
        method: "POST",
        responseType: "json"
      };
      if (isFiles) {
        formData = new FormData();
        imgArray.forEach((img, index) => {
          formData.append(`file-upload[${index}]`, img);
        });
        formData.append("api_key", apiKey);
      } else {
        formData = `link-upload=${imgArray.join("\n")}&api_key=${apiKey}`;
        options.headers = {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
      }
      options.data = formData;
      const data = await fetch("https://ptpimg.me/upload.php", options);
      if (!data) {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
      let imgResultList = [];
      if (data && data.length) {
        imgResultList = data.map((img) => {
          return `https://ptpimg.me/${img.code}.${img.ext}`;
        });
        return imgResultList;
      } else {
        throw $t("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      }
    } catch (error) {
      handleError(error);
    }
  };
  var $t = (key) => {
    var _a, _b;
    const languageKey = USE_CHINESE ? "zh_CN" : "en_US";
    return (_b = (_a = i18n_default[languageKey]) == null ? void 0 : _a[key]) != null ? _b : key;
  };
  var urlToFile = async (url) => {
    var _a, _b;
    const filename = (_b = (_a = url.match(/\/([^/]+)$/)) == null ? void 0 : _a[1]) != null ? _b : "filename";
    const data = await fetch(url, {
      responseType: "blob"
    });
    const file = new File([data], filename, {type: data.type});
    return file;
  };
  var saveScreenshotsToPtpimg = async (imgArray) => {
    try {
      const isHdbHost = !!imgArray[0].match(/i\.hdbits\.org/);
      const isPtpHost = !!imgArray[0].match(/ptpimg\.me/);
      if (isPtpHost) {
        throw $t("\u65E0\u9700\u8F6C\u5B58");
      } else if (isHdbHost) {
        const promiseArray = imgArray.map((item) => {
          return urlToFile(item);
        });
        const fileArray = await Promise.all(promiseArray);
        const data = uploadToPtpImg(fileArray, true);
        return data;
      } else {
        const data = await uploadToPtpImg(imgArray);
        return data;
      }
    } catch (error) {
      handleError(error);
    }
  };
  function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest(__assign(__assign({
        method: "GET",
        url,
        responseType: "json"
      }, options), {
        onload: (res) => {
          const {statusText, status, response} = res;
          if (status !== 200) {
            reject(new Error(statusText || status));
          } else {
            resolve(response);
          }
        },
        ontimeout: () => {
          reject(new Error("timeout"));
        },
        onerror: (error) => {
          reject(error);
        }
      }));
    });
  }

  // src/target/common.js
  var getScreenshotsBBCode = (imgArray) => {
    return imgArray.map((img) => {
      if (img.match(/\[url=.+\]/i)) {
        return img;
      }
      return `[img]${img}[/img]`;
    });
  };
  var getTeamName = (info) => {
    var _a, _b, _c;
    const teamMatch = info.title.match(/-([^-]+)$/);
    let teamName = (_c = (_b = (_a = teamMatch == null ? void 0 : teamMatch[1]) == null ? void 0 : _a.replace(/-/g, "")) == null ? void 0 : _b.split("@")) != null ? _c : "";
    if (teamName) {
      teamName = teamName.length > 1 ? teamName[1] : teamName[0];
    } else {
      teamName = "other";
    }
    return teamName;
  };

  // src/target/its.js
  var its_default = async (info) => {
    var _a, _b, _c, _d, _e, _f, _g;
    let template = `[center]

  [img]$poster$[/img]
  
  [url=$imdbUrl$][img]https://i.ibb.co/KD855ZM/IMDb-Logo-2016.png[/img][/url][size=3]$imdbScore$[/size][*][url=$rtUrl$][img]https://i.ibb.co/BwtmdcV/rottentomatoes-logo.png[/img][/url][size=3]$rtScore$[/size][*][size=3][url=$tmdbUrl$][img]https://i.ibb.co/HhgF1gC/tmdb-logo.png[/img][/url]$tmdbScore$[/size]


  [color=DarkOrange][size=2]\u25E2 SYNOPSIS \u25E3[/size][/color]
  $synopsis$
  
  [color=DarkOrange][size=2]\u25E2 TRAILER \u25E3[/size][/color]
  [youtube]$youtubeUrl$[/youtube]

  [color=DarkOrange][size=2]\u25E2 SCREENSHOTS \u25E3[/size][/color]
  [box][hide]$SCREENSHOTS$[/hide][/box]
  
  [/center]`;
    const collectionMap = {};
    $('select[name="collection_id1"] option').each(function() {
      const option = $(this);
      collectionMap[option.text()] = option.val();
    });
    const collectionValueArr = [];
    const teamName = getTeamName(info);
    if (collectionMap[teamName]) {
      collectionValueArr.push(collectionMap[teamName]);
    }
    const {imdbUrl, category, screenshots, comparisons = [], resolution, movieName} = info;
    if (!resolution.match(/2160|1080|720/) && category === "movie") {
      $('select[name="type"]').val("67");
    }
    const screenshotsBBCode = getScreenshotsBBCode(screenshots);
    template = template.replace("$SCREENSHOTS$", screenshotsBBCode.join("\n"));
    const comparisonImgs = comparisons.flatMap((v) => v.imgs);
    if (comparisonImgs.length > 0) {
      const comparisonImgsBBCode = getScreenshotsBBCode(comparisonImgs);
      template = template.replace(/(\[\/center\])$/, `[color=DarkOrange][size=2]\u25E2 COMPARISONS \u25E3[/size][/color]


    [box][hide]${comparisonImgsBBCode.join(" ")}[/hide][/box]

$1`);
    }
    if (category.match(/tv|movie|cartoon|documentary/)) {
      $('textarea[name="descr"]').val($t("\u6570\u636E\u52A0\u8F7D\u4E2D..."));
      try {
        const replaceParams = {
          tmdbUrl: "",
          tmdbScore: 0,
          imdbScore: 0,
          imdbUrl,
          poster: "",
          synopsis: "",
          rtUrl: "",
          rtScore: 0,
          youtubeUrl: ""
        };
        const {poster = "", imdb_rating_average: imdbRate = 0, description = "", year, aka, directors = [], details = {}} = await getIMDBData(imdbUrl);
        let language = details.Language || "";
        language = (_c = (_b = (_a = language == null ? void 0 : language.split("|")) == null ? void 0 : _a[0]) == null ? void 0 : _b.trim()) != null ? _c : "";
        const director = directors.map((item) => item.name)[0];
        if (collectionMap[director]) {
          collectionValueArr.push(collectionMap[director]);
        }
        if (collectionMap[language]) {
          collectionValueArr.push(collectionMap[language]);
        }
        collectionValueArr.forEach((value, index) => {
          $(`select[name="collection_id${index + 1}"]`).val(value);
        });
        replaceParams.poster = poster;
        replaceParams.synopsis = description;
        replaceParams.imdbScore = imdbRate;
        const imdbId = getIMDBIdByUrl(imdbUrl);
        const {id: tmdbId, vote_average: tmdbRate} = await getTMDBIdByIMDBId(imdbId, {
          append_to_response: "videos"
        });
        if (tmdbId) {
          replaceParams.tmdbUrl = `https://www.themoviedb.org/movie/${tmdbId}`;
          replaceParams.tmdbScore = tmdbRate;
          const videos = await getTMDBVideos(tmdbId);
          const youtubeId = (_f = (_e = (_d = videos.filter((video) => video.site === "YouTube")) == null ? void 0 : _d[0]) == null ? void 0 : _e.key) != null ? _f : "";
          if (youtubeId.length > 0) {
            replaceParams.youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
          }
        }
        const searchMovieName = movieName || ((_g = aka.filter((item) => item.country.match(/(World-wide)|UK|USA/))) == null ? void 0 : _g[0].title);
        const rtInfo = await getRtIdFromTitle(searchMovieName, !!category.match(/tv/), year);
        const {score = 0, id = ""} = rtInfo;
        replaceParams.rtScore = `${score}%`;
        replaceParams.rtUrl = `https://www.rottentomatoes.com/${id}`;
        const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
        if (ptpImgApiKey) {
          const ptpImgPoster = await uploadToPtpImg([poster]);
          replaceParams.poster = ptpImgPoster || "";
        }
        Object.keys(replaceParams).forEach((key) => {
          template = template.replace(`$${key}$`, replaceParams[key]);
        });
        $('textarea[name="descr"]').val(template);
      } catch (error) {
        $('textarea[name="descr"]').val(error.message);
      }
    }
  };

  // src/target/tjupt.js
  var tjupt_default = (info) => {
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

  // src/target/hdr.js
  var hdr_default = (info) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const {description, doubanInfo} = info;
    const fullDescription = description + doubanInfo;
    const imdbRank = (_b = (_a = fullDescription.match(/IMDb评分\s+(\d(\.\d)?)/i)) == null ? void 0 : _a[1]) != null ? _b : "";
    $("#upload-imdb").val(imdbRank);
    const originalName = (_d = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d : "";
    const translateName = (_h = (_g = (_f = (_e = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    const summary = (_l = (_k = (_j = (_i = fullDescription.match(/(简\s+介)\s+([^[◎]+)/)) == null ? void 0 : _i[2]) == null ? void 0 : _j.split("/")) == null ? void 0 : _k[0]) != null ? _l : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : originalName;
    }
    $("#title_chs").val(chineseName);
    $("#upload_introduction").val(summary);
  };

  // src/target/bib.js
  var bib_default = (info) => {
    const {year, pager, translator, author, publisher, ISBN, book_intro} = info.doubanBookInfo;
    $("#AuthorsField").val(author.join(","));
    $("#PublishersField").val(publisher);
    $("#IsbnField").val(ISBN);
    $("#YearField").val(year);
    $("#PagesField").val(pager);
    $("#LanguageField").val("17");
    $("#inputFileID").replaceWith('<textarea name="DescriptionField" id="DescriptionField" rows="15" cols="90"></textarea>');
    $("#TranslatorsField").val(translator.join(","));
    $("#DescriptionField").val(book_intro);
    const event = new Event("change");
    document.getElementById("DescriptionField").dispatchEvent(event);
  };

  // src/target/bB.js
  var bB_default = (info) => {
    const {
      title,
      category,
      imdbUrl,
      formDom,
      tags,
      source,
      screenshots,
      mediaInfo,
      videoType
    } = info;
    const {category: categoryConfig} = CURRENT_SITE_INFO;
    $(categoryConfig.selector).attr("onchange", "").val(categoryConfig.map[category]);
    $("#dynamic_form").html(formDom);
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {format = "", subtitles = []} = getInfoFunc(mediaInfo);
    info.source = getSource(source, title);
    info.format = getFormat(format, videoType);
    const tvTitleArray = [];
    ["source", "videoCodec", "audioCodec", "format", "resolution", "mediaInfo"].forEach((key) => {
      const {selector = "", map} = CURRENT_SITE_INFO[key];
      if (map) {
        const mapValue = map[info[key]];
        $(selector).val(mapValue);
        tvTitleArray.push(mapValue);
      } else {
        $(selector).val(info[key]);
      }
    });
    if (imdbUrl) {
      getIMDBData(imdbUrl).then((imdbData) => {
        var _a, _b, _c;
        let {name, year, genre, directors = [], actors = [], description, poster, details, aka} = imdbData;
        let movieTitle = name;
        const akaName = details["Also Known As"];
        const originalTitle = (_b = (_a = aka.filter((item) => {
          return item.country === "(original title)";
        })) == null ? void 0 : _a[0]) == null ? void 0 : _b.title;
        if (akaName && originalTitle !== movieTitle) {
          movieTitle += ` AKA ${akaName}`;
        }
        if (category.match(/tv/i)) {
          let seasonEpisode = (_c = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _c[0];
          if (seasonEpisode) {
            seasonEpisode = seasonEpisode.toUpperCase().replace(/S0?(\d+)$/, "Season $1");
            movieTitle += ` ${seasonEpisode} `;
          }
          movieTitle += `[${tvTitleArray.join(" / ")}]`;
        }
        $(CURRENT_SITE_INFO.name.selector).val(movieTitle);
        $(CURRENT_SITE_INFO.year.selector).val(year);
        if (Array.isArray(genre)) {
          genre = genre.join(",");
        }
        const castTag = [...directors, ...actors].map((item) => {
          return item.name.replace(/\s/g, ".").toLowerCase();
        });
        $("#tags").val(`${genre},${castTag.join(",")}`);
        $("#desc").val(`${imdbUrl}

${description}`);
        uploadToPtpImg([poster]).then((img) => {
          $(CURRENT_SITE_INFO.poster.selector).val(img[0]);
        }).catch((error) => {
          showNotice({text: error.message || $t("\u5C01\u9762\u4E0A\u4F20\u5931\u8D25")});
        });
      }).catch((error) => {
        console.log(error);
      });
    }
    if (category !== "movie") {
      return;
    }
    const releaseInfo = [];
    if (videoType === "remux") {
      releaseInfo.push("REMUX");
    }
    if (title.match(/Commentary/i)) {
      releaseInfo.push("w. Commentary");
    }
    if (subtitles.length > 0) {
      releaseInfo.push("w. Subtitles");
    }
    if (tags.hdr) {
      releaseInfo.push("HDR");
    }
    $('input[name="remaster_title"]').val(releaseInfo.join(" / "));
    screenshots.forEach((img, index) => {
      index++;
      let inputDom = $(`input[name='screenshot${index}']`);
      if (inputDom[0]) {
        inputDom.val(img);
      } else if (index <= 4 && !inputDom[0]) {
        add_screenshot();
        inputDom = $(`input[name='screenshot${index}']`);
        inputDom.val(img);
      }
    });
  };
  var getSource = (source, title) => {
    if (title.match(/webrip/i)) {
      return "webrip";
    } else if (title.match(/dvd5/i)) {
      return "dvd5";
    } else if (title.match(/dvd9/i)) {
      return "dvd9";
    } else if (title.match(/3D/) && source.match(/bluray/i)) {
      return "bluray3d";
    }
    return source;
  };
  var getFormat = (format, videoType) => {
    if (videoType.match(/bluray/)) {
      format = "m2ts";
    } else if (videoType.match(/dvd/)) {
      format = "vob";
    }
    return format || "mkv";
  };

  // src/target/ptp.js
  var ptp_default = (info) => {
    const {
      title,
      imdbUrl,
      tags,
      size,
      videoCodec,
      videoType,
      resolution
    } = info;
    const groupId = getUrlParam("groupid");
    if (!groupId) {
      $(CURRENT_SITE_INFO.imdb.selector).val(imdbUrl || 0);
      AutoFill();
    }
    info.resolution = getResolution2(resolution, videoType, title);
    info.videoCodec = getVideoCodec(videoCodec, videoType, size);
    ["category", "source", "videoCodec", "resolution"].forEach((key) => {
      const {selector = "", map} = CURRENT_SITE_INFO[key];
      if (map) {
        const mapValue = map[info[key]];
        $(selector).val(mapValue);
      } else {
        $(selector).val(info[key]);
      }
    });
    const description = getDescription(info);
    $(CURRENT_SITE_INFO.description.selector).val(description);
    const editionInfo = getEditionInfo(videoType, tags);
    if (editionInfo.length > 0) {
      $("#remaster").attr("checked", true);
      Remaster();
      editionInfo.forEach((edition) => {
        const event = new Event("click");
        $(`#remaster_tags a:contains("${edition}")`)[0].dispatchEvent(event);
      });
    }
  };
  var getEditionInfo = (videoType, tags) => {
    const editionInfo = [];
    if (videoType === "remux") {
      editionInfo.push("Remux");
    }
    if (tags.hdr) {
      editionInfo.push("HDR10");
    }
    if (tags.hdr10_plus) {
      editionInfo.push("HDR10+");
    }
    if (tags.dolby_vision) {
      editionInfo.push("Dolby Vision");
    }
    if (tags.dolby_atmos) {
      editionInfo.push("Dolby Atmos");
    }
    if (tags.dts_x) {
      editionInfo.push("DTS:X");
    }
    return editionInfo;
  };
  var getVideoCodec = (videoCodec, videoType, size) => {
    if (videoType === "bluray") {
      return getBDType(size);
    } else if (videoType === "dvd") {
      const GBSize = size / 1e9;
      if (GBSize < 5) {
        return "DVD5";
      } else {
        return "DVD9";
      }
    }
    return videoCodec;
  };
  var getResolution2 = (resolution, videoType, title) => {
    if (videoType === "DVD" && title.match(/NTSC/i)) {
      return "NTSC";
    } else if (videoType === "DVD" && title.match(/PAL/i)) {
      return "PAL";
    }
    return resolution;
  };
  var getDescription = (info) => {
    const {description, mediaInfo} = info;
    let filterDescription = "";
    if (mediaInfo) {
      filterDescription += `[mediainfo]${mediaInfo}[/mediainfo]`;
    }
    let screenshots = getScreenshotsFromBBCode(description);
    screenshots = screenshots.map((item) => `[img]${item}[/img]`);
    return filterDescription + "\n" + screenshots.join("\n");
  };

  // src/target/ptn.js
  var ptn_default = (info) => {
    const {resolution, videoType, source} = info;
    let format = "";
    const formatMap = {
      remux: "Remux",
      web: "WebRip",
      dvd: "DVDR",
      dvdrip: "DVDRip",
      "720p": "720P",
      "1080p": "1080P",
      "2160p": "2160P"
    };
    if (videoType.match(/bluray/)) {
      format = "BluRay";
    } else if (videoType === "encode" && source === "bluray") {
      format = formatMap[resolution];
    } else {
      format = formatMap[videoType] || "";
    }
    $("#format").val(format);
  };

  // src/target/gpw.js
  var gpw_default = async (info) => {
    const site = CURRENT_SITE_INFO;
    const isUploadSuccess = !$("#mediainfo")[0];
    if (isUploadSuccess) {
      return;
    }
    transformInfo(info);
    const isAddFormat = getUrlParam("groupid");
    if (!isAddFormat) {
      $(site.imdb.selector).val(info.imdbUrl || 0);
      $("#imdb_button").click();
      $("#upload .collapse").show();
    }
    $(site.category.selector).val(site.category.map[info.category]);
    fillEditionInfo(info);
    fillMediaInfo(info);
    if (!$(site.source.selector).val()) {
      handleNoAutoCheck(info);
    }
    fillScene(info);
    fillProcessing(info);
    fillDescription(info);
    document.querySelector("#description-container .bbcode-preview-button").click();
  };
  function buildDescription(info) {
    let description = "";
    if (info.comparisons.length > 0) {
      for (const comparison of info.comparisons) {
        description += `${comparison.reason}[comparison=${comparison.title}]
${comparison.imgs.join("\n")}
[/comparison]

`;
      }
    }
    if (info.screenshots.length > 0) {
      description += info.screenshots.map((v) => `[img]${v}[/img]`).join("\n") + "\n\n";
    }
    return description.trim();
  }
  function fillEditionInfo(info) {
    const site = CURRENT_SITE_INFO;
    const editionTags = Object.keys(info.tags).map((tag) => info.tags[tag] && site.targetInfo.editionTags[tag]).filter(Boolean);
    let otherTag;
    if (Object.keys(info.otherTags).length > 0) {
      otherTag = Object.keys(info.otherTags).join(", ");
    }
    if (editionTags.length > 0 || otherTag) {
      $("#movie_edition_information").click();
    }
    if (editionTags.length > 0) {
      for (const tag of editionTags) {
        $(`#movie_remaster_tags a[onclick*="'${tag}'"]`).click();
      }
    }
    if (otherTag) {
      $("#other-button").click();
      $("[name=remaster_custom_title]").val(otherTag);
    }
  }
  function buildPTPDescription(info) {
    let text = info.originalDescription;
    text = text.replaceAll("http://ptpimg.me", "https://ptpimg.me");
    for (const mediainfo of info.mediaInfos) {
      text = text.replace(mediainfo, "");
    }
    text = text.replaceAll(/\[(mediainfo|bdinfo)\][\s\S]*?\[\/(mediainfo|bdinfo)\]/gi, "");
    text = text.replaceAll(/^(?!\[img\])https:\/\/ptpimg.me.*?png(?!\[\/img\])$/gim, (imgUrl) => {
      return `[img]${imgUrl}[/img]`;
    });
    text = text.replaceAll(/\[comparison.*\][\s\S]*\[\/comparison\]/gi, (comparisonText) => {
      return comparisonText.replaceAll("[img]", "").replaceAll("[/img]", "").split("https://ptpimg.me").join("\nhttps://ptpimg.me").replaceAll(/\s*\n\s*/g, "\n");
    });
    text = text.replaceAll(/\[hide(.*)?\]\s*\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\[\/hide\]/gi, (imgText) => {
      var _a;
      const imgs = [];
      for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
        imgs.push(urlMatch[1]);
      }
      const rawTitle = ((_a = imgText.match(/^\[hide=(.*?)\]/)) == null ? void 0 : _a[1]) || "";
      const comparisonTitles = rawTitle.trim().split(/\||\/|,|vs\.?| - /i).map((v) => v.trim());
      if (comparisonTitles.length >= 2) {
        return `[comparison=${comparisonTitles.join(", ")}]
${imgs.join("\n")}
[/comparison]
`;
      } else {
        const hideTitle = rawTitle ? `=${rawTitle}` : "";
        return `[hide${hideTitle}]
[img]${imgs.join("[/img]\n[img]")}[/img]
[/hide]
`;
      }
    });
    text = text + "\n\n";
    text = text.replaceAll(/\[url=https:\/\/ptpimg.me.*?png\]\[img\][\s\S]*?\n\n/gi, (imgText) => {
      const imgs = [];
      for (const urlMatch of imgText.matchAll(/\[url=(.*?)\]/ig)) {
        imgs.push(urlMatch[1]);
      }
      return `[hide]
[img]${imgs.join("[/img]\n[img]")}[/img]
[/hide]
`;
    });
    text = text.replaceAll(/\n\s*\n/g, "\n\n");
    return text.trim();
  }
  function fillMediaInfo(info) {
    for (let i = 1; i < info.mediaInfos.length; i++) {
      $("#add-mediainfo")[0].click();
    }
    const textareas = Array.from($('[name="mediainfo[]"]'));
    for (const [index, textarea] of textareas.entries()) {
      textarea.value = info.mediaInfos[index];
      textarea.dispatchEvent(new Event("input"));
    }
    ;
    $('[name="mediainfo[]"]')[0].dispatchEvent(new Event("change"));
  }
  function fillScene(info) {
    if (info.tags.scene) {
      $("#scene").prop("checked", true);
    }
  }
  function fillProcessing(info) {
    let {videoType, size, source, tags} = info;
    if (source.match(/bluray|hddvd|dvd/)) {
      if (tags.diy) {
        videoType = "DIY";
      }
      const videoTypeConfig = CURRENT_SITE_INFO.videoType;
      const {selector, map} = videoTypeConfig;
      $(selector).val(map[videoType]);
      $(selector)[0].dispatchEvent(new Event("change"));
      if (map[videoType] === "Untouched") {
        const bdType = getBDType(size);
        $('select[name="processing_other"]').val(bdType);
      }
      $(selector)[0].dispatchEvent(new Event("input"));
    }
  }
  function handleNoAutoCheck(info) {
    const {
      mediaInfo,
      videoType
    } = info;
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {format = "", subtitles = []} = getInfoFunc(mediaInfo);
    info.format = getFormat2(format, videoType);
    ["source", "videoCodec", "format", "resolution"].forEach((key) => {
      const {selector = "", map} = CURRENT_SITE_INFO[key];
      if (map) {
        const mapValue = map[info[key]];
        $(selector).val(mapValue);
        if (key === "videoCodec" && mapValue === "Other") {
          document.querySelector(selector).dispatchEvent(new Event("change"));
          $('input[name="codec_other"]').val(info[key].toUpperCase());
        }
      } else {
        $(selector).val(info[key]);
      }
    });
    if (subtitles.length > 0) {
      $("#mixed_subtitles").attr("checked", true);
      $('input[name="subtitles[]"][type="checkbox"]').each(function() {
        const language = $(this).attr("id").replace(/^\S|(_\S)/g, (letter) => letter.replace("_", " ").toUpperCase());
        if (subtitles.includes(language)) {
          $(this).attr("checked", true);
        }
      });
      const event = new Event("change");
      document.querySelector("#mixed_subtitles").dispatchEvent(event);
      const chineseLanguages = subtitles.filter((item) => item.match(/Chinese|Traditional|Simplified/i));
      if (chineseLanguages.length === 1 && chineseLanguages[0] === "Chinese") {
        const selector = chineseLanguages[0].match(/Traditional/i) ? "#chinese_traditional" : "#chinese_simplified";
        $(selector).attr("checked", true);
      } else if (chineseLanguages.length >= 2) {
        $("#chinese_traditional,#chinese_simplified").attr("checked", true);
      }
    }
  }
  var getFormat2 = (format, videoType) => {
    if (videoType.match(/bluray/) && format !== "iso") {
      format = "m2ts";
    } else if (videoType.match(/dvd/)) {
      format = "vob";
    }
    return format || "mkv";
  };
  function transformInfo(info) {
    if (info.mediaInfos.length === 0 && info.mediaInfo) {
      info.mediaInfos = [info.mediaInfo];
    }
    if (["encode", "remux"].includes(info.videoType)) {
      const newMediaInfos = [];
      for (const mediaInfo of info.mediaInfos) {
        if (mediaInfo.match(/Disc Title|Disc Label/i)) {
          continue;
        }
        newMediaInfos.push(mediaInfo);
      }
      info.mediaInfos = newMediaInfos;
    }
  }
  function fillDescription(info) {
    const site = CURRENT_SITE_INFO;
    let description;
    if (info.sourceSite === "PTP") {
      description = buildPTPDescription(info);
    } else if (info.sourceSite === "BeyondHD") {
      description = info.originalDescription;
    } else {
      description = buildDescription(info);
    }
    $(site.description.selector).val(description);
    $(site.description.selector)[0].dispatchEvent(new Event("input"));
  }

  // src/target/npubits.js
  var npubits_default = (info) => {
    var _a, _b;
    let {title, year, movieName, category, doubanInfo, description, subtitle} = info;
    $(CURRENT_SITE_INFO.subtitle.selector).val(subtitle);
    if (doubanInfo) {
      description = doubanInfo + "\n" + description;
    }
    $(CURRENT_SITE_INFO.description.selector).val(description);
    $("#torrent_name_checkbox").attr("checked", true);
    $(CURRENT_SITE_INFO.name.selector).val(title);
    $(CURRENT_SITE_INFO.category.selector).val(CURRENT_SITE_INFO.category.map[category]);
    $(CURRENT_SITE_INFO.category.selector)[0].dispatchEvent(new Event("change"));
    if (category.match(/tv/)) {
      const districtMap = {
        CN: "23",
        HK: "24",
        TW: "24",
        JP: "26",
        KR: "27",
        US: "25",
        EU: "65",
        OT: "63"
      };
      $(CURRENT_SITE_INFO.area.selector).val(districtMap[info.area]);
    } else if (category.match(/movie/)) {
      $(CURRENT_SITE_INFO.area.selector).val(CURRENT_SITE_INFO.area.map[info.area]);
    }
    $(CURRENT_SITE_INFO.area.selector)[0].dispatchEvent(new Event("change"));
    ["videoCodec", "videoType", "resolution", "team"].forEach((key) => {
      fill_field(CURRENT_SITE_INFO[key].selector, CURRENT_SITE_INFO[key].map[info[key]]);
    });
    $("#torrent_name_field0").val(movieName);
    if (category === "movie") {
      $("#torrent_name_field1").val(year);
    } else if (category.match(/tv/)) {
      const episode = (_b = (_a = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _a[0]) != null ? _b : "";
      $("#torrent_name_field1").val(episode);
    }
    $('input[name="uplver"]').attr("checked", true);
  };

  // src/target/byr.js
  var byr_default = (info) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const {title, description, doubanInfo, category, videoType, mediaInfo, subtitle, imdbUrl, doubanUrl} = info;
    $(CURRENT_SITE_INFO.subtitle.selector).val(subtitle);
    $(CURRENT_SITE_INFO.imdb.selector).val(imdbUrl);
    $(CURRENT_SITE_INFO.douban.selector).val(doubanUrl);
    CKEDITOR.on("instanceReady", () => {
      CKEDITOR.instances.descr.setData(bbcode2Html(description));
    });
    $("#ename0day").val(title);
    const fullDescription = description + doubanInfo;
    let area = (_b = (_a = fullDescription.match(/(产\s+地|国\s+家)\s+(.+)/)) == null ? void 0 : _a[2]) != null ? _b : "";
    area = area.replace(/\[\/?.+?\]/g, "");
    const originalName = (_d = (_c = fullDescription.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _c[2]) != null ? _d : "";
    const translateName = (_h = (_g = (_f = (_e = fullDescription.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _e[2]) == null ? void 0 : _f.split("/")) == null ? void 0 : _g[0]) != null ? _h : "";
    let movieType = (_j = (_i = fullDescription.match(/(类\s+别)\s+(.+)/)) == null ? void 0 : _i[2]) != null ? _j : "";
    const language = (_l = (_k = fullDescription.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _k[2]) != null ? _l : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
    }
    if (category.match(/movie/)) {
      let selector = "";
      if (area.match(/华语|台|港/)) {
        selector = "\u534E\u8BED";
      } else if (area.match(/日本|韩国|泰国/)) {
        selector = "\u4E9A\u6D32";
      } else if (area.match(/美国|加拿大/)) {
        selector = "\u5317\u7F8E";
      } else if (area.match(/欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "\u6B27\u6D32";
      } else {
        selector = "\u5176\u4ED6";
      }
      const typeMap = {
        \u534E\u8BED: "11",
        \u6B27\u6D32: "12",
        \u5317\u7F8E: "13",
        \u4E9A\u6D32: "14",
        \u5176\u4ED6: "1"
      };
      $('select[name="second_type"]').val(typeMap[selector]);
      $('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      movieType = movieType.split(/\s\//);
      $("#movie_type").val(movieType.join("/"));
      fillField(selector, category === "movie" ? "movie_country" : "show_country");
      $("#movie_cname").val(chineseName);
    } else if (category.match(/tv/)) {
      let selector = "movie_country";
      if (area.match(/大陆/)) {
        selector = "\u5927\u9646";
      } else if (area.match(/台|港/)) {
        selector = "\u6E2F\u53F0";
      } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "\u6B27\u7F8E";
      } else if (area.match(/日本|韩国/)) {
        selector = "\u65E5\u97E9";
      } else {
        selector = "\u5176\u4ED6";
      }
      const typeMap = {
        \u5927\u9646: "15",
        \u6E2F\u53F0: "16",
        \u6B27\u7F8E: "17",
        \u65E5\u97E9: "18",
        \u5176\u4ED6: "2"
      };
      $('select[name="second_type"]').val(typeMap[selector]);
      $('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      fillField(selector, "tv_type");
      $("#tv_ename").val(title);
      $("#cname").val(chineseName);
      const episode = (_n = (_m = title.match(/S\d+(E\d+)?/i)) == null ? void 0 : _m[0]) != null ? _n : "";
      $("#tv_season").val(episode);
      const isBluray = videoType.match(/bluray/i);
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      const {format} = getInfoFunc(mediaInfo);
      fillField(format.toUpperCase() || "MKV", "tv_filetype");
    } else if (category.match(/variety/)) {
      let selector = "";
      if (area.match(/大陆/)) {
        selector = "\u5927\u9646";
      } else if (area.match(/台|港/)) {
        selector = "\u6E2F\u53F0";
      } else if (area.match(/美国|欧|英|法|德|俄|意|苏联|EU/)) {
        selector = "\u6B27\u7F8E";
      } else if (area.match(/日本|韩国/)) {
        selector = "\u65E5\u97E9";
      } else {
        selector = "\u5176\u4ED6";
      }
      const typeMap = {
        \u5927\u9646: "27",
        \u6E2F\u53F0: "29",
        \u6B27\u7F8E: "30",
        \u65E5\u97E9: "28",
        \u5176\u4ED6: "5"
      };
      $('select[name="second_type"]').val(typeMap[selector]);
      $('select[name="second_type"]')[0].dispatchEvent(new Event("change"));
      fillField(selector, "show_country");
      $("#show_cname").val(chineseName);
      $("#show_ename").val(title);
      let languageVal = "";
      if (language.match(/汉语/)) {
        languageVal = "\u56FD\u8BED";
      } else if (language.match(/粤/)) {
        languageVal = "\u7CA4\u8BED";
      } else if (language.match(/英语/)) {
        languageVal = "\u82F1\u8BED";
      } else if (language.match(/日语/)) {
        languageVal = "\u65E5\u8BED";
      } else if (language.match(/韩语/)) {
        languageVal = "\u97E9\u8BED";
      }
      fillField(languageVal, "show_language");
    }
    function bbcode2Html(bbcode) {
      let html = bbcode.replace(/\[\*\]([^\n]+)/ig, "<li>$1</li>");
      html = html.replace(/(\r\n)|\n/g, "<br>");
      html = html.replace(/\[(quote|hide=.+?)\]/ig, "<fieldset><legend>\u5F15\u7528</legend>");
      html = html.replace(/\[(\/)(quote|hide)\]/ig, "<$1fieldset>");
      html = html.replace(/(?!\[url=(http(s)*:\/{2}.+?)\])\[img\](.+?)\[\/img]\[url\]/g, '<a href="$1"><img src="$2"/></a>');
      html = html.replace(/\[img\](.+?)\[\/img]/g, '<img src="$1"/>');
      html = html.replace(/\[(\/)?(left|right|center)\]/ig, "<$1$2>");
      html = html.replace(/\[(\/)?b\]/ig, "<$1strong>");
      html = html.replace(/\[color=(.+?)\]/ig, '<span style="color: $1">').replace(/\[\/color\]/g, "</span>");
      html = html.replace(/\[size=(.+?)\]/ig, '<font size="$1">').replace(/\[\/size\]/g, "</font>");
      html = html.replace(/\[url=(.+?)\](.+?)\[\/url\]/ig, '<a href="$1">$2</a>');
      return html;
    }
  };

  // src/target/sc.js
  var sc_default = async (info) => {
    const imdbId = getIMDBIdByUrl(info.imdbUrl);
    $("#catalogue_number").val(imdbId);
    $("#imdb_autofill").click();
    fillMedia(info);
    $(".wysibb-text-editor.wysibb-body").html(buildDescription2(info));
    await fillIMDb(info);
  };
  function buildDescription2(info) {
    const {screenshots, mediaInfo} = info;
    let description = "";
    if (screenshots.length > 0) {
      description = screenshots.slice(0, 3).map((img) => {
        return `<img src="${img}">`;
      }).join("");
    }
    if (mediaInfo) {
      description += `<br><br>[hide=MediaInfo]${mediaInfo.replace(/\n/g, "<br>")}[/hide]`;
    }
    return description;
  }
  function fillMedia(info) {
    const {videoType, resolution} = info;
    let value;
    if (videoType.match(/bluray/i)) {
      value = "BDMV";
    } else if (videoType === "DVD") {
      value = "DVD-R";
    } else if (parseInt(resolution) < 720) {
      value = "SD";
    } else {
      value = resolution;
    }
    $("#media").val(value);
  }
  async function fillIMDb(info) {
    var _a, _b, _c;
    const {imdbUrl} = info;
    if (imdbUrl) {
      const imdbData = await getIMDBData(info.imdbUrl);
      if (imdbData && ((_a = imdbData == null ? void 0 : imdbData.details) == null ? void 0 : _a["Country of origin"])) {
        $("#country").val(imdbData.details["Country of origin"]);
      }
      if (imdbData && ((_b = imdbData == null ? void 0 : imdbData.details) == null ? void 0 : _b["Also known as"])) {
        $("#alternate_title").val(imdbData.details["Also known as"]);
      }
      if (imdbData && imdbData.poster) {
        let poster;
        const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key");
        if (ptpImgApiKey) {
          poster = await uploadToPtpImg([imdbData.poster]);
        } else {
          const gifyuHtml = await fetch("https://gifyu.com", {
            responseType: "text"
          });
          const authToken = (_c = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)) == null ? void 0 : _c[1];
          const data = await transferImgs(imdbData.poster, authToken, "https://gifyu.com/json");
          poster = data.url;
        }
        $("#image").val(poster);
      }
    }
  }

  // src/site-dom/common.js
  var getQuickSearchUrl = (siteName) => {
    const siteInfo = PT_SITE[siteName];
    const searchConfig = siteInfo.search;
    const {params = {}, imdbOptionKey, nameOptionKey, path, replaceKey} = searchConfig;
    let imdbId = getIMDBIdByUrl(TORRENT_INFO.imdbUrl);
    let searchKeyWord = "";
    const {movieAkaName, movieName, title} = TORRENT_INFO;
    if (imdbId && !siteName.match(/(nzbs.in|HDF|bB|TMDB|豆瓣读书|TeamHD|NPUBits)$/) && siteInfo.siteType !== "AvistaZ") {
      if (replaceKey) {
        searchKeyWord = imdbId.replace(replaceKey[0], replaceKey[1]);
      } else {
        searchKeyWord = imdbId;
      }
    } else {
      searchKeyWord = movieAkaName || movieName || title;
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
    let url = `${siteInfo.url + path}${searchParams ? `?${searchParams}` : ""}`;
    if (siteName.match(/nzb|TMDB|豆瓣读书|SubHD|OpenSub/)) {
      url = url.replace(/{name}/, searchKeyWord);
    }
    return url;
  };

  // src/site-dom/button-function.js
  var getThumbnailImgs = async () => {
    var _a;
    try {
      const allImgs = TORRENT_INFO.screenshots.concat(...TORRENT_INFO.comparisons.map((v) => v.imgs));
      const imgList = [...new Set(allImgs)];
      if (imgList.length < 1) {
        throw new Error($t("\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25"));
      }
      $("#img-transfer").text($t("\u8F6C\u6362\u4E2D...")).attr("disabled", true).addClass("is-disabled");
      $("#transfer-progress").show().text(`0 / ${imgList.length}`);
      const hostMap = {
        imgbb: "https://imgbb.com/json",
        gifyu: "https://gifyu.com/json",
        pixhost: "https://pixhost.to"
      };
      const hostName = $("#img-transfer-select").val();
      const selectHost = hostMap[hostName];
      const uploadedImgs = [];
      let authToken;
      if (hostName !== "pixhost") {
        const rawHtml = await fetch(selectHost.replace("/json", ""), {
          responseType: "text"
        });
        authToken = (_a = rawHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(\w+)"/)) == null ? void 0 : _a[1];
      }
      for (let index = 0; index < imgList.length; index++) {
        let data;
        if (hostName !== "pixhost") {
          data = await transferImgs(imgList[index], authToken, selectHost);
        } else {
          [data] = await uploadToPixhost([imgList[index]]);
        }
        if (data) {
          uploadedImgs.push(data);
          $("#transfer-progress").text(`${uploadedImgs.length} / ${imgList.length}`);
        }
      }
      if (uploadedImgs.length) {
        const thumbnailImgs = uploadedImgs.map((imgData) => {
          if (hostName !== "pixhost") {
            return `[url=${imgData.url}][img]${imgData.thumb.url}[/img][/url]`;
          } else {
            return `[url=${imgData.show_url}][img]${imgData.th_url}[/img][/url]`;
          }
        });
        TORRENT_INFO.screenshots = thumbnailImgs.slice(0, TORRENT_INFO.screenshots.length);
        let {description} = TORRENT_INFO;
        imgList.forEach((img, index) => {
          if (description.includes(img)) {
            description = description.replace(new RegExp(`\\[img\\]${img}\\[\\/img\\]
*`, "ig"), thumbnailImgs[index] || "");
          }
        });
        TORRENT_INFO.description = description;
        showNotice({
          title: $t("\u6210\u529F"),
          text: $t("\u8F6C\u6362\u6210\u529F\uFF01")
        });
      }
    } catch (error) {
      showNotice({
        title: $t("\u9519\u8BEF"),
        text: error.message
      });
    } finally {
      $("#img-transfer").text($t("\u8F6C\u7F29\u7565\u56FE")).removeAttr("disabled").removeClass("is-disabled");
    }
  };
  var getDoubanData = async (selfDom) => {
    try {
      $(selfDom).text($t("\u83B7\u53D6\u4E2D...")).attr("disabled", true).addClass("is-disabled");
      let doubanUrl;
      const scriptDoubanLink = $(".douban-dom").attr("douban-link");
      const doubanLink = $(".page__title>a").attr("href") || scriptDoubanLink || TORRENT_INFO.doubanUrl || $("#douban-link").val();
      if (doubanLink && doubanLink.match("movie.douban.com")) {
        doubanUrl = doubanLink;
      } else {
        const {imdbUrl, movieName} = TORRENT_INFO;
        const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
        let {id, season = ""} = doubanData;
        if (season) {
          const tvData = await getTvSeasonData(doubanData);
          id = tvData.id;
        }
        doubanUrl = `https://movie.douban.com/subject/${id}`;
      }
      if (doubanUrl) {
        TORRENT_INFO.doubanUrl = doubanUrl;
        $("#douban-link").val(doubanUrl);
        if (!TORRENT_INFO.description.match(/(片|译)\s*名/)) {
          const movieData = await getDoubanInfo(doubanUrl);
          showNotice({
            title: $t("\u6210\u529F"),
            text: $t("\u83B7\u53D6\u6210\u529F")
          });
          updateTorrentInfo(movieData);
        } else {
          showNotice({
            title: $t("\u6210\u529F"),
            text: $t("\u83B7\u53D6\u6210\u529F")
          });
        }
      }
    } catch (error) {
      showNotice({
        title: $t("\u9519\u8BEF"),
        text: error.message
      });
    } finally {
      $("#douban-info").text($t("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB")).removeAttr("disabled").removeClass("is-disabled");
    }
  };
  var getTvSeasonData = async (data) => {
    var _a, _b;
    const {title: torrentTitle} = TORRENT_INFO;
    const {season = "", title} = data;
    if (season) {
      const seasonNumber = (_b = (_a = torrentTitle.match(/S(?!eason)?0?(\d+)\.?(EP?\d+)?/i)) == null ? void 0 : _a[1]) != null ? _b : 1;
      if (parseInt(seasonNumber) === 1) {
        return data;
      } else {
        const query = title.replace(/第.+?季/, `\u7B2C${seasonNumber}\u5B63`);
        const response = await getDoubanIdByIMDB(query);
        return response;
      }
    }
  };
  var getDoubanBookInfo = () => {
    let {doubanUrl} = TORRENT_INFO;
    if (!doubanUrl) {
      doubanUrl = $("#douban-link").val();
    } else {
      $("#douban-link").val(doubanUrl);
    }
    if (doubanUrl) {
      $("#douban-book-info").text($t("\u83B7\u53D6\u4E2D...")).attr("disabled", true).addClass("is-disabled");
      getDoubanInfo(doubanUrl).then((data) => {
        TORRENT_INFO.title = data.chinese_title || data.origin_title;
        TORRENT_INFO.image = data.poster;
        TORRENT_INFO.description = data.book_intro;
        TORRENT_INFO.doubanBookInfo = data;
        showNotice({
          title: $t("\u6210\u529F"),
          text: $t("\u83B7\u53D6\u6210\u529F")
        });
      }).catch((error) => {
        showNotice({
          title: $t("\u9519\u8BEF"),
          text: error.message
        });
      }).finally(() => {
        $("#douban-book-info").text($t("\u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB")).removeAttr("disabled").removeClass("is-disabled");
      });
    } else {
      showNotice({
        title: $t("\u9519\u8BEF"),
        text: $t("\u7F3A\u5C11\u8C46\u74E3\u94FE\u63A5")
      });
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
  var uploadScreenshotsToAnother = async (selfDom) => {
    var _a;
    const screenshots = getOriginalImgUrl(TORRENT_INFO.screenshots);
    $(selfDom).text($t("\u4E0A\u4F20\u4E2D\uFF0C\u8BF7\u7A0D\u5019...")).attr("disabled", true).addClass("is-disabled");
    try {
      $("#copy-img").hide();
      const selectHost = $("#img-host-select").val();
      const imgData = [];
      if (selectHost === "ptpimg") {
        for (let index = 0; index < screenshots.length; index++) {
          const data = await saveScreenshotsToPtpimg([screenshots[index]]);
          if (data) {
            imgData.push(data);
          }
        }
      } else {
        const gifyuHtml = await fetch("https://gifyu.com", {
          responseType: "text"
        });
        const authToken = (_a = gifyuHtml.match(/PF\.obj\.config\.auth_token\s*=\s*"(.+)?"/)) == null ? void 0 : _a[1];
        for (let index = 0; index < screenshots.length; index++) {
          const data = await transferImgs(screenshots[index], authToken, "https://gifyu.com/json");
          if (data) {
            imgData.push(data.url);
          }
        }
      }
      showNotice({text: $t("\u6210\u529F")});
      let {description, originalDescription} = TORRENT_INFO;
      TORRENT_INFO.screenshots = imgData;
      const screenBBCode = imgData.map((img) => {
        return `[img]${img}[/img]`;
      });
      $("#copy-img").show().click(function() {
        GM_setClipboard(screenBBCode.join(""));
        $(this).text($t("\u5DF2\u590D\u5236")).attr("disabled", true).addClass("is-disabled");
      });
      const allImages = description.match(/(\[url=(http(s)*:\/{2}.+?)\])?\[img\](.+?)\[\/img](\[url\])?/ig);
      if (allImages && allImages.length > 0) {
        allImages.forEach((img) => {
          if (img.match(/\[url=.+?\]/)) {
            img += "[/url]";
          }
          originalDescription = originalDescription.replace(img, "");
          description = description.replace(img, "");
        });
      }
      TORRENT_INFO.originalDescription = originalDescription + "\n" + screenBBCode.join("");
      TORRENT_INFO.description = description + "\n" + screenBBCode.join("");
    } catch (error) {
      showNotice({title: $t("\u9519\u8BEF"), text: error.message});
    } finally {
      $(selfDom).text($t("\u8F6C\u5B58\u622A\u56FE")).removeAttr("disabled").removeClass("is-disabled");
    }
  };
  var checkQuickResult = () => {
    const searchListSetting = GM_getValue("easy-seed.enabled-search-site-list");
    let searchSitesEnabled = searchListSetting ? JSON.parse(searchListSetting) : [];
    if (searchSitesEnabled.length === 0) {
      searchSitesEnabled = SORTED_SITE_KEYS;
    }
    searchSitesEnabled.forEach(async (site) => {
      var _a;
      const resultConfig = (_a = PT_SITE[site].search) == null ? void 0 : _a.result;
      const siteUrl = PT_SITE[site].url;
      if (resultConfig) {
        const {list, name, size, url: urlDom} = resultConfig;
        const {title, size: searchSize} = TORRENT_INFO;
        const url = getQuickSearchUrl(site);
        const domString = await fetch(url, {
          responseType: "text"
        });
        const dom = new DOMParser().parseFromString(domString, "text/html");
        const torrentList = $(list, dom);
        const sameTorrent = Array.prototype.find.call(torrentList, function(item) {
          var _a2, _b, _c, _d, _e;
          let torrentName;
          if (site === "TTG") {
            torrentName = (_c = (_b = (_a2 = $(item).find(name).prop("firstChild")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim()) != null ? _c : "";
          } else {
            torrentName = $(item).find(name).attr("title") || $(item).find(name).text();
          }
          if (site === "TJUPT") {
            const matchArray = torrentName.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
            const realTitle = (_e = (_d = matchArray.filter((item2) => item2.match(/\.| /))) == null ? void 0 : _d[0]) != null ? _e : "";
            torrentName = realTitle.replace(/\[|\]/g, "");
          }
          torrentName = torrentName == null ? void 0 : torrentName.replace(/\s|\./g, "");
          const sizeBytes = getSize($(item).find(size).text());
          return torrentName === (title == null ? void 0 : title.replace(/\s|\./g, "")) && Math.abs(sizeBytes - searchSize) < Math.pow(1024, 2) * 1e3;
        });
        if (sameTorrent) {
          const url2 = `${siteUrl}/${$(sameTorrent).find(urlDom).attr("href")}`;
          $(`.search-list li>a[data-site=${site}]`).attr("data-url", url2).css("color", "#218380");
        } else {
          $(`.search-list li>a[data-site=${site}]`).css("color", "#D81159");
        }
      }
    });
  };
  async function autoFillDoubanInfo(selfDom, info) {
    try {
      $(selfDom).text($t("\u83B7\u53D6\u4E2D..."));
      const {imdbUrl, movieName, doubanUrl, description: descriptionData, title: torrentTitle} = info;
      if (!imdbUrl && !doubanUrl) {
        throw new Error($t("\u8BF7\u586B\u5199\u6B63\u786E\u94FE\u63A5"));
      }
      let doubanLink;
      if (doubanUrl && doubanUrl.match("movie.douban.com")) {
        doubanLink = doubanUrl;
      } else {
        const doubanData = await getDoubanIdByIMDB(imdbUrl || movieName);
        let {id, season = ""} = doubanData;
        if (season) {
          const tvData = await getTvSeasonData(doubanData);
          id = tvData.id;
        }
        doubanLink = `https://movie.douban.com/subject/${id}`;
      }
      if (doubanLink) {
        const {douban, imdb, subtitle, description, name} = CURRENT_SITE_INFO;
        if (CURRENT_SITE_NAME === "SSD") {
          $(imdb.selector).val(doubanLink);
        } else {
          $(douban == null ? void 0 : douban.selector).val(doubanLink);
        }
        if (!(descriptionData == null ? void 0 : descriptionData.match(/(片|译)\s*名/))) {
          const movieData = await getDoubanInfo(doubanLink);
          showNotice({
            title: $t("\u6210\u529F"),
            text: $t("\u83B7\u53D6\u6210\u529F")
          });
          const imdbLink = movieData.imdb_link;
          if (!$(imdb.selector).val() !== imdbLink && CURRENT_SITE_NAME !== "SSD") {
            $(imdb.selector).val(imdbLink);
          }
          const torrentSubtitle = getSubTitle(movieData);
          if (CURRENT_SITE_NAME === "TTG") {
            $(name.selector).val(`${torrentTitle || ""}[${torrentSubtitle}]`);
          } else {
            $(subtitle.selector).val(torrentSubtitle);
          }
          if (CURRENT_SITE_NAME !== "SSD") {
            $(description.selector).val(`${movieData.format}
${$(description.selector).val()}`);
          }
        } else {
          showNotice({
            title: $t("\u6210\u529F"),
            text: $t("\u83B7\u53D6\u6210\u529F")
          });
        }
      }
    } catch (error) {
      showNotice({
        title: $t("\u9519\u8BEF"),
        text: error.message
      });
    } finally {
      $(selfDom).text($t("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB"));
    }
  }

  // src/target/autofill.js
  var autofill_default = (info = {}) => {
    if (info.doubanInfo) {
      return;
    }
    if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|TTG/)) {
      const {imdb, douban} = CURRENT_SITE_INFO;
      let selector;
      if ((douban == null ? void 0 : douban.selector) && $(douban.selector) && $(douban.selector).val()) {
        selector = $(douban.selector);
      } else if (imdb) {
        selector = $(imdb.selector);
      }
      if (selector) {
        selector.after(`<span id="auto-fill-douban">${$t("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB")}</span>`);
      }
      $("#auto-fill-douban").click(function(e) {
        const url = selector.val();
        if (url.match(/subject\/(\d+)/)) {
          info.doubanUrl = url;
        } else if (url.match(/imdb\.com\/title\/tt\d+/)) {
          info.imdbUrl = url;
        }
        autoFillDoubanInfo(this, info);
      });
    }
  };

  // src/target/index.js
  var fillTargetForm = (info) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    autofill_default(info || {});
    if (!info) {
      return;
    }
    console.log(info);
    if (CURRENT_SITE_NAME === "bB") {
      bB_default(info);
      return false;
    }
    if (CURRENT_SITE_NAME === "PTP") {
      ptp_default(info);
      return false;
    }
    if (CURRENT_SITE_NAME === "GPW") {
      gpw_default(info);
      return false;
    }
    if (CURRENT_SITE_NAME === "NPUBits") {
      npubits_default(info);
      return false;
    }
    if (CURRENT_SITE_NAME === "BYR") {
      byr_default(info);
      return false;
    }
    if (CURRENT_SITE_NAME === "SC") {
      sc_default(info);
      return false;
    }
    if (CURRENT_SITE_NAME === "PTSBAO" && localStorage.getItem("autosave")) {
      localStorage.removeItem("autosave");
    }
    const imdbId = getIMDBIdByUrl(info.imdbUrl);
    const isBluray = info.videoType.match(/bluray/i);
    const {screenshots = []} = info;
    const imdbSelector = (_a = CURRENT_SITE_INFO.imdb) == null ? void 0 : _a.selector;
    if (CURRENT_SITE_NAME.match(/HDRoute|HDSpace/)) {
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
      if (CURRENT_SITE_NAME === "TTG" && subtitle) {
        torrentTitle += `[${subtitle}]`;
      } else if (CURRENT_SITE_NAME.match(/SSD|iTS|HDChina/)) {
        torrentTitle = title.replace(/\s/ig, ".");
      } else if (CURRENT_SITE_NAME.match(/PuTao/)) {
        torrentTitle = `[${getChineseName(info)}]${title}`;
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
      description = info.description.replace(/^(\s+)/g, "");
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
      if (CURRENT_SITE_NAME.match(/^(Blutopia|Aither)/)) {
        const selector = isBluray ? 'textarea[name="bdinfo"]' : CURRENT_SITE_INFO.mediaInfo.selector;
        $(selector).val(mediaInfo);
        description = description.replace(mediaInfo.trim(), "");
      } else if (!(isBluray && CURRENT_SITE_NAME.match(/^(HDBits)/))) {
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
      let poster = info.poster;
      if (!poster) {
        const doubanPosterImage = (info.description + info.doubanInfo).match(/\[img\](http[^[]+?(poster|(img\d\.doubanio))[^[]+?)\[\/img\]/);
        if (doubanPosterImage && doubanPosterImage[1]) {
          poster = doubanPosterImage[1];
        } else {
          poster = (_d = (_c = description.match(/\[img\](.+?)\[\/img\]/)) == null ? void 0 : _c[1]) != null ? _d : "";
        }
      }
      if (poster) {
        $(CURRENT_SITE_INFO.poster).val(poster);
        if (CURRENT_SITE_NAME === "HDRoute") {
          $('input[name="poster"]').val(poster);
          description = description.replace(poster, "");
        }
      }
    }
    if (CURRENT_SITE_NAME.match(/BeyondHD|Blutopia/)) {
      info.screenshots.forEach((img) => {
        const regStr = new RegExp(`\\[img\\](${img})\\[\\/img\\]`);
        if (description.match(regStr)) {
          description = description.replace(regStr, function(p1, p2) {
            return `[url=${p2}][img=350x350]${p2}[/img][/url]`;
          });
        }
      });
    }
    description = filterEmptyTags(description);
    if (CURRENT_SITE_NAME === "PTer") {
      const {mediaInfo: mediaInfo2, bdinfo} = getBDInfoOrMediaInfo(description);
      description = description.replace(`[quote]${mediaInfo2}[/quote]`, `[hide=mediainfo]${mediaInfo2}[/hide]`);
      description = description.replace(`[quote]${bdinfo}[/quote]`, `[hide=BDInfo]${bdinfo}[/hide]`);
    }
    if (CURRENT_SITE_NAME === "PTN") {
      description = info.imdbUrl + "\n\n" + description;
    }
    const thanksQuoteClosed = GM_getValue("easy-seed.thanks-quote-closed") || "";
    if (!thanksQuoteClosed && info.sourceSite !== void 0) {
      description = getThanksQuote(info) + description.trim();
    }
    $(CURRENT_SITE_INFO.description.selector).val(description);
    if (CURRENT_SITE_NAME.match(/BeyondHD|Blutopia|HDPOST|ACM|Aither/)) {
      const fillIMDBId = CURRENT_SITE_INFO.siteType === "UNIT3D" ? imdbId.replace("tt", "") : imdbId;
      $(CURRENT_SITE_INFO.imdb.selector).val(fillIMDBId);
      getTMDBIdByIMDBId(imdbId).then((data) => {
        $(CURRENT_SITE_INFO.tmdb.selector).val(data.id);
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
      $(CURRENT_SITE_INFO.image.selector).val(info.image);
    }
    if (CURRENT_SITE_NAME.match(/HDHome|PTHome|SoulVoice|1PTBA|HDAtmos|3Wmg/i)) {
      setTimeout(() => {
        const event = new Event("change");
        document.querySelector(CURRENT_SITE_INFO.category.selector).dispatchEvent(event);
      }, 1e3);
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
    if (CURRENT_SITE_NAME.match(/PTHome|HDSky|LemonHD|1PTBA|52pt/i)) {
      if (info.tags.diy) {
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
        } else if (CURRENT_SITE_NAME === "52pt") {
          categoryValue = info.videoType === "bluray" ? "2" : "12";
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
      tjupt_default(info);
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
      hdr_default(info);
    }
    if (CURRENT_SITE_NAME === "HDT") {
      if (info.category !== "tvPack") {
        $('select[name="season"').val("true");
      }
      if (imdbId) {
        $(CURRENT_SITE_INFO.imdb.selector).val(`https://www.imdb.com/title/${imdbId}/`);
      }
    }
    if (CURRENT_SITE_NAME === "PTer") {
      const language = (_j = (_i = info.description.match(/(语\s+言)\s+(.+)/)) == null ? void 0 : _i[2]) != null ? _j : "";
      if (!language.match(/英语/) && info.area === "EU") {
        $(CURRENT_SITE_INFO.area.selector).val("8");
      }
    }
    if (CURRENT_SITE_NAME === "HDHome") {
      if (info.title.match(/iPad/i)) {
        const categoryMap = {
          movie: "412",
          tv: "426",
          tvPack: "433",
          documentary: "418"
        };
        const ipadCat = categoryMap[info.category];
        if (ipadCat) {
          $("#browsecat").val(ipadCat);
        }
      }
    }
    if (CURRENT_SITE_NAME === "Bib" && ((_k = info.doubanBookInfo) == null ? void 0 : _k.success)) {
      bib_default(info);
    }
    if (CURRENT_SITE_NAME === "iTS") {
      its_default(info);
    }
    if (CURRENT_SITE_NAME === "UHDBits") {
      $(CURRENT_SITE_INFO.imdb.selector).val(imdbId);
      const teamName = getTeamName(info);
      $("#team").val(teamName === "other" ? "Unknown" : teamName);
      if (info.title.match(/web-?rip/i)) {
        $(CURRENT_SITE_INFO.videoType.selector).val("WEBRip");
      }
      $("#imdb_button").click();
    }
    if (CURRENT_SITE_NAME === "52PT") {
      const {tags, videoType, resolution} = info;
      let videoTypeValue = videoType;
      if (videoType.match(/bluray/)) {
        if (tags.chinese_audio || tags.cantonese_audio || tags.chinese_subtitle) {
          videoTypeValue = videoType === "bluray" ? "14" : "15";
        }
      } else if (videoType === "remux" && resolution === "2160p") {
        videoTypeValue = "5";
      }
      $(CURRENT_SITE_INFO.videoType.selector).val(videoTypeValue);
    }
    if (CURRENT_SITE_NAME === "BTSCHOOL") {
      $(imdbSelector).val(imdbId);
      if (info.doubanUrl) {
        const doubanId = (_m = (_l = info.doubanUrl.match(/\/(\d+)/)) == null ? void 0 : _l[1]) != null ? _m : "";
        $(CURRENT_SITE_INFO.douban.selector).val(doubanId);
      }
    }
    if (CURRENT_SITE_NAME === "PTN") {
      ptn_default(info);
    }
    if (CURRENT_SITE_NAME === "HDTime") {
      if (info.videoType.match(/bluray/i)) {
        $(CURRENT_SITE_INFO.category.selector).val("424");
      }
    }
    if (CURRENT_SITE_NAME === "HDFans") {
      const {videoType, resolution, tags} = info;
      if (videoType === "remux") {
        $(CURRENT_SITE_INFO.videoType.selector).val(resolution === "2160p" ? "10" : "8");
      } else if (videoType === "encode") {
        const map = {
          "2160p": "9",
          "1080p": "5",
          "1080i": "5",
          "720p": "11"
        };
        $(CURRENT_SITE_INFO.videoType.selector).val(map[resolution] || "16");
      }
      if (tags.diy) {
        $(CURRENT_SITE_INFO.videoType.selector).val(resolution === "2160p" ? "2" : "4");
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
    const teamConfig = CURRENT_SITE_INFO.team;
    const teamName = getTeamName(info);
    if (teamName && teamConfig) {
      const formateTeamName = teamConfig.map[teamName.toLowerCase()];
      const matchValue = formateTeamName || teamConfig.map.other;
      if (HDB_TEAM.includes(teamName) && CURRENT_SITE_NAME === "BTSCHOOL") {
        $(teamConfig.selector).val(teamConfig.map.hdbint);
        return;
      }
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
    const {description} = info;
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
    const allImages = getFilterImages(description);
    return filterDescription + "\n" + allImages.join("");
  };
  var getThanksQuote = (info) => {
    const isChineseSite = isChineseTacker(CURRENT_SITE_INFO.siteType) || CURRENT_SITE_NAME.match(/HDPOST|GPW/);
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
  function getChineseName(info) {
    var _a, _b, _c, _d, _e, _f;
    const {description} = info;
    const originalName = (_b = (_a = description.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _a[2]) != null ? _b : "";
    const translateName = (_f = (_e = (_d = (_c = description.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _c[2]) == null ? void 0 : _d.split("/")) == null ? void 0 : _e[0]) != null ? _f : "";
    let chineseName = originalName;
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      chineseName = translateName.match(/[\u4e00-\u9fa5]+/) ? translateName : "";
    }
    return chineseName.trim();
  }

  // src/source/ptp.js
  var ptp_default2 = async () => {
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
      if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
        mediaInfoArray.push(textContent);
      }
    });
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.movieAkaName = movieAkaName;
    TORRENT_INFO.imdbUrl = (_c = (_b = $("#imdb-title-link")) == null ? void 0 : _b.attr("href")) != null ? _c : "";
    TORRENT_INFO.year = $(".page__title").text().match(/\[(\d+)\]/)[1];
    const torrentHeaderDom = $(`#group_torrent_header_${torrentId}`);
    TORRENT_INFO.category = getPTPType();
    const screenshots = getPTPImage(torrentDom);
    getDescription2(torrentId).then((res) => {
      const releaseName = torrentHeaderDom.data("releasename");
      const releaseGroup = getReleaseGroup(releaseName);
      const descriptionData = formatDescriptionData(res, screenshots, mediaInfoArray);
      TORRENT_INFO.description = descriptionData;
      const infoArray = torrentHeaderDom.find("#PermaLinkedTorrentToggler").text().trim().split(" / ");
      const [codes, container, source, resolution, ...otherInfo] = infoArray;
      const isRemux = otherInfo.includes("Remux");
      const {knownTags, otherTags} = getTags(otherInfo, [releaseGroup]);
      TORRENT_INFO.videoType = source === "WEB" ? "web" : getVideoType(container, isRemux, codes, source);
      const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
      TORRENT_INFO.tags = __assign({}, knownTags);
      TORRENT_INFO.otherTags = otherTags;
      TORRENT_INFO.resolution = resolution;
      const mediaInfoOrBDInfo = mediaInfoArray.filter((media) => {
        return TORRENT_INFO.videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
      });
      const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
      TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo.join("\n\n").trim();
      TORRENT_INFO.mediaInfos = mediaInfoOrBDInfo.map((v) => v.trim());
      const {videoCodec, audioCodec, mediaTags} = getInfoFunc(mediaInfoOrBDInfo.join("\n\n"));
      TORRENT_INFO.videoCodec = videoCodec;
      TORRENT_INFO.audioCodec = audioCodec;
      TORRENT_INFO.tags = __assign(__assign({}, TORRENT_INFO.tags), mediaTags);
      const torrentName = formatTorrentTitle(releaseName);
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
    const trumpReason = $(`#trumpable_${torrentId} span`).text() || "";
    TORRENT_INFO.hardcodedSub = trumpReason.includes("Hardcoded Subtitles");
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
    const imgList = [];
    const torrentInfoPanel = $(".movie-page__torrent__panel");
    const imageDom = torrentInfoPanel.find(".bbcode__image");
    for (let i = 0; i < imageDom.length; i++) {
      const parent = imageDom[i].parentElement;
      if (parent.tagName === "A" && parent.getAttribute("href").match(/\.png$/)) {
        imgList.push(parent.getAttribute("href"));
      } else {
        imgList.push(imageDom[i].getAttribute("src"));
      }
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
  var getDescription2 = async (id) => {
    const url = `https://passthepopcorn.me/torrents.php?action=get_description&id=${id}`;
    const data = await fetch(url, {
      responseType: "text"
    });
    if (data) {
      const element = document.createElement("span");
      element.innerHTML = data;
      return element.innerText || element.textContent;
    }
    return "";
  };
  var formatDescriptionData = (data, screenshots, mediaInfoArray) => {
    let descriptionData = data.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n");
    TORRENT_INFO.originalDescription = descriptionData;
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
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[$2]$3[/$2]");
    const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n|\s)+?)\[\/comparison\]/ig) || [];
    const comparisons = [];
    comparisonArray.forEach((item) => {
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
      const reason = item.match(/(\n.*\n)?\[comparison=/i)[1] || "";
      const title = item.match(/\[comparison=(.*?)\]/i)[1];
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, "").split(/[ \r\n]/);
      const imgs = [];
      [...new Set(comparisonImgArray)].forEach((item2) => {
        const formatImg = item2.replace(/\s*/g, "");
        if (item2.match(/^https?.+/)) {
          imgs.push(formatImg);
          descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item2}`, "gi"), `[img]${formatImg}[/img]`);
        } else if (item2.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ""));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/ig, "");
    mediaInfoArray.forEach((mediaInfo) => {
      const regStr = new RegExp(`\\[quote\\]\\s*?${replaceRegSymbols(mediaInfo).slice(0, 1e4)}`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(mediaInfo, `[quote]${mediaInfo}[/quote]`);
      }
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = $("#synopsis").text() + "\n" + descriptionData;
    }
    return descriptionData;
  };
  function getTags(rawTags, exclude = []) {
    const knownTags = {};
    const otherTags = {};
    for (const rawTag of rawTags) {
      const tag = CURRENT_SITE_INFO.sourceInfo.editionTags[rawTag];
      if (tag) {
        knownTags[tag] = true;
      } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/Freeleech|Halfleech/i)) {
      } else {
        otherTags[rawTag] = true;
      }
    }
    return {
      knownTags,
      otherTags
    };
  }
  function getReleaseGroup(releasename) {
    var _a;
    return (_a = releasename.match(/-(\w+?)$/)) == null ? void 0 : _a[1];
  }

  // src/source/bhd.js
  var bhd_default = async () => {
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const basicInfo = getBasicInfo();
    const editionTags = getEditionTags(basicInfo);
    const {Category, Name, Source, Type, Size} = basicInfo;
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
    const {category: movieCat, countries, imdbUrl} = getMovieDetails();
    TORRENT_INFO.movieName = movieName;
    let category = Category.toLowerCase().replace(/s/, "");
    category = movieCat === "Animation" ? "cartoon" : category;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSource2(Source, Type);
    TORRENT_INFO.area = getAreaCode(countries);
    TORRENT_INFO.videoType = getVideoType2(Type);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const mediaInfo = $("#stats-full code").text();
    TORRENT_INFO.mediaInfo = mediaInfo;
    TORRENT_INFO.mediaInfos = [mediaInfo];
    TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.originalDescription = `${descriptionBBCode}`;
    TORRENT_INFO.description = `
[quote]${mediaInfo}[/quote]
${descriptionBBCode}`;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {videoCodec, audioCodec, resolution, mediaTags} = getInfoFunc(mediaInfo);
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.tags = __assign(__assign(__assign({}, tags), mediaTags), editionTags.knownTags);
    TORRENT_INFO.otherTags = editionTags.otherTags;
    TORRENT_INFO.imdbUrl = imdbUrl;
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
  var getSource2 = (source, resolution) => {
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
  var getEditionTags = ({Video, Audio, Hybrid, Edition, Region, Extras}) => {
    const knownTags = {};
    const otherTags = {};
    const text = [Video, Audio, Edition, Extras].filter((v) => Boolean(v)).join(" / ");
    for (const [source, target] of Object.entries(CURRENT_SITE_INFO.sourceInfo.editionTags)) {
      if (text.includes(source)) {
        knownTags[target] = true;
      }
      ;
    }
    if (Hybrid) {
      otherTags.Hybrid = true;
    }
    if (knownTags.hdr10_plus && knownTags.hdr10) {
      delete knownTags.hdr10;
    }
    return {
      knownTags,
      otherTags
    };
  };

  // src/source/hdb.js
  var hdb_default = async () => {
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
    const {bdinfo} = getBDInfoOrMediaInfo(descriptionBBCode);
    if (!isBluray) {
      TORRENT_INFO.bdinfo = bdinfo;
      getMediaInfo(torrentId).then((data) => {
        if (data) {
          TORRENT_INFO.mediaInfo = data;
          descriptionBBCode += `
[quote]${data}[/quote]`;
          TORRENT_INFO.description = descriptionBBCode;
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
    TORRENT_INFO.screenshots = getImages();
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
  var getMediaInfo = async (torrentId) => {
    const res = await fetch(`https://hdbits.org/details/mediainfo?id=${torrentId}`, {
      responseType: "text"
    });
    const data = res.replace(/\r\n/g, "\n");
    return data || "";
  };
  var getImages = () => {
    var _a;
    const screenshots = (_a = TORRENT_INFO.description.match(/\[url=.+?\]\[img\].+?\[\/img\]\[\/url]/g)) != null ? _a : [];
    return screenshots;
  };

  // src/source/ttg.js
  var ttg_default = async () => {
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
      TORRENT_INFO.screenshots = getImages2(bbCodes);
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
  var getImages2 = (bbcode) => {
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
  var unit3d_default = async () => {
    var _a, _b, _c, _d, _e;
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    const {Category, Name, Type, Size, Resolution} = getBasicInfo3();
    TORRENT_INFO.size = getSize(Size);
    let title = formatTorrentTitle(Name);
    const tags = getTagsFromSubtitle(TORRENT_INFO.title);
    const category = getCategory(Category);
    const videoType = getVideoType4(Type, Resolution);
    let IMDBYear = $(".movie-heading span:last").text();
    const movieName = $(".movie-heading span:first").text();
    if (CURRENT_SITE_NAME === "HDPOST") {
      const englishTitle = (_b = (_a = title.match(/[\s\W\d]+(.+)/)) == null ? void 0 : _a[1]) != null ? _b : "";
      TORRENT_INFO.subtitle = (_c = title.replace(englishTitle, "")) == null ? void 0 : _c.trim();
      title = englishTitle;
    }
    if (CURRENT_SITE_NAME === "ACM") {
      title = title.replace(/\/\s+\W+/, "");
    }
    if (!IMDBYear) {
      const matchYear = TORRENT_INFO.title.match(/(19|20)\d{2}/g);
      IMDBYear = (_d = matchYear == null ? void 0 : matchYear.pop()) != null ? _d : "";
    } else {
      IMDBYear = IMDBYear.replace(/\(|\)|\s/g, "");
    }
    const imdbUrl = $(".movie-details a:contains(IMDB)").attr("href");
    const resolution = (_e = Resolution.match(/\d+(i|p)/i)) == null ? void 0 : _e[0];
    const descriptionDom = $(".fa-sticky-note").parents(".panel-heading").siblings(".table-responsive").find(".panel-body").clone();
    descriptionDom.find("#collection_waypoint").remove();
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    const mediaInfo = $(".decoda-code code").text();
    const {bdinfo} = getBDInfoOrMediaInfo(descriptionBBCode);
    if (mediaInfo) {
      descriptionBBCode = `
[quote]${mediaInfo}[/quote]${descriptionBBCode}`;
    }
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const mediaInfoOrBDInfo = isBluray ? bdinfo : mediaInfo;
    const {videoCodec, audioCodec, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
    TORRENT_INFO.mediaInfo = mediaInfoOrBDInfo;
    TORRENT_INFO.videoCodec = videoCodec;
    TORRENT_INFO.audioCodec = audioCodec;
    TORRENT_INFO.tags = __assign(__assign({}, tags), mediaTags);
    TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
    TORRENT_INFO.title = title;
    TORRENT_INFO.year = IMDBYear;
    TORRENT_INFO.movieName = CURRENT_SITE_NAME === "HDPOST" ? "" : movieName;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.poster = $(".movie-poster").attr("src");
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.source = getSourceFromTitle(title);
    TORRENT_INFO.videoType = videoType.toLowerCase();
    TORRENT_INFO.description = descriptionBBCode;
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
      3: "Size",
      Category: "Category",
      \u7C7B\u522B: "Category",
      \u985E\u5225: "Category",
      0: "Category",
      Type: "Type",
      \u89C4\u683C: "Type",
      \u898F\u683C: "Type",
      2: "Type",
      Resolution: "Resolution",
      1: "Resolution"
    };
    if (CURRENT_SITE_NAME !== "Blutopia") {
      const lineSelector = $('#meta-info+.meta-general>.panel:has(".table-responsive"):first table tr');
      lineSelector.each((index, element) => {
        const key = $(element).find("td:first").text().replace(/\s|\n/g, "");
        if (keyMap[key]) {
          let value = $(element).find("td:last").text();
          if (keyMap[key] === "Name") {
            value = $(element).find("td:last")[0].firstChild.textContent;
          }
          basicInfo[keyMap[key]] = value.replace(/\n/g, "").trim();
        }
      });
    } else {
      const formats = $(".torrent-format .text-info");
      formats.each((index, item) => {
        basicInfo[keyMap[index]] = $(item).text().trim();
      });
      const title = $("h1.text-center").text();
      basicInfo.Name = title;
    }
    return basicInfo;
  };
  var getCategory = (key) => {
    if (!key) {
      return "";
    }
    if (key.match(/movie|电影/i)) {
      return "movie";
    } else if (key.match(/tv|电视|剧集/i)) {
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
    } else if (type.match(/DVD/i)) {
      return "dvd";
    }
    return type;
  };

  // src/source/nexusphp.js
  var nexusphp_default = async () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    let title = formatTorrentTitle((_b = (_a = $("#top").text().split(/\s{3,}/)) == null ? void 0 : _a[0]) == null ? void 0 : _b.trim());
    let metaInfo = $("td.rowhead:contains('\u57FA\u672C\u4FE1\u606F'), td.rowhead:contains('\u57FA\u672C\u8CC7\u8A0A')").next().text().replace(/：/g, ":");
    let subtitle = $("td.rowhead:contains('\u526F\u6807\u9898'), td.rowhead:contains('\u526F\u6A19\u984C')").next().text();
    let siteImdbUrl = $("#kimdb>a").attr("href");
    let descriptionBBCode = getFilterBBCode($("#kdescr")[0]);
    if (CURRENT_SITE_NAME === "MTeam") {
      descriptionBBCode = descriptionBBCode.replace(/https:\/\/\w+?\.m-team\.cc\/imagecache.php\?url=/g, "").replace(/(http(s)?)%3A/g, "$1:").replace(/%2F/g, "/");
    }
    if (CURRENT_SITE_NAME === "HDArea") {
      title = (_d = (_c = $("h1#top").text().split(/\s{3,}/)) == null ? void 0 : _c[0]) == null ? void 0 : _d.trim();
    }
    if (CURRENT_SITE_NAME === "PuTao") {
      title = formatTorrentTitle((_e = $("h1").text().replace(/\[.+?\]|\(.+?\)/g, "")) == null ? void 0 : _e.trim());
    }
    if (CURRENT_SITE_NAME === "TJUPT") {
      const matchArray = title.match(/\[[^\]]+(\.|\s)+[^\]]+\]/g) || [];
      const realTitle = (_g = (_f = matchArray.filter((item) => item.match(/\.| /))) == null ? void 0 : _f[0]) != null ? _g : "";
      title = realTitle.replace(/\[|\]/g, "");
    }
    if (CURRENT_SITE_NAME === "PTer") {
      if ($("#descrcopyandpaster")[0]) {
        descriptionBBCode = (_h = $("#descrcopyandpaster").val()) == null ? void 0 : _h.replace(/hide(=(MediaInfo|BDInfo))?\]/ig, "quote]");
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
        const doubanInfo = getFilterBBCode((_i = $(".doubannew2 .doubaninfo")) == null ? void 0 : _i[0]);
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
      const doubanInfo = getFilterBBCode((_j = $(".douban-info artical")) == null ? void 0 : _j[0]);
      const postUrl = (_l = (_k = $("#kposter").find("img")) == null ? void 0 : _k.attr("src")) != null ? _l : "";
      const doubanPoster = postUrl ? `[img]${postUrl} [/img]
` : "";
      TORRENT_INFO.doubanInfo = doubanPoster + (doubanInfo == null ? void 0 : doubanInfo.replace(/\n{2,}/g, "\n"));
      if (descriptionBBCode === "" || descriptionBBCode === void 0) {
        let extraTextInfo = getFilterBBCode((_m = $(".torrent-extra-text-container .extra-text")) == null ? void 0 : _m[0]);
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
    const doubanUrl = (_n = descriptionBBCode.match(/https:\/\/((movie|book)\.)?douban.com\/subject\/\d+/)) == null ? void 0 : _n[0];
    if (doubanUrl) {
      TORRENT_INFO.doubanUrl = doubanUrl;
    }
    const imdbUrl = (_o = descriptionBBCode.match(/http(s)?:\/\/www.imdb.com\/title\/tt\d+/)) == null ? void 0 : _o[0];
    if (imdbUrl) {
      TORRENT_INFO.imdbUrl = imdbUrl;
    } else if (siteImdbUrl) {
      TORRENT_INFO.imdbUrl = siteImdbUrl.match(/www.imdb.com\/title/) ? siteImdbUrl : "";
    }
    TORRENT_INFO.year = year ? year.pop() : "";
    TORRENT_INFO.title = title;
    TORRENT_INFO.subtitle = subtitle;
    TORRENT_INFO.description = descriptionBBCode;
    const originalName = (_q = (_p = descriptionBBCode.match(/(片\s+名)\s+(.+)?/)) == null ? void 0 : _p[2]) != null ? _q : "";
    const translateName = (_s = (_r = descriptionBBCode.match(/(译\s+名)\s+(.+)/)) == null ? void 0 : _r[2]) != null ? _s : "";
    if (!originalName.match(/[\u4e00-\u9fa5]+/)) {
      TORRENT_INFO.movieName = originalName;
    } else {
      TORRENT_INFO.movieName = (_v = (_u = (_t = translateName.match(/(\w|\s){2,}/)) == null ? void 0 : _t[0]) == null ? void 0 : _u.trim()) != null ? _v : "";
    }
    const fullInformation = $("#top").text() + subtitle + descriptionBBCode;
    const isForbidden = fullInformation.match(/独占|禁转|严禁转载|谢绝转载|exclusive/);
    TORRENT_INFO.isForbidden = !!isForbidden;
    if (!processing || processing.match(/raw|encode/)) {
      const areaMatch = (_w = descriptionBBCode.match(/(产\s+地|国\s+家)】?\s*(.+)/)) == null ? void 0 : _w[2];
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
    const tags = getTagsFromSubtitle(TORRENT_INFO.subtitle);
    const pageTags = getTagsFromPage();
    TORRENT_INFO.tags = __assign(__assign({}, tags), pageTags);
    if (CURRENT_SITE_NAME.match(/beitai/i)) {
      if (descriptionBBCode.match(/VIDEO\s*(\.)?CODEC/i)) {
        const matchCodec = (_x = descriptionBBCode.match(/VIDEO\s*(\.)?CODEC\.*:?\s*([^\s_,]+)?/i)) == null ? void 0 : _x[2];
        if (matchCodec) {
          let videoCodec2 = matchCodec.replace(/\.|-/g, "").toLowerCase();
          videoCodec2 = videoCodec2.match(/hevc/i) ? "x265" : videoCodec2;
          videoCodec2 = videoCodec2.match(/mpeg4/i) ? "x264" : videoCodec2;
          TORRENT_INFO.videoCodec = videoCodec2;
        }
      }
    } else {
      TORRENT_INFO.videoCodec = getVideoCodecFromTitle(TORRENT_INFO.title || videoCodec, TORRENT_INFO.videoType);
    }
    TORRENT_INFO.resolution = getResolution3(resolution || TORRENT_INFO.title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec || TORRENT_INFO.title);
    const isBluray = TORRENT_INFO.videoType.match(/bluray/i);
    const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo(descriptionBBCode);
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
      TORRENT_INFO.format = getFormat3(videoType);
    } else {
      TORRENT_INFO.format = getFormat3($("#top").text() + subtitle);
    }
    if (CURRENT_SITE_NAME === "HaresClub") {
      TORRENT_INFO.mediaInfo = $("#kfmedia").text();
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
    if (CURRENT_SITE_NAME.match(/HDFans/)) {
      videoTypeKey = "\u6765\u6E90";
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
  var getMetaValue = (key, metaInfo) => {
    var _a;
    let regStr = `(${key}):\\s?([^\u4E00-\u9FA5]+)?`;
    if (key.match(/大小/)) {
      regStr = `(${key}):\\s?((\\d|\\.)+\\s+(G|M|T|K)(i)?B)`;
    }
    if (CURRENT_SITE_NAME.match(/KEEPFRDS|TJUPT|PTSBAO|PTHome|HDTime|BTSCHOOL|TLF|HDAI|SoulVoice|PuTao/) && key.match(/类型/)) {
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
    if (CURRENT_SITE_NAME === "HDFans" && key.match(/来源/)) {
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
    if (videoType.match(/encode|x264|x265|bdrip|hdrip|压制/ig)) {
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
    } else if (category.match(/有声书|AudioBook/ig)) {
      return "audiobook";
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
  var getResolution3 = (resolution) => {
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
  var getFormat3 = (data) => {
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
  var getTagsFromPage = () => {
    let tags = {};
    if (CURRENT_SITE_NAME === "PTer") {
      const tagImgs = $("td.rowhead:contains('\u7C7B\u522B\u4E0E\u6807\u7B7E')").next().find("img");
      const links = Array.from(tagImgs.map(function() {
        return $(this).attr("src").replace(/(lang\/chs\/)|(\.gif)/g, "");
      }));
      if (links.includes("pter-zz")) {
        tags.chinese_subtitle = true;
      }
      if (links.includes("pter-gy")) {
        tags.chinese_audio = true;
      }
      if (links.includes("pter-yy")) {
        tags.cantonese_audio = true;
      }
      if (links.includes("pter-diy")) {
        tags.diy = true;
      }
    } else {
      const tagText = $("td.rowhead:contains('\u6807\u7B7E')").next().text();
      tags = getTagsFromSubtitle(tagText);
    }
    return tags;
  };

  // src/source/hdt.js
  var hdt_default = async () => {
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
    const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo(descriptionBBCode);
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
  var kg_default = async () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const {InternetLink, Year, Type, Genres, Source, Size, Filename = "", RipSpecs = "", Subtitles, "Language(s)": language} = getBasicInfo5();
    const torrentFileDom = getBasicInfoDom("Download").find("a.index");
    const torrentFileName = torrentFileDom.text().replace(/\.torrent$/, "");
    const fileName = Filename.replace(/\.\w+$/, "");
    const title = formatTorrentTitle(fileName || torrentFileName);
    const imdbUrl = (InternetLink == null ? void 0 : InternetLink.match(/imdb/)) ? InternetLink : "";
    const [movieName, movieAkaName = ""] = (_a = $(".outer h1").text().split("- ")) == null ? void 0 : _a[1].replace(/\(\d+\)/, "").trim().split(/AKA/i);
    const country = $(".outer h1 img").attr("alt");
    const year = Year;
    const size = (_b = Size.match(/\((.+?)\)/)) == null ? void 0 : _b[1].replace(/,|(bytes)/g, "");
    let tags = getTagsFromSubtitle(title);
    if (Subtitles.match(/Chinese/i)) {
      tags.chinese_subtitle = true;
    }
    if (language.match(/Chinese|Mandarin/i)) {
      tags.chinese_audio = true;
    }
    if (language.match(/Cantonese/)) {
      tags.cantonese_audio = true;
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
      TORRENT_INFO.videoCodec = "mpeg2";
      const audioCodec = (_i = (_h = RipSpecs.match(/DVD\sAudio:(.+)/)) == null ? void 0 : _h[1]) != null ? _i : "";
      TORRENT_INFO.audioCodec = getAudioCodecFromTitle(audioCodec);
      resolution = "480p";
    }
    const descriptionDom = getBasicInfoDom("Description");
    let descriptionBBCode = getFilterBBCode(descriptionDom.find("article")[0]);
    descriptionBBCode = descriptionBBCode.replace(/(.|\n)+?_{5,}/g, "");
    const isBluray = videoType.match(/bluray/i);
    const {bdinfo} = getBDInfoOrMediaInfo(descriptionBBCode);
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
    if (title.match(/UHD/i) && title.match(/Blu-Ray/i)) {
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

  // src/source/uhd.js
  var uhd_default = async () => {
    var _a, _b, _c, _d, _e, _f;
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentFilePathDom = $(`#files_${torrentId} .filelist_path`);
    const torrentFileDom = $(`#files_${torrentId} .filelist_table>tbody>tr:nth-child(2) td`).eq(0);
    const torrentFileName = ((_a = torrentFilePathDom.text()) == null ? void 0 : _a.replace(/\//g, "")) || ((_b = torrentFileDom.text()) == null ? void 0 : _b.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, ""));
    const title = formatTorrentTitle(torrentFileName);
    const imdbUrl = $(".imovie_title .tooltip.imdb_icon").attr("href");
    const titleText = $("#scontent h2").text();
    const [movieName = "", movieAkaName = ""] = (_d = (_c = titleText.match(/(.+?)\[/)) == null ? void 0 : _c[1].split("/")) != null ? _d : [];
    const year = (_f = (_e = titleText.match(/\[(\d+)\]/)) == null ? void 0 : _e[1]) != null ? _f : "";
    let tags = getTagsFromSubtitle(title);
    const source = getSourceFromTitle(title);
    const category = title.match(/Season\s+\d+/) ? "tv" : "movie";
    const size = getSize($(`#torrent${torrentId} td`).eq(1).text());
    const infoArray = $(`#torrent${torrentId} td:first-child>a`).text().replace(/\s/g, "").split("/");
    let [resolution, videoCodec, videoType] = infoArray;
    videoType = getVideoType8(videoType, resolution);
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title) || videoCodec.replace(/\./g, "").toLowerCase();
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const descriptionDom = $(`#torrent_${torrentId} #description`);
    let descriptionBBCode = getFilterBBCode(descriptionDom[0]);
    getMediaInfo2(torrentId).then((data) => {
      if (data) {
        TORRENT_INFO.mediaInfo = data;
        descriptionBBCode += `
[quote]${data}[/quote]`;
        descriptionBBCode = descriptionBBCode.replace(/https?:\/\/anonym\.to\/\?/g, "");
        TORRENT_INFO.description = descriptionBBCode;
        TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
        TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
        const isBluray = videoType.match(/bluray/i);
        const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
        const {videoCodec: videoCodec2, audioCodec, mediaTags, resolution: mediaResolution} = getInfoFunc(data);
        if (resolution === "mHD" && mediaResolution) {
          resolution = mediaResolution;
        }
        if (videoCodec2 !== "" && audioCodec !== "") {
          TORRENT_INFO.videoCodec = videoCodec2;
          TORRENT_INFO.audioCodec = audioCodec;
          tags = __assign(__assign({}, tags), mediaTags);
        }
      }
      TORRENT_INFO.tags = tags;
      TORRENT_INFO.resolution = resolution;
      console.log(TORRENT_INFO);
    });
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = title;
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName.trim();
    TORRENT_INFO.movieAkaName = movieAkaName.trim();
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = size;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.videoType = videoType;
  };
  var getMediaInfo2 = async (torrentId) => {
    const url = `https://uhdbits.org/torrents.php?action=mediainfo&id=${torrentId}`;
    const data = await fetch(url, {
      responseType: "text"
    });
    return data || "";
  };
  var getVideoType8 = (videoType, resolution) => {
    videoType = videoType.replace("-", "").toLowerCase();
    if (videoType.match(/bluray/)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
    } else if (videoType.match(/web/)) {
      return "web";
    } else if (videoType.match(/x264|x265/)) {
      return "encode";
    } else if (videoType.match(/x264|x265/)) {
      return "encode";
    } else if (videoType.match(/WEB/i)) {
      return "web";
    }
    return videoType;
  };

  // src/source/btn.js
  var btn_default = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const torrentInfo = getTorrentInfo({torrentId});
    const showInfo = await getShowInfo();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, torrentInfo);
    Object.assign(TORRENT_INFO, showInfo);
    return TORRENT_INFO;
  };
  function getTorrentInfo({torrentId}) {
    const torrentName = $(`#torrent_${torrentId}`).prev().find("> td").text().replace(/»/, "").trim();
    const {container, source, size} = getSpecs({torrentId});
    const seasonTitle = $("#content > div > h2").contents().last().text().trim();
    const [season, year] = seasonTitle.match(/(.*) \[(\d+)\]/).slice(1);
    const movieName = $("#content > div > h2 > a > img").attr("alt").replace(/\(\d+\)/, "").trim();
    const description = getFilterBBCode($(`#torrent_${torrentId} > td > blockquote`).last()[0]);
    const videoType = getVideoType9({torrentName, source});
    const isBluray = videoType.match(/bluray/i);
    const mediaInfoOrBDInfo = getBDInfoOrMediaInfo(description);
    const mediaInfo = isBluray ? mediaInfoOrBDInfo.bdinfo : mediaInfoOrBDInfo.mediaInfo;
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {resolution, videoCodec, audioCodec, mediaTags: tags} = getInfoFunc(mediaInfo);
    const category = getCategory3({season});
    const sourceFrom = getSourceFromTitle(torrentName);
    return {
      title: formatTorrentTitle(torrentName),
      format: container.toLowerCase(),
      source: sourceFrom,
      size: getSize(size),
      resolution,
      year,
      movieName,
      description,
      videoType,
      mediaInfo,
      videoCodec,
      audioCodec,
      tags,
      category
    };
  }
  async function getShowInfo() {
    var _a;
    const seriesUrl = $("#content > .thin > h2 > a").prop("href");
    const html = await fetch(seriesUrl, {
      responseType: "text"
    });
    const infoHtml = html.match(/Series Info[\s\S]*?(<ul[\s\S]+?<\/ul>)/)[1];
    const infoDom = new DOMParser().parseFromString(infoHtml, "text/html");
    const info = Object.fromEntries(Array.from(infoDom.querySelectorAll("tr")).map((tr) => {
      const tds = Array.from(tr.children);
      return [tds[0].innerText.trim(), tds[1]];
    }));
    const country = info["Country:"].innerText;
    const imdbUrl = (_a = info["External Links:"].innerHTML.match(/https:\/\/www\.imdb\.com\/title\/tt\d+/)) == null ? void 0 : _a[0];
    return {
      area: getAreaCode(country),
      imdbUrl
    };
  }
  var getVideoType9 = ({torrentName, source}) => {
    if (torrentName.match(/remux/i)) {
      return "remux";
    } else if (["BD50", "BD25"].includes(source)) {
      return "bluray";
    } else if (["BD66", "BD100"].includes(source)) {
      return "uhdbluray";
    } else if (["WEB-DL"].includes(source)) {
      return "web";
    } else if (["HDTV"].includes(source)) {
      return "encode";
    } else {
      return "";
    }
    ;
  };
  function getCategory3({season}) {
    return season.match(/season/i) ? "tvPack" : "tv";
  }
  function getSpecs({torrentId}) {
    const specsDom = $(`#torrent_${torrentId}`).prev().prev();
    const rawSpecs = specsDom.find("> td > a").text().replace(/»/, "").split("/").map((v) => v.trim());
    const specs = rawSpecs.filter((v) => !["NFO"].includes(v));
    const size = specsDom.find("> td").next("td").text().replace(/\s/g, "");
    const [container, videoCodec, source, resolution, group] = specs;
    return {
      container,
      videoCodec,
      source,
      resolution,
      group,
      size
    };
  }

  // src/source/avistaz.js
  var avistaz_default = async () => {
    const torrentInfo = getTorrentInfo2();
    torrentInfo.category = getPreciseCategory(torrentInfo, torrentInfo.category);
    Object.assign(TORRENT_INFO, torrentInfo);
  };
  var getTorrentInfo2 = () => {
    var _a, _b, _c, _d;
    const imdbUrl = (_c = (_b = (_a = $('.badge-extra a[href*="www.imdb.com/title"]').attr("href")) == null ? void 0 : _a.split("?")) == null ? void 0 : _b[1]) != null ? _c : "";
    const movieTitle = $(".block-titled h3 a").text();
    const movieName = movieTitle.split("(")[0].trim();
    const year = (_d = movieTitle.match(/\((\d+)\)/)) == null ? void 0 : _d[1];
    let {Type, "File Size": size, Title, "Video Quality": resolution, "Rip Type": videoType} = getBasicInfo6();
    size = getSize(size);
    const category = Type.toLowerCase().replace("-", "");
    const title = formatTorrentTitle(Title);
    videoType = getVideoType10(videoType, resolution);
    const country = $(".fa-flag~.badge-extra:first a").text();
    const area = getAreaCode(country);
    const source = getSourceFromTitle(title);
    const tags = getTagsFromSubtitle(title);
    const mediaInfoOrBDInfo = $("#collapseMediaInfo pre").text();
    const screenshotsBBCode = $("#collapseScreens a").map(function() {
      return `[url=${$(this).attr("href")}][img]${$(this).find("img").attr("src")}[/img][/url]`;
    }).get();
    const screenshots = getScreenshotsFromBBCode(screenshotsBBCode.join("\n"));
    const isBluray = videoType.match(/bluray/i);
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {videoCodec, audioCodec, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
    const descriptionBBCode = getFilterBBCode($(".torrent-desc")[0]);
    const description = `${descriptionBBCode}

[quote]${mediaInfoOrBDInfo}[/quote]

${screenshotsBBCode.join("")}`;
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      imdbUrl,
      movieName,
      year,
      size,
      category,
      videoType,
      resolution,
      area,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfo: mediaInfoOrBDInfo,
      description,
      tags: __assign(__assign({}, tags), mediaTags)
    };
  };
  var getBasicInfo6 = () => {
    const basicInfo = {};
    $("#content-area .block:last table:first>tbody>tr").each((index, element) => {
      const key = $(element).find("td:first").text();
      const value = $(element).find("td:last").text();
      basicInfo[key] = value.replace(/\n/g, "").trim();
    });
    return basicInfo;
  };
  var getVideoType10 = (type, resolution) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/BluRay\s*Raw/i)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (type.match(/dvdrip/i)) {
      return "dvdrip";
    } else if (type.match(/DVD/)) {
      return "dvd";
    } else if (type.match(/rip/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/teamhd.js
  var teamhd_default = async () => {
    const torrentInfo = getTorrentInfo3();
    torrentInfo.category = getPreciseCategory(torrentInfo, torrentInfo.category);
    try {
      let {movieName, year} = torrentInfo;
      movieName = movieName.toLowerCase().replace(/\s/g, "_");
      const url = `https://v2.sg.media-imdb.com/suggestion/${movieName[0]}/${movieName}_${year}.json`;
      const imdbSearch = await fetch(url);
      if (imdbSearch && imdbSearch.d.length) {
        torrentInfo.imdbUrl = `https://www.imdb.com/title/${imdbSearch.d[0].id}`;
      }
    } catch (error) {
      console.log(error);
    }
    Object.assign(TORRENT_INFO, torrentInfo);
  };
  var getTorrentInfo3 = () => {
    var _a;
    const basicInfoText = $(".download").text().replace(/.+?\//g, "").trim();
    const year = basicInfoText.match(/\((\d{4})\)/)[1];
    const movieName = basicInfoText.match(/(.+)\(\d{4}\)/)[1].trim();
    const resolution = basicInfoText.match(/(\s*(\d+(p|i)))$/i)[2];
    const videoType = getVideoType11(basicInfoText, resolution);
    let size = $("#details_hop").text().match(/-\s*(.+?GB)/)[1];
    size = getSize(size);
    const category = getCategory4($('#details_hop a[href*="browse/cat"]').attr("href"));
    const fileName = (_a = $(".download").attr("href").match(/name=(.+)/)[1].replace(/\.torrent/g, "")) == null ? void 0 : _a.replace(/\.(mkv|mp4|avi|mpg|ts|iso)$/i, "");
    const title = formatTorrentTitle(fileName);
    const source = getSourceFromTitle(title);
    const tags = getTagsFromSubtitle(title);
    const isBluray = videoType.match(/bluray/i);
    const mediaInfo = $('.card-header:contains("MediaInfo") + .card-collapse .card-body').text();
    const bdInfo = $('.card-header:contains("BDInfo") + .card-collapse .card-body').text();
    const eacLogs = $('.card-header:contains("eac3to Log") + .card-collapse .card-body').text();
    const mediaInfoOrBDInfo = isBluray ? bdInfo : mediaInfo;
    const screenshotsBBCode = $('#details a[href*="teamhd.org/redirector.php"]').map(function() {
      const url = $(this).attr("href").replace(/.+?url=/g, "");
      return `[url=${url}][img]${$(this).find("img").attr("src")}[/img][/url]`;
    }).get();
    const screenshots = getScreenshotsFromBBCode(screenshotsBBCode.join("\n"));
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {videoCodec, audioCodec, mediaTags} = getInfoFunc(mediaInfoOrBDInfo);
    const description = `[quote]${eacLogs}[/quote]

[quote]${mediaInfoOrBDInfo}[/quote]

${screenshotsBBCode.join("")}`;
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      movieName,
      year,
      size,
      category,
      videoType,
      resolution,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfo: mediaInfoOrBDInfo,
      mediaInfos: [mediaInfoOrBDInfo],
      description,
      tags: __assign(__assign({}, tags), mediaTags)
    };
  };
  var getCategory4 = (link) => {
    const catNum = link.match(/cat(\d+)/)[1];
    const map = {
      29: "movie",
      25: "cartoon",
      28: "document",
      31: "sport",
      32: "tv",
      33: "tvPack"
    };
    return map[catNum] || "";
  };
  var getVideoType11 = (type, resolution) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/Blu-Ray.+?Disc/i)) {
      if (resolution === "2160p") {
        return "uhdbluray";
      }
      return "bluray";
    } else if (type.match(/HDTV/i)) {
      return "hdtv";
    } else if (type.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (type.match(/rip/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/hdspace.js
  var hdspace_default = async () => {
    var _a, _b, _c;
    const {Name, Category, Size, Description} = getBasicInfo7();
    const title = formatTorrentTitle(Name);
    let tags = getTagsFromSubtitle(title);
    const category = getCategory5(Category, title);
    let resolution = (_a = title.match(/\d{3,4}(p|i)/i)) == null ? void 0 : _a[0];
    if (!resolution && title.match(/4k|uhd/i)) {
      resolution = "2160p";
    }
    const videoType = getVideoType12(Category, title);
    const source = getSourceFromTitle(title);
    TORRENT_INFO.videoCodec = getVideoCodecFromTitle(title);
    TORRENT_INFO.audioCodec = getAudioCodecFromTitle(title);
    const div = document.createElement("div");
    div.innerHTML = Description.html();
    $(div).find('#slidenfo,a[href*="#nfo"]').remove();
    const descriptionBBCode = getFilterBBCode(div);
    const isBluray = videoType.match(/bluray/i);
    const {bdinfo, mediaInfo} = getBDInfoOrMediaInfo(descriptionBBCode);
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
    const imdbId = $("#imdb").next("script").text().match(/mid=(\d+)/)[1];
    const imdbData = await fetch(`${CURRENT_SITE_INFO.url}/getimdb.php?mid=${imdbId}`, {
      responseType: "text"
    });
    const imdbDom = new DOMParser().parseFromString(imdbData, "text/html");
    const imdbUlrDom = $('a[href*="imdb.com/title"]', imdbDom);
    const imdbUrl = imdbUlrDom.attr("href");
    const movieName = imdbUlrDom.text().replace(/\(\d+\)/g, "");
    const year = (_c = (_b = imdbUlrDom.text().match(/\((\d{4})\)/)) == null ? void 0 : _b[1]) != null ? _c : "";
    const country = $('td:contains("Country")', imdbDom).next("td").text();
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = formatTorrentTitle(title);
    TORRENT_INFO.year = year;
    TORRENT_INFO.movieName = movieName;
    TORRENT_INFO.source = source;
    TORRENT_INFO.size = getSize(Size);
    TORRENT_INFO.videoType = videoType;
    TORRENT_INFO.resolution = resolution;
    TORRENT_INFO.area = getAreaCode(country);
    TORRENT_INFO.tags = tags;
    TORRENT_INFO.imdbUrl = imdbUrl;
    TORRENT_INFO.description = descriptionBBCode;
    TORRENT_INFO.category = getPreciseCategory(TORRENT_INFO, category);
    TORRENT_INFO.screenshots = getScreenshotsFromBBCode(descriptionBBCode);
  };
  var getBasicInfo7 = () => {
    const basicInfo = {};
    $("#mcol .header").each(function() {
      const key = $(this).text().trim();
      const value = key === "Description" ? $(this).next("td") : $(this).next("td").text();
      if (value && !basicInfo[key]) {
        basicInfo[key] = key === "Description" ? value : value.replace(/\n/g, "").trim();
      }
    });
    return basicInfo;
  };
  var getCategory5 = (cat, title) => {
    if (cat.match(/movie/i)) {
      return "movie";
    } else if (cat.match(/hdtv/i)) {
      return "tv";
    } else if (cat.match(/doc/i)) {
      return "documentary";
    } else if (cat.match(/Animation/i)) {
      return "cartoon";
    } else if (cat.match(/Music\sVideos/i)) {
      return "concert";
    } else if (title.match(/S\d+(E\d+)?/i)) {
      return "tv";
    }
    return "movie";
  };
  var getVideoType12 = (type, title) => {
    if (type.match(/Remux/i)) {
      return "remux";
    } else if (type.match(/Blu-Ray/i) && title.match(/2160p|4k|uhd/i)) {
      return "uhdbluray";
    } else if (type.match(/Blu-Ray/i)) {
      return "bluray";
    }
    if (title.match(/HDTV/i)) {
      return "hdtv";
    } else if (title.match(/blu-ray/i) && title.match(/2160p|4k|uhd/i)) {
      return "uhdbluray";
    } else if (title.match(/web(-)*(dl|rip)/i)) {
      return "web";
    } else if (title.match(/x264|x265/i)) {
      return "encode";
    }
    return "";
  };

  // src/source/gpw.js
  var gpw_default2 = async () => {
    const torrentId = getUrlParam("torrentid");
    if (!torrentId) {
      return false;
    }
    const data = await getTorrentInfo4(torrentId);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    Object.assign(TORRENT_INFO, data);
  };
  var getTorrentInfo4 = async (torrentId) => {
    const imdbUrl = $('.info_crumbs a[href*="www.imdb.com/title"]').attr("href");
    const doubanUrl = $('.info_crumbs a[href*="https://movie.douban.com/subject/"]').attr("href");
    const {response} = await fetch(`/ajax.php?action=torrent&id=${torrentId}`);
    const {torrent, group} = response;
    const {name: movieName, year, wikiImage: poster, releaseType} = group;
    let {description, fileList, filePath, size} = torrent;
    fileList = fileList.replace(/\.\w+?{{{\d+}}}/, "");
    const title = formatTorrentTitle(filePath || fileList);
    const category = getCategory6(releaseType);
    const country = $(".info_crumbs .fa-flag").next("span").text();
    const area = getAreaCode(country);
    const torrentHeaderDom = $(`#torrent${torrentId}`);
    const infoArray = torrentHeaderDom.find(".td_info .specs").text().trim().split(" / ");
    let [codes, source, resolution, container, ...otherInfo] = infoArray;
    console.log(codes);
    const isRemux = otherInfo.includes("Remux");
    const videoType = source === "WEB" ? "web" : getVideoType13(container, isRemux, source, otherInfo);
    source = getSource3(source, otherInfo.join(","), resolution);
    const {knownTags, otherTags} = getTags2(otherInfo, ["\u53EF\u66FF\u4EE3", "\u7279\u8272"]);
    const tags = __assign({}, knownTags);
    const torrentDom = $(`#torrent_torrent_${torrentId}`).find("#subtitles_box").next("blockquote");
    const screenshots = getScreenshots(torrentDom);
    const mediaInfoArray = [];
    const isBluray = videoType.match(/bluray/i);
    torrentDom.find(".mediainfo-bbcode.hidden,.bdinfo-bbcode.hidden pre").each(function() {
      const textContent = $(this).text();
      if (textContent.match(/(Codec\s*ID)|mpls|(Stream\s*size)|Video/i)) {
        mediaInfoArray.push(textContent);
      }
    });
    const mediaInfoOrBDInfo = mediaInfoArray.filter((media) => {
      return videoType.match(/bluray/) ? media.match(/mpls/i) : !media.match(/mpls/i);
    });
    const mediaInfo = mediaInfoOrBDInfo.join("\n\n").trim();
    const mediaInfos = mediaInfoOrBDInfo.map((v) => v.trim());
    const getInfoFunc = isBluray ? getInfoFromBDInfo : getInfoFromMediaInfo;
    const {videoCodec, audioCodec, mediaTags} = getInfoFunc(mediaInfoOrBDInfo.join("\n\n"));
    const descriptionData = formatDescriptionData2(description, screenshots, mediaInfoArray);
    return {
      sourceSite: CURRENT_SITE_NAME,
      sourceSiteType: CURRENT_SITE_INFO.siteType,
      title,
      imdbUrl,
      doubanUrl,
      movieName,
      year,
      size,
      category,
      poster,
      videoType,
      resolution,
      area,
      source,
      videoCodec,
      audioCodec,
      screenshots,
      mediaInfo,
      mediaInfos,
      description: descriptionData,
      tags: __assign(__assign({}, tags), mediaTags),
      otherTags
    };
  };
  var getCategory6 = (releaseType) => {
    const typeMap = {
      1: "movie",
      2: "movie",
      4: "other",
      3: "tvPack",
      5: "concert",
      6: "movie"
    };
    return typeMap[releaseType];
  };
  var getScreenshots = (torrentDom) => {
    const imgList = [];
    const imageDom = torrentDom.find(".scale_image");
    for (let i = 0; i < imageDom.length; i++) {
      const parent = imageDom[i].parentElement;
      if (parent.tagName === "A" && parent.getAttribute("href").match(/\.png$/)) {
        imgList.push(parent.getAttribute("href"));
      } else {
        imgList.push(imageDom[i].getAttribute("src"));
      }
    }
    return imgList;
  };
  var getSource3 = (source, codes, resolution) => {
    if (codes.match(/BD100|BD66/i)) {
      return "uhdbluray";
    }
    if (source.match(/Blu-ray/i) && resolution.match(/2160P|4K/i)) {
      return "uhdbluray";
    }
    return source.replace(/-/g, "").toLowerCase();
  };
  var getVideoType13 = (container, isRemux, source, otherInfo) => {
    otherInfo = otherInfo.join(",");
    let type = "";
    if (isRemux) {
      type = "remux";
    } else if (otherInfo.match(/BD50|BD25|DIY/ig)) {
      type = "bluray";
    } else if (otherInfo.match(/BD66|BD100/ig) || source.match(/Blu-ray/i) && otherInfo.match(/DIY/i)) {
      type = "uhdbluray";
    } else if (source.match(/DVD/ig) && container.match(/MKV|AVI/ig)) {
      type = "dvdrip";
    } else if (otherInfo.match(/DVD5|DVD9/ig) && container.match(/VOB|ISO/ig)) {
      type = "dvd";
    } else if (container.match(/MKV|MP4/i)) {
      type = "encode";
    }
    return type;
  };
  var formatDescriptionData2 = (data, screenshots, mediaInfoArray) => {
    const element = document.createElement("span");
    element.innerHTML = data;
    let descriptionData = element.textContent;
    descriptionData = descriptionData.replace(/\r\n/g, "\n");
    descriptionData = descriptionData.split("\n").map((line) => {
      return line.trim();
    }).join("\n");
    TORRENT_INFO.originalDescription = descriptionData;
    screenshots.forEach((screenshot) => {
      const regStr = new RegExp(`\\[img\\]${screenshot}\\[\\/img\\]`, "i");
      if (!descriptionData.match(regStr)) {
        descriptionData = descriptionData.replace(new RegExp(screenshot, "g"), `[img]${screenshot}[/img]`);
      }
    });
    descriptionData = descriptionData.replace(/\[(\/)?hide(?:=(.+?))?\]/g, function(match, p1, p2) {
      const slash = p1 || "";
      return p2 ? `${p2}: [${slash}quote]` : `[${slash}quote]`;
    });
    descriptionData = descriptionData.replace(/\[(\/)?pre\]/g, "[$1quote]");
    descriptionData = descriptionData.replace(/\[align(=(.+?))\]((.|\n)+?)\[\/align\]/g, "[$2]$3[/$2]");
    const comparisonArray = descriptionData.match(/(\n.+\n)?\[comparison=(?:.+?)\]((.|\n|\s)+?)\[\/comparison\]/ig) || [];
    const comparisons = [];
    comparisonArray.forEach((item) => {
      descriptionData = descriptionData.replace(item, item.replace(/\s/g, ""));
      const reason = item.match(/(\n.*\n)?\[comparison=/i)[1] || "";
      const title = item.match(/\[comparison=(.*?)\]/i)[1];
      const comparisonImgArray = item.replace(/\[\/?comparison(=(.+?))?\]/ig, "").split(/[ \r\n]/);
      const imgs = [];
      [...new Set(comparisonImgArray)].forEach((item2) => {
        const formatImg = item2.replace(/\s*/g, "");
        if (item2.match(/^https?.+/)) {
          imgs.push(formatImg);
          descriptionData = descriptionData.replace(new RegExp(`(?<!(\\[img\\]))${item2}`, "gi"), `[img]${formatImg}[/img]`);
        } else if (item2.match(/^\[img\]/i)) {
          imgs.push(formatImg.replace(/\[\/?img\]/g, ""));
        }
      });
      comparisons.push({
        title,
        imgs,
        reason
      });
    });
    TORRENT_INFO.comparisons = comparisons;
    descriptionData = descriptionData.replace(/\[comparison=(.+?)\]/ig, "\n[b]$1 Comparison:[/b]\n").replace(/\[\/comparison\]/ig, "");
    mediaInfoArray.forEach((mediaInfo) => {
      descriptionData += `[quote]${mediaInfo}[/quote]`;
    });
    if (TORRENT_INFO.category === "concert") {
      descriptionData = $("#synopsis").text() + "\n" + descriptionData;
    }
    return descriptionData;
  };
  function getTags2(rawTags, exclude = []) {
    const knownTags = {};
    const otherTags = {};
    for (const rawTag of rawTags) {
      const tag = CURRENT_SITE_INFO.sourceInfo.editionTags[rawTag];
      if (tag) {
        knownTags[tag] = true;
      } else if (tag === null || exclude.includes(rawTag) || rawTag.match(/(-\d+%)|免费|DVD|BD/i)) {
      } else {
        otherTags[rawTag] = true;
      }
    }
    return {
      knownTags,
      otherTags
    };
  }

  // src/source/emp.js
  var emp_default = async () => {
    const torrentId = getUrlParam("id");
    if (!torrentId) {
      return false;
    }
    const title = $(".details h2").text().trim();
    const descriptionBBCode = getFilterBBCode($(`#content${torrentId}`)[0]);
    TORRENT_INFO.sourceSite = CURRENT_SITE_NAME;
    TORRENT_INFO.sourceSiteType = CURRENT_SITE_INFO.siteType;
    TORRENT_INFO.title = title;
    TORRENT_INFO.description = descriptionBBCode.replace(/\[color=#ffffff\]/g, "[color=#000]");
  };

  // src/source/index.js
  var getTorrentInfo5;
  if (!CURRENT_SITE_INFO) {
    getTorrentInfo5 = null;
  } else if (CURRENT_SITE_INFO.siteType === "NexusPHP") {
    getTorrentInfo5 = nexusphp_default;
  } else if (CURRENT_SITE_NAME === "BeyondHD") {
    getTorrentInfo5 = bhd_default;
  } else if (CURRENT_SITE_NAME === "HDBits") {
    getTorrentInfo5 = hdb_default;
  } else if (CURRENT_SITE_NAME === "TTG") {
    getTorrentInfo5 = ttg_default;
  } else if (CURRENT_SITE_INFO.siteType === "UNIT3D") {
    getTorrentInfo5 = unit3d_default;
  } else if (CURRENT_SITE_NAME === "HDT") {
    getTorrentInfo5 = hdt_default;
  } else if (CURRENT_SITE_NAME === "KG") {
    getTorrentInfo5 = kg_default;
  } else if (CURRENT_SITE_NAME === "UHDBits") {
    getTorrentInfo5 = uhd_default;
  } else if (CURRENT_SITE_NAME === "PTP") {
    getTorrentInfo5 = ptp_default2;
  } else if (CURRENT_SITE_NAME === "BTN") {
    getTorrentInfo5 = btn_default;
  } else if (CURRENT_SITE_INFO.siteType === "AvistaZ") {
    getTorrentInfo5 = avistaz_default;
  } else if (CURRENT_SITE_NAME === "TeamHD") {
    getTorrentInfo5 = teamhd_default;
  } else if (CURRENT_SITE_NAME === "HDSpace") {
    getTorrentInfo5 = hdspace_default;
  } else if (CURRENT_SITE_NAME === "GPW") {
    getTorrentInfo5 = gpw_default2;
  } else if (CURRENT_SITE_NAME === "EMP") {
    getTorrentInfo5 = emp_default;
  }
  var source_default = getTorrentInfo5;

  // src/site-dom/main.js
  var getSearchList = () => {
    const searchListSetting = GM_getValue("easy-seed.enabled-search-site-list");
    const searchSitesEnabled = searchListSetting ? JSON.parse(searchListSetting) : [];
    const siteFaviconClosed = GM_getValue("easy-seed.site-favicon-closed") || "";
    const searchList = SORTED_SITE_KEYS.map((siteName) => {
      const siteInfo = PT_SITE[siteName];
      if (siteInfo.search) {
        if (searchSitesEnabled.length === 0 || searchSitesEnabled.includes(siteName)) {
          const favIcon = siteFaviconClosed === "" && PT_SITE[siteName].icon ? PT_SITE[siteName].icon : "";
          return `<li><a href="javascript:void(0);" data-site="${siteName}">${favIcon} ${siteName}</a> <span>|</span></li>`;
        }
      }
      return "";
    });
    return searchList;
  };
  var getFunctionItems = () => {
    const doubanClosed = GM_getValue("easy-seed.douban-closed") || "";
    const {needDoubanBookInfo, needDoubanInfo} = CURRENT_SITE_INFO;
    const doubanSearchDom = (needDoubanBookInfo || needDoubanInfo) && !doubanClosed ? `<div class="function-list-item">
  <div class="douban-book-section">
    <input type="text" placeholder="${$t("\u624B\u52A8\u8F93\u5165\u8C46\u74E3\u94FE\u63A5")}" id="douban-link">
  </div>
  </div>` : "";
    const transferImgClosed = GM_getValue("easy-seed.transfer-img-closed") || "";
    console.log(TORRENT_INFO.doubanUrl);
    const doubanDom = (needDoubanInfo || !TORRENT_INFO.doubanUrl && !needDoubanBookInfo) && !doubanClosed ? `${doubanSearchDom}
  <div class="function-list-item">
    <div class="douban-section">
      <button id="douban-info">${$t("\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB")}</button>
    </div>
  </div>` : "";
    const doubanBookDom = needDoubanBookInfo ? `${doubanSearchDom}
<div class="function-list-item">
  <div class="douban-book-section">
    <button id="douban-book-info">${$t("\u83B7\u53D6\u8C46\u74E3\u8BFB\u4E66\u7B80\u4ECB")}</button>
  </div>
</div>` : "";
    const transferDom = transferImgClosed || CURRENT_SITE_NAME === "BTN" ? "" : `
      <div class="function-list-item">
      <div class="upload-section">
        <button id="img-transfer">${$t("\u8F6C\u7F29\u7565\u56FE")}</button>
        <select id="img-transfer-select">
          <option value="imgbb" selected>imgbb</option>
          <option value="gifyu">gifyu</option>
          <option value="pixhost">pixhost</option>
        </select>
        <div id="transfer-progress"></div>
      </div>
    </div>`;
    const uploadImgClosed = GM_getValue("easy-seed.upload-img-closed") || "";
    const uploadImgDom = uploadImgClosed || CURRENT_SITE_NAME === "BTN" ? "" : `
<div class="function-list-item">
<div class="upload-section">
  <button id="upload-to-another">${$t("\u8F6C\u5B58\u622A\u56FE")}</button>
  <select id="img-host-select">
    <option value="ptpimg" selected>ptpimg</option>
    <option value="gifyu">gifyu</option>
  </select>
  <button id="copy-img">${$t("\u62F7\u8D1D")}</button>
</div>
</div>`;
    return doubanDom || transferDom || doubanSearchDom ? `<section class="easy-seed-function-list">
        ${doubanDom}
        ${doubanBookDom} 
        ${transferDom}
        ${uploadImgDom}
      </section>` : "";
  };
  var createSeedDom = (torrentDom, titleDom = "", searchListDom = "") => {
    var _a, _b;
    const targetSetting = GM_getValue("easy-seed.enabled-target-sites");
    const targetSitesEnabled = targetSetting ? JSON.parse(targetSetting) : [];
    const siteFaviconClosed = GM_getValue("easy-seed.site-favicon-closed") || "";
    const siteList = SORTED_SITE_KEYS.map((siteName, index) => {
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
    const gazelleSearchListDom = (_b = (_a = searchListDom.match(/<ul(.|\n)+?<\/ul>/)) == null ? void 0 : _a[0]) == null ? void 0 : _b.replace(/(<ul.+?>)/, `$1
<div class="ptp-seed-title"><h4 class="quick-search">${$t("\u5FEB\u901F\u68C0\u7D22")}</h4></div>`);
    const seedDom = `
  <div class="seed-dom movie-page__torrent__panel">
    <ul class="site-list">
      <div class="ptp-seed-title">${CURRENT_SITE_INFO.siteType === "gazelle" ? titleDom : ""}</div>
      ${siteList.join("")}
      <li>
        <button id="batch-seed-btn">${$t("\u4E00\u952E\u7FA4\u8F6C")}</button>
      </li>
    </ul>
    ${CURRENT_SITE_INFO.siteType === "gazelle" ? `${CURRENT_SITE_NAME === "EMP" ? "" : getFunctionItems()}
    <div class="ptp-search-list">
        ${gazelleSearchListDom}
    <div/> ` : ""}
  </div>
  `;
    torrentDom.prepend(seedDom);
  };
  var insertTorrentPage = () => {
    let torrentInsertDom = $(CURRENT_SITE_INFO.seedDomSelector);
    const searchList = getSearchList();
    const searchListDom = `<td class="rowhead nowrap title-td detailsleft">
  <h4 class="quick-search">${$t("\u5FEB\u901F\u68C0\u7D22")}</h4>
  </td>
  <td class="rowfollow detailshash lista"> 
  <ul class="search-list ">
    ${searchList.join("")}
  </ul>
  </td>`;
    const functionItems = getFunctionItems();
    const functionDom = functionItems ? `<tr><td class="rowhead nowrap title-td detailsleft">
  <h4>${$t("\u5FEB\u6377\u64CD\u4F5C")}</h4>
  </td>
  <td class="rowfollow detailshash lista"> 
    ${functionItems}
  </td></tr>` : "";
    const easySeedTitleDom = `
  <h4>${$t("\u4E00\u952E\u8F6C\u79CD")} <span id="easy-seed-setting" class="easy-seed-setting-btn">
  <svg t="1616602641809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1165" width="32" height="32"><path d="M636.2112 847.7696c5.7344-42.5472 39.8848-76.7488 82.432-82.3808 20.1216-2.6624 39.2192 0.8704 55.6544 9.0112 32.5632 16.0768 72.3456 4.864 92.3136-25.3952 8.1408-12.3392 15.5648-25.1392 22.2208-38.4 16.6912-33.1264 4.8128-72.8064-25.7536-93.8496-1.4336-0.9728-2.816-1.9968-4.1984-3.072-34.2016-26.2656-46.848-73.216-30.2592-113.0496 7.7312-18.6368 20.3264-33.28 35.4816-43.4176 30.3104-20.2752 40.704-60.4672 24.2176-92.9792a383.37536 383.37536 0 0 0-19.3024-33.7408c-20.224-31.5392-60.4672-42.1376-94.5152-26.4192-1.536 0.7168-3.1232 1.3824-4.7616 2.048-39.936 15.9744-86.6304 2.9696-112.4864-31.4368-12.0832-16.0768-18.3296-34.304-19.4048-52.4288-2.1504-36.5056-31.6928-65.6896-68.1472-67.9936a388.59776 388.59776 0 0 0-47.9744-0.0512c-36.9152 2.2528-65.1776 32.2048-68.2496 69.0688-0.1536 1.6896-0.3072 3.3792-0.5632 5.0688-5.7344 42.3936-39.7312 76.4416-82.0736 82.2272-20.0192 2.7136-39.0656-0.7168-55.4496-8.704-32.5632-15.8208-72.192-4.5056-92.0064 25.7536a386.85184 386.85184 0 0 0-22.1696 38.5024c-16.5376 32.9728-4.864 72.3968 25.3952 93.5424 1.3824 0.9728 2.7648 1.9968 4.096 3.0208 33.6896 26.112 46.1312 72.3968 30.1056 111.872-7.6288 18.7904-20.1728 33.6384-35.3792 43.9296-29.952 20.2752-39.8848 60.2112-23.6032 92.4672 5.9392 11.7248 12.3904 23.0912 19.456 34.0992 20.0704 31.3856 59.9552 42.0352 93.9008 26.624 1.536-0.7168 3.1232-1.3824 4.7104-1.9968 39.68-15.6672 85.8624-2.7648 111.6672 31.232 12.288 16.2304 18.6368 34.6112 19.712 52.9408 2.0992 36.352 31.744 65.2288 68.096 67.6864 8.6016 0.5632 17.2544 0.8704 25.9584 0.8704 7.4752 0 14.8992-0.2048 22.3232-0.6656 36.8128-2.1504 65.024-32.1024 68.096-68.864 0.0512-1.6896 0.256-3.4304 0.4608-5.12z" fill="#FFF7E6" p-id="1166"></path><path d="M515.7888 514.816m-127.7952 0a127.7952 127.7952 0 1 0 255.5904 0 127.7952 127.7952 0 1 0-255.5904 0Z" fill="#FD973F" p-id="1167"></path><path d="M515.7888 668.2112c-84.5824 0-153.3952-68.8128-153.3952-153.3952 0-84.5824 68.8128-153.3952 153.3952-153.3952s153.3952 68.8128 153.3952 153.3952c-0.0512 84.5824-68.8128 153.3952-153.3952 153.3952z m0-255.5392c-56.32 0-102.1952 45.824-102.1952 102.1952s45.824 102.1952 102.1952 102.1952 102.1952-45.824 102.1952-102.1952-45.8752-102.1952-102.1952-102.1952zM886.1696 437.1968c-6.0416 0-12.0832-2.0992-16.9472-6.4a25.6 25.6 0 0 1-2.2016-36.1472c14.8992-16.8448 18.0736-41.5744 7.936-61.5424a388.5568 388.5568 0 0 0-20.224-35.328c-12.4416-19.4048-35.5328-29.0304-58.7776-24.576a25.60512 25.60512 0 0 1-29.952-20.3264 25.60512 25.60512 0 0 1 20.3264-29.952c43.9808-8.3968 87.7056 10.0864 111.5136 47.2064 8.2432 12.8 15.9232 26.2144 22.784 39.8336 19.5584 38.5536 13.4144 86.2208-15.2576 118.6304-5.12 5.6832-12.1344 8.6016-19.2 8.6016z" fill="#44454A" p-id="1168"></path><path d="M515.7888 968.448c-10.1888 0-20.48-0.3584-30.6176-1.024-53.7088-3.6352-96.5632-46.3872-99.6352-99.4304-0.9216-16.1792-6.7584-31.6928-16.7936-44.9536-21.9136-28.8768-60.7744-39.7312-94.5152-26.4192-1.3824 0.512-2.7136 1.0752-3.9936 1.6896-50.1248 22.784-107.6224 6.2976-136.704-39.1168a459.9552 459.9552 0 0 1-22.9376-40.2432c-24.064-47.6672-9.1136-105.984 34.816-135.68 13.3632-9.0624 23.7568-21.9648 30.0032-37.3248 13.6192-33.536 3.1744-72.448-25.4976-94.72-1.1776-0.9216-2.3552-1.792-3.5328-2.6112-45.0048-31.4368-60.3648-88.8832-36.5056-136.5504 7.7824-15.5648 16.5888-30.8736 26.1632-45.4656 29.2352-44.6464 87.296-60.8256 135.0144-37.6832 14.4384 7.0144 30.72 9.5232 47.104 7.3216 35.9936-4.9152 64.5632-33.536 69.4784-69.632 0.2048-1.4336 0.3584-2.8672 0.4608-4.3008 4.6592-54.8864 46.6432-97.0752 99.9424-100.352 18.688-1.1264 37.8368-1.1264 56.6272 0.1024 53.76 3.4304 96.6656 46.336 99.7888 99.7888 0.9216 15.9744 6.656 31.3856 16.4864 44.544 14.4384 19.2 37.632 31.232 62.1568 32.2048 14.1312 0.5632 25.1392 12.4928 24.576 26.5728-0.5632 14.1312-12.6976 25.088-26.5728 24.576-40.2944-1.5872-77.1584-20.7872-101.0688-52.6848-15.9232-21.1968-25.1392-46.1824-26.6752-72.2432-1.6384-27.648-23.9616-49.8688-51.9168-51.6608-16.64-1.0752-33.6896-1.0752-50.2272-0.0512-27.6992 1.6896-49.6128 24.1664-52.0704 53.4528-0.2048 2.2528-0.4608 4.608-0.768 6.912-7.9872 58.8288-54.5792 105.472-113.3056 113.5104-26.4192 3.584-52.7872-0.5632-76.3904-11.9808-24.6272-11.9296-54.6816-3.5328-69.8368 19.6608a404.15744 404.15744 0 0 0-23.1936 40.2944c-12.3904 24.7808-3.9936 54.9376 20.0192 71.68 1.8944 1.3312 3.7888 2.7136 5.632 4.1472 46.6432 36.1984 63.744 99.7376 41.472 154.4192-10.0864 24.7808-26.9312 45.6704-48.7424 60.416-22.6304 15.3088-30.2592 45.5168-17.8176 70.2464 6.144 12.1856 13.0048 24.1664 20.3776 35.6864 15.2576 23.808 45.6704 32.256 72.3968 20.1728 2.0992-0.9216 4.2496-1.8432 6.4-2.7136 55.04-21.7088 118.3744-3.9936 154.112 43.1104 16.2304 21.4016 25.6 46.592 27.0848 72.96 1.5872 27.3408 23.9104 49.408 51.968 51.3024 16.6912 1.1264 33.6384 1.2288 50.5344 0.256 27.5456-1.5872 49.3056-24.0128 51.7632-53.248 0.2048-2.3552 0.4608-4.6592 0.768-6.9632 7.9872-59.136 54.784-105.8304 113.8176-113.664 26.5216-3.5328 53.0432 0.768 76.6464 12.4416 24.6272 12.1856 54.784 3.84 70.0416-19.4048 8.4992-12.9024 16.3328-26.4192 23.2448-40.192 12.544-24.8832 3.9936-55.1424-20.3264-71.8848-1.9456-1.3312-3.84-2.7136-5.7344-4.1984-47.5648-36.5568-64.7168-100.7104-41.728-155.9552a25.55904 25.55904 0 0 1 33.4848-13.7728 25.55904 25.55904 0 0 1 13.7728 33.4848c-13.8752 33.3824-3.1232 73.6256 25.6512 95.6928 1.1776 0.9216 2.3552 1.792 3.584 2.6112 45.6192 31.4368 61.184 89.1392 37.0176 137.1136-7.8336 15.5136-16.64 30.72-26.2144 45.312-29.4912 44.7488-87.7056 60.7232-135.4752 37.1712-14.4896-7.168-30.8736-9.7792-47.2576-7.5776-35.6352 4.7104-64.9728 34.048-69.7856 69.7344-0.2048 1.4848-0.3584 2.9696-0.4608 4.4032-4.5568 54.8352-46.5408 96.9728-99.7888 100.0448-8.7552 0.4096-17.6128 0.6656-26.3168 0.6656z" fill="#44454A" p-id="1169">
  </path>
  </svg>
  </span></h4>`;
    if (CURRENT_SITE_INFO.siteType.match(/NexusPHP|AvistaZ/) || CURRENT_SITE_NAME.match(/BeyondHD|TTG|Blutopia|HDPOST|Aither|ACM|KG|iTS/)) {
      const trDom = `<tr>
    <td class="rowhead nowrap title-td">
    ${easySeedTitleDom}
    </td>
    <td class="rowfollow easy-seed-td"></td>
    </tr>
    ${functionDom}
    <tr>
    ${searchListDom}
    </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(".easy-seed-td");
    } else if (CURRENT_SITE_NAME === "HDT") {
      const trDom = `<tr>
    <td class="detailsleft" title-td" align="right">
    ${easySeedTitleDom}
    </td>
    <td class="detailshash easy-seed-td" align="center"></td>
    </tr>
    ${functionDom}
    <tr>
    ${searchListDom}
    </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(".easy-seed-td");
    } else if (CURRENT_SITE_NAME === "HDBits") {
      const trDom = `<tr class="hdb-tr">
    <td class="rowfollow title-td hdb-td">${easySeedTitleDom}</td>
    <td class="rowfollow easy-seed-td hdb-td"></td>
    </tr>
    <tr class="hdb-tr">
    ${functionDom.replace(/<\/?tr>/g, "")}
    </tr>
    <tr class="hdb-tr">
    ${searchListDom}
    </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(".easy-seed-td");
    } else if (["PTP", "BTN", "GPW", "EMP"].includes(CURRENT_SITE_NAME)) {
      const torrentId = getUrlParam("torrentid");
      if (CURRENT_SITE_NAME === "GPW") {
        torrentInsertDom = $(`#torrent_torrent_${torrentId} >td`);
      } else if (CURRENT_SITE_NAME === "EMP") {
        const groupId = getUrlParam("id");
        torrentInsertDom = $(`.groupid_${groupId}.torrentdetails>td`);
      } else {
        torrentInsertDom = $(`#torrent_${torrentId} >td`);
      }
    } else if (CURRENT_SITE_NAME === "UHDBits") {
      const torrentId = getUrlParam("torrentid");
      $(`#torrent_${torrentId} >td`).prepend(document.createElement("blockquote"));
      torrentInsertDom = $(`#torrent_${torrentId} >td blockquote:first`);
    } else if (CURRENT_SITE_NAME === "TeamHD") {
      const trDom = `
    <div class="team-hd">
      ${easySeedTitleDom}
      <div class="easy-seed-td" style="flex-wrap: wrap;"></div>
    </div>
    <div class="team-hd">
    ${functionDom}
    </div>
    <div class="team-hd">
    ${searchListDom}
    </div>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(".easy-seed-td");
    } else if (CURRENT_SITE_NAME === "HDSpace") {
      const trDom = `<tr>
    <td align="right" class="title-td">
    ${easySeedTitleDom}
    </td>
    <td class="lista easy-seed-td" align="center"></td>
    </tr>
    ${functionDom}
    <tr>
    ${searchListDom}
    </tr>`;
      torrentInsertDom.after(trDom);
      torrentInsertDom = $(document.querySelector(".easy-seed-td"));
      $(document.querySelectorAll(".title-td")).addClass("header");
    }
    createSeedDom(torrentInsertDom, easySeedTitleDom, searchListDom);
  };

  // src/site-dom/quick-search.js
  var filterBluTorrent = (imdb = "", name = "") => {
    if (imdb) {
      $("#imdb").val(imdb);
    } else if (name) {
      $("#search").val(name);
    }
    const token = $('meta[name="csrf_token"]').attr("content");
    const url = `${CURRENT_SITE_INFO.url}/torrents/filter?search=${name}&imdb=${imdb}&_token=${token}&sorting=size&direction=desc`;
    fetch(url, {
      responseType: "text"
    }).then((data) => {
      $("#facetedSearch").html(data);
    });
  };
  var fillSearchImdb = () => {
    const imdbParam = getUrlParam("imdb");
    const nameParam = getUrlParam("name");
    const searchType = getUrlParam("search_area");
    if (imdbParam || nameParam) {
      if (CURRENT_SITE_INFO.siteType === "UNIT3D" && CURRENT_SITE_NAME !== "Blutopia") {
        filterBluTorrent(imdbParam, nameParam);
      } else if (CURRENT_SITE_NAME === "Bdc") {
        $("#tsstac").val(imdbParam);
        $("#search_type").val(searchType);
      } else if (CURRENT_SITE_NAME === "HDAI") {
        $('input[name="keyword"]').val(imdbParam || nameParam);
        $('select[name="keyword_area"]').val(searchType);
      } else if (CURRENT_SITE_NAME === "PTN") {
        $("#movieimdb").val(imdbParam);
        $("#moviename").val(nameParam);
      }
    }
  };

  // src/site-dom/setting-panel.js
  var openSettingPanel = () => {
    const targetSitesEnabled = GM_getValue("easy-seed.enabled-target-sites") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-target-sites"));
    const batchSeedSiteEnabled = GM_getValue("easy-seed.enabled-batch-seed-sites") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-batch-seed-sites"));
    const searchSitesEnabled = GM_getValue("easy-seed.enabled-search-site-list") === void 0 ? [] : JSON.parse(GM_getValue("easy-seed.enabled-search-site-list"));
    const transferImgClosed = GM_getValue("easy-seed.transfer-img-closed") || "";
    const uploadImgClosed = GM_getValue("easy-seed.upload-img-closed") || "";
    const siteFaviconClosed = GM_getValue("easy-seed.site-favicon-closed") || "";
    const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
    const thanksQuoteClosed = GM_getValue("easy-seed.thanks-quote-closed") || "";
    const doubanClosed = GM_getValue("easy-seed.douban-closed") || "";
    const targetSiteList = SORTED_SITE_KEYS.map((siteName, index) => {
      if (PT_SITE[siteName].asTarget) {
        const checked = targetSitesEnabled.includes(siteName) ? "checked" : "";
        return `<li>
      <label><input name="target-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
      }
      return "";
    });
    const batchSeedSiteList = SORTED_SITE_KEYS.map((siteName, index) => {
      if (PT_SITE[siteName].asTarget) {
        const checked = batchSeedSiteEnabled.includes(siteName) ? "checked" : "";
        return `<li>
      <label><input name="batch-seed-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
      }
      return "";
    });
    const searchSiteList = SORTED_SITE_KEYS.map((siteName) => {
      const checked = searchSitesEnabled.includes(siteName) ? "checked" : "";
      return `<li>
      <label><input name="search-site-enabled" type="checkbox" value="${siteName}" ${checked}/>${siteName} </label>
      </li>`;
    });
    const panelHtml = `
  <div id="easy-seed-setting-panel" class="easy-seed-setting-panel">
    <div class="panel-content-wrap">
      <div class="panel-content">
        <h3>${$t("\u8F6C\u79CD\u7AD9\u70B9\u542F\u7528")}</h3>
        <section class="site-enable-setting">
            <ul class="target-sites-enable-list" >
              ${targetSiteList.join("")}
            </ul>
          </section>
        <h3>${$t("\u6279\u91CF\u8F6C\u79CD\u542F\u7528")}</h3>
        <i>${$t("\u4E00\u952E\u6279\u91CF\u8F6C\u53D1\u5230\u4EE5\u4E0B\u9009\u4E2D\u7684\u7AD9\u70B9")}</i>
        <section class="site-enable-setting">
          <ul class="batch-seed-sites-enable-list">
              ${batchSeedSiteList.join("")}
          </ul>
        </section>
        <h3>${$t("\u7AD9\u70B9\u641C\u7D22\u542F\u7528")}</h3>
        <section class="site-enable-setting">
          <ul class="search-sites-enable-list">
            ${searchSiteList.join("")}
          </ul>
        </section>
        <h3>${$t("\u56FE\u5E8A\u914D\u7F6E")}</h3>
        <section class="site-enable-setting img-upload-setting">
        <label>
        ptpimg ApiKey:   
        <input name="ptp-img-api-key" type="text" value='${ptpImgApiKey}'/>
        <a 
        target="_blank"
        href="https://github.com/techmovie/easy-seed/wiki/%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96ptpimg%E7%9A%84apiKey"
        >
        ${$t("\u5982\u4F55\u83B7\u53D6\uFF1F")}
        </a>
        </label>
       
        </section>
        <h3>${$t("\u989D\u5916\u529F\u80FD\u5173\u95ED")}</h3>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="transfer-img-closed" type="checkbox" ${transferImgClosed}/>${$t("\u5173\u95ED\u8F6C\u7F29\u7565\u56FE\u529F\u80FD")}</label>
        </section>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="upload-img-closed" type="checkbox" ${uploadImgClosed}/>${$t("\u5173\u95ED\u8F6C\u5B58ptpimg\u529F\u80FD")}</label>
        </section>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="site-favicon-closed" type="checkbox" ${siteFaviconClosed}/>${$t("\u5173\u95ED\u7AD9\u70B9\u56FE\u6807\u663E\u793A")}</label>
        </section>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="thanks-quote-closed" type="checkbox" ${thanksQuoteClosed}/>${$t("\u4E0D\u663E\u793A\u81F4\u8C22\u5185\u5BB9")}</label>
        </section>
        <section class="site-enable-setting transfer-img-closed">
        <label><input name="douban-closed" type="checkbox" ${doubanClosed}/>${$t("\u4E0D\u663E\u793A\u8C46\u74E3\u6309\u94AE\u548C\u8C46\u74E3\u94FE\u63A5")}</label>
        </section>
      </div>
      <div class="confirm-btns">
        <button id="cancel-setting-btn">${$t("\u53D6\u6D88")}</button>
        <button id="save-setting-btn">${$t("\u4FDD\u5B58")}</button>
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
    const uploadImgEnabled = $("input[name='upload-img-closed']").attr("checked") || "";
    const siteFaviconEnabled = $("input[name='site-favicon-closed']").attr("checked") || "";
    const thanksQuoteEnabled = $("input[name='thanks-quote-closed']").attr("checked") || "";
    const doubanClosed = $("input[name='douban-closed']").attr("checked") || "";
    const ptpImgApiKey = $("input[name='ptp-img-api-key']").val();
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
      GM_setValue("easy-seed.upload-img-closed", uploadImgEnabled);
      GM_setValue("easy-seed.site-favicon-closed", siteFaviconEnabled);
      GM_setValue("easy-seed.ptp-img-api-key", ptpImgApiKey);
      GM_setValue("easy-seed.thanks-quote-closed", thanksQuoteEnabled);
      GM_setValue("easy-seed.douban-closed", doubanClosed);
      $("#easy-seed-setting-panel").remove();
      window.location.reload();
    } catch (error) {
      showNotice({title: $t("\u9519\u8BEF"), text: $t("\u4FDD\u5B58\u672C\u5730\u7AD9\u70B9\u8BBE\u7F6E\u5931\u8D25")});
    }
  };
  var openBatchSeedTabs = () => {
    const batchSeedSetting = GM_getValue("easy-seed.enabled-batch-seed-sites");
    const batchSeedSiteEnabled = batchSeedSetting ? JSON.parse(batchSeedSetting) : [];
    if (batchSeedSiteEnabled.length === 0) {
      showNotice({title: $t("\u9519\u8BEF"), text: $t("\u8BF7\u5148\u8BBE\u7F6E\u7FA4\u8F6C\u5217\u8868")});
      return false;
    }
    const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
    SORTED_SITE_KEYS.forEach((siteName, index) => {
      const {url, uploadPath} = PT_SITE[siteName];
      if (PT_SITE[siteName].asTarget) {
        if (batchSeedSiteEnabled.includes(siteName)) {
          GM_openInTab(url + uploadPath + "#torrentInfo=" + torrentInfo);
        }
      }
    });
    showNotice({title: $t("\u6210\u529F"), text: $t("\u8F6C\u79CD\u9875\u9762\u5DF2\u6253\u5F00\uFF0C\u8BF7\u524D\u5F80\u5BF9\u5E94\u9875\u9762\u64CD\u4F5C")});
  };

  // src/site-dom/click-event.js
  var getPTPGroupId = async (imdbUrl) => {
    const imdbId = getIMDBIdByUrl(imdbUrl);
    if (imdbId) {
      const url = `${PT_SITE.PTP.url}/torrents.php?searchstr=${imdbId}&grouping=0&json=noredirect`;
      const data = await fetch(url);
      if (data && data.Movies && data.Movies.length > 0) {
        return data.Movies[0].GroupId;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  var getGPWGroupId = async (imdbUrl) => {
    const imdbId = getIMDBIdByUrl(imdbUrl);
    if (imdbId) {
      const url = `${PT_SITE.GPW.url}/upload.php?action=movie_info&imdbid=${imdbId}&check_only=1`;
      const data = await fetch(url);
      if (data && data.response && data.response.GroupID) {
        return data.response.GroupID;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  var click_event_default = () => {
    if ($("#easy-seed-setting")[0]) {
      $("#easy-seed-setting").click(() => {
        openSettingPanel();
      });
    }
    if ($("#batch-seed-btn")[0]) {
      $("#batch-seed-btn").click(() => {
        openBatchSeedTabs();
      });
    }
    if ($("#img-transfer")[0]) {
      $("#img-transfer").click(() => {
        getThumbnailImgs();
      });
    }
    if ($("#douban-info")[0]) {
      $("#douban-info").click(function() {
        getDoubanData(this);
      });
    }
    if ($("#douban-book-info")[0]) {
      $("#douban-book-info").click(() => {
        getDoubanBookInfo();
      });
    }
    if (document.querySelector("#upload-to-another")) {
      $("#upload-to-another").click(function() {
        uploadScreenshotsToAnother(this);
      });
    }
    $("h4.quick-search").click(function() {
      checkQuickResult();
    });
    handleSiteClickEvent();
    handleSearchClickEvent();
  };
  var handleSiteClickEvent = () => {
    $(".site-list li>a").click(async function() {
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
          tvPack: "2",
          documentary: "1"
        };
        const path = catMap[TORRENT_INFO.category] || "1";
        url = url.replace("1", path);
      }
      if (url.match(/aither/)) {
        const catMap = {
          movie: "1",
          tv: "2",
          tvPack: "2",
          documentary: "1",
          concert: "3",
          sport: "9",
          cartoon: "405",
          app: "10",
          ebook: "11",
          magazine: "11",
          audioBook: "14"
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
      if (url.match(/baconbits/)) {
        const catMap = {
          movie: "Movies",
          tv: "TV",
          tvPack: "TV",
          documentary: "Movies",
          cartoon: "Anime",
          app: "Applications",
          ebook: "E-Books",
          magazine: "Magazines",
          audioBook: "Audiobooks",
          comics: "Comics"
        };
        const bBDomUrl = `${PT_SITE.bB.url}/ajax.php?action=upload_section&section=${catMap[TORRENT_INFO.category]}`;
        const formDom = await fetch(bBDomUrl, {
          responseType: "text"
        });
        TORRENT_INFO.formDom = formDom;
      }
      if (url.match(PT_SITE.BYR.host)) {
        const catMap = {
          movie: "408",
          tv: "401",
          tvPack: "401",
          documentary: "410",
          concert: "402",
          sport: "409",
          cartoon: "404",
          variety: "405"
        };
        url = url.replace("/upload.php", `/upload.php?type=${catMap[TORRENT_INFO.category]}`);
      }
      if (url.match(PT_SITE.PTP.host)) {
        const groupId = await getPTPGroupId(TORRENT_INFO.imdbUrl);
        url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
      }
      if (url.match(PT_SITE.GPW.host)) {
        const groupId = await getGPWGroupId(TORRENT_INFO.imdbUrl);
        if (groupId) {
          url = url.replace(/(upload.php)/, `$1?groupid=${groupId}`);
        }
      }
      if (TORRENT_INFO.isForbidden) {
        const result = window.confirm($t("\u672C\u79CD\u5B50\u7981\u6B62\u8F6C\u8F7D\uFF0C\u786E\u5B9A\u8981\u7EE7\u7EED\u8F6C\u8F7D\u4E48\uFF1F"));
        if (!result) {
          return;
        }
      }
      if (CURRENT_SITE_NAME === "TTG" && !TORRENT_INFO.description) {
        showNotice({
          text: $t("\u8BF7\u7B49\u5F85\u9875\u9762\u52A0\u8F7D\u5B8C\u6210")
        });
        return;
      }
      const torrentInfo = encodeURIComponent(JSON.stringify(TORRENT_INFO));
      url = url.replace(/(#torrentInfo=)(.+)/, `$1${torrentInfo}`);
      GM_openInTab(url);
    });
  };
  var handleSearchClickEvent = () => {
    $(".search-list li>a").click(async function() {
      const siteName = $(this).data("site");
      const url = $(this).data("url") || getQuickSearchUrl(siteName);
      GM_openInTab(url);
    });
  };

  // src/site-dom/ptpimg.js
  if (location.host === "ptpimg.me") {
    const ptpImgApiKey = GM_getValue("easy-seed.ptp-img-api-key") || "";
    if (!ptpImgApiKey) {
      $("#form_file_upload").after(`
    <div class="ptp-api-key-btn">
    <button class="btn btn-info">
    <i class="glyphicon glyphicon-floppy-saved"></i>
    <span>Save ApiKey</span>
    </button>
    </div>
    `);
      $(".ptp-api-key-btn button").click(() => {
        const apiKey = $("#api_key").val();
        GM_setValue("easy-seed.ptp-img-api-key", apiKey);
        showNotice({
          title: "Success!",
          text: "Saved to EasyUpload."
        });
      });
    }
  }

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
.ptp-seed-title {
  display: flex;
  align-items: center;
}
.ptp-seed-title h4{
  margin: 0 !important;
  margin-right: 10px !important;
  display: flex;
  align-items: center;
  font-weight: bold;
}
#torrents .ptp-seed-title h4{
  display: block !important;
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
  align-items: center;
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
#content .seed-dom li{
  margin-right: 5px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding: 0px;
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
.easy-seed-function-list{
  display: flex;
  justify-content: space-around; 
  padding: 6px 20px;
  flex-wrap: wrap;
}
.easy-seed-function-list button{
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
.easy-seed-function-list button:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
.easy-seed-function-list button.is-disabled, .easy-seed-function-list button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.function-list-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.function-list-item input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 34px;
    line-height: 40px;
    outline: none;
    width: 200px;
    padding: 0 12px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.function-list-item select{
  border: 0;
  font-family: inherit;
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  text-transform: none;
}
.function-list-item input::placeholder {
  color: #c0c4cc
}
.function-list-item input:hover {
  border-color: #c0c4cc
}
.function-list-item input:focus {
    outline: none;
    border-color: #409eff
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
.upload-section,.douban-section,.douban-book-section{
  display: flex;
  justify-content: center;
  align-items: center;
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
  animation: 5s linear rotate infinite;

}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  };
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
#batch-seed-btn,#auto-fill-douban{
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  font-weight: 600;
  cursor: pointer;
}
#batch-seed-btn:hover,#auto-fill-douban:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent
}
#batch-seed-btn:active,#auto-fill-douban:active {
  color: #3a8ee6;
  background-color: transparent
}
#auto-fill-douban{
  font-size: 14px;
  display:inline-block;
}
.easy-seed-setting-panel *{
  padding: 0;
  margin: 0;
}
.easy-seed-setting-panel input[type="text"]{
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 34px;
  line-height: 40px;
  outline: none;
  width: 200px;
  padding: 0 12px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.easy-seed-setting-panel input[type="text"]::placeholder {
  color: #c0c4cc
}
.easy-seed-setting-panel input[type="text"]:hover {
  border-color: #c0c4cc
}
.easy-seed-setting-panel input[type="text"]:focus {
    outline: none;
    border-color: #409eff
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
  margin-bottom: 8px;
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
.easy-seed-setting-panel .img-upload-setting label{
  justify-content: center;
}
.easy-seed-setting-panel .img-upload-setting label input{
  margin-left: 8px;
  margin-right: 8px;
}
.easy-seed-setting-panel .img-upload-setting label a{
  color: #000;
  font-weight: 500;
}
.easy-seed-setting-panel .img-upload-setting label a:hover{
  color: #f7d584;
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
.ptp-api-key-btn{
  text-align: center;
}
.easy-notification{
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
  overflow: hidden;
  right:0;
  transform: translateX(100%);
}
.easy-notification-enter{
  right: 16px;
  transform: translateX(0);
}
.notification-wrapper {
  margin-left: 13px;
  margin-right: 8px
}

.notification-title {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0;
  background: transparent;
  box-shadow: none;
  border: none;
}

.notification-content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify
}

.notification-content p {
  margin: 0
}

.notification-close-btn svg {
  height: 22px;
  width: 22px;
  font-size: 22px
}
.notification-close-btn {
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px
}

.notification-close-btn:hover {
  color: #606266
}
#transfer-progress{
  display: none;
}
.team-hd{
  display: flex;
  align-items: center;
  width: 100%;
}
.team-hd h4{
  flex-shrink: 0;
  margin: 0;
  line-height: initial;
  margin-right: 10px;
}
.team-hd .easy-seed-function-list{
  flex: 1;
}
tr.pad[id*="torrent_"]{
  font-family: 'Proxima Nova','Lato','Segoe UI',sans-serif;
}
#copy-img{
  display: none;
  margin-left: 5px;
}
.quick-search{
  cursor: pointer;
  color: #409eff;
  font-weight: 600;
}
`);

  // src/index.js
  var paramsMatchArray = location.hash && location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/);
  var torrentParams = paramsMatchArray && paramsMatchArray.length > 0 ? paramsMatchArray[2] : null;
  if (CURRENT_SITE_NAME) {
    fillSearchImdb();
    if (CURRENT_SITE_INFO.asTarget) {
      if (torrentParams) {
        torrentParams = JSON.parse(decodeURIComponent(torrentParams));
      }
      fillTargetForm(torrentParams);
    }
    if (CURRENT_SITE_INFO.asSource && !location.href.match(/upload/ig) && !(CURRENT_SITE_INFO.search && location.pathname.match(CURRENT_SITE_INFO.search.path) && (getUrlParam("imdb") || getUrlParam("name")))) {
      source_default().then(() => {
        console.log(TORRENT_INFO);
      });
      insertTorrentPage();
      click_event_default();
    }
  }
})();
