var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityFreeTrailer.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var backImg = require("./order2.png");
var sshareImg = require("./share.png");
var bannerImg = require("./banner.jpg");
var activityImg = require("./activity.png");
var upImg = require("./up.png");
var trailerImg = require("./trailer.jpg");
var backBottomImg = require("./back.png");
var back2Img = require("./back2.png");

var ActivityFreeTrailer = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      versionTitel: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
      <div className={cNs(mmhc.title,this.state.versionTitel==1?mmhc.title12:"")}>
        {this.state.apkState==1?<a href="back"><img className={mmhc.backImgCss} src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a href="javascript:history.back(-1);"><img className={mmhc.backImgCss} src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
        活动预告
      </div>
        <img className={mmhc.trailerImgCss} src={trailerImg} alt=""/>
        {/*<div className={mmhc.trailerCss}></div>*/}
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
      });
    };
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };
  },
});

module.exports = ActivityFreeTrailer;