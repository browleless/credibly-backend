import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request } from 'express';
import { AutoRespond, handleValidation } from '../api';
import { CreateCertificateTemplateReq, GetCertificateTemplateReq, GetCertificateTemplateRes, DeleteCertificateTemplateReq, GenerateCertificatesReq } from '../models';
import { certificateTemplateService } from '../services';
import { toCertificateTemplateRes } from '../transformers';

@Controller('certificateTemplate')
export class CertificateTemplateController {

  @Post('create')
  @AutoRespond()
  @Middleware(handleValidation)
  async createCertificateTemplate(req: Request): Promise<void> {
    const input: CreateCertificateTemplateReq = {
      organisationId: req.body.organisationId,
      certificateName: req.body.certificateName,
      image: req.files.image['data'],
    }
    await certificateTemplateService.createCertificateTemplate(input);
  }

  // note: in frontend can try to convert encoded string to ArrayBuffer then to Blob to render
  // to get ArrayBuffer format in FE: Uint8Array.from(Buffer.from(data.image, 'base64')).buffer;
  @Get(':id')
  @AutoRespond()
  @Middleware(handleValidation)
  async certificateTemplate(req: Request): Promise<GetCertificateTemplateRes> {
    const id = (req.params.id as unknown) as number;
    const data = await certificateTemplateService.getCertificateTemplateById(id);
    return toCertificateTemplateRes(data);
  }

  // note: in frontend can try to convert encoded string to ArrayBuffer then to Blob to render
  // to get ArrayBuffer format in FE: Uint8Array.from(Buffer.from(data.image, 'base64')).buffer;
  @Post('templates')
  @AutoRespond()
  @Middleware(handleValidation)
  async certificateTemplates(req: Request): Promise<GetCertificateTemplateRes[]> {
    const input: GetCertificateTemplateReq = req.body;
    const data = await certificateTemplateService.getCertificateTemplateByIds(input);
    return data.map(record => toCertificateTemplateRes(record));
  }

  @Get('organisation/:id')
  @AutoRespond()
  @Middleware(handleValidation)
  async organisationCertificateTemplates(req: Request): Promise<GetCertificateTemplateRes[]> {
    const id = (req.params.id as unknown) as number;
    const data = await certificateTemplateService.getCertificateTemplatesByOrganisationId(id);
    return data.map(record => toCertificateTemplateRes(record));
  }

  @Post('delete')
  @AutoRespond()
  @Middleware(handleValidation)
  async deleteCertificateTemplate(req: Request): Promise<void> {
    const input: DeleteCertificateTemplateReq = req.body;
    await certificateTemplateService.deleteCertificateTemplate(input.certificateName, input.organisationId);
  }

  @Post('generateCertificates')
  @AutoRespond()
  @Middleware(handleValidation)
  async generateCertificates(req: Request): Promise<any> {
    const input: GenerateCertificatesReq = req.body;
    const awardeeNamesArr: string[] = input.awardeeNames;
    const data = await certificateTemplateService.generateCertificates(input.certificateName, input.organisationId, awardeeNamesArr);
    return data;
  }

}
