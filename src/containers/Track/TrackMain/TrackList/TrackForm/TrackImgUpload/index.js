import React from 'react';
import {Modal, Upload, Icon} from 'antd';

export default class TrackImgUpload extends React.Component{
	uploadAdd = (file) => {
		let {getImgData} = this.props;
		let size=Math.floor(file.size/1024);
		if(size>200){
			Modal.error({
				title: '图片太大',
				content: '请上传小于200KB大小的图片'
			})
		}else{
			let reader=new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(){
				let obj={};
				obj.name=file.name;
				obj.url=this.result;
				obj.uid=file.uid;
				obj.size=file.size;
				obj.status='done';
				getImgData([obj]);
			}
		}

		return false;
	};
	uploadDel = () => {
		let {getImgData} = this.props;
		getImgData([]);
	};
    render(){
	    let {uploadList,disable} = this.props;
	    console.log(uploadList);
	    let imgProps = {
		    name: 'file',
		    action: '/upload.do',
		    beforeUpload: this.uploadAdd,
		    onRemove: this.uploadDel,
		    listType: "picture-card",
		    fileList: uploadList,
		    disabled:disable,
		    showUploadList:{
			    showPreviewIcon:false,
			    showRemoveIcon:!disable
		    }
	    };
        return(
	        <Upload {...imgProps}>
		       <div style={{ width: '86px',height: '86px',padding:'8px',fontSize:'40px'}}>
			        <Icon type={uploadList&&uploadList.length?'edit':'plus'}/>
		        </div>
	        </Upload>
        )
    }
}
import './index.less'