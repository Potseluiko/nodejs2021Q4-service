const userCreateSchema = {
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

const userIdSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
  },
};

module.exports = {
  userCreateSchema,
  userIdSchema,
};
