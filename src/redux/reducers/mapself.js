import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';

let initMapDataState = {
	roadData: []
};
let mapDataR = (state = cloneDeep(initMapDataState), action) => {
	switch (action.type) {
		case Types.MAPSELF_GET_SUCCESS:
			return {
				...state,
				roadData: action.roadData
			};
		default:
			return state
	}
};


let initTermState = {
	id:undefined,
	name:undefined,
	pageIndex: 1,
	pageSize: 10,
	beginTime: undefined,
	endTime: undefined,
};

let mapTermR=(state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.MAPSELF_SET_SEARCHID:
			return {
				...state,
				id:action.id,
				name:action.name,
				beginTime:undefined,
				endTime:undefined,
				pageIndex: 1
			};
		case Types.MAPSELF_SET_SEARCHTERM:
			return {
				...state,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.MAPSELF_SET_SEARCHPAGE:
			return {
				...state,
				pageSize:action.pageSize,
				pageIndex:action.pageIndex
			};
		default:
			return state;
	}
};

let initTableState = {
	details: [],
	count: 0,
};
let mapTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.MAPSELF_GET_TABLE:
			return {...state,
				details:action.details,
				count:action.count,
			};
		default:
			return state;
	}
};




export default {
	mapDataR,
	mapTableR,
	mapTermR
}