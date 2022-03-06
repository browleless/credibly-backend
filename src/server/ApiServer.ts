import { Server } from '@overnightjs/core';
import { env } from '../env';
import { controllers } from '../controllers';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

export class ApiServer extends Server {

  constructor() {
    super();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload());
    this.addControllers(controllers);
  }

  start() {
    console.log('Starting API server using environment variables');
    this.app.listen(env.api.port, () => {
      console.log(`API server is started, port=${env.api.port}, path=${env.api.path}`);
    });
  }
}
