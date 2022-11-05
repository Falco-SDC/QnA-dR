const mysql = require("mysql2");
// const path = require("path");

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






// 3. create promise function for getting questions
// 4. build query with controller info
// 5. run/return query

module.exports = {SelectAllQuestions}