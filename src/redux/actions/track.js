import * as types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
// import dataTableData from '../../common/json/zcxz.json';
// import {betweenMoment} from '../../utils/util';
import {getTableDataA, delTableDataA, addTableDataA,getSeeDataA,editTableDataA} from '../../api/track';

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let data = {
	// 		count: 0,
	// 		details: []
	// 	};
	// 	let {pageIndex, pageSize, beginTime, endTime, trackState} = searchTerm;
	// 	let newAllData = dataTableData.details.filter(item => {
	// 		if (beginTime && endTime) {
	// 			if (!betweenMoment(item.createTime, beginTime, endTime)) {
	// 				return false
	// 			}
	// 		}
	// 		if (trackState!==4) {
	// 			if (item.trackState !== trackState) {
	// 				return false
	// 			}
	// 		}
	// 		return true;
	// 	});
	// 	data.count = newAllData.length;
	// 	data.details = newAllData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
	// 	resolve({result: true, data: data});
	// })
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData = JSON.parse(data.data);
			// let tableData = data.data;
			dispatch({
				type: types.TRACK_GET_TABLE,
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
		type: types.TRACK_SET_SEARCHTERM,
		trackState: terms.trackState,
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
export let delTableData = (deleteIds) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 		dataTableData.details = dataTableData.details.filter(item => ![...deleteIds].some(ite => ite === item.id));
	// 		dataTableData.count = dataTableData.count - deleteIds.length;
	// 		resolve({result: true});
	// 	}
	// )
	delTableDataA([...deleteIds]).then(data => {
		if (data.result) {
			dispatch({
				type: types.TRACK_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let addTableData = (obj) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 		let newData = cloneDeep(obj);
	// 		newData.id = dataTableData.details[dataTableData.count - 1]["id"] + 1;
	// 		newData.trackState = 0;
	// 		dataTableData.details.push(newData);
	// 		dataTableData.count += 1;
	// 		resolve({result: true});
	// 	}
	// )
	addTableDataA(cloneDeep(obj)).then(data => {
		if (data.result) {
			dispatch({
				type: types.TRACK_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let editTableData = (obj) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 		let newData = cloneDeep(obj);
	// 		let num = dataTableData.details.findIndex(item => item.id === newData.id);
	// 		newData.createTime = dataTableData.details[num].createTime;
	// 		dataTableData.details[num] = newData;
	// 		resolve({result: true});
	// 	}
	// )
	editTableDataA(cloneDeep(obj)).then(data => {
		if (data.result) {
			dispatch({
				type: types.TRACK_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let getSeeData = (id) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 		let obj = dataTableData.details.find(item => item.id === id);
	// 		resolve({result: true, data: cloneDeep(obj)});
	// 	}
	// )
	getSeeDataA({id}).then(data => {
	if (data.result) {
		let tableData = JSON.parse(data.data);
		return {result: data.result,data:tableData};
	} else {
		return {result: false, err: data.message}
	}
})
);
