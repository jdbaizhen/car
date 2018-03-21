import * as types from '../action-types';
import {getTableDataA} from '../../api/data';

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			dispatch({
				type: types.DATA_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let getImages = (num) => (dispatch) => {
	dispatch({
		type: types.DATA_GET_IMAGES,
		selectedRowKey: num
	})
};
export let setSearchId = (id,selectedKey) => (dispatch) => {
	dispatch({
		type:types.DATA_SET_SEARCHID,
		id:id,
		selectedKey:selectedKey
	})
};
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.DATA_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.DATA_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};