import React from 'react';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import MyTree from "../../components/MyTree/index";
import DataTable from './DataTable';
import * as action from '../../redux/actions/data';

class Data extends React.Component {
	handleSetId=(str)=>{
		if (str[0]) {
			let ary = str[0].split('-');
			let {roadData,setSearchId} = this.props;
			let term = roadData[ary[0]]["crossings"][ary[1]].lane[ary[2]];
			setSearchId(term.id,str[0])
		}
	};
	render() {
		let {roadData,selectedKey} = this.props;

		let treeProps = {
			title:'选择车道摄像头',
			data: roadData,
			treeNum: 3,
			callback: this.handleSetId,
			maxHeight:'90%',
			defaultSelectedKeys:[selectedKey],
			myStyle: {
				margin: '6px',
				position: 'absolute',
				top: '21px',
				left: '10px',
				zIndex: '10'
			}
		};
		return (
			<Layout>
				<Title tier1='数据管理'/>
				<Layout style={{
					position: 'relative',
					top: '0',
					left: '0'
				}}>
					<MyTree {...treeProps}/>
					<DataTable/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.mapDataR,selectedKey:state.dataTermR.selectedKey,id:state.dataTermR.id}),
	action
)(Data)