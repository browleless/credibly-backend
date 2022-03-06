import { AuthService } from './AuthService';
import { AwardeeService } from './AwardeeService';
import { AwardeeGroupService } from './AwardeeGroupService';
import { UserService } from './UserService';
import { CredentialTemplateService } from './CredentialTemplateService';

export const authService = new AuthService();
export const awardeeService = new AwardeeService();
export const awardeeGroupService = new AwardeeGroupService();
export const userService = new UserService();
export const credentialTemplateService = new CredentialTemplateService();