# axios-json-mock
[![Build Status](https://travis-ci.com/luixlacrux/axios-json-mock.svg?token=WyKWXPAtLzD7DDaLRskW&branch=master)](https://travis-ci.com/luixlacrux/axios-json-mock)![npm bundle size](https://img.shields.io/bundlephobia/min/axios-json-mock.svg)
---
Axios helper that allows to easily mock request

#### Installation

Using npm:

`npm install axios-json-mock --save`

axios-json-mock works on Node as well as in a browser, it works with axios v0.16.0 and above.

#### Example

Mocking a `GET` request

```js
import axios from 'axios';
import AxiosJsonMock from 'axios-json-mock';

// Set default axios instance
const instance = new AxiosJsonMock(axios);

const responseWith = {
  200: [
    { id: 23, name: 'John Lennon' }
  ],
  400: {
    message: 'Bad Request'
  }
}
// arguments for instance are (request config, mock config)
instance({ url: '/users' }, {
  useMock: true,
  responseWith
})
  .then(response => console.log(response.data))

```

Add a specify status code
```js
// arguments for instance are (request config, mock config)
instance({ url: '/users' }, {
  useMock: true,
  statusCode: 400,
  responseWith
})
  .catch(response => console.error(response))

```

To add a delay to responses, specify amout (in milliseconds)
```js
const instance = new AxiosJsonMock(axios, { timeout: 1000 });
```

Using a mocks folder with json files
```
├── __dirname
│   ├── __mocks__
│   │   ├── userlist.json
│   │   ├── *.json
│   │   ├── *.json
```
userlist.json
```json
{
  "200": [
    { "id": 23, "name": "John Lennon" }
  ],
  "400": {
    "message": "Bad Request"
  }
}
```

```js
import axios from 'axios';
import AxiosJsonMock from 'axios-json-mock';

// Set default axios instance with mocks folder
const instance = new AxiosJsonMock(axios, { mockFolder: __dirname + '__mocks__' });

instance({ url: '/users' }, {
  useMock: true,
  mockName: 'userlist' // set json filename
})
  .then(response => console.log(response.data))
  
```

Turn off mocks and make real request
```js
instance({ url: '/users' }, {
  useMock: false,
  mockName: 'userlist' // set json filename
})
  .then(response => console.log(response.data)) // real data
```


