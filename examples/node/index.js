const axios = require('axios');

const AxiosJsonMock = require('../../lib/axios-json-mock').default;

const pokeJson = require('./poke.json');

const cyanConsole = msg => console.log('\x1b[33m%s\x1b[0m', msg);

const axiosInstanceWithoutMockFolder = new AxiosJsonMock(axios);

axiosInstanceWithoutMockFolder(
  { url: 'https://pokeapi.co/api/v2/pokemon/ditto/' },
  {
    useMock: true,
    statusCode: 200,
    responseWith: pokeJson,
  }
).then(response => {
  cyanConsole('---------Without mock folder---------');
  console.log(response);
});

const axiosInstanceWithMockFolder = new AxiosJsonMock(axios, {
  mockFolder: __dirname,
});

axiosInstanceWithMockFolder(
  { url: 'https://pokeapi.co/api/v2/pokemon/ditto/' },
  {
    useMock: true,
    statusCode: 200,
    mockName: 'poke',
  }
).then(response => {
  cyanConsole('---------With mock folder---------');
  console.log(response);
});
