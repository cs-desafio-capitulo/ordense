import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';

const app = express();

const configureServer = () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('ok');
  })
  return app;
};

export default () => database.connectToDatabase().then(configureServer);
