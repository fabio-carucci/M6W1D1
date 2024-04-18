const nodemailer = require('nodemailer');

// Funzione per inviare mail
const sendEmail = async (sendTo, mailBody) => {

    // Configurazione provider mail, preso smtp fake da ethereal email
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'la-tua-email',
            pass: 'la-tua-password'
        }
    });

    try {
        const mail = await transporter.sendMail({
            from: "EpiBlog Tester <la-tua-email>",
            to: sendTo,
            subject: "EpiBlog Testing Emails",
            html: mailBody
        })
        console.log(mail.messageId);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;