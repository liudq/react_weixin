require("../common/util/init.css");
var StoreHeader = require("./header/header.js");
var NavPro = require("./navPro/navPro.js");
var MyAlert = require("../common/mmhAlert/mmhAlert.js");
var React = require("react");
var ReactDom = require("react-dom");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MyAlert/>
        <StoreHeader/>
        <NavPro/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);