var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityFree.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var backImg = require("./order2.png");
var sshareImg = require("./share.png");
var bannerImg = require("./banner.jpg");
var activityImg = require("./activity.png");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var back2Img = require("./back2.png");
var share2Img = require("./share2.png");

var ActivityFree = React.createClass({
  getInitialState: function() {
    return {
      fromHome: "",
      url: "",
      versionTitel: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
          {this.state.fromHome==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
          整点购  享免单
        </div>
        <div className={mmhc.banner}>         
          <img src={bannerImg} alt=""/>
        </div>    
        <div className={mmhc.titleImg}>
          <img src={activityImg} alt=""/>
        </div>
        <div className={mmhc.ruleCss}>
          <p>1、每日10点、14点、18点、22点整点支付完毕，前五单可享受免单；</p>
          <p>2、活动结束后，中奖名单蜜麻花商城会进行公示，并以短信的方式进行通知；</p>
          <p>3、免单金额为实付金额（不含运费），免单金额直接存入至账户余额，不享受返利；</p>
          <p>4、活动周期6个月，未到期不可提现；</p>
          <p>5、免单金额可在蜜麻花平台消费；</p>
          <p>6、免单产品如出现质量问题只接受换货处理，概不退款；</p>
          <p>7、蜜麻花商城全部商品参与整点购物享免单；</p>
          <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
        </div>
        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.fromHome==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}
        
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
    }
    $(window).scroll(function() {
      if ($(window).scrollTop() > 500) {
        $("." + mmhc.fixUpCss).addClass(mmhc.block);
        $("." + mmhc.backImgA).addClass(mmhc.block);
      } else {
        $("." + mmhc.fixUpCss).removeClass(mmhc.block);
        $("." + mmhc.backImgA).removeClass(mmhc.block);
      }
    });
    $("." + mmhc.fixUpCss).click(function(event) {
      $('html,body').animate({
        scrollTop: 0
      }, 800);
    });

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var fromHome = GetQueryString("apk");
    this.setState({
      fromHome: fromHome,
      url: window.location.href
    });
  },
});

module.exports = ActivityFree;