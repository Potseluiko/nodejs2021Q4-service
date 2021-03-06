const Task = require('./task.model');
const boardService = require('../boards/board.service');
const taskService = require('./task.service');
const { taskSchema1, taskSchema2, taskSchema3 } = require('./task.schema');

module.exports = function userRouter(fastify, opts, done) {
  fastify.get(
    '/',
    { schema: { params: taskSchema1 } },
    async (request, reply) => {
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
    async (request, reply) => {
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
    async (request, reply) => {
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
    async (request, reply) => {
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
    async (request, reply) => {
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
};
