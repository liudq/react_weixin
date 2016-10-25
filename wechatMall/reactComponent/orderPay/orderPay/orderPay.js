require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require("../../common/util/init.css");
var mmhc = require("./orderPay.css");
var CNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var imgPath = require("../../common/util/path.js").path;
var fpHomePath = require("../../common/util/path.js").fpHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var myLoadPic = require("./Loading5.gif");
var aliPay = require("./aliPay.png");
var hfPay = require("./hfPay.png");
var wechatPay = require("./wechatPay.png");
var loding = require("./newLoading.gif")


var OrderPay = React.createClass({
  getInitialState: function() {
    return {
      payUrl: "/member/payHeepayNew.html",
      versionTitel: 0,
      code: "",
      paySessionstr: "",
      apkState: "",
      timestamp: "",
      sign: "",
      noncestr: "",
      package: "",
      appid: "",
      orderId: "",
      openId: ""
    }
  },
  onBridgeReady: function() {
    var that = this;
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": this.state.appid, //公众号名称，由商户传入     
        "timeStamp": this.state.timestamp, //时间戳，自1970年以来的秒数     
        "nonceStr": this.state.noncestr, //随机串     
        "package": this.state.package,
        "signType": "MD5", //微信签名方式：     
        "paySign": this.state.sign //微信签名 
      },
      function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          window.location.href = "/wechatMall/authc/myOrder.html";
        }; // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        if (res.err_msg == "get_brand_wcpay_request:cancel") {
          window.location.href = "/wechatMall/authc/myOrder.html";
        };
        if (res.err_msg == "get_brand_wcpay_request:fail") {
          alert("支付失败", function() {
            window.location.href = "/wechatMall/authc/myOrder.html";
          })
        };
      }
    );
  },
  render: function() {
    return (
      <div className={mmhc.container}>
        <div className={CNs(mmhc.orderPayPage,mmhc.clearfix,this.state.versionTitel==1?mmhc.titel12:"")}>
          <a className={this.state.versionTitel==1?mmhc.back2:mmhc.back} href={this.state.apkState==1?"finish":"javascript:history.back()"}></a>
          
        </div>
        <div style={{"marginTop":"30%"}} className={mmhc.load}>
          正在跳转第三方支付，请稍等...
        </div>        
        <div className={CNs(mmhc.orderPayCon)}>
          <form id="myForm" action="/member/payHeepayNew.html" method="post">
            <div className={mmhc.hiddenBox}>
              <input type="text" name="finPoductCode" value={this.state.code}/>
              <input type="text" name="relationOrderSn" value={this.state.orderSuccessVO}/>
              <input type="text" name="paySessionstr" value={this.state.paySessionstr}/>
              <input type="text" name="paymentName" value={this.state.paymentName}/>
              <input type="text" name="paymentCode" value={this.state.paymentCode}/>
              <p id="bt" className={mmhc.setSubmit}>提交</p>
            </div>
          </form>
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

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam("relationOrderSn");
    var urlParam2 = getUrlParam("paySessionstr");
    if (urlParam2 == "undefined" || urlParam2 == undefined || urlParam2 == null) {
      urlParam2 = "";
    };
    var urlParam3 = getUrlParam("rid");
    var urlParam4 = getUrlParam("paymentName");
    var urlParam5 = getUrlParam("paymentCode");
    var apkState = getUrlParam("apk");
    if (apkState == 1) {
      this.setState({
        apkState: 1
      });
    };
    var that = this;
    if (urlParam4 != "" && urlParam5 != "") {
      this.setState({
        paymentName: urlParam4,
        paymentCode: urlParam5
      }, function() {
        $.ajax({
          url: jsonPath.path + "/wechatMall/order/toPay.json",
          type: jsonPath.method,
          data: {
            relationOrderSn: urlParam,
            paySessionstr: urlParam2,
            rid: urlParam3
          },
          success: function(data) {
            that.setState({
              orderSuccessVO: data.relationOrderSn,
              code: data.finProductsList[0].code,
              paySessionstr: data.paySessionstr
            }, function() {
              var paymentCode = that.state.paymentCode;
              var paymentName = that.state.paymentName;
              $.ajax({
                type: jsonPath.method,
                url: jsonPath.path + "/wxpayShop.json",
                data: $('#myForm').serialize(),
                success: function(data) {
                  if (data.flag == "huabi") {
                    alert("支付成功", function() {
                      window.location.href = "/wechatMall/authc/myOrder.html";
                    })
                  } else {
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
                            }
                          } else {
                            that.onBridgeReady();
                          };
                        }, 2500);
                      })
                    } else {
                      alert(data.message);
                    }
                  };
                }.bind(this),
                dataType: "json"
              });
            });
          }.bind(this),
          dataType: "json"
        });
      });
    }
  }
});
module.exports = OrderPay;