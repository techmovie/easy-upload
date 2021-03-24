export default GM_addStyle(`
.seed-dom h4{
  text-align: center;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 8px 20px;
  font-size: 14px;
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
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.seed-dom li,.search-list li {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 5px;
  line-height: 24px;
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
  margin-left: 5px;
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
}
.easy-seed-setting-panel .panel-content{
  margin-top: 200px;
  max-width: 800px;
  margin: 50px auto;
  border-radius: 8px;
  background: #fff;
  position: relative;
  text-align:center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%)
}
.easy-seed-setting-panel .panel-content ul{
  list-style: none;
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
}
.easy-seed-setting-panel .panel-content li{
  margin:0;
  width: 80px;
  text-align: left;
  margin-bottom: 10px;
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
`);
