const Utils = require("../Utils/Utils");
const TableCandidat = require("../model/Table/TableCandidat");
const TableEmplois = require("../model/Table/TableEmplois");

class sendEMail{
    emplois(emplois_id){
        new TableEmplois().getWithId(emplois_id)
        .then(emplois=>{
            new TableCandidat().allCandidat()
            .then(candidats=>{
                candidats.forEach(candidat=>{
                    // if()
                });
            })
        });    
    }
}
module.exports = sendEMail;