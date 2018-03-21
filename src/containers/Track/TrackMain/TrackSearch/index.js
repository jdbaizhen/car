import React from 'react';
import {Form, DatePicker, Select} from 'antd';

let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../../utils/util';
import SearchTable from "../../../../components/SearchTable/index";

class TrackSearchC extends React.Component {
	constructor() {
		super();
		this.state = {
			trackState: 4,
			time: [],
		}
	}

	componentDidMount() {
		let {trackState, beginTime, endTime} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			trackState,
			time: [initBeginTime, initEndTime]
		})
	}

	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {trackState, time} = values;
			let beginTime = time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			let endTime = time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			setSearchTerm({
				trackState,
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			trackState: 4,
			time: [],
		})
	};

	render() {
		let formItemLayout = {
			colon: false,
			style: {padding: '0 5px', marginBottom: 0}
		};
		let {form: {getFieldDecorator}, setTableH} = this.props;
		let {trackState, time} = this.state;
		let myProps = {
			setTableH,
			searchFn: this.handleSearch,
			handleReset: this.handleReset
		};
		let stateWord=["等待执行","正在执行","已经完成","执行异常","不限"];
		return (
			<SearchTable {...myProps}>
				<FormItem label="状态" {...formItemLayout}>
					{getFieldDecorator("trackState", {
						initialValue: trackState
					})(
						<Select
							style={{width: 100}}
							optionFilterProp="children"
						>
							{
								stateWord.map((item,index)=>(
									<Option value={index} key={index}>{item}</Option>
								))
							}
						</Select>
					)}
				</FormItem>
				<FormItem label="创建时间" {...formItemLayout}>
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

export const TrackSearch = Form.create()(TrackSearchC);