const TableEmplois = require("../model/Table/TableEmplois");
const Controllers = require("./Controller");

class EmploisControllers extends Controllers{
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

    addEmploi = (request, response)=>{
        const id = request.params.id;
        let user = request.session.auth;
        const {titre, domaine, specialiter, debut, fin, pays, ville, zone, durre, introduction, qualification, fonction, condition} = request.body;
        if (user != undefined) {
            if (user.id == id) {
                new TableEmplois().add(user.id, titre, domaine, specialiter, debut, fin,  ville, pays, zone, durre, introduction, qualification, fonction, condition)
                    .then(res => {
                        response.redirect(`/employeur/${user.id}`)
                    });
                
            }
            else {
                response.redirect('/')
            }
        }
        else {
            response.redirect('/');
        }
    }
}
module.exports = EmploisControllers;