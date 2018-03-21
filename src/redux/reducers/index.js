import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loginR from './login';
import mapselfR from './mapself';
import dataR from './data';
import chartR from './chart';
import caseR from './case';
import caseTableR from './caseTable';
import trackR from './track';
import trackResultR from './trackResult'

export default combineReducers({
	...trackResultR,
	...trackR,
	...caseTableR,
	...caseR,
	...chartR,
	...mapselfR,
	...dataR,
	loginR,
	router:routerReducer
})
