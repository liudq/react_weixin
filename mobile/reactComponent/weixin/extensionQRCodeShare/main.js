require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var backgroundImg = require("./extensionQRCode.jpg");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
  getInitialState: function() {
    return {
      imgUrl: ""
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <MmhAlert/>
        <img className={mmhc.qRCodeImg} src={this.state.imgUrl} alt=""/>
      </div>
    )
  },
  componentDidMount: function() {
    var imgUrl = "";

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return "";
    };
    var imgUrl = GetQueryString("imgUrl");
    // var searchMess = window.location.search;
    // if (null != searchMess && searchMess != "") {
    //   imgUrl = searchMess.slice(1).split("&")[1].split("=")[1];
    // };
    // imgUrl = decodeURIComponent(imgUrl);
    imgUrl = decodeURIComponent(imgUrl);
    this.setState({
      imgUrl: imgUrl
    });
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);