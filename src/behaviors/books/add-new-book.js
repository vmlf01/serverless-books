import nanoid from 'nanoid';
import { BadRequest } from '../../errors/bad-request';
import { Conflict } from '../../errors/conflict';

export const addNewBook = async (db, { config, book }) => {
    const now = new Date().getTime();
    const author = await getBookAuthor(book.authorId);

    if (!author) {
        throw new BadRequest(
            `Author [${book.author || book.authorId}] not found`
        );
    }

    if (await bookAlreadyExists(book)) {
        throw new Conflict(
            `Book [${book.title}] by [${book.author}] already exists`
        );
    }

    const newBook = {
        ...book,
        id: nanoid(),
        author: author.name,
        createdAt: now,
        updatedAt: now,
    };
    await db.create(config.BOOKS_TABLE, newBook);
    return newBook.id;
};

async function getBookAuthor(authorId) {
    return { id: authorId, name: authorId };
}

async function bookAlreadyExists(book) {
    // TODO: check duplicate book (author+title for now)
    return true;
}
