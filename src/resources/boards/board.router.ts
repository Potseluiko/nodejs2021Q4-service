import {
  FastifyInstance,
  FastifyServerOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

import Board from './board.model';
import boardService from './board.service';
import { boardIdSchema, boardCreateSchema } from './board.schema';

type IBoard = {
  id: string;
  title: string;
  columns: object[];
};

export default function userRouter(
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const boards = await boardService.getAll();
    reply.send(boards.map((data) => Board.toResponse(data)));
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
    async (request: FastifyRequest<{ Body: IBoard }>, reply: FastifyReply) => {
      const board = await boardService.create(request.body);

      reply.code(201).send(Board.toResponse(board));
    }
  );

  fastify.put(
    '/:id',
    { schema: { params: boardIdSchema, body: boardCreateSchema } },
    async (
      request: FastifyRequest<{ Params: { id: string }; Body: object }>,
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
}
