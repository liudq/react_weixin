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
var back2Img = require("./back2.png");
var imgPath = require("../../common/util/path.js").path;

var GoodMap = React.createClass({
  render: function() {
    return (
      <div className={mmhc.goodsContent}>
        <div className={mmhc.goodsC1}>
          <img className={mmhc.shopImg} src={imgPath+this.props.goodMap.product.masterImg} alt=""/>
        </div>
        <div className={mmhc.goodsC2}>
          <p className={mmhc.goodsC2P}>{this.props.goodMap.product.name1.length>32?this.props.goodMap.product.name1.slice(0,32)+"...":this.props.goodMap.product.name1}</p>
          <p className={mmhc.goodsC2P}>{this.props.goodMap.specInfo}</p>
          {/*<div className={mmhc.seven}><img className={mmhc.sevenImg} src={sevenImg} alt=""/></div>*/}
          <div className={mmhc.goodsC3}>
            <p className={mmhc.goodsNum}><i className={mmhc.goodsX}>x</i>{this.props.goodMap.count}</p>
            <p className={mmhc.goodsAmount}>￥{this.props.goodMap.product.malMobilePrice}</p>
          </div>
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
      huaBi: 0, //花币
      payMoney: "",
      passWordState: 0,
      passWord: "",
      mySelectValue: "",
      coupons: [],
      couponsPrice: 0, //选择优惠券的金额s
      needAuthRealName: "",
      realNameState: 0,
      realNameInput: "",
      realNumber: "",
      //支付方式
      payName: "网银支付",
      payCode: "ONLINE",
      payFunState: mmhc.none,
      preferential: "",
      jifen: mmhc.none,
      zhijiangState: 1,
      phoneType: "",
      appSource: "",
      appVersion: "",
      versionTitel: 0
    }
  },
  orderButton: function() {
    /*if (this.state.passWordState == 0) {
      this.setState({
        passWordState: 1
      })
    };*/
    if (this.state.address.id == undefined) {
      alert("请添加收货地址");
      return false;
    };
    if (this.state.needAuthRealName == true) {
      this.setState({
        realNameState: 1
      });
      return false;
    };
    if (this.state.titleInvoice == "不开发票") {
      var invoiceStatusCon = 0;
    } else {
      if (this.state.titleInvoice == "个人") {
        invoiceStatusCon = 2;
      } else {
        invoiceStatusCon = 1;
      }
    };
    $.ajax({
      type: 'post',
      url: "/wechatMall/authc/ordercommit.json",
      data: {
        addressId: this.state.address.id,
        integral: this.state.integralState,
        paymentName: "微信支付",
        paymentCode: "WXPAY",
        isBalancePay: "false",
        invoiceStatus: invoiceStatusCon,
        invoiceTitle: this.state.invoiceValue,
        balancePwd: "",
        couponCode: this.state.mySelectValue,
        phoneType: this.state.phoneType,
        appSource: this.state.appSource,
        appVersion: this.state.appVersion
      },
      error: function() {
        alert("提交订单失败");
      },
      success: function(dataJson) {
        if (dataJson.success) {
          if (dataJson.data.goJumpPayfor == false) {
            window.location.href = "/wechatMall/authc/orderDetail.html";
          } else {
            window.location.href = "/wechatMall/authc/orderPay.html?relationOrderSn=" + dataJson.data.relationOrderSn + "&paySessionstr=" + dataJson.data.paySessionstr + "&rid" + Math.random() + "&paymentName=微信支付" + "&paymentCode=WXPAY";
          }
        } else {
          alert(dataJson.message);
        }

      }.bind(this),
      dataType: "json"
    });

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
  jifenFun: function() {
    if (this.state.jifen == mmhc.none) {
      this.setState({
        jifen: mmhc.block
      })
    } else {
      this.setState({
        jifen: mmhc.none
      })
    }
  },
  integralFun: function() {
    if (this.state.integralState == 0) {
      this.setState({
        integralState: this.state.integralStateNum,
        //payMoney: this.state.cartInfoVO.finalAmount * 1 - this.state.huaBi * 1 - this.state.couponsPrice * 1
        payMoney: (this.state.cartInfoVO.finalAmount * 1 - this.state.couponsPrice * 1 - this.state.huaBi).toFixed(2)
      });
    } else {
      this.setState({
        integralState: 0,
        payMoney: (this.state.cartInfoVO.finalAmount * 1 - this.state.couponsPrice * 1).toFixed(2)
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
            url: "/order/ordercommit.json",
            data: {
              addressId: this.state.address.id,
              integral: this.state.integralState,
              paymentName: "微信支付",
              paymentCode: "WXPAY",
              isBalancePay: "true",
              invoiceStatus: invoiceStatusCon,
              invoiceTitle: this.state.invoiceValue,
              balancePwd: this.state.passWord,
              couponCode: this.state.mySelectValue
            },
            error: function() {
              alert("提交订单失败");
            },
            success: function(dataJson) {
              if (dataJson.success) {
                if (dataJson.data.goJumpPayfor == false) {
                  window.location.href = "/wechatMall/authc/orderDetail.html";
                } else {
                  window.location.href = "/wechatMall/orderPay.html?relationOrderSn=" + dataJson.data.relationOrderSn + "&paySessionstr=" + dataJson.data.paySessionstr + "&rid" + Math.random();
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
  mySelectFun: function(event) {
    var moneyPay = 0;
    if (this.state.cartInfoVO.finalAmount * 1 - $("#" + event.target.value).attr("data-price") * 1 - this.state.integralState / 100 < 0) {
      moneyPay = 0;
    } else {
      moneyPay = (this.state.cartInfoVO.finalAmount * 1 - $("#" + event.target.value).attr("data-price") * 1 - this.state.integralState / 100).toFixed(2);
      // if ($("#" + event.target.value).attr("data-price") * 1 == 0) {
      //   this.setState({
      //     zhijiangState: 1
      //   });
      //   moneyPay = (this.state.cartInfoVO.finalAmount * 1 - $("#" + event.target.value).attr("data-price") * 1 - this.state.integralState / 100).toFixed(2);
      // } else {
      //   //使用优惠券不能参与直降
      //   this.setState({
      //     zhijiangState: 0
      //   });
      //   moneyPay = (this.state.cartInfoVO.finalAmount * 1 - $("#" + event.target.value).attr("data-price") * 1 - this.state.integralState / 100 + this.state.preferential).toFixed(2);
      // };

    };
    var idcoupon = "";
    if (event.target.value == "kongId") {
      idcoupon = null;
    } else {
      idcoupon = event.target.value;
    };
    this.setState({
      mySelectValue: idcoupon,
      couponsPrice: $("#" + event.target.value).attr("data-price"), //优惠金额
      //payMoney: this.state.cartInfoVO.finalAmount * 1 - this.state.huaBi * 1 - $("#" + event.target.value).attr("data-price") * 1
      payMoney: moneyPay
    });
  },
  realNameFun: function() {
    $.ajax({
      url: "/shiming.json?realName=" + this.state.realNameInput + "&idCardNo=" + this.state.realNumber,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.success == true) {
          this.setState({
            realNameState: 0,
            needAuthRealName: false
          })
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  realName: function(event) {
    this.setState({
      realNameInput: event.target.value
    });
  },
  realNumberFun: function(event) {
    this.setState({
      realNumber: event.target.value
    });
  },
  quitRealName: function() {
    this.setState({
      realNameState: 0
    })
  },
  payFun: function() {
    if (this.state.payFunState == mmhc.none) {
      this.setState({
        payFunState: mmhc.block
      })
    } else {
      this.setState({
        payFunState: mmhc.none
      })
    }
  },
  onLineFun: function() {
    this.setState({
      payFunState: mmhc.none,
      payName: "网银支付",
      payCode: "ONLINE"
    })
  },
  aliPay: function() {
    this.setState({
      payFunState: mmhc.none,
      payName: "支付宝支付",
      payCode: "ALIPAY"
    })
  },
  wxPay: function() {
    this.setState({
      payFunState: mmhc.none,
      payName: "微信支付",
      payCode: "WXPAY"
    })
  },
  // 积分加方法
  jifenAddFun: function() {
    if (this.state.integralState < this.state.huaBi * 100 && this.state.payMoney >= 1) {
      this.setState({
        integralState: this.state.integralState + 100,
        payMoney: (this.state.cartInfoVO.finalAmount * 1 - this.state.couponsPrice * 1 - (this.state.integralState + 100) / 100).toFixed(2)
      })
    }
  },
  // 积分减方法
  jifenJianFun: function() {
    if (this.state.integralState > 0) {
      this.setState({
        integralState: this.state.integralState - 100,
        payMoney: (this.state.cartInfoVO.finalAmount * 1 - this.state.couponsPrice * 1 - (this.state.integralState - 100) / 100).toFixed(2)
      })
    }
  },
  render: function() {
    return (
      <div className={mmhc.divTop}>
        <div className={mmhc.div1}>
          <a href="/wechatMall/authc/addressList.html" className={mmhc.adress}>
            {
              this.state.address.id==undefined?
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
          <div className={mmhc.goodsC4}>
            <div className={mmhc.goodsC4Top}>
              <div className={mmhc.goodsC4Title}>
                <div className={mmhc.invoiceLeft}>发票信息：</div>
                <div onClick={this.invoiceTab} className={mmhc.invoiceRight}>{this.state.titleInvoice.length>20?this.state.titleInvoice.slice(0,20)+"...":this.state.titleInvoice}<i className={mmhc.invoiceImg}><img className={mmhc.order3Img} src={order3Img} alt=""/></i></div>
              </div>
            </div>
          </div>
          <div className={cNs(mmhc.invoiceContent,this.state.invoiceDisplay)}>
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
          {/*<div className={mmhc.goodsC4}>
            <div className={mmhc.goodsC4Top}>
              <div className={mmhc.goodsC4Title}>
                <div className={mmhc.invoiceLeft}>支付方式：</div>
                <div onClick={this.payFun} className={mmhc.invoiceRight}>{this.state.payName}<i className={mmhc.invoiceImg}><img className={mmhc.order3Img} src={order3Img} alt=""/></i></div>
              </div>
            </div>
          </div>
          <div className={cNs(mmhc.invoiceContent,this.state.payFunState)}>
            <div onClick={this.onLineFun}>网银支付</div>
            <div onClick={this.aliPay} className={mmhc.payCss}>支付宝支付</div>
            <div onClick={this.wxPay} className={mmhc.payCss}>微信支付</div>
          </div>*/}
          <div className={mmhc.goodsC5}>
            <div className={mmhc.invoiceDiv}>
              <div className={mmhc.freightLeft}>运费：</div>
              <div className={mmhc.freightRight}>￥{this.state.cartInfoVO.logisticsFeeAmount}</div>
              <div className={mmhc.clear}></div>
            </div>
          </div>
          <div style={{"display":"none"}} className={mmhc.goodsC6}>
            <div className={mmhc.freightLeft}>我的积分：共有积分{this.state.integralStateNum}可用{this.state.huaBi*100}积分</div>
            <div onClick={this.jifenFun} className={mmhc.invoiceRight}>{this.state.integralState==0?"立即使用":"已使用"}<i className={mmhc.invoiceImg}><img className={mmhc.order3Img} src={order3Img} alt=""/></i></div>
          </div>
          <div className={cNs(mmhc.invoiceContent,this.state.jifen)}>
            <div className={mmhc.jifenDiv}>
              <div onClick={this.jifenJianFun} className={mmhc.jifenJian}></div>
              <div className={mmhc.jifenLeft}>{this.state.integralState}</div>
              <div onClick={this.jifenAddFun} className={mmhc.jifenJia}></div>
              <div className={mmhc.jifenHuaBi}>抵花币 ￥{this.state.integralState/100}</div>
              <div className={mmhc.clear}></div>
            </div>
            <div className={mmhc.jifenRule}>使用规则（积分满100即可使用）</div>
          </div>
        {/*使用优惠券*/}
          <div className={mmhc.goodsC6}>
            <div className={mmhc.freightLeft}>我的优惠券</div>
            <div className={cNs(mmhc.freightRight,mmhc.selectCss)}>
              <select onChange={this.mySelectFun} name="mySelect" id="mySelect">
                <option id="kongId" value="kongId" data-price="0">--不使用--</option>
                {
                   this.state.coupons.map(function(coupons, index) {
                    return <option id={coupons.code} data-price={coupons.amount} key={index} value={coupons.code}>满{coupons.miniAmount}元减{coupons.amount}元</option>
                  }.bind(this))
                }
                
              </select>
            </div>
          </div>
          <div className={mmhc.goodsC6}>
            <p>共{this.state.cartInfoVO.totalNumber}件商品,合计：<i className={mmhc.goodsC6I}>￥{this.state.cartInfoVO.cartAmount}</i></p>
          </div>
          <div style={{"display":this.state.zhijiangState==1?"block":"none"}} className={mmhc.goodsC6}>  
            <p>优惠金额：<i className={mmhc.goodsC6I}>-￥{this.state.preferential}</i></p>
          </div>
         
          
          <div className={cNs(mmhc.passWordBackgrout,this.state.passWordState==0?mmhc.none:mmhc.block)}></div>
          <div className={cNs(mmhc.passwordAlert,this.state.passWordState==0?mmhc.none:mmhc.block)}>
            <div className={mmhc.passwordTiShi}>验证支付密码</div>
            <input onChange={this.passWordChange} type="password" placeholder="请输入支付密码"/>
            {/*<a href="/member/editbalancepassword.html" className={mmhc.wangJiPassword}>忘记密码</a>*/}
            <div className={mmhc.passwordBottom}>
              <div onClick={this.quXiaoPassword} className={mmhc.quxiao}>取消</div>
              <div onClick={this.queDingPassword} className={mmhc.queding}>确定</div>
              <div className={mmhc.clear}></div>
            </div>
          </div>
          <div onClick={this.quitRealName} className={cNs(mmhc.passWordBackgrout,this.state.realNameState==0?mmhc.none:mmhc.block)}></div>
          <div className={cNs(mmhc.realNameCss,this.state.realNameState==0?mmhc.none:mmhc.block)}>
            <input onChange={this.realName} type="text" placeholder="姓名"/>
            <input onChange={this.realNumberFun} type="text" placeholder="身份证号"/>
            <div>
              <button onClick={this.realNameFun} className={mmhc.realNameButton}>实名认证</button>
            </div>
          </div>
        </div>
        <div className={mmhc.goodsC7}>
          <p>实付款：<i className={mmhc.goodsC6I}>￥{this.state.payMoney}</i></p>
          <button onClick={this.orderButton} className={mmhc.goodsC7B}>提交订单</button>
        </div>
      </div>

    )
  },
  componentWillMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var addressId = GetQueryString("addressId");
    if (addressId == null) {
      var addressId = "";
    };

    //获取渠道来源，版本号，手机型号
    var phoneType = localStorage.getItem("phoneType");
    var appSource = localStorage.getItem("appSource");
    var appVersion = localStorage.getItem("version");
    this.setState({
      phoneType: phoneType,
      appSource: appSource,
      appVersion: appVersion
    });
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };
    $.ajax({
      type: 'get',
      // url: "/json/order/info.json",
      url: "/order/info.json?addressId=" + addressId,
      success: function(data) {
        var empCoupons = [];
        var empAddress = {};
        if (data.coupons != undefined) {
          empCoupons = data.coupons;
        };
        if (empAddress != undefined) {
          empAddress = data.address;
        };
        this.setState({
          member: data.member,
          cartInfoVO: data.cartInfoVO,
          address: empAddress,
          config: data.config,
          orderCommitVO: data.orderCommitVO,
          invoiceList: data.invoiceList,
          payMoney: data.cartInfoVO.finalAmount.toFixed(2),
          integralStateNum: data.member.integral, //积分
          huaBi: Math.floor(data.member.integral / 100), //花币
          coupons: empCoupons,
          needAuthRealName: data.needAuthRealName,
          preferential: data.cartInfoVO.preferential
        });
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = Order;