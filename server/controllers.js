const db = require('../db/driver.js')

// 1. cretae function that is invoked in router
   // 2. invoke model function (promise)
   //6. then respond to client


  const getAllQuestions = (req, res) => {
    let product_id = req.query
    console.log(product_id, 'this works')
    db.SelectAllQuestions()
    .then((result) => {
      res.send(result)
    })
    .catch((error)=>{
      console.log(error, ' send help')
    })
  }

  const getAllAnswers = (req, res) => {

  }

 const addAQuestion = (req, res) => {

 }

 const addAnAnswer = (req, res) => {

 }

 const updateHelpfulQuestion = (req, res) => {

 }

 const updateReportQuestion = (req, res) => {

 }

 const updateHelpfulAnswer = (req, resp) => {

 }

  //  const addAQuestion = (req, res) => {
  //   console.log(req.body,' tetsing')
  //   let body = req.body.body
  //   console.log(body)
  //   res.sendStatus(201).send(body, 'please work ')
  //  }





module.exports = { getAllQuestions , getAllAnswers, addAQuestion, addAnAnswer,
  updateHelpfulQuestion, updateReportQuestion, updateHelpfulAnswer

};


