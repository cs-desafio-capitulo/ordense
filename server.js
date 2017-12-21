import serverConfig from './src/app';

const port = 3000;

serverConfig()
  .then(app => app.listen(port, () => console.log(`we're listening on port ${port}`)))
  .catch((error) => {
    console.log("Error");
    console.error(error);
    process.exit(1);
  })