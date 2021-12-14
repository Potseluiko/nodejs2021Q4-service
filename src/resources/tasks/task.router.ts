import {
  FastifyInstance,
  FastifyServerOptions,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

import Task from './task.model';
import boardService from '../boards/board.service';
import taskService from './task.service';
import { taskSchema1, taskSchema2, taskSchema3 } from './task.schema';

type ITask = {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
};

export default function userRouter(
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: () => void
) {
  fastify.get(
    '/',
    { schema: { params: taskSchema1 } },
    async (
      request: FastifyRequest<{ Params: { boardId: string } }>,
      reply: FastifyReply
    ) => {
      const { boardId } = request.params;
      const board = await boardService.getById(boardId);

      if (board) {
        const tasks = await taskService.getAllByBoardId(boardId);
        reply.send(tasks.map(Task.toResponse));
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.get(
    '/:taskId',
    { schema: { params: taskSchema3 } },
    async (
      request: FastifyRequest<{ Params: { boardId: string; taskId: string } }>,
      reply: FastifyReply
    ) => {
      const { boardId, taskId } = request.params;
      const board = await boardService.getById(boardId);

      if (board) {
        const task = await taskService.getByIdWithBoardId(taskId, boardId);

        if (task) {
          reply.send(Task.toResponse(task));
        } else {
          reply.callNotFound();
        }
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.post(
    '/',
    { schema: { params: taskSchema1, body: taskSchema2 } },
    async (
      request: FastifyRequest<{ Params: { boardId: string }; Body: ITask }>,
      reply: FastifyReply
    ) => {
      const { boardId } = request.params;
      const board = await boardService.getById(boardId);

      if (board) {
        const task = await taskService.create({ ...request.body, boardId });
        reply.code(201).send(Task.toResponse(task));
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.put(
    '/:taskId',
    { schema: { params: taskSchema3, body: taskSchema2 } },
    async (
      request: FastifyRequest<{
        Params: { boardId: string; taskId: string };
        Body: object;
      }>,
      reply: FastifyReply
    ) => {
      const { boardId, taskId } = request.params;
      const board = await boardService.getById(boardId);

      if (board) {
        const task = await taskService.updateByIdWithBoardId(taskId, boardId, {
          ...request.body,
          boardId,
        });

        if (task) {
          reply.send(Task.toResponse(task));
        } else {
          reply.callNotFound();
        }
      } else {
        reply.callNotFound();
      }
    }
  );

  fastify.delete(
    '/:taskId',
    { schema: { params: taskSchema3 } },
    async (
      request: FastifyRequest<{ Params: { boardId: string; taskId: string } }>,
      reply: FastifyReply
    ) => {
      const { boardId, taskId } = request.params;
      const board = await boardService.getById(boardId);

      if (board) {
        const data = await taskService.deleteByIdWithBoardId(taskId, boardId);

        if (data) {
          reply.code(204).send();
        } else {
          reply.callNotFound();
        }
      } else {
        reply.callNotFound();
      }
    }
  );

  done();
}
