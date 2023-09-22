class Controllers{
    constructor(){
        this.pathMain = __dirname + '../../view/';
    }

    path = viewPath => this.pathMain + viewPath;
    
    return_json = (data)=>{
        return Object.values(JSON.parse(JSON.stringify(data)));
    }

    render = (view, data) =>{

    }
}

module.exports = Controllers;