var cNs = require('classnames');
var React = require("react");
var mmhc = require("./detail.css");
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
var gengduoImg11 = require("./xiangqingye_49.png");
var xianshiImg03 = require("./xianshi_03.png");
var tuwenImg02 = require("./tuwen_02.png");
var pinglunImg03 = require("./pinglun_03.png");
var guanbiImg03 = require("./guanbi_03.png");
var gengduoImg = require("./gengduo.png");
var mmhLoadingImg = require("./Loading5.gif");
var jia1Img = require("./1.jpg");
var jian2Img = require("./2.jpg");
var Commodity = require("./commodity/commodity.js");
var DetailModular = require("./detailModular/detailModular.js");
var Comment = require("./comment/comment.js");


var SingleCommodity = React.createClass({
  getInitialState: function() {
    return {
      titleMore: mmhc.none,
      commodity: mmhc.active,
      detail: mmhc.block,
      comment: mmhc.block,
      explain: mmhc.block,
      commodity2: mmhc.block,
      detail2: mmhc.none,
      comment2: mmhc.none,
      explain2: mmhc.none,
      buyExplain: "",
      buyExplainState: "",
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
      activityId: "",
      goodsId1: [0, 0],
      mallMobilePriceEnd: "", //规格弹窗的价格
      productIdEnd: "", //规格弹窗的编号
      dataId1: "",
      dataId2: "",
      speNum: 1,
      fromHome: "",
      loadState: 0,
      sellerQqList: [],
      urlType: "",
      tabNum: "",
      prdCode: "",
      backUrl: ""
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
      type: 'post',
      // url: "/json/cart/addtocart.json",
      url: "/wechatMall/addtocart.json",
      data: {
        "productId": this.state.product.id,
        "productGoodId": this.state.goodsIdStateEnd, //点击规格以后的规格id
        "number": speNum,
        "pageUrl": window.location.href,
        "activityId": this.state.activityId
      },
      success: function(data) {
        if (data.resultcode == true) {
          var allNum = this.state.cartNumber + speNum;
          this.setState({
            cartNumber: allNum,
            cartNum: mmhc.block
          });
          //alert("添加成功");
        } else {
          if (data.offline == "ture") {
            window.location.href = data.loginUrl;
          } else {
            alert("加入购物车失败");
          }
        };
      }.bind(this),
      dataType: "json"
    });
  },
  //规格里面的立即购买
  onClickShopping2: function(speNum, goodsIdAll) {
    var allNum = this.state.cartNumber + speNum;
    $.ajax({
      type: 'get',
      // url: "/json/cart/addtocart.json",
      url: "/wechatMall/authc/addtocartLiji.json",
      data: {
        "productId": this.state.product.id,
        "productGoodId": this.state.goodsIdStateEnd, //规格的id
        "number": speNum,
        "pageUrl": window.location.href,
        "activityId": this.state.activityId
      },
      success: function(data) {
        if (data.offline) {
          window.location.href = data.loginUrl;
          return false;
        };
        if (data.success) {
          var allNum = this.state.cartNumber + speNum;
          this.setState({
            cartNumber: allNum,
            cartNum: mmhc.block
          }, function() {
            window.location.href = "/wechatMall/authc/order.html";
          });

        } else {
          alert("立即购买失败");
        };
      }.bind(this),
      dataType: "json"
    });
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
    window.location.href = "/wechatMall/downloadGuide.html";
    // if (this.state.collection == 0) {
    //   $.ajax({
    //     type: 'get',
    //     // url: "/productsList",
    //     url: "/member/docollectproduct.html?productId=" + this.state.product.id,
    //     error: function() {
    //       alert("请求数据失败");
    //     },
    //     success: function(data) {
    //       if (data.offline) {
    //         window.location.href = data.loginUrl;
    //         return false;
    //       };
    //       if (data.success == true) {
    //         this.setState({
    //           collection: 1
    //         })
    //       } else {
    //         alert(data.msg);
    //       }
    //     }.bind(this),
    //     dataType: "json"
    //   });
    // } else {
    //   $.ajax({
    //     type: 'get',
    //     // url: "/productsList",
    //     url: "/member/cancelcollectproduct.html?productId=" + this.state.product.id,
    //     error: function() {
    //       alert("请求数据失败");
    //     },
    //     success: function(data) {
    //       /*if (data.offline) {
    //         window.location.href = data.loginUrl;
    //         return false;
    //       };*/
    //       if (data.success == true) {
    //         this.setState({
    //           collection: 0
    //         })
    //       } else {
    //         alert(data.msg);
    //       }
    //     }.bind(this),
    //     dataType: "json"
    //   });
    // }
  },
  changeNameStateFunf1: function(nameStateF1, dataJsonEnd) {
    this.setState({
      nameState1: nameStateF1,
      goodsIdStateEnd: dataJsonEnd.id,
      mallMobilePriceEnd: dataJsonEnd.mallMobilePrice
    });
  },
  changeNameStateFunf2: function(nameStateF2, dataJsonEnd2) {
    this.setState({
      nameState2: nameStateF2,
      goodsIdStateEnd: dataJsonEnd2.id,
      mallMobilePriceEnd: dataJsonEnd2.mallMobilePrice
    });
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
        $.ajax({
          // url: "/json/getGoodsInfo.json",
          url: "/getGoodsInfo.json?normAttrId=" + goodsIdAll + "&productId=" + this.state.product.id,
          type: "get",
          error: function() {
            alert("请求数据失败");
          },
          success: function(dataJson) {
            // this.updataFun();
            this.changeNameStateFunf1(dataName, dataJson.data);
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
          // url: "/json/getGoodsInfo.json",
          url: "/getGoodsInfo.json?normAttrId=" + goodsIdAll + "&productId=" + this.state.product.id,
          type: "get",
          error: function() {
            alert("请求数据失败");
          },
          success: function(dataJson) {
            //this.updataFun();
            this.changeNameStateFunf2(dataName, dataJson.data);
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
    var goodsIdAll = this.state.goods.id;
    this.onClickAddCar2(this.state.speNum, goodsIdAll);
    this.quitGuige();
    /*this.setState({
      speQuit: mmhc.none
    });*/
  },
  onClickShopping3: function() {
    var goodsIdAll = this.state.goods.id;
    this.onClickShopping2(this.state.speNum, goodsIdAll);
    this.quitGuige();
  },
  updataFun: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var prdCode = GetQueryString("prdCode");
    var fromHome = GetQueryString("apk");
    var activityId = GetQueryString("activityId");
    this.setState({
      fromHome: fromHome,
      loadState: 0, //loading去掉
      activityId: activityId
    });
    $.ajax({
      type: 'get',
      // url: "/json/product/Detail.json",
      url: "/product/detail.json?prdCode=" + prdCode,
      success: function(data) {
        this.setState({
          loadState: 0
        });
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
        if (data.statisticsVO.collectedProduct == true) {
          var collectedShopState = 1;
        } else {
          collectedShopState = 0;
        };
        var sellerQqList = "";
        if (data.sellerQqList == undefined) {
          sellerQqList = "";
        } else {
          sellerQqList = data.sellerQqList;
        };
        var mallMobilePriceChange = "";
        if (data.goods.mallMobilePrice == undefined || data.goods.mallMobilePrice == "") {
          mallMobilePriceChange = data.product.malMobilePrice;
        } else {
          mallMobilePriceChange = data.goods.mallMobilePrice;
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
            mallMobilePriceEnd: mallMobilePriceChange,
            productIdEnd: data.product.id,
            sellerQqList: sellerQqList,
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
              mallMobilePriceEnd: mallMobilePriceChange,
              productIdEnd: data.product.id,
              dataId1: data.norms[0].attrList[0].id,
              sellerQqList: sellerQqList,
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
              mallMobilePriceEnd: mallMobilePriceChange,
              productIdEnd: data.product.id,
              dataId1: data.norms[0].attrList[0].id,
              dataId2: data.norms[1].attrList[0].id,
              sellerQqList: sellerQqList,
              buyExplain: data.seller.id,
              buyExplainState: buyExplainState
            });
          }
        };

      }.bind(this),
      dataType: "json"
    });
  },
  render: function() {
    return (
      <div>
        <div className={mmhc.titleAll}>
          <div className={mmhc.title}>
            {this.state.fromHome==1?<a href="back" className={mmhc.titleLeft}><img className={mmhc.backImg} src={backImg} alt=""/></a>:this.state.urlType==1?<a href={"/fourChooseOneBaoKuan.html?activityId=21#"+this.state.productIdEnd} className={mmhc.titleLeft}><img className={mmhc.backImg} src={backImg} alt=""/></a>:this.state.tabNum!=""?<a href={this.state.backUrl+"#"+this.state.prdCode} className={mmhc.titleLeft}><img className={mmhc.backImg} src={backImg} alt=""/></a>:<a href="javascript:history.go(-1);" className={mmhc.titleLeft}><img className={mmhc.backImg} src={backImg} alt=""/></a>}
            <div  className={mmhc.titleRight}></div>
            <div className={mmhc.titleCenter}>
              <div onClick={this.changeCD} className={cNs(this.state.buyExplainState!=""?mmhc.shangPin:mmhc.shangPin2,this.state.commodity)}>商品</div>
              <div onClick={this.changeD} className={cNs(this.state.buyExplainState!=""?mmhc.shangPin:mmhc.shangPin2,this.state.detail)}>详情</div>
              <div onClick={this.changeCM} className={cNs(this.state.buyExplainState!=""?mmhc.shangPin:mmhc.shangPin2,this.state.comment)}>评论</div>
              <div onClick={this.changeCE} className={cNs(mmhc.shangPin,this.state.explain,this.state.buyExplainState!=""?mmhc.block:mmhc.none)}>购买说明</div>
            </div>
            <div className={mmhc.clear}></div>
          </div>
          <div className={cNs(mmhc.titleBackground,this.state.titleMore)}></div>
          <div onClick={this.titleMore} className={cNs(mmhc.title2,this.state.titleMore)}>
            <div className={mmhc.title2Content}>
              <a href="/wechatMall/downloadGuide.html" className={mmhc.title2Con1}>
                <img src={gengduoImg06} alt=""/>
                <p>首页</p>
              </a>
              <a href="/wechatMall/downloadGuide.html" className={mmhc.title2Con2}>
                <img src={gengduoImg03} alt=""/>
                <p>搜索</p>
              </a>
              <a href="/wechatMall/categoryPage.html" className={mmhc.title2Con3}>
                <img src={gengduoImg09} alt=""/>
                <p>分类</p>
              </a>
              <a href="/wechatMall/authc/shoppingCar.html" className={mmhc.title2Con4}>
                <img src={gengduoImg11} alt=""/>
                <p>购物车</p>
              </a>
              <div className={mmhc.clear}></div>
            </div>
          </div>
        </div>
        <Commodity activityId={this.state.activityId} mallMobilePriceEnd={this.state.mallMobilePriceEnd} sellerQqList={this.state.sellerQqList} speNum={this.state.speNum} changeNameStateFun1={this.changeNameStateFunf1} changeNameStateFun2={this.changeNameStateFunf2} nameState2={this.state.nameState2} nameState1={this.state.nameState1} onClickShopping2={this.onClickShopping2} commentNumber={this.state.commentNumber} goods={this.state.goods} productComment={this.state.productComment} showGuige={this.showGuige} quitGuige={this.quitGuige} cartNumber={this.state.cartNumber} onClickAddCar2={this.onClickAddCar2} norms={this.state.norms} productAttr={this.state.productAttr} seller={this.state.seller} product={this.state.product} productLeadPicList={this.state.productLeadPicList} comChangeCM={this.changeCM} commodity2={this.state.commodity2}/>
        <DetailModular product={this.state.product} detail2={this.state.detail2}/>
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
              {/*<a href={"/flagshipStore.html?sellerId="+this.state.product.sellerId} className={mmhc.botP}>店铺</a>*/}
              <a href="/wechatMall/downloadGuide.html" className={mmhc.botP}>店铺</a>
            </div>
            <div onClick={this.collectionFun} className={mmhc.bottom2}>
              <img className={mmhc.goodImg44} src={this.state.collection==1?goodImg46Active:goodImg46} alt=""/>
              <p className={mmhc.botP}>{this.state.collection==1?"已收藏":"收藏"}</p>
            </div>
            <a href="/wechatMall/authc/shoppingCar.html" className={mmhc.bottom3}>
              <img className={mmhc.goodImg49} src={goodImg49} alt=""/>
              <div className={cNs(mmhc.shopCarNum,this.state.cartNum)}>{this.state.cartNumber}</div>
            </a>
          </div>
          <div onClick={this.onClickAddCar} className={mmhc.con5Right}>加入购物车</div>
          <div onClick={this.onClickShopping} className={mmhc.con5Right2}>立即购买</div>
          <div className={mmhc.clear}></div>
        </div>
      {/*弹出规格*/}
        <div onClick={this.quitGuige} className={cNs(mmhc.proParBac,this.state.guiGeState)}></div>
        <div className={cNs(mmhc.spe,this.state.guiGeState)}>
          <div className={mmhc.speSce1}>
            <div className={mmhc.speSec1Left}><img className={mmhc.speSec1Img} src={imgPath+this.state.product.masterImg} alt=""/></div>
            <div className={mmhc.speSec1Centent}>
              <div className={mmhc.speCon1}>￥{this.state.mallMobilePriceEnd}</div>
              <div className={mmhc.speCon2}>商品编号：{this.state.productIdEnd}</div>
            </div>
            <div onClick={this.quitGuige} className={mmhc.speSce1Quit}><img className={mmhc.guanbiImg03} src={guanbiImg03} alt=""/></div>
          </div>
          {

              this.state.norms.map(function(norms, index1) {
                return <div key={index1} className={mmhc.speSce2}>
                  <div className={mmhc.speSec2Top}>{norms.name}</div>
                  <ul data-ul={index1}>
                  {
                    norms.attrList.map(function(attrList, index2){
                      return this.state.goodsId1[1]==index2? <li data-name={attrList.name} data-line={index1} key={index2} data-id={attrList.id}  id={index2} onClick={this.changSpe} className={cNs(mmhc.speSec2Con,mmhc.speSec2ConAct,this.state.speAttrList)}>{attrList.name}</li>
                      : <li data-name={attrList.name} data-line={index1} key={index2} id={index2} data-id={attrList.id} onClick={this.changSpe} className={cNs(mmhc.speSec2Con,this.state.speAttrList)}>{attrList.name}</li>;
                    }.bind(this))
                  }
                  <div className={mmhc.clear}></div>
                  </ul>
                </div>
              }.bind(this))

            }
          <div className={mmhc.speSce3}>
            <div className={mmhc.speSce3Left}>数量</div>
            <div className={mmhc.speAddNum}>
              <div onClick={this.speNumAdd} className={mmhc.speAddNumJia}><img src={jia1Img} alt=""/></div>
              <div className={mmhc.speAddNumCon}>{this.state.speNum}</div>
              <div onClick={this.speNumRed} className={mmhc.speAddNumJian}><img src={jian2Img} alt=""/></div>
            </div>
          </div>
          {this.state.shoppingState==0?<div onClick={this.onClickAddCar3} className={mmhc.speSce4}>加入购物车</div>:<div onClick={this.onClickShopping3} className={mmhc.speSce4Shopping}>立即购买</div>}
          {/*<div onClick={this.onClickAddCar3} className={mmhc.speSce4}>加入购物车</div>*/}
        </div>

        <div className={cNs(mmhc.loadingMask,this.state.loadState==1?mmhc.block:mmhc.none)}></div>
        <img className={cNs(mmhc.loagingImg,this.state.loadState==1?mmhc.block:mmhc.none)} src={mmhLoadingImg} alt=""/>
        
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
    var fromHome = GetQueryString("apk");
    var activityId = GetQueryString("activityId");
    var urlType = GetQueryString("urlType");

    var tabNum = GetQueryString("tabNum");
    var backUrl = GetQueryString("returnUrl");
    if (tabNum == "" || tabNum == null) {
      tabNum = "";
    };
    if (tabNum != "") {
      if (backUrl.indexOf("?") != -1) {
        this.setState({
          tabNum: tabNum,
          prdCode: prdCode,
          backUrl: backUrl + "&tabNum=" + tabNum
        })
      } else {
        this.setState({
          tabNum: tabNum,
          prdCode: prdCode,
          backUrl: backUrl + "?tabNum=" + tabNum
        })
      }
    };
    // this.setState({
    //   tabNum: tabNum,
    //   prdCode: prdCode,
    //   backUrl: backUrl
    // });

    var urlTypeState = "";
    if (activityId == "" || activityId == null) {
      activityId = "";
    };
    if (urlType == "fourChooseOneBaoKuan") {
      urlTypeState = 1
    };
    this.setState({
      fromHome: fromHome,
      loadState: 0, //loading去掉
      activityId: activityId,
      urlType: urlTypeState
    });
    var cartNum;
    $.ajax({
      type: 'get',
      // url: "/json/product/Detail.json",
      url: "/product/detail.json?prdCode=" + prdCode,
      success: function(data) {
        this.setState({
          loadState: 0
        });
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
        if (data.statisticsVO.collectedProduct == true) {
          var collectedShopState = 1;
        } else {
          collectedShopState = 0;
        };
        var sellerQqList = "";
        if (data.sellerQqList == undefined) {
          sellerQqList = [];
        } else {
          sellerQqList = data.sellerQqList;
        };
        var mallMobilePriceChange = "";
        if (data.goods.mallMobilePrice == undefined || data.goods.mallMobilePrice == "") {
          mallMobilePriceChange = data.product.malMobilePrice;
        } else {
          mallMobilePriceChange = data.goods.mallMobilePrice;
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
            mallMobilePriceEnd: mallMobilePriceChange,
            productIdEnd: data.product.id,
            sellerQqList: sellerQqList,
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
              mallMobilePriceEnd: mallMobilePriceChange,
              productIdEnd: data.product.id,
              dataId1: data.norms[0].attrList[0].id,
              sellerQqList: sellerQqList,
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
              mallMobilePriceEnd: mallMobilePriceChange,
              productIdEnd: data.product.id,
              dataId1: data.norms[0].attrList[0].id,
              dataId2: data.norms[1].attrList[0].id,
              sellerQqList: sellerQqList,
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