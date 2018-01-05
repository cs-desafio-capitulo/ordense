import dotenv from 'dotenv';

dotenv.config();

export default {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DB_URL,
  },
  externalServices: {
    productService: process.env.PRODUCT_SERVICE || 'https://shrouded-shelf-58966.herokuapp.com',
    logService: process.env.LOG_SERVICE || 'https://immense-brushlands-11219.herokuapp.com',
  }
};
