require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var SigningFeeAgreement = require("./signingFeeAgreement/signingFeeAgreement.js");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MmhAlert/>
        <SigningFeeAgreement/>
      </div>
    )
  },
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);