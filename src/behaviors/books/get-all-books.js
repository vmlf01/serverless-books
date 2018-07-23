export const getAllBooks = async (db, { config, startAt, limit }) => {
    return await db.queryPage(config.BOOKS_TABLE, {}, startAt, limit || 10);
};
