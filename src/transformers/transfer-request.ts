import { TransferRequest } from "../entities";
import { GetOrganisationPendingApprovalRes } from "../models";

export const toOrganisationPendingApprovals = (transferRequest: TransferRequest): GetOrganisationPendingApprovalRes => ({
  key: transferRequest.id,
  user: {
    name: transferRequest.user.name,
    email: transferRequest.user.email
  },
  documents: transferRequest.documents.map(record => ({
    id: record.id,
    name: record.name
  }))
});
