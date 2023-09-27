const mysql = require('mysql2');
class Database {
    constructor(hostname, username, pass, db) {
        try {
            if (db == undefined) {
                this.connection = mysql.createConnection({
                    host: hostname,
                    user: username,
                    password: pass
                });
            }
            else {
                this.connection = mysql.createConnection({
                    host: hostname,
                    user: username,
                    password: pass,
                    database: db
                });
            }
        }
        catch (e) {
            console.log("Imposible de connecter a la base");
            if (e.errno == 1049) {
                console.log("Les migration n'ont pas encore effectuer passer la commande npm migrate pour effectuer les migration")
            }
        }
    }
    query(query, data) {
        return new Promise((resolve, reject) => {
            this.connection.connect();
            this.connection.query(query, [data], (err, result) => {
                if (err) return reject(err);
                this.connection.end();
                resolve(result);
            });
        });
    }

    insertData = (query, data) => {
        return new Promise((resolve, reject) => {
            this.connection.connect();
            this.connection.query(query, data, (err, result) => {
                if (err) return reject(err);
                this.connection.end;
                resolve(result);
            });
        });
    }
    query = (query, data = []) => {
        return new Promise((resolve, reject) => {
            this.connection.connect();
            this.connection.query(query, data, (err, result) => {
                if (err) return reject(err);
            });
        });
    }

    deleletConnection = () => {
        this.connection.end;
    }
}

module.exports = Database;