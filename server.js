const axios = require('axios');

// const getExchangeRate = async(histDate, from, to) => {
//   try {
//     const response = await axios.get(`https://exchangeratesapi.io/api/${histDate}?base=${from}&symbols=${to}`)
//     const rate = response.data.rates[to];
//     if (rate) {
//       return rate
//     } else {
//       throw new Error(`Unable to get exchange rate for ${from} and ${to}`)
//     }
//     } catch (e) {
//       throw new Error(`Unable to get getExchangeRate for ${from} and ${to}`);
//     }
// }

// const convertCurrency = async(histDate, from, to, amount) => {
//   const rate = await getExchangeRate(histDate, from, to);
//   const exchangedAmount = amount * rate;
//   return(
//     {
//     "date": histDate,
//     "base_currency": from,
//     "base_amount": amount,
//     "conversion_currency": to,
//     "conversion_amount": exchangedAmount
//     })
  
// }

const getExchangeRate = (histDate, from, to) => {
  return axios
    .get(`https://exchangeratesapi.io/api/${histDate}?base=${from}&symbols=${to}`)
    .then((response) => {
		return response.data.rates[to];
	})
}

const convertCurrency = (histDate, from, to, amount) => {
  return getExchangeRate(histDate, from, to)
    .then((rate) => {
      const exchangedAmount = amount * rate;
      return (
        {
        "date": histDate,
        "base_currency": from,
        "base_amount": amount,
        "conversion_currency": to,
        "conversion_amount": Number(exchangedAmount.toFixed(2))
        })
    }
    )
}

convertCurrency('2016-06-05', 'USD', 'CAD', 100)
  .then((response) => {
    return JSON.stringify(response)
  }
  )
  .catch(err => { return err })

module.exports = {
  convertCurrency,
  getExchangeRate
}