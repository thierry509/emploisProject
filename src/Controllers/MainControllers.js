const TableCandidat = require("../model/Table/TableCandidat");
const TableEmplois = require("../model/Table/TableEmplois");
const TableEmployeur = require("../model/Table/TableEmployeur");
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
            .catch(e => {
                console.log(e);
            });
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
                if (details.length == 1) {
                    console.log(details);
                    response.render(
                        this.path('emploisDetails.ejs'), {
                        details: details[0],
                        user: user
                    });
                }
                else {
                    response.redirect('/')
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    profile = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        new TableCandidat().candidat(id)
            .then(details => {
                if (details.length > 0) {
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
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    })
                        .catch(e => {
                            console.log(e);
                        });
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    employeurDetails = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        new TableEmployeur().employeur(id)
            .then(details => {
                if (details.length > 0) {
                    console.log(details[0])
                    new TableEmployeur().emplois(details[0].id)
                        .then(emplois => {
                            console.log(emplois);
                            response.render(
                                this.path('employeur.ejs'), {
                                details: details[0],
                                user: user,
                                emplois: emplois
                            }
                            )
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    response.redirect('/');
                }
            })
            .catch(e => {
                console.log(e);
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
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        })
                            .catch(e => {
                                console.log(e);
                            });
                    })
                    .catch(e => {
                        console.log(e);
                    });
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

    addEmplois = (request, response) => {
        const id = request.params.id;
        const user = request.session.auth;
        if (user != undefined) {
            if (user.id == id) {
                response.render(
                    this.path('addEmplois.ejs'), {
                    user: user,
                }
                )
            }
            else {
                response.redirect('/');
            }
        } else {
            response.redirect('/');
        }
    }

    application = (request, response) => {
        const id = request.params.id;
        const user = request.session.auth;
        if (user != undefined) {
            if (user.type == "candidat") {
                new TableCandidat().application(parseInt(id), parseInt(user.id))
                    .then(res => {
                        response.redirect('/')
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
        else {
            response.redirect('/login');
        }
    }
}
module.exports = MainControllers;