require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./couponRegisterSuccessContent.css");
var qrImg = require("./erweima_03.png");
var logoImg = require("./LOGO.png");
var iconRegisterImg = require("./iconRegister.png");
var iosImg = require("./ios.png");
var androidImg = require("./android.png");
var moreImg = require("./weixinmore.png");
var openImg = require("./open.png");
var shareImg = require("./shareImg.png");
var tishiImg = require("./tishi.png");

var CouponRegisterSuccessContent = React.createClass({
  getInitialState: function() {
    return {
      couponList: [{}],
      showState: 0,
      androidState: 0
    }
  },
  androidDownFun: function() {
    this.setState({
      androidState: 1
    })
  },
  androidDownNoneFun: function() {
    this.setState({
      androidState: 0
    })
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.registContent}>
          <div className={mmhc.registLogo}>
            <img src={shareImg} alt=""/>
          </div>
          
          <div className={mmhc.sec3}>
            <img src={qrImg} alt=""/>
          </div>
          <div className={mmhc.sec4}>
            <p>扫描二维码关注“蜜麻花”服务号</p>
          </div>
          <div className={mmhc.sec4}>
            {
              this.state.showState==1?<a onClick={this.androidDownFun} href="javascript:void(0);" className={mmhc.iosDown}>
                                        <img src={androidImg} alt=""/>
                                        <i>ios</i>
                                      </a>:<a href="https://itunes.apple.com/cn/app/mi-ma-hua/id1092824540?mt=8" className={mmhc.iosDown}>
                                              <img src={androidImg} alt=""/>
                                              <i>ios</i>
                                            </a>
            }
            {
              this.state.showState==1?<a onClick={this.androidDownFun} href="javascript:void(0);" className={mmhc.androidDown}>
                                        <img src={androidImg} alt=""/>
                                        <i>Android</i>
                                      </a>:<a href="/downLoad/mmh.apk" className={mmhc.androidDown}>
                                              <img src={androidImg} alt=""/>
                                              <i>Android</i>
                                            </a>
            }
            <div className={mmhc.clear}></div>
          </div>
        </div>
        <div onClick={this.androidDownNoneFun} className={cNs(mmhc.background,this.state.androidState==1?"":mmhc.androidnone)}></div>
        <div onClick={this.androidDownNoneFun} className={cNs(mmhc.backgroundTop,this.state.androidState==1?"":mmhc.androidnone)}>
          <img src={tishiImg} alt=""/>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.setState({
        showState: 1
      })
    } else {
      this.setState({
        showState: 0
      })
    };
  },
});

module.exports = CouponRegisterSuccessContent;