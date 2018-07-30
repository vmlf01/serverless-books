'use strict';

export const success = (statusCode = 200, body = {}) => {
    return generateResponseObject(statusCode, body);
};

export const failure = (statusCode, error) => {
    const errorMessage = (error && error.message) || 'Unknown server error';
    console.log('ERROR', statusCode, errorMessage); // eslint-disable-line no-console
    return generateResponseObject(statusCode, {
        code: statusCode,
        message: errorMessage,
    });
};

function generateResponseObject(statusCode, body) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    };
}
