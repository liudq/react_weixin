require("../../common/util/init.css");
var CNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./businessJoinDeal.css");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var Main = React.createClass({
  getInitialState: function() {
    return {
      orderState: {}
    }
  },
  render: function() {
    return (
      <div>
        <MmhAlert/>
        <div className={CNs(mmhc.tipCon,mmhc.clearfix)}>
          <p className={mmhc.payResult}>付款结果</p>
          <p className={mmhc.payState}>{this.state.orderState.tradeStatus=="SUCCESS"?"您已付款成功":"处理中..."}</p>
        </div>
        <ul className={mmhc.detailCon}>
          <li className={mmhc.clearfix}>
            <p className={mmhc.fl}>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</p>
            <p className={mmhc.fr}>{this.state.orderState.meetingName}</p>
          </li>
          <li className={mmhc.clearfix}>
            <p className={mmhc.fl}>支付金额</p>
            <p className={mmhc.fr}>{this.state.orderState.orderMoney}元</p>
          </li>
          <li className={mmhc.clearfix}>
            <p className={mmhc.fl}>支付时间</p>
            <p className={mmhc.fr}>{this.state.orderState.orderDate}</p>
          </li>
        </ul>
      </div>
    )
  },
  componentDidMount: function() {
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam('openId');
    var urlParam2 = getUrlParam('orderId');
    $.ajax({
      url: jsonPath.path + '/findTradeMeeting.json',
      type: jsonPath.method,
      data: {
        "openId": urlParam,
        "orderId": urlParam2
      },
      success: function(data) {
        function standardDateFormat(timestamp) {
          var date = new Date(timestamp);
          Y = date.getFullYear() +
            '-';
          M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
            '-';
          D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
            '  ';
          h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
            ':';
          m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

          return (Y + M + D + h + m);
        }
        data.orderDate = standardDateFormat(data.orderDate);
        this.setState({
          orderState: data
        });
      }.bind(this),
      dataType: "json"
    });
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);