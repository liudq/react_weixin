require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var LuckDrawRules = require("./luckDrawRules/luckDrawRules.js");
var MmhAlert = require("../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MmhAlert/>
        <LuckDrawRules/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);