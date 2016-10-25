var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityDuanWuOneclShare.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");

var bannerImg = require("./bannerapp.jpg");
var producta = require("./sfg.jpg");
var cartA = require("./car1.jpg");
var cartB = require("./car2.jpg");

var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var logoImg = require("./LOGO.png");



var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      url: "",
      activityProductVOList:[],
      ruleShowFlag: false,
      versionTitel: 0,
      activityId: "",
      result: [],
      on: mmhc.on,
      countdown: "",
      activityName:""
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
      // url: jsonPath.path + "/mynj/list.json?activityId=" + 10,
      // url: jsonPath.path + "/activity/activityProductById.json",
      // url: jsonPath.path + "/activity/activityProductById.json?activityId=" + 21,
      // url: jsonPath.path + "/activity/一分钱activityProductMobileTop.json?activityId=" + 21,
      url: jsonPath.path + "/activityProductMobileTop.json?activityId=" + 21,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
            activityProductVOList: data.activityProductVOList,
            activityName: data.activityName,
            countdown: data.countdown,
            activityId: 21
        },function(){


        });

        $("."+mmhc.Price1).css("display","none");
        $("."+mmhc.Price2).css("display","none");

        // if (data.resultcode == true) {
        //   $("."+mmhc.cartAA).click(function(){
        //     $("." + mmhc.addNum).show();
        //     setTimeout(function() {
        //       $("." + mmhc.addNum).css("transform", "translate(-150px, 900px)").css("transition", "all 1s ease-out");
        //     }, 1500)
        //     setTimeout(function() {
        //       $("." + mmhc.addNum).hide().css("transform", "translate(0px,0px)");
        //     }, 1600)
        //   })
        // } else {
        //   alert(data.msg);
        // };

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
      on:""
    });
    $.ajax({
      // url: jsonPath.path + "/mynj/list.json?activityId=" + 11,
      // url: jsonPath.path + "/activity/activityProductByIdbb.json?activityId=" + 21,
      // url: jsonPath.path + "/activity/activityProductMobileList.json?activityId=" + 21,
      // url: jsonPath.path + "/activity/爆款4个activityProductMobileHotList.json?activityId=" + 21,
      url: jsonPath.path + "/activityProductMobileHotList.json?activityId=" + 21,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
            activityProductVOList: data.activityProductVOList,
            activityName: data.activityName,
            countdown: data.countdown,
            activityId: 21
        },function(){

        });

        $("."+mmhc.Price1).css("display","block");
        $("."+mmhc.Price2).css("display","block");

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
          {this.state.apkState==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
            一分钱专场活动
              <a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/mynjShare.html,19.9任选两件,不要套路 我们来真的！六一底价日 19.9任选 享包邮！"}><img src={this.state.versionTitel==1?share2Img:sshareImg} alt=""/></a>
          </div>

          <div className={mmhc.bannerContainer}>
            <img className={mmhc.banner} src={bannerImg} width="100%" alt=""/>
            <div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则</div>
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
              <h1>活动规则</h1>
              <p>1、总共4件商品，4选一；</p>
              <p>2、每笔订单限购一件一分钱商品；</p>
              <p>3、一分钱商品不支持单独购买，需搭配爆款专区商品一起购买；</p>
              <p>4、订单满79元包邮；</p>
              <p>5、可使用10元优惠券；</p>
              <p>6、活动时间：6月9日-6月15日；</p>
              <p>7、一分钱商品不支持单独购买，需搭配爆款专区商品一起购买；</p>
              <p>8、非质量问题不支持退换货。</p>
              <p>活动最终解释权归蜜麻花所有。</p>
              <a href="" onClick={this.hideRule}>我知道了</a>
            </div>
          </div>

          <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
          <div className={mmhc.tabConTop}>
            <ul className={cNs(mmhc.tabCon,mmhc.clearfix)}>
              <li onClick={this.fnActOne}>
                <div className={mmhc.xhfather}>一分钱专区
                  <div className={cNs(mmhc.xiahua,this.state.on)}></div>
                </div>
              </li>
              <li onClick={this.fnActTwo}>
                <div className={mmhc.xhfather}>爆款专区
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
                              return index<4?<li key={index} className={cNs(mmhc.fl,mmhc.productM)}>
                                          <div className={mmhc.productaImg}>
                                            <img src={imgPath+elem.masterImg} alt=""/>
                                          </div>
                                        <div>
                                          <p className={mmhc.productaName}>{elem.name1}</p>
                                        </div>
                                        <div className={cNs(mmhc.moneyCart,mmhc.clearfix)}>
                                          <div className={cNs(mmhc.fl,mmhc.moneyN)}>
                                            <em className={mmhc.moneyN1}>￥</em><em className={mmhc.moneyN2}>{elem.activityPrice?elem.activityPrice:elem.malMobilePrice}</em>
                                          </div>
                                          <div className={mmhc.fl}>
                                            {
                                              // <em className={mmhc.moneyN3}>￥:{elem.marketPrice}</em>
                                            }
                                          </div>
                                          <div className={cNs(mmhc.fr,mmhc.cartAA)}>
                                            <img data-id={elem.id} src={cartA} alt=""/>
                                            <div className={mmhc.addNum}>+1</div>
                                          </div>
                                        </div>
                                      </li>
                                     :""


                            }.bind(this))
                          }
                        </ul>
                      </div>
          </div>


          <div className={cNs(mmhc.Price2,mmhc.mRow)}>
            <div className={cNs(mmhc.Price1_left,mmhc.fl)}>
              <div className={mmhc.xiahuaa}></div>
            </div>
            <div className={cNs(mmhc.Price1_center,mmhc.fl)}><p className={mmhc.tb}>更多</p></div>
            <div className={cNs(mmhc.Price1_right,mmhc.fr)}>
              <div className={mmhc.xiahuaa}></div>
            </div>
          </div>



        <div className={mmhc.settlementat}></div>
        <div className={cNs(mmhc.clearfix,mmhc.settlementa)}>
          <div className={cNs(mmhc.fl,mmhc.settlemental)}><em className={mmhc.cartp}><img src={cartB} alt=""/></em><em  className={mmhc.moneyH}>合计：￥10.01</em></div>
          <div className={cNs(mmhc.fl,mmhc.settlementar)}><a href="/authc/shoppingCar.html"><em>去结算</em></a></div>
        </div>
        <div className={cNs(mmhc.clearfix,mmhc.settlementax)}>
          <div className={cNs(mmhc.fl,mmhc.settlementarx)}><em>去结算</em></div>
        </div>



        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.apkState==1?<img className={mmhc.fixBackCss} src={backBottomImg} alt=""/>:<img className={mmhc.fixBackCss} src={backBottomImg} alt=""/>}


        <div className={mmhc.fixdmask}></div>
        <div className={mmhc.tishi}></div>
        <div className={mmhc.tishiText}>
          <img src={logoImg} alt=""/>
          <div className={mmhc.tishiNeirong}>
            <p>1分钱四选一活动</p>
            <p>订单满79元包邮,可使用10元优惠券!</p>
          </div>
          <a className={cNs(mmhc.lijitiyan,this.state.iphone==1?"":"")} href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">立即体验</a>
          <div className={mmhc.clear}></div>
        </div>



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

    if($(window).width() < 330 ){
      $("."+mmhc.moneyN3).css("display","none")
    }


    $(window).scroll(function() {
      if ($(window).scrollTop() >= 140 ){
        $("." + mmhc.tabConTop).css({
          "position":"fixed",
          "top":"2.5rem",
          "left":"0"
        });
        $("."+mmhc.mainCon).css("margin-top","2.35rem")
      } else {
        $("." + mmhc.tabConTop).css({
          "position":"static"
        });
        $("."+mmhc.mainCon).css("margin-top","0")
      }


      // if ($(window).scrollTop() > 150) {
      //   $("." + mmhc.fixUpCss).addClass(mmhc.block);
      //   $("." + mmhc.backImgA).addClass(mmhc.block);
      // } else {
      //   $("." + mmhc.fixUpCss).removeClass(mmhc.block);
      //   $("." + mmhc.backImgA).removeClass(mmhc.block);
      // }
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
      // url: jsonPath.path + "/activity/activityProductById.json?activityId=" + 21,
      // url: jsonPath.path + "/activity/activityProductMobileTop.json?activityId=" + 21,
      // url: jsonPath.path + "/activity/一分钱activityProductMobileTop.json?activityId=" + 21,
      url: jsonPath.path + "/activityProductMobileTop.json?activityId=" + 21,
      type: jsonPath.method,
      error:function(){
        // alert(123)
      },
      success: function(data) {
        this.setState({
            activityProductVOList: data.activityProductVOList,
            activityName: data.activityName,
            countdown: data.countdown,
            activityId: 21
        },function(){
// console.log(data)
          // $("."+mmhc.cartAA).click(function(){
          //   $(this).children().eq(1).show();
          //   var that = this;
          //   setTimeout(function() {
          //     $(that).children().eq(1).css("transform", "translate(-550px, 900px)").css("transition", "all 1s ease-out");
          //   }, 1500)
          //   setTimeout(function() {
          //     $(that).children().eq(1).hide().css("transform", "translate(0px,0px)");
          //   }, 1600)
          // })





        });
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityChildOne;
