import { Controller, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond } from '../api';
import { LoginReq, LoginRes, RegisterReq } from '../models';
import { authService } from '../services';

@Controller('auth')
export class AuthController {

  @Post('register')
  @AutoRespond()
  async register(req: Request): Promise<number> {
    const input: RegisterReq = req.body;
    const data = authService.register(input);
    return data;
  }

  @Post('login')
  @AutoRespond()
  async login(req: Request): Promise<LoginRes> {
    const input: LoginReq = req.body;
    const data = authService.login(input);
    return data;
  }
}
