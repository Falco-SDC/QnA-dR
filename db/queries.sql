-- Select all questions using product id
--  1. select all answers using question_id expected structure
--  "answers": {
--           68: {
--             "id": 68,
--             "body": "We are selling it here without any markup from the middleman!",
--             "date": "2018-08-18T00:00:00.000Z",
--             "answerer_name": "Seller",
--             "helpfulness": 4,
--             "photos": []
--             // ...
--           }
--         }

-- create an object : key is the answers id value is obj with id, body, date, annswername,helpfulness, photo (insert photo array of objects)

--  photos first
  -- array of objects [{photoid,url},{""},{""}...]

  --  left join -- select all photos with matching answer id
  -- SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful FROM answers INNER JOIN photos ON answers.id=photos.answer_id LIMIT 20; returns

  -- {
  --       "id": 5,
  --       "body": "Something pretty soft but I can't be sure",
  --       "date_written": 1599990560555,
  --       "answerer_name": "metslover",
  --       "helpful": 5
  --   }

--  need to add key of photos the balue is an array of objects that look like
-- {
--           "id": 1,
--           "url": "urlplaceholder/answer_5_photo_number_1.jpg"
--         }

--  also need to change column name in response -- id becomes answer_id
--  date is currentlyl epoch --needs another type ?

-- photos references answersid (currently not using foreign key )
--  altrer table to add ?
-- SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful,   photos.url FROM answers LEFT JOIN photos on photos.answers_id= answers.answers_id WHERE answers.question_id=1


--  aggregate photos into array
-- join first before using on

-- SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful, photos.answers_id FROM answers a LEFT JOIN photos p on a.id = p.answers_id WHERE p.answers_id=a.id;
-- SELECT JSON_AGG(photos.*) FROM photos;

-- left join
--   // then json_array(jsonbuildobject)

-- // create new key whose vaule is an array of objects each object has the keys/values from photos



-- jsonobject (question id as question page count )

-- SELECT JSON_OBJECT(`question_id, ${question_id}, page, ${page}, count, ${count}`)





-- `SELECT answers.id as answer_id, answers.body, answers.date_written, answers.answerer_name, answers.helpful, JSON_ARRAYAGG(JSON_OBJECT("id", photos.id,"url", photos.url)) photos FROM answers LEFT JOIN photos on photos.answer_id= answers.id WHERE answers.question_id=${question_id} GROUP BY answers.id`


-- SELECT JSON_OBJECT(
--   "question", `${question_id}`,
--   "page", `${page}`,
--   "count",`${count}`
-- )

-- SELECT JSON_OBJECT("test","these") UNION SELECT answers.id as answer_id, answers.body, answers.date_written, answers.answerer_name, answers.helpful, JSON_ARRAYAGG(JSON_OBJECT("id", photos.id,"url", photos.url)) photos FROM answers LEFT JOIN photos on photos.answer_id= answers.id WHERE answers.question_id=${question_id} GROUP BY answers.id

-- SELECT JSON_SET('{"count": "test"}') AS question


-- SELECT JSON_OBJECTAGG()


-- get all questions using product id
-- {
--   "product_id": "5",  create  outer obj on server side
--   "results": [{
--         "question_id": 37, ---> change name using 'as'
--         "question_body": "Why is this product cheaper here than other sites?",  -> alias
--         "question_date": "2018-10-18T00:00:00.000Z",  --> change date type && alias
--         "asker_name": "williamsmith",
--         "question_helpfulness": 4, --> alias  change response order reported first
--         "reported": false, -> alias --> then helpulness -> alias
--         "answers": SELECT  { --> build object
--           68: {
--             "id": 68,
--             "body": "We are selling it here without any markup from the middleman!",
--             "date": "2018-08-18T00:00:00.000Z",
--             "answerer_name": "Seller",
--             "helpfulness": 4,
--             "photos": []
--             // ...
--           }
--         }
--       },


-- select all columns from questions that i need
  --   change question date type
  --  json build agg obj
    --  add key of answers  --> json array agg( photos) - left join with answers
    --  all answers columns that i need
    --   change date type *epoch
      --  left join where all question id matches
      -- group by product id
      --  offset page limit count

      --  product id

--       SELECT questions.id as question_id , questions.body as question_body, questions.date_written as question_date, questions.asker_name, questions.helpful as question_helpfulness, questions.reported, "answers", JSON_OBJECTAGG("answers.id",JSON_OBJECT("id", answers.id, "body", answers.body, "date", answers.date_written, "answerer_name", answers.answerer_name, "helpfulness", answers.helpful,
--         JSON_ARRAYAGG(JSON_OBJECT("id", photos.id,"url", photos.url)) FROM answers LEFT JOIN photos on photos.answer_id=answers.id GROUP BY answers.id )) FROM questions LEFT JOIN answers on questions.id=answers.question_id  WHERE questions.product_id=${product_id}



--         `SELECT questions.id as question_id , questions.body as question_body, questions.date_written as question_date, questions.asker_name, questions.helpful as question_helpfulness, questions.reported, (SELECT JSON_OBJECTAGG(answers.id,JSON_OBJECT("id", answers.id, "body", answers.body, "date", answers.date_written, "answerer_name", answers.answerer_name, "helpfulness", answers.helpful, JSON_ARRAYAGG(JSON_OBJECT("id", photos.id, "url",photos.url)) photos FROM answers LEFT JOIN photos on photos.answer_id=answers.id WHERE answers.question_id=${question_id} GROUP BY answers.id )) FROM answers WHERE answers.question_id=questions.id) FROM questions WHERE questions.product_id=9 LIMIT 20

-- kinda working
--         -- SELECT questions.id as question_id , questions.body as question_body, questions.date_written as question_date, questions.asker_name, questions.helpful as question_helpfulness, questions.reported, (SELECT JSON_OBJECTAGG(answers.id,JSON_OBJECT("id", answers.id, "body", answers.body, "date", answers.date_written, "answerer_name", answers.answerer_name, "helpfulness", answers.helpful)) FROM answers WHERE answers.question_id=questions.id) FROM questions WHERE questions.product_id=9 LIMIT 20


--         `SELECT questions.id as question_id , questions.body as question_body, questions.date_written as question_date, questions.asker_name, questions.helpful as question_helpfulness, questions.reported, (SELECT JSON_OBJECTAGG(answers.id,JSON_OBJECT("id", answers.id, "body", answers.body, "date", answers.date_written, "answerer_name", answers.answerer_name, "helpfulness", answers.helpful, JSON_ARRAYAGG(JSON_OBJECT("id", photos.id, "url",photos.url)) photos FROM answers LEFT JOIN photos on photos.answer_id=answers.id WHERE answers.question_id=${question_id} GROUP BY answers.id )) FROM answers WHERE answers.question_id=questions.id) FROM questions WHERE questions.product_id=9 LIMIT 20


--         SELECT questions.id as question_id, questions.body as questions_body, questions.date_written as questions_date, questions.asker_name,questions.helpful as question_helpfulness, questions.reported as question_helpfulness, answers, JSON_OBJECTAGG()

--         SELECT questions.id as question_id , questions.body as question_body, questions.date_written as question_date, questions.asker_name, questions.helpful as question_helpfulness, questions.reported, JSON_ARRAYAGG(JSON_OBJECT("answers.id" as "answer_id" , answers.id, "answers.body", answers.body, "answers.date_written", answers.date_written, "answers.answerer_name", answers.answerer_name, "answers.helpful", answers.helpful ));



-- ADD A QUESTION
--  post request has --> body , name, email, pproduct id
--  pass the data with name editied to match db from controller
--  insert into questions

INSERT INTO tables (
  body, asker_name, asker_email, product_id) VALUES (${body}, {$asker_namee}, ${asker_email},${product_id});

  `INSERT INTO questions(product_id,body,asker_name,asker_email) VALUES (
    ${product_id}, ${body},
    ${asker_name},${asker_email}`

    -- CONVERT TO EPOCHS ON ISERT
INSERT INTO questions VALUES(UNIX_TIMESTAMP())