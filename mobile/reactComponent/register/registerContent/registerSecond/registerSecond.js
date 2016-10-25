var React = require("react");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./registerSecond.css");

var RegisterSecend = React.createClass({
  getInitialState: function() {
    return {
      smsCode: "",
      password: "",
      repassword: "",
      registerButton: mmhc.section5Flase,
      num: 60,
      numState: "重新发送",
      timeCss: mmhc.timeActive,
      userCode: "",
      userType: ""
    }
  },
  changePassword: function(event) {
    this.setState({
      password: event.target.value
    }, function() {
      if (this.state.smsCode != "" && this.state.password != "" && this.state.repassword != "") {
        this.setState({
          registerButton: mmhc.section5
        })
      } else {
        this.setState({
          registerButton: mmhc.section5Flase
        })
      }
    })
  },
  changeRepassword: function(event) {
    this.setState({
      repassword: event.target.value
    }, function() {
      if (this.state.smsCode != "" && this.state.password != "" && this.state.repassword != "") {
        this.setState({
          registerButton: mmhc.section5
        })
      } else {
        this.setState({
          registerButton: mmhc.section5Flase
        })
      }
    })
  },
  changeSmsCode: function(event) {
    this.setState({
      smsCode: event.target.value
    }, function() {
      if (this.state.smsCode != "" && this.state.password != "" && this.state.repassword != "") {
        this.setState({
          registerButton: mmhc.section5
        })
      } else {
        this.setState({
          registerButton: mmhc.section5Flase
        })
      }
    })
  },
  submit: function() {
    if (this.state.smsCode != "" && this.state.password != "" && this.state.repassword != "") {
      var length = this.state.password.length;
      if (length < 6 || length > 20) {
        alert("6-20位字符，建议由字母、数字、符号两种以上组成");
        return false;
      };
      if (this.state.password != this.state.repassword) {
        alert("两次密码不一致");
        return false;
      };
      $.ajax({
        type: 'post',
        // url: "json/cart/addtocart.json",
        url: "/doregister.json",
        data: {
          "mobile": this.props.phone,
          "password": this.state.password,
          "repassword": this.state.repassword,
          "smsVerifyCode": this.state.smsCode,
          "userCode": this.state.userCode,
          "userType": this.state.userType
        },
        success: function(data) {
          if (data == true) {
            alert("注册成功", function() {
              window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxefacda2c980c2bc4&redirect_uri=http%3a%2f%2fweixin.mmhlive.com%2fweixin%2findex&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            });
          } else {
            alert(data);
          };
        }.bind(this),
        dataType: "json"
      });
    }
  },
  countDown: function() {
    var num = this.state.num;
    num--;
    this.setState({
      num: num,
      numState: num + "后重新发送",
      timeCss: mmhc.time
    });
    if (num == 0) {
      clearInterval(timer);
      this.setState({
        numState: "重新发送",
        timeCss: mmhc.timeActive
      });
    }
  },
  reSender: function() {
    if (this.state.numState == "重新发送") {
      $.ajax({
        type: 'post',
        // url: "json/cart/addtocart.json",
        url: "/smsVertifyCode.json",
        data: {
          "mobile": this.props.phone
        },
        success: function(data) {
          if (data) {
            this.setState({
              num: 60
            });
            this.countDown();
            timer = setInterval(this.countDown, 1000);
          } else {
            alert("发送验证码失败");
          }
        }.bind(this),
        dataType: "json"
      });
    }
  },
  render: function() {
    return (
      <div className={this.props.registerSecend}>
        <div className={mmhc.secondContent}>
          <div className={mmhc.section1}>
            请输入{this.props.phone}收到的短息验证码
          </div>
          <div className={mmhc.section2}>
            <div className={mmhc.sec2Input}>
              <input onChange={this.changeSmsCode} ref="smsCodeInput" type="text" placeholder="请输入短信校验码"/>
            </div>
            <div onClick={this.reSender} className={this.state.timeCss}>{this.state.numState}</div>
          </div>
          <div className={mmhc.section3}>
            <input onChange={this.changePassword} ref="password" className={mmhc.sec3Input} type="password" placeholder="请设置密码"/>
          </div>
          <div className={mmhc.section4}>
            <input onChange={this.changeRepassword} ref="repassword" className={mmhc.sec4Input} type="password" placeholder="请确认密码"/>
          </div>
          <div onClick={this.submit} className={this.state.registerButton}>注册</div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    this.countDown();
    timer = setInterval(this.countDown, 1000);

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var prdCode = GetQueryString("userCode");
    var userType = GetQueryString("userType");
    userType = decodeURIComponent(userType);
    this.setState({
      userCode: prdCode,
      userType: userType
    });
  }
});

module.exports = RegisterSecend;