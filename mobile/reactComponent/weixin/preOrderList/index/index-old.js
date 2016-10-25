var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var $ = require("jquery");

var icon01 = require("./img/icon01.jpg");
var demo = require("./img/demo.jpg");
var Main = React.createClass({
  getInitialState: function() {
    return {
      maskFlag: false,
      productList: [],
      userCode: ""
    }
  },
  showMask: function() {
    this.setState({
      maskFlag: true
    });
  },
  hideMask: function() {
    this.setState({
      maskFlag: false
    });
  },
  showPrompt: function(event) {
    // $("." + mmhc.prompt).css("opacity", "1");
    // $("." + mmhc.prompt).stop().animate({
    //   opacity: 0
    // }, 2000);
    var id = ReactDom.findDOMNode(event.target).getAttribute("id");
    window.location.href = "/preselllog/preselDetail.html?code=" + id + "&userCode=" + this.state.userCode;
  },
  render: function() {
    return (
      <div>
        <h1 className={mmhc.mH1} onClick={this.showMask}>
          <img className={mmhc.iconImg} src={icon01} alt=""/>
          预售说明
        </h1>
        <div className={mmhc.commodityContainer}>
          {
            this.state.productList.map(function(productM,index){
              return <div key={index} className={mmhc.commodityM}>
                      <a href={"/preselllog/preselDetail.html?code=" + productM.code + "&userCode=" + this.state.userCode}>
                        <img src={"/preOrder/"+productM.masterImg} className={mmhc.cMImg} alt=""/>
                      </a>
                      <div className={mmhc.cMMess}>
                        <a id={productM.code} href="javascript:void(0)" onClick={this.showPrompt} className={mmhc.cMMessTitle}>{productM.productName}</a>
                        
                        <em className={mmhc.baoyou}>包邮</em>
                        <em className={mmhc.cMMessAmount}>￥{productM.productPrice}</em>
                        <p className={mmhc.originalPrice}>市场价<em>￥{productM.productPriceMarket}</em></p>
                      </div>
                    </div>
            }.bind(this))
          }
          {
            this.state.productList.map(function(productM,index){
              return <a key={index} href={"/preselllog/preselDetail.html?code=" + productM.code + "&userCode=" + this.state.userCode}>
                      <img className={mmhc.bannerImg} src={"/preOrder/"+productM.briefImg} alt=""/>
                     </a>
            }.bind(this))
          }


        </div>

        <div className={cNs(mmhc.mask,this.state.maskFlag==true?mmhc.show:"")}>
          <h1>预售说明</h1>
          <p>预购规则：</p>
          <p>1.每个用户每种商品可预购1件。</p>
          <p>2.用户在预售期无需付费。</p>
          <p>3.用户需在3月21日当天完成支付。</p>
          <p>活动声明：</p>
          <p>在参加活动过程中，如果出现作弊行为（批量注册、恶意购买、虚假交易等），蜜麻花将自动取消您本次活动资格，并有权冻结账号、取消您后续参加蜜麻花任意活动的权利，必要时追究法律责任。</p>
          <p>活动最终解释权归蜜麻花所有。</p>
          <a href="javascript:void(0)" onClick={this.hideMask} className={mmhc.close}></a>
        </div>

        <div className={mmhc.prompt}>
          此商品已预购
        </div>

      </div>
    )
  },
  componentDidMount: function() {
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r !== null) {
        return unescape(r[2]);
      }
      return null;
    }
    var userCode = getQueryString("userCode");
    $.ajax({
      url: jsonPath.path + '/presell/presellList.json?a=' + Math.random(),
      type: jsonPath.method,
      dataType: 'json',
      data: {
        userCode: userCode
      },
      success: function(data) {
        this.setState({
          productList: data.data,
          userCode: userCode
        });
      }.bind(this)
    });
  }
});

module.exports = Main;