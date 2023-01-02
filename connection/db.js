require('dotenv').config()
var mysql      = require('mysql');
let env=process.env;
var connection = mysql.createConnection({
  host     : env.DBHOST||'localhost',
  user     : env.DBUSER||'root',
  password : env.DBPASSWPRD||'',
  database : env.DBPASSWPRD||'test'
});
connection.connect((err)=>{
  if(err) {
    console.log(err);
  }else{
    console.log("db connection established");
  }
  
})
module.exports=connection