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
      apkState: ""
    }
  },
  render: function() {
    return (
      <div className={mmhc.container}>
        <div className={CNs(mmhc.orderPayPage,mmhc.clearfix,this.state.versionTitel==1?mmhc.titel12:"")}>
          <a className={this.state.versionTitel==1?mmhc.back2:mmhc.back} href={this.state.apkState==1?"finishBack":"javascript:history.back()"}></a>
          <p>订单支付</p>
        </div>
        <div className={mmhc.load}>
          <img src={loding} alt=""/>
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
    var urlParam3 = getUrlParam("rid");
    var urlParam4 = getUrlParam("paymentName");
    var urlParam5 = getUrlParam("paymentCode");
    var apkState = getUrlParam("apk");
    if (apkState == 1) {
      this.setState({
        apkState: 1
      });
    };
    if (urlParam4 != "" && urlParam5 != "") {
      this.setState({
        paymentName: urlParam4,
        paymentCode: urlParam5
      }, function() {
        $.ajax({
          url: jsonPath.path + "/order/toPay.json",
          type: jsonPath.method,
          data: {
            relationOrderSn: urlParam,
            paySessionstr: urlParam2 === undefined ? "" : urlParam2,
            rid: urlParam3
          },
          success: function(data) {
            this.setState({
              orderSuccessVO: data.relationOrderSn,
              code: data.finProductsList[0].code,
              paySessionstr: data.paySessionstr
            }, function() {
              var paymentCode = this.state.paymentCode;
              var paymentName = this.state.paymentName;
              var $autoFun;
              $(document).ready(function() {
                autoclick();
                if (paymentCode == "ALIPAY") {
                  $.ajax({
                    type: jsonPath.method,
                    url: jsonPath.path + "/alipay.json",
                    data: $('#myForm').serialize(),
                    success: function(data) {
                      if (data.flag == "huabi") {
                        alert("支付成功", function() {
                          window.location.href = "homePage";
                        });
                        return false;
                      } else {
                        if (data.flag == "success") {
                          var orderInfo = data.orderInfo;
                          var sign = data.sign;
                          window.location.href = "aweekAlipayApp," + orderInfo + "," + sign;
                          return false;

                        } else {
                          alert(data.info);
                          return false;
                        }
                      }
                    }.bind(this),
                    dataType: "json"
                  });
                  return false;
                } else if (paymentCode == "WXPAY") {
                  $.ajax({
                    type: jsonPath.method,
                    url: jsonPath.path + "/wxpay.json",
                    data: $('#myForm').serialize(),
                    success: function(data) {
                      if (data.flag == "huabi") {
                        alert("支付成功", function() {
                          window.location.href = "homePage";
                        });
                        return false;
                      } else {
                        if (data.flag == "success") {
                          var orderInfo = data.message;
                          var sign = data.sign;
                          window.location.href = "aweekWXpayApp," + sign + "," + data.message.appid + "," + data.message.timestamp + "," + data.message.partnerid + "," + data.message.package + "," + data.message.noncestr + "," + data.message.prepayid;
                          return false;

                        } else {
                          alert(data.info);
                          return false;
                        }
                      }
                    }.bind(this),
                    dataType: "json"
                  });
                  return false;
                } else {
                  $("#myForm").submit();
                }
                setTimeout(function() {
                  autoclick()
                }, 1000)

                function autoclick() {
                  $("#bt").trigger("click"); //让系统自动执行单击事件
                  // $autoFun = setTimeout(autoclick, 1000); //设置3秒钟之后再次执行函数
                }

                // function clearAuto() {
                //   clearTimeout($autoFun);
                // }
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