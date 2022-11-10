const mysql = require("mysql2");
// only way to access enironment variables --due to Node?
require("dotenv").config( { path:'../.env' } );

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

SelectAllQuestions = (product_id) => {
  return new Promise((resolve, reject)=>{
   // select all questions using product id
    pool.query(`SELECT questions.id as question_id ,
     questions.body as question_body,
      ( SELECT FROM_UNIXTIME(questions.date_written/1000)) as question_date,
       questions.asker_name,
        questions.helpful as question_helpfulness,
         questions.reported,
         (SELECT JSON_OBJECTAGG(
            answers.id, JSON_OBJECT(
              "id", answers.id,
              "body", answers.body,
              "date", (SELECT FROM_UNIXTIME(answers.date_written/1000)),
              "answerer_name", answers.answerer_name,
              "helpfulness", answers.helpful,
              "photos", (SELECT JSON_ARRAYAGG(
                         JSON_OBJECT("id", photos.id,
                         "url",photos.url))
                         FROM photos WHERE photos.answer_id=answers.id)
                         )) FROM answers WHERE answers.question_id=questions.id) answers FROM questions WHERE questions.product_id=13 LIMIT 20`, (error, questions) => {
                          if(error) {
                            return reject(error)
                          }
                          return resolve(questions)
                        })
                      })
                    }

SelectAllAnswers = (question_id, count, page) =>{
  return new Promise((resolve,reject) => {
    pool.query(`SELECT answers.id as answer_id,
                answers.body,
                 (SELECT FROM_UNIXTIME(answers.date_written/1000)) as date,
                 answers.answerer_name,
                answers.helpful,
                JSON_ARRAYAGG(
                  JSON_OBJECT("id", photos.id,"url", photos.url))
                  photos FROM answers LEFT JOIN photos on photos.answer_id= answers.id
                  WHERE answers.question_id=${question_id}
                  GROUP BY answers.id LIMIT ${page}, ${count}`,
                  (error, answers)=>{
                    if(error) {
                      return reject(error)
                    }
                    return resolve(answers)
                  })
                })
              }

// this query data does not need to return data from db
AddAQuestionModel = (setUp) =>{
  return new Promise((resolve, reject) => {
    pool.query( `INSERT INTO questions SET ?`, setUp
                 , (error, answers) => {
                  if(error) {
                    return reject(error,'ERROR POSTING QUESTION')
                  }
                  return resolve(answers)
                })
              })
            }

// this query promise does not need to return data
AddAnAnswerModal = (setUp, photos)=> {
  return pool.promise().query(`INSERT INTO answers SET ? `, setUp).then( ()=> {
    pool.promise().query(`INSERT INTO photos (answer_id, url) VALUES(LAST_INSERT_ID(),'${photos}')` ).then(()=> {
    })
    .catch((err) =>{
      console.log(err)
    })
  })
  .catch((err)=>{
    console.log(err)
  })
}


// Updates a question to show it was found helpful.
UpdateQuestionHelpful = (question_id) =>{
  return pool.promise().query(`UPDATE questions
  SET questions.helpful=questions.helpful+1
  WHERE questions.id= ${question_id};`)
  .catch((err)=>{
    console.log(err)
  })
}

// Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
UpdateReportQuestion = (question_id) =>{
  return pool.promise().query(`UPDATE questions
  SET questions.reported= questions.reported+1
  WHERE questions.id= ${question_id};`)
  .catch((err)=>{
    console.log(err)
  })
}

// Updates answer helpful count
UpdateAnswerHelpful = (answer_id) =>{
 return pool.promise().query(`UPDATE answers
 SET answers.helpful=answers.helpful+1
 WHERE answers.id= ${answer_id}`)
 .catch((err)=>{
  console.log(err)
 })
}

// update answer rports, should not be included in get request for questions
UpdateAnswerReport = (answer_id) =>{
  return pool.promise().query(`UPDATE answers
  SET answers.reported=answers.reported+1
  WHERE answers.id = ${answer_id}`)
  .catch((err)=>{
   console.log(err)
  })
}


module.exports = {SelectAllQuestions, SelectAllAnswers ,AddAQuestionModel, AddAnAnswerModal, UpdateAnswerHelpful,UpdateReportQuestion, UpdateQuestionHelpful, UpdateAnswerReport}


// still need to handle nulls
// handle reported questions/answers to not be included in get
// add index columns
// add foreign keys
// add loop to handle posting photos array
