var cNs = require('classnames');
var React = require("react");
var mmhc = require("./specialIndexContent.css");
var bannerImg = require("./banner.jpg");
var buyImg = require("./buy.png");
var hotImg = require("./hot.png");
var h179Img = require("./h179.png");
var h399Img = require("./h399.png");
var h999Img = require("./h999.png");
var h2999Img = require("./h2999.png");
var goodsImg = require("./goods.png");
var titleImg = require("./title.png");
var activityImg = require("./activity.png");
var ruleImg = require("./rule.png");
var imgPath = require("../../common/util/path.js").path;
var backImg = require("./order2.png");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var s199Img = require("./s199.png");
var s399Img = require("./s399.png");
var sbannerImg = require("./banner.jpg");
var sshareImg = require("./share.png");
var logoImg = require("./LOGO.png");

var SpecialIndexContent = React.createClass({
  getInitialState: function() {
    return {
      activityProductVOList: [],
      fromHome: "",
      url: "",
      iphone: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
      {/*<div className={mmhc.specialTitle}>
        {this.state.fromHome==1?<a className={mmhc.backImgCss} href="back"><img src={backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={backImg} alt=""/></a>}
        活动专场
        <a className={mmhc.shareBaobao} href={"sharebaobao,"+this.state.url+",0元专区,蜜麻花0元专区 满199减99 再返100元 最高返200元 等你来抢！"}>
          <img src={sshareImg} alt=""/>
        </a>
      </div>*/}
        <div className={mmhc.banner}>
          
          <img src={sbannerImg} alt=""/>
        </div>
        {/*<div className={mmhc.buyImg}>
          <img src={buyImg} alt=""/>
        </div>
        <a href="javascript:void(0)" className={mmhc.hotCss}>
          <img src={hotImg} alt=""/>
        </a>*/}
      {/*活动179*/}
        {
           this.state.activityProductVOList.map(function(activityProductVOList, index) {
            return  <div key={index} className={mmhc.huoDong1}>
                      {
                          index==0? <a href="javascript:void(0);"className={mmhc.activityOne}>
                                      <img src={s199Img} alt=""/>
                                    </a>:index==1?<a href="javascript:void(0);" className={mmhc.activityOne}>
                                                    <img src={s399Img} alt=""/>
                                                  </a>:index==2?<a href="javascript:void(0);" className={mmhc.activityOne}>
                                                                  <img src={h999Img} alt=""/>
                                                                </a>:<a href="javascript:void(0);" className={mmhc.activityOne}>
                                                                                <img src={h2999Img} alt=""/>
                                                                              </a>
                      }
                      
                      {
                         activityProductVOList.topList.map(function(topList, index) {
                          return  <div key={index} className={mmhc.goodsContent}>
                                    <a href="javascript:void(0);" className={mmhc.goodsA}>
                                      <div className={mmhc.singleGoods}>
                                        <div className={mmhc.goodsImg}>
                                          <img src={imgPath+topList.masterImg} alt=""/>
                                        </div>
                                        <div className={mmhc.goodsRight}>
                                          <div className={mmhc.title}>{topList.name1.length>24?topList.name1.slice(0,24)+"...":topList.name1}</div>
                                          <p className={mmhc.markPrice}>{topList.marketPrice}元</p>
                                          <p className={mmhc.realPrice}>抢购价 <i>{topList.malMobilePrice}</i> 元</p>
                                        </div>
                                        <div className={mmhc.clear}></div>
                                      </div>
                                    </a>
                                  </div>
                        }.bind(this))
                      }
                      
                      <div className={mmhc.titleImg}>
                        <img src={titleImg} alt=""/>
                      </div>
                      <div className={mmhc.hotMai}>
                        {
                           activityProductVOList.hotList.map(function(hotList, index) {
                            return  <a key={index} href="javascript:void(0);" className={mmhc.singleHot}>
                                      <div className={mmhc.singleHotImg}>
                                        <img src={imgPath+hotList.masterImg} alt=""/>
                                        <p className={mmhc.singleHotTitle}>{hotList.name1.length>24?hotList.name1.slice(0,24)+"...":hotList.name1}</p>
                                        <p className={mmhc.price}>￥{hotList.malMobilePrice} <i>￥{hotList.marketPrice}</i></p>
                                      </div>
                                    </a>
                          }.bind(this))
                        }
                        
                        
                        <div className={mmhc.clear}></div>
                      </div>
                      <a href="javascript:void(0);" className={mmhc.more}>更多</a>
                    </div>
          }.bind(this))
        }
        
        
        <div className={mmhc.titleImg}>
          <img src={activityImg} alt=""/>
        </div>
        <div className={mmhc.ruleCss}>
        <p>1.100元抵用券为母亲节活动返还及限量1元抢获得，仅限本专场活动时间内
                使用，使用时间：5月18日至5月22日;</p>
        <p>2.每笔订单金额满199使用100元优惠券;</p>
        <p>3.每笔订单限用1张优惠券;</p>
        <p>4.本场商品参与整点购物享免单活动;</p>
        <p>5.本场活动满79元享受包邮。</p>
        <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
          {/*<img src={ruleImg} alt=""/>*/}
        </div>
        <div className={mmhc.tishi}></div>
        <div className={mmhc.tishiText}>
          <img src={logoImg} alt=""/>
          <div className={mmhc.tishiNeirong}>
            <p>全场满199减99，再返100元，</p>
            <p>最高返200元，等你来抢！</p>
          </div>
          <a className={cNs(mmhc.lijitiyan,this.state.iphone==1?"":"")} href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">立即体验</a>
          <div className={mmhc.clear}></div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      this.setState({
        iphone: 1
      })
    };
    $(window).scroll(function() {
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

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var fromHome = GetQueryString("apk");
    this.setState({
      fromHome: fromHome,
      url: window.location.href
    });
    $.ajax({
      // url: "/json/activity/getAllProductList.json",
      url: "/activity/getAllProductList.json",
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode) {
          this.setState({
            activityProductVOList: data.activityProductVOList
          })
        } else {
          alert(data.message);
        }
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = SpecialIndexContent;