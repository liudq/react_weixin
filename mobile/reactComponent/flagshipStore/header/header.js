var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var mmhc = require("./header.css");
var jsonPath = require("../../common/util/jsonPath.js");
var imgPath = require("../../common/util/path.js").path;
var StoreHeader = React.createClass({
  getInitialState: function() {
    return {
      sellers: {},
      bok: true,
      bok2: true,
      banners: "",
      sellerId: "",
      goWhere: "",
      collectedS: "",
      collectionNumber: "",
      versionTitel: 0
    }
  },
  showHide: function() {
    this.setState({
      bok: !this.state.bok
    })
  },
  fnCollect: function() {
    var that = this;

    this.setState({
      bok2: !this.state.bok
    }, function() {

      $.ajax({
        dataType: 'json',
        data: {
          sellerId: this.state.sellerId,
          pageUrl: window.location.href
        },
        url: jsonPath.path + '/member/docollectshop.html',
        type: "get",
        success: function(data) {
          if (data.offline) {
            window.location.href = data.loginUrl;
            return false;
          };
          if (data.success) {
            if (that.state.collectedS == "收藏") {
              that.setState({
                collectedS: "已收藏",
                collectionNumber: that.state.collectionNumber + 1
              });
            } else {
              that.setState({
                collectedS: "收藏",
                collectionNumber: that.state.collectionNumber - 1
              });
            }
          } else {
            alert(data.message);
          }
        }
      });
    });
  },
  render: function() {
    return (
      <div>
        <section className={CNs(mmhc.proSearch,mmhc.clearfix,this.state.versionTitel==1?mmhc.titel12:"")}>
          <a className={CNs(this.state.versionTitel==1?mmhc.back2:mmhc.back)} href={this.state.goWhere==1?"back":"javascript:history.go(-1);"}></a>
          <div style={{"display":"none"}} className={mmhc.search}>
            <input  type="text" placeholder="马上搜索店内优惠产品"/>
            <a className={mmhc.searchBtn}  href={"/storeSearch.html?sellerId="+this.state.sellerId}></a>
          </div>
          <div className={mmhc.more} onClick={this.showHide}></div>
          <ul className={CNs(mmhc.goMore,this.state.bok==true?mmhc.hide:mmhc.show)}>
            <li><a className={mmhc.homePage} href="homePage">首页</a></li>
            <li><a className={mmhc.goSerch} href="search">搜索</a></li>
            <li><a className={mmhc.goCate} href="assortment">分类</a></li>
            <li><a className={mmhc.goBuyCar} href="/shoppingCar.html">购物车</a></li>
          </ul>
        </section>
        <header className={mmhc.MyHeader}>
          <div className={mmhc.storeInfBox}>
          <img src={imgPath+this.state.banners} alt="banner"/>
            <div className={CNs(mmhc.storeInf,mmhc.clearfix)}>
    { /*<img className={mmhc.storeLogo} src={imgPath+this.state.sellers.sellerLogo} alt="aitameiLogo"/>*/ }
              <div className={mmhc.storeName}>
                {/*<h2>{this.state.sellers.name}{this.state.sellers.sellerName}</h2>*/}
                <p>{this.state.sellers.name}{this.state.sellers.sellerName}</p>
              </div>
              <div className={mmhc.fans}>
                <p>{this.state.collectionNumber==""?0:this.state.collectionNumber}</p>
                <p>粉 丝</p>
              </div>
              <a className={mmhc.collect} href="javascript:;" onClick={this.fnCollect}>{this.state.collectedS}</a>
            </div>
          </div>
        </header>
      </div>
    )
  },
  componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    }
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

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    }
    var urlParam = getUrlParam("apk");
    var urlParam2 = getUrlParam("sellerId");
    this.setState({
      goWhere: urlParam
    });
    if (urlParam2) {
      this.setState({
        sellerId: urlParam2
      }, function() {
        $.ajax({
          url: jsonPath.path + '/store/sellerId.json?sellerId=' + this.state.sellerId,
          type: "get",
          success: function(datar) {
            if (datar.collected == "true" || datar.collected == true) {
              this.setState({
                collectedS: "已收藏"
              });
            } else {
              this.setState({
                collectedS: "收藏"
              });
            }
            // datar.seller.collectionNumber = (datar.seller.collectionNumber / 10000).toFixed(2);
            this.setState({
              sellers: datar.seller,
              collectionNumber: datar.seller.collectionNumber,
              banners: datar.banners[0] ? datar.banners[0].image : datar.seller.bannerList[0].path1,
              collected: datar.collected
            });
          }.bind(this),
          dataType: "json"
        });
      });
    }
  }
});
module.exports = StoreHeader;