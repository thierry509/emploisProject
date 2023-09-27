const TableCandidat = require("../database/Table/TableCandidat");
const Controllers = require("./Controller");

class CandidatControllers extends Controllers {
    constructor() {
        super();
        this.tableCandidat = new TableCandidat();
    }
    updateCandidat = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        const body = request.body;
        if (user != undefined) {
            if (user.id == id) {
                new TableCandidat().updateCandidat(id, body.nom, body.prenom, body.sexe, body.date, body.telephone, body.ville, body.pays, body.competence)
                    .then(res => {
                        response.redirect(`/editProfile/${id}`)
                    })
                    .catch(e => {
                        response.redirect('500')
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

    updateEtude = (request, response) => {
        const id = request.params.id.split('-');
        let user = request.session.auth;
        const userId = id[0], etudeId = id[1];
        const body = request.body;
        console.log(body);
        if (user != undefined) {
            if (user.id == userId) {
                new TableCandidat().updateEtude(body.niveau, body.domaine, body.etablissement, body.pays, body.region, body.debut, body.fin, etudeId)
                    .then(res => {
                        response.redirect(`/editProfile/${userId}`)
                    })
                    .catch(e => {
                        response.redirect('500')
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

    updateExperience = (request, response) => {
        const id = request.params.id.split('-');
        let user = request.session.auth;
        const userId = id[0], ExpId = id[1];
        const body = request.body;
        console.log(body);
        if (user != undefined) {
            if (user.id == userId) {
                new TableCandidat().updateExperience(body.domaine, body.entreprise, body.pays, body.region, body.description, body.debut, body.fin, ExpId)
                    .then(res => {
                        response.redirect(`/editProfile/${userId}`)
                    })
                    .catch(e => {
                        response.redirect('500')                    });
            }
            else {
                response.redirect('/')
            }
        }
        else {
            response.redirect('/');
        }
    }

    registerEtude = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        const { niveau, domaine, etablissement, pays, region, debut, fin } = request.body;
        console.log(request.body);
        if (user != undefined) {
            if (user.id == id) {
                new TableCandidat().saveEtude(niveau, domaine, etablissement, pays, region, debut, fin, user.id)
                    .then(res => {
                        response.redirect(`/editProfile/${user.id}`)
                    })
                    .catch(e => {
                        console.log(e);
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

    registerExperience = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        const { domaine, entreprise, pays, region, description, debut, fin } = request.body;
        console.log(request.body);
        if (user != undefined) {
            if (user.id == id) {
                new TableCandidat().saveExperience(user.id, domaine, entreprise, pays, region, description, debut, fin)
                    .then(res => {
                        response.redirect(`/editProfile/${user.id}`)
                    })
                    .catch(e => {
                        console.log(e);
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

    applicationCandidat = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        if (user != undefined) {
            if (user.id == id) {
                new TableCandidat().getApplication(id)
                    .then(application => {
                        console.log(application);
                        response.render(
                            this.path('applicationCandidat.ejs'), {
                            user: user,
                            applications: application
                        }
                        )
                    }).catch(e=>{
                        response.redirect('500')
                    })
            }
        }
        else {
            response.redirect('/');
        }
    }

    deleteApplication = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        if (user != undefined) {
            new TableCandidat().deleteApplication(id, user.id)
                .then(res => response.redirect(`/applicationCandidat/${user.id}`))
                .catch(e => {
                    response.redirect('500')
                });
        }
        else {
            response.redirect("/")
        }
    }
}

module.exports = CandidatControllers