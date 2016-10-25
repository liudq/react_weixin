require("../../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var DirectStoreRecord = require("./directStoreRecord/directStoreRecord.js");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  render: function() {
    return (
      <div style={{"height":"100%"}}>
        <MmhAlert/>
        <DirectStoreRecord />
      </div>
    )
  },
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);