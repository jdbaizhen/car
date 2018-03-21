import React from 'react';
import {Table,Modal, Alert, Popconfirm,Button,Layout} from 'antd';

export default class MyTable extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedRowKeys: [],
			selectedData: [],
			tableH: 0,
			tableW: 0
		}
	}

	componentDidMount() {
		setTimeout(this.setTableH, 0);
		window.addEventListener('resize',this.setTableH);
		if(this.props.setTableH){
			this.props.setTableH(this.setTableH);
		}
	}

	setTableH = () => {
		let {heightLess}=this.props;
		let tableH = parseFloat(getComputedStyle(this.refs.tableH)['height']) - heightLess;
		let tableW = parseFloat(getComputedStyle(this.refs.tableH)['width']);
		this.setState({
			tableH,
			tableW
		})
	};

	render() {
		let {tableH, selectedRowKeys, selectedData, tableW} = this.state;
		let {data, columns, loading, isRowSelection, count, handleDelete,allCount,rowSelection} = this.props;
		let myRowSelection = {};
		if (isRowSelection) {
			myRowSelection = {
				type: 'checkbox',
				selectedRowKeys,
				onChange: (rowKeys, rows) => {
					this.setState({
						selectedRowKeys: rowKeys,
						selectedData: rows.map(item => item.id)
					})
				},
				selections: true
			};
		}
		return (
			<Layout style={{padding: '10px', backgroundColor: '#ffffff'}}>
				{isRowSelection ? (
					<div style={{paddingBottom: '10px', backgroundColor: '#ffffff',height:'50px'}}>
						<Alert message={
							<div>
								<span style={{lineHeight: '24px'}}>
									已选择
									<span style={{color: '#1890ff', padding: '0 5px'}}>{selectedData.length}</span>
									项 / 当前页
									<span style={{color: '#1890ff', padding: '0 5px'}}>{count}</span>
									项 / 总共
									<span style={{color: '#1890ff', padding: '0 5px'}}>{allCount}</span>
									项
									</span>
									<Popconfirm title={`确认删除这${selectedData.length}项吗`}
									            onConfirm={() => {
										            handleDelete([...selectedData]).then(data => {
											            if(data.result){
												            this.setState({
													            selectedRowKeys: [],
													            selectedData: []
												            })
											            }else{
										            		Modal.error({
													            title:'未能成功删除数据',
													            content:data.err
												            })
											            }
										            })
									            }}>
										<Button icon="delete"
										        size="small"
										        type="primary"
										        style={{marginLeft: '30px'}}>
											批量删除
										</Button>
									</Popconfirm>
									{this.props.children}
							</div>
						}
						       type="info" showIcon style={{height: '42px'}}/>
					</div>
				) : (
					<div style={{paddingBottom: '10px', backgroundColor: '#ffffff',height:'50px'}}>
						<Alert message={
							<div>
								<span style={{lineHeight: '24px'}}>
									当前页
									<span style={{color: '#1890ff', padding: '0 5px'}}>{count}</span>
									项 / 总共
									<span style={{color: '#1890ff', padding: '0 5px'}}>{allCount}</span>
									项
								</span>
								{this.props.children}
							</div>
						}
						       type="info" showIcon style={{height: '42px'}}/>
				</div>
				)}
				<div ref="tableH"
				     style={{
					     backgroundColor: 'transparent',
					     display: 'flex',
					     flexDirection: 'column',
					     flex: '1 1 auto'
				     }}>
					<Table
						rowSelection={isRowSelection ?{...rowSelection,...myRowSelection}: rowSelection}
						dataSource={data}
						columns={columns}
						loading={loading}
						scroll={this.props.setTableH?{y: tableH}:{}}
						size="middle"
						pagination={false}

					/>
				</div>
			</Layout>
		)
	}
}
