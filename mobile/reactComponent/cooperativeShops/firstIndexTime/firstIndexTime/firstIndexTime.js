require("../../../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./firstIndexTime.css");


var FirstIndexTime = React.createClass({
  getInitialState: function() {
    return {
      sunday: "周日,",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      dayNum: 1 //星期统计
    }
  },
  sundayFun: function() {

    if (this.state.sunday == "") {
      this.setState({
        sunday: "周日,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          sunday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  mondayFun: function() {
    if (this.state.monday == "") {
      this.setState({
        monday: "周一,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          monday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  tuesdayFun: function() {
    if (this.state.tuesday == "") {
      this.setState({
        tuesday: "周二,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          tuesday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  wednesdayFun: function() {
    if (this.state.wednesday == "") {
      this.setState({
        wednesday: "周三,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          wednesday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  thursdayFun: function() {
    if (this.state.thursday == "") {
      this.setState({
        thursday: "周四,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          thursday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  fridayFun: function() {
    if (this.state.friday == "") {
      this.setState({
        friday: "周五,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          friday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  saturdayFun: function() {
    if (this.state.saturday == "") {
      this.setState({
        saturday: "周六,",
        dayNum: this.state.dayNum + 1
      })
    } else {
      if (this.state.dayNum != 1) {
        this.setState({
          saturday: "",
          dayNum: this.state.dayNum - 1
        })
      }
    }
  },
  completeFun: function() {
    var weekAll = this.state.sunday + this.state.monday + this.state.tuesday + this.state.wednesday + this.state.thursday + this.state.friday + this.state.saturday
    weekAll = weekAll.slice(0, -1);
    var begainTimeValue = $("#appTime").val();
    var endTimeValue = $("#endTime").val();
    window.location.href = "/cooperativeShops/firstIndex.html?week=" + weekAll + "&days1Stime=" + begainTimeValue + "&days1Etime=" + endTimeValue;
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.dateTitle}>日期选择:</div>
        <div className={cNs(mmhc.dateWeek,mmhc.clearfix)}>
          <div onClick={this.sundayFun} className={cNs(mmhc.dateDay,this.state.sunday==""?"":mmhc.dateActive)}>周日</div>
          <div onClick={this.mondayFun} className={cNs(mmhc.dateDay,this.state.monday==""?"":mmhc.dateActive)}>周一</div>
          <div onClick={this.tuesdayFun} className={cNs(mmhc.dateDay,mmhc.dateDayRight,this.state.tuesday==""?"":mmhc.dateActive)}>周二</div>
          <div onClick={this.wednesdayFun} className={cNs(mmhc.dateDay,this.state.wednesday==""?"":mmhc.dateActive)}>周三</div>
          <div onClick={this.thursdayFun} className={cNs(mmhc.dateDay,this.state.thursday==""?"":mmhc.dateActive)}>周四</div>
          <div onClick={this.fridayFun} className={cNs(mmhc.dateDay,mmhc.dateDayRight,this.state.friday==""?"":mmhc.dateActive)}>周五</div>
          <div onClick={this.saturdayFun} className={cNs(mmhc.dateDay,this.state.saturday==""?"":mmhc.dateActive)}>周六</div>
        </div>
        <div className={mmhc.dateTitle}>时间选择:</div>
        <div className={cNs(mmhc.time,mmhc.clearfix)}>
          <input ref="begainTime" value="07:00" id="appTime" className={mmhc.begainTime} type="text"/>至<input ref="endTime" value="21:00" id="endTime" className={mmhc.endTime} type="text"/>
        </div>
        <div onClick={this.completeFun} className={mmhc.nextStep}>完成</div>
      </div>
    )
  },
  componentDidMount: function() {

    $(function() {
      var currYear = (new Date()).getFullYear();
      var opt = {};
      opt.date = {
        preset: 'date'
      };
      opt.datetime = {
        preset: 'datetime'
      };
      opt.time = {
        preset: 'time'
      };
      opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
      };
      var optTime = $.extend(opt['time'], opt['default']);
      $("#appTime").mobiscroll(optTime).time(optTime);
      $("#endTime").mobiscroll(optTime).time(optTime);
    });

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return "";
    };
    var week = GetQueryString("week");
    week = decodeURI(week);
    var days1Stime = GetQueryString("days1Stime");
    var days1Etime = GetQueryString("days1Etime");
    if (days1Stime) {
      $("#appTime").val(days1Stime);
    };
    if (days1Etime) {
      $("#endTime").val(days1Etime);
    };
    var weekList = week.split(",");
    alert(weekList[1])
    this.setState({
      dayNum: weekList.length
    })
    weekList.map(function(weekDay, index) {
      if (weekDay == "周日") {
        this.setState({
          sunday: "周日,"
        })
      } else if (weekDay == "周一") {
        this.setState({
          sunday: "周一,"
        })
      } else if (weekDay == "周二") {
        this.setState({
          sunday: "周二,"
        })
      } else if (weekDay == "周三") {
        this.setState({
          sunday: "周三,"
        })
      } else if (weekDay == "周四") {
        this.setState({
          sunday: "周四,"
        })
      } else if (weekDay == "周五") {
        this.setState({
          sunday: "周五,"
        })
      } else if (weekDay == "周六") {
        this.setState({
          sunday: "周六,"
        })
      }
    })
  },
});

module.exports = FirstIndexTime;