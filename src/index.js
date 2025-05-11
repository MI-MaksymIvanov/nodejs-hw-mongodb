import setupServer from './server.js';
import initMongoConnections from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnections();
  setupServer();
};

bootstrap();
