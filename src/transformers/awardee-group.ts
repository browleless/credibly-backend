import { AwardeeGroup } from "../entities";
import { GetOrgasationAwardeeGroupRes } from "../models";

export const toOrganisationAwardeeGroupRes = (awardeeGroup: AwardeeGroup): GetOrgasationAwardeeGroupRes => ({
  key: awardeeGroup.id,
  groupName: awardeeGroup.groupName,
  image: Buffer.from(awardeeGroup.certificateTemplate.image).toString('base64'),
  certificateTemplateId: awardeeGroup.certificateTemplateId,
  certificateName: awardeeGroup.certificateTemplate.certificateName,
});
