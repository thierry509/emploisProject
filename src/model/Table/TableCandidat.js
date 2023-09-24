const Table = require('./Table');
class TableCandidat extends Table {

    candidat = (id) => {
        return new Promise((resolve, reject) => {
            this.database.get_data('SELECT u.id, prenom, nom, concat(nom, " ", prenom) as nomComplet, \
            sexe, dateDeNaiss, telephone, ville, pays, competence, email, "candidat" AS type FROM candidat c \
            JOIN user u ON c.id_user = u.id WHERE c.id_user = ?', [id])
                .then(candidat => resolve(candidat))
                .catch(e => reject(e));
        });
    }

    etude = (id_candidat) => {
        console.log(id_candidat)
        return new Promise((resolve, reject) => {
            this.database.get_data('SELECT id, niveau, domaine, etablissement, pays, region, dateDebut, dateFin \
            FROM etude WHERE id_candidat = ?', [id_candidat])
                .then(etudes => resolve(etudes))
                .catch (e=> reject(e));
    });
}

experience = (id_candidat) => {
    return new Promise((resolve, reject) => {
        this.database.get_data('SELECT id, domaine, entreprise, pays, region, description, debut, fin \
            FROM experience WHERE id_candidat = ?', [id_candidat])
            .then(experience => resolve(experience))
            .catch(e => reject(e));
    });
}

updateCandidat = (id, nom, prenom, sexe, dateDeNaiss, telephone, ville, pays, competence) => {
    return new Promise((resolve, reject) => {
        this.database.get_data(`UPDATE candidat SET nom="${nom}", prenom="${prenom}", sexe="${sexe}", dateDenaiss= "${dateDeNaiss}", telephone="${telephone}", ville= "${ville}", pays= "${pays}", competence= "${competence}" WHERE id_user= "${id}"`,
            [nom, prenom, sexe, dateDeNaiss, telephone, ville, pays, competence, id])
            .then(res => resolve(res))
            .catch(e => reject(e));
    });
}

updateEtude(niveau, domaine, etablissement, pays, region, debut, fin, id) {
    return new Promise((resolve, reject) => {
        this.database.get_data(`UPDATE etude SET niveau = "${niveau}", domaine = "${domaine}", etablissement = "${etablissement}", pays = "${pays}", region = "${region}", dateDebut = "${debut}", dateFin = "${fin}" WHERE id = "${id}"`)
            .then(res => resolve(res))
            .catch(e => reject(e));
    });
}
updateExperience(domaine, entreprise, pays, region, description, debut, fin, id) {
    return new Promise((resolve, reject) => {
        this.database.get_data(`UPDATE experience SET domaine = "${domaine}", entreprise = "${entreprise}", pays = "${pays}", region = "${region}", description="${description}" ,debut = "${debut}", fin = "${fin}" WHERE id = "${id}"`)
            .then(res => resolve(res))
            .catch(e => reject(e));
    });
}

saveEtude = (niveau, domaine, etablissement, pays, region, debut, fin, id) => {
    return new Promise((resolve, reject) => {
        this.database.insertData('INSERT INTO etude(id_candidat, niveau, domaine, etablissement, pays, region,dateDebut, dateFin) VALUE(?, ?, ?, ?, ?, ?, ?, ?)',
            [id, niveau, domaine, etablissement, pays, region, debut, fin])
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

saveExperience = (id, domaine, entreprise, pays, region, description, debut, fin) => {
    return new Promise((resolve, reject) => {
        this.database.insertData('iNSERT INTO experience(id_candidat, domaine, entreprise, pays, region, description, debut, fin) VALUE(?, ?, ?, ?, ?, ?, ?, ?)',
            [id, domaine, entreprise, pays, region, description, debut, fin])
            .then(res => resolve(res))
            .catch(e => reject(e));
    });
}

application = (id_emplois, id_candidat) => {
    return new Promise((resolve, reject) => {
        this.database.insertData('INSERT INTO application(id_candidat, id_emplois) VALUES(?, ?)',
            [id_candidat, id_emplois]
        )
            .then(res => resolve(res))
            .catch(e => reject(e));
    });
}
}
module.exports = TableCandidat;