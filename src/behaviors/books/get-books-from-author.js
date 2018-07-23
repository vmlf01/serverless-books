export const getAllBooksFromAuthor = async (
    db,
    { config, author, startAt, limit }
) => {
    const query = {
        indexName: config.AUTHOR_BOOKS_INDEX,
        filter: {
            authorId: author,
        },
    };

    return await db.queryPage(config.BOOKS_TABLE, query, startAt, limit || 10);
};
