import { CertificateTemplate } from "../entities";
import { AwardeeType, CreateCertificateTemplateReq, GetCertificateTemplateReq } from "../models";
import { certificateTemplateRepo } from "../repositories";
import { sequelize } from "../sequelize";

import Jimp from 'jimp';

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

      const certificateTemplate = await certificateTemplateRepo.findById(id);

      if (!certificateTemplate) {
        throw new Error('No such certificate template found!');
      }

      return certificateTemplate;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async getCertificateTemplateByIds(req: GetCertificateTemplateReq): Promise<CertificateTemplate[]> {

    try {

      const { ids } = req;

      const certificateTemplates = await certificateTemplateRepo.findByIds(ids);

      if (certificateTemplates.length === 0) {
        throw new Error('No such certificate templates found for provided IDs!');
      }

      return certificateTemplates;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async getCertificateTemplatesByOrganisationId(id: number): Promise<CertificateTemplate[]> {
    try {

      const certificateTemplates = await certificateTemplateRepo.findByOrganisationId(id);

      return certificateTemplates;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async deleteCertificateTemplate(certificateName: string, organisationId: number): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {

      const credentialTemplates = await certificateTemplateRepo.findByOrganisationIdAndCertificateName(organisationId, certificateName);
      await certificateTemplateRepo.destroy(credentialTemplates[0], transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async generateCertificates(certificateName: string, organisationId: number, awardees: AwardeeType[]): Promise<any> {
    try {
      const data = await certificateTemplateRepo.findByOrganisationIdAndCertificateName(organisationId, certificateName);
      if (data.length == 0) {
        throw new Error('No such certificate template found for provided certificate name and organisation id!');
      }

      const certificateTemplate = data[0];
      interface certificate {
        awardeeName: string,
        awardeeEmail: string,
        issueDate: string,
        encodedCertificate: string
      }
      var certificates: certificate[] = [];
      console.log(awardees);
      for (var awardee of awardees) {
        const image = await Jimp.read(certificateTemplate.image)
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        var w = image.bitmap.width;
        var h = image.bitmap.height;
        image.print(font, 0, 0, {
          text: awardee.name,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, w, h);
        image.getBase64(Jimp.MIME_PNG, (err, res) => {
          var certificate: certificate = {
            awardeeName: awardee.name,
            awardeeEmail: awardee.email,
            issueDate: awardee.date,
            encodedCertificate: res
          }
          certificates.push(certificate)
        });
      }

      return certificates;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}
