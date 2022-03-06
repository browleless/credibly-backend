import { Responder } from './Responder';
import { Validator } from './Validator';

const responder = new Responder();

export const AutoRespond = () => responder.getAutoRespondDecorator();
export const handleValidation = Validator.getValidationMiddleware(responder);

export * from './Responder';
