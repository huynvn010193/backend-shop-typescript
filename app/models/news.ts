import { Model } from 'mongoose';
import MainModel, { MainDocument } from '../schemas/item';
import { GetListItemsParams, LIMIT_RECORD_DEFAULT } from '../utils';
import Parser from 'rss-parser';

type CustomFeed = { foo: string };
type CustomItem = { bar: string };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ['foo'],
    item: ['bar'],
  },
});

export default class NewsModel {
  // TODO: select = '-__v': ko lấy field: __v từ mongoDB
  static async getListNews(params: any, option: any): Promise<any> {
    if (option.task === 'all') {
      const feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
      return feed.items;
    }
  }
}
