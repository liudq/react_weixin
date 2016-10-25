import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';

import jsonPath from '../../common/util/jsonPath.js';
var imgPath = require("../../common/util/path.js").path;
var ddd = require("../../common/util/util.js").dateFormatDetailed;

var cutText = function(text, myLength) {
  if (text.length > myLength * 1) {
    return text.slice(0, myLength * 1) + "...";
  } else {
    return text;
  }
}



class Main extends React.Component {
  /*确认付款*/
  dPay(event) {
    var mId = event.target.getAttribute("id");
    // console.log(mId);
    window.location.href = "/wechatMall/authc/orderPay.html?relationOrderSn=" + mId + "&rid" + Math.random() + "&paymentName=微信支付" + "&paymentCode=WXPAY";

  }
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      goodsData: [],
      goodsPrdouct: [],
      sellerName: []
    };
  }

  render() {
    return (
      <div className={mmhc.infContain}>
				<div className={mmhc.listHead}>
	        <p className={cNs(mmhc.order,mmhc.clearfix)}>
		        <span className={mmhc.createTime}>{ddd(this.state.goodsData.createTime)}</span>
		        <span className={mmhc.orderState}>待付款</span>
		      </p>
		      <p>
		      	订单号: <span className = {mmhc.orderSn}>{this.state.goodsData.orderSn}</span>
		      </p>
		      <p>
		      	收货人: <span className = {mmhc.orderPerson}>{this.state.goodsData.name}</span><span>{this.state.goodsData.deMobile}</span>
		      </p>
		      <p className={mmhc.oderAddress}>
						 {this.state.goodsData.addressAll}{this.state.goodsData.addressInfo}
		      </p>
		    </div> 
      	<div className={mmhc.orderList}>
      		<h2 className={mmhc.orderListHead}>{this.state.sellerName}</h2>
            {
              this.state.goodsPrdouct.map(function(list, index) {
                    return  <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index}>
                              <img src={imgPath+list.productLeadLittle}/>
                              <figcaption>
                                <p className={mmhc.goodsTitle}>{cutText(list.productName,20)}</p>
                                <p className={mmhc.goodsPrice}>
                                  <span>￥</span>
                                  <span>{list.moneyPrice}</span>
                                  <span>X</span>
                                  <span>{list.number}</span>
                                </p>
                              </figcaption>
                            </figure>
                    }.bind(this))
            }

      	</div>
      	<div className={mmhc.orderPrice}>
      		<p>商品合计<span><i>￥</i>{this.state.goodsData.moneyProduct}</span></p>
      		<p>运费<span><i>￥</i>{this.state.goodsData.moneyLogistics}</span></p>
      		<p>优惠<span><i>-￥</i>{this.state.goodsData.moneyCouponcode}</span></p>
      		<p>积分<span><i>-￥</i>{this.state.goodsData.moneyIntegral}</span></p>
      		<p>应付总额<span><i>￥</i>{this.state.goodsData.moneyOrder}</span></p>
      	</div>
      	<div className={mmhc.orderReceipt}>
      		<h2 className={mmhc.orderListHead}>发票信息</h2>
      		<p>发票类型: <span>{this.state.goodsData.invoiceStatus}</span><span className={mmhc.invoiceTitle}>{this.state.goodsData.invoiceTitle}</span><span className={mmhc.invoiceType}>{this.state.goodsData.invoiceType}</span></p>
          <div className={mmhc.payBtn} onClick={this.dPay} id={this.state.goodsData.id}>去付款</div>
      	</div>
      </div>
    )
  }
  componentDidMount() {
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam("id");

    $.ajax({
      // url: jsonPath.path + '/orderdetail_v20.json',
      url: jsonPath.path + '/wechatMall/authc/orderdetail_v20.json?orderId=' + urlParam,
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        if (data.order.invoiceStatus == 0) {
          data.order.invoiceStatus = "不开发票"
        } else if (data.order.invoiceStatus == 1) {
          data.order.invoiceStatus = "单位"
        } else if (data.order.invoiceStatus == 2) {
          data.order.invoiceStatus = "个人"
        }

        this.setState({
          goodsData: data.order,
          goodsPrdouct: data.order.orderProductList,
          sellerName: data.sellerName
        });
        // console.log(data.order.orderProductList)
      }.bind(this)
    });
  }
}

export
default Main;