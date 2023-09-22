-- Création de la base de données Cls.
DROP DATABASE IF EXISTS emplois;
CREATE DATABASE emplois;

-- Conexion à la base de données Cls
USE emplois;

-- Création des tables dans la base de donnée.
CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE employeur(
    id_user INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    pays VARCHAR(255),
    ville VARCHAR(255),
    CONSTRAINT fk_id_user FOREIGN KEY(id_user) REFERENCES user(id)
);

CREATE TABLE candidat(
    id_user INT PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    sexe ENUM('M', 'F'),
    dateDeNaiss DATE,
    telephone VARCHAR(15),
    ville VARCHAR(255),
    pays VARCHAR(255),
    competence VARCHAR(255),
    CONSTRAINT fk_id_user_candidat FOREIGN KEY(id_user) REFERENCES user(id)
);

CREATE TABLE etude(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_candidat INT,
    niveau VARCHAR(30) NOT NULL,
    domaine VARCHAR(150) NOT NULL,
    etablissement VARCHAR(255) NOT NULL,
    pays VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    CONSTRAINT fk_id_candidat FOREIGN KEY(id_candidat) REFERENCES candidat(id_user)
);

CREATE TABLE emplois(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_employeur INT,
    titre VARCHAR(255) NOT NULL,
    domaine VARCHAR(150) NOT NULL,
    spevialiter VARCHAR(255) NOT NULL,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    ville VARCHAR(255) NOT NULL,
    zone VARCHAR(255) NOT NULL,
    dure VARCHAR(150) NOT NULL,
    introduction VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    fonction VARCHAR(255) NOT NULL,
    conditionDeTravail VARCHAR(255) NOT NULL,
    CONSTRAINT fk_id_employeur FOREIGN KEY(id_employeur) REFERENCES employeur(id_user)
);

CREATE TABLE experience(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_candidat INT,
    domaine VARCHAR(255) NOT NULL,
    entreprise VARCHAR(255) NOT NULL,
    paysdesc  VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    CONSTRAINT fk_id_candidat_experience FOREIGN KEY(id_candidat) REFERENCES candidat(id_user)
);

-- Fin de la création des tables.AFTER

-- Insertion dans la table User
INSERT INTO user (id, email, password) VALUES
(1, 'user1@example.com', 'password123'),
(2, 'user2@example.com', 'test456'),
(3, 'user3@example.com', 'securepass'),
(4, 'employeur1@example.com', 'empypass'),
(5, 'candidat1@example.com', 'candipass'),
(6, 'user6@example.com', 'userpass6'),
(7, 'user7@example.com', 'userpass7'),
(8, 'user8@example.com', 'userpass8'),
(9, 'user9@example.com', 'userpass9'),
(10, 'user10@example.com', 'userpass10');

-- Insertion dans la table Employeur
INSERT INTO employeur (id_user, nom, pays, ville) VALUES
(1, 'Entreprise A', 'France', 'Paris'),
(2, 'Entreprise B', 'USA', 'New York'),
(3, 'Company C', 'Canada', 'Toronto'),
(4, 'Firma D', 'Allemagne', 'Berlin'),
(5, 'Empresa E', 'Espagne', 'Madrid'),
(6, 'Azienda F', 'Italie', 'Rome'),
(7, 'Empresa G', 'Brésil', 'Sao Paulo'),
(8, 'Company H', 'Royaume-Uni', 'Londres'),
(9, 'Firma I', 'Pays-Bas', 'Amsterdam'),
(10, 'Company J', 'Australie', 'Sydney');

-- Insertion dans la table Candidat
INSERT INTO candidat (id_user, prenom, nom, sexe, dateDeNaiss, telephone, ville, pays, competence) VALUES
(5, 'Jean', 'Dupont', 'M', '1990-05-15', '+1234567890', 'Lyon', 'France', 'Développement'),
(6, 'Emma', 'Martin', 'F', '1988-12-02', '+9876543210', 'New York', 'USA', 'Design'),
(7, 'Pierre', 'Leclerc', 'M', '1992-08-20', '+3345678901', 'Paris', 'France', 'Marketing'),
(8, 'Sophie', 'Rousseau', 'F', '1991-04-17', '+1122334455', 'Montréal', 'Canada', 'Finance'),
(9, 'Luc', 'Dubois', 'M', '1993-02-10', '+4455667788', 'Berlin', 'Allemagne', 'Informatique'),
(10, 'Maria', 'Garcia', 'F', '1989-07-25', '+6677889900', 'Barcelone', 'Espagne', 'Communication'),
(1, 'Luigi', 'Rossi', 'M', '1990-11-30', '+1122334455', 'Rome', 'Italie', 'Vente'),
(2, 'Carlos', 'Silva', 'M', '1992-06-15', '+3344556677', 'Sao Paulo', 'Brésil', 'RH'),
(3, 'Emily', 'Johnson', 'F', '1988-03-05', '+1122334455', 'Londres', 'Royaume-Uni', 'Design'),
(4, 'Anna', 'Bakker', 'F', '1991-09-12', '+5566778899', 'Amsterdam', 'Pays-Bas', 'Développement');

-- Insertion dans la table Etude
INSERT INTO etude (id, id_candidat, niveau, domaine, etablissement, pays, region, dateDebut, dateFin) VALUES
(1, 1, 'Master', 'Informatique', 'Université A', 'France', 'Rhône-Alpes', '2010-09-01', '2012-06-30'),
(2, 2, 'Bachelor', 'Art', 'College B', 'USA', 'New York', '2006-08-01', '2010-05-30'),
(3, 3, 'Licence', 'Marketing', 'Université C', 'France', 'Île-de-France', '2012-09-01', '2015-06-30'),
(4, 4, 'Master', 'Finance', 'University D', 'Canada', 'Québec', '2010-09-01', '2013-05-30'),
(5, 5, 'Licence', 'Informatique', 'Universität E', 'Allemagne', 'Berlin', '2011-10-01', '2015-07-30'),
(6, 6, 'Bachelor', 'Communication', 'Universidad F', 'Espagne', 'Catalogne', '2012-09-01', '2016-06-30'),
(7, 7, 'Licence', 'Commerce', 'Università G', 'Italie', 'Lombardie', '2011-10-01', '2015-07-30'),
(8, 8, 'Master', 'Ressources Humaines', 'Universidade H', 'Brésil', 'São Paulo', '2013-09-01', '2015-06-30'),
(9, 9, 'Bachelor', 'Design', 'University I', 'Royaume-Uni', 'Angleterre', '2010-09-01', '2014-06-30'),
(10, 10, 'Licence', 'Informatique', 'Universiteit J', 'Pays-Bas', 'Hollande-Septentrionale', '2012-09-01', '2016-06-30');

-- Insertion dans la table Emplois
INSERT INTO emplois (id, id_employeur, titre, domaine, spevialiter, dateDebut, dateFin, ville, zone, dure, introduction, qualification, fonction, conditionDeTravail) VALUES
(1, 1, 'Développeur Web', 'Informatique', 'Web', '2012-07-15', '2015-12-20', 'Paris', 'Centre-ville', 'Temps plein', 'Rejoignez notre équipe...', 'Diplôme en informatique...', 'Développement de sites web...', 'Environnement dynamique...'),
(2, 2, 'Designer UX/UI', 'Design', 'Interface', '2015-03-10', '2020-06-25', 'New York', 'Downtown', 'Temps plein', 'Nous recherchons un designer...', 'Expérience dans la conception...', 'Conception d_interfaces...', 'Collaboratif et stimulant...'),
(3, 3, 'Responsable Marketing', 'Marketing', 'Stratégie', '2011-09-05', '2014-11-15', 'Paris', 'Centre-ville', 'Temps plein', 'Rejoignez notre équipe marketing...', 'Expérience en marketing...', 'Gestion de campagnes publicitaires...', 'Équipe créative et innovante...'),
(4, 4, 'Analyste financier', 'Finance', 'Analyse', '2014-02-20', '2017-07-30', 'Montréal', 'Centre-ville', 'Temps plein', 'Nous recherchons un analyste financier...', 'Diplôme en finance...', 'Analyse de données financières...', 'Environnement international...'),
(5, 5, 'Développeur logiciel', 'Informatique', 'Logiciel', '2013-06-10', '2016-12-25', 'Berlin', 'Technopark', 'Temps plein', 'Rejoignez notre équipe de développement...', 'Expérience en développement logiciel...', 'Programmation de logiciels...', 'Culture de l_innovation...'),
(6, 6, 'Responsable de la communication', 'Communication', 'Relations publiques', '2015-08-01', '2021-02-28', 'Barcelone', 'Centre-ville', 'Temps plein', 'Nous cherchons un responsable de la communication...', 'Expérience en communication...', 'Gestion des relations publiques...', 'Environnement diversifié...'),
(7, 7, 'Vendeur en magasin', 'Commerce', 'Vente au détail', '2011-12-15', '2016-07-10', 'Rome', 'Centre-ville', 'Temps plein', 'Rejoignez notre équipe de vente...', 'Expérience en vente au détail...', 'Vente de produits en magasin...', 'Clientèle locale...'),
(8, 8, 'Responsable des RH', 'Ressources Humaines', 'Recrutement', '2014-04-05', '2016-11-30', 'Sao Paulo', 'Zone financière', 'Temps plein', 'Nous cherchons un responsable des RH...', 'Expérience en gestion des RH...', 'Recrutement et gestion du personnel...', 'Environnement dynamique...'),
(9, 9, 'Designer graphique', 'Design', 'Graphisme', '2010-11-10', '2014-09-05', 'Londres', 'Centre-ville', 'Temps plein', 'Rejoignez notre équipe de design...', 'Expérience en conception graphique...', 'Conception graphique et artistique...', 'Créativité au quotidien...'),
(10, 10, 'Ingénieur logiciel', 'Informatique', 'Développement de logiciels', '2012-08-20', '2017-12-15', 'Amsterdam', 'Technopark', 'Temps plein', 'Nous cherchons un ingénieur logiciel...', 'Expérience en développement de logiciels...', 'Conception et développement de logiciels...', 'Innovation et collaboration...');

-- Insertion dans la table Experience
INSERT INTO experience (id, id_candidat, domaine, entreprise, paysdesc, region, description, dateDebut, dateFin) VALUES
(1, 1, 'Développement Web', 'Startup X', 'France', 'Paris', 'Travail sur le projet de développement web...', '2013-01-10', '2015-12-20'),
(2, 2, 'Conception d_interfaces', 'Agency Y', 'USA', 'New York', 'Conception d_interfaces utilisateur...', '2016-02-05', '2020-06-25'),
(3, 3, 'Stratégie Marketing', 'Marketing Solutions', 'France', 'Paris', 'Gestion de la stratégie marketing...', '2011-09-15', '2014-11-30'),
(4, 4, 'Analyse Financière', 'Financial Services', 'Canada', 'Montréal', 'Analyse financière approfondie...', '2014-03-01', '2017-08-15'),
(5, 5, 'Développement de Logiciels', 'Software Innovators', 'Allemagne', 'Berlin', 'Développement de logiciels avancés...', '2013-06-25', '2016-12-31'),
(6, 6, 'Gestion des Relations Publiques', 'PR Experts', 'Espagne', 'Barcelone', 'Gestion des relations publiques et de la communication...', '2015-08-10', '2021-03-15'),
(7, 7, 'Vente en Magasin', 'Retail Shop', 'Italie', 'Rome', 'Vente de produits en magasin...', '2012-01-01', '2016-07-31'),
(8, 8, 'Ressources Humaines', 'HR Solutions', 'Brésil', 'Sao Paulo', 'Gestion des ressources humaines et du recrutement...', '2014-04-15', '2016-12-31'),
(9, 9, 'Conception Graphique', 'Design Studio', 'Royaume-Uni', 'Londres', 'Conception graphique et artistique...', '2010-11-20', '2014-09-30'),
(10, 10, 'Développement de Logiciels', 'Tech Innovations', 'Pays-Bas', 'Amsterdam', 'Conception et développement de logiciels...', '2012-08-25', '2017-12-31');

-- Fin de l'insertion des données.            console.log(emplois);
