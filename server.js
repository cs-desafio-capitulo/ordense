import serverConfig from './src/app';
import env from './src/config/env';

const port = env.app.port || 3000;

serverConfig()
  .then(app => app.listen(port, () => console.log(`we're listening on port ${port}`)))
  .catch((error) => {
    console.log('Error');
    console.log(error);
    process.exit(1);
  });
