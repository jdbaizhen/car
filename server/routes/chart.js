let express = require('express');
let router=express.Router();
let search=require('../mock/sj.json');
router.post('/search',function (req,res) {
	console.log(req.body);
	let search={
		count:4,
		details:[
			{
				crossing:"2公里",
			},
			{
				crossing:"4公里",
			},
			{
				crossing:"6公里",
			},
			{
				crossing:"8公里",
			}
		]
	};
	let ary=new Array(12).fill(1);
	search.details.map(item=>{
		item.flow=ary.map(it=>{
			return Math.round(Math.random()*(400-20)+20)
		})
	});
	let data = {
		result: true,
		message: '数据统计图表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

module.exports=router;