import { getAllBooksFromAuthor } from './get-books-from-author';

describe('getAllBooksFromAuthor', () => {
    const mockBook = {
        id: 'abc',
    };

    const mockDb = {
        queryPage: jest.fn().mockResolvedValue([mockBook]),
    };

    const mockConfig = {
        BOOKS_TABLE: 'books',
        AUTHOR_BOOKS_INDEX: 'idx_author_books',
    };

    const defaultPageSize = 10;

    it('should fetch book results from db', async () => {
        await getAllBooksFromAuthor(mockDb, {
            config: mockConfig,
            author: 'author-1',
        });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {
                indexName: 'idx_author_books',
                filter: { authorId: 'author-1' },
            },
            undefined,
            defaultPageSize
        );
    });

    it('should fetch results starting at specific item if specified', async () => {
        await getAllBooksFromAuthor(mockDb, {
            config: mockConfig,
            author: 'author-1',
            startAt: 'abc',
        });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {
                indexName: 'idx_author_books',
                filter: { authorId: 'author-1' },
            },
            'abc',
            defaultPageSize
        );
    });

    it('should limit results to default page size if it is not specified', async () => {
        await getAllBooksFromAuthor(mockDb, {
            config: mockConfig,
            author: 'author-1',
        });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {
                indexName: 'idx_author_books',
                filter: { authorId: 'author-1' },
            },
            undefined,
            defaultPageSize
        );
    });

    it('should use specified limit as page size', async () => {
        await getAllBooksFromAuthor(mockDb, {
            config: mockConfig,
            author: 'author-1',
            limit: 20,
        });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {
                indexName: 'idx_author_books',
                filter: { authorId: 'author-1' },
            },
            undefined,
            20
        );
    });

    it('should return fetched book results', async () => {
        const results = await getAllBooksFromAuthor(mockDb, {
            config: mockConfig,
            author: 'author-1',
        });

        expect(results).toEqual([mockBook]);
    });
});
