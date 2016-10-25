require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var backImg = require("./order2.png");
var hnysjyImg = require("./HNYSJY.jpg");
var CompanyIntroduction = require("../companyIntroduction/companyIntroduction.js");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
  getInitialState: function() {
    return {
      openid: "",
      second: 60,
      sendShow: "show",
      secondShow: "hide",
      companyIntroductionShow: mmhc.none,
      bindWechatShow: mmhc.block,
      pageUrl: "",
      openId2: ""
    }
  },
  bindPhone: function() {
    var that = this;
    var phoneNum = ReactDom.findDOMNode(this.refs.phoneNum).value;
    var valiCode = ReactDom.findDOMNode(this.refs.valiCode).value;
    if (null == valiCode || valiCode == "") {
      alert("请输入验证码");
    } else {
      $.ajax({
        url: '/weixin/bindWeixin.json',
        type: 'post',
        dataType: 'json',
        data: {
          mobile: phoneNum,
          mobileVerifyCode: valiCode,
          openId: this.state.openid,
          openId2: this.state.openId2
        },
        success: function(data) {
          if (data.bindFlag == "fail") {
            alert(data.msg);
          } else {
            alert(data.msg, function() {
              if (that.state.pageUrl == undefined || that.state.pageUrl == "" || that.state.pageUrl == null || that.state.pageUrl == "null") {
                window.location.href = data.redirectUrl;
              } else {
                window.location.href = decodeURIComponent(that.state.pageUrl);
              };
            });
          }
        },
        error: function() {
          alert("发送失败，请稍后");
        }
      });
    }
  },
  jump: function(count) {
    window.setTimeout(function() {
      count--;
      if (count > 0) {
        this.setState({
          sendShow: "hide",
          secondShow: "show",
          second: count
        }, function() {
          this.jump(count);
        }.bind(this))
      } else {
        this.setState({
          sendShow: "show",
          secondShow: "hide"
        })
      }
    }.bind(this), 1000);
  },
  companyIntroductionShow: function() {
    this.setState({
      companyIntroductionShow: mmhc.block,
      bindWechatShow: mmhc.none
    })
  },
  quit: function() {
    this.setState({
      companyIntroductionShow: mmhc.none,
      bindWechatShow: mmhc.block
    })
  },
  getValiCode: function() {
    var reg = /\d{11}$/;
    var phoneNum = ReactDom.findDOMNode(this.refs.phoneNum).value;
    if (null == phoneNum || phoneNum == "") {
      alert("请输入手机号码");
    } else if (!reg.test(phoneNum)) {
      alert("请输入正确的手机号码");
    } else {
      $.ajax({
        url: '/weixin/mobileVerifyCode.json',
        type: 'post',
        dataType: 'json',
        data: {
          mobile: phoneNum
        },
        success: function(data) {
          if (data.rst == "0") {
            alert("发送成功");
            this.setState({
                sendShow: "hide",
                secondShow: "show"
              })
              //============倒计时============
            this.jump(60);
            //============倒计时============
          } else if (data.rst = "-10") {
            window.location.href = "/register.html";
          } else {
            alert(data.msg);
          }
        }.bind(this),
        error: function() {
          alert("发送失败，请稍后");
        }
      });
    }
  },
  render: function() {
    return (
      <div>
        <MmhAlert/>
        <div className={cNs(mmhc.myForm,this.state.bindWechatShow)}>
          <div className={mmhc.sectionPhone}>
            <div className={mmhc.sec1Left}>
              手机号：
              <input placeholder="请输入手机号" type="text" ref="phoneNum"/>
            </div>
            <a className={cNs(mmhc.getVD,this.state.sendShow=="show"?mmhc.show:"")} onClick={this.getValiCode} href="javascript:void(0)">获取验证码</a>
            <a className={cNs(mmhc.second,this.state.secondShow=="show"?mmhc.show:"")} href="">{this.state.second}</a>
            <div className={mmhc.clear}></div>
          </div>
          
          <div className={mmhc.sec2}>
            验证码：
            <input placeholder="请输入验证码" type="text" ref="valiCode"/>
          </div>
          <a className={mmhc.bindPhone} onClick={this.bindPhone} href="javascript:void(0)">绑定</a>
          <div className={mmhc.hnysjyImgDiv}>
            <div onClick={this.companyIntroductionShow} className={mmhc.companyIntroduction}>公司介绍</div>
            <img className={mmhc.hnysjyImg} src={hnysjyImg} alt=""/>
            <p>长按二维码关注，蜜麻花</p>
          </div>
        </div>
        <div className={this.state.companyIntroductionShow}>
          <div className={mmhc.title}>
            <a onClick={this.quit} href="javascript:void(0)" className={mmhc.back}><img className={mmhc.backImg} src={backImg} alt=""/></a>
            公司介绍</div>
          <div className={mmhc.title2}></div>
          <CompanyIntroduction />
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
    var openid = GetQueryString("openId");
    var openId2 = GetQueryString("openId2");
    var pageUrl = GetQueryString("pageUrl");
    this.setState({
      openid: openid,
      pageUrl: pageUrl,
      openId2: openId2
    });
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);