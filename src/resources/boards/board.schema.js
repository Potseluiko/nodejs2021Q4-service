const boardCreateSchema = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    title: {
      type: 'string',
    },
    columns: {
      type: 'array',
    },
  },
};

const boarIdSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
  },
};

module.exports = {
  boardCreateSchema,
  boarIdSchema,
};
