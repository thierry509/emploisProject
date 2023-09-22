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
        console.log("Session medlwet", request.session.auth);
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
                console.log(details);
                response.render(
                    this.path('emploisDetails.ejs'), {
                    details: details[0],
                    user: user
                });
            });
    }
}
module.exports = MainControllers;