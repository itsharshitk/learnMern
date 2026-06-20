const config = require("../config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    auth:{
        user:config.smtp_user,
        pass: config.smtp_pass
    }
});

async function sendMail(options){
    await transporter.sendMail({
        from: config.smtp_user,
        to: options.to,
        subject: options.subject,
        html: options.html
    });
}

module.exports = { sendMail };