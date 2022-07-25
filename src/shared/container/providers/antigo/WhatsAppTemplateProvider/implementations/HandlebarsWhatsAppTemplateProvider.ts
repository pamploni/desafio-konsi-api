import handlebars from 'handlebars';

import fs from 'fs';

import IWhatsAppTemplateProvider from '../models/IWhatsAppTemplateProvider';
import IParseWhatsAppTemplateDTO from '../dtos/IParseWhatsAppTemplateDTO';

class HandlebarsWhatsAppTemplateProvider implements IWhatsAppTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseWhatsAppTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsWhatsAppTemplateProvider;
