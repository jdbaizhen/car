import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../../../redux/actions/caseTable';
import MyTable from "../../../../../components/MyTable/index";
import imgIp from '../../../../../config/imgIp';

class CaseTableList extends React.Component{
    render(){
	    let {details, loading, getCount, count} = this.props;
	    getCount(count);
	    console.log(details);
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
			    {
				    title: "目标人物", dataIndex: "target", width: 115, key: 'target',
				    render: (text, record) => (
					    <img src={`${imgIp}${text}`} style={{width: '100px', borderRadius: '5px'}}/>
				    )
			    },
			    {
				    title: "视频头像", dataIndex: "img", width: 115, key: 'img',
				    render: (text, record) => (
					    <img src={`${imgIp}${text}`} style={{width: '100px', borderRadius: '5px'}}/>
				    )
			    },
			    {
				    title: '相似度', dataIndex: 'similarity',
				    width: 60, key: 'similarity'
			    },
			    {
				    title: '车道', dataIndex: 'name',
				    width: 100, key: 'name'
			    },
			    {
				    title: '发生地点', dataIndex: 'site',
				    width: 100, key: 'site'
			    },
			    {
				    title: '发生时间', dataIndex: 'time',
				    width: 100, key: 'time'
			    }

		    ]
	    };
        return(
	        <MyTable {...myTableProps}/>
        )
    }
}
export default connect(
	state => ({...state.caseTableTableR}),
	action
)(CaseTableList)