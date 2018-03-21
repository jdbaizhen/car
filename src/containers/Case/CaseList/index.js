import React from 'react';
import {connect} from 'react-redux';
import {Button, Layout} from 'antd';
import imgIp from '../../../config/imgIp';
import * as action from '../../../redux/actions/case';
import MyTable from "../../../components/MyTable/index";
import CaseForm from './CaseForm';
import CaseTable from './CaseTable'

class CaseList extends React.Component {
	constructor(){
		super();
		this.state={
			handleAdd:()=>{},
			handleEdit:()=>{},
			handleSee:()=>{}
		}
	}
	componentDidMount() {
		let {details, getData} = this.props;
		if (!details.length) {
			getData();
		}
	}

	getFlag = (callback) => {
		this.isShow = callback;
	};
	setId = (info) => {
        let {setSearchId} = this.props;
		this.isShow(true);
		if (typeof info.id !=='undefined') {
			setSearchId({id: info.id, info});
		}
	};
	getAdd = (callback) => {
		this.setState({
			handleAdd:callback
		});
	};
	getEdit = (callback) => {
		this.setState({
			handleEdit:callback
		});
	};
	getSee = (callback) => {
		this.setState({
			handleSee:callback
		});
	};
	handleDelete = (delIds) => {
		return this.props.delTableData(delIds)
	};

	render() {
		let level = ["一级", "二级", "三级", "四级"];
		let {details, loading, setTableH, getCount, count} = this.props;
		let {handleAdd, handleEdit, handleSee}=this.state;
		getCount(count);
		let myTableProps = {
			count: details.length,
			allCount: count,
			data: details,
			loading,
			setTableH,
			heightLess: 60,
			isRowSelection: true,
			handleDelete: this.handleDelete,
			rowSelection: {},
			columns: [
				{
					title: "序号", dataIndex: "id", width: 30, key: 'id', render: (text, record) => (
					details.findIndex(item => item === record) + 1
				)
				},
				{
					title: "案件名称", dataIndex: "name", width: 70, key: 'name'
				},
				{
					title: "责任人", dataIndex: "principal", width: 50, key: 'principal'
				},
				{
					title: '手机号', dataIndex: 'phone',
					width: 60, key: 'phone'
				},
				{
					title: '相似度', dataIndex: 'similarity',
					width: 40, key: 'similarity'
				},
				{
					title: '生效时间', dataIndex: 'beginTime',
					width: 100, key: 'beginTime'
				},
				{
					title: '失效时间', dataIndex: 'endTime',
					width: 100, key: 'endTime'
				},
				{
					title: '响应等级', dataIndex: 'level',
					width: 40, key: 'level',
					render: (text, record) => (level[text])
				},
				{
					title: "告警信息", dataIndex: "warning", width: 60, key: 'warning',
					render: (text, record) => (
						<Button type="primary" ghost icon="warning"
						        onClick={() => this.setId(record)}/>
					)
				},
				{
					title: "详情", dataIndex: "see", width: 60, key: 'see',
					render: (text, record) => (
						<Button type="primary" ghost icon="eye-o"
						        onClick={() => handleSee(record.id)}/>
					)
				},
				{
					title: "编辑", dataIndex: "edit", width: 60, key: 'edit',
					render: (text, record) => (
						<Button type="primary" ghost icon="edit"
						        onClick={() => handleEdit(record.id)}/>
					)
				}

			]
		};
		let formProps = {
			getAdd: this.getAdd,
			getEdit: this.getEdit,
			getSee: this.getSee
		};
		return (
			<Layout>
				<MyTable {...myTableProps}>
					<Button icon="file-add"
					        size="small"
					        type="primary"
					        style={{marginLeft: '15px'}}
					        onClick={handleAdd}
					>
						新建
					</Button>
				</MyTable>
				<CaseForm {...formProps}/>
				<CaseTable getFlag={this.getFlag}/>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.caseTableR}),
	action
)(CaseList)