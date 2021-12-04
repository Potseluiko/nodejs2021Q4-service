const fastify = require('fastify')({
  logger: false,
});
const swaggerUI = require('fastify-swagger');

fastify.register(swaggerUI, {
  routePrefix: '/doc',
  swagger: {},
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest(request, reply, next) {
      next();
    },
    preHandler(request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
});

fastify.register(require('./resources/users/user.router'), {
  prefix: '/users',
});

fastify.register(require('./resources/boards/board.router'), {
  prefix: '/boards',
});

fastify.ready((err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.swagger();
});

module.exports = fastify;
