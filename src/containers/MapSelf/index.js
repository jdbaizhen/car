import React from 'react';
import {Layout} from 'antd';
import BMap from 'BMap';
import {connect} from 'react-redux';

import camera1 from '../../common/images/web-camera-1.png';
import camera2 from '../../common/images/web-camera-2.png';
import Title from "../../components/Title/index";
import MyTree from "../../components/MyTree/index";
import MapTable from './MapTable';
import * as action from '../../redux/actions/mapself';

class MapSelf extends React.Component {
	constructor() {
		super();
		this.state = {
			activeTerm: {}
		}
	}
	getFlag=(callback)=>{
		this.isShow=callback;
	};
	setId = (e) => {
		if (e.target.className==='infoLink') {
			let {setSearchId} = this.props;
			let name = e.target.getAttribute('mapName');
			let id = e.target.getAttribute('mapId');
			this.isShow(true);
			if (id) {
				setSearchId({id, name});
			}
		}
	};
	getCrossing = (str) => {
		if (str[0]) {
			let ary = str[0].split('-');
			let {roadData} = this.props;
			let term = roadData[ary[0]]["crossings"][ary[1]];
			this.setState({
				activeTerm: {...term}
			})
		} else {
			this.mapB.removeOverlay(this.activeCrossing);
			this.setState({
				activeTerm: {}
			})
		}
	};
	addCrossing = (item, icon) => {
		let {name, lane} = item;
		let site={
			lon:item.lane[0].x,
			lat:item.lane[0].y
		}
		let pt = new BMap.Point(site.lon, site.lat);
		let marker = new BMap.Marker(pt, {icon: icon});
		let infoContent = `<div id="setIdInfoBox">`;
		lane.map((ite, ind) => {
			infoContent += `<div class="infoLink" mapName="${name} / 第${ind + 1}车道" mapId="${ite.id}">>&nbsp;&nbsp;第${ind + 1}车道识别记录</div>`
		});
		infoContent += '</div>';
		marker.myInfoWindow = new BMap.InfoWindow(infoContent, {
			title: `<h4 class="infoTitle">${name}</h4>`
		});
		marker.addEventListener("click", () => {
			this.mapB.openInfoWindow(marker.myInfoWindow, new BMap.Point(site.lon, site.lat));
			document.getElementById('setIdInfoBox').addEventListener("click", this.setId);
		});
		this.mapB.addOverlay(marker);
		return marker;
	};

	componentDidMount() {
		let map = new BMap.Map("my-map");
		map.centerAndZoom(new BMap.Point(120.36025,31.592519), 17);
		map.setCurrentCity("无锡");
		map.enableScrollWheelZoom(true);
		this.mapB = map;
		let {roadData} = this.props;
		if (roadData.length > 0) {
			let myIcon = new BMap.Icon(camera1, new BMap.Size(38, 47));
			roadData.map(item => {
				item.crossings.map(ite => {
					this.addCrossing(ite, myIcon);
				})
			});
		}
	}

	componentWillReceiveProps(newProps) {
		let {roadData} = this.props;
		if (!roadData.length) {
			let {roadData} = newProps;
			if (roadData.length > 0) {
				let myIcon = new BMap.Icon(camera1, new BMap.Size(38, 47));
				roadData.map(item => {
					item.crossings.map(ite => {
						this.addCrossing(ite, myIcon);
					})
				});
			}
		}
	}

	componentWillUpdate(newProps, newState) {
		let {activeTerm} = newState;
		if (activeTerm.lane) {
			let lon=activeTerm.lane[0].x;
			let lat=activeTerm.lane[0].y;
			if (this.activeCrossing) {
				this.mapB.removeOverlay(this.activeCrossing)
			}
			let icon = new BMap.Icon(camera2, new BMap.Size(38, 47));
			this.activeCrossing = this.addCrossing(newState.activeTerm, icon)
		}
	}

	render() {
		let {roadData} = this.props;
		let treeProps = {
			title:'摄像点列表',
			data: roadData,
			treeNum: 2,
			callback: this.getCrossing,
			defaultSelectedKeys:[],
			myStyle: {
				margin: '6px',
				position: 'absolute',
				top: '60px',
				right: '10px',
				zIndex: '10'
			}
		};
		return (
			<Layout style={{position: 'relative', top: '0', right: '0'}}>
				<Title tier1='实时监控'/>
				<MyTree {...treeProps}/>
				<Layout id="my-map"/>
				<MapTable getFlag={this.getFlag}/>
			</Layout>
		)
	}
}

import './index.less'

export default connect(
	state => ({...state.mapDataR}),
	action
)(MapSelf)