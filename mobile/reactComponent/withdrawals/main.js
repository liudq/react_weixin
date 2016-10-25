require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

require("../common/util/init.css");
var React = require("react");
var ReactDom = require("react-dom");

var Cash = require("./cash/index.js");
var MmhAlert = require("../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
  render: function() {
    return (
      <div style={{height:"100%"}}>
        <MmhAlert/>
        <Cash/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("cash_panel")
);