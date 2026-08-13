import { IServer } from '../interfaces/serverInterface';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';

export default class Middleware {
  static init(server: IServer): void {
    server.app.use(express.json());
    server.app.use(express.urlencoded({ extended: true }));
    server.app.use(helmet());
    server.app.use(cors());

    server.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Allow-Credentials',
      );
      next();
    });
  }
}
