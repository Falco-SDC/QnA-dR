DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

USE questions_answers;

CREATE TABLE products(
  product_id int NOT NULL,
  PRIMARY KEY (product_id)
);


CREATE TABLE photos(
   id INT NOT NULL,
   answer_id INT,
   url VARCHAR(100)
   PRIMARY KEY(id)
   FOREIGN KEY ()
);

CREATE TABLE answers(
  id INT NOT NULL PRIMARY KEY,
  body VARCHAR(60),
  date_written BIGINT,
  answerer_name VARCHAR(60),
  asker_email VAR(60),
  reported INT,
  helpful INT,
  FOREIGN KEY
);

-- CREATE TABLE questions(

-- )


