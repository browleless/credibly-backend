export interface CreateCertificateTemplateReq {
  organisationId: number;
  certificateName: string;
  image: Buffer;
}

export interface GetCertificateTemplateReq {
  ids: number[];
}

export interface GetCertificateTemplateRes {
  certificateId: number;
  certificateName: string;
  image: string;
}

export interface DeleteCertificateTemplateReq {
  certificateName: string;
  organisationId: number;
}

export interface GenerateCertificatesReq {
  certificateName: string;
  organisationId: number;
  awardeeNames: string[];
}
