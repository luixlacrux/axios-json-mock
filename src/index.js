/* eslint prefer-promise-reject-errors: 0 */

const DEFAULT_MOCKS_FOLDER_PATH = './src/mocks';
const DEFAULT_MOCKS_TIMEOUT = 200;

class AxiosJsonMocks {
  /**
   *
   * @param {Promise} axiosInstance - Axios instance to use
   * @param {Object} config - Custom helper config
   * @return {Promise} A new instance of Axios
   */
  constructor(axiosInstance, config = {}) {
    this.config = {
      mockFolder: config.mockFolder || DEFAULT_MOCKS_FOLDER_PATH,
      timeout: config.timeout || DEFAULT_MOCKS_TIMEOUT,
    };

    this.instance = axiosInstance.create({
      headers: {
        Accept: 'application/json',
      },
    });

    return this.request.bind(this);
  }

  /**
   *
   * @param {Object} options - Axios request options
   * @param {Object} mockOptions - Mock request options
   */
  request(options, mockOptions) {
    const extendMockOptions = {
      useMock: false,
      statusCode: '200',
      ...this.config,
      ...mockOptions,
    };

    if (extendMockOptions.useMock) {
      return new Promise((resolve, reject) => {
        const {
          statusCode,
          responseWith,
          timeout,
          mockFolder,
          mockName,
        } = extendMockOptions;
        const hasResponseWith = !!responseWith;

        /* eslint-disable global-require, import/no-dynamic-require, no-undef */
        const responses = hasResponseWith
          ? responseWith
          : __non_webpack_require__(`${mockFolder}/${mockName}.json`);
        /* eslint-enable global-require, import/no-dynamic-require, no-undef */

        setTimeout(() => {
          const res = responses[extendMockOptions.statusCode];

          if (!res) {
            const errorMessage = `Response with status "${statusCode}" does not exist`;

            const error = new Error(errorMessage);
            console.error(error);
            reject(error);
          }

          if (statusCode >= '400') {
            reject({ response: res });
          }

          resolve({ data: res });
        }, timeout);
      });
    }

    return this.instance(options);
  }
}

export default AxiosJsonMocks;
