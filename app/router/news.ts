import { Router } from 'express';
import NewsController from '../controller/newsController';
import AsyncHandle from '../middleware/async';
import { validator } from '../validates/items';

export default class NewsRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get('/', AsyncHandle(NewsController.get));
  }
}
