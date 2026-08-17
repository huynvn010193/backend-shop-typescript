import mongoose from 'mongoose';
import { envConfigs } from './envConfigs';

import logger from '../lib/logger';

// interface ConnectOptions {
//   useNewUrlParser: true;
//   useUnifiedTopology: true;
// }

// const connectOptions: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const MONGO_URI = `mongodb+srv://${envConfigs.database.username}:${envConfigs.database.password}@cluster0.amr9jcd.mongodb.net/${envConfigs.database.database}`;

// TODO: export the connection function, với phiên bản mới không dùng connectOptions nữa
export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI);

db.on('error', () => {
  logger.error('Mongodb connection error');
  mongoose.disconnect();
});

db.on('connected', () => {
  logger.info('database connected');
});
