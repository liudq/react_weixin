var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var myDateFormat = require("../../common/util/util.js").dateFormat;

var empty = require("./img/empty.jpg");

var Main = React.createClass({
  getInitialState: function() {
    return {
      maskFlag: false,
      explainFlag: false,
      list1: [],
      list2: [],
      list3: []
    }
  },
  explainShow: function() {
    this.setState({
      explainFlag: !this.state.explainFlag
    });
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.title}>
          <a className={mmhc.goBack} href="#">&lt;</a>
          <h1 className={mmhc.titleText} >优惠券</h1>
          <a className={mmhc.titleExplain} onClick={this.explainShow} href="javascript:void(0)">使用说明</a>
        </div>

        <div className={cNs(mmhc.explain,this.state.explainFlag==true?mmhc.show:"")}>
          <p>1.现金券和购物券不可叠加使用。</p>
          <p>2.优惠券金额大于订单应付金额时，差额不予退回。</p>
          <p>3.优惠券过期即视为作废。</p>
        </div>

        <div className={mmhc.tabsMain}>
          <div className={cNs(mmhc.tabs,mmhc.clearfix)}>
            <a className={mmhc.active} href="javascript:void(0)">未使用（<em>{this.state.list1.length}</em>）</a>
            <a href="javascript:void(0)">已使用（<em>{this.state.list2.length}</em>）</a>
            <a href="javascript:void(0)">已过期（<em>{this.state.list3.length}</em>）</a>
          </div>
          
          <div id="tabs_container" className={cNs("swiper-container","swiper-container-horizontal")}>
            <div className={cNs("swiper-wrapper")}>
              <div className={cNs("swiper-slide")}>

                {
                  this.state.list1.map(function(listM,index){
                    return  <div key={index}>
                              <div style={{display:index==0?"none":"block"}} className={mmhc.line}>
                                <div className={mmhc.lineInner}></div>
                              </div>
                              <div className={cNs(mmhc.couponM,listM.amount==7?mmhc.purple:mmhc.red)}>
                                <div className={mmhc.couponMDiv}>
                                  <h1 className={mmhc.couponMH1}>全场可用</h1>
                                  <div className={mmhc.couponMContainer}>
                                    <h1 className={mmhc.couponMConT}>
                                      现金券　<em>￥<i>{listM.amount}</i></em>
                                    </h1>
                                    <h2 className={mmhc.couponMConB}>
                                      {myDateFormat(listM.startTime)}——{myDateFormat(listM.endTime)}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                  })
                }

                {
                  this.state.list1.length==0?<div className={mmhc.empty}>
                                              <img width="62px" src={empty} alt=""/>
                                              <p>您还没有未使用的优惠券~</p>
                                            </div>:<div></div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {


    //=============================================
    var tabsActive = "." + mmhc.tabs + " ." + mmhc.active;
    var tabA = "." + mmhc.tabs + " a";
    var tabsSwiper = new Swiper('#tabs_container', {
      speed: 500,
      onSlideChangeStart: function() {
        $(tabsActive).removeClass(mmhc.active);
        $(tabA).eq(tabsSwiper.activeIndex).addClass(mmhc.active);
      }
    });
    $(tabA).on('touchstart mousedown', function(e) {
      e.preventDefault();
      $(tabsActive).removeClass(mmhc.active);
      $(this).addClass(mmhc.active);
      tabsSwiper.slideTo($(this).index());
    });
    $(tabA).click(function(e) {
      e.preventDefault();
    });
    //=============================================

    $.ajax({
      url: jsonPath.path + '/counpList.json',
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        this.setState({
          list1: data.couponList1,
          list2: data.couponList2,
          list3: data.couponList3
        })
      }.bind(this)
    });

  }
});

module.exports = Main;