import React from 'react';
import moment from 'moment';
import {Modal, Form, Card, Row, Col, Input, InputNumber, DatePicker, Radio, TreeSelect,Icon, Tabs,Slider,Select,Layout} from 'antd';
import {connect} from 'react-redux';
let TabPane = Tabs.TabPane;
let RadioButton = Radio.Button;
let RadioGroup = Radio.Group;
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
let TreeNode = TreeSelect.TreeNode;
let SHOW_PARENT = TreeSelect.SHOW_PARENT;
import {handleMoment} from '../../../../../utils/util';
import * as action from '../../../../../redux/actions/track';
import glassImg from '../../../../../common/images/dl.png';
import MyModalForm from "../../../../../components/MyModalForm/index";
import TrackImgUpload from "./TrackImgUpload/index";


class TrackFormC extends React.Component {
	constructor() {
		super();
		this.state = {
			flag: false,
			title: '',
			footer: true,
			handleSubmit: () => {
			},
			initData: {
				type: 1,
				searchNum: {}
			},
			loading: false,
			uploadList: [],
			disable: false
		}
	}
	getImgData = (uploadList) => {
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
				let {type,crossingData,time,similarity}=values;
				let beginTime = time && time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let endTime = time && time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let obj={
					type,
					searchNum:{
						similarity,
						beginTime,
						crossingData,
						endTime,
						imgData:this.state.uploadList
					}
				};
				if(type){
					let {age,cap,sex,skin,posture,hair,clothesColor,action,glasses} = values;
					obj.searchNum={
						...obj.searchNum,
						beginAge:age[0],
						endAge:age[1],
						cap,
						sex,
						skin,
						posture,
						hair,
						clothesColor,
						action,
						glasses
					};

				}else{
					let {carType,brand,plateNumber,color} = values;
					obj.searchNum={
						...obj.searchNum,
						carType,
						brand,
						plateNumber,
						color
					}
				}
				addTableData(obj).then(data => {
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
			title: '新建追查条件',
			footer: true,
			handleSubmit: this.addSubmit,
			initData: {
				type: 1,
				searchNum: {
					age:[1,100]
				}
			},
			loading: false,
			uploadList: [],
			disable: false
		}, resetFields)
	};
	editSubmit=(id)=>{
		let {form: {validateFields}, editTableData} = this.props;
		validateFields((err, values) => {
			if (!err) {
				this.isLoading(true);
				let {type,crossingData,time,similarity}=values;
				let beginTime = time && time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let endTime = time && time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let obj={
					id,
					type,
					searchNum:{
						similarity,
						beginTime,
						crossingData,
						endTime,
						imgData:this.state.uploadList
					}
				};
				if(type){
					let {age,cap,sex,skin,posture,hair,clothesColor,action,glasses} = values;
					obj.searchNum={
						...obj.searchNum,
						beginAge:age[0],
						endAge:age[1],
						cap,
						sex,
						skin,
						posture,
						hair,
						clothesColor,
						action,
						glasses
					};
				}else{
					let {carType,brand,plateNumber,color} = values;
					obj.searchNum={
						...obj.searchNum,
						carType,
						brand,
						plateNumber
					}
				}
				editTableData(obj).then(data => {
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
				let {type,searchNum:{similarity,beginTime,crossingData,endTime, imgData}}=data.data;
				let initBeginTime = handleMoment(beginTime);
				let initEndTime = handleMoment(endTime);
				let searchNum={
					crossingData,
					similarity,
					time:[initBeginTime,initEndTime]
				};
				if(type){
					let {searchNum:{beginAge,endAge,cap,sex,skin,posture,hair,clothesColor,action,glasses}}=data.data;
					searchNum={
						...searchNum,
						age:beginAge&&endAge?[beginAge,endAge]:[1,100],
						cap,
						sex,
						skin,
						posture,
						hair,
						clothesColor,
						action,
						glasses
					}
				}else{
					let {searchNum:{carType,brand,plateNumber,color}}=data.data;
					searchNum={
						age:[],
						...searchNum,
						carType,
						brand,
						plateNumber,
						color
					}
				}
				this.setState({
					flag: true,
					title: '修改追查条件',
					footer: true,
					handleSubmit: ()=>{this.editSubmit(id)},
					initData:{
						type,
						searchNum
					},
					loading: false,
					uploadList:imgData,
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
				let {type,searchNum:{similarity,beginTime,crossingData,endTime, imgData}}=data.data;
				let initBeginTime = handleMoment(beginTime);
				let initEndTime = handleMoment(endTime);
				let searchNum={
					crossingData,
					similarity,
					time:[initBeginTime,initEndTime]
				};
				if(type){
					let {searchNum:{beginAge,endAge,cap,sex,skin,posture,hair,clothesColor,action,glasses}}=data.data;
					searchNum={
						...searchNum,
						age:beginAge&&endAge?[beginAge,endAge]:[1,100],
						cap,
						sex,
						skin,
						posture,
						hair,
						clothesColor,
						action,
						glasses
					}
				}else{
					let {searchNum:{carType,brand,plateNumber,color}}=data.data;
					searchNum={
						age:[],
						...searchNum,
						carType,
						brand,
						plateNumber,
						color
					}
				}
				this.setState({
					flag: true,
					title: '追查条件详情',
					footer: false,
					handleSubmit: ()=>{this.editSubmit(id)},
					initData:{
						type,
						searchNum
					},
					loading: false,
					uploadList:imgData,
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
			initData: {
				type: 1,
				searchNum: {
					age:[]
				}
			},
			uploadList: []
		})
	};

	componentDidMount() {
		let {getAdd, getEdit, getSee} = this.props;
		getAdd(this.handleAdd);
		getEdit(this.handleEdit);
		getSee(this.handleSee);
	}

	render() {
		let {flag, title, footer, handleSubmit, initData, uploadList, disable} = this.state;
		let {form: {getFieldDecorator}, roadData} = this.props;
		let {type, searchNum} = initData;
		console.log(searchNum);
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
			myStyle:{top:10},
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
		let imgUploadProps = {
			getImgData: this.getImgData,
			uploadList,
			disable
		};
		let trackStateWord = ["等待执行", "正在执行", "已经完成", "执行异常"];
		let typeWord = ['车辆', '人脸'];
		let carTypeWord = ["轿车", "小型卡车", "重型卡车", "货车", "挂车", "客车"];
		let skinWord = ["黄", "黑", "白", "棕"];
		let postureWord = ["胖", "标准", "瘦"];
		let hairWord = ["长发", "短发", "光头"];
		let colourWord = ["白", "灰", "黑", "红", "蓝", "黄", "绿", "其他"];
		let actionWord = ["抽烟", "打电话", "玩手机", "未系安全带", "未有"];
		return (
			<MyModalForm {...modalFormProps}>
				<Row gutter={16}>
					<Col span={12} style={{backgroundColor:'#ffffff',height:'780px'}}>
						<FormItem>
							{getFieldDecorator("type", {
								initialValue: type,
								trigger: disable ? null : 'onChange',
							})(
								<RadioGroup className="card-container">
									<Tabs defaultActiveKey={`${type}`}>
										<TabPane
											tab={<RadioButton
												value={1}
												style={{
													width: '92px',
													height: '40px',
													margin: '0 -16px',
													border: 'none',
													textAlign: 'center',
													backgroundColor:'transparent'
												}}
											>
												<Icon type="user"/>{typeWord[1]}
											</RadioButton>}
											key='1'
										>
											<FormItem label="肤色" {...formItemLayout}>
												{getFieldDecorator("skin", {
													initialValue: searchNum.skin,
													trigger: disable ? null : 'onChange',
												})(
													<RadioGroup>
														{
															skinWord.map((item, index) => (
																<RadioButton value={index}>{item}</RadioButton>
															))
														}
													</RadioGroup>
												)}
											</FormItem>
											<FormItem label="体态" {...formItemLayout}>
												{getFieldDecorator("posture", {
													initialValue: searchNum.posture,
													trigger: disable ? null : 'onChange',
												})(
													<RadioGroup>
														{
															postureWord.map((item, index) => (
																<RadioButton value={index}>{item}</RadioButton>
															))
														}
													</RadioGroup>
												)}
											</FormItem>
											<FormItem label="发型" {...formItemLayout}>
												{getFieldDecorator("hair", {
													initialValue: searchNum.hair,
													trigger: disable ? null : 'onChange',
												})(
													<RadioGroup>
														{
															hairWord.map((item, index) => (
																<RadioButton value={index}>{item}</RadioButton>
															))
														}
													</RadioGroup>
												)}
											</FormItem>
											<FormItem label="性别" {...formItemLayout}>
												{getFieldDecorator("sex", {
													initialValue: searchNum.sex,
													trigger: disable ? null : 'onChange',
												})(
													<RadioGroup>
														<RadioButton value={0}>男</RadioButton>
														<RadioButton value={1}>女</RadioButton>
														<RadioButton value={2}>不限</RadioButton>
													</RadioGroup>
												)}
											</FormItem>
											<FormItem label="年龄" {...formItemLayout}>
												{getFieldDecorator("age", {
													initialValue: searchNum.age,
													trigger: disable ? null : 'onChange'
												})(
													<Slider range min={1} max={100} marks={{1:'1',10:'10',20:'20',30:'30',40:'40',50:'50',60:'60',70:'70',80:'80',90:'90',100:'100'}} step={1} style={{width:'350px'}}/>
												)}
											</FormItem>
											<FormItem label="眼镜" {...formItemLayout}>
												{getFieldDecorator("glasses", {
													initialValue: searchNum.glasses,
													trigger: disable ? null : 'onChange',
												})(
													<RadioGroup>
														<RadioButton value={0} className="glass1"/>

														<RadioButton value={1} className="glass2"/>
														<RadioButton value={2}>未有</RadioButton>
													</RadioGroup>
												)}
											</FormItem>
											<FormItem label="是否戴帽子" {...formItemLayout}>
												{getFieldDecorator("cap", {
													initialValue: searchNum.cap,
													trigger: disable ? null : 'onChange',
												})(
													<RadioGroup>
														<RadioButton value={0}>否</RadioButton>

														<RadioButton value={1}>是</RadioButton>
													</RadioGroup>
												)}
											</FormItem>
											<FormItem label="衣服颜色" {...formItemLayout}>
												{getFieldDecorator("clothesColor", {
													initialValue: searchNum.clothesColor
												})(
													<Select
														style={{ width: 100 }}
														optionFilterProp="children"
													>
														{
															colourWord.map((item,index)=>(
																<Option value={index}>{item}</Option>
															))
														}
													</Select>
												)}
											</FormItem>
											<FormItem label="驾驶员行为" {...formItemLayout}>
												{getFieldDecorator("action", {
													initialValue: searchNum.action
												})(
													<Select
														style={{ width: 100 }}
														optionFilterProp="children"
													>
														{
															actionWord.map((item,index)=>(
																<Option value={index}>{item}</Option>
															))
														}
													</Select>
												)}
											</FormItem>
										</TabPane>
										<TabPane
											tab={<RadioButton
												value={0}
												style={{
													width: '92px',
													height: '40px',
													margin: '0 -16px',
													border: 'none',
													textAlign: 'center',
													backgroundColor:'transparent'
												}}
											>
												<Icon type="car"/>{typeWord[0]}
											</RadioButton>}
											key='0'
										>
											<FormItem label="车牌" {...formItemLayout}>
												{getFieldDecorator("plateNumber", {
													initialValue: searchNum.plateNumber,
													trigger:disable?null:'onChange'
												})(
													<Input placeholder="请输入车牌号" style={{width: '100%'}}/>
												)}
											</FormItem>
											<FormItem label="车标" {...formItemLayout}>
												{getFieldDecorator("brand", {
													initialValue: searchNum.brand,
													trigger:disable?null:'onChange'
												})(
													<Input placeholder="请输入汽车品牌" style={{width: '100%'}}/>
												)}
											</FormItem>
											<FormItem label="车辆颜色" {...formItemLayout}>
												{getFieldDecorator("color", {
													initialValue: searchNum.color
												})(
													<Select
														style={{ width: 100 }}
														optionFilterProp="children"
													>
														{
															colourWord.map((item,index)=>(
																<Option value={index}>{item}</Option>
															))
														}
													</Select>
												)}
											</FormItem>
											<FormItem label="车型" {...formItemLayout}>
												{getFieldDecorator("carType", {
													initialValue: searchNum.carType
												})(
													<Select
														style={{ width: 100 }}
														optionFilterProp="children"
													>
														{
															carTypeWord.map((item,index)=>(
																<Option value={index}>{item}</Option>
															))
														}
													</Select>
												)}
											</FormItem>
										</TabPane>
									</Tabs>
									<FormItem label="相似度" {...formItemLayout}>
										{getFieldDecorator("similarity", {
											initialValue: searchNum.similarity
										})(
											<InputNumber
												min={0}
												max={1}
												step={0.01}
												placeholder={0.01}
											/>
										)}
									</FormItem>
									<FormItem label="追查时间" {...formItemLayout} wrapperCol={{
										xs: {span: 24},
										sm: {span: 19},
									}}>
										{getFieldDecorator("time", {
											initialValue: searchNum.time,
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
								</RadioGroup>
							)}
						</FormItem>
					</Col>
					<Col span={12} style={{height: '780px'}}>
						<Layout style={{height: '385px',marginBottom:'10px'}}>
						<Card title="目标图片" bordered={false} style={{height: '100%'}}>
							<TrackImgUpload {...imgUploadProps}/>
						</Card>
						</Layout>
						<Layout style={{height: '385px'}}>
							<Card
							title="追踪范围"
							bordered={false}
							style={{height: '100%'}}
						>
							<FormItem label="已选追踪区域">
								{getFieldDecorator("crossingData", {
									initialValue: searchNum.crossingData,
									trigger: disable ? null : 'onChange',
									rules: [
										{
											required: true,
											message: '请选择追踪区域'
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
						</Layout>
					</Col>
				</Row>
			</MyModalForm>
		)
	}
}

import './index.less';

const TrackForm = Form.create()(TrackFormC);
export default connect(
	state => ({...state.mapDataR}),
	action
)(TrackForm)