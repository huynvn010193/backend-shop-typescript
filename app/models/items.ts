import MainModel from '../schemas/item';

export default class ItemModel {
  static async addItems(params: any, option: any): Promise<any> {
    return await new MainModel(params).save();
  }
}
