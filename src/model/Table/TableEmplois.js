const { application } = require("express");
const Table = require("./Table");

class TableEmplois extends Table {
    getWithId = (id) => {
        return new Promise((resolve, response)=>{
            this.database.get_data('SELECT * FROM emplois WHERE id = ?', [id])
            .then(user=>resolve(user))
            .catch(e=>console.log(e));
        });
    }

    allEmplois = () => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                'SELECT *, CONCAT(SUBSTRING_INDEX(introduction, " ", 5), "..." )AS intro FROM emplois', []
            )
                .then(emplois => resolve(emplois))
                .catch(e => reject(e));
        });

    }
    recentEmplois = () => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                'SELECT *, CONCAT(SUBSTRING_INDEX(introduction, " ", 5), "..." )AS intro FROM emplois LIMIT 7', []
            )
                .then(emplois => resolve(emplois))
                .catch(e => reject(e));
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

    add(emploisId, idEmployeur, titre, domaine, specialiter, debut, fin, ville, zone, pays, durre, introduction, qualification, fonction, condition) {
        return new Promise((resolve, reject) => {
            this.database.insertData(
                "INSERT INTO emplois(id, id_employeur, titre, domaine, specialiter, dateDebut, dateFin, ville, pays, zone, dure, introduction, qualification, fonction, conditionDeTravail) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [emploisId, idEmployeur, titre, domaine, specialiter, debut, fin, ville, pays, zone, durre, introduction, qualification, fonction, condition]
            )
                .then(res => resolve(res))
                .catch(e => reject(e));
        })
    }

    getApplication = (id_emplois) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                "SELECT a.id_candidat, a.id_emplois, a.etat, e.titre FROM application a JOIN emplois e ON a.id_emplois = e.id JOIN candidat c ON a.id_candidat = c.id_user WHERE e.id = ?",
                [id_emplois]
            )
                .then(application => resolve(application))
                .catch(e => reject(e));
        });
    }
    getApplicationWithEmployeur = (idEmployeur, idEmplois) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                'SELECT id, id_employeur FROM emplois WHERE id = ?',
                [idEmplois]
            )
                .then(employeur => resolve(employeur))
                .catch(e => reject(e));
        });
    }
    accepteCandidat = (idCandidat, idEmplois) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                `UPDATE application SET etat = "accepter" WHERE id_candidat = ${idCandidat} AND id_emplois = ${idEmplois}`,
                []
            )
                .then(res => resolve(res))
                .catch(e => reject(e));
        });
    }
    refuserCandidat = (idCandidat, idEmplois) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                `UPDATE application SET etat = "refuser" WHERE id_candidat = ${idCandidat} AND id_emplois = ${idEmplois}`,
                []
            )
                .then(res => resolve(res))
                .catch(e => reject(e));
        });
    }
}
module.exports = TableEmplois;
