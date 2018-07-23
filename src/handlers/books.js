import { db } from '../helpers/dynamodb-client';
import { success, failure } from '../helpers/generate-response';
import { getAllBooks } from '../behaviors/books/get-all-books';

export const list = async () => {
    try {
        const books = await getAllBooks(db, process.env);
        return success(200, books);
    } catch (ex) {
        return failure(500, ex);
    }
};

// export const getByAuthor = async (event, context, callback) => {};
