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

var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      url: "",
      ruleShowFlag: false,
      versionTitel: 0,
      activityId: "",
      result: [],
      on: mmhc.on,
      on2: "",
      on3: "",
      titText: "19.9任选两件",
      countdown: "",
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
      titText: "19.9任选两件"
    });
    $.ajax({
      url: jsonPath.path + "/mynj/list.json?activityId=" + 10,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          result: data.result,
          activityId: 10
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
      titText: "69任选两件"
    });
    $.ajax({
      url: jsonPath.path + "/mynj/list.json?activityId=" + 11,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          result: data.result,
          activityId: 11
        });
      }.bind(this),
      dataType: "json"
    });
    $('html,body').animate({
      scrollTop: 0
    }, 800);
  },
  fnActThree: function() {
    this.setState({
      on3: mmhc.on,
      on: "",
      on2: "",
      titText: "99任选两件"
    });
    $.ajax({
      url: jsonPath.path + "/mynj/list.json?activityId=" + 12,
      type: jsonPath.method,
      success: function(data) {
        this.setState({
          result: data.result,
          activityId: 12
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
          <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
            {this.state.apkState==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
            活动专场
            <a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/mynjShare.html,19.9任选两件,不要套路 我们来真的！六一底价日 19.9任选 享包邮！"}>
              <img src={this.state.versionTitel==1?share2Img:sshareImg} alt=""/>
            </a>
          </div>   
          <div className={mmhc.specialTitle2}></div>
          <div className={mmhc.bannerContainer}>
            <img className={mmhc.banner} src={bannerImg} width="100%" alt=""/>
            <div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则</div>
            <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
              <h1>活动规则</h1>
              <p>1、19.9元任选二件，69元任选二件，99元任选二件；</p>
              <p>2、本场活动享受包邮；</p>
              <p>3、每个ID不限购买次数；</p>
              <p>4、本场活动不可使用优惠券；</p>
              <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
              <a href="javascript:void(0);" onClick={this.hideRule}>我知道了</a>
            </div>
          </div>
          <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
          <ul className={cNs(mmhc.tabCon,mmhc.clearfix)}>
            <li className={this.state.on} onClick={this.fnActOne}>19.9任选两件</li>
            <li className={this.state.on2} onClick={this.fnActTwo}>69任选两件</li>
            <li className={this.state.on3} onClick={this.fnActThree}>99任选两件</li>
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
                              <a href={"/detail.html?prdCode="+proList.product.id+"&activityId="+this.state.activityId} key={index}>
                                <div className={mmhc.picCon}>
                                  <img src={imgPath+proList.product.masterImg} alt=""/>
                                </div>
                                <p className={mmhc.proName}>{proList.product.name1.length>24?proList.product.name1.slice(0,24)+"...":proList.product.name1}</p>
                              </a>
                              <div className={cNs(mmhc.priceCon,mmhc.clearfix)}>
                                <p className={mmhc.price}>
                                  <em className={mmhc.nowPrice}>￥{proList.product.malMobilePrice}</em>
                                  <em className={mmhc.oldPrice}>￥{proList.product.marketPrice}</em>
                                </p>
                                <p className={mmhc.addCar} onClick={this.fnAddCar} data-id={proList.product.id}></p>
                              </div>
                          </li>
                  }.bind(this))
                }
              </ul>
            </div>
          </div>
          
        <img className={mmhc.fixUpCss} src={upImg} alt=""/>
        {this.state.apkState==1?<a className={mmhc.backImgA} href="back"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>:<a className={mmhc.backImgA} href="javascript:history.go(-1);"><img className={mmhc.fixBackCss} src={backBottomImg} alt=""/></a>}
        <div className={mmhc.addNum}>+1</div>
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

    function toDou(iNum) {
      return iNum < 10 ? '0' + iNum : '' + iNum;
    }
    $(window).scroll(function() {
      if ($(window).scrollTop() >= $("." + mmhc.bannerContainer).height()) {
        $("." + mmhc.tabCon).addClass(mmhc.tabCon22);
      } else {
        $("." + mmhc.tabCon).removeClass(mmhc.tabCon22);
      };

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
      // url: jsonPath.path + "/mynj/list.json?activityId=" + activityId,
      // type: jsonPath.method,
      url: "/json/mynj/list.json?activityId=" + activityId,
      type: "get",
      success: function(data) {
        this.setState({
          result: data.result,
          countdown: data.countdown,
          activityId: 10
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


        // function countDown() {
        //   var oNow = new Date();
        //   var iNow = oNow.getTime();
        //   //if ((iTarget - iNow) >= 0) {
        //   if (aa != 0 || aa != "0") {
        //     //var s = parseInt((iTarget - iNow) / 1000);
        //     var s = parseInt(aa / 1000);
        //     var d = parseInt(s / 86400);
        //     s %= 86400;
        //     var h = parseInt(s / 3600);
        //     s %= 3600;
        //     var m = parseInt(s / 60);
        //     s %= 60;
        //     $("." + mmhc.time).html("<b>" + toDou(d) + "</b>天<b>" + toDou(h) + "</b>时<b>" + toDou(m) + "</b>分<b>" + toDou(s) + "</b>秒");
        //   } else {
        //     $("." + mmhc.time).html("<b>活动已结束</b>");
        //     alert("活动结束了~")
        //     clearInterval(timer);
        //   }
        // }
        // countDown();
        // timer = setInterval(function() {
        //   countDown();
        // }, 1000);
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityChildOne;