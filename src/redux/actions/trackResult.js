import * as types from '../action-types';
// import dataTableData2 from '../../common/json/zcxz-c.json';
// import dataTableData1 from '../../common/json/zcxz-r.json';
// import dataMapData1 from '../../common/json/xzmap-r.json';
// import dataMapData2 from '../../common/json/xzmap-c.json';
import {getTableDataA, delTableDataA, getMapDataA} from '../../api/trackResult';
// import {betweenMoment} from '../../utils/util';

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let dataTableData={
	// 		result:{
	// 			details:[]
	// 		}
	// 	};
	// 	if(searchTerm.type){
	// 		dataTableData=dataTableData2;
	// 	}else{
	// 		dataTableData=dataTableData1;
	// 	}
	// 	let data = {
	// 		crossingNum:dataTableData.crossingNum,
	// 		count: 0,
	// 		details: []
	// 	};
	// 	let {pageIndex, pageSize, beginTime, endTime, similarity} = searchTerm;
	// 	let newAllData = dataTableData.result.details.filter(item => {
	// 		if (beginTime && endTime) {
	// 			if (!betweenMoment(item.time, beginTime, endTime)) {
	// 				return false
	// 			}
	// 		}
	// 		if(similarity){
	// 			if(item.similarity<similarity){
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
				type: types.TRACKRESULT_GET_TABLE,
				crossingNum: tableData.crossingNum,
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
		type: types.TRACKRESULT_SET_SEARCHTERM,
		similarity: terms.similarity,
		beginTime: terms.beginTime,
		endTime: terms.endTime,
	})
};
export let setPage = (num1, num2) => (dispatch) => {
	dispatch({
		type: types.TRACKRESULT_SET_SEARCHPAGE,
		pageSize: num2,
		pageIndex: num1
	})
};
export let delTableData = (deleteIds) => (dispatch) => (
	// delEmployee([...deleteIds]
	// new Promise((resolve, reject) => {
	// 		dataTableData1.result.details = dataTableData1.result.details.filter(item => ![...deleteIds].some(ite => ite === item.id));
	// 		dataTableData1.result.count = dataTableData1.result.count - deleteIds.length;
	// 		dataTableData2.result.details = dataTableData2.result.details.filter(item => ![...deleteIds].some(ite => ite === item.id));
	// 		dataTableData2.result.count = dataTableData2.result.count - deleteIds.length;
	// 		resolve({result: true});
	// 	}
	// )
	delTableDataA({id: deleteIds}).then(data => {
		if (data.result) {
			dispatch({
				type: types.TRACKRESULT_UPDATE,
				updateIds: []
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);
export let setSearchId = ({id, info}) => (dispatch) => {
	dispatch({
		type: types.TRACKRESULT_SET_SEARCHID,
		id,
		info
	})
};

export let getMapData = ({id, type}) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let dataMapData = null;
	// 	if (type) {
	// 		dataMapData = dataMapData2;
	// 	} else {
	// 		dataMapData = dataMapData1;
	// 	}
	// 	resolve({result: true, data: dataMapData});
	// })
	getMapDataA({id, type}).then(data => {
		let mapData = JSON.parse(data.data);
		// let mapData = data.data;
		if (data.result) {
			dispatch({
				type: types.TRACKRESULT_GET_MAPDATA,
				id,
				details: mapData.details,
				count: mapData.count
			});
			return {result: data.result};
		} else {
			return {result: false, err: data.message}
		}
	})
);

