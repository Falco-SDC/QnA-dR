const db = require('../db/driver.js')
const async =require('async');

  const getAllQuestions = (req, res) => {
    let product_id = req.query
    console.log(product_id)
    db.SelectAllQuestions(product_id)
    .then((result) => {
      res.send(result)
    })
    .catch((error)=>{
      console.log(error,'here')
      res.sendStatus(204)
    })
  }

  const getAllAnswers = (req, res) => {
    let page = req.query.page || 0;
    let count = req.query.count || 5;
    let question_id = req.params.question_id
    let responseObj = {}
    responseObj.question = question_id;
    responseObj.page = page;
    responseObj.count= count
    db.SelectAllAnswers(question_id, count, page)
    .then((result)=>{
      responseObj.results = result
      res.send(responseObj)
    })
    .catch((error)=>{
      console.log(error)
      res.sendStatus(204)
    })
  }
  // how to insert date on query generate date
 const addAQuestion = (req, res) => {
  console.log(req.body)
    let body = req.body.body
    let asker_name = req.body.name
    let asker_email = req.body.email
    let product_id = req.body.product_id
    let setUp = {body, asker_name, asker_email,product_id}
    db.AddAQuestionModel(setUp)
    .then((result)=>{
      res.send(201, result)
    })
    .catch((error)=>{
      console.log(error)
      // set headers error 'ERR_HTTP_HEADERS_SENT' -- fix response with proper error message
      res.status(404)
    })
 }


 const addAnAnswer = (req, res) => {
  let question_id = req.params.question_id
  let body = req.body.body
  let answerer_name = req.body.name
  let answerer_email = req.body.email
  let photos = req.body.photos[0] // pass entire array
  let setUp = {question_id, body, answerer_name, answerer_email};
  db.AddAnAnswerModal(setUp, photos)
  .then((result)=>{
   res.send(201, "CREATED")
  })
  .catch((error)=>{
    console.log(error)

  })
}

 // Updates a question to show it was found helpful.
 const updateHelpfulQuestion = (req, res) => {
  let question_id = req.params.question_id
  db.UpdateAnswerHelpful(question_id)
  .then((result) => {
    res.sendStatus(204,'NO CONTENT')
  })
  .catch((error)=> {
    res.status(500,'nope')
  })
 }

//  Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
 const updateReportQuestion = (req, res) => {
  let product_id = req.params.product_id
  db.UpdateReportQuestion(product_id)
  .then((result)=>{
    res.sendStatus(204, 'NO CONTENT')
  })
  .catch((error)=>{
    res.status(500,'nay')
  })
 }

//  Updates an answer to show it was found helpful.
 const updateHelpfulAnswer = (req, resp) => {
  let answer_id = req.params.answer_id
  db.UpdateAnswerHelpful(answer_id)
  .then((result)=>{
   res.sendStatus(204)
  })
  .catch((error)=>{
    res.status(500,'no in spanish')
  })
 }

// Updates an answer to show it has been reported
 const updateReportAnswer = (req, resp) => {
 let answer_id = req.params.answer_id
 db.UpdateAnswerReport(answer_id)
 .then((result) => {
  res.sendStatus(204)
 })
 .catch((error)=> {
  res.status(500,'nada')
 })
}

// do i  need to check for duplicates?
  // need to handle null returns to client

module.exports = { getAllQuestions , getAllAnswers, addAQuestion, addAnAnswer,
  updateHelpfulQuestion, updateReportQuestion, updateHelpfulAnswer, updateReportAnswer

};


