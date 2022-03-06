import { Controller, Delete, Get, Middleware, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { Awardee } from '../entities';
import { CreateAwardeeReq, RemoveAwardeeReq } from '../models';
import { awardeeService } from '../services';

@Controller('awardee')
export class AwardeeController {

  @Post('create')
  @AutoRespond()
  @Middleware(handleValidation)
  async createAwardees(req: Request): Promise<void> {
    const input: CreateAwardeeReq = req.body;
    await awardeeService.createAwardee(input);
  }

  @Get('organisation/:id')
  @AutoRespond()
  @Middleware(handleValidation)
  async organisationAwardees(req: Request): Promise<Awardee[]> {
    const id = (req.params.id as unknown) as number;
    const data = await awardeeService.getOrgnisationAwardees(id);
    return data;
  }

  @Delete('remove')
  @AutoRespond()
  @Middleware(handleValidation)
  async removeAwardees(req: Request): Promise<void> {
    const input: RemoveAwardeeReq = req.body;
    await awardeeService.removeAwardees(input);
  }
}
