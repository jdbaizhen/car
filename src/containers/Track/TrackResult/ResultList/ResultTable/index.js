import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../../../redux/actions/trackResult';
import MyTable from "../../../../../components/MyTable/index";
import imgIp from '../../../../../config/imgIp';

class ResultTable extends React.Component{
	handleDelete = (delIds) => {
		return this.props.delTableData(delIds)
	};
	render(){
	    let {details, loading, setTableH, getCount, count} = this.props;
	    getCount(count);
	    let myTableProps = {
		    count: details.length,
		    allCount: count,
		    data: details,
		    loading,
		    setTableH,
		    heightLess:40,
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
				    title: "匹配头像", dataIndex: "pic", width: 120, key: 'pic',
				    render: (text, record) => (
					    <img src={`${imgIp}${text}`} style={{width: '100px', borderRadius: '5px'}}/>
				    )
			    },
			    {
				    title: '相似度', dataIndex: 'similarity',
				    width: 100, key: 'similarity'
			    },
			    {
				    title: '地点', dataIndex: 'place',
				    width: 100, key: 'place'
			    },
			    {
				    title: '时间', dataIndex: 'time',
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
	state => ({...state.trackResultTableR}),
	action
)(ResultTable)