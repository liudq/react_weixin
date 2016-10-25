require("../common/util/init.css");
var CategoryList = require("./brandList/brandList.js");
var MyAlert = require("../common/mmhAlert/mmhAlert.js")
var React = require("react");
var ReactDom = require("react-dom");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MyAlert/>
        <CategoryList/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);