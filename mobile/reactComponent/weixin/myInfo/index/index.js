import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';
import showInf from './show.png'
import hideInf from './hide.png'

import jsonPath from '../../../common/util/jsonPath.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count1: 0,
      count2: 0,
      listFlag: false,
      sumAll: "",
      sumProfit: "",
      sumOrder: "",
      profit102: "",
      profit103: "",
      profit104: "",
      orderState1: "",
      fan: "",
      orderState5: "",
      withdrawCash: "",
      frozenCash: "",
      infoData: []
    };
  }
  showList1() {
    var flag = null;
    this.state.count1++;
    if (this.state.count1 % 2 == 0) {
      flag = false;
    } else {
      flag = true;
    }
    this.setState({
      listFlag1: flag
    });
  }

  showList2() {
    var flag = null;
    this.state.count2++;
    if (this.state.count2 % 2 == 0) {
      flag = false
    } else {
      flag = true;
    }
    this.setState({
      listFlag2: flag
    });
  }
  spread(event) {
    var tradeName = $(event.target).closest("div").attr("data-id");
    window.location.href = "/weixinSigningFee/authc/myEarnings.html?tradeName=" + tradeName;
  }
  render() {
    return (
      <div>
              <div className={cNs(mmhc.head,mmhc.clearfix)}>
                <div className={mmhc.allEarnings} data-id="fenxiao" onClick = {this.spread.bind(this)}>
                  <p className={mmhc.earingsNo}>{this.state.sumAll}</p>
                  <p>累计收益(元)</p>
                </div>
                <div className={mmhc.earingsCon}>
                  <div className={mmhc.earingsConL} data-id="fenxiao" onClick = {this.spread.bind(this)}>
                    <p>{this.state.sumProfit}</p>
                    <p>推广收益(元)</p>
                  </div>
                  <div className={mmhc.earingsConR} data-id="xiaoshou" onClick = {this.spread.bind(this)}> 
                    <p>{this.state.sumOrder}</p>
                    <p>销售返利(元)</p>
                  </div>
                </div>
              </div>
              <div className={cNs(mmhc.infContent,mmhc.clearfix)}>
                <div className={mmhc.spread} onClick={this.showList1.bind(this)}>
                  <p className={mmhc.moneyL}>我的推广</p>
                  <p className={mmhc.moneyR}><img src={this.state.listFlag1==true?hideInf:showInf}/></p>
                </div>
           
                <div className={cNs(mmhc.spreadList,this.state.listFlag1==true?mmhc.show:"")}>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)} data-id="fenxiao" onClick = {this.spread.bind(this)}>
                    <p className={mmhc.moneyL}>推广分销商</p>
                    <p className={mmhc.moneyR}><span>{this.state.infoData.num102}</span><span>人</span><span className={mmhc.spanL}>( ￥</span><span>{this.state.profit102}</span><span> )</span></p>
                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)} data-id="jingxiao" onClick = {this.spread.bind(this)}>
                    <p className={mmhc.moneyL}>推广经销商</p>
                    <p className={mmhc.moneyR}><span>{this.state.infoData.num103}</span><span>人</span><span className={mmhc.spanL}>( ￥</span><span>{this.state.profit103}</span><span> )</span></p>
                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)} data-id="daili" onClick = {this.spread.bind(this)}>
                    <p className={mmhc.moneyL}>推广代理商</p>
                    <p className={mmhc.moneyR}><span>{this.state.infoData.num104}</span><span>人</span><span className={mmhc.spanL}>( ￥</span><span>{this.state.profit104}</span><span> )</span></p>
                  </div>
                </div>

                <div className={mmhc.rebate} onClick={this.showList2.bind(this)}>
                  <p className={mmhc.moneyL}>我的销售返利</p>
                  <p className={mmhc.moneyR}><img src={this.state.listFlag2==true?hideInf:showInf}/></p>
                </div>
                <div className={cNs(mmhc.rebateList,this.state.listFlag2==true?mmhc.show:"")}>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)} data-id="xiaoshou" onClick = {this.spread.bind(this)}>
                    <p className={mmhc.moneyL}>未付款订单返利</p>
                    <p className={mmhc.moneyR}><span>￥</span><span>{this.state.orderState1}</span></p>
                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)} data-id="xiaoshou" onClick = {this.spread.bind(this)}>
                    <p className={mmhc.moneyL}>已付款订单返利</p>
                    <p className={mmhc.moneyR}><span>￥</span><span>{this.state.fan}</span></p>
                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)} data-id="xiaoshou" onClick = {this.spread.bind(this)}>
                    <p className={mmhc.moneyL}>已完成订单返利</p>
                    <p className={mmhc.moneyR}><span>￥</span><span>{this.state.orderState5}</span></p>
                  </div>
                </div>


                <div className={mmhc.money}>
                  <p className={mmhc.moneyL}>可提现现金</p>
                  <p className={mmhc.moneyR}><span>￥</span><span>{this.state.withdrawCash}</span></p>
                </div>

                <div className={mmhc.money}>
                  <p className={mmhc.moneyL}>已提现现金</p>
                  <p className={mmhc.moneyR}><span>￥</span><span>{this.state.frozenCash}</span></p>
                </div>

                <div className={mmhc.list}>
                  <div className={mmhc.clearfix}>
                    <p className={mmhc.moneyL}>我的个人信息</p>
                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)}>
                    <p className={mmhc.moneyL}>级别类型</p>
                    

    { /* <p className={mmhc.moneyR1}><a href="/weixinSigningFee/authc/signingFeePayUpgrade.html">升级</a></p>*/ }
                    <p className={mmhc.moneyR}>{this.state.infoData.jibieType}</p>

                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)}>
                    <p className={mmhc.moneyL}>推广编码</p>
                    <p className={mmhc.moneyR}>{this.state.infoData.userCode}</p>
                  </div>
                  <div className={cNs(mmhc.listCon,mmhc.clearfix)}>
                    <p className={mmhc.moneyL}>代理时限</p>
                    <p className={mmhc.moneyR}><span>{this.state.infoData.startTime}</span>~<sapn>{this.state.infoData.closeTime}</sapn></p>
                  </div>
                </div>
              </div>
            </div>
    )
  }
  componentDidMount() {
    $.ajax({
      // /myExtension.json
      // /myExtension.json

      // url: jsonPath.path + '/myExtension.json',
      url: jsonPath.path + '/myExtension.json',
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        $("." + mmhc.shadow1).css({
          "display": "none"
        });
        console.log(data);
        this.setState({
          infoData: data,
          sumAll: data.sumAll.toFixed(2),
          sumProfit: data.sumProfit.toFixed(2),
          sumOrder: data.sumOrder.toFixed(2),
          profit102: data.profit102.toFixed(2),
          profit103: data.profit103.toFixed(2),
          profit104: data.profit104.toFixed(2),
          orderState1: data.orderState1.toFixed(2),
          fan: (data.orderState3 + data.orderState4).toFixed(2),
          orderState5: data.orderState5.toFixed(2),
          withdrawCash: data.withdrawCash.toFixed(2),
          frozenCash: data.frozenCash.toFixed(2)
        }, function() {
          // if (data.jibieType == "普通" || data.jibieType == "分销商" || data.jibieType == "经销商") {
          //   $("." + mmhc.moneyR1).css({
          //     "display": "block"
          //   });
          // } else {
          //   $("." + mmhc.moneyR1).css({
          //     "display": "none"
          //   });
          // }
        });
      }.bind(this)
    });
  }
}

export
default Main;