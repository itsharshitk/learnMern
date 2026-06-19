const config = require("../config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smpt_port,
    auth:{
        user:config.smpt_user,
        pass: config.smpt_pass
    }
});

async function sendMail(options){
    await transporter.sendMail({
        from: config.smpt_user,
        to: options.to,
        subject: options.subject,
        html: options.html
    });
}

module.exports = { sendMail };