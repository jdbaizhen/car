import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initState={
	username:'',
};

export default (state=cloneDeep(initState),action)=>{
	switch (action.type){
		case Types.LOGIN_SUCCESS:
			return {
				...state,
				username:action.username
			};
		case Types.LOGOUT_SUCCESS:
			return {
				...state,
				username:''
			};
		default:
			return state;
	}
};
