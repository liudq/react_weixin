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
var ProLists = React.createClass({
  getInitialState: function() {
    return {
      activityState: this.props.initActivityState,
      bok: true,
      cashBackPrice: this.props.cashBackPrice
    };
  },
  fnChose: function() {
    this.props.callbackParent(this.props.data.name, true, this.props.data.annualRate, this.props.data.term, this.props.data.minBuy, this.props.data.code, this.props.data.maxBuy);
    this.setState({
      bok: true,
      activityState: this.props.data.name
    }, function() {
      var price = Math.floor((this.state.priceState * (this.props.data.annualRate / (100 * 12)) * this.props.data.term) * 100) / 100;
      this.setState({
        cashBackPrice: price
      });
    });
  },
  render: function() {
    return (
      <li onClick={this.fnChose}>{this.props.data.name}</li>
    )
  }
});
var OrderPay = React.createClass({
  getInitialState: function() {
    return {
      bok: true,
      bok2: false,
      bok3: true,
      setBok: true,
      findBok: true,
      priceState: "",
      activityState: "",
      cashBackPrice: "",
      setPwdState: "",
      setPwdConfim: "",
      passwordText: "6-20位字符，含大小字母、数字和下划线",
      num: 60,
      num1: 60,
      messCodeState: "",
      findPwdState: "",
      findPwdConfimState: "",
      finPoductCode: "",
      orderSuccessVO: "",
      payAmount: "",
      balance: "",
      proList: [],
      term: "",
      term2: "",
      balancePwd: "",
      payPwdState: "",
      code: "",
      paySessionstr: "",
      fromType: "",
      min: "",
      max: "",
      SH: true,
      messageVal: "短信",
      messageVal1: "语音",
      joinActState: "",
      tipsBok: true,
      payUrl: "/member/payHeepayNew.html",
      versionTitel: 0
    }
  },
  fnClickME: function() {
    this.setState({
      tipsBok: !this.state.tipsBok
    });
  },
  onChildChanged: function(newState, newBok, newAnnualRate, newTerm, nuwMin, numCode, newMax) {
    this.setState({
      activityState: newState,
      bok: newBok,
      annualRate: newAnnualRate,
      term: newTerm,
      min: nuwMin,
      code: numCode,
      max: newMax
    }, function() {
      if (this.state.balance < this.state.payAmount) {
        var cha = (this.state.payAmount - this.state.balance).toFixed(2);
        this.setState({
          priceState: cha < this.state.min ? this.state.min : cha,
          min: cha < this.state.min ? this.state.min : cha
        }, function() {
          this.setState({
            cashBackPrice: Math.floor(this.state.priceState * (this.state.annualRate / (100 * 12)) * this.state.term * 100) / 100
          });
        });
      } else {
        this.setState({
          priceState: this.state.min,
          min: this.state.min
        }, function() {
          this.setState({
            cashBackPrice: Math.floor(this.state.priceState * (this.state.annualRate / (100 * 12)) * this.state.term * 100) / 100
          });
        });
      }
    });
  },
  fnChange: function(event) {
    this.setState({
      priceState: event.target.value
    }, function() {
      var price2 = Math.floor(this.state.priceState * (this.state.annualRate / (100 * 12)) * this.state.term * 100) / 100;
      this.setState({
        cashBackPrice: price2
      });
    });
  },
  fnBlur: function(event) {
    this.setState({
      priceState: event.target.value
    });
  },
  showHide: function() {
    this.setState({
      bok: !this.state.bok
    });
  },
  agrShow: function() {
    this.setState({
      bok2: !this.state.bok2
    });
  },
  agreeBTN: function() {
    this.setState({
      bok3: !this.state.bok3
    })
  },
  closeAgreementMask: function() {
    this.setState({
      bok2: false,
      setBok: true,
      findBok: true,
      tipsBok: true
    });
  },
  fnSetPwd: function() {
    this.setState({
      setBok: !this.state.setBok
    });
  },
  fnFindPwd: function() {
    this.setState({
      findBok: !this.state.findBok
    });
  },
  fnSetInpC: function(event) {
    this.setState({
      setPwdState: event.target.value
    });
  },
  fnSetInp: function(event) {
    this.setState({
      setPwdState: event.target.value
    });
  },
  fnSetConfim: function(event) {
    this.setState({
      setPwdConfim: event.target.value
    });
  },
  fnSetConfimC: function(event) {
    this.setState({
      setPwdConfim: event.target.value
    });
  },
  fnSetSubmit: function() {
    if (this.state.setPwdState == "" || this.state.setPwdConfim == "") {
      alert("输入不能为空");
    }
    if (this.state.setPwdConfim != "" && this.state.setPwdState != "") {
      var length = this.state.setPwdState.length;
      if (length < 6 || length > 20) {
        alert("6-20位字符，建议由字母、数字、符号两种以上组成");
        return false;
      }
      if (this.state.setPwdState != this.state.setPwdConfim) {
        alert("两次密码不一致");
        return false;
      }
      $.ajax({
        type: jsonPath.method,
        url: jsonPath.path + "/member/savebalancepasswordnew.json",
        data: {
          "password": this.state.setPwdState
        },
        success: function(data) {
          if (data.success) {
            alert("密码设置成功~")
            this.setState({
              setBok: true
            }, function() {
              $("." + mmhc.mySubmit).css("background", "#f8c301");
            });
          } else {
            alert("密码设置失败了")
            this.setState({
              setBok: true
            });
          }
        }.bind(this),
        dataType: "json"
      });
    }
  },
  countDown: function() {
    var timer = null;
    var num = this.state.num;
    num--;
    this.setState({
      num: num,
      messageVal: num,
    }, function() {
      if (this.state.num == 0) {
        clearInterval(this.timer);
        this.setState({
          messageVal: "重发",
          num: 60
        });
      }
    });
  },
  countDown1: function() {
    var timer1 = null;
    var num1 = this.state.num1;
    num1--;
    this.setState({
      num1: num1,
      messageVal1: num1,
    }, function() {
      if (this.state.num1 == 0) {
        clearInterval(this.timer1);
        this.setState({
          messageVal1: "重发",
          num1: 60
        });
      }
    });
  },
  fnSendMess: function() {
    $("." + mmhc.myLoadMask).css("display", "block");
    $("." + mmhc.myLoadimg).css("display", "block");
    $.ajax({
      type: jsonPath.method,
      url: jsonPath.path + "/member/retrieve/sendBalancePwdCode.json?sendType=0",
      success: function(data) {
        clearInterval(this.timer);
        if (data.rst == 1) {
          this.countDown();
          this.timer = setInterval(this.countDown, 1000);
        } else {
          alert("短信验证码发送失败");
        }
        $("." + mmhc.myLoadMask).css("display", "none");
        $("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this),
      dataType: "json"
    });
  },
  fnSendVoi: function() {
    $("." + mmhc.myLoadMask).css("display", "block");
    $("." + mmhc.myLoadimg).css("display", "block");
    $.ajax({
      type: jsonPath.method,
      url: jsonPath.path + "/member/retrieve/sendBalancePwdCode.json?sendType=1",
      success: function(data) {
        clearInterval(this.timer1);
        if (data.rst == 1) {
          this.countDown1();
          this.timer1 = setInterval(this.countDown1, 1000);
        } else {
          alert("短信验证码发送失败")
        }
        $("." + mmhc.myLoadMask).css("display", "none");
        $("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this),
      dataType: "json"
    });
  },
  fnClose: function() {
    this.setState({
      setBok: true
    });
  },
  fnClose1: function() {
    this.setState({
      findBok: true
    });
  },
  fnMessCode: function(event) {
    this.setState({
      messCodeState: event.target.value
    });
  },
  fnMessCodeC: function(event) {
    this.setState({
      messCodeState: event.target.value
    });
  },
  fnFindPwdInpC: function(event) {
    this.setState({
      findPwdState: event.target.value
    });
  },
  fnFindPwdInp: function(event) {
    this.setState({
      findPwdState: event.target.value
    });
  },
  fnFindPwdConfimC: function(event) {
    this.setState({
      findPwdConfimState: event.target.value
    });
  },
  fnFindPwdConfim: function(event) {
    this.setState({
      findPwdConfimState: event.target.value
    });
  },
  fnFindSubmit: function() {
    if (this.state.findPwdState == "" || this.state.findPwdConfimState == "" || this.state.messCodeState == "") {
      alert("输入不能为空");
    }
    if (this.state.findPwdState != "" && this.state.findPwdConfimState != "" && this.state.messCodeState != "") {
      var length = this.state.findPwdState.length;
      if (length < 6 || length > 20) {
        alert("6-20位字符，建议由字母、数字、符号两种以上组成");
        return false;
      }
      if (this.state.findPwdState != this.state.findPwdConfimState) {
        alert("两次密码不一致");
        return false;
      }
      $.ajax({
        type: jsonPath.method,
        url: jsonPath.path + "/member/updateBalancePwd.json",
        data: {
          mobileVerifyCode: this.state.messCodeState,
          balancePassword: this.state.findPwdState
        },
        success: function(data) {
          if (data.verificationInfo == 1) {
            alert("密码设置成功~");
            this.setState({
              findBok: true
            })
          } else {
            alert("密码设置失败了");
          }
        }.bind(this),
        dataType: "json"
      });
    }
  },
  fnPayPwdC: function(event) {
    this.setState({
      payPwdState: event.target.value
    });
  },
  fnPayPwd: function(event) {
    this.setState({
      payPwdState: event.target.value
    });
  },
  fnSubmit: function() {
    if (this.state.balancePwd == "" || this.state.payPwdState == "") {
      alert("输入不能为空");
      return false;
    };
    if (this.state.priceState > this.state.max) {
      alert("输入不能大于最大金额");
      return false;
    };
    if (this.state.bok3 != true) {
      alert("您阅读《蜜麻花充值活动返现协议》了吗？");
      return false;
    }
    // var length = this.state.payPwdState.length;
    // if (length < 6 || length > 20) {
    //   alert("6-20位字符，建议由字母、数字、符号两种以上组成");
    //   return false;
    // }
    // var num1 = parseFloat(this.state.priceState);
    // var num2 = parseFloat(this.state.balance);
    // var num3 = parseFloat(this.state.payAmount);
    // if ((num1 + num2) < this.state.payAmount) {
    //   alert("您的花币不足以支付此订单");
    //   return false;
    // }
    $.ajax({
      type: jsonPath.method,
      url: jsonPath.path + "/order/checkbalancepwd.html",
      data: {
        balancePwd: this.state.payPwdState
      },
      success: function(data) {
        if (data.success == true) {
          this.setState({
            correct: data.data.correct,
            errcount: parseInt(data.data.pwdErrCount)
          });
          if (this.state.errcount >= 6) {
            alert("您支付密码输错超过6次，请稍后再试");
            return false;
          }
          if (!this.state.correct) {
            alert("您输入的支付密码不正确，您最多还可以输入" + (6 - this.state.errcount) + "次");
            return false;
          }
          if (this.state.paymentCode == "ALIPAY") {
            $.ajax({
              type: jsonPath.method,
              url: jsonPath.path + "/alipay.json",
              data: $('#myForm').serialize(),
              success: function(data) {
                if (data.flag == "huabi") {
                  window.location.href = "/linepay.html"
                  return false;
                }
                if (data.flag == "success") {
                  var orderInfo = data.orderInfo;
                  var sign = data.sign;
                  window.location.href = "aweekAlipayApp," + orderInfo + "," + sign;
                  return false;
                } else {
                  alert(data.info);
                  return false;
                }
              }.bind(this),
              dataType: "json"
            });
            return false;
          } else if (this.state.paymentCode == "WXPAY") {
            $.ajax({
              type: jsonPath.method,
              url: jsonPath.path + "/wxpay.json",
              data: $('#myForm').serialize(),
              success: function(data) {
                if (data.flag == "huabi") {
                  window.location.href = "/linepay.html"
                  return false;
                }
                if (data.flag == "success") {
                  var orderInfo = data.message;
                  var sign = data.sign;
                  window.location.href = "aweekWXpayApp," + sign + "," + data.message.appid + "," + data.message.timestamp + "," + data.message.partnerid + "," + data.message.package + "," + data.message.noncestr + "," + data.message.prepayid;
                  return false;
                } else {
                  alert(data.info);
                  return false;
                }
              }.bind(this),
              dataType: "json"
            });
            return false;
          } else {
            $("#myForm").submit();
          }
        } else {
          alert(data.message);
          return false;
        }
      }.bind(this),
      error: function() {
        alert("支付密码验证失败");
      },
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={mmhc.container}>
        {/*<div className={CNs(mmhc.orderPayPage,mmhc.clearfix,this.state.versionTitel==1?mmhc.titel12:"")}>
          <a className={this.state.versionTitel==1?mmhc.back2:mmhc.back} href="javascript:history.back()"></a>
          <p>订单支付</p>
        </div>*/}        
        <div className={CNs(mmhc.mRow,mmhc.orderNum)}>
          <div className={CNs(mmhc.orderNumL,mmhc.clearfix)}>
            <p className={mmhc.orderNumS}>订单号：</p>
            <p>{this.state.orderSuccessVO}</p>
          </div>
          <div className={CNs(mmhc.myPay,mmhc.clearfix)}>
            <p className={mmhc.orderPayPrice}>应付余额：<i className={mmhc.priceRed}>{this.state.payAmount}元</i></p>          
            <p onClick={this.fnClickME} className={mmhc.isMe}>什么是花币?预存？</p>
          </div>
          <p className={mmhc.myHour}>请您在提交订单后24小时内完成支付，否则订单会自动取消</p>
          <div className={CNs(mmhc.whatHB,this.state.tipsBok==true?mmhc.hide:mmhc.show)}>
            <h4>1.什么是花币?</h4>
            <p>花币是用户在蜜麻花商城购物时使用的虚拟货币，可直接用于支付蜜麻花商城订单。</p>
            <h4>2.预存到期如何返利？</h4>
            <p>预存到期后，按照全部预存金额（包括已经消费的部分），获得一定比例的返现，并退还未消费金额。</p>
            <p>一笔钱做两笔花，消费赚钱两不误！</p>
          </div>
        </div>
        <div className={CNs(mmhc.mRow,mmhc.nowHB)}>
          <p>您账户当前花币余额：<i className={mmhc.priceRed}>{this.state.balance}</i>花币。{this.state.joinActState}</p>
        </div> 
        <div className={CNs(this.state.SH==true?mmhc.show:mmhc.hide)}>
          <div className={CNs(mmhc.mRow,mmhc.clearfix)}>
            <div className={mmhc.financeProM}>
              <div className={mmhc.clearfix}>
                <h3>活动名称：</h3>
                <div className={CNs(mmhc.financeProCon,mmhc.clearfix)}>
                  <div className={mmhc.choosePro}>
                    <div className={mmhc.chooseInpCon}>{this.state.activityState}</div>
                    <i className={mmhc.downPush} onClick={this.showHide}></i>
                    <ul className={CNs(mmhc.choseProList,this.state.bok==true?mmhc.hide:mmhc.show)}>
                      {
                        this.state.proList.map(function(proLists,index){
                          return <ProLists key={index} data={proLists} callbackParent={this.onChildChanged} initActivityState={this.state.activityState} initBok={this.state.bok} cashBackPrice={this.state.cashBackPrice}/>;
                        }.bind(this))
                      }
                    </ul>
                  </div>          
                </div>
              </div>
              <div className={mmhc.priceCon}>
                <div className={CNs(mmhc.inpPriceCon,mmhc.clearfix)}>                  
                  <p className={mmhc.inpPrice}>预存金额：<input onBlur={this.fnBlur} onChange={this.fnChange} type="text" value={this.state.priceState}/> 元</p> 
                  <p className={mmhc.cashBack}>返现金额：<i className={mmhc.priceRed}>{this.state.cashBackPrice}元</i></p>     
                </div>
                <p className={mmhc.tips}>输入范围{this.state.min}-{this.state.max}元（购买金额越多返现越多~）</p> 
              </div>
            </div>
          </div>
        </div>
        <div className={mmhc.readWordCon}>
          <div className={mmhc.readWord}>
            <div className={CNs(this.state.bok3==true?mmhc.agree1:mmhc.agree)} onClick={this.agreeBTN}></div>
            <p className={mmhc.deal}>我已阅读并同意签署<a onClick={this.agrShow} href="javascript:;">《蜜麻花充值活动返现协议》</a></p>
          </div>
        </div>
        <div onClick={this.closeAgreementMask} className={CNs(mmhc.agreementMask,this.state.tipsBok==true?mmhc.hide:mmhc.show,this.state.bok2==true?mmhc.show:mmhc.hide,this.state.setBok==true?mmhc.hide:mmhc.show,this.state.findBok==true?mmhc.hide:mmhc.show)}></div>
        <div className={CNs(mmhc.agreementPanel,this.state.bok2==true?mmhc.show:mmhc.hide)}>
          <h1>蜜麻花充值返现活动协议</h1>
          <p>尊敬的客户，为保障您的合法权益，请您在参加充值返现活动前仔细阅读本协议。在您点击“充值”按钮后，我们将默认您已知悉且认同如下活动条款视为我们双方共同认可的协议共同遵守。</p>
          <h2>1.平台活动时间</h2>
          <p>2016年3月21日起至2016年9月20日止。</p>
          <h2>2.活动内容</h2>
          <p>为回馈新用户，更好的提高用户资金使用效率，规划消费，完成平台注册的客户可根据参与的活动形式（充值期限）获得充值返现（充值金额从1元起，余额达到20000元封顶）。
          <p>活动形式分为三种：</p>
          </p>
          <p>1）注册用户参加30天活动，自充值之日起30天后获取充值额度的年度的6.5%的活动返现；</p>
          <p>2）注册用户参加90天活动，自充值之日起90天后获取充值额度的年度的8%的活动返现；</p>
          <p>3）注册用户参加180天活动，自充值之日起180天后获取充值额度的年度的9%的活动返现。</p>
          <h2>3.活动规则</h2>
          <p>参与充返活动的客户，必须在蜜麻花平台上注册并点击同意充值返现活动协议。</p>
          <h2>4.充值方式</h2>
          <p>在线充值:电脑或手机登录蜜麻花平台点击“账户充值”。 </p>
          <h2>5.关于身份认证</h2>
          <p>为保障您的财产安全，我们需要您提供身份信息和联系方式，我们会对您的信息进行严格保密，请您放心提供。 </p>
          <h2>6.账户余额构成</h2>
          <p>您实际支付的充值本金加上蜜麻花的返现金额会构成您的账户余额（人民币）。例如通过注册充值后，您实际充值了1000元，加上蜜麻花返现金额的100元，您的余额将会是1100元。 </p>
          <h2>7.账户余额使用规则</h2>
          <p>余额可用于购买蜜麻花商城所有商品。参与活动到期后，用户需要提前1个工作日提出提现申请。</p>
          <h2>8.发票金额</h2>
          <p>按实际收取的金额开具发票，赠送金额不能开具发票。</p>
          <h2>9.特别声明</h2>
          <p>充值返现活动仅提供给在蜜麻花商城购买商品的客户。活动中，按照蜜麻花现行的风控规则，一旦发现作弊行为(包括且不限于利用商城进行套利等)，蜜麻花有权取消相关账户活动返现金额、追回作弊所得、回收账号使用权，最终可退款金额=用户充值金额-订单消费金额全额。蜜麻花保留取消作弊人后续参与蜜麻花任何活动的权利，必要时会追究其法律责任。 </p>
          <h2>10.本次充值返现活动的最终解释权归北京蜜麻花网络科技有限公司所有。</h2>
          <h2>11.争议解决</h2>
          <p>执行本协议所发生的或与本协议有关的一切争议，双方应通过友好协商解决。如双方通过协商不能达成一致时，应向北京蜜麻花网络科技有限公司所在地人民法院提起诉讼。</p>
        </div>
        <div className={CNs(mmhc.orderPayCon)}>
        <form id="myForm" action="/member/payHeepayNew.html" method="post">
          <div className={mmhc.hiddenBox}>
            <input type="text" name="finPoductCode" value={this.state.code}/>
            <input type="text" name="relationOrderSn" value={this.state.orderSuccessVO}/>
            <input type="text" name="paySessionstr" value={this.state.paySessionstr}/>
            <input type="text" name="money" value={this.state.priceState}/>
            <input type="text" name="paymentName" value={this.state.paymentName}/>
            <input type="text" name="paymentCode" value={this.state.paymentCode}/>
          </div>
          <div className={CNs(mmhc.payPassword,mmhc.clearfix)}>
            <p className={mmhc.payPasswordInp}>支付密码：<input onBlur={this.fnPayPwd} onChange={this.fnPayPwdC} value={this.state.payPwdState} name="balancePassword" type="password"/></p>
            <p>没有？<b onClick={this.fnSetPwd}>设置支付密码</b>/<b onClick={this.fnFindPwd}>忘记支付密码</b></p>
          </div>
          <div className={mmhc.mySubmitCon}>
            <div onClick={this.fnSubmit} className={mmhc.mySubmit}>立即支付</div>
          </div>
          <div className={CNs(mmhc.setPwd,mmhc.clearfix,this.state.setBok==true?mmhc.hide:mmhc.show)}>
            <div className={mmhc.inputPwd}>
              <p>输入密码<input onBlur={this.fnSetInp} onChange={this.fnSetInpC} value={this.state.setPwdState} type="password"/></p>
              <p>确认密码<input onBlur={this.fnSetConfim} onChange={this.fnSetConfimC} value={this.state.setPwdConfim} type="password"/></p>
              <p onClick={this.fnSetSubmit} className={mmhc.setSubmit}>提交</p>
            </div>
            <p className={mmhc.inputPwdTips}>温馨提示：</p>
            <p className={mmhc.tipsCon}>为了您的帐号安全及财产安全建议您设置的支付密码与登录密码不同。密码规格为6-20位字符，最好由字母、数字、符号两种以上组成</p>
            <p className={mmhc.myClose} onClick={this.fnClose}></p>
          </div>
          <div className={CNs(mmhc.findPwd,mmhc.clearfix,this.state.findBok==true?mmhc.hide:mmhc.show)}>
            <div className={mmhc.inputPwd}>
              <p className={mmhc.phoneCode}>校验码<input onBlur={this.fnMessCode} onChange={this.fnMessCodeC} value={this.state.messCodeState} type="text"/><a className={mmhc.sendMess} onClick={this.fnSendMess} href="javascript:;">{this.state.messageVal}</a><a className={mmhc.sendVoi} onClick={this.fnSendVoi} href="javascript:;">{this.state.messageVal1}</a></p>
              <div className={mmhc.myLoadMask}></div>
              <img className={mmhc.myLoadimg}src={myLoadPic} alt=""/>
              <p>输入密码<input onBlur={this.fnFindPwdInp} onChange={this.fnFindPwdInpC} value={this.state.findPwdState} type="password"/></p>
              <p>确认密码<input onBlur={this.fnFindPwdConfim} onChange={this.fnFindPwdConfimC} value={this.state.findPwdConfimState} type="password"/></p>
              <p onClick={this.fnFindSubmit} className={mmhc.setSubmit}>提交</p>
            </div>
            <p className={mmhc.inputPwdTips}>温馨提示：</p>
            <p className={mmhc.tipsCon}>为了您的帐号安全及财产安全建议您设置的支付密码与登录密码不同。密码规格为6-20位字符，最好由字母、数字、符号两种以上组成</p>
            <p className={mmhc.myClose} onClick={this.fnClose1}></p>
          </div>
          </form>
        </div>      
      </div>
    )
  },
  componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    }
  },
  componentDidMount: function() {
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
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
    if (!urlParam4 == "" && !urlParam5 == "") {
      this.setState({
        paymentName: urlParam4,
        paymentCode: urlParam5
      });
    }
    $.ajax({
      // url: "/json/order/toPay.json",
      // type: "get",
      url: jsonPath.path + "/order/toPay.json",
      type: jsonPath.method,
      data: {
        relationOrderSn: urlParam,
        paySessionstr: urlParam2 === undefined ? "" : urlParam2,
        rid: urlParam3
      },
      success: function(data) {
        if (data.member.balancePwd == "" || data.member.balancePwd == null || data.member.balancePwd == undefined) {
          $("." + mmhc.mySubmit).css("background", "#ccc");
        } else {
          $("." + mmhc.mySubmit).css("background", "#f8c301")
        }
        if (data.member) {
          //data.payAmount = Math.floor(data.payAmount * 100) / 100;
          if (data.member.balance == 0) {
            var cha2 = Math.floor((data.payAmount - data.member.balance) * 100) / 100;
            this.setState({
              joinActState: "您没有花币呀，请参加下面预存活动，兑换成花币吧！",
              min: Math.floor((data.payAmount - data.member.balance) * 100) / 100,
              priceState: cha2 < data.finProductsList[0].minBuy ? data.finProductsList[0].minBuy : cha2

            }, function() {
              this.setState({
                cashBackPrice: Math.floor((this.state.priceState * (data.finProductsList[0].annualRate) / (100 * 12)) * data.finProductsList[0].term * 100) / 100
              });
            });
          } else if (data.member.balance < data.payAmount) {
            this.setState({
              joinActState: "您的花币不够啦，请参加下面预存活动，兑换成花币吧！",
              min: (data.payAmount - data.member.balance).toFixed(2),
              priceState: (data.payAmount - data.member.balance).toFixed(2),
              cashBackPrice: parseFloat((data.payAmount - data.member.balance) * ((data.finProductsList[0].annualRate) / (100 * 12)) * data.finProductsList[0].term).toFixed(2)
            });
          } else {
            this.setState({
              joinActState: "您的花币足够支付此订单啦~",
              min: Math.floor(data.finProductsList[0].minBuy * 100) / 100,
              priceState: "", //Math.floor(data.finProductsList[0].minBuy * 100) / 100,
              cashBackPrice: "" //Math.floor((data.finProductsList[0].minBuy) * ((data.finProductsList[0].annualRate) / (100 * 12)) * data.finProductsList[0].term * 100) / 100
            });
          }
        }
        this.setState({
          orderSuccessVO: data.relationOrderSn,
          paySessionstr: data.paySessionstr,
          fromType: data.fromType,
          payAmount: data.payAmount.toFixed(2),
          balancePwd: data.member.balancePwd,
          balance: data.member.balance,
          proList: data.finProductsList,
          activityState: data.finProductsList[0].name,
          term: data.finProductsList[0].term,
          annualRate: data.finProductsList[0].annualRate,
          code: data.finProductsList[0].code,
          // min: data.finProductsList[0].minBuy,
          max: data.finProductsList[0].maxBuy
        });
      }.bind(this),
      dataType: "json"
    });
  }
});
module.exports = OrderPay;