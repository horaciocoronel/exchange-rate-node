const expect = require('expect');
const nock = require('nock');
const { convertCurrency, getExchangeRate } = require('../app');

describe('Unit tests: convertCurrency - Nock', () => {
	before(() => {			
	});
	beforeEach(() => {		
		nock('https://exchangeratesapi.io')
			.get('/api/2011-06-03?base=USD&symbols=CAD')
			.reply(200, {"base":"USD","date":"2011-06-03","rates":{"CAD":0.9785}});
		nock('https://exchangeratesapi.io')
			.get('/api/2007-07-12?base=GBP&symbols=SEK')
			.reply(200, {"base":"GBP","date":"2007-07-12","rates":{"SEK":13.4819}});
		nock('https://exchangeratesapi.io')
			.get('/api/2004-08-07?base=EUR&symbols=PLN')
			.reply(200, {"base":"EUR","date":"2004-08-06","rates":{"PLN":4.402}});
		nock('https://exchangeratesapi.io')
			.get('/api/2017-02-09?base=ZAR&symbols=TRY')
			.reply(200, {"base":"ZAR","date":"2017-02-09","rates":{"TRY":0.2753940577}});

	});

  it('Test case 1', async () => {
    const response = await convertCurrency('2011-06-03', 'USD', 100, 'CAD');   
		expect(typeof response).toBe('object');			
		expect(response.date).toBe('2011-06-03');	
		expect(response.base_currency).toBe('USD');		
		expect(typeof response.base_amount).toBe('number');		
		expect(response.base_amount).toBe(100);		
		expect(response.conversion_currency).toBe('CAD');		
		expect(response.conversion_amount).toBe(97.85);
	});
	
  it('Test case 2', async () => {
    const response = await convertCurrency('2007-07-12', 'GBP', 303, 'SEK');   
		expect(typeof response).toBe('object');			
		expect(response.date).toBe('2007-07-12');	
		expect(response.base_currency).toBe('GBP');		
		expect(typeof response.base_amount).toBe('number');		
		expect(response.base_amount).toBe(303);		
		expect(response.conversion_currency).toBe('SEK');		
		expect(response.conversion_amount).toBe(4085.0157);
  });
	
  it('Test case 3', async () => {
    const response = await convertCurrency('2004-08-07', 'EUR', 5, 'PLN');   
		expect(typeof response).toBe('object');			
		expect(response.date).toBe('2004-08-06');	
		expect(response.base_currency).toBe('EUR');		
		expect(typeof response.base_amount).toBe('number');		
		expect(response.base_amount).toBe(5);		
		expect(response.conversion_currency).toBe('PLN');		
		expect(response.conversion_amount).toBe(22.01);
  });
	
  it('Test case 4', async () => {
    const response = await convertCurrency('2017-02-09', 'ZAR', 132, 'TRY');   
		expect(typeof response).toBe('object');			
		expect(response.date).toBe('2017-02-09');	
		expect(response.base_currency).toBe('ZAR');		
		expect(typeof response.base_amount).toBe('number');		
		expect(response.base_amount).toBe(132);		
		expect(response.conversion_currency).toBe('TRY');		
		expect(response.conversion_amount).toBe(36.352);
  });
  
});