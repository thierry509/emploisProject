require('dotenv').config();
const Database = require('../Database');

const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 
const db = process.env.DB_NAME;

class Table{
    constructor(){
        this.database = new Database(host, user, password, db);
    }
}
module.exports = Table;