var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");

var left = require("./leftJT.png");

var img=require("./img.jpg");

var Main = React.createClass({
  getInitialState: function() {
    return {
      flag: false
    }
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.title}>
          <a href="back">
            <img className={mmhc.titleImg} src={left} alt="" height="20px"/>
          </a>
          加倍返利
        </div>
        <img src={img} width="100%" alt=""/>
      </div>
    )
  },
  componentDidMount: function() {

  }
});

module.exports = Main;