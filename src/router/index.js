import Login from "../containers/Login";
import Data from "../containers/Data/index";
import Track from "../containers/Track/index";
import Case from "../containers/Case/index";
import Chart from "../containers/Chart/index";
import TrackMain from "../containers/Track/TrackMain/index";
import TrackResult from "../containers/Track/TrackResult/index";
import ResultList from "../containers/Track/TrackResult/ResultList/index";
import ResultMap from "../containers/Track/TrackResult/ResultMap/index";
import ResultTime from "../containers/Track/TrackResult/ResultTime/index";
import MapSelf from "../containers/MapSelf/index";


export default [
	{
		path:'/login',
		component:Login
	},
	{
		path:'/',
	},
	{
		path:'/map',
		component:MapSelf
	},
	{
		path:'/data',
		component:Data
	},
	{
		path:'/track',
		component:Track,
		routes:[
			{
				path:'/track/main',
				component:TrackMain
			},
			{
				path:'/track/result/:id',
				component:TrackResult,
				routes:[
					{
						path:'/track/result/:id/list',
						component:ResultList
					},
					{
						path:'/track/result/:id/map',
						component:ResultMap
					},
					{
						path:'/track/result/:id/time',
						component:ResultTime
					}
				]
			}
		]
	},
	{
		path:'/case',
		component:Case
	},
	{
		path:'/chart',
		component:Chart
	}
]