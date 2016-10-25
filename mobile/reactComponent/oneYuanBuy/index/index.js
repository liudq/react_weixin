var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;

var banner = require("./img/bannerNew.jpg");
var hehe = require("./img/hehe.jpg");
var line = require("./img/line.jpg");
var recommendImg = require("./img/recommendImg.jpg");

var myLine = require("./img/myLine.jpg");
var hotLine = require("./img/hotLine.png");

var backIcon = require("./img/leftJT.png");
var back2Img = require("./img/back2.png");
var cutText = function(text, myLength) {
  if (text) {
    if (text.length > myLength * 1) {
      return text.slice(0, myLength * 1) + "...";
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
      seckillFlag: false,
      historyList: [],
      loginFlag: false,
      ruleShowFlag: false,
      versionTitel: 0
    }
  },
  quxiaoBtn: function(e) {
    var bhId = $(e.target).next().val();
    $.ajax({
      url: '/seckillpay/cancel.json',
      type: 'get',
      dataType: 'json',
      data: {
        bhId: bhId
      },
      success: function(data) {
        if (data.success == true || data.success == "true") {
          alert("删除成功");
          window.location.reload();
        } else {
          alert("删除失败");
        }
      }
    });
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
  render: function() {
    return (
      <div>
        <div className={cNs(mmhc.backDiv,this.state.versionTitel==1?mmhc.title12:"")}>
          <a href="back">
            <img src={this.state.versionTitel==1?back2Img:backIcon} width="12px" alt=""/>
          </a>
        </div>
        <div className={mmhc.bannerContainer}>
          <img className={mmhc.banner} src={banner} width="100%" alt=""/>
          <div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则<em className={mmhc.ruleBtnEm}>!</em></div>
          <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
            <h1>活动规则</h1>
            <p>1.新注册用户及未参与过1元购的用户，每个ID仅限抢购1个商品且限购1次;</p>
            <p>2.参与过本场或之前1元购的用户，如想再次抢购，需分享该商品二维码，分享给3位好友注册成功后，方可购买;</p>
            <p>3.支付完成送100元抵用券，抵用券仅限100元抵用券专场活动使用，使用时间：5月18日至5月22日;</p>
            <p>4.支付完成送50积分，积分可抵现金;</p>
            <p>5.本场商品全部包邮;</p>
            <p>6.本场商品参与整点购物享免单活动。</p>
            <p>活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
            <a href="javascript:void(0);" onClick={this.hideRule}>我知道了</a>
          </div>
        </div>
        <div className={cNs(mmhc.ruleMask,this.state.ruleShowFlag==true?mmhc.show:"")}></div>
        <div className={mmhc.recommendTitle}>
          {
            this.state.historyList.map(function(elM,index){
              return index==0?<img key={index} src={myLine} width="100%" alt=""/>:""
            })
          }
        </div>
        <div className={mmhc.myOneYuanBuyContainer}>
          <div id="myOneYuanBuy" className={cNs("swiper-container","swiper-container-horizontal")}>
            <div className={cNs("swiper-wrapper")}>
                {
                  this.state.historyList.map(function(normalListM,index){
                    return normalListM.buyingHistoryAssistVO.status!=1?<div key={index} className={cNs("swiper-slide")}>
                              <div key={index} className={mmhc.recommendMHistory}>
                                <a href="javascript:void(0);">
                                  <img className={mmhc.recommendMImgHis} src={imgPath+normalListM.activityProductVO.product.masterImg} width="100%" alt=""/>
                                </a>
                                <h1 className={mmhc.recommendMH1}>{cutText(normalListM.activityProductVO.product.name1,8)}</h1>
                                <div className={mmhc.recommendMMoney}>
                                  <em className={mmhc.recommendMMoneyOne}> ￥{normalListM.activityProductVO.activityPrice} </em>
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
                                  {
                                    normalListM.activityProductVO.status==1?<a className={mmhc.recommendMShareA} href={"/seckillpay/"+normalListM.activityProductVO.product.id+".html?acId="+normalListM.activityProductVO.id+"&bhId="+normalListM.buyingHistoryAssistVO.id+"&prdCode="+normalListM.activityProductVO.product.id+"&postageFree="+normalListM.activityProductVO.isPostageFree+"&activityId="+normalListM.activityProductVO.activityId}>
                                                                              {
                                                                                normalListM.buyingHistoryAssistVO.status==0?"立即抢购":"分享解锁"
                                                                              }
                                                                            </a>: <a className={mmhc.recommendMShareA} href="javascript:void(0);">
                                                                                    已下架
                                                                                  </a>
                                  }
                                  
                                  <a onClick={this.quxiaoBtn} href="javascript:void(0)" className={mmhc.quxiaoBtn}>取消</a>
                                  <input type="hidden" className="bhId" value={normalListM.buyingHistoryAssistVO.id}/>
                                </div>
                              </div>
                            </div>:""
                  }.bind(this))
                }
            </div>
          </div>
        </div>

        <div className={mmhc.recommendTitle}>
          <img src={hotLine} width="100%" alt=""/>
        </div>

        <div className={mmhc.recommendContainer}>
          {
            this.state.normalList.map(function(normalListM,index){
              return <div key={index} className={mmhc.recommendM}>
                      <a href={"/seckillpay/"+normalListM.activityProductVO.product.id+".html?acId="+normalListM.activityProductVO.id+"&bhId="+normalListM.buyingHistoryAssistVO.id+"&prdCode="+normalListM.activityProductVO.product.id+"&postageFree="+normalListM.activityProductVO.isPostageFree+"&activityId="+normalListM.activityProductVO.activityId}>
                        <img className={mmhc.recommendMImg} src={imgPath+normalListM.activityProductVO.product.masterImg} width="100%" alt=""/>
                      </a>
                      <h1 className={mmhc.recommendMH1}>{cutText(normalListM.activityProductVO.product.name1,20)}</h1>
                      <div className={mmhc.recommendMMoney}>
                        <em className={mmhc.recommendMMoneyOne}> {"￥"+normalListM.activityProductVO.activityPrice} </em>
                        <em className={mmhc.recommendMMoneyOriginal}>￥{normalListM.activityProductVO.product.marketPrice}</em>
                      </div>
                      <div className={mmhc.recommendMShare}>
                        <a className={mmhc.recommendMShareA} href={"/seckillpay/"+normalListM.activityProductVO.product.id+".html?acId="+normalListM.activityProductVO.id+"&bhId="+normalListM.buyingHistoryAssistVO.id+"&prdCode="+normalListM.activityProductVO.product.id+"&postageFree="+normalListM.activityProductVO.isPostageFree+"&activityId="+normalListM.activityProductVO.activityId}>查看详情</a>
                      </div>
                    </div>
            }.bind(this))
          }
        </div>
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
    var that = this;
    $.ajax({
      url: jsonPath.path + '/seckill/list.json',
      type: jsonPath.method,
      dataType: 'json',
      success: function(data) {
        this.setState({
          normalList: data.result
        });
        var activityId = data.result[0].activityProductVO.activityId;
        //历史列表
        $.ajax({
          url: jsonPath.path + '/seckill/buyhistorylist.json',
          type: jsonPath.method,
          dataType: 'json',
          data: {
            "activityId": activityId
          },
          success: function(data) {
            if (data.result == undefined) {
              that.setState({
                loginFlag: data.success
              });
            } else {
              that.setState({
                historyList: data.result,
                loginFlag: data.success
              }, function() {
                var swiper = new Swiper('#myOneYuanBuy', {
                  slidesPerView: 2.5,
                  paginationClickable: true,
                  spaceBetween: 10
                });
              });
            }
          }
        });
        // 历史列表
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