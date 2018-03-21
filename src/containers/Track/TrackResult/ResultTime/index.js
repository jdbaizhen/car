import React from 'react';
import {Layout,Timeline,Icon,Popover} from 'antd';
import {connect} from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import moment from 'moment';
import imgIp from '../../../../config/imgIp';

class ResultTime extends React.Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let {details}=this.props;
        let ary=cloneDeep(details)
        ary.sort((a,b)=>moment(a.time).isBefore(b.time));
        this.setState({
            data:ary
        })
	    console.log(this.refs);
    }
    render(){
        let {data}=this.state;
	    console.log(this.refs);
	    return(
            <Layout style={{backgroundColor:'#fff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)',padding:'0 15px'}}>
	            <div className="trackTimeC">
                    <div ref="trackTime" style={{position:'relative',top:'150px',left:'50%'}}>
                    <Timeline>
                        {data.map((item,index)=>(
                            <Timeline.Item
                                dot={
                                    <Popover
                                        visible={true}
                                        placement={index%2?"right":"left"}
                                        title={item.time}
                                        getPopupContainer={()=>(this.refs.trackTime)}
                                        content={
                                            <div className="trackTimeItem">
                                                    <img src={`${imgIp}${item.pic}`}/>

                                               <div>
                                                   <span>{item.place}</span>
                                                   <br/><span>相似度：<span className="trackSim">{item.similarity}</span></span>
                                               </div>
                                            </div>
                                        }
                                    >
                                        <Icon type="clock-circle-o" style={{ fontSize: '25px' }}/>
                                    </Popover>
                                }
                                color="blue"
                            >
                                <div style={{height:'165px'}}/>
                            </Timeline.Item>))
                        }
                    </Timeline>
                    </div>
                </div>
            </Layout>
        )
    }
}
import './index.less'
export default connect(
	state=>({...state.trackResultTableR})
)(ResultTime);