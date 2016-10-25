var React = require("react");
var cNs = require('classnames');
var Main = React.createClass({
  render: function() {
    return (
      <div></div>
    )
  },
  componentDidMount: function() {
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.slice(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    var version = "";
    var iVersion = GetQueryString("iVersion");
    var aVersion = GetQueryString("aVersion");
    var phoneType = GetQueryString("phoneType");
    var appSource = GetQueryString("appSource");
    if (iVersion != null) {
      localStorage.setItem("iVersion", iVersion); //将ios版本号存入localStorage
      version = iVersion;
    };
    if (aVersion != null) {
      localStorage.setItem("aVersion", aVersion); //将android版本号存入localStorage
      version = aVersion;
    };
    if (version != null && version != "") {
      localStorage.setItem("version", version); //将当前app版本号存入localStorage
      localStorage.setItem("phoneType", phoneType); //将手机型号存入localStorage
      localStorage.setItem("appSource", appSource); //将渠道来源存入localStorage
    };
  }
});

module.exports = Main;