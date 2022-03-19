import { DocumentDto } from ".";

export enum AccountType {
  ADMIN = 0,
  ORGANISATION = 1,
  AWARDEE = 2
}

export interface RegisterReq {
  email: string;
  name: string;
  password: string;
  uen?: string;
  walletAddress: string;
  accountType: AccountType;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  id: number;
  name: string;
  email: string;
  walletAddress: string;
  accountType: AccountType;
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
  key: number;
  name: string;
  email: string;
  uen: string;
  documents: DocumentDto[];
}

export interface UserDto {
  name: string;
  email: string;
}
