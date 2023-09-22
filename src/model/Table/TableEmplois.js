const Table = require("./Table");

class TableEmplois extends Table {
    allEmplois = () => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                'SELECT * FROM emplois', []
            )
                .then(emplois => resolve(emplois))
                .catch(reject);
        });

    }
    recentEmplois = () => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                "SELECT * FROM emplois LIMIT 7", []
            )
                .then(emplois => resolve(emplois));
        });
    }

    emploisDetails = (id) => {
        return new Promise((resolve, reject) => {
            this.database.get_data(
                "SELECT * FROM emplois e JOIN employeur em ON e.id = em.id_user WHERE e.id = ?",
                [id]
            )
                .then(emplois => resolve(emplois))
                .catch(e => reject(e));
        });
    }
}
module.exports = TableEmplois;
