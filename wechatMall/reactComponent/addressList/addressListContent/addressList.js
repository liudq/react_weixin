var cNs = require('classnames');
var React = require("react");
var mmhc = require("./addressList.css");
var backImg = require("./order2.png");
var back2Img = require("./back2.png");
var SingleAddress = require("./singleAddress/singleAddress.js");

var AddressList = React.createClass({
  getInitialState: function() {
    return {
      message: "",
      addressList: [{}],
      message: "",
      myOneYuanBuyState: "",
      acId: "",
      bhId: "",
      postageFree: "",
      versionTitel: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.adressListContent}>
        <div className={mmhc.content}>

        {
           this.state.addressList.map(function(data, index) {
            return <SingleAddress key={index} num={this.state.addressList.length} moRenState={data.state} addressList={data}/>
          }.bind(this))
        }
        </div>
        <div className={mmhc.cteateAddress2}></div>
        <div className={mmhc.cteateAddress}>
        {
          this.state.myOneYuanBuyState==1?<a href={"/wechatMall/authc/addAddress.html?num=-1&myOneYuanBuy=1&acId="+this.state.acId+"&bhId="+this.state.bhId+"&postageFree="+this.state.postageFree} className={mmhc.newAddress}>+新建地址</a>:<a href="/wechatMall/authc/addAddress.html?num=-1" className={mmhc.newAddress}>+新建地址</a>
        }
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var myOneYuanBuy = GetQueryString("myOneYuanBuy");
    var postageFree = GetQueryString("postageFree");
    var bhId = GetQueryString("bhId");
    var acId = GetQueryString("acId");
    this.setState({
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
    $.ajax({
      type: 'get',
      // url: "/json/address.json",
      url: "/address.json?isFromOrder=1",
      error: function() {
        alert("请求数据失败");
      }.bind(this),
      success: function(data) {
        this.setState({
          message: data.message,
          addressList: data.addressList,
          message: data.isFromOrder
        })
      }.bind(this),
      dataType: "json"
    });
  }
});

module.exports = AddressList;