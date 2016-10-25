var cNs = require('classnames');
var React = require("react");
var mmhc = require("./carContent.css");
var noShopCarimg = require("./shopCar_img.png");
var ShListimg1 = require("./shop.png");
var dellimg1 = require("./dell.jpg");
var imgPath = require("../../common/util/path.js").path;
var ShList = require("./shList/shList.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");

var ShoppingCar = React.createClass({
  getInitialState: function() {
    return {
      fromHome: ""
    }
  },
  render: function() {
    return (
      <div className={mmhc.div1}>
        <div className={cNs(mmhc.titleCar,this.props.versionTitel==1?mmhc.titel12:"")}>{this.state.fromHome==1?"":<a className={mmhc.backCss} href="javascript:history.go(-1);"><img src={this.props.versionTitel==1?back2Img:backImg} alt=""/></a>}购物车</div>
        <img className={mmhc.noShopImg} src={noShopCarimg} alt=""/>
        <p className={mmhc.font}>您还没给宝宝挑选任何商品噢...</p>
        <a className={mmhc.shCarA} href="/wechatMall/categoryPage.html">去逛逛</a>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var fromHome = GetQueryString("apk");
    this.setState({
      fromHome: fromHome
    });
  },
});



var ShCarlist = React.createClass({
  getInitialState: function() {
    return {
      cartAmount: "",
      cartListVOs: [],
      finalAmount: "",
      logisticsFeeAmount: "",
      totalNumber: "",
      sellerList: [],
      activtyList: [],
      activtyIdList: [],
      allChooseButtonState: 0,
      allId: "",
      allChoiceId: "",
      fromHome: "",
      cartInfoVO: {}
    }
  },
  updateCartData: function() {
    this.props.updateCartDataAjax();
  },
  allChoiceButtonFun: function() {
    var ajaxAllChoiceState = 0;
    if (this.state.allChooseButtonState == 2) {
      ajaxAllChoiceState = 3;
      /*this.setState({
        allChooseButtonState: 3
      })*/
    } else {
      ajaxAllChoiceState = 2;
      /*this.setState({
        allChooseButtonState: 2
      })*/
    };
    $.ajax({
      type: 'get',
      // url: "/productsList",
      url: "/cart/updateCartChooseById.json?choose=" + ajaxAllChoiceState + "&id=" + this.props.allId,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode == true) {
          this.props.updateCartDataAjax();
        } else {
          alert("请求数据失败");
        }
      }.bind(this),
      dataType: "json"
    });
  },
  jieSuanButtonFun: function() {
    if (this.state.allChoiceId == 0) {
      alert("请选择商品");
    } else {
      window.location.href = "/wechatMall/authc/order.html?cartIds=" + this.state.allChoiceId;
    }
  },
  render: function() {
    return (
      <div className={mmhc.divTop}>
        <div className={mmhc.yContent}>
          <div className={mmhc.allChoiceCss}>
            <div onClick={this.allChoiceButtonFun} className={cNs(mmhc.allChoiceButton,this.state.allChooseButtonState==3?mmhc.allChoiceButtonActive:"")}></div>
          全选</div>
        {/*活动的商品列表*/}
            {
               this.state.activtyIdList.map(function(activtyIdList, index) {
                return <div key={index}>
                  {
                     this.state.activtyList.map(function(activtyList, index) {
                      return activtyIdList!=activtyList.activtyId?"":<div key={index} className={mmhc.carActivity}>
                                                                        <div className={mmhc.sellerName}>{activtyList.activtyTitle}{activtyList.mergeOrder=="是"?<a href={activtyList.activityUrl+"?activityId="+activtyList.activtyId}>去凑单</a>:""}</div>
                                                                        {
                                                                           activtyList.cartList.map(function(cartList, index) {
                                                                            return <ShList activtyId={activtyList.activtyId} activtyTitle={activtyList.activtyTitle} updateCartData={this.updateCartData} key={index} cartList={cartList}/>
                                                                          }.bind(this))
                                                                        }
                                                                      </div>
                    }.bind(this))
                  }
                </div>
              }.bind(this))
            }
            {/*店铺商品*/}
            {
               this.state.sellerList.map(function(sellerList, index) {
                return <div key={index} className={mmhc.carActivity}>
                          <div className={mmhc.sellerName}>{sellerList.seller.sellerName}</div>
                          {
                             sellerList.cartList.map(function(cartList, index) {
                              return <ShList updateCartData={this.updateCartData} key={index} cartList={cartList}/>
                            }.bind(this))
                          }
                        </div>
              }.bind(this))
            }

        </div>
        <div className={mmhc.ybottom2}></div>
        <div className={mmhc.ybottom}>
          <div className={mmhc.yBottomT} >
            <div className={mmhc.yBottomT1}>已选{this.state.totalNumber}件商品</div>
            <div className={mmhc.yBottomT2}>商品总额：￥{this.state.cartAmount}</div>
            <div className={mmhc.clear} ></div>
          </div>
          <div className={mmhc.yBottomB} >
            <div className={mmhc.yBottomBL}>
              <div className={mmhc.yBottomB1}>合计：<i className={mmhc.yBottomI}>￥{this.state.finalAmount}</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直降：-￥{this.state.cartInfoVO.preferential
}</div>
              <div className={mmhc.yBottomB2}>运费：{this.state.logisticsFeeAmount}</div>
            </div>
            <a onClick={this.jieSuanButtonFun} href="javascript:void(0)" className={mmhc.yBottomBR}>结算</a>
          </div>
        </div>
      </div>
    );

  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var fromHome = GetQueryString("apk");
    this.setState({
      fromHome: fromHome
    });
  },
  componentWillReceiveProps: function(newPrps) {
    var activtyIdList = [];
    var activtyIdNum = 0;
    newPrps.activtyList.map(function(activtyList, index) {
      var idState = false;
      activtyIdList.map(function(activtyIdList, index2) {
        if (activtyIdList == activtyList.activtyId) {
          idState = true;
        }
      });
      if (idState != true) {
        activtyIdList[activtyIdNum] = activtyList.activtyId;
        activtyIdNum++;
      };
    });
    this.setState({
      cartAmount: newPrps.cartAmount,
      cartListVOs: newPrps.cartListVOs,
      finalAmount: newPrps.finalAmount,
      logisticsFeeAmount: newPrps.logisticsFeeAmount,
      totalNumber: newPrps.totalNumber,
      sellerList: newPrps.sellerList,
      activtyList: newPrps.activtyList,
      activtyIdList: activtyIdList,
      allChooseButtonState: newPrps.allChooseButtonState,
      allId: newPrps.allId,
      allChoiceId: newPrps.allChoiceId,
      cartInfoVO: newPrps.cartInfoVO
    })
  },

});

var Finish = React.createClass({
  getInitialState: function() {
    return {
      cartInfoVO: {},
      cartAmount: "",
      cartListVOs: [],
      finalAmount: "",
      logisticsFeeAmount: "",
      totalNumber: "",
      start: 0,
      sellerList: [],
      activtyList: [],
      allChooseButtonState: 0,
      allId: "",
      allChoiceId: "",
      versionTitel: 0
    }
  },
  updateCartDataAjax: function() {
    $.ajax({
      // url: "/json/order/getcartinfo.json",
      url: "/cart/detail.json",
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        /*将商品分为活动的和非活动的两个数组*/
        var sellerList = [];
        var activtyList = [];
        var sellerI = 0;
        var activtyI = 0;
        if (data.cartInfoVO == undefined || data.cartInfoVO.cartListVOs == undefined || data.cartInfoVO.cartListVOs.length == 0) {
          this.setState({
            start: 1
          })
        } else {
          this.setState({
            start: 2
          }, function() {
            data.cartInfoVO.cartListVOs.map(function(cartListVOs, index) {
              if (cartListVOs.activtyId == undefined) {
                sellerList[sellerI] = cartListVOs;
                sellerI++;
              } else {
                activtyList[activtyI] = cartListVOs;
                activtyI++;
              };
            });
            //初始化全选按钮的状态
            var allChooseButton = 1;
            var allId = "";
            var allChoiceId = "";
            data.cartInfoVO.cartListVOs.map(function(cartListVOs, index) {
              cartListVOs.cartList.map(function(cartList, index) {
                allId = allId + "," + cartList.id
                if (cartList.choose == 1) {
                  allChoiceId = allChoiceId + "," + cartList.id;
                };
                if (cartList.choose != 1) {
                  allChooseButton = 0;
                }
              })
            });
            if (allChooseButton == 0) {
              this.setState({
                allChooseButtonState: 2 //没全选状态
              })
            } else {
              this.setState({
                allChooseButtonState: 3 //全选状态
              })
            };
            this.setState({
              cartInfoVO: data.cartInfoVO,
              cartAmount: data.cartInfoVO.cartAmount,
              cartListVOs: data.cartInfoVO.cartListVOs,
              finalAmount: data.cartInfoVO.finalAmount,
              logisticsFeeAmount: data.cartInfoVO.logisticsFeeAmount,
              totalNumber: data.cartInfoVO.totalNumber,
              sellerList: sellerList,
              activtyList: activtyList,
              allId: allId.slice(1),
              allChoiceId: allChoiceId.slice(1)

            })
          });
        }

      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    if (this.state.start == 1) {
      return <ShoppingCar versionTitel={this.state.versionTitel} />;
    } else if (this.state.start == 2) {
      return <ShCarlist versionTitel={this.state.versionTitel} cartInfoVO={this.state.cartInfoVO} allChoiceId={this.state.allChoiceId} allId={this.state.allId} allChooseButtonState={this.state.allChooseButtonState} updateCartDataAjax={this.updateCartDataAjax} cartAmount={this.state.cartAmount} cartListVOs={this.state.cartListVOs} finalAmount={this.state.finalAmount} logisticsFeeAmount={this.state.logisticsFeeAmount} totalNumber={this.state.totalNumber} sellerList={this.state.sellerList} activtyList={this.state.activtyList} />;
    } else {
      return <div></div>;
    }
  },
  componentDidMount: function() {
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
      // url: "/json/order/getcartinfo.json",
      url: "/cart/detail.json",
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        /*将商品分为活动的和非活动的两个数组*/
        var sellerList = [];
        var activtyList = [];
        var sellerI = 0;
        var activtyI = 0;
        if (data.cartInfoVO == undefined || data.cartInfoVO.cartListVOs == undefined || data.cartInfoVO.cartListVOs.length == 0) {
          this.setState({
            start: 1
          })
        } else {
          this.setState({
            start: 2
          }, function() {
            data.cartInfoVO.cartListVOs.map(function(cartListVOs, index) {
              if (cartListVOs.activtyId == undefined) {
                sellerList[sellerI] = cartListVOs;
                sellerI++;
              } else {
                activtyList[activtyI] = cartListVOs;
                activtyI++;
              };
            });
            //初始化全选按钮的状态
            var allChooseButton = 1;
            var allId = "";
            var allChoiceId = "";
            data.cartInfoVO.cartListVOs.map(function(cartListVOs, index) {
              cartListVOs.cartList.map(function(cartList, index) {
                allId = allId + "," + cartList.id;
                if (cartList.choose == 1) {
                  allChoiceId = allChoiceId + "," + cartList.id;
                };
                if (cartList.choose != 1) {
                  allChooseButton = 0;
                }
              })
            });
            if (allChooseButton == 0) {
              this.setState({
                allChooseButtonState: 2 //没全选状态
              })
            } else {
              this.setState({
                allChooseButtonState: 3 //全选状态
              })
            };
            this.setState({
              cartInfoVO: data.cartInfoVO,
              cartAmount: data.cartInfoVO.cartAmount,
              cartListVOs: data.cartInfoVO.cartListVOs,
              finalAmount: data.cartInfoVO.finalAmount,
              logisticsFeeAmount: data.cartInfoVO.logisticsFeeAmount,
              totalNumber: data.cartInfoVO.totalNumber,
              sellerList: sellerList,
              activtyList: activtyList,
              allId: allId.slice(1),
              allChoiceId: allChoiceId.slice(1)

            })
          });
        }

      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = Finish;