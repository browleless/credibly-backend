import { User } from "../entities";
import { GetPendingApprovalRes } from "../models";

export const toPendingApprovalRes = (user: User): GetPendingApprovalRes => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  uen: user.uen,
  documents: user.documents.map(record => ({
    id: record.id,
    name: record.name
  }))
});
