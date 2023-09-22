const TableCandidat = require("../model/Table/TableCandidat");
const Controllers = require("./Controller");

class CandidatControllers extends Controllers{
    constructor(){
        super();
        this.tableCandidat = new TableCandidat();
    }
    allCandidat = (request, response)=>{
        new TableCandidat().allCandidat(candidat=>{
            response.send(this.return_json(candidat));
        });
    }
}

module.exports = CandidatControllers