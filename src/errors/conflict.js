import { AbstractBusinessError } from './abstract-business-error';

export class Conflict extends AbstractBusinessError {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, Conflict);
    }
}
