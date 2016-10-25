var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./finishRegister.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;

var back2Img = require("./back2.png");
var banner = require("./banner.png")
var ActivityShareIndex = React.createClass({
  getInitialState: function() {
    return {
      apkState: ""
    }
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
        <div className={cNs(mmhc.mianCon)}>      
          <div className={mmhc.tipCon}>
            <p className={mmhc.myWord1}>蜜麻花提供的20 积金与10花币（10元代金券）</p>
            <p className={mmhc.myWord2}>下载蜜麻花APP登陆领取</p>
          </div>
          <div className={mmhc.buttonCon}>
            {this.state.apkState==1?<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">下载蜜麻花APP领取</a>:<a href="/wechatMall/downloadGuide.html">下载蜜麻花APP领取</a>}
            <p>下载app领取积金，邀请更多好友赢现金</p>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
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
});

module.exports = ActivityShareIndex;