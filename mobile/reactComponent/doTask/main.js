require("../common/util/init.css");
var React = require("react");
var ReactDom = require("react-dom");
var DoTask = require("./doTask/doTask.js");
var MyAlert = require("../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MyAlert/>
        <DoTask/>
      </div>
    )
  }
});
ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);