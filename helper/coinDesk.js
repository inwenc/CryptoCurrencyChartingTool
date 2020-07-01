const request = require('request');

let getCoinDeskHistData = (startDate, endDate, callback) => {
  let url;
  if (startDate === null && endDate === null) {
    url = 'https://api.coindesk.com/v1/bpi/historical/close.json'
  } else {
    url =  `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
    }
  let options = {
    url: url
  }
 console.log('1001')

  request(options, (err, body) => {
    if (err) {
      callback(err, null)
      console.log('err', err)
    } else {
     // console.log('body', body)
      callback(null, body);
    }
  })
}

module.exports.getCoinDeskHistData = getCoinDeskHistData;
/*

self._apiCurrencyList = 'http://api.coindesk.com/v1/bpi/supported-currencies.json'
		self._apiCurrentPrice = 'http://api.coindesk.com/v1/bpi/currentprice.json'
		self._apiCurrentPriceCode = 'http://api.coindesk.com/v1/bpi/currentprice/{}.json'
		self._apiEODPrice = 'http://api.coindesk.com/v1/bpi/historical/close.json?start={}&end={}&currency={}' # yyyy-mm-dd

  https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05

    https://api.coindesk.com/v1/bpi/historical/close.json

    // do caching.. maybe store it in the db in the server end
    use date()

*/
