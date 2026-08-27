import { Router } from 'express';
import ItemsController from '../controller/itemsController';
import AsyncHandle from '../middleware/async';

export default class ItemRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  // đi vào itemsController
  public routes(): void {
    this.router.get('/', AsyncHandle(ItemsController.get));
    this.router.get('/:id', AsyncHandle(ItemsController.getOne));
    this.router.post('/add', AsyncHandle(ItemsController.post));
    this.router.put('/edit/:id', AsyncHandle(ItemsController.updateItem));
    this.router.delete('/delete/:id', AsyncHandle(ItemsController.deleteItem));
  }
}
