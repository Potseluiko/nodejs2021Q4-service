import { PORT } from './common/config';
import fastify from './app';

fastify.listen(PORT, (err, address) => {
  console.log(`App is running on ${address}`);

  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
