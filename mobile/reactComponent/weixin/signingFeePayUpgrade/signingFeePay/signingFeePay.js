require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var mmhc = require("./signingFeePay.css");
var explainImg = require("./explain.png");
var SigningFeePay = React.createClass({
  getInitialState: function() {
    return {
      agree: 1,
      rst: [],
      gradeMoneyA: "", //分销商金额
      index: "",
      userCode: "",
      discountMoney: "",
      disabledState: false,
      userCodeTishi: "请输入好友的邀请码",
      invitationAlertState: 0,
      invet: "",
      meetingCode: "",
      openId: "",
      code: "",
      listType: [],
      noPayState: 0
    }
  },
  xieyiFun: function() {
    if (this.state.agree == 1) {
      this.setState({
        agree: 0
      })
    } else {
      this.setState({
        agree: 1
      })
    }
  },
  payTypeFun: function(event) {
    var codeNum = event.target.getAttribute("data-meetingcode");
    if ($.inArray(codeNum, this.state.listType) != -1) {
      this.setState({
        index: event.target.getAttribute("data-meetingcode"),
        discountMoney: event.target.getAttribute("data-discountmoney"),
        meetingCode: event.target.getAttribute("data-meetingcode")
      }, function() {
        this.state.listType.map(function(extendTypeList, index) {
          $("#" + extendTypeList).removeClass(mmhc.payTypeNo);
        })
      })
    };

  },
  invitationFun: function() {
    if (this.state.disabledState == false) {
      this.setState({
        invitationAlertState: 1
      })
    }
  },
  quXiaoInvitationAlert: function() {
    this.setState({
      invitationAlertState: 0
    })
  },
  invitFun: function(event) {
    this.setState({
      invet: event.target.value
    });
  },
  qudingFun: function() {
    if (this.state.invet == "") {
      alert("请输入好友的邀请码")
      return false;
    };
    $.ajax({
      url: jsonPath.path + '/wx/checkinvicode.json',
      type: jsonPath.method,
      data: {
        invitationCode: this.state.invet
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.rst) {
          this.setState({
            invitationAlertState: 0
          })
        } else {
          alert("请输入正确邀请码", function() {
            this.setState({
              userCode: this.state.invet,
              disabledState: true,
              invitationAlertState: 0
            })
          })
        }
      }.bind(this),
      dataType: "json"
    });
  },
  liJiPayFun: function() {
    var that = this;
    if (this.state.noPayState == 0) { //防止连点
      this.setState({
        noPayState: 1
      }, function() {
        if (that.state.agree != 1) {
          alert("请先阅读加盟协议！", function() {
            that.setState({
              noPayState: 0
            })
          })
          return false;
        };
        $.ajax({
          url: '/weixin/test/joinMeetingPay.json',
          type: "post",
          data: {
            // recommendUserCode: that.state.userCode,
            meetingCode: that.state.meetingCode,
            openId: that.state.openId,
            code: that.state.code,
            signMoney: 1
          },
          error: function() {
            alert("请求数据失败", function() {
              that.setState({
                noPayState: 0
              });
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
    };

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
          // window.location.href = "/weixin/businessJoinDeal.html?orderId=" + that.state.orderId + "&openId=" + that.state.openId;
          window.location.href = "/weixinSigningFee/authc/signingFeeTransactionDetails.html?meetingCode=" + that.state.meetingCode + "&recommendCode" + that.state.userCode;
          // window.location.href = "/weixin/businessJoinDeal.html?orderId=" + that.state.orderId + "&openId=" + that.state.openId;
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
      }
    );
  },
  render: function() {
    return (
      <div className={mmhc.pay}>
        <div className={mmhc.section1}>
          <div className={mmhc.title}>选择交费类型</div>
          {
             this.state.rst.map(function(rst, index) {
              return <div id={rst.code} data-index={index} data-meetingcode={rst.code} data-discountmoney={rst.discountMoney} onClick={this.payTypeFun} key={index} className={cNs(mmhc.payType1,mmhc.payTypeNo,this.state.index==rst.code?mmhc.payActive:"")}><span data-discountmoney={rst.discountMoney} data-index={index} data-meetingcode={rst.code}>{rst.gradeNameA}</span><span data-meetingcode={rst.code} data-discountmoney={rst.discountMoney} data-index={index}>{this.state.disabledState==false?rst.gradeMoneyA:rst.gradeMoneyB}</span><span data-meetingcode={rst.code} data-discountmoney={rst.discountMoney} data-index={index}>元</span></div>
            }.bind(this))
          }
          {/*<div className={cNs(mmhc.payType1)}>分销商2500元</div>
          <div className={cNs(mmhc.payType2,mmhc.payActive)}>代理商5500元</div>*/}
        </div>
        <div style={{"display":"none"}} className={mmhc.section2}>
          <div className={mmhc.sec2Title}>邀请码</div>
          {/*<input onClick={this.invitationFun} disabled={this.state.disabledState} placeholder={this.state.userCodeTishi} className={mmhc.inputCss} type="text"/>*/}
          <input disabled={this.state.disabledState} placeholder={this.state.userCodeTishi} className={mmhc.inputCss} type="text"/>
          <div style={{"display":"none"}} className={mmhc.tiShi}><img src={explainImg} alt=""/>输入邀请码将优惠{this.state.discountMoney}元哦~</div>
        </div>
        <div className={mmhc.button}>
          <div onClick={this.liJiPayFun} className={cNs(mmhc.submit,this.state.noPayState!=0?mmhc.noPayCss:"")}>立即缴费</div>
          <div className={cNs(mmhc.xiyi,mmhc.clearfix)}>
            <div onClick={this.xieyiFun} className={cNs(mmhc.xiyiLeft,this.state.agree==1?mmhc.xiyiBg:"")}></div>
            <div className={mmhc.xiyiRight}>我已阅读并同意<a href="/weixinSigningFee/signingFeeAgreement.html">《蜜麻花招商加盟协议》</a></div>
          </div>
        </div>
        <div onClick={this.quXiaoInvitationAlert} style={{"display":this.state.invitationAlertState==1?"block":"none"}} className={mmhc.invitationAlertBg}></div>
        <div style={{"display":this.state.invitationAlertState==1?"block":"none"}} className={mmhc.invitationAlert}>
          <div className={mmhc.invTitle}>请输入好友的邀请码</div>
          <input onChange={this.invitFun} type="text"/>
          <div onClick={this.qudingFun} className={mmhc.submitButton}>确定</div>
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
    var userCode = GetQueryString("userCode");
    var openId = GetQueryString("openId");
    var code = GetQueryString("code");
    if (userCode != "") {
      this.setState({
        userCode: userCode,
        disabledState: true,
        userCodeTishi: userCode,
        openId: openId,
        code: code
      });
    } else {
      this.setState({
        userCode: userCode,
        disabledState: false,
        userCodeTishi: "请输入好友的邀请码",
        openId: openId,
        code: code
      });
    };

    $.ajax({
      url: jsonPath.path + '/authc/getpaytypeUpgrade.json',
      // url: jsonPath.path + '/wx/getpaytype.json',
      type: jsonPath.method,
      data: {
        invitationCode: userCode
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        var extendTypeList = [];
        extendTypeList = data.finMeeting.extendType.split(",");

        //默认选中
        var codeList = [];
        data.rst.map(function(code, index) {
          codeList[index] = code.code;
        });
        var fristIndex = codeList.indexOf(extendTypeList[0] * 1);
        if (data.flag) {
          this.setState({
            rst: data.rst,
            discountMoney: data.rst[fristIndex].discountMoney,
            meetingCode: data.rst[fristIndex].code,
            index: data.rst[fristIndex].code,
            listType: extendTypeList
          }, function() {
            extendTypeList.map(function(extendTypeList, index) {
              $("#" + extendTypeList).removeClass(mmhc.payTypeNo);
            })
          })
        } else {
          alert(data.msg)
        }
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = SigningFeePay;