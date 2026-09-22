import { envConfigs } from '../configs/envConfigs';

export default class PriceModel {
  static async getGold(params: any, option: any): Promise<any> {
    const response = await fetch(envConfigs.price.urlGold);
    if (!response.ok) {
      throw new Error(`Không lấy được giá vàng: HTTP ${response.status}`);
    }

    const result = await response.json();

    return result;
  }
  static async getCoin(params: any, option: any): Promise<any> {
    const url = new URL(envConfigs.price.urlCoin);
    url.search = new URLSearchParams({
      start: '1',
      limit: '10',
      convert: 'USD',
    }).toString();
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-CMC_PRO_API_KEY': '4f659e6bcefd420480f5ab4b08155962',
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  }
}
