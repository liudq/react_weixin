require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./businessSign.css");
var mailImg = require("./mail.png");
var phoneImg = require("./phone.png");
var userImg = require("./user.png");
var bannerImg = require("./banner.jpg");
var imgPath = require("../../../common/util/path.js").path;
var BusinessSign = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      phone: "",
      mail: "",
      meeting: {},
      gradeNumA: 1, //普通参会数量
      gradeNumB: 1, //高级参会数量
      gradeNumC: 1, //VIP参会数量
      gradeActive: "A",
      gradeSign: "",
      gradeNum: 1,
      code: "",
      timestamp: "",
      sign: "",
      noncestr: "",
      package: "",
      appid: "",
      openId: "",
      orderIdState: "",
      clickState: 0
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
  //普通参会数量加减
  gradeNumAJianFun: function() {
    if (this.state.gradeNumA > 1) {
      if (this.state.gradeActive == "A") {
        this.setState({
          gradeNum: this.state.gradeNum - 1
        })
      };
      this.setState({
        gradeNumA: this.state.gradeNumA - 1
      })
    }
  },
  gradeNumAAddFun: function() {
    if (this.state.gradeActive == "A") {
      this.setState({
        gradeNum: this.state.gradeNum + 1
      })
    };
    this.setState({
      gradeNumA: this.state.gradeNumA + 1
    })
  },
  //高级会员参会数量加减
  gradeNumBJianFun: function() {
    if (this.state.gradeNumB > 1) {
      if (this.state.gradeActive == "B") {
        this.setState({
          gradeNum: this.state.gradeNum - 1
        })
      };
      this.setState({
        gradeNumB: this.state.gradeNumB - 1
      })
    }
  },
  gradeNumBAddFun: function() {
    if (this.state.gradeActive == "B") {
      this.setState({
        gradeNum: this.state.gradeNum + 1
      })
    };
    this.setState({
      gradeNumB: this.state.gradeNumB + 1
    })
  },
  //VIP会员参会数量加减
  gradeNumCJianFun: function() {
    if (this.state.gradeNumC > 1) {
      if (this.state.gradeActive == "C") {
        this.setState({
          gradeNum: this.state.gradeNum - 1
        })
      };
      this.setState({
        gradeNumC: this.state.gradeNumC - 1
      })
    }
  },
  gradeNumCAddFun: function() {
    if (this.state.gradeActive == "C") {
      this.setState({
        gradeNum: this.state.gradeNum + 1
      })
    };
    this.setState({
      gradeNumC: this.state.gradeNumC + 1
    })
  },
  //选择参与类型
  gradeAFun: function() {
    this.setState({
      gradeActive: "A",
      gradeSign: this.state.meeting.gradeSignA,
      gradeNum: this.state.gradeNumA
    })
  },
  gradeBFun: function() {
    this.setState({
      gradeActive: "B",
      gradeSign: this.state.meeting.gradeSignB,
      gradeNum: this.state.gradeNumB
    })
  },
  gradeCFun: function() {
    this.setState({
      gradeActive: "C",
      gradeSign: this.state.meeting.gradeSignC,
      gradeNum: this.state.gradeNumC
    })
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
            orderNum: this.state.gradeNum,
            gradeSign: this.state.gradeSign,
            payMobile: this.state.phone,
            payEmail: this.state.mail,
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
                openId: data.openId,
                orderIdState: data.orderId
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
          window.location.href = "/weixin/businessItemDeal.html?orderId=" + that.state.orderIdState + "&openId=" + that.state.openId;
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
      }
    );
  },
  render: function() {
    return (
      <div className={mmhc.sign}>
        <div className={mmhc.banner}>
          <img src={imgPath+this.state.meeting.meetingImg} alt=""/>
        </div>
        <div className={mmhc.title}>
          {this.state.meeting.meetingName}
        </div>
        <div className={mmhc.introduce}>
          <div className={cNs(mmhc.intSec1,mmhc.clearfix)}>
            <div className={mmhc.intSec1Left}>会议时间：</div>
            <div className={mmhc.intSec1Right}>{this.state.meeting.meetingDate}</div>
          </div>
          <div className={cNs(mmhc.intSec2,mmhc.clearfix)}>
            <div className={mmhc.intSec1Left}>入场时间：</div>
            <div className={mmhc.intSec1Right}>{this.state.meeting.admissionDate}</div>
          </div>
          <div className={cNs(mmhc.intSec2,mmhc.clearfix)}>
            <div className={mmhc.intSec1Left}>会议地点：</div>
            <div className={mmhc.intSec1Right}>{this.state.meeting.meetingPlace}</div>
          </div>
        </div>
        <div className={mmhc.section3}>
          <div className={mmhc.sec3Title}>会议介绍</div>
          <div className={mmhc.sec3Content}>
            <p>{this.state.meeting.meetingIntroduction}</p>
          </div>
            <div className={mmhc.sec3Title}>
              <div className={cNs(mmhc.sec3Phone,mmhc.clearfix)}>
                <div className={mmhc.intSec1Left}>主办方电话：</div>
                <div className={mmhc.sec3PhoneLeft}>{this.state.meeting.organizerMobile}</div>
              </div>
          </div>
        </div>
        <div className={mmhc.section4}>
          <div className={mmhc.sec4Title}>会议参会费</div>
          <div className={mmhc.sec4Content}>
            <div className={mmhc.sec4Intro}>
              <div className={mmhc.ordinaryCostVip}>{this.state.meeting.gradeNameA}：{this.state.meeting.gradeMoneyA}元/人</div>
              <div className={mmhc.sec4VipContent}>{this.state.meeting.gradeIntroductionA}</div>
            </div>
            <div className={mmhc.sec4Intro}>
              <div className={mmhc.ordinaryCostVip}>{this.state.meeting.gradeNameB}：{this.state.meeting.gradeMoneyB}元/人</div>
              <div className={mmhc.sec4VipContent}>{this.state.meeting.gradeIntroductionB}</div>
            </div>
            <div className={mmhc.sec4Intro}>
              <div className={mmhc.ordinaryCostVip}>{this.state.meeting.gradeNameC}：{this.state.meeting.gradeMoneyC}元/人</div>
              <div className={mmhc.sec4VipContent}>{this.state.meeting.gradeIntroductionC}</div>
            </div>
            <div className={mmhc.notes}>注：{this.state.meeting.remarks}</div>
          </div>
          <div className={mmhc.register}>立即报名</div>
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
          <div className={mmhc.registerCost}>
            <div className={cNs(mmhc.sec4Title,mmhc.registerTitle)}>选择参与费用</div>
            <div className={mmhc.registerContent}>
              <div className={cNs(mmhc.regConTitle,mmhc.clearfix)}>
                <div className={mmhc.feiyong}>费用</div>
                <div className={mmhc.number}>数量</div>
              </div>
              <div className={cNs(mmhc.regSec1,mmhc.clearfix)}>
                <div onClick={this.gradeAFun} className={cNs(mmhc.regSec1Left,this.state.gradeActive=="A"?mmhc.active:"")}>
                  <div style={{"display":this.state.gradeActive=="A"?"block":"none"}} className={mmhc.checkDiv}></div>
                </div>
                <div className={mmhc.regSec1Center}>{this.state.meeting.gradeNameA}：{this.state.meeting.gradeMoneyA}元/人</div>
                <div className={cNs(mmhc.regSec1Right,mmhc.clearfix)}>
                  <div onClick={this.gradeNumAJianFun} className={mmhc.jian}>-</div>
                  <div className={mmhc.num}>{this.state.gradeNumA}</div>
                  <div onClick={this.gradeNumAAddFun} className={mmhc.add}>+</div>
                </div>
              </div>
              <div className={cNs(mmhc.regSec1,mmhc.regSec1Vip,mmhc.clearfix)}>
                <div onClick={this.gradeBFun} className={cNs(mmhc.regSec1Left,this.state.gradeActive=="B"?mmhc.active:"")}>
                  <div style={{"display":this.state.gradeActive=="B"?"block":"none"}} className={mmhc.checkDiv}></div>
                </div>
                <div className={mmhc.regSec1Center}>{this.state.meeting.gradeNameB}：{this.state.meeting.gradeMoneyB}元/人</div>
                <div className={cNs(mmhc.regSec1Right,mmhc.clearfix)}>
                  <div onClick={this.gradeNumBJianFun} className={mmhc.jian}>-</div>
                  <div className={mmhc.num}>{this.state.gradeNumB}</div>
                  <div onClick={this.gradeNumBAddFun} className={mmhc.add}>+</div>
                </div>
              </div>
              <div className={cNs(mmhc.regSec1,mmhc.regSec1Vip,mmhc.clearfix)}>
                <div onClick={this.gradeCFun} className={cNs(mmhc.regSec1Left,this.state.gradeActive=="C"?mmhc.active:"")}>
                  <div style={{"display":this.state.gradeActive=="C"?"block":"none"}} className={mmhc.checkDiv}></div>
                </div>
                <div className={mmhc.regSec1Center}>{this.state.meeting.gradeNameC}：{this.state.meeting.gradeMoneyC}元/人</div>
                <div className={cNs(mmhc.regSec1Right,mmhc.clearfix)}>
                  <div onClick={this.gradeNumCJianFun} className={mmhc.jian}>-</div>
                  <div className={mmhc.num}>{this.state.gradeNumC}</div>
                  <div onClick={this.gradeNumCAddFun} className={mmhc.add}>+</div>
                </div>
              </div>
            </div>
          </div>
          <div className={mmhc.submit}>
            <div onClick={this.submitFun} className={mmhc.submitButton}>参会报名</div>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var code = GetQueryString("code");
    var meetingCode = GetQueryString("meetingCode");
    this.setState({
      code: code
    });
    $.ajax({
      // url: "/json/weixin/findMeeting.json",
      // type: "get",
      url: "/findMeeting.json?meetingCode=1",
      type: "post",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          meeting: data.meeting,
          gradeSign: data.meeting.gradeSignA
        })
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = BusinessSign;