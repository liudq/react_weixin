require("../../../common/util/init.css");
var $ = require("jquery");
var cNs = require('classnames');
var React = require("react");
var timeFun = require("../../../common/util/util.js");
var ReactDom = require("react-dom");
var mmhc = require("./publicMenu.css");
var logoImg = require("./myLogo.png");
var eshopHomePath = require("../../../common/util/path.js").eshopHomePath;
var jsonPath = require("../../../common/util/jsonPath.js");
var PublicMenu = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    return (
      <div className={mmhc.pay}>
        <div className={mmhc.title}>
          <img src={logoImg} alt=""/>
          宝宝成长一路有我陪伴
        </div>
        <div className={mmhc.section1}>加盟指南</div>
        <div className={mmhc.section2}>
          <a href="http://mp.weixin.qq.com/s?__biz=MzI3ODE0NjU0Mg==&mid=2699506658&idx=1&sn=0a9745f1c55235b91c00e982b69e083b#wechat_redirect">1.模式说明</a>
          <a href="http://mp.weixin.qq.com/s?__biz=MzI3ODE0NjU0Mg==&mid=2699506658&idx=2&sn=06e9a0eefb46348274892044eda5cceb#wechat_redirect">2.如何成为代理</a>
          <a href="http://mp.weixin.qq.com/s?__biz=MzI3ODE0NjU0Mg==&mid=2699506658&idx=3&sn=514485838248209d34a6dfd98d50cac0#wechat_redirect">3.如何购买推广</a>
          <a href="http://mp.weixin.qq.com/s?__biz=MzI3ODE0NjU0Mg==&mid=2699506658&idx=4&sn=56984e23e02f490478566c6b81a7e5dc#wechat_redirect">4.如何购买推广关于佣金与提现</a>
        </div>
        <a href="http://mp.weixin.qq.com/s?__biz=MzIwMTg0OTkwMg==&mid=100000019&idx=1&sn=593e11774cf56c7a7734eee9ac2ba70e&scene=18#wechat_redirect" className={mmhc.section3}>品牌介绍</a>
        <div className={mmhc.section4}>联系客服</div>
        <div className={mmhc.section5}>
          如果您有加盟、选购、支付奖励提现等问题<br/>
          请致电客服：400-9669-707<br/>
          上班时间：9:00-12:00,13:00-18:00
        </div>
        <a href={eshopHomePath+"/weixinSigningFee/authc/unbundling.html"} className={mmhc.section6}>微信解绑</a>
      </div>
    )
  },
  componentDidMount: function() {},
});

module.exports = PublicMenu;