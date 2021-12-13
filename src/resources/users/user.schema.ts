export const userCreateSchema = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    name: {
      type: 'string',
    },
    login: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

export const userIdSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
  },
};
