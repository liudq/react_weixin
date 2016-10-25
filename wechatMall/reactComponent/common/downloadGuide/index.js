import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';

import imgBottom from './img/bottom.png';
import cloud from "./img/cloud.jpg";

import indexImg from "./img/index.png";
import fenleiImg from "./img/fenlei.png";
import shopCarImg from "./img/shopCar.png";
import qianbaoImg from "./img/qianbao.png";
import orderImg from "./img/order.png";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      menuState: 0
    };
  }
  menuFun() {
    if (this.state.menuState == 0) {
      this.setState({
        menuState: 1
      });
    } else {
      this.setState({
        menuState: 0
      });
    }
  }
  render() {
    return (
      <div className={mmhc.bottom}>
        <div onClick={this.menuFun.bind(this)} className={cNs(mmhc.menuCss,this.state.menuState==0?mmhc.upCss:mmhc.downCss)}></div>
        <div className={cNs(mmhc.menuTop,this.state.menuState==0?"":mmhc.menuTopUp)}>
          <a href="/wechatMall/weIndex.html" className={mmhc.menuSingle}>
            <img src={indexImg} alt=""/>
            <p>首页</p>
          </a>
          <a href="/wechatMall/categoryPage.html" className={mmhc.menuSingle}>
            <img src={fenleiImg} alt=""/>
            <p>分类</p>
          </a>
          <a href="/wechatMall/authc/shoppingCar.html" className={mmhc.menuSingle}>
            <img src={shopCarImg} alt=""/>
            <p>购物车</p>
          </a>
          <a href="/wechatMall/authc/myRebate.html" className={mmhc.menuSingle}>
            <img src={qianbaoImg} alt=""/>
            <p>钱包</p>
          </a>
          <a href="/wechatMall/authc/myOrder.html" className={mmhc.menuSingle}>
            <img src={orderImg} alt=""/>
            <p>订单</p>
          </a>
        </div>
        <a href="/wechatMall/downloadGuide.html">
          <img src={imgBottom} height="50px" width="100%" alt=""/>
        </a>
      </div>
    )
  }
  componentDidMount() {}
}

export
default Main;