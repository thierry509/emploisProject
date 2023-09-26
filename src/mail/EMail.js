const nodemailer = require('nodemailer');
class EMail{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "Outlook", 
            auth: {
              user: "haitilimonade@hotmail.com", 
              pass: "Qwertyu1234@" 
            }
          });
    }

    sendMail = (recipient, subject, message)=>{
        const mailOptions = {
            from: "haitilimonade@hotmail.com",
            to: recipient, 
            subject: subject, 
            text: message 
          };
          this.transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
              console.log('E-mail envoyé avec succès :', recipient , res.response);
            }
          });
    }
}

module.exports = EMail;