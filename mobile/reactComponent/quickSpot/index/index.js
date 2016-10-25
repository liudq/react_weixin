var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");

var quickSpot = require("./img/quickSpot.jpg");
var backImg = require("./img/leftBtn.png");

var Main = React.createClass({
  getInitialState: function() {
    return {
      flag: false
    }
  },
  render: function() {
    return (
      <div>
        <a href="homePage" className={mmhc.backA}>
          <img src={backImg} width="12px" alt=""/>
        </a>
        <img width="100%" src={quickSpot} alt=""/>
      </div>
    )
  },
  componentDidMount: function() {

  }
});

module.exports = Main;