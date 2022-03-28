import { Awardee } from "../entities";
import { AwardeeDetails, CreateAwardeeReq, RemoveAwardeeReq, SearchAwardeeReq, SearchAwardeeRes } from "../models";
import { awardeeGroupAwardeeIdsRepo, awardeeRepo } from "../repositories";
import { sequelize } from "../sequelize";

export class AwardeeService {

  async createAwardee(req: CreateAwardeeReq): Promise<any> {

    const transaction = await sequelize.getTransaction();

    try {
      const { organisationId, awardees } = req;

      // TODO validation for constraint violations
      
      const orgAwardees = await awardeeRepo.findByOrganisationId(organisationId);

      const existingAwardees = [];

      const newAwardees: Partial<Awardee>[] = [];
      awardees.forEach((awardee: AwardeeDetails) => 
        // trying to solve the problem if the same person added to another grp
        {
          const emailExists = orgAwardees.some(orgAwardee =>   // checking if the email alr exists
            awardee.email == orgAwardee.email
          )
          if (!emailExists) { // doesn't exist, add awardee
            newAwardees.push({
              organisationId,
              name: awardee.name,
              email: awardee.email
            })
          } else { // awardee exists
            existingAwardees.push(awardee.email);
          }
        }
      );

      const response = await awardeeRepo.bulkCreate(newAwardees, transaction);

      for (let i = 0; i < existingAwardees.length; i++) {
        const existingAwardee = await awardeeRepo.findByOrganisationIdAndEmail(organisationId, existingAwardees[i]);
        response.push(existingAwardee);
      }
      
      await transaction.commit();
      return response;

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async getOrgnisationAwardees(id: number): Promise<Awardee[]> {
    try {
      const awardees = await awardeeRepo.findByOrganisationId(id);
      if (awardees.length === 0) {
        throw new Error("No awardees created for current organisation!");
      }

      return awardees;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async removeAwardees(req: RemoveAwardeeReq): Promise<void> {  
    
    const transaction = await sequelize.getTransaction();

    try {
      const { organisationId, awardeeIds } = req;

      const awardees = await awardeeRepo.findByIds(awardeeIds);

      const awardeeNotFromOrganisation = awardees.find(
        (awardee: Awardee) => awardee.organisationId !== organisationId
      );

      if (!!awardeeNotFromOrganisation) {
        throw new Error("Not allowed to delete other organisation's awardee!");
      }

      const awardeeGroupAwardeeIdPromises: Promise<number>[] = [];
      const awardeePromises: Promise<void>[] = [];

      awardees.forEach((awardee: Awardee) => {
        awardeeGroupAwardeeIdPromises.push(
          awardeeGroupAwardeeIdsRepo.bulkDestroyByAwardeeId(
            awardee.id,
            transaction
          )
        );
        awardeePromises.push(awardeeRepo.destroy(awardee, transaction));
      });

      await Promise.all(awardeeGroupAwardeeIdPromises);
      await Promise.all(awardeePromises);

      await transaction.commit();
    } catch (err) {
      console.log(err.message);
      transaction.rollback();
      throw err;
    }
  }

  async getAwardeeByEmail(email: string): Promise<Awardee> {    
    try {
      const awardee = await awardeeRepo.findByEmail(email);
      return awardee;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async searchAwardees(req: SearchAwardeeReq): Promise<SearchAwardeeRes[]> {    
    try {
      const { query } = req;

      const awardees = await awardeeRepo.findByNameLikeOrEmailLike(query);

      return awardees;

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
