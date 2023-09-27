const Table = require("./Table");

class TableUser extends Table {
    getWithId = (id)=>{
        return new Promise((resolve, reject) => {
            this.database.query("SELECT * FROM user WHERE id = ?", [id])
                .then(user => resolve(user))
                .catch(e=>reject(e));
        });
    }

    getUserWithEmail = (email) => {
        return new Promise((resolve, reject) => {
            this.database.query("SELECT * FROM user WHERE email = ?", [email])
                .then(user => resolve(user))
                .catch(e=>reject(e));
        });
    }

    registerUser = (id, email, password) => {
        return new Promise((resolve, reject) => {
            this.database.insertData(
                "INSERT INTO user (id, email, password) VALUES(?, ?, ?)",
                [id, email, password]
            )
            .then(user=>{
                resolve(user)
            })
            .catch((e)=>reject(e));
        });
    }

    registerCanditat = (id, firstName, lastName) => {
        return new Promise((resolve, reject)=>{
            this.database.insertData(
                "INSERT INTO candidat (id_user, prenom, nom) VALUES(?, ?, ?)",
            [id, firstName, lastName]
            )
            .then(candidat => resolve(candidat))
            .catch(e => reject(e));
        });
    }

    registerEmployeur = (id, nom) =>{
        return new Promise((resolve, reject)=>{
            this.database.insertData("INSERT INTO employeur (id_user, nom) VALUES(?, ?)", [id, nom])
            .then(employeur=>resolve(employeur))
            .catch(e => reject(e));
        });
    }

    feedBack = (fname, lname, email, comment) =>{
        return new Promise((resolve, reject)=>{
            this.database.insertData("INSERT into feedBack(firstName, lastName, email, comment) VALUE(?, ?, ?, ?)", 
            [fname, lname, email, comment])
            .then(res=>resolve(res))
            .catch(e=>reject(e));
        })
    }
}
module.exports = TableUser;