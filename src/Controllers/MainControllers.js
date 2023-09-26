const Utils = require("../Utils/Utils");
const Verification = require("../mail/Verification");
const TableCandidat = require("../model/Table/TableCandidat");
const TableEmplois = require("../model/Table/TableEmplois");
const TableEmployeur = require("../model/Table/TableEmployeur");
const TableUser = require("../model/Table/UserTable");
const Controllers = require("./Controller");

class MainControllers extends Controllers {
    notFound = (request, response) => {
        response.render(
            this.path("404.ejs")
        );
    }

    serverCrached = (request, response) => {
        response.render(
            this.path('500.ejs')
        )
    }
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
                response.redirect('500')
            });
    }
    login = (request, response) => {
        if (request.session.auth == undefined) {
            const info = {
                message: "",
                error: false
            }
            response.render(
                this.path('login.ejs'), {
                response: info
            }
            );
        }
        else {
            response.redirect('/');
        }
    }

    signIn = (request, response) => {
        const info = {
            message: "",
            error: false
        }
        response.render(
            this.path('sign-in.ejs'), {
            response: info
        }
        );
    }

    emploisDetails = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        new TableEmplois().emploisDetails(id)
            .then(details => {
                if (details.length == 1) {
                    new Verification().emplois(details[0].id);
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
                response.redirect('500')
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
                                response.redirect('500')
                            });
                    })
                        .catch(e => {
                            response.redirect('500')
                        });
                }
            })
            .catch(e => {
                response.redirect('500')
            });
    }
    employeurDetails = (request, response) => {
        const id = request.params.id;
        let user = request.session.auth;
        new TableEmployeur().employeur(id)
            .then(details => {
                if (details.length > 0) {
                    new TableEmployeur().emplois(details[0].id)
                        .then(emplois => {
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
                        response.redirect(`/applicationCandidat/${user.id}`);
                    })
                    .catch(e => {
                        response.redirect('500')
                    });
            }
        }
        else {
            response.redirect('/login');
        }
    }

    about = (request, response) => {
        const user = request.session.auth;
        response.render(
            this.path('about.ejs'), {
            user: user
        }
        )
    }
    contact = (request, response) => {
        const user = request.session.auth;
        response.render(
            this.path('contact.ejs'), {
            user: user
        }
        )
    }

    feedBack = (request, response)=>{
        const {fname, lname, email, comment} = request.body;
        if(!(Utils.isEmpty(fname) || Utils.isEmpty(lname) || Utils.isEmpty(email) || Utils.isEmpty())){
            new TableUser().feedBack(fname, lname, email, comment)
            .then(res=> response.redirect('/contact'))
            .catch(e=>{
                response.redirect('/500')
            })    
        }
    }
}
module.exports = MainControllers;