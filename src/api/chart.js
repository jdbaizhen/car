import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/driverCar/chart/search',data)
);