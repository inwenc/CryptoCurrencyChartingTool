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
  console.log('req body', req.body)
  var startDate;
  var endDate;
  console.log('req body', req.body)
  if (Object.keys(req.body).length === 0) {
    console.log('1')
    startDate = null;
    endDate = null;
  } else if (req.body.startDate && req.body.endDate){
    startDate = req.body.startDate;
    endDate = req.body.endDate;
    console.log('2')

  }
  console.log('startDate', startDate, endDate)

   getCoinDeskHistData(startDate, endDate,(err, results) => {
     if (err) {
       console.log('err', err);
     } else {
       console.log('results', results.body)
       res.end(results.body)
     }
   })
})


app.listen(3000, function () {
  console.log('listening on port 3000!');
})