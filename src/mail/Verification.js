const Utils = require("../Utils/Utils");
const TableCandidat = require("../model/Table/TableCandidat");
const TableEmplois = require("../model/Table/TableEmplois");

class Verification {

    emplois(emplois_id) {
        return new Promise((resolve, reject)=>{
        new TableEmplois().getWithId(emplois_id)
            .then(emplois => {
                new TableCandidat().allCandidat()
                    .then(candidats => {
                        if (emplois.length > 0) {
                            console.log(candidats);
                            candidats.forEach(candidat => {
                                if (candidat.pays == emplois.pays) {
                                    if(Utils.haveSimilaritie(emplois.domaine, candidat.competance)){
                                        const data = {
                                            candidat : candidat,
                                            emplois : emplois

                                        }
                                        resolve(data);                                    }
                                    new TableCandidat().etude(candidat.id_user)
                                        .then(etudes => {
                                            etudes.forEach(etude => {
                                                if (Utils.haveSimilaritie(emplois.domaine, candidat.domaine) || Utils.haveSimilaritie(emplois.specialite, candidat.domaine)) {
                                                    const data = {
                                                        candidat : candidat,
                                                        emplois : emplois

                                                    }
                                                    resolve(data);
                                                }
                                            });
                                        });
                                    new TableCandidat().experience(id)
                                        .then(experiences => {
                                            experiences.forEach(experience => {
                                                if (Utils.haveSimilaritie(emplois.domaine, experience.domaine)){
                                                    const data = {
                                                        candidat : candidat,
                                                        emplois : emplois

                                                    }
                                                    resolve(data);                                                }
                                    });
                                        })
                                }
                            });
                        }
                    })
            });
    })
    }
}
module.exports = Verification;