require("../../common/util/init.css");
var React = require("react");
var ReactDom = require("react-dom");

var IndexPage = require("./index/index.js");

var Main = React.createClass({
  render: function() {
    return (
      <div style={{height:"100%"}}>
        <IndexPage/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);