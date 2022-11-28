const nodemailer = require('nodemailer');
const { success, dataNotFound } = require("../utils/response-handler");
module.exports = {
  sendEmail(dataBody) {
    console.log(dataBody, '========dataBody=======')
    const { email, name, verification } = dataBody
    const mail = nodemailer.createTransport({
      host: 'mail.applimetis.id',
      port : 465,
      auth: {
        user: 'medqcare@applimetis.id',
        pass: '!Q2w3e4r5t6y'
      },
      tls : { rejectUnauthorized: false },
      debug : true
    });
    
    const mailOptions = {
      from: 'medqcare@applimetis.id',
      to: email,
      subject: 'Hallo',
      html: `<p>Hallo World.</p>`
    }
     
    mail.sendMail(mailOptions, function(error, info){
      if (error) {

        return res.json({
          status: false,
          message: error
        })
      } else {
        return success(res, [], info.response) 
      }
    });
  }
}