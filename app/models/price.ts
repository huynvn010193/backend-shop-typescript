import { envConfigs } from '../configs/envConfigs';

interface GoldPrice {
  name: string;
  buy: number;
  sell: number;
}

interface GoldApiResponse {
  success: boolean;
  prices: Record<string, GoldPrice>;
}

export default class PriceModel {
  static async getGold(params: any, option: any): Promise<any> {
    const response = await fetch(envConfigs.price.urlGold);
    if (!response.ok) {
      throw new Error(`Không lấy được giá vàng: HTTP ${response.status}`);
    }

    const result = (await response.json()) as GoldApiResponse;

    return Object.values(result.prices).map(({ name, buy, sell }) => ({
      name,
      buy,
      sell,
    }));
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
    const dataArr = data.data;
    let result: any = [];
    dataArr.forEach((ele: any) => {
      let obj: any = {};
      obj.name = ele.name;
      obj.price = ele.quote.USD.price;
      obj.percent_change_24h = ele.quote.USD.percent_change_24h;
      result.push(obj);
    });
    return result;
  }
}
