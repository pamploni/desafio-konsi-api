import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import aws, { S3 } from 'aws-sdk';
import { getType } from 'mime';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    console.log(originalPath);

    const ContentType = getType(originalPath);

    if (!ContentType) {
      throw new AppError('File not found!');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath).then(() => {
      console.log('apagado o arquivo local');
    });

    return file;
  }

  public async downloadFromUrl(file: string): Promise<string> {
    //baixar na pasta temporária

    return new Promise((resolve, reject) => {
      const tmpFolder = path.resolve(uploadConfig.tmpFolder);
      const fileHash = crypto.randomBytes(8).toString('hex');

      const fileUrl = fs.createWriteStream(
        `${tmpFolder}/fitzy_service_${fileHash}.png`
      );

      https.get(file, function (response) {
        if (response.statusCode === 200) {
          response
            .pipe(fileUrl)
            .on('error', reject)
            .once('close', () => resolve(String(fileUrl.path)));
        } else {
          response.resume();
          reject(
            new Error(
              `Request Failed With a Status Code: ${response.statusCode}`
            )
          );
          fs.promises.unlink(fileUrl.path); // Delete temp file
          console.log('Apagou porque deu problema');
        }
      });

      fileUrl.on('finish', () => {
        console.log('Finalizado o download');
        console.log('salvo em: ' + fileUrl.path);
        fileUrl.close();
      });

      return String(fileUrl.path);
    });
  }

  public async saveFileFromUrl(file: string): Promise<string> {
    const filePath = await this.downloadFromUrl(file);

    console.log('verificando o content type');
    const ContentType = getType(filePath);

    if (!ContentType) {
      throw new AppError('File not found!');
    }

    const fileUrlName = path.basename(filePath);

    console.log('depois do download: ' + filePath);

    const fileRet = await this.saveFile(filePath);

    console.log('fim da função');

    return filePath;
  }

  public async saveBase64ToFile(base64String: string): Promise<string> {
    const base64Image = base64String.split(';base64,').pop();

    const fileHash = crypto.randomBytes(10).toString('hex');
    const file = path.resolve(
      uploadConfig.tmpFolder,
      `fitzy_image-${fileHash}.png`
    );

    return new Promise((resolve, reject) => {
      fs.writeFile(file, base64Image, { encoding: 'base64' }, function (err) {
        if (err) reject(err);
        else
          resolve(() => {
            console.log(`File created: ${err}`);
          });
      });
    }).then(() => {
      const ContentType = getType(file);

      if (!ContentType) {
        throw new AppError('File not found!');
      }

      return this.saveFile(
        path.resolve(uploadConfig.tmpFolder, `fitzy_image-${fileHash}.png`)
      );
    });
  }

  public async saveDocBase64ToFile(base64String: string): Promise<string> {
    const base64Doc = base64String.split(';base64,').pop();

    const fileHash = crypto.randomBytes(10).toString('hex');
    const file = path.resolve(
      uploadConfig.tmpFolder,
      `fitzy_image-${fileHash}.pdf`
    );

    return new Promise((resolve, reject) => {
      fs.writeFile(file, base64Doc, { encoding: 'base64' }, function (err) {
        if (err) reject(err);
        else
          resolve(() => {
            console.log(`File created: ${err}`);
          });
      });
    }).then(() => {
      const ContentType = getType(file);

      if (!ContentType) {
        throw new AppError('File not found!');
      }

      return this.saveFile(
        path.resolve(uploadConfig.tmpFolder, `image-${fileHash}.pdf`)
      );
    });
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
