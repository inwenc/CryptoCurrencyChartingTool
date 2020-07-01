const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const { getCoinDeskHistData } = require('./../helper/coinDesk.js');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))


app.use(express.static(__dirname + '/../public/dist'));


app.post('/getData', function(req, res){
  var startDate;
  var endDate;
  if (Object.keys(req.body).length === 0) {
    startDate = null;
    endDate = null;
  } else if (req.body.startDate && req.body.endDate){
    startDate = req.body.startDate;
    endDate = req.body.endDate;
  }

   getCoinDeskHistData(startDate, endDate,(err, results) => {
     if (err) {
       console.log('err', err);
     } else {
       res.end(results.body)
     }
   })
})


app.listen(3000, function () {
  console.log('listening on port 3000!');
})