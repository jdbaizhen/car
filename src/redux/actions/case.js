import * as types from '../action-types';
import cloneDeep from 'lodash.clonedeep';
// import dataTableData from '../../common/json/ajgl.json';
// import {betweenMoment} from '../../utils/util';
import {getTableDataA, delTableDataA, addTableDataA, getSeeDataA, editTableDataA} from '../../api/case';

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let data = {
	// 		count: 0,
	// 		details: []
	// 	};
	// 	let {pageIndex, pageSize, beginTime, endTime, name, principal} = searchTerm;
	// 	let newAllData = dataTableData.details.filter(item => {
	// 		if (beginTime && endTime) {
	// 			if (!betweenMoment(item.beginTime, beginTime, endTime)) {
	// 				return false
	// 			}
	// 		}
	// 		if(name){
	// 			if(!new RegExp(name).test(item.name)){
	// 				return false
	// 			}
	// 		}
	// 		if(principal){
	// 			if(!new RegExp(principal).test(item.principal)){
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
			// let {pageIndex, pageSize} = searchTerm;
			// let tableData = {
			// 	count: data.data.count,
			// 	details: data.data.details.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
			// };

			let tableData = data.data;

            dispatch({
				type: types.CASE_GET_TABLE,
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
		type: types.CASE_SET_SEARCHTERM,
		name: terms.name,
		principal: terms.principal,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.CASE_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};
export let delTableData = (deleteIds) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	dataTableData.details=dataTableData.details.filter(item=>![...deleteIds].some(ite=>ite===item.id));
	// 	dataTableData.count=dataTableData.count-deleteIds.length;
	// 	resolve({result: true});
	// 	}
	// )
	delTableDataA({ids: [...deleteIds]}).then(data => {
		if (data.result) {
			dispatch({
				type: types.CASE_UPDATE,
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
	// 		dataTableData.details.push(newData);
	// 		dataTableData.count += 1;
	// 		resolve({result: true});
	// 	}
	// )
	addTableDataA({...cloneDeep(obj),imgData:JSON.stringify(obj.imgData)}).then(data => {
		if (data.result) {
			dispatch({
				type: types.CASE_UPDATE,
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
	// 		dataTableData.details[num] = newData;
	// 		resolve({result: true});
	// 	}
	// )
	editTableDataA({...cloneDeep(obj),imgData:JSON.stringify(obj.imgData)}).then(data => {
		if (data.result) {
			dispatch({
				type: types.CASE_UPDATE,
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
			let tableData = data.data;

			return {result: data.result, data: tableData};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let setSearchId = ({id, info}) => (dispatch) => {
	dispatch({
		type: types.CASETABLE_SET_SEARCHID,
		id,
		info
	})
};
