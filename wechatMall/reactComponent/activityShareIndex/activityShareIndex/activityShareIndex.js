var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./activityShareIndex.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;

var back2Img = require("./back2.png");
var banner = require("./banner.png");
var yd = require("./yd.png");
var ActivityShareIndex = React.createClass({
  getInitialState: function() {
    return {
      apkState: ""
    }
  },
  fnTips: function() {
    $("." + mmhc.opc).css("display", "block");
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={cNs(mmhc.title,this.state.apkState==1?mmhc.show:mmhc.hide)}>
          {this.state.apkState==1?<a href="back" className={mmhc.back}><img src={back2Img} alt=""/></a>:<a href="homePage" className={mmhc.back}><img src={back2Img} alt=""/></a>}
          邀请返利
        </div>
        <div className={mmhc.myPic}>
          <img src={banner}/>
        </div>
        <div className={cNs(mmhc.mianCon,mmhc.clearfix)}>
          <h5 className={cNs(mmhc.myLink,mmhc.clearfix)}>
            <a href="/activityInviteRebate.html" className={cNs(mmhc.fl,mmhc.myColor)}>我的返利</a>
            <a href="/activityPromoteNewRule.html" className={mmhc.fr}>活动规则</a>
          </h5>
          <div className={cNs(mmhc.tipCon,mmhc.clearfix)}>
            <div className={mmhc.award1}>
              <p className={mmhc.myWord}>成功邀请好友我的奖励</p>
              <p className={mmhc.cashIncome}><i className={mmhc.small}>￥</i>30</p>
            </div>
            <div className={mmhc.award2}>
              <p className={mmhc.myWord}>好友首次购物我的奖励</p>
              <p className={mmhc.incomeRatio}>5%</p>
            </div>
          </div>
          <div className={mmhc.buttonCon}>
            {this.state.apkState==1?<a href={"sharebaobao,"+eshopHomePath+"/activityPromoteNewQRCode.html,蜜麻花送你新人大礼包,猛戳领蜜麻花新人大奖，美妆、母婴、全球商品应有尽有"}>点击分享，得现金奖励</a>:<a href="javascrip:;" onClick={this.fnTips}>点击右上角分享二维码，得现金奖励</a>}
            <p>点击邀请按钮即默认您已同意本次活动协议</p>
          </div>
        </div>

        <div className={mmhc.opc}>
          <img src={yd}/>
        </div>
      </div>
    )
  },
  componentWillMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var apkState = GetQueryString("apk");

    if (apkState == 1) {
      this.setState({
        apkState: 1
      })
    }

  },
  componentDidMount: function() {



  },
});

module.exports = ActivityShareIndex;