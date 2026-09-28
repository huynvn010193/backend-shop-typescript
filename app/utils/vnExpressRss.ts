import dateformat from 'dateformat';
export default class VnExpressRss {
  static async init(data: any, params: any): Promise<any> {
    let result: any = [];
    data.forEach((item: any) => {
      let news: any = {};
      let content = item.content;
      let html = content.replace(/\\"/g, '"');
      let myImage = html.match(/<img[^>]*\bsrc\s*=\s*"([^"]+)"/i);
      let myContent = html.match('.*br>(.*)');
      news.title = item.title;
      news.link = item.link;
      news.pubDate = dateformat(item.pubDate, 'dd-mm-yyyy h:MM:ss TT');
      news.image = myImage ? myImage[1] : '';
      news.content = myContent ? myContent[1] : item.contentSnippet;
      result.push(news);
    });

    if (params.req.params.total) {
      let total: number = params.req.params.total;
      let totalData: any = [];
      for (let i = 0; i < total; i++) {
        totalData[i] = result[i];
      }
      return totalData;
    }

    return result;
  }
}
