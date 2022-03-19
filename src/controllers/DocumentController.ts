import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { AutoRespond, handleValidation } from '../api';
import { GetDocumentRes } from '../models';
import { documentService } from '../services';
import { toDocumentRes } from '../transformers';

@Controller('document')
export class DocumentController {

  @Post('registration/upload/:id')
  @AutoRespond()
  async uploadRegistrationSupportingDocuments(req: Request): Promise<void> {
    const organisationId = (req.params.id as unknown) as number;
    const files: UploadedFile | UploadedFile[] = req.files.document;
    await documentService.uploadSupportingDocuments({ organisationId }, files);
  }

  @Post('transferRequest/upload/:id')
  @AutoRespond()
  async uploadTransferRequestSupportingDocuments(req: Request): Promise<void> {
    const transferRequestId = (req.params.id as unknown) as number;
    const files: UploadedFile | UploadedFile[] = req.files.document;
    await documentService.uploadSupportingDocuments({ transferRequestId }, files);
  }

  @Get(':id')
  @AutoRespond()
  @Middleware(handleValidation)
  async getDocument(req: Request): Promise<GetDocumentRes> {
    const id = (req.params.id as unknown) as number;
    const data = await documentService.getDocument(id);
    return toDocumentRes(data);
  }

}
