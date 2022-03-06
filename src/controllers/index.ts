import { env } from '../env'
import { ChildControllers, Controller } from '@overnightjs/core';
import { AuthController } from './AuthController';
import { AwardeeController } from './AwardeeController';
import { AwardeeGroupController } from './AwardeeGroupController';
import { UserController } from './UserController';

const childControllers: any[] = [
  new AuthController(),
  new AwardeeController(),
  new AwardeeGroupController(),
  new UserController()
];

@Controller(env.api.path)
@ChildControllers(childControllers)
class Controllers {
}

export const controllers = new Controllers();
