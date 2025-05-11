import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

const initMongoConnections = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const nameDB = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${nameDB}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfuly established');
  } catch (error) {
    console.log('Connection mongoDB error:', error);
    throw error;
  }
};

export default initMongoConnections;
