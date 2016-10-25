var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./specialOneContent.css");
var img03 = require("./spcial03.png");
var img06 = require("./spcial06.png");
var img10 = require("./spcial10.png");
var img13 = require("./spcial13.png");
var back2Img = require("./back2.png");
var imgPath = require("../../common/util/path.js").path;
var bannerImg = require("./banner.jpg");

var SpecialOneContent = React.createClass({
  getInitialState: function() {
    return {
      activityProductVOList: [],
      titleName: "",
      apkState: "",
      activityId: "",
      ruleShowFlag: false,
      versionTitel: 0
    }
  },
  tabFun: function(event) {
    var dataId = event.target.getAttribute("data-id");
    var tabId = event.target.getAttribute("data-id");
    $("." + mmhc.singleSwiper).removeClass(mmhc.active);
    $("#tab" + dataId).addClass(mmhc.active);
    $("." + mmhc.section3).removeClass(mmhc.block);
    $("#" + dataId).addClass(mmhc.block);
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
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={cNs(mmhc.title,this.state.versionTitel==1?mmhc.titel12:"")}>
          {this.state.apkState==1?<a href="back" className={mmhc.back}><img src={this.state.versionTitel==1?back2Img:img03} alt=""/></a>:<a href="javascript:history.back(-1);" className={mmhc.back}><img src={this.state.versionTitel==1?back2Img:img03} alt=""/></a>}
          {this.state.titleName}
          <div className={mmhc.clear}></div>
        </div>
        <div className={mmhc.title2}></div>
        <div className={mmhc.bottomContent}>
          <div className={mmhc.bannerCss}>
            <img src={bannerImg} alt=""/>
            <div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则</div>
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
              <h1>活动规则</h1>
              <p>1、满128元减30元，满199减60元，满258减90元，单次购买最多减,90元；</p>
              <p>2、订单满79元包邮；</p>
              <p>3、可使用10元优惠券；</p>
              <p>4、活动时间：6月9日-6月15日；</p>
              <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
              <a href="javascript:void(0);" onClick={this.hideRule}>我知道了</a>
            </div>
          </div>
          <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
          <div className={mmhc.section2Bg}></div>
          <div className={mmhc.section2}>
            <div className="swiper-container">
              <div className={cNs("swiper-wrapper",mmhc.background)}>
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
              {/*<div className={mmhc.page}>
                <div className={cNs("swiper-pagination",mmhc.swiperPagination)}></div>
              </div>*/}
            </div>
          </div>
          {
             this.state.activityProductVOList.map(function(activityProductVOList, index) {
              return  <div key={index} id={index} className={cNs(mmhc.section3,index==0?mmhc.block:"")}>
                        {
                           activityProductVOList.productList.map(function(productList, index) {
                            return  <a key={index} href={"/detail.html?prdCode="+productList.id+"&activityId="+this.state.activityId} key={index} className={mmhc.singleGoods}>
                                      <img src={imgPath+productList.masterImg} alt=""/>
                                      <p className={mmhc.sec3Title}>{productList.name1.length>20?productList.name1.slice(0,20)+"...":productList.name1}</p>
                                      <div className={mmhc.sec3Button}>
                                        <div className={mmhc.price}>￥{productList.malMobilePrice}</div>
                                        <div className={mmhc.oldPrice}>￥{productList.marketPrice}</div>
                                        {/*<div className={mmhc.button}>加入购物车</div>*/}
                                        <div className={mmhc.clear}></div>
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
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };
    var activityId = GetQueryString("activityId");
    var apkState = GetQueryString("apk");
    if (apkState == 1) {
      this.setState({
        apkState: 1
      });
    };
    this.setState({
      activityId: activityId
    });
    $.ajax({
      // url: "/json/activity/activityProductById.json",
      url: "/activity/activityProductById.json?activityId=" + activityId,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode) {
          this.setState({
            activityProductVOList: data.activityProductVOList,
            titleName: data.activityName
          }, function() {
            var mySwiper = new Swiper('.swiper-container', {
              slidesPerView: 4.5,
              pagination: '.swiper-pagination',
              paginationType: 'fraction',
            });
            $(window).scroll(function() {
              if ($(window).scrollTop() >= $("." + mmhc.bannerCss).height()) {
                $("." + mmhc.section2).addClass(mmhc.section2Fix);
                $("." + mmhc.section2Bg).addClass(mmhc.section2bg2);
              } else {
                $("." + mmhc.section2).removeClass(mmhc.section2Fix);
                $("." + mmhc.section2Bg).removeClass(mmhc.section2bg2);
              };
            });
          })
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = SpecialOneContent;