import { UploadedFile } from "express-fileupload";
import { Document } from "../entities";
import { documentRepo } from "../repositories";
import { sequelize } from "../sequelize";

export class DocumentService {

  async uploadRegistrationSupportingDocuments(organisationId: number, files: UploadedFile | UploadedFile[]): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const documentsToUpload = [];
      const flattenedFiles = [].concat(...[files])

      flattenedFiles.forEach((file: UploadedFile) => {
        const { name, data } = file;
        documentsToUpload.push({
          organisationId,
          name,
          data
        })
      })

      await documentRepo.bulkCreate(documentsToUpload, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async getDocument(id: number): Promise<Document> {
    try {
      const document = await documentRepo.findById(id);
      return document;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
