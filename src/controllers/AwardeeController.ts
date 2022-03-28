import { Controller, Delete, Get, Middleware, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { Awardee } from '../entities';
import { AwardeeGroupAwardeesRes, CreateAwardeeReq, RemoveAwardeeReq, SearchAwardeeReq, SearchAwardeeRes } from '../models';
import { awardeeService } from '../services';
import { toAwardeeGroupAwardeesRes } from '../transformers';

@Controller('awardee')
export class AwardeeController {

  @Post('create')
  @AutoRespond()
  @Middleware(handleValidation)
  async createAwardees(req: Request): Promise<any> {
    const input: CreateAwardeeReq = req.body;
    return await awardeeService.createAwardee(input);
  }

  @Get(':email')
  @AutoRespond()
  async getAwardee(req: Request): Promise<Awardee> {
    const email = (req.params.email as unknown) as string;
    const data = await awardeeService.getAwardeeByEmail(email);
    return data;
  }

  @Get('organisation/:id')
  @AutoRespond()
  @Middleware(handleValidation)
  async organisationAwardees(req: Request): Promise<AwardeeGroupAwardeesRes[]> {
    const id = (req.params.id as unknown) as number;
    const data = await awardeeService.getOrgnisationAwardees(id);
    return data.map((record) => toAwardeeGroupAwardeesRes(record));
  }

  @Delete('remove')
  @AutoRespond()
  @Middleware(handleValidation)
  async removeAwardees(req: Request): Promise<void> {
    const input: RemoveAwardeeReq = req.body;
    await awardeeService.removeAwardees(input);
  }

  @Post('search')
  @AutoRespond()
  async searchAwardees(req: Request): Promise<SearchAwardeeRes[]> {
    const input: SearchAwardeeReq = req.body;
    const data = await awardeeService.searchAwardees(input);
    return data;
  }
}
