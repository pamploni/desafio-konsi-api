import IParseWhatsAppTemplateDTO from '../dtos/IParseWhatsAppTemplateDTO';

export default interface IWhatsAppTemplateProvider {
  parse(data: IParseWhatsAppTemplateDTO): Promise<string>;
}
