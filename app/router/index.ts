import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import CategoryRouter from './category';
import NewsRouter from './news';
import PricesRouter from './price';
import ArticleRouter from './article';

export default class Routes {
  static init(server: IServer): void {
    const router: express.Router = express.Router();

    // article
    server.app.use('/api/v1/article', new ArticleRouter().router);

    // category
    server.app.use('/api/v1/category', new CategoryRouter().router);

    // news
    server.app.use('/api/v1/news', new NewsRouter().router);

    // price gold - coin
    server.app.use('/api/v1/price', new PricesRouter().router);
  }
}
