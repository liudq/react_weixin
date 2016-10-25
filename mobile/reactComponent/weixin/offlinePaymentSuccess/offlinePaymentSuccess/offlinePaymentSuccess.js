require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./offlinePaymentSuccess.css");

var OfflinePaymentSuccess = React.createClass({
  getInitialState: function() {
    return {
      orderId: "",
      createTime: "",
      money: ""
    }
  },

  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.section1}>支付成功</div>
        <div className={mmhc.section2}>
          <div className={cNs(mmhc.money,mmhc.clearfix)}>
            <div className={mmhc.moneyLeft}>金额：</div>
            <div className={mmhc.moneyRight}>{this.state.money}元</div>
          </div>
          <div className={cNs(mmhc.money,mmhc.clearfix)}>
            <div className={mmhc.moneyLeft}>订单号：</div>
            <div className={mmhc.moneyRight}>{this.state.orderId}</div>
          </div>
          <div className={cNs(mmhc.money,mmhc.clearfix)}>
            <div className={mmhc.moneyLeft}>时间：</div>
            <div className={mmhc.moneyRight}>{this.state.createTime}</div>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return "";
    };
    var orderId = GetQueryString("orderId");

    $.ajax({
      url: jsonPath.path + '/payO2oOver.json',
      type: jsonPath.method,
      data: {
        orderId: orderId
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          orderId: data.orderId,
          createTime: data.createTime,
          money: data.money
        })
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = OfflinePaymentSuccess;