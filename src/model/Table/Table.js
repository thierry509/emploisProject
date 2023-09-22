const Database = require('../Database');
class Table{
    constructor(){
        this.database = new Database('localhost', 'root', '', 'emplois');
    }
}
module.exports = Table;