'use strict';

import * as AWS from 'aws-sdk';
import { Promise as bluebirdPromise } from 'bluebird';

AWS.config.setPromisesDependency(bluebirdPromise);

import { doc as docClient } from 'serverless-dynamodb-client';

export const db = {
    scan: params => docClient.scan(params).promise(),
};
