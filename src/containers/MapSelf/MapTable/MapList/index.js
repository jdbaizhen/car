import React from 'react';
import {connect} from 'react-redux';

import MyTable from "../../../../components/MyTable/index";
import * as action from '../../../../redux/actions/mapself'

class MapList extends React.Component {
	render() {
		let {details, loading, getCount, count} = this.props;
		getCount(count);

		let myTableProps = {
			count: details.length,
			allCount: count,
			data: details,
			loading,
			heightLess:40,
			isRowSelection: false,
			rowSelection:null,
			columns: [
				{
					title: "序号", dataIndex: "id", width: 30, key: 'id', render: (text, record) => (
					details.findIndex(item => item === record) + 1
				)
				},
				// {
				// 	title: "位置", dataIndex: "site", width: 100, key: 'site'
				// },
				{
					title: '识别时间', dataIndex: 'time',
					width: 100, key: 'time'
				},
				{
					title: '号牌', dataIndex: 'plateNumber',
					width: 100, key: 'plateNumber'
				},
				{
					title: '车辆品牌', dataIndex: 'brand',
					width: 60, key: 'brand'
				}

			]
		};
		return (
			<MyTable {...myTableProps}/>
		)
	}
}

export default connect(
	state => ({...state.mapTableR}),
	action
)(MapList)