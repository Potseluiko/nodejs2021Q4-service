const User = require('./user.model');
const usersService = require('./user.service');
const { userIdSchema, userCreateSchema } = require('./user.schema');

module.exports = function userRouter(fastify, opts, done) {
  fastify.get('/', async (request, reply) => {
    const users = await usersService.getAll();
    reply.send(users.map(User.toResponse));
  });

  fastify.get(
    '/:id',
    { schema: { params: userIdSchema } },
    async (request, reply) => {
      const user = await usersService.getById(request.params.id);

      if (user) {
        reply.send(User.toResponse(user));
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.post(
    '/',
    { schema: { body: userCreateSchema } },
    async (request, reply) => {
      const user = await usersService.create(request.body);

      reply.code(201).send(User.toResponse(user));
    }
  );

  fastify.put(
    '/:id',
    { schema: { params: userIdSchema, body: userCreateSchema } },
    async (request, reply) => {
      const user = await usersService.updateById(
        request.params.id,
        request.body
      );

      if (user) {
        reply.send(User.toResponse(user));
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.delete(
    '/:id',
    { schema: { params: userIdSchema } },
    async (request, reply) => {
      const data = await usersService.deleteById(request.params.id);

      if (data) {
        reply.code(204).send();
      } else {
        reply.callNotFound();
      }
    }
  );

  done();
};
