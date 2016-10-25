var cNs = require('classnames');
var React = require("react");
var mmhc = require("./commodity.css");
var backImg = require("./order2.png");
var imgPath = require("../../common/util/path.js").path;
var goodImg = require("./xiangqingye_10.png");
var goodImg28 = require("./xiangqingye_28.png");
var goodImg34 = require("./xiangqingye_34.png");
var goodImg13 = require("./xiangqingye_13.png");
var goodImg17 = require("./xiangqingye_17.png");
var goodImg21 = require("./xiangqingye_21.png");
var goodImg24 = require("./xiangqingye_24.png");
var goodImg32 = require("./xiangqingye_32.png");
var goodImg44 = require("./xiangqingye_44.png");
var goodImg46Active = require("./xiangqingye_46active.png");
var goodImg46 = require("./xiangqingye_46.png");
var goodImg49 = require("./xiangqingye_49.png");
var gengduoImg06 = require("./gengduo_06.png");
var gengduoImg03 = require("./gengduo_03.png");
var gengduoImg09 = require("./gengduo_09.png");
var gengduoImg11 = require("./gengduo_11.png");
var xianshiImg03 = require("./xianshi_03.png");
var tuwenImg02 = require("./tuwen_02.png");
var pinglunImg03 = require("./pinglun_03.png");
var guanbiImg03 = require("./guanbi_03.png");

var jsonPath = require("../../common/util/jsonPath.js");

//商品组件
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
        if (this.state.dataId2 == "") {
          var goodsIdAll = this.state.dataId1;
        } else {
          var goodsIdAll = this.state.dataId1 + "," + this.state.dataId2;
        };
        // alert(goodsIdAll);
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
        // alert(goodsIdAll);
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
    // var goodsIdAll = this.state.dataId1 + "," + this.state.dataId2;
    var goodsIdAll = this.props.goods.id;
    this.props.onClickAddCar2(this.state.speNum, goodsIdAll);
    this.props.quitGuige();
    /*this.setState({
      speQuit: mmhc.none
    });*/
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
                {/*<a onClick={this.share} href={"share?"+this.state.shareUrl} className={mmhc.top1Right}>
                  <img className={mmhc.goodImg13} src={goodImg13} alt=""/>
                  <div className={mmhc.share}>分享</div>
                </a>*/}
                <div className={mmhc.clear}></div>
              </div>
              <div className={mmhc.top2}>
                <div className={mmhc.top2Left}>￥</div>
                <div className={mmhc.top2Content}>{this.props.activityPrice}</div>
                <div className={mmhc.top2Right}><img className={mmhc.xianshiImg03} src={xianshiImg03} alt=""/></div>
                <div className={mmhc.clear}></div>
              </div>
              {/*<div className={mmhc.priceF}>价格：<i className={mmhc.price}>￥{this.props.product.marketPrice}</i></div>*/}
              <div className={mmhc.kuaiDi}>
                <div className={mmhc.kuaiDiLeft}>快递：{this.props.postageFree}</div>
                <div className={mmhc.kuaiDiRight}>月销{this.props.product.virtualSales}笔</div>
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
              {
                 /*this.props.norms.map(function(norms, index) {
                  return <i key={index} className={mmhc.guiGe}>{norms.attrList[0].name}</i>
                }.bind(this))*/
              }
              <i className={mmhc.num}>{this.state.speNum}个</i></div>
              <img className={mmhc.goodImg21} src={goodImg21} alt=""/>
            </div>
            <div className={mmhc.content3}>
              <div className={mmhc.evaluate}>商品评价（{this.props.commentNumber==0?0:this.props.commentNumber}）</div>
              <div className={mmhc.eve2}>{this.props.productComment.userName}<i className={mmhc.eve2Date}>{this.props.productComment.updateTime}</i></div>
              <p className={mmhc.eve2P}>{this.props.productComment.content}</p>
              <div className={mmhc.eve3}>
                <div onClick={this.comChangeCM} className={mmhc.eve3All}>查看全部评论</div>
              </div>
            </div>
            <div className={mmhc.content4}>
              <div className={mmhc.content4Title}>
                {/*<img className={mmhc.con4Img28} src={goodImg28} alt=""/>*/}
                <i className={mmhc.con4Title}>{this.props.seller.sellerName}</i>
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
                {/*<div className={mmhc.section4}>
                  <p className={mmhc.sec4F}>宝贝描述 {this.props.seller.scoreDescription} <img src={goodImg32} alt=""/></p>
                  <p className={mmhc.sec4F}>卖家服务 {this.props.seller.scoreService} <img src={goodImg32} alt=""/></p>
                  <p className={mmhc.sec4F}>物流服务 {this.props.seller.scoreDeliverGoods} <img src={goodImg32} alt=""/></p>
                </div>*/}
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
          <div className={cNs(mmhc.proParBac,this.props.guiGeState)}></div>
          <div className={cNs(mmhc.spe,this.props.guiGeState)}>
            <div className={mmhc.speSce1}>
              <div className={mmhc.speSec1Left}><img className={mmhc.speSec1Img} src={imgPath+this.props.product.masterImg} alt=""/></div>
              <div className={mmhc.speSec1Centent}>
                <div className={mmhc.speCon1}>￥{this.props.activityPrice}</div>
              </div>
              <div onClick={this.speQuitClick} className={mmhc.speSce1Quit}><img className={mmhc.guanbiImg03} src={guanbiImg03} alt=""/></div>
            </div>
            {

                this.props.norms.map(function(norms, index1) {
                  return <div key={index1} className={mmhc.speSce2}>
                    <div className={mmhc.speSec2Top}>{norms.name}</div>
                    <ul data-ul={index1}>
                    {
                      norms.attrList.map(function(attrList, index2){
                        return this.state.goodsId1[1]==index2? <li data-name={attrList.name} data-line={index1} key={index2} data-id={attrList.id}  id={index2} onClick={this.changSpe} className={cNs(mmhc.speSec2ConAct,this.state.speAttrList)}>{attrList.name}</li>
                        : <li data-name={attrList.name} data-line={index1} key={index2} id={index2} data-id={attrList.id} onClick={this.changSpe} className={cNs(mmhc.speSec2Con,this.state.speAttrList)}>{attrList.name}</li>;
                      }.bind(this))
                    }
                    <div className={mmhc.clear}></div>
                    </ul>
                  </div>
                }.bind(this))

                /*this.props.norms.map(function(norms, index) {
                  return <div key={index} className={mmhc.speSce2}>
                    <div className={mmhc.speSec2Top}>{norms.name}</div>
                    <ul onClick={this.changUlId} data-ul={index} className={mmhc.attrListTerm}>
                    {
                      norms.attrList.map(function(attrList, index){
                        return this.state.goodsId1[1]==index? <li key={index} id={index} onClick={this.changSpe} className={cNs(mmhc.speSec2ConAct,this.state.speAttrList)}>{attrList.name}</li>
                        : <li key={index} id={index} onClick={this.changSpe} className={cNs(mmhc.speSec2Con,this.state.speAttrList)}>{attrList.name}</li>;
                      }.bind(this))
                    }
                    <div className={mmhc.clear}></div>
                    </ul>
                  </div>
                }.bind(this))*/
              }
            <div className={mmhc.speSce3}>
              <div className={mmhc.speSce3Left}>数量</div>
              <div className={mmhc.speAddNum}>
                <div className={mmhc.speAddNumCon}>{this.state.speNum}</div>
              </div>
            </div>
            {this.props.toShareFlag==false?<div onClick={this.onClickShopping3} className={mmhc.speSce4Shopping}>立即购买</div>:<div onClick={this.toShare} className={mmhc.con5Right2}>分享解锁</div>}
            {/*<div onClick={this.onClickAddCar3} className={mmhc.speSce4}>加入购物车</div>*/}
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
    var prdCode = GetQueryString("prdCode");
    $.ajax({
      // url: "/json/product/Detail.json",
      url: "/product/detail.json?prdCode=" + prdCode,
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.norms.length == 1) {
          this.setState({
            dataId1: data.norms[0].attrList[0].id
          })

        };
        if (data.norms.length == 2) {
          this.setState({
            dataId1: data.norms[0].attrList[0].id,
            dataId2: data.norms[1].attrList[0].id
          })
        };

      }.bind(this),
      dataType: "json"
    });
  },
  componentWillReceiveProps: function(newPrps) {
    var url1 = window.location.href;
    this.setState({
      shareUrl: url1
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

//详情组件
var Detail = React.createClass({
  render: function() {
    return (
      <div className={this.props.detail2}>
        <div className={mmhc.detailSec}>
          <div id="myHtml" className={mmhc.detailSec}></div>
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function() {
    if (this.props.product.description != undefined) {
      document.getElementById("myHtml").innerHTML = this.props.product.description;
    }
  }
});

//评论的组件
var Comment = React.createClass({
  getInitialState: function() {
    return {
      allPingLun: mmhc.activePingLun,
      goodPingLun: "",
      centerPingLun: "",
      badPingLun: "",
      productId: "",
      allCommentList: [],
      highCommentList: [],
      middleCommentList: [],
      lowCommentList: [],
      commentList: [],
      allNumber: "",
      lowNumber: "",
      highNumber: "",
      productId: ""
    }
  },
  //点击全部评论
  allPingLun: function() {
    this.setState({
      allPingLun: mmhc.activePingLun,
      goodPingLun: "",
      centerPingLun: "",
      badPingLun: "",
      commentList: this.state.allCommentList
    });

  },
  //点击好评
  goodPingLun: function() {
    this.setState({
      allPingLun: "",
      goodPingLun: mmhc.activePingLun,
      centerPingLun: "",
      badPingLun: "",
      commentList: this.state.highCommentList
    });

  },
  //点击中评
  centerPingLun: function() {
    this.setState({
      allPingLun: "",
      goodPingLun: "",
      centerPingLun: mmhc.activePingLun,
      badPingLun: "",
      commentList: this.state.middleCommentList
    });
  },
  //点击差评
  badPingLun: function() {
    this.setState({
      allPingLun: "",
      goodPingLun: "",
      centerPingLun: "",
      badPingLun: mmhc.activePingLun,
      commentList: this.state.lowCommentList
    });
  },

  render: function() {
    return (
      <div className={this.props.comment2}>
        <div className={mmhc.commentSec}>
          <div>
            <div onClick={this.allPingLun} className={cNs(mmhc.comTitle,this.state.allPingLun)}>全部评论 ({this.state.allNumber})</div>
            <div onClick={this.goodPingLun} className={cNs(mmhc.pingLun,this.state.goodPingLun)}>好评</div>
            <div onClick={this.centerPingLun} className={cNs(mmhc.pingLun,this.state.centerPingLun)}>中评</div>
            <div onClick={this.badPingLun} className={cNs(mmhc.pingLun,this.state.badPingLun)}>差评</div>
            <div className={mmhc.clear}></div>
          </div>

          {
            this.state.commentList.map(function(commentList, index){
              return <div key={index} className={mmhc.comSingle}>
                      <div className={mmhc.comSingleSec1}>{commentList.updateTime}</div>
                      <div className={mmhc.comSingleSec2}>
                        <div className={mmhc.comSingleHeader}>
                          <img className={mmhc.pinglunImg03} src={pinglunImg03} alt=""/>
                        </div>
                        <i className={mmhc.comName}>{commentList.userName}</i>
                        <div className={mmhc.clear}></div>
                      </div>
                      <div className={mmhc.comSinSec3}>{commentList.content}</div>
                    </div>
            }.bind(this))
          }


    {
      /*<div className={mmhc.comSingle}>
                  <div className={mmhc.comSingleSec1}>2015-12-25 20:32;32</div>
                  <div className={mmhc.comSingleSec2}>
                    <div className={mmhc.comSingleHeader}>
                      <img className={mmhc.pinglunImg03} src={pinglunImg03} alt=""/>
                    </div>
                    <i className={mmhc.comName}>我**烨</i>
                    <div className={mmhc.clear}></div>
                  </div>
                  <div className={mmhc.comSinSec3}>包装完好，送货速度快，给力</div>
                </div>*/
    }
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(newPrps) {
    if (this.props.productId != newPrps.productId) {
      this.setState({
        productId: newPrps.productId
      });
      //页面加载时请求评论的全部数据
      $.ajax({
        type: 'get',
        // url: "/json/product/comment/allcomment.json",
        url: "/product/comment/allcomment.json?productId=" + newPrps.productId,
        error: function() {
          alert("请求数据失败");
        }.bind(this),
        success: function(data) {
          this.setState({
            allCommentList: data.allCommentList,
            highCommentList: data.highCommentList,
            middleCommentList: data.middleCommentList,
            lowCommentList: data.lowCommentList,
            commentList: data.allCommentList,
            allNumber: data.allNumber,
            lowNumber: data.lowNumber,
            highNumber: data.highNumber,
            productId: data.productId
          })
        }.bind(this),
        dataType: "json"
      });
    };
  },
});

var SingleCommodity = React.createClass({
  getInitialState: function() {
    return {
      titleMore: mmhc.none,
      commodity: mmhc.active,
      detail: mmhc.block,
      comment: mmhc.block,
      commodity2: mmhc.block,
      detail2: mmhc.none,
      comment2: mmhc.none,
      product: {},
      statisticsVO: {},
      seller: {},
      productLeadPicList: [],
      cartNumber: 0,
      cartNum: mmhc.none,
      productAttr: {
        result: []
      },
      norms: [],
      goods: {},
      addNum: 0,
      guiGeState: mmhc.none,
      productComment: {},
      collection: 0, //收藏功能状态
      commentNumber: "",
      shoppingState: "",
      //已选规格
      nameState1: "",
      nameState2: "",
      goodsIdStateEnd: "",
      shareUrl: "",
      toShareFlag: false,
      shareMaskFlag: false,
      acId: 0,
      bhId: 0,
      postageFree: 0,
      apkState: "",
      activityPrice: 0,
      activityId: 0,
      explain: mmhc.block,
      explain2: mmhc.none,
      buyExplain: "",
      buyExplainState: "",
    }
  },
  titleMore: function() {
    var state = this.state.titleMore == mmhc.none ? mmhc.block : mmhc.none;
    this.setState({
      titleMore: state,
    });
  },
  changeD: function() {
    this.setState({
      titleMore: mmhc.none,
      commodity: mmhc.block,
      detail: mmhc.active,
      comment: mmhc.block,
      explain: mmhc.block,
      explain2: mmhc.none,
      commodity2: mmhc.none,
      detail2: mmhc.block,
      comment2: mmhc.none
    });
  },
  changeCM: function() {
    this.setState({
      titleMore: mmhc.none,
      commodity: mmhc.block,
      detail: mmhc.block,
      comment: mmhc.active,
      explain: mmhc.block,
      explain2: mmhc.none,
      commodity2: mmhc.none,
      detail2: mmhc.none,
      comment2: mmhc.block
    });
  },
  changeCD: function() {
    this.setState({
      titleMore: mmhc.none,
      commodity: mmhc.active,
      detail: mmhc.block,
      comment: mmhc.block,
      explain: mmhc.block,
      explain2: mmhc.none,
      commodity2: mmhc.block,
      detail2: mmhc.none,
      comment2: mmhc.none
    });
  },
  changeCE: function() {
    this.setState({
      titleMore: mmhc.none,
      commodity: mmhc.block,
      detail: mmhc.block,
      comment: mmhc.block,
      explain: mmhc.active,
      explain2: mmhc.block,
      commodity2: mmhc.none,
      detail2: mmhc.none,
      comment2: mmhc.none
    });
  },
  //规格里面的加入购物车按钮
  onClickAddCar2: function(speNum, goodsIdAll) {
    var allNum = this.state.cartNumber + speNum;
    $.ajax({
      type: 'get',
      // url: "/json/cart/addtocart.json",
      url: "/cart/addtocart.json",
      data: {
        "productId": this.state.product.id,
        // "productGoodId": goodsIdAll, //规格的id，颜色和尺寸用，隔开
        "productGoodId": this.state.goodsIdStateEnd, //点击规格以后的规格id
        "number": speNum,
        "pageUrl": window.location.href
      },
      success: function(data) {
        /*if (data.offline) {
          window.location.href = data.loginUrl;
          return false;
        };*/
        if (data.resultcode == true) {
          var allNum = this.state.cartNumber + speNum;
          this.setState({
            cartNumber: allNum,
            cartNum: mmhc.block
          });
          alert("添加成功");
        } else {
          alert(data.msg);
        };
      }.bind(this),
      dataType: "json"
    });
  },
  //规格里面的立即购买
  onClickShopping2: function(speNum, goodsIdAll) {
    console.log("activityProductId:" + this.state.acId);
    $.ajax({
      url: jsonPath.path + '/authc/seckill/checkbuyhistory.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        activityProductId: this.state.acId,
        productGoodId: this.state.goodsIdStateEnd,
        pageUrl: window.location.href
      },
      success: function(data) {
        if (data.offline) {
          window.location.href = data.loginUrl;
        } else {
          if (data.success == false) {
            alert(data.message);
            return false;
          } else {
            if (data.result.changeLock == 1) {
              /*window.location.reload();*/
              this.setState({
                toShareFlag: true
              });
            } else {
              window.location.href = "/authc/seckillpay/info.html?acId=" + this.state.acId + "&bhId=" + data.result.buyingHistoryId + "&goodsId=" + this.state.goodsIdStateEnd + "&postageFree=" + this.state.postageFree;
            }
          }
        }
      }.bind(this)
    });

    // var allNum = this.state.cartNumber + speNum;
    // $.ajax({
    //   type: 'get',
    //   url: "/cart/addtocart.json",
    //   data: {
    //     "productId": this.state.product.id,
    //     "productGoodId": goodsIdAll, //规格的id
    //     "number": speNum,
    //     "pageUrl": window.location.href
    //   },
    //   success: function(data) {

    //     if (data.resultcode == true) {
    //       var allNum = this.state.cartNumber + speNum;
    //       this.setState({
    //         cartNumber: allNum,
    //         cartNum: mmhc.block
    //       }, function() {
    //         window.location.href = "/authc/order.html";
    //       });

    //     } else {
    //       alert("立即购买失败");
    //     };
    //   }.bind(this),
    //   dataType: "json"
    // });

  },
  //底部立即购买按钮
  onClickShopping: function() {
    this.setState({
      guiGeState: mmhc.block,
      shoppingState: 1
    })
  },
  //底部的加入购物车按钮
  onClickAddCar: function() {
    this.setState({
        guiGeState: mmhc.block,
        shoppingState: 0
      })
      /*$.ajax({
        type: 'get',
        url: "/json/cart/addtocart.json",
        // url: "/cart/addtocart.json",
        data: {
          "productId": this.state.product.id,
          "productGoodId": this.state.goods.id,
          "number": 1,
          "pageUrl": window.location.href
        },
        success: function(data) {
          if (data.offline) {
            window.location.href = data.loginUrl;
            return false;
          };
          if (data.resultcode == true) {
            var numCar = this.state.cartNumber + 1;
            this.setState({
              cartNumber: numCar,
              cartNum: mmhc.block
            });
          } else {
            alert("添加失败");
          };
        }.bind(this),
        dataType: "json"
      });*/
  },
  quitGuige: function() {
    this.setState({
      guiGeState: mmhc.none
    })
  },
  showGuige: function() {
    this.setState({
      guiGeState: mmhc.block
    })
  },
  //收藏功能点击事件
  collectionFun: function() {
    if (this.state.collection == 0) {
      $.ajax({
        type: 'get',
        // url: "/productsList",
        url: "/docollectshop.json?sellerId=" + this.state.seller.id,
        error: function() {
          alert("请求数据失败");
        },
        success: function(data) {
          if (data.resultcode == true) {
            this.setState({
              collection: 1
            })
          } else {
            alert(data.msg);
          }
        }.bind(this),
        dataType: "json"
      });
    }
  },
  changeNameStateFunf1: function(nameStateF1, dataJsonEnd) {
    this.setState({
      nameState1: nameStateF1,
      goodsIdStateEnd: dataJsonEnd.data.id
    });
  },
  changeNameStateFunf2: function(nameStateF2, dataJsonEnd2) {
    this.setState({
      nameState2: nameStateF2,
      goodsIdStateEnd: dataJsonEnd2.data.id
    });
  },
  toShare: function() {
    var goodsIdAll = this.state.goodsIdStateEnd;
    $.ajax({
      url: '/authc/weixin/shareUrl.json',
      type: 'POST',
      dataType: 'json',
      data: {
        activityProductId: this.state.acId,
        productGoodId: goodsIdAll
      },
      success: function(data) {
        window.location.href = "sharebaobao," + data.result.getWeixinUrl + ",蜜麻花商城[一元起购]享包邮,母亲节返场|一元起抢购享包邮 点击参与";
      }
    });
  },
  shareMaskHide: function() {
    this.setState({
      shareMaskFlag: false
    });
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.titleAll}>
          <div className={mmhc.title}>
            {this.state.apkState==1?<a href="back" className={mmhc.titleLeft}><img className={mmhc.backImg} src={backImg} alt=""/></a>:<a href="/seckillpay/tolist.html" className={mmhc.titleLeft}><img className={mmhc.backImg} src={backImg} alt=""/></a>}
            <div onClick={this.titleMore} className={mmhc.titleRight}>...</div>
            <div className={mmhc.titleCenter}>
              <div onClick={this.changeCD} className={cNs(this.state.buyExplainState!=""?mmhc.shangPin:mmhc.shangPin2,this.state.commodity)}>商品</div>
              <div onClick={this.changeD} className={cNs(this.state.buyExplainState!=""?mmhc.shangPin:mmhc.shangPin2,this.state.detail)}>详情</div>
              <div onClick={this.changeCM} className={cNs(this.state.buyExplainState!=""?mmhc.shangPin:mmhc.shangPin2,this.state.comment)}>评论</div>
              <div onClick={this.changeCE} className={cNs(mmhc.shangPin,this.state.explain,this.state.buyExplainState!=""?mmhc.block:mmhc.none)}>购买说明</div>
            </div>
            <div className={mmhc.clear}></div>
          </div>
          <div onClick={this.titleMore} className={cNs(mmhc.title2,this.state.titleMore)}>
            <div className={mmhc.title2Content}>
              <a href="homePage" className={mmhc.title2Con1}>
                <img src={gengduoImg06} alt=""/>
                <p>首页</p>
              </a>
              <a href="search" className={mmhc.title2Con2}>
                <img src={gengduoImg03} alt=""/>
                <p>搜索</p>
              </a>
              <a href="assortment" className={mmhc.title2Con3}>
                <img src={gengduoImg09} alt=""/>
                <p>分类</p>
              </a>
              
              <div className={mmhc.clear}></div>
            </div>
          </div>
        </div>
        <Commodity toShareFlag={this.state.toShareFlag} activityPrice={this.state.activityPrice} postageFree={this.state.postageFree} changeNameStateFun1={this.changeNameStateFunf1} changeNameStateFun2={this.changeNameStateFunf2} nameState2={this.state.nameState2} nameState1={this.state.nameState1} onClickShopping2={this.onClickShopping2} shoppingStateOnClick={this.state.shoppingState} commentNumber={this.state.commentNumber} goods={this.state.goods} productComment={this.state.productComment} showGuige={this.showGuige} quitGuige={this.quitGuige} guiGeState={this.state.guiGeState} cartNumber={this.state.cartNumber} onClickAddCar2={this.onClickAddCar2} norms={this.state.norms} productAttr={this.state.productAttr} seller={this.state.seller} product={this.state.product} productLeadPicList={this.state.productLeadPicList} comChangeCM={this.changeCM} commodity2={this.state.commodity2}/>
        <Detail detail2={this.state.detail2} product={this.state.product}/>
        <Comment productId={this.state.product.id} comment2={this.state.comment2}/>
        <div className={cNs(mmhc.explainCss,this.state.explain2)}>
          <div className={mmhc.explainTitle}></div>
          <div style={{"display":this.state.buyExplain==3?"block":"none"}}>
            <p>1.顾客购买海外直邮货品时务必填写真实姓名以及身份证号码（必要时需上传收货人完整清晰的身份证正反面信息），否则将无法为您发货。</p>
            <p>2.所有商品均在原产国当地采购，保证本土原汁原味。</p>
            <p>3.通过蜜麻花销售的海外商品，保证原装正品。让宝妈们买的更直接、更安全、更放心。</p>
            <p>4、国际物流时长：海外直邮正常到货时间为7—45天，不同国家时效有所不同，但受到物流、海关清关速度、节假日等因素影响会有延误，需要60天左右。</p>
            <p>5、奶粉爆罐：由于欧盟为环保包装，奶粉一般用纸罐以及锡纸包装，在运输的过程中即使再仔细的包装，也无法100%杜绝漂洋过海爆罐的可能。万一爆罐，奶粉仍然在盒子内，尽快食用即可。</p>
            <p>6、海外直邮产品暂不支持无理由退货，如出现以下情况可申请退货：</p>
            <p className={mmhc.indent}>A、商品存在质量问题，如严重破损影响使用，食品过期，蜜麻花第一时间进行退货并给予补偿。（但货物途中包裹收到不同程度的挤压、抛甩使得部分商品发生变形、碎裂、不影响食用的属于正常现象，不属于质量问题）</p>
            <p className={mmhc.indent}>B、商家的原因，错发或者漏发商品，蜜麻花第一时间进行退货或重新发货。（仅限外包装完整无破损，封胶正常无重贴的情况下，拆封后发现产品数量和订单不符。）</p>
            <p className={mmhc.indent}>C、物流丢件：物流时间超过16个工作日，状态仍然异常的，我们可以帮您跟邮局申请查找丢件。最终确定丢件的货物进行退货。</p>
            <p>以上3种情况，客户需要联系我们的客服进行申请确认，然后将问题商品退回到国内指定退货地址，客服将进行相关退货手续。</p>
          </div>
          <div style={{"display":this.state.buyExplain==2?"block":"none"}}>
            <p>1、保税区是经国家海关批准注册、受海关监督和管理可较长时间存储商品的区域。是经国务院批准设立的、海关实施特殊监管的经济区域。 因此保税区能便利转口贸易，发货几乎和国内正常购物速度一样，且货品质量有保障。</p>
            <p>2、由于保税区发货全部在海关监管下完成，需要进行身份验证，为保证您能快速收到货物请在下单时务必填写真实姓名以及身份证号码（必要时需上传收货人完整清晰的身份证正反面信息），否则将无法为您发货。</p>
            <p>3、因涉及跨境订单推送，您下单后相关信息会直接推送至海关系统进行报关审核，故订单无法修改、取消。</p>
            <p>4、保税区商品不支持无理由退换货，如无质量问题不可退换，若不能接受请谨慎下单，订单生成后，将不能取消。</p>
          </div>
        </div>
        <div className={mmhc.content5}>
          <div className={mmhc.con5Left}>
            <div className={mmhc.bottom1}>
              <img className={mmhc.goodImg44} src={goodImg44} alt=""/>
              <a href="/flagshipStore.html" className={mmhc.botP}>店铺</a>
            </div>
            <div onClick={this.collectionFun} className={mmhc.bottom2}>
              <img className={mmhc.goodImg44} src={this.state.collection==1?goodImg46Active:goodImg46} alt=""/>
              <p className={mmhc.botP}>{this.state.collection==1?"已收藏":"收藏"}</p>
            </div>
            
          </div>
          {
            this.state.toShareFlag==false?<div onClick={this.onClickShopping} className={mmhc.con5Right2}>立即购买</div>:<div onClick={this.toShare} className={mmhc.con5Right2}>分享解锁</div>
          }
          <div className={mmhc.clear}></div>
        </div>

        <div onClick={this.shareMaskHide} className={cNs(mmhc.shareMask,this.state.shareMaskFlag==true?mmhc.show:"")}></div>
      </div>
    )
  },
  componentDidMount: function() {

  },
  componentWillMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var prdCode = GetQueryString("prdCode");
    var acId = GetQueryString("acId");
    var postageFree = GetQueryString("postageFree");
    var apkState = GetQueryString("apk");

    this.setState({
      acId: acId,
      postageFree: postageFree,
      apkState: apkState
    });

    $.ajax({
      url: jsonPath.path + '/seckill/checkbuyinfo.json',
      type: jsonPath.method,
      dataType: 'json',
      data: {
        activityProductId: acId
      },
      success: function(data) {
        if (data.result.canBuy == true) {
          this.setState({
            toShareFlag: false,
            activityPrice: data.result.activityPrice
          });
        } else {
          this.setState({
            toShareFlag: true,
            activityPrice: data.result.activityPrice
          });
        }
      }.bind(this)
    });

    $.ajax({
      type: 'get',
      // url: "/json/product/Detail.json",
      url: "/product/detail.json?prdCode=" + prdCode,
      success: function(data) {
        if (data.cartNumber == 0 || data.cartNumber == undefined) {
          cartNum = mmhc.none;
        } else {
          cartNum = mmhc.block;
        };
        if (data.productLeadPicList != undefined) {
          this.setState({
            productLeadPicList: data.productLeadPicList
          })
        };
        if (data.cartNumber != undefined) {
          this.setState({
            cartNumber: data.cartNumber
          })
        };
        if (data.statisticsVO.collectedShop == true) {
          var collectedShopState = 1;
        } else {
          collectedShopState = 0;
        };
        var activityIdsatae = "";
        if (data.activityId == undefined) {
          activityIdsatae = "";
        } else {
          activityIdsatae = data.activityId;
        };
        var buyExplainState = "";
        if (data.seller.id == 2 || data.seller.id == 3) {
          buyExplainState = 1;
        } else {
          buyExplainState = "";
        };
        if (data.norms.length == 0) {
          this.setState({
            product: data.product,
            statisticsVO: data.statisticsVO,
            seller: data.seller,
            cartNum: cartNum,
            productAttr: data.productAttr,
            goods: data.goods,
            productComment: data.productComment,
            collection: collectedShopState,
            commentNumber: data.commentNumber,
            goodsIdStateEnd: data.goods.id,
            buyExplain: data.seller.id,
            buyExplainState: buyExplainState
          });
        } else {
          if (data.norms.length == 1) {
            this.setState({
              product: data.product,
              statisticsVO: data.statisticsVO,
              seller: data.seller,
              cartNum: cartNum,
              productAttr: data.productAttr,
              norms: data.norms,
              goods: data.goods,
              productComment: data.productComment,
              collection: collectedShopState,
              commentNumber: data.commentNumber,
              nameState1: data.norms[0].attrList[0].name,
              goodsIdStateEnd: data.goods.id,
              activityId: activityIdsatae,
              mallMobilePriceEnd: data.product.malMobilePrice,
              productIdEnd: data.product.id,
              dataId1: data.norms[0].attrList[0].id,
              buyExplain: data.seller.id,
              buyExplainState: buyExplainState
            });
          } else {
            this.setState({
              product: data.product,
              statisticsVO: data.statisticsVO,
              seller: data.seller,
              cartNum: cartNum,
              productAttr: data.productAttr,
              norms: data.norms,
              goods: data.goods,
              productComment: data.productComment,
              collection: collectedShopState,
              commentNumber: data.commentNumber,
              nameState1: data.norms[0].attrList[0].name,
              nameState2: data.norms[1].attrList[0].name,
              goodsIdStateEnd: data.goods.id,
              activityId: activityIdsatae,
              mallMobilePriceEnd: data.product.malMobilePrice,
              productIdEnd: data.product.id,
              dataId1: data.norms[0].attrList[0].id,
              dataId2: data.norms[1].attrList[0].id,
              buyExplain: data.seller.id,
              buyExplainState: buyExplainState
            });
          }
        };

      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = SingleCommodity;