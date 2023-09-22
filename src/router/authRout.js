const express = require('express');
const AuthControllers = require('../Controllers/AuthControlers');
const route = express.Router();

route.post('/login', new AuthControllers().login);
route.post('/sign-in', new AuthControllers().signIn);
route.get('/', (req, res)=>{
    res.send('33333');
});
module.exports = route;