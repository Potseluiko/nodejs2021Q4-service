import fastify from 'fastify';
import usersRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/board.router';
import tasksRouter from './resources/tasks/task.router';

const fastifyApp = fastify({
  logger: false,
});

fastifyApp.register(usersRouter, {
  prefix: '/users',
});

fastifyApp.register(boardsRouter, {
  prefix: '/boards',
});

fastifyApp.register(tasksRouter, {
  prefix: '/boards/:boardId/tasks',
});

fastifyApp.ready((err: object) => {
  if (err) {
    fastifyApp.log.error(err);
    process.exit(1);
  }
});

export default fastifyApp;
