import axios from 'axios';

import AxiosJsonMocks from '../index';

it('instance should be a function', () => {
  const instance = new AxiosJsonMocks(axios);
  expect(instance).toBeInstanceOf(Function);
});
