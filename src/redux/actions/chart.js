import * as types from '../action-types';
import {getTableDataA} from '../../api/chart';

export let getTableData = (searchTerm) => (dispatch) => (
	// new Promise((resolve, reject) => {
	// 	let dataTableData={
	// 		count:4,
	// 		details:[
	// 			{
	// 				crossing:"2公里",
	// 			},
	// 			{
	// 				crossing:"4公里",
	// 			},
	// 			{
	// 				crossing:"6公里",
	// 			},
	// 			{
	// 				crossing:"8公里",
	// 			}
	// 		]
	// 	};
	// 	let ary=Array(12).fill(1);
	// 	dataTableData.details.map(item=>{
	// 		item.flow=ary.map(it=>{
	// 			return Math.round(Math.random()*(400-20)+20)
	// 		})
	// 	});
	// 	resolve({result: true, data: dataTableData});
	// 	console.log(dataTableData);
	// })
	getTableDataA(searchTerm).then(data => {
		if (data.result) {
			let tableData=JSON.parse(data.data);
			// let tableData = {
			// 	count: data.data.count,
			// 	details: data.data.details
			// };
			dispatch({
				type: types.CHART_GET_TABLE,
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
		type: types.CHART_SET_SEARCHTERM,
		road: terms.road,
		date: terms.date
	})
};