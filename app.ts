import express from 'express';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
  }
}

export default new App().app;


// import express from 'express';

// const app = express();

// export default app;