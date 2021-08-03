import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import userRouter from './user';
import groupRouter from './group';
import messageRouter from './message';
import swaggerDOC from '../../swagger.json';

const indexRouter = Router();

indexRouter.use('/api/v2', userRouter);
indexRouter.use('/api/v2', groupRouter);
indexRouter.use('/api/v2', messageRouter);
indexRouter.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDOC));

export default indexRouter;
