import { CertificateTemplate } from "../entities";
import { GetCertificateTemplateRes } from "../models";

export const toCertificateTemplateRes = (
  certificateTemplate: CertificateTemplate
): GetCertificateTemplateRes => ({
  certificateId: certificateTemplate.id,
  certificateName: certificateTemplate.certificateName,
  image: Buffer.from(certificateTemplate.image).toString("base64"),
});
