import React from 'react';
import {connect} from 'react-redux';
import {Route, NavLink} from 'react-router-dom';
import {Layout, Card, Tag, Icon, List, Tooltip} from 'antd';
import Title from "../../../components/Title/index";
import * as action from '../../../redux/actions/trackResult';
import Sider from "antd/es/layout/Sider";


class TrackResult extends React.Component {
	constructor() {
		super();
		this.state = {
			title: undefined,
		}
	}

	componentDidMount() {
		let {match: {path}, location: {state: {info}}, setSearchId,getMapData} = this.props;
		setSearchId({id: info.id, info});
		getMapData({id: info.id,type:info.type})
		let key = path.split('/')[4];
		let titleWord = null;
		switch (key) {
			case 'list':
				titleWord = '列表视图';
			case 'map':
				titleWord = '轨迹视图';
			case 'time':
				titleWord = '时间轴视图';
			default:
				titleWord = '列表视图';
		}
		this.setState({
			title: titleWord
		});
	}
	setTitle=(val)=>{
		this.setState({
			title: val
		});
	}
	render() {
		let {routes, location: {state: {info}}, crossingNum} = this.props;
		let {title} = this.state;
		let {type, searchNum, id} = info;
		return (
			<Layout>
				<Title tier1="追查行踪" tier1Link="/track/main" tier2="结果展示" tier3={title}/>
				<Layout>
					<Sider style={{margin: '10px 10px 0 0', backgroundColor: 'rgb(240,242,245)'}} width={300}
					       className="trackResultC">
						<Card
							cover={<img alt="目标检索图片" src={info.searchNum.imgData[0].url}/>}
							actions={[(<Tooltip placement="top" title="列表视图">
								<NavLink to={{pathname: `/track/result/${id}/list`, state: {info}}}
								      className="trackLink"
								      onClick={()=>this.setTitle("列表视图")}
								>
									<Icon type="table"/>
								</NavLink>
							</Tooltip>),
								(<Tooltip placement="top" title="轨迹视图">
									<NavLink to={{pathname: `/track/result/${id}/map`, state: {info}}}
									      className="trackLink"
									      onClick={()=>this.setTitle("轨迹视图")}
									>
										<Icon type="environment"/>
									</NavLink>
								</Tooltip>),
								(<Tooltip placement="top" title="时间轴视图">
									<NavLink to={{pathname: `/track/result/${id}/time`, state: {info}}}
									      className="trackLink"
									      onClick={()=>this.setTitle("时间轴视图")}
									>
										<Icon type="clock-circle"/>
									</NavLink>
								</Tooltip>)]}
						>
							{type ? (
								<div style={{width: '100%'}}>
									<Tag color="blue"
									     style={{marginBottom: '10px'}}>性别：{searchNum.sex ? '女' : '男'}</Tag>
									<Tag color="blue" style={{marginBottom: '10px'}}>相似度：{searchNum.similarity}</Tag>
									<Tag color="blue"
									     style={{marginBottom: '10px'}}>年龄：{searchNum.beginAge}~{searchNum.endAge}</Tag>
									<br/>
									<Tag color="blue" style={{
										marginBottom: '10px',
										height: 'auto'
									}}>起止时间：<br/>从 {searchNum.beginTime}<br/>至 {searchNum.endTime}</Tag>
								</div>
							) : (
								<div style={{width: '100%'}}>
									<Tag color="blue" style={{marginBottom: '10px'}}>车牌号：{searchNum.plateNumber}</Tag>
									<Tag color="blue" style={{marginBottom: '10px'}}>相似度：{searchNum.similarity}</Tag>
									<Tag color="blue" style={{marginBottom: '10px'}}>车标：{searchNum.brand}</Tag>
									<br/>
									<Tag color="blue" style={{
										marginBottom: '10px',
										height: 'auto'
									}}>起止时间：<br/>从 {searchNum.beginTime}<br/>至 {searchNum.endTime}</Tag>
								</div>
							)}
						</Card>
						<Card title="行踪汇总" bordered={false} style={{marginTop: '10px'}}>
							<List
								itemLayout="horizontal"
								dataSource={crossingNum}
								renderItem={item => (
									<List.Item>
										<List.Item.Meta
											title={`匹配地点：${item.site}`}
											description={`匹配次数：${item.number}`}
										/>
									</List.Item>
								)}
							/>
						</Card>
					</Sider>
					{
						routes.map((route, i) => (
							<Route path={route.path} {...route.props} key={i} render={props => {
								return (
									<route.component history={props.history} location={props.location}
									                 routes={route.routes}/>
								)
							}}/>
						))
					}
				</Layout>
			</Layout>
		)
	}
}

import './index.less';

export default connect(
	state => ({...state.trackResultTermR, ...state.trackResultTableR}),
	action
)(TrackResult)