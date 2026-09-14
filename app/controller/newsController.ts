import { Request, Response, NextFunction } from 'express';
import NewsModel from '../models/news';
import { parseListQuery, QueryParams } from '../utils';
import { validationResult } from 'express-validator';
import ValidateReq from '../middleware/validateReq';
import MainModel from '../schemas/item';
class NewsController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      let data;
      const getRss = Number(req.cookies?.getRss);
      if (getRss >= Date.now()) {
        data = await NewsModel.getListNews(req.query, { task: 'off' });
      } else {
        res.cookie('getRss', Date.now() + 1 * 60 * 1000);
        data = await NewsModel.getListNews(req.query, { task: 'onl' });
      }
      res.status(200).json({
        success: true,
        data: data,
        count: data.length,
      });
    } catch (error) {}
  }
}

export default new NewsController();
