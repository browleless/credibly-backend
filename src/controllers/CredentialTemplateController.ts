import { Controller, Get, Middleware, Patch, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { CredentialTemplate } from '../entities';
import { CreateCredentialTemplateReq } from '../models';
import { credentialTemplateService } from '../services';

@Controller('credentialTemplate')
export class CredentialTemplateController {

  @Post('create')
  @AutoRespond()
  @Middleware(handleValidation)
  async createCredentialTemplate(req: Request): Promise<void> {
    const input: CreateCredentialTemplateReq = {
      organisationId: req.body.organisationId,
      image: req.files.image['data'],
    }
    await credentialTemplateService.createCredentialTemplate(input);
  }

  @Get(':id')
  @AutoRespond()
  @Middleware(handleValidation)
  async login(req: Request): Promise<CredentialTemplate> {
    const id = (req.params.id as unknown) as number;
    const data = await credentialTemplateService.getCredentialTemplateById(id);
    return data;
  }

}
