import { Document, Schema } from 'mongoose';
import { envConfigs } from '../configs/envConfigs';
import * as connection from '../configs/connection';

export interface MainDocument extends Document {
  name: String;
  content: String;
}

const MainSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default connection.db.model<MainDocument>(envConfigs.database.col_items, MainSchema);
