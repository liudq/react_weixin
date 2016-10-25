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

var SpecialOneContent = React.createClass({
  getInitialState: function() {
    return {
      activityProductVOList: [],
      titleName: "",
      apkState: "",
      activityId: "",
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
          <div className={mmhc.section2bg}></div>
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

module.exports = SpecialOneContent;