# Exchange App
---

Using the API at https://exchangeratesapi.io/ , write a program using Node.js for
looking up historical exchange rates.
Your program should accept four inputs: (1) date , (2) base currency , (3) base amount ,
(4) conversion currency . It should return the value of the base currency amount in the
conversion currency. For example, on June 3, 2017, USD$100 would buy CAD$135.23.

## Implementation
---
1. Install dependencies:
``` bash
npm install
```
2. Run tests
``` bash 
npm test 
```

### Using
---
* chai
* mocha
* nock