import { Controller, Get, Middleware, Patch, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { ApproveUserReq, UpdateUserReq } from '../models';
import { userService } from '../services';

@Controller('user')
export class UserController {

  @Get()
  @AutoRespond()
  async createAdmin(): Promise<void> {
    await userService.createAdmin();
  }

  @Post('approve')
  @AutoRespond()
  @Middleware(handleValidation)
  async approveUsers(req: Request): Promise<void> {
    const input: ApproveUserReq = req.body;
    await userService.approveUsers(input);
  }

  @Patch('update')
  @AutoRespond()
  @Middleware(handleValidation)
  async update(req: Request): Promise<void> {
    const input: UpdateUserReq = req.body;
    await userService.updateUser(input);
  }
}
