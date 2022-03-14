import { Document } from "../entities";
import { GetDocumentRes } from "../models";

export const toDocumentRes = (document: Document): GetDocumentRes => ({
  name: document.name,
  data: Buffer.from(document.data).toString('base64')
});
