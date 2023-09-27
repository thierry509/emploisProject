const crypto = require('crypto');
const TableUser = require('../database/Table/UserTable');
const TableEmplois = require('../database/Table/TableEmplois');
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

    static async generateUserId() {
        return new Promise((resolve, reject) => {
            let id = Utils.generate();
            new TableUser().getWithId(id)
                .then(user => {
                    if (user.length >= 0) {
                        resolve(id);
                    } else {
                        generateUserId()
                    }
                });
        })
    }

    static generateEmploisId() {
        return new Promise((resolve, reject) => {
            let id = Utils.generate();
            new TableEmplois().getWithId(id)
                .then(emplois => {
                    if (emplois.length >= 0) {
                        resolve(id);
                    } else {
                        generateEmploisId()
                    }
                });
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

    static haveSimilaritie(chaine1, chaine2) {
        if (chaine1 && chaine2) {
            const mots1 = chaine1.split(' ');
            const mots2 = chaine2.split(' ');

            const ensembleMots1 = new Set(mots1);

            for (const mot of mots2) {
                if (ensembleMots1.has(mot)) {
                    return true;
                }
            }
        }
        return false;

    }

    static isEmpty(string) {
        if (string) {
            if (string.trim() == "") {
                return true;
            }
            return false;
        }
    }
}
module.exports = Utils;