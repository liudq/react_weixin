var cNs = require('classnames');
var React = require("react");
var mmhc = require("./carOrder.css");
var adressImg = require("./order1.png");
var headImg = require("./head.png");
var phoneImg = require("./orderPhone.png");
var moRen = require("./moRen.png");
var shopImg = require("./shop.png");
var sevenImg = require("./seven.png");
var order3Img = require("./order3.png");
var order2Img = require("./order2.png");
var imgPath = require("../../common/util/path.js").path;

var GoodMap = React.createClass({
  render: function() {
    return (
      <div className={mmhc.goodsContent}>
        <div className={mmhc.goodsC1}>
          <img className={mmhc.shopImg} src={imgPath+this.props.goodMap.product.masterImg} alt=""/>
        </div>
        <div className={mmhc.goodsC2}>
          <p className={mmhc.goodsC2P}>{this.props.goodMap.product.name1}</p>
          <div className={mmhc.seven}><img className={mmhc.sevenImg} src={sevenImg} alt=""/></div>
        </div>
        <div className={mmhc.goodsC3}>
          <p className={mmhc.goodsNum}><i className={mmhc.goodsX}>x</i>{this.props.goodMap.count}</p>
          <p className={mmhc.goodsAmount}>￥{this.props.goodMap.product.malMobilePrice}</p>
        </div>
        <div className={mmhc.clear}></div>
      </div>
    )
  },
});

var Goods = React.createClass({
  getInitialState: function() {
    return {
      addGoods: []
    }
  },
  render: function() {
    return (
      <div className={mmhc.goods}>
        <div className={mmhc.goodsTitle}>{this.props.goods.seller.sellerName}</div>
          {
            this.state.addGoods.map(function(goodMap, index) {
              return <GoodMap  goodMap={goodMap} key={index}/>
            }.bind(this))
          }
      </div>
    )
  },
  componentWillMount: function() {
    this.setState({
      addGoods: this.props.goods.cartList
    });
  }
});



var Order = React.createClass({
  getInitialState: function() {
    return {
      member: {},
      cartInfoVO: {
        cartListVOs: []
      },
      address: {},
      config: {},
      orderCommitVO: {},
      invoiceList: [],
      remberName: "张三",
      invoiceValue: "个人",
      invoiceDisplay: mmhc.none,
      titleInvoice: "不开发票",
      integralState: 0,
      integralStateNum: "", //积分
      huaBi: "", //花币
      payMoney: "",
      passWordState: 0,
      passWord: "",
      acId: 0,
      bhId: 0,
      postageFree: 0
    }
  },
  orderButton: function() {
    if (this.state.passWordState == 0) {
      this.setState({
        passWordState: 1
      })
    };

  },
  invoiceTab: function() {
    if (this.state.invoiceDisplay == mmhc.none) {
      this.setState({
        invoiceDisplay: mmhc.block
      })
    } else {
      this.setState({
        invoiceDisplay: mmhc.none
      })
    }
  },
  invoiceQueDing: function() {
    var value = this.refs.myTextInput.value;
    if (value == "") {
      alert("请输入抬头");
      return false;
    };
    $.ajax({
      url: "/order/saveinvoice.json?content=" + this.state.invoiceValue,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode == true) {
          this.setState({
            invoiceDisplay: mmhc.none,
            titleInvoice: value
          })
        } else {
          alert(data.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  invoiceNoKai: function() {
    this.setState({
      invoiceDisplay: mmhc.none,
      titleInvoice: "不开发票"
    })
  },
  titleChange: function(event) {
    this.setState({
      invoiceValue: event.target.value
    })
  },
  integralFun: function() {
    if (this.state.integralState == 0) {
      this.setState({
        integralState: this.state.integralStateNum,
        payMoney: this.state.cartInfoVO.finalAmount - this.state.huaBi
      });
    } else {
      this.setState({
        integralState: 0,
        payMoney: this.state.cartInfoVO.finalAmount
      });
    }
  },
  quXiaoPassword: function() {
    this.setState({
      passWordState: 0
    })
  },
  queDingPassword: function() {
    if (this.state.titleInvoice == "不开发票") {
      var invoiceStatusCon = 0;
    } else {
      invoiceStatusCon = 1;
    };
    this.setState({
      passWordState: 0
    });
    $.ajax({
      url: "/order/checkbalancepwd.html?balancePwd=" + this.state.passWord,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.success) {
          $.ajax({
            type: 'post',
            url: "/authc/seckillpay/ordercommit.json",
            data: {
              addressId: this.state.address.id,
              integral: this.state.integralState,
              paymentName: "余额支付",
              paymentCode: "BALANCE",
              isBalancePay: "true",
              invoiceStatus: invoiceStatusCon,
              invoiceTitle: this.state.invoiceValue,
              balancePwd: this.state.passWord,
              activityProductId: this.state.acId,
              buyingHistoryId: this.state.bhId
            },
            error: function() {
              alert("提交订单失败");
            },
            success: function(dataJson) {
              if (dataJson.success) {
                if (dataJson.data.goJumpPayfor == false) {
                  window.location.href = "/authc/orderDetail.html";
                } else {
                  window.location.href = "/order/pay.html?relationOrderSn=" + dataJson.data.relationOrderSn + "&paySessionstr=" + dataJson.data.paySessionstr + "&rid" + Math.random();
                }
              } else {
                alert(dataJson.message);
              }

            }.bind(this),
            dataType: "json"
          });
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });

  },
  passWordChange: function(event) {
    this.setState({
      passWord: event.target.value
    });
  },
  render: function() {
    return (
      <div className={mmhc.div1}>
        <div className={mmhc.titleDiv}>
          <a href="javascript:history.back()">
            <img className={mmhc.order2Img} src={order2Img} alt=""/>
          </a>
          <p className={mmhc.title}>确认订单</p>
        </div>
        <div className={mmhc.titleDiv2}>11</div>
        <a href="/authc/addressList.html" className={mmhc.adress}>
          {
            this.state.address.addAll==""?
              <div className={mmhc.adressLeft}>添加收货地址</div>
            :
            <div className={mmhc.adressLeft}>
            <div className={mmhc.adressTop}>
              <div className={mmhc.adressTopL}>
                <img className={mmhc.headImg} src={headImg} alt=""/>
                <i className={mmhc.adressName}>{this.state.address.userName}</i>
              </div>
              <div className={mmhc.adressTopR}>
                <img className={mmhc.phoneImg} src={phoneImg} alt=""/>
                <i className={mmhc.adressName}>{this.state.address.deMobile}</i>
              </div>
              <div className={mmhc.clear}></div>
            </div>
            <div className={mmhc.adressBottom}>
              <div className={mmhc.adressBA}>
                {
                  this.state.address.state==1?<img className={mmhc.moRen} src={moRen} alt=""/>:<div></div>
                }
                {this.state.address.addAll}
              </div>
            </div>
          </div>
          }
          <div className={mmhc.adressRight}>
            <img className={mmhc.adressImg1} src={adressImg} alt=""/>
          </div>
          <div className={mmhc.clear}></div>
        </a>
        {
            this.state.cartInfoVO.cartListVOs.map(function(goods, index) {
              return <Goods key={index} goods={goods} />
            }.bind(this))
          }
        <div className={mmhc.goodsC4} style={{display:"none"}}>
          <div className={mmhc.goodsC4Top}>
            <div className={mmhc.goodsC4Title}>
              <div className={mmhc.invoiceLeft}>发票信息：</div>
              <div onClick={this.invoiceTab} className={mmhc.invoiceRight}>{this.state.titleInvoice}<i className={mmhc.invoiceImg}><img className={mmhc.order3Img} src={order3Img} alt=""/></i></div>
            </div>
          </div>
        </div>
        <div className={cNs(mmhc.invoiceContent,this.state.invoiceDisplay)} style={{display:"none"}}>
          <div className={mmhc.invoiceContentType}>发票类型：纸质发票</div>
          <div className={mmhc.invoiceHeader}>发票抬头</div>
          <input ref="myTextInput" onChange={this.titleChange} value={this.state.invoiceValue} className={mmhc.invoiceInput} type="text"/>
          <div className={mmhc.invoiceCon}>发票内容</div>
          <div className={mmhc.invoiceMingXi}>明细</div>
          <div className={mmhc.invoiceButtonDiv}>
            <div onClick={this.invoiceQueDing} className={mmhc.invoiceSure}>确定</div>
            <div onClick={this.invoiceNoKai} className={mmhc.invoiceNoSure}>不开发票</div>
            <div className={mmhc.clear}></div>
          </div>
        </div>
        <div className={mmhc.goodsC5}>
          <div className={mmhc.invoiceDiv}>
            <div className={mmhc.freightLeft}>运费：</div>
            <div className={mmhc.freightRight}>￥{this.state.postageFree}</div>
            <div className={mmhc.clear}></div>
          </div>
        </div>
        <div className={mmhc.goodsC6} style={{display:"none"}}>
        <div className={mmhc.freightLeft}>我的积分：可用积分{this.state.integralStateNum}可抵{this.state.huaBi}花币</div>
        <div className={mmhc.freightRight}><div onClick={this.integralFun} className={cNs(mmhc.liJiShiYong,this.state.integralState==0?"":mmhc.liJiShiYongActive)}>{this.state.integralState==0?"立即使用":"已使用"}</div></div>
        </div>
        <div className={mmhc.goodsC6}>
          <p>共{this.state.cartInfoVO.totalNumber}件商品,合计：<i className={mmhc.goodsC6I}>￥{this.state.cartInfoVO.cartAmount}</i></p>
        </div>
        <div className={mmhc.goodsC72}></div>
        <div className={mmhc.goodsC7}>
          <p>实付款：<i className={mmhc.goodsC6I}>￥{(this.state.postageFree)*1+1}</i></p>
          <button onClick={this.orderButton} className={mmhc.goodsC7B}>提交订单</button>
        </div>
        <div className={cNs(mmhc.passWordBackgrout,this.state.passWordState==0?mmhc.none:mmhc.block)}></div>
        <div className={cNs(mmhc.passwordAlert,this.state.passWordState==0?mmhc.none:mmhc.block)}>
          <div className={mmhc.passwordTiShi}>验证支付密码</div>
          <input onChange={this.passWordChange} type="password" placeholder="请输入支付密码"/>
          <a href="#" className={mmhc.wangJiPassword}>忘记密码</a>
          <div className={mmhc.passwordBottom}>
            <div onClick={this.quXiaoPassword} className={mmhc.quxiao}>取消</div>
            <div onClick={this.queDingPassword} className={mmhc.queding}>确定</div>
            <div className={mmhc.clear}></div>
          </div>
        </div>
      </div>
    )
  },
  componentWillMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var acId = GetQueryString("acId");
    var bhId = GetQueryString("bhId");
    var postageFree = GetQueryString("postageFree");

    this.setState({
      acId: acId,
      bhId: bhId,
      postageFree: postageFree
    });

    $.ajax({
      type: 'post',
      url: "/authc/seckillpay/info.json",
      data: {
        activityProductId: acId,
        pageUrl: window.location.href
      },
      success: function(data) {
        if ("false" === data.isLogin) {
          window.location.href = data.loginUrl;
        } else {
          this.setState({
            member: data.member,
            cartInfoVO: data.cartInfoVO,
            address: data.address,
            config: data.config,
            orderCommitVO: data.orderCommitVO,
            invoiceList: data.invoiceList,
            payMoney: data.cartInfoVO.finalAmount,
            integralStateNum: data.member.integral, //积分
            huaBi: data.member.integral / 100, //花币
          });
        }
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = Order;