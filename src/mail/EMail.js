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

    sendMail = (recipient, subjectm, message)=>{
        const mailOptions = {
            from: destinataire,
            to: destinataire, 
            subject: sujet, 
            text: message 
          };
          transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
              console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
              console.log('E-mail envoyé avec succès :', res.response);
            }
          });
    }
}

module.exports = EMail;