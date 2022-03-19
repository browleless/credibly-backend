import { UserDto, DocumentDto } from ".";

export interface CreateTransferRequest {
  userId: number;
  organisationId: number;
  certificateUuid: string;
  transferTo: string;
}

export interface ApproveTransferRequestReq {
  approverId: number;
  transferRequestIds: number[];
}

export interface GetOrganisationPendingApprovalRes {
  key: number;
  user: UserDto;
  documents: DocumentDto[];
}
