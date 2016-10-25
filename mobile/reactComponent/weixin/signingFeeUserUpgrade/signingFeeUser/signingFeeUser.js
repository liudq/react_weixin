require("../../../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./signingFeeUser.css");
var MmhFileUpload = require("./mmhFileUpload/mmhFileUpload.js");
var SigningFeeUser = React.createClass({
  getInitialState: function() {
    return {
      realName: "姓名",
      idCard: "身份证",
      disabledState: false,
      mobile: "",
      openId: "",
      userCode: "",
      showState: 0,
      message: ""
    }
  },
  nextButton: function() {
    if (this.state.realName == "姓名" || this.state.realName == "") {
      alert("请输入姓名");
      return false;
    };
    if (this.state.idCard == "身份证" || this.state.idCard == "") {
      alert("请输入身份证");
      return false;
    };
    if ($("#file0").val() == "" || $("#file1").val() == "") {
      alert("请上传身份证");
      return false;
    };
    // $.ajaxFileUpload({
    //   url: '/wx/updateCer.json', //用于文件上传的服务器端请求地址
    //   secureuri: false, //是否需要安全协议，一般设置为false
    //   fileElementId: ['file0', 'file1'], //文件上传域的ID
    //   dataType: 'json', //返回值类型 一般设置为json
    //   data: {
    //     realName: this.state.realName,
    //     idCard: this.state.idCard,
    //     mobile: this.state.mobile
    //   },
    //   success: function(data) { //服务器成功响应处理函数
    //     if (data) {
    //       window.location.href = "/weixinSigningFee/authc/signingFeePay.html?openId=" + this.state.openId + "&userCode=" + this.state.userCode + "&userCodeRegister=" + this.state.userCodeRegister;
    //     } else {
    //       alert(data.message)
    //     }
    //   },
    //   error: function() { //服务器响应失败处理函数
    //     alert("请求数据失败");
    //   }
    // });

    // $.ajax({
    //   url: "/wx/updateCer.json",
    //   type: "post",
    //   data: $('#postForm').serialize(),
    //   error: function() {
    //     alert("请求数据失败");
    //   },
    //   success: function(data) {
    //     if (data) {
    //       window.location.href = "/weixinSigningFee/authc/signingFeePay.html?openId=" + this.state.openId + "&userCode=" + this.state.userCode + "&userCodeRegister=" + this.state.userCodeRegister;
    //     } else {
    //       alert(data.message)
    //     }
    //   }.bind(this),
    //   dataType: "json"
    // });

    $.ajax({
      url: "/authc/updateCerShengji.json",
      type: "post",
      data: {
        realName: this.state.realName,
        idCard: this.state.idCard
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.rst == 1) {
          window.location.href = "/weixinSigningFee/authc/signingFeePayUpgrade.html?openId=" + this.state.openId + "&userCode=" + this.state.userCode;
        } else {
          alert(data.msg)
        }
      }.bind(this),
      dataType: "json"
    });
  },
  changeName: function(event) {
    this.setState({
      realName: event.target.value
    });
  },
  changeId: function(event) {
    this.setState({
      idCard: event.target.value
    });
  },
  render: function() {
    return (
      <div className={mmhc.pay}>
        <div style={{"display":this.state.showState==0?"block":"none"}} className={mmhc.msgCss}>{this.state.message}</div>
        <form style={{"display":this.state.showState==1?"block":"none"}} id="postForm" action="/wx/updateCer.json" encType="multipart/form-data"  method="post">
          <div className={mmhc.section1}>
            <input onChange={this.changeName} disabled={this.state.disabledState} placeholder={this.state.realName}  className={mmhc.name} type="text"/>
            <input onChange={this.changeId} disabled={this.state.disabledState} placeholder={this.state.idCard}  className={mmhc.card} type="text"/>
          </div>
          <div className={mmhc.section2}>
            <div className={mmhc.title}>上传身份证</div>
            <div className={mmhc.picture}>
              <MmhFileUpload/>
              <div className={cNs(mmhc.font,mmhc.clearfix)}>
                <div className={mmhc.font1}>上传身份证：正面</div>
                <div className={mmhc.font2}>上传身份证：反面</div>
              </div>
            </div>
          </div>
          <div className={mmhc.section3}>
            <div onClick={this.nextButton} className={mmhc.buttom}>下一步</div>
            {/*<input onClick={this.nextButton} className={mmhc.buttom} type="submit" value="下一步"/>*/}
          </div>
        </form>
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
    var mobile = GetQueryString("mobile");
    var userCode = GetQueryString("userCode");
    var openId = GetQueryString("openId");
    this.setState({
        mobile: mobile,
        openId: openId,
        userCode: userCode
      })
      // $.ajax({
      //   type: 'post',
      //   // url: "json/cart/addtocart.json",
      //   url: "/wx/iscer.json",
      //   data: {
      //     "mobile": mobile
      //   },
      //   success: function(data) {
      //     if (data.flag == "success") {
      //       this.setState({
      //         realName: data.realName,
      //         idCard: data.idCard,
      //         disabledState: true
      //       })
      //     } else {
      //       this.setState({
      //         disabledState: false
      //       })
      //     };
      //   }.bind(this),
      //   dataType: "json"
      // });
    $.ajax({
      type: 'post',
      // url: "json/cart/addtocart.json",
      url: "/authc/upGrade.json",
      success: function(data) {
        if (data.flag == true) {
          if (data.realName == "") {
            this.setState({
              showState: 1,
              disabledState: false
            })
          } else {
            window.location.href = "/weixinSigningFee/authc/signingFeePayUpgrade.html";
          }
        } else {
          this.setState({
            showState: 0,
            message: data.msg,
            disabledState: false
          })
        };
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = SigningFeeUser;