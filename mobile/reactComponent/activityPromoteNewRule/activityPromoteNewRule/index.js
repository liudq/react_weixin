var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");

var backImg = require("./img/back.png")

var Main = React.createClass({
	getInitialState: function() {
		return {
			tabFlag: true,
			moreMessFlag: true
		}
	},

	render: function() {
		return (
			<div className={mmhc.Bbox}>
				{this.state.apkState==1?<div className={mmhc.title}><a href="javascript:history.back(-1);"><img src={backImg} alt=""/></a>分享规则</div>:<div></div>}
				<div className={mmhc.box}>
					<div className={mmhc.content}>
				 		<p className={mmhc.list}>1、</p>
				  	<p className={mmhc.content1}>给好友分享新人大礼包仅限未在蜜麻花注册过的好友领取，每个新用户只能领取1次，包括20蜜麻花积金，10花币（以上奖励只通过APP领取），新用户可直接使用花币，进行购物；</p>
				  </div>
	        <div className={mmhc.content}>
		        <p className={mmhc.list}>2、</p>
		        <p className={mmhc.content1}> 成功邀请1位好友领取新人大礼包，将获得30元（可提现）；好友完成首次购物（支付账户首次在蜜麻花产生支付，并确认收货之后），将在获得好友首单金额2%的提成（1-2个工作日内到账）；</p>
		      </div>
		      <div className={mmhc.content}>
		        <p className={mmhc.list}>3、</p>
		        <p className={mmhc.content1}>同一登录账号、同一个手机号、同个终端设备号、同一个支付账户、同一个收货地址、同一IP或其他合理显示为同一用户的情形，均视为同一个用户；</p>
		      </div>
		      <div className={mmhc.content}>
		        <p className={mmhc.list}>4、</p>
		        <p className={mmhc.content1}>通过不正当手段（包括作弊、扰乱系统、实施网络攻击、批量注册、用机器注册账户、用机器模拟客户端）获得奖励，蜜麻花有权撤销奖励及相关订单；</p>
		      </div>
		      <div className={mmhc.content}>
		        <p className={mmhc.list}>5、</p>
		        <p className={mmhc.content1}>本次活动所有解释权归蜜麻花所有。</p>
		      </div>
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
		var apkState = GetQueryString("apkState");
		if (apkState) {
			this.setState({
				apkState: 1
			});
		}

	}
});

module.exports = Main;