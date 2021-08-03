import express, { json } from 'express';
import swaggerUI from 'swagger-ui-express';

import database from './db';
import user from './routes/user';
import group from './routes/group';
import message from './routes/message';
import swaggerDOC from '../swagger.json';
import logger from './config/winston.config';
import morganMiddleware from './config/morgan.config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(morganMiddleware);

database.migrateTables();

app.use('/api/v2', user);
app.use('/api/v2', group);
app.use('/api/v2', message);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDOC));

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'route not found' });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server Listening on Port: ${PORT} \n`);
});

export default app;
