import * as types from '../action-types';
import {push} from 'react-router-redux';
import {loginA, logoutA} from "../../api/login";
import {setSession, removeSession} from '../../utils/util';

export let login = (userData) => (dispatch) => (
	new Promise((resolve,reject)=>{
		if(userData.username==='admin'&&userData.password==='admin'){
			resolve({result:true,message:'登录成功',data:JSON.stringify({id:1,username:'admin',password:'admin'})})
		}else{
			resolve({result:false,message:'用户名或密码错误'})
		}

	})
	/*loginA(userData)*/.then(data => {
		if (data.result) {
			let userInfo = JSON.parse(data.data);
			setSession('username', userInfo.username);
			dispatch({
				type: types.LOGIN_SUCCESS,
				username: userInfo.username
			});
			dispatch(push('/map'));
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let logout = () => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	resolve({result: true})
	// })
	logoutA().then(data => {
		if (data.result) {
			removeSession('username');
			dispatch({
				type: types.LOGOUT_SUCCESS
			});
			dispatch(push('/'));
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);