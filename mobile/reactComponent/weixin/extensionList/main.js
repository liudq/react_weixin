require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
  getInitialState: function() {
    return {
      bindFlag: "",
      userList: [],
      num: 0,
      pageState: 1,
      endPageState: 1,
      zhijieTotal: "",
      jianjieTotal: "",
      totalFin: "",
      totalIntegral: ""
    }
  },
  cutPhoneNum: function(num) {
    var phoneNum = num.slice(0, 3) + "****" + num.slice(7);
    return phoneNum;
  },
  fristPageFun: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var openId = GetQueryString("openId");
    $.ajax({
      type: 'get',
      // url: "/json/UserList.json?openId=" + openId,
      url: "/weixin/findUserList.json?openId=" + openId + "&pageNo=1",
      success: function(data) {
        var numUser = 0;

        if (data.bindFlag == "success") {
          /*data.userList.map(function(userList, index) {
            numUser = numUser + userList.promoteNount;
          });*/
          this.setState({
            bindFlag: data.bindFlag,
            userList: data.userList,
            num: numUser,
            zhijieTotal: data.zhijieTotal,
            jianjieTotal: data.jianjieTotal,
            pageState: data.curPageNo,
            endPageState: data.totalPageNo
          })
        } else {
          alert(date.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  upPageFun: function() {
    if (this.state.pageState > 1) {
      function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      };
      var openId = GetQueryString("openId");
      $.ajax({
        type: 'get',
        // url: "/json/UserList.json?openId=" + openId,
        url: "/weixin/findUserList.json?openId=" + openId + "&pageNo=" + this.state.pageState - 1,
        success: function(data) {
          var numUser = 0;

          if (data.bindFlag == "success") {
            /*data.userList.map(function(userList, index) {
              numUser = numUser + userList.promoteNount;
            });*/
            this.setState({
              bindFlag: data.bindFlag,
              userList: data.userList,
              num: numUser,
              zhijieTotal: data.zhijieTotal,
              jianjieTotal: data.jianjieTotal,
              pageState: data.curPageNo,
              endPageState: data.totalPageNo
            })
          } else {
            alert(date.msg);
          }
        }.bind(this),
        dataType: "json"
      });
    };
  },
  nextPageFun: function() {
    if (this.state.pageState < this.state.endPageState) {
      function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      };
      var openId = GetQueryString("openId");
      $.ajax({
        type: 'get',
        // url: "/json/UserList.json?openId=" + openId,
        url: "/weixin/findUserList.json?openId=" + openId + "&pageNo=" + this.state.pageState + 1,
        success: function(data) {
          var numUser = 0;

          if (data.bindFlag == "success") {
            /*data.userList.map(function(userList, index) {
              numUser = numUser + userList.promoteNount;
            });*/
            this.setState({
              bindFlag: data.bindFlag,
              userList: data.userList,
              num: numUser,
              zhijieTotal: data.zhijieTotal,
              jianjieTotal: data.jianjieTotal,
              pageState: data.curPageNo,
              endPageState: data.totalPageNo
            })
          } else {
            alert(date.msg);
          }
        }.bind(this),
        dataType: "json"
      });
    };
  },
  endPageFun: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var openId = GetQueryString("openId");
    $.ajax({
      type: 'get',
      // url: "/json/UserList.json?openId=" + openId,
      url: "/weixin/findUserList.json?openId=" + openId + "&pageNo=" + this.state.endPageState,
      success: function(data) {
        var numUser = 0;

        if (data.bindFlag == "success") {
          /*data.userList.map(function(userList, index) {
            numUser = numUser + userList.promoteNount;
          });*/
          this.setState({
            bindFlag: data.bindFlag,
            userList: data.userList,
            num: numUser,
            zhijieTotal: data.zhijieTotal,
            jianjieTotal: data.jianjieTotal,
            pageState: data.curPageNo,
            endPageState: data.totalPageNo
          })
        } else {
          alert(date.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  updataFun: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var openId = GetQueryString("openId");
    $.ajax({
      type: 'get',
      // url: "/json/UserList.json?openId=" + openId,
      url: "/weixin/findUserList.json?openId=" + openId + "&pageNo=" + this.state.pageState,
      success: function(data) {
        var numUser = 0;

        if (data.bindFlag == "success") {
          /*data.userList.map(function(userList, index) {
            numUser = numUser + userList.promoteNount;
          });*/
          this.setState({
            bindFlag: data.bindFlag,
            userList: data.userList,
            num: numUser,
            zhijieTotal: data.zhijieTotal,
            jianjieTotal: data.jianjieTotal,
            pageState: data.curPageNo,
            endPageState: data.totalPageNo
          })
        } else {
          alert(date.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div style={{"padding":"10px"}}>
        <MmhAlert/>
        <h1 className={mmhc.introduce}>
          福袋人脉：通过您分享的二维码注册的新用户 将自动成为您的人脉，
          您的人脉在蜜麻花平台预存、消费，您都可以获得一份收益。
        </h1>
        <div className={mmhc.cashDiv}>
          <div className={mmhc.section1}>
            <div className={mmhc.sec1Name}>可提现金额（{this.state.totalFin}）</div>
            <div className={mmhc.sec1Describe}>绑定银行卡，即可提现。</div>
            <div className={mmhc.clear}></div>
          </div>
          <div className={mmhc.section1}>
            <div className={cNs(mmhc.sec1Name)}>我的积分（{this.state.totalIntegral}）</div>
            <div className={cNs(mmhc.sec1Describe)}>积分用于消费可抵现金</div>
            <div className={mmhc.clear}></div>
          </div>
        </div>
        <div className={mmhc.content}>
          <div className={mmhc.title}>
            <div className={mmhc.direct}>直接人脉 ({this.state.zhijieTotal}人)</div>
            <div className={mmhc.indirect}>间接人脉 ({this.state.jianjieTotal}人)</div>
            <div className={mmhc.clear}></div>
          </div>
          {
            this.state.userList.map(function(userList, index) {
              return <div key={index} className={mmhc.list}>
                      <div className={mmhc.name}>{this.cutPhoneNum(userList.promoterMobile)}</div>
                      <div className={mmhc.num}>{userList.promoteNount}</div>
                      <div className={mmhc.clear}></div>
                    </div>
            }.bind(this))
          }
        </div>
        <div className={mmhc.page}>
          <div onClick={this.fristPageFun} className={mmhc.fristPage}>首页</div>
          <div onClick={this.upPageFun} className={mmhc.upPage}>上一页</div>
          <div className={mmhc.thisPage}>{this.state.pageState}/{this.state.endPageState}</div>
          <div onClick={this.nextPageFun} className={mmhc.nextPage}>下一页</div>
          <div onClick={this.endPageFun} className={mmhc.endPage}>尾页</div>
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
    var openId = GetQueryString("openId");
    $.ajax({
      type: 'get',
      // url: "/json/findUserList.json?openId=" + openId,
      url: "/weixin/findUserList.json?openId=" + openId + "&pageNo=" + this.state.pageState,
      // url: "/weixin/findUserList.json?openId=" + openId,
      success: function(data) {
        var numUser = 0;

        if (data.bindFlag == "success") {
          /*data.userList.map(function(userList, index) {
            numUser = numUser + userList.promoteNount;
          });*/
          this.setState({
            bindFlag: data.bindFlag,
            userList: data.userList,
            num: numUser,
            zhijieTotal: data.zhijieTotal,
            jianjieTotal: data.jianjieTotal,
            pageState: data.curPageNo,
            endPageState: data.totalPageNo,
            totalFin: data.totalFin,
            totalIntegral: data.totalIntegral
          })
        } else {
          alert(date.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);