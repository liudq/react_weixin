var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityBargainHistoryTwocl.css");
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
      assistList: [],
      on: mmhc.on,
      activityName:"",
      activityProduct:{"product":{"masterImg":"","name1":""}},
      buyHistory:{"buyingPrice":""},
      minPrice:""
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
    // var bhIdd = $(event.target).attr("data-idf");
    var bhIdd = this.state.buyingHistoryId;
    var goodsIdStateEnd = $(event.target).attr("data-idb");
    // alert(this.state.buyingHistoryId)
     // data-ida={activityProduct.id} data-idf={buyHistory.id} data-idb={buyHistory.productGoodsId}


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
    var goodsIdStateEnd = $(event.target).attr("data-idd");
    // alert(acIdd)
    // console.log(123)

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

          <div className={mmhc.mainCona}>
            <div className={mmhc.mainCon}>
              <div className={mmhc.recorda}>
                <div className={mmhc.recordaDate}>{this.state.buyHistory.createDate}</div>
                <div className={cNs(mmhc.recordaDated,mmhc.clearfix)}>
                  <div className={cNs(mmhc.fl,mmhc.recordaDatedFl)}><img src={imgPath+this.state.activityProduct.product.masterImg} alt=""/></div>
                  <div className={cNs(mmhc.fl,mmhc.recordaDatedFr)}>
                    <div className={mmhc.explaina}>{this.state.activityProduct.product.name1}</div>
                  </div>
                </div>
                <div className={mmhc.recordaDatePrice}>
                  <div className={mmhc.recordaDatePricea}>当前价：￥{this.state.buyHistory.buyingPrice}</div>
                  <div className={mmhc.recordaDatePriceb}>最低价：￥{this.state.minPrice}</div>
                  {
                    // <div className={mmhc.recordaDatePricec}>市场价：￥{this.state.activityProduct.product.marketPrice}</div>
                  }
                </div>
              </div>
            </div>

            <div className={mmhc.recordaNumber}>
             <div className={mmhc.recordaNumberk}>已有{this.state.assistListcd}名好友帮您砍价成功</div>
             <div className={mmhc.recordaNumberb}>
               <ul className={mmhc.recordaNumberbUl}>
               {
                this.state.assistList.map(function(elem,index){
                 return <li key={index}>{elem.assistMemberName} 帮您成功砍掉 {elem.assistResult}元</li>
                }.bind(this))
               }
               </ul>
             </div>
            </div>
          </div>


          <div className={mmhc.paymenta}>
            <p className={mmhc.paymental}></p><p onClick={this.onClickShopping} data-ida={this.state.activityProduct.id} data-idf={this.state.buyHistory.id} data-idb={this.state.buyHistory.productGoodsId} className={mmhc.paymentac}>立即支付</p><p onClick={this.toShare} data-idc={this.state.activityProduct.id} data-idd={this.state.buyHistory.productGoodsId} className={mmhc.paymentar}>继续砍价</p>
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

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var apkState = GetQueryString("apk");
    var activityId = GetQueryString("activityId");
    var buyingHistoryId = GetQueryString("buyingHistoryId");

    // var  asd=456
// console.log(asd)
    this.setState({
      buyingHistoryId:buyingHistoryId
    })

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
      // url: jsonPath.path + "/activity/抢购详情getBuyHistoryAndAssistInfos.json?activityId=" + buyingHistoryId,
      // url: jsonPath.path + "/activity/抢购详情getBuyHistoryAndAssistInfos.json",
      // url: jsonPath.path + "/activity/sss抢购详情getBuyHistoryAndAssistInfos.json",
      url: jsonPath.path + "/getBuyHistoryAndAssistInfos.json?buyingHistoryId="+ buyingHistoryId,
      type: jsonPath.method,
      error:function(){
        // alert(123)
      },
      success: function(data) {
        this.setState({
            activityProduct: data.activityProduct,
            buyHistory: data.buyHistory,
            minPrice: data.minPrice,
            assistList: data.assistList,
            assistListcd: data.assistList.length,

            // buyHistory: data.buyHistory,
            activityName: data.activityName,
            countdown: data.countdown,
            activityId: 21
        },function(){
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
