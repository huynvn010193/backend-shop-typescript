import { Model } from 'mongoose';
import MainModel, { MainDocument } from '../schemas/item';
import { GetListItemsParams, LIMIT_RECORD_DEFAULT } from '../utils';
import fs from 'fs';
import Parser from 'rss-parser';
import { envConfigs } from './../configs/envConfigs';

type CustomFeed = { foo: string };
type CustomItem = { bar: string };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ['foo'],
    item: ['bar'],
  },
});

export default class NewsModel {
  static async getListNews(params: any, option: any): Promise<any> {
    if (option.task === 'onl') {
      console.log('onl');
      const feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
      fs.writeFileSync(envConfigs.data.news, JSON.stringify(feed.items));
      return feed.items;
    }
    if (option.task === 'off') {
      console.log('off');
      let data: Buffer = fs.readFileSync(envConfigs.data.news);
      return JSON.parse(data.toString());
    }
  }
}
