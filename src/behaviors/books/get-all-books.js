export const getAllBooks = async (db, { BOOKS_TABLE }) => {
    const booksParams = {
        TableName: BOOKS_TABLE,
    };

    // const tableParams = {
    //     TableName: process.env.CANDIDATE_TABLE,
    //     ProjectionExpression: 'id, fullname, email',
    // };
    const results = await db.scan(booksParams);
    return results.Items;
};
