var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./luckDrawRules.css");
var backImg = require("./back.png");
var back2Img = require("./back2.png");

var LuckDrawRules = React.createClass({
  getInitialState: function() {
    return {
      versionTitel: 1
    }
  },
  render: function() {
    return (
      <div classnames={mmhc.content}>
        <div className={cNs(mmhc.title,this.state.versionTitel==1?mmhc.titel12:"")}>
          <a href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>
          活动规则
        </div>
        <div className={mmhc.rulesCon}>
            <p>1、用户每次需消耗30积分或0.3元花币获得一次抽奖机会，不限次数；</p>
            <p>2、活动期间，凡在蜜麻花商城登录、注册、购买都有机会获得积分，均可参与抽奖活动；</p>
            <p>3、奖品类型：现金券、花币、现金红包（可提现）、蜜麻花积分、蜜麻花积金；</p>
            <p>4、所得奖品由蜜麻花商城即刻发放至用户账户；</p>
            <p>5、活动最终解释权归蜜麻花所有。</p>
          </div>
      </div>
    )
  },
  componentDidMount: function() {
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 1
      });
    };
  },
});

module.exports = LuckDrawRules;