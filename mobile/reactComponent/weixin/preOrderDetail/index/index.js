var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var $ = require("jquery");

var bigImg = require("./img/bigImg.jpg");

var name = require('./img/name.png');
var mobile = require('./img/mobile.png');
var add = require('./img/add.png');

var Main = React.createClass({
  getInitialState: function() {
    return {
      maskFlag: false,
      productName: "",
      masterImg: "",
      commodityDescription2: "",
      commodityDescription3: "",
      commodityDescription4: "",
      commodityDescription5: "",
      originalPrice: "0.00",
      presentPrice: "0.00",
      productId: 0,
      userCode: "",
      buyNowContainerFlag: false
    }
  },
  showPrompt: function(message) {
    $("." + mmhc.prompt).html(message);
    $("." + mmhc.prompt).css({
      "opacity": "1",
      "display": "block"
    });
    $("." + mmhc.prompt).stop().animate({
      opacity: 0
    }, 2000, function() {
      $("." + mmhc.prompt).css({
        "display": "none"
      });
    });

  },
  buyNowContainerHandler: function() {
    this.setState({
      buyNowContainerFlag: true
    });
  },
  buyNowConHandlerHide: function() {
    this.setState({
      buyNowContainerFlag: false
    });
  },
  buyNow: function() {
    var reg = /^[0-9]{11}$/;
    var productIdVal = this.state.productId;
    var nameRef = ReactDom.findDOMNode(this.refs.nameRef).value;
    var phoneRef = ReactDom.findDOMNode(this.refs.phoneRef).value;
    var addressRef = ReactDom.findDOMNode(this.refs.addressRef).value;
    if ("" == nameRef || null == nameRef) {
      this.showPrompt("请输入姓名");
    } else if ("" == phoneRef || null == phoneRef) {
      this.showPrompt("请输入手机号");
    } else if (!reg.test(phoneRef)) {
      this.showPrompt("请输入正确的手机号");
    } else if ("" == addressRef || null == addressRef) {
      this.showPrompt("请输入地址");
    } else {
      $.ajax({
        url: jsonPath.path + '/preselllog/save.json',
        type: jsonPath.method,
        dataType: 'json',
        data: {
          userCode: this.state.userCode,
          precode: productIdVal,
          take_delivery_name: nameRef,
          mobile: phoneRef,
          addressInfo: addressRef
        },
        success: function(data) {
          if (data == true) {
            this.setState({
              maskFlag: true,
              buyNowContainerFlag: false
            });
          } else {
            this.showPrompt("抢购失败");
          }
        }.bind(this)
      });
    }
  },
  sueraa: function() {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxefacda2c980c2bc4&redirect_uri=http%3a%2f%2fweixin.mmhlive.com%2fweixin%2fmyPrese&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
  },
  render: function() {
    return (
      <div style={{paddingBottom:"10px"}}>
        <div className={mmhc.bigImg}>
          <img className={mmhc.bigImgImg} width="100%" src={"/preOrder/"+this.state.masterImg} alt=""/>
        </div>
        <div className={mmhc.containerPadd}>
          <h1 className={mmhc.title}>{this.state.productName}</h1>
          <em className={mmhc.amount}>￥{this.state.presentPrice}</em>
          <em className={mmhc.baoyou}>包邮</em>
          <em className={mmhc.baoyou}>正品</em>
          <p className={mmhc.originalPrice}>市场价<em>￥{this.state.originalPrice}</em></p>

          <img width="100%" className={mmhc.descriptionImg} src={"/preOrder/"+this.state.commodityDescription2} alt=""/>
          <img width="100%" className={mmhc.descriptionImg} src={"/preOrder/"+this.state.commodityDescription3} alt=""/>
          <img width="100%" className={mmhc.descriptionImg} src={"/preOrder/"+this.state.commodityDescription4} alt=""/>
          <img width="100%" className={mmhc.descriptionImg} src={"/preOrder/"+this.state.commodityDescription5} alt=""/>

          <div className={mmhc.empty44px}></div>

          <div onClick={this.buyNowConHandlerHide} className={cNs(mmhc.buyNowMask,this.state.buyNowContainerFlag==true?mmhc.show:"")}></div>
          <div className={cNs(mmhc.buyNowContainer,this.state.buyNowContainerFlag==true?mmhc.show:"")}>
            <div className={mmhc.messContainer}>
              <img src={name} className={mmhc.iconFloat} alt=""/>
              <label className={mmhc.nameLabel} htmlFor="name">姓名</label>
              <input ref="nameRef" id="name" className={mmhc.name} type="text"/>
            </div>
            <div className={mmhc.messContainer}>
              <img src={mobile} className={mmhc.iconFloat} alt=""/>
              <label className={mmhc.phoneLabel} htmlFor="phone">联系方式</label>
              <input ref="phoneRef" id="phone" className={mmhc.phone} type="text"/>
            </div>
            <div className={mmhc.messContainer}>
              <img src={add} className={mmhc.iconFloat} alt=""/>
              <label className={mmhc.addressLabel} htmlFor="address">地址</label>
              <textarea ref="addressRef" id="address" className={mmhc.address} name="" id="" cols="30" rows="5"></textarea>
            </div>
            <a className={mmhc.buyBtn} onClick={this.buyNow} href="javascript:void(0)">抢</a>
          </div>
          
        </div>

        <div className={mmhc.prompt}></div>

        <div className={cNs(mmhc.mask,this.state.maskFlag==true?mmhc.show:"")}></div>
        <div className={cNs(mmhc.congratulations,this.state.maskFlag==true?mmhc.show:"")}>
          <a href="javascript:void(0)" onClick={this.sueraa}>确定</a>
        </div>

        <div className={cNs(mmhc.buyBtnFixed,this.state.buyNowContainerFlag==false?mmhc.show:"")} onClick={this.buyNowContainerHandler}>抢</div>
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

    var id = getQueryString("code");
    var userCode = getQueryString("userCode");

    $.ajax({
      url: jsonPath.path + '/presell/detail.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        code: id,
        userCode: userCode
      },
      success: function(data) {
        this.setState({
          productName: data.presell.productName,
          masterImg: data.presell.masterImg,
          commodityDescription2: data.presell.description.split("=")[0],
          commodityDescription3: data.presell.description.split("=")[1],
          commodityDescription4: data.presell.description.split("=")[2],
          commodityDescription5: data.presell.description.split("=")[3],
          originalPrice: data.presell.productPriceMarket,
          presentPrice: data.presell.productPrice,
          productId: data.presell.code,
          userCode: userCode
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