var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./earingMoneyChange.css");
var centerImg = require("./center.png");

var EaringMoneyChange = React.createClass({
  getInitialState: function() {
    return {
      integralCashRate: "", //1积分兑换多少RMB 
      integralBalRate: "", //1积分兑换多少花币 
      minInegral: "", //最低积分提现参数
      jiFenValue: "", //输入的兑换积分
      changeValue: "", //输入的积分兑换后值
      typeState: "花币", //兑换类型
      totleJiFen: "", //当前积分
      shengYuJiFen: "", //剩余积分
      proportion: ""
    }
  },
  jiFenValueFun: function(event) {
    this.setState({
      jiFenValue: event.target.value
    })
  },
  changeValueFun: function(event) {
    this.setState({
      changeValue: event.target.value
    })
  },
  jiFenValueBlur: function() {
    var reg = new RegExp("^[0-9]*$");
    if (!reg.test(this.state.jiFenValue)) {
      alert("请输入正整数!");
      return false;
    };
    if (this.state.jiFenValue > this.state.totleJiFen) {
      this.setState({
        jiFenValue: this.state.totleJiFen
      }, function() {
        this.setState({
          jiFenValue: Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion,
          changeValue: Math.floor(this.state.jiFenValue * this.state.proportion),
          shengYuJiFen: this.state.totleJiFen - Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion
        })
      })
    } else {
      if (this.state.jiFenValue != "") {
        this.setState({
          jiFenValue: Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion,
          changeValue: Math.floor(this.state.jiFenValue * this.state.proportion),
          shengYuJiFen: this.state.totleJiFen - Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion
        })
      } else {
        this.setState({
          jiFenValue: 0,
          changeValue: 0,
          shengYuJiFen: this.state.totleJiFen
        })
      }
    }
  },
  changeValueBlur: function() {
    var reg = new RegExp("^[0-9]*$");
    if (!reg.test(this.state.changeValue)) {
      alert("请输入正整数!");
      return false;
    };
    if (this.state.changeValue > this.state.totleJiFen * this.state.proportion) {
      this.setState({
        jiFenValue: this.state.totleJiFen
      }, function() {
        this.setState({
          jiFenValue: Math.floor(this.state.changeValue / 1) / this.state.proportion,
          changeValue: Math.floor(this.state.changeValue / 1),
          shengYuJiFen: this.state.totleJiFen - Math.floor(this.state.changeValue / 1) / this.state.proportion
        })
      }.bind(this))
    } else {
      if (this.state.changeValue != "") {
        this.setState({
          jiFenValue: Math.floor(this.state.changeValue / 1) / this.state.proportion,
          changeValue: Math.floor(this.state.changeValue / 1),
          shengYuJiFen: this.state.totleJiFen - Math.floor(this.state.changeValue / 1) / this.state.proportion
        })
      } else {
        this.setState({
          jiFenValue: 0,
          changeValue: 0,
          shengYuJiFen: this.state.totleJiFen
        })
      }
    }
  },
  typeHua: function() {
    this.setState({
      typeState: "花币",
      proportion: this.state.integralBalRate
    }, function() {
      if (this.state.jiFenValue != "") {
        this.setState({
          jiFenValue: Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion,
          changeValue: Math.floor(this.state.jiFenValue * this.state.proportion),
          shengYuJiFen: this.state.totleJiFen - Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion
        })
      }
    }.bind(this))
  },
  typeTiXian: function() {
    this.setState({
      typeState: "提现",
      proportion: this.state.integralCashRate
    }, function() {
      if (this.state.jiFenValue != "") {
        this.setState({
          jiFenValue: Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion,
          changeValue: Math.floor(this.state.jiFenValue * this.state.proportion),
          shengYuJiFen: this.state.totleJiFen - Math.floor(this.state.jiFenValue * this.state.proportion) / this.state.proportion
        })
      }
    })
  },
  buttonFun: function() {
    if (this.state.jiFenValue == "") {
      alert("请输入兑换金额");
      return false;
    };
    if (this.state.jiFenValue < this.state.minInegral) {
      alert("最低积分提现" + this.state.minInegral);
      return false;
    };
    var that = this;
    confirm("将转出" + this.state.jiFenValue + "积分", function() {
      $.ajax({
        url: jsonPath.path + '/member/jifenToCash.json',
        type: jsonPath.method,
        data: {
          type: that.state.typeState,
          integral: that.state.jiFenValue
        },
        error: function() {
          alert("请求数据失败");
        },
        success: function(data) {
          if (data.rst == "SUCCESS") {
            if (that.state.typeState == "花币") {
              alert("使用花币购物不再享受返利", function() {
                window.location.href = "/finish";
              })
            } else {
              window.location.href = "/finish";
            };

          } else {
            alert(data.rst)
          }
        }.bind(this),
        dataType: "json"
      });
    })

  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={cNs(mmhc.section1,mmhc.clearfix)}>
          <div className={mmhc.sec1Left}>当前积分</div>
          <div className={mmhc.sec1Right}>{this.state.totleJiFen}积分</div>
        </div>
        <div className={cNs(mmhc.section2,mmhc.clearfix)}>
          <div className={mmhc.sec2Left}>
            转出为：
          </div>
          <div onClick={this.typeHua} className={cNs(mmhc.sec2Type,this.state.typeState=="花币"?mmhc.sec2TypeAct:"")}>花币</div>
          <div onClick={this.typeTiXian} className={cNs(mmhc.sec2Type,this.state.typeState=="提现"?mmhc.sec2TypeAct:"")}>可提现</div>
        </div>
        <div className={cNs(mmhc.section3,mmhc.clearfix)}>
          <div className={mmhc.sec2Left}>
            转出金额：
          </div>
          <input value={this.state.jiFenValue} onBlur={this.jiFenValueBlur} onChange={this.jiFenValueFun} className={mmhc.input} type="text"/>
          <div className={mmhc.sec2Center}>积分<img src={centerImg} alt=""/></div>
          <input value={this.state.changeValue} onBlur={this.changeValueBlur} onChange={this.changeValueFun} className={mmhc.input} type="text"/>
          <div className={mmhc.typeRight}>{this.state.typeState=="花币"?"花币":"可提现"}</div>
        </div>
        <div className={mmhc.section4}>
          注：{1/this.state.integralBalRate}积分=1花币 {1/this.state.integralCashRate}积分=1可提现（元）；花币可提现必须为整数
        </div>
        <div className={mmhc.section5}>
          <div onClick={this.buttonFun} className={mmhc.button}>确认转出</div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/member/integralToConfig.json',
      type: jsonPath.method,
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          integralCashRate: 1 / data.integralCashRate, //1积分兑换多少RMB 
          integralBalRate: 1 / data.integralBalRate, //1积分兑换多少花币 
          minInegral: data.minInegral, //最低积分提现参数
          proportion: 1 / data.integralBalRate,
          totleJiFen: data.usr.integral
        })
      }.bind(this),
      dataType: "json"
    });
  },
});

module.exports = EaringMoneyChange;