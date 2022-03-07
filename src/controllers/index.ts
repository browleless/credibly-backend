import { env } from '../env'
import { ChildControllers, Controller } from '@overnightjs/core';
import { AuthController } from './AuthController';
import { AwardeeController } from './AwardeeController';
import { AwardeeGroupController } from './AwardeeGroupController';
import { UserController } from './UserController';
import { CertificateTemplateController } from './CertificateTemplateController';

const childControllers: any[] = [
  new AuthController(),
  new AwardeeController(),
  new AwardeeGroupController(),
  new UserController(),
  new CertificateTemplateController()
];

@Controller(env.api.path)
@ChildControllers(childControllers)
class Controllers {
}

export const controllers = new Controllers();
