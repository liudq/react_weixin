require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./offlinePayment.css");

var OfflinePayment = React.createClass({
  getInitialState: function() {
    return {
      inputValue: "",
      timestamp: "",
      sign: "",
      noncestr: "",
      package: "",
      appid: "",
      orderId: "",
      openId: "",
      noPayState: 0,
      userCode: "",
      shopName: "",
      shopCode: "",
      mobile: "",
      clerkCode: ""
    }
  },
  inputMoney: function(event) {
    this.setState({
      inputValue: event.target.value
    });
  },
  submit: function() {
    var that = this;
    var reg = new RegExp(/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/);
    if (that.state.noPayState == 0) {
      that.setState({
        noPayState: 1
      }, function() {
        if (that.state.inputValue == "") {
          alert("请输入金额");
          return false;
        };
        if (!reg.test(that.state.inputValue)) {
          alert("请输入正确金额");
          return false;
        };
        $.ajax({
          url: jsonPath.path + '/weixinSigningFee/authc/o2oPay.json',
          type: jsonPath.method,
          data: {
            payFee: that.state.inputValue,
            userCode: that.state.shopCode,
            clerkCode: that.state.clerkCode
          },
          error: function() {
            alert("请求数据失败", function() {
              that.setState({
                noPayState: 0
              })
            });
          },
          success: function(data) {
            if (data.flag == "success") {
              that.setState({
                timestamp: data.message.timeStamp,
                sign: data.sign,
                noncestr: data.message.nonceStr,
                package: data.message.package,
                appid: data.message.appId,
                orderId: data.orderId,
                openId: data.openId
              }, function() {
                window.setTimeout(function() {
                  if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    };
                    that.setState({
                      noPayState: 0
                    });
                  } else {
                    that.setState({
                      noPayState: 0
                    });
                    that.onBridgeReady();
                  };
                }, 2000);
              })
            } else {
              alert(data.message, function() {
                that.setState({
                  noPayState: 0
                });
              });
            }
          }.bind(this),
          dataType: "json"
        });
      })
    }

  },
  onBridgeReady: function() {
    var that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": that.state.appid, //公众号名称，由商户传入     
        "timeStamp": that.state.timestamp, //时间戳，自1970年以来的秒数     
        "nonceStr": that.state.noncestr, //随机串     
        "package": that.state.package,
        "signType": "MD5", //微信签名方式：     
        "paySign": that.state.sign //微信签名 
      },
      function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // window.location.href = "/weixin/businessJoinDeal.html?orderId=" + that.state.orderId + "&openId=" + that.state.openId;
          window.location.href = "/weixin/authc/offlinePaymentSuccess.html?meetingCode=" + that.state.meetingCode + "&recommendCode" + that.state.userCode + "&orderId=" + that.state.orderId;
          // window.location.href = "/weixin/businessJoinDeal.html?orderId=" + that.state.orderId + "&openId=" + that.state.openId;
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
      }
    );
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.section1}>店铺名称：<i>{this.state.shopName}</i></div>
        <div className={cNs(mmhc.section1,mmhc.section1Mobile)}>用户号码：<i>{this.state.mobile}</i></div>
        <input onChange={this.inputMoney} placeholder="请输入消费金额,单位元" className={mmhc.payInput} type="text"/>
        <a href={"/weixin/qro2o?urCode="+this.state.shopCode+"&tag=2"} className={mmhc.changeCss}>切换账号</a>
        <div className={mmhc.clear}></div>
        <div onClick={this.submit} className={mmhc.button}>支付</div>
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
    var userCode = GetQueryString("userCode");
    var shopCode = GetQueryString("shopCode");
    var mobile = GetQueryString("mobile");
    var clerkCode = GetQueryString("clerkCode");
    if (shopCode == "" || shopCode == null) {
      this.setState({
        shopCode: userCode
      })
    } else {
      this.setState({
        shopCode: shopCode
      })
    };
    this.setState({
      userCode: userCode,
      mobile: mobile,
      clerkCode: clerkCode
    });
    //获取店铺的名字
    $.ajax({
      url: jsonPath.path + '/findShopName.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      data: {
        userCode: shopCode
      },
      success: function(data) {
        if (data.flag) {
          this.setState({
            shopName: data.shopName
          })
        } else {
          alert(data.message)
        }
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = OfflinePayment;