var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityBargainForHimcl.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");

var bannerImg = require("./bannerapp.jpg");
var tuimga = require("./tubs.jpg");
var bannerTua = require("./bannerTu.jpg");


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
      activityProduct:"",
      activityName:"",
      assistList:[],
      minPrice:"",
      activityProduct:{"product":{"masterImg":"","name1":""}},
      buyHistory:{"buyingPrice":""}
      // userType:"",
      // userCode:"",
      // sign:"",
      // activityProductId:"",
      // buyingHistoryId:""
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
      // url: jsonPath.path + "/activityProductMobileTop.json?activityId=" + 21,
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
      // url: jsonPath.path + "/activityProductMobileHotList.json?activityId=" + 21,
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
  render: function() {
    return (
      <div className={mmhc.content}>
          <div className={mmhc.specialTitlet}></div>
          <div className={cNs(mmhc.specialTitle,this.state.versionTitel==1?mmhc.titel12:"")}>
            {this.state.apkState==1?<a className={mmhc.backImgCss} href="back"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backImgCss} href="javascript:history.go(-1);"><img src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
            呼朋唤友来砍价
          </div>


          <div className={mmhc.bandnerTu}>
            <img src={bannerTua} alt=""/>
            <a href={"/registerByBargain.html?userType="+this.state.userType+"&userCode="+this.state.userCode+"&sign="+this.state.sign+"&activityProductId="+this.state.activityProductId+"&buyingHistoryId="+this.state.buyingHistoryId}><div></div></a>
          </div>


          <div className={cNs(mmhc.recordaDated,mmhc.clearfix)}>
            <div className={cNs(mmhc.fl,mmhc.recordaDatedFl)}><img src={imgPath+this.state.activityProduct.product.masterImg} alt=""/></div>
            <div className={cNs(mmhc.fr,mmhc.recordaDatedFr)}>
              <div className={mmhc.explaina}>{this.state.activityProduct.product.name1}</div>
              <div>
                <em className={mmhc.explainal}>￥</em><em className={mmhc.explainar}>{this.state.buyHistory.buyingPrice}</em>
                <em className={mmhc.explainarr}>最低价：￥{this.state.minPrice}</em>
              </div>
            </div>
          </div>



          <div className={mmhc.recordaNumberb}>
            <ul className={mmhc.recordaNumberbUl}>
            {
              this.state.assistList.map(function(elem,index){
                return <li key={index}>{elem.assistMemberName} 帮您成功砍掉 {elem.assistResult}元</li>
              }.bind(this))
            }
            </ul>
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
    var userType = GetQueryString("userType");
    var userCode = GetQueryString("userCode");
    var sign = GetQueryString("sign");
    var activityProductId = GetQueryString("activityProductId");
    var buyingHistoryId = GetQueryString("buyingHistoryId");



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
      // url: jsonPath.path + "/activityProductMobileTop.json?activityId=" + buyingHistoryId,
      // url: jsonPath.path + "/activity/抢购详情getBuyHistoryAndAssistInfos.json?activityId=" + buyingHistoryId,
      // url: jsonPath.path + "/activity/sss抢购详情getBuyHistoryAndAssistInfos.json?buyingHistoryId=" + buyingHistoryId,
      url: jsonPath.path + "/getBuyHistoryAndAssistInfos.json?buyingHistoryId=" + buyingHistoryId,
      type: jsonPath.method,
      error:function(){
        // alert(123)
      },
      success: function(data) {
        this.setState({
            activityProduct: data.activityProduct,
            buyHistory: data.buyHistory,
            assistList: data.assistList,
            minPrice: data.minPrice,
            activityId: 21,
            userType: userType,
            userCode: userCode,
            sign: sign,
            activityProductId: activityProductId,
            buyingHistoryId: buyingHistoryId
        },function(){
          $("."+mmhc.tabCon+" li").click(function(){
            $(this).children().addClass(mmhc.tehui);
            $(this).siblings().children().removeClass(mmhc.tehui);
          })


        });
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityChildOne;
