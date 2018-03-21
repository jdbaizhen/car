let express = require('express');
let router = express.Router();
let crossings=require('../mock/jk.json');
// let search=require('../mock/sj.json');

router.get('/getCrossings',function (req,res) {
	let data = {
		result: true,
		message: '摄像头列表',
		data:JSON.stringify({
			details:crossings
		})
	};
	res.send(JSON.stringify(data));
});
module.exports = router;