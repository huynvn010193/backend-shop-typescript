import { Router } from 'express';
import itemsController from '../controller/itemsController';

export default class ItemRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  // đi vào itemsController
  public routes(): void {
    this.router.get('/', itemsController.get);
  }
}
