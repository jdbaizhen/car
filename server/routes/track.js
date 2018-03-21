let express = require('express');
let router=express.Router();
let search=require('../mock/zcxz.json');
router.post('/search',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '追查行踪列表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

router.post('/del',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '追查行踪删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/add',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '追查行踪添加'
	};
	res.send(JSON.stringify(data));
});

router.post('/get',function (req,res) {
	console.log(req.body);
	let findData=search.details.find(item => item.id === req.body.id);
	console.log(search.details);
	let data = {
		result: true,
		message: '追查行踪查看',
		data:JSON.stringify(findData)
	};
	res.send(JSON.stringify(data));
});

router.post('/edit',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '追查行踪编辑'
	};
	res.send(JSON.stringify(data));
});
module.exports=router;

