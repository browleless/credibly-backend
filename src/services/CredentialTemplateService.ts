import { CredentialTemplate } from "../entities";
import { CreateCredentialTemplateReq } from "../models";
import { credentialTemplateRepo } from "../repositories";
import { sequelize } from "../sequelize";

export class CredentialTemplateService {

  async createCredentialTemplate(req: CreateCredentialTemplateReq): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const { image, organisationId } = req;

      await credentialTemplateRepo.create({
        organisationId,
        image
      }, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  // TODO: As of right now just directly returning credentialTemplate as it (credentialTemplate.image as Buffer type),
  // might need to further manipulate in the future to be able to render in frontend
  async getCredentialTemplateById(id: number): Promise<CredentialTemplate> {
    try {

      const credentialTemplate = await credentialTemplateRepo.findById(id);

      if (!credentialTemplate) {
        throw new Error('No such credential template found!');
      }

      return credentialTemplate;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
