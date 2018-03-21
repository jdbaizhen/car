let imgIp='http://localhost:80/pic';
if(process.env.NODE_ENV==='production'||process.env.NODE_ENV==='test'){
	imgIp='';
}
export default imgIp;