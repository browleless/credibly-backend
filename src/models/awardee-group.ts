export interface CreateAwardeeGroupReq {
  organisationId: number;
  groupName: string;
  awardeeIds: number[];
}

export interface AwardeeGroupAwardeesRes {
  id: number;
  name: string;
  email: string;
}

export interface AddRemoveGroupAwardeeReq {
  organisationId: number;
  groupId: number;
  awardeeIds: number[];
}

export interface RemoveAwardeeGroupReq {
  organisationId: number;
  groupIds: number[];
}
