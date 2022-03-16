export interface CreateCertificateTemplateReq {
  organisationId: number;
  certificateName: string;
  image: Buffer;
}

export interface GetCertificateTemplateReq {
  ids: number[];
}

export interface GetCertificateTemplateRes {
  certificateName: string;
  image: string;
}

export interface DeleteCertificateTemplateReq {
  certificateName: string;
  organisationId: number;
}