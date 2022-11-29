const nodemailer = require('nodemailer');

exports.sendMail = async function (data) {
    if (!data) {
        throw new Error('Invalid arguments');
    }

    try {
        if (data.email) {
            let config = {
                host: process.env.SMPT,
                port: process.env.SMPTPORT,
                secure: true,
                auth: {
                  user: process.env.USERMAIL,
                  pass: process.env.PASSMAIL
                },
                tls: {
                  rejectUnauthorized: false,
                },
                debug:console.log
            }
        
            const transporter = nodemailer.createTransport(config);

            let info = await transporter.sendMail({
                from: process.env.USERMAIL, // sender address
                to: data.email, // list of receivers
                subject: data.subject ? data.subject : 'greetings', // Subject line
                text: data.subject ? data.subject : "Hello world?", // plain text body
                // html: "<b>Hello world?</b>", // html body
            });

            console.log(info)

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return info.messageId
        }
    } catch (err) {
        console.log(err)
        return Promise.reject(err);
    }
}