import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDOC from '../swagger.json';
import user from './routes/user';
import message from './routes/message';
import group from './routes/group';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/api/v2', user);
app.use('/api/v2', message);
app.use('/api/v2', group);
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
