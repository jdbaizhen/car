import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/driverCar/trackResult/search',data)
);
export const delTableDataA=(data)=>(
	post('/driverCar/trackResult/del',data)
);

export const getMapDataA=(data)=>(
	post('/driverCar/trackResult/getMap',data)
);
