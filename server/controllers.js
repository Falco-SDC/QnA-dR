const db = require('../db/driver.js')

// 1. cretae function that is invoked in router
   // 2. invoke model function (promise)
   //6. then respond to client

  const getAllQuestions = (req, res) => {
    // console.log(req.query)
    let product_id = req.query
    db.SelectAllQuestions(product_id)
    .then((result) => {
      res.send(result)
    })
    .catch((error)=>{
      res.sendStatus(204).send(error,'no question found')
    })
  }

  const getAllAnswers = (req, res) => {
    let page = req.query.page || 0;
    let count = req.query.count || 5;
    let question_id = req.params.question_id
    let obj = {}
    obj.question = question_id;
    obj.page = page;
    obj.count= count
    db.SelectAllAnswers(question_id, count, page)
    .then((result)=>{
     obj.results = result
      res.send(obj)
    })
    .catch((error)=>{
      console.log(error)
      res.sendStatus(204)
    })
  }

// need to account for optional params
 const addAQuestion = (req, res) => {
    let addQuestionBody = req.body.body
    // console.log(req.body.body)
    let addQuestionName = req.body.name
    let addQuestionEmail = req.body.email
    let addAQuestionProduct_id = req.body.product_id
    db.AddAQuestionModel(addQuestionBody, addQuestionName,addQuestionEmail,addAQuestionProduct_id)
    .then((result)=>{
      res.sendStatus(201).send('CREATED')
    })
    .catch((error)=>{
      // set headers error 'ERR_HTTP_HEADERS_SENT' -- fix response with proper error message
      res.status(404)
    })
 }

 const addAnAnswer = (req, res) => {
  let question_id = req.params.question_id
  let addAnswerBody = req.body.body
  let addAnswerName = req.body.name
  let addAnswerEmail = req.body.email
  let addAnswerPhotos = req.body.photos
  db.AddAnAnswerModal(question_id, addAnswerBody, addAnswerName, addAnswerEmail, addAnswerPhotos)
  .then((result) => {
    res.sendStatus(201).send('CREATED')
  })
  .catch((error)=>{
    res.status(500, 'nah')
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



module.exports = { getAllQuestions , getAllAnswers, addAQuestion, addAnAnswer,
  updateHelpfulQuestion, updateReportQuestion, updateHelpfulAnswer, updateReportAnswer

};


