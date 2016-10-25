var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var ddd = require("../../../common/util/util.js").dateFormatDetailed;

var none = require("./img/none1.png");
var newLoadingS = require("./img/newLoading.gif");

var Main = React.createClass({
  getInitialState: function() {
    return {
      SH: true,
      bok: true,
      bok2: false,
      bok3: false,
      bok4: false,
      distributorList: [],
      sumPageNum: "",
      num: "",
      tradeName:"全部",
      moneyState1:"",
      moneyState2:"",
      moneyState3:"",
      payState: "",
      pageNum: "",
      timerhd:false,
      allYestWeek:"全部"
    }
  },
  fnWF: function() {
    this.setState({
      moneyState1: !this.state.moneyState1,
      moneyState2: false,
      moneyState3: false
    }, function() {
      if (this.state.moneyState1 == true) {
        this.setState({
          payState: "未付款"
        });
      } else {
        this.setState({
          payState: ""
        })
      }
    });
  },
  fnYF: function() {
    this.setState({
      moneyState2: !this.state.moneyState2,
      moneyState1: false,
      moneyState3: false
    }, function() {
      console.log(this.state.moneyState2)
      if (this.state.moneyState2 == true) {
        this.setState({
          payState: "已支付"
        });
      } else {
        this.setState({
          payState: ""
        })
      }
    });
  },
  fnYQ: function() {
    this.setState({
      moneyState3: !this.state.moneyState3,
      moneyState2: false,
      moneyState1: false
    }, function() {
      if (this.state.moneyState3 == true) {
        this.setState({
          payState: "已确认"
        });
      } else {
        this.setState({
          payState: ""
        })
      }
    });
  },
  fnD: function() {
    $("."+mmhc.loadingA).css("display","block")
    $("."+mmhc.loadingB).css("display","block")
    var yy = $("#demo1").val();
    var mm = $("#demo2").val();
    var dd = $("#demo3").val();
    yy=yy==""?"":yy+"年"
    mm=mm==""?"":mm+"月"
    dd=dd==""?"":dd+"日"
    this.setState({
      num: 1,
      bok: true,
      bok2: false,
      bok3: false,
      bok4: false,
      timerhd:false,
      allYestWeek:"全部"
    },function(){
      $("."+mmhc.huixian).html(this.state.allYestWeek+yy+mm+dd+this.state.payState)
    });



    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        date: "全部",
        pageNum: this.state.pageNum,
        orderState: this.state.payState,
        year: yy,
        month: mm,
        day: dd
      },
      dataType: 'json',
      success: function(data) {
        $("."+mmhc.loadingA).css("display","none")
        $("."+mmhc.loadingB).css("display","none")
        if (data.data.length==0) {
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
            tradeName:"全部",
            distributorList: data.data,
            sumPageNum: data.sumPageNum
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  fnRU: function() {
    $("."+mmhc.loadingA).css("display","block")
    $("."+mmhc.loadingB).css("display","block")
    this.setState({
      num: 1,
      bok: false,
      bok2: true,
      bok3: false,
      bok4: false,
      timerhd:true,
      allYestWeek:"昨日"
    },function(){
      $("."+mmhc.huixian).html(this.state.allYestWeek+this.state.payState)
    });

    // var yy = $("#demo1").val();
    // var mm = $("#demo2").val();
    // var dd = $("#demo3").val();
    // yy=yy==""?"":yy+"年"
    // mm=mm==""?"":mm+"月"
    // dd=dd==""?"":dd+"日"
    // $("#demo1").val("")
    // $("#demo2").val("")
    // $("#demo3").val("")


    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        date: "昨日",
        pageNum: this.state.pageNum,
        orderState: this.state.payState
        // year: yy,
        // month: mm,
        // day: dd
      },
      dataType: 'json',
      success: function(data) {
        $("."+mmhc.loadingA).css("display","none")
        $("."+mmhc.loadingB).css("display","none")
        if (data.data.length==0) {
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
            tradeName: "昨日",
            distributorList: data.data,
            sumPageNum: data.sumPageNum
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  fnA: function() {
        $("."+mmhc.loadingA).css("display","block")
    $("."+mmhc.loadingB).css("display","block")
    this.setState({
      num: 1,
      bok: false,
      bok2: false,
      bok3: true,
      bok4: false,
      timerhd:true,
      allYestWeek:"本周"
    },function(){
      $("."+mmhc.huixian).html(this.state.allYestWeek+this.state.payState)
    });
    // var yy = $("#demo1").val();
    // var mm = $("#demo2").val();
    // var dd = $("#demo3").val();
    // yy=yy==""?"":yy+"年"
    // mm=mm==""?"":mm+"月"
    // dd=dd==""?"":dd+"日"
    // $("#demo1").val("")
    // $("#demo2").val("")
    // $("#demo3").val("")


    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        date: "本周",
        pageNum: this.state.pageNum,
        orderState: this.state.payState
        // year: yy,
        // month: mm,
        // day: dd
      },
      dataType: 'json',
      success: function(data) {
        $("."+mmhc.loadingA).css("display","none")
        $("."+mmhc.loadingB).css("display","none")
        if (data.data.length==0) {
          this.setState({
            SH: false
          });
        } else {
          this.setState({
            SH: true
          });
        }
        // console.log(this.state.SH)
        if (data.rst == true) {
          this.setState({
            tradeName: "本周",
            distributorList: data.data,
            sumPageNum: data.sumPageNum
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  fnR: function() {
        $("."+mmhc.loadingA).css("display","block")
    $("."+mmhc.loadingB).css("display","block")
    this.setState({
      num: 1,
      bok: false,
      bok2: false,
      bok3: false,
      bok4: true,
      timerhd:true,
      allYestWeek:"本月"
    },function(){
      $("."+mmhc.huixian).html(this.state.allYestWeek+this.state.payState)
    });
    // var yy = $("#demo1").val();
    // var mm = $("#demo2").val();
    // var dd = $("#demo3").val();
    // yy=yy==""?"":yy+"年"
    // mm=mm==""?"":mm+"月"
    // dd=dd==""?"":dd+"日"


    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        date: "本月",
        pageNum: this.state.pageNum,
        orderState: this.state.payState
        // year: yy,
        // month: mm,
        // day: dd
      },
      dataType: 'json',
      success: function(data) {
        $("."+mmhc.loadingA).css("display","none")
        $("."+mmhc.loadingB).css("display","none")
        if (data.data.length==0) {
          this.setState({
            SH: false
          });
        } else {
          this.setState({
            SH: true
          });
        }
        // console.log(this.state.SH)
        if (data.rst == true) {
          this.setState({
            tradeName: "本月",
            distributorList: data.data,
            sumPageNum: data.sumPageNum
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  fnScreen: function() {
    $("#demo1").val("")
    $("#demo2").val("")
    $("#demo3").val("")
    this.setState({
      num: 1
    });
    $("." + mmhc.filtrate).stop().animate({
      "right": "0px"
    }, 300);
    $("." + mmhc.mark).stop().animate({
      "left": "0px"
    }, 300);

  },
  fnFinish: function() {
    this.setState({
          num: 1
        });
    var yy = $("#demo1").val();
    var mm = $("#demo2").val();
    var dd = $("#demo3").val();
    yy=yy==""?"":yy+"年"
    mm=mm==""?"":mm+"月"
    dd=dd==""?"":dd+"日"
    $("."+mmhc.huixian).html(this.state.allYestWeek+yy+mm+dd+this.state.payState)
    if (yy == "") {
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
      if (mm == "" && dd != "") {
        alert("请问是哪月呢？");
        return false;
      }
    }
    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        pageNum: this.state.pageNum,
        orderState: this.state.payState,
        date: this.state.tradeName,
        year: yy,
        month: mm,
        day: dd
      },
      dataType: 'json',
      success: function(data) {
        if (data.data.length==0) {
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
            distributorList: data.data,
            sumPageNum: data.sumPageNum
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
    this.setState({
          num: 1,
          moneyState1:"",
          moneyState2:"",
          moneyState3:"",
          payState:""
        });
    $("#demo1").val("");
    $("#demo2").val("");
    $("#demo3").val("");
    $("."+mmhc.huixian).html("")
    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        orderState: this.state.payState,
        date: this.state.tradeName,
        pageNum: 1,
        year: "",
        month: "",
        day: ""
      },
      dataType: 'json',
      success: function(data) {
        if (data.data.length==0) {
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
            distributorList: data.data,
            sumPageNum: data.sumPageNum,
            num: this.state.num
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
    // $("." + mmhc.filtrate).stop().animate({
    //   "right": "-48%"
    // }, 300);
    // $("." + mmhc.mark).stop().animate({
    //   "left": "-100%"
    // }, 300);
  },
  fnMore: function() {
    this.state.num++
      if (this.state.num >= this.state.sumPageNum) {
        this.setState({
          sumPageNum: 1
        });
      }
    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        date: this.state.tradeName,
        pageNum: this.state.num,
        orderState: this.state.payState,
        year: "",
        month: "",
        day: ""
      },
      dataType: 'json',
      success: function(data) {
        if (data.data.length==0) {
          this.setState({
            SH: false
          });
        } else {
          this.setState({
            SH: true
          });
        }
        if (data.rst == true) {
          Array.prototype.push.apply(this.state.distributorList, data.data);
          this.setState({
            distributorList: this.state.distributorList
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        <ul className={cNs(mmhc.titCon,mmhc.clearfix)}>
          <li onClick={this.fnD}>全部<b className={this.state.bok==true?mmhc.on:""}></b></li>
          <li onClick={this.fnRU}>昨日<b className={this.state.bok2==true?mmhc.on:""}></b></li>
          <li onClick={this.fnA}>本周<b className={this.state.bok3==true?mmhc.on:""}></b></li>
          <li onClick={this.fnR}>本月<b className={this.state.bok4==true?mmhc.on:""}></b></li>
        </ul>

        <div>
          <div className={cNs(mmhc.filtrateCon,mmhc.clearfix)} onClick={this.fnScreen}>
            <p className={mmhc.fl}>筛选</p>
            <p className={cNs(mmhc.fl,mmhc.huixian)}></p>
            <p className={cNs(mmhc.fr,mmhc.icon)}></p>
          </div>
          <div className={mmhc.mark}></div>
          <div className={mmhc.filtrate}>
            <h3>订单状态筛选</h3>
            <ul className={mmhc.stateCon}>
              <li className={this.state.moneyState1==true?mmhc.on1:""} onClick={this.fnWF} >未付款</li>
              <li className={this.state.moneyState2==true?mmhc.on1:""} onClick={this.fnYF} >已支付</li>
              <li className={this.state.moneyState3==true?mmhc.on1:""} onClick={this.fnYQ} >已确认</li>
            </ul>
            <div className={cNs(mmhc.timesh,this.state.timerhd==false?mmhc.show:mmhc.hide)}>
              <h3>时间筛选</h3>
              <div className={mmhc.timeCon}>
                <input className={mmhc.myY} type="text" id="demo1"/>年
                <input className={mmhc.myM} type="text" id="demo2"/>月
                <input className={mmhc.myD} type="text" id="demo3"/>日
              </div>
            </div>

            <p onClick={this.fnFinish}>完成</p>
            <p onClick={this.fnBackout}>重置</p>
          </div>
        </div>


        <div className={mmhc.tiao}></div>
        <div className={this.state.SH==true?mmhc.show:mmhc.hide}>
          <ul className={mmhc.userListCon}>
          {
            // this.state.distributorList.map(function(elem,index){
            //   return  <li key={index} className={mmhc.clearfix}>
            //             <div className={cNs(mmhc.fl,mmhc.nambera)}>
            //               <p>手机号：139****5478</p>
            //               <p className={mmhc.ordera}>订单个数：10个</p>
            //             </div>
            //             <div className={cNs(mmhc.fr,mmhc.nambera)}>
            //               <p className={mmhc.timer}>{ddd(elem.createTiem)}</p>
            //               <p>总金额：1000.23元</p>
            //             </div>
            //           </li>
            // }.bind(this))
          }
          {
            this.state.distributorList.map(function(elem,index){
              return  <li key={index} className={mmhc.clearfix}>
                        <div className={cNs(mmhc.fl,mmhc.nambera)}>
                          <p>手机号：{elem.businessJoinDto.mobile}</p>
                          <p className={mmhc.ordera}>订单个数：{elem.orderCount}个</p>
                        </div>
                        <div className={cNs(mmhc.fr,mmhc.nambera)}>
                          <div className={mmhc.namberafr}>
                            <p className={mmhc.timer}>{ddd(elem.businessJoinDto.createTime)}</p>
                            <p>总金额：{elem.totalAmt}元</p>
                          </div>
                        </div>
                      </li>
            }.bind(this))
          }
          </ul>
          <p onClick={this.fnMore} className={cNs(mmhc.more,this.state.sumPageNum>1?mmhc.show:mmhc.hide)}>查看更多</p>
        </div>

        <div className={cNs(mmhc.none,this.state.SH==true?mmhc.hide:mmhc.show)}>
          <img src={none} alt=""/>
          <a href="http://mp.weixin.qq.com/s?__biz=MzI3ODE0NjU0Mg==&mid=2699506658&idx=3&sn=514485838248209d34a6dfd98d50cac0#wechat_redirect">如何购买及推广？</a>
        </div>

        <div className={mmhc.loadingA}></div>
        <div className={mmhc.loadingB}><img className={mmhc.loadingBTu} src={newLoadingS} alt=""/></div>



      </div>
    )
  },
  componentDidMount: function() {
    function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r !== null) {
        return unescape(r[2]);
      }
      return null;
    }
    var tab = getQueryString("tradeName");
    // if (tab) {
    //   if (tab == "fenxiao") {
    //     this.setState({
    //       bok: true,
    //       bok2: false,
    //       bok3: false,
    //       bok4: false
    //     });
    //   }
    //   if (tab == "jingxiao") {
    //     this.setState({
    //       bok: false,
    //       bok2: true,
    //       bok3: false,
    //       bok4: false
    //     });
    //   }
    //   if (tab == "daili") {
    //     this.setState({
    //       bok: false,
    //       bok2: false,
    //       bok3: true,
    //       bok4: false
    //     });
    //   }
    // } else {
    //   this.setState({
    //     bok: true,
    //     bok2: false,
    //     bok3: false,
    //     bok4: false
    //   });
    // }

    // // 数据
    $.ajax({
      // url: jsonPath.path + '/promotcount.json',
      url: jsonPath.path + '/weixinSigningFee/authc/promotcount.json',
      type: jsonPath.method,
      data: {
        date: this.state.tradeName,
        pageNum: 1
      },
      dataType: 'json',
      success: function(data) {
        $("."+mmhc.loadingA).css("display","none")
        $("."+mmhc.loadingB).css("display","none")

        if (data.data.length==0) {
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
            pageNum:1,
            distributorList: data.data,
            sumPageNum: data.sumPageNum,
            num: 1
          });
        } else {
          alert(data.message);
        }
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
