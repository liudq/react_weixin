var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./G20.css");
var img03 = require("./spcial03.png");
var img06 = require("./spcial06.png");
var img10 = require("./spcial10.png");
var img13 = require("./spcial13.png");
var back2Img = require("./back2.png");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");
var bannerImg = require("./banner.jpg");
var conImg = require("./conBody.jpg");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");

var ActivityChildFive = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      versionTitel: 0,
      ruleShowFlag: false,
      tabNum: 0
    }
  },
  showRule: function() {
    this.setState({
      ruleShowFlag: true
    });
  },
  hideRule: function() {
    this.setState({
      ruleShowFlag: false
    });
  },


  render: function() {
    return (
      <div className={mmhc.content}>
          <div className={cNs(mmhc.title,this.state.apkState==1?mmhc.show:mmhc.hide)}>
            {this.state.apkState==1?<a href="back" className={mmhc.back}><img src={back2Img} alt=""/></a>:<a href="homePage" className={mmhc.back}><img src={back2Img} alt=""/></a>}
            消费返利
          </div>
          <div className={cNs(mmhc.title2,this.state.apkState==1?mmhc.show:mmhc.hide)}></div>
          <div className={mmhc.bannerContainer}>
            {/*<img className={mmhc.banner} src={bannerImg} width="100%" alt=""/>*/}
            <img className={mmhc.banner} src={conImg} width="100%" alt=""/>
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
    var tabNum = GetQueryString("tabNum");
    var that = this;
    if (tabNum == "" || tabNum == null) {
      tabNum = 0;
    };

    if (apkState) {
      this.setState({
        apkState: 1
      });
    }
  },
});

module.exports = ActivityChildFive;