/* eslint-disable no-sync */

 import fs from 'fs';
 import AsyncUtil from 'async-utility';
 import { models } from '../entities';
 import { sequelize } from '../sequelize';
 
 interface EnvProps {
   db: {
    readonly name: string;
    readonly host: string;
    readonly port: number;
    readonly username: string;
    readonly password: string;
  };

   api: {
    readonly path: string;
    readonly port: number;
   };

   jwt: {
     readonly secret: string;
   };
 }
 
 export class Env {
  
   private env!: EnvProps;
 
   constructor() {
     AsyncUtil.executeSync(async () => {
       await this.loadLocalEnv();
       await sequelize.init({ ...this.db, models });
     });
   }

   private async loadLocalEnv() {
    const json = await fs.promises.readFile('env.json', 'utf8');
    this.env = JSON.parse(json);
  }

   get db() {
    return this.env.db;
  }
 
   get api() {
     return this.env.api;
  }

   get jwt() {
    return this.env.jwt;
  }
 
 }
 