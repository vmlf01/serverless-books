const BookSchema = {
    type: 'object',
    properties: {
        author: { type: 'string' },
        authorId: { type: 'string', minLength: 10 },
        country: { type: 'string' },
        createdAt: { type: 'number' },
        id: { type: 'string' },
        imageLink: { type: 'string' },
        language: { type: 'string' },
        link: { type: 'string' },
        pages: { type: 'number', minimum: 1 },
        title: { type: 'string', minLength: 1 },
        updatedAt: { type: 'number' },
        year: { type: 'number' },
    },
    required: ['authorId', 'title'],
    additionalProperties: false,
};

export default BookSchema;
