export function getPageQueryParams(event) {
    const { limit, startAt } = event.queryStringParameters || {};
    const params = {
        config: process.env,
        startAt,
        limit,
    };
    return params;
}
