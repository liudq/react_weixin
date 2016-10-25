require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var logeImg = require("./LOGO.png");
var mmhc = require("./sign.css");

var Main = React.createClass({
  render: function() {
    return (
      <div className={mmhc.content}>
        <img src={logeImg} alt=""/>
        <p>您未登录或已过期，请登录</p>
        <a href="login">登录</a>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);