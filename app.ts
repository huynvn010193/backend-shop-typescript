import express from 'express';
import Middleware from './app/configs/middleware';
import { db } from './app/configs/connection';
import Routes from './app/router/index';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    Middleware.init(this);
    Routes.init(this);
  }
}

export default new App().app;

// import express from 'express';

// const app = express();

// export default app;
