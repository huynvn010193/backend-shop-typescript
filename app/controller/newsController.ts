import { Request, Response, NextFunction } from 'express';
import NewsModel from '../models/news';
import { parseListQuery, QueryParams } from '../utils';
import { validationResult } from 'express-validator';
import ValidateReq from '../middleware/validateReq';
import MainModel from '../schemas/item';
class NewsController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data = await NewsModel.getListNews(req.query, { task: 'all' });
      res.status(200).json({
        success: true,
        data: data,
        count: data.length,
      });
    } catch (error) {}
  }
}

export default new NewsController();
