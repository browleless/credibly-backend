import { Response } from 'express';
import HttpStatus from 'http-status';

export class Responder {

  getAutoRespondDecorator(): MethodDecorator {
    return ((target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;
      descriptor.value = (async (req: Request, res: Response) => {
        try {
          const result = await originalMethod(req, res);
          if (result) {
            this.respondWithData(res, result);
          } else {
            this.respondWithoutData(res);
          }
        } catch (err) {
          this.respondWithError(res, err);
        }
      }) as any;
    }) as any;
  }

  respondWithData<T>(res: Response, data: T, message?: string) {
    try {
      const output = {
        message: message as unknown as string,
        data
      };

      res.status(HttpStatus.OK);
      res.json(output);
      res.end();

    } catch (err) {
      this.respondWithError(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  respondWithoutData(res: Response, message?: string) {
    try {
      const output = {
        message: message as unknown as string,
        data: undefined as any
      };

      res.status(HttpStatus.OK);
      res.json(output);
      res.end();

    } catch (err) {
      this.respondWithError(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  respondWithError(res: Response, error: Error, httpStatus?: number) {
    try {
      let message: string;

      if (!httpStatus) {
        httpStatus = HttpStatus.BAD_REQUEST;
      }

      message = 'Something went wrong!';

      const output = {
        error: { message, error: error.message },
        message: undefined as unknown as string,
        data: undefined as any
      };

      res.status(httpStatus);
      res.json(output);
      res.end();

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.end();
    }
  }
}
