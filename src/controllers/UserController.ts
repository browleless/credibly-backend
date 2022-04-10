import { Controller, Get, Middleware, Patch, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { ApproveUserReq, GetPendingApprovalRes, UpdateUserReq } from '../models';
import { userService } from '../services';
import { toPendingApprovalRes } from '../transformers';

@Controller('user')
export class UserController {

  @Get()
  @AutoRespond()
  async createAccounts(): Promise<void> {
    await userService.createAccounts();
  }

  @Post('approve')
  @AutoRespond()
  @Middleware(handleValidation)
  async approveUsers(req: Request): Promise<void> {
    const input: ApproveUserReq = req.body;
    await userService.approveUsers(input);
  }

  @Post('update')
  @AutoRespond()
  @Middleware(handleValidation)
  async updateUser(req: Request): Promise<void> {
    const input: UpdateUserReq = req.body;
    await userService.updateUser(input);
  }

  @Get('pendingApprovals')
  @AutoRespond()
  @Middleware(handleValidation)
  async getPendingApprovals(): Promise<GetPendingApprovalRes[]> {
    const data = await userService.getPendingApprovals();
    return data.map(record => toPendingApprovalRes(record));
  }
}
