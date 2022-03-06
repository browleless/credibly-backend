import { Controller, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond } from '../api';
import { LoginReq, LoginRes, RegisterReq } from '../models';
import { authService } from '../services';

@Controller('auth')
export class AuthController {

  @Post('register')
  @AutoRespond()
  async register(req: Request): Promise<void> {
    const input: RegisterReq = req.body;
    await authService.register(input);
  }

  @Post('login')
  @AutoRespond()
  async login(req: Request): Promise<LoginRes> {
    const input: LoginReq = req.body;
    const data = authService.login(input);
    return data;
  }
}
