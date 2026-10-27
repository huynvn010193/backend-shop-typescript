import { Request, Response, NextFunction } from 'express';
import CategoryModel from '../models/category';
import { parseListQuery, QueryParams } from '../utils';
import { validationResult } from 'express-validator';
import ValidateReq from '../middleware/validateReq';
import MainModel from '../schemas/category';
import ErrorResponse from '../utils/errorResponse';
class CategoryController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    /**
     * @swagger
     * /category:
     *   get:
     *     tags:
     *       - category
     *     summary: Get all categories
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           minimum: 1
     *           default: 1
     *         description: Page number
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           default: 10
     *         description: Number of categories per page
     *       - in: query
     *         name: sort
     *         schema:
     *           type: string
     *         description: Fields to sort by, separated by commas (for example, name,-createdAt)
     *       - in: query
     *         name: select
     *         schema:
     *           type: string
     *         description: Fields to return, separated by commas
     *     responses:
     *       200:
     *         description: Category list retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     items:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           id:
     *                             type: string
     *                           name:
     *                             type: string
     *                           slug:
     *                             type: string
     *                           link:
     *                             type: string
     *                     pagination:
     *                       type: object
     *                       properties:
     *                         page:
     *                           type: integer
     *                         limit:
     *                           type: integer
     *                         totalItems:
     *                           type: integer
     *                         totalPage:
     *                           type: integer
     */

    try {
      const query = parseListQuery(req.query as QueryParams);
      const data = await CategoryModel.getListItems(query);
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
    const data = await CategoryModel.getOneItem(id);
    res.status(200).json({
      success: true,
      data: data,
    });
  }

  public async addItems(req: Request, res: Response, next: NextFunction): Promise<any> {
    const err = await ValidateReq.init(req, res, next);
    // TODO: Kiểm tra không lỗi thì mới save
    if (!err) {
      const data = await CategoryModel.addItems(req.body, {});
      res.status(200).json({
        success: true,
        data,
      });
    }
  }

  public async updateItem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const err = await ValidateReq.init(req, res, next);
    if (!err) {
      const { id } = req.params;
      const data = await CategoryModel.updateItem({ id: id, body: req.body });
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  }

  public async deleteItem(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const { id } = req.params;
    const data = await CategoryModel.deleteItem(id);
    res.status(200).json({
      success: true,
      data: data,
    });
  }

  public async getArticleInCategory(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    console.log('req', req.params);

    const data = await CategoryModel.getArticleInCategory({ req, res }, {});
    if (!data) return next(new ErrorResponse(400, 'Đường dẫn không hợp lệ'));

    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  }
}

export default new CategoryController();
