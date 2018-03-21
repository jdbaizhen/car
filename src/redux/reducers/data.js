import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initTermState = {
	id:1,
	selectedKey:'0-0-0',
	pageIndex: 1,
	pageSize: 10,
	beginTime: undefined,
	endTime: undefined,
};
let dataTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.DATA_SET_SEARCHID:
			return {
				...state,
				id:action.id,
				selectedKey:action.selectedKey,
				beginTime:undefined,
				endTime:undefined,
				pageIndex: 1
			};
		case Types.DATA_SET_SEARCHTERM:
			return {
				...state,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.DATA_SET_SEARCHPAGE:
			return {
				...state,
				pageSize: action.pageSize,
				pageIndex: action.pageIndex
			};
		default:
			return state;
	}
};


let initTableState = {
	details: [],
	count: 0,
	selectedRowKey:0
};

let dataTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.DATA_GET_TABLE:
			return {...state,
				details:action.details,
				count:action.count,
				selectedRowKey:0
			};
		case Types.DATA_GET_IMAGES:
			return {...state,
				selectedRowKey:action.selectedRowKey
			};
		default:
			return state;
	}
};

export default {
	dataTableR,
	dataTermR
}