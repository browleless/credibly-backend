import { DocumentDto } from ".";

export interface RegisterReq {
  email: string;
  name: string;
  password: string;
  uen?: string;
  walletAddress: string;
  accountType: number;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  email: string;
  walletAddress: string;
  accountType: number;
  approved: boolean;
  token: string;
}

export interface ApproveUserReq {
  approverId: number;
  userIds: number[];
}

export interface UpdateUserReq {
  userId: number;
  password?: string;
  email?: string;
  walletAddress?: string;
}

export interface GetPendingApprovalRes {
  userId: number;
  name: string;
  email: string;
  uen: string;
  documents: DocumentDto[];
}
