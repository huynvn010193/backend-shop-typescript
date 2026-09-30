import { Router } from 'express';
import ArticleController from '../controller/articleController';
import AsyncHandle from '../middleware/async';
import { validator } from '../validates/category';

export default class ArticleRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get('/:id', AsyncHandle(ArticleController.get));
  }
}
