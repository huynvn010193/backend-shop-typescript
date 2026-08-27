import { Request, Response, NextFunction } from 'express';
import ItemModel from '../models/items';
import { parseListQuery, QueryParams } from '../utils';

class ItemController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const query = parseListQuery(req.query as QueryParams);
      const data = await ItemModel.getListItems(query);
      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {}
  }

  public async getOne(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;
    const data = await ItemModel.getOneItem(id);
    res.status(200).json({
      success: true,
      data: data,
    });
  }

  public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = await ItemModel.addItems(req.body, {});
    res.status(200).json({
      success: true,
      data,
    });
  }

  public async updateItem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;
    const data = await ItemModel.updateItem({ id: id, body: req.body });
    res.status(200).json({
      success: true,
      data: data,
    });
  }

  public async deleteItem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;
    const data = await ItemModel.deleteItem(id);
    res.status(200).json({
      success: true,
      data: data,
    });
  }
}

export default new ItemController();
