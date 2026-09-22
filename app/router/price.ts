import { Router } from 'express';
import PriceController from '../controller/priceController';
import AsyncHandle from '../middleware/async';
import { validator } from '../validates/items';

export default class NewsRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get('/gold', AsyncHandle(PriceController.getGold));
    this.router.get('/coin', AsyncHandle(PriceController.getCoin));
  }
}
