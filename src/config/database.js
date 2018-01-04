import mongoose from 'mongoose';
import bluebird from 'bluebird';
import env from '../config/env';

mongoose.Promise = global.Promise;

const databaseUrl = env.db.url;

const connectToDatabase = () => mongoose.connect(databaseUrl, {
  useMongoClient: true
}, connectionError => connectionError);

export default { connectToDatabase };
