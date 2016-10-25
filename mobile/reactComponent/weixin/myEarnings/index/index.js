var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var ddd = require("../../../common/util/util.js").dateFormat;
var RegisteredUsers = require("../registeredUsers/registeredUsers.js");
var Distributor = require("../distributor/distributor.js");
var Agents = require("../agents/agents.js");
var Rebate = require("../rebate/rebate.js");

var Main = React.createClass({
  getInitialState: function() {
    return {
      bok: true,
      bok2: false,
      bok3: false,
      bok4: false
    }
  },
  fnD: function() {
    this.setState({
      bok: true,
      bok2: false,
      bok3: false,
      bok4: false
    });
  },
  fnRU: function() {
    this.setState({
      bok: false,
      bok2: true,
      bok3: false,
      bok4: false
    });
  },
  fnA: function() {
    this.setState({
      bok: false,
      bok2: false,
      bok3: true,
      bok4: false
    });
  },
  fnR: function() {
    this.setState({
      bok: false,
      bok2: false,
      bok3: false,
      bok4: true
    });
  },
  render: function() {
    return (
      <div>
        <ul className={cNs(mmhc.titCon,mmhc.clearfix)}>    
          <li onClick={this.fnD}>推广分销商<b className={this.state.bok==true?mmhc.on:""}></b></li>
          <li onClick={this.fnRU}>推广经销商<b className={this.state.bok2==true?mmhc.on:""}></b></li>
          <li onClick={this.fnA}>推广代理商<b className={this.state.bok3==true?mmhc.on:""}></b></li>
          <li onClick={this.fnR}>销售返利<b className={this.state.bok4==true?mmhc.on:""}></b></li>
        </ul>      
        <div className={this.state.bok==true?mmhc.show:mmhc.hide}>
          <Distributor/>
        </div>
        <div className={this.state.bok2==true?mmhc.show:mmhc.hide}>
          <RegisteredUsers/>
        </div>
        <div className={this.state.bok3==true?mmhc.show:mmhc.hide}>
          <Agents/>
        </div>
        <div className={this.state.bok4==true?mmhc.show:mmhc.hide}>
          <Rebate/>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r !== null) {
        return unescape(r[2]);
      }
      return null;
    }
    var tab = getQueryString("tradeName");
    if (tab) {
      if (tab == "fenxiao") {
        this.setState({
          bok: true,
          bok2: false,
          bok3: false,
          bok4: false
        });
      }
      if (tab == "jingxiao") {
        this.setState({
          bok: false,
          bok2: true,
          bok3: false,
          bok4: false
        });
      }
      if (tab == "daili") {
        this.setState({
          bok: false,
          bok2: false,
          bok3: true,
          bok4: false
        });
      }
      if (tab == "xiaoshou") {
        this.setState({
          bok: false,
          bok2: false,
          bok3: false,
          bok4: true
        });
      }
    } else {
      this.setState({
        bok: true,
        bok2: false,
        bok3: false,
        bok4: false
      });
    }
    $("." + mmhc.titCon).children().each(function() {
      $(this).click(function() {
        $("." + mmhc.titCon).find("b").removeClass(mmhc.on)
        $(this).find("b").addClass(mmhc.on);
      })
    });
  }
});

module.exports = Main;