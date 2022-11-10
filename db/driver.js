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
  console.log(product_id,'from model')
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
                 answers.date_written,
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

// one function for posting answer
  // chain query to next query

  // Promise.all([
  //   pool.query(`INSERT INTO answers SET ? `, setUp),
  //   pool.query(`INSERT INTO photos (answer_id,url) VALUES (LAST_INSERT_ID(), SET ?)` , photos)
  //  ])


// this query promise does not need to return data
AddAnAnswerModal = (setUp, photos)=> {
  // let query1 =  pool.promise().query(`INSERT INTO answers SET ? `, setUp)

  // let query2 =  pool.promise().query(`INSERT INTO photos (answer_id, url) VALUES(LAST_INSERT_ID(),'${photos}')` )
  // let query2 = pool.promise().query(`SELECT LAST_INSERT_ID()`)
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

// AddPhotosToAnswers = (photos) => {
//   return new Promise((resolve,reject) => {
//     pool.query(`INSERT INTO photos (answer_id,url) VALUES (LAST_INSERT_ID(), SET ?)` , photos, (error, asnwers) => {
//       if(error) {
//         return reject(error,'ERROR POSTING PHOTOS')
//       }
//       console.log(answers)
//       return resolve('CREATED')
//     })
//   })
// }










// Updates a question to show it was found helpful.
UpdateAnswerHelpful = () =>{
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM answers LIMIT 9`, (error, answers) => {
      if(error) {
        return reject(error)
      }
      return resolve(answers)
    })
  })
}

// Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
UpdateReportQuestion = () =>{
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM questions LIMIT 9`, (error, questions) => {
      if(error) {
        return reject(error)
      }
      return resolve(questions)
    })
  })
}

UpdateAnswerHelpful = () =>{
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM questions LIMIT 9`, (error, questions) => {
      if(error) {
        return reject(error)
      }
      return resolve(questions)
    })
  })
}


UpdateAnswerReport = () =>{
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM questions LIMIT 9`, (error, questions) => {
      if(error) {
        return reject(error)
      }
      return resolve(questions)
    })
  })
}


// organize order to match controllers -- api -learn
  // is there anywhere else i can write the queries (save for refactor)


// 3. create promise function for getting questions
// 4. build query with controller info
// 5. run/return query

module.exports = {SelectAllQuestions, SelectAllAnswers ,AddAQuestionModel, AddAnAnswerModal, UpdateAnswerHelpful,UpdateReportQuestion}