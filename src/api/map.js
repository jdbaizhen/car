import {get} from './fetch';
export const getCrossingDataA=()=>(
	get('/driverCar/map/getCrossings')
);
