class User{
    constructor(id, email, password){
        this.id = id;
        this.email = email;
        this.password = password;
    }

    get_id(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }

    getEmail(){
        this.email = email;
    }
    setEmail(email){
        this.email = email;
    }

    getPassword(){
        return this.password;
    }
    setPassword(password){
        this.password = password;
    }
}