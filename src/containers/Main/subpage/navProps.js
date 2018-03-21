export default {
	theme:'dark',
	mode:'inline',
	navItems:[
		{
			header:'实时监控',
			router:'/map',
			icon:'video-camera',
		},
		{
			header:'数据管理',
			router:'/data',
			icon:'profile',
			// link:[
			// 	{
			// 		header:'识别记录',
			// 		router:'/identification/record',
			// 		icon:'schedule'
			// 	}
			// ]
		},
		{
			header:'追查行踪',
			router:'/track',
			icon:'environment-o',
		},
		{
			header:'案件管理',
			router:'/case',
			icon:'folder-open',
		},
		{
			header:'数据统计',
			router:'/chart',
			icon:'line-chart',
		}
	]
}