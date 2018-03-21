import React from 'react';
import {Layout} from 'antd';
import BMap from 'BMap';
import {connect} from 'react-redux';
import imgIp from '../../../../config/imgIp';
import pointImg from '../../../../common/images/track-map-point.gif';

class ResultMap extends React.Component{
	addInfo=(item,icon)=>{
		let {name,site,img,time,num}=item;
		let pt = new BMap.Point(site.lon, site.lat);
		let marker = new BMap.Marker(pt, {icon: icon});
		let infoContent=`<div class="result-map-info-box"><img src="${imgIp}${img}"><div><span><span class="map-info-key">最近出现时间：</span>${time}</span><br/><span><span class="map-info-key">出现次数：</span>${num}</span></div></div>`;
		marker.myInfoWindow=new BMap.InfoWindow(infoContent, {
			title: `<h4 class="result-map-info-title">${name}</h4>`
		});
		marker.addEventListener("mouseover", () => {
			this.mapB.openInfoWindow(marker.myInfoWindow, new BMap.Point(site.lon, site.lat));
		});
		this.mapB.addOverlay(marker);
		return pt
	};
	componentDidMount() {
		let map = new BMap.Map("my-track-map");
		map.centerAndZoom(new BMap.Point(120.36025,31.592519), 17);
		map.setCurrentCity("无锡");
		map.enableScrollWheelZoom(true);
		this.mapB = map;
		let {details}=this.props;
		let points=[];
		if(details.length>0){
			let myIcon = new BMap.Icon(pointImg, new BMap.Size(38, 47));
			points=details.map((item,index)=>this.addInfo(item,myIcon))
		}

		let polyline = new BMap.Polyline(points, {strokeColor:`rgb(58, 107, 219)`, strokeWeight:10, strokeOpacity:0.5});
		map.addOverlay(polyline)
	}
    render(){
        return(
            <Layout style={{backgroundColor:'transparent',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)',padding:'0 15px'}} id="my-track-map"/>
        )
    }
}
import './index.less'
export default connect(
	state => ({...state.trackResultMapR})
)(ResultMap)