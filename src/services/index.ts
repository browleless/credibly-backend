import { AuthService } from './AuthService';
import { AwardeeService } from './AwardeeService';
import { AwardeeGroupService } from './AwardeeGroupService';
import { UserService } from './UserService';
import { CertificateTemplateService } from './CertificateTemplateService';
import { DocumentService } from './DocumentService';

export const authService = new AuthService();
export const awardeeService = new AwardeeService();
export const awardeeGroupService = new AwardeeGroupService();
export const userService = new UserService();
export const certificateTemplateService = new CertificateTemplateService();
export const documentService = new DocumentService();
