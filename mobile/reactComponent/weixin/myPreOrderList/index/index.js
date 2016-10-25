var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var $ = require("jquery");
var ddd = require("../../../common/util/util.js").dateFormat;

var demo = require("./img/demo.jpg");

var Main = React.createClass({
  getInitialState: function() {
    return {
      maskFlag: false,
      presellList: [],
      prodId: 0
    }
  },
  showConfirm: function(event) {
    var id = ReactDom.findDOMNode(event.target).getAttribute("id");
    this.setState({
      maskFlag: true,
      prodId: id
    });
  },
  confirmYES: function() {
    $.ajax({
      url: jsonPath.path + '/presell/deletePreselLog',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        code: this.state.prodId
      },
      success: function(data) {
        if (data == 1) {
          window.location.reload();
        } else {
          alert("取消失败，请稍后。");
        }
      }
    });
  },
  confirmNO: function() {
    this.setState({
      maskFlag: false
    });
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.commodityContainer}>
          {
            this.state.presellList.map(function(presellM,index){
              return <div key={index} className={mmhc.commodityM}>
                      <div className={mmhc.commodityMTop}>
                        <img src={"/preOrder/"+presellM.prodct.masterImg} className={mmhc.cMImg} alt=""/>
                        <div className={mmhc.cMMess}>
                          <a href="javascript:void(0)" onClick={this.showPrompt} className={mmhc.cMMessTitle}>{presellM.prodct.productName}</a>
                          <em className={mmhc.cMMessAmount}>￥{presellM.prodct.productPrice}</em>
                          <a id={presellM.prelog.code} href="javascript:void(0)" onClick={this.showConfirm} className={mmhc.cMMessCancel}>取消预购</a>
                        </div>
                      </div>
                      <div className={mmhc.cMMessDate}>{ddd(presellM.prodct.createTime)}</div>
                    </div>
            }.bind(this))
          }
        </div>

        <div className={cNs(mmhc.mask,this.state.maskFlag==true?mmhc.show:"")}></div>
        <div className={cNs(mmhc.confirmDiv,this.state.maskFlag==true?mmhc.show:"")}>
          <h1 className={mmhc.confirmDivH1}>确定要取消此预购商品吗？</h1>
          <div className={mmhc.confirmDivBtn}>
            <a className={mmhc.confirmDivA1} onClick={this.confirmYES} href="javascript:void(0)">是</a>
            <a className={mmhc.confirmDivA2} onClick={this.confirmNO} href="javascript:void(0)">否</a>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r !== null) {
        return unescape(r[2]);
      }
      return null;
    }
    var userCode = getQueryString("userCode");
    $.ajax({
      url: jsonPath.path + '/preselllog/presellLogList.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        userCode: userCode
      },
      success: function(data) {
        this.setState({
          presellList: data
        });
      }.bind(this)
    });


    $(function() {
      $.ajax({
        url: '/weixin/buildJsConfig.json',
        type: 'post',
        data: {
          userCode: "1",
          url: window.location.href
        },
        dataType: 'json',
        success: function(data) {
          wx.config({
            debug: false,
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.jsSign, // 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });
          wx.ready(function() {
            wx.onMenuShareTimeline({
              title: '蜜麻花母婴商城 3.21开业 暖场预购商品', // 分享标题
              link: '', // 分享链接
              imgUrl: 'http://weixin.mmhlive.com/wechatImg/timeLineImg.jpg', // 分享图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareAppMessage({
              title: '蜜麻花母婴商城 3.21开业 暖场预购商品', // 分享标题
              link: '', // 分享链接
              imgUrl: 'http://weixin.mmhlive.com/wechatImg/timeLineImg.jpg', // 分享图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
          });
        }
      });
    })
  }
});

module.exports = Main;