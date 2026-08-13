import express from 'express';
import Middleware from './app/configs/middleware';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    Middleware.init(this);
  }
}

export default new App().app;

// import express from 'express';

// const app = express();

// export default app;
