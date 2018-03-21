import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';

import {connect} from 'react-redux';
import * as action from "../../../redux/actions/chart";

class ChartTable extends React.Component {
	constructor(){
		super();
		this.state={
			chart:{
				setOption:()=>{}
			}
		}
	}
	componentDidMount() {
		let {details, getData} = this.props;
		if (!details.length) {
			getData();
		}
		let myPie = echarts.init(document.getElementById('chart'));
		this.setState({
			chart:myPie
		});
		setTimeout(function () {
			myPie.resize();
		}, 0);
		window.addEventListener('resize', function () {
			myPie.resize();
		});
	}

	render() {
		let {road, date, details} = this.props;
		let ary = date.split('-');
		let option = {
			animation:true,
			title: {
				left: 'center',
				top: 0,
				text: `${ary[0]}年${ary[1]}月${ary[2]}日  ${road}高速`,
				textStyle:{
					fontSize:23,
					lineHeight:23
				},
				subtext: "各路口车流量数据统计",
				subtextStyle:{
					fontSize:18,
					color:'#888',
					lineHeight:25
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				animation:true,
				left: 'center',
				bottom: 0,
				data: details.map(item => item.crossing),
				textStyle:{
					fontSize:15
				}
			},
			toolbox: {
				itemSize: 20,
				top: 0,
				right: '4%',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},

					magicType: {type: ['line', 'bar','stack', 'tiled']},
					restore: {},
					saveAsImage: {}
				}
			},
			grid: {
				top:'10%',
				left: '3%',
				right: '4%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: ['0:00-2:00', '2:00-4:00', '4:00-6:00', '6:00-8:00', '8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-24:00']
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: details.map(item => (
				{
					type: 'line',
					// stack: '总量',
					areaStyle: {normal: {}},
					smooth: true,
					name: item.crossing,
					data: item.flow,
					// markPoint: {
					// 	data: [
					// 		{type: 'max', name: '最大值'},
					// 		{type: 'min', name: '最小值'}
					// 	]
					// },
					markLine: {
						data: [
							{type: 'average', name: '平均值'}
						]
					}
				}
			))
		};

			this.state.chart.setOption(option);
		return (
			<div ref="chartBox" style={{
				backgroundColor: 'transparent',
				display: 'flex',
				flexDirection: 'column',
				flex: '1 1 auto'
			}} id="chart"/>
		)
	}
}

export default connect(
	state => ({...state.chartTableR}),
	action
)(ChartTable);