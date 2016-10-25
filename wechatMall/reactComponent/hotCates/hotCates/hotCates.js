require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../../common/util/init.css");
var React = require('react');
var ReactDom = require('react-dom');
var cNs = require('classnames');
var mmhc = require('./hotCates.css');
var imgPath = require('../../common/util/path.js').path;
var fpHomePath = require('../../common/util/path.js').fpHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var HotCates = React.createClass({
  getInitialState: function() {
    return {
      bok: false,
      result: [],
      image: "",
      floorId: ""
    }
  },
  fnAboutMe: function() {
    this.setState({
      bok: !this.state.bok
    })
  },
  render: function() {
    return (
      <div className={mmhc.container}>
        <div className={mmhc.infBox}>
          <p className={cNs(mmhc.fl,mmhc.myInf)} onClick={this.fnAboutMe}></p>
          <p className={mmhc.myTit}>蜜麻花</p>
          <a className={cNs(mmhc.fr,mmhc.myCate)} href="/wechatMall/categoryPage.html"></a>
          <div className={cNs(mmhc.aboutMy,this.state.bok==true?mmhc.show:mmhc.hide)}>
            <i></i>
          </div>
          <div className={cNs(mmhc.myLIst,this.state.bok==true?mmhc.show:mmhc.hide)}>
            <a href="/wechatMall/authc/myOrder.html" className={mmhc.myOrder}>我的订单</a>
            <a href="/wechatMall/authc/myRebate.html">我的钱包</a>
          </div>
        </div>
        <div className={mmhc.fixBox}></div> 
        <div className={mmhc.imgPath}>      
          <img src={imgPath+this.state.image} alt=""/>
        </div>
        <div className={mmhc.proCon1}>
          <ul className={cNs(mmhc.proCon,mmhc.clearfix)}>
            {
              this.state.result.map(function(list,index){
                return list.dataType==1?<li key={index}>
                                          <a href={"/wechatMall/detail.html?prdCode="+list.product.id+"&tabNum=0&returnUrl=/wechatMall/hotCates.html?floorId="+this.state.floorId}>
                                            <div className={mmhc.proImg}>
                                              <img src={imgPath+list.product.masterImg} alt=""/>
                                            </div>
                                            <div className={cNs(mmhc.proNameCon,mmhc.clearfix)}>
                                              <p className={mmhc.hotWord}>热销</p>
                                              <p className={mmhc.proName}>{list.product.name1.length>30?list.product.name1.slice(0,30)+"...":list.product.name1}</p>
                                            </div>
                                            <p className={mmhc.proPrice}>￥{list.product.malMobilePrice}</p>
                                          </a>
                                        </li>:""
              }.bind(this))
            }
          </ul>
        </div>
        <a className={mmhc.myCar} href="/wechatMall/authc/shoppingCar.html" ></a>
        <div className={mmhc.myDownBox}>
          <div className={mmhc.opaBox}></div>
          <div className={mmhc.myCon}>
            <div className={mmhc.myLogo}></div>
            <div className={mmhc.myWords}>
              <p>宝宝的成长一路有我们陪伴</p>
              <p>100%正品保障</p>
            </div>
            <a href="/wechatMall/downloadGuide.html" className={mmhc.goDownlwd}>立即下载</a>
            <div className={mmhc.myClose}></div>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var floorId = getUrlParam("floorId");
    $("." + mmhc.myClose).click(function() {
      $("." + mmhc.myDownBox).css("display", "none");
    })
    this.setState({
      floorId: floorId
    });
    $.ajax({
      url: jsonPath.path + "/getFloorDatas.json?floorId=" + floorId,
      type: "get",
      success: function(data) {
        if (data.success == true) {
          for (var i = 0; i < data.result.length; i++) {
            if (data.result[i].dataType == 2) {
              this.setState({
                image: data.result[i].image
              });
            }
          }
          this.setState({
            result: data.result
          });
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });
  }
});
module.exports = HotCates;