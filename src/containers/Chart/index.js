import React from 'react';
import {Layout, Modal} from 'antd';
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import ChartTable from "./ChartTable/index";
import {ChartSearch} from './ChartSearch';
import * as action from "../../redux/actions/chart";


class Chart extends React.Component {
	getData = (obj) => {
		let {getTableData} = this.props;
		let terms = {
			road: undefined,
			date: undefined,
			...obj
		};
		getTableData(terms).then(data => {
			if (!data.result) {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
	};

	componentWillReceiveProps(nextProps) {
		let {road, date} = nextProps;
		this.getData({
			road,
			date
		});
	}

	render() {
		let {road, date, setSearchTerm, roadData} = this.props;
		let tableProps = {
			road: road,
			date: date,
			getData: this.getData,
		};
		let searchProps = {
			road: road,
			date: date,
			roadData,
			setSearchTerm,
		};
		return (
			<Layout>
				<Title tier1="数据统计"/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<ChartSearch {...searchProps}/>
					<ChartTable {...tableProps}/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.mapDataR, ...state.chartTermR}),
	action
)(Chart)