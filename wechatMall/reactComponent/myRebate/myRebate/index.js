import React from 'react';
import mmhc from './index.css';
import cNs from 'classnames';
import portrait from './img/portrait.png';
import newLoadingImg from './img/newLoading.gif';

function addStar(num) {
  if (!num) {
    return "";
  }
  var begin = num.toString().slice(0, 3);
  var end = num.toString().slice(7);
  return begin + "****" + end;
}

class AccountCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myIntegral: "", //我的积分
      withdrawCash: "", //可提现
      frozenCash: "", //已提现
      myAllowance: "", //我的基金
      sumProfit: "", // 推广收益
      sumAll: "", //累计收益
      sumOrder: "" //销售返利
    };
  }
  render() {
    return (
      <div className={mmhc.main}>
        <div className={cNs(mmhc.mask,this.state.imgLoadingFlag==true?"":mmhc.hide)}></div>
        <img className={cNs(mmhc.loadingImg,this.state.imgLoadingFlag==true?"":mmhc.hide)} src={newLoadingImg} width="100px" height="100px" alt=""/>

        <img src={portrait} className={mmhc.portrait} width="100%" alt=""/>
        <p className={mmhc.userName}>{addStar(this.state.userName)}</p>

        <div className={mmhc.mainPadding}>
          <div className={mmhc.panelTop}>
            <div className={mmhc.panelTop1}>
              <h1 className={mmhc.panelTopH1}>销售返利</h1>
              <p className={mmhc.panelTopP}>{Math.floor(this.state.sumOrder*100)/100}</p>
            </div>
            <div className={mmhc.panelTop2}>
              <h1 className={mmhc.panelTopH1}>我的积金</h1>
              <p className={mmhc.panelTopP}>{Math.floor(this.state.myAllowance*100)/100}</p>
            </div>
            <div className={mmhc.panelTop3}>
              <h1 className={mmhc.panelTopH1}>我的积分</h1>
              <p className={mmhc.panelTopP}>{Math.floor(this.state.myIntegral*100)/100}</p>
            </div>
          </div>
          <div className={mmhc.panelBottomT}>
            <div className={mmhc.panelBottom1}>
              <h1 className={mmhc.panelBottomH1}>推广收益</h1>
              <p className={mmhc.panelBottomP}>{Math.floor(this.state.sumProfit*100)/100}<i> 元</i></p>
            </div>
            <div className={mmhc.panelBottom2}>
              <h1 className={mmhc.panelBottomH1}>累计收益</h1>
              <p className={mmhc.panelBottomP}>{Math.floor(this.state.sumAll*100)/100}<i> 元</i></p>
            </div>
          </div>

          <div className={mmhc.panelBottomB}>
            <div className={mmhc.panelBottom3}>
              <h1 className={mmhc.panelBottomH1}>可提现</h1>
              <p className={mmhc.panelBottomP}>{Math.floor(this.state.withdrawCash*100)/100}<i> 元</i></p>
            </div>
            <div className={mmhc.panelBottom4}>
              <h1 className={mmhc.panelBottomH1}>已提现</h1>
              <p className={mmhc.panelBottomP}>{Math.floor(this.state.frozenCash*100)/100}<i> 元</i></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {

    $.ajax({
      url: '/wechatMall/authc/myExtension.json',
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          myIntegral: data.myIntegral, //我的积分
          withdrawCash: data.withdrawCash, //可提现
          frozenCash: data.frozenCash, //已提现
          myAllowance: data.myAllowance, //我的基金
          sumProfit: data.sumProfit, // 推广收益
          sumAll: data.sumAll, //累计收益
          sumOrder: data.sumOrder //销售返利
        })
      }.bind(this),
      dataType: "json"
    });

    // $.ajax({
    //   url: '/wechatMall/authc/getUserProfit.json',
    //   // url: '/json/authc/getUserProfitJsonMobile.json',
    //   type: "GET",
    //   dataType: "json",
    //   success: function(data) {
    //     this.setState({
    //       imgLoadingFlag: false
    //     });
    //     var yesterdayProfitVAL = 0;
    //     var totalProfitVAL = 0;
    //     if (data.finUserProfit) {
    //       yesterdayProfitVAL = data.finUserProfit.yesterdayProfit;
    //       totalProfitVAL = data.finUserProfit.totalProfit;
    //     }
    //     this.setState({
    //       userName: data.baseUser.mobile,
    //       totalMoney: data.baseUser.aggBalance,
    //       availableMoney: data.baseUser.balance,
    //       yesterdayProfit: yesterdayProfitVAL,
    //       totalProfit: totalProfitVAL,
    //       principal: data.finUser.waitingPrincipal,
    //       canWithdrawCash: data.finUser.userCash,
    //       estimateProfit: data.profitMap.profit,
    //       canWithdrawCashDay: data.profitMap.latelyTime,
    //       integral: data.baseUser.integral
    //     });
    //   }.bind(this)
    // });
  }
}

export
default AccountCenter;