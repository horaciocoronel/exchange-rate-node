const axios = require('axios');

const getExchangeRate = (histDate, from, to) => {
  axios.get(`https://exchangeratesapi.io/api/${histDate}?base=${from}&symbols=${to}`)
    .then(res => {
      let conversionCurr = to;
      console.log(res.data.rates[to]);
    })
    .catch(err => {
      console.log(err)
    })
}

getExchangeRate('2016-06-05', 'USD', 'CAD');