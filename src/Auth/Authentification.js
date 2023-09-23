const Controllers = require("../Controllers/Controller");
const TableCandidat = require("../model/Table/TableCandidat");
const TableEmployeur = require("../model/Table/TableEmployeur");
const TableUser = require("../model/Table/UserTable");
class Authentification extends Controllers{
    authUser = (email, password) => {
        return new Promise((resolve, reject)=>{
            new TableUser().getUserWithEmail(email)
            .then(user =>{
                user = this.return_json(user)[0];
                if(user.password == password){
                    new TableCandidat().candidat(user.id)
                    .then(candidat=>{
                        if(candidat.length == 1){
                            resolve(candidat);
                        }
                        else{
                            reject()
                        }
                    });
                    new TableEmployeur().employeur(user.id)
                    .then(employeur=>{
                        if(employeur.id){
                            resolve(employeur)
                        }
                    })
                }
            })
            .catch(()=> reject("Paire identifiant et mots de passe incorecte"));
        });
    }

}
module.exports = Authentification;