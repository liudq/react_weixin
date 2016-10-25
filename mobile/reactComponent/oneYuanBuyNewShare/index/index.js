var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;

var banner = require("./img/banner.png");
var explain = require("./img/explain.png");
var tuImg = require("./img/tu.jpg");
var bottom = require("./img/bottom.png");
var logoImg = require("./img/LOGO.png");

var hotLine19 = require("./img/myLine19.png");
var cutText = function(text, myLength) {
  if (text) {
    if (text.length > myLength * 1) {
      return text.slice(0, myLength * 1);
    } else {
      return text;
    }
  }
}

var Main = React.createClass({
  getInitialState: function() {
    return {
      versionTitel: 0,
      flag: false,
      topList: [],
      normalList: [],
      seckillFlag: false,
      historyList: [],
      loginFlag: false,
      ruleShowFlag: false,
      activityIdState: "" //活动id
    }
  },
  render: function() {
    return (
      <div className={mmhc.shareContent}>
        <img className={mmhc.banner} src={banner} alt=""/>
        <div className={mmhc.section1}>
          <p>炎炎夏日，蜜麻花商城为您甄选了22件精选硬货，一流的品牌，给力的价格。</p>
          <p>转发信息至朋友圈，集齐7个赞就可以召唤小（兑）神（换）龙（码）啦！截图发送至蜜麻花订阅号，即可领取兑换码，快来开启你的兑换之旅吧~</p>
        </div>
        <div className={mmhc.section2}>
          <div className={mmhc.sec2Title}>活动规则</div>
          <div className={mmhc.sec2Explain}>兑换券使用说明</div>
          <div className={mmhc.explainFont}>2016年5月25日至2016年6月25日用户通过微信分享集7个赞即可领取兑换码，兑换码可购买兑换专区产品的资格（所有商品一律包邮）</div>
          <img className={mmhc.explainImg} src={explain} alt=""/>


          <div className={mmhc.process}>
            <div className={mmhc.processExplain}>兑换流程</div>
            <div className={mmhc.processContent}>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  微信搜索蜜麻花公众号【蜜麻花】，添加关注（蜜麻花微信公众服务号二维码在页面底部），发送集齐7个赞的截图，由蜜麻花客服审核，审核通过后发送兑换码至您的微信。
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  在各大手机应用市场搜索【蜜麻花】下载安装，或者根据该链接：<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">http://weixin.mmhlive.com/downLoad/downLoadApp.html</a>下载。
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  注册成为【蜜麻花】用户。
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  点击进入兑换专区，挑选商品，输入兑换码。
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  输入完毕，自动生成订单，点击支付（支付金额为填写兑换码后的折扣价），填写收货信息，支付完毕，购买完成。
                </div>
              </div>
            </div>
          </div>
          <div className={mmhc.process}>
            <div className={mmhc.processExplain}>活动说明</div>
            <div className={mmhc.processContent}>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  不可与其他优惠叠加使用
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  如有任何问题，可直接联系【蜜麻花】客服，联系电话：400-9669-707
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  【蜜麻花】郑重承诺，所有商品均为正品，数量有限，卖完为止
                </div>
              </div>
              <div className={cNs(mmhc.tu,mmhc.clearfix)}>
                <img src={tuImg} alt=""/>
                <div className={mmhc.explainRight}>
                  活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={mmhc.bottom}>
          <img src={bottom} alt=""/>
        </div>
        <div className={mmhc.tishi}></div>
        <div className={mmhc.tishiText}>
          <img src={logoImg} alt=""/>
          <div className={mmhc.tishiNeirong}>
            <p>精选硬货</p>
            <p>蜜麻花，兑换专区！</p>
          </div>
          <a className={cNs(mmhc.lijitiyan,this.state.iphone==1?"":"")} href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">立即体验</a>
          <div className={mmhc.clear}></div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var activityIdState = GetQueryString("activityId");
    this.setState({
      activityIdState: activityIdState
    });
    var that = this;
    $.ajax({
      url: jsonPath.path + '/seckill/list.json',
      type: jsonPath.method,
      data: {
        "activityId": activityIdState
      },
      dataType: 'json',
      success: function(data) {
        this.setState({
          normalList: data.result
        });
        var activityId = data.result[0].activityProductVO.activityId;
        //历史列表
        $.ajax({
          url: jsonPath.path + '/seckill/buyhistorylist.json',
          type: jsonPath.method,
          data: {
            "activityId": activityId
          },
          dataType: 'json',
          success: function(data) {
            if (data.result == undefined) {
              that.setState({
                loginFlag: data.success
              });
            } else {
              that.setState({
                historyList: data.result,
                loginFlag: data.success
              }, function() {
                var swiper = new Swiper('#myOneYuanBuy', {
                  slidesPerView: 2.5,
                  paginationClickable: true,
                  spaceBetween: 10
                });
              });
            }
          }
        });
        // 历史列表

      }.bind(this)
    });
  }
});
module.exports = Main;