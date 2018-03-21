let express=require('express');
let app=express();
let bodyParser=require('body-parser');


let users=require('./routes/users');
let map=require('./routes/map');
let data=require('./routes/data');
let track=require('./routes/track');
let trackResult=require('./routes/trackResult');
let myCase=require('./routes/case');
let chart=require('./routes/chart');
let name='/driverCar';

app.listen(4332);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(name+'/users',users);
app.use(name+'/map',map);
app.use(name+'/data',data);
app.use(name+'/track',track);
app.use(name+'/trackResult',trackResult);
app.use(name+'/case',myCase);
app.use(name+'/chart',chart);

