const Dotenv = require('dotenv-webpack');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, env) => {
  nrwlConfig(config);
  return {
    ...config,
    plugins: [
      new Dotenv({
        path: `.env${env.file ? `.${env.file}` : ''}`,
      }),
    ],
  };
};
