var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
	service:'gmail',
	secure: false,
    auth: {
        user: 'anupamdatta10@gmail.com',
        pass: 'ugxexjfeigxzqyte'
    } ,
	debug: false,
	logger: true
});

exports.sendMail=(to,subject,body,attachments)=>{
    return new Promise((resolve, reject) => {

        var mailOptions = {
            from: 'anupamdatta10@gmail.com',
            to: to,
            subject: subject,
            text: body
          };
          if (attachments&&attachments.length > 0) {
            mailOptions['attachments'] = attachments;
        }
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log('Email sent: ' + info.response);
                resolve({message:'Email sent: ' + info.response})
            }
          });
    })
    
}