var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../../common/util/jsonPath.js");

// var clearCookie = function() {
//   var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
//   if (keys) {
//     for (var i = keys.length; i--;)
//       document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
//   }
// }
var setCookie = function(name, value, seconds) {
  seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。  
  var expires = "";
  if (seconds != 0) { //设置cookie生存时间  
    var date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值  
}
var clearCookie = function(name) {
  setCookie(name, "", -1);
}

var Main = React.createClass({
  getInitialState: function() {
    return {
      num: 0
    }
  },

  render: function() {
    return (
      <div>
       
        {/*<DownloadGuide/>*/}
      </div>
    )
  },
  componentDidMount: function() {
    confirm("您确定和微信服务号解除绑定吗?", function() {
      $.ajax({
        url: jsonPath.path + '/weixinSigningFee/authc/unbundling.json',
        type: jsonPath.method,
        data: {

        },
        dataType: 'json',
        success: function(data) {
          clearCookie("ejavashop_b2b2c_name");
          clearCookie("DSESSION_H5");
          clearCookie("ESHOP_H5_T");

          if (data.success) {
            alert("解绑成功", function() {
              console.log(document.cookie)
              var openId2 = data.openId2;
              window.location.href = "/weixinSigningFee/logout.html?openId2=" + openId2;
              location.reload();
            })
          } else {
            alert(data.error);
          }
        }.bind(this),
        error: function() {

          // alert(document.cookie)
          alert("解绑失败", function() {
            console.log(document.cookie)
          });

        }.bind(this)
      });
      return false;
    });
  }
});

module.exports = Main;