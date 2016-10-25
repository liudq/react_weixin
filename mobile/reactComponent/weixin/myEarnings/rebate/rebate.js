var mmhc = require("./rebate.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var ddd = require("../../../common/util/util.js").dateFormatDetailed;
var sub = require("../../../common/util/util.js").strSubstring;
var none = require("./img/none.png");

var Main = React.createClass({
  getInitialState: function() {
    return {
      SH: true,
      saleList: [],
      bok1: false,
      bok2: false,
      bok3: false,
      sumPageNum: "",
      payState: "",
      year: "",
      month: "",
      day: ""
    }
  },
  fnWF: function() {
    this.setState({
      bok1: !this.state.bok1,
      bok2: false,
      bok3: false
    }, function() {
      if (this.state.bok1 == true) {
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
      bok2: !this.state.bok2,
      bok1: false,
      bok3: false
    }, function() {
      if (this.state.bok2 == true) {
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
      bok3: !this.state.bok3,
      bok2: false,
      bok1: false
    }, function() {
      if (this.state.bok3 == true) {
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
  fnScreen: function() {
    $("." + mmhc.filtrate).stop().animate({
      "right": "0px"
    }, 300);
    $("." + mmhc.mark).stop().animate({
      "left": "0px"
    }, 300);
  },
  fnFinish: function() {
    var yy = $("#demo1").val();
    var mm = $("#demo2").val();
    var dd = $("#demo3").val();
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
      url: jsonPath.path + '/wx/salesrebate.json',
      type: jsonPath.method,
      data: {
        year: yy,
        month: mm,
        day: dd,
        payState: this.state.payState,
        pageNum: ""
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
        if (data.flag == true) {
          this.setState({
            saleList: data.rst,
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
      bok1: false,
      bok2: false,
      bok3: false,
      payState: ""
    });
    $.ajax({
      url: jsonPath.path + '/wx/salesrebate.json',
      type: jsonPath.method,
      data: {
        pageNum: 1,
        year: "",
        month: "",
        day: "",
        payState: ""
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
        if (data.flag == true) {
          this.setState({
            saleList: data.rst,
            sumPageNum: data.sumPageNum,
            num: this.state.num
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
      url: jsonPath.path + '/wx/salesrebate.json',
      type: jsonPath.method,
      data: {
        pageNum: this.state.num,
        year: yy ? yy : "",
        month: mm ? mm : "",
        day: dd ? dd : "",
        payState: this.state.payState
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
        if (data.flag == true) {
          Array.prototype.push.apply(this.state.saleList, data.rst);
          this.setState({
            saleList: this.state.saleList
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className={mmhc.con}>    
        <div className={cNs(mmhc.filtrateCon,mmhc.claerfix)} onClick={this.fnScreen}>
          <p className={mmhc.fl}>筛选</p>
          <p className={cNs(mmhc.fr,mmhc.icon)}></p>
        </div>
        <div className={mmhc.mark}></div>
        <div className={mmhc.filtrate}>
          <h3>状态筛选</h3>
          <ul className={mmhc.stateCon}>
            <li className={this.state.bok1==true?mmhc.on:""} onClick={this.fnWF} >未付款</li>
            <li className={this.state.bok2==true?mmhc.on:""} onClick={this.fnYF} >已支付</li>
            <li className={this.state.bok3==true?mmhc.on:""} onClick={this.fnYQ} >已确认</li>
          </ul>
          <h3>时间筛选</h3>
          <div className={mmhc.timeCon}>
            <input className={mmhc.myY} type="text" id="demo1"/>年
            <input className={mmhc.myM} type="text" id="demo2"/>月
            <input className={mmhc.myD} type="text" id="demo3"/>日
          </div>
          <div className={mmhc.claerfix}>
            <p onClick={this.fnFinish}>确定</p>
            <p onClick={this.fnBackout}>重置</p>
          </div>
        </div>
        <div className={mmhc.tiao}></div>
        <div className={this.state.SH==true?mmhc.show:mmhc.hide}>
          <ul className={mmhc.userListCon}>
            {
              this.state.saleList.map(function(list,index){
                return <li key={index}>
                          <div className={cNs(mmhc.name,mmhc.fl)}>
                            <p>注册帐号：{list.recommendType==1?list.mobile:sub(list.mobile)}</p>
                            <p className={mmhc.orderNum}>订单编号：</p>
                            <p className={mmhc.orderNum}>{list.orderId}</p>
                            <p className={mmhc.jm}>{list.orderState=="1"?"未付款":list.orderState=="5"?"已确认":list.orderState=="6"?"已取消":"已付款"}（支付金额：{list.thirdPayMoney}元）</p>
                          </div>
                          <div className={cNs(mmhc.numCon,mmhc.fr)}>
                            <p className={cNs(list.orderState=="1"?mmhc.red:list.orderState=="5"?mmhc.yellow:mmhc.green,mmhc.rmb)}>+{list.proceeds}</p>
                            <p className={mmhc.time}>{ddd(list.createTime)}</p>
                          </div>
                        </li>
              }.bind(this))
            }
          </ul>
          <p onClick={this.fnMore} className={cNs(mmhc.more,this.state.sumPageNum>1?mmhc.show:mmhc.hide)}>查看更多</p>
        </div>
        <div className={cNs(mmhc.none,this.state.SH==true?mmhc.hide:mmhc.show)}>
          <img src={none} alt=""/>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/wx/salesrebate.json',
      type: jsonPath.method,
      data: {
        pageNum: 1
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
        if (data.flag == true) {
          this.setState({
            saleList: data.rst,
            sumPageNum: data.sumPageNum,
            num: 1
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
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