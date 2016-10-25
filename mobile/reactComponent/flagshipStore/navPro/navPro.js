var React = require("react");
var ReactDom = require("react-dom");
var CNs = require("classnames");
var mmhc = require("./navPro.css");
var jsonPath = require("../../common/util/jsonPath.js");
var ban11 = require("./SNpic1.jpg");
var ban55 = require("./SNpic5.png");
var ban22 = require("./SNBpic1.jpg");
var imgPath = require("../../common/util/path.js").path;
//var myLoadPic = require("./Loading5.gif");
var imgSrc = require("./grey.gif");
var AllProList = React.createClass({
  render: function() {
    return (
      <li className={mmhc.marR}>
        <a href={"/detail.html?prdCode="+this.props.data.id}>
          <img  data-src={imgPath+this.props.data.masterImg} src={imgSrc} className={mmhc.lazyImg} alt="所有商品"/>
          <p className={mmhc.proName}>{this.props.data.name1}</p>
          <p className={mmhc.proPrice}>{this.props.data.malMobilePrice}</p>
          <p>好评{this.props.data.commentsGood+"%"}  {this.props.data.commentsNumber}人</p>
        </a>
      </li>
    )
  }
});
var Floors = React.createClass({
  render: function() {
    return (
      <li>
        {
          this.props.data.map(function(pros,index){
            return <a className={mmhc.milk1} href={pros.linkUrl} key={index}>
                      <img src={imgPath+pros.image} alt=""/>                 
                      <div className={CNs(mmhc.colorY,mmhc.opa)}></div>
                      <p className={mmhc.mask}>{pros.productName}</p>
                    </a>;
          }.bind(this))
        }
      </li>
    )
  }
});
var FloorsOnly = React.createClass({
  render: function() {
    return (
      <li>
        {
          this.props.data.map(function(pros,index){
            return <div className={mmhc.adBox3} key={index}>
                    <a href={pros.linkUrl}>
                      <img src={imgPath+pros.image} alt=""/>
                    </a>
                  </div>;
          }.bind(this))
        }
      </li>
    )
  }
});
var NavPro = React.createClass({
  getInitialState: function() {
    return {
      navs: {},
      AProducts: [],
      pageNum: 1,
      currPage: 1,
      heightS: "",
      SH1: mmhc.show,
      SH2: mmhc.hide,
      SH3: mmhc.hide,
      SH4: mmhc.hide,
      on2: mmhc.on,
      on1: "",
      on3: "",
      on4: "",
      act1: mmhc.active,
      act2: "",
      act3: "",
      act4: "",
      bok: true,
      bok2: true,
      bok3: true,
      short: "desc",
      shortP: "desc",
      floors: [],
      banners: []
    }
  },
  fnShow1: function() {
    this.setState({
      SH1: mmhc.hide,
      SH2: mmhc.show,
      SH3: mmhc.hide,
      SH4: mmhc.hide,
      on1: mmhc.on,
      on2: "",
      on3: "",
      on4: "",
      heightS: $("." + mmhc.proCon2).find("li").css("height")
    }, function() {
      $.ajax({
        url: jsonPath.path + '/product/seller/list.json?sellerId=' + this.state.sellerId,
        type: "get",
        success: function(dataA) {
          for (var i = 0; i < dataA.result.length; i++) {
            dataA.result[i].malMobilePrice = dataA.result[i].malMobilePrice.toFixed(2)
            if (dataA.result[i].commentsNumber && dataA.result[i].commentsGood) {
              if (dataA.result[i].commentsNumber != 0) {
                dataA.result[i].commentsGood = parseInt((dataA.result[i].commentsGood / dataA.result[i].commentsNumber) * 100);
              } else {
                dataA.result[i].commentsGood = 0;
              }
            } else {
              dataA.result[i].commentsGood = 0;
            }
          }
          this.setState({
            AProducts: dataA.result
          });
          //$("." + mmhc.myLoadMask).css("display", "none");
          //$("." + mmhc.myLoadimg).css("display", "none");
        }.bind(this)
      });
    });
  },
  fnShow2: function() {
    this.setState({
      SH1: mmhc.show,
      SH2: mmhc.hide,
      SH3: mmhc.hide,
      SH4: mmhc.hide,
      on2: mmhc.on,
      on1: "",
      on3: "",
      on4: ""
    })
    $.ajax({
      url: jsonPath.path + '/store/recommendProducts.json?sellerId=' + this.state.sellerId,
      type: "get",
      success: function(data) {
        for (var i = 0; i < data.result.length; i++) {
          data.result[i].malMobilePrice = data.result[i].malMobilePrice.toFixed(2)
          if (data.result[i].commentsNumber && data.result[i].commentsGood) {
            if (data.result[i].commentsNumber != 0) {
              data.result[i].commentsGood = parseInt((data.result[i].commentsGood / data.result[i].commentsNumber) * 100);
            } else {
              data.result[i].commentsGood = 0;
            }
          } else {
            data.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: data.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this),
      dataType: "json"
    });
  },
  fnShow3: function() {
    this.setState({
      SH1: mmhc.hide,
      SH2: mmhc.hide,
      SH3: mmhc.show,
      SH4: mmhc.hide,
      on3: mmhc.on,
      on1: "",
      on2: "",
      on4: ""
    })
    $.ajax({
      url: jsonPath.path + '/store/newProducts.json?sellerId=' + this.state.sellerId,
      type: "get",
      success: function(dataS) {
        for (var i = 0; i < dataS.result.length; i++) {
          dataS.result[i].malMobilePrice = dataS.result[i].malMobilePrice.toFixed(2)
          if (dataS.result[i].commentsNumber && dataS.result[i].commentsGood) {
            if (dataS.result[i].commentsNumber != 0) {
              dataS.result[i].commentsGood = parseInt((dataS.result[i].commentsGood / dataS.result[i].commentsNumber) * 100);
            } else {
              dataS.result[i].commentsGood = 0;
            }
          } else {
            dataS.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: dataS.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this)
    });
  },
  fnShow4: function() {
    this.setState({
      SH1: mmhc.hide,
      SH2: mmhc.hide,
      SH3: mmhc.show,
      SH4: mmhc.hide,
      on4: mmhc.on,
      on1: "",
      on3: "",
      on2: ""
    })
    $.ajax({
      url: jsonPath.path + "/store/recommendProducts.json?sellerId=" + this.state.sellerId,
      type: "get",
      success: function(dataS) {
        for (var i = 0; i < dataS.result.length; i++) {
          dataS.result[i].malMobilePrice = dataS.result[i].malMobilePrice.toFixed(2)
          if (dataS.result[i].commentsNumber && dataS.result[i].commentsGood) {
            if (dataS.result[i].commentsNumber != 0) {
              dataS.result[i].commentsGood = parseInt((dataS.result[i].commentsGood / dataS.result[i].commentsNumber) * 100);
            } else {
              dataS.result[i].commentsGood = 0;
            }
          } else {
            dataS.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: dataS.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this)
    })
  },
  fnAct1: function() {
    this.setState({
      act1: mmhc.active,
      act2: "",
      act3: "",
      act4: ""
    });
    $.ajax({
      url: jsonPath.path + '/product/seller/list.json?sellerId=' + this.state.sellerId,
      type: "get",
      success: function(dataA) {
        for (var i = 0; i < dataA.result.length; i++) {
          dataA.result[i].malMobilePrice = dataA.result[i].malMobilePrice.toFixed(2)
          if (dataA.result[i].commentsNumber && dataA.result[i].commentsGood) {
            if (dataA.result[i].commentsNumber != 0) {
              dataA.result[i].commentsGood = parseInt((dataA.result[i].commentsGood / dataA.result[i].commentsNumber) * 100);
            } else {
              dataA.result[i].commentsGood = 0;
            }
          } else {
            dataA.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: dataA.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this)
    })
  },
  fnAct2: function() {
    this.setState({
      act2: mmhc.active,
      act1: "",
      act3: "",
      act4: "",
      bok2: !this.state.bok2
    })
    if (this.state.bok2 == false) {
      this.setState({
        short: "asc"
      })
    } else {
      this.setState({
        short: "desc"
      })
    }
    $.ajax({
      url: jsonPath.path + "/product/seller/list.json",
      type: "get",
      data: {
        sellerId: this.state.sellerId,
        orderSellCount: "comments_number",
        commentsNumber: this.state.short
      },
      success: function(dataS) {
        for (var i = 0; i < dataS.result.length; i++) {
          dataS.result[i].malMobilePrice = dataS.result[i].malMobilePrice.toFixed(2)
          if (dataS.result[i].commentsNumber && dataS.result[i].commentsGood) {
            if (dataS.result[i].commentsNumber != 0) {
              dataS.result[i].commentsGood = parseInt((dataS.result[i].commentsGood / dataS.result[i].commentsNumber) * 100);
            } else {
              dataS.result[i].commentsGood = 0;
            }
          } else {
            dataS.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: dataS.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this)
    })
  },
  fnAct3: function() {
    this.setState({
      act3: mmhc.active,
      act2: "",
      act1: "",
      act4: "",
      bok3: !this.state.bok3
    })
    if (this.state.bok3 == true) {
      this.setState({
        shortP: "desc"
      })
    } else {
      this.setState({
        shortP: "asc"
      })
    }
    $.ajax({
      url: jsonPath.path + "/product/seller/list.json",
      type: "get",
      data: {
        sellerId: this.state.sellerId,
        orderPrice: "mall_pc_price",
        commentsNumber: this.state.shortP
      },
      success: function(dataP) {
        for (var i = 0; i < dataP.result.length; i++) {
          dataP.result[i].malMobilePrice = dataP.result[i].malMobilePrice.toFixed(2)
          if (dataP.result[i].commentsNumber && dataP.result[i].commentsGood) {
            if (dataP.result[i].commentsNumber != 0) {
              dataP.result[i].commentsGood = parseInt((dataP.result[i].commentsGood / dataP.result[i].commentsNumber) * 100);
            } else {
              dataP.result[i].commentsGood = 0;
            }
          } else {
            dataP.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: dataP.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this)
    })

  },
  fnAct4: function() {
    this.setState({
      act4: mmhc.active,
      act2: "",
      act1: "",
      act3: ""
    });
    $.ajax({
      url: jsonPath.path + '/store/newProducts.json?sellerId=' + this.state.sellerId,
      type: "get",
      success: function(dataS) {
        for (var i = 0; i < dataS.result.length; i++) {
          dataS.result[i].malMobilePrice = dataS.result[i].malMobilePrice.toFixed(2)
          if (dataS.result[i].commentsNumber && dataS.result[i].commentsGood) {
            if (dataS.result[i].commentsNumber != 0) {
              dataS.result[i].commentsGood = parseInt((dataS.result[i].commentsGood / dataS.result[i].commentsNumber) * 100);
            } else {
              dataS.result[i].commentsGood = 0;
            }
          } else {
            dataS.result[i].commentsGood = 0;
          }
        }
        this.setState({
          AProducts: dataS.result
        });
        //$("." + mmhc.myLoadMask).css("display", "none");
        //$("." + mmhc.myLoadimg).css("display", "none");
      }.bind(this)
    });
  },
  fnChange: function() {
    this.setState({
      bok: !this.state.bok
    })
  },
  render: function() {
    return (
      <div>
        <section className={mmhc.main}>
          <nav className={mmhc.MyNav}>
            <ul className={CNs(mmhc.MyNavList,mmhc.clearfix)}>
              <li className={mmhc.home}>
                <a className={this.state.on2} href="javascript:;" onClick={this.fnShow2}>首页</a>
              </li>
              <li className={mmhc.all}>
                <a className={this.state.on1} href="javascript:;" onClick={this.fnShow1}>全部</a>
              </li>
              <li className={mmhc.new}>
                <a className={this.state.on3} href="javascript:;" onClick={this.fnShow3}>上新</a>
              </li>
              <li className={mmhc.hotLists}>
                <a className={this.state.on4} href="javascript:;" onClick={this.fnShow4}>推荐</a>
              </li>
            </ul>
          </nav>
          <section className={CNs(mmhc.HomeCon,this.state.SH1)}>
            {/*<div className={CNs("swiper-container",mmhc.banBox)}>
              <ul className={CNs("swiper-wrapper",mmhc.adBox1,mmhc.clearfix)}>
                {
                  this.state.banners.map(function(bans,index){
                    return <li className={"swiper-slide"} key={index}>
                            <a className={mmhc.HomebigBan} href={bans.linkUrl}>
                              <img className={mmhc.bannerPic} src={imgPath+bans.image} alt="活动1"/>
                            </a>
                          </li>
                  }.bind(this))
                }
              </ul>
              <div className={"swiper-pagination"}></div>
            </div>*/}

            <section className={mmhc.adBox2}>
              <ul className={CNs(mmhc.HomeSBan,mmhc.clearfix)}>
                {
                  this.state.floors.map(function(floor,index){
                  return floor.datas.length>1?<Floors key={index} data={floor.datas}/>:"";
                  }.bind(this))
                }
              </ul>
              <ul>
                {
                  this.state.floors.map(function(floor,index){
                    return floor.datas.length==1?<FloorsOnly key={index} data={floor.datas}/>:""
                  }.bind(this))
                }
              </ul>
            </section>
            <section className={mmhc.recommend}>
              <h5>为你推荐</h5>
              <ul className={CNs(mmhc.proCon,mmhc.forYou,mmhc.clearfix)}>
              {
                this.state.AProducts.map(function(ProList,index){
                  return <AllProList key={index} data={ProList}/>;
                }.bind(this))
              }
              </ul>
            </section>
            <section className={mmhc.lookAll} >
              <a href="javascript:;" onClick={this.fnShow1}>查看所有宝贝</a>
            </section>            
          </section>

          <section className={CNs(mmhc.allProBox,this.state.SH2)}>
            <ol className={CNs(mmhc.proConTit,mmhc.clearfix)}>
              <li className={CNs(mmhc.sortAll,this.state.act1)} onClick={this.fnAct1}>综合</li>
              <li className={this.state.act2} onClick={this.fnAct2}>销量</li>
              <li className={this.state.act4} onClick={this.fnAct4}>上新</li>
              <li className={CNs(mmhc.sortPrice,this.state.act3)} onClick={this.fnAct3}>价格</li>
              <li className={CNs(mmhc.showWay,this.state.bok==true?mmhc.sortRow:mmhc.BVertical)} onClick={this.fnChange}></li>
            </ol>
            <ul className={CNs(mmhc.proCon,mmhc.clearfix,this.state.bok==true?mmhc.hide:mmhc.show)}>
            {
              this.state.AProducts.map(function(ProList,index){
                return <AllProList key={index} data={ProList}/>;
              }.bind(this))
            }
            </ul>
            <ul className={CNs(mmhc.proCon2,this.state.bok==true?mmhc.show:mmhc.hide)}>
              {
                this.state.AProducts.map(function(ProList,index){
                  return <AllProList key={index} data={ProList}/>;
                }.bind(this))
              }
            </ul>
    {
      /*<div className={mmhc.myLoadMask}></div>
                  <img className={mmhc.myLoadimg}src={myLoadPic} alt=""/>*/
    }
          </section>
          <section className={CNs(mmhc.proNew1m,this.state.SH3)}>
            <ul className={CNs(mmhc.proCon,mmhc.clearfix)}>
              {
                this.state.AProducts.map(function(ProList,index){
                  return <AllProList num={index} key={index} data={ProList}/>;
                }.bind(this))
              }
            </ul>
            {/*<div className={mmhc.myLoadMask}></div>
            <img className={mmhc.myLoadimg}src={myLoadPic} alt=""/>*/}
          </section>
        </section>
      </div>
    )
  },
  /*componentWillMount: function() {
    window.onload = window.onresize = function() {
      document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.0625 + 'px';
    };
  },*/
  componentDidMount: function() {
    $(function() {
      var windowHeight = window.screen.availHeight;
      $("." + mmhc.lazyImg).each(function(index, el) {
        var thisHeight = $(this).offset().top;
        if (thisHeight * 1 < windowHeight * 1) {
          //可以显示的图片
          $(this).attr("src", $(this).attr("data-src"));
        }
      });
      $(window).on('scroll', function() {
        window.requestAnimationFrame(function() {
          var windowHeight = window.screen.availHeight;
          var winTop = $(window).scrollTop();
          var newHeight = winTop * 1 + windowHeight * 1;
          $("." + mmhc.lazyImg).each(function(index, el) {
            var thisHeight = $(this).offset().top;
            if (thisHeight * 1 < newHeight * 1) {
              $(this).attr("src", $(this).attr("data-src"));
            }
          });
        });
      });
    });
    var that = this;

    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var urlParam1 = getUrlParam('sellerId');
    var urlParam2 = getUrlParam('sellerCateId');
    if (urlParam2) {
      $.ajax({
        url: jsonPath.path + "/store/products.json",
        type: jsonPath.method,
        success: function(data) {
          for (var i = 0; i < data.length; i++) {
            data[i].malMobilePrice = data[i].malMobilePrice.toFixed(2)
          }
          this.setState({
            AProducts: data,
            SH1: mmhc.hide,
            SH2: mmhc.show,
            on2: "",
            on1: mmhc.on
          });
          //$("." + mmhc.myLoadMask).css("display", "none");
          //$("." + mmhc.myLoadimg).css("display", "none");
        }.bind(this),
        dataType: "json"
      });
    } else if (urlParam1) {
      this.setState({
        sellerId: urlParam1
      }, function() {
        $.ajax({
          url: jsonPath.path + "/store/recommendProducts.json?sellerId=" + this.state.sellerId,
          type: "get",
          success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
              data.result[i].malMobilePrice = data.result[i].malMobilePrice.toFixed(2)
              if (data.result[i].commentsNumber && data.result[i].commentsGood) {
                if (data.result[i].commentsNumber != 0) {
                  data.result[i].commentsGood = parseInt((data.result[i].commentsGood / data.result[i].commentsNumber) * 100);
                } else {
                  data.result[i].commentsGood = 0;
                }
              } else {
                data.result[i].commentsGood = 0;
              }
            }
            this.setState({
              AProducts: data.result
            });
            //$("." + mmhc.myLoadMask).css("display", "none");
            //$("." + mmhc.myLoadimg).css("display", "none");
          }.bind(this),
          dataType: "json"
        });
        $.ajax({
          url: jsonPath.path + '/store/sellerId.json?sellerId=' + this.state.sellerId,
          type: "get",
          success: function(datar) {
            this.setState({
              floors: datar.floors,
              banners: datar.banners
            });
          }.bind(this),
          dataType: "json"
        });
      });
    }
  }
});
module.exports = NavPro;