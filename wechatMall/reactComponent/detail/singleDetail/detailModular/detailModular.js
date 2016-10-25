var cNs = require('classnames');
var React = require("react");
var mmhc = require("./detailModular.css");
var backImg = require("./order2.png");
var imgPath = require("../../../common/util/path.js").path;
var tuwenImg02 = require("./tuwen_02.png");

var DetailModular = React.createClass({
  render: function() {
    return (
      <div className={this.props.detail2}>
      <div className={mmhc.title2}></div>
        <div id="myHtml" className={mmhc.detailSec}>
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function() {
    if (this.props.product.description != undefined) {
      document.getElementById("myHtml").innerHTML = this.props.product.description;
    }
  },
});

module.exports = DetailModular;