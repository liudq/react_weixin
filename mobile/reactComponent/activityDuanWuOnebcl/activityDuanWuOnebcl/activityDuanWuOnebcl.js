var cNs = require('classnames');
var React = require("react");
var mmhc = require("./activityDuanWuOnebcl.css");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../common/util/jsonPath.js");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var sshareImg = require("./share.png");
var share2Img = require("./share2.png");

var bannerImg = require("./bannerapp.jpg");
var producta = require("./sfg.jpg");
var cartA = require("./car1.jpg");
var cartB = require("./car2.jpg");

var upImg = require("./up.png");
var backBottomImg = require("./back.png");



var ActivityChildOne = React.createClass({
  getInitialState: function() {
    return {
      apkState: "",
      activityProductVOList:[],
      ruleShowFlag: false,
      versionTitel: 0,
      activityId: "",
      result: [],
      on: mmhc.on,
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
  fnActOne: function(event) {
    var tabId = $(event.target).attr("data-id");
    $("." + mmhc.xiahua).removeClass(mmhc.on);
    $("#tab" + tabId).next().addClass(mmhc.on);
    $("." + mmhc.mainConq).removeClass(mmhc.block);
    $("#" + tabId).addClass(mmhc.block);

  },
  fnAddCar: function(event) {
    var productId = $(event.target).attr("data-ida");
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
            爆款专区
          </div>


          <div className={mmhc.section2t}></div>
          <div className={mmhc.section2}>
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {
                  this.state.activityProductVOList.map(function(elem,index){
                    return  <div key={index} className="swiper-slide">
                              <div className={mmhc.commoditybg} >
                                <div className={mmhc.xhfather}>
                                  <div className={mmhc.wordd} onClick={this.fnActOne} id={"tab"+index} data-id={index}>{elem.cateName}</div>
                                  <div className={cNs(mmhc.xiahua,index==0?mmhc.on:"")}></div>
                                </div>
                              </div>
                            </div>

                  }.bind(this))
                }

                <div className={mmhc.clear}></div>
              </div>
            </div>
          </div>




          <div className={mmhc.mainCon}>
            {
              this.state.activityProductVOList.map(function(elem,index){
                return  <div key={index} id={index} className={cNs(mmhc.mainConq,index==0?mmhc.block:"")}>
                          <div className={cNs(mmhc.Price1,mmhc.mRow)}>
                            <div className={cNs(mmhc.Price1_left,mmhc.fl)}>
                              <div className={mmhc.xiahuaa}></div>
                            </div>
                            <div className={cNs(mmhc.Price1_center,mmhc.fl)}>{elem.cateName}</div>
                            <div className={cNs(mmhc.Price1_right,mmhc.fr)}>
                              <div className={mmhc.xiahuaa}></div>
                            </div>
                          </div>


                          <div className={mmhc.productCon}>
                            <ul className={mmhc.clearfix}>
                              {
                                elem.productList.map(function(elem2,index2){
                                  return  <li key={index2} className={cNs(mmhc.fl,mmhc.productM)} id={elem2.id}>
                                            <a href={"/detail.html?prdCode="+elem2.id+"&activityId="+this.state.activityId+"&urlType=fourChooseOneBaoKuan"}>
                                              <div className={mmhc.productaImg}>
                                                <img src={imgPath+elem2.masterImg} alt=""/>
                                              </div>
                                            </a>
                                            <div>
                                              <p className={mmhc.productaName}>{elem2.name1}</p>
                                            </div>
                                            <div className={cNs(mmhc.moneyCart,mmhc.clearfix)}>
                                              <div className={cNs(mmhc.fl,mmhc.moneyN)}>
                                                <em className={mmhc.moneyN1}>￥</em><em className={mmhc.moneyN2}>{elem2.malMobilePrice}</em>
                                              </div>
                                              <div className={mmhc.fl}>
                                                {
                                                  // <em className={mmhc.moneyN3}>￥:{elem2.marketPrice}</em>
                                                }
                                              </div>
                                              <div className={cNs(mmhc.fr,mmhc.cartAA)}>
                                                <img onClick={this.fnAddCar} data-ida={elem2.id} src={cartA} alt=""/>
                                                <div className={mmhc.addNum}>+1</div>
                                              </div>
                                            </div>
                                          </li>
                                }.bind(this))
                              }


                            </ul>
                          </div>

                        </div>

              }.bind(this))
            }

          </div>


        <div className={mmhc.settlementat}></div>
        <div className={cNs(mmhc.clearfix,mmhc.settlementa)}>
          <div className={cNs(mmhc.fl,mmhc.settlemental)}><em className={mmhc.cartp}><img src={cartB} alt=""/></em><em  className={mmhc.moneyH}>合计：￥10.01</em></div>
          <div className={cNs(mmhc.fl,mmhc.settlementar)}><a href="/authc/shoppingCar.html"><em>去结算</em></a></div>
        </div>
        <div className={cNs(mmhc.clearfix,mmhc.settlementax)}>
          <div className={cNs(mmhc.fl,mmhc.settlementarx)}><a href="/authc/shoppingCar.html"><em>去结算</em></a></div>
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
      if ($(window).scrollTop() > 150) {
        $("." + mmhc.fixUpCss).addClass(mmhc.blocka);
        $("." + mmhc.backImgA).addClass(mmhc.blocka);
      } else {
        $("." + mmhc.fixUpCss).removeClass(mmhc.blocka);
        $("." + mmhc.backImgA).removeClass(mmhc.blocka);
      }
    });

    $("." + mmhc.fixUpCss).click(function(event) {
      $('html,body').animate({
        scrollTop: 0
      }, 800);
    });


  function serilizeUrl(url) {
    var urlObject = {};
    if (/\?/.test(url)) {
        var urlString = url.substring(url.indexOf("#") + 1);
        return urlString;
    }
    return null;
  }
  var urll = window.location.href;
  var as = serilizeUrl(urll)
  // alert(as)
  window.location.href="/fourChooseOneBaoKuan.html?activityId=21#"+as;


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
      // url: jsonPath.path + "/activity/activityProductById.json",
      // url: jsonPath.path + "/activity/详情页1activityProductMobileList.json?activityId=" + 21,
      url: jsonPath.path + "/activityProductMobileList.json?activityId=" + 21,

      type: jsonPath.method,
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
            countdown: data.countdown,
            activityId: 21
          }, function() {
              var mySwiper = new Swiper('.swiper-container', {
                  slidesPerView: length,
                  pagination: '.swiper-pagination',
                  paginationType: 'fraction',
                })


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


    // $(window).scroll(function() {
    //   if ($(window).scrollTop() > 150) {
    //     $("." + mmhc.fixUpCss).addClass(mmhc.blocka);
    //     $("." + mmhc.backImgA).addClass(mmhc.blocka);
    //   } else {
    //     $("." + mmhc.fixUpCss).removeClass(mmhc.blocka);
    //     $("." + mmhc.backImgA).removeClass(mmhc.blocka);
    //   }
    // });



          })
        } else {
          alert(data.message);
        }

      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = ActivityChildOne;
