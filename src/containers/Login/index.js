import React from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import * as action from '../../redux/actions/login';
import LoginWindow from "../../components/LoginWindow/index";
import '../../common/images/dl.png';

let {Header} = Layout;
class Login extends React.Component {
	render() {
		let props = {
			title: <span>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</span>,
			login: this.props.login,
		};
		return (
			<div className="login">
				<LoginWindow {...props}/>
			</div>
		)
	}
}
import './index.less'
export default connect(
	state=>({...state.loginR}),
	action
)(Login)