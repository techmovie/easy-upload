export default GM_addStyle(`
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
.site-list .site-icon{
  width: 12px;
  margin-right: 5px;
}
.search-list .site-icon{
  width: 12px;
  margin-right: 5px;
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
  font-weight: 600;
  line-height: 24px;
  margin-right: 5px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding: 0px;
}
.seed-dom li a,.search-list li a {
  padding-right: 3px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.search-list li:last-child span{
  display: none;
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
  display: inline-flex;
  align-items: center;
  margin-left: 3px;
}
svg.setting-svg{
  height: 20px;
  width: 20px;
  animation: 5s linear rotate infinite;
  cursor: pointer;
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
.panel-content p{
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
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
.easy-seed-setting-panel .img-upload-setting{
  margin-bottom: 10px;
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
.feature-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 50px;
}
.feature-list .site-enable-setting{
  width: 250px;
  padding-top: 5px;
  margin-bottom: 8px;
  text-align: center;
}
.easy-seed-setting-panel .save-setting-btn{
  background-color: #007bff;
  border-color: #007bff;
  color:#fff;
}
.easy-seed-setting-panel .save-setting-btn:hover{
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff
}
.ptp-api-key-btn{
  text-align: center;
}
.easy-notification{
  box-sizing: border-box;
  position: fixed;
  transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
  overflow: hidden;
  right:0;
  margin: 0 24px 0 0;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  z-index: 2010;
}
.easy-notification-enter{
  right: 16px;
  transform: translateX(0);
}
.easy-notification-notice{
    position: relative;
    width: 300px;
    max-width: calc(100vw - 48px);
    margin-bottom: 16px;
    margin-left: auto;
    padding: 16px 24px;
    overflow: hidden;
    line-height: 1.5715;
    word-wrap: break-word;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.notification-message {
  margin-bottom: 8px;
  color: #000000d9;
  font-size: 16px;
  line-height: 24px;
}

.notification-description{
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  text-align: justify;
  padding-right: 10px;
}

.notification-description p {
  margin: 0
}

.easy-notification-notice-close svg {
  height: 14px;
  width: 14px;
  font-size: 14px
}
.easy-notification-notice-close {
  position: absolute;
  top: 13px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px
}

.easy-notification-notice-close:hover {
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
.easy-seed-function-list .copy-img{
  margin-left: 5px;
}
.quick-search{
  cursor: pointer;
  color: #409eff;
  font-weight: 600;
}
.ptp-title-wrapper{
  position: relative;
}
.ptp-title-wrapper h4{
  position: absolute;
  left:0;
  top: 0;
  margin: 0;
  display: flex;
  align-items: center;
  line-height: 24px;
}
.ptp-title-wrapper .site-list li:first-child{
  padding-left: 80px;
}
.ptp-title-wrapper .search-list li:first-child{
  padding-left: 65px;
}
`);
