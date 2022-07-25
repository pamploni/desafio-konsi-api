import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import http from 'http';
import https from 'https';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

// Servidor Web
const appWeb = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(rateLimiter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      data: {
        status: 'error',
        message: err.message,
      },
    });
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  return response.status(500).json({
    data: {
      status: 'error',
      message: err.message,
    },
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log(' Server started on port 3333!');
});

// Diretório onde ficará os arquivos web (html, js, css). Pasta 'public' da pasta do projeto
appWeb.use(express.static(path.join(__dirname, 'public')));

// Iniciar Servidor Web porta 80
// appWeb.listen(80, () => {
//   console.log('Conectado como servidor Web porta 80');
// });

const httpsServer = https.createServer(appWeb);

httpsServer.listen(443);
