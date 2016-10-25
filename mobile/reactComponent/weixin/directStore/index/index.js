var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");
var logoImg = require("./img/myLogo.png");

var Main = React.createClass({
  getInitialState: function() {
    return {
      flag: false,
      content: ""
    }
  },

  render: function() {
    return (
      <div>
      
        <div className={cNs(mmhc.box,this.state.flag==false?mmhc.none:"")}>
          <div className={cNs(mmhc.clearfix,mmhc.head)}>
            <img src={logoImg} alt=""/>
            <div className={mmhc.content}>
              <p>
                <span className={mmhc.shop}>店铺名称:</span>
                <span className={mmhc.shopName}>{this.state.content.shopName?this.state.content.shopName:""}</span>
              </p>
               <p>
                <span className={mmhc.shop}>店铺编号:</span>
                <span className={mmhc.shopName}>{this.state.content.userCode?this.state.content.userCode:""}</span>
              </p>
               <p>
                <span className={mmhc.shop}>店铺类型:</span>
                <span className={mmhc.shopName}>直营店</span>
              </p>
            </div>
          </div>
          {/*<div className={mmhc.tell}><span className={mmhc.advert}>公告:</span><span>{this.state.content.notices?this.state.content.notices:""}</span></div>*/}
          <div className={mmhc.title}>
            <p className={mmhc.titleH}>店铺介绍:</p>
            <p className={mmhc.titleC}>{this.state.content.remark?this.state.content.remark:""}</p>
          </div>
           <div className={mmhc.title}>
            <p className={mmhc.titleH}>经营时间:</p>
            <p className={mmhc.titleC}>9: 00 - 21: 00 (周一至周日)</p>
          </div>
           <div className={mmhc.title}>
            <p className={mmhc.titleH}>店铺地址:</p>
            <p className={mmhc.titleC}>{this.state.content.shopAddress?this.state.content.shopAddress:""}</p>
          </div>
        </div>
       

        <div className={cNs(mmhc.box,mmhc.box1)}>
          <div className={cNs(mmhc.clearfix,mmhc.head)}>
            <img src={logoImg} alt=""/>
            <div className={mmhc.content}>
              <div className={mmhc.noneContent}>
                <p className={mmhc.dric}>您还没成为蜜麻花合作商</p>
                <p>合作热线: 400-9669-707</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  },
  componentDidMount: function() {

    $.ajax({
      url: jsonPath.path + '/weixinSigningFee/authc/directStore.json',
      type: jsonPath.method,
      data: {

      },
      dataType: 'json',
      error: function() {
        alert("系统繁忙请稍后再试");
        $("." + mmhc.box).css("display", "none");
      }.bind(this),
      success: function(data) {
        if (data.flag == "success") {
          document.title = data.data.shopName;
          this.setState({
            flag: true,
            content: data.data
          })
        } else {
          this.setState({
            flag: false
          }, function() {
            $("." + mmhc.box1).css("display", "block");

          })
        }

      }.bind(this)

    });

  }
});

module.exports = Main;