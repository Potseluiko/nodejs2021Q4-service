import {
  FastifyInstance,
  FastifyServerOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

const User = require('./user.model');
const usersService = require('./user.service');
const { userIdSchema, userCreateSchema } = require('./user.schema');

module.exports = function userRouter(
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await usersService.getAll();
    reply.send(users.map(User.toResponse));
  });

  fastify.get(
    '/:id',
    { schema: { params: userIdSchema } },
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
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
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = await usersService.create(request.body);

      reply.code(201).send(User.toResponse(user));
    }
  );

  fastify.put(
    '/:id',
    { schema: { params: userIdSchema, body: userCreateSchema } },
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
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
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
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
