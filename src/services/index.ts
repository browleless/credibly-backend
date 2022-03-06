import { AuthService } from './AuthService';
import { AwardeeService } from './AwardeeService';
import { AwardeeGroupService } from './AwardeeGroupService';
import { UserService } from './UserService';

export const authService = new AuthService();
export const awardeeService = new AwardeeService();
export const awardeeGroupService = new AwardeeGroupService();
export const userService = new UserService();
