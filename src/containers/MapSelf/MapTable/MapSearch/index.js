import React from 'react';
import {Form, DatePicker} from 'antd';
import SearchTable from "../../../../components/SearchTable/index";
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../../utils/util';

class MapSearchC extends React.Component{
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		time: [],
	// 	}
	// }
	componentDidMount() {
		let {getResetForm,form:{resetFields}}=this.props;
		getResetForm(resetFields)
	// 	let {beginTime, endTime} = this.props;
	// 	let initBeginTime = handleMoment(beginTime);
	// 	let initEndTime = handleMoment(endTime);
	// 	this.setState({
	// 		time: [initBeginTime, initEndTime]
	// 	})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {time} = values;
			let beginTime = time&&time[0]?time[0].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			let endTime = time&&time[1]?time[1].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			setSearchTerm({
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		// this.setState({
		// 	beginTime: undefined,
		// 	endTime: undefined
		// })
	};
	render(){
		let formItemLayout = {
			colon:false,
			style: {padding: '0 5px', marginBottom: 0}
		};
		let {form: {getFieldDecorator},setTableH} = this.props;
		// let {time} = this.state;
		let myProps = {
			setTableH,
			searchFn: this.handleSearch,
			handleReset: this.handleReset
		};
		return (
			<SearchTable {...myProps}>
				<FormItem label="识别时间" {...formItemLayout}>
					{getFieldDecorator("time", {
						// initialValue: time
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
export const MapSearch = Form.create()(MapSearchC);