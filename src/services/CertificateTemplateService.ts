import { CertificateTemplate } from "../entities";
import { CreateCertificateTemplateReq, GetCertificateTemplateReq } from "../models";
import { certificateTemplateRepo } from "../repositories";
import { sequelize } from "../sequelize";

export class CertificateTemplateService {

  async createCertificateTemplate(req: CreateCertificateTemplateReq): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const { image, certificateName, organisationId } = req;

      // TODO constraint validations etc.

      await certificateTemplateRepo.create({
        organisationId,
        certificateName,
        image
      }, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async getCertificateTemplateById(id: number): Promise<CertificateTemplate> {
    try {

      const credentialTemplate = await certificateTemplateRepo.findById(id);

      if (!credentialTemplate) {
        throw new Error('No such certificate template found!');
      }

      return credentialTemplate;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async getCertificateTemplateByIds(req: GetCertificateTemplateReq): Promise<CertificateTemplate[]> {

    try {

      const { ids } = req;

      const credentialTemplates = await certificateTemplateRepo.findByIds(ids);

      if (credentialTemplates.length === 0) {
        throw new Error('No such certificate templates found for provided IDs!');
      }

      return credentialTemplates;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
