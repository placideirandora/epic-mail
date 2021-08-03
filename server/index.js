import express, { json } from 'express';

import database from './db';
import indexRouter from './routes';
import logger from './config/winston.config';
import morganMiddleware from './config/morgan.config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(morganMiddleware);

database.migrateTables();

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'Route not found' });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server Listening on Port: ${PORT} \n`);
});

export default app;
