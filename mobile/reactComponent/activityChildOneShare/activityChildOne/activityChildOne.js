var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityChildOne.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");
var bannerImg = require("./banner.jpg");
var activityImg = require("./activity.png");
var upImg = require("./up.png");
var backBottomImg = require("./back.png");
var proPic = require("./proPic.png")
var logoImg = require("./LOGO.png");
var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      fromHome: "",
      url: "",
      ruleShowFlag: false,
      versionTitel: 0,
      activityId: "",
      result: [],
      on: mmhc.on,
      on2: "",
      on3: "",
      titText: "199任选两件",
      countdown: ""
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
      on2: "",
      on3: "",
      titText: "199任选两件"
    });
    $.ajax({
      url: jsonPath.path + "/actproduct/list.json?activityId=" + 22,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          result: data.result,
          activityId: 22
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
      on: "",
      on3: "",
      titText: "399任选两件"
    });
    $.ajax({
      url: jsonPath.path + "/actproduct/list.json?activityId=" + 23,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          result: data.result,
          activityId: 23
        });
      }.bind(this),
      dataType: "json"
    });
    $('html,body').animate({
      scrollTop: 0
    }, 800);
  },
  // fnActThree: function() {
  //   this.setState({
  //     on3: mmhc.on,
  //     on: "",
  //     on2: "",
  //     titText: "99任选两件"
  //   });
  //   $.ajax({
  //     url: jsonPath.path + "/actproduct/list.json?activityId=" + 12,
  //     type: jsonPath.method,
  //     success: function(data) {
  //       this.setState({
  //         result: data.result,
  //         activityId: 12
  //       });
  //     }.bind(this),
  //     dataType: "json"
  //   });
  //   $('html,body').animate({
  //     scrollTop: 0
  //   }, 800);
  // },
  fnAddCar: function(event) {
    var productId = event.target.getAttribute("data-id");
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
          $("." + mmhc.addNum).show();
          setTimeout(function() {
            $("." + mmhc.addNum).css("transform", "translate(100px, 900px)").css("transition", "all 1s ease-out");
          }, 1500)
          setTimeout(function() {
            $("." + mmhc.addNum).hide().css("transform", "translate(0px,0px)");
          }, 1600)
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
          <div className={mmhc.bannerContainer}>
            <img className={mmhc.banner} src={bannerImg} width="100%" alt=""/>
            <div className={mmhc.ruleBtn}>活动规则</div>
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
              <h1>活动规则</h1>
              <p>1、199元任选二件，399元任选二件；</p>
              <p>2、本场活动享受包邮；</p>
              <p>3、每个ID不限购买次数；</p>
              <p>4、本场活动不可使用优惠券；</p>
              <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
              <a href="javascript:void(0);" onClick={this.hideRule}>我知道了</a>
            </div>
          </div>
          <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
          <ul className={cNs(mmhc.tabCon,mmhc.clearfix)}>
            <li className={this.state.on}>199任选两件</li>
            <li className={this.state.on2}>399任选两件</li>
            {/*<li className={this.state.on3}>99任选两件</li>*/}
          </ul>
        <div className={mmhc.fixBox2}></div>
          <div className={mmhc.mainCon} >
            <div className={mmhc.countTime}>
              <p className={mmhc.countText}>距活动结束还剩</p>
              <p className={mmhc.time}></p>
            </div>
            <div className={cNs(mmhc.titCon,mmhc.clearfix)}>
              <p className={mmhc.fl}></p>
              <h2>{this.state.titText}</h2>
              <p className={mmhc.fr}></p>
            </div>
            <div className={mmhc.productCon}>
              <ul className={mmhc.clearfix}>
                {
                 this.state.result.map(function(proList, index) {
                    return <li key={index} className={cNs(mmhc.fl,mmhc.productM)} data={proList}>                            
                              <div className={mmhc.picCon}>
                                <img src={imgPath+proList.product.masterImg} alt=""/>
                              </div>
                              <p className={mmhc.proName}>{proList.product.name1.length>19?proList.product.name1.slice(0,19)+"...":proList.product.name1}</p>
                              <div className={cNs(mmhc.priceCon,mmhc.clearfix)}>
                                <p className={mmhc.price}>
                                  <em className={mmhc.nowPrice}>￥{proList.product.malMobilePrice}</em>
                                  <em className={mmhc.oldPrice}>￥{proList.product.marketPrice}</em>
                                </p>
                                <p className={mmhc.addCar}  data-id={proList.product.id}></p>
                            </div>
                          </li>
                  }.bind(this))
                }
              </ul>
            </div>
          </div>
          
        <div className={mmhc.tishi}></div>
        <div className={mmhc.tishiText}>
          <img src={logoImg} alt=""/>
          <div className={mmhc.tishiNeirong}>
            <p>超值任选专区！</p>
            <p>399买不了吃亏，199买不了上当！</p>
          </div>
          <a className={cNs(mmhc.lijitiyan,this.state.iphone==1?"":"")} href="http://a.app.qq.com/o/simple.jsp?pkgname=com.mimahua.app">立即体验</a>
          <div className={mmhc.clear}></div>
        </div>
        <div className={mmhc.addNum}>+1</div>
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
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };

    function toDou(iNum) {
      return iNum < 10 ? '0' + iNum : '' + iNum;
    }
    $(window).scroll(function() {
      if ($(window).scrollTop() >= $("." + mmhc.bannerContainer).height()) {
        $("." + mmhc.tabCon).addClass(mmhc.tabCon2)
        $("." + mmhc.fixBox2).css("display", "block");
      } else {
        $("." + mmhc.tabCon).removeClass(mmhc.tabCon2)
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

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var fromHome = GetQueryString("apk");
    var activityId = GetQueryString("activityId");
    this.setState({
      fromHome: fromHome,
      url: window.location.href
    });
    if (activityId) {
      var activityId = activityId;
    } else {
      var activityId = 22;
    }
    $.ajax({
      url: jsonPath.path + "/mynj/list.json?activityId=" + activityId,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          result: data.result,
          countdown: data.countdown,
          activityId: 22
        });
        var overtime = data.countdown / 1000;
        var oTarget = new Date();
        var timer1 = null;
        oTarget.setFullYear(2016, 5, 1);
        oTarget.setHours(0, 0, 0, 0);
        var iTarget = oTarget.getTime();
        timer1 = setInterval(timer, 1000);

        function timer() {
          overtime--
          if (overtime != 0 || overtime != "0") {
            var d = parseInt(overtime / 3600 / 24);
            var h = parseInt(overtime / 3600 % 24);
            var m = parseInt(overtime / 60 % 60);
            var s = parseInt(overtime % 60);

            $("." + mmhc.time).html("<b>" + toDou(d) + "</b>天<b>" + toDou(h) + "</b>时<b>" + toDou(m) + "</b>分<b>" + toDou(s) + "</b>秒");
          } else {
            $("." + mmhc.time).html("<b>活动已结束</b>");
            alert("活动结束啦~");
            clearInterval(timer1);
          }
        }
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityChildOne;