export interface AwardeeDetails {
  name: string;
  email: string;
}

export interface CreateAwardeeReq {
  organisationId: number;
  awardees: AwardeeDetails[];
}

export interface UpdateAwardeeReq {
  oldEmail: string;
  newEmail: string;
}

export interface RemoveAwardeeReq {
  organisationId: number;
  awardeeIds: number[];
}

export interface SearchAwardeeReq {
  query: string;
}

export interface SearchAwardeeRes {
  awardeeId: number;
  organisationName: string;
  awardeeName: string;
  awardeeEmail: string;
}
