export class AbstractBusinessError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, AbstractBusinessError);

        // eslint-disable-next-line no-this-before-super
        if (this.constructor === AbstractBusinessError) {
            throw new TypeError('cannot construct abstract class');
        }
    }
}
