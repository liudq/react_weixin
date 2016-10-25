require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var OrderPay = require("./orderPay/orderPay.js")
var MyAlert = require("../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MyAlert/>
        <OrderPay/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);