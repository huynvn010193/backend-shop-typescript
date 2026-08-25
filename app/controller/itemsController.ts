import { Request, Response, NextFunction } from 'express';
import ItemModel from '../models/items';

class ItemController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    res.status(200).json({
      success: false,
    });
  }

  public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      let data = await ItemModel.addItems(req.body, {});
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ItemController();
