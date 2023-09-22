const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
const routes = require('./router/routeMain');
const routesEmplois = require('./router/RouteEmplois');
const routeAuth = require('./router/authRout');
const session = require('express-session');
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret : '123456789',
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false}
}));
app.set('view engine', 'ejs')
app.use('/', routes);
app.use('/emplois', routesEmplois);
app.use('/auth', routeAuth);
app.use(express.static('static'));
module.exports = app;