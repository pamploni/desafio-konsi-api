import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CrawlersController from '../controllers/CrawlersController';

const crawlersRouter = Router();
const upload = multer(uploadConfig.multer);
const crawlersController = new CrawlersController();

crawlersRouter.post(
  '/newResearch',
  celebrate({
    [Segments.BODY]: {
      data: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        cpf: Joi.string().min(11).required(),
      }).required(),
    },
  }),
  crawlersController.newResearch
);

crawlersRouter.get(
  '/byCpf',
  celebrate({
    [Segments.QUERY]: {
      cpf: Joi.string().required(),
    },
  }),
  crawlersController.findByCpf
);

export default crawlersRouter;
