import { Request, Response, NextFunction } from 'express';

class ItemController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    res.status(200).json({
      success: false,
    });
  }
}

export default new ItemController();
