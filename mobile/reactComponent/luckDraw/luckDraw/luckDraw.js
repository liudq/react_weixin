require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./luckDraw.css");
var backImg = require("./back.png");
var bannerImg = require("./banner.png");
var img1 = require("./1.png");
var img2 = require("./2.png");
var img3 = require("./3.png");
var img4 = require("./4.png");
var img5 = require("./5.jpg");
var img5Off = require("./5_off.png");
var img6 = require("./6.png");
var img7 = require("./7.png");
var img8 = require("./8.png");
var img9 = require("./9.png");
var back2Img = require("./back2.png");
var shareImg = require("./share.png");
var share2Img = require("./share2.png");
var titleImg = require("./title.png");
var jsonPath = require("../../common/util/jsonPath.js");
var fpHomePath = require("../../common/util/path.js").fpHomePath;
var eshopHomePath = require("../../common/util/path.js").eshopHomePath;

var LuckDrawContent = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      height: 0,
      clickState: 0, //防止连点
      flopTime: 1,
      result8: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard5, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8],
      result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8],
      Winning: mmhc.card1,
      // clickSingleState: 1, //翻牌防止连点
      beginState: mmhc.card5,
      resultState: "",
      bgState: mmhc.none, //灰色透明背景
      payWayState: mmhc.none, //支付提示框
      rostrumCode: "",
      rechageState: mmhc.none,
      tishineirong: "",
      list: [],
      activeNum: 0,
      dataLength: 0,
      apkState: "",
      versionTitel: 1,
      freeNum: 0
    }
  },
  //把牌收到开始按钮下面
  shuffleFun: function() {
    var that = this;
    $("." + mmhc.cardPozation1).addClass(mmhc.shuffleCard);
    window.setTimeout(function() {
      $("." + mmhc.cardPozation2).addClass(mmhc.shuffleCard);
      window.setTimeout(function() {
        $("." + mmhc.cardPozation3).addClass(mmhc.shuffleCard);
        window.setTimeout(function() {
          $("." + mmhc.cardPozation4).addClass(mmhc.shuffleCard);
          window.setTimeout(function() {
            $("." + mmhc.cardPozation7).addClass(mmhc.shuffleCard);
            window.setTimeout(function() {
              $("." + mmhc.cardPozation9).addClass(mmhc.shuffleCard);
              window.setTimeout(function() {
                $("." + mmhc.cardPozation13).addClass(mmhc.shuffleCard);
                window.setTimeout(function() {
                  $("." + mmhc.cardPozation12).addClass(mmhc.shuffleCard);
                  window.setTimeout(function() {
                    $("." + mmhc.cardPozation11).addClass(mmhc.shuffleCard);
                    window.setTimeout(function() {
                      $("." + mmhc.cardPozation10).addClass(mmhc.shuffleCard);
                      window.setTimeout(function() {
                        $("." + mmhc.cardPozation8).addClass(mmhc.shuffleCard);
                        window.setTimeout(function() {
                          $("." + mmhc.cardPozation6).addClass(mmhc.shuffleCard);
                          window.setTimeout(function() {
                            $("." + mmhc.singleCard).addClass(mmhc.fingleFront);
                            window.setTimeout(function() {
                              that.LicensingFun(); //发牌
                            }, 200);
                          }, 200);
                        }, 200);
                      }, 200);
                    }, 200);
                  }, 200);
                }, 200);
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 200);
  },
  //发牌
  LicensingFun: function() {
    $("." + mmhc.cardPozation1).removeClass(mmhc.shuffleCard);
    window.setTimeout(function() {
      $("." + mmhc.cardPozation2).removeClass(mmhc.shuffleCard);
      window.setTimeout(function() {
        $("." + mmhc.cardPozation3).removeClass(mmhc.shuffleCard);
        window.setTimeout(function() {
          $("." + mmhc.cardPozation4).removeClass(mmhc.shuffleCard);
          window.setTimeout(function() {
            $("." + mmhc.cardPozation7).removeClass(mmhc.shuffleCard);
            window.setTimeout(function() {
              $("." + mmhc.cardPozation9).removeClass(mmhc.shuffleCard);
              window.setTimeout(function() {
                $("." + mmhc.cardPozation13).removeClass(mmhc.shuffleCard);
                window.setTimeout(function() {
                  $("." + mmhc.cardPozation12).removeClass(mmhc.shuffleCard);
                  window.setTimeout(function() {
                    $("." + mmhc.cardPozation11).removeClass(mmhc.shuffleCard);
                    window.setTimeout(function() {
                      $("." + mmhc.cardPozation10).removeClass(mmhc.shuffleCard);
                      window.setTimeout(function() {
                        $("." + mmhc.cardPozation8).removeClass(mmhc.shuffleCard);
                        window.setTimeout(function() {
                          $("." + mmhc.cardPozation6).removeClass(mmhc.shuffleCard);

                        }, 200);
                      }, 200);
                    }, 200);
                  }, 200);
                }, 200);
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 200);
  },
  //点击开始按钮
  beginFun: function() {
    var that = this;
    if (this.state.clickState == 0) { //防止连点
      this.setState({
        clickState: 1
      }, function() {
        //弹出支付方式框
        that.setState({
          bgState: mmhc.block, //灰色透明背景
          payWayState: mmhc.block //支付提示框
        });
      });
    };
  },
  integralPayFun: function() {
    var that = this;
    //点击积分支付以后获取中奖数据
    $.ajax({
      url: jsonPath.path + '/member/lottery.json',
      type: jsonPath.method,
      data: {
        lotteryType: "30积分"
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.flag == "成功") {
          //隐藏提示框
          this.setState({
            bgState: mmhc.none, //灰色透明背景
            payWayState: mmhc.none, //支付提示框
            beginState: mmhc.card5_off,
            rostrumCode: data.memberRostrum.rostrumCode
          }, function() {
            //处理中奖结果
            this.resutlFun(data.memberRostrum);
            //开始收牌动画
            this.shuffleFun();
            //5秒后可以翻牌
            window.setTimeout(function() {
              that.setState({
                flopTime: 0
              })
            }, 5000);
          });
        } else {
          if (data.msg == "积分不足") {
            this.setState({
              tishineirong: "您的积分不够，返回首页买买买。"
            }, function() {
              this.setState({
                payWayState: mmhc.none,
                bgState: mmhc.block,
                rechageState: mmhc.block
              })
            });
          } else {
            if (data.offline) {
              window.location.href = data.loginUrl;
            } else {
              alert(data.msg);
            }
          }
        };
      }.bind(this),
      dataType: "json"
    });
  },
  HuaPayFun: function() {
    var that = this;
    //点击花币支付以后获取中奖数据
    $.ajax({
      url: jsonPath.path + '/member/lottery.json',
      type: jsonPath.method,
      data: {
        lotteryType: "0.3元花币"
      },
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.flag == "成功") {
          //隐藏提示框
          this.setState({
            bgState: mmhc.none, //灰色透明背景
            payWayState: mmhc.none, //支付提示框
            beginState: mmhc.card5_off,
            rostrumCode: data.memberRostrum.rostrumCode
          }, function() {
            //处理中奖结果
            this.resutlFun(data.memberRostrum);
            //开始收牌动画
            this.shuffleFun();
            //5秒后可以翻牌
            window.setTimeout(function() {
              that.setState({
                flopTime: 0
              })
            }, 5000);
          });
        } else {
          if (data.msg == "花币不足") {
            this.setState({
              tishineirong: "您的花币不够，返回首页买买买。"
            }, function() {
              this.setState({
                payWayState: mmhc.none,
                bgState: mmhc.block,
                rechageState: mmhc.block
              })
            });
          } else {
            if (data.offline) {
              window.location.href = data.loginUrl;
            } else {
              alert(data.msg);
            }
          }
        };
      }.bind(this),
      dataType: "json"
    });
  },
  freePayFun: function() {
    var that = this;
    //点击积分支付以后获取中奖数据
    $.ajax({
      url: jsonPath.path + '/member/lottery.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      data: {
        lotteryType: "抽奖机会"
      },
      success: function(data) {
        if (data.flag != "失败") {
          //隐藏提示框
          this.setState({
            bgState: mmhc.none, //灰色透明背景
            payWayState: mmhc.none, //支付提示框
            beginState: mmhc.card5_off,
            rostrumCode: data.memberRostrum.rostrumCode,
            freeNum: that.state.freeNum - 1 //免费抽奖次数减1
          }, function() {
            //处理中奖结果
            this.resutlFun(data.memberRostrum);
            //开始收牌动画
            this.shuffleFun();
            //5秒后可以翻牌
            window.setTimeout(function() {
              that.setState({
                flopTime: 0
              })
            }, 5000);
          });
        } else {
          if (data.offline) {
            window.location.href = data.loginUrl;
          } else {
            alert(data.msg);
          }
        }
      }.bind(this),
      dataType: "json"
    });
  },
  resutlFun: function(data) {
    if (data.mark == "88元现金红包") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card1,
        result7: [mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "蜜麻花50积分") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card2,
        result7: [mmhc.ncard1, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "1张10元现金优惠券（有效期7天）") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card3,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "蜜麻花5积分") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card4,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "蜜麻花88花币") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card6,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard7, mmhc.ncard8, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "88元积金") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card7,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard8, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "谢谢参与") {
      this.setState({
        resultState: mmhc.card5_no,
        Winning: mmhc.card8,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard9, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "谢谢参与") {
      this.setState({
        resultState: mmhc.card5_no,
        Winning: mmhc.card9,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "蜜麻花888花币") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card10,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard9, mmhc.ncard11, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "888元积金") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card11,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard10, mmhc.ncard9, mmhc.ncard12, mmhc.ncard13]
      });
    } else if (data.mark == "谢谢参与") {
      this.setState({
        resultState: mmhc.card5_no,
        Winning: mmhc.card12,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard10, mmhc.ncard11, mmhc.ncard9, mmhc.ncard13]
      });
    } else if (data.mark == "5张10元现金优惠券（有效期7天）") {
      this.setState({
        resultState: mmhc.card5_nice,
        Winning: mmhc.card13,
        result7: [mmhc.ncard1, mmhc.ncard2, mmhc.ncard3, mmhc.ncard4, mmhc.ncard6, mmhc.ncard7, mmhc.ncard8, mmhc.ncard10, mmhc.ncard11, mmhc.ncard12, mmhc.ncard9]
      });
    };
  },
  //取消支付选择框
  quitFun: function() {
    this.setState({
      bgState: mmhc.none, //灰色透明背景
      payWayState: mmhc.none, //支付提示框
      clickState: 0
    });
  },
  rechageQuit: function() {
    this.setState({
      bgState: mmhc.none, //灰色透明背景
      payWayState: mmhc.none, //支付提示框
      clickState: 0,
      rechageState: mmhc.none
    });
  },
  clickFun: function() {
    var i = this.state.activeNum; //当前的activeNum
    var dataInLeth = this.state.dataLength * 1 - 1; //当前的标的最后的索引
    if (i == dataInLeth) {
      this.setState({
        activeNum: 0
      })
    } else {
      this.setState({
        activeNum: this.state.activeNum + 1
      })
    };
    var M1to2 = i;
    var M2toh = i + 1 > dataInLeth ? 0 : i + 1;
    var Mlto1 = i - 1 < 0 ? dataInLeth : i - 1;
    var Mhtol = M2toh + 1 > dataInLeth ? 0 : M2toh + 1;
    $("." + mmhc.nameList + " div:eq(" + (M1to2) + ")").removeClass(mmhc.rotateMLast).removeClass(mmhc.rotateMHidden).removeClass(mmhc.rotateM02).removeClass(mmhc.rotateM01).addClass(mmhc.rotateMLast);
    $("." + mmhc.nameList + " div:eq(" + (M2toh) + ")").removeClass(mmhc.rotateMLast).removeClass(mmhc.rotateMHidden).removeClass(mmhc.rotateM02).removeClass(mmhc.rotateM01).addClass(mmhc.rotateM01);
    $("." + mmhc.nameList + " div:eq(" + (Mlto1) + ")").removeClass(mmhc.rotateMLast).removeClass(mmhc.rotateMHidden).removeClass(mmhc.rotateM02).removeClass(mmhc.rotateM01).addClass(mmhc.rotateMHidden);
    $("." + mmhc.nameList + " div:eq(" + (Mhtol) + ")").removeClass(mmhc.rotateMLast).removeClass(mmhc.rotateMHidden).removeClass(mmhc.rotateM02).removeClass(mmhc.rotateM01).addClass(mmhc.rotateM02);
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={cNs(mmhc.title,this.state.versionTitel==1?mmhc.titel12:"")}>
          {this.state.apkState==1?<a className={mmhc.backCss} href="back"><img className={mmhc.backImg} src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>:<a className={mmhc.backCss} href="javascript:history.go(-1);"><img className={mmhc.backImg} src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>}
          抽奖
          {/*<a className={mmhc.shareBaobao} href={"sharebaobao,"+eshopHomePath+"/downLoad/luckDrawShare.html,蜜麻花抽奖,蜜麻花抽奖！"}>
            <img className={mmhc.shareCss} src={this.state.versionTitel==1?share2Img:shareImg} alt=""/>
          </a>*/}
        </div>
        <div className={mmhc.content}>
          <div className={mmhc.banner}>
            <img src={bannerImg} alt=""/>
            <div className={cNs(mmhc.list2,mmhc.clearfix)}>
              <div className={mmhc.listTitle}>中奖名单：</div>
              <div className={cNs(mmhc.nameList,mmhc.clearfix)}>
                <div style={{"height":"1rem"}} className="swiper-container">
                  <div className="swiper-wrapper">
                    {
                       this.state.list.map(function(list, index) {
                        return <div key={index} className="swiper-slide">
                                <div className={cNs(mmhc.clearfix,mmhc.rotateM01)}>
                                  <i className={mmhc.phoneList}>{list.type.slice(0,3)+"****"+list.type.slice(-4)}</i>
                                  <i className={mmhc.typeList}>{list.mark}</i>
                                </div>
                              </div>
                      }.bind(this))
                    }
                  </div>
                </div>
              </div>
            </div>
            {/*<div className={cNs(mmhc.list,mmhc.clearfix)}>
              <div className={mmhc.listTitle}>中奖名单：</div>
              <div className={cNs(mmhc.nameList,mmhc.clearfix)}>

                {
                   this.state.list.map(function(list, index) {
                    if(index==0){
                          return  <div key={index} className={cNs(mmhc.clearfix,mmhc.rotateM01)}>
                                    <i className={mmhc.phoneList}>{list.type.slice(0,3)+"****"+list.type.slice(-4)}</i>
                                    <i className={mmhc.typeList}>{list.mark}</i>
                                  </div>
                        }
                    if(index==1){
                          return  <div key={index} className={cNs(mmhc.clearfix,mmhc.rotateM02)}>
                                    <i className={mmhc.phoneList}>{list.type.slice(0,3)+"****"+list.type.slice(-4)}</i>
                                    <i className={mmhc.typeList}>{list.mark}</i>
                                  </div>
                        }
                    if(index==this.state.list.length-1){
                      return  <div key={index} className={cNs(mmhc.clearfix,mmhc.rotateMLast)}>
                                <i className={mmhc.phoneList}>{list.type.slice(0,3)+"****"+list.type.slice(-4)}</i>
                                <i className={mmhc.typeList}>{list.mark}</i>
                              </div>
                    }else{
                      return  <div key={index} className={cNs(mmhc.clearfix,mmhc.rotateMHidden)}>
                                <i className={mmhc.phoneList}>{list.type.slice(0,3)+"****"+list.type.slice(-4)}</i>
                                <i className={mmhc.typeList}>{list.mark}</i>
                              </div>
                    }
                  }.bind(this))
                }
              </div>
            </div>*/}
          </div>
          {/*<img className={mmhc.titleImg} src={titleImg} alt=""/>*/}
          <div style={{"width":this.state.width+"px","height":this.state.height+"px"}} className={mmhc.draw}>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation1)}>
              <div className={mmhc.background1}></div>
              <div className={cNs(mmhc.front,mmhc.card1)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation2)}>
              <div className={mmhc.background2}></div>
              <div className={cNs(mmhc.front,mmhc.card2)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation3)}>
              <div className={mmhc.background3}></div>
              <div className={cNs(mmhc.front,mmhc.card3)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation4)}>
              <div className={mmhc.background4}></div>
              <div className={cNs(mmhc.front,mmhc.card4)}></div>
            </div>
            <div onClick={this.beginFun} className={cNs(mmhc.singleCard5,this.state.beginState)}>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation6)}>
              <div className={mmhc.background6}></div>
              <div className={cNs(mmhc.front,mmhc.card6)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation7)}>
              <div className={mmhc.background7}></div>
              <div className={cNs(mmhc.front,mmhc.card7)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation8)}>
              <div className={mmhc.background8}></div>
              <div className={cNs(mmhc.front,mmhc.card8)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation9)}>
              <div className={mmhc.background9}></div>
              <div className={cNs(mmhc.front,mmhc.card9)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation10)}>
              <div className={mmhc.background10}></div>
              <div className={cNs(mmhc.front,mmhc.card10)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation11)}>
              <div className={mmhc.background11}></div>
              <div className={cNs(mmhc.front,mmhc.card11)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation12)}>
              <div className={mmhc.background12}></div>
              <div className={cNs(mmhc.front,mmhc.card12)}></div>
            </div>
            <div className={cNs(mmhc.singleCard,mmhc.cardPozation13)}>
              <div className={mmhc.background13}></div>
              <div className={cNs(mmhc.front,mmhc.card13)}></div>
            </div>
          </div>
        </div>
        <a href="/member/luckDrawRules.html" className={mmhc.rules}>活动规则</a>
        <div className={cNs(mmhc.bg,this.state.bgState)}></div>
        <div className={cNs(mmhc.payWay,this.state.payWayState)}>
          <div className={mmhc.payWayTitle}>请选择消费方式</div>
          <div className={cNs(mmhc.wayDiv,mmhc.clearfix)}>
            <div onClick={this.integralPayFun} className={cNs(mmhc.integral,this.state.freeNum==0?"":mmhc.integral2)}>30积分</div>
            <div onClick={this.HuaPayFun} className={cNs(mmhc.huaBi,this.state.freeNum==0?"":mmhc.huaBi2)}>0.3元花币</div>
            <div onClick={this.freePayFun} className={cNs(this.state.freeNum==0?mmhc.free:mmhc.free2)}>免费翻牌({this.state.freeNum}次)</div>
          </div>
          <div onClick={this.quitFun} className={mmhc.quit}>取消</div>
        </div>
        <div className={cNs(mmhc.rechangeAlert,this.state.rechageState)}>
          <div className={mmhc.sectionTitle}>非常抱歉</div>
          <div className={mmhc.section2}>{this.state.tishineirong}</div>
          <div className={cNs(mmhc.section3,mmhc.clearfix)}>
            {/*<a href={fpHomePath+"/investMobile?hasOwnBack=1"} className={mmhc.sec3Left}>返回首页</a>*/}
            <a href="homePage" className={mmhc.sec3Left}>返回首页</a>
            <div onClick={this.rechageQuit} className={mmhc.sec3Right}>关闭</div>
          </div>
        </div>
      </div>
    )
  },
  componentWillMount: function() {
    this.setState({
      width: document.body.clientWidth,
      height: document.body.clientWidth
    });
  },
  componentDidMount: function() {
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 1
      });
    };
    //中奖名单滚动
    // var int = self.setInterval(this.clickFun, 2000);
    var that = this;
    $("." + mmhc.singleCard).click(function() {
      if (that.state.flopTime == 0) {
        var mythis = this;
        that.setState({
          flopTime: 1
        }, function() {
          //去掉所有牌的正面内容
          $("." + mmhc.singleCard).find("." + mmhc.front).removeClass(mmhc.card1).removeClass(mmhc.card2).removeClass(mmhc.card3).removeClass(mmhc.card4)
            .removeClass(mmhc.card6).removeClass(mmhc.card7).removeClass(mmhc.card8).removeClass(mmhc.card9).removeClass(mmhc.card10).removeClass(mmhc.card11).removeClass(mmhc.card12).removeClass(mmhc.card13)
            .removeClass(mmhc.ncard1).removeClass(mmhc.ncard2).removeClass(mmhc.ncard3).removeClass(mmhc.ncard4)
            .removeClass(mmhc.ncard6).removeClass(mmhc.ncard7).removeClass(mmhc.ncard8).removeClass(mmhc.ncard9).removeClass(mmhc.ncard10).removeClass(mmhc.ncard11).removeClass(mmhc.ncard12).removeClass(mmhc.ncard13).removeAttr("data-nimei");
          //被点击的牌显示中奖结果
          $(mythis).find("." + mmhc.front).addClass(that.state.Winning).attr("data-nimei", "123");
          var i = 0;
          for (var m in that.state.result7) {
            $("." + mmhc.front + "[data-nimei!=123]:eq(" + i + ")").addClass(that.state.result7[m]);
            i++;
          };
          //将中奖的结果显示在中间的开始按钮上
          this.setState({
            beginState: this.state.resultState
          });
          $(mythis).removeClass(mmhc.fingleFront);
          window.setTimeout(function() {
            $("." + mmhc.singleCard).removeClass(mmhc.fingleFront);
          }, 500);
          that.setState({
            clickState: 0
          });
          $.ajax({
            url: jsonPath.path + '/member/rostrum.json?rostrumCode=' + this.state.rostrumCode,
            type: jsonPath.method,
            error: function() {
              alert("抽奖失败");
            },
            success: function(data) {
              if (data.flag == "成功") {
                alert(data.msg);
              } else {
                alert(data.msg);
              };
            }.bind(this),
            dataType: "json"
          });
        });
      };
    });
    //获奖名单
    $.ajax({
      url: jsonPath.path + '/award/list.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          list: data,
          dataLength: data.length
        }, function() {
          var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            direction: 'vertical',
            autoplay: 2000, //可选选项，自动滑动
            loop: true,
            speed: 1000,
          })
        })
      }.bind(this),
      dataType: "json"
    });

    //免费抽奖次数
    // $.ajax({
    //   url: jsonPath.path + '/award/freeCount.json',
    //   type: jsonPath.method,
    //   error: function() {
    //     alert("请求数据失败");
    //   },
    //   success: function(data) {
    //     this.setState({
    //       freeNum: data
    //     })
    //   }.bind(this),
    //   dataType: "json"
    // });

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var apk = GetQueryString("apk");
    this.setState({
      apkState: apk
    });
  },
});

module.exports = LuckDrawContent;