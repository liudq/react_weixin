require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var logoImg = require("./LOGO.png");
var androidImg = require("./android.png");
var moreImg = require("./weixinmore.png");
var openImg = require("./open.png");

var Main = React.createClass({
  getInitialState: function() {
    return {
      showState: 0
    }
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.logo}>
          <img src={logoImg} alt=""/>
        </div>
        <div className={mmhc.downLoad}>
          <a href="/downLoad/mmh.apk" className={mmhc.androidDown}>
            <img src={androidImg} alt=""/>
            <i>Android</i>
          </a>
        </div>
        <div className={cNs(mmhc.background,this.state.showState==1?"":mmhc.none)}></div>
        <div className={cNs(mmhc.backgroundTop,this.state.showState==1?"":mmhc.none)}>
          <p>1.请点击右上角的<img className={mmhc.more} src={moreImg} alt=""/>按钮</p>
          <p>2.选择 <img className={mmhc.open} src={openImg} alt=""/></p>
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
    }
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);