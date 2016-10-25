require("../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var mmhc = require("./main.css");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");
var loadImg = require("./newLoading.gif");

var Main = React.createClass({
  getInitialState: function() {
    return {
      imgUrl: "",
      imgHeight: "",
      show: 0
    }
  },
  render: function() {
    return (
      <div className={mmhc.content} style={{"backgroundImage":"url("+this.state.imgUrl+")"}}>
        <img className={cNs(mmhc.loadingImg,this.state.show==1?mmhc.loadingImgActive:"")} src={loadImg} alt=""/>
        <MmhAlert/>
      </div>
    )
  },
  componentDidMount: function() {
    var that = this;
    this.setState({
      show: 1
    });
    $.ajax({
      // url: '/json/getwarrant.json',
      url: '/weixinSigningFee/authc/getwarrant.json',
      type: "get",
      error: function() {
        alert("请求数据失败");
      },
      success: function(data) {
        if (data.flag == true) {
          this.setState({
            imgUrl: data.url,
            show: 0
          }, function() {
            that.setState({
              imgHeight: -$("." + mmhc.imgCss).height() / 2
            })
          }.bind(this))
        } else {
          this.setState({
            show: 0
          })
          alert(data.message)
        }
      }.bind(this),
      dataType: "json"
    });
  }
});

ReactDom.render(
  <Main />,
  document.getElementById("mmhContainer")
);