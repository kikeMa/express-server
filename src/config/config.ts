import convict from 'convict';

const convictConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/prod'
    }
  },
  TOKEN_SECRET: {
    doc: 'The jwt secret key.',
    default: 'asdfasdfcverrydyghidyu-.dhgjdghj-ekrmdghjc-djhgdghjd-djhgdjh',
    env: 'TOKEN_SECRET'
  }
});

export default convictConfig;
