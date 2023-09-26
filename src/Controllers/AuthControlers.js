const Authentification = require("../Auth/Authentification");
const Utils = require("../Utils/Utils");
const TableUser = require("../model/Table/UserTable");
const { use } = require("../router/routeMain");
const Controllers = require("./Controller");
const bcrypt = require('bcrypt')

class AuthControllers extends Controllers {
    login = (request, response) => {

        const email = request.body.email,
            password = request.body.password;
        new Authentification().authUser(email, password)
            .then(user => {
                request.session.auth = user[0];
                response.locals.user = request.session.auth;
                response.redirect('/');
            })
            .catch(message => {
                const info = {
                    message: message,
                    error: true
                }
                response.render(
                    this.path('login.ejs'), {
                    response: info
                }
                );
            })
    }

    signIn = (request, response) => {
        const form = request.body;
        const email = form.email,
            emailConfirm = form.emailConfirmation,
            password = form.password,
            passwordConfirm = form.passwordConfirmation,
            regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // const password = bcrypt.genSalt(10).then(salt => bcrypt.hash(pass, salt));
        if (regexEmail.test(email) && email == emailConfirm && password == passwordConfirm) {
            let id = Utils.generateUserId().then(id => {
                console.log("In controllers", id);
                new TableUser().registerUser(id, email, password)
                    .then(result => {
                        if (form.type == "candidat") {
                            const firstName = form.firstName,
                                lastName = form.lastName;
                            new TableUser().registerCanditat(id, firstName, lastName)
                                .then(() => {
                                    new Authentification().authUser(email, password)
                                        .then(user => {
                                            request.session.auth = user[0];
                                            response.locals.user = request.session.auth;
                                            response.redirect('/');
                                        })
                                        .catch(message => {
                                            response.redirect('/login');
                                        })
                                })
                                .catch((e) => {
                                    console.log(e);
                                    response.redirect('/sign-in');
                                });
                        }
                        else if (form.type == "employeur") {
                            const name = form.name;
                            new TableUser().registerEmployeur(id, name)
                                .then(() => {
                                    new Authentification().authUser(email, password)
                                        .then(user => {
                                            request.session.auth = user;
                                            response.locals.user = request.session.auth;
                                            response.redirect('/');
                                        })
                                        .catch(message => {
                                            response.redirect('/login');
                                        })
                                });
                        }
                        else{
                            console.log("failed")
                        }
                    }).catch((e) => {
                        console.log('echec', e)
                    })
            })
        }
        else{
            let info ={
                message : "Les infomation ne sont pas correct",
                error : true
            } 
            response.render(
                this.path('sign-in.ejs'),{
                    response : info
                }

            )
        }
    }

    disconnect = (request, response) => {
        request.session.auth = undefined;
        response.redirect('/login')
    }
}
module.exports = AuthControllers;