const Utils = require("../Utils/Utils");

class Emplois{
    constructor(titre, domaine, specialiter, debut, 
        fin, pays, ville, zone, durre, introduction, 
        qualification, fonction, condition){
            this.titre = titre;
            this.domaine = domaine;
            this.specialiter = specialiter;
            this.debut = debut;
            this.fin = fin;
            this.pays = pays;
            this.ville = ville;
            this.zone = zone;
            this.durre = durre
            this.introduction = introduction;
            this.qualification = qualification;
            this.fonction = fonction;
            this.condition = condition;
            this.minIntro = Utils.reduct(introduction);
    }
}
module.exports = Emplois;