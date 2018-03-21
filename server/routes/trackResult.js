let express = require('express');
let router=express.Router();
let searchC=require('../mock/zcxz-c.json');
let searchR=require('../mock/zcxz-r.json');
let findC=require('../mock/xzmap-c.json');
let findR=require('../mock/xzmap-r.json');
router.post('/search',function (req,res) {
	console.log(req.body,1);
	let {type}=req.body;
	let search=null;
	if(type){
		search = searchC;
	} else {
		search = searchR;
	}
	let data = {
		result: true,
		message: '追查结果列表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

router.post('/del',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '追查结果删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/getMap',function (req,res) {
	console.log(req.body);
	let {type}=req.body;
	let findData=null;
	if(type){
		findData = findC;
	} else {
		findData = findR;
	}
	let data = {
		result: true,
		message: '追查结果查看',
		data:JSON.stringify(findData)
	};
	res.send(JSON.stringify(data));
});
module.exports=router;

