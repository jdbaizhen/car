import React from 'react';
import {Layout,Modal} from 'antd';
import Title from "../../../components/Title/index";
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/track';
import {TrackSearch} from './TrackSearch';
import TrackList from './TrackList';
import MyPagination from "../../../components/MyPagination/index";

class TrackMain extends React.Component{
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
			pageIndex:1,
			pageSize:10,
			trackState:4,
			beginTime: undefined,
			endTime: undefined,
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
		let {trackState,beginTime, endTime,pageSize,pageIndex}=nextProps;
		this.getData({
			trackState,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}
	render(){
		let {loading,setTableH,count}=this.state;
		let {trackState,beginTime,endTime,setSearchTerm,pageIndex,setPage}=this.props;
		let tableProps={
			setTableH:this.setTableH,
			loading,
			getData:this.getData,
			getCount:this.getCount,
		};
		let searchProps={
			trackState,
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
			<Layout>
				<Title tier1="追查行踪"/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)',padding:'0 15px'}}>
					<TrackSearch {...searchProps}/>
					<TrackList {...tableProps}/>
					<MyPagination {...pagitionProps}/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state=>({...state.trackTermR}),
	action
)(TrackMain)

// ["等待执行","正在执行","已经完成","执行异常","不限"]


// ["黄","黑","白","棕"]
// ["胖","标准","瘦"]
// ["长发","短发","光头"]
// ["白","灰","黑","红","蓝","黄","绿","其他"]

// ["轿车","小型卡车","重型卡车","货车","挂车","客车"]

//['车','人']