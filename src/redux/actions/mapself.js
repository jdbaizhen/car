import * as types from '../action-types';
import {getCrossingDataA} from '../../api/map'
import {getTableDataA} from '../../api/data'

export let getCrossingData = () => (dispatch) => (
	getCrossingDataA().then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			dispatch({
				type: types.MAPSELF_GET_SUCCESS,
				roadData: tableData,
			});
			return {result: data.result, roadData: tableData}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);

export let getTableData = (searchTerm) => (dispatch) => (
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			// let tableData = data.data;
			dispatch({
				type: types.MAPSELF_GET_TABLE,
				details: tableData.details,
				count: tableData.count,
			});
			return {result: data.result}
		} else {
			return {result: data.result, err: data.message}
		}
	})
);
export let setSearchId = ({id, name}) => (dispatch) => {
	dispatch({
		type: types.MAPSELF_SET_SEARCHID,
		id,
		name
	})
};
export let setSearchTerm = (terms) => (dispatch) => {
	dispatch({
		type: types.MAPSELF_SET_SEARCHTERM,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.MAPSELF_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};