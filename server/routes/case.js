let express = require('express');
let router=express.Router();
let search=require('../mock/ajgl.json');
let tableSearch=require('../mock/gj.json');
router.post('/search',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理列表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

router.post('/del',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/add',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理添加'
	};
	res.send(JSON.stringify(data));
});

router.post('/get',function (req,res) {
	console.log(req.body);
	let findData=search.details.find(item => item.id === req.body.id);
	let data = {
		result: true,
		message: '案件管理查看',
		data:JSON.stringify(findData)
	};
	res.send(JSON.stringify(data));
});

router.post('/edit',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理编辑'
	};
	res.send(JSON.stringify(data));
});

router.post('/getTable',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '案件管理告警信息列表',
		data:JSON.stringify(tableSearch)
	};
	res.send(JSON.stringify(data));
});

module.exports=router;
