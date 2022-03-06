import { Controller, Delete, Get, Middleware, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { AwardeeGroup } from '../entities';
import { AddRemoveGroupAwardeeReq, AwardeeGroupAwardeesRes, CreateAwardeeGroupReq, RemoveAwardeeGroupReq } from '../models';
import { awardeeGroupService } from '../services';
import { toAwardeeGroupAwardeesRes } from '../transformers';

@Controller('awardeeGroup')
export class AwardeeGroupController {

  @Post('create')
  @AutoRespond()
  @Middleware(handleValidation)
  async createAwardeeGroup(req: Request): Promise<void> {
    const input: CreateAwardeeGroupReq = req.body;
    await awardeeGroupService.createAwardeeGroup(input);
  }

  @Get('organisation/:id')
  @AutoRespond()
  @Middleware(handleValidation)
  async awardeeGroups(req: Request): Promise<AwardeeGroup[]> {
    const id = (req.params.id as unknown) as number;
    const data = await awardeeGroupService.getOrganisationAwardeeGroups(id);
    return data;
  }

  @Get(':id')
  @AutoRespond()
  @Middleware(handleValidation)
  async awardees(req: Request): Promise<AwardeeGroupAwardeesRes[]> {
    const id = (req.params.id as unknown) as number;
    const data = await awardeeGroupService.getAwardeeGroupAwardees(id);
    return data.map(record => toAwardeeGroupAwardeesRes(record));
  }

  @Post('add')
  @AutoRespond()
  @Middleware(handleValidation)
  async addAwardeesToGroup(req: Request): Promise<void> {
    const input: AddRemoveGroupAwardeeReq = req.body;
    await awardeeGroupService.addAwardeesToGroup(input);
  }

  @Delete('removeAwardees')
  @AutoRespond()
  @Middleware(handleValidation)
  async removeAwardeesFromGroup(req: Request): Promise<void> {
    const input: AddRemoveGroupAwardeeReq = req.body;
    await awardeeGroupService.removeAwardeesFromGroup(input);
  }

  @Delete('removeGroups')
  @AutoRespond()
  @Middleware(handleValidation)
  async removeAwardeeGroups(req: Request): Promise<void> {
    const input: RemoveAwardeeGroupReq = req.body;
    await awardeeGroupService.removeAwardeeGroups(input);
  }
}
