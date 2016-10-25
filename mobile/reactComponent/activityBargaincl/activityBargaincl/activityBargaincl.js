var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityBargaincl.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");

var bannerImg = require("./bannerapp.jpg");
var producta = require("./sfg.jpg");
var cartB = require("./car2.jpg");

var upImg = require("./up.png");
var backBottomImg = require("./back.png");



var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      url: "",
      activityProductVOList: [],
      ruleShowFlag: false,
      versionTitel: 0,
      activityId: "",
      result: [],
      on: mmhc.on,
      countdown: "",
      activityName: ""
    }
  },
  showRule: function() {
    this.setState({
      ruleShowFlag: true
    });
  },
  hideRule: function() {
    this.setState({
      ruleShowFlag: false
    });
  },
  fnActOne: function() {
    this.setState({
      on: mmhc.on,
      on2: ""
    });
    $.ajax({
      // url: jsonPath.path + "/activity/砍价a区activityProductMobileTop.json?activityId=" + 25,
      url: jsonPath.path + "/activityProductMobileTop.json?activityId=" + 25,

      type: jsonPath.method,
      success: function(data) {
        this.setState({
          activityProductVOList: data.activityProductVOList,
          activityName: data.activityName,
          countdown: data.countdown,
          activityId: 25
        }, function() {


        });

        // $("."+mmhc.Price1).css("display","none");
        // $("."+mmhc.Price2).css("display","none");



      }.bind(this),
      dataType: "json"
    });
    $('html,body').animate({
      scrollTop: 0
    }, 800);
  },
  fnActTwo: function() {
    this.setState({
      on2: mmhc.on,
      on: ""
    });
    $.ajax({
      // url: jsonPath.path + "/activity/砍价b区activityProductMobileHotList.json?activityId=" + 25,
      url: jsonPath.path + "/activityProductMobileHotList.json?activityId=" + 25,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          activityProductVOList: data.activityProductVOList,
          activityName: data.activityName,
          countdown: data.countdown,
          activityId: 25
        }, function() {

        });

        // $("."+mmhc.Price1).css("display","block");
        // $("."+mmhc.Price2).css("display","block");

      }.bind(this),
      dataType: "json"
    });
    $('html,body').animate({
      scrollTop: 0
    }, 800);
  },
  fnAddCar: function(event) {
    var productId = event.target.getAttribute("data-id");
    // alert(productId)
    $.ajax({
      type: jsonPath.method,
      url: jsonPath.path + "/cart/addtocart.json",
      data: {
        "productId": productId,
        //"productGoodId": this.state.goodsIdStateEnd, //点击规格以后的规格id
        "number": 1,
        "pageUrl": window.location.href,
        "activityId": this.state.activityId
      },
      success: function(data) {
        if (data.resultcode == true) {


        } else {
          alert(data.msg);
        };
      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div className={mmhc.content}>
          <div className={mmhc.specialTitlet}></div>
          <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
            {this.state.apkState==1?<a href="back" className={mmhc.backImgCss}><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
            活动专场
            <a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/bargainShare.html,呼朋唤友来砍价,分享至微信朋友圈其他人打开分享页面并点击砍价!"}>
              <img src={this.state.versionTitel==1?share2Img:sshareImg} alt=""/>
            </a>
          </div>

          <div className={mmhc.bannerContainer}>
            <img className={mmhc.banner} src={bannerImg} width="100%" alt=""/>
            <div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则</div>
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
              <h1>活动规则</h1>
              <p>1、在本活动专区选择商品，加入购物车生成订单，分享至微信朋友圈，其他人打开分享页面，并点击砍价；</p>
              <p>2、本活动专区单次限购一件商品；</p>
              <p>3、砍价成功参与砍价用户获得一次翻牌机会（未注册用户需在砍价活动页完成注册）；</p>
              <p>4、本场活动不可使用优惠券；</p>
              <p>5、本活动专区享受包邮；</p>
              <p>6、订单支付完成赠送一次翻牌机会；</p>
              <p>7、本活动专区非质量问题不支持退换货；</p>
              <p>8、活动时间：6月16日-6月21日。</p>
              <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
              <a href="javascript:void(0);" onClick={this.hideRule}>我知道了</a>
            </div>
          </div>

          <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
          <div className={mmhc.tabConTop}>
            <ul className={cNs(mmhc.tabCon,mmhc.clearfix)}>
              <li onClick={this.fnActOne}>
                <div className={cNs(mmhc.xhfather,mmhc.tehui)}>特惠区
                  <div className={cNs(mmhc.xiahua,this.state.on)}></div>
                </div>
              </li>
              <li onClick={this.fnActTwo}>
                <div className={cNs(mmhc.xhfather,this.state.chaozhi)}>超值区
                  <div className={cNs(mmhc.xiahua,this.state.on2)}></div>
                </div>
              </li>
            </ul>
          </div>

          <div className={mmhc.mainCon} >

                      <div className={cNs(mmhc.Price1,mmhc.mRow)}>
                        <div className={cNs(mmhc.Price1_left,mmhc.fl)}>
                          <div className={mmhc.xiahuaa}></div>
                        </div>
                        <div className={cNs(mmhc.Price1_center,mmhc.fl)}>{this.state.activityName}</div>
                        <div className={cNs(mmhc.Price1_right,mmhc.fr)}>
                          <div className={mmhc.xiahuaa}></div>
                        </div>
                      </div>

                      <div className={mmhc.productCon}>
                        <ul className={mmhc.clearfix}>
                          {
                            this.state.activityProductVOList.map(function(elem,index){
                              return  <li key={index} className={cNs(mmhc.fl,mmhc.productM)}>
                                        <a href={"/seckillpay/bargainDetail.html?acId="+elem.activityProductId+"&prdCode="+elem.id+"&activityId="+this.state.activityId}>
                                          <div className={mmhc.productaImg}>
                                            <img src={imgPath+elem.masterImg} alt=""/>
                                          </div>
                                        </a>
                                        <div>
                                          <p className={mmhc.productaName}>{elem.name1}</p>
                                        </div>
                                        <div className={mmhc.moneyCart}>
                                          <div className={mmhc.moneyN}>
                                            <em className={mmhc.moneyN1}>￥</em><em className={mmhc.moneyN2}>{elem.malMobilePrice}</em>
                                          </div>
                                          <div className={mmhc.moneyN3top}>
                                            <em className={mmhc.moneyN3}>最低价:￥{elem.minPrice}</em>
                                          </div>
                                        </div>
                                      </li>


                            }.bind(this))
                          }


                        </ul>
                      </div>



          </div>


          <div className={cNs(mmhc.Price2,mmhc.mRow)}>
            <div className={cNs(mmhc.Price1_left,mmhc.fl)}>
              <div className={mmhc.xiahuaa}></div>
            </div>
            <div className={cNs(mmhc.Price1_center,mmhc.fl)}><a href="./fourChooseOneBaoKuan.html"><p className={mmhc.tb}>更多</p></a></div>
            <div className={cNs(mmhc.Price1_right,mmhc.fr)}>
              <div className={mmhc.xiahuaa}></div>
            </div>
          </div>

          <div className={mmhc.historya}>
            <a href="/seckillpay/buyHistoryList.html">
              <div className={mmhc.historyaz}>
               我的抢购历史
               <div className={mmhc.historyazs}></div>
              </div>
            </a>
          </div>


        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.apkState==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}

      </div>
    )
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

    if ($(window).width() < 330) {
      $("." + mmhc.moneyN3).css("display", "none")
    }


    $(window).scroll(function() {
      if ($(window).scrollTop() >= 140) {
        $("." + mmhc.tabConTop).css({
          "position": "fixed",
          "top": "2.5rem",
          "left": "0"
        });
        $("." + mmhc.mainCon).css("margin-top", "2.35rem")
      } else {
        $("." + mmhc.tabConTop).css({
          "position": "static"
        });
        $("." + mmhc.mainCon).css("margin-top", "0")
      }


      if ($(window).scrollTop() > 150) {
        $("." + mmhc.fixUpCss).addClass(mmhc.block);
        $("." + mmhc.backImgA).addClass(mmhc.block);
      } else {
        $("." + mmhc.fixUpCss).removeClass(mmhc.block);
        $("." + mmhc.backImgA).removeClass(mmhc.block);
      }
    });

    $("." + mmhc.fixUpCss).click(function(event) {
      $('html,body').animate({
        scrollTop: 0
      }, 800);
    });

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var apkState = GetQueryString("apk");
    var activityId = GetQueryString("activityId");
    if (apkState == 1) {
      this.setState({
        apkState: 1
      });
    };
    if (activityId) {
      var activityId = activityId;
    } else {
      var activityId = 10;
    }
    $.ajax({
      // url: jsonPath.path + "/activity/砍价a区activityProductMobileTop.json?activityId=" + 25,
      url: jsonPath.path + "/activityProductMobileTop.json?activityId=" + 25,
      type: jsonPath.method,
      error: function() {
        // alert(123)
      },
      success: function(data) {
        this.setState({
          activityProductVOList: data.activityProductVOList,
          activityName: data.activityName,
          countdown: data.countdown,
          activityId: 25
        }, function() {
          $("." + mmhc.tabCon + " li").click(function() {
            $(this).children().addClass(mmhc.tehui);
            $(this).siblings().children().removeClass(mmhc.tehui);
          })


        });
      }.bind(this),
      dataType: "json"
    });


    $.ajax({
      // url: jsonPath.path + "/activity/抢购历史商品展示buyhistorylist.json?activityId=" + 25,
      url: jsonPath.path + "/seckill/buyhistorylist.json?activityId=" + 25,
      type: jsonPath.method,
      error: function() {
        // alert(123)
      },
      success: function(data) {
        this.setState({
          result: data.result,
          activityId: 25
        }, function() {
          $("." + mmhc.historyazs).html(this.state.result.length)


        });
      }.bind(this),
      dataType: "json"
    });


  }
});

module.exports = ActivityChildOne;
