var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;

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

var Main = React.createClass({
  getInitialState: function() {
    return {
      flag: false,
      topList: [],
      normalList: [],
      seckillFlag: false
    }
  },
  render: function() {
    return (
      <div>
        <img className={mmhc.banner} src={banner} width="100%" alt=""/>
        <div className={mmhc.hotTop}>
          {
            this.state.topList.map(function(topListM,index){
              return <div key={index} className={mmhc.hotM}>
                      <img className={mmhc.hotMImg} src={imgPath+topListM.activityProductVO.product.masterImg} alt=""/>
                      <div className={mmhc.hotMMess}>
                        <h1 className={mmhc.hotMMessH1}>{cutText(topListM.activityProductVO.product.name1,5)}</h1>
                        <em className={mmhc.hotMMessEm}>￥1.00</em>
                        <a className={mmhc.hotMMessA} href={"/seckillpay/"+topListM.activityProductVO.product.id+".html?acId="+topListM.activityProductVO.id+"&bhId="+topListM.buyingHistoryAssistVO.id+"&prdCode="+topListM.activityProductVO.product.id+"&postageFree="+topListM.activityProductVO.isPostageFree}>立即抢购</a>
                        {
                          topListM.buyingHistoryAssistVO.buyingCount==0&&this.state.seckillFlag==true?<div className={cNs(mmhc.hotMMessDiv,mmhc.hotMState00)}></div>:""
                        }
                        {
                          topListM.buyingHistoryAssistVO.buyingCount==1&&this.state.seckillFlag==true?<div className={cNs(mmhc.hotMMessDiv,mmhc.hotMState01)}></div>:""
                        }
                        {
                          topListM.buyingHistoryAssistVO.buyingCount==2&&this.state.seckillFlag==true?<div className={cNs(mmhc.hotMMessDiv,mmhc.hotMState02)}></div>:""
                        }
                        {
                          topListM.buyingHistoryAssistVO.buyingCount>=3&&this.state.seckillFlag==true?<div className={cNs(mmhc.hotMMessDiv,mmhc.hotMState03)}></div>:""
                        }
                      </div>
                    </div>
            }.bind(this))
          }
        </div>

        <div className={mmhc.rule}>
          <h1>活动规则</h1>
          <p>1.活动时间：2016年3月21日全天（具体时段待定）。</p>
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
                          normalListM.buyingHistoryAssistVO.buyingCount==0&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState00)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.buyingCount==1&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState01)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.buyingCount==2&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState02)}></div>:""
                        }
                        {
                          normalListM.buyingHistoryAssistVO.buyingCount>=3&&this.state.seckillFlag==true?<div className={cNs(mmhc.recommendMShareState,mmhc.hotMState03)}></div>:""
                        }
                        <a className={mmhc.recommendMShareA} href={"/seckillpay/"+normalListM.activityProductVO.product.id+".html?acId="+normalListM.activityProductVO.id+"&bhId="+normalListM.buyingHistoryAssistVO.id+"&prdCode="+normalListM.activityProductVO.product.id+"&postageFree="+normalListM.activityProductVO.isPostageFree}>立即抢购</a>
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
      url: jsonPath.path + '/seckill/toplist.json',
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        this.setState({
          topList: data.result
        });
      }.bind(this)
    });

    $.ajax({
      url: jsonPath.path + '/seckill/list.json',
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        this.setState({
          normalList: data.result
        });
      }.bind(this)
    });

    $.ajax({
      url: jsonPath.path + '/seckill/checklistbuyinfo.json',
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        if (data.result.canBuy == false) {
          this.setState({
            seckillFlag: true
          });
        } else {
          this.setState({
            seckillFlag: false
          });
        }
      }.bind(this)
    });
  }
});

module.exports = Main;