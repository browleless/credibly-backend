import { TransferRequest } from "../entities";
import { transferRequestRepo, userRepo } from "../repositories";
import { AccountType, ApproveTransferRequestReq, CreateTransferRequest } from "../models";
import { sequelize } from "../sequelize";

export class TransferRequestService {

  async createTransferRequest(req: CreateTransferRequest): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const  { userId, organisationId, certificateUuid, transferTo } = req;

      const approver = await userRepo.findById(organisationId);

      if (approver.accountType !== AccountType.ORGANISATION) {
        throw new Error('Approver account must be an organisation account!');
      }

      await transferRequestRepo.create({ userId, organisationId, certificateUuid, transferTo, approved: false }, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async approveTransfers(req: ApproveTransferRequestReq): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const  { approverId, transferRequestIds } = req;

      const approver = await userRepo.findById(approverId);

      if (!approver) {
        throw new Error('Approver account does not exist!');
      }

      const transferRequests = await transferRequestRepo.findByIds(transferRequestIds, { updateLock: transaction });

      if (transferRequests.some((transferRequest: TransferRequest) => transferRequest.organisationId !== approver.id)) {
        throw new Error('Transfer request must be approved by the intended organisation!');
      }

      const promises: Promise<TransferRequest>[] = [];
      transferRequests.forEach((transferRequest: TransferRequest) => {
        transferRequest.approved = true;
        promises.push(transferRequestRepo.save(transferRequest, transaction));
      });

      await Promise.all(promises);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }
  
  async getOrganisationPendingApprovals(organisationId: number): Promise<TransferRequest[]> {

    try {
      const pendingApprovals = await transferRequestRepo.findByOrganisationIdAndApproved(organisationId, false, { includes: ['user', 'documents'] });

      return pendingApprovals;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
