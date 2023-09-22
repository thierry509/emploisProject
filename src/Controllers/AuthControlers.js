const Authentification = require("../Auth/Authentification");
const Utils = require("../Utils/Utils");
const TableUser = require("../model/Table/UserTable");
const Controllers = require("./Controller");
const bcrypt = require('bcrypt')

class AuthControllers extends Controllers {
    login = (request, response) => {
        const email = request.body.email,
            password = request.body.password;
        new Authentification().authUser(email, password)
            .then(user => {
                console.log("user login", user)
                request.session.auth = user;
                response.locals.user = request.session.auth;
                response.redirect('/');
            })
            .catch(message => {
                response.redirect('/login');
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
            console.log(password);
        if (regexEmail.test(email) && email == emailConfirm && password == passwordConfirm) {
            let id = Utils.generate();
            new TableUser().registerUser(id, email, password)
                .then(result => {
                    if (form.type == "candidat") {
                        const firstName = form.firstName,
                            lastName = form.lastName;
                        new TableUser().registerCanditat(id, firstName, lastName)
                        .then(()=>{
                            new Authentification().authUser(email, password)
                            .then(user => {
                                request.session.auth = user;
                                response.locals.user = request.session.auth;
                                response.redirect('/');
                            })
                            .catch(message => {
                                response.redirect('/login');
                            })
                        })
                        .catch((e)=>{
                            console.log(e);
                            response.redirect('/sign-in');
                        });
                    }
                    else if (form.type == "employeur") {
                        const name = form.name;
                        new TableUser().registerEmployeur(id, name)
                        .then(()=>{
                            new AuthControllers().authUser(email, password)
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
                }).catch((e) => {
                    console.log('echec', e)
                })
        }
    }
}
module.exports = AuthControllers;