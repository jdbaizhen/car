import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/driverCar/data/search',data)
);