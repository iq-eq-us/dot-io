process.env.NODE_ENV = 'test';

module.exports = {
  coverageConfig: {
    exclude: ['**/*/_snowpack/**/*'],
  },
  plugins: [require('@snowpack/web-test-runner-plugin')()],
};
