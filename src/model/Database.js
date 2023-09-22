const mysql = require('mysql');
class Database {
    constructor(hostname, username, pass, db) {
        try {
            this.connection = mysql.createConnection({
                host: hostname,
                user: username,
                password: pass,
                database: db
            });
        }
        catch (e) {
            console.log("Iposible de connecter a la base");
            console.log(e);
        }
    }
    get_data(query, data) {
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
}

module.exports = Database;