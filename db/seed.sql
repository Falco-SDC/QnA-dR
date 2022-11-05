-- LOAD DATA LOCAL INFILE '/Users/admin/Desktop/sdcCapStone/qna-dr/csvData/product.csv'
-- INTO TABLE products
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES
-- (id);

-- this use of path was the only way that worked

LOAD DATA LOCAL INFILE '/Users/admin/Desktop/sdcCapStone/qna-dr/csvData/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, body, date_written, asker_name, asker_email,reported,helpful);


LOAD DATA LOCAL INFILE '/Users/admin/Desktop/sdcCapStone/qna-dr/csvData/answers.csv' INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, question_id, body, date_written,answerer_name,answerer_email,reported,helpful);

LOAD DATA LOCAL INFILE '/Users/admin/Desktop/sdcCapStone/qna-dr/csvData/answers_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, answer_id, url);