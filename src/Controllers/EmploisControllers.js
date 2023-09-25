const Utils = require("../Utils/Utils");
const sendEMail = require("../mail/SendEMail");
const TableEmplois = require("../model/Table/TableEmplois");
const Controllers = require("./Controller");

class EmploisControllers extends Controllers {
    test = (req, res) => {
        res.send("Bonjour");
    }
    allEmplois = (request, response) => {
        new TableEmplois().allEmplois()
            .then(emplois => {
                response.send(
                    this.return_json(emplois)
                )
            }).catch(() => response.send(
                response.status(404).send("Not found")
            ));
    }
    recentEmplois = (request, response) => {
        new TableEmplois.recentEmplois(emplois => {
            this.return_json;
        });
    }
    emploisDetails = (request, response) => {

    }

    addEmploi = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        const { titre, domaine, specialiter, debut, fin, pays, ville, zone, durre, introduction, qualification, fonction, condition } = request.body;
        if (user != undefined) {
            if (user.id == id) {
                Utils.generateEmploisId()
                    .then(emploiId => {
                        new TableEmplois().add(emploiId, user.id, titre, domaine, specialiter, debut, fin, ville, pays, zone, durre, introduction, qualification, fonction, condition)
                            .then(res => {
                                response.redirect(`/employeur/${user.id}`);
                                new sendEMail().emplois(emploiId)
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    })
            }
            else {
                response.redirect('/')
            }
        }
        else {
            response.redirect('/');
        }
    }

    applicationEmplois = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        if (user != undefined) {
            // if (user.id == id) {
            new TableEmplois().getApplication(id)
                .then(application => {
                    console.log(application);
                    response.render(
                        this.path('applicationEmplois.ejs'), {
                        user: user,
                        applications: application
                    }
                    )
                })
                .catch(e => console.log(e));
            // }   
        }
    }

    accepterCandidat = (request, response) => {
        const id = request.params.id.split("-");
        const idCandidat = id[0];
        const idEmplois = id[1];
        let user = request.session.auth;
        if (user != undefined) {
            new TableEmplois().getApplicationWithEmployeur(user.id, idEmplois)
                .then(employeur => {
                    console.log(employeur.lenght)
                    if (employeur) {
                        if (employeur[0].id_employeur == user.id) {
                            new TableEmplois().accepteCandidat(idCandidat, idEmplois)
                                .then(res => response.redirect('/'))
                                .catch(e => console.log(e));
                        }
                    }
                    else {
                        console.log("non autoriser")
                    }
                })
                .catch(e => console.log(e));
        }
        else {
            response.redirect('/');
        }
    }

    refuserCandidat = (request, response) => {
        const id = request.params.id.split("-");
        const idCandidat = id[0];
        const idEmplois = id[1];
        let user = request.session.auth;
        if (user != undefined) {
            new TableEmplois().getApplicationWithEmployeur(user.id, idEmplois)
                .then(employeur => {
                    console.log(employeur.lenght)
                    if (employeur) {
                        if (employeur[0].id_employeur == user.id) {
                            new TableEmplois().refuserCandidat(idCandidat, idEmplois)
                                .then(res => response.redirect('/'))
                                .catch(e => console.log(e));
                        }
                    }
                    else {
                        console.log("non autoriser")
                    }
                })
                .catch(e => console.log(e));
        }
        else {
            response.redirect('/');
        }
    }
}
module.exports = EmploisControllers;