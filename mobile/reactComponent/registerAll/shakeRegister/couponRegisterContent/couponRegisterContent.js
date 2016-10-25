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
var backImg = require("./back.png");
var bannerImg = require("./shakeanner.jpg");

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
      verifyNumState: ""
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
      url: "/doregister.json",
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
        if (data == true) {
          /*alert("领取成功");*/
          window.location.href = "/weixin/couponRegisterSuccess.html"
        } else {
          alert(data);
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
                ajaxStateMsg: 1
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
                ajaxStateYuYin: 1
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
  render: function() {
    return (
      <div>
        <div className={cNs(mmhc.banner,this.state.zhuCe)}>
          <img src={bannerImg} alt=""/>
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
          <input style={{"display":"none"}} type="text"/>
          <input onFocus={this.phoneFunFocus} onBlur={this.phoneFunBlur} onChange={this.changePassword} ref="passowrdNum" placeholder="请输入密码" className={mmhc.passwordCss} type="password"/>
          <input onFocus={this.phoneFunFocus} onBlur={this.phoneFunBlur} onChange={this.changeRePassword} ref="repassowrdNum" placeholder="请再次输入新密码" className={mmhc.repasswordCss} type="password"/>
          <div onClick={this.noEmpty} className={mmhc.button}>立即领取</div>
          
        </div>
        <div className={mmhc.huodong}>
          <div className={mmhc.huodongTitle}>活动规则</div>
          <div className={mmhc.huodongContent}>
            <p>1、新注册用户及未参与过1元购的用户，每个ID仅限抢购1个商品且限购1次;</p>
            <p>2、参与过本场或之前1元购的用户，如想再次抢购，需分享该商品二维码，分享给3位好友注册成功后，方可购买;</p>
            <p>3、支付完成送100元抵用券，抵用券仅限100元抵用券专场活动使用，使用时间：5月18日至5月22日;</p>
            <p>4、支付完成送50积分，积分可抵现金;</p>
            <p>5、本场商品全部包邮;</p>
            <p>6、本场商品参与整点购物享免单活动。</p>
            <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
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
    var acId = GetQueryString("acId");
    var bhId = GetQueryString("bhId");
    /*var userCode = GetQueryString("userCode");
    var userType = GetQueryString("userType");*/
    var sign = GetQueryString("sign");
    var fromHome = GetQueryString("fromHome");
    var uc = GetQueryString("uc");
    var userChannelUl = GetQueryString("userChannel");
    var nc = GetQueryString("nc");
    var userChannel = "";
    if (uc != null) {
      userChannel = uc;
    };
    if (userChannelUl != null) {
      userChannel = userChannelUl;
    };
    if (nc != null) {
      userChannel = nc;
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
      userChannel: userChannel
    });
  },
});

module.exports = CouponRegisterContent;