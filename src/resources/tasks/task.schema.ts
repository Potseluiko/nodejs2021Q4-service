export const taskSchema1 = {
  type: 'object',
  properties: {
    boardId: { type: 'string', format: 'uuid' },
  },
};

export const taskSchema3 = {
  type: 'object',
  properties: {
    boardId: { type: 'string', format: 'uuid' },
    taskId: { type: 'string', format: 'uuid' },
  },
};

export const taskSchema2 = {
  type: 'object',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    order: {
      type: 'number',
    },
    userId: {
      type: ['string', 'null'],
    },
    boardId: {
      type: ['string', 'null'],
    },
    columnId: {
      type: ['string', 'null'],
    },
  },
};
