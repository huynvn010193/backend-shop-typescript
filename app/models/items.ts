import { Model } from 'mongoose';
import MainModel, { MainDocument } from '../schemas/item';
import { GetListItemsParams, LIMIT_RECORD_DEFAULT } from '../utils';

export default class ItemModel {
  // TODO: select = '-__v': ko lấy field: __v từ mongoDB
  static async getListItems({
    page = 1,
    limit = LIMIT_RECORD_DEFAULT,
    filter = {},
    sort = '-createdAt',
    select = '-__v',
  }: GetListItemsParams<MainDocument> = {}) {
    // Không cho page nhỏ hơn 1
    const currentPage = Math.max(1, page);

    // limit từ 1 đến 100
    const pageSize = Math.min(Math.max(1, limit), 100);

    // bỏ qua các item của trang trước
    const skip = (currentPage - 1) * pageSize;

    // Chạy lấy danh sách và tổ số recode
    const [items, totalItems] = await Promise.all([
      MainModel.find(filter).select(select).sort(sort).skip(skip).limit(pageSize).lean(),
      MainModel.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page: currentPage,
        limit: pageSize,
        totalItems,
        totalPage: Math.ceil(totalItems / pageSize),
      },
    };
  }

  static async getOneItem(id: string) {
    return await MainModel.findById(id).select('-__v').lean();
  }

  static async addItems(params: any, option: any): Promise<any> {
    //TODO: old: return await new MainModel(params).save();
    return await MainModel.create(params);
  }

  static async updateItem(params: any): Promise<any> {
    const { id, body } = params;
    return await MainModel.findByIdAndUpdate(
      id,
      { $set: body },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    )
      .select('-__v')
      .lean();
  }

  static async deleteItem(id: string): Promise<any> {
    return await MainModel.findByIdAndDelete(id, {
      returnDocument: 'after',
      runValidators: true,
    })
      .select('-__v')
      .lean();
  }
}
