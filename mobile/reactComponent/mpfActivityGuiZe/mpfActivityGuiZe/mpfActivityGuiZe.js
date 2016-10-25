var cNs = require('classnames');
var React = require("react");
var mmhc = require("./mpfActivityGuiZe.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");

var backImg = require("./img/order2.png");
var back2Img = require("./img/back2.png");

var mpfActivityGuiZe = React.createClass({
  getInitialState: function() {
    return {
       apkState:""
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={cNs(mmhc.backGoA,this.state.apkState==1?mmhc.blockk:"")}>
          <div className={mmhc.specialTitlet}></div>
{
          //   <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
          //   {this.state.apkState==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
          //   返回
          // </div>
}
          <div className={cNs(mmhc.specialTitle,mmhc.titel12)}>
            <a className={mmhc.backImgCss} href="back"><i><img src={back2Img} alt=""/></i><i className={mmhc.colorra}>返回</i></a>
          </div>
        </div>


        <div className={mmhc.bannerImgMa}>
          <div className={mmhc.bannerImg}></div>
          <div className={mmhc.maImg}></div>
        </div>

        <div className={mmhc.activityMpf}>
          <p>你购物我买单  活动规则</p>
          <ul className={mmhc.activityMpfUl}>
            <li>1.花的钱都将计入积金账户， 1元=1积金；</li>
            <li>2. 确认收货次日开始，每日按积金账户余额的5%返还；</li>
            <li>3. 每日5%返利，一半返可提现，一半返积分，积分可转提现也可再次购物；</li>
            <li>4. 积金返利再购物产生的消费金额将不会再计入积金；</li>
            <li>5. 可提现金额≥100元时，才可提取；</li>
            <li>6. 7.10前注册用户需升级成会员，才享受积金返还政策；</li>
            <li>7.如何成为会员，请咨询400-9669-707，或扫描上方二维码；</li>
            <li>8.活动期间，全场商品不限量不限购；</li>
            <li>9.活动时间：7.18-8.18</li>
            <li>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予返利.</li>
          </ul>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var apkState = GetQueryString("apk");
    this.setState({
      apkState:apkState
    })

  }
});

module.exports = mpfActivityGuiZe;
