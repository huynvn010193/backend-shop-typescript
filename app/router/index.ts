import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import ItemRouter from './items';
import NewsRouter from './news';
import PricesRouter from './price';

export default class Routes {
  static init(server: IServer): void {
    const router: express.Router = express.Router();

    // item
    server.app.use('/api/v1/items', new ItemRouter().router);

    // news
    server.app.use('/api/v1/news', new NewsRouter().router);

    // price gold - coin
    server.app.use('/api/v1/price', new PricesRouter().router);
  }
}
