import React from 'react';
import {Form, DatePicker,Select} from 'antd';
let Option = Select.Option;
let FormItem = Form.Item;
import moment from 'moment';
import SearchTable from "../../../components/SearchTable/index";

class ChartSearchC extends React.Component{
	constructor() {
		super();
		this.state = {
			road:'锡沪路',
			time: moment(),
		}
	}
	componentDidMount() {
		let {date} = this.props;
			this.setState({
				time: moment(date,'YYYY-MM-DD')
			})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {time,road} = values;
			let date = time?time.format('YYYY-MM-DD'):moment().format('YYYY-MM-DD');
			setSearchTerm({
				road,
				date
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			road:'锡沪路',
			time: moment(),
		})
	};
    render(){
	    let formItemLayout = {
		    colon:false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator},roadData} = this.props;
	    let {time,road} = this.state;
	    let myProps = {
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
	        <SearchTable {...myProps}>
		        <FormItem label="道路" {...formItemLayout}>
			        {getFieldDecorator("road", {
				        initialValue: road
			        })(
				        <Select
					        style={{ width: 100 }}
					        showSearch
					        optionFilterProp="children"
				        >
					        {
					        	roadData.map(item=>(
							        <Option value={item.road}>{item.road}</Option>
						        ))
					        }
				        </Select>
			        )}
		        </FormItem>
		        <FormItem label="识别时间" {...formItemLayout}>
			        {getFieldDecorator("time", {
				        initialValue: time
			        })(
				        <DatePicker
					        format="YYYY-MM-DD"
				        />
			        )}
		        </FormItem>
	        </SearchTable>
        )
    }
}
export const ChartSearch= Form.create()(ChartSearchC);