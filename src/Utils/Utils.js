const crypto = require('crypto');
class Utils {
     static generate = () => {
        let result = ''
        const characters = '0123456789';
        const charactersLength = characters.length;

        const randomBytes = crypto.randomBytes(10);

        for (let i = 0; i < 5; i++) {
            const randomIndex = randomBytes[i] % charactersLength;
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    static generateUserId(){
        return new Promise((resolve, reject)=>{
            let id = Utils.generate();
        })
    }

    static reduct(chaine) {
        // Divise la chaîne en mots en utilisant l'espace comme séparateur
        const mots = chaine.split(' ');
      
        // Sélectionne les cinq premiers mots en utilisant slice
        const cinqPremiers = mots.slice(0, 5);
      
        // Rejoins les cinq premiers mots en une nouvelle chaîne
        const resultat = cinqPremiers.join(' ');
      
        return resultat;
    }
}
module.exports = Utils;