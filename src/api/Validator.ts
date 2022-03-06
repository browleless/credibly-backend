import { RequestHandler } from 'express';
import HttpStatus from 'http-status';
import { Responder } from '.';
import { env } from '../env';
import jwt from 'jsonwebtoken';

export class Validator {

  static getValidationMiddleware(responder: Responder): RequestHandler {
    return (req, res, next) => {
      const token = req.headers['x-access-token'] as string;
      try {
        jwt.verify(token, env.jwt.secret);
        next();
      } catch (err) {
        responder.respondWithError(res, err, HttpStatus.FORBIDDEN);
      }
    };
  }
}
