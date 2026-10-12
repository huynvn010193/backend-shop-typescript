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
    let id = params.req.params.id;
    let slug = id.split('_')[0];

    // path
    let path = envConfigs.data.path;
    let pathName = path + slug + '.json';

    try {
      let data: Buffer = fs.readFileSync(pathName);
      data = await VnExpressRss.init(JSON.parse(data.toString()), params);

      let result = data.find((item: any) => item.id === id);
      return result;
    } catch {
      return false;
    }
  }
}
