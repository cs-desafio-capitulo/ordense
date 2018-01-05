import mongoose from 'mongoose';
import env from '../config/env';

mongoose.Promise = global.Promise;

const databaseUrl = env.db.url || 'mongodb://cs-matheus-galdino:cs-desafio@ds161146.mlab.com:61146/cs-desafio';


const connectToDatabase = () => mongoose.connect(databaseUrl, {
  useMongoClient: true,
}, connectionError => connectionError);

export default { connectToDatabase };
