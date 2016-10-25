import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';

import noneImgPath from './none.jpg';
import moreImgPath from './more.png';
import shadowImg from './newLoading.gif';
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
var WaitePay = React.createClass({
  /*订单详情*/
  dListInf: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.orderDital).attr("data-id");
    window.location.href = "/wechatMall/myOrderDetailsOne.html?id=" + mId;
  },
  /*产品详情*/
  dGoodList: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.goodsBox).attr("data-id");
    // console.log(mId);
    if (mId == undefined) {
      //点击本身获取属性
      mId = $(event.target).attr("data-id");
    }
    window.location.href = "/wechatMall/detail.html?prdCode=" + mId;
  },
  /*去支付按钮*/
  dPay: function(event) {
    event.stopPropagation();
    var mId = event.target.getAttribute("id");
    window.location.href = "/wechatMall/authc/orderPay.html?relationOrderSn=" + mId + "&rid" + Math.random() + "&paymentName=微信支付" + "&paymentCode=WXPAY";
  },
  /*取消订单按钮*/
  dPayCan: function(event) {
    // location.reload();
    event.stopPropagation();
    var mId = event.target.getAttribute("id");
    $.ajax({
      // url: jsonPath.path + '/order_v20.json',
      url: jsonPath.path + '/wechatMall/cancalorder_v20.json?id=' + mId,
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        confirm("是否取消订单", function() {
          if (data.result.success == true) {
            location.reload();
          } else {
            alert(data.result.message);
          }
        });
      }.bind(this)
    });
  },


  render: function() {
    return <div className={mmhc.orderDital} onClick={this.dListInf} data-id={this.props.myData.id}>
              <div className={cNs(mmhc.order,mmhc.clearfix)}  >
                <div className={mmhc.orderConte}>
                  <p className={mmhc.orderSn} >
                    订单号 : 
                    <span>{this.props.myData.orderSn}</span>
                  </p>
                  <p className={mmhc.createTime}>{ddd(this.props.myData.createTime)}</p>
                </div>

                <div className={cNs(mmhc.orderState,mmhc.orderState1)}>
                  待付款
                </div>
              </div>

              {
                this.props.myData.orderProductList.map(function(res,index){
                 return <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index} onClick={this.dGoodList} data-id={res.productId}>
                          
                            <img src={imgPath+res.productLeadLittle}/>
                            <figcaption>
                               <p className={mmhc.goodsTitle}>{cutText(res.productName,20)}</p>
                               <p className={mmhc.goodsPrice}>
                                 <span>￥</span>
                                 <span>{res.moneyPrice}</span>
                                 <span>X</span>
                                 <span>{res.number}</span>
                               </p>
                           </figcaption>
                          
                       </figure> 
                }.bind(this))
              }
              <div className={cNs(mmhc.goodsAll,mmhc.clearfix)}>
                合计: <span className = {mmhc.moneyOrder}>{this.props.myData.moneyOrder}</span>
                <p>
                  <span className={mmhc.orderCan} onClick={this.dPayCan} id={this.props.myData.id}>取消</span>
                  <span className={mmhc.orderBtn} onClick={this.dPay} id={this.props.myData.orderSn}>去支付</span>
                </p>
              </div>
            </div>
  }
});

var WaiteSend = React.createClass({
  /*订单详情*/
  dListInf: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.orderDital).attr("data-id");
    //console.log(mId);
    window.location.href = "/wechatMall/myOrderDetailsTwo.html?id=" + mId;
  },
  /*产品详情*/
  dGoodList: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.goodsBox).attr("data-id");
    // console.log(mId);
    if (mId == undefined) {
      //点击本身获取属性
      mId = $(event.target).attr("data-id");
    }
    window.location.href = "/wechatMall/detail.html?prdCode=" + mId;
  },
  render: function() {
    return <div className={mmhc.orderDital} onClick={this.dListInf} data-id={this.props.myData.id}>
              <div className={cNs(mmhc.order,mmhc.clearfix)}>
                <div className={mmhc.orderConte}>
                  <p className={mmhc.orderSn} >
                    订单号 : 
                    <span>{this.props.myData.orderSn}</span>
                  </p>
                  <p className={mmhc.createTime}>{ddd(this.props.myData.createTime)}</p>
                </div>

                <div className={mmhc.orderState}>
                  待发货
                </div>
              </div>
               {
                this.props.myData.orderProductList.map(function(res,index){
                 return <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index} onClick={this.dGoodList} data-id={res.productId}>
                          
                            <img src={imgPath+res.productLeadLittle}/>
                            <figcaption>
                               <p className={mmhc.goodsTitle}>{cutText(res.productName,20)}</p>
                                
                               <p className={mmhc.goodsPrice}>
                                 <span>￥</span>
                                 <span>{res.moneyPrice}</span>
                                 <span>X</span>
                                 <span>{res.number}</span>
                               </p>
                            </figcaption>
                          
                       </figure> 
                }.bind(this))
              }
              <div className={cNs(mmhc.goodsAll,mmhc.clearfix)}>
                合计: <span className = {mmhc.moneyOrder}>{this.props.myData.moneyOrder}</span>
              </div>
            </div>
  }
});

var WaiteTaken = React.createClass({
  /*订单详情*/
  dListInf: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.orderDital).attr("data-id");
    //console.log(mId);
    window.location.href = "/wechatMall/myOrderDetailsThree.html?id=" + mId;
  },
  /*产品详情*/
  dGoodList: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.goodsBox).attr("data-id");
    // console.log(mId);
    if (mId == undefined) {
      //点击本身获取属性
      mId = $(event.target).attr("data-id");
    }
    window.location.href = "/wechatMall/detail.html?prdCode=" + mId;
  },
  dShadow: function(event) {
    event.stopPropagation();
    window.location.href = "/wechatMall/downloadGuide.html";
  },
  dTaken: function(event) {
    event.stopPropagation();
    var mId = event.target.getAttribute("id");
    $.ajax({
      // url: jsonPath.path + '/order_v20.json',
      url: jsonPath.path + '/wechatMall/goodreceive_v20.json?orderId=' + mId,
      type: 'get',
      dataType: 'json',
      success: function(data) {
        if (data.result.success == true) {
          confirm("确认收货", function() {
            location.reload();
          });
        } else {
          alert(data.result.message);
        }
      }.bind(this)
    });
  },


  render: function() {
    return <div className={mmhc.orderDital} onClick={this.dListInf} data-id={this.props.myData.id}>
              <div className={cNs(mmhc.order,mmhc.clearfix)} onClick={this.dListInf}>
                <div className={mmhc.orderConte}>
                  <p className={mmhc.orderSn} >
                    订单号 : 
                    <span>{this.props.myData.orderSn}</span>
                  </p>
                  <p className={mmhc.createTime}>{ddd(this.props.myData.createTime)}</p>
                </div>

                <div className={mmhc.orderState}>
                  待收货
                </div>
              </div>

              {
                this.props.myData.orderProductList.map(function(res,index){

                 return <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index} onClick={this.dGoodList} data-id={res.productId}>
                          
                            <img src={imgPath+res.productLeadLittle}/>
                            <figcaption>
                               <p className={mmhc.goodsTitle}>{cutText(res.productName,20)}</p>
                                
                               <p className={mmhc.goodsPrice}>
                                 <span>￥</span>
                                 <span>{res.moneyPrice}</span>
                                 <span>X</span>
                                 <span>{res.number}</span>
                               </p>
                            </figcaption>
                        
                       </figure> 
                }.bind(this))
              }

              <div className={cNs(mmhc.goodsAll,mmhc.clearfix)}>
                合计: <span className = {mmhc.moneyOrder}>{this.props.myData.moneyOrder}</span>
                <p>
                  <span className={mmhc.orderCan} onClick={this.dShadow}>查看物流</span>
                  <span className={mmhc.orderBtn} onClick={this.dTaken} id={this.props.myData.id}>确认收货</span>
                </p>
              </div>
            </div>
  }
});

var WaitEvaluate = React.createClass({
  /*订单详情*/
  dListInf: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.orderDital).attr("data-id");

    // console.log(mId);
    window.location.href = "/wechatMall/myOrderDetailsFour.html?id=" + mId;
  },
  /*产品详情*/
  dGoodList: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.goodsBox).attr("data-id");
    // console.log($(event.target).parents("." + mmhc.goodsBox));
    // console.log(mId);
    if (mId == undefined) {
      //点击本身获取属性
      mId = $(event.target).attr("data-id");
    }
    window.location.href = "/wechatMall/detail.html?prdCode=" + mId;
  },
  dShadow: function(event) {
    event.stopPropagation();
    window.location.href = "/wechatMall/downloadGuide.html";
  },
  render: function() {
    return <div className={mmhc.orderDital} onClick={this.dListInf} data-id={this.props.myData.id}>
              <div className={cNs(mmhc.order,mmhc.clearfix)} onClick={this.dListInf}>
                <div className={mmhc.orderConte}>
                  <p className={mmhc.orderSn} >
                    订单号 : 
                    <span>{this.props.myData.orderSn}</span>
                  </p>
                  <p className={mmhc.createTime}>{ddd(this.props.myData.createTime)}</p>
                </div>

                <div className={mmhc.orderState}>
                  已完成
                </div>
              </div>
              {
                this.props.myData.orderProductList.map(function(res, index) {
                  return <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index} onClick={this.dGoodList} data-id={res.productId}>
                          
                            <img src={imgPath+res.productLeadLittle}/>
                            <figcaption>
                               <p className={mmhc.goodsTitle}>{cutText(res.productName,20)}</p>
                               
                            </figcaption>
                          
                       </figure>
                }.bind(this))
              }

              <div className={cNs(mmhc.goodsAll,mmhc.clearfix)}>
                合计: <span className = {mmhc.moneyOrder}>{this.props.myData.moneyOrder}</span>
                <p>
                  <span className={mmhc.orderCan}></span>
                  <span className={cNs(mmhc.orderBtn)} onClick={this.dShadow}>评价晒单</span>
                </p>
              </div>
        </div>
  }
});

var WaitEvaluate1 = React.createClass({
  dShadow: function(event) {
    event.stopPropagation();
    window.location.href = "/wechatMall/downloadGuide.html";
  },
  render: function() {
    return <div>
              {
                this.props.myData.orderProductList.map(function(res, index) {
                  return <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index}>
                          <img src={imgPath+res.productLeadLittle}/>
                          <figcaption>
                             <p className={mmhc.goodsTitle}>{cutText(res.productName,20)}</p>
                             <p className={mmhc.goodsPrice1}>
                              <b className={cNs((res.closeTime==946656000000)?"":mmhc.xiaoshi)} onClick={this.dShadow}>待评价</b>
                              <b className={cNs((res.closeTime!=946656000000)?"":mmhc.xiaoshi)} onClick={this.dShadow}>评价晒单</b>
                             </p>
                         </figcaption>
                       </figure>
                }.bind(this))
              }
        </div>
  }
});
/*取消订单*/
var CancleProduct = React.createClass({
  /*订单详情*/
  dListInf: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.orderDital).attr("data-id");
    //console.log(mId);
    window.location.href = "/wechatMall/myOrderDetailsFive.html?id=" + mId;
  },
  /*产品详情*/
  dGoodList: function(event) {
    event.stopPropagation();
    var mId = $(event.target).parents("." + mmhc.goodsBox).attr("data-id");
    // console.log(mId);
    if (mId == undefined) {
      //点击本身获取属性
      mId = $(event.target).attr("data-id");
    }
    window.location.href = "/wechatMall/detail.html?prdCode=" + mId;
  },
  render: function() {
    return <div className={mmhc.orderDital} onClick={this.dListInf} data-id={this.props.myData.id}>
              <div className={cNs(mmhc.order,mmhc.clearfix)}>
                <div className={mmhc.orderConte}>
                  <p className={mmhc.orderSn} >
                    订单号 : 
                    <span>{this.props.myData.orderSn}</span>
                  </p>
                  <p className={mmhc.createTime}>{ddd(this.props.myData.createTime)}</p>
                </div>

                <div className={mmhc.orderState}>
                  已取消
                </div>
              </div>
               {
                this.props.myData.orderProductList.map(function(res,index){
                 return <figure className={cNs(mmhc.clearfix,mmhc.goodsBox)} key={index} onClick={this.dGoodList} data-id={res.productId}>
                          
                            <img src={imgPath+res.productLeadLittle}/>
                            <figcaption>
                               <p className={mmhc.goodsTitle}>{cutText(res.productName,20)}</p>
                                
                               <p className={mmhc.goodsPrice}>
                                 <span>￥</span>
                                 <span>{res.moneyPrice}</span>
                                 <span>X</span>
                                 <span>{res.number}</span>
                               </p>
                            </figcaption>
                          
                       </figure> 
                }.bind(this))
              }
              <div className={cNs(mmhc.goodsAll,mmhc.clearfix)}>
                合计: <span className = {mmhc.moneyOrder}>{this.props.myData.moneyOrder}</span>
              </div>
            </div>
  }
});


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      myTitleList: ["全部", "待付款", "待发货", "待收货", "待评价"],
      goodsData: [],
      writeData: []
    };
  }

  /*加载更多分页数据*/
  moreMess() {
    this.state.pageNo++;
    /*获取li的索引*/
    var dataId = $("." + mmhc.active).attr("data-id")
      /*传入pageNo进行调用*/
    if (dataId == 0) {
      /*全部订单*/
      $.ajax({
        url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo,
        type: jsonPath.method,
        dataType: 'json',
        success: function(data) {
          Array.prototype.push.apply(this.state.goodsData, data.ordersList);

          this.setState({
            goodsData: this.state.goodsData
          }, function() {
            /*判断商品的条数*/
            if (this.state.goodsData.length == data.ordersCount) {
              $("." + mmhc.moreBottom).css({
                "display": "none"
              });
            }

          });
        }.bind(this)
      });
    } else if (dataId == 1) {
      /*未支付订单*/
      $.ajax({
        // url: jsonPath.path + '/order_v20.json',
        url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo + '&orderState=' + dataId,
        type: jsonPath.method,
        dataType: 'json',
        success: function(data) {
          // 点击新加数据添加到数组中
          Array.prototype.push.apply(this.state.goodsData, data.ordersList);
          this.setState({
            goodsData: this.state.goodsData
          }, function() {
            /*判断页数*/
            if (this.state.goodsData.length == data.ordersCount) {
              $("." + mmhc.moreBottom).css({
                "display": "none"
              });
            }
          });
        }.bind(this)
      });
    } else if (dataId == 4) {
      var myState = parseInt(dataId) + 1;
      $.ajax({
        url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo + '&orderState=' + myState,
        type: jsonPath.method,
        dataType: 'json',
        success: function(data) {
          Array.prototype.push.apply(this.state.writeData, data.ordersList);
          this.setState({
            writeData: this.state.writeData
          }, function() {
            /*判断页数*/
            if (this.state.writeData.length == data.ordersCount) {
              $("." + mmhc.moreBottom).css({
                "display": "none"
              });
            }
          });
        }.bind(this)
      });
    } else {
      var myState = parseInt(dataId) + 1;
      $.ajax({
        url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo + '&orderState=' + myState,
        type: jsonPath.method,
        dataType: 'json',
        success: function(data) {
          Array.prototype.push.apply(this.state.goodsData, data.ordersList);
          this.setState({
            goodsData: this.state.goodsData
          }, function() {
            /*判断页数*/
            if (this.state.goodsData.length == data.ordersCount) {
              $("." + mmhc.moreBottom).css({
                "display": "none"
              });
            }
          });
        }.bind(this)
      });
    }
  }

  /*开始-------------切换订单样式*/
  tabFun(event) {
    // this.state.pageNo = 0;
    var dataId = event.target.getAttribute("data-id");
    $("." + mmhc.titleCon).removeClass(mmhc.active);
    $("#tab" + dataId).addClass(mmhc.active);

    this.setState({
      pageNo: 1,
      goodsData: [],
      writeData: []
    }, function() {
      $("." + mmhc.shadow1).css({
        "display": "block"
      });
      $("." + mmhc.shadow).css({
        "display": "block"
      });
      if (dataId == 0) {
        /*全部订单*/
        $.ajax({
          // url: jsonPath.path + '/order_v20.json',
          url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo,
          type: jsonPath.method,
          dataType: 'json',
          success: function(data) {
            $("." + mmhc.shadow1).css({
              "display": "none"
            });
            $("." + mmhc.shadow).css({
              "display": "none"
            });

            var dDate = [];
            data.ordersList.map(function(mData, index) {
              if (mData.orderState == 1 || mData.orderState == 3 || mData.orderState == 4 || mData.orderState == 5 || mData.orderState == 6) { /*增加取消订单*/
                dDate.push(mData);
              }
            })
            var dLength = dDate.length;

            this.setState({
              goodsData: dDate
            }, function() {
              /*判断页数*/
              if (this.state.goodsData.length == dLength) {
                $("." + mmhc.moreBottom).css({
                  "display": "none"
                });
              }
              /*判断是否有数据*/
              if (this.state.goodsData == "") {
                $("." + mmhc.bImg).addClass(mmhc.block);
              } else {
                $("." + mmhc.bImg).removeClass(mmhc.block);
              }
            });
          }.bind(this)
        });
      } else if (dataId == 1) {
        /*未支付订单*/
        $.ajax({
          // url: jsonPath.path + '/order_v20.json',
          url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo + '&orderState=' + dataId,
          type: jsonPath.method,
          dataType: 'json',
          success: function(data) {
            // console.log(data);
            $("." + mmhc.shadow1).css({
              "display": "none"
            });
            $("." + mmhc.shadow).css({
              "display": "none"
            });
            this.setState({
              goodsData: data.ordersList
            }, function() {
              /*判断页数*/
              if (this.state.goodsData.length == data.ordersCount) {
                $("." + mmhc.moreBottom).css({
                  "display": "none"
                });
              }

              if (this.state.goodsData == "") {
                $("." + mmhc.bImg).addClass(mmhc.block);
              } else {
                $("." + mmhc.bImg).removeClass(mmhc.block);
              }
            });
          }.bind(this)
        });
      } else if (dataId == 4) {
        var myState = parseInt(dataId) + 1;
        $.ajax({
          // url: jsonPath.path + '/order_v20.json',
          url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo + '&orderState=' + myState,
          type: jsonPath.method,
          dataType: 'json',
          success: function(data) {
            $("." + mmhc.shadow1).css({
              "display": "none"
            });
            $("." + mmhc.shadow).css({
              "display": "none"
            });
            this.setState({
              goodsData: [],
              writeData: data.ordersList
            }, function() {
              /*判断页数*/
              if (this.state.writeData.length == data.ordersCount) {
                $("." + mmhc.moreBottom).css({
                  "display": "none"
                });
              }

              if (this.state.writeData == "") {
                $("." + mmhc.bImg).addClass(mmhc.block);
              } else {
                $("." + mmhc.bImg).removeClass(mmhc.block);
              }
            });
          }.bind(this)
        });
      } else {
        var myState = parseInt(dataId) + 1;
        $.ajax({
          url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo + '&orderState=' + myState,
          type: jsonPath.method,
          dataType: 'json',
          success: function(data) {
            $("." + mmhc.shadow1).css({
              "display": "none"
            });
            $("." + mmhc.shadow).css({
              "display": "none"
            });
            this.setState({
              goodsData: data.ordersList
            }, function() {
              /*判断页数*/
              if (this.state.goodsData.length == data.ordersCount) {
                $("." + mmhc.moreBottom).css({
                  "display": "none"
                });
              }
              if (this.state.goodsData == "") {
                $("." + mmhc.bImg).addClass(mmhc.block);
              } else {
                $("." + mmhc.bImg).removeClass(mmhc.block);
              }
            });
          }.bind(this)
        });
      }
    });
  }

  /*结束-------------切换订单样式*/

  render() {
    return (
      <div className={mmhc.box}>
        <ul className={mmhc.title} onClick = {this.aaa}>
          {
             this.state.myTitleList.map(function(list, index) {
              return  <li className={cNs(mmhc.titleCon,index==0?mmhc.active:"")} onClick={this.tabFun.bind(this)} id={"tab"+index} data-id={index} key={index}>
                        {list}
                      </li>
            }.bind(this))
          }
        </ul>
        <div className={mmhc.fixBox1}> 
          {/*className={cNs(mmhc.bImg,(this.state.goodsData!="")||(this.state.writeData!="")?mmhc.xiaoshi:"")}*/}
            <img src={noneImgPath} className={mmhc.bImg} />
          {
            this.state.goodsData.map(function(list, index) {
              if(list.orderState==1){
                return <WaitePay myData={list} key={index}/>
              }else if(list.orderState==3){
                return <WaiteSend myData={list} key={index} />
              }else if(list.orderState==4){
                return <WaiteTaken myData={list} key={index} />
              }else if(list.orderState==5){
                return <WaitEvaluate myData={list} key={index} />
              }else if(list.orderState==6){
                return <CancleProduct myData={list} key={index} />
              }
            }.bind(this))
          }

          {
            this.state.writeData.map(function(list, index) {
                return <WaitEvaluate1 myData={list} key={index}/>
            }.bind(this))
          }

          {/*<div onClick={this.fnActSix} className={mmhc.loadMore}>点击加载更多</div>
          <img src={moreImgPath} className={cNs(mmhc.moreBottom,(this.state.goodsData!="")||(this.state.writeData!="")?"":mmhc.xiaoshi)} onClick={this.moreMess.bind(this)}/>*/}
          <div className={cNs(mmhc.moreBottom,(this.state.goodsData!="")||(this.state.writeData!="")?"":mmhc.xiaoshi)} onClick={this.moreMess.bind(this)}>点击加载更多</div>
          <div className={mmhc.shadow}></div>
          <div className={mmhc.shadow1}>
            <img src={shadowImg} className={mmhc.loading}/>
          </div>
        </div>    
      </div>
    )
  }
  componentDidMount() {
    $.ajax({
      // url: jsonPath.path + '/order_v20.json',
      url: jsonPath.path + '/wechatMall/authc/order_v20.json?pageNo=' + this.state.pageNo,
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        $("." + mmhc.shadow1).css({
          "display": "none"
        });
        $("." + mmhc.shadow).css({
          "display": "none"
        });
        /*获取需要的数据*/
        var dDate = [];
        data.ordersList.map(function(mData, index) {
          if (mData.orderState == 1 || mData.orderState == 3 || mData.orderState == 4 || mData.orderState == 5 || mData.orderState == 6) {
            dDate.push(mData);
          }
        })

        /*获取数据的长度*/
        var dLength = dDate.length;

        this.setState({
          goodsData: dDate,
        }, function() {

          /*判断页数*/
          if (this.state.goodsData.length == dLength) {
            $("." + mmhc.moreBottom).css({
              "display": "none"
            });
          }

          if (this.state.goodsData == "") {
            $("." + mmhc.bImg).addClass(mmhc.block);
          } else {
            $("." + mmhc.bImg).removeClass(mmhc.block);
          }
        });
      }.bind(this)
    });
  }
}

export
default Main;