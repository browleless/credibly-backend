import { CertificateTemplate } from "../entities";
import { GetCertificateTemplateRes } from "../models";

export const toCertificateTemplateRes = (certificateTemplate: CertificateTemplate): GetCertificateTemplateRes => ({
  certificateName: certificateTemplate.certificateName,
  image: Buffer.from(certificateTemplate.image).toString('base64')
});
