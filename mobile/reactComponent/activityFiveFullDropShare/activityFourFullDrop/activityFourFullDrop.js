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
var logoImg = require("./LOGO.png");

var ActivityChildFour = React.createClass({
  getInitialState: function() {
    return {
      activityProductVOList: [],
      titleName: "",
      apkState: "",
      activityId: "",
      versionTitel: 0,
      ruleShowFlag: false,
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
  },
  render: function() {
    return (
      <div className={mmhc.content}>
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
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
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
                            return  <a key={index} href="javascript:;" key={index} className={mmhc.singleGoods}>
                                      <div className={mmhc.picCon}>
                                        <img src={imgPath+productList.masterImg} alt=""/>
                                        
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
        <div className={mmhc.tishi}></div>
        <div className={mmhc.tishiText}>
          <img src={logoImg} alt=""/>
          <div className={mmhc.tishiNeirong}>
            <p>夏末初秋</p>
            <p>换新季</p>
          </div>
          <a className={cNs(mmhc.lijitiyan,this.state.iphone==1?"":"")} href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">立即体验</a>
          <div className={mmhc.clear}></div>
        </div>
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
    $(window).scroll(function() {
      if ($(window).scrollTop() >= 170) {
        $("." + mmhc.section2).addClass(mmhc.section2p)
        $("." + mmhc.fixBox2).css("display", "block");
      } else {
        $("." + mmhc.section2).removeClass(mmhc.section2p)
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
    $("." + mmhc.fixUpCss).click(function(event) {
      $('html,body').animate({
        scrollTop: 0
      }, 800);
    });
    var activityId = GetQueryString("activityId");
    var apkState = GetQueryString("apk");
    if (apkState == 1) {
      this.setState({
        apkState: 1
      });
    };
    if (activityId) {
      var activityId = activityId;
    } else {
      var activityId = 46;
    }
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
            activityId: 46
          }, function() {
            var mySwiper = new Swiper('.swiper-container', {
              slidesPerView: length,
              pagination: '.swiper-pagination',
              paginationType: 'fraction',
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

module.exports = ActivityChildFour;