import { Request, Response, NextFunction } from 'express';
import ArticleModel from '../models/article';
import { parseListQuery, QueryParams } from '../utils';
import { validationResult } from 'express-validator';
import ValidateReq from '../middleware/validateReq';
import MainModel from '../schemas/category';
import ErrorResponse from '../utils/errorResponse';
class ArticleController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data = await ArticleModel.listItem({ id: req.params.id }, {});
      if (!data) return next(new ErrorResponse(400, 'Không tồn tại data'));
      res.status(200).json({
        success: true,
        data: data,
        count: data.length,
      });
    } catch (error) {}
  }
}

export default new ArticleController();
