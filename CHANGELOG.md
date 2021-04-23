## [1.2.5](https://github.com/techmovie/easy-seed/compare/1.2.4...1.2.5) (2021-04-23)


### Bug Fixes

* none nexusphp sites can't get thumbnailImgs ([e6867ef](https://github.com/techmovie/easy-seed/commit/e6867efbe6603b551c566fbc05fd397a364d4efd)), closes [#51](https://github.com/techmovie/easy-seed/issues/51)
* 修复部分站点描述里缺mediainfo的问题 ([f97de4c](https://github.com/techmovie/easy-seed/commit/f97de4c0718bc1542272100a429801a5a2ada1a0))
* 修改ptp title获取方法 ([72a727d](https://github.com/techmovie/easy-seed/commit/72a727d99fa3771264b8e17fe7e7d558e8ee1068))
* 单独处理pixhost的原图地址，替换为真实图片链接 ([e3d5736](https://github.com/techmovie/easy-seed/commit/e3d57367e73ce469c5e52540c28a1adbf5c2d583)), closes [#48](https://github.com/techmovie/easy-seed/issues/48)


### Features

* **new site:** 支持52pt ([dafdd72](https://github.com/techmovie/easy-seed/commit/dafdd727b17c8efbcb05658ec22cda6312288362)), closes [#52](https://github.com/techmovie/easy-seed/issues/52)
* **new site:** 支持UHD(target) ([69e5cd1](https://github.com/techmovie/easy-seed/commit/69e5cd15f9a0f7ec71bf5d9040f4c22335dfd60f)), closes [#28](https://github.com/techmovie/easy-seed/issues/28)
* **new site:** 支持UHDBits(source) ([92ef746](https://github.com/techmovie/easy-seed/commit/92ef7460d185cd88d7468db971d18a007c01b6d6)), closes [#28](https://github.com/techmovie/easy-seed/issues/28)


### Performance Improvements

* remove extra description images ([c40e798](https://github.com/techmovie/easy-seed/commit/c40e798459541fa4a1bbe9cfcc7327936fbf2be8))



## [1.2.4](https://github.com/techmovie/easy-seed/compare/1.2.3...1.2.4) (2021-04-18)


### Bug Fixes

* 关闭转缩略图功能后隐藏相关DOM ([34b71a1](https://github.com/techmovie/easy-seed/commit/34b71a141eaea464337236926359f39f12f29800))
* 兼容图片跳转地址非图片直链的情况 ([6bf7382](https://github.com/techmovie/easy-seed/commit/6bf7382989b35dbff0b531a07a802b02db5c1d8a)), closes [#48](https://github.com/techmovie/easy-seed/issues/48)
* 提高字幕音轨标签匹配准确率 ([2f01e58](https://github.com/techmovie/easy-seed/commit/2f01e586ed8712056b2ec8bd108315426880eecf)), closes [#50](https://github.com/techmovie/easy-seed/issues/50)


### Features

* **its:** 支持iTS collection自动选择制作组、导演、语言 ([010749e](https://github.com/techmovie/easy-seed/commit/010749edd72c8e0ed975922aec307db05a3722d1))



## [1.2.3](https://github.com/techmovie/easy-seed/compare/1.2.2...1.2.3) (2021-04-16)


### Bug Fixes

* 修复转载失效的问题 ([4c6baa7](https://github.com/techmovie/easy-seed/commit/4c6baa7638b47e2e738b9bd826b103efb4b242d2)), closes [#47](https://github.com/techmovie/easy-seed/issues/47)



## [1.2.2](https://github.com/techmovie/easy-seed/compare/1.2.1...1.2.2) (2021-04-16)


### Bug Fixes

* nzb站点名称修改 ([96dcc12](https://github.com/techmovie/easy-seed/commit/96dcc1216555b31910530ffd58ebae265e66ba7a))
* 修复videoCodec识别不准确问题 ([9e83e18](https://github.com/techmovie/easy-seed/commit/9e83e1883a154ce5fc30b97f38a4458e6fe7021c))
* 修复备胎视频编码从简略mediainfo中识别不准确的问题 ([d13dc8c](https://github.com/techmovie/easy-seed/commit/d13dc8c885c744ad5999e5e2f0421ad18155ba2c))
* 家园ipad分类填写不准确 ([e11bdc4](https://github.com/techmovie/easy-seed/commit/e11bdc49ae662b15cb93c0cdcf49da82c5dad17b))


### Features

* **search:** 支持豆瓣电影、豆瓣图书、TMDB快速检索 ([7c943af](https://github.com/techmovie/easy-seed/commit/7c943af74d47b26f180543a3ca40c45d0921b8b2))
* 增加获取豆瓣图书数据功能 ([ea4134a](https://github.com/techmovie/easy-seed/commit/ea4134a8dde872a71973f369b518400500bdc436))
* 完善bib上传页 ([4d98a1d](https://github.com/techmovie/easy-seed/commit/4d98a1da3d1de6d73c59d041c0cead5c45946631))
* 将操作区单独抽出 增加豆瓣链接填写 ([48e0d7e](https://github.com/techmovie/easy-seed/commit/48e0d7eededc5e57d3ef8b17246b9a08ea3ddd86))
* 支持iTS(target) [#41](https://github.com/techmovie/easy-seed/issues/41) ([d4aed63](https://github.com/techmovie/easy-seed/commit/d4aed63ac9d9c33f8b6944dd80fd1dc93a753764))



## [1.2.1](https://github.com/techmovie/easy-seed/compare/1.1.4...1.2.1) (2021-04-12)


### Bug Fixes

* HDT IMDB地址处理 [#39](https://github.com/techmovie/easy-seed/issues/39) ([bc1c212](https://github.com/techmovie/easy-seed/commit/bc1c2123c4b3c4ea0f1a941c42a6ee8235e04725))
* pter非英语资源地区选择处理 [#45](https://github.com/techmovie/easy-seed/issues/45) ([cabfcd0](https://github.com/techmovie/easy-seed/commit/cabfcd0aa5c654f63681f2fc5e1b765ae8648191))
* 修复完善ptp简介获取方法 ([2d770cf](https://github.com/techmovie/easy-seed/commit/2d770cf0450006ec87322cc0b18baeeb63d77694))
* 修复朋友mediainfo BBcode ([063b616](https://github.com/techmovie/easy-seed/commit/063b61673a199b1ef3e40836b1805815944dbd45))
* 修复电影类别识别不准确的问题 ([294e9b7](https://github.com/techmovie/easy-seed/commit/294e9b7306b056b363a07e2b7db699e70a965bb3))
* 更改NP站点种子页面选择器 [#46](https://github.com/techmovie/easy-seed/issues/46) ([f104ec8](https://github.com/techmovie/easy-seed/commit/f104ec8d3d0d172ac83ffa5112baf8bf7a3b281f))
* 朋友简介完善 & 朋友增加豆瓣简介获取按钮 ([e4ad511](https://github.com/techmovie/easy-seed/commit/e4ad51136567fd6b180a307b398fc50a3abb669c))
* 过滤script标签 [#44](https://github.com/techmovie/easy-seed/issues/44) ([7b1cb0d](https://github.com/techmovie/easy-seed/commit/7b1cb0d6419694dc497e43b30098b35cba3d596c))


### Features

* **new version:** 1.2.1 ([3aa8383](https://github.com/techmovie/easy-seed/commit/3aa83833320de42b7284ccfd51ceeafad52d2784))
*  支持bB/HDF/iTS快速检索 ([f88da0f](https://github.com/techmovie/easy-seed/commit/f88da0f26dc150b32b0aa44a144f4e01f6d66a32))
* [#38](https://github.com/techmovie/easy-seed/issues/38) 修改BHD的图片bbcode ([63c8b44](https://github.com/techmovie/easy-seed/commit/63c8b44fd7d6b69de5776e409fe09bf190b675b0))
* add license ([8881307](https://github.com/techmovie/easy-seed/commit/888130762ae293b651ef93b6d22132c3609cef9d))
* build config ([dec25f1](https://github.com/techmovie/easy-seed/commit/dec25f10f82c4f0cf7ff9c30834d86c28da5853b))
* ptp修改简介获取方式 ([d761573](https://github.com/techmovie/easy-seed/commit/d761573b52197798c8a898f2251c47bc6c24a5a3))
* ptp简介从官方接口中获取 对比图样式更加规范 ([a2956dd](https://github.com/techmovie/easy-seed/commit/a2956dd81f150ac76295f43dfe50735b4638c4b3))
* update readme ([e282621](https://github.com/techmovie/easy-seed/commit/e282621b47d43eee7423c7a3f74a67846546440d))
* 修改控制面板样式 ([eb0070c](https://github.com/techmovie/easy-seed/commit/eb0070cc077d80ce1876fd4abb5a69566fffc087))
* 增加朋友imdb链接地址获取方式 ([a665e22](https://github.com/techmovie/easy-seed/commit/a665e22aae260ffb2816621b122c20f917f762d8))
* 拆分站点配置 ([7dd8b0a](https://github.com/techmovie/easy-seed/commit/7dd8b0a9849a186cd3e974299d871d351f997d5b))
* 拆分站点配置 ([1643bf3](https://github.com/techmovie/easy-seed/commit/1643bf38a1a64ae5d5fc7a2ba83290f28edef9bc))
* 支持hdt(source) ([3814959](https://github.com/techmovie/easy-seed/commit/38149596564e07f78d45cbc8f3c162df43c03f14))
* 支持hdt(source) [#39](https://github.com/techmovie/easy-seed/issues/39) ([1436b32](https://github.com/techmovie/easy-seed/commit/1436b32bba59c783bc55d1bd6d2ef8ddf3cb2a31))
* 支持KG 转出（Source） ([a0ae883](https://github.com/techmovie/easy-seed/commit/a0ae883b50ca2af7fe2e058e85e173cc67adbfea)), closes [#40](https://github.com/techmovie/easy-seed/issues/40)
* 更新安装地址 ([4f3c9d2](https://github.com/techmovie/easy-seed/commit/4f3c9d2832c483788098de5c1d4171c910a15029))
* **new site:** 1PTBA ([6d74d61](https://github.com/techmovie/easy-seed/commit/6d74d61a5d86f91af58d8c4268aeab2a09e40625))
* **new version:** 1.2.0 ([cd8c949](https://github.com/techmovie/easy-seed/commit/cd8c949072666748f6ac63d67ec58c38acca56e9))
* 海报增加获取方法 ([8a0be42](https://github.com/techmovie/easy-seed/commit/8a0be4294744ca248afbe2efee742e0042e46a65))
* 设置面板样式调整 ([6c490b3](https://github.com/techmovie/easy-seed/commit/6c490b37be54a64f46129c8e88070c9e67577b86))



## [1.1.4](https://github.com/techmovie/easy-seed/compare/1.1.4-beta.1...1.1.4) (2021-04-06)


### Bug Fixes

* hdh种子页选择器修改 ([8ced1b8](https://github.com/techmovie/easy-seed/commit/8ced1b817a2cdd82aa003408543ea715b639fd50))


### Features

* **new version:** 1.1.4 ([82a1676](https://github.com/techmovie/easy-seed/commit/82a16764c6fb662bea3f9a86f4b194a05f6745dd))
* close [#37](https://github.com/techmovie/easy-seed/issues/37) ([31db72a](https://github.com/techmovie/easy-seed/commit/31db72a05d490bcd23c4c40bad6814d5fe3ef16c))
* 支持HDT(target) ([7232c14](https://github.com/techmovie/easy-seed/commit/7232c1479bc8ceea6c032a5dfbda7deecf4e1b0d))



## [1.1.4-beta.1](https://github.com/techmovie/easy-seed/compare/1.1.3...1.1.4-beta.1) (2021-03-31)


### Bug Fixes

* 视频编码区分h264 x264 ([835b22b](https://github.com/techmovie/easy-seed/commit/835b22b4b1a604eb22bbbc6fa3fc4865da6c131d))


### Features

* **new version:** 1.1.4-beta.1 ([4dfcd9a](https://github.com/techmovie/easy-seed/commit/4dfcd9a3d018bbd9e53659e1e878e398f7a59193))
* 支持资料站tccf mt bib ([52f8ecf](https://github.com/techmovie/easy-seed/commit/52f8ecf5bf8c7e8cc650a0331f331caad7c238f3))
* 支持资料站tccf mt bib ([415e00c](https://github.com/techmovie/easy-seed/commit/415e00c5c61809a3b4f9a80cd150b139e6735e82))



## [1.1.3](https://github.com/techmovie/easy-seed/compare/1.1.2...1.1.3) (2021-03-29)


### Bug Fixes

* 增加bbcode「size」 ([c669f6f](https://github.com/techmovie/easy-seed/commit/c669f6fb78586a5550db2472dd829586be3df1db))
* 家园videoType和地区获取错误修复 ([375ea93](https://github.com/techmovie/easy-seed/commit/375ea93779f683cb05f862623298e9f8e269af46))


### Features

* **dev:** 增加release脚本 ([3530ef9](https://github.com/techmovie/easy-seed/commit/3530ef98db9a9a9962f76c435928640fd7456f89))
* **dev:** 增加终端错误通知 ([a86a9ed](https://github.com/techmovie/easy-seed/commit/a86a9ed63ef06d9ba5391188e4ae7632737d2170))
* **new version:** 1.1.3 ([501fb6f](https://github.com/techmovie/easy-seed/commit/501fb6fac53bd417091a7b44640e208f147fc32a))
* **新站点:** ACM close [#31](https://github.com/techmovie/easy-seed/issues/31) ([51229a5](https://github.com/techmovie/easy-seed/commit/51229a5c697136c88c31a7cdfdcbac0404cce679))



## [1.1.2](https://github.com/techmovie/easy-seed/compare/1.1.1...1.1.2) (2021-03-28)


### Bug Fixes

* close [#33](https://github.com/techmovie/easy-seed/issues/33) 更改ptp种子页选择器 ([f148852](https://github.com/techmovie/easy-seed/commit/f148852f8fa5a6d301ec31958f1b19e76e9fa6fd))
* close [#34](https://github.com/techmovie/easy-seed/issues/34) ([2239af9](https://github.com/techmovie/easy-seed/commit/2239af951ba24c0a235396a9ab17bdbdf766cb7e))
* hds页面选择器修复 ([c66b0f3](https://github.com/techmovie/easy-seed/commit/c66b0f31b1c8094344c62fbe379eae3184af30a0))
* MT类型选择错误修复 ([fbf08e6](https://github.com/techmovie/easy-seed/commit/fbf08e6df7df3a025fcfad48e80f7da9d99e0fd0))
* SoulVoice类型选择 ([b75518b](https://github.com/techmovie/easy-seed/commit/b75518b832468c7627532e96be93a7c39a1f2a78))
* 修改MT种子页选择器 close [#32](https://github.com/techmovie/easy-seed/issues/32) ([2978051](https://github.com/techmovie/easy-seed/commit/29780519cd1cfddd330369f727a07dda1cd4802a))
* 增加获取豆瓣链接的备用方法 ([f18e7d7](https://github.com/techmovie/easy-seed/commit/f18e7d76004c24708aa9309287fc8be73fab0dbc))


### Features

* **new version:** 1.1.2 ([01589ef](https://github.com/techmovie/easy-seed/commit/01589efc929eade73b4837bf50717ef8da7f7fb0))
* np站点增加movieName参数 ([48a04b6](https://github.com/techmovie/easy-seed/commit/48a04b67bda67e1104b2b282112217bd018c85ae))
* uhd检索结果按大小排序 ([c193278](https://github.com/techmovie/easy-seed/commit/c1932788ae58b24bcf275fe083f160d113a2dc4d))
* 优化豆瓣信息获取流程 ([3458885](https://github.com/techmovie/easy-seed/commit/34588850964a34710dba4eb079837531c47eb886))
* 优化转种样式 节省页面空间 ([d276535](https://github.com/techmovie/easy-seed/commit/d2765359a52b3e69fe4d1c2d5b3446cc88f74748))
* 增加禁转提示 close [#30](https://github.com/techmovie/easy-seed/issues/30) ([5137421](https://github.com/techmovie/easy-seed/commit/5137421aa7a8472ebb43b86a48accc73e51c6073))
* 支持关闭转缩略图功能 ([c9c596a](https://github.com/techmovie/easy-seed/commit/c9c596aadf6e897c6dbaee76a4e52d0c445f6905))
* 支持所有站点的快速检索 ([8b65758](https://github.com/techmovie/easy-seed/commit/8b657589dd0feb13b0e1bba3e8fc6151d25c5e67))



## [1.1.1](https://github.com/techmovie/easy-seed/compare/1.1.0...1.1.1) (2021-03-26)


### Bug Fixes

* hds选择器修改 ([0759caa](https://github.com/techmovie/easy-seed/commit/0759caa240c3a08100a459bb573e157fc3a77325))
* NP站点替换点为空格 ([0a73441](https://github.com/techmovie/easy-seed/commit/0a734411189ba9eb729d74b6fc027b3a5257d249))
* unit3d匹配中文页面 ([b5ccb1b](https://github.com/techmovie/easy-seed/commit/b5ccb1b8d005c86e1a13d5aab42a76bb21ebf3a8))
* 优化获取截图方法 ([5ae1312](https://github.com/techmovie/easy-seed/commit/5ae13125972ebcb94517e824a8e08cb0279e3878))
* 修复replaceAll语法兼容错误 ([b9f78f9](https://github.com/techmovie/easy-seed/commit/b9f78f9af182922cf77f02b6e9e3aa869518cef7))
* 修改DiscFan名称 ([92db7fb](https://github.com/techmovie/easy-seed/commit/92db7fbd30ca7fa989709d7947a32a7989bdee30))
* 兼容旧浏览器 ([a04ec1f](https://github.com/techmovie/easy-seed/commit/a04ec1f85befd7b20e487ca82801939d90d02b33))
* 回退版本 ([02b6e39](https://github.com/techmovie/easy-seed/commit/02b6e39ebbc1898c65998677314bd05faa13f367))


### Features

* **new version:** 1.1.1 ([c4854ef](https://github.com/techmovie/easy-seed/commit/c4854ef2e3b62600d652df98588f455ae0b548b4))



# [1.1.0](https://github.com/techmovie/easy-seed/compare/1.0.9...1.1.0) (2021-03-25)


### Bug Fixes

* ob mediainfo过滤修复 过滤非截图图片 ([8aac696](https://github.com/techmovie/easy-seed/commit/8aac696bd34e29783cdbbb64bb9427f66f7f1447))
* ourbits不需要过滤多余换行 ([0bf5c03](https://github.com/techmovie/easy-seed/commit/0bf5c03d250c478d81dcd2ffb4cc839b4251c0e0))
* pth支持匿名勾选 ([e97cd70](https://github.com/techmovie/easy-seed/commit/e97cd7023f010083331d0376f7f1358ba3b52a98))
* ssd豆瓣地区过滤bbcode ([b970096](https://github.com/techmovie/easy-seed/commit/b970096e3c3b7265f8c487321e967345e2002892))
* 不过滤含有中文的mediainfo 优化从简介中获取bdinfo的方法 ([3f6fc8b](https://github.com/techmovie/easy-seed/commit/3f6fc8bbef8578e8ba157d5ac846cc04fc1405a7))
* 优化豆瓣海报获取方法 ([dbf72d4](https://github.com/techmovie/easy-seed/commit/dbf72d4c76561239e7ce317adb40e58900292eb8))
* 修复hds类型匹配正则 ([d77a7b0](https://github.com/techmovie/easy-seed/commit/d77a7b09b39fbb6c739d05f16dd55a461a8553f5))
* 修复hdu上传页错误 ([ee2b11a](https://github.com/techmovie/easy-seed/commit/ee2b11af62448389b5d3fd457aaa123aa9ead5e9))
* 修复mediainfo过滤错误 ([a7b38e3](https://github.com/techmovie/easy-seed/commit/a7b38e362e0bfc02141947180656f6d335d91c2b))
* 修复北洋标题匹配方法 ([8c4d423](https://github.com/techmovie/easy-seed/commit/8c4d4236105c0334139b5ae7890f95458a361b22))
* 更换tmdb接口地址 ([d17b076](https://github.com/techmovie/easy-seed/commit/d17b076fa316357a37984114d12936ccb8549822))
* 柠檬页面插入节点选择器修复 ([ef48089](https://github.com/techmovie/easy-seed/commit/ef48089c8b2d94928ee47dbe8c8f60f0d894a606))
* 路首页海报使用原图 ([52ada36](https://github.com/techmovie/easy-seed/commit/52ada363bb6cc4b106a7fea272ac89ca85d52609))
* 过滤空标签 ([15421bc](https://github.com/techmovie/easy-seed/commit/15421bc3f81de739ff777a8750bee7c415834c65))
* 过滤空标签 ([117ef64](https://github.com/techmovie/easy-seed/commit/117ef6402f86ca80095f761fa3038bb36599018f))
* 过滤空标签 ([785e1da](https://github.com/techmovie/easy-seed/commit/785e1da4d77f927b5c1f2377e065ae5ec84756b1))


### Features

* **new version:** 1.1.0 ([c36e331](https://github.com/techmovie/easy-seed/commit/c36e331c4b99605160b205c1c824f9b2fb7e09cf))
* support hdr search ([ced60ee](https://github.com/techmovie/easy-seed/commit/ced60eee5909f4cc47009cb5f91f4d0ccf008381))
* 优化控制面板样式 ([a6c789f](https://github.com/techmovie/easy-seed/commit/a6c789ff39db76e4d20363ad6edbe49da364e898))
* 优化控制面板样式 ([91b1c49](https://github.com/techmovie/easy-seed/commit/91b1c496bd46f7434e3282c537092e35526bb3c0))
* 增加UHD检索 ([f0d8615](https://github.com/techmovie/easy-seed/commit/f0d8615d34d471d6b9bbaf40d9ad20d00944db88))
* **new version:** 1.0.9 ([7a3e3d5](https://github.com/techmovie/easy-seed/commit/7a3e3d545bb48c8e366a5f5a7ce6843b005fbe5d))
* 支持路(target) ([5478f95](https://github.com/techmovie/easy-seed/commit/5478f957f3ddb6b9c17a47f06c9c5bd9dfc3a354))
* 支持铃音 ([aae2404](https://github.com/techmovie/easy-seed/commit/aae240452aab3114425c647ed9cf0f5f4b89cc00))
* 简化副标题 只保留电影名 ([76682a1](https://github.com/techmovie/easy-seed/commit/76682a104b6ce6f95b9af8b39c7ab7de604198df))



## [1.0.8](https://github.com/techmovie/easy-seed/compare/1.0.7...1.0.8) (2021-03-22)


### Bug Fixes

* 兼容北洋标题中含有空格的情况 ([998b88d](https://github.com/techmovie/easy-seed/commit/998b88da6788f43619e6bc2c88ae5dd89379c273))
* **ssd:** 兼容无豆瓣信息种子 ([0c1e33b](https://github.com/techmovie/easy-seed/commit/0c1e33b4d15d549dd479b436f1767e9e32c59e89))
* **ssd:** 纪录片catogory获取失败 ([abf853d](https://github.com/techmovie/easy-seed/commit/abf853d579923720fdcadd16be0408229d9bdce6))
* 北洋 [#26](https://github.com/techmovie/easy-seed/issues/26) ([c6f195a](https://github.com/techmovie/easy-seed/commit/c6f195a62b316c847d9c3c53ea720f0743467e2e))
* 南洋电影title选择器修改 ([b861a82](https://github.com/techmovie/easy-seed/commit/b861a82c6428fdb8bb145bb98fc25b3cc78b6bd6))
* 过滤Spoiler后的冒号 ([18fca0d](https://github.com/techmovie/easy-seed/commit/18fca0da00edb29a2b04c24d842f4ef0da3cf8e6))


### Features

* **new version:** 1.0.8 ([a415975](https://github.com/techmovie/easy-seed/commit/a415975d5977035c68bd3d190757ef9cc74266cf))
* hdpost适配bbcode ([8ed3976](https://github.com/techmovie/easy-seed/commit/8ed3976b9fcdbfa55499acb1cae4c57a54bf6bb8))
* unit3d站点剧集适配 ([af50c49](https://github.com/techmovie/easy-seed/commit/af50c49b51388f0a3f1d0346503dfe6248fa28f9))
* **new site:** HDPOST ([366ed64](https://github.com/techmovie/easy-seed/commit/366ed641f55d9d393dba01144c60b66a056021d4))
* **new site:** HDPOST ([3a64d1f](https://github.com/techmovie/easy-seed/commit/3a64d1fc3c21018c4f385b9b78a630dac772cba7))
* 完善南洋英文名填写 ([8c77f85](https://github.com/techmovie/easy-seed/commit/8c77f85dc4cd994311c8672216504e3795e38067))
* 适配北洋 [#26](https://github.com/techmovie/easy-seed/issues/26) ([93c1aa9](https://github.com/techmovie/easy-seed/commit/93c1aa9c66b04e20338cd508f4657a366be18202))



## [1.0.7](https://github.com/techmovie/easy-seed/compare/1.0.6...1.0.7) (2021-03-20)


### Bug Fixes

* pter hide标签替换为quote ([f8b6aef](https://github.com/techmovie/easy-seed/commit/f8b6aef3ea354e8d4d68b1bf26b90c18c28621a3))
* 部分站点上传页报错 ([75c9388](https://github.com/techmovie/easy-seed/commit/75c93880cc0cd718c31a66aecda50800da166456))


### Features

* **new version:** 1.0.7 ([3b88155](https://github.com/techmovie/easy-seed/commit/3b88155a9ae60447f150505736b478d644c8ea76))



## [1.0.6](https://github.com/techmovie/easy-seed/compare/1.0.5...1.0.6) (2021-03-19)


### Bug Fixes

* ptp引用嵌套问题 ([72600ff](https://github.com/techmovie/easy-seed/commit/72600ffe4d4a9ac5fe7230eaeaad8275d66fc481))
* ssd命名规范以及mediainfo替换 ([c85dc2f](https://github.com/techmovie/easy-seed/commit/c85dc2fc6cbbc5d3303ab5ecd228f6a40d35143f))
* 副标题兼容无中文名称的电影 ([1db749d](https://github.com/techmovie/easy-seed/commit/1db749db50200bc9d6aaf08ae8f56622df6206dd))
* 副标题电影名称修复 ([5e48c82](https://github.com/techmovie/easy-seed/commit/5e48c82830886cc9404c890189895d72c69456b3))


### Features

* **new version:** 1.0.6 ([6947ae3](https://github.com/techmovie/easy-seed/commit/6947ae3808634e3c31eac9b3670bdd31666e4586))
* 增加制作组自动填写 ([d2cee86](https://github.com/techmovie/easy-seed/commit/d2cee86a6fa39b6ed6c957949e6e5148775f0025))
* 支持自动填写海报 ([19fbdef](https://github.com/techmovie/easy-seed/commit/19fbdef148758d90b5e468cf9d7e4cb65bc2c53a))



## [1.0.5](https://github.com/techmovie/easy-seed/compare/1.0.4...1.0.5) (2021-03-18)


### Bug Fixes

* ptp标题获取 ([57a1855](https://github.com/techmovie/easy-seed/commit/57a1855a87f91f653b83e5fdb2748e4d9ea2fe87))
* ssd bugfix ([280a3bb](https://github.com/techmovie/easy-seed/commit/280a3bb62b1ac36ed029d45c248d2788af35bd40))
* tmdb获取id失败 ([6acaf7a](https://github.com/techmovie/easy-seed/commit/6acaf7aec0b6b4916aa5087efeb383b0b8f7848f))
* 内站判断应包含SSD ([9c763fa](https://github.com/techmovie/easy-seed/commit/9c763fab7ada1f98eebd864e1e6abfc222687ef2))
* 更改部分站点插入节点 避免脚本内容插入到简介以下 ([428f93a](https://github.com/techmovie/easy-seed/commit/428f93a5859c871207d017f292c104443ed59e16))


### Features

* **new version:** 1.0.5 ([be92929](https://github.com/techmovie/easy-seed/commit/be92929abf7068be3a3a78e1b20bf1bf6c9276cb))
* ssd去豆瓣简介多余换行 ([ce93b62](https://github.com/techmovie/easy-seed/commit/ce93b626b7537f872dfc7fd5386d0dc475f7e0a3))
* ttg种子未完成加载时 增加提示 避免简介获取不完整 ([c046486](https://github.com/techmovie/easy-seed/commit/c0464869abcba807a9928569f26b629198c48ea6))
* update match url ([7a64026](https://github.com/techmovie/easy-seed/commit/7a640261145902a504d36040a01e2aeaf57ec966))
* update ssd config ([3499646](https://github.com/techmovie/easy-seed/commit/3499646c4b4ad48cfac739a10ef289d614592da6))
* 支持Bdc nzb.in检索 ([2019262](https://github.com/techmovie/easy-seed/commit/20192624528cafdefb75ff0cc4924fd57cbb7783))
* 站点按字母顺序排列 ([884a444](https://github.com/techmovie/easy-seed/commit/884a444e7813c58ac7972d6fd6226aeddd18d9c8))
* **new site:** HDAI ([d34754f](https://github.com/techmovie/easy-seed/commit/d34754f2fd57c46a21d7fa0bda0a37632d9fae1e))



## [1.0.4](https://github.com/techmovie/easy-seed/compare/1.0.3...1.0.4) (2021-03-17)


### Bug Fixes

* 更改站点域名匹配的方式 ([c902168](https://github.com/techmovie/easy-seed/commit/c9021680f067355e916201cafe3ee56de1fa0bf0))


### Features

* update version 1.0.4 ([463d758](https://github.com/techmovie/easy-seed/commit/463d75857ff1b4f8b1eb5dc680ff516bcb54c613))
* 增加支持站点列表 开发相关的内容移至WiKi ([546f0f4](https://github.com/techmovie/easy-seed/commit/546f0f410fe576ce60f6d1bc9f0fb35f9fd4d927))
* 豆瓣frodo接口失效 暂时删除相关代码 ([c6aad58](https://github.com/techmovie/easy-seed/commit/c6aad586fe3068886f7d6deb16d037590851feec))



## [1.0.3](https://github.com/techmovie/easy-seed/compare/1.0.2...1.0.3) (2021-03-16)


### Bug Fixes

* add grant ([e64e3c4](https://github.com/techmovie/easy-seed/commit/e64e3c4c67923af00c84de497bc465af739c1b24))
* bhd bugs ([3075904](https://github.com/techmovie/easy-seed/commit/3075904492ead6c66c4aa2071bc8b74e49b04665))
* bug修复 ([a8042d7](https://github.com/techmovie/easy-seed/commit/a8042d7eafe0a5912786f078a800b0a924b6d7c5))
* catogory完善 ([564ef15](https://github.com/techmovie/easy-seed/commit/564ef154a3d4ec06bab858baedbbafea8a918477))
* codes->codec ([f75c78e](https://github.com/techmovie/easy-seed/commit/f75c78e92dd891987b0ba813175d753196fa11d5))
* eslint husky lint-staged ([e079ab0](https://github.com/techmovie/easy-seed/commit/e079ab08b75855d11c328f50004ceaf066085a27))
* firfox GM http protocol ([c2c52ed](https://github.com/techmovie/easy-seed/commit/c2c52edc18cf6dbb9d3f55596cf770395cd4919e))
* fix bugs ([78c8317](https://github.com/techmovie/easy-seed/commit/78c8317a1371bd4e6981c90915178a9d0cf4289b))
* fix bugs ([ad947a8](https://github.com/techmovie/easy-seed/commit/ad947a81d0b5eacac9bf68959374efb24df1c7b9))
* frds bugfix ([4ae7bc9](https://github.com/techmovie/easy-seed/commit/4ae7bc9abf2f79baf3c4a91739ef0ca0a2510793))
* hds详情页选择器 ([6bda2e3](https://github.com/techmovie/easy-seed/commit/6bda2e310d1c46451124a8d76c88fcc9174357b5))
* jq issue && remove unused file ([b8afd48](https://github.com/techmovie/easy-seed/commit/b8afd48de9d3a779d905602954982403742dc150))
* ssd bug修复 ([7d37078](https://github.com/techmovie/easy-seed/commit/7d3707819bc9a24f9c0383e3ccdd95a1ede4dea4))
* ssd fix ([a4d9698](https://github.com/techmovie/easy-seed/commit/a4d96988fff01aad3946744d2b375f24ddb25af2))
* target bugs ([c36ca9f](https://github.com/techmovie/easy-seed/commit/c36ca9fcf4cb588abcd497f51fc80e99c7cc0221))
* ttg 柠檬完善 ([ab6b7a8](https://github.com/techmovie/easy-seed/commit/ab6b7a8bec2f66e9aebd26ee7a80c4c9f15213f5))
* 修复jq问题 ([6c9c002](https://github.com/techmovie/easy-seed/commit/6c9c0025c8a9cf8cbd756e2ad542f75ba0333617))
* 修复ssd和hdh bug ([fcd44c4](https://github.com/techmovie/easy-seed/commit/fcd44c4d8559e457da6e7f2cc8b14243bea3f696))
* 修复音频参数获取不准确的问题 ([d8fdddf](https://github.com/techmovie/easy-seed/commit/d8fdddfbe407c6cd62cca19f83be4ef87493e3c6))
* 完善hdb方法 ([106c311](https://github.com/techmovie/easy-seed/commit/106c3117ccbcf857fa093f9634d9d150ead0c444))
* 截图和对比图分开处理 ([d87c993](https://github.com/techmovie/easy-seed/commit/d87c9938ad1a3230964e47ac33b5f22293863291))
* 源站点优化处理 ([f607514](https://github.com/techmovie/easy-seed/commit/f60751445a7e6b4b7a7e5ab1b96a98bbfce3ec5f))
* 烧包清空本地缓存 ([5041a81](https://github.com/techmovie/easy-seed/commit/5041a81eb55d1cc749c055e9d625bf6b4690ce26))


### Features

* add HDAtmos support ([3fab931](https://github.com/techmovie/easy-seed/commit/3fab93124f124c5cc691933c5244a781d6420245))
* add hdhome config ([90be536](https://github.com/techmovie/easy-seed/commit/90be53668c9363c6d50e06d211e5b0d572e7e99b))
* add tccf support ([876e88d](https://github.com/techmovie/easy-seed/commit/876e88d93bcf4e06ce19f4a776c141276fe192f3))
* bdinfo方法 ([5a2c365](https://github.com/techmovie/easy-seed/commit/5a2c3658d899d77b3aed1add2863bb1615c6b2d4))
* bhd bdtype ([a248bf8](https://github.com/techmovie/easy-seed/commit/a248bf80ede1178de388c6b6b53ab4c88f62e3cf))
* bhd comppleted ([c63f713](https://github.com/techmovie/easy-seed/commit/c63f71301213998d0d37b672c4c4a260cb4c4182))
* bhd support ([e7343f1](https://github.com/techmovie/easy-seed/commit/e7343f13f276bec59db22612a6a7c748b90dcc6a))
* bhd support ([529d8dc](https://github.com/techmovie/easy-seed/commit/529d8dceff17499f3254ca8a8d4e111806f2bab7))
* blu support ([6fada00](https://github.com/techmovie/easy-seed/commit/6fada0096a10f573524d4f3b365863b7c7495c4f))
* blu上传配置 ([489bfa9](https://github.com/techmovie/easy-seed/commit/489bfa987a6dac51407990cfe71ec29f34dad97f))
* blu搜索页match修改 ([57b35aa](https://github.com/techmovie/easy-seed/commit/57b35aa2a824ffc9c0e28e4dbe6eb80620b6d478))
* bugfix ([0b64bfa](https://github.com/techmovie/easy-seed/commit/0b64bfa52b13e24f8e1640944385836727c713ae))
* build ([5a9f016](https://github.com/techmovie/easy-seed/commit/5a9f0161d4b31aa757a6d08c00dd3955b40ddb98))
* complete sbao support ([cb7e70c](https://github.com/techmovie/easy-seed/commit/cb7e70c77a580610f11c12defd7e353beeca54a6))
* dev script ([b63df1b](https://github.com/techmovie/easy-seed/commit/b63df1bd7b78c1cbd6d19353be96cb07d96e4f21))
* hdb completed ([8d249ff](https://github.com/techmovie/easy-seed/commit/8d249ff9de07ac18867e636c67dadcdbb3010e46))
* hdc config ([8b9f902](https://github.com/techmovie/easy-seed/commit/8b9f902d5d70a4e3c5d0c5ab6007d87735aa76c8))
* hdu btschool support ([a77ce45](https://github.com/techmovie/easy-seed/commit/a77ce45ee47ccb8fee37cc8f78055052d8c8443b))
* html2bbcode ([bb96715](https://github.com/techmovie/easy-seed/commit/bb9671527b27df588fd5fcc128c486c6a4556e11))
* init ([e5b26dc](https://github.com/techmovie/easy-seed/commit/e5b26dca26df22a55b0eed4fe09a62ef11d57bfa))
* init ([3249bf5](https://github.com/techmovie/easy-seed/commit/3249bf581fe85fbc5303da780f368248f488af02))
* new version ([93a405b](https://github.com/techmovie/easy-seed/commit/93a405b8b3e9cd680c7cbf8fab3113b99c913337))
* new version build ([9e18778](https://github.com/techmovie/easy-seed/commit/9e18778722991fc8cd3112fa3d2bf0a1856abb5e))
* nexus update ([5c6bb3b](https://github.com/techmovie/easy-seed/commit/5c6bb3b9e9c1471ac48d2daf4ca6725773f40bdf))
* nexusphp common ([085d202](https://github.com/techmovie/easy-seed/commit/085d2029f6bb4bfaac0ea61a409a9427f7573cbe))
* nexusphp common ([a687387](https://github.com/techmovie/easy-seed/commit/a6873870d37597692e226eff6e8866fc1d4560b4))
* pter config ([df2599a](https://github.com/techmovie/easy-seed/commit/df2599a970f51b055ae92a8d608c4a4082592b89))
* pthome support ([c2436f2](https://github.com/techmovie/easy-seed/commit/c2436f2ede530432e0d018f4f5060c4d12b995a0))
* ptp新增getInfoFromMediaInfo ([f877931](https://github.com/techmovie/easy-seed/commit/f877931392e1cb5799244b13340cd9e62ed64e16))
* ptp方法优化 ([c93d617](https://github.com/techmovie/easy-seed/commit/c93d617f1797123423b138f6386b68f6726cd03d))
* readme增加站点配置说明 ([ad4ea1a](https://github.com/techmovie/easy-seed/commit/ad4ea1abd1c3a525c350a52ec93ce8102c1ec216))
* split module ([413f27c](https://github.com/techmovie/easy-seed/commit/413f27cefe0956fcfac3ef319bae6fad6a28ac18))
* ssd完善功能 ([2832c87](https://github.com/techmovie/easy-seed/commit/2832c87510afac8c9615ed8f43058fb0667f061d))
* ttg completed ([25bf1b6](https://github.com/techmovie/easy-seed/commit/25bf1b658d5315d4cae5d99c033c4894dbc6322e))
* ttg match ([ec3136c](https://github.com/techmovie/easy-seed/commit/ec3136c18fafd1a72423fa464410b0cfbcbc1b32))
* ttg update ([edbaae6](https://github.com/techmovie/easy-seed/commit/edbaae64655a122d136d432e84280e27586e9490))
* ttg update ([8875d52](https://github.com/techmovie/easy-seed/commit/8875d52b5a6c34ec314035544b689dac3496ebe3))
* ttg update ([3d19a54](https://github.com/techmovie/easy-seed/commit/3d19a542e67a64adf1c49eff43e79fe0fb884d5e))
* update readme ([94e2d6c](https://github.com/techmovie/easy-seed/commit/94e2d6c8a3d2422eb7fe824cdd5c92cd589dbc42))
* update readme ([5d67436](https://github.com/techmovie/easy-seed/commit/5d674363ae82cb60c6b18fd70ace86c9a129e99a))
* update readme ([6d8c0c7](https://github.com/techmovie/easy-seed/commit/6d8c0c7ce877a695c60e0f96a510dcd2d2e15882))
* update readme pkg ([cf5b8c1](https://github.com/techmovie/easy-seed/commit/cf5b8c1001037de48b4938861808422d0c085a4a))
* update ttg method ([53d1a89](https://github.com/techmovie/easy-seed/commit/53d1a896973ff2c8e87ebb62024c187ddebe919e))
* update version ([8305055](https://github.com/techmovie/easy-seed/commit/830505553d4f02a65eb3606eecf83397504d8140))
* update version 1.0.1 ([2c96332](https://github.com/techmovie/easy-seed/commit/2c96332ce8d67b137f313ceed62aa07914cd2a35))
* update version 1.0.2 ([5762839](https://github.com/techmovie/easy-seed/commit/5762839206e275541d0417548bd7be1f10f21b1c))
* update version 1.0.3 ([6b0b540](https://github.com/techmovie/easy-seed/commit/6b0b5403fca9099726ad538f3a5ba6aede805c4e))
* 优化缩略图转换方法 ([857ee7a](https://github.com/techmovie/easy-seed/commit/857ee7af4893fb8af24f1df85c3a28254cc59d86))
* 优化豆瓣和缩略图的获取方法 ([1af84f0](https://github.com/techmovie/easy-seed/commit/1af84f0ebab9dd974a2e0b2a36499a395db941c8))
* 修复内站适配bug ([c205022](https://github.com/techmovie/easy-seed/commit/c205022193e8050f8e4396086fe5ec215a636f0b))
* 内外站简介内容修改 ([6839328](https://github.com/techmovie/easy-seed/commit/68393287fac881e514c968beb31ac0b51f3b28de))
* 内站方法完善 ([68a077b](https://github.com/techmovie/easy-seed/commit/68a077ba7cf2dc91b8a464c7a2ffedd49464cc9f))
* 内站适配 ([5306612](https://github.com/techmovie/easy-seed/commit/5306612aa13411787e308dd22653704ac938442b))
* 匿名和标签勾选 ([a288d2c](https://github.com/techmovie/easy-seed/commit/a288d2cd64383ae57fd0521bdcac0b00f331a14e))
* 增加本地调试详细说明 ([7fbc978](https://github.com/techmovie/easy-seed/commit/7fbc978b00fea691cc968f383667f04684af18ef))
* 增加种子来源声明 ([99d162c](https://github.com/techmovie/easy-seed/commit/99d162ce143623455b4d9b06c7ebf5b46fd05307))
* 完善HDAtmos source 配置 ([0869233](https://github.com/techmovie/easy-seed/commit/0869233bc7c3b9c6cba8cab0b434961192b757c3))
* 完善hdh ([83f3632](https://github.com/techmovie/easy-seed/commit/83f3632d599162c5cf1b0744618811c77c07fdb6))
* 完善内战 ([54d871a](https://github.com/techmovie/easy-seed/commit/54d871a3ffc37bf821886c96b2f6145df438dff9))
* 完善注释 ([da79cb9](https://github.com/techmovie/easy-seed/commit/da79cb91b962d367b6ef7de2a6fda05f0dd6e76b))
* 完善站点信息获取方法 ([805e07b](https://github.com/techmovie/easy-seed/commit/805e07bb1d758698ffd0a8b333f838a6e98e1a2e))
* 完善站点信息获取方法 ([6fc4d83](https://github.com/techmovie/easy-seed/commit/6fc4d834836473146784e38a4321030a711430ae))
* 完善简介 增加豆瓣信息 ([ed45982](https://github.com/techmovie/easy-seed/commit/ed4598264028f8d5021c561ca3921c78bf6a3385))
* 快速检索增加站点 ([8daf962](https://github.com/techmovie/easy-seed/commit/8daf962be6f0962e28d53fab1eccc1d7e03acd31))
* 支持柠檬上传 ([e8195ce](https://github.com/techmovie/easy-seed/commit/e8195cea4e14094e4ee6116158e095354b88e4f4))
* 支持转载到当前站点 ([3a11272](https://github.com/techmovie/easy-seed/commit/3a1127244540fc0ebd87ff325195972f722f2ceb))
* 新增 esbuild 构建脚本 ([e6581ea](https://github.com/techmovie/easy-seed/commit/e6581eae39b2433a6ddfc582e66c409c09ca488f))
* 新增getInfoFromMediaInfo ([0bb00c7](https://github.com/techmovie/easy-seed/commit/0bb00c751193d2957fcf97e00f495138be1fde45))
* 新增hdb支持 ([2745891](https://github.com/techmovie/easy-seed/commit/274589129a753e558d26124f881a4ec31db73248))
* 新增hdb支持 ([e2559ad](https://github.com/techmovie/easy-seed/commit/e2559ad646c269da15ad835b459c14aeb25074c8))
* 更改脚本名 ([f5b93fd](https://github.com/techmovie/easy-seed/commit/f5b93fdf041d91a4c1ce32ce10c2cb7c77908086))
* 样式修改 ([3cb2cfa](https://github.com/techmovie/easy-seed/commit/3cb2cfab9ebeb92cb40b41a07f34314e91b9cd10))
* 检索增加kg ([e344fbc](https://github.com/techmovie/easy-seed/commit/e344fbc9758179232b590f20cdffaa5c78e69da4))
* 添加ob和天空配置 ([41109a7](https://github.com/techmovie/easy-seed/commit/41109a72670c186fc725253de0e1329904246b21))
* 添加ssd支持 ([e802ac4](https://github.com/techmovie/easy-seed/commit/e802ac4bb6938948c6460a26bee61c07a96f938a))
* 添加ssd支持 ([d82685a](https://github.com/techmovie/easy-seed/commit/d82685abee192c97e9095d4be36f21029044689d))
* 细节优化 ([f7eb122](https://github.com/techmovie/easy-seed/commit/f7eb1229c172420e5f7dc05ea88fe178ee6e3bd4))
* 获取准确分类 ([ec24976](https://github.com/techmovie/easy-seed/commit/ec249765a25df6e80cac38eb55e88ccef31451b2))
* 转缩略图方法修改 增加BHD BLU站点检索 ([e7fc8b8](https://github.com/techmovie/easy-seed/commit/e7fc8b81395ec2995643913444dda856a94d5dcc))
* 适配mt最新域名 ([550f5a8](https://github.com/techmovie/easy-seed/commit/550f5a80033b9f60e70ed5611685329434df89fc))
* 重构 ([92b06f0](https://github.com/techmovie/easy-seed/commit/92b06f03df34b93d5fc61a5dac6c6c980438da01))
* 重构代码 ([54bff7e](https://github.com/techmovie/easy-seed/commit/54bff7e295c401832449a6b613d0f90acd612b40))
* 音频编码 ([706403e](https://github.com/techmovie/easy-seed/commit/706403e223ffd1dda13f55ab6a8d8e4f31d555c5))



