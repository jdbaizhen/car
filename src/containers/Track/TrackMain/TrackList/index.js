import React from 'react';
import {connect} from 'react-redux';
import {Button, Layout,Tag} from 'antd';
import {Link} from 'react-router-dom';
import imgIp from '../../../../config/imgIp';
import * as action from '../../../../redux/actions/track';
import MyTable from "../../../../components/MyTable/index";
import TrackForm from './TrackForm';

class TrackList extends React.Component{
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

    render(){
    	let trackStateWord=["等待执行","正在执行","已经完成","执行异常"];
	    let {details, loading, setTableH, getCount, count} = this.props;
	    let {handleAdd, handleEdit}=this.state;
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
				    title: "序号", dataIndex: "id", width: 50, key: 'id', render: (text, record) => (
				    details.findIndex(item => item === record) + 1
			    )
			    },
			    {
				    title: "目标图片", dataIndex: "searchNum", width: 120, key: 'imgData',className:'trackImg',
				    render: (text, record) => (
					    <img src={text.imgData[0].url} style={{width: '100px',height:'100px', borderRadius: '5px'}}/>
				    )
			    },
			    {
				    title: "查询条件", dataIndex: "searchNum", width:160, key: 'searchNum',
				    render: (text, record) => {
					    if(record.type){
						    return (
							    <div style={{width:'100%'}}>
								    <Tag color="blue" style={{marginBottom: '10px'}}>性别：{text.sex?'女':'男'}</Tag>
								    <Tag color="blue" style={{marginBottom: '10px'}}>相似度：{text.similarity}</Tag>
								    <Tag color="blue" style={{marginBottom: '10px'}}>年龄：{text.beginAge}~{text.endAge}</Tag>
								    <br/>
								    <Tag color="blue" style={{marginBottom: '10px',height: 'auto'}}>起止时间：<br/>从 {text.beginTime}<br/>至 {text.endTime}</Tag>
							    </div>
						    );
					   }else{
						    return(
							    <div style={{width:'100%'}}>
								    <Tag color="blue" style={{marginBottom: '10px'}}>车牌号：{text.plateNumber}</Tag>
								    <Tag color="blue" style={{marginBottom: '10px'}}>相似度：{text.similarity}</Tag>
								    <Tag color="blue" style={{marginBottom: '10px'}}>车标：{text.brand}</Tag>
								    <br/>
								    <Tag color="blue" style={{marginBottom: '10px',height: 'auto'}}>起止时间：<br/>从 {text.beginTime}<br/>至 {text.endTime}</Tag>
							    </div>
						    );
					   }
				    }
			    },
			    {
				    title: '创建时间', dataIndex: 'createTime',
				    width:100, key: 'createTime'
			    },
			    {
				    title: '状态更新时间', dataIndex: 'updateTime',
				    width: 100, key: 'updateTime'
			    },
			    {
				    title: '当前状态', dataIndex: 'trackState',
				    width: 60, key: 'trackState',
				    render: (text, record) => (trackStateWord[text])
			    },
			    {
				    title: "追查结果", dataIndex: "see", width: 50, key: 'see',
				    render: (text, record) => (
					    <Link to={{pathname:`/track/result/${record.id}/list`,state:{info:record}}}><Button type="primary" ghost icon="eye-o"/></Link>
				    )
			    },
			    {
				    title: "编辑", dataIndex: "edit", width: 50, key: 'edit',
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
	    return(
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
			    <TrackForm {...formProps}/>
		    </Layout>
        )
    }
}

export default connect(
	state => ({...state.trackTableR}),
	action
)(TrackList)