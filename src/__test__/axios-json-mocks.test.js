import axios from 'axios';

import AxiosJsonMocks from '../index';

it('instance should be a function', () => {
  const instance = new AxiosJsonMocks(axios);
  expect(instance).toBeInstanceOf(Function);
});

describe('Responses status 200 test', () => {
  it('should response with list of users', () => {
    const instance = new AxiosJsonMocks(axios);

    const expectedResponse = [{ id: 23, name: 'John Lennon' }];

    return instance(
      { url: '/users' },
      { useMock: true, responseWith: { 200: expectedResponse } },
    ).then((response) => {
      expect(response.data).toEqual(expectedResponse);
    });
  });
});
