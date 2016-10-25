require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

require("../common/util/init.css");
var React = require("react");
var ReactDom = require("react-dom");
var MmhHeader = require("../common/header/header.js");
var MmhBanner = require("./banner/banner.js");
var MmhNovice = require("./novice/novice.js");
var MmhHot = require("./hot/hot.js");
var MmhList = require("./list/list.js");
var MmhFooter = require("../common/footer/footer.js");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <MmhHeader/>
        <MmhBanner/>
        <MmhNovice/>
        <MmhHot/>
        <MmhList/>
        <MmhFooter/>
      </div>
    )
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);