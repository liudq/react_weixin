var React = require("react");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./singleAddress.css");
var headImg = require("./head.png");
var phoneImg = require("./orderPhone.png");
var moRen = require("./moRen.png");

var SingleAddress = React.createClass({
  getInitialState: function() {
    return {
      address: 2,
      myOneYuanBuy: 0,
      acId: "",
      bhId: "",
      postageFree: ""
    }
  },
  useAddress: function() {
    $.ajax({
      url: "/order/info.json?addressId=" + this.props.addressList.id,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (this.state.myOneYuanBuy == 1) {
          window.location.href = "/wechatMall/authc/seckillpay/info.html?addressId=" + data.address.id + "&acId=" + this.state.acId + "&bhId=" + this.state.bhId + "&postageFree=" + this.state.postageFree;
        } else {
          window.location.href = "/wechatMall/authc/order.html?addressId=" + data.address.id;
        }
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={mmhc.addressContentHeight}>
        <div className={mmhc.address}>
          <div onClick={this.useAddress} className={mmhc.addressLeft}>
            <div className={mmhc.leftTop}>
              <div className={mmhc.name}>
                <img src={headImg} alt=""/>
                <div className={mmhc.addressName}>{this.props.addressList.userName}</div>
                <div className={mmhc.clear}></div>
              </div>
              <div className={mmhc.phone}><img src={phoneImg} alt=""/>{this.props.addressList.deMobile}</div>
            </div>
            <div className={mmhc.addressBottom}>
              {
                 this.props.moRenState==1?<img className={mmhc.moRen} src={moRen} alt=""/>:<div></div>
              }
              {this.props.addressList.addAll} {this.props.addressList.addressInfo}
            </div>
          </div>
          
          <div className={mmhc.clear}></div>
        </div>
        <div className={mmhc.addressRight}>
          <a href={"/wechatMall/authc/addAddress.html?id="+this.props.addressList.id+"&num="+this.props.num}>更改</a>
          <div className={mmhc.clear}></div>
        </div>
        <div className={mmhc.clear}></div>
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
    var myOneYuanBuy = GetQueryString("myOneYuanBuy");
    var pageUrl = GetQueryString("pageUrl");
    var postageFree = GetQueryString("postageFree");
    var bhId = GetQueryString("bhId");
    var acId = GetQueryString("acId");
    this.setState({
      myOneYuanBuy: myOneYuanBuy,
      acId: acId,
      bhId: bhId,
      postageFree: postageFree
    })
  },
});


module.exports = SingleAddress;