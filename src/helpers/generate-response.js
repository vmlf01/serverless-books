'use strict';

export const success = (statusCode = 200, body = {}) => {
    return generateResponseObject(statusCode, body);
};

export const failure = (statusCode, error) => {
    const errorMessage = (error && error.message) || 'Internal Server Error';

    if (error.expose === false || statusCode >= 500) {
        console.error('[ERROR]', error); // eslint-disable-line no-console
    }

    return generateResponseObject(statusCode, {
        code: statusCode,
        message: errorMessage,
        details: error.details,
    });
};

function generateResponseObject(statusCode, body) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    };
}
