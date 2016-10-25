var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var $ = require("jquery");

var icon01 = require("./img/icon01.jpg");
var demo = require("./img/demo.jpg");

var banner01 = require("./img/1000reduce100.jpg");
var banner02 = require("./img/banner01.jpg");
var banner03 = require("./img/banner02.jpg");
var banner04 = require("./img/oneYuanBuy.jpg");
var banner05 = require("./img/rate20.jpg");
var banner06 = require("./img/redPaper.jpg");
var banner07 = require("./img/regist21.jpg");

var Main = React.createClass({
  getInitialState: function() {
    return {
      maskFlag: false,
      productList: [],
      userCode: "",
      banners: [banner01, banner02, banner03, banner04, banner05, banner06, banner07]
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
              return  <div key={index}>
                        {
                          index%4==0&&index<28?<a href="#"><img width="100%" className={mmhc.activeBanner} src={this.state.banners[index/4]} alt=""/></a>:""
                        }
                        <a href={"/preselllog/preselDetail.html?code=" + productM.code + "&userCode=" + this.state.userCode}>
                          <img width="100%" className={mmhc.bannerImg} src={"/preOrder/"+productM.briefImg} alt=""/>
                        </a>
                      </div>
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

    $(function() {
      $.ajax({
        url: '/weixin/buildJsConfig.json',
        type: 'post',
        data: {
          userCode: "1",
          url: window.location.href
        },
        dataType: 'json',
        success: function(data) {
          wx.config({
            debug: false,
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.jsSign, // 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });
          wx.ready(function() {
            wx.onMenuShareTimeline({
              title: '蜜麻花母婴商城 3.21开业 暖场预购商品列表', // 分享标题
              link: '', // 分享链接
              imgUrl: 'http://weixin.mmhlive.com/wechatImg/timeLineImg.jpg', // 分享图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareAppMessage({
              title: '蜜麻花母婴商城 3.21开业 暖场预购商品列表', // 分享标题
              link: '', // 分享链接
              imgUrl: 'http://weixin.mmhlive.com/wechatImg/timeLineImg.jpg', // 分享图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
          });
        }
      });
    })
  }
});

module.exports = Main;