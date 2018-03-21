import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd';
import * as action from '../../../redux/actions/mapself';
import MapList from './MapList';
import {MapSearch} from './MapSearch';
import MyPagination from "../../../components/MyPagination/index";

class MapTable extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			count: 0,
			flag: false
		}
	}

	handleShow = (value) => {
		this.setState({
			flag: value
		});
	};

	isLoading(value) {
		this.setState({loading: value})
	}

	getCount = (num) => {
		this.setState({
			count: num
		})
	};
	getData = (obj) => {
		let terms = {
			id: undefined,
			pageIndex: 1,
			pageSize: 10,
			beginTime: undefined,
			endTime: undefined,
			...obj
		};
		this.isLoading(true);
		this.props.getTableData(terms).then(data => {
			if (data.result) {
				this.isLoading(false);
			} else {
				this.isLoading(false);
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
	};

	componentDidMount() {
		let {getFlag} = this.props;
		getFlag(this.handleShow);
	}

	componentWillReceiveProps(nextProps) {
		let {id, beginTime, endTime, pageSize, pageIndex} = nextProps;
		this.getData({
			id,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}

	getResetForm = (callback) => {
		this.resetForm = callback
	};

	render() {
		let {loading, count, flag} = this.state;
		let {name, beginTime, endTime, setSearchTerm, pageIndex, setPage} = this.props;
		let searchProps = {
			getResetForm: this.getResetForm,
			beginTime,
			endTime,
			setSearchTerm,
		};
		let tableProps = {
			loading,
			getData: this.getData,
			getCount: this.getCount,
		};
		let pagitionProps = {
			count,
			setPage,
			pageIndex,
			isShowSizeChanger: false
		};
		return (
			<Modal
				visible={flag}
				title={`${name} / 识别记录`}
				footer={<MyPagination {...pagitionProps}/>}
				maskClosable={false}
				style={{top: 30, bottom: 30}}
				width={1200}
				onCancel={() => {
					this.resetForm();
					this.handleShow(false)
				}}
			>
				<MapSearch {...searchProps}/>
				<MapList {...tableProps}/>
			</Modal>
		)
	}
}

export default connect(
	state => ({...state.mapTermR}),
	action
)(MapTable)