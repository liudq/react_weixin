require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./coupon.css");
var backImg = require("./order2.png");
var Coupon = React.createClass({
  getInitialState: function() {
    return {
      couponList: [{}],
      backState: mmhc.none,
      apkState: 0,
      noneState: ""
    }
  },
  render: function() {
    return (
      <div className={mmhc.content}>
      <div className={cNs(mmhc.title,this.state.backState)}>{this.state.apkState==1?<a href="back"><img src={backImg} alt=""/></a>:<a href="javascript:history.back();"><img src={backImg} alt=""/></a>}优惠券</div>
      <div className={cNs(mmhc.title2,this.state.backState)}></div>
        {
          this.state.noneState==1?"":<div style={{"text-align":"center"}}>还没有未使用的优惠券</div>
        }
        {
           this.state.couponList.map(function(couponList, index) {
            if(couponList.status=="未使用"){
              return <div key={index} className={mmhc.singleCoupon}>
                        <div className={mmhc.xianZhuan}>{couponList.activityCode==undefined?"":"(限专场)"}</div>
                        <div className={mmhc.amount}>{couponList.amount}</div>
                        <div className={mmhc.miniAmount}>￥{couponList.miniAmount}</div>
                        <div className={mmhc.clear}></div>
                        <div className={mmhc.time}>{timeFun.dateFormatDetailed(couponList.startTime)} 至 {timeFun.dateFormatDetailed(couponList.endTime)}</div>
                        <div className={mmhc.stateFont}>{couponList.status}</div>
                     </div>
            }
          }.bind(this))
        }
      </div>
    )
  },
  componentDidMount: function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.setState({
        backState: mmhc.none
      })
    } else {
      this.setState({
        backState: mmhc.block
      })
    }

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var userCode = GetQueryString("userCode");
    var apkState = GetQueryString("apk");
    this.setState({
      apkState: apkState
    })

    $.ajax({
      // url: "/json/getCouponList.json",
      url: "/getCouponList.json?userCode=" + userCode,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        var that = this;
        data.couponList.map(function(couponList, index) {
          if (couponList.status == "未使用") {
            that.setState({
              noneState: 1
            })
          };
        });
        this.setState({
          couponList: data.couponList
        })
      }.bind(this),
      dataType: "json"
    });

  },
});

module.exports = Coupon;