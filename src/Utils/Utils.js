const crypto = require('crypto');
class Utils {
     static generate = () => {
        let result = ''
        const characters = '0123456789';
        const charactersLength = characters.length;

        const randomBytes = crypto.randomBytes(10);

        for (let i = 0; i < 5; i++) {
            const randomIndex = randomBytes[i] % charactersLength;
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    static generateUserId(){
        return new Promise((resolve, reject)=>{
            let id = Utils.generate();
        })
    }
}
module.exports = Utils;