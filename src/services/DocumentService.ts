import { UploadedFile } from "express-fileupload";
import { Document } from "../entities";
import { documentRepo } from "../repositories";
import { sequelize } from "../sequelize";

export class DocumentService {

  async uploadSupportingDocuments(ids: { organisationId?: number; transferRequestId?: number }, files: UploadedFile | UploadedFile[]): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {

      const { organisationId, transferRequestId } = ids;

      const documentsToUpload = [];
      const flattenedFiles = [].concat(...[files])

      flattenedFiles.forEach((file: UploadedFile) => {
        const { name, data } = file;
        documentsToUpload.push({
          organisationId: !!organisationId ? organisationId : null,
          transferRequestId: !!transferRequestId ?transferRequestId : null,
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
