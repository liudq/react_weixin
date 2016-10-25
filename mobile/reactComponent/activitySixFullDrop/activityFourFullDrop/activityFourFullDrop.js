var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./activityFourFullDrop.css");
var img03 = require("./spcial03.png");
var img06 = require("./spcial06.png");
var img10 = require("./spcial10.png");
var img13 = require("./spcial13.png");
var back2Img = require("./back2.png");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");
var bannerImg = require("./banner.jpg");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");

var ActivityChildFive = React.createClass({
  getInitialState: function() {
    return {
      activityProductVOList: [],
      titleName: "",
      apkState: "",
      activityId: "",
      versionTitel: 0,
      ruleShowFlag: false,
      tabNum: 0
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
  tabFun: function(event) {
    var dataId = event.target.getAttribute("data-id");
    var tabId = event.target.getAttribute("data-id");
    $("." + mmhc.singleSwiper).removeClass(mmhc.active);
    $("#tab" + dataId).addClass(mmhc.active);
    $("." + mmhc.section3).removeClass(mmhc.block);
    $("#" + dataId).addClass(mmhc.block);
    this.setState({
      tabNum: dataId
    })
  },
  render: function() {
    return (
      <div className={mmhc.content}>
          <div className={cNs(mmhc.title,this.state.apkState==1?mmhc.show:mmhc.hide)}>
            {this.state.apkState==1?<a href="back" className={mmhc.back}><img src={back2Img} alt=""/></a>:<a href="homePage" className={mmhc.back}><img src={back2Img} alt=""/></a>}
            {this.state.titleName}
            <a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/activitySixFullDropShare.html,10.01奶粉涨价啦,立即囤货GO！"}>
              <img src={share2Img} alt=""/>
            </a>
          </div>
          <div className={cNs(mmhc.title2,this.state.apkState==1?mmhc.show:mmhc.hide)}></div>
          <div className={mmhc.bannerContainer}>
            <img className={mmhc.banner} src={bannerImg} width="100%" alt=""/>
            <div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则</div>
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
              <h1>活动规则</h1>
              <p>1、本活动商品购买数量及次数不限；</p>
              <p>2、自营商品需满149元包邮；</p>
              {/*<p>3、订单金额满199减50元，单笔订单最多减50元；</p>*/}
              {/*<p>3、完成支付获得一次翻牌机会，赢千元现金；</p>*/}
              <p>3、活动时间：2016年9月14日至9月30日。</p>
              <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
              <a href="javascript:void(0);" onClick={this.hideRule}>我知道了</a>
            </div>
            <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
          </div>
          <div className={mmhc.section2}>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {
                   this.state.activityProductVOList.map(function(activityProductVOList, index) {
                    return  <div key={index} className="swiper-slide">
                              <div onClick={this.tabFun} id={"tab"+index} data-id={index} className={cNs(mmhc.singleSwiper,index==0?mmhc.active:"")}>
                                {activityProductVOList.cateName}
                              </div>
                            </div>
                  }.bind(this))
                }
                <div className={mmhc.clear}></div>
              </div>
            </div>
          </div>
        <div className={mmhc.fixBox2}></div>  
        <div className={mmhc.bottomContent}>        
          {
             this.state.activityProductVOList.map(function(activityProductVOList, index) {
              return  <div key={index} id={index} className={cNs(mmhc.section3,index==0?mmhc.block:"")}>
                        {
                           activityProductVOList.productList.map(function(productList, index) {
                            return  <a id={productList.id} key={index} href={this.state.apkState==1?"/detail.html?prdCode="+productList.id+"&activityId="+this.state.activityId+"&tabNum="+this.state.tabNum+"&returnUrl=/activitySixFullDrop.html":"/wechatMall/detail.html?prdCode="+productList.id+"&activityId="+this.state.activityId+"&tabNum="+this.state.tabNum+"&returnUrl=/activitySixFullDrop.html"} key={index} className={mmhc.singleGoods}>
                                      <div className={mmhc.picCon}>
                                        <img src={imgPath+productList.masterImg} alt=""/>
                                        {/*<i>{productList.discount?productList.discount:0}折</i>*/}
                                      </div>
                                      <p className={mmhc.sec3Title}>{productList.name1.length>24?productList.name1.slice(0,24)+"...":productList.name1}</p>
                                      <div className={cNs(mmhc.sec3Button,mmhc.clearfix)}>
                                        <div className={mmhc.price}>￥{productList.malMobilePrice}</div>
                                      </div>
                                    </a>
                          }.bind(this))
                        }
                        <div className={mmhc.clear}></div>
                      </div>
            }.bind(this))
          }
          <div className={mmhc.clear}></div>
        </div>
        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.apkState==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}
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
    var apkState = GetQueryString("apk");
    var tabNum = GetQueryString("tabNum");
    if (tabNum == "" || tabNum == null) {
      tabNum = 0;
    };


    if (apkState) {
      this.setState({
        apkState: 1
      });
      $(window).scroll(function() {
        if ($(window).scrollTop() >= 170) {
          $("." + mmhc.section2).css({
            "position": "fixed",
            "top": "2.125rem",
            "left": "0",
            "z-index": 200
          })
          $("." + mmhc.fixBox2).css("display", "block");
        } else {
          $("." + mmhc.section2).css({
            "position": "relative",
            "top": "0",
            "left": "0",
            "z-index": 0
          })
          $("." + mmhc.fixBox2).css("display", "none");
        }
        if ($(window).scrollTop() > 500) {
          $("." + mmhc.fixUpCss).addClass(mmhc.block);
          $("." + mmhc.backImgA).addClass(mmhc.block);
        } else {
          $("." + mmhc.fixUpCss).removeClass(mmhc.block);
          $("." + mmhc.backImgA).removeClass(mmhc.block);
        }
      });
    } else {
      $(window).scroll(function() {
        if ($(window).scrollTop() >= 170) {
          $("." + mmhc.section2).css({
            "position": "fixed",
            "top": "0",
            "left": "0",
            "z-index": 200
          })
          $("." + mmhc.fixBox2).css("display", "block");
        } else {
          $("." + mmhc.section2).css({
            "position": "relative",
            "top": "0",
            "left": "0",
            "z-index": 0
          })
          $("." + mmhc.fixBox2).css("display", "none");
        }
        if ($(window).scrollTop() > 500) {
          $("." + mmhc.fixUpCss).addClass(mmhc.block);
          $("." + mmhc.backImgA).addClass(mmhc.block);
        } else {
          $("." + mmhc.fixUpCss).removeClass(mmhc.block);
          $("." + mmhc.backImgA).removeClass(mmhc.block);
        }
      });
    }

    $("." + mmhc.fixUpCss).click(function(event) {
      $('html,body').animate({
        scrollTop: 0
      }, 800);
    });
    var activityId = GetQueryString("activityId");

    if (activityId) {
      var activityId = activityId;
    } else {
      var activityId = 49;
    }
    var that = this;
    $.ajax({
      url: jsonPath.path + "/activity/activityProductById.json?activityId=" + activityId,
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        var length = 4.5;
        if (data.activityProductVOList.length > 4) {
          length = 4.5;
        } else {
          length = data.activityProductVOList.length;
        };
        if (data.resultcode) {
          this.setState({
            activityProductVOList: data.activityProductVOList,
            titleName: data.activityName,
            activityId: 49
          }, function() {
            var mySwiper = new Swiper('.swiper-container', {
              slidesPerView: length,
              pagination: '.swiper-pagination',
              paginationType: 'fraction',
            });
            that.setState({
              tabNum: tabNum
            }, function() {
              $("." + mmhc.singleSwiper).removeClass(mmhc.active);
              $("#tab" + tabNum).addClass(mmhc.active);
              $("." + mmhc.section3).removeClass(mmhc.block);
              $("#" + tabNum).addClass(mmhc.block);
            })
          })
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = ActivityChildFive;