import { Awardee, AwardeeGroup, AwardeeGroupAwardeeIds } from "../entities";
import {
  CreateAwardeeGroupReq,
  AddRemoveGroupAwardeeReq,
  RemoveAwardeeGroupReq,
} from "../models";
import {
  awardeeGroupAwardeeIdsRepo,
  awardeeGroupRepo,
  awardeeRepo,
} from "../repositories";
import { sequelize } from "../sequelize";

export class AwardeeGroupService {
  async createAwardeeGroup(req: CreateAwardeeGroupReq): Promise<any> {
    const transaction = await sequelize.getTransaction();

    try {
      const {
        organisationId,
        groupName,
        groupDescription,
        certificateTemplateId,
      } = req;

      // TODO check for constraint violations

      const res = await awardeeGroupRepo.create(
        {
          organisationId,
          groupName,
          groupDescription,
          certificateTemplateId,
        },
        transaction
      );

      // const awardeeGroupAwardeeIds: Partial<AwardeeGroupAwardeeIds>[] = []
      // awardeeIds.forEach((awardeeId: number) =>
      //   awardeeGroupAwardeeIds.push({
      //     awardeeGroupId: awardeeGroup.id,
      //     awardeeId
      //   })
      // )

      // await awardeeGroupAwardeeIdsRepo.bulkCreate(awardeeGroupAwardeeIds, transaction),

      await transaction.commit();
      return res;
    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async getOrganisationAwardeeGroups(id: number): Promise<AwardeeGroup[]> {
    try {
      const awardeeGroups = await awardeeGroupRepo.findByOrganisationId(id, {
        includes: ["certificateTemplate"],
      });

      return awardeeGroups;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async getAwardeeGroupAwardees(id: number): Promise<Awardee[]> {
    try {
      const awardeeGroup = await awardeeGroupRepo.findById(id);

      if (!awardeeGroup) {
        throw new Error("No such awardee group found!");
      }

      const awardeeGroupAwardeeIds =
        await awardeeGroupAwardeeIdsRepo.findByAwardeeGroupIds([id]);
      const awardeeIds = awardeeGroupAwardeeIds.map(
        (entry: AwardeeGroupAwardeeIds) => entry.awardeeId
      );

      return awardeeRepo.findByIds(awardeeIds);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  async addAwardeesToGroup(req: AddRemoveGroupAwardeeReq): Promise<void> {
    const transaction = await sequelize.getTransaction();

    try {
      const { organisationId, groupId, awardeeIds } = req;

      const awardeeGroup = await awardeeGroupRepo.findById(groupId);

      if (!awardeeGroup) {
        throw new Error("No such awardee group found!");
      }

      if (awardeeGroup.organisationId !== organisationId) {
        throw new Error(
          "Not allowed to add to other organisation's awardee group!"
        );
      }

      // TODO other constraint validations

      const awardeeGroupAwardeeIds = [];
      awardeeIds.forEach((awardeeId: number) =>
        awardeeGroupAwardeeIds.push({
          awardeeGroupId: groupId,
          awardeeId,
        })
      );

      await awardeeGroupAwardeeIdsRepo.bulkCreate(
        awardeeGroupAwardeeIds,
        transaction
      ),
        await transaction.commit();
    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async removeAwardeesFromGroup(req: AddRemoveGroupAwardeeReq): Promise<void> {
    const transaction = await sequelize.getTransaction();

    try {
      const { organisationId, groupId, awardeeIds } = req;

      const awardeeGroup = await awardeeGroupRepo.findById(groupId);

      if (!awardeeGroup) {
        throw new Error("No such awardee group found!");
      }

      if (awardeeGroup.organisationId !== organisationId) {
        throw new Error(
          "Not allowed to delete from other organisation's awardee group!"
        );
      }

      const awardeeGroupAwardeeIds =
        await awardeeGroupAwardeeIdsRepo.findByAwardeeGroupIdAndAwardeeId(
          groupId,
          awardeeIds
        );

      const promises: Promise<void>[] = [];
      awardeeGroupAwardeeIds.forEach(
        (awardeeGroupAwardeeId: AwardeeGroupAwardeeIds) =>
          promises.push(
            awardeeGroupAwardeeIdsRepo.destroy(awardeeGroupAwardeeId)
          )
      );

      await Promise.all(promises);

      await transaction.commit();
    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async removeAwardeeGroups(req: RemoveAwardeeGroupReq): Promise<void> {
    const transaction = await sequelize.getTransaction();

    try {
      const { organisationId, groupIds } = req;

      const awardeeGroups = await awardeeGroupRepo.findByIds(groupIds);

      const groupNotFromOrganisation = awardeeGroups.find(
        (awardeeGroup: AwardeeGroup) =>
          awardeeGroup.organisationId !== organisationId
      );

      if (!!groupNotFromOrganisation) {
        throw new Error(
          "Not allowed to delete other organisation's awardee group!"
        );
      }

      const awardeeGroupAwardeeIdPromises: Promise<number>[] = [];
      const awardeeGroupPromises: Promise<number>[] = [];

      groupIds.forEach((id: number) => {
        awardeeGroupAwardeeIdPromises.push(
          awardeeGroupAwardeeIdsRepo.bulkDestroyByAwardeeGroupId(
            id,
            transaction
          )
        );
        awardeeGroupPromises.push(
          awardeeGroupRepo.bulkDestroyById(id, transaction)
        );
      });

      await Promise.all(awardeeGroupAwardeeIdPromises);
      await Promise.all(awardeeGroupPromises);

      await transaction.commit();
    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }
}
