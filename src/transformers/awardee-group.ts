import { AwardeeGroup } from "../entities";
import { GetOrgasationAwardeeGroupRes } from "../models";

export const toOrganisationAwardeeGroupRes = (
  awardeeGroup: AwardeeGroup
): GetOrgasationAwardeeGroupRes => ({
  key: awardeeGroup.id,
  groupName: awardeeGroup.groupName,
  groupDescription: awardeeGroup.groupDescription,
  image: Buffer.from(awardeeGroup.certificateTemplate.image).toString("base64"),
});
