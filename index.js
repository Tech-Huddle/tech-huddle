const express = require('express');
const cors = require('cors');
const connection=require('./connection/db')
require('dotenv').config()
const PORT = process.env.PORT||5000;
const app = express();


app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/',(req, res, next) =>{
	res.send({"message":"hello world!"})
	})

app.get('/task/list',(req, res, next) =>{
	connection.query("select * from task", function (error, results, fields) {
		if (error) {
			console.log(error)
		}
		else{
			res.send({"data": results})
		}
	
	  });
	})

app.listen(PORT, () => {
	console.log("Server up and running on port: %d", PORT);
});