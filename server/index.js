require("dotenv").config();
const express =require('express');
//  provides utilities for working with file and directory paths.
const path = require("path");
// import db
const db = require("../db/driver.js");
const app = express();
// require controllers
const controllers = require('./controllers.js')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// ROUTES

// Retrieves a list of questions for a particular product
app.get('/qa/questions', controllers.getAllQuestions);
// Returns answers for a given question.
app.get('/qa/questions/:question_id/answers', controllers.getAllAnswers);
// Adds a question for the given product
app.post('/qa/questions', controllers.addAQuestion);
// Adds an answer for the given question
app.post('/qa/questions/:question_id/answers', controllers.addAnAnswer)
// Updates a question to show it was found helpful.
app.put('/qa/questions/:question_id/helpful', controllers.updateHelpfulQuestion)
// Updates a question to show it was reported.
app.put('/qa/questions/:question_id/report', controllers.updateReportQuestion)
// Updates an answer to show it was found helpful.
app.put('/qa/answers/:answer_id/report', controllers. updateHelpfulAnswer)




app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);


  // check if db is connected to server
app.get("/getMysqlStatus", (req, res) => {
db.ping((err) => {
      if(err) return res.status(500).send("MySQL Server is Down");
      res.send("MySQL Server is Active");
  })
});
