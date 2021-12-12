import {
  FastifyInstance,
  FastifyServerOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

const Board = require('./board.model');
const boardService = require('./board.service');
const { boardIdSchema, boardCreateSchema } = require('./board.schema');

module.exports = function userRouter(
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const boards = await boardService.getAll();
    reply.send(boards.map(Board.toResponse));
  });

  fastify.get(
    '/:id',
    { schema: { params: boardIdSchema } },
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const board = await boardService.getById(request.params.id);

      if (board) {
        reply.send(Board.toResponse(board));
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.post(
    '/',
    { schema: { body: boardCreateSchema } },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const board = await boardService.create(request.body);

      reply.code(201).send(Board.toResponse(board));
    }
  );

  fastify.put(
    '/:id',
    { schema: { params: boardIdSchema, body: boardCreateSchema } },
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const board = await boardService.updateById(
        request.params.id,
        request.body
      );

      if (board) {
        reply.send(Board.toResponse(board));
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.delete(
    '/:id',
    { schema: { params: boardIdSchema } },
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      const data = await boardService.deleteById(request.params.id);

      if (data) {
        reply.code(204).send();
      } else {
        reply.callNotFound();
      }
    }
  );

  done();
};
