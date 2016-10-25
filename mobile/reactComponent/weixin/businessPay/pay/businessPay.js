require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./businessPay.css");
var mailImg = require("./mail.png");
var phoneImg = require("./phone.png");
var userImg = require("./user.png");
var BusinessPay = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      phone: "",
      mail: "",
      meeting: {},
      timestamp: "",
      sign: "",
      noncestr: "",
      package: "",
      appid: "",
      code: "",
      orderId: "",
      clickState: 0,
      openId: ""
    }
  },
  nameFun: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  phoneFun: function(event) {
    this.setState({
      phone: event.target.value
    });
  },
  mailFun: function(event) {
    this.setState({
      mail: event.target.value
    });
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
          window.location.href = "/weixin/businessJoinDeal.html?orderId=" + that.state.orderId + "&openId=" + that.state.openId;
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
      }
    );
  },
  submitFun: function() {
    if (this.state.name == "") {
      alert("请输入您的姓名");
      return false;
    };
    if (this.state.phone == "") {
      alert("请输入手机号");
      return false;
    };
    var re = /^\d{11}$/;
    if (!re.test(this.state.phone)) {
      alert("请输入正确手机号");
      return false;
    };
    if (this.state.clickState == 0) {
      this.setState({
        clickState: 1
      }, function() {
        $.ajax({
          url: "/weixin/test/meetingPay.json",
          type: "post",
          data: {
            meetingCode: this.state.meeting.code,
            orderNum: 1,
            gradeSign: this.state.meeting.gradeSignA,
            payEmail: this.state.mail,
            payMobile: this.state.phone,
            payName: this.state.name,
            code: this.state.code
          },
          error: function() {
            alert("请求数据失败");
            this.setState({
              clickState: 0
            });
          },
          success: function(data) {
            this.setState({
              clickState: 0
            });
            if (data.flag == "success") {
              this.setState({
                timestamp: data.message.timeStamp,
                sign: data.sign,
                noncestr: data.message.nonceStr,
                package: data.message.package,
                appid: data.message.appId,
                orderId: data.orderId,
                openId: data.openId
              }, function() {
                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                } else {
                  this.onBridgeReady();
                };
              })
            } else {
              alert(data.message)
            };

          }.bind(this),
          dataType: "json"
        });
      });
    };

  },
  render: function() {
    return (
      <div className={mmhc.pay}>
        <div className={cNs(mmhc.payName,mmhc.clearfix)}>
          <div className={mmhc.payNameLeft}>
            项目名称：
          </div>
          <div className={mmhc.payNameRight}>{this.state.meeting.meetingName}</div>
        </div>
        <div className={mmhc.content}>
          <div className={mmhc.introduce}>
            项目介绍：
          </div>
          <div className={mmhc.introduceContent}>
            <p>
              {this.state.meeting.meetingIntroduction}
            </p>
          </div>
        </div>
        <div className={mmhc.money}>
          金额：{this.state.meeting.gradeMoneyA}元
        </div>
        <div className={mmhc.paymentInformation}>
          <div className={mmhc.paymentInformationTitle}>
            交款人信息：
          </div>
          <div className={cNs(mmhc.userName,mmhc.clearfix)}>
            <img src={userImg} alt=""/>
            <div className={mmhc.name}>姓名：</div>
            <input onChange={this.nameFun} placeholder="请输入您的姓名" type="text"/>
          </div>
          <div className={cNs(mmhc.userPhone,mmhc.clearfix)}>
            <img src={phoneImg} alt=""/>
            <div className={mmhc.name}>电话：</div>
            <input onChange={this.phoneFun} placeholder="请输入11位手机号" type="text"/>
          </div>
          <div className={cNs(mmhc.userPhone,mmhc.clearfix)}>
            <img src={mailImg} alt=""/>
            <div className={mmhc.name}>邮箱：</div>
            <input onChange={this.mailFun} placeholder="请输入您常用邮箱" type="text"/>
          </div>
          <div className={mmhc.submit}>
            <div onClick={this.submitFun} className={mmhc.submitButton}>交费</div>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var code = GetQueryString("code");
    var meetingCode = GetQueryString("meetingCode");
    this.setState({
      code: code
    });
    $.ajax({
      // url: '/json/weixin/findMeeting.json?meetingCode=' + meetingCode,
      url: '/findMeeting.json?meetingCode=2',
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          meeting: data.meeting
        })
      }.bind(this),
      dataType: "json"
    });

  },
});

module.exports = BusinessPay;