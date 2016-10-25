require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var path = require("../../../common/util/path.js").eshopHomePath;
var ReactDom = require("react-dom");
var mmhc = require("./CouponRegisterContent.css");
var RegistrationAgreement = require("./registrationAgreement/registrationAgreement.js");
var topImg = require("./topPicture.png");
var backImg = require("./back2.png");

var CouponRegisterContent = React.createClass({
  getInitialState: function() {
    return {
      phoneState: "",
      verificationState: "",
      passwordState: "",
      numState: "短信验证码",
      yuYinState: "语音验证码",
      repasswordState: "",
      userCode: "",
      userType: "",
      stateCss: 0,
      code: "",
      ajaxStateMsg: 1,
      ajaxStateYuYin: 1,
      agreementQuit: mmhc.none,
      zhuCe: mmhc.block,
      agreementInput: mmhc.agreementInput,
      acId: "",
      bhId: "",
      sign: "",
      fromHome: "",
      userChannel: "",
      randomNumber: "",
      verifyNumState: "",
      isNewState: 1,
      buyingHistoryId: "",
      bargainPrice: 0 //砍价金额
    }
  },
  noEmpty: function() {
    if (ReactDom.findDOMNode(this.refs.phoneNum).value == "") {
      alert("请输入手机号");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.phoneNum).value.length != 11) {
      alert("请输入正确手机号");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.verificationNum).value == "") {
      alert("请输验证码");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.passowrdNum).value == "") {
      alert("请输密码");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.passowrdNum).value.length < 6 || ReactDom.findDOMNode(this.refs.passowrdNum).value.length > 20) {
      alert("请输6-20位密码");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.passowrdNum).value != ReactDom.findDOMNode(this.refs.repassowrdNum).value) {
      alert("两次密码不一致");
      return false;
    };
    if (this.state.agreementInput != mmhc.agreementInput) {
      alert("请阅读协议");
      return false;
    };

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var openId = GetQueryString("openId");
    $.ajax({
      type: 'post',
      // url: "json/cart/addtocart.json",
      url: "/doregisterByBargain.json",
      data: {
        "mobile": this.state.phoneState,
        "password": this.state.passwordState,
        "repassword": this.state.repasswordState,
        "smsVerifyCode": this.state.verificationState,
        "userCode": this.state.userCode,
        "userType": this.state.userType,
        "code": this.state.code,
        "openId": openId,
        "activityProductId": this.state.acId,
        "buyingHistoryId": this.state.bhId,
        "sign": this.state.sign,
        "userChannel": this.state.userChannel
      },
      success: function(data) {
        if (data.success == true) {
          /*alert("领取成功");*/
          this.setState({
            bargainPrice: data.bargainPrice
          }, function() {
            window.location.href = "/activityBargainForHimclOver.html?bargainPrice=" + this.state.bargainPrice;
          })
        } else {
          alert(data.message);
        };
      }.bind(this),
      dataType: "json"
    });
  },
  changePhone: function(event) {
    this.setState({
      phoneState: event.target.value
    });
  },
  changeVerification: function(event) {
    this.setState({
      verificationState: event.target.value
    });
  },
  changePassword: function(event) {
    this.setState({
      passwordState: event.target.value
    });
  },
  changeRePassword: function(event) {
    this.setState({
      repasswordState: event.target.value
    });
  },
  jump: function(count) {
    window.setTimeout(function() {
      count--;
      if (count > 0) {
        this.setState({
          numState: count + "秒"
        }, function() {
          this.jump(count);
        }.bind(this))
      } else {
        this.setState({
          numState: "短信验证码",
          ajaxStateMsg: 1
        })
      }
    }.bind(this), 1000);
  },
  jump2: function(count) {
    window.setTimeout(function() {
      count--;
      if (count > 0) {
        this.setState({
          yuYinState: count + "秒"
        }, function() {
          this.jump2(count);
        }.bind(this))
      } else {
        this.setState({
          yuYinState: "语音验证码",
          ajaxStateYuYin: 1
        })
      }
    }.bind(this), 1000);
  },
  getVerification: function() {
    if (this.state.phoneState == "") {
      alert("请输入手机号");
      return false;
    };
    if (this.state.phoneState.length != 11) {
      alert("请输入正确手机号");
      return false;
    };
    if (this.state.verifyNumState == "") {
      alert("请输入图文验证码");
      return false;
    };
    if (this.state.numState == "短信验证码" && this.state.ajaxStateMsg == 1) {
      this.setState({
        ajaxStateMsg: 0
      }, function() {
        $.ajax({
          type: 'post',
          // url: "json/cart/addtocart.json",
          url: "/smsVertifyCode.json",
          data: {
            "mobile": this.state.phoneState,
            "vertifyCode": this.state.verifyNumState
          },
          success: function(data) {
            if (data == true) {
              this.jump(60);
            } else {
              alert(data);
              this.setState({
                ajaxStateMsg: 1,
                randomNumber: Math.random()
              });
            }
          }.bind(this),
          dataType: "json"
        });
      });
    }
  },
  getVerificationYuYin: function() {
    if (this.state.phoneState == "") {
      alert("请输入手机号");
      return false;
    };
    if (this.state.phoneState.length != 11) {
      alert("请输入正确手机号");
      return false;
    };
    if (this.state.verifyNumState == "") {
      alert("请输入图文验证码");
      return false;
    };
    if (this.state.yuYinState == "语音验证码" && this.state.ajaxStateYuYin == 1) {
      this.setState({
        ajaxStateYuYin: 0
      }, function() {
        $.ajax({
          type: 'post',
          // url: "json/cart/addtocart.json",
          url: "/smsVoiceVertifyCode.json",
          data: {
            "mobile": this.state.phoneState,
            "vertifyCode": this.state.verifyNumState
          },
          success: function(data) {
            if (data == true) {
              this.jump2(60);
            } else {
              alert(data);
              this.setState({
                ajaxStateYuYin: 1,
                randomNumber: Math.random()
              });
            }
          }.bind(this),
          dataType: "json"
        });
      });
    }
  },
  phoneFunFocus: function() {
    /*this.setState({
      stateCss: 1
    })*/
  },
  phoneFunBlur: function() {
    /*this.setState({
      stateCss: 0
    })*/
  },
  agreementText: function() {
    this.setState({
      agreementQuit: mmhc.block,
      zhuCe: mmhc.none
    })
  },
  agreementQuit: function() {
    this.setState({
      agreementQuit: mmhc.none,
      zhuCe: mmhc.block
    })
  },
  agreeInput: function() {
    if (this.state.agreementInput == mmhc.agreementInput) {
      this.setState({
        agreementInput: mmhc.agreInput
      })
    } else {
      this.setState({
        agreementInput: mmhc.agreementInput
      })
    }
  },
  randomNumberFun: function() {
    this.setState({
      randomNumber: Math.random()
    })
  },
  verifyFun: function(event) {
    this.setState({
      verifyNumState: event.target.value
    });
  },
  nextFun: function() {
    if (ReactDom.findDOMNode(this.refs.phoneNum).value == "") {
      alert("请输入手机号");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.phoneNum).value.length != 11) {
      alert("请输入正确手机号");
      return false;
    };
    if (this.state.verifyNumState == "") {
      alert("请输入图文验证码");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.verificationNum).value == "") {
      alert("请输验证码");
      return false;
    };
    $.ajax({
      url: "/checkNewMember.json",
      type: "post",
      data: {
        buyingHistoryId: this.state.buyingHistoryId,
        mobile: this.state.phoneState,
        smsVerifyCode: this.state.verificationState,
        "userCode": this.state.userCode,
        "activityProductId": this.state.acId
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.success == true) {
          if (data.isNew == true) {
            this.setState({
              isNewState: 0,
              bargainPrice: data.bargainPrice
            }, function() {
              $("." + mmhc.newUser).slideDown();
            })
          } else {
            this.setState({
              isNewState: 1,
              bargainPrice: data.bargainPrice
            }, function() {
              window.location.href = "/activityBargainForHimclOver.html?bargainPrice=" + this.state.bargainPrice;
            })
          }
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.registerTitle}>
          {this.state.fromHome==1?<a href="back" className={mmhc.backImgI}><img src={backImg} alt=""/></a>:<a href="javascript:history.go(-1);" className={mmhc.backImgI}><img src={backImg} alt=""/></a>}
          呼朋唤友来砍价
        </div>
        
        <div className={cNs(mmhc.register,this.state.zhuCe)}>
          <input onFocus={this.phoneFunFocus} onBlur={this.phoneFunBlur} onChange={this.changePhone} ref="phoneNum" placeholder="请输入手机号码" className={cNs(mmhc.phone,this.state.stateCss==1?mmhc.phoneActive:"")} type="text"/>
          <div className={mmhc.pictureVerification}>
            <input onChange={this.verifyFun} ref="verifyRef" placeholder="请输入图文验证码" type="text"/>
            <div className={mmhc.pictureVerificationRight}>
              <div className={mmhc.nextverificationLeft}>
                <img src={path+"/register/verify.html?t="+this.state.randomNumber} alt=""/>
              </div>
              <div onClick={this.randomNumberFun} className={mmhc.nextverification}>换一张</div>
              <div className={mmhc.clear}></div>
            </div>
            <div className={mmhc.clear}></div>
          </div>
          <div className={mmhc.Verification}>
            <input onFocus={this.phoneFunFocus} onBlur={this.phoneFunBlur} onChange={this.changeVerification} ref="verificationNum" placeholder="请输入验证码" type="text"/>
            <div className={mmhc.yanZhengMa}>
              <div onClick={this.getVerification} className={cNs(mmhc.timefont,mmhc.msgBorder)}>{this.state.numState}</div>
              <div onClick={this.getVerificationYuYin} className={mmhc.timefont}>{this.state.yuYinState}</div>
              <div className={mmhc.clear}></div>
            </div>
            <div className={mmhc.clear}></div>
          </div>
          <div className={mmhc.newUser}>
            <input style={{"display":"none"}} type="text"/>
            <input onFocus={this.phoneFunFocus} onBlur={this.phoneFunBlur} onChange={this.changePassword} ref="passowrdNum" placeholder="请输入密码" className={mmhc.passwordCss} type="password"/>
            <input onFocus={this.phoneFunFocus} onBlur={this.phoneFunBlur} onChange={this.changeRePassword} ref="repassowrdNum" placeholder="请再次输入新密码" className={mmhc.repasswordCss} type="password"/>
          </div>
          {this.state.isNewState==1?<div onClick={this.nextFun} className={mmhc.button}>下一步</div>:<div onClick={this.noEmpty} className={mmhc.button}>注&nbsp;&nbsp;&nbsp;&nbsp;册</div>}
          <div style={{"display":this.state.isNewState==1?"none":"block"}} className={mmhc.registerBottom}>
            <div className={mmhc.agreement}>
              <div onClick={this.agreeInput} className={cNs(mmhc.agreInput,this.state.agreementInput)}></div>
              <div className={mmhc.agreText}>
                <a onClick={this.agreementText} href="javascript:void(0)">服务协议</a>
              </div>
              <div className={mmhc.clear}></div>
            </div>
            {/*<div className={mmhc.load}>已有账号？<a href="login">去登录</a></div>*/}
            <div className={mmhc.clear}></div>
          </div>
        </div>
        
        <RegistrationAgreement agreementQuit1={this.agreementQuit} agreementQuit={this.state.agreementQuit}/>
      </div>
    )
  },
  componentDidMount: function() {
    $(window).resize(function() {
      if ($("." + mmhc.register).height() > 350) {
        this.setState({
          stateCss: 0
        })
      } else {
        this.setState({
          stateCss: 1
        })
      }
    }.bind(this));

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var prdCode = GetQueryString("userCode");
    var userType = GetQueryString("userType");
    var code = GetQueryString("code");
    //一元购隐藏域
    var acId = GetQueryString("activityProductId");
    var bhId = GetQueryString("buyingHistoryId");
    /*var userCode = GetQueryString("userCode");
    var userType = GetQueryString("userType");*/
    var sign = GetQueryString("sign");
    var fromHome = GetQueryString("apk");
    var userChannelUrl = GetQueryString("userChannel");
    var uc = GetQueryString("uc");
    var nc = GetQueryString("nc");
    var buyingHistoryId = GetQueryString("buyingHistoryId");
    var userChannel = "";
    if (uc != null) {
      userChannel = uc;
    };
    if (nc != null) {
      userChannel = nc;
    };
    if (userChannelUrl != null) {
      userChannel = userChannelUrl;
    };

    userType = decodeURIComponent(userType);
    this.setState({
      userCode: prdCode,
      userType: userType,
      code: code,
      acId: acId,
      bhId: bhId,
      sign: sign,
      fromHome: fromHome,
      userChannel: userChannel,
      buyingHistoryId: buyingHistoryId
    });
  },
});

module.exports = CouponRegisterContent;