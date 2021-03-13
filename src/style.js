export default GM_addStyle(`
.seed-dom h4{
  text-align: center;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 15px;
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
`);
