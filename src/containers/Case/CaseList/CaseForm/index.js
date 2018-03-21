import React from 'react';
import {Modal, Form, Card, Row, Col, Input, InputNumber, DatePicker, Radio, TreeSelect, Upload,Button} from 'antd';
import {connect} from 'react-redux';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
let TreeNode = TreeSelect.TreeNode;
let SHOW_PARENT = TreeSelect.SHOW_PARENT;
import {handleMoment} from '../../../../utils/util';
import * as action from '../../../../redux/actions/case'
import {CaseImgUpload} from "./CaseImgUpload/index";
import MyModalForm from "../../../../components/MyModalForm/index";

class CaseFormC extends React.Component {
	constructor() {
		super();
		this.state = {
			flag: false,
			title: '',
			footer: true,
			handleSubmit: () => {
			},
			initData: {
				name: undefined,
				principal: undefined,
				phone: undefined,
				similarity: undefined,
				time: [],
				crossingData: [],
				level: undefined
			},
			loading: false,
			uploadList:[],
			disable:false
		}
	}
	getImgData=(uploadList)=>{
		this.setState({
			uploadList
		})
	};
	isLoading = (value) => {
		this.setState({
			loading: value
		})
	};
	handleCancel = () => {
		this.setState({
			flag: false,
			loading: false
		})
	};
	addSubmit = () => {
		let {form: {validateFields}, addTableData} = this.props;
		validateFields((err, values) => {
			if (!err) {
				this.isLoading(true);
				let {name, principal, phone, similarity, time, level, crossingData} = values;
				let beginTime = time && time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let endTime = time && time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				addTableData({
					name,
					principal,
					phone,
					similarity,
					level,
					beginTime,
					crossingData,
					endTime,
					imgData:this.state.uploadList
				}).then(data => {
					if (data.result) {
						// this.isLoading(false);
						Modal.success({
							title: '提交成功'
						});
						this.handleCancel();
					} else {
						this.isLoading(false);
						Modal.error({
							title: '提交失败',
							content: data.err
						})
					}
				});
			}
		})
	};
	handleAdd = () => {
		let {form: {resetFields}} = this.props;
		this.setState({
			flag: true,
			title: '新建案件',
			footer: true,
			handleSubmit: this.addSubmit,
			initData: {
				name: undefined,
				principal: undefined,
				phone: undefined,
				similarity: undefined,
				time: [],
				crossingData: [],
				level: undefined
			},
			loading: false,
			uploadList:[],
			disable:false
		},resetFields)
	};
	editSubmit=(id)=>{
		let {form: {validateFields}, editTableData} = this.props;
		validateFields((err, values) => {
			console.log(values)
			if (!err) {
				this.isLoading(true);
				let {name, principal, phone, similarity, time, level, crossingData} = values;
				let beginTime = time && time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let endTime = time && time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				editTableData({
					id,
					name,
					principal,
					phone,
					similarity,
					level,
					beginTime,
					crossingData,
					endTime,
					imgData:this.state.uploadList
				}).then(data => {
					if (data.result) {
						// this.isLoading(false);
						Modal.success({
							title: '提交成功'
						});
						this.handleCancel();
					} else {
						this.isLoading(false);
						Modal.error({
							title: '提交失败',
							content: data.err
						})
					}
				});
			}
		})
	};
	handleEdit = (id) => {
		let {getSeeData,form: {resetFields}} = this.props;
		getSeeData(id).then(data=>{

			if(data.result){
				let {name, principal, phone, similarity, time, level, crossingData,imgData,beginTime,endTime}=data.data;
				let initBeginTime = handleMoment(beginTime);
				let initEndTime = handleMoment(endTime);
                this.setState({
					flag: true,
					title: '修改案件',
					footer: true,
					handleSubmit: ()=>{this.editSubmit(id)},
					initData: {
						name,
						principal,
						phone,
						similarity,
						time: [initBeginTime, initEndTime],
						crossingData,
						level
					},
					loading: false,
					uploadList:JSON.parse(imgData),
					disable:false
				},resetFields)
			}else{
				Modal.error({
					title: '获取信息失败',
					content: data.err
				})
			}
		})
	};
	handleSee = (id) => {
		let {getSeeData,form: {resetFields}} = this.props;
		getSeeData(id).then(data=>{
			if(data.result){

				let {name, principal, phone, similarity, time, level, crossingData,imgData,beginTime,endTime}=data.data;

				let initBeginTime = handleMoment(beginTime);
				let initEndTime = handleMoment(endTime);
				this.setState({
					flag: true,
					title: '案件详情',
					footer: false,
					handleSubmit: ()=>{},
					initData: {
						name,
						principal,
						phone,
						similarity,
						time: [initBeginTime, initEndTime],
						crossingData,
						level
					},
					loading: false,
					uploadList:JSON.parse(imgData),
					disable:true
				},resetFields)
			}else{
				Modal.error({
					title: '获取信息失败',
					content: data.err
				})
			}
		})
	};

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			initData: {},
			uploadList:[]
		})
	};

	componentDidMount() {
		let {getAdd, getEdit, getSee} = this.props;
		getAdd(this.handleAdd);
		getEdit(this.handleEdit);
		getSee(this.handleSee);
	}

	render() {
		let {flag, title, footer, handleSubmit, initData,uploadList,disable} = this.state;
		let {form: {getFieldDecorator}, roadData} = this.props;
		let {name, principal, phone, similarity, time, level, crossingData} = initData;
		let formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 5},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 15},
			},
			colon: false
		};
		let modalFormProps = {
			width: 1000,
			flag,
			title,
			footer,
			handleSubmit,
			handleCancel: this.handleCancel,
			handleReset: this.handleReset
		};
		let treeSelectProps = {
			showSearch: true,
			dropdownStyle: {
				maxHeight: 400,
				overflow: 'auto'
			},
			size: 'large',
			dropdownMatchSelectWidth: false,
			treeDefaultExpandAll: true,
			showCheckedStrategy: SHOW_PARENT,
			placeholder: '请选择布控区域',
			treeCheckable: true,
			allowClear: true
		};
		let imgUploadProps={
			getImgData:this.getImgData,
			uploadList,
			disable
		};
		return (
			<MyModalForm {...modalFormProps}>
				<Row gutter={16}>
					<Col span={12}>
						<Card title="案件信息" bordered={false}>
							<FormItem label="案件名称" {...formItemLayout}>
								{getFieldDecorator("name", {
									initialValue: name,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请输入案件名称'
										}
									]
								})(
									<Input placeholder="案件名称" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="责任人" {...formItemLayout}>
								{getFieldDecorator("principal", {
									initialValue: principal,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请输入责任人'
										}
									]
								})(
									<Input placeholder="如张三" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="手机号" {...formItemLayout}>
								{getFieldDecorator("phone", {
									initialValue: phone,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请输入手机号'
										}
									]
								})(
									<Input placeholder="请输入手机号" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="相似度阈值" colon={formItemLayout.colon} {...formItemLayout}>
								{getFieldDecorator("similarity", {
									initialValue: similarity,
									trigger:disable?null:'onChange',
								})(
									<InputNumber
										min={0}
										max={1}
										step={0.01}
										placeholder={0.01}
									/>
								)}
							</FormItem>
							<FormItem label="有效时间" {...formItemLayout} wrapperCol={{
								xs: {span: 24},
								sm: {span: 19},
							}}>
								{getFieldDecorator("time", {
									initialValue: time,
									trigger:disable?null:'onChange',
								})(
									<RangePicker
										showTime={{format: 'HH:mm'}}
										format="YYYY-MM-DD HH:mm"
										placeholder={['生效时间', '失效时间']}
										style={{width: '100%'}}
									/>
								)}
							</FormItem>
							<FormItem label="响应等级" {...formItemLayout}>
								{getFieldDecorator("level", {
									initialValue: level,
									trigger:disable?null:'onChange',
								})(
									<RadioGroup>
										<RadioButton value={0}>一级</RadioButton>
										<RadioButton value={1}>二级</RadioButton>
										<RadioButton value={2}>三级</RadioButton>
										<RadioButton value={3}>四级</RadioButton>
									</RadioGroup>
								)}
							</FormItem>
						</Card>
					</Col>
					<Col span={6} style={{height: '482px'}}>
						<Card
							title="摄像头区域布控"
							bordered={false}
							style={{height: '100%'}}
						>
							<FormItem label="已选布控区域">
								{getFieldDecorator("crossingData", {
									initialValue: crossingData,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请选择布控区域'
										}
									]
								})(
									<TreeSelect {...treeSelectProps}>
										<TreeNode title='全部监控点' key="lane" value="lane">
											{
												roadData.map(
													(item, index) => (
														<TreeNode title={item.road} key={`${index}`}
														          value={item.road}>
															{
																item.crossings.map(
																	(ite, ind) => (
																		<TreeNode title={ite.name}
																		          key={`${index}-${ind}`}
																		          value={ite.name}/>
																	)
																)
															}
														</TreeNode>
													)
												)
											}
										</TreeNode>
									</TreeSelect>
								)}
							</FormItem>

						</Card>
					</Col>
					<Col span={6} style={{height: '482px'}}>
						<Card title="人员布控" bordered={false}>
							<CaseImgUpload {...imgUploadProps}/>
						</Card>
					</Col>
				</Row>
			</MyModalForm>
		)
	}
}

const CaseForm = Form.create()(CaseFormC);

export default connect(
	state => ({...state.mapDataR}),
	action
)(CaseForm)