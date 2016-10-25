var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityBargainHistorycl.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");

var bannerImg = require("./bannerapp.jpg");
var tuimga = require("./tubs.jpg");

var upImg = require("./up.png");
var backBottomImg = require("./back.png");



var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
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
      // url: jsonPath.path + "/activity/activityProductById.json",
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
  onClickShopping: function(event) {
    var tabId = $(event.target).attr("data-ida");
    var bhIdd = $(event.target).attr("data-idf");
    var goodsIdStateEnd = $(event.target).attr("data-idb");

    $.ajax({
      url: jsonPath.path + '/authc/seckill/buyHistoryNow.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        activityProductId: tabId,
        bhId: bhIdd,
        productGoodId: goodsIdStateEnd,
        pageUrl: window.location.href
      },
      success: function(data) {
        if (data.offline) {
          window.location.href = data.loginUrl;
        } else {
          if (data.success == false) {
            alert(data.message);
            return false;
          } else {
            if (data.result.changeLock == 1) {
              /*window.location.reload();*/
              this.setState({
                toShareFlag: true
              });
            } else {
              window.location.href = "/authc/seckillpay/info.html?acId=" + tabId+ "&bhId=" + bhIdd + "&goodsId=" + goodsIdStateEnd + "&postageFree=" + this.state.postageFree;
            }
          }
        }
      }.bind(this)
    });
  },
  toShare: function(event) {
    var acIdd = $(event.target).attr("data-idc");
    var tabId = $(event.target).attr("data-ida");
    var goodsIdStateEnd = $(event.target).attr("data-idd");
    var goodsIdAll = this.state.goodsIdStateEnd;
    $.ajax({
      url: '/authc/weixin/shareUrl.json',
      type: 'POST',
      dataType: 'json',
      data: {
        activityProductId: acIdd,
        productGoodId: goodsIdStateEnd
      },
      success: function(data) {
        window.location.href = "sharebaobao," + data.result.getWeixinUrl + ",呼朋唤友来砍价,呼朋唤友来砍价";
      }
    });
  },
  render: function() {
    return (
      <div className={mmhc.content}>
          <div className={mmhc.specialTitlet}></div>
          <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
            {this.state.apkState==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
            抢购历史
          </div>


          {
            this.state.result.map(function(elem,index){
              return  <div key={index} className={mmhc.mainCon}>
                        <div className={mmhc.recorda}>
                          <div  className={mmhc.recordaDate}>{elem.buyingHistoryAssistVO.createDate}</div>
                          <a href={"/seckillpay/toBuyHistoryDetail.html?buyingHistoryId="+elem.buyingHistoryAssistVO.id}>
                            <div className={cNs(mmhc.recordaDated,mmhc.clearfix)}>
                              <div className={cNs(mmhc.fl,mmhc.recordaDatedFl)}><img src={imgPath+elem.activityProductVO.product.masterImg} alt=""/></div>
                              <div className={cNs(mmhc.fr,mmhc.recordaDatedFr)}>
                                <div className={mmhc.explaina}>{elem.activityProductVO.product.name1}</div>
                                <div><em className={mmhc.explainal}>￥</em><em className={mmhc.explainar}>{elem.activityProductVO.product.malMobilePrice}</em></div>
                              </div>
                            </div>
                          </a>
                          <div className={cNs(mmhc.recordaDatex,mmhc.clearfix)}>
                            <div className={cNs(mmhc.recordaDatexfla,mmhc.fl)}>最低价：￥{elem.activityProductVO.product.minPrice}</div>
                            <div className={cNs(mmhc.recordaDatexfra,mmhc.fr)}>
                            <em onClick={this.onClickShopping} data-ida={elem.activityProductVO.id} data-idf={elem.buyingHistoryAssistVO.id} data-idb={elem.buyingHistoryAssistVO.productGoodsId} className={mmhc.recordaDatexfra_a}>立即支付</em><em onClick={this.toShare} data-idc={elem.activityProductVO.id} data-idd={elem.buyingHistoryAssistVO.productGoodsId} className={mmhc.recordaDatexfra_b}>继续砍价</em>
                          </div>
                        </div>
                        </div>
                      </div>

            }.bind(this))
          }



        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.apkState==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}

      </div>
    )
  },
  componentDidMount: function() {

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    // var acId = GetQueryString("acId");
    var apkState = GetQueryString("apk");
    var activityId = GetQueryString("activityId");

    // this.setState({
    //   acId: acId,
    //   postageFree: postageFree,
    //   apkState: apkState
    // });

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
      // url: jsonPath.path + "/activity/一分钱activityProductMobileTop.json?activityId=" + 21,
      // url: jsonPath.path + "/activity/抢购历史商品展示buyhistorylist.json?activityId=" + 25,
      url: jsonPath.path + "/seckill/buyhistorylist.json?activityId=" + 25,
      type: jsonPath.method,
      error:function(){
        // alert(123)
      },
      success: function(data,event) {
        // var tabId = $(event.target).attr("dataa");
        // console.log(tabId)

        this.setState({
            // activityProductVOList: data.activityProductVOList,
            result: data.result,
            abc: data.result[0].activityProductVO.id,
            activityName: data.activityName,
            countdown: data.countdown,
            activityId: 21
        },function(event){


            // var tabId = $(event.target).attr("dataa");
            // var tabId = $("."+mmhc.recordaDate).attr("data-ida");
            // console.log(tabId)


          // console.log(this.state.abc)
          $("."+mmhc.tabCon+" li").click(function(){
            $(this).children().addClass(mmhc.tehui);
            $(this).siblings().children().removeClass(mmhc.tehui);
          })
// console.log(data)
          $("."+mmhc.cartAA).click(function(){
            $(this).children().eq(1).show();
            var that = this;
            setTimeout(function() {
              $(that).children().eq(1).css("transform", "translate(-550px, 900px)").css("transition", "all 1s ease-out");
            }, 1500)
            setTimeout(function() {
              $(that).children().eq(1).hide().css("transform", "translate(0px,0px)");
            }, 1600)
          })



        });
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityChildOne;
