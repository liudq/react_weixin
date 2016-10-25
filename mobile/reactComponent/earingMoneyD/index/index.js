import React from 'react';
import ReactDom from 'react-dom';
import mmhc from './index.css';
import cNs from 'classnames';
// var echarts = require('echarts');
import echarts from 'echarts'
import askImg from './ask.png'
// import hideInf from './hide.png'

import jsonPath from '../../common/util/jsonPath.js';

var dateFormatDetailed = require("../../common/util/util.js").dateFormatDetailed;

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			infoData: []
		};
	}

	render() {
		return (
			<div>

		{ /*<div className={mmhc.htitle}><h2>赚钱</h2><a href="www.baidu.com">明细</a></div>*/ }
        <div className={cNs(mmhc.head,mmhc.clearfix)}>
        	<a href="interpretation"><img src={askImg} alt=""/></a>
          <div className={mmhc.allEarnings}>
          	
          	<p className={mmhc.earingsNo}>{this.state.infoData.yesterdayReturn}</p>
            <p>昨日返还(元)</p>
          </div>

          <div className={mmhc.earingsCon}>
            <div className={mmhc.earingsConL}>
              <p>{this.state.infoData.currentAllowance}</p>
              <p>当前积金(元)</p>
            </div>
            <div className={mmhc.earingsConR}> 
              <p>{this.state.infoData.sumReturn}</p>
              <p>累计返还(元)</p>
            </div>
          </div>
        </div>
       <div id="lineChart" className={mmhc.lineChart}></div>
    	</div>
		)
	}
	componentDidMount() {
		$.ajax({
			// url: jsonPath.path + '/getMemberAllowance.json',
			url: jsonPath.path + '/getH5UserAllowance.json',
			type: jsonPath.method,
			dataType: 'json',
			success: function(data) {
				if (data.flag == false) {
					alert("数据加载请求失败啦");
				} else {
					var myChart = echarts.init(document.getElementById('lineChart'));
					// 绘制图表
					var option = {
						title: {
							text: '七日返还'
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: []
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: []
						},
						yAxis: {
							type: 'value',
							axisLabel: {
								formatter: '{value}'
							}
						},
						series: {
							name: '返还积金',
							type: 'line',
							data: [],
							markPoint: {
								data: [{
									name: '昨日返还',
									value: '',
									xAxis: 6,
									yAxis: ''
								}]
							}
						}
					};

					if (data.yesterdayReturn == 0) {
						data.yesterdayReturn = "暂无返还";
					}
					this.setState({
						infoData: data
					});

					data.sevenReturnList.map(function(list, index) {
						// console.log(index);
						var time = dateFormatDetailed(list.createTime);
						// console.log(time);
						var time1 = time.split(' ')[0].split('-')
						var time2 = time1[1] + "." + time1[2];
						// console.log(time2)
						option.xAxis.data.push(time2);
						option.series.data.push(list.amount);

					})

					/*最近一次的收益 标记*/

					option.series.markPoint.data[0].value = data.sevenReturnList[6].amount;

					option.series.markPoint.data[0].yAxis = data.sevenReturnList[6].amount;

					myChart.setOption(option);
				}
			}.bind(this),
			error: function() {

				alert("系统繁忙");

			}.bind(this)
		});
	}
}

export
default Main;