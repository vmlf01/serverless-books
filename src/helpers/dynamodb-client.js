'use strict';

import * as AWS from 'aws-sdk';
import { Promise as bluebirdPromise } from 'bluebird';

AWS.config.setPromisesDependency(bluebirdPromise);

import { doc as docClient } from 'serverless-dynamodb-client';

function queryPage(table, query, startAt, limit) {
    const params = {
        TableName: table,
        ExclusiveStartKey: deserializeNextPageParameter(startAt),
        Limit: limit || 10,
        ...transformQuery(query),
    };

    return (isQuery(query) ? docClient.query(params) : docClient.scan(params))
        .promise()
        .then(results => {
            return {
                data: results.Items,
                nextPage: serializeNextPageParameter(results.LastEvaluatedKey),
            };
        });
}

function isQuery(query) {
    return query && query.indexName && Object.keys(query.filter).length;
}

function transformQuery(query) {
    if (!isQuery(query)) {
        return {};
    }

    return {
        IndexName: query.indexName,
        KeyConditionExpression: Object.keys(query.filter)
            .map(key => `${key} = :${key}`)
            .join(' AND '),
        ExpressionAttributeValues: Object.keys(query.filter).reduce(
            (values, key) => {
                return {
                    ...values,
                    [`:${key}`]: query.filter[key],
                };
            },
            {}
        ),
    };
}

const fieldSeparator = '|';
const keyValueSeparator = '::';

function serializeNextPageParameter(lastEvaluatedKey) {
    return (
        (lastEvaluatedKey &&
            Object.keys(lastEvaluatedKey)
                .map(
                    key => `${key}${keyValueSeparator}${lastEvaluatedKey[key]}`
                )
                .join(fieldSeparator)) ||
        null
    );
}

function deserializeNextPageParameter(startAt) {
    return (
        (startAt &&
            startAt.split(fieldSeparator).reduce((params, field) => {
                const [key, value] = field.split(keyValueSeparator);
                return {
                    ...params,
                    [key]: value,
                };
            }, {})) ||
        void 0
    );
}

function create(table, document) {
    const params = {
        TableName: table,
        Item: document,
    };

    return docClient.put(params).promise();
}

export const db = {
    queryPage,
    create,
};
