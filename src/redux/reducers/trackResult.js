import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
let initTermState = {
	id:undefined,
	info:{},
	similarity:undefined,
	pageIndex: 1,
	pageSize: 10,
	beginTime: undefined,
	endTime: undefined,
	updateIds: []
};
let trackResultTermR=(state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.TRACKRESULT_SET_SEARCHID:
			return {
				...state,
				id:action.id,
				info:cloneDeep(action.info),
				similarity:undefined,
				beginTime:undefined,
				endTime:undefined,
				pageIndex: 1
			};
		case Types.TRACKRESULT_SET_SEARCHTERM:
			return {
				...state,
				similarity:action.similarity,
				beginTime: action.beginTime,
				endTime: action.endTime,
				pageIndex: 1
			};
		case Types.TRACKRESULT_SET_SEARCHPAGE:
			return {
				...state,
				pageSize:action.pageSize,
				pageIndex:action.pageIndex
			};
		case Types.TRACKRESULT_UPDATE:
			return {
				...state,
				updateIds: action.updateIds
			};
		default:
			return state;
	}
};

let initTableState = {
	crossingNum:[],
	details: [],
	count: 0,
};
let trackResultTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.TRACKRESULT_GET_TABLE:
			return {...state,
				crossingNum:action.crossingNum,
				details:action.details,
				count:action.count
			};
		default:
			return state;
	}
};

let initMapState={
	id:undefined,
	details: [],
	count: 0
};
let trackResultMapR=(state=cloneDeep(initMapState),action)=>{
	switch (action.type) {
		case Types.TRACKRESULT_GET_MAPDATA:
			return {...state,
				id:action.id,
				details:action.details,
				count:action.count
			};
		default:
			return state;
	}
};
export default {
	trackResultTableR,
	trackResultTermR,
	trackResultMapR
}