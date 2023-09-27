const Controllers = require("../Controllers/Controller");
const TableCandidat = require("../database/Table/TableCandidat");
const TableEmployeur = require("../database/Table/TableEmployeur");
const TableUser = require("../database/Table/UserTable");
class Authentification extends Controllers{
    authUser = (email, password) => {
        return new Promise((resolve, reject)=>{
            new TableUser().getUserWithEmail(email)
            .then(user =>{
                user = this.return_json(user)[0];
                console.log("frist", user)
                if(user.password == password){
                    new TableCandidat().candidat(user.id)
                    .then(candidat=>{
                        console.log(candidat);  
                        if(candidat.length == 1){
                
                            resolve(candidat);
                        }
                        else{
                            console.log('No candidate');
                            new TableEmployeur().employeur(user.id)
                            .then(employeur=>{
                                if(employeur.length == 1){
                                    console.log("employeur")
                                    resolve(employeur)
                                }
                            })
                        }
                    });

                   
                }
            })
            .catch(()=> reject("Paire identifiant et mots de passe incorecte"));
        });
    }

}
module.exports = Authentification;