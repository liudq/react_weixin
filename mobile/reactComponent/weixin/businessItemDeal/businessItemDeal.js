require("../../common/util/init.css");
var CNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./businessItemDeal.css");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
var pic = require("./pic.png")
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
        <ul className={mmhc.itemCon}>
          <li className={CNs(mmhc.itemList,mmhc.clearfix)}>
            <div className={mmhc.itemPic}>
              <img src={imgPath+this.state.orderState.meetingImg} alt=""/>
            </div>
            <div className={mmhc.itemDetail}>
              <p className={mmhc.itemName} title="蜜麻花母婴生活馆项目招商会哈">{this.state.orderState.meetingName}</p>
              <p className={CNs(mmhc.infor,mmhc.clearfix)}>
                <span className={mmhc.fl}>{this.state.orderState.meetingPlace}</span>
                <span className={mmhc.fr}>{this.state.orderState.meetingDate}</span>
              </p>
              <p className={CNs(mmhc.infor,mmhc.clearfix)}>
                <span className={mmhc.fl}>单价：￥{this.state.orderState.signMoney}</span>
                <span className={mmhc.fr}>数量：{this.state.orderState.orderNum}</span>
              </p>
            </div>
          </li>
        </ul>
        <div className={mmhc.total}>总金额:￥{this.state.orderState.orderMoney}</div>
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