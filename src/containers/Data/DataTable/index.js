import React from 'react';
import {Layout,Modal} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/data';
import {DataSearch} from './DataSearch';
import DataList from './DataList';
import MyPagination from "../../../components/MyPagination/index";

class DataTable extends React.Component{
	constructor(){
		super();
		this.state={
			loading:false,
			setTableH:()=>{},
			count:0
		}
	}
	isLoading(value){
		this.setState({loading:value})
	}
	getCount=(num)=>{
		this.setState({
			count:num
		})
	};
	setTableH=(fn)=>{
		this.setState({setTableH:fn});
	};
	getData=(obj)=>{
		let terms={
			id:undefined,
			pageIndex:1,
			pageSize:10,
			beginTime:undefined,
			endTime:undefined,
			...obj
		};
		this.isLoading(true);
		this.props.getTableData(terms).then(data=>{
			if(data.result){
				this.isLoading(false);
			}else{
				this.isLoading(false);
				Modal.error({
					title:'未能成功获取数据',
					content:data.err
				})
			}
		})
	};
	componentWillReceiveProps(nextProps){
		let {id,beginTime, endTime,pageSize,pageIndex}=nextProps;
		this.getData({
			id,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}
    render(){
	    let {loading,setTableH,count}=this.state;
	    let {beginTime,endTime,setSearchTerm,pageIndex,setPage}=this.props;
	    let tableProps={
		    setTableH:this.setTableH,
		    loading,
		    getData:this.getData,
		    getCount:this.getCount,
	    };
	    let searchProps={
		    beginTime,
		    endTime,
		    setSearchTerm,
		    setTableH
	    };
	    let pagitionProps={
		    count,
		    setPage,
		    pageIndex,
		    isShowSizeChanger:false
	    };
        return(
            <Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)',padding:'0 15px'}}>
	            <div style={{paddingLeft:'130px'}}>
		            <DataSearch {...searchProps}/>
	            </div>
	            <DataList {...tableProps}/>
	            <MyPagination {...pagitionProps}/>
            </Layout>
        )
    }
}
export default connect(
	state=>({...state.dataTermR}),
	action
)(DataTable);