require("../../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var SigningFeeUser = require("./signingFeeUser/signingFeeUser.js");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MmhAlert/>
        <SigningFeeUser/>
      </div>
    )
  },
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);