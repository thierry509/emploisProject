const Table = require("./Table");

class TableEmployeur extends Table {
    employeur(id) {
        return new Promise((resolve, reject) => {
            this.database.get_data('SELECT id, nom, pays, ville, email, "employeur" AS type FROM employeur e \
            JOIN user u ON e.id_user = u.id WHERE u.id = ?', [id])
                .then(employeur => resolve(employeur))
                .catch(e => reject(e))
        });
    }
    emplois = (id_employeur) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                "SELECT *, CONCAT(SUBSTRING_INDEX(introduction, ' ', 5), '...' )AS intro FROM emplois e JOIN employeur em ON e.id_employeur = em.id_user WHERE em.id_user = ?",
                [id_employeur]
            )
                .then(emplois => resolve(emplois))
                .catch(e => reject(e));
        });
    }
}

module.exports = TableEmployeur;