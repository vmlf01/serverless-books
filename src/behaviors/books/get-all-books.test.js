import { getAllBooks } from './get-all-books';

describe('getAllBooks', () => {
    const mockBook = {
        id: 'abc',
    };

    const mockDb = {
        queryPage: jest.fn().mockResolvedValue([mockBook]),
    };

    const mockConfig = {
        BOOKS_TABLE: 'books',
    };

    const defaultPageSize = 10;

    it('should fetch book results from db', async () => {
        await getAllBooks(mockDb, { config: mockConfig });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {},
            undefined,
            defaultPageSize
        );
    });

    it('should fetch results starting at specific item if specified', async () => {
        await getAllBooks(mockDb, { config: mockConfig, startAt: 'abc' });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {},
            'abc',
            defaultPageSize
        );
    });

    it('should limit results to default page size if it is not specified', async () => {
        await getAllBooks(mockDb, { config: mockConfig });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {},
            undefined,
            defaultPageSize
        );
    });

    it('should use specified limit as page size', async () => {
        await getAllBooks(mockDb, { config: mockConfig, limit: 20 });

        expect(mockDb.queryPage).toHaveBeenCalledWith(
            'books',
            {},
            undefined,
            20
        );
    });

    it('should return fetched book results', async () => {
        const results = await getAllBooks(mockDb, { config: mockConfig });

        expect(results).toEqual([mockBook]);
    });
});
