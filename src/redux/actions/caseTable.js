import * as types from '../action-types';
// import dataTableData2 from '../../common/json/gj.json';
// import {betweenMoment} from '../../utils/util';
import {getModalTableDataA} from '../../api/case';

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let data = {
	// 		count: 0,
	// 		details: []
	// 	};
	// 	let {pageIndex, pageSize, beginTime, endTime, trackState} = searchTerm;
	// 	let newAllData = dataTableData2.details.filter(item => {
	// 		if (beginTime && endTime) {
	// 			if (!betweenMoment(item.time, beginTime, endTime)) {
	// 				return false
	// 			}
	// 		}
	// 		return true;
	// 	});
	// 	data.count = newAllData.length;
	// 	data.details = newAllData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
	// 	resolve({result: true, data: data});
	// })
	getModalTableDataA(searchTerm).then(data => {
		if (data.result) {
            // let tableData=JSON.parse(data.data);

			let tableData = data.data;
            dispatch({
				type: types.CASETABLE_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.CASETABLE_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.CASETABLE_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};