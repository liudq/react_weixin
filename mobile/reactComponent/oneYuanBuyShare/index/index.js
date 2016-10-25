var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;

var banner = require("./img/banner.jpg");
var productImg = require("./img/productImg.jpg");
var productImg2 = require("./img/img01.jpg");
var up = require("./img/up.jpg");

var cutText = function(text, myLength) {
  if (text) {
    if (text.length > myLength * 1) {
      return text.slice(0, myLength * 1);
    } else {
      return text;
    }
  }
}

var Main = React.createClass({
  getInitialState: function() {
    return {
      flag: false,
      productMess: [],
      acId: 0,
      bhId: 0,
      userCode: 0,
      userType: 0,
      sign: 0
    }
  },
  render: function() {
    return (
      <div>
        <img width="100%" src={banner} alt=""/>
        <div className={mmhc.paddingDiv}>
          {
            this.state.productMess.map(function(productMessM,index){
              return <div key={index} className={mmhc.picAndMess}>
                      <a href="">
                        <img className={mmhc.img} src={imgPath+productMessM.activityProductVO.product.masterImg} alt=""/>
                      </a>
                      <div className={mmhc.mess}>
                        <h1 className={mmhc.productTitle}>{cutText(productMessM.activityProductVO.product.name1,38)}</h1>
                        <div className={mmhc.productMoney}>
                          <em className={mmhc.productOne}>￥{productMessM.activityProductVO.activityPrice}</em>
                          <em className={mmhc.productOriginal}>￥<i>{productMessM.activityProductVO.product.marketPrice}</i></em>
                        </div>
                      </div>
                    </div>
            }.bind(this))
          }

          <p className={mmhc.paddingDivP}>我需要你 快来助攻</p>
          <a className={mmhc.helpBtn}  href={"/register.html?acId="+this.state.acId+"&bhId="+this.state.bhId+"&userCode="+this.state.userCode+"&userType="+this.state.userType+"&sign="+this.state.sign}>帮助他</a>
          <img className={mmhc.up} src={up} alt=""/>
        </div>

        <div className={mmhc.paddingPDiv}>
          <h1>活动规则</h1>
          {/*<h2>活动时间</h2>
          <p>5月18日-5月22日</p>*/}

          <h2>活动规则</h2>
          <p>1.新注册用户及未参与过1元购的用户，每个ID仅限抢购1个商品且限购1次;</p>
          <p>2.参与过本场或之前1元购的用户，如想再次抢购，需分享该商品二维码，分享给3位好友注册成功后，方可购买;</p>
          <p>3.支付完成送100元抵用券，抵用券仅限100元抵用券专场活动使用，使用时间：5月18日至5月22日;</p>
          <p>4.支付完成送50积分，积分可抵现金;</p>
          <p>5.本场商品全部包邮;</p>
          <p>6.本场商品参与整点购物享免单活动。</p>
          <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>

        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };

    var acId = GetQueryString("activityProductId");
    var userType = GetQueryString("userType");
    var userCode = GetQueryString("userCode");
    var sign = GetQueryString("sign");
    var bhId = GetQueryString("buyingHistoryId");

    this.setState({
      acId: acId,
      bhId: bhId,
      userCode: userCode,
      userType: userType,
      sign: sign
    });

    $.ajax({
      url: jsonPath.path + '/seckill/getAssistInfo.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        activityProductId: acId
      },
      success: function(data) {
        var productMessArry = [];
        productMessArry[0] = data.result;
        this.setState({
          productMess: productMessArry
        });
      }.bind(this)
    });

  }
});

module.exports = Main;