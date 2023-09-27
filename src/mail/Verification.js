const Utils = require("../Utils/Utils");
const TableCandidat = require("../database/Table/TableCandidat");
const TableEmplois = require("../database/Table/TableEmplois");
const sendEMail = require("./SendEMail");

class Verification {

    emplois(emplois_id) {
        return new Promise((resolve, reject) => {
            new TableEmplois().getWithId(emplois_id)
                .then(emplois => {
                    new TableCandidat().allCandidat()
                        .then(candidats => {
                            if (emplois.length == 1) {
                                emplois = emplois[0];
                                candidats.forEach(candidat => {
                                    console.log(candidat.pays, emplois.pays);
                                    if (candidat.pays == emplois.pays) {
                                        console.log(candidat, emplois);
                                        if (Utils.haveSimilaritie(emplois.domaine, candidat.competance)) {
                                            console.log("Have similarity");
                                            const data = {
                                                candidat: candidat,
                                                emplois: emplois
                                            }
                                            sendEMail.send(emplois, candidat);
                                        }
                                        new TableCandidat().etude(candidat.id_user)
                                            .then(etudes => {
                                                etudes.forEach(etude => {
                                                    if (Utils.haveSimilaritie(emplois.domaine, etude.domaine) || Utils.haveSimilaritie(emplois.specialite, etude.domaine)) {
                                                        
                                                        sendEMail.send(emplois, candidat);
                                                    }
                                                });
                                            });


                                        new TableCandidat().experience(candidat.id_user)
                                            .then(experiences => {
                                                experiences.forEach(experience => {
                                                    if (Utils.haveSimilaritie(emplois.domaine, experience.domaine)) {
                                                        const data = {
                                                            candidat: candidat,
                                                            emplois: emplois

                                                        }
                                                        sendEMail.send(emplois, candidat);
                                                    }
                                                });
                                            })
                                    }

                                }
                                )
                            }//if length
                        });
                }
                )
        })
    };
}

module.exports = Verification;