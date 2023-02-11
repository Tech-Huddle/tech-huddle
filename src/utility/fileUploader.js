const AWS = require('aws-sdk');
require('dotenv').config()
const ENV = process.env;

const s3 = new AWS.S3({
    accessKeyId: ENV.ACCESS_KEY_ID,
    secretAccessKey: ENV.SECRET_ACCESS_KEY,
    Bucket: ENV.BUCKET_NAME,
});

exports.uploadFile = (fileName, fileData) => {
    const params = {
        Bucket: ENV.BUCKET_NAME,
        Key: "upload/" + fileName,
        Body: fileData,
        ContentEncoding: 'base64'
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

exports.getS3Objects = (link) => {
    return new Promise((resolve, reject) => {
        let urlSplitObj = link.split('/');
        let urlKey = urlSplitObj.slice(3).join('/')
        //console.log(decodeURI(urlKey));
        const params = {
            Bucket: ENV.BUCKET_NAME,
            Key: urlKey // '' + folderName + '/' + imageName + ''
            }
        s3.getObject(params, (err,data) => {
            if (err) {
                console.log("error getting object",err)
                reject(err)
            }
            else { 
                console.log(data)
                resolve(data);     
            }
        });

    })

}