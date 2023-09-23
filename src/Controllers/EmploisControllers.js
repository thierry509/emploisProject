const TableEmplois = require("../model/Table/TableEmplois");
const Controllers = require("./Controller");

class EmploisControlers extends Controllers{
    test = (req, res)=>{
        res.send("Bonjour");
    }
    allEmplois = (request, response) => {
        new TableEmplois().allEmplois()
        .then(emplois => {
            response.send(
                this.return_json(emplois)
            )
        }).catch(()=>response.send(
            response.status(404).send("Not found")
        ));
    }
    recentEmplois = (request, response) =>{
        new TableEmplois.recentEmplois(emplois =>{
            this.return_json;
        });
    }
    emploisDetails = (request, response)=>{
        
    }
}
module.exports = EmploisControlers;