const { request } = require("express");
const EMail = require("./EMail");

class sendEMail{
    static send(emplois, candidat){
        const subject =  'Offre d\'emploi intéressante pour vous';
        const message = `Cher(e) ${candidat.nom},
    
        Nous espérons que vous allez bien. Nous sommes ravis de vous informer qu'une opportunité professionnelle passionnante est actuellement disponible chez [Nom de l'entreprise]. Nous pensons que cette offre d'emploi pourrait correspondre à vos compétences et à votre expérience.
        
        Poste : ${emplois.titre} 
        Lieu : ${emplois.ville}, ${emplois.pays} 
        Description du poste : ${emplois.description}
        
        Si cette offre vous intéresse, nous vous encourageons à en savoir plus en suivant le lien ci-dessous :
        
        
        N'hésitez pas à explorer cette opportunité et à postuler si elle correspond à vos aspirations professionnelles. Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter.
        
        Nous apprécions votre engagement envers [Nom de l'entreprise] et nous espérons que cette offre pourrait être le prochain pas passionnant dans votre carrière. Merci de votre confiance en nous.
        
        Cordialement.        
        `
        new EMail().sendMail(candidat.email, subject, message);
    }

    //      ${request.protocol + '://' + request.get('host')}/emplois/${emplois.id}
}
module.exports = sendEMail;