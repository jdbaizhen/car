let express = require('express');
let router=express.Router();
let search=require('../mock/sj.json');
router.post('/search',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '数据管理列表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

module.exports=router;