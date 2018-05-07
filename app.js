const axios = require('axios');

const getExchangeRate = async(histDate, from, to) => {
  try {
    const response = await axios.get(`https://exchangeratesapi.io/api/${histDate}?base=${from}&symbols=${to}`)
    const data = {
      "rate": response.data.rates[to],
      "date": response.data.date
    }
      if (data) {
        return data
      } else {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`)
      }
    } catch (e) {
      throw new Error(`ERROR: Unable to get getExchangeRate for ${from} and ${to}`);
    }
}

const convertCurrency = async(histDate, from, amount, to) => {
  const data = await getExchangeRate(histDate, from, to);
  let rate = data.rate;
  let dateData = data.date;
  const exchangedAmount = Math.round(amount * rate * 10000) /10000;
  return (
    {
    "date": dateData,
    "base_currency": from,
    "base_amount": amount,
    "conversion_currency": to,
    "conversion_amount": exchangedAmount
    })
  
}

module.exports = {
  convertCurrency,
  getExchangeRate
}