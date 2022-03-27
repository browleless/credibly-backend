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
  awardees: AwardeeType[];
}

export interface AwardeeType {
  id: number;
  key: number;
  name: string;
  date: string;
  email: string;
}