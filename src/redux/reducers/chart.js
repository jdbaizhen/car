import * as Types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
import moment from 'moment';

let initTermState = {
	road: "锡沪路",
	date: moment().format('YYYY-MM-DD'),
};
let chartTermR = (state = cloneDeep(initTermState), action) => {
	switch (action.type) {
		case Types.CHART_SET_SEARCHTERM:
			return {
				...state,
				road: action.road,
				date: action.date
			};
		default:
			return state;
	}
};
let initTableState = {
	details: [],
	count: 0
};
let chartTableR = (state = cloneDeep(initTableState), action) => {
	switch (action.type) {
		case Types.CHART_GET_TABLE:
			return {...state,
				details:action.details,
				count:action.count
			};
		default:
			return state;
	}
};
export default {
	chartTableR,
	chartTermR
}