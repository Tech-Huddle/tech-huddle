const express = require('express');
const cors = require('cors');
const connection=require('./connection/db')
require('dotenv').config()
const PORT = process.env.PORT||5000;
const app = express();
app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

const mainRouter=require('./src/routes/mainRouter');

//const connection=require('./connection/db');
app.get('/server_statue_check',(req, res, next) =>{
	connection.query("SELECT 1+1 ",function (error, results, fields) {
		let message
		if (error) {
			message={
				success:false,
				message:"db error "+error+" server running"
			}
			res.status(500).send(message)
		}else{
			message={
				success:true,
				message:"db connection success server running"
			}
			res.status(200).send(message)
		}
	})
	})

app.use('/api/v1',mainRouter.publicRouter);
app.use('/api/v1',mainRouter.authRouter);

module.exports = app.listen(PORT, () => {
	console.log("Server up and running on port: %d", PORT);
});