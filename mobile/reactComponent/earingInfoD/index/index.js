import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';
// var echarts = require('echarts');
import echarts from 'echarts'
import backImg from './back.png'
import noneImg from './none.jpg'
import shadowImg from './newLoading.gif'
// import hideInf from './hide.png'
import jsonPath from '../../common/util/jsonPath.js';

var dateFormatDetailed = require("../../common/util/util.js").dateFormatDetailed;

class Main extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				infoData: [],
				infoStyle: [],
				pageNum: 1,
				moneyType: '',
				startTime: '',
				endTime: ''
			};
		}
		/*选择基金种类*/
	activeFun(event) {
			var moneyType = $(event.target).html();
			// var num = $(event.target).attr("data-id")
			if (moneyType == this.state.moneyType) {
				this.state.moneyType = '';
			} else {
				this.state.moneyType = moneyType;
			}
			$(event.target).toggleClass(mmhc.active).siblings().removeClass(mmhc.active);
		}
		/*取消筛选*/
	cancle() {
			$('.' + mmhc.shadow).css({
				"display": "none"
			});
		}
		/*筛选*/
	choose() {
			$('.' + mmhc.shadow).css({
				"display": "block"
			});
		}
		/*确认筛选*/
	sureFun() {
		var begin = $('#beginTime').val();
		var end = $('#endTime').val();
		// console.log(begin);
		// console.log(end);

		this.state.startTime = begin;
		this.state.endTime = end;

		if (begin == '' && end == '') {
			/*时间为空*/
			this.state.pageNum = 1;
			/*页面类型*/
			$.ajax({
				url: jsonPath.path + '/getH5UserARByCondition.json',
				// url: jsonPath.path + '/getMemberARByCondition.json?pageNum=' + this.state.pageNum,
				type: jsonPath.method,
				data: {
					pageNum: this.state.pageNum,
					moneyType: this.state.moneyType,
					startTime: this.state.startTime,
					endTime: this.state.endTime
				},
				dataType: 'json',
				success: function(data) {
					$("." + mmhc.shadow1).css({
						"display": "none"
					});
					$("." + mmhc.shadow2).css({
						"display": "none"
					});

					/*判断数据加载成功失败*/
					if (data.flag == true) {
						this.setState({
							infoData: data.rst
						}, function() {
							if (this.state.infoData == "") {
								$("." + mmhc.noneImg).addClass(mmhc.block);
							} else {
								$("." + mmhc.noneImg).removeClass(mmhc.block);
							}
						});

						if (this.state.pageNum == data.sumPageNum || data.sumPageNum == 0) {
							$('.' + mmhc.moreMess).css({
								"display": "none"
							});
						} else {
							$('.' + mmhc.moreMess).css({
								"display": "block"
							});
						}

						$('.' + mmhc.shadow).css({
							"display": "none"
						});
					} else {
						alert("数据加载请求失败啦");
					}


				}.bind(this),

				error: function() {
					$("." + mmhc.shadow1).css({
						"display": "none"
					});
					$("." + mmhc.shadow2).css({
						"display": "none"
					});
					alert("系统繁忙");

				}.bind(this)


			});
		} else if (begin != '' && end != '') {
			var time1 = parseInt((begin.split('-').join('')));
			var time2 = parseInt((end.split('-').join('')));
			if (time1 > time2) {
				alert("没有时间间隔了")
			} else {
				this.state.pageNum = 1;
				/*页面类型*/
				$.ajax({
					url: jsonPath.path + '/getH5UserARByCondition.json',
					// url: jsonPath.path + '/getMemberARByCondition.json?pageNum=' + this.state.pageNum,
					type: jsonPath.method,
					data: {
						pageNum: this.state.pageNum,
						moneyType: this.state.moneyType,
						startTime: this.state.startTime,
						endTime: this.state.endTime
					},
					dataType: 'json',
					success: function(data) {
						$("." + mmhc.shadow1).css({
							"display": "none"
						});
						$("." + mmhc.shadow2).css({
							"display": "none"
						});
						if (data.flag === true) {
							this.setState({
								infoData: data.rst
							}, function() {
								if (this.state.infoData == "") {
									$("." + mmhc.noneImg).addClass(mmhc.block);
								} else {
									$("." + mmhc.noneImg).removeClass(mmhc.block);
								}
							});


							if (this.state.pageNum == data.sumPageNum || data.sumPageNum == 0) {
								$('.' + mmhc.moreMess).css({
									"display": "none"
								});
							} else {
								$('.' + mmhc.moreMess).css({
									"display": "block"
								});
							}

							$('.' + mmhc.shadow).css({
								"display": "none"
							});
						} else {
							alert("数据加载请求失败啦");
						}


					}.bind(this),
					error: function() {
						$("." + mmhc.shadow1).css({
							"display": "none"
						});
						$("." + mmhc.shadow2).css({
							"display": "none"
						});
						alert("系统繁忙");

					}.bind(this)

				});
			}
		} else {
			if (begin == '') {
				alert("请输入开始时间");
			} else {
				alert("请输入结束时间");
			}
		}
	}
	moreMess() {
		this.state.pageNum++
			/*页面类型*/
			$.ajax({
				url: jsonPath.path + '/getH5UserARByCondition.json',
				// url: jsonPath.path + '/getMemberARByCondition.json?pageNum=' + this.state.pageNum,
				type: jsonPath.method,
				data: {
					pageNum: this.state.pageNum,
					moneyType: this.state.moneyType,
					startTime: this.state.startTime,
					endTime: this.state.endTime
				},
				dataType: 'json',
				success: function(data) {
					$("." + mmhc.shadow1).css({
						"display": "none"
					});
					$("." + mmhc.shadow2).css({
						"display": "none"
					});
					/*判读数据加载成功失败*/
					if (data.flag == false) {
						alert('数据加载请求失败啦')
					} else {
						Array.prototype.push.apply(this.state.infoData, data.rst);
						this.setState({
							infoData: this.state.infoData
						});


						if (this.state.pageNum == data.sumPageNum || data.sumPageNum == 0) {
							$('.' + mmhc.moreMess).css({
								"display": "none"
							});
						} else {
							$('.' + mmhc.moreMess).css({
								"display": "block"
							});
						}
					}
					/*
										if (this.state.infoData == "") {
											$("." + mmhc.noneImg).addClass(mmhc.block);
										} else {
											$("." + mmhc.noneImg).removeClass(mmhc.block);
										}
					*/
				}.bind(this),
				error: function() {
					$("." + mmhc.shadow1).css({
						"display": "none"
					});
					$("." + mmhc.shadow2).css({
						"display": "none"
					});
					alert("系统繁忙");

				}.bind(this)
			});
	}

	clearTime() {
		$("input").val('');

	}


	render() {
		return (
			<div className={mmhc.moneyBox}>
				<div className={mmhc.htitle}><a href="back"><img src={backImg} alt=""/></a><h2>积金明细</h2><span onClick={this.choose.bind(this)}>筛选</span></div>
        {
        	this.state.infoData.map(function(res,index){
        		return(
      				 <div className={mmhc.infoCotain} key={index}>
				        <div className={mmhc.infoList}>
				        	<div className={cNs(mmhc.lsitTop,mmhc.clearfix)}>
				        		<p className={mmhc.topLeft}>{res.remark}</p>
				        		<p className={cNs(mmhc.topRight,res.amount<0?mmhc.red:"")}><span className={cNs('',res.amount<0?mmhc.xiaoshi:"")}>+</span>{res.amount}</p>
				        	</div>
				        	<div className={cNs(mmhc.lsitBottom,mmhc.clearfix)}>
				        		<p className={mmhc.bottomLeft}>{dateFormatDetailed(res.createTime)}</p>
				        		<p className={mmhc.bottomRigh}><span>剩余:</span><span>{res.surplusFund}</span></p>
				        	</div>
				        </div>
				      </div> 
      			)
        	}.bind(this))
        }
	      <img className={mmhc.noneImg} src={noneImg} alt=""/> 
	      <p className={mmhc.moreMess} onClick={this.moreMess.bind(this)}>点击加载更多</p>
        <div className={mmhc.shadow2}></div>
        <div className={mmhc.shadow1}>
          <img src={shadowImg} className={mmhc.loading}/>
        </div>

	      <div className={mmhc.shadow}>
	      	<div className={mmhc.htitle1}><b onClick={this.cancle.bind(this)}>取消</b><h2>积分明细</h2><span>筛选</span></div>
	      	<h2 className={cNs(mmhc.title1,mmhc.clearfix)}>时间<span className={mmhc.clearTime} onClick={this.clearTime.bind(this)}>重置</span></h2>


					{/*选择日期*/}
    			<div className={mmhc.timeD}>
						<p className={mmhc.lie}>起始时间<input  id="beginTime" className={mmhc.kbtn} /></p>
						<p className={mmhc.lie}>结束时间<input id="endTime" className={mmhc.kbtn} /></p>
		{ /*<div className={mmhc.clearTime} onClick={this.clearTime.bind(this)}><span>重置</span></div>*/ }
					</div>
					<div id="datePlugin"></div>
					{/*日期结束*/}

	      		<h2 className={mmhc.title1}>类型</h2>
	      		<ul className={cNs(mmhc.styleList,mmhc.clearfix)}>
	      		{
	      			this.state.infoStyle.map(function(list,index){

								return <li className={mmhc.lsitCon} onClick={this.activeFun.bind(this)} key={index}>{list}</li>

	      			}.bind(this))
	      		}
	      		</ul>
	      		<p className={mmhc.sureBtn} onClick={this.sureFun.bind(this)}>确认</p>
	      </div>

    	</div>
		)
	}
	componentDidMount() {
		/*时间插件*/
		$('#beginTime').date();
		$('#endTime').date();
		/*积分类型*/
		$.ajax({
			url: jsonPath.path + '/getH5AllowanceType.json',
			type: jsonPath.method,
			dataType: 'json',
			success: function(data) {
				if (data.flag == false) {
					alert("积分分类加载失败");
				} else {
					this.setState({
						infoStyle: data.type
					});
				}
			}.bind(this),
			error: function() {
				$("." + mmhc.shadow1).css({
					"display": "none"
				});
				$("." + mmhc.shadow2).css({
					"display": "none"
				});
				alert("系统繁忙");

			}.bind(this)
		});

		/*页面类型*/
		$.ajax({
			url: jsonPath.path + '/getH5UserARByCondition.json',
			// url: jsonPath.path + '/getMemberARByCondition.json?pageNum=' + this.state.pageNum,
			type: jsonPath.method,
			data: {
				pageNum: this.state.pageNum,
				moneyType: this.state.moneyType,
				startTime: this.state.startTime,
				endTime: this.state.endTime
			},
			dataType: 'json',
			success: function(data) {
				$("." + mmhc.shadow1).css({
					"display": "none"
				});
				$("." + mmhc.shadow2).css({
					"display": "none"
				});
				/*判断数据加载成功失败*/
				if (data.flag == false) {
					alert("数据加载请求失败啦")
				} else {
					this.setState({
						infoData: data.rst
					}, function() {
						if (this.state.infoData == "") {
							$("." + mmhc.noneImg).addClass(mmhc.block);
						} else {
							$("." + mmhc.noneImg).removeClass(mmhc.block);
						}
					});


					if (this.state.pageNum == data.sumPageNum || data.sumPageNum == 0) {
						$('.' + mmhc.moreMess).css({
							"display": "none"
						});
					} else {
						$('.' + mmhc.moreMess).css({
							"display": "block"
						});
					}
				}
			}.bind(this),

			error: function() {
				$("." + mmhc.shadow1).css({
					"display": "none"
				});
				$("." + mmhc.shadow2).css({
					"display": "none"
				});
				alert("系统繁忙");

			}.bind(this)

		});
	}
}

export
default Main;