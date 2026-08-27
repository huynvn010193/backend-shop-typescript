import { NextFunction, RequestHandler, Response, Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

// TODO: ParamsDictionary là type mặc định của Express cho req.params.
// type ParamsDictionary = {
// [key: string]: string;
// };

type AsyncRequestHandler<P = ParamsDictionary> = (
  req: Request<P>,
  res: Response,
  next: NextFunction,
) => Promise<any>;

/**
 * Catches errors and passes them to the next callback
 * @param handler Async express request handler/middleware potentially throwing errors
 * @returns Async express request handler with error handling
 */

const AsyncHandle = <P = ParamsDictionary>(handler: AsyncRequestHandler<P>): RequestHandler<P> => {
  return (req, res, next) => {
    void handler(req, res, next).catch(next);
  };
};

export default AsyncHandle;
