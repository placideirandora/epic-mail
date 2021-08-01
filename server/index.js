import morgan from 'morgan';
import express, { json } from 'express';
import swaggerUI from 'swagger-ui-express';

import database from './db';
import user from './routes/user';
import group from './routes/group';
import message from './routes/message';
import swaggerDOC from '../swagger.json';

const app = express();

app.use(json());
app.use(morgan('dev'));

database.migrateTables();

app.use('/api/v2', user);
app.use('/api/v2', group);
app.use('/api/v2', message);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDOC));

app.use((req, res) => {
  res.status(404).json({ status: 404, error: 'route not found' });
});

app.use((error, req, res, next) => {
  res.status(500).json({ status: 500, error: error.message, next });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
