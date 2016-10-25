var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../common/util/init.css");
var mmhc = require("./storeSearch.css");
var jsonPath = require("../common/util/jsonPath.js");
var imgPath = require("../common/util/path.js").path;
var myLoadPic = require("./Loading5.gif");
var StoreSearch = React.createClass({
  getInitialState: function() {
    return {
      sellerId: ""
    }
  },
  fnSearch: function() {
    $.ajax({
      url: jsonPath.path + '/store/sellerId.json?sellerId=' + this.state.sellerId,
      type: "get",
      success: function(data) {

      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div>
        <section className={CNs(mmhc.proSearch,mmhc.clearfix)}>
          <div className={mmhc.search}>
            <input  type="text" placeholder="搜你想搜"/>
              <a className={mmhc.searchBtn}  href="javascript:;" onClick={this.fnSearch}></a>
          </div>
          <a className={mmhc.more} href="javascript:history.go(-1)">取消</a>
        </section>
        <section className={CNs(mmhc.allProBox,this.state.SH2)}>
          <ol className={CNs(mmhc.proConTit,mmhc.clearfix)}>
            <li className={CNs(mmhc.sortAll,this.state.act1)} onClick={this.fnAct1}>综合</li>
            <li className={this.state.act2} onClick={this.fnAct2}>销量</li>
            <li className={this.state.act4} onClick={this.fnAct4}>上新</li>
            <li className={CNs(mmhc.sortPrice,this.state.act3)} onClick={this.fnAct3}>价格</li>
            <li className={CNs(mmhc.showWay,this.state.bok==true?mmhc.sortRow:mmhc.BVertical)} onClick={this.fnChange}></li>
          </ol>
        {/*<ul className={CNs(mmhc.proCon,mmhc.clearfix,this.state.bok==true?mmhc.hide:mmhc.show)}>
              {
                this.state.AProducts.map(function(ProList,index){
                  return <AllProList key={index} data={ProList}/>;
                }.bind(this))
              }
            </ul>
            <ul className={CNs(mmhc.proCon2,this.state.bok==true?mmhc.show:mmhc.hide)}>
              {
                this.state.AProducts.map(function(ProList,index){
                  return <AllProList key={index} data={ProList}/>;
                }.bind(this))
              }
            </ul>*/}
          <div className={mmhc.myLoadMask}></div>
          <img className={mmhc.myLoadimg}src={myLoadPic} alt=""/>
        </section>
      </div>
    )
  },
  componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    }
  },
  componentDidMount: function() {
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    }
    var urlParam = getUrlParam("sellerId");
  }
});
ReactDom.render(
  <StoreSearch />,
  document.getElementById("mmhContainer")
);