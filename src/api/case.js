import {post} from './fetch';

export const getTableDataA=(data)=>(
	post('/driverCar/case/search',data)
);
export const delTableDataA=(data)=>(
	post('/driverCar/case/del',data)
);
export const  addTableDataA=(data)=>(
	post('/driverCar/case/add',data)
);
export const getSeeDataA=(data)=>(
	post('/driverCar/case/get',data)
);
export const editTableDataA=(data)=>(
	post('/driverCar/case/edit',data)
);
export const getModalTableDataA=(data)=>(
	post('/driverCar/case/getTable',data)
);