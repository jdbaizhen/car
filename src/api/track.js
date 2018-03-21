import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/driverCar/track/search',data)
);
export const delTableDataA=(data)=>(
	post('/driverCar/track/del',data)
);
export const  addTableDataA=(data)=>(
	post('/driverCar/track/add',data)
);
export const getSeeDataA=(data)=>(
	post('/driverCar/track/get',data)
);
export const editTableDataA=(data)=>(
	post('/driverCar/track/edit',data)
);