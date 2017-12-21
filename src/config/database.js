import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// FIXME: deveria puxar de arquivo de variáveis globais
const databaseUrl = 'mongodb://cs-matheus-galdino:cs-desafio@ds161146.mlab.com:61146/cs-desafio';

const connectToDatabase = () => mongoose.connect(databaseUrl, {
  useMongoClient: true,
}, connectionError => connectionError);

export default { connectToDatabase };
