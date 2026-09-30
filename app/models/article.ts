import { Model } from 'mongoose';
import MainModel, { MainDocument } from '../schemas/category';
import { GetListItemsParams, LIMIT_RECORD_DEFAULT } from '../utils';
import fs from 'fs';
import Parser from 'rss-parser';
import { envConfigs } from './../configs/envConfigs';
import VnExpressRss from '../utils/vnExpressRss';

type CustomFeed = { foo: string };
type CustomItem = { bar: string };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ['foo'],
    item: ['bar'],
  },
});

export default class ArticleModel {
  static async listItem(params: any, option: any): Promise<any> {
    console.log('ArticleModel', params);
  }
}
