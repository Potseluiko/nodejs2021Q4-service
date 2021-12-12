const fastifyApp = require('fastify')({
  logger: false,
});

fastifyApp.register(require('./resources/users/user.router'), {
  prefix: '/users',
});

fastifyApp.register(require('./resources/boards/board.router'), {
  prefix: '/boards',
});

fastifyApp.register(require('./resources/tasks/task.router'), {
  prefix: '/boards/:boardId/tasks',
});

fastifyApp.ready((err: string) => {
  if (err) {
    fastifyApp.log.error(err);
    process.exit(1);
  }
});

module.exports = fastifyApp;
