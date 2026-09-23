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

export default class NewsModel {
  static async getListNews(params: any, option: any): Promise<any> {
    const link = params.link ? params.link : 'https://vnexpress.net/rss/tin-moi-nhat.rss';
    const slug = params.slug ? params.slug : 'news';
    // path
    const path = envConfigs.data.path;
    let pathname = path + slug + '.json';

    const getRss = Number(params.req.cookies?.getRss);
    if (getRss >= Date.now()) {
      console.log('off');
      const data: Buffer = fs.readFileSync(pathname);
      return VnExpressRss.init(JSON.parse(data.toString()));
    } else {
      try {
        params.res.cookie('getRss', Date.now() + 1 * 60 * 1000);
        console.log('onl');
        const feed = await parser.parseURL(link);
        fs.writeFileSync(pathname, JSON.stringify(feed.items));
        return VnExpressRss.init(feed.items);
      } catch (error) {
        return false;
      }
    }
  }
}
