var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./addAddress.css");
var backImg = require("./order2.png");
var onImg = require("./on.png");
var outImg = require("./out.png");
var back2Img = require("./back2.png");

var addAddress = React.createClass({
  getInitialState: function() {
    return {
      cityList: [{}],
      isFromOrder: "",
      address: {},
      areaList: [{}],
      provinceList: [{}],
      provinceIdState: "",
      cityIdState: "",
      areaIdState: "",
      morenState: 2,
      newAddress: 2,
      addressNum: 0,
      provinceIdStateName: "",
      cityIdStateName: "",
      areaIdStateName: "",
      addAllName: "",
      mobileState: "",
      nameState: "",
      addressInfoState: "",
      adressId: "",
      zipCodeState: "",
      myOneYuanBuyState: "",
      acId: "",
      bhId: "",
      postageFree: "",
      versionTitel: 0
    }
  },
  changeProvince: function(event) {
    var value = event.target.value;
    var addAllNameProvince = $("#" + value).attr("data-name") + this.state.cityIdStateName + this.state.areaIdStateName;
    this.setState({
      provinceIdState: value,
      provinceIdStateName: $("#" + value).attr("data-name"),
      addAllName: addAllNameProvince
    });
    $.ajax({
      url: "/getRegionByParentId.json?parentId=" + value + "&t=" + Math.random(),
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          cityList: data.regionsList
        })
      }.bind(this),
      dataType: "json"
    });
  },
  changeCity: function(event) {
    var value = event.target.value;
    var addAllNameCity = this.state.provinceIdStateName + $("#" + value).attr("data-name") + this.state.areaIdStateName;
    this.setState({
      cityIdState: value,
      cityIdStateName: $("#" + value).attr("data-name"),
      addAllName: addAllNameCity
    });
    $.ajax({
      url: "/getRegionByParentId.json?parentId=" + value + "&t=" + Math.random(),
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        this.setState({
          areaList: data.regionsList
        })
      }.bind(this),
      dataType: "json"
    });
  },
  changeArea: function(event) {
    var value = event.target.value;
    var addAllNameArea = this.state.provinceIdStateName + this.state.cityIdStateName + $("#" + value).attr("data-name");
    this.setState({
      areaIdState: value,
      areaIdStateName: $("#" + value).attr("data-name"),
      addAllName: addAllNameArea
    })
  },
  moRenFun: function() {
    if (this.state.morenState == 2) {
      $.ajax({
        url: "/setdefaultaddress.json?id=" + this.state.address.id + "&t=" + Math.random(),
        type: "get",
        error: function() {
          alert("请求数据失败");
        },
        success: function(data) {
          if (data.resultcode == true) {
            this.setState({
              morenState: 1
            })
          } else {
            alert(data.msg);
          }
        }.bind(this),
        dataType: "json"
      });
    }
  },
  delet: function() {
    $.ajax({
      url: "/deleteaddress.json?id=" + this.state.address.id + "&t=" + Math.random(),
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode == true) {
          window.location.href = "/authc/addressList.html";
        } else {
          alert(data.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  noEmpty: function() {
    var re = /^\d{6}$/;
    if (ReactDom.findDOMNode(this.refs.myName).value == "") {
      alert("请输入姓名");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.myZipCode).value == "") {
      alert("请输入邮编");
      return false;
    };
    if (!re.test(ReactDom.findDOMNode(this.refs.myZipCode).value)) {
      alert("请输入正确邮编");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.myMobile).value == "") {
      alert("请输入手机号");
      return false;
    } else {
      if (ReactDom.findDOMNode(this.refs.myMobile).value.length != 11) {
        alert("请输入正确手机号");
        return false;
      }
    };
    if (ReactDom.findDOMNode(this.refs.myProvince).value == "") {
      alert("请输入省份");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.myCity).value == "") {
      alert("请输入城市");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.myArea).value == "") {
      alert("请输入区县");
      return false;
    };
    if (ReactDom.findDOMNode(this.refs.myAddressInfo).value == "") {
      alert("请输入街道");
      return false;
    };
    $.ajax({
      url: "/saveaddress.json?t=" + Math.random(),
      type: "post",
      data: $("#mySubmit").serialize(),
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.resultcode == true) {
          if (this.state.myOneYuanBuyState == 1) {
            window.location.href = "/authc/addressList.html?myOneYuanBuy=1&acId=" + this.state.acId + "&bhId=" + this.state.bhId + "&postageFree=" + this.state.postageFree;
          } else {
            window.location.href = "/authc/addressList.html";
          }

        } else {
          alert(data.msg);
        }
      }.bind(this),
      dataType: "json"
    });
  },
  mobileChange: function(event) {
    this.setState({
      mobileState: event.target.value
    });
  },
  nameChange: function(event) {
    this.setState({
      nameState: event.target.value
    });
  },
  addressInfoChange: function(event) {
    this.setState({
      addressInfoState: event.target.value
    });
  },
  zipCodeChange: function(event) {
    this.setState({
      zipCodeState: event.target.value
    })
  },
  render: function() {
    return (
      <div className={mmhc.addAddressContent}>
        <div className={cNs(mmhc.title,this.state.versionTitel==1?mmhc.title12:"")}>
          <a href="javascript:history.back()" className={mmhc.titleLeft}><img className={mmhc.backImg} src={this.state.versionTitel==1?back2Img:backImg} alt=""/></a>
          <div className={mmhc.titleCenter}>收货地址
          {this.state.addressNum>1?<div onClick={this.delet} className={mmhc.delet}>删除</div>:""}
          </div>
        </div>
        <div className={mmhc.title2}></div>
        <form id="mySubmit" method='post' action="/saveaddress.json">
          <input type="hidden" id="addAll" name="addAll" value={this.state.addAllName}/>
          <input type="hidden" id="id" name="id" value={this.state.adressId}/>
          <div className={mmhc.content}>
            <div className={mmhc.name}>收货人姓名</div>
            <input ref="myName" name="memberName" onChange={this.nameChange} value={this.state.nameState} type="text"/>
            <div className={mmhc.name}>邮编</div>
            <input  ref="myZipCode" name="zipCode" onChange={this.zipCodeChange} value={this.state.zipCodeState} type="text"/>
            <div className={mmhc.name}>手机号码</div>
            <input  ref="myMobile" name="mobile" onChange={this.mobileChange} value={this.state.mobileState} type="text"/>
            <div className={mmhc.name}>收货地址</div>
            <div className={mmhc.name}>省份</div>
            <select  ref="myProvince" onChange={this.changeProvince} name="provinceId" id="" value={this.state.provinceIdState}>
            <option value="">--请选择--</option>
            {
               this.state.provinceList.map(function(provinceList, index) {
                return <option id={provinceList.id} key={index} value={provinceList.id} data-name={provinceList.regionName}>{provinceList.regionName}</option>
              }.bind(this))
            }
            </select>
            <div className={mmhc.name}>城镇</div>
            <select ref="myCity" name="cityId" id="" onChange={this.changeCity} value={this.state.cityIdState}>
              <option value="">--请选择--</option>
              {
                 this.state.cityList.map(function(cityList, index) {
                  return <option id={cityList.id} data-name={cityList.regionName} key={index} value={cityList.id}>{cityList.regionName}</option>
                }.bind(this))
              }
            </select>
            <div className={mmhc.name}>区县</div>
            <select ref="myArea" name="areaId" id="" onChange={this.changeArea} value={this.state.areaIdState}>
              <option value="">--请选择--</option>
              {
                 this.state.areaList.map(function(areaList, index) {
                  return <option id={areaList.id} data-name={areaList.regionName} key={index} value={areaList.id}>{areaList.regionName}</option>
                }.bind(this))
              }
            </select>
            <div className={mmhc.name}>街道</div>
            <textarea onChange={this.addressInfoChange} ref="myAddressInfo" value={this.state.addressInfoState} className={mmhc.street} name="addressInfo" id="" rows="3"></textarea>
    {
      /*<div className={mmhc.name}>邮编</div>
                  <input value={this.state.address.zipCode} type="text"/>*/
    } 
            <div className={cNs(mmhc.moRenAddress,this.state.newAddress==1?mmhc.none:mmhc.block)}>
              <div className={mmhc.moRenAddressLeft}>
                <div>默认地址</div>
                <div>注：每次下单会默认使用这个地址</div>
              </div>
              <div className={mmhc.moRenAddressRight}>
              {this.state.morenState==1?<img onClick={this.moRenFun} src={onImg} alt=""/>:<img onClick={this.moRenFun} src={outImg} alt=""/>}
              </div>
              <div className={mmhc.clear}></div>
            </div>
            <input onClick={this.noEmpty} className={cNs(mmhc.addAddressBottom,mmhc.submitButton)} type="button" value="保存地址"/>
            {/*<div className={mmhc.addAddressBottom}>保存地址</div>*/}  
          </div> 
        </form>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
    var prdCode = GetQueryString("id");
    var num = GetQueryString("num");
    var myOneYuanBuy = GetQueryString("myOneYuanBuy");
    var postageFree = GetQueryString("postageFree");
    var bhId = GetQueryString("bhId");
    var acId = GetQueryString("acId");
    this.setState({
      addressNum: num,
      myOneYuanBuyState: myOneYuanBuy,
      acId: acId,
      bhId: bhId,
      postageFree: postageFree
    });
    if (parseFloat(localStorage.getItem("version")) >= 1.2) {
      this.setState({
        versionTitel: 1
      });
    } else {
      this.setState({
        versionTitel: 0
      });
    };
    if (num == "-1") {
      this.setState({
        newAddress: 1
      });
      $.ajax({
        type: 'get',
        // url: "/json/newaddress.json",
        url: "/newaddress.json?t=" + Math.random(),
        error: function() {
          alert("请求数据失败");
        }.bind(this),
        success: function(data) {
          this.setState({
            isFromOrder: data.isFromOrder,
            address: data.address,
            provinceList: data.provinceList,
            provinceIdState: data.address.provinceId,
            newAddress: 1
          })
        }.bind(this),
        dataType: "json"
      });
    } else {
      this.setState({
        newAddress: 2
      });
      $.ajax({
        type: 'get',
        // url: "/json/editaddress.json",
        url: "/editaddress.json?id=" + prdCode + "&t=" + Math.random(),
        error: function() {
          alert("请求数据失败");
        }.bind(this),
        success: function(data) {
          this.setState({
            cityList: data.cityList,
            isFromOrder: data.isFromOrder,
            address: data.address,
            areaList: data.areaList,
            provinceList: data.provinceList,
            provinceIdState: data.address.provinceId,
            cityIdState: data.address.cityId,
            areaIdState: data.address.areaId,
            morenState: data.address.state,
            newAddress: 2,
            addAllName: data.address.addAll,
            mobileState: data.address.deMobile,
            nameState: data.address.userName,
            zipCodeState: data.address.zipCode,
            addressInfoState: data.address.addressInfo,
            adressId: prdCode
          }, function() {
            this.setState({
              provinceIdStateName: $("#" + data.address.provinceId).attr("data-name"),
              cityIdStateName: $("#" + data.address.cityId).attr("data-name"),
              areaIdStateName: $("#" + data.address.areaId).attr("data-name")
            })
          })

        }.bind(this),
        dataType: "json"
      });
    }

  },
});

module.exports = addAddress;