export interface AwardeeDetails {
  name: string;
  email: string;
}

export interface CreateAwardeeReq {
  organisationId: number;
  awardees: AwardeeDetails[];
}

export interface RemoveAwardeeReq {
  organisationId: number,
  awardeeIds: number[];
}
