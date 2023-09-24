const Table = require("./Table");

class TableEmplois extends Table {
    allEmplois = () => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                'SELECT *, CONCAT(SUBSTRING_INDEX(introduction, " ", 5), "..." )AS intro FROM emplois', []
            )
                .then(emplois => resolve(emplois))
                .catch(reject);
        });

    }
    recentEmplois = () => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                'SELECT *, CONCAT(SUBSTRING_INDEX(introduction, " ", 5), "..." )AS intro FROM emplois LIMIT 7', []
            )
                .then(emplois => resolve(emplois));
        });
    }

    emploisDetails = (id) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                "SELECT * FROM emplois e JOIN employeur em ON e.id_employeur = em.id_user WHERE e.id = ?",
                [id]
            )
                .then(emplois => resolve(emplois))
                .catch(e => reject(e));
        });
    }

    add(idEmployeur, titre, domaine, specialiter, debut, fin, ville, zone, pays, durre, introduction, qualification, fonction, condition) {
      console.log([idEmployeur, titre, domaine, specialiter, debut, fin, ville, pays, zone, durre, introduction, qualification, fonction, condition]        )
        return new Promise((resolve, reject) => {
            this.database.insertData(
                "INSERT INTO emplois(id_employeur, titre, domaine, specialiter, dateDebut, dateFin, ville, pays, zone, dure, introduction, qualification, fonction, conditionDeTravail) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [idEmployeur, titre, domaine, specialiter, debut, fin, ville, pays, zone, durre, introduction, qualification, fonction, condition]
            )
                .then(res => resolve(res))
                .catch(e => reject(e));
        })
    }
}
module.exports = TableEmplois;
