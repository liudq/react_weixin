var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;

var banner = require("./img/bannerNew.jpg");
var banner19 = require("./img/banner_19.jpg");
var hehe = require("./img/hehe.jpg");
var line = require("./img/line.jpg");
var recommendImg = require("./img/recommendImg.jpg");

var myLine = require("./img/myLine.jpg");
var hotLine19 = require("./img/myLine19.png");
var hotLine = require("./img/hotLine.jpg");
var shareImg = require("./img/share.png");
var share2Img = require("./img/share2.png");

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
      versionTitel: 0,
      activityIdState: "" //活动id
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
        {/*<div className={cNs(mmhc.backDiv,this.state.versionTitel==1?mmhc.title12:"")}>
          <a href="back">
            <img src={this.state.versionTitel==1?back2Img:backIcon} width="12px" alt=""/>
          </a>
          <a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/oneYuanBuyNewShare.html,蜜麻花兑换专区,蜜麻花兑换专区"}>
            <img src={this.state.versionTitel==1?share2Img:shareImg} alt=""/>
          </a>
        </div>*/}
        <div className={mmhc.bannerContainer}>
          <img className={mmhc.banner} src={this.state.activityIdState==9?banner:banner19} width="100%" alt=""/>
    { /*<div onClick={this.showRule} className={mmhc.ruleBtn}>活动规则<em className={mmhc.ruleBtnEm}>!</em></div>*/ }
          <div className={cNs(mmhc.rule,this.state.ruleShowFlag==true?mmhc.show:"")}>
            <h1>活动规则</h1>
            <div className={this.state.activityIdState==9?mmhc.block:mmhc.none}>
              <p>1、本专区活动仅限支付宝宝粉网用户参与；</p>
              <p>2、凭支付宝宝粉一元购兑换券可任意选购一款商品；</p>
              <p>3、一个兑换码仅可使用一次；</p>
              <p>4、数量有限，售完即止；</p>
              <p>5、全国用户均可参与（除港、澳、台地区）；</p>
              <p>6、本次活动最终解释权归北京蜜麻花网络科技有限公司所有。</p>
            </div>
            <div className={this.state.activityIdState==19?mmhc.block:mmhc.none}> 
              <p>1.2016年5月25日至2016年6月25日用户通过微信分享集7个赞即可领取兑换码，兑换码可购买兑换专区产品的资格（所有商品一律包邮）;</p>
              <p>2.兑换流程：</p>
              <p>（1）微信搜索蜜麻花公众服务号【蜜麻花】，添加关注，发送集齐7个赞的截图，由蜜麻花客服审核，审核通过后发送兑换码至您的微信</p>
              <p>（2）点击进入兑换专区，挑选商品，输入兑换码</p>
              <p>（3）输入完毕，自动生成订单，点击支付（支付金额为填写兑换码后的折扣价），填写收货信息，支付完毕，购买完成</p>
              <p>3.活动说明：</p>
              <p>（1）不可与其他优惠叠加使用</p>
              <p>（2）【蜜麻花】郑重承诺，所有商品均为正品，数量有限，卖完为止</p>
              <p>（3）活动最终解释权归蜜麻花所有，如出现恶意刷单，不予发货。</p>
            </div>
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
                                <a href="/register.html?uc=I5s31O/fW7umGsxKvEsi2g==">
                                  <img className={mmhc.recommendMImgHis} src={imgPath+normalListM.activityProductVO.product.masterImg} width="100%" alt=""/>
                                </a>
                                <h1 className={mmhc.recommendMH1}>{cutText(normalListM.activityProductVO.product.name1,8)}</h1>
                                <div className={mmhc.recommendMMoney}>
                                  <em className={mmhc.recommendMMoneyOne}> ￥{normalListM.activityProductVO.activityPrice} </em>
                                  <em className={mmhc.recommendMMoneyOriginal}>￥{normalListM.activityProductVO.product.marketPrice}</em>
                                </div>
                                <div className={mmhc.recommendMShare}>
                                  <a className={mmhc.recommendMShareA} href="/register.html?uc=I5s31O/fW7umGsxKvEsi2g==">
                                    {
                                      normalListM.buyingHistoryAssistVO.status==0?"立即抢购":"分享解锁"
                                    }
                                  </a>
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
          <img src={this.state.activityIdState==9?hotLine:hotLine19} width="100%" alt=""/>
        </div>

        <div className={mmhc.recommendContainer}>
          {
            this.state.normalList.map(function(normalListM,index){
              return <div key={index} className={mmhc.recommendM}>
                      <a href="/register.html?uc=I5s31O/fW7umGsxKvEsi2g==">
                        <img className={mmhc.recommendMImg} src={imgPath+normalListM.activityProductVO.product.masterImg} width="100%" alt=""/>
                      </a>
                      <h1 className={mmhc.recommendMH1}>{cutText(normalListM.activityProductVO.product.name1,20)}</h1>
                      <div className={mmhc.recommendMMoney}>
                        <em className={mmhc.recommendMMoneyOne}> {"￥"+normalListM.activityProductVO.activityPrice} </em>
                        <em className={mmhc.recommendMMoneyOriginal}>￥{normalListM.activityProductVO.product.marketPrice}</em>
                      </div>
                      <div className={mmhc.recommendMShare}>
                        <a className={mmhc.recommendMShareA} href="/register.html?uc=I5s31O/fW7umGsxKvEsi2g==">查看详情</a>
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

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var activityIdState = GetQueryString("activityId");
    this.setState({
      activityIdState: activityIdState
    });
    var that = this;
    $.ajax({
      url: jsonPath.path + '/seckill/list.json',
      type: jsonPath.method,
      data: {
        "activityId": activityIdState
      },
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
          data: {
            "activityId": activityId
          },
          dataType: 'json',
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