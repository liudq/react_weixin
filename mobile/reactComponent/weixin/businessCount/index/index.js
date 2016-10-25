var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var ddd = require("../../../common/util/util.js").dateFormatDetailed;

var none = require("./img/none.png");
var shadowImg = require("./img/newLoading.gif");

var Main = React.createClass({
  getInitialState: function() {
    return {
      saleList: [],
      businessType: "分销商",
      SH: true,
      bok: true,
      bok2: false,
      bok3: false,
      flag1: false,
      flag2: false,
      flag3: false,
      bok11: false,
      bok22: false,
      bok33: false,
      num: 1,
      sumPageNum: "",
      orderState: "",
      date: "",
      year: "",
      month: "",
      day: ""
    }
  },
  /*筛选的*/
  fnWF: function() {
    this.setState({
      flag1: !this.state.flag1,
      flag2: false,
      flag3: false
    }, function() {
      if (this.state.flag1 == true) {
        this.setState({
          orderState: "未付款"
        });
      } else {
        this.setState({
          orderState: ""
        })
      }
    });
  },
  fnWF1: function() {
    this.setState({
      bok11: !this.state.bok11,
      bok22: false,
      bok33: false
    }, function() {
      if (this.state.bok11 == true) {
        $("input").attr('disabled', true)
        $("input").val('')
        this.setState({
          date: "昨日"
        });
      } else {
        $("input").attr('disabled', false)
        this.setState({
          date: ""
        })
      }
    });
  },
  fnYF: function() {
    this.setState({
      flag2: !this.state.flag2,
      flag1: false,
      flag3: false
    }, function() {
      if (this.state.flag2 == true) {
        this.setState({
          orderState: "已支付"
        });
      } else {
        this.setState({
          orderState: ""
        })
      }
    });
  },
  fnYF1: function() {
    this.setState({
      bok22: !this.state.bok22,
      bok11: false,
      bok33: false
    }, function() {
      if (this.state.bok22 == true) {
        $("input").attr('disabled', true)
        $("input").val('')
        this.setState({
          date: "本周"
        });
      } else {
        $("input").attr('disabled', false)
        this.setState({
          date: ""
        })
      }
    });
  },
  fnYQ: function() {
    this.setState({
      flag3: !this.state.flag3,
      flag2: false,
      flag1: false
    }, function() {
      if (this.state.flag3 == true) {
        this.setState({
          orderState: "已确认"
        });
      } else {
        this.setState({
          orderState: ""
        })
      }
    });
  },
  fnYQ1: function() {
    this.setState({
      bok33: !this.state.bok33,
      bok22: false,
      bok11: false
    }, function() {
      if (this.state.bok33 == true) {
        $("input").attr('disabled', true);
        $("input").val('');
        this.setState({
          date: "本月"
        });
      } else {
        $("input").attr('disabled', false);
        this.setState({
          date: ""
        })
      }
    });
  },
  fnScreen: function() {
    $("." + mmhc.filtrate).stop().animate({
      "right": "0px"
    }, 300);
    $("." + mmhc.mark).stop().animate({
      "left": "0px"
    }, 300);
  },
  fnFinish: function() {
    $('.' + mmhc.choseState).html(this.state.orderState);
    var yy = $("#demo1").val();
    var mm = $("#demo2").val();
    var dd = $("#demo3").val();
    this.setState({
      year: yy,
      month: mm,
      day: dd
    });
    if (yy == "") {

      if (mm == "" && dd == "") {
        /*时间筛选的回显(没有选择日期)*/
        $('.' + mmhc.choseTime).html(this.state.date);
      }
      if (mm != "") {
        alert("请问是哪年呢？");
        return false;
      } else {
        if (dd != "") {
          alert("请问是哪年哪月呢？");
          return false;
        }
      }
    } else {
      /*时间的回显*/
      if (mm == "" && dd == "") {
        $('.' + mmhc.choseTime).html(yy);
      } else if (mm != "" && dd == "") {
        $('.' + mmhc.choseTime).html(yy + '.' + mm);
      } else {
        $('.' + mmhc.choseTime).html(yy + '.' + mm + '.' + dd);
      }
      /*判断筛选不符合*/
      if (mm == "" && dd != "") {
        alert("请问是哪月呢？");
        return false;
      }
    }

    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/businesscount.json',
      type: jsonPath.method,
      data: {
        year: yy,
        month: mm,
        day: dd,
        orderState: this.state.orderState,
        pageNum: 1,
        /*加+++*/
        businessType: this.state.businessType,
        date: this.state.date
      },
      dataType: 'json',
      success: function(data) {
        if (data.data == "") {
          this.setState({
            SH: false
          });
        } else {
          this.setState({
            SH: true
          });
        }
        if (data.rst == true) {
          if (this.state.businessType == "分销商") {
            data.data.map(function(list, index) {
              list.jianjieOrderCount = 0;
              list.jianjieTotalAmt = 0;
              list.jianjieUserCount = 0;
            })
          }
          this.setState({
            saleList: data.data,
            sumPageNum: data.sumPageNum,
            num: 1
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
    $("." + mmhc.filtrate).stop().animate({
      "right": "-48%"
    }, 300);
    $("." + mmhc.mark).stop().animate({
      "left": "-100%"
    }, 300);
  },
  fnBackout: function() {
    $("#demo1").val("");
    $("#demo2").val("");
    $("#demo3").val("");
    this.setState({
      flag1: false,
      flag2: false,
      flag3: false,
      bok11: false,
      bok22: false,
      bok33: false,
      orderState: "",
      date: ''
    });
    $("input").attr('disabled', false)

  },
  fnMore: function() {
    var yy = $("#demo1").val();
    var mm = $("#demo2").val();
    var dd = $("#demo3").val();
    this.state.num++
      if (this.state.num >= this.state.sumPageNum) {
        this.setState({
          sumPageNum: 1
        });
      }
    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/businesscount.json',
      type: jsonPath.method,
      data: {
        pageNum: this.state.num,
        year: yy ? yy : "",
        month: mm ? mm : "",
        day: dd ? dd : "",
        orderState: this.state.orderState,
        /*加+++*/
        businessType: this.state.businessType,
        date: this.state.date
      },
      dataType: 'json',
      success: function(data) {
        if (data.rst == "") {
          this.setState({
            SH: false
          });
        } else {
          this.setState({
            SH: true
          });
        }
        if (data.rst == true) {
          if (this.state.businessType == "分销商") {
            data.data.map(function(list, index) {
              list.jianjieOrderCount = 0;
              list.jianjieTotalAmt = 0;
              list.jianjieUserCount = 0;
            })
          }
          Array.prototype.push.apply(this.state.saleList, data.data);
          this.setState({
            saleList: this.state.saleList
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  // /*筛选完*/
  fnD: function() {
    $("." + mmhc.shadow1).css({
      "display": "block"
    });
    $("." + mmhc.shadow).css({
      "display": "block"
    });
    this.setState({
      num: 1,
      bok: true,
      bok2: false,
      bok3: false,
      businessType: "分销商"
    }, function() {
      $.ajax({
        url: jsonPath.path + '/weixinSigningFee/authc/businesscount.json',
        type: jsonPath.method,
        data: {
          businessType: this.state.businessType,
          pageNum: 1,
          year: this.state.year,
          month: this.state.month,
          day: this.state.day,
          date: this.state.date
        },
        dataType: 'json',
        success: function(data) {
          $("." + mmhc.shadow1).css({
            "display": "none"
          });
          $("." + mmhc.shadow).css({
            "display": "none"
          });
          if (data.data == "") {
            this.setState({
              SH: false
            });
          } else {
            this.setState({
              SH: true
            });
          }
          if (data.rst == true) {
            if (this.state.businessType == "分销商") {
              data.data.map(function(list, index) {
                list.jianjieOrderCount = 0;
                list.jianjieTotalAmt = 0;
                list.jianjieUserCount = 0;
              })
            }

            this.setState({
              saleList: data.data,
              sumPageNum: data.sumPageNum,
              num: 1
            });
          } else {
            alert(data.message);
          }
        }.bind(this)
      });

    });
  },
  fnRU: function() {
    $("." + mmhc.shadow1).css({
      "display": "block"
    });
    $("." + mmhc.shadow).css({
      "display": "block"
    });
    this.setState({
      num: 1,
      bok: false,
      bok2: true,
      bok3: false,
      businessType: "经销商"
    }, function() {

      $.ajax({
        url: jsonPath.path + '/weixinSigningFee/authc/businesscount.json',
        type: jsonPath.method,
        data: {
          businessType: this.state.businessType,
          pageNum: 1,
          year: this.state.year,
          month: this.state.month,
          day: this.state.day,
          date: this.state.date
        },
        dataType: 'json',
        success: function(data) {
          $("." + mmhc.shadow1).css({
            "display": "none"
          });
          $("." + mmhc.shadow).css({
            "display": "none"
          });
          if (data.data == "") {
            this.setState({
              SH: false
            });
          } else {
            this.setState({
              SH: true
            });
          }
          if (data.rst == true) {
            this.setState({
              saleList: data.data,
              sumPageNum: data.sumPageNum,
              num: 1
            });
          } else {
            alert(data.message);
          }
        }.bind(this)
      });
    });
  },
  fnA: function() {
    $("." + mmhc.shadow1).css({
      "display": "block"
    });
    $("." + mmhc.shadow).css({
      "display": "block"
    });
    this.setState({
      num: 1,
      bok: false,
      bok2: false,
      bok3: true,
      businessType: "代理商"
    }, function() {
      $.ajax({
        url: jsonPath.path + '/weixinSigningFee/authc/businesscount.json',
        // url: jsonPath.path + '/businesscount.json',
        type: jsonPath.method,
        data: {
          businessType: this.state.businessType,
          pageNum: 1,
          year: this.state.year,
          month: this.state.month,
          day: this.state.day,
          date: this.state.date
        },
        dataType: 'json',
        success: function(data) {
          $("." + mmhc.shadow1).css({
            "display": "none"
          });
          $("." + mmhc.shadow).css({
            "display": "none"
          });
          if (data.data == "") {
            this.setState({
              SH: false
            });
          } else {
            this.setState({
              SH: true
            });
          }
          if (data.rst == true) {
            this.setState({
              saleList: data.data,
              sumPageNum: data.sumPageNum,
              num: 1
            });
          } else {
            alert(data.message);
          }
        }.bind(this)
      });
    });
  },

  render: function() {
    return (
      <div>

        <ul className={cNs(mmhc.titCon,mmhc.clearfix)}>
          <li onClick={this.fnD}>分销商<b className={this.state.bok==true?mmhc.on:""}></b></li>
          <li onClick={this.fnRU}>经销商<b className={this.state.bok2==true?mmhc.on:""}></b></li>
          <li onClick={this.fnA}>代理商<b className={this.state.bok3==true?mmhc.on:""}></b></li>
        </ul>

        <div className={cNs(mmhc.filtrateCon,mmhc.claerfix)} onClick={this.fnScreen}>
          <p className={mmhc.fl}>筛选<span className={mmhc.choseTime}></span><span className={mmhc.choseState}></span></p>
          <p className={cNs(mmhc.fr,mmhc.icon)}></p>
        </div>
        <div className={mmhc.mark}></div>
        <div className={mmhc.filtrate}>
          <h3>订单状态筛选</h3>
          <ul className={mmhc.stateCon}>
            <li className={this.state.flag1==true?mmhc.on:""} onClick={this.fnWF} >未付款</li>
            <li className={this.state.flag2==true?mmhc.on:""} onClick={this.fnYF} >已支付</li>
            <li className={this.state.flag3==true?mmhc.on:""} onClick={this.fnYQ} >已确认</li>
          </ul>
          <h3>时间筛选</h3>
          <div className={mmhc.timeCon}>
            <input className={mmhc.myY} type="text" id="demo1"/>年
            <input className={mmhc.myM} type="text" id="demo2"/>月
            <input className={mmhc.myD} type="text" id="demo3"/>日
            <ul className={mmhc.timeCon1}>
              <li className={this.state.bok11==true?mmhc.on:""} onClick={this.fnWF1} >昨日</li>
              <li className={this.state.bok22==true?mmhc.on:""} onClick={this.fnYF1} >本周</li>
              <li className={this.state.bok33==true?mmhc.on:""} onClick={this.fnYQ1} >本月</li>
            </ul>
          </div>
          <div className={mmhc.claerfix}>
            <p onClick={this.fnFinish}>确定</p>
            <p onClick={this.fnBackout}>重置</p>
          </div>
        </div>
        <div className={cNs(mmhc.tiao)}></div>

        <div className={mmhc.con}>
          <div className={this.state.SH==true?mmhc.show:mmhc.hide}>
            <ul className={mmhc.userListCon}>
              {
                this.state.saleList.map(function(list,index){
                  return <li key={index}>
                            <div className={cNs(mmhc.dtitle,mmhc.clearfix)}>
                              <p className={cNs(mmhc.fl,mmhc.phone)}>
                                手机号: <span>{list.businessJoinDto.mobile}</span>
                              </p>
                              <p className={cNs(mmhc.fr,mmhc.dTime)}>{ddd(list.businessJoinDto.createTime)}</p>
                            </div>
                            <div className={cNs(mmhc.clearfix,mmhc.dCon)}>
                              <div className={cNs(mmhc.first,mmhc.fl)}>
                                <h2>直接推广</h2>
                                <p>人数: <span>{list.userCount}</span></p>
                                <p>订单个数: <span>{list.orderCount}</span></p>
                                <p>总金额: <span>{list.totalAmt}</span>元</p>
                              </div>
                              <div className={cNs(mmhc.second,mmhc.fr)}>
                               <h2>间接推广</h2>
                               <p>人数: <span>{list.jianjieUserCount}</span></p>
                               <p>订单个数: <span>{list.jianjieOrderCount}</span></p>
                               <p>总金额: <span>{list.jianjieTotalAmt}</span>元</p>
                              </div>
                            </div>
                          </li>
                }.bind(this))
              }
            </ul>
            <p onClick={this.fnMore} className={cNs(mmhc.more,this.state.sumPageNum>1?mmhc.show:mmhc.hide)}>查看更多</p>
          </div>
        </div>

        <div className={cNs(mmhc.none,this.state.SH==true?mmhc.hide:mmhc.show)}>
          <img src={none} alt=""/>
          <a href="http://mp.weixin.qq.com/s?__biz=MzI3ODE0NjU0Mg==&mid=2699506658&idx=3&sn=514485838248209d34a6dfd98d50cac0#wechat_redirect" className={mmhc.tuiguang}>如何购买及推广?</a>
        </div>

        <div className={mmhc.shadow}></div>
        <div className={mmhc.shadow1}>
          <img src={shadowImg} className={mmhc.loading}/>
        </div>


      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/businesscount.json',
      // url: jsonPath.path + '/businesscount.json',
      type: jsonPath.method,
      data: {
        businessType: this.state.businessType,
        pageNum: 1
      },
      dataType: 'json',
      success: function(data) {
        $("." + mmhc.shadow1).css({
          "display": "none"
        });
        $("." + mmhc.shadow).css({
          "display": "none"
        });
        if (data.data == "") {
          this.setState({
            SH: false
          });
        } else {
          this.setState({
            SH: true
          });
        }
        if (data.rst == true) {
          if (this.state.businessType == "分销商") {
            data.data.map(function(list, index) {
              list.jianjieOrderCount = 0;
              list.jianjieTotalAmt = 0;
              list.jianjieUserCount = 0;
            })
          }
          this.setState({
            saleList: data.data,
            sumPageNum: data.sumPageNum,
            num: 1
          });
        } else {
          alert(data.message);
        }
      }.bind(this),
      error: function() {
        alert("数据加载失败");
        $("." + mmhc.shadow1).css({
          "display": "none"
        });
        $("." + mmhc.shadow).css({
          "display": "none"
        });
      }.bind(this)
    });

    $("." + mmhc.titCon).children().each(function() {
      $(this).click(function() {
        $("." + mmhc.titCon).find("b").removeClass(mmhc.on)
        $(this).find("b").addClass(mmhc.on);
      })
    });

    $(function() {
      $('#demo1').dateDropper({
        format: 'Y',
        minYear: 2010,
        maxYear: 2030,
        placeholder: '',
        color: '#f8c300',
        animation: 'bounce'
      });
      $('#demo2').dateDropper({
        format: 'm',
        placeholder: '',
        color: '#f8c300',
        animation: 'bounce',
        lang: 'fr'
      });
      $('#demo3').dateDropper({
        format: 'd',
        color: '#f8c300',
        animation: 'dropdown',
        placeholder: '',
        animation: 'bounce'
      });
    })
  }
});

module.exports = Main;