DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

USE questions_answers;

CREATE TABLE questions(
  id BIGINT NOT NULL PRIMARY KEY,
  product_id BIGINT NOT NULL ,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR(60),
  asker_email VARCHAR(60),
  reported int,
  helpful int
);

CREATE TABLE answers(
  id BIGINT NOT NULL PRIMARY KEY,
  question_id BIGint NOT NULL,
  body VARCHAR(1000),
  date_written BIGINT,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  reported INT,
  helpful INT
);

CREATE TABLE photos(
   id BIGINT NOT NULL PRIMARY KEY,
   answer_id BIGINT NOT NULL,
   url VARCHAR(200)
);

