var React = require("react");
var mmhc = require("./register.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var backImg = require("./order2.png");
var duiGouImg = require("./duiGou.png");
var RegisterSecend = require("./registerSecond/registerSecond.js");
var RegistrationAgreement = require("./registrationAgreement/registrationAgreement.js");
// var PromptBox = require("./promptBox/promptBox.js");



var Register = React.createClass({
  getInitialState: function() {
    return {
      agreementInput: mmhc.agreementInput,
      next: mmhc.nextFalse,
      phone: "",
      registerFirst: mmhc.block,
      registerSecend: mmhc.none,
      agreementQuit: mmhc.none,
      zhuCe: mmhc.block
        // text: ""
    }
  },
  agreeInput: function() {
    if (this.state.agreementInput == mmhc.agreementInput) {
      this.setState({
        agreementInput: mmhc.agreInput
      }, function() {
        if (this.state.phone != "" && this.state.agreementInput == mmhc.agreementInput) {
          this.setState({
            next: mmhc.next
          })
        } else {
          this.setState({
            next: mmhc.nextFalse
          })
        }
      });
    } else {
      this.setState({
        agreementInput: mmhc.agreementInput
      }, function() {
        if (this.state.phone != "" && this.state.agreementInput == mmhc.agreementInput) {
          this.setState({
            next: mmhc.next
          })
        } else {
          this.setState({
            next: mmhc.nextFalse
          })
        }
      });
    }
  },
  changePhone: function(event) {
    this.setState({
      phone: event.target.value
    }, function() {
      if (this.state.phone != "" && this.state.agreementInput == mmhc.agreementInput) {
        this.setState({
          next: mmhc.next
        })
      } else {
        this.setState({
          next: mmhc.nextFalse
        })
      }
    });
  },
  nextClick: function() {
    if (this.state.phone != "" && this.state.agreementInput == mmhc.agreementInput) {
      // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      var myreg = /^\d{11}$/g;
      if (!myreg.test(this.state.phone)) {
        // this.setState({
        //   text: "请输入正确的手机号"
        // });

        alert("请输入正确的手机号");
        return false;
      };
      $.ajax({
        type: 'get',
        // url: "json/cart/addtocart.json",
        url: "/mobileIsExist.json",
        data: {
          "mobile": this.state.phone
        },
        error: function() {
          alert("请求数据失败");
        },
        success: function(data) {
          if (!data) {
            alert(data);
          } else {
            $.ajax({
              type: 'post',
              // url: "json/cart/addtocart.json",
              url: "/smsVertifyCode.json",
              data: {
                "mobile": this.state.phone
              },
              error: function() {
                alert("请求数据失败");
              },
              success: function(data) {
                if (data) {
                  this.setState({
                    registerFirst: mmhc.none,
                    registerSecend: mmhc.block
                  })
                } else {
                  alert("发送验证码失败");
                }
              }.bind(this),
              dataType: "json"
            });
          }
        }.bind(this),
        dataType: "json"
      });
    };
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
  render: function() {
    return (
      <div>
        <div className={cNs(mmhc.myContent,this.state.zhuCe)}>
          <div className={mmhc.title}>
            <a href="javascript:history.back()" className={mmhc.back}><img className={mmhc.backImg} src={backImg} alt=""/></a>
            注册  
          </div>
          <div className={cNs(mmhc.content,this.state.registerFirst)}>
            <div className={mmhc.phoneDiv}>
              <input onChange={this.changePhone} ref="phoneInput" className={mmhc.phoneInput} type="text" placeholder="请输入手机号" />
            </div>
            <div className={mmhc.agreement}>
              <div onClick={this.agreeInput} className={cNs(mmhc.agreInput,this.state.agreementInput)}></div>
              <div className={mmhc.agreText}>
                同意
                <a onClick={this.agreementText} href="javascript:void(0)">蜜麻花注册协议</a>
              </div>
            </div>
            <div onClick={this.nextClick} className={this.state.next}>下一步</div>
          </div>
          <RegisterSecend phone={this.state.phone} registerSecend={this.state.registerSecend} />
        </div>
        <RegistrationAgreement agreementQuit1={this.agreementQuit} agreementQuit={this.state.agreementQuit} />
    { /* <PromptBox opacity={this.state.opacity} text={this.state.text}/>*/ }
      </div>
    )
  },
});

module.exports = Register;