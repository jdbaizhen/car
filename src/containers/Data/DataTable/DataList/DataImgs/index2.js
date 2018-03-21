import React from 'react';
import {Layout, Row, Col,Spin,Tag,Badge} from 'antd';
let {Sider} = Layout;
import imgIp from '../../../../../config/imgIp';


export default class DataImgs extends React.Component{
    render(){
	    let {loading,carPic,platePic,logoPic,driver}=this.props;
        return(
            <Sider width={330} style={{backgroundColor:'#fff', overflow: 'auto'}}>
                <Spin spinning={loading}>
                    <Row align='middle' type="flex" style={{padding:'0 10px'}}>
                        <Col span={24}>
                            <Badge count='卡口图片' style={{backgroundColor: `rgba(9,109,217,0.5)`,color:'#fff',borderColor:'#096dd9',borderRadius:'4px',fontSize:'16px',lineHeight:'24px',height:'24px'}} offset={[20,-50]}>
                            <img src={`${imgIp}${carPic}`} style={{width:'100%',borderRadius:'10px'}}/>
                            </Badge>
                        </Col>
                    </Row>
                    <Row align='middle'  type="flex" style={{padding:'10px'}}>
                        <Col span={24}>
                            <Layout>
                                <Badge count='驾驶人' style={{backgroundColor: `rgba(9,109,217,0.5)`,color:'#fff',borderColor:'#096dd9',borderRadius:'4px',fontSize:'16px',lineHeight:'24px',height:'24px'}} offset={[20,-40]}>
                                    <img src={`${imgIp}${driver}`} style={{width:'100%',borderRadius:'10px'}}/>
                                </Badge>
                            </Layout>
                        </Col>
                    </Row>
                    <Row align='middle' type="flex" justify="space-between" style={{padding:'20px 10px 0'}}>
                        <Col span={17}>
                            <Layout>
                            <Badge count='车牌' style={{backgroundColor: `rgba(9,109,217,0.75)`,color:'#fff',borderColor:'#096dd9',borderRadius:'4px',fontSize:'16px',lineHeight:'24px',height:'24px'}} offset={[-13,-25]}>

                                    <img src={`${imgIp}${platePic}`}style={{width:'100%',borderRadius:'10px 0 10px 10px'}}/>

                            </Badge>
                            </Layout>
                        </Col>
                        <Col span={6} offset={1}>
                            <Layout>
                                <Badge count='车标' style={{backgroundColor: `rgba(9,109,217,0.75)`,color:'#fff',borderColor:'#096dd9',borderRadius:'4px',fontSize:'16px',lineHeight:'24px',height:'24px'}} offset={[-13,-25]}>

                                    <img src={`${imgIp}${logoPic}`} style={{width:'100%',borderRadius:'10px 0 10px 10px'}}/>

                                </Badge>
                            </Layout>
                        </Col>
                    </Row>

                </Spin>
            </Sider>
        )
    }
}