var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var cityJson = require("./province.city.js").cityJson;
var jsonPath = require("../../common/util/jsonPath.js");

var loadingImg = require("./Loading5.gif");

var Main = React.createClass({
  getInitialState: function() {
    return {
      realNameFlag: false,
      bankFlag: false,
      cashDisplay: true,
      cityList: [],
      cashCards: [],
      bankBranchValue: "",
      balance: 0,
      cashBtnFalg: true,
      loadingMaskFlag: false
    }
  },
  certificationHandler: function() {
    var that = this;
    var realName = ReactDom.findDOMNode(this.refs.realName).value;
    var idCode = ReactDom.findDOMNode(this.refs.idCode).value;
    if ("" == realName || null == realName) {
      alert("请输入真实姓名");
      return false;
    } else if ("" == idCode || null == idCode) {
      alert("请输入身份证号");
      return false;
    } else {
      that.setState({
        loadingMaskFlag: true
      });
      $.ajax({
        url: jsonPath.path + '/member/certification.json',
        type: jsonPath.method,
        dataType: 'json',
        data: {
          "realName": realName,
          "idCardNo": idCode
        },
        success: function(data) {
          that.setState({
            loadingMaskFlag: false
          });
          if (data.flag == "fail") {
            alert(data.msg);
          } else if (data.flag == "success") {
            alert("实名认证成功", function() {
              window.location.reload();
            });
          }
        }
      });
    }
  },
  bindBankCardHandler: function() {
    var that = this;
    var reg = /^[1-9]\d*$/;
    var province = ReactDom.findDOMNode(this.refs.province).value;
    var city = ReactDom.findDOMNode(this.refs.city).value;
    var bankCode = ReactDom.findDOMNode(this.refs.bankCode).value;
    var bankName = ReactDom.findDOMNode(this.refs.bankName).value;
    var bankCardCode = ReactDom.findDOMNode(this.refs.bankCardCode).value;
    if (province == "-1" || null == province) {
      alert("请选择省份");
      return false;
    } else if ("-1" == city || null == city) {
      alert("请选择城市");
      return false;
    } else if ("-1" == bankCode || null == bankCode) {
      alert("请选择银行");
      return false;
    } else if ("" == bankName || null == bankName) {
      alert("请输入支行名称");
      return false;
    } else if ("" == bankCardCode || null == bankCardCode) {
      alert("请输入银行卡号");
      return false;
    } else if (!reg.test(bankCardCode)) {
      alert("银行卡号只能为数字");
      return false;
    } else {
      that.setState({
        loadingMaskFlag: true
      });
      $.ajax({
        url: jsonPath.path + '/member/bindCard.json',
        type: jsonPath.method,
        dataType: 'json',
        data: {
          "province": province,
          "city": city,
          "bankCode": bankCode,
          "brandBankName": bankName,
          "bankCardNum": bankCardCode
        },
        success: function(data) {
          that.setState({
            loadingMaskFlag: false
          });
          if (data.flag == "success") {
            alert("绑定银行卡成功", function() {
              window.location.reload();
            });
          } else {
            alert(data.msg);
          }
        }
      });
    }
  },
  provinceChangeHandler: function() {
    var province = ReactDom.findDOMNode(this.refs.province).value;
    cityJson.map(function(pACM, index) {
      if (pACM.province != province) {
        return false;
      } else {
        this.setState({
          cityList: pACM.citys
        });
      }
    }.bind(this));
  },
  cashHandler: function() {
    var that = this;
    var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|[1-9]\d*$/;
    var cashCard = ReactDom.findDOMNode(this.refs.cashCard).value;
    var amount = ReactDom.findDOMNode(this.refs.amount).value;
    var bankBranch = ReactDom.findDOMNode(this.refs.bankBranch).value;
    var balance = this.state.balance;
    if (cashCard == "-1" || null == cashCard) {
      alert("请选择银行卡");
      return false;
    } else if ("" == amount || null == amount) {
      alert("请输入提现金额");
      return false;
    } else if (!reg.test(amount)) {
      alert("提现金额输入错误");
      return false;
    } else if (amount > balance) {
      alert("余额不足");
      return false;
    } else {
      var flag = that.state.cashBtnFalg;
      if (flag) {
        that.setState({
          cashBtnFalg: false,
          loadingMaskFlag: true
        });
        $.ajax({
          url: jsonPath.path + '/member/dowithdrawapply.json',
          type: jsonPath.method,
          dataType: 'json',
          data: {
            bank: bankBranch,
            bankCode: cashCard,
            money: amount
          },
          success: function(data) {
            that.setState({
              loadingMaskFlag: false
            });
            if (data.success == "true" || data.success == true) {
              alert("提现成功", function() {
                window.location.reload();
              });
            } else {
              alert(data.message);
              that.setState({
                cashBtnFalg: true
              });
            }
          }
        });
      }
    }
  },
  cashCardChangeHandler: function() {
    var bankBranchName = "";
    var cashCard = ReactDom.findDOMNode(this.refs.cashCard).value;
    this.state.cashCards.map(function(cashCardM, index) {
      if (cashCardM.bankCardNo == cashCard) {
        bankBranchName = cashCardM.bankBranch;
      }
    });
    this.setState({
      bankBranchValue: bankBranchName
    });
  },
  render: function() {
    return (
      <div className={mmhc.rightMain000}>
        <div className={mmhc.rightMain}>
          <form action="" className={cNs(mmhc.cerMain,this.state.realNameFlag==true?"":mmhc.show)}>
            <p className={mmhc.myp}>请先实名认证</p>
            <div className={mmhc.mydiv}>
              <label htmlFor="realName"> 真实姓名：</label>
              <input ref="realName" id="realName" type="text"/>
            </div>
            <div className={mmhc.mydiv}>
              <label htmlFor="idCode">身份证号：</label>
              <input ref="idCode" id="idCode" type="text"/>
            </div>
            <a className={mmhc.certification} onClick={this.certificationHandler} href="javascript:void(0)">实名认证</a>
          </form>

          <form action="" className={cNs(mmhc.bindBankCard,this.state.bankFlag==false&&this.state.realNameFlag==true?mmhc.show:"")}>
            <p className={mmhc.myp}>请先绑定银行卡</p>

            <div className={mmhc.mydiv}>
              <label htmlFor="province">　省　份：</label>
              <select ref="province" name="" id="province" onChange={this.provinceChangeHandler}>
                <option value="-1">请选择</option>
                {
                  cityJson.map(function(provinceM,index){
                    return <option key={index} value={provinceM.province}>{provinceM.province}</option>
                  })
                }
              </select>
            </div>

            <div className={mmhc.mydiv}>
              <label htmlFor="city">　城　市：</label>
              <select ref="city" name="" id="city">
                <option value="-1">请选择</option>
                {
                  this.state.cityList.map(function(cityM,index){
                    return <option key={index} value={cityM}>{cityM}</option>
                  })
                }
              </select>
            </div>

            <div className={mmhc.mydiv}>
              <label htmlFor="bankCode">选择银行：</label>
              <select ref="bankCode" name="" id="bankCode">
                <option value="-1">请选择</option>
                <option value="0">汇付宝账户</option>
                <option value="1">工商银行</option>
                <option value="2">建设银行</option>
                <option value="3">农业银行</option>
                <option value="4">邮政储蓄银行</option>
                <option value="5">中国银行</option>
                <option value="6">交通银行</option>
                <option value="7">招商银行</option>
                <option value="8">光大银行</option>
                <option value="9">浦发银行</option>
                <option value="10">华夏银行</option>
                <option value="11">广东发展银行</option>
                <option value="12">中信银行</option>
                <option value="13">兴业银行</option>
                <option value="14">民生银行</option>
                <option value="15">杭州银行</option>
                <option value="16">上海银行</option>
                <option value="17">宁波银行</option>
                <option value="18">平安银行</option>
              </select>
            </div>

            <div className={mmhc.mydiv}>
              <label htmlFor="bankName">支行名称：</label>
              <input ref="bankName" id="bankName" type="text"/>
            </div>

            <div className={mmhc.mydiv}>
              <label htmlFor="bankCardCode">银行卡号：</label>
              <input ref="bankCardCode" id="bankCardCode" type="text"/>
            </div>
            <a className={mmhc.bindBankCardBtn} onClick={this.bindBankCardHandler} href="#">绑定</a>
          </form>

          <form action="" className={cNs(mmhc.cerMain,this.state.bankFlag==true&&this.state.realNameFlag==true?mmhc.show:"")}>
            <p className={mmhc.mydiv} style={{letterSpacing:"1px"}}>可提现金额：{this.state.balance} 元</p>
            <div className={mmhc.mydiv}>
              <label htmlFor="cashCard">选择银行卡：</label>
              <select ref="cashCard" style={{width:"150px"}} name="" id="cashCard" onChange={this.cashCardChangeHandler}>
                <option value="-1">请选择</option>
                {
                  this.state.cashCards.map(function(cashCardM,index){
                    return <option key={index} value={cashCardM.bankCardNo}>{cashCardM.bankCardNo}</option>
                  })
                }
              </select>
            </div>

            <input ref="bankBranch" id="bankBranch" value={this.state.bankBranchValue} type="hidden"/>

            <div className={mmhc.mydiv}>
              <label htmlFor="amount">　提现金额：</label>
              <input ref="amount" id="amount" type="text"/>
            </div>

            <a className={mmhc.certification} onClick={this.cashHandler} href="javascript:void(0)">提现</a>
          </form>
        </div>
        <div className={cNs(mmhc.loadingMask,this.state.loadingMaskFlag==true?mmhc.show:"")}></div>
        <img src={loadingImg} className={cNs(mmhc.loadingImg,this.state.loadingMaskFlag==true?mmhc.show:"")} alt=""/>
      </div>

    )
  },
  componentDidMount: function() {
    $.ajax({
      url: jsonPath.path + '/member/personInfo.json',
      type: jsonPath.method,
      // url: '/json/member/personInfo.json',
      // type: "get",
      dataType: 'json',
      success: function(data) {
        this.setState({
          realNameFlag: data.user.realName == null ? false : true,
          bankFlag: data.bankList.length == 0 ? false : true,
          cashCards: data.bankList,
          balance: data.withdrawCash
        });
      }.bind(this)
    });
  }
});

module.exports = Main;