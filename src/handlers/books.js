import { db } from '../helpers/dynamodb-client';
import { success, failure } from '../helpers/generate-response';
import { getAllBooks } from '../behaviors/books/get-all-books';
import { getAllBooksFromAuthor } from '../behaviors/books/get-books-from-author';

export const list = async event => {
    try {
        const params = getPageQueryParams(event);
        const books = await getAllBooks(db, params);
        return success(200, books);
    } catch (ex) {
        return failure(500, ex);
    }
};

export const getByAuthor = async event => {
    try {
        const { author } = event.pathParameters || {};

        if (!author) {
            return failure(400, 'No author specified');
        }

        const params = {
            ...getPageQueryParams(event),
            author,
        };
        const books = await getAllBooksFromAuthor(db, params);
        return success(200, books);
    } catch (ex) {
        return failure(500, ex);
    }
};

function getPageQueryParams(event) {
    const { limit, startAt } = event.queryStringParameters || {};
    const params = {
        config: process.env,
        startAt,
        limit,
    };
    return params;
}
