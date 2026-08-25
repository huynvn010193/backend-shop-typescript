import { Router } from 'express';
import ItemsController from '../controller/itemsController';

export default class ItemRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  // đi vào itemsController
  public routes(): void {
    this.router.get('/', ItemsController.get);
    this.router.post('/add', ItemsController.post);
  }
}
