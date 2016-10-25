var mmhc = require("./distributor.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var ddd = require("../../../common/util/util.js").dateFormatDetailed;
var none = require("./img/none.png");

var Main = React.createClass({
  getInitialState: function() {
    return {
      SH: true,
      distributorList: [],
      sumPageNum: "",
      num: "",
      year: "",
      month: "",
      day: ""
    }
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
    var yy = $("#demo7").val();
    var mm = $("#demo8").val();
    var dd = $("#demo9").val();
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
      url: jsonPath.path + '/wx/incomedetail.json',
      type: jsonPath.method,
      data: {
        tradeName: "分销商",
        year: yy,
        month: mm,
        day: dd,
        pageNum: this.state.num
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
            distributorList: data.rst,
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
    $("#demo7").val("");
    $("#demo8").val("");
    $("#demo9").val("");
    $.ajax({
      url: jsonPath.path + '/wx/incomedetail.json',
      type: jsonPath.method,
      data: {
        tradeName: "分销商",
        pageNum: 1,
        year: "",
        month: "",
        day: ""
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
            distributorList: data.rst,
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
    var yy = $("#demo7").val();
    var mm = $("#demo8").val();
    var dd = $("#demo9").val();
    this.state.num++
      if (this.state.num >= this.state.sumPageNum) {
        this.setState({
          sumPageNum: 1
        });
      }
    $.ajax({
      url: jsonPath.path + '/wx/incomedetail.json',
      type: jsonPath.method,
      data: {
        tradeName: "分销商",
        pageNum: this.state.num,
        year: yy ? yy : "",
        month: mm ? mm : "",
        day: dd ? dd : ""
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
          Array.prototype.push.apply(this.state.distributorList, data.rst);
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
        <div className={cNs(mmhc.filtrateCon,mmhc.claerfix)} onClick={this.fnScreen}>
          <p className={mmhc.fl}>筛选</p>
          <p className={cNs(mmhc.fr,mmhc.icon)}></p>
        </div>
        <div className={mmhc.mark}></div>
        <div className={mmhc.filtrate}>
          <h3>时间筛选</h3>
          <div className={mmhc.timeCon}>
            <input className={mmhc.myY} type="text" id="demo7"/>年
            <input className={mmhc.myM} type="text" id="demo8"/>月
            <input className={mmhc.myD} type="text" id="demo9"/>日
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
              this.state.distributorList.map(function(list,index){
                  return <li key={index}>
                            <div className={cNs(mmhc.fl,mmhc.name)}>
                              <p>注册帐号：{list.userMobile}</p>
                              <p className={mmhc.jm}>分销商（加盟费：{list.tradeMoney}元）</p>
                            </div>
                            <div className={cNs(mmhc.numCon,mmhc.fr)}>
                              <p className={mmhc.rmb}>+{list.recommendProfit}</p>
                              <p className={mmhc.time}>{ddd(list.createTiem)}</p>
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
      url: jsonPath.path + '/wx/incomedetail.json',
      type: jsonPath.method,
      data: {
        tradeName: "分销商",
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
            distributorList: data.rst,
            sumPageNum: data.sumPageNum,
            num: 1
          });
        } else {
          alert(data.message);
        }
      }.bind(this)
    });

    $(function() {
      $('#demo7').dateDropper({
        format: 'Y',
        minYear: 2010,
        maxYear: 2030,
        placeholder: '',
        color: '#f8c300',
        animation: 'bounce'
      });
      $('#demo8').dateDropper({
        format: 'm',
        placeholder: '',
        color: '#f8c300',
        animation: 'bounce',
        lang: 'fr'
      });
      $('#demo9').dateDropper({
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