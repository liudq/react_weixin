require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var CompanyIntroduction = require("./companyIntroduction.js");
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <CompanyIntroduction />
      </div>
    )
  },
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);