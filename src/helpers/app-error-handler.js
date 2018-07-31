import createError from 'http-errors';

import { failure } from './generate-response';
import { Conflict } from '../errors/conflict';
import { BadRequest } from '../errors/bad-request';

export const appErrorHandler = () => {
    return {
        onError: (handler, next) => {
            handler.response = getErrorResponse(handler.error);
            return next();
        },
    };
};

const businessErrorsMappers = new Map([
    [BadRequest, (msg, props) => new createError(400, msg, props)],
    [Conflict, (msg, props) => new createError(409, msg, props)],
]);
const internalServerErrorMapper = (_, props) =>
    new createError(500, 'Internal Server Error', props);

function getErrorResponse(error) {
    const httpError = isHttpError(error) ? error : mapToHttpError(error);
    return failure(error.statusCode, getErrorPayload(httpError));
}

function isHttpError(error) {
    return (
        error.constructor.super_ &&
        error.constructor.super_.name === 'HttpError'
    );
}

function mapToHttpError(error) {
    const httpErrorMapper =
        businessErrorsMappers.get(error.constructor) ||
        internalServerErrorMapper;

    return httpErrorMapper(error.message, error);
}

function getErrorPayload(error) {
    if (Array.isArray(error.details)) {
        error.details = error.details.map(
            err => `${err.dataPath} ${err.message}`
        );
    }
    return error;
}
