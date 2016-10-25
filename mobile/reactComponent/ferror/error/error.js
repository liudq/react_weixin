var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./error.css");
var errorImg = require("./error.png");

var AddressList = React.createClass({
  render: function() {
    return (
      <div className={mmhc.content}>
        <a href="homePage">返回首页</a>
      </div>
    )
  }
});

module.exports = AddressList;