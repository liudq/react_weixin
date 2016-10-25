require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var addImg = require("./add.png")
var mmhc = require("./index.css");
var jsonPath = require("../../../common/util/jsonPath.js");

var Main = React.createClass({
  getInitialState: function() {
    return {
      valu1: "dasf",
      fPhoneCount: 1,
      mPhoneCount: 1,
      fPhoneFlag2: false,
      mPhoneFlag2: false,
      fPhoneFlag3: false,
      mPhoneFlag3: false,
      data: "",
      addressDetail: ""
    }
  },
  addFixPhone: function(event) {
    var pVal = $(event.target).siblings().val();
    if (pVal) {
      this.state.fPhoneCount++;
      if (this.state.fPhoneCount == 3) {
        $(event.target).css('display', 'none');
      }
      var button = "<input type='text' value='" + pVal + "'/>";
      $("<p></p>").addClass(mmhc.phone).append(button).insertAfter($(event.target).parent());
      $(event.target).siblings().val('');
    }
  },
  addMobPhone: function(event) {
    var pVal = $(event.target).siblings().val();
    if (pVal) {
      this.state.mPhoneCount++;
      if (this.state.mPhoneCount == 3) {
        $(event.target).css('display', 'none');
      }
      if (this.state.mPhoneCount <= 3) {
        var button = "<input type='number' value='" + pVal + "'/>";
        $("<p></p>").addClass(mmhc.phone).append(button).insertAfter($(event.target).parent());
        $(event.target).siblings().val('');
      }
    }
  },
  next: function() {
    var nextFlag1, nextFlag2, nextFlag3, nextFlag4, nextFlag5 = false;
    /*地址*/
    var cityAddr = $("#demo1").val();
    /*详细地址*/
    var contAddr = $("#contAddr").val();
    /*传真*/
    var fax = $("#fax").val();
    /*邮编*/
    var postcodes = $("#postcodes").val();
    /*固定电话*/
    var fPhone = $("#fPhone").children();
    var fPhoneLen = fPhone.length;
    var fPhoneArr = [];
    for (var i = 0; i < fPhoneLen; i++) {
      if (fPhone.eq(i).children('input').val()) {
        fPhoneArr.push(fPhone.eq(i).children('input').val());
      }
    }
    var fPhoneStr = fPhoneArr.join(",");

    /*移动电话*/
    var mPhone = $("#mPhone").children();
    var mPhoneLen = mPhone.length;

    var mPhoneArr = [];
    for (var i = 0; i < mPhoneLen; i++) {
      if (mPhone.eq(i).children('input').val()) {
        mPhoneArr.push(mPhone.eq(i).children('input').val());
      }
    }
    var mPhoneStr = mPhoneArr.join(",");


    if (!cityAddr) {
      alert("店铺地址不能为空");
      nextFlag1 = false;
    } else {
      nextFlag1 = true;
      if (!mPhoneStr) {
        alert("移动电话不能为空");
        nextFlag2 = false;
      } else {
        /*手机号验证*/
        var phoneReg = /^1[34578]\d{9}$/;
        for (var i = 0; i < mPhoneArr.length; i++) {
          if (phoneReg.test(mPhoneArr[i])) {
            nextFlag2 = true
          } else {
            alert("请输入有效的手机号码");
            nextFlag2 = false;
            return false;
          }
        }
        /*座机验证*/
        var fPhoneReg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
        // console.log("111" + fPhoneArr)
        if (fPhoneArr != "") {
          for (var i = 0; i < fPhoneArr.length; i++) {
            if (fPhoneReg.test(fPhoneArr[i])) {
              nextFlag3 = true
            } else {
              alert("请输入有效的座机号码");
              nextFlag3 = false;
              return false;
            }
          }
        } else {
          nextFlag3 = true
        }
        /*邮编验证*/
        var postcodesReg = /^[0-9][0-9]{5}$/;
        if (postcodes) {
          if (postcodesReg.test(postcodes)) {
            nextFlag4 = true;
          } else {
            alert("请输入有效的邮政编码");
          }
        } else {
          nextFlag4 = true;
        }
        /*传真验证*/
        if (fax) {
          if (fPhoneReg.test(fax)) {
            nextFlag5 = true;
          } else {
            alert("请输入有效的传真号码")
          }
        } else {
          nextFlag5 = true;
        }
      }
    }
    if (nextFlag1 && nextFlag2 && nextFlag3 && nextFlag4 && nextFlag5) {
      var cityArr = cityAddr.split(",");

      $.ajax({
        url: jsonPath.path + '/thirdIndex.json',
        type: jsonPath.method,
        dataType: 'json',
        data: {
          addressPro: cityArr[0],
          addressCity: cityArr[1],
          addressCounty: cityArr[2],
          fax: fax,
          postCode: postcodes,
          addressDetail: contAddr,
          landline: fPhoneStr,
          mobilePhone: mPhoneStr
        },
        success: function(data) {
          if (success) {
            window.location.href = "/wechatMall/myOrderDetailsTwo.html?id=" + mId;
          } else {
            alert(data.message);
          }
        }.bind(this),
        error: function() {
          alert("系统繁忙");
        }
      });

    }
  },
  /*input change event*/
  addrChange: function(event) {
    this.setState({
      address: event.target.value
    })
  },
  addrDChange: function(event) {
    this.setState({
      addressDetail: event.target.value
    })
  },
  PostChange: function(event) {
    this.setState({
      postCode: event.target.value
    })
  },
  faxChange: function(event) {
    this.setState({
      fax: event.target.value
    })
  },
  phone1Change: function(event) {
    this.setState({
      phone1: event.target.value
    })
  },
  phone2Change: function(event) {
    this.setState({
      phone2: event.target.value
    })
  },
  phone3Change: function(event) {
    this.setState({
      phone3: event.target.value
    })
  },
  fPhone1Change: function(event) {
    this.setState({
      fPhone1: event.target.value
    })
  },
  fPhone2Change: function(event) {
    this.setState({
      fPhone2: event.target.value
    })
  },
  fPhone3Change: function(event) {
    this.setState({
      fPhone3: event.target.value
    })
  },
  render: function() {
    return (
      <div className={mmhc.content}>
        <div className={mmhc.box1}>
          <div className={mmhc.box}>
          <div className={mmhc.title}>
            <p className={mmhc.titleH}><span className={mmhc.start}>*</span>店铺地址:</p>
            <div className={mmhc.titleC}>
              <textarea className={mmhc.addr} id="demo1" type="text" readOnly="readonly" value={this.state.address} placeholder="点击选择" onChange={this.addrChange}></textarea>
            </div>
          </div>
          <div className={mmhc.title}>
            <p className={mmhc.titleH}><span className={mmhc.start}>&ensp;</span>详细地址:</p>
            <div className={mmhc.titleC}>
              <textarea id ="contAddr" type="text" value={this.state.addressDetail} placeholder="请输入详细地址" onChange={this.addrDChange}></textarea>
            </div>
          </div>
          <div className={mmhc.title}>
            <p className={mmhc.titleH}><span className={mmhc.start}>&ensp;</span>店铺座机:</p>
            <div className={mmhc.titleC} id="fPhone">
              <p className={mmhc.phone}><input type="text" value={this.state.fPhone1} onChange={this.fPhone1Change} placeholder="请输入店铺座机"/><img id="fPAdd" onClick={this.addFixPhone} src={addImg} alt=""/></p>
              <p className={cNs(this.state.fPhoneFlag2==false?mmhc.none:mmhc.phone)}><input value={this.state.fPhone2} onChange={this.fPhone2Change} type="text"/></p>
              <p className={cNs(this.state.fPhoneFlag3==false?mmhc.none:mmhc.phone)}><input value={this.state.fPhone3} onChange={this.fPhone3Change} type="text"/></p>
            </div>
          </div>
           <div className={mmhc.title} >
            <p className={mmhc.titleH}><span className={mmhc.start}>*</span>移动电话:</p>
            <div className={mmhc.titleC} id="mPhone">
              <p className={mmhc.phone}><input type="number" value={this.state.phone1} onChange={this.phone1Change} placeholder="请输入移动电话"/><img id="mPAdd" onClick={this.addMobPhone} src={addImg} alt=""/></p>
              <p className={cNs(this.state.mPhoneFlag2==false?mmhc.none:mmhc.phone)}><input value={this.state.phone2} onChange={this.phone2Change} type="number"/></p>
              <p className={cNs(this.state.mPhoneFlag3==false?mmhc.none:mmhc.phone)}><input value={this.state.phone3} onChange={this.phone3Change} type="number"/></p>
            </div>
          </div>
           <div className={mmhc.title}>
            <p className={mmhc.titleH}><span className={mmhc.start}>&ensp;</span>店铺传真:</p>
            <div className={mmhc.titleC}>
              <p className={mmhc.phone1}><input id="fax" type="text" value={this.state.fax} onChange={this.faxChange} placeholder="请输入店铺传真"/></p>
            </div>
          </div>
           <div className={mmhc.title}>
            <p className={cNs(mmhc.titleH,mmhc.clearfix)}><span className={mmhc.start}>&ensp;</span>邮政编码:</p>
            <div className={mmhc.titleC}>
              <p className={mmhc.phone1}><input id="postcodes" type="number" value={this.state.postCode} onChange={this.PostChange} placeholder="请输入邮政编码"/></p>
            </div>
          </div>
        </div>
        </div>
        <div className={mmhc.next} onClick={this.next}>下一步</div>
      </div>
    )
  },
  componentDidMount: function() {
    $(document).ready(function() {　　
      $('body').height($('body')[0].clientHeight);
    });
    var area1 = new LArea();
    area1.init({
      'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
      'valueTo': '#value1', //选择完毕后id属性输出到该位置
      'keys': {
        id: 'id',
        name: 'name'
      }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
      'type': 1, //数据源类型
      'data': LAreaData //数据源
    });



    $.ajax({
      url: jsonPath.path + '/getO2oKShopInformation.json',
      type: jsonPath.method,
      data: {},
      dataType: 'json',
      success: function(data) {
        console.log(data.result)
        var phone1, phone2, phone3, fPhone1, fPhone2, fPhone3, dAddress;
        if (data.success) {
          /*对移动手机进行判断*/
          if (data.result.mobilePhone) {
            var arr1 = data.result.mobilePhone.split(",");
            if (arr1.length == 1) {
              phone1 = data.result.mobilePhone
            } else if (arr1.length == 2) {
              phone1 = arr1[0];
              phone2 = arr1[1];
              this.setState({
                mPhoneFlag2: true,
                mPhoneCount: arr1.length
              })
            } else if (arr1.length == 3) {
              phone1 = arr1[0];
              phone2 = arr1[1];
              phone3 = arr1[2];
              this.setState({
                mPhoneFlag2: true,
                mPhoneFlag3: true,
                mPhoneCount: arr1.length
              }, function() {
                $("#mPAdd").css("display", "none");
              })
            }
          }
          /*对座机判断*/
          if (data.result.landline) {
            var arr2 = data.result.landline.split(",");
            // console.log(arr2)
            if (arr2.length == 1) {
              fPhone1 = data.result.landline
            } else if (arr2.length == 2) {
              fPhone1 = arr2[0];
              fPhone2 = arr2[1];
              this.setState({
                fPhoneFlag2: true,
                fPhoneCount: arr2.length
              })
            } else if (arr2.length == 3) {
              fPhone1 = arr2[0];
              fPhone2 = arr2[1];
              fPhone3 = arr2[2];
              this.setState({
                fPhoneFlag2: true,
                fPhoneFlag3: true,
                fPhoneCount: arr1.length
              }, function() {
                $("#fPAdd").css("display", "none");
              })
            }
          }
          /*地址判断*/
          if (data.result.addressPro && data.result.addressCity && data.result.addressCounty) {
            dAddress = data.result.addressPro + "," + data.result.addressCity + "," + data.result.addressCounty
          } else {
            if (!data.result.addressPro) {
              dAddress = data.result.addressCity + "," + data.result.addressCounty;
            } else {
              dAddress = data.result.addressPro + "," + data.result.addressCity;
            }
          }

          this.setState({
            address: dAddress,
            addressDetail: data.result.addressDetail,
            postCode: data.result.postCode,
            fax: data.result.fax,
            phone1: phone1,
            phone2: phone2,
            phone3: phone3,
            fPhone1: fPhone1,
            fPhone2: fPhone2,
            fPhone3: fPhone3
          });
        } else {
          alert(data.message)
        }
      }.bind(this),
      error: function() {
        alert("系统繁忙")
      }.bind(this)

    });

  }
});

module.exports = Main;