require("../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var backgroundImg = require("./extensionQRCode.jpg");
var MmhAlert = require("../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
  getInitialState: function() {
    return {
      imgUrl: "",
      displayFlag: false,
      regUrl: ""
    }
  },
  imgError: function() {
    this.setState({
      displayFlag: true
    });
  },
  login: function() {

    window.location.href = this.state.regUrl;
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <MmhAlert/>
        <img style={{color:"#fff",display:this.state.displayFlag==false?"block":"none"}} onError={this.imgError} className={mmhc.qRCodeImg} src={this.state.imgUrl} alt="温馨提示：您不能生成拉新二维码
。"/>
        <p style={{color:"#fff",display:this.state.displayFlag==true?"block":"none"}}>温馨提示：您不能生成拉新二维码
。</p>
    <div style={{display:this.state.displayFlag==false?"block":"none"}} className={mmhc.btn} onClick={this.login}>新人大礼包领取</div>
      </div>
    )
  },
  componentDidMount: function() {
    var imgUrl = "";
    // var searchMess = window.location.search;
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return "";
    };
    var imgUrl = GetQueryString("qrCodeImg");
    // if (null != searchMess && searchMess != "") {
    //   imgUrl = searchMess.slice(1).split("&")[1].split("=")[1];
    // };
    imgUrl = decodeURIComponent(imgUrl);

    var regUrl = GetQueryString("regUrl");

    this.setState({
      imgUrl: imgUrl,
      regUrl: regUrl
    });
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);