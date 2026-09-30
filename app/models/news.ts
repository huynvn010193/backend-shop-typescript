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
    console.log('slug', slug);
    // path
    const path = envConfigs.data.path;
    let pathname = path + slug + '.json';

    const getRss = Number(params.req.cookies[slug]);
    if (getRss >= Date.now()) {
      console.log('off');
      const data: Buffer = fs.readFileSync(pathname);
      return VnExpressRss.init(JSON.parse(data.toString()), params);
    } else {
      try {
        params.res.cookie(slug, Date.now() + 1 * 60 * 1000);
        console.log('onl');
        const feed = await parser.parseURL(link);
        // TODO: Trước khi save vào data thì tạo id
        const data = feed.items;
        data.forEach((ele: any, ind: number) => {
          ele.id = slug + '_' + (ind + 1);
        });
        fs.writeFileSync(pathname, JSON.stringify(data));
        return VnExpressRss.init(data, params);
      } catch (error) {
        return false;
      }
    }
  }
}
