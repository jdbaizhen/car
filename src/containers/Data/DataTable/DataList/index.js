import React from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import * as action from '../../../../redux/actions/data';
import MyTable from "../../../../components/MyTable/index";
import imgIp from '../../../../config/imgIp';
import DataImgs from "./DataImgs/index2";


class DataList extends React.Component {
	componentDidMount() {
		let {details, getData,roadData} = this.props;
		if (!details.length) {
			getData({id:1,pageSize: 10, pageIndex: 1})
		}
	}
	render() {
		let {details, loading, setTableH, getCount, count, selectedRowKey, getImages} = this.props;
		let carPic='';
			let logoPic='';
			let platePic='';
			let driver='';
		if(details[selectedRowKey]){
			carPic=details[selectedRowKey].carPic;
			logoPic=details[selectedRowKey].logoPic;
			platePic=details[selectedRowKey].platePic;
			driver=details[selectedRowKey].driver;
		}
		let myImgsProps={
			loading,
			carPic,
			logoPic,
			platePic,
			driver
		};
		getCount(count);
		let myTableProps = {
			count: details.length,
			allCount: count,
			data: details,
			loading,
			setTableH,
			heightLess:60,
			isRowSelection: false,
			rowSelection: {
				type: 'radio',
				selectedRowKeys:[selectedRowKey],
				onChange: (selectedRowKeys, selectedRows) => {
					getImages(selectedRowKeys[0]);
				}
			},
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
					title: "卡口图片", dataIndex: "carPic", key: 'carPic', width: 120,
					render: (text, record) => (
						<img src={`${imgIp}${text}`} style={{width: '100px', borderRadius: '5px'}}/>
					)
				},
				{
					title: '识别时间', dataIndex: 'time',
					width: 120, key: 'time'
				},
				{
					title: '号牌', dataIndex: 'plateNumber',
					width: 110, key: 'plateNumber'
				},
				{
					title: '车辆品牌', dataIndex: 'brand',
					width: 110, key: 'brand'
				},
				{
					title: "车标", dataIndex: "logoPic", key: 'logoPic', width: 100,
					render: (text, record) => (
						<img src={`${imgIp}${text}`} style={{width: '50px', borderRadius: '5px'}}/>
					)
				},
				{
					title: "车辆前遮挡物", dataIndex: "platePic", key: 'platePic', width: 120,
					render: (text, record) => (
						<img src={`${imgIp}${text}`} style={{width: '100px', borderRadius: '5px'}}/>
					)
				},
				{
					title: "驾驶人行为识别", dataIndex: "driver", key: 'driver', width: 110,
					render: (text, record) => (
						<img src={`${imgIp}${text}`} style={{width: '100px', borderRadius: '5px'}}/>
					)
				},
			]
		};
		return (
			<Layout>
				<DataImgs {...myImgsProps}/>
				<MyTable {...myTableProps}/>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.dataTableR,...state.mapDataR}),
	action
)(DataList);