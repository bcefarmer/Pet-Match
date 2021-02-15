CREATE DATABASE pets_db;

USE pets_db;

CREATE TABLE pets (
  id int AUTO_INCREMENT NOT NULL,
  type varchar(30) NOT NULL,
  gender varchar(30) NOT NULL,
  PRIMARY KEY(id)
);
