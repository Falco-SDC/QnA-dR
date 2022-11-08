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