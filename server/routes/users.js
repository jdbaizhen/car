let express = require('express');
let router = express.Router();

router.post('/login', function (req, res) {
	let data = null;
	console.log(req.body);
	let {username, password} = req.body;
	if (username === 'admin' && password === 'admin') {
		data = {
			result: true,
			message: '登录成功',
			data: JSON.stringify({
				id: 1,
				username: 'admin',
				password: 'admin'})
		}
	} else {
		data = {result: false, message: '用户名或密码错误'}
	}
	res.send(JSON.stringify(data))
});

router.get('/logout', function (req, res) {
	let data = {
		result: true,
		message: '退出成功'
	};

	res.send(JSON.stringify(data));
});

module.exports = router;