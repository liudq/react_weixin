var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var imgPath = require("../../../common/util/path.js").path;

var banner = require("./img/banner.jpg");
var hehe = require("./img/hehe.jpg");
var line = require("./img/line.jpg");
var recommendImg = require("./img/recommendImg.jpg");

var cutText = function(text, myLength) {
  if (text) {
    if (text.length > myLength * 1) {
      return text.slice(0, myLength * 1);
    } else {
      return text;
    }
  }
}

function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

var Main = React.createClass({
  getInitialState: function() {
    return {
      flag: false,
      topList: [],
      normalList: [],
      seckillFlag: false
    }
  },
  promptBtn: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      window.location.href = "https://itunes.apple.com/cn/app/mi-ma-hua/id1092824540?mt=8";
    } else if (/android/.test(ua)) {
      window.location.href = "https://weixin.mmhlive.com/downLoad/mmh.apk";
    } else {
      window.location.href = "https://www.mmhlive.com/registerNew.html";
    }
  },
  render: function() {
    return (
      <div>
        <img className={mmhc.banner} src={banner} width="100%" alt=""/>

        <div className={mmhc.rule}>
          <h1>活动规则</h1>
          <p>1.活动时间：2016年3月21日0:00-2016年4月21日24:00止</p>
          <p>2.必须是蜜麻花注册会员方可参与此活动。</p>
          <p>3.本次活动商品价格均为1元，用户一单只能抢购一件商品。</p>
          <p>4.订单支付完成后，邀请三名好友注册成功，方可进入下一单抢购。</p>
        </div>

        <div className={mmhc.recommendTitle}>
          <img src={line} width="100%" alt=""/>
        </div>

        <div className={mmhc.recommendContainer}>
          {
            this.state.normalList.map(function(normalListM,index){
              return <div key={index} className={mmhc.recommendM}>
                      <img className={mmhc.recommendMImg} src={imgPath+normalListM.activityProductVO.product.masterImg} width="100%" alt=""/>
                      <h1 className={mmhc.recommendMH1}>{cutText(normalListM.activityProductVO.product.name1,10)}</h1>
                      <div className={mmhc.recommendMMoney}>
                        <em className={mmhc.recommendMMoneyOne}> ￥1.00 </em>
                        <em className={mmhc.recommendMMoneyOriginal}>￥{normalListM.activityProductVO.product.marketPrice}</em>
                      </div>
                      <div className={mmhc.recommendMShare}>
                        {
                          normalListM.buyingHistoryAssistVO.coun==null&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState00)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.coun==0&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState00)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.coun==1&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState01)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.coun==2&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState02)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.coun>=3&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState03)}></div>:""
                        }
                        <a className={mmhc.recommendMShareA} onClick={this.promptBtn} href="javascript:void(0)">立即抢购</a>
                      </div>
                    </div>
            }.bind(this))
          }
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/seckill/list.json',
      type: jsonPath.method,
      // url: '/json/seckill/list.json',
      // type: "get",
      dataType: 'json',
      success: function(data) {
        this.setState({
          normalList: data.result
        });
      }.bind(this)
    });
  }
});

module.exports = Main;