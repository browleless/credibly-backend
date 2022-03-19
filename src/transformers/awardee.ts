import { Awardee } from "../entities";
import { AwardeeGroupAwardeesRes } from "../models";

export const toAwardeeGroupAwardeesRes = (awardee: Awardee): AwardeeGroupAwardeesRes => ({
  key: awardee.id,
  id: awardee.id,
  name: awardee.name,
  email: awardee.email
});
