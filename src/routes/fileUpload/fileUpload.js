const express = require('express');
const router = express.Router();
const s3=require('../../utility/fileUploader');
router.post('/',async (req,res)=>{
    try{
        let buffer=Buffer.from(req.body.file_obj.split(',')[1], 'base64');
        //console.log(buffer);
        let link=await s3.uploadFile(req.body.file_name,buffer);
        //https://tech-huddle-1.s3.amazonaws.com/upload/abc.jpg
        // let link=await s3.getS3Objects('https://tech-huddle-1.s3.ap-south-1.amazonaws.com/upload/abc.jpg')
        // console.log(link)
        // link='data:application/octet-stream;base64,'+link.Body.toString('base64')
    res.send({"message":"file uploaded successfully!","data":link});
    }catch(e){
        res.send({"message":"err!"});
    }
   
});
router.get('/',async(req,res)=>{
try{
    let url=req.body.link||'https://tech-huddle-1.s3.ap-south-1.amazonaws.com/upload/abc.jpg';
    console.log("url===>",url);
    let link=await s3.getS3Objects(url)
        console.log(link)
        link='data:application/octet-stream;base64,'+link.Body.toString('base64');
        res.send({"data":link});

}catch(e){
        res.send({"message":"err!"});
    }
   
})

module.exports = router;