const fastify = require('fastify')({
  logger: false,
});

fastify.register(require('./resources/users/user.router'), {
  prefix: '/users',
});

fastify.register(require('./resources/boards/board.router'), {
  prefix: '/boards',
});

fastify.register(require('./resources/tasks/task.router'), {
  prefix: '/boards/:boardId/tasks',
});

fastify.ready((err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

module.exports = fastify;
