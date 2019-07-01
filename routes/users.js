
const express = require('express');
const router = express.Router();

router.get('/show-data' , (req, res) =>{
    res.send({
        "Texto":"Shabat Shalom !שבת שלום"
    })
})
  module.exports = router ;