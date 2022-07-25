import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    );

    return file;
  }

  public async saveFileFromUrl(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    );

    return file;
  }

  // fiz uma função fake (igual a função savefile, só para satisfazer a interface IStorageProvider)
  public async saveBase64ToFile(base64String: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, base64String),
      path.resolve(uploadConfig.uploadsFolder, base64String)
    );

    return base64String;
  }

  // fiz uma função fake (igual a função savefile, só para satisfazer a interface IStorageProvider)
  public async saveDocBase64ToFile(base64String: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, base64String),
      path.resolve(uploadConfig.uploadsFolder, base64String)
    );

    return base64String;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
