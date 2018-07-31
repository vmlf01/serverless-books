import { AbstractBusinessError } from './abstract-business-error';

export class BadRequest extends AbstractBusinessError {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, BadRequest);
    }
}
