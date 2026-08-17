import mongoose from 'mongoose';
import { envConfigs } from './envConfigs';

import logger from '../lib/logger';

interface ConnectOptions {
  useNewUrlParser: true;
  useUnifiedTopology: true;
}

const connectionOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URI = `mongodb+srv://${envConfigs.database.username}:${envConfigs.database.password}@cluster0.amr9jcd.mongodb.net/${envConfigs.database.database}`;
