import React from 'react';
import {Modal, Form, Input, Upload, Button, Icon, Layout} from 'antd';

let FormItem = Form.Item;


class CaseImgUploadC extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			file: {}
		}
	}

	uploadAdd = (file) => {
		let {form: {resetFields}}=this.props;
		let size=Math.floor(file.size/1024);
		if(size>200){
			Modal.error({
				title: '图片太大',
				content: '请上传小于200KB大小的图片'
			})
		}else{
			let _this=this;
			let reader=new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(){
				let obj={};
				obj.name=file.name;
				obj.url=this.result;
				obj.uid=file.uid;
				obj.size=file.size;
				obj.status='done';
				_this.setState({
					visible: true,
					file:obj
				},resetFields);
			}
		}

		return false;
	};
	uploadDel = (file) => {
		let {uploadList, getImgData} = this.props;
		let newData = uploadList.filter(item => item !== file);
		getImgData(newData);
	};
	formOk = () => {
		let {file} = this.state;
		let {form: {validateFields}, uploadList, getImgData} = this.props;
		validateFields((err, values) => {
			let {nameImg, idCard} = values;
			file.nameImg = nameImg;
			file.idCard = idCard;
			this.setState({
				visible: false,
				file: {}
			});
			getImgData([...uploadList, file])
		})
	};
	formCancel=()=>{
		this.setState({
			visible: false,
			file: {}
		});
	};
	render() {
		let {visible} = this.state;
		let {form: {getFieldDecorator}, uploadList,disable} = this.props;
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
		let imgProps = {
			name: 'file',
			action: '',
			beforeUpload: this.uploadAdd,
			onRemove: this.uploadDel,
			listType: "picture",
			fileList: uploadList,
			disabled:disable,
			showUploadList:{
				showRemoveIcon:!disable
			}
		};
		return (
			<div>
				<Upload {...imgProps}>
					<Button>
						<Icon type="upload"/>
						上传人员信息
					</Button>
				</Upload>
				<Modal
					title='请输入布控人员信息'
					visible={visible}
					maskClosable={false}
					okText='提交'
					cancelText="取消"
					onOk={this.formOk}
					onCancel={this.formCancel}
				>
						<Form>
							<FormItem label="姓名" {...formItemLayout}>
								{getFieldDecorator("nameImg", {
									rules: [
										{
											required: true,
											message: '请输入人员姓名'
										}
									]
								})(
									<Input placeholder="姓名" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="身份证" {...formItemLayout}>
								{getFieldDecorator("idCard", {
									rules: [
										{
											required: true,
											message: '请输入身份证号'
										}
									]
								})(
									<Input placeholder="身份证号" style={{width: '100%'}}/>
								)}
							</FormItem>
						</Form>
				</Modal>
			</div>
		)
	}
}

export const CaseImgUpload = Form.create()(CaseImgUploadC);
