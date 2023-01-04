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


// app.get('/',(req, res, next) =>{
// 	res.send({"message":"hello world!"})
// 	})

app.use('/api/v1',mainRouter.publicRouter)

app.listen(PORT, () => {
	console.log("Server up and running on port: %d", PORT);
});