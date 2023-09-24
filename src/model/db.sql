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
    dateDebut VARCHAR(4) NOT NULL,
    dateFin VARCHAR(4) NOT NULL,
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
    pays  VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    debut VARCHAR(4) NOT NULL,
    fin VARCHAR(4) NOT NULL,
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
(5, 'Empresa E', 'Espagne', 'Madrid');


-- Insertion dans la table Candidat
INSERT INTO candidat (id_user, prenom, nom, sexe, dateDeNaiss, telephone, ville, pays, competence) VALUES
(6, 'Emma', 'Martin', 'F', '1988-12-02', '+9876543210', 'New York', 'USA', 'Design'),
(7, 'Pierre', 'Leclerc', 'M', '1992-08-20', '+3345678901', 'Paris', 'France', 'Marketing'),
(8, 'Sophie', 'Rousseau', 'F', '1991-04-17', '+1122334455', 'Montréal', 'Canada', 'Finance'),
(9, 'Luc', 'Dubois', 'M', '1993-02-10', '+4455667788', 'Berlin', 'Allemagne', 'Informatique'),
(10, 'Maria', 'Garcia', 'F', '1989-07-25', '+6677889900', 'Barcelone', 'Espagne', 'Communication');

-- Insertion dans la table Etude
INSERT INTO etude (id, id_candidat, niveau, domaine, etablissement, pays, region, dateDebut, dateFin) VALUES
(6, 6, 'Bachelor', 'Communication', 'Universidad F', 'Espagne', 'Catalogne', '2012', '2016'),
(7, 7, 'Licence', 'Commerce', 'Università G', 'Italie', 'Lombardie', '2011', '2015'),
(8, 8, 'Master', 'Ressources Humaines', 'Universidade H', 'Brésil', 'São Paulo', '2013', '2015'),
(9, 9, 'Bachelor', 'Design', 'University I', 'Royaume-Uni', 'Angleterre', '2010', '2014'),
(10, 10, 'Licence', 'Informatique', 'Universiteit J', 'Pays-Bas', 'Hollande-Septentrionale', '2012', '2016');

-- Insertion dans la table Emplois
INSERT INTO emplois (id, id_employeur, titre, domaine, spevialiter, dateDebut, dateFin, ville, zone, dure, introduction, qualification, fonction, conditionDeTravail) VALUES
(1, 1, 'Développeur Web', 'Informatique', 'Web', '2012-07-15', '2015-12-20', 'Paris', 'Centre-ville', 'Temps plein', 'Rejoignez notre équipe...', 'Diplôme en informatique...', 'Développement de sites web...', 'Environnement dynamique...'),
(2, 2, 'Designer UX/UI', 'Design', 'Interface', '2015-03-10', '2020-06-25', 'New York', 'Downtown', 'Temps plein', 'Nous recherchons un designer...', 'Expérience dans la conception...', 'Conception d_interfaces...', 'Collaboratif et stimulant...'),
(3, 3, 'Responsable Marketing', 'Marketing', 'Stratégie', '2011-09-05', '2014-11-15', 'Paris', 'Centre-ville', 'Temps plein', 'Rejoignez notre équipe marketing...', 'Expérience en marketing...', 'Gestion de campagnes publicitaires...', 'Équipe créative et innovante...'),
(4, 4, 'Analyste financier', 'Finance', 'Analyse', '2014-02-20', '2017-07-30', 'Montréal', 'Centre-ville', 'Temps plein', 'Nous recherchons un analyste financier...', 'Diplôme en finance...', 'Analyse de données financières...', 'Environnement international...'),
(5, 5, 'Développeur logiciel', 'Informatique', 'Logiciel', '2013-06-10', '2016-12-25', 'Berlin', 'Technopark', 'Temps plein', 'Rejoignez notre équipe de développement...', 'Expérience en développement logiciel...', 'Programmation de logiciels...', 'Culture de l_innovation...');
-- Insertion dans la table Experience
INSERT INTO experience (id, id_candidat, domaine, entreprise, pays, region, description, debut, fin) VALUES
(6, 6, 'Gestion des Relations Publiques', 'PR Experts', 'Espagne', 'Barcelone', 'Gestion des relations publiques et de la communication...', '2015', '2021'),
(7, 7, 'Vente en Magasin', 'Retail Shop', 'Italie', 'Rome', 'Vente de produits en magasin...', '2012', '2016'),
(8, 8, 'Ressources Humaines', 'HR Solutions', 'Brésil', 'Sao Paulo', 'Gestion des ressources humaines et du recrutement...', '2014', '2016'),
(9, 9, 'Conception Graphique', 'Design Studio', 'Royaume-Uni', 'Londres', 'Conception graphique et artistique...', '2010', '2014'),
(10, 10, 'Développement de Logiciels', 'Tech Innovations', 'Pays-Bas', 'Amsterdam', 'Conception et développement de logiciels...', '2012', '2017');

-- Fin de l'insertion des données.            console.log(emplois);
