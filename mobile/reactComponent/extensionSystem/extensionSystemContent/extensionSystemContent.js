var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./extensionSystemContent.css");
var order2Img = require("./order2.png");
var ExtensionProfit = require("./extensionProfit/extensionProfit.js");
var MyTeam = require("./myTeam/myTeam.js");
var RankingList = require("./rankingList/rankingList.js");

var ExtensionSystemContent = React.createClass({
  getInitialState: function() {
    return {
      extensionProfitState: 1,
      myTeamState: 0,
      rankingListState: 0,
      paihang: [{}, {}, {}, {}],
      myUserBalance: {},
      promoteList: [],
      myUserBalancePaiHang: [{}],
      paiHangNum: 0
    }
  },
  extenProfitFun: function() {
    this.setState({
      extensionProfitState: 1,
      myTeamState: 0,
      rankingListState: 0
    })
  },
  myTeamFun: function() {
    this.setState({
      extensionProfitState: 0,
      myTeamState: 1,
      rankingListState: 0
    })
  },
  rankingListFun: function() {
    this.setState({
      extensionProfitState: 0,
      myTeamState: 0,
      rankingListState: 1
    })
  },
  render: function() {
    return (
      <div className={mmhc.extensionSystemContent}>
        <div className={mmhc.titleDiv}>
          <a href="javascript:history.back()">
            <img className={mmhc.order2Img} src={order2Img} alt=""/>
          </a>
          <p className={mmhc.title}>推广系统</p>
        </div>
        <div className={mmhc.titleDiv2}></div>
        <div className={mmhc.content}>
          <div className={mmhc.tabTitle}>
            <ul className={mmhc.tabUl}>
              <li onClick={this.extenProfitFun} className={this.state.extensionProfitState==1?mmhc.active:""}>推广收益</li>
              <li onClick={this.myTeamFun} className={this.state.myTeamState==1?mmhc.active:""}>我的团队</li>
              <li onClick={this.rankingListFun} className={this.state.rankingListState==1?mmhc.active:""}>排行榜</li>
              <div className={mmhc.clear}></div>
            </ul>
          </div>
          <div className={this.state.extensionProfitState==1?mmhc.blick:mmhc.none}>
            <ExtensionProfit myUserBalance={this.state.myUserBalance} myUserBalancePaiHang={this.state.myUserBalancePaiHang}/>
          </div>
          <div className={this.state.myTeamState==1?mmhc.blick:mmhc.none}>
            <MyTeam promoteList={this.state.promoteList}/>
          </div>
          <div className={this.state.rankingListState==1?mmhc.blick:mmhc.none}>
            <RankingList paiHangNum={this.state.paiHangNum} paihang={this.state.paihang}/>
          </div>
          
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      // url: '/json/member/userCenter.json',
      url: '/member/userCenter.json',
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        var paihangFirst = [{
          "aggBalance": 0,
          "allExtensBalance": 0,
          "headUrl": "/image/1.png",
          "mobile": "159****0369",
          "totalPromote": 12,
          "userCode": 1664,
          "userName": "小白兔"
        }, {
          "aggBalance": 0,
          "allExtensBalance": 0,
          "headUrl": "/image/1.png",
          "mobile": "159****0369",
          "totalPromote": 12,
          "userCode": 1664,
          "userName": "小白兔"
        }, {
          "aggBalance": 0,
          "allExtensBalance": 0,
          "headUrl": "/image/1.png",
          "mobile": "159****0369",
          "totalPromote": 12,
          "userCode": 1664,
          "userName": "小白兔"
        }, {
          "aggBalance": 0,
          "allExtensBalance": 0,
          "headUrl": "/image/1.png",
          "mobile": "159****0369",
          "totalPromote": 12,
          "userCode": 1664,
          "userName": "小白兔"
        }, ]
        data.paihang.map(function(padHangData, index) {
          paihangFirst[index] = padHangData;
        });
        this.setState({
          paihang: paihangFirst,
          myUserBalance: data.myUserBalance,
          promoteList: data.promoteList,
          myUserBalancePaiHang: data.myUserBalance.pList,
          paiHangNum: data.paihang.length
        })
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = ExtensionSystemContent;