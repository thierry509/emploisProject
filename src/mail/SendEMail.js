const EMail = require("./EMail");

class sendEMail{
    static send(email, nomEmplois, link){
        const message = `Cher(e) [Nom de l'utilisateur],

        Nous espérons que vous allez bien. Nous sommes ravis de vous informer qu'une opportunité professionnelle passionnante est actuellement disponible chez [Nom de l'entreprise]. Nous pensons que cette offre d'emploi pourrait correspondre à vos compétences et à votre expérience.
        
        Poste : [Titre du poste] 
        Lieu : [Lieu du poste] 
        Description du poste : [Bref résumé de la description du poste]
        
        Si cette offre vous intéresse, nous vous encourageons à en savoir plus en suivant le lien ci-dessous :
        
        [Insérez ici le lien vers l'offre d'emploi]
        
        N'hésitez pas à explorer cette opportunité et à postuler si elle correspond à vos aspirations professionnelles. Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter.
        
        Nous apprécions votre engagement envers [Nom de l'entreprise] et nous espérons que cette offre pourrait être le prochain pas passionnant dans votre carrière. Merci de votre confiance en nous.
        
        Cordialement,
        
        [Votre nom] [Votre titre] [Nom de l'entreprise] [Coordonnées de contact]
        
        `
        new EMail().sendMail(email, "Offre d'emplois qui pourait vous intereser")
    }
    
}