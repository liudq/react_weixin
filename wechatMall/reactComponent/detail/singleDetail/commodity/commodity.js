var cNs = require('classnames');
var React = require("react");
var mmhc = require("./commodity.css");
var imgPath = require("../../../common/util/path.js").path;
var goodImg = require("./xiangqingye_10.png");
var goodImg13 = require("./xiangqingye_13.png");
var goodImg17 = require("./xiangqingye_17.png");
var goodImg21 = require("./xiangqingye_21.png");
var goodImg24 = require("./xiangqingye_24.png");
var xianshiImg03 = require("./xianshi_03.png");
var guanbiImg03 = require("./guanbi_03.png");
var qqImg = require("./qq.jpg");

var Commodity = React.createClass({
  getInitialState: function() {
    return {
      proPar: mmhc.none,
      speQuit: mmhc.none,
      speNum: 1,
      speAttrList: mmhc.speSec2Con,
      activeNum: 0,
      speGuige: "",
      goodsId1: [0, 0],
      dataUl1: 0,
      dataUl2: 0,
      url: 111,
      dataId1: "", //产品规格颜色的id
      dataId2: "", //产品规格尺寸的id
      shareUrl: "",
      mallMobilePriceEnd: this.props.product.malMobilePrice,
      productIdEnd: this.props.product.id
    }
  },
  comChangeCM: function() {
    this.props.comChangeCM();
  },
  proRar: function() {
    this.setState({
      proPar: mmhc.block
    });
  },
  proParQuite: function() {
    this.setState({
      proPar: mmhc.none
    });
  },
  speQuitClick: function() {
    this.props.quitGuige();
    /*this.setState({
      speQuit: mmhc.none
    });*/
  },
  showSpe: function() {
    this.props.showGuige();
    /*this.setState({
      speQuit: mmhc.block
    });*/
  },
  speNumAdd: function() {
    var num = this.state.speNum + 1;
    this.setState({
      speNum: num
    });
  },
  speNumRed: function() {
    if (this.state.speNum > 1) {
      var num = this.state.speNum - 1;
      this.setState({
        speNum: num
      });
    }
  },
  changSpe: function(event) {
    var i = event.target.getAttribute("id");
    var postId = event.target.getAttribute("data-id");
    var dataLine = event.target.getAttribute("data-line");
    //获取点击的颜色尺寸规格名字
    var dataName = event.target.getAttribute("data-name");
    if (dataLine == 0) {
      this.setState({
        dataId1: postId
      }, function() {
        var goodsIdAll = this.state.dataId1 + "," + this.state.dataId2;
        $.ajax({
          // url: "/json/getGoodsInfo.json?normAttrId=" + goodsIdAll + "&productId3=" + this.props.product.id,
          url: "/getGoodsInfo.json?normAttrId=" + goodsIdAll + "&productId=" + this.props.product.id,
          type: "get",
          error: function() {
            alert("请求数据失败");
          },
          success: function(dataJson) {
            this.setState({
              mallMobilePriceEnd: dataJson.mallMobilePrice,
              productIdEnd: dataJson.productId
            });
            this.props.changeNameStateFun1(dataName, dataJson);
          }.bind(this),
          dataType: "json"
        });
      });

    } else {
      this.setState({
        dataId2: postId
      }, function() {
        var goodsIdAll = this.state.dataId1 + "," + this.state.dataId2;
        $.ajax({
          // url: "/json/getGoodsInfo.json?normAttrId=" + goodsIdAll + "&productId3=" + this.props.product.id,
          url: "/getGoodsInfo.json?normAttrId=" + goodsIdAll + "&productId=" + this.props.product.id,
          type: "get",
          error: function() {
            alert("请求数据失败");
          },
          success: function(dataJson) {
            this.setState({
              mallMobilePriceEnd: dataJson.mallMobilePrice,
              productIdEnd: dataJson.productId
            });
            this.props.changeNameStateFun2(dataName, dataJson);
          }.bind(this),
          dataType: "json"
        });
      });
    }
    $(event.target).parent().find("li").removeClass(mmhc.speSec2ConAct);
    $(event.target).addClass(mmhc.speSec2ConAct);

  },
  onClickAddCar3: function() {
    var goodsIdAll = this.props.goods.id;
    this.props.onClickAddCar2(this.state.speNum, goodsIdAll);
    this.props.quitGuige();
  },
  onClickShopping3: function() {
    var goodsIdAll = this.props.goods.id;
    this.props.onClickShopping2(this.state.speNum, goodsIdAll);
    this.props.quitGuige();
  },
  share: function() {
    callAndroid.CallAndroidUrl(this.state.url);
  },
  render: function() {
    return (
      <div className={cNs(this.props.commodity2,mmhc.background)}>
          <div className={mmhc.mmhSwiper}>
            <div className={cNs("swiper-container")}>
              <div className="swiper-wrapper">
                {
                  this.props.productLeadPicList.map(function(img, index){
                    return <div key={index} className="swiper-slide"><img className={mmhc.goodImg} src={imgPath+img} alt=""/></div>;
                  })
                }
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className={mmhc.content}>
            <div className={mmhc.content1}>
              <div className={mmhc.top1}>
                <div className={mmhc.top1Left}>{this.props.product.name1}</div>
                <div className={mmhc.top1Left2}>{this.props.product.name2}</div>
                {/*<a onClick={this.share} href={"share?"+this.state.shareUrl} className={mmhc.top1Right}>
                  <img className={mmhc.goodImg13} src={goodImg13} alt=""/>
                  <div className={mmhc.share}>分享</div>
                </a>*/}
                <div className={mmhc.clear}></div>
              </div>
              <div className={mmhc.top2}>
                <div className={mmhc.top2Left}>￥ </div>
                <div className={mmhc.top2Content}>{this.props.mallMobilePriceEnd==null?this.props.product.mallPcPrice:this.props.mallMobilePriceEnd}</div>
                {/*<div className={mmhc.top2Right}><img className={mmhc.xianshiImg03} src={xianshiImg03} alt=""/></div>*/}
                <div className={mmhc.clear}></div>
              </div>
              {
                this.props.activityId==""?"":<div className={mmhc.priceF}>原价：<i className={mmhc.price}>￥{this.props.product.marketPrice}</i></div>
              }
              {/*<div className={mmhc.priceF}>价格：<i className={mmhc.price}>￥{this.props.product.marketPrice}</i></div>*/}
              <div className={mmhc.kuaiDi}>
                {/*<div className={mmhc.kuaiDiLeft}>{快递：0}.00</div>*/}
                <div className={mmhc.kuaiDiRight}>月销{this.props.product.virtualSales*1+this.props.product.actualSales*1}笔</div>
                <div className={mmhc.clear}></div>
              </div>
              <div className={mmhc.topBottom}>
                <div className={mmhc.topBottomLeft}><img className={mmhc.goodImg17} src={goodImg17} alt=""/>正品保证</div>
                <div className={mmhc.topBottomContent}><img className={mmhc.goodImg17} src={goodImg17} alt=""/>急速提款</div>
                <div className={mmhc.topBottomRight}><img className={mmhc.goodImg17} src={goodImg17} alt=""/>七天退换</div>
                <div className={mmhc.clear}></div>
              </div>
            </div>
            <div onClick={this.proRar} className={mmhc.content2}>
              <div className={mmhc.parameter}>产品参数</div>
              <img className={mmhc.goodImg21} src={goodImg21} alt=""/>
            </div>
            <div onClick={this.showSpe} className={mmhc.content2}>
              <div className={mmhc.parameter}><i className={mmhc.yiXuan}>已选</i>
                <i className={mmhc.guiGe}>{this.props.nameState1}</i>
                <i className={mmhc.guiGe}>{this.props.nameState2}</i>

              <i className={mmhc.num}>{this.props.speNum}个</i></div>
              <img className={mmhc.goodImg21} src={goodImg21} alt=""/>
            </div>
            <div className={mmhc.content3}>
              <div className={mmhc.evaluate}>商品评价（{this.props.commentNumber}）</div>
              <div className={mmhc.backComment}>
                <div className={mmhc.eve2}>
                {/*<img src={goodImg24} alt=""/>*/}
                {this.props.productComment.userName}<i className={mmhc.eve2Date}>{this.props.productComment.updateTime}</i></div>
                <p className={mmhc.eve2P}>{this.props.productComment.content}</p>
              </div>
              <div className={mmhc.eve3}>
                <div onClick={this.comChangeCM} className={mmhc.eve3All}>查看全部评论</div>
              </div>
            </div>
            <div className={mmhc.content4}>
              <div className={mmhc.content4Title}>
                <i className={mmhc.con4Title}>{this.props.seller.sellerName==undefined?"":this.props.seller.sellerName}</i>
                <div className={mmhc.clear}></div>
              </div>
              <div className={mmhc.cont4Cont}>
                <div className={mmhc.section1}>
                  <p className={mmhc.section2P1}>{this.props.seller.productNumber}</p>
                  <p className={mmhc.section2P2}>全部商品</p>
                </div>
                <div className={mmhc.section2}>
                  <p className={mmhc.section2P1}>5</p>
                  <p className={mmhc.section2P2}>上新</p>
                </div>
                <div className={mmhc.section3}>
                  <p className={mmhc.section2P1}>{this.props.seller.collectionNumber}</p>
                  <p className={mmhc.section2P2}>关注人数</p>
                </div>

                <div className={mmhc.section4}>
                  <p className={mmhc.sec4F}>宝贝描述 {this.props.seller.scoreDescription}</p>
                  <p className={mmhc.sec4F}>卖家服务 {this.props.seller.scoreService}</p>
                  <p className={mmhc.sec4F}>物流服务 {this.props.seller.scoreDeliverGoods}</p>
                </div>
                <div className={mmhc.clear}></div>
                {/*<div className={mmhc.section5}>
                  <a href={"/proCate.html?sellerId="+this.props.seller.id+"&pid=0"} className={mmhc.section5Left}>查看分类</a>
                  <a href={"/flagshipStore.html?sellerId="+this.props.seller.id} className={mmhc.section5Right}>进店逛逛</a>
                  <div className={mmhc.clear}></div>
                </div>*/}
              </div>
            </div>
            {
              //  this.props.sellerQqList.map(function(sellerQqList, index) {
              //   return <a key={index} href={"contactService,"+sellerQqList.qq} className={mmhc.contentKf}><img src={qqImg} alt=""/>{sellerQqList.name}</a>
              // }.bind(this))
            }
            <div className={mmhc.content6}></div>
          </div> 
          <div className={cNs(mmhc.proParBac,this.state.proPar)}></div>
          <div className={cNs(mmhc.proParCon,this.state.proPar)}>
            <div className={mmhc.proParSec}>
              <div className={mmhc.proParSec1}>产品参数</div>
              {
                this.props.productAttr.result.map(function(result, index) {
                  return <div key={index} className={mmhc.proParSec1}>
                    <div className={mmhc.proParSec1Left}>{result.name}</div>
                    <div className={mmhc.proParSec1Right}>{result.value}</div>
                    <div className={mmhc.clear}></div>
                  </div>
                }.bind(this))
              }
              <div onClick={this.proParQuite} className={mmhc.proParQuite}>关闭</div>
            </div>
          </div> 
           
        </div>
    )
  },
  componentWillReceiveProps: function(newPrps) {
    var url1 = window.location.href;
    this.setState({
      shareUrl: url1
    });
    var dataIdnum1 = "";
    var dataIdnum2 = "";
    newPrps.norms.map(function(norms, index) {
      if (index == 0) {
        dataIdnum1 = norms.attrList[0].id //产品规格颜色的id
      };
      if (index == 1) {
        dataIdnum2 = norms.attrList[0].id //产品规格尺寸的id
      }
    });
    this.setState({
      dataId1: dataIdnum1,
      dataId2: dataIdnum2
    });

    if (this.props.cartNumber == 0) {
      this.setState({
        speNum: 1
      })
    } else {
      this.setState({
        speNum: 1
      })
    };

  },
});

module.exports = Commodity;