// ==UserScript==
// @name         easy-seed
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  easy seeding for different trackers
// @author       techmovie <v.abed@icloud.com>
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// @match        https://passthepopcorn.me/torrents.php?id=*
// @match        https://chdbits.co/details.php?id=*
// @match        https://pt.m-team.cc/details.php?id=*
// @match        https://hdbits.org/offer.php
// @match        http*://*/upload*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://cdn.bootcss.com/jquery/1.7.1/jquery.min.js
// ==/UserScript==
(()=>{var p={HDB:{url:"https://hdbits.org",host:"hdbits.org",siteType:"HDB",asSource:!1,asTarget:!0,needDoubanInfo:!0,uploadPath:"/upload.php",searchPath:"/browse.php",searchKey:"search",searchParam:{sort:"size",d:"DESC"},name:{selector:"#name"},description:{selector:"#descr"},imdb:{selector:"#imdb"},mediaInfo:{selector:'textarea[name="techinfo"]'},category:{selector:"#type_category",map:{movie:"1",tv:"2",documentary:"3",concert:"4",sport:"5"}},videoCodes:{selector:"#type_codec",map:{h264:"1",h265:"5",hevc:"5",x264:"1",x265:"5",mpeg2:"2",vc1:"3",xvid:"4",bluray:"1",uhdbluray:"5",vp9:"6"}},videoType:{selector:"#type_medium",map:{bluray:"1",remux:"5",encode:"3",web:"6",hdtv:"4"}}},MTeam:{url:"https://pt.m-team.cc",host:"pt.m-team.cc",siteType:"NexusPHP",asSource:!0,asTarget:!0,uploadPath:"/upload.php",searchPath:"/browse.php",searchKey:"search",searchParam:{search_area:"{key}",sort:"5",type:"desc"},name:{selector:"#name"},subtitle:{selector:'input[name="small_descr"]'},description:{selector:"#descr"},imdb:{selector:'input[name="url"][type="text"]'},category:{selector:"#browsecat",map:{movie:["401","419","420","421","439"],tv:["403","402","435","402","439","435","438"],documentary:"404",concert:"406",sport:"407"}},videoCodes:{selector:'select[name="codec_sel"]',map:{h264:"1",hevc:"16",h265:"16",x264:"1",x265:"16",mpeg2:"4",mpeg4:"15",vc1:"2",xvid:"3"}},videoType:{map:{bluray:["421","438"],remux:["439"],encode:["401","419","403","402"],web:["419","402"],hdtv:["419","402"],dvd:["420","435"],dvdrip:["401","403"],other:""}},resolution:{selector:'select[name="standard_sel"]',map:{"2160p":["6","419","402"],"1080p":["1","419","402"],"1080i":["2","419","402"],"720p":["3","419","402"],"576p":["5","401","403"],"480p":["5","401","403"]}},area:{selector:'select[name="processing_sel"]',map:{CN:"1",US:"2",EU:"2",HK:"3",TW:"3",JP:"4",KR:"5",OT:"6"}}},CHD:{url:"https://chdbits.co",host:"chdbits.co",siteType:"NexusPHP",asSource:!0,asTarget:!0,seedDomSelector:"$(`#top`)",uploadPath:"/upload.php",searchPath:"/browse.php",searchKey:"search",searchParam:{search_area:"{key}",sort:"5",type:"desc"},name:{selector:"#name"},subtitle:{selector:'input[name="small_descr"]'},description:{selector:"#descr"},imdb:{selector:'input[name="url"][type="text"]'},category:{selector:"#browsecat",map:{movie:["401"],tv:["403","402"],documentary:"404",sport:"407"}},videoCodes:{selector:'select[name="codec_sel"]',map:{h264:"1",hevc:"5",h265:"5",x264:"1",x265:"5",mpeg2:"4",mpeg4:"6",vc1:"2",xvid:"6"}},videoType:{map:{uhdbluray:["19"],bluray:["1"],remux:["3"],encode:["4"],web:["18"],hdtv:["6"]}},resolution:{selector:'select[name="standard_sel"]',map:{"2160p":["6"],"1080p":["1"],"1080i":["2"],"720p":["3"],"480p":["5"]}},area:{selector:'select[name="processing_sel"]',map:{CN:"1",US:"2",EU:"2",HK:"3",TW:"3",JP:"4",KR:"5",OT:"6"}}},TTG:{url:"https://totheglory.im",host:"totheglory.im",siteType:"TTG",asSource:!1,asTarget:!0,uploadPath:"/upload.php",searchPath:"/browse.php",searchKey:"search_field",searchParam:{sort:"5",type:"desc"},name:{selector:'input[name="name"]'},description:{selector:'textarea[name="descr"]'},imdb:{selector:'input[name="imdb_c"]'},category:{selector:'select[name="type"]',map:{movie:["51","52","53","54","108","109"],moviePack:[],tv:["69","70","73","74","75","76","87","88","99","90"],tvPack:[],documentary:["62","63","67"],concert:"59",sport:"57",cartoon:"58",variety:["103","60","101"]}},videoType:{map:{uhdbluray:["109"],bluray:["54","109","67"],remux:["53","108","63","70","75"],encode:["53","63","70","75","52","62","69","76","108"],web:["53","63","70","75","52","62","69","76","108"],hdtv:["53","63","70","75","52","62","69","76","108"],dvd:["51"],dvdrip:["51"],other:""}},resolution:{map:{"2160p":["108","109","67"],"1080p":["53","63","70","75","54","67"],"1080i":["53","63","70","75"],"720p":["52","62","69","76"],"576p":"","480p":""}},area:{map:{CN:["76","75","90"],US:["69","70","87"],EU:["69","70","87"],HK:["76","75","90"],TW:["76","75","90"],JP:["73","88","101"],KR:["74","99","103"],OT:""}}},SSD:{url:"https://springsunday.net",host:"springsunday.net",siteType:"NexusPHP",asSource:!1,asTarget:!0,uploadPath:"/upload.new.php",searchPath:"/torrents.php",searchKey:"search",searchParam:{search_area:"{key}",sort:"5",type:"desc"},name:{selector:"#name"},subtitle:{selector:"#small_descr"},description:{selector:"#descr"},imdb:{selector:"#url"},mediaInfo:{selector:"#Media_BDInfo"},screenshots:{selector:"#url_vimages"},category:{selector:"#browsecat",map:{movie:"501",tv:"502",documentary:"503",concert:"507",sport:"506",cartoon:"504",variety:"505"}},videoCodes:{selector:'select[name="codec_sel"]',map:{h264:"2",hevc:"1",x264:"2",x265:"1",h265:"1",mpeg2:"4",mpeg4:"",vc1:"3",xvid:"",dvd:""}},audioCodes:{selector:'select[name="audiocodec_sel"]',map:{aac:"5",ac3:"4",dd:"","dd+":"",dts:"3",truehd:"2",lpcm:"6",dtshdma:"1",atmos:"3",dtsx:"3"}},videoType:{selector:'select[name="medium_sel"]',map:{uhdbluray:"1",bluray:"1",remux:"4",encode:"6",web:"7",hdtv:"5",dvd:"3",dvdrip:"10",other:""}},resolution:{selector:'select[name="standard_sel"]',map:{"2160p":"1","1080p":"2","1080i":"3","720p":"4","576p":"5","480p":"5"}},area:{selector:'select[name="source_sel"]',map:{CN:"1",US:"9",EU:"9",HK:"2",TW:"2",JP:"10",KR:"10",OT:"3"}}},HDHome:{url:"https://hdhome.org",host:"hdhome.org",siteType:"NexusPHP",asSource:!1,asTarget:!0,uploadPath:"/upload.php",searchPath:"/torrents.php",searchKey:"search",searchParam:{search_area:"{key}",sort:"5",type:"desc"},name:{selector:"#name"},subtitle:{selector:'input[name="small_descr"]'},description:{selector:"#descr"},imdb:{selector:'input[name="url"][type="text"]'},douban:{selector:'input[name="douban_id"]'},category:{selector:"#browsecat",map:{movie:["411","412","413","414","415","450","499","416"],moviePack:"",tv:["425","426","471","427","428","429","430","452","431"],tvPack:["432","433","434","435","436","437","438","502"],documentary:["417","418","419","420","421","451","500","422"],concert:"441",sport:["442","443"],cartoon:["444","445","446","447","448","454","449","501"],variety:[]}},videoCodes:{selector:'select[name="codec_sel"]',map:{h264:"1",hevc:"12",x264:"1",x265:"2",h265:"2",mpeg2:"4",mpeg4:["5","412","418","426","433","445"],vc1:"3",xvid:"5",dvd:"5"}},source:{selector:'select[name="source_sel"]',map:{uhdbluray:"9",bluray:"1",hdtv:"4",dvd:"3",web:"7",vhs:"8",hddvd:"8"}},audioCodes:{selector:'select[name="audiocodec_sel"]',map:{aac:"6",ac3:"15",dd:"15","dd+":"15",dts:"3",truehd:"13",lpcm:"14",dtshdma:"11",atmos:"12",dtsx:"17"}},videoType:{selector:'select[name="medium_sel"]',map:{uhdbluray:["10","499","500","502","501"],bluray:["1","450","451","452","453","454"],remux:["3","415","421","430","437","448"],encode:["7","411","412","413","414","416","417","418","419","420","422","425","426","471","427","428","429","431","432","433","434","435","436","438","444","445","446","447","449"],web:["11","411","412","413","414","416","417","418","419","420","422","425","426","471","427","429","431","432","433","434","436","438","444","445","446","447","449"],hdtv:["5","412","413","416","418","419","422","424","426","471","427","428","431","433","434","435","438","442","443","445","446","449"],dvd:["","411","417","425","432","444"],dvdrip:["7","411","417","425","432","444"],other:""}},resolution:{selector:'select[name="standard_sel"]',map:{"2160p":["1","499","416","500","422","431","438","502","449","501"],"1080p":["2","414","420","429","436","447"],"1080i":["3","424","428","435","443"],"720p":["4","413","419","423","427","434","442","446"],"576p":["5","411","417","425","432","444"],"480p":["5","411","417","425","432","444"]}}},PTP:{url:"https://passthepopcorn.me",host:"passthepopcorn.me",siteType:"gazelle",asSource:!0,asTarget:!1,needDoubanInfo:!0,uploadPath:"/upload.php",searchPath:"/torrents.php",searchKey:"search",searchParam:{action:"advanced"},seedDomSelector:""}};var ge=jQuery,a={title:"",subtitle:"",description:"",year:"",category:"",videoType:"",source:"",videoCodes:"",audioCodes:"",resolution:"",area:"",doubanUrl:"",doubanInfo:"",imdbUrl:"",tags:"",mediaInfo:"",bdinfo:"",screenshots:[],movieAkaName:"",movieName:"",sourceSite:""},_={HDB:"https://hdbits.org/browse.php?search={imdbid}&sort=size&h=8&d=DESC",PTP:"https://passthepopcorn.me/torrents.php?action=advanced&searchstr={imdbid}",MTeam:"https://pt.m-team.cc/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area={searchArea}&search_mode=0",TTG:"https://totheglory.im/browse.php?search_field={imdbid}&c=M&sort=5&type=desc",CHD:"https://chdbits.co/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area=4&search_mode=0",BHD:"https://beyond-hd.me/torrents/all?doSearch=Search&imdb={imdbid}&sorting=size&direction=desc",BLU:"https://blutopia.xyz/torrents?imdb={imdbid}",AHD:"https://awesome-hd.me/torrents.php?searchstr={imdbid}",SSD:"https://springsunday.net/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search={imdbid}&search_area={searchArea}&search_mode=0"},I="054022eaeae0b00e0fc068c0c0a2102a",N="https://frodo.douban.com/api/v2",D="https://omit.mkrobot.org/movie/infos",w="https://media.pttool.workers.dev",V=e=>{let r="";try{return Object.keys(p).forEach(t=>{let o=p[t].host;o&&e===o&&(r=t)}),r}catch(t){t.message!=="end loop"&&console.log(t)}},d=V(location.host),i=p[d];var G=e=>{let r=`[quote][size=4]source from [b][color=#1A73E8]${e.sourceSite}[/color][/b]. Many thanks to the original uploader![/size][/quote]`,t=i,o=!t.needDoubanInfo&&e.doubanInfo?`${e.doubanInfo}
`:"",n=e.logs?`eac3to logs:
[hide]${e.logs}[/hide]

`:"",s=e.bdinfo?`BDInfo:
${e.bdinfo}

`:"",c=t.mediaInfo?"":`[quote]${e.mediaInfo}[/quote]
`,l=e.screenshots.map(h=>`[img]${h}[/img]`),u=d==="SSD"?"":`

Screens:
${l.join("")}`;return`${r}

${o}${c}${e.description}

${n}${s}${u}`},E=e=>{if(console.log(i),$(i.imdb.selector).val(e.imdbUrl),d==="HDB"){let c=e.title.replace(/([^\d]+)\s+(\d+)/,(l,u,h)=>`${e.movieName||e.movieAkaName} ${h}`);e.videoType==="remux"&&(c=c.replace(/\s+(bluray|blu-ray)/ig,"")),e.title=c}d==="SSD"&&($(i.imdb.selector).val(e.doubanUrl||e.imdbUrl),$(i.screenshots.selector).val(e.screenshots.join(`
`))),$(i.name.selector).val(e.title),i.subtitle&&$(i.subtitle.selector).val(e.subtitle);let r=e.videoType.match(/bluray|uhdbluray/ig)?"":e.mediaInfo,t=G(e);i.mediaInfo&&$(i.mediaInfo.selector).val(r),$(i.description.selector).val(t),i.area&&i.area.selector&&$(i.area.selector).val(i.area.map[e.area]),$(i.description.selector).val(t);let o=i.category.map[e.category],n=["videoCodes","videoType","resolution","source"],s=[];Array.isArray(o)?(s=[...o],n.forEach(c=>{s=A(i,e,c,s),s.length===1&&$(i.category.selector).val(s[0])})):[...n,"category"].forEach(c=>{A(i,e,c,s)}),i.douban&&$(i.douban.selector).val(e.doubanUrl)},A=(e,r,t,o)=>{let n=e[t]?e[t].map[r[t]]:void 0;return Array.isArray(n)&&o?(o.length>1&&(o=o.filter(s=>n.includes(s))),e[t].selector&&$(e[t].selector).val(n[0])):e[t]&&e[t].selector&&$(e[t].selector).val(n),o};var R=e=>e.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig," ").replace(/\.(?!(\d+))/," ").trim(),f=e=>{let r=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),t=location.search.substr(1).match(r);return t?unescape(t[2]):""};var k=e=>{let r=e.trans_title.join("/"),{director:t=[]}=e,o=t.map(l=>U(l.name)),n=e.cast.slice(0,2).map(l=>U(l.name)),s=o.length>0?`|\u5BFC\u6F14: ${o.join(" ")}`:"",c=n.length>0?`|\u4E3B\u6F14:${n.join(" ")}`:"";return r+s+c},U=e=>e.replace(/\s+[A-Za-z\s]+/,"");var x=()=>{let e=f("torrentid");if(console.log(e),!e)return!1;a.sourceSite=d;let r=$(`#torrent_${e}`),t=$(".page__title").text().match(/(^|])([^\d[]+)/)[2].trim(),[o,n=""]=t.split(" AKA ");a.movieName=o,a.movieAkaName=n,a.imdbUrl=$("#imdb-title-link").attr("href")||"",a.year=$(".page__title").text().match(/\[(\d+)\]/)[2];let s=$(`#group_torrent_header_${e}`),c=s.data("releasename");c=R(c),a.title=c,a.category=j(),a.category==="music"&&(a.description=$("#synopsis").text());let l=s.find("#PermaLinkedTorrentToggler").text().replace(/ /g,"").split("/"),[u,h,T,P,...K]=l,O=K.includes("Remux");a.videoType=T==="WEB"?"web":Y(h,O,u,T),a.videoCodes=Q(u),a.source=W(T,u,P),a.resolution=Z(P);let{logs:z,bdinfo:F}=q(r);return a.logs=z,a.bdinfo=F,a.mediaInfo=`${r.find(".mediainfo.mediainfo--in-release-description").next("blockquote").text()}`,a.screenshots=J(r),a.area=X(),a},j=()=>{let e={"Feature Film":"movie","Short Film":"movie","Stand-up Comedy":"other",Miniseries:"tv","Live Performance":"concert","Movie Collection":"movie"},r=$("#torrent-table .basic-movie-list__torrent-edition__main").eq(0).text();return e[r]},q=e=>{let r=e.find(".movie-page__torrent__panel blockquote"),t="",o="";for(let n=0;n<r.length;n++){let s=r[n].textContent;s.includes("eac3to")&&(t+=`[quote]${s}[/quote]`),s.includes("DISC INFO:")&&(o+=`[quote]${s}[/quote]`)}return{logs:t,bdinfo:o}},J=()=>{let e=!1,r=[],t=$(".movie-page__torrent__panel"),o=t.find("a");for(let n=0;n<o.length;n++){let s=o[n].getAttribute("onclick");if(s&&s.includes("BBCode.ScreenshotComparisonToggleShow")){e=!0,r=JSON.parse(s.match(/\["http([^\]]*)\]/)[0]);break}}if(!e){let n=t.find(".bbcode__image");for(let s=0;s<n.length;s++)r.push(n[s].getAttribute("src"))}return r},W=(e,r,t)=>r.match(/BD100|BD66/i)||e.match(/Blu-ray/i)&&t.match(/2160P|4K/i)?"uhdbluray":e.replace(/-/g,"").toLowerCase(),Q=e=>e==="BD66"||e==="BD100"?"hevc":e.startsWith("BD")?"h264":e.startsWith("DVD")?"mpeg2":e.replace(/[.-]/g,"").toLowerCase(),Y=(e,r,t,o)=>{let n="";return r?n="remux":t.match(/BD50|BD25/ig)?n="bluray":t.match(/BD66|BD100/ig)?n="uhdbluray":o.match(/DVD/ig)&&e.match(/MKV|AVI/ig)?n="dvdrip":t.match(/DVD5|DVD9/ig)&&e.match(/VOB|ISO/ig)?n="dvd":e.match(/MKV|MP4/i)&&(n="encode"),n},Z=e=>e.match(/NTSC|PAL/ig)||e.match(/\d{3}x\d{3}/)?"480p":e,X=()=>{let e=["Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kazakhstan","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"],r=[],t=$("#movieinfo div").text().match(/Country:\s+([^\n]+)/);if(t&&t.length>0&&(r=t[1].replace(/(,)\s+/g,"$1").split(",")),r[0]){if(r[0].match(/USA|Canada/i))return"US";if(e.includes(r[0]))return"EU";if(r[0].match(/Japan/i))return"JP";if(r[0].match(/Korea/i))return"KR";if(r[0].match(/Taiwan/i))return"TW";if(r[0].match(/Hong Kong/i))return"HK";if(r[0].match(/China/i))return"CN"}return"OT"};var M=()=>{console.log("call getCHDInfo function");let e=$("#top"),r=$("td.rowhead:contains('\u57FA\u672C\u4FE1\u606F'):last").next().text();a.sourceSite=d,a.movieName=$("#top").prop("firstChild").nodeValue.trim(),a.movieAkaName=$("td.rowhead:contains('\u526F\u6807\u9898'):last").next().text(),a.imdbUrl=$("#kimdb>a").attr("href")||"",a.year=$("#top").text().match(/\d{4}/g)[0],a.title=$("#top").prop("firstChild").nodeValue.trim();let t=$("#kdescr").clone();t.find("fieldset").remove(),a.description=t.text().trim(),a.subtitle=$("td.rowhead:contains('\u526F\u6807\u9898'):last").next().text();let o=g(r,"\u7C7B\u578B");a.category=ee(o);let n=g(r,"\u5A92\u4ECB");a.videoType=oe(n);let s=g(r,"\u7F16\u7801");return a.videoCodes=re(s),a.audioCodes=g(r,"\u97F3\u9891\u7F16\u7801"),a.resolution=g(r,"\u5206\u8FA8\u7387"),a.bdinfo=ae(),a.screenshots=te(e),a},ee=e=>{let r={Movies:"movie","TV Series":"tv","TV Shows":"tv",Sports:"sport",Documentaries:"documentary"};return r[e]!==void 0?r[e]:""},g=(e,r)=>{if(e==="")return"";let t=e.split("\xA0\xA0\xA0");for(var o=0;o<t.length;o++)t[o]=t[o].split(":");for(var o=0;o<t.length;o++)if(t[o][0]===r)return t[o][1].trim();return""},te=()=>{let e=[],r=$("td.rowhead:contains('\u7B80\u4ECB'):last").next().find("img");for(let t=0;t<r.length;t++)e.push(r[t].getAttribute("src"));return e};var re=e=>e==="H.264/AVC"?"h264":e.replace(/[.-]/g,"").toLowerCase(),oe=e=>e==="WEB-DL"?"web":e.replace(/[.-]/g,"").toLowerCase(),ae=()=>{let e=$("#kdescr").find("fieldset"),r="";for(let t=0;t<e.length;t++){let o=e[t].textContent;(o.includes("DISC INFO:")||o.includes("ViDEO BiTRATE"))&&(r+=`[fieldset]${o}[/fieldset]`)}return r};var B=()=>{console.log("call getCHDInfo function");let e=$("#top"),r=$("td.rowhead:contains('\u57FA\u672C\u8CC7\u8A0A'):last").next().text();a.sourceSite=d,a.movieName=$("#top").prop("firstChild").nodeValue.trim(),a.movieAkaName=$("td.rowhead:contains('\u526F\u6A19\u984C'):last").next().text(),a.imdbUrl=$("#kimdb>a").attr("href")||"",a.year=$("#top").text().match(/\d{4}/g)[0],a.title=$("#top").prop("firstChild").nodeValue.trim(),a.subtitle=$("td.rowhead:contains('\u526F\u6A19\u984C'):last").next().text();let t=b(r,"\u985E\u5225");a.category=se(t);let o=b(r,"\u7DE8\u78BC");return a.videoCodes=ne(o),a.audioCodes=b(r,"\u97F3\u9891\u7F16\u7801"),a.resolution=b(r,"\u89E3\u6790\u5EA6").toLowerCase(),a.screenshots=ie(e),a},se=e=>e.match(/Movie/i)?"movie":e.match(/TV/i)?"tv":e.match(/Sports/i)?"sport":"",b=(e,r)=>{if(e==="")return"";let t=e.split("\xA0\xA0\xA0");for(var o=0;o<t.length;o++)t[o]=t[o].split(":");for(var o=0;o<t.length;o++)if(t[o][0]===r)return t[o][1].trim();return""},ne=e=>e.replace(/[.-]/g,"").toLowerCase(),ie=()=>{let e=[],r=$("td.rowhead:contains('\u7C21\u4ECB'):last").next().find("img");for(let t=0;t<r.length;t++)e.push(r[t].getAttribute("src"));return e};var v=x;switch(d){case"PTP":v=x;break;case"CHD":v=M;break;case"MTeam":v=B;break}var L=v;var He=GM_addStyle(`
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
#img-transfer:hover,#douban-info:hover {
  background: #fff;
  border-color: #409eff;
  color: #409eff
}
#img-transfer.is-disabled, #img-transfer.is-disabled:hover,#douban-info.is-disabled, #douban-info.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
`);var m=null,ce=e=>{let r=Object.keys(p).map(s=>{let{url:c,uploadPath:l}=p[s];return p[s].asTarget?`<li><a href="${c}${l}#torrentInfo=${encodeURIComponent(JSON.stringify(m))}" target="_blank">${s}</a></li>`:""}),t=Object.keys(_).map(s=>{let c=m.imdbUrl?/tt\d+/.exec(m.imdbUrl)[0]:"",l="",u=c||m.movieAkaName||m.movieName;return s==="TTG"&&c&&(u=u.replace("tt","imdb")),l=_[s].replace("{imdbid}",u),l=l.replace("{searchArea}",c?"4":"0"),`<li><a href="${l}" target="_blank">${s}</a></li>`}),o=i.needDoubanInfo?`<h4>\u83B7\u53D6\u8C46\u74E3\u7B80\u4ECB</h4>
  <div class="douban-section">
    <button id="douban-info">\u5F00\u59CB\u83B7\u53D6</button>
    <div class="douban-status"></div>
  </div>`:"",n=`
  <div class="seed-dom movie-page__torrent__panel">
    <h4>\u4E00\u952E\u8F6C\u79CD \u{1F3AC}</h4>
    <ul class="site-list">
      ${r.join("")}
    </ul>
    ${o}
    <h4>\u8F6C\u7F29\u7565\u56FE \u23EB</h4>
    <div class="upload-section">
      <button id="img-transfer">\u5F00\u59CB\u8F6C\u6362</button>
      <div class="checkbox">
        <input type="checkbox" id="nsfw">
        <label for="nsfw">\u662F\u5426\u4E3ANSFW</label>
      </div>
      <div class="upload-status"></div>
    </div>
    <h4>\u5FEB\u901F\u68C0\u7D22 \u{1F50D}</h4>
    <ul class="search-list">
      ${t.join("")}
    </ul>
  </div>
  `;e.prepend(n)},H=()=>{$(".site-list a").each((e,r)=>{let t=encodeURIComponent(JSON.stringify(m)),o=$(r).attr("href").replace(/(#torrentInfo=)(.+)/,`$1${t}`);$(r).attr("href",o)})},le=()=>{let e=$(".upload-section .upload-status"),r=m.screenshots;try{if(r.length<1)throw new Error("\u83B7\u53D6\u56FE\u7247\u5217\u8868\u5931\u8D25");r=r.join(`
`);let t=$("#nsfw").is(":checked"),o=encodeURI(`imgs=${r}&content_type=${t?1:0}&max_th_size=300`);e.text("\u8F6C\u6362\u4E2D..."),$("#img-transfer").attr("disabled",!0).addClass("is-disabled"),GM_xmlhttpRequest({url:"https://pixhost.to/remote/",method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},data:o,onload(n){$("#img-transfer").removeAttr("disabled").removeClass("is-disabled");let s=n.responseText.match(/(upload_results = )({.*})(;)/);if(!s)throw new Error("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");let c=[];if(s&&s.length)c=JSON.parse(s[2]).images,c.length&&(m.screenshots=c.map(l=>`[url=${l.show_url}][img]${l.th_url}[/img][/url]`),H(),e.text("\u8F6C\u6362\u6210\u529F\uFF01"));else throw new Error("\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5")}})}catch(t){$("#img-transfer").removeAttr("disabled").removeClass("is-disabled"),e.text(t.message)}},de=()=>{let e=$(".page__title>a").attr("href");if(e&&e.match("movie.douban.com"))return m.doubanUrl=e,S(),!1;if(m.imdbUrl){let r=/tt\d+/.exec(m.imdbUrl)[0];GM_xmlhttpRequest({method:"GET",url:`${D}/${r}`,onload(t){let o=JSON.parse(t.responseText);console.log(o),o&&o.data&&(m.doubanUrl=`https://movie.douban.com/subject/${o.data.id}`,S())}})}else GM_xmlhttpRequest({method:"GET",url:`${N}/search/weixin?q=${m.movieName}&start=0&count=1&apiKey=${I}`,onload(r){let t=JSON.parse(r.responseText);console.log(t),t&&t.items&&t.items.length>0&&(m.doubanUrl=`https://movie.douban.com/subject/${t.items[0].id}`,S())}})},S=()=>{let{doubanUrl:e}=m,r=$(".douban-section .douban-status");try{if(e)r.text("\u83B7\u53D6\u4E2D..."),GM_xmlhttpRequest({method:"GET",url:`${w}?url=${e}`,onload(t){let o=JSON.parse(t.responseText);if(o&&o.success)m.doubanInfo=o.format,k(o),H(),r.text("\u83B7\u53D6\u6210\u529F");else throw new Error("\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F\u5931\u8D25")}});else throw new Error("\u65E0\u6CD5\u83B7\u53D6\u8C46\u74E3\u4FE1\u606F")}catch(t){r.text(t.message)}},C=location.hash&&location.hash.match(/(^|#)torrentInfo=([^#]*)(#|$)/),y=C&&C.length>0?C[2]:null;if(d&&(y&&i.asTarget&&(y=JSON.parse(decodeURIComponent(y)),E(y)),i.asSource&&!location.pathname.match(/upload/ig))){m=L(),console.log("torrentData:"+JSON.stringify(m));let e=i.seedDomSelector;if(d==="PTP"){let r=f("torrentid");e=$(`#torrent_${r} >td`)}(d==="CHD"||d==="MTeam")&&(e=$("#top")),ce(e),$("#img-transfer")&&$("#img-transfer").click(()=>{le()}),$("#douban-info")&&$("#douban-info").click(()=>{de()})}})();
//# sourceMappingURL=index.js.map
