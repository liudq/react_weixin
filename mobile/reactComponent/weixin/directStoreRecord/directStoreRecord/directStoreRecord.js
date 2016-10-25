require("../../../common/util/init.css");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./directStoreRecord.css");
var eshopHomePath = require("../../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../../common/util/jsonPath.js");
var dateFormatDetailed = require("../../../common/util/util.js").dateFormatDetailed;
var DirectStoreRecord = React.createClass({
  getInitialState: function() {
    return {
      list: [],
      show: 0,
      pageNum: 1,
      listNo: 0,
      beginTime: "",
      endTime: "",
      show1: 0, //是否显示已经显示全部数据
      showContent: 0 //是否是店员
    }
  },
  pageNumFun: function() {
    this.setState({
      pageNum: this.state.pageNum + 1
    }, function() {
      $.ajax({
        url: jsonPath.path + '/weixinSigningFee/authc/findO2oPayListH5.json',
        type: jsonPath.method,
        error: function() {
          alert("请求数据失败");
        },
        data: {
          "sumPageELEM": this.state.pageNum,
          "startTime": this.state.beginTime,
          "endTime": this.state.endTime
        },
        success: function(data) {
          if (data.flag) {
            var allList = [];
            allList = this.state.list.concat(data.list);
            if (data.sumPageNum == this.state.pageNum * 1) {
              this.setState({
                show: 0,
                show1: 1
              })
            } else {
              this.setState({
                show: 1,
                show1: 0
              })
            };
            this.setState({
              list: allList
            })
          } else {
            alert(data.msg)
          }
        }.bind(this),
        dataType: "json"
      });
    }.bind(this))
  },
  inquiryFun: function() {
    this.setState({
      beginTime: $("#appDate").val(),
      endTime: $("#appDateEnd").val()
    }, function() {
      if ($("#appDate").val() == "") {
        alert("请输入开始时间!");
        return false;
      };
      if ($("#appDateEnd").val() == "") {
        alert("请输入结束时间!");
        return false;
      };
      if ($("#appDate").val() > $("#appDateEnd").val()) {
        alert("结束时间应该大于开始时间");
        return false;
      }
      $.ajax({
        url: jsonPath.path + '/weixinSigningFee/authc/findO2oPayListH5.json',
        type: jsonPath.method,
        error: function() {
          alert("请求数据失败");
        },
        data: {
          "sumPageELEM": "",
          "startTime": this.state.beginTime,
          "endTime": this.state.endTime
        },
        success: function(data) {
          if (data.flag) {
            this.setState({
              pageNum: 1
            }, function() {
              if (data.sumPageNum == this.state.pageNum * 1) {
                this.setState({
                  show: 0,
                  show1: 1 //是否已展示全部数据
                })
              } else {
                this.setState({
                  show: 1,
                  show1: 0
                })
              };
            });

            this.setState({
              list: data.list
            }, function() {
              if (this.state.list.length == 0) {
                this.setState({
                  listNo: 1, //数据是否为空
                  show: 0, //点击加载更多
                  show1: 0 //已展示全部数据
                })
              } else {
                this.setState({
                  listNo: 0
                })
              }
            }.bind(this))
          } else {
            alert(data.msg)
          }
        }.bind(this),
        dataType: "json"
      });
    }.bind(this))
  },
  render: function() {
    return (
      <div className={mmhc.pay}>
        <div style={{"display":this.state.showContent==1?"block":"none"}}>
          <div className="demo">
            <div className={mmhc.section1}>时间：<input name="appDate" id="appDate" type="text"/>-<input name="appDateEnd" id="appDateEnd" type="text"/><span onClick={this.inquiryFun} className={mmhc.inquiry}>查询</span></div>
          </div>
          <div id="datePlugin"></div>
          <div style={{"display":this.state.listNo==1?"none":"block"}} className={mmhc.section2}>

            {
               this.state.list.map(function(list, index) {
                return  <div key={index} className={mmhc.single}>
                          <div className={cNs(mmhc.sig1,mmhc.clearfix)}>
                            <div className={mmhc.phone}>电话号码：{list.payMobile}</div>
                            <div className={mmhc.jine}>支付金额：{list.orderMoney}</div>
                          </div>
                          <div className={mmhc.sig2}>
                            订单号：{list.serialNumber}
                          </div>
                          <div className={mmhc.time}>
                            日期：{dateFormatDetailed(list.orderDate)}
                          </div>
                        </div>
              }.bind(this))
            }
          </div>
        </div>
         
        <div style={{"display":this.state.listNo==1?"block":"none"}} className={mmhc.noData}>暂无数据</div>
        <div onClick={this.pageNumFun} style={{"display":this.state.show==1?"block":"none"}} className={mmhc.more}>点击加载更多</div>
        <div style={{"display":this.state.show1==1?"block":"none"}} className={mmhc.more}>已展示全部数据</div>
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

      $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
      $("#appDateEnd").mobiscroll($.extend(opt['date'], opt['default']));
      // var optDateTime = $.extend(opt['datetime'], opt['default']);
      // var optTime = $.extend(opt['time'], opt['default']);
      // $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
      // $("#appTime").mobiscroll(optTime).time(optTime);
    });

    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/findO2oPayListH5.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      data: {
        "sumPageELEM": this.state.pageNum
      },
      success: function(data) {
        if (data.flag) {
          var allList = [];
          allList = this.state.list.concat(data.list);
          if (data.sumPageNum == this.state.pageNum * 1) {
            this.setState({
              show: 0, //点击加载更多
              show1: 1
            })
          } else {
            this.setState({
              show: 1,
              show1: 0
            })
          };
          this.setState({
            list: allList,
            showContent: 1
          }, function() {
            if (this.state.list.length == 0) {
              this.setState({
                listNo: 1, //数据是否为空
                show: 0,
                show1: 0 //已展示全部数据
              })
            } else {
              this.setState({
                listNo: 0
              })
            }
          }.bind(this))
        } else {
          this.setState({
            showContent: 0
          }, function() {
            alert(data.msg)
          })

        }
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = DirectStoreRecord;