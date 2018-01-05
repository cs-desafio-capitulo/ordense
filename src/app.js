import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';
import LogService from './services/log';

const app = express();

const configureServer = () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    const serviceLog = {
      user: 123,
      service: 'ORDENSE',
      description: `${req.method} on ${req.url}`,
      level: res.statusCode < 400 ? 'INFO' : 'ERROR',
      date: Date.now(),
    };

    LogService.sendInformationToLogService(serviceLog);
    next();
  });
  
  app.use(routes);

  return app;
};

export default () => database.connectToDatabase().then(configureServer);
