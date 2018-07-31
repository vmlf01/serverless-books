import { jsonBodyParser, validator } from 'middy/middlewares';

import { appDefaultHandler } from '../helpers/app-default-handler';
import { BadRequest } from '../errors/bad-request';
import { db } from '../helpers/dynamodb-client';
import { success } from '../helpers/generate-response';
import { getPageQueryParams } from '../helpers/get-page-query-params';

import { getAllBooks } from '../behaviors/books/get-all-books';
import { getAllBooksFromAuthor } from '../behaviors/books/get-books-from-author';
import { addNewBook } from '../behaviors/books/add-new-book';

import BookSchema from '../schemas/books';

const addBookSchema = {
    required: ['body'],
    properties: {
        body: BookSchema,
    },
};

export const list = appDefaultHandler(async event => {
    const params = getPageQueryParams(event);
    const books = await getAllBooks(db, params);
    return success(200, books);
});

export const getByAuthor = appDefaultHandler(async event => {
    const { author } = event.pathParameters;

    if (!author) {
        throw new BadRequest('No author specified');
    }

    const params = {
        ...getPageQueryParams(event),
        author,
    };
    const books = await getAllBooksFromAuthor(db, params);
    return success(200, books);
});

export const addBook = appDefaultHandler(async event => {
    const params = {
        config: process.env,
        book: event.body,
    };
    const newBookId = await addNewBook(db, params);
    return success(201, { id: newBookId });
})
    .use(jsonBodyParser())
    .use(validator({ inputSchema: addBookSchema }));
