const Database = require('../Database');
class Table{
    constructor(){
        this.database = new Database('localhost', 'root', 'password', 'emplois');
    }
}
module.exports = Table;