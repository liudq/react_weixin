var cNs = require('classnames');
var React = require("react");
var jsonPath = require("../../common/util/jsonPath.js");
var mmhc = require("./todaySpecialMoreContent.css");
var goodsImg = require("./price03.png");

var TodaySpecialMoreContent = React.createClass({
	render: function() {
		return (
			<div className={mmhc.content}>
				<div className={mmhc.single}>
					<img src={goodsImg} alt=""/>
					<p className={mmhc.title}>阿嘎嘎嘎</p>
					<p className={mmhc.singContent}>阿嘎嘎嘎阿嘎嘎阿嘎嘎嘎</p>
					<div className={mmhc.price}>￥1.00 <i>￥99</i></div>
				</div>
				<div className={mmhc.single}>
					<img src={goodsImg} alt=""/>
					<p className={mmhc.title}>阿嘎嘎嘎</p>
					<p className={mmhc.singContent}>阿嘎嘎嘎阿嘎嘎嘎阿嘎嘎嘎阿嘎嘎嘎</p>
					<div className={mmhc.price}>￥1.00 <i>￥99</i></div>
				</div><div className={mmhc.single}>
					<img src={goodsImg} alt=""/>
					<p className={mmhc.title}>阿嘎嘎嘎</p>
					<p className={mmhc.singContent}>阿嘎嘎嘎阿嘎嘎嘎阿嘎嘎嘎阿嘎嘎嘎</p>
					<div className={mmhc.price}>￥1.00 <i>￥99</i></div>
				</div><div className={mmhc.single}>
					<img src={goodsImg} alt=""/>
					<p className={mmhc.title}>阿嘎嘎嘎</p>
					<p className={mmhc.singContent}>阿嘎嘎嘎阿嘎嘎嘎阿嘎嘎嘎阿嘎嘎嘎</p>
					<div className={mmhc.price}>￥1.00 <i>￥99</i></div>
				</div>
			</div>
		)
	}
});

module.exports = TodaySpecialMoreContent;