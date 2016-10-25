require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var ThirdIndex = require("./thirdIndex/index.js");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  render: function() {
    return (
      <div style={{"height":"100%"}}>
        <MmhAlert/>
        <ThirdIndex/>
      </div>
    )
  },
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);