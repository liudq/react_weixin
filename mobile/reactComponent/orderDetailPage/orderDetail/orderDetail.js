var cNs = require('classnames');
var React = require("react");
var mmhc = require("./orderDetail.css");
var order2Img = require("./order2.png");
var back2Img = require("./back2.png");

var OrderDetail = React.createClass({
  getInitialState: function() {
    return {
      versionTitel: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.orderDetailContent}>
        <div className={mmhc.titleDiv}>
          <a href="javascript:history.back()">
            <img className={mmhc.order2Img} src={this.state.versionTitel==1?back2Img:order2Img} alt=""/>
          </a>
          <p className={cNs(mmhc.title,this.state.versionTitel==1?mmhc.title12:"")}>订单详情</p>
        </div>
        <div className={mmhc.titleDiv2}></div>
        <div className={mmhc.successPrompt}>蜜蜂提醒：付款已经成功，您的包裹整装待发</div>
        <div className={mmhc.orderContent}>
          {/*<div className={mmhc.addresseePeople}>收件人：<i className={mmhc.name}>刘胜杰</i><i className={mmhc.phone}>15130389765</i></div>
          <div className={mmhc.addresseeAddress}>收货地址：<i>北京市北京市丰台区方庄方庄桥紫芳园6区3号底商</i></div>*/}
          <div className={mmhc.checkOrderDiv}>
            <a href="/member/order.html" className={mmhc.checkOrder}>查看订单</a>
          </div>
        </div>
        <div className={mmhc.remind}>
            下单后，<i>给您发送链接办理退款</i>的都是骗子！蜜麻花不存在系统升级，订单异常等问题，谨防假冒客服电话诈骗！
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
    }
    var orderId = GetQueryString("orderId");
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };
    $.ajax({
      url: jsonPath.path + '/authc/publish/mark.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {

      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = OrderDetail;