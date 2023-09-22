const Table = require('./Table'); 
class TableCandidat extends Table{

    candidat = (id) =>{
        return new Promise((resolve, reject)=>{
            this.database.get_data('SELECT u.id, prenom, nom, concat(nom, " ", prenom) as nomComplet, \
            sexe, dateDeNaiss, telephone, ville, pays, competence, email, "candidat" AS type FROM candidat c \
            JOIN user u ON c.id_user = u.id WHERE c.id_user = ?', [id])
            .then(candidat => resolve(candidat))
            .catch(e => reject(e));
        });
    }
}
module.exports = TableCandidat;