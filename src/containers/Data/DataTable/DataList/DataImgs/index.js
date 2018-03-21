import React from 'react';
import {Layout, Card, Row, Col,Spin} from 'antd';
let {Sider} = Layout;
import imgIp from '../../../../../config/imgIp';

export default class DataImgs extends React.Component{
    render(){
    	let {loading,carPic,platePic,logoPic,driver}=this.props;
        return(
	        <Sider width={500} style={{backgroundColor: 'transparent', overflow: 'auto'}}>
		        <Spin spinning={loading}>
			        <Card hoverable
			              style={{marginBottom: '10px'}}
			              cover={<img src={`${imgIp}${carPic}`}/>}
			        >
				        <h4>卡口图片</h4>
			        </Card>
			        <Row align='middle'>
				        <Col span={8}>
					        <Card hoverable
					              style={{marginBottom: '10px'}}
					              cover={<img src={`${imgIp}${platePic}`}/>}
					        >
						        <h4>车牌</h4>
					        </Card>
					        <Card hoverable
					              style={{marginBottom: '10px'}}
					              cover={<img src={`${imgIp}${logoPic}`}/>}
					        >
						        <h4>车标</h4>
					        </Card>
				        </Col>
				        <Col span={16}>
					        <Card hoverable
					              style={{marginLeft: '10px',marginBottom:'10px'}}
					              cover={<img src={`${imgIp}${driver}`}/>}
					        >
						        <h4>驾驶人</h4>
					        </Card>
				        </Col>
			        </Row>
		        </Spin>
	        </Sider>
        )
    }
}