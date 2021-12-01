const { PORT } = require('./common/config');
const fastify = require('./app');

fastify.listen(PORT, (err, address) => {
  console.log(`App is running on ${address}`);

  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
