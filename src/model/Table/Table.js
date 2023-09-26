require('dotenv').config();
const Database = require('../Database');

const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 
class Table{
    constructor(){
        this.database = new Database(host, user, password);
    }
}
module.exports = Table;