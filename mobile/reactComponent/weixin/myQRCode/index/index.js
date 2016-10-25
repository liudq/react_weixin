var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var ddd = require("../../../common/util/util.js").dateFormat;

var Main = React.createClass({
  getInitialState: function() {
    return {

    }
  },
  render: function() {
    return (
      <div className={mmhc.con}>
        <div className={mmhc.oneQRCode}>
          <a className={cNs(mmhc.getQRCode,mmhc.tg)} href="/weixin/extensionQRCode.html">点击获取推广二维码</a>
        </div>
        <div className={mmhc.twoQRCode}>
          <a className={cNs(mmhc.getQRCode,mmhc.zs)} href="/weixinSigningFee/authc/extensionQRCodeInvestment.html">点击获取招商二维码</a>
        </div>
        <div className={mmhc.threeQRCode}>
          <a className={cNs(mmhc.getQRCode,mmhc.hz)} href="">点击获取合作商铺权限</a>
        </div>
      </div>
    )
  },
  componentDidMount: function() {}
});

module.exports = Main;