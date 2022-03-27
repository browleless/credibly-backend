export interface CreateAwardeeGroupReq {
  organisationId: number;
  groupName: string;
  certificateTemplateId: number;
}

export interface AwardeeGroupAwardeesRes {
  id: number;
  key: number;
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

export interface GetOrgasationAwardeeGroupRes {
  key: number;
  groupName: string;
  image: string;
  certificateTemplateId: number;
  certificateName: string;
}

export interface CreateAwardeeGroupRes {
  id: number;
  organisationId: number;
  groupName: string;
  certificateTemplateId: number;
}
