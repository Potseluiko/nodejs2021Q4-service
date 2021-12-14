export const boardCreateSchema = {
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

export const boardIdSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
  },
};
