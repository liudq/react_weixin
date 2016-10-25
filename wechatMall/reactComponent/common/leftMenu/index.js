import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';

import imgCar from "./img/car.png";
import imgClassification from "./img/classification.png";
import imgRebate from "./img/rebate.png";
import imgOrder from "./img/order.png";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      showState: "none"
    };
  }

  render() {
    return (
      <div className={mmhc.myMenuContainer}>
        <a href="/wechatMall/categoryPage.html" className={cNs(mmhc.myMCItem,mmhc.myMCItem1)}>
          <div className={mmhc.itemBg}></div>
          <div className={mmhc.itemContent}>
            <img src={imgClassification} alt="" className={mmhc.itemContentImg}/>
            <h1 className={mmhc.itemContentH1}>分类</h1>
          </div>
        </a>
        <a href="/wechatMall/authc/shoppingCar.html" className={cNs(mmhc.myMCItem,mmhc.myMCItem2)}>
          <div className={mmhc.itemBg}></div>
          <div className={mmhc.itemContent}>
            <span className={mmhc.carContainer}>
              <img src={imgCar} alt="" className={mmhc.itemContentImg}/>
              <em style={{"display":this.state.showState}} className={mmhc.carNum}>{this.state.count}</em>
            </span>
            <h1 className={mmhc.itemContentH1}>购物车</h1>
          </div>
        </a>
        <a href="/wechatMall/authc/myRebate.html" className={cNs(mmhc.myMCItem,mmhc.myMCItem3)}>
          <div className={mmhc.itemBg}></div>
          <div className={mmhc.itemContent}>
            <img src={imgRebate} alt="" className={mmhc.itemContentImg}/>
            <h1 className={mmhc.itemContentH1}>钱包</h1>
          </div>
        </a>
        <a href="/wechatMall/authc/myOrder.html" className={cNs(mmhc.myMCItem,mmhc.myMCItem4)}>
          <div className={mmhc.itemBg}></div>
          <div className={mmhc.itemContent}>
            <img src={imgOrder} alt="" className={mmhc.itemContentImg}/>
            <h1 className={mmhc.itemContentH1}>我的订单</h1>
          </div>
        </a>
      </div>
    )
  }
  componentDidMount() {
    // $.ajax({
    //   url: "/wechatMall/authc/cartCount.json",
    //   type: "get",
    //   error: function() {
    //     alert("请求数据失败");
    //   },
    //   success: function(data) {
    //     if (data.success) {
    //       this.setState({
    //         count: data.cartCount,
    //         showState: "block"
    //       })
    //     } else {
    //       this.setState({
    //         showState: "none"
    //       })
    //     }
    //   }.bind(this),
    //   dataType: "json"
    // });
  }
}

export
default Main;