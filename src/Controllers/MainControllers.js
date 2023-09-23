const TableCandidat = require("../model/Table/TableCandidat");
const TableEmplois = require("../model/Table/TableEmplois");
const Controllers = require("./Controller");

class MainControllers extends Controllers {
    home = (request, response) => {
        let user = request.session.auth;
        new TableEmplois().recentEmplois()
            .then(emplois => {
                response.render(
                    this.pathMain, {
                    emplois: emplois,
                    user: user
                });
            })
    }
    login = (request, response) => {
        if (request.session.auth == undefined) {
            response.render(this.path('login.ejs'));
        }
        else {
            response.redirect('/');
        }
    }

    signIn = (request, response) => {
        response.render(this.path('sign-in.ejs'));
    }

    emploisDetails = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        new TableEmplois().emploisDetails(id)
            .then(details => {
                response.render(
                    this.path('emploisDetails.ejs'), {
                    details: details[0],
                    user: user
                });
            });
    }

    profile = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        new TableCandidat().candidat(id)
            .then(details => {
                new TableCandidat().etude(details[0].id).then(etude => {
                    new TableCandidat().experience(details[0].id)
                        .then(experience => {
                            response.render(
                                this.path('profile.ejs'), {
                                details: details[0],
                                user: user,
                                etudes: etude,
                                experiences: experience
                            }
                            );
                        });
                });
            });
    }

    editProfile = (request, response) => {
        const id = request.params.id;
        const user = request.session.auth;
        if (user != undefined) {
            if (user.id == id) {
                new TableCandidat().candidat(id)
                    .then(details => {
                        new TableCandidat().etude(details[0].id).then(etude => {
                            new TableCandidat().experience(details[0].id)
                                .then(experience => {
                                    response.render(
                                        this.path('editProfile.ejs'), {
                                        details: details[0],
                                        user: user,
                                        etudes: etude,
                                        experiences: experience
                                    }
                                    );
                                });
                        })
                    })
            }
            else {
                console.log(user == id)
                response.redirect('/');
            }
        }
        else {
            response.redirect('/');
        }
    }
}
module.exports = MainControllers;