import serverConfig from './src/app';

const port = process.env.PORT || 3000;

serverConfig()
  .then(app => app.listen(port, () => console.log(`we're listening on port ${port}`)))
  .catch((error) => {
    console.log('Error');
    console.log(error);
    process.exit(1);
  });
