const Table = require("./Table");

class TableEmployeur extends Table{
    employeur(id){
        return new Promise((resolve, reject)=>{
            this.database.get_data('SELECT id, nom, pays, ville, email, "employeur" AS type FROM employeur e \
            JOIN user u ON e.id_user = u.id WHERE u.id = ?', [id])
            .then(employeur => resolve(employeur))
            .catch(e => reject(e))
        });
    }
}

module.exports = TableEmployeur;