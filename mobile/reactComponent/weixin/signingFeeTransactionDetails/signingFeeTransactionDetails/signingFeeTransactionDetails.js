require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./signingFeeTransactionDetails.css");
var bannerImg = require("./gongxi.png");
var codeImg = require("./code.jpg");
var SigningFeeTransactionDetails = React.createClass({
  getInitialState: function() {
    return {
      userCode: "",
      joinType: "",
      startTime: "",
      closeTime: "",
      money: ""
    }
  },

  render: function() {
    return (
      <div className={mmhc.pay}>
        <div className={mmhc.section1}>
          <img src={bannerImg} alt=""/>
        </div>
        <div className={mmhc.section2}>
          <div className={cNs(mmhc.cash,mmhc.clearfix)}>
            <div className={mmhc.left}>成功缴费金额:</div>
            <div className={mmhc.right}>{this.state.money}元</div>
          </div>
          <div className={cNs(mmhc.cash,mmhc.clearfix,mmhc.cash2)}>
            <div className={mmhc.left}>级别类型:</div>
            <div className={mmhc.right}>{this.state.joinType}</div>
          </div>
          <div className={cNs(mmhc.cash,mmhc.clearfix,mmhc.cash2)}>
            <div className={mmhc.left}>推广编码:</div>
            <div className={mmhc.right}>{this.state.userCode}</div>
          </div>
          <div className={cNs(mmhc.cash,mmhc.clearfix,mmhc.cash2)}>
            <div className={mmhc.left}>代理时限:</div>
            <div className={mmhc.right}>{this.state.startTime}&nbsp; - &nbsp;{this.state.closeTime}</div>
          </div>
        </div>
        <div className={mmhc.erweima}>
          <img src={codeImg} alt=""/>
          <div className={mmhc.tishi}>关注“蜜麻花生活馆招商”微信服务号，随时查看自己的收益哦~</div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var meetingCode = GetQueryString("meetingCode");
    var userCode = GetQueryString("recommendCode");

    $.ajax({
      url: "/payOver.json",
      type: "post",
      data: {
        meetingCode: meetingCode,
        recommendCode: userCode
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          userCode: data.userCode,
          joinType: data.joinType,
          startTime: data.startTime,
          closeTime: data.closeTime,
          money: data.money
        })
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = SigningFeeTransactionDetails;