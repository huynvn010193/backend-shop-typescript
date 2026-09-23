import { Document, Schema } from 'mongoose';
import { envConfigs } from '../configs/envConfigs';
import * as connection from '../configs/connection';

export interface MainDocument extends Document {
  name: String;
  slug: String;
  link: String;
}

const MainSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const MainModel = connection.db.model<MainDocument>(envConfigs.database.col_category, MainSchema);

export default MainModel;
