import middy from 'middy';
import { cors, httpEventNormalizer } from 'middy/middlewares';
import { appErrorHandler } from '../helpers/app-error-handler';

export const appDefaultHandler = handler =>
    middy(handler)
        .use(cors())
        .use(httpEventNormalizer())
        .use(appErrorHandler());
