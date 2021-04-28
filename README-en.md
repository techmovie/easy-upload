# easy-seed

[Installation address 1](https://greasyfork.org/zh-CN/scripts/423199-easy-seed-pt%E4%B8%80%E9%94%AE%E8%BD%AC%E7%A7%8D)

[Installation address 2](https://openuserjs.org/scripts/birdplane/easy-seed_PT%E4%B8%80%E9%94%AE%E8%BD%AC%E7%A7%8D)

[Join Telegram group](https://t.me/easyseed)

## About

Support reproducing torrents for mainstream Chinese and international private trackers sites, making upload handy by reducing repetitive work. 

## Features
* Support transfer between Chinese and international sites of different web architectures by automatically fill in info such as description, video parameters, etc. 
* Support custom configuration of transfer sites.
* Support batch transfer. Batch transfer to target sites with one-click.
* Add thumbnail transfer from original image to meet screenshot requirements by some sites.
* Support grabbing Douban movie description based on IMDB info, when some domestic sites requires Douban info in reproducing from international sites.
* Allow filling info on upload page by unified yaml config of the site, making it easier to add an unsupported site. If you want to add an unsupported site, please turn to [Site Configuration Rules](https://github.com/techmovie/easy-seed/wiki/How-to-Add-Unsupported-Sites)
* Support quick search of current resource, and the site for searching is configurable.

## Settings
* Click the gear wheel icon to open settings panel.
* Enable transfer sites: define target site list to hide unregistered and unwanted sites. All sites will be displayed by default.
* Enable batch transfer: click “batch reproduce” button to open target sites for group transfer.
* Enable site search: config quick search list to define searching scope.
  
## Cautions
* For now, transfer of music, MV and anime is not supported. The type info may not be automatically filled.
* Upload page in LemonHD only supports reproduction of movie, episode, documentary and MV types.
* Irrelevant pictures to screenshots may still be retained when reproduced from Chinese sites to international ones, though filtering work has been done. They need to be deleted manually.
* Most international sites require full MediaInfo data while even some official resources in Chinese sites fail to provide it. In this case, MediaInfo data needs a manual extraction.
* For the image loading strategy of ToTheGlory, wait and click the reproduce button only after the page fully loaded, otherwise resource info will be obtained partially.
* Because the type info in some Chinese upload pages is too confusing, it may not be successfully filled. Please feel free to start a new issue.

## Todo

  Please refer [Project plan](https://github.com/techmovie/easy-seed/projects)

  I don’t have access or upload permission to all sites, so any help including testing and PR is welcoming.

## Supported Sites

| Site name | Source(supports transfer) | Target(allows transfer) |
| :-------: | :-----------------------: | :---------------------: |
|   1PTBA   |             ✅             |            ✅            |
|   52pt    |             ✅             |            ✅            |
|    ACM    |             ✅             |            ✅            |
|  Aither   |             ✅             |            ✅            |
|    bB     |             ❌             |            ✅            |
| BTSCHOOL  |             ✅             |            ✅            |
|  BeiTai   |             ✅             |            ❌            |
| BeyondHD  |             ✅             |            ✅            |
| Blutopia  |             ✅             |            ✅            |
|  CHDBits  |             ✅             |            ✅            |
|  DiscFan  |             ✅             |            ✅            |
|  HD4FANS  |             ✅             |            ✅            |
|   HDAI    |             ✅             |            ✅            |
|  HDArea   |             ✅             |            ✅            |
|  HDAtmos  |             ❌             |            ✅            |
|  HDBits   |             ✅             |            ✅            |
|  HDChina  |             ✅             |            ✅            |
|  HDDolby  |             ✅             |            ✅            |
|  HDHome   |             ✅             |            ✅            |
|  HDPOST   |             ✅             |            ✅            |
|  HDRoute  |             ❌             |            ✅            |
|   HDSky   |             ✅             |            ✅            |
|    HDT    |             ✅             |            ✅            |
|    HDU    |             ✅             |            ✅            |
|    iTS    |             ❌             |            ✅            |
| KEEPFRDS  |             ✅             |            ❌            |
|    KG     |             ✅             |            ❌            |
|  LemonHD  |             ✅             |            ✅            |
|   MTeam   |             ✅             |            ✅            |
|   NYPT    |             ✅             |            ✅            |
|  OurBits  |             ✅             |            ✅            |
|  PTHome   |             ✅             |            ✅            |
|    PTP    |             ✅             |            ❌            |
|  PTSBAO   |             ✅             |            ✅            |
|   PTer    |             ✅             |            ✅            |
|    SSD    |             ✅             |            ✅            |
| SoulVoice |             ✅             |            ✅            |
|   TCCF    |             ✅             |            ✅            |
|   TJUPT   |             ✅             |            ✅            |
|    TLF    |             ✅             |            ✅            |
|    TTG    |             ✅             |            ✅            |
|  UHDBits  |             ✅             |            ✅            |


## Buy Me a Coffee

You can buy me a coffee through [PayPal](https://www.paypal.com/paypalme/techmovie) if you enjoy the features and continuous support helps the maintenance and development of this project. Thank you.