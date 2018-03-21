import React from 'react';
import {Form, DatePicker,Input} from 'antd';
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../utils/util';
import SearchTable from "../../../components/SearchTable/index";

class CaseSearchC extends React.Component{
	constructor() {
		super();
		this.state = {
			name:undefined,
			principal:undefined,
			time: [],
		}
	}
	componentDidMount() {
		let {name,principal,beginTime, endTime} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			name,
			principal,
			time: [initBeginTime, initEndTime]
		})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {name,principal,time} = values;
			let beginTime = time[0]?time[0].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			let endTime = time[1]?time[1].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			setSearchTerm({
				name,
				principal,
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			name:undefined,
			principal:undefined,
			time: [],
		})
	};
    render(){
	    let formItemLayout = {
		    colon:false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator},setTableH} = this.props;
	    let {name,principal,time} = this.state;
	    let myProps = {
		    setTableH,
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
	        <SearchTable {...myProps}>
		        <FormItem label="案件名称" {...formItemLayout}>
			        {getFieldDecorator("name", {
				        initialValue: name
			        })(
				        <Input placeholder="案件名称" style={{width: '100%'}}/>
			        )}
		        </FormItem>
		        <FormItem label="责任人" {...formItemLayout}>
			        {getFieldDecorator("principal", {
				        initialValue: principal
			        })(
				        <Input placeholder="如张三" style={{width: '100%'}}/>
			        )}
		        </FormItem>
		        <FormItem label="识别时间" {...formItemLayout}>
			        {getFieldDecorator("time", {
				        initialValue: time
			        })(
				        <RangePicker
					        showTime={{format: 'HH:mm'}}
					        format="YYYY-MM-DD HH:mm"
					        placeholder={['Start Time', 'End Time']}
				        />
			        )}
		        </FormItem>
	        </SearchTable>
        )
    }
}
export const CaseSearch = Form.create()(CaseSearchC);