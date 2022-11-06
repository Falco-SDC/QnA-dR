const mysql = require("mysql2");
// only way to access enironment variables --due to Node?
require("dotenv").config( { path:'../.env' } );

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

SelectAllQuestions = () => {
  return new Promise((resolve, reject)=>{
    pool.query('SELECT * FROM questions LIMIT 10', (error, questions) => {
      if(error) {
        return reject(error)
      }
      return resolve(questions)
    })
  })
}

SelectAllAnswers = () =>{
  return new Promise((resolve,reject) => {
    pool.query('SELECT * FROM answers LIMIT 10', (error, answers)=>{
      if(error) {
        return reject(error)
      }
      return resolve(answers)
    })
  })
}

// this query data does not need to return data from db ?
AddAQuestionModel = () =>{
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM questions LIMIT 20', (error, answers) => {
      if(error) {
        return reject(error)
      }
      return resolve(answers)
    })
  })
}

// this query promise does not need to return data?
AddAnAnswerModal = ()=> {
  return new Promise((resolve, reject) =>{
    pool.query('SELECT * FROM answers LIMIT 20', (error, answers) => {
      if(error) {
        return reject(error)
      }
      return resolve(answers)
    })
  })
}

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