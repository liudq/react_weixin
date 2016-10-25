require("../common/util/init.css");
var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var mmhc = require("./brandProductList.css");
var jsonPath = require("../common/util/jsonPath.js");
var imgPath = require("../common/util/path.js").path;
var MyAlert = require("../common/mmhAlert/mmhAlert.js");
//var myLoadPic = require("./Loading5.gif");
var myNone = require("./none.jpg");
var ProductM = React.createClass({
  render: function() {
    return (
      <li className={mmhc.marR}>
        <a href={"/detail.html?prdCode="+this.props.data.id}>
          <img src={this.props.data.masterImg} alt="商品图片"/>
          <div className={mmhc.infBox}>
            <p className={mmhc.proName}>{this.props.data.name1} {this.props.data.name2}</p>
            <p className={mmhc.proPrice}>￥{this.props.data.malMobilePrice}</p>
            {
              // <p>好评{this.props.data.commentsGood+"%"}   {this.props.data.commentsNumber}人</p>
            }
          </div>
        </a>
      </li>
    )
  }
});
var BrandProList = React.createClass({
  getInitialState: function() {
    return {
      AProducts: [],
      pageNum: 1,
      currPage: 1,
      heightS: "",
      bok: true,
      on1: mmhc.on,
      on2: "",
      on3: "",
      on4: mmhc.on,
      on5: "",
      on6: "",
      checked1: mmhc.Cchecked,
      checked2: "",
      checked3: "",
      bok2: true,
      sort1: "desc",
      sort2: "desc",
      sort3: "desc",
      fot1: true,
      fot2: true,
      fot3: true,
      bok3: true
    }
  },
  fnChange: function() {
    this.setState({
      bok: !this.state.bok
    });
  },
  fnAct1: function() {
    this.setState({
      on1: mmhc.on,
      on2: "",
      on3: "",
      fot1: !this.state.fot1
    })
    if (this.state.fot1) {
      this.setState({
        sort1: "asc"
      })
    } else {
      this.setState({
        sort1: "desc"
      })
    }

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam('brandId');
    $.ajax({
      url: jsonPath.path + "/product/brand/list.json?commentsNumber=" + this.state.sort1,
      type: jsonPath.method,
      data: {
        "brandId": urlParam
      },
      success: function(dataC) {
        for (var i = 0; i < dataC.length; i++) {
          dataC[i].masterImg = imgPath + dataC[i].masterImg
          dataC[i].malMobilePrice = dataC[i].malMobilePrice.toFixed(2);
          if (dataC[i].commentsNumber && dataC[i].commentsGood) {
            if (dataC[i].commentsNumber != 0) {
              dataC[i].commentsGood = parseInt((dataC[i].commentsGood / dataC[i].commentsNumber) * 100);
            } else {
              dataC[i].commentsGood = 0;
            }
          } else {
            dataC[i].commentsGood = 0;
          }
          this.setState({
            AProducts: dataC
          });
        }
      }.bind(this),
      dataType: "json"
    })
  },
  fnAct2: function() {
    this.setState({
      on2: mmhc.on,
      on1: "",
      on3: "",
      fot2: !this.state.fot2
    })
    if (this.state.fot2) {
      this.setState({
        sort2: "asc"
      })
    } else {
      this.setState({
        sort2: "desc"
      })
    }

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam('brandId');
    $.ajax({
      url: jsonPath.path + "/product/brand/list.json?orderSellCount=" + this.state.sort2,
      type: jsonPath.method,
      data: {
        "brandId": urlParam
      },
      success: function(dataS) {
        for (var i = 0; i < dataS.length; i++) {
          dataS[i].masterImg = imgPath + dataS[i].masterImg
          dataS[i].malMobilePrice = dataS[i].malMobilePrice.toFixed(2);
          if (dataS[i].commentsNumber && dataS[i].commentsGood) {
            if (dataS[i].commentsNumber != 0) {
              dataS[i].commentsGood = parseInt((dataS[i].commentsGood / dataS[i].commentsNumber) * 100);
            } else {
              dataS[i].commentsGood = 0;
            }
          } else {
            dataS[i].commentsGood = 0;
          }
          this.setState({
            AProducts: dataS
          });
        }
      }.bind(this)
    })
  },
  fnAct3: function() {
    this.setState({
      on3: mmhc.on,
      on2: "",
      on1: "",
      fot3: !this.state.fot3
    })
    if (this.state.fot3) {
      this.setState({
        sort3: "asc"
      })
    } else {
      this.setState({
        sort3: "desc"
      })
    }

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam('brandId');
    $.ajax({
      url: jsonPath.path + "/product/brand/list.json?orderPrice=" + this.state.sort3,
      type: jsonPath.method,
      data: {
        "brandId": urlParam
      },
      success: function(dataP) {
        for (var i = 0; i < dataP.length; i++) {
          dataP[i].masterImg = imgPath + dataP[i].masterImg
          dataP[i].malMobilePrice = dataP[i].malMobilePrice.toFixed(2);
          if (dataP[i].commentsNumber && dataP[i].commentsGood) {
            if (dataP[i].commentsNumber != 0) {
              dataP[i].commentsGood = parseInt((dataP[i].commentsGood / dataP[i].commentsNumber) * 100);
            } else {
              dataP[i].commentsGood = 0;
            }
          } else {
            dataP[i].commentsGood = 0;
          }
          this.setState({
            AProducts: dataP
          });
        }
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div>
        <MyAlert/>
        <section className={CNs(mmhc.proSearch,mmhc.clearfix)}>
          <a className={mmhc.back} href="back"></a>
          <a className={mmhc.search} href="search">搜索商品/店铺</a>
        </section>
        <section className={mmhc.chooseBox}>
          <ol className={CNs(mmhc.proConTit,mmhc.clearfix)}>
            <li className={CNs(mmhc.sortAll,this.state.on1)} onClick={this.fnAct1}>评论</li>
            <li className={this.state.on2} onClick={this.fnAct2}>销量</li>
            <li className={CNs(mmhc.sortPrice,this.state.on3)} onClick={this.fnAct3}>价格</li>
            <li className={CNs(mmhc.showWay,this.state.bok==true?mmhc.sortRow:mmhc.BVertical)} onClick={this.fnChange}></li>
          </ol>
        </section>
        <section className={CNs(mmhc.proConBox,this.state.bok3==true?mmhc.show:mmhc.hide)}>          
          <ul className={CNs(mmhc.proCon2,this.state.bok==true?mmhc.show:mmhc.hide)}>
            {
              this.state.AProducts.map(function(ProList,index){
                return index<this.state.currPage*10 ?<ProductM key={index} data={ProList}/>:"";
              }.bind(this))
            }
          </ul>
          <ul className={CNs(mmhc.proCon,mmhc.clearfix,this.state.bok==true?mmhc.hide:mmhc.show)}>
            {
              this.state.AProducts.map(function(ProList,index){
                return index<this.state.currPage*10 ?<ProductM key={index} data={ProList}/>:"";
              }.bind(this))
            }
          </ul>
          {/*<div className={mmhc.myLoadMask}></div>
          <img className={mmhc.myLoadimg}src={myLoadPic} alt=""/>*/}
          <section className={mmhc.noPro}>
            <img  src={myNone} alt=""/>
            {/*<p>亲~再逛逛~</p>*/}
          </section>
        </section>
    </div>
    )
  },
  componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    }
  },
  componentDidMount: function() {
    var that = this;

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var urlParam = getUrlParam('brandId');
    $.ajax({
      url: jsonPath.path + "/product/brand/list.json",
      type: jsonPath.method,
      success: function(data) {
        if (data.length == 0) {
          $("." + mmhc.noPro).css("display", "block");
        } else {
          $("." + mmhc.noPro).css("display", "none");
          for (var i = 0; i < data.length; i++) {
            data[i].masterImg = imgPath + data[i].masterImg
            data[i].malMobilePrice = data[i].malMobilePrice.toFixed(2);
            if (data[i].commentsNumber && data[i].commentsGood) {
              if (data[i].commentsNumber != 0) {
                data[i].commentsGood = parseInt((data[i].commentsGood / data[i].commentsNumber) * 100);
              } else {
                data[i].commentsGood = 0;
              }
            } else {
              data[i].commentsGood = 0;
            }
            this.setState({
              AProducts: data,
              pageNum: Math.ceil(data.length)
            }, function() {
              window.onscroll = function() {
                var winTop = $(window).scrollTop();
                if (that.state.currPage * 1 < that.state.pageNum * 1) {
                  var nowHeight = that.state.heightS * 10;
                  console.log()
                  if (winTop > nowHeight * 1 - 20) {
                    that.setState({
                      currPage: that.state.currPage * 1 + 1
                    });
                  }
                }
              }
            });
          }

          /*$("." + mmhc.myLoadMask).css("display", "none");
          $("." + mmhc.myLoadimg).css("display", "none");*/
        }
      }.bind(this),
      dataType: "json",
      data: {
        "brandId": urlParam
      }
    });
  }
});
ReactDom.render(
  <BrandProList/>,
  document.getElementById("mmhContainer")
);