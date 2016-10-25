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
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var backImg = require("./order2.png");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var s199Img = require("./s199.png");
var s399Img = require("./s399.png");
var sbannerImg = require("./banner.jpg");
var sshareImg = require("./share.png");
var back2Img = require("./back2.png");
var share2Img = require("./share2.png");

var SpecialIndexContent = React.createClass({
  getInitialState: function() {
    return {
      activityProductVOList: [],
      fromHome: "",
      url: "",
      versionTitel: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
      <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
        {this.state.fromHome==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
        活动专场
        <a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/specialIndexShare.html,蜜麻花0元专区,蜜麻花0元专区 满199减99 再返100元 最高返200元 等你来抢！"}>
          <img src={this.state.versionTitel==1?share2Img:sshareImg} alt=""/>
        </a>
      </div>
      <div className={mmhc.title2}></div>
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
                          index==0? <a href={"/specialOne.html?myActivityName=179&activityId="+activityProductVOList.activityId}className={mmhc.activityOne}>
                                      <img src={s199Img} alt=""/>
                                    </a>:index==1?<a href={"/specialOne.html?myActivityName=399&activityId="+activityProductVOList.activityId} className={mmhc.activityOne}>
                                                    <img src={s399Img} alt=""/>
                                                  </a>:index==2?<a href={"/specialOne.html?myActivityName=999&activityId="+activityProductVOList.activityId}className={mmhc.activityOne}>
                                                                  <img src={h999Img} alt=""/>
                                                                </a>:<a href={"/specialOne.html?myActivityName=1999&activityId="+activityProductVOList.activityId} className={mmhc.activityOne}>
                                                                                <img src={h2999Img} alt=""/>
                                                                              </a>
                      }
                      
                      {
                         activityProductVOList.topList.map(function(topList, index) {
                          return  <div key={index} className={mmhc.goodsContent}>
                                    <a href={"/detail.html?prdCode="+topList.id+"&activityId="+activityProductVOList.activityId} className={mmhc.goodsA}>
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
                            return  <a key={index} href={"/detail.html?prdCode="+hotList.id+"&activityId="+activityProductVOList.activityId} className={mmhc.singleHot}>
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
                      <a href={"/specialOne.html?activityId="+activityProductVOList.activityId} className={mmhc.more}>更多</a>
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
        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.fromHome==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}
        
      </div>
    )
  },
  componentDidMount: function() {
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
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };

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