import { Request, Response, NextFunction } from 'express';
import PriceModel from '../models/price';

class PriceController {
  public async getGold(req: Request, res: Response, next: NextFunction): Promise<any> {
    let data = await PriceModel.getGold({}, {});
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  }
  public async getCoin(req: Request, res: Response, next: NextFunction): Promise<any> {
    let data = await PriceModel.getCoin({}, {});
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  }
}

export default new PriceController();
