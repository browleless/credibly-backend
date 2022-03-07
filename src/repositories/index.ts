import { UserRepo } from './UserRepo';
import { AwardeeRepo } from './AwardeeRepo';
import { AwardeeGroupRepo } from './AwardeeGroupRepo';
import { AwardeeGroupAwardeeIdsRepo } from './AwardeeGroupAwardeeIdsRepo';
import { CertificateTemplateRepo } from './CertificateTemplateRepo';

export const userRepo = new UserRepo();
export const awardeeRepo = new AwardeeRepo();
export const awardeeGroupRepo = new AwardeeGroupRepo();
export const awardeeGroupAwardeeIdsRepo = new AwardeeGroupAwardeeIdsRepo();
export const certificateTemplateRepo = new CertificateTemplateRepo();
