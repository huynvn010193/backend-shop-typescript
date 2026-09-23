import { Router } from 'express';
import CategoryController from '../controller/categoryController';
import AsyncHandle from '../middleware/async';
import { validator } from '../validates/category';

export default class ItemRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  // đi vào CategoryController
  public routes(): void {
    this.router.get('/', AsyncHandle(CategoryController.get));
    this.router.get('/:id', AsyncHandle(CategoryController.getOne));
    this.router.get('/:id/article/:total', AsyncHandle(CategoryController.getArticleInCategory));

    this.router.post('/add', validator, AsyncHandle(CategoryController.addItems));
    this.router.put('/edit/:id', validator, AsyncHandle(CategoryController.updateItem));
    this.router.delete('/delete/:id', AsyncHandle(CategoryController.deleteItem));
  }
}
