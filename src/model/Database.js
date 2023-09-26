const mysql = require('mysql2');
class Database {
    constructor(hostname, username, pass) {
        try {
            this.connection = mysql.createConnection({
                host: hostname,
                user: username,
                password: pass,
            });
            this.connection.query(`CREATE DATABASE IF NOT EXISTS emplois;`, (err)=>{
                if(err){
                    console.log(err);
                }
            })
            this.connection.query(`USE emplois`, err=>{
                if(err){
                    console.log(err);
                }
            })

            const user = `CREATE TABLE IF NOT EXISTS user(
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL);`,

            employeur = `CREATE TABLE IF NOT EXISTS employeur(
                id_user INT PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                pays VARCHAR(255),
                ville VARCHAR(255),
                CONSTRAINT fk_id_user FOREIGN KEY(id_user) REFERENCES user(id)
            );`,

            candidat = `CREATE TABLE IF NOT EXISTS candidat(
                id_user INT PRIMARY KEY,
                prenom VARCHAR(255) NOT NULL,
                nom VARCHAR(255) NOT NULL,
                sexe ENUM('M', 'F'),
                dateDeNaiss DATE,
                telephone VARCHAR(15),
                ville VARCHAR(255),
                pays VARCHAR(255),
                competence TEXT(255),
                CONSTRAINT fk_id_user_candidat FOREIGN KEY(id_user) REFERENCES user(id)
            );`,
            etude =`CREATE TABLE IF NOT EXISTS etude(
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_candidat INT,
                niveau VARCHAR(30) NOT NULL,
                domaine VARCHAR(150) NOT NULL,
                etablissement VARCHAR(255) NOT NULL,
                pays VARCHAR(255) NOT NULL,
                region VARCHAR(255) NOT NULL,
                dateDebut VARCHAR(4) NOT NULL,
                dateFin VARCHAR(4) NOT NULL,
                CONSTRAINT fk_id_candidat FOREIGN KEY(id_candidat) REFERENCES candidat(id_user)
            );`,
            emplois = `CREATE TABLE IF NOT EXISTS emplois(
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_employeur INT,
                titre VARCHAR(255) NOT NULL,
                domaine VARCHAR(150) NOT NULL,
                specialiter VARCHAR(255) NOT NULL,
                dateDebut VARCHAR(15) NOT NULL,
                dateFin  VARCHAR(15) NOT NULL,
                ville VARCHAR(255) NOT NULL,
                pays VARCHAR(255) NOT NULL,
                zone VARCHAR(255) NOT NULL,
                dure VARCHAR(150) NOT NULL,
                introduction TEXT NOT NULL,
                qualification TEXT(255) NOT NULL,
                fonction TEXT(255) NOT NULL,
                conditionDeTravail TEXT(255) NOT NULL,
                CONSTRAINT fk_id_employeur FOREIGN KEY(id_employeur) REFERENCES employeur(id_user)
            );`,
            experience = `CREATE TABLE IF NOT EXISTS experience(
                id INT PRIMARY KEY AUTO_INCREMENT,
                id_candidat INT,
                domaine VARCHAR(255) NOT NULL,
                entreprise VARCHAR(255) NOT NULL,
                pays  VARCHAR(255) NOT NULL,
                region VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                debut VARCHAR(4) NOT NULL,
                fin VARCHAR(4) NOT NULL,
                CONSTRAINT fk_id_candidat_experience FOREIGN KEY(id_candidat) REFERENCES candidat(id_user)
            );`,
            application = `CREATE TABLE IF NOT EXISTS application(
                id_candidat INT,
                id_emplois INT,
                etat ENUM("attente", "accepter", "refuser") NOT NULL DEFAULT "attente",
                CONSTRAINT pk_application PRIMARY KEY(id_candidat, id_emplois),
                CONSTRAINT fk_id_candidat_application FOREIGN KEY(id_candidat) REFERENCES candidat(id_user),
                CONSTRAINT fk_id_emploi FOREIGN KEY(id_emplois) REFERENCES emplois(id) 
            );`,
            feedBack = `CREATE TABLE IF NOT EXISTS feedBack(
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                comment TEXT NOT NULL
            );`

            this.connection.query(user, err=>{
                if(err){
                    console.log(err);
                }
            });
            this.connection.query(employeur, err=>{
                if(err){
                    console.log(err);
                }
            });
            this.connection.query(candidat, err=>{
                if(err){
                    console.log(err);
                }
            });
            this.connection.query(etude, err=>{
                if(err){
                    console.log(err);
                }
            })
            ;this.connection.query(emplois, err=>{
                if(err){
                    console.log(err);
                }
            });
            this.connection.query(experience, err=>{
                if(err){
                    console.log(err);
                }
            });
            this.connection.query(application, err=>{
                if(err){
                    console.log(err);
                }
            });
            this.connection.query(feedBack, err=>{
                if(err){
                    console.log(err);
                }
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