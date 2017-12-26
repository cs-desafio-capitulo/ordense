'use strict';
import dotenv from 'dotenv';

dotenv.load()

export default {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT
  },
  db: {
    url: process.env.DB_URL
  }
}