var mmhc = require("./index.css");
var cNs = require('classnames');
var React = require("react");
var ReactDom = require("react-dom");
var jsonPath = require("../../common/util/jsonPath.js");
var fundImg = require("./img/fund.png");
var rewardImg = require("./img/reward.png");
var backImg = require("./img/back.png");
var dYear = require("../../common/util/util.js").dateFormat;
var dHour = require("../../common/util/util.js").dcjDateFormatDetailed;

var Main = React.createClass({
	getInitialState: function() {
		return {
			tabFlag: true,
			moreMessFlag: true,
			rewardList: [],
			friendsList: [],
			pageNum1: 1,
			pageCount1: 1,
			pageNum2: 1,
			pageCount2: 1
		}
	},
	tabFun1: function() {
		$("." + mmhc.moreMess1).css("display", "none");
		$("." + mmhc.moreMess2).css("display", "none");
		this.setState({
			tabFlag: true,
			rewardList: [],
			friendsList: [],
			pageNum1: 1,
			pageNum2: 1
		}, function() {
			$.ajax({
				url: jsonPath.path + "/authc/getActivityRecordsByIVid.json",
				type: jsonPath.method,
				data: {

				},
				error: function(data) {
					alert("数据请求失败");

				},
				success: function(data) {
					if (data.success) {
						var pageNum1 = Math.ceil(data.countSum / data.pageSize);
						if (pageNum1 <= 1) {
							// this.setState({
							// 	moreMessFlag: true
							// })
							$("." + mmhc.moreMess1).css("display", "none");
							$("." + mmhc.moreMess2).css("display", "block");
						} else {
							$("." + mmhc.moreMess1).css("display", "block");
							$("." + mmhc.moreMess2).css("display", "none");
							this.setState({
								// moreMessFlag: false,
								pageCount1: pageNum1
							})
						}
						this.setState({
							rewardList: data.rst
						})
					} else {
						alert(data.message)
					}

				}.bind(this),
				dataType: "json"
			});
		})
	},
	tabFun2: function() {
		$("." + mmhc.moreMess1).css("display", "none");
		$("." + mmhc.moreMess2).css("display", "none");
		this.setState({
			tabFlag: false,
			rewardList: [],
			friendsList: [],
			pageNum1: 1,
			pageNum2: 1
		}, function() {
			/*朋友列表*/
			$.ajax({
				url: jsonPath.path + "/authc/findPullNewListPage.json",
				type: jsonPath.method,
				data: {

				},
				error: function(data) {
					alert("数据请求失败");

				},
				success: function(data) {
					if (data.success) {
						var pageNum2 = Math.ceil(data.countSum / data.pageSize);
						if (pageNum2 <= 1) {
							// this.setState({
							// 	moreMessFlag: true
							// })
							$("." + mmhc.moreMess1).css("display", "none");
							$("." + mmhc.moreMess2).css("display", "block");
						} else {
							$("." + mmhc.moreMess1).css("display", "block");
							$("." + mmhc.moreMess2).css("display", "none");
							this.setState({
								// moreMessFlag: false,
								pageCount2: pageNum2
							})
						}
						this.setState({
							friendsList: data.rst
						})
					} else {
						alert(data.message);
					}

				}.bind(this),
				dataType: "json"
			});
		})
	},
	moreMessFun: function() {

		if (this.state.tabFlag) {
			/*第一个加载更多*/
			this.state.pageNum1++;
			$.ajax({
				url: jsonPath.path + "/authc/getActivityRecordsByIVid.json",
				type: jsonPath.method,
				data: {
					pageNo: this.state.pageNum1
				},
				error: function(data) {
					alert("数据请求失败");

				},
				success: function(data) {
					if (data.success) {
						Array.prototype.push.apply(this.state.rewardList, data.rst);
						this.setState({
							rewardList: this.state.rewardList
						}, function() {
							if (this.state.pageNum1 >= this.state.pageCount1) {
								// this.setState({
								// 	moreMessFlag: true
								// })
								$("." + mmhc.moreMess1).css("display", "none");
								$("." + mmhc.moreMess2).css("display", "block");
							}
						})
					} else {
						alert(data.message)
					}

				}.bind(this),
				dataType: "json"
			});
		} else {
			/*第二个加载更多*/
			this.state.pageNum2++;
			$.ajax({
				url: jsonPath.path + "/authc/findPullNewListPage.json",
				type: jsonPath.method,
				data: {
					pageNo: this.state.pageNum2
				},
				error: function(data) {
					alert("数据请求失败");
				},
				success: function(data) {
					if (data.success) {
						Array.prototype.push.apply(this.state.friendsList, data.rst);
						this.setState({
							friendsList: this.state.friendsList
						}, function() {
							if (this.state.pageNum2 >= this.state.pageCount2) {
								// this.setState({
								// 	moreMessFlag: true
								// })
								$("." + mmhc.moreMess1).css("display", "none");
								$("." + mmhc.moreMess2).css("display", "block");
							}
						})
					} else {
						alert(data.message)
					}

				}.bind(this),
				dataType: "json"
			});
		}
	},
	render: function() {
		return (
			<div>
				{this.state.apkState==1?<div className={mmhc.title}><a href="javascript:history.back(-1);"><img src={backImg} alt=""/></a>邀请返利</div>:<div></div>}
				<div className={mmhc.box}>
					<ul className={mmhc.navBar}>
						<li onClick={this.tabFun1} className={cNs(mmhc.navList,this.state.tabFlag?mmhc.active:"")}>已获得奖励</li>
						<li onClick={this.tabFun2} className={this.state.tabFlag?"":mmhc.active}>应邀好友</li>
	        </ul>
	      		{/*tab1*/}
	        <div className={this.state.tabFlag?"":mmhc.none}>
		        <p className={cNs(mmhc.actTile,this.state.tabFlag?"":mmhc.none)}>活动期间: 邀请好友完成订单才能获得首单提成</p>
						{
							this.state.rewardList.map(function(mes,index){
								return <div className={mmhc.content1} key={index}>
													<div className={mmhc.listL}>
														<p>{dYear(mes.createTime)}</p>
														<p><span>{mes.userType}:</span><sapn className={mmhc.call}>{mes.userMobile}</sapn></p>
													</div>
													<div className={mmhc.listC}>
														<p>{dHour(mes.createTime)}</p>
														<p>{mes.rewardRemark}</p>
													</div>
													<div className={mmhc.moneyList}>
														获得<span className={mmhc.moneyN} style={{"display":mes.rewardType=="元"?"inlineBock":"none"}}>&#65509;</span><span className={mmhc.moneyN}>{mes.rewardMoney}</span><span style={{"display":mes.rewardType=="元"?"none":"inlineBock"}}>{mes.rewardType}</span><img src={mes.rewardType=="元"?rewardImg:fundImg} alt=""/>
													</div>
												</div>
							}.bind(this))
						}
					
					</div>	
						{/*tab2*/}
					<div className={this.state.tabFlag?mmhc.none:""}>
						{
							this.state.friendsList.map(function(res,index){
								return <div className={mmhc.content2} key={index}>
													<p className={cNs(mmhc.time,mmhc.time1)}>
														<span>{dYear(res.createTime)}</span><span className={mmhc.friend}>好友</span>
													</p>
													<p className={cNs(mmhc.time,mmhc.phone)}>{res.userMobile}</p>
												</div>
							}.bind(this))
						}
					</div>
					<div onClick={this.moreMessFun} className={cNs(mmhc.moreMess,mmhc.moreMess1)}>点击加载更多</div>
		{
			/*<div className={cNs(mmhc.moreMess,this.state.moreMessFlag?mmhc.none:"")}>加载中<dot className={mmhc.point}>...</dot></div>
			 */
		}
					<div className={cNs(mmhc.moreMess,mmhc.moreMess2)}>已经看到最后啦</div>
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
		$("." + mmhc.moreMess1).css("display", "none");
		$("." + mmhc.moreMess2).css("display", "none");

		$.ajax({
			url: jsonPath.path + "/authc/getActivityRecordsByIVid.json",
			type: jsonPath.method,
			data: {

			},
			error: function(data) {
				alert("数据请求失败");
			},
			success: function(data) {
				if (data.success) {
					var pageNum1 = Math.ceil(data.countSum / data.pageSize)

					if (pageNum1 <= 1) {
						// this.setState({
						// 	moreMessFlag: true
						// })
						$("." + mmhc.moreMess1).css("display", "none");
						$("." + mmhc.moreMess2).css("display", "block");
					} else {
						$("." + mmhc.moreMess1).css("display", "block");
						$("." + mmhc.moreMess2).css("display", "none");
						this.setState({
							// moreMessFlag: false,
							pageCount1: pageNum1
						})
					}
					this.setState({
						rewardList: data.rst
					})
				} else {
					alert(data.message);
				}
			}.bind(this),
			dataType: "json"
		});
	}
});

module.exports = Main;