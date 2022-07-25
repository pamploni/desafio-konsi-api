import { Router } from 'express';

import crawlersRoutes from '@modules/crawlers/infra/http/routes/crawlers.routes';

const routes = Router();

routes.use('/crawlers', crawlersRoutes);

export default routes;
